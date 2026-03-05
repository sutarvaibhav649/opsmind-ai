import Document from "../models/document.model.js";
import { pdfQueue } from "../queues/pdf.queue.js";

export async function uploadDocument(file, userId, userEmail) {
    const document = await Document.create({
        userId,
        uploadedBy: userEmail, 
        filename: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size
    });

    await pdfQueue.add("process-pdf", {
        documentId: document._id,
        userId,
        filePath: file.path,
        originalName: file.originalname
    });

    return document;
}

// Update the upload endpoint handler
export async function upload(req, res) {
    try {
        const document = await uploadDocument(
            req.file, 
            req.user.userId,
            req.user.email  
        );
        res.status(201).json({
            documentId: document._id,
            status: document.status
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
