import mongoose from "mongoose";

const chunkSchema = new mongoose.Schema({
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