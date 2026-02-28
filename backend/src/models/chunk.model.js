import mongoose from "mongoose";

const chunkSchema = new mongoose.Schema({
    // FIX: userId scopes vector search results to only the querying user's documents
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true
    },
    documentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document"
    },
    text: String,
    chunkIndex: Number,
    pageNumber: Number,
    embedding: {
        type: [Number],
        required: true
    },
    metadata: {
        filename: String
    },
    createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Chunk", chunkSchema);