import axios from "axios";

export async function generateAnswer(contextChunks, query) {
    const contextText = contextChunks.map(c => c.text).join("\n\n");

    const prompt = `
            Answer ONLY using the provided context.
            If the answer is not found, say "I don't know".

            Context:
            ${contextText}

            Question:
            ${query}
            `;

    const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
        model: "google/gemini-2.5-flash",
        messages: [
            { role: "user", content: prompt }
        ]
        },
        {
        headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
        }
        }
    );

    return response.data.choices[0].message.content;
}