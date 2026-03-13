import { FileText, Copy, RotateCcw } from "lucide-react";
import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const ChatMessages = ({
    query,
    answer,
    citations = [],
    isStreaming,
    onRegenerate,
}) => {
    const [showAllSources, setShowAllSources] = useState(false);
    const visibleCitations = showAllSources ? citations : citations.slice(0, 3);

    const copyToClipboard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
        } catch (err) {
            console.error("Copy failed:", err);
        }
    };

    return (
        <div className="flex flex-col gap-3 w-full py-3 sm:py-4">
            {/* User message */}
            <div className="flex justify-end">
                <div className="w-full sm:w-[85%] md:w-[75%] lg:w-[70%] p-3 rounded-xl bg-[#091837] border border-white/5 group">
                    <div className="flex items-start justify-between gap-2">
                        <p className="text-gray-200 flex-1 text-sm sm:text-base wrap-break-word">{query}</p>
                        <button
                            onClick={() => copyToClipboard(query)}
                            className="opacity-0 group-hover:opacity-100 transition shrink-0"
                        >
                            <Copy size={14} className="text-gray-400 hover:text-white" />
                        </button>
                    </div>
                </div>
            </div>

            {/* Assistant message */}
            <div className="bg-[#091837] p-3 sm:p-4 rounded-xl border border-white/5">
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-xs text-blue-400 font-bold uppercase">
                        <span>AI Assistant</span>
                        {isStreaming && (
                            <span className="flex gap-1">
                                <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" />
                                <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                                <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                            </span>
                        )}
                    </div>
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => copyToClipboard(answer)}
                            className="text-gray-400 hover:text-white transition"
                        >
                            <Copy size={14} />
                        </button>
                        <button
                            onClick={onRegenerate}
                            className="text-gray-400 hover:text-white transition"
                        >
                            <RotateCcw size={14} />
                        </button>
                    </div>
                </div>

                <div className="text-gray-200 leading-relaxed prose prose-invert max-w-none text-sm sm:text-base">
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            strong: ({ node, ...props }) => (
                                <strong className="text-blue-400 font-bold" {...props} />
                            ),
                            h1: ({ node, ...props }) => (
                                <h1 className="text-xl font-bold text-white mb-2" {...props} />
                            ),
                            h2: ({ node, ...props }) => (
                                <h2 className="text-lg font-bold text-white mb-2" {...props} />
                            ),
                            h3: ({ node, ...props }) => (
                                <h3 className="text-md font-bold text-white mb-1" {...props} />
                            ),
                            p: ({ node, ...props }) => (
                                <p className="mb-2 text-gray-200" {...props} />
                            ),
                            ul: ({ node, ...props }) => (
                                <ul className="list-disc list-inside mb-2 text-gray-200" {...props} />
                            ),
                            ol: ({ node, ...props }) => (
                                <ol className="list-decimal list-inside mb-2 text-gray-200" {...props} />
                            ),
                            li: ({ node, ...props }) => (
                                <li className="mb-1" {...props} />
                            ),
                        }}
                    >
                        {answer || (isStreaming ? "Thinking..." : "")}
                    </ReactMarkdown>
                </div>

                {citations.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                            <FileText size={14} className="text-blue-400" />
                            <span className="text-xs uppercase text-gray-400">
                                Sources ({citations.length})
                            </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {visibleCitations.map((cite, index) => (
                                <div key={index} className="relative group">
                                    <button className="px-2 py-1 text-[10px] font-mono bg-[#11234a] text-blue-300 rounded-md hover:bg-[#1a3a7a] transition">
                                        {index + 1}
                                    </button>
                                    {/* Tooltip — flips up on mobile to avoid overflow */}
                                    <div className="
                                        absolute z-50
                                        hidden group-hover:block
                                        bottom-7 left-0
                                        w-44 sm:w-48
                                        bg-[#0a1a3a]
                                        border border-blue-500/20
                                        rounded-md p-2
                                        text-xs text-gray-200
                                        shadow-lg
                                        pointer-events-none
                                    ">
                                        <p className="font-semibold text-white truncate">
                                            {cite.filename || "Document"}
                                        </p>
                                        <p className="text-gray-400">Page {cite.pageNumber || "N/A"}</p>
                                        {cite.score && (
                                            <p className="text-green-400">
                                                Match {(cite.score * 100).toFixed(0)}%
                                            </p>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {citations.length > 3 && !showAllSources && (
                                <span
                                    onClick={() => setShowAllSources(true)}
                                    className="text-[10px] text-blue-400 cursor-pointer hover:text-blue-300 self-center"
                                >
                                    +{citations.length - 3} more
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatMessages;