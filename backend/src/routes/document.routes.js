import express from "express";
import multer from "multer";
import path from "path";
import { upload } from "../controllers/document.controller.js";

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

router.post("/upload", uploadMiddleware.single("file"), upload);

export default router;