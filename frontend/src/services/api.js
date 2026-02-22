const API_BASE = import.meta.env.VITE_API_URL;

export const getDocuments = async () => {
    const res = await fetch(`${API_BASE}/api/documents/all`);
    if (!res.ok) throw new Error("Failed to fetch documents");
    return res.json();
};

export const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_BASE}/api/documents/upload`, {
        method: "POST",
        body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");
    return res.json();
};

export const streamChat = async (query) => {
    return fetch(`${API_BASE}/api/chat/query`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
    });
};