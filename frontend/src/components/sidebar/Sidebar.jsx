import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { renameSession } from '../../services/api';
import { LayoutDashboard, MessageSquare, PlusCircle, LogOut, Trash2, Edit, X } from 'lucide-react';
import { useNavigate } from "react-router-dom";

const Sidebar = ({
    sessions,
    activeSessionId,
    onNewChat,
    onSelectSession,
    onDeleteSession,
    onSessionRenamed,
}) => {
    const { user, logout, isAdmin } = useAuth();
    const [editingId, setEditingId] = useState(null);
    const [tempTitle, setTempTitle] = useState("");
    const navigate = useNavigate();
    const [deleteModal, setDeleteModal] = useState({ open: false, sessionId: null });

    const startRename = (session) => {
        setEditingId(session._id);
        setTempTitle(session.title);
    };

    const submitRename = async () => {
        if (!tempTitle.trim()) return;
        try {
            await renameSession(editingId, tempTitle);
            onSessionRenamed(editingId, tempTitle);
        } catch (err) {
            console.error("Rename failed:", err);
        }
        setEditingId(null);
    };

    const openDeleteModal = (sessionId) => {
        setDeleteModal({ open: true, sessionId });
    };

    const confirmDelete = async () => {
        try {
            await onDeleteSession(deleteModal.sessionId);
        } catch (err) {
            console.error("Delete failed:", err);
        }
        setDeleteModal({ open: false, sessionId: null });
    };

    return (
        <div className="flex flex-col h-full bg-[#0a192f] text-white overflow-hidden">
            {/* USER INFO */}
            <div className="p-3 sm:p-4 border-b border-gray-800 shrink-0">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
                        <span className="text-sm font-bold">
                            {user?.email?.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate">{user?.email}</p>
                        {isAdmin && (
                            <span className="text-[10px] bg-blue-500/20 text-blue-400 px-1.5 py-0.5 rounded-full">
                                Admin
                            </span>
                        )}
                    </div>
                </div>
                <button
                    onClick={onNewChat}
                    className="w-full bg-[#11234a] hover:bg-[#1a3a7a] rounded-lg py-2 px-3 flex items-center justify-center gap-2 text-xs transition-colors"
                >
                    <PlusCircle size={14} />
                    New Chat
                </button>
            </div>

            {/* CHAT HISTORY */}
            <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-[#132d68] scrollbar-track-transparent">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 px-2">
                    All Chats
                </p>
                <div className="space-y-1">
                    {sessions.map((session) => (
                        <div
                            key={session._id}
                            className={`group flex items-center justify-between p-2 rounded-lg text-xs transition-colors cursor-pointer ${
                                activeSessionId === session._id
                                    ? 'bg-[#11234a] text-white'
                                    : 'text-gray-400 hover:bg-[#0a1a3a]'
                            }`}
                        >
                            <div
                                className="flex items-center flex-1 truncate min-w-0"
                                onClick={() => onSelectSession(session._id)}
                            >
                                <MessageSquare size={12} className="mr-2 shrink-0" />
                                {editingId === session._id ? (
                                    <input
                                        autoFocus
                                        value={tempTitle}
                                        onChange={(e) => setTempTitle(e.target.value)}
                                        onBlur={submitRename}
                                        onKeyDown={(e) => e.key === "Enter" && submitRename()}
                                        className="bg-transparent outline-none text-xs border-b border-blue-400 flex-1 min-w-0"
                                    />
                                ) : (
                                    <span className="truncate">{session.title}</span>
                                )}
                            </div>
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition shrink-0 ml-1">
                                <button
                                    onClick={() => startRename(session)}
                                    className="hover:text-blue-400 p-0.5"
                                >
                                    <Edit size={12} />
                                </button>
                                <button
                                    onClick={() => openDeleteModal(session._id)}
                                    className="hover:text-red-400 p-0.5"
                                >
                                    <Trash2 size={12} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* ADMIN TOOLS */}
            {isAdmin && (
                <div className="p-2 border-t border-gray-800 shrink-0">
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 px-2">
                        Admin Tools
                    </p>
                    <button
                        onClick={() => navigate("/admin")}
                        className="w-full text-left p-2 rounded-lg text-xs text-gray-400 hover:bg-[#0a1a3a] flex items-center gap-2 transition-colors"
                    >
                        <LayoutDashboard size={12} />
                        Dashboard
                    </button>
                </div>
            )}

            {/* LOGOUT */}
            <div className="p-3 sm:p-4 border-t border-gray-800 shrink-0">
                <button
                    onClick={logout}
                    className="w-full text-left text-xs text-gray-400 hover:text-white py-2 flex items-center gap-2 transition-colors"
                >
                    <LogOut size={14} />
                    Sign Out
                </button>
            </div>

            {/* DELETE MODAL */}
            {deleteModal.open && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-[#0f1f3d] p-5 sm:p-6 rounded-lg w-full max-w-[320px] border border-white/10">
                        <h3 className="text-sm font-semibold mb-3">Delete Chat</h3>
                        <p className="text-xs text-gray-400 mb-5">
                            Are you sure you want to delete this chat? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-2">
                            <button
                                onClick={() => setDeleteModal({ open: false, sessionId: null })}
                                className="px-3 py-1 text-xs bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={confirmDelete}
                                className="px-3 py-1 text-xs bg-red-600 rounded hover:bg-red-500 transition-colors"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;