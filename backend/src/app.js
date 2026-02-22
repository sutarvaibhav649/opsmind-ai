import express from 'express';
import cors from 'cors';
import documentRoutes from "./routes/document.routes.js";
import chatRoutes from "./routes/chat.routes.js";

import dotenv from "dotenv";
dotenv.config({
    path:"./.env"
});

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST'],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/documents", documentRoutes);
app.use("/api/chat", chatRoutes);

// Error handler
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
});

export default app;