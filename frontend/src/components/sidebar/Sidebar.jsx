import React from 'react';
import { useAuth } from '../../context/AuthContext';
import AdminKnowledgeGraph from '../KnowledgeGraph';
import { MessageSquare, PlusCircle, LogOut } from 'lucide-react';

const Sidebar = ({ sessions, activeSessionId, onNewChat, onSelectSession }) => {
    const { user, logout, isAdmin } = useAuth();

    return (
        <div className="flex flex-col h-full bg-[#0a192f] text-white">
            {/* User Info */}
            <div className="p-4 border-b border-gray-800">
                <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
                        <span className="text-sm font-bold">
                            {user?.email?.charAt(0).toUpperCase()}
                        </span>
                    </div>
                    <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium truncate" title={user?.email}>
                            {user?.email}
                        </p>
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

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-2">
                <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-2 px-2">
                    All Chats
                </p>
                <div className="space-y-1">
                    {sessions.map((session) => (
                        <button
                            key={session._id}
                            onClick={() => onSelectSession(session._id)}
                            className={`w-full text-left p-2 rounded-lg text-xs truncate transition-colors ${
                                activeSessionId === session._id
                                    ? 'bg-[#11234a] text-white'
                                    : 'text-gray-400 hover:bg-[#0a1a3a]'
                            }`}
                        >
                            <MessageSquare size={12} className="inline mr-2" />
                            {session.title}
                        </button>
                    ))}
                </div>
            </div>

            {/* Admin Knowledge Graph - Only visible to admins */}
            {isAdmin && (
                <div className="p-2 border-t border-gray-800">
                    <AdminKnowledgeGraph />
                </div>
            )}

            {/* Logout Button */}
            <div className="p-4 border-t border-gray-800">
                <button
                    onClick={logout}
                    className="w-full text-left text-xs text-gray-400 hover:text-white py-2 flex items-center gap-2"
                >
                    <LogOut size={14} />
                    Sign Out
                </button>
            </div>
        </div>
    );
};

export default Sidebar;