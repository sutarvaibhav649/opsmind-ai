import axios from "axios";

export async function generateStreamingAnswer(contextChunks, query) {
    const contextText = contextChunks.map(c => c.text).join("\n\n");

    const response = await axios({
        method: "post",
        url: "https://openrouter.ai/api/v1/chat/completions",
        data: {
        model: "meta-llama/llama-3.1-8b-instruct",
        stream: true,
        messages: [
            {
            role: "user",
            content: `
                    You are an internal knowledge assistant.
                    Answer strictly using provided context.
                    If answer not found, say "I don't know".

                    Context:
                    ${contextText}

                    Question:
                    ${query}
                    `
            }
        ]
        },
        headers: {
        Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        "Content-Type": "application/json"
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
                    parsed.choices?.[0]?.text ??
                    null;

                    if (token) yield token;

                } catch (e) {
                    console.log("Parse error:", e);
                }
                }
            }
            }
        } catch (err) {
            console.log("Streaming loop error:", err);
        }
    }

    return tokenGenerator();
}