import { generateEmbedding } from "./embedding.service.js";
import Chunk from "../models/chunk.model.js";
import mongoose from "mongoose";

// FIX: Accept userId and filter results so users only retrieve their own chunks
export async function retrieveTopChunks(query, userId) {
    const queryEmbedding = await generateEmbedding(query);

    const results = await Chunk.aggregate([
        {
            $vectorSearch: {
                index: "vector_index",
                path: "embedding",
                queryVector: queryEmbedding,
                numCandidates: 100,
                limit: 5
            }
        },
        {
            
            $match: {
                userId: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $project: {
                text: 1,
                pageNumber: 1,
                documentId: 1,
                userId: 1,
                score: { $meta: "vectorSearchScore" }
            }
        },
        {
            $limit: 3
        }
    ]);

    const topScore = results[0]?.score ?? 0;

    if (!results.length || topScore < 0.65) {
        return [];
    }

    return results;
}