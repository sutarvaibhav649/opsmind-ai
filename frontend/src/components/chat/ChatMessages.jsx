import { FileText, ExternalLink, ChevronDown } from "lucide-react";
import { useState } from "react"; // ADD THIS IMPORT
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatMessages = ({ query, answer, citations = [], isStreaming }) => {
    const [showAllSources, setShowAllSources] = useState(false);
    const visibleCitations = showAllSources ? citations : citations.slice(0, 3);
    
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
                <p className="text-xs text-blue-400 font-bold uppercase mb-2 flex items-center gap-2">
                    <span>AI Assistant</span>
                    {isStreaming && (
                        <span className="flex gap-1">
                            <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0ms'}} />
                            <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '150ms'}} />
                            <span className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '300ms'}} />
                        </span>
                    )}
                </p>
                
                {/* FIXED: Use ReactMarkdown to render the answer */}
                <div className="text-gray-200 leading-relaxed prose prose-invert max-w-none">
                    <ReactMarkdown 
                        remarkPlugins={[remarkGfm]}
                        components={{
                            // Custom styling for markdown elements
                            strong: ({node, ...props}) => <strong className="text-blue-400 font-bold" {...props} />,
                            h1: ({node, ...props}) => <h1 className="text-xl font-bold text-white mb-2" {...props} />,
                            h2: ({node, ...props}) => <h2 className="text-lg font-bold text-white mb-2" {...props} />,
                            h3: ({node, ...props}) => <h3 className="text-md font-bold text-white mb-1" {...props} />,
                            p: ({node, ...props}) => <p className="mb-2 text-gray-200" {...props} />,
                            ul: ({node, ...props}) => <ul className="list-disc list-inside mb-2 text-gray-200" {...props} />,
                            ol: ({node, ...props}) => <ol className="list-decimal list-inside mb-2 text-gray-200" {...props} />,
                            li: ({node, ...props}) => <li className="mb-1" {...props} />,
                        }}
                    >
                        {answer || (isStreaming ? "Thinking..." : "")}
                    </ReactMarkdown>
                </div>
                
                {citations.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                        <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-2">
                                <FileText size={14} className="text-blue-400" />
                                <span className="text-xs uppercase text-gray-400">Sources ({citations.length})</span>
                            </div>
                            {citations.length > 3 && (
                                <button 
                                    onClick={() => setShowAllSources(!showAllSources)}
                                    className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1"
                                >
                                    {showAllSources ? 'Show less' : 'View all'}
                                    <ChevronDown size={12} className={`transform transition-transform ${showAllSources ? 'rotate-180' : ''}`} />
                                </button>
                            )}
                        </div>
                        
                        <div className="space-y-2">
                            {visibleCitations.map((cite, index) => (
                                <div 
                                    key={index}
                                    className="bg-[#0a1a3a] p-3 rounded-lg border border-blue-500/20 hover:border-blue-500/40 transition-all group"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2 text-xs mb-1">
                                                <span className="text-blue-400 font-mono">
                                                    #{index + 1}
                                                </span>
                                                <span className="text-gray-400">
                                                    {cite.filename || 'Document'} • Page {cite.pageNumber || 'N/A'}
                                                </span>
                                                <span className="text-green-400">
                                                    {(cite.score * 100).toFixed(0)}% match
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-300 line-clamp-2 group-hover:line-clamp-3 transition-all">
                                                {cite.excerpt || cite.text?.substring(0, 150)}...
                                            </p>
                                        </div>
                                        <button className="ml-2 p-1 hover:bg-blue-500/20 rounded">
                                            <ExternalLink size={12} className="text-gray-400" />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        {citations.length > 0 && (
                            <div className="mt-3 text-[10px] text-gray-500 text-right">
                                Confidence: {(citations.reduce((acc, c) => acc + (c.score || 0), 0) / citations.length * 100).toFixed(0)}% based on {citations.length} sources
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatMessages;