import PDFParser from "pdf2json";
import fs from "fs";

export async function extractText(filePath) {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser();

        pdfParser.on("pdfParser_dataError", errData => {
        reject(errData.parserError);
        });

        pdfParser.on("pdfParser_dataReady", pdfData => {
        let fullText = "";
        let totalPages = pdfData.Pages.length;

        pdfData.Pages.forEach(page => {
            page.Texts.forEach(textItem => {
            textItem.R.forEach(r => {
                fullText += decodeURIComponent(r.T) + " ";
            });
            });
            fullText += "\n";
        });

        resolve({
            text: fullText,
            totalPages
        });
        });

        pdfParser.loadPDF(filePath);
    });
}