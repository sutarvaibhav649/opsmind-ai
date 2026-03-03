import dotenv from 'dotenv'
import axios from "axios";

dotenv.config({
    path:"./.env"
});

export async function generateEmbedding(text) {
    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
        throw new Error("OPENROUTER_API_KEY is not set. Check your .env file.");
    }

    const response = await axios.post(
        "https://openrouter.ai/api/v1/embeddings",
        {
            model: "openai/text-embedding-3-small",  
            input: text
        },
        {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                "Content-Type": "application/json"
            }
        }
    );

    const embedding = response.data.data[0].embedding;

    if (!embedding) {
        throw new Error("Embedding failed — no embedding returned");
    }

    return embedding;
}