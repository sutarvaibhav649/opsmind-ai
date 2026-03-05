import express from "express";
import { retrieveTopChunks } from "../services/retrieval.service.js";
import { generateStreamingAnswer } from "../services/llm.service.js";
import { protect } from "../middleware/auth.middleware.js";
import ChatSession from "../models/chatSession.model.js";
import QueryAnalytics from "../models/queryAnalytics.model.js";

const router = express.Router();

router.get("/sessions", protect, async (req, res) => {
    try {
        const sessions = await ChatSession.find(
            { userId: req.user.userId },
            { title: 1, createdAt: 1, updatedAt: 1 }
        ).sort({ updatedAt: -1 });

        res.json(sessions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/sessions", protect, async (req, res) => {
    try {
        const session = await ChatSession.create({
            userId: req.user.userId,
            title: req.body.title || "New Chat",
            messages: []
        });
        res.status(201).json(session);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.patch("/sessions/:sessionId/title", protect, async (req, res) => {
    try {
        const session = await ChatSession.findOneAndUpdate(
            { _id: req.params.sessionId, userId: req.user.userId },
            { title: req.body.title },
            { new: true }
        );
        if (!session) return res.status(404).json({ error: "Session not found" });
        res.json(session);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete("/sessions/:sessionId", protect, async (req, res) => {
    try {
        await ChatSession.findOneAndDelete({
            _id: req.params.sessionId,
            userId: req.user.userId
        });
        res.json({ message: "Session deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


router.get("/sessions/:sessionId/messages", protect, async (req, res) => {
    try {
        const session = await ChatSession.findOne({
            _id: req.params.sessionId,
            userId: req.user.userId
        });
        if (!session) return res.status(404).json({ error: "Session not found" });
        res.json(session.messages);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post("/query", protect, async (req, res) => {

    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");

    const { query, sessionId } = req.body;
    const userId = req.user.userId;

    const startTime = Date.now(); // Track response time

    if (!query || !sessionId) {
        res.write(`data: ${JSON.stringify({ type: "error", message: "query and sessionId are required" })}\n\n`);
        return res.end();
    }

    try {

        const session = await ChatSession.findOne({ _id: sessionId, userId });

        if (!session) {
            res.write(`data: ${JSON.stringify({ type: "error", message: "Session not found" })}\n\n`);
            return res.end();
        }

        // Save user message
        session.messages.push({ role: "user", content: query });

        const chunks = await retrieveTopChunks(query, userId);

        // ------------------------------------
        // CASE 1: NO DOCUMENTS FOUND
        // ------------------------------------
        if (!chunks || chunks.length === 0) {

            const noAnswer = "I don't have any relevant information in your uploaded documents to answer that.";

            session.messages.push({
                role: "assistant",
                content: noAnswer,
                citations: []
            });

            await session.save();

            // Save analytics
            await QueryAnalytics.create({
                userId,
                query,
                documentIds: [],
                documentNames: [],
                responseTime: Date.now() - startTime,
                chunksRetrieved: 0,
                confidence: 0,
                timestamp: new Date()
            });

            res.write(`data: ${JSON.stringify({
                type: "final",
                answer: noAnswer,
                citations: []
            })}\n\n`);

            return res.end();
        }

        // ------------------------------------
        // STREAM AI RESPONSE
        // ------------------------------------

        const stream = await generateStreamingAnswer(chunks, query);

        let fullAnswer = "";

        for await (const token of stream) {

            fullAnswer += token;

            res.write(`data: ${JSON.stringify({
                type: "token",
                token
            })}\n\n`);

        }

        // ------------------------------------
        // CREATE CITATIONS
        // ------------------------------------

        const citations = chunks.map(c => ({
            documentId: c.documentId,
            pageNumber: c.pageNumber || 1,
            score: c.score,
            filename: c.filename || "new_file.pdf",
            excerpt: c.text ? c.text.substring(0, 150) + "..." : ""
        }));

        // Save assistant message
        session.messages.push({
            role: "assistant",
            content: fullAnswer,
            citations: citations
        });

        // Update session title
        if (session.messages.length <= 3 && session.title === "New Chat") {

            session.title =
                query.slice(0, 50) +
                (query.length > 50 ? "..." : "");

        }

        await session.save();

        // ------------------------------------
        // SAVE QUERY ANALYTICS
        // ------------------------------------

        try {

            await QueryAnalytics.create({

                userId: userId,

                query: query,

                documentIds: chunks.map(c => c.documentId),

                documentNames: chunks.map(c => c.filename),

                responseTime: Date.now() - startTime,

                chunksRetrieved: chunks.length,

                confidence: chunks.length
                    ? chunks.reduce((sum, c) => sum + (c.score || 0), 0) / chunks.length
                    : 0,

                timestamp: new Date()

            });

        } catch (analyticsError) {

            console.error("Analytics logging failed:", analyticsError);

        }

        // ------------------------------------
        // FINAL RESPONSE
        // ------------------------------------

        res.write(`data: ${JSON.stringify({
            type: "final",
            citations,
            answer: fullAnswer
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