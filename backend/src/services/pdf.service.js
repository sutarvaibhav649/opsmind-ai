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
                        pageText += decodeURIComponent(r.T) + " ";
                    });
                });

                pages.push({
                    pageNumber: index + 1,   
                    text: pageText.trim()
                });
            });

            resolve({ pages, totalPages });
        });

        pdfParser.loadPDF(filePath);
    });
}