import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    role: {
        type: String,
        enum: ["user", "assistant"],
        required: true
    },
    content: {
        type: String,
        required: true
    },
    citations: [
        {
            documentId: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
            pageNumber: Number,
            score: Number
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

const chatSessionSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        title: {
            type: String,
            default: "New Chat"
        },
        messages: [messageSchema]
    },
    { timestamps: true }
);

export default mongoose.model("ChatSession", chatSessionSchema);