import { retrieveTopChunks } from "./retrieval.service.js";
import { generateStreamingAnswer } from "./llm.service.js";


export async function answerQuery(query) {
    const chunks = await retrieveTopChunks(query);

    if (!chunks.length) {
        return {
            answer: "I don't know based on the provided documents.",
            citations: []
        };
    }

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