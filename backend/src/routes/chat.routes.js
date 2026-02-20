import express from "express";
import { retrieveTopChunks } from "../services/retrieval.service.js";
import { answerQuery } from "../services/rag.service.js";

const router = express.Router();

router.get("/test", async (req, res) => {
    const query = req.query.q;

    const results = await retrieveTopChunks(query);

    res.json(results);
});

router.post("/query", async (req, res) => {
    const { query } = req.body;

    const result = await answerQuery(query);

    res.json(result);
});

export default router;