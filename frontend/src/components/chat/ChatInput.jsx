import React, { useState, useRef } from 'react';

const ChatInput = ({ onSendMessage, onFileUpload }) => {
    const fileInputRef = useRef(null);
    const [text, setText] = useState("");

    // This handles the actual file selection after the explorer opens
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && onFileUpload) {
            onFileUpload(file);
            // Reset the input value so the same file can be uploaded twice if needed
            e.target.value = null;
        }
    };
    
    // This remotely clicks the hidden file input
    const handleIconClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleSend = () => {
        if (text.trim()) {
            onSendMessage(text);
            setText("");
        }
    };

    return (
        <div className="p-4 bg-[#0a192f]">
            {/* 1. Hidden Input Field - The actual worker */}
            <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
            />

            <div className="flex items-center bg-[#05122b] rounded-xl px-4 py-2 border border-white/10 focus-within:border-blue-500/50 transition-all">
                {/* 2. Text Input */}
                <input 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    className="flex-1 bg-transparent outline-none text-white p-2 text-sm"
                    placeholder="Ask Anything ..."
                />
                
                <div className="flex items-center gap-3">
                    {/* 3. Paperclip Button - Triggers the hidden input via Ref */}
                    <button 
                        type="button"
                        onClick={handleIconClick}
                        className="text-gray-400 hover:text-white transition-colors"
                        title="Upload file"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                        </svg>
                    </button>

                    {/* 4. Send Button */}
                    <button 
                        onClick={handleSend} 
                        className="bg-[#11234a] text-white px-5 py-1.5 rounded-lg text-sm font-semibold hover:bg-[#1a3a7a] transition-colors"
                    >
                        send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;