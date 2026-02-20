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

    

    const topScore = results[0]?.score ?? 0;
    const secondScore = results[1]?.score ?? 0;

    if (!results.length || topScore < 0.65 || (topScore - secondScore < 0.01)) {
        return [];
    }

    console.log("Retrieval results:", results);
    return results;
}