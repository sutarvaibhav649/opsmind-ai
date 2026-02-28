import { retrieveTopChunks } from "./retrieval.service.js";
import { generateStreamingAnswer } from "./llm.service.js";

// NOTE: This service is for non-streaming use cases only.
// For streaming responses, use generateStreamingAnswer directly in chat.routes.js
// FIX: Collect all streamed tokens into a single string before returning
export async function answerQuery(query) {
    const chunks = await retrieveTopChunks(query);

    if (!chunks.length) {
        return {
            answer: "I don't know based on the provided documents.",
            citations: []
        };
    }

    // FIX: Consume the async generator and collect full answer string
    const stream = await generateStreamingAnswer(chunks, query);
    let answer = "";
    for await (const token of stream) {
        answer += token;
    }

    const uniqueCitations = [
        ...new Map(
            chunks.map(c => [
                c.documentId.toString(),
                { documentId: c.documentId, pageNumber: c.pageNumber }
            ])
        ).values()
    ];

    return { answer, citations: uniqueCitations };
}