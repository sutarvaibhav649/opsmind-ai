import React, { useState, useRef, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import ChatMessages from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";
import { streamChat } from "../services/api";

function ChatPage() {
    const { handleFileUpload } = useOutletContext();
    const [messages, setMessages] = useState([]);
    const [isStreaming, setIsStreaming] = useState(false);

    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const handleSendMessage = async (userText) => {
        const messageId = Date.now();

        setMessages((prev) => [
        ...prev,
        { id: messageId, query: userText, answer: "", citations: [] },
        ]);

        setIsStreaming(true);

        try {
        const response = await streamChat(userText);

        if (!response.ok) throw new Error("Failed to connect");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let accumulatedAnswer = "";

        while (true) {
            const { value, done } = await reader.read();
            if (done) break;

            const chunk = decoder.decode(value);
            const lines = chunk.split("\n");

            for (const line of lines) {
            if (line.startsWith("data: ")) {
                const jsonStr = line.replace("data: ", "").trim();
                if (!jsonStr || jsonStr === "[DONE]") continue;

                const data = JSON.parse(jsonStr);

                if (data.type === "token") {
                accumulatedAnswer += data.token;

                setMessages((prev) =>
                    prev.map((msg) =>
                    msg.id === messageId
                        ? { ...msg, answer: accumulatedAnswer }
                        : msg
                    )
                );
                }

                if (data.type === "final") {
                setMessages((prev) =>
                    prev.map((msg) =>
                    msg.id === messageId
                        ? { ...msg, citations: data.citations }
                        : msg
                    )
                );
                }
            }
            }
        }
        } catch (error) {
        setMessages((prev) =>
            prev.map((msg) =>
            msg.id === messageId
                ? { ...msg, answer: "Error connecting to AI." }
                : msg
            )
        );
        }

        setIsStreaming(false);
    };

    return (
        <div className="flex flex-col h-full bg-[#05122b]">
        <div className="flex-1 overflow-y-auto px-6 py-4">
            {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center text-gray-500">
                Ask anything to start the chat...
            </div>
            ) : (
            messages.map((msg) => (
                <ChatMessages
                key={msg.id}
                query={msg.query}
                answer={msg.answer}
                citations={msg.citations}
                isStreaming={isStreaming}
                />
            ))
            )}
            <div ref={chatEndRef} />
        </div>

        <div className="border-t border-gray-700">
            <ChatInput
            onSendMessage={handleSendMessage}
            onFileUpload={handleFileUpload}
            />
        </div>
        </div>
    );
}

export default ChatPage;