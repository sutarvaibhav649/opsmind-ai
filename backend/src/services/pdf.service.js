import PDFParser from "pdf2json";

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
                        try {
                            // Try to decode, but fallback to raw text if fails
                            const decodedText = r.T ? decodeURIComponent(r.T) : '';
                            pageText += decodedText + " ";
                        } catch (e) {
                            // If decode fails, use the raw text (might be already decoded)
                            // or skip problematic characters
                            const rawText = r.T || '';
                            // Remove any problematic characters
                            const cleanedText = rawText.replace(/[^\x20-\x7E]/g, '');
                            pageText += cleanedText + " ";
                        }
                    });
                });

                // Clean up the page text
                pageText = pageText
                    .replace(/\s+/g, ' ')  // Replace multiple spaces with single space
                    .trim();

                pages.push({
                    pageNumber: index + 1,
                    text: pageText || `[Empty Page ${index + 1}]` // Fallback for empty pages
                });
            });

            resolve({ pages, totalPages });
        });

        pdfParser.loadPDF(filePath);
    });
}