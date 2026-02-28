import dotenv from 'dotenv'
import axios from "axios";

dotenv.config({
    path:"./.env"
});

export async function generateStreamingAnswer(contextChunks, query) {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        throw new Error("OPENROUTER_API_KEY is not set. Check your .env file.");
    }

    const contextText = contextChunks.map(c => c.text).join("\n\n");

    const response = await axios({
        method: "post",
        url: "https://openrouter.ai/api/v1/chat/completions",
        data: {
            // Free models on OpenRouter — falls back down the list if one is unavailable
            model: "meta-llama/llama-3.1-8b-instruct",
            stream: true,
            messages: [
                {
                    role: "system",
                    content: "You are an internal knowledge assistant. Answer strictly using the provided context. If the answer is not found in the context, say \"I don't know based on the provided documents.\""
                },
                {
                    role: "user",
                    content: `Context:\n${contextText}\n\nQuestion:\n${query}`
                }
            ]
        },
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5173",   // Required by OpenRouter
            "X-Title": "OpsMind-AI"
        },
        responseType: "stream"
    });

    const stream = response.data;

    async function* tokenGenerator() {
        try {
            for await (const chunk of stream) {
                const lines = chunk.toString().split("\n");
                for (const line of lines) {
                    if (line.startsWith("data: ")) {
                        const data = line.replace("data: ", "").trim();
                        if (data === "[DONE]") return;
                        try {
                            const parsed = JSON.parse(data);
                            const token =
                                parsed.choices?.[0]?.delta?.content ??
                                parsed.choices?.[0]?.message?.content ??
                                null;
                            if (token) yield token;
                        } catch (e) {
                            // Skip malformed lines
                        }
                    }
                }
            }
        } catch (err) {
            console.error("Streaming loop error:", err);
        }
    }

    return tokenGenerator();
}