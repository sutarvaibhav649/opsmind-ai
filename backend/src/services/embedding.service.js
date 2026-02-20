import axios from "axios";

export async function generateEmbedding(text) {
    const response = await axios.post(
        "https://openrouter.ai/api/v1/embeddings",
        {
        model: "text-embedding-3-small",
        input: text
        },
        {
        headers: {
            Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
            "Content-Type": "application/json"
        }
        }
    );

    const embedding = response.data.data[0].embedding;

    if (!embedding) {
        throw new Error("Embedding failed");
    }

    return embedding;
}