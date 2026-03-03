import { Queue, Worker } from "bullmq";
import IORedis from "ioredis";
import Document from "../models/document.model.js";
import Chunk from "../models/chunk.model.js";
import { extractText } from "../services/pdf.service.js";
import { chunkText } from "../utils/chunk.util.js";
import { generateEmbedding } from "../services/embedding.service.js";

const connection = new IORedis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    maxRetriesPerRequest: null
});

export const pdfQueue = new Queue("pdf-processing", { connection });

const worker = new Worker(
    "pdf-processing",
    async job => {
        const { documentId, userId, filePath, originalName } = job.data;

        try {
            const { pages, totalPages } = await extractText(filePath);

            const chunks = chunkText(pages);

            for (const chunk of chunks) {
                const embedding = await generateEmbedding(chunk.text);
                await Chunk.create({
                    userId,
                    documentId,
                    text: chunk.text,
                    chunkIndex: chunk.chunkIndex,
                    pageNumber: chunk.pageNumber, 
                    embedding,
                    metadata: { filename: originalName }
                });
            }

            await Document.findByIdAndUpdate(documentId, {
                status: "processed",
                totalPages
            });

        } catch (error) {
            console.error("FULL WORKER ERROR:", error);
            console.error("STACK:", error.stack);
            await Document.findByIdAndUpdate(documentId, { status: "failed" });
            throw error;
        }
    },
    { connection }
);