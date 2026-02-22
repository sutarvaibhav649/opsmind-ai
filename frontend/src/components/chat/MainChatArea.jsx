import React, { useState, useEffect, useRef } from 'react';
import ChatMessages from './ChatMessages';

const MainChatArea = () => {
    const [messages, setMessages] = useState([]); 
    const [userInput, setUserInput] = useState("");
    
    // 1. Create a reference for the bottom of the chat
    const chatEndRef = useRef(null);

    // 2. Scroll to bottom whenever the messages array updates
    const scrollToBottom = () => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const onSendMessage = () => {
        if (!userInput.trim()) return;
        
        const newMessage = {
            id: Date.now(),
            query: userInput,
            answer: "Processing your request..." 
        };

        setMessages([...messages, newMessage]);
        setUserInput("");
    };

    return (
        <div className="flex flex-col h-full bg-[#05122b]">
            {/* Display Area */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-[#11234a]">
                {messages.length === 0 ? (
                    // Optional: Placeholder when chat is empty
                    <div className="h-full flex items-center justify-center text-gray-500">
                        <p>Start a conversation by typing below.</p>
                    </div>
                ) : (
                    messages.map((msg) => (
                        <ChatMessages 
                            key={msg.id} 
                            query={msg.query} 
                            answer={msg.answer} 
                        />
                    ))
                )}
                {/* 3. Empty div to serve as the scroll anchor */}
                <div ref={chatEndRef} />
            </div>

            {/* Input Bar Section */}
            <div className="p-6">
                <div className="flex items-center bg-[#091837] rounded-xl px-4 py-3 border border-white/10 focus-within:border-blue-500/50 transition-all">
                    <input 
                        className="flex-1 bg-transparent outline-none text-white text-[16px]"
                        placeholder="Ask Anything..."
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && onSendMessage()}
                    />
                    <button 
                        onClick={onSendMessage}
                        className="bg-[#11234a] text-white px-6 py-2 rounded-lg font-bold hover:bg-[#1e3a8a] active:scale-95 transition-all"
                    >
                        send
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MainChatArea;