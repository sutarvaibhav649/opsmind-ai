const API_BASE = import.meta.env.VITE_API_URL;

export async function getDocuments() {
    const token = localStorage.getItem("token");

    const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/documents/all`,
        {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        }
    );

    if (!res.ok) {
        throw new Error("Failed to fetch documents");
    }

    return res.json();
}

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
    const token = localStorage.getItem("token");

    return fetch(`${API_BASE}/api/chat/query`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ query }),
    });
};

export function setToken(token) {
    localStorage.setItem("token", token.data);
}