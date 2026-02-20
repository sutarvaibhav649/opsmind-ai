import dotenv from 'dotenv'
import { GoogleGenAI } from "@google/genai";

dotenv.config({
    path: "./.env"
});

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

export async function generateEmbedding(text) {
    const response = await ai.models.embedContent({
        model: "models/gemini-embedding-001",
        contents: [
        {
            role: "user",
            parts: [{ text }]
        }
        ]
    });

    const embedding = response.embeddings[0].values;
    if (embedding.length !== 3072) {
    throw new Error(`Unexpected dimension: ${embedding.length}`);
    }

    return embedding;
}