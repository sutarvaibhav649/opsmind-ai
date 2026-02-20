import axios from "axios";

export async function generateAnswer(contextChunks, query) {
    const contextText = contextChunks.map(c => c.text).join("\n\n");

    const prompt = `
            You are an internal knowledge assistant.

            Answer strictly using the provided context.
            Do not use prior knowledge.
            If the answer is not found explicitly in the context ${contextText}, say:
            "I don't know based on the provided documents."

            Format your answer clearly using bullet points when listing items.
            Be concise.
            Question: ${query}
            `;

    const response = await axios.post(
        "https://openrouter.ai/api/v1/chat/completions",
        {
        model: "openai/gpt-4o-mini",
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