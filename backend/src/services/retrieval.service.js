// services/retrieval.service.js
import { generateEmbedding } from "./embedding.service.js";
import Chunk from "../models/chunk.model.js";
import mongoose from "mongoose";

export async function retrieveTopChunks(query, userId) {
    try {
        
        const queryEmbedding = await generateEmbedding(query);

        // FIXED: Proper vector search with filter inside $vectorSearch
        const results = await Chunk.aggregate([
            {
                $vectorSearch: {
                    index: "vector_index",
                    path: "embedding",
                    queryVector: queryEmbedding,
                    numCandidates: 100,
                    limit: 10
                }
            },
            {
                $addFields: {
                    score: { $meta: "vectorSearchScore" }
                }
            },
            {
                $match: { score: { $gte: 0.5 } }  
            },
            {
                $limit: 5
            },
            {
                $lookup: {
                    from: "documents",
                    localField: "documentId",
                    foreignField: "_id",
                    as: "documentInfo"
                }
            },
            {
                $project: {
                    text: 1,
                    pageNumber: 1,
                    documentId: 1,
                    score: 1,
                    filename: { $arrayElemAt: ["$documentInfo.originalName", 0] },
                    metadata: 1
                }
            }
        ]);
        results.forEach(r => console.log(`   - Score: ${r.score}, Page: ${r.pageNumber}`));

        return results;

    } catch (error) {
        console.error("Retrieval error:", error);
        return [];
    }
}