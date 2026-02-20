import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    filename: String,
    originalName: String,
    mimeType: String,
    size: Number,
    uploadDate: { type: Date, default: Date.now },
    totalPages: Number,
    status: {
        type: String,
        enum: ["processing", "processed", "failed"],
        default: "processing"
    }
});

export default mongoose.model("Document", documentSchema);