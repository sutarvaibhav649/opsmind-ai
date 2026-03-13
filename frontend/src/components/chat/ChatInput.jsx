import React, { useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';

const ChatInput = ({ onSendMessage, onFileUpload, disabled }) => {
    const fileInputRef = useRef(null);
    const [text, setText] = useState("");
    const { isAdmin } = useAuth();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && onFileUpload) {
            onFileUpload(file);
            e.target.value = null;
        }
    };

    const handleSend = () => {
        if (text.trim() && !disabled) {
            onSendMessage(text);
            setText("");
        }
    };

    return (
        <div className="p-3 sm:p-4 bg-[#0a192f]">
            {/* Hidden file input for admins */}
            {isAdmin && (
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    accept="application/pdf"
                />
            )}

            <div className={`flex items-center bg-[#05122b] rounded-xl px-3 sm:px-4 py-2 border transition-all ${
                disabled
                    ? "border-white/5 opacity-60"
                    : "border-white/10 focus-within:border-blue-500/50"
            }`}>
                <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && handleSend()}
                    className="flex-1 bg-transparent outline-none text-white p-1.5 sm:p-2 text-sm min-w-0"
                    placeholder={disabled ? "AI is responding..." : "Ask Anything..."}
                    disabled={disabled}
                />

                <div className="flex items-center gap-2 sm:gap-3 shrink-0 ml-2">
                    {/* Upload button — admins only */}
                    {isAdmin && (
                        <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-gray-400 hover:text-white transition-colors"
                            title="Upload PDF (Admin only)"
                            disabled={disabled}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                            </svg>
                        </button>
                    )}

                    <button
                        onClick={handleSend}
                        disabled={disabled || !text.trim()}
                        className="bg-[#11234a] text-white px-3 sm:px-5 py-1.5 rounded-lg text-xs sm:text-sm font-semibold hover:bg-[#1a3a7a] transition-colors disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                    >
                        Send
                    </button>
                </div>
            </div>

            {!isAdmin && (
                <p className="text-[10px] text-gray-500 mt-1.5 text-center">
                    💡 Only admins can upload documents. You can ask questions about existing documents.
                </p>
            )}
        </div>
    );
};

export default ChatInput;