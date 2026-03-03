import mongoose from "mongoose";

const queryAnalyticsSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User",
        required: true 
    },
    query: {
        type: String,
        required: true
    },
    documentIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Document"
    }],
    documentNames: [String],
    responseTime: Number,
    chunksRetrieved: Number,
    confidence: Number,
    timestamp: { 
        type: Date, 
        default: Date.now,
        index: true
    }
});

// Index for analytics queries
queryAnalyticsSchema.index({ userId: 1, timestamp: -1 });

export default mongoose.model("QueryAnalytics", queryAnalyticsSchema);