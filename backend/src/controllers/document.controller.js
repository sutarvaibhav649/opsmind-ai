import { uploadDocument } from "../services/document.service.js";

export async function upload(req, res) {
    try {
        const document = await uploadDocument(req.file);

        res.status(201).json({
        documentId: document._id,
        status: document.status
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}