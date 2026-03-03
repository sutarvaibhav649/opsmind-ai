import express from "express";
import { upload } from "../controllers/document.controller.js";
import Document from "../models/document.model.js";
import { protect } from "../middleware/auth.middleware.js";
import uploadMiddleware, { handleMulterError } from "../middleware/upload.middleware.js";

const router = express.Router();

router.post(
    "/upload",
    protect,
    uploadMiddleware.single("file"),
    upload,
    handleMulterError
);

router.get("/all", protect, async (req, res) => {
    try {
        const documents = await Document.find({ userId: req.user.userId })
            .sort({ createdAt: -1 });
        res.json(documents);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch documents" });
    }
});

router.delete("/:id", protect, async (req, res) => {
    try {
        const doc = await Document.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.userId
        });
        if (!doc) return res.status(404).json({ error: "Document not found" });
        res.json({ message: "Document deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;