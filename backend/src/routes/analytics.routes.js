import express from "express";
import { protect } from "../middleware/auth.middleware.js";
import { getKnowledgeGraphData } from "../services/analytics.service.js";

const router = express.Router();

router.get("/knowledge-graph", protect, async (req, res) => {
    try {
        const data = await getKnowledgeGraphData(req.user.userId);
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;