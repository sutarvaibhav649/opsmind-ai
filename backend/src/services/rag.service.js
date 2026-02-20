import { retrieveTopChunks } from "./retrieval.service.js";
import { generateAnswer } from "./llm.service.js";

export async function answerQuery(query) {
    const chunks = await retrieveTopChunks(query);

    if (!chunks.length || chunks[0].score < 0.70) {
        return {
        answer: "I don't know based on the provided documents.",
        citations: []
        };
    }

    const answer = await generateAnswer(chunks, query);

    return {
        answer,
        citations: chunks.map(c => ({
        documentId: c.documentId,
        pageNumber: c.pageNumber
        }))
    };
}