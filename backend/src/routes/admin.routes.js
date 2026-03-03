import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/admin.middleware.js";
import QueryAnalytics from "../models/queryAnalytics.model.js";
import Document from "../models/document.model.js";
import User from "../models/user.model.js";

const router = express.Router();

// All routes in this file require both authentication AND admin role
router.use(protect, requireAdmin);

// Get knowledge graph data (admin only)
router.get("/knowledge-graph", async (req, res) => {
    try {
        const thirtyDaysAgo = new Date();
        thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
        
        // Get system-wide stats (not just user-specific)
        const [
            totalUsers,
            totalDocuments,
            totalQueries,
            topDocuments,
            recentQueries,
            userActivity
        ] = await Promise.all([
            User.countDocuments(),
            Document.countDocuments(),
            QueryAnalytics.countDocuments({ timestamp: { $gte: thirtyDaysAgo } }),
            
            // Top accessed documents
            QueryAnalytics.aggregate([
                { $match: { timestamp: { $gte: thirtyDaysAgo } } },
                { $unwind: "$documentNames" },
                { 
                    $group: {
                        _id: "$documentNames",
                        count: { $sum: 1 },
                        avgConfidence: { $avg: "$confidence" }
                    }
                },
                { $sort: { count: -1 } },
                { $limit: 10 }
            ]),
            
            // Recent queries with user info
            QueryAnalytics.find({ timestamp: { $gte: thirtyDaysAgo } })
                .sort({ timestamp: -1 })
                .limit(20)
                .populate('userId', 'email'),
            
            // User activity summary
            QueryAnalytics.aggregate([
                { $match: { timestamp: { $gte: thirtyDaysAgo } } },
                {
                    $group: {
                        _id: "$userId",
                        queryCount: { $sum: 1 },
                        avgConfidence: { $avg: "$confidence" },
                        lastActive: { $max: "$timestamp" }
                    }
                },
                { $sort: { queryCount: -1 } },
                { $limit: 10 },
                { $lookup: { from: "users", localField: "_id", foreignField: "_id", as: "user" } }
            ])
        ]);

        // Daily query volume
        const dailyQueries = await QueryAnalytics.aggregate([
            { 
                $match: { 
                    timestamp: { $gte: thirtyDaysAgo }
                } 
            },
            {
                $group: {
                    _id: { 
                        $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
                    },
                    count: { $sum: 1 },
                    uniqueUsers: { $addToSet: "$userId" }
                }
            },
            { $sort: { "_id": 1 } }
        ]);

        res.json({
            overview: {
                totalUsers,
                totalDocuments,
                totalQueries,
                activeUsers: userActivity.length
            },
            topDocuments,
            dailyQueries: dailyQueries.map(d => ({
                date: d._id,
                queries: d.count,
                uniqueUsers: d.uniqueUsers.length
            })),
            userActivity,
            recentQueries
        });
    } catch (error) {
        console.error("Admin analytics error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Get all users (admin only)
router.get("/users", async (req, res) => {
    try {
        const users = await User.find({})
            .select('-password')
            .sort({ createdAt: -1 });
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update user role (admin only)
router.patch("/users/:userId/role", async (req, res) => {
    try {
        const { role } = req.body;
        
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({ error: "Invalid role" });
        }
        
        // Prevent removing last admin
        if (role === 'user') {
            const adminCount = await User.countDocuments({ role: 'admin' });
            const targetUser = await User.findById(req.params.userId);
            
            if (adminCount === 1 && targetUser.role === 'admin') {
                return res.status(400).json({ 
                    error: "Cannot remove the last admin" 
                });
            }
        }
        
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { role },
            { new: true }
        ).select('-password');
        
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;