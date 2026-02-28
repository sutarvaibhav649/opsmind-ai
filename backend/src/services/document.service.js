import Document from "../models/document.model.js";
import { pdfQueue } from "../queues/pdf.queue.js";

// FIX: Accept userId so every document is owned by the uploading user
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
        userId,                        // FIX: pass userId into the worker job
        filePath: file.path,
        originalName: file.originalname
    });

    return document;
}