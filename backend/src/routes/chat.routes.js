import express from "express";
import { retrieveTopChunks } from "../services/retrieval.service.js";
import { answerQuery } from "../services/rag.service.js";

const router = express.Router();

router.get("/test", async (req, res) => {
    const query = req.query.q;

    const results = await retrieveTopChunks(query);

    res.json(results);
});

import { generateStreamingAnswer } from "../services/llm.service.js";

router.post("/query", async (req, res) => {
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const { query } = req.body;

    try {
        const chunks = await retrieveTopChunks(query);

        if (!chunks.length || chunks[0].score < 0.65) {
        res.write(`data: ${JSON.stringify({
            type: "final",
            answer: "I don't know based on the provided documents.",
            citations: []
        })}\n\n`);
        return res.end();
        }

        const stream = await generateStreamingAnswer(chunks, query);

        for await (const token of stream) {
        res.write(`data: ${JSON.stringify({
            type: "token",
            token
        })}\n\n`);
        }

        res.write(`data: ${JSON.stringify({
        type: "final",
        citations: chunks.map(c => ({
            documentId: c.documentId,
            pageNumber: c.pageNumber,
            score: c.score
        }))
        })}\n\n`);

        res.end();

    } catch (err) {
        console.error("SSE ERROR:", err);
        res.write(`data: ${JSON.stringify({
        type: "error",
        message: err.message
        })}\n\n`);
        res.end();
    }
});

export default router;