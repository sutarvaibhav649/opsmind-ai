import { uploadDocument } from "../services/document.service.js";

export async function upload(req, res) {
    try {
        // FIX: Pass the authenticated user's ID so the document is owned by them
        const document = await uploadDocument(req.file, req.user.userId);
        res.status(201).json({
            documentId: document._id,
            status: document.status
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}