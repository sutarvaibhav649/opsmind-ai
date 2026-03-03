import dotenv from 'dotenv'
import axios from "axios";

dotenv.config({
    path: "./.env"
});

export async function generateStreamingAnswer(contextChunks, query) {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        throw new Error("OPENROUTER_API_KEY is not set. Check your .env file.");
    }

    const contextText = contextChunks.map(c => c.text).join("\n\n");
    
    // Define system prompt INSIDE the function where contextText is available
    const systemPrompt = `You are OpsMind AI, an internal knowledge assistant.
RULES:
1. ONLY answer using the provided context documents
2. If the answer is NOT in the context, say EXACTLY: "I don't have information about that in your uploaded documents."
3. Do not make up information or use external knowledge
4. Be concise and professional
5. Always cite the source document and page number

Context from uploaded documents:
${contextText}

Question: ${query}`;

    const response = await axios({
        method: "post",
        url: "https://openrouter.ai/api/v1/chat/completions",
        data: {
            model: "meta-llama/llama-3.1-8b-instruct",
            stream: true,
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                }
                // Don't send separate user message since context is already in system prompt
            ]
        },
        headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
            "HTTP-Referer": "http://localhost:5173",   
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
                            console.log("Parse error:", e);
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