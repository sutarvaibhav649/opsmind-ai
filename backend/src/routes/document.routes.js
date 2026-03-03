import express from "express";
import { upload } from "../controllers/document.controller.js";
import Document from "../models/document.model.js";
import { protect } from "../middleware/auth.middleware.js";
import { requireAdmin } from "../middleware/admin.middleware.js";
import uploadMiddleware, { handleMulterError } from "../middleware/upload.middleware.js";

const router = express.Router();

// Only admins can upload documents
router.post(
    "/upload",
    protect,
    requireAdmin,
    uploadMiddleware.single("file"),
    upload,
    handleMulterError
);

// ALL authenticated users can see ALL documents (no userId filter)
router.get("/all", protect, async (req, res) => {
    try {
        // Remove the userId filter - show all documents to everyone
        const documents = await Document.find({})
            .sort({ createdAt: -1 })
            .populate('userId', 'email'); // Optional: show who uploaded
        
        res.json(documents);
    } catch (err) {
        console.error("Error fetching documents:", err);
        res.status(500).json({ error: "Failed to fetch documents" });
    }
});

// Only admins can delete documents
router.delete("/:id", protect, requireAdmin, async (req, res) => {
    try {
        // Also delete associated chunks
        await Chunk.deleteMany({ 
            documentId: req.params.id
        });
        
        const doc = await Document.findOneAndDelete({
            _id: req.params.id
        });
        
        if (!doc) return res.status(404).json({ error: "Document not found" });
        
        // Optional: Delete physical file
        const filePath = path.join(__dirname, '../../uploads', doc.filename);
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }
        
        res.json({ message: "Document deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

export default router;