import ChatMessages from "../components/chat/ChatMessages";
import ChatInput from "../components/chat/ChatInput";

function ChatPage() {
    return (
        <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto px-6 py-4">
            <ChatMessages />
        </div>

        <div className="border-t border-gray-700 px-6 py-4">
            <ChatInput />
        </div>
        </div>
    );
}

export default ChatPage;