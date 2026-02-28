import { FileText } from "lucide-react";

const ChatMessages = ({ query, answer, citations = [], isStreaming }) => {
    return (
        <div className="flex flex-col gap-4 w-full py-4">
            {/* User message */}
            <div className="flex justify-end">
                <div className="w-[70%] p-3 rounded-xl bg-[#091837] border border-white/5">
                    <p className="text-gray-200">{query}</p>
                </div>
            </div>

            {/* Assistant message */}
            <div className="bg-[#091837] p-4 rounded-xl border border-white/5">
                <p className="text-xs text-blue-400 font-bold uppercase mb-2">
                    AI Assistant
                </p>
                <div className="text-gray-200 leading-relaxed">
                    {answer}
                    {/* FIX: isStreaming cursor only shown when this specific message is streaming */}
                    {isStreaming && <span className="animate-pulse ml-1">▍</span>}
                </div>

                {citations.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                            <FileText size={14} />
                            <span className="text-xs uppercase text-gray-500">Sources</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {citations.map((cite, index) => (
                                <div
                                    key={index}
                                    className="bg-[#05122b] px-2 py-1 rounded-md text-xs border border-blue-500/20"
                                >
                                    Page {cite.pageNumber} | Match:{" "}
                                    {(cite.score * 100).toFixed(0)}%
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatMessages;