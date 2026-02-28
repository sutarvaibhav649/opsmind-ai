import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import FilesPanel from "../components/chat/FilesPanel";
import { Outlet } from "react-router-dom";
import { getDocuments, uploadDocument } from "../services/api";

function AppLayout() {
    const [sessions, setSessions] = useState([
        { id: 1, title: "Initial Chat" },
    ]);

    const [uploadedFiles, setUploadedFiles] = useState([]);

    // 🔥 Fetch files on load
    useEffect(() => {
        const loadDocuments = async () => {
        try {
            const docs = await getDocuments();
            const formatted = docs.map((doc) => ({
                id: doc._id,
                name: doc.originalName,
                size: doc.size ? (doc.size / 1024).toFixed(2) + " KB" : "",
                status: doc.status
            }));
            setUploadedFiles(formatted);
        } catch (err) {
            console.error(err);
        }
        };

        loadDocuments();
    }, []);

    const handleFileUpload = async (file) => {
        try {
        const data = await uploadDocument(file);

        setUploadedFiles((prev) => [
            {
            id: data.documentId,
            name: file.name,
            size: (file.size / 1024).toFixed(2) + " KB",
            status: data.status,
            },
            ...prev,
        ]);
        } catch (err) {
        console.error("Upload failed:", err);
        }
    };

    const handleNewChat = () => {
        const newSession = {
        id: Date.now(),
        title: `Chat ${sessions.length + 1}`,
        };
        setSessions([newSession, ...sessions]);
    };

    return (
        <div className="grid grid-cols-12 h-screen bg-[#0F172A] text-gray-100 overflow-hidden">
        <div className="col-span-2 border-r border-gray-700">
            <Sidebar sessions={sessions} onNewChat={handleNewChat} />
        </div>

        <div className="col-span-8 flex flex-col h-full overflow-hidden">
            <Outlet context={{ handleFileUpload }} />
        </div>

        <div className="col-span-2 border-l border-gray-700">
            <FilesPanel files={uploadedFiles} />
        </div>
        </div>
    );
}

export default AppLayout;