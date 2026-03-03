import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ChatPage from './pages/ChatPage';
import FilesPanel from './components/FilesPanel';

const Dashboard = () => {
    const [sessions, setSessions] = useState([
        { id: 1, title: "My First Chat" }
    ]);
    const [uploadedFiles, setUploadedFiles] = useState([]);

    const handleFileUpload = (file) => {
        const newFile = {
            id: Date.now(),
            name: file.name,
            size: (file.size / 1024).toFixed(2) + " KB"
        };
        setUploadedFiles((prev) => [...prev, newFile]);
    };

    const handleNewChat = () => {
        const newSession = {
            id: Date.now(),
            title: `Chat History ${sessions.length + 1}`
        };
        setSessions([newSession, ...sessions]);
    };

    return (
        <div className="flex h-screen w-full bg-[#05122b] overflow-hidden">
            {/* Left Sidebar */}
            <Sidebar 
                sessions={sessions} 
                onNewChat={handleNewChat} 
            />

            {/* Middle Chat Section */}
            <main className="flex-1 flex flex-col border-x border-gray-800">
                <ChatPage onFileUpload={handleFileUpload} />
            </main>

            {/* Right Files Panel */}
            <FilesPanel files={uploadedFiles} />
        </div>
    );
};

export default Dashboard;