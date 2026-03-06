import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import FilesPanel from "../components/chat/FilesPanel";
import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import {
    getDocuments,
    uploadDocument,
    getSessions,
    createSession,
    deleteSession
    } from "../services/api";

    function AppLayout() {

    const { isAdmin, user } = useAuth();

    const [sessions, setSessions] = useState([]);
    const [activeSessionId, setActiveSessionId] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([]);
    const [loadingSessions, setLoadingSessions] = useState(true);

    const navigate = useNavigate();

    useEffect(() => {

        const init = async () => {

        try {

            const [docs, sessionList] = await Promise.all([
            getDocuments(),
            getSessions()
            ]);

            setUploadedFiles(
            docs.map(doc => ({
                id: doc._id,
                name: doc.originalName,
                size: doc.size ? (doc.size / 1024).toFixed(2) + " KB" : "",
                status: doc.status,
                uploadedBy: doc.userId === user?.userId ? "You" : "Admin"
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

        setSessions(prev => [session, ...prev]);

        setActiveSessionId(session._id);

        navigate(`/chat/${session._id}`);

        return session;

        } catch (err) {

        console.error("Failed to create session:", err);

        }

    };

    const handleSelectSession = (sessionId) => {

        setActiveSessionId(sessionId);

        navigate(`/chat/${sessionId}`);

    };

    const handleDeleteSession = async (sessionId) => {

        try {

        await deleteSession(sessionId);

        const updatedSessions = sessions.filter(
            s => s._id !== sessionId
        );

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

        setSessions(prev =>
        prev.map(s =>
            s._id === sessionId
            ? { ...s, title: newTitle }
            : s
        )
        );

    };

    const handleFileUpload = async (file) => {

        if (!isAdmin) {

        alert("Only admins can upload documents");

        return;

        }

        try {

        const data = await uploadDocument(file);

        setUploadedFiles(prev => [
            {
            id: data.documentId,
            name: file.name,
            size: (file.size / 1024).toFixed(2) + " KB",
            status: data.status,
            uploadedBy: "You"
            },
            ...prev
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

        <div className="grid grid-cols-12 lg:grid-cols-12 md:grid-cols-12 sm:grid-cols-1 h-screen bg-[#0F172A] text-gray-100 overflow-hidden">

            {/* Sidebar */}
            <div className="hidden md:block md:col-span-3 lg:col-span-2 border-r border-gray-700">

                <Sidebar
                    sessions={sessions}
                    activeSessionId={activeSessionId}
                    onNewChat={handleNewChat}
                    onSelectSession={handleSelectSession}
                    onDeleteSession={handleDeleteSession}
                    onSessionRenamed={handleSessionRenamed}
                />

            </div>

            {/* Main Content */}
            <div className="col-span-1 md:col-span-9 lg:col-span-8 flex flex-col h-full overflow-y-auto">

                <Outlet
                    context={{
                        handleFileUpload,
                        activeSessionId,
                        isAdmin
                    }}
                />

            </div>

            {/* Files Panel */}
            <div className="hidden lg:block lg:col-span-2 border-l border-gray-700">

                <FilesPanel
                    files={uploadedFiles}
                    isAdmin={isAdmin}
                    onFileUpload={handleFileUpload}
                />

            </div>

        </div>

    );

}

export default AppLayout;