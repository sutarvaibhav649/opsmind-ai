import PDFParser from "pdf2json";

// FIX: Returns array of { pageNumber, text } instead of one big string
// This allows each chunk to be tagged with the correct page number
export async function extractText(filePath) {
    return new Promise((resolve, reject) => {
        const pdfParser = new PDFParser();

        pdfParser.on("pdfParser_dataError", errData => {
            reject(errData.parserError);
        });

        pdfParser.on("pdfParser_dataReady", pdfData => {
            const pages = [];
            const totalPages = pdfData.Pages.length;

            pdfData.Pages.forEach((page, index) => {
                let pageText = "";

                page.Texts.forEach(textItem => {
                    textItem.R.forEach(r => {
                        pageText += decodeURIComponent(r.T) + " ";
                    });
                });

                pages.push({
                    pageNumber: index + 1,   // 1-based page number
                    text: pageText.trim()
                });
            });

            resolve({ pages, totalPages });
        });

        pdfParser.loadPDF(filePath);
    });
}