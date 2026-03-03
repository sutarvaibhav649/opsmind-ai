import mongoose from "mongoose";

const documentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true
        },
        filename: String,
        originalName: String,
        mimeType: String,
        size: Number,
        totalPages: Number,
        status: {
            type: String,
            enum: ["processing", "processed", "failed"],
            default: "processing"
        }
    },
    { timestamps: true }
);

export default mongoose.model("Document", documentSchema);