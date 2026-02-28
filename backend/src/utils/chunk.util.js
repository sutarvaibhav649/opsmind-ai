export function chunkText(text, chunkSize = 1000, overlap = 200) {
    const chunks = [];
    let start = 0;
    let index = 0;

    console.log("Chunks found:", chunks.length);

    while (start < text.length) {
        const end = start + chunkSize;

        chunks.push({
        text: text.slice(start, end),
        chunkIndex: index++
        });

        start += chunkSize - overlap;
    }

    return chunks;
}