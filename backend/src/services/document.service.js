import Document from "../models/document.model.js";
import { pdfQueue } from "../queues/pdf.queue.js";

export async function uploadDocument(file) {
    const document = await Document.create({
        filename: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        size: file.size
    });

    await pdfQueue.add("process-pdf", {
        documentId: document._id,
        filePath: file.path,
        originalName: file.originalname
    });

    return document;
}