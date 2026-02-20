import { generateEmbedding } from "./embedding.service.js";
import Chunk from "../models/chunk.model.js";

export async function retrieveTopChunks(query) {
    const queryEmbedding = await generateEmbedding(query);

    const results = await Chunk.aggregate([
        {
        $vectorSearch: {
            index: "vector_index", 
            path: "embedding",
            queryVector: queryEmbedding,
            numCandidates: 100,
            limit: 3
        }
        },
        {
        $project: {
            text: 1,
            pageNumber: 1,
            documentId: 1,
            score: { $meta: "vectorSearchScore" }
        }
        }
    ]);

    if (!results.length || results[0].score < 0.70) {
        return [];
    }

    return results;
}