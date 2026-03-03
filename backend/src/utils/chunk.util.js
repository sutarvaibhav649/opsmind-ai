export function chunkText(pages, chunkSize = 1000, overlap = 200) {
    const chunks = [];
    let chunkIndex = 0;

    for (const { pageNumber, text } of pages) {
        if (!text.trim()) continue;   

        let start = 0;

        while (start < text.length) {
            const end = start + chunkSize;
            const chunkContent = text.slice(start, end).trim();

            if (chunkContent) {
                chunks.push({
                    text: chunkContent,
                    chunkIndex: chunkIndex++,
                    pageNumber  
                });
            }

            start += chunkSize - overlap;
        }
    }

    console.log(`Chunks found: ${chunks.length}`);
    return chunks;
}