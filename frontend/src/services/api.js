const API_BASE = import.meta.env.VITE_API_URL;

const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`
});

// ─── Documents ────────────────────────────────────────────────────────────────

export async function getDocuments() {
    const res = await fetch(`${API_BASE}/api/documents/all`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error("Failed to fetch documents");
    return res.json();
}

export const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_BASE}/api/documents/upload`, {
        method: "POST",
        headers: authHeaders(),   // FIX: auth header was missing in original
        body: formData,
    });

    if (!res.ok) throw new Error("Upload failed");
    return res.json();
};

export const deleteDocument = async (documentId) => {
    const res = await fetch(`${API_BASE}/api/documents/${documentId}`, {
        method: "DELETE",
        headers: authHeaders()
    });
    if (!res.ok) throw new Error("Delete failed");
    return res.json();
};

// ─── Chat Sessions ────────────────────────────────────────────────────────────

export async function getSessions() {
    const res = await fetch(`${API_BASE}/api/chat/sessions`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error("Failed to fetch sessions");
    return res.json();
}

export async function createSession(title = "New Chat") {
    const res = await fetch(`${API_BASE}/api/chat/sessions`, {
        method: "POST",
        headers: { ...authHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({ title })
    });
    if (!res.ok) throw new Error("Failed to create session");
    return res.json();
}

export async function renameSession(sessionId, title) {
    const res = await fetch(`${API_BASE}/api/chat/sessions/${sessionId}/title`, {
        method: "PATCH",
        headers: { ...authHeaders(), "Content-Type": "application/json" },
        body: JSON.stringify({ title })
    });
    if (!res.ok) throw new Error("Failed to rename session");
    return res.json();
}

export async function deleteSession(sessionId) {
    const res = await fetch(`${API_BASE}/api/chat/sessions/${sessionId}`, {
        method: "DELETE",
        headers: authHeaders()
    });
    if (!res.ok) throw new Error("Failed to delete session");
    return res.json();
}

export async function getSessionMessages(sessionId) {
    const res = await fetch(`${API_BASE}/api/chat/sessions/${sessionId}/messages`, {
        headers: authHeaders()
    });
    if (!res.ok) throw new Error("Failed to fetch messages");
    return res.json();
}

// ─── Streaming Chat ───────────────────────────────────────────────────────────

// FIX: Now requires sessionId so the server can scope retrieval and save history
export const streamChat = async (query, sessionId) => {
    return fetch(`${API_BASE}/api/chat/query`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeaders()
        },
        body: JSON.stringify({ query, sessionId }),
    });
};