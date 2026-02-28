import { useState } from 'react';
import { Notebook, Pencil, Trash2, Check, X } from 'lucide-react';
import UserProfile from '../UserProfile.jsx';
import { renameSession } from '../../services/api';

const Sidebar = ({
    sessions = [],
    activeSessionId,
    onNewChat,
    onSelectSession,
    onDeleteSession,
    onSessionRenamed
}) => {
    const [editingId, setEditingId] = useState(null);
    const [editTitle, setEditTitle] = useState("");

    const startEdit = (e, session) => {
        e.stopPropagation();
        setEditingId(session._id);
        setEditTitle(session.title);
    };

    const cancelEdit = (e) => {
        e.stopPropagation();
        setEditingId(null);
    };

    const confirmEdit = async (e, sessionId) => {
        e.stopPropagation();
        if (!editTitle.trim()) return cancelEdit(e);
        try {
            await renameSession(sessionId, editTitle.trim());
            onSessionRenamed(sessionId, editTitle.trim());
        } catch (err) {
            console.error("Rename failed:", err);
        }
        setEditingId(null);
    };

    return (
        <div className="flex flex-col h-screen w-full bg-[#0a192f] text-white overflow-hidden">
            <ul className='w-full flex flex-col'>
                <li
                    onClick={onNewChat}
                    className='flex mr-3 bg-[#11234a] mt-3 p-2.5 rounded-br-[5px] rounded-tr-[5px] hover:cursor-pointer hover:bg-[#132d68] transition-all'
                >
                    <Pencil size={16} color="#ffffff" strokeWidth={1.5} className='mt-1' />
                    <p className='ml-3 font-bold'>New Chat</p>
                </li>
                <li className='flex mr-3 bg-[#11234a] mt-3 p-2.5 rounded-br-[5px] rounded-tr-[5px]'>
                    <Notebook size={20} color="#ffffff" strokeWidth={1.5} className='mt-0.5' />
                    <p className='font-bold ml-2.5'>All Chats</p>
                </li>
            </ul>

            <div className='flex-1 overflow-y-auto mt-4 scrollbar-thin scrollbar-thumb-[#132d68] scrollbar-track-transparent'>
                <ul className='flex flex-col gap-1 px-2'>
                    {sessions.map((chat) => (
                        <li
                            key={chat._id}
                            onClick={() => onSelectSession(chat._id)}
                            className={`group relative flex items-center mr-1 p-2.5 text-sm rounded-md cursor-pointer transition-colors ${
                                activeSessionId === chat._id
                                    ? "bg-[#1e3a8a] text-white"
                                    : "text-gray-300 hover:bg-[#11234a] hover:text-white"
                            }`}
                        >
                            {editingId === chat._id ? (
                                // Inline rename input
                                <div className="flex items-center gap-1 w-full" onClick={e => e.stopPropagation()}>
                                    <input
                                        autoFocus
                                        value={editTitle}
                                        onChange={e => setEditTitle(e.target.value)}
                                        onKeyDown={e => {
                                            if (e.key === "Enter") confirmEdit(e, chat._id);
                                            if (e.key === "Escape") cancelEdit(e);
                                        }}
                                        className="flex-1 bg-[#0a192f] text-white text-xs px-1 py-0.5 rounded outline-none border border-blue-500/50"
                                    />
                                    <button onClick={e => confirmEdit(e, chat._id)}>
                                        <Check size={12} className="text-green-400 hover:text-green-300" />
                                    </button>
                                    <button onClick={cancelEdit}>
                                        <X size={12} className="text-red-400 hover:text-red-300" />
                                    </button>
                                </div>
                            ) : (
                                <>
                                    <span className="flex-1 truncate">{chat.title || "New Chat"}</span>
                                    {/* Action buttons shown on hover */}
                                    <div className="hidden group-hover:flex items-center gap-1 ml-1 shrink-0">
                                        <button
                                            onClick={e => startEdit(e, chat)}
                                            className="text-gray-400 hover:text-white"
                                            title="Rename"
                                        >
                                            <Pencil size={11} />
                                        </button>
                                        <button
                                            onClick={e => { e.stopPropagation(); onDeleteSession(chat._id); }}
                                            className="text-gray-400 hover:text-red-400"
                                            title="Delete"
                                        >
                                            <Trash2 size={11} />
                                        </button>
                                    </div>
                                </>
                            )}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="mt-auto border-t border-gray-800">
                <UserProfile />
            </div>
        </div>
    );
};

export default Sidebar;