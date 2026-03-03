import QueryAnalytics from "../models/queryAnalytics.model.js";
import Document from "../models/document.model.js";

export async function trackQuery(userId, query, chunks, responseTime) {
    try {
        const documentIds = [...new Set(chunks.map(c => c.documentId?.toString()))];
        
        // Get document names
        const docs = await Document.find({ 
            _id: { $in: documentIds } 
        }).select('originalName');
        
        const documentMap = {};
        docs.forEach(doc => {
            documentMap[doc._id.toString()] = doc.originalName;
        });
        
        const avgConfidence = chunks.reduce((acc, c) => acc + (c.score || 0), 0) / chunks.length;
        
        await QueryAnalytics.create({
            userId,
            query,
            documentIds,
            documentNames: documentIds.map(id => documentMap[id] || 'Unknown'),
            responseTime,
            chunksRetrieved: chunks.length,
            confidence: avgConfidence || 0
        });
    } catch (error) {
        console.error("Analytics tracking error:", error);
    }
}

export async function getKnowledgeGraphData(userId) {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    // Get top documents
    const topDocuments = await QueryAnalytics.aggregate([
        { 
            $match: { 
                userId: new mongoose.Types.ObjectId(userId),
                timestamp: { $gte: thirtyDaysAgo }
            } 
        },
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
    ]);
    
    // Get daily query volume
    const dailyQueries = await QueryAnalytics.aggregate([
        { 
            $match: { 
                userId: new mongoose.Types.ObjectId(userId),
                timestamp: { $gte: thirtyDaysAgo }
            } 
        },
        {
            $group: {
                _id: { 
                    $dateToString: { format: "%Y-%m-%d", date: "$timestamp" }
                },
                count: { $sum: 1 },
                avgConfidence: { $avg: "$confidence" }
            }
        },
        { $sort: { "_id": 1 } }
    ]);
    
    return {
        topDocuments,
        dailyQueries,
        totalQueries: dailyQueries.reduce((acc, d) => acc + d.count, 0),
        avgConfidence: dailyQueries.reduce((acc, d) => acc + d.avgConfidence, 0) / dailyQueries.length || 0
    };
}