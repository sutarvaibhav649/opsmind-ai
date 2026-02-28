import { retrieveTopChunks } from "./retrieval.service.js";
import { generateStreamingAnswer } from "./llm.service.js";

export async function answerQuery(query) {
    const chunks = await retrieveTopChunks(query);
    if (!chunks.length || chunks[0].score < 0.65) {
        return {
        answer: "I don't know based on the provided documents.",
        citations: []
        };
    }

    const answer = await generateStreamingAnswer(chunks, query);

    const uniqueCitations = [
        ...new Map(
            chunks.map(c => [
            c.documentId.toString(),
            { documentId: c.documentId, pageNumber: c.pageNumber }
            ])
        ).values()
    ];

    return {
        answer,
        citations: uniqueCitations
    };
}