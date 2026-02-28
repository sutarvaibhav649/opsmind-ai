import express from "express";
import multer from "multer";
import { upload } from "../controllers/document.controller.js";
import Document from "../models/document.model.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const uploadMiddleware = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== "application/pdf") {
        return cb(new Error("Only PDFs allowed"));
        }
        cb(null, true);
    }
});

router.post("/upload",protect, uploadMiddleware.single("file"), upload);


router.get("/all",protect, async (req, res) => {
    try {
        const documents = await Document.find().sort({ createdAt: -1 });
        res.json(documents);
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch documents" });
    }
});

export default router;