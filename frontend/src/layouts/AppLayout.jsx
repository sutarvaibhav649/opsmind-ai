import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import FilesPanel from "../components/chat/FilesPanel";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X, FolderOpen } from "lucide-react";
import {
    getDocuments,
    uploadDocument,
    getSessions,
    createSession,
    deleteSession,
} from "../services/api";

function AppLayout() {
    const { isAdmin, user } = useAuth();
    const [sessions, setSessions] = useState([]);
    const [activeSessionId, setActiveSessionId] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [loadingSessions, setLoadingSessions] = useState(true);
    const navigate = useNavigate();

    // Mobile/tablet drawer state
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [filesPanelOpen, setFilesPanelOpen] = useState(false);

    // Close drawers on route change / resize to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 1024) {
                setSidebarOpen(false);
                setFilesPanelOpen(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const init = async () => {
            try {
                const [docs, sessionList] = await Promise.all([
                    getDocuments(),
                    getSessions(),
                ]);
                setUploadedFiles(
                    docs.map((doc) => ({
                        id: doc._id,
                        name: doc.originalName,
                        size: doc.size ? (doc.size / 1024).toFixed(2) + " KB" : "",
                        status: doc.status,
                        uploadedBy: doc.userId === user?.userId ? "You" : "Admin",
                    }))
                );
                setSessions(sessionList);
                if (sessionList.length > 0) {
                    setActiveSessionId(sessionList[0]._id);
                    navigate(`/chat/${sessionList[0]._id}`);
                } else {
                    await handleNewChat();
                }
            } catch (err) {
                console.error("Init error:", err);
            } finally {
                setLoadingSessions(false);
            }
        };
        init();
    }, []);

    const handleNewChat = async () => {
        try {
            const session = await createSession("New Chat");
            setSessions((prev) => [session, ...prev]);
            setActiveSessionId(session._id);
            navigate(`/chat/${session._id}`);
            setSidebarOpen(false); // close drawer after action
            return session;
        } catch (err) {
            console.error("Failed to create session:", err);
        }
    };

    const handleSelectSession = (sessionId) => {
        setActiveSessionId(sessionId);
        navigate(`/chat/${sessionId}`);
        setSidebarOpen(false); // close drawer on mobile after selecting
    };

    const handleDeleteSession = async (sessionId) => {
        try {
            await deleteSession(sessionId);
            const updatedSessions = sessions.filter((s) => s._id !== sessionId);
            setSessions(updatedSessions);
            if (activeSessionId === sessionId) {
                if (updatedSessions.length > 0) {
                    setActiveSessionId(updatedSessions[0]._id);
                    navigate(`/chat/${updatedSessions[0]._id}`);
                } else {
                    await handleNewChat();
                }
            }
        } catch (err) {
            console.error("Failed to delete session:", err);
        }
    };

    const handleSessionRenamed = (sessionId, newTitle) => {
        setSessions((prev) =>
            prev.map((s) => (s._id === sessionId ? { ...s, title: newTitle } : s))
        );
    };

    const handleFileUpload = async (file) => {
        if (!isAdmin) {
            alert("Only admins can upload documents");
            return;
        }
        try {
            const data = await uploadDocument(file);
            setUploadedFiles((prev) => [
                {
                    id: data.documentId,
                    name: file.name,
                    size: (file.size / 1024).toFixed(2) + " KB",
                    status: data.status,
                    uploadedBy: "You",
                },
                ...prev,
            ]);
        } catch (err) {
            console.error("Upload failed:", err);
        }
    };

    if (loadingSessions) {
        return (
            <div className="flex h-screen items-center justify-center bg-[#0F172A] text-gray-400">
                Loading...
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-[#0F172A] text-gray-100 overflow-hidden">

            {/* ─── MOBILE TOP BAR ─── */}
            <div className="lg:hidden fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-4 py-3 bg-[#0a192f] border-b border-gray-700">
                {/* Hamburger — opens sidebar */}
                <button
                    onClick={() => { setSidebarOpen(true); setFilesPanelOpen(false); }}
                    className="text-gray-400 hover:text-white transition-colors p-1"
                    aria-label="Open sidebar"
                >
                    <Menu size={20} />
                </button>

                <span className="text-sm font-bold text-blue-400 tracking-wide">OpsMind AI</span>

                {/* Files icon — opens files panel on mobile */}
                <button
                    onClick={() => { setFilesPanelOpen(true); setSidebarOpen(false); }}
                    className="text-gray-400 hover:text-white transition-colors p-1"
                    aria-label="Open files"
                >
                    <FolderOpen size={20} />
                </button>
            </div>

            {/* ─── BACKDROP (mobile/tablet) ─── */}
            {(sidebarOpen || filesPanelOpen) && (
                <div
                    className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
                    onClick={() => { setSidebarOpen(false); setFilesPanelOpen(false); }}
                />
            )}

            {/* ─── SIDEBAR ─── */}
            {/* Desktop: always visible, static */}
            {/* Mobile/tablet: slide-in drawer from left */}
            <div className={`
                fixed lg:static inset-y-0 left-0 z-50
                w-64 lg:w-auto lg:shrink-0
                transform transition-transform duration-300 ease-in-out
                ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
                lg:block lg:w-56 xl:w-64
                border-r border-gray-700
            `}>
                {/* Close button inside drawer on mobile */}
                <div className="lg:hidden flex justify-end p-2 bg-[#0a192f]">
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="text-gray-400 hover:text-white p-1"
                    >
                        <X size={18} />
                    </button>
                </div>
                <div className="h-full lg:h-screen">
                    <Sidebar
                        sessions={sessions}
                        activeSessionId={activeSessionId}
                        onNewChat={handleNewChat}
                        onSelectSession={handleSelectSession}
                        onDeleteSession={handleDeleteSession}
                        onSessionRenamed={handleSessionRenamed}
                    />
                </div>
            </div>

            {/* ─── MAIN CONTENT ─── */}
            <div className="flex-1 flex flex-col min-w-0 pt-12 lg:pt-0 overflow-hidden">
                <Outlet
                    context={{
                        handleFileUpload,
                        activeSessionId,
                        isAdmin,
                    }}
                />
            </div>

            {/* ─── FILES PANEL ─── */}
            {/* Desktop (lg+): always visible on right */}
            {/* Mobile/tablet: slide-in drawer from right */}
            <div className={`
                fixed lg:static inset-y-0 right-0 z-50
                w-64 lg:w-56 xl:w-64 shrink-0
                transform transition-transform duration-300 ease-in-out
                ${filesPanelOpen ? "translate-x-0" : "translate-x-full lg:translate-x-0"}
                lg:block
                border-l border-gray-700
            `}>
                {/* Close button inside drawer on mobile */}
                <div className="lg:hidden flex justify-start p-2 bg-[#0a192f]">
                    <button
                        onClick={() => setFilesPanelOpen(false)}
                        className="text-gray-400 hover:text-white p-1"
                    >
                        <X size={18} />
                    </button>
                </div>
                <div className="h-full lg:h-screen">
                    <FilesPanel
                        files={uploadedFiles}
                        isAdmin={isAdmin}
                        onFileUpload={handleFileUpload}
                    />
                </div>
            </div>
        </div>
    );
}

export default AppLayout;