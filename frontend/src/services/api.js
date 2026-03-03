const API_BASE = import.meta.env.VITE_API_URL;

const authHeaders = () => ({
    Authorization: `Bearer ${localStorage.getItem("token")}`
});

const handleResponse = async (res) => {
    if (!res.ok) {
        const error = await res.json().catch(() => ({}));
        throw new Error(error.error || `Request failed with status ${res.status}`);
    }
    return res.json();
};

// ==================== DOCUMENTS ====================

export async function getDocuments() {
    const res = await fetch(`${API_BASE}/api/documents/all`, {
        headers: authHeaders()
    });
    return handleResponse(res);
}

export const uploadDocument = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_BASE}/api/documents/upload`, {
        method: "POST",
        headers: {
            'Authorization': `Bearer ${localStorage.getItem("token")}`
        },
        body: formData,
    });
    return handleResponse(res);
};

export const deleteDocument = async (documentId) => {
    const res = await fetch(`${API_BASE}/api/documents/${documentId}`, {
        method: "DELETE",
        headers: authHeaders()
    });
    return handleResponse(res);
};

// ==================== CHAT SESSIONS ====================

export async function getSessions() {
    const res = await fetch(`${API_BASE}/api/chat/sessions`, {
        headers: authHeaders()
    });
    return handleResponse(res);
}

export async function createSession(title = "New Chat") {
    const res = await fetch(`${API_BASE}/api/chat/sessions`, {
        method: "POST",
        headers: { 
            ...authHeaders(), 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ title })
    });
    return handleResponse(res);
}

export async function renameSession(sessionId, title) {
    const res = await fetch(`${API_BASE}/api/chat/sessions/${sessionId}/title`, {
        method: "PATCH",
        headers: { 
            ...authHeaders(), 
            "Content-Type": "application/json" 
        },
        body: JSON.stringify({ title })
    });
    return handleResponse(res);
}

export async function deleteSession(sessionId) {
    const res = await fetch(`${API_BASE}/api/chat/sessions/${sessionId}`, {
        method: "DELETE",
        headers: authHeaders()
    });
    return handleResponse(res);
}

export async function getSessionMessages(sessionId) {
    const res = await fetch(`${API_BASE}/api/chat/sessions/${sessionId}/messages`, {
        headers: authHeaders()
    });
    return handleResponse(res);
}

// ==================== STREAMING CHAT ====================

export const streamChat = async (query, sessionId) => {
    return fetch(`${API_BASE}/api/chat/query`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            ...authHeaders()
        },
        body: JSON.stringify({ query, sessionId }),
    });
    // Don't use handleResponse here because we need the stream
};

// ==================== ADMIN APIs ====================

export async function getAdminAnalytics() {
    const res = await fetch(`${API_BASE}/api/admin/knowledge-graph`, {
        headers: authHeaders()
    });
    
    if (res.status === 403) {
        throw new Error("Admin access required");
    }
    return handleResponse(res);
}

export async function getAdminUsers() {
    const res = await fetch(`${API_BASE}/api/admin/users`, {
        headers: authHeaders()
    });
    return handleResponse(res);
}

export async function updateUserRole(userId, role) {
    const res = await fetch(`${API_BASE}/api/admin/users/${userId}/role`, {
        method: "PATCH",
        headers: {
            ...authHeaders(),
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ role })
    });
    return handleResponse(res);
}

// ==================== UTILITY ====================

// Check if user is admin (can be used in components)
export const isAdmin = () => {
    try {
        const token = localStorage.getItem("token");
        if (!token) return false;
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.role === 'admin';
    } catch {
        return false;
    }
};