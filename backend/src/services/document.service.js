import Document from "../models/document.model.js";
import { pdfQueue } from "../queues/pdf.queue.js";

export async function uploadDocument(file, userId) {
    const document = await Document.create({
        userId,
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