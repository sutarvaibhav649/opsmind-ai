import React, { useRef } from 'react';
import { FileText, Upload, Shield, Eye, User } from 'lucide-react';

const FilesPanel = ({ files = [], isAdmin = false, onFileUpload }) => {
    const fileInputRef = useRef(null);

    return (
        <div className="flex flex-col h-full bg-[#0a192f] text-white border-l border-gray-800 overflow-hidden">
            {/* Header */}
            <div className="p-3 sm:p-4 border-b border-gray-800 shrink-0">
                <h2 className="font-bold text-sm uppercase tracking-widest text-blue-400 flex items-center justify-between">
                    <span>Knowledge Base</span>
                    {!isAdmin && <Eye size={14} className="text-gray-400" />}
                </h2>
            </div>

            {/* Upload section — admins only */}
            {isAdmin && (
                <div className="p-3 border-b border-gray-800 shrink-0">
                    <button
                        onClick={() => fileInputRef.current?.click()}
                        className="w-full bg-[#11234a] hover:bg-[#1a3a7a] rounded-lg py-2 px-3 flex items-center justify-center gap-2 text-xs transition-colors"
                    >
                        <Upload size={14} />
                        Upload Document
                    </button>
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={(e) => {
                            if (e.target.files[0] && onFileUpload) {
                                onFileUpload(e.target.files[0]);
                            }
                        }}
                        className="hidden"
                        accept="application/pdf"
                    />
                    <p className="text-[10px] text-gray-500 mt-2">PDF files only (max 10MB)</p>
                </div>
            )}

            {/* Files list */}
            <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-[#132d68] scrollbar-track-transparent">
                <div className="flex items-center justify-between mb-2 px-1">
                    <span className="text-xs text-gray-400">Documents ({files.length})</span>
                </div>

                {files.length === 0 ? (
                    <div className="text-center mt-10 px-4">
                        <FileText size={24} className="text-gray-600 mx-auto mb-2" />
                        <p className="text-gray-500 text-xs">
                            {isAdmin
                                ? "No documents yet. Upload PDFs to get started."
                                : "No documents available. Check back later."}
                        </p>
                    </div>
                ) : (
                    <ul className="flex flex-col gap-2">
                        {files.map((file) => (
                            <li
                                key={file.id}
                                className="p-2 bg-[#11234a]/50 rounded text-xs border border-white/5 hover:border-blue-500/50 transition-all group"
                            >
                                <div className="flex flex-col">
                                    <div className="flex items-center gap-1">
                                        <FileText size={12} className="text-blue-400 shrink-0" />
                                        <span className="text-gray-200 font-medium truncate" title={file.name}>
                                            {file.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between mt-1 pl-4">
                                        <span className="text-gray-500 text-[10px]">{file.size}</span>
                                        {file.status && (
                                            <span className={`text-[10px] ${
                                                file.status === 'processed' ? 'text-green-400' :
                                                file.status === 'failed' ? 'text-red-400' :
                                                'text-yellow-400'
                                            }`}>
                                                {file.status === 'processed' ? 'Ready' : file.status}
                                            </span>
                                        )}
                                    </div>
                                    {file.uploadedBy && (
                                        <div className="flex items-center gap-1 mt-1 pl-4">
                                            <User size={8} className="text-gray-500" />
                                            <span className="text-[8px] text-gray-500">
                                                Uploaded by: {file.uploadedBy}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Read-only notice for regular users */}
            {!isAdmin && files.length > 0 && (
                <div className="p-3 border-t border-gray-800 bg-[#0a1a3a] shrink-0">
                    <div className="flex items-start gap-2">
                        <Shield size={12} className="text-blue-400 mt-0.5 shrink-0" />
                        <p className="text-[10px] text-gray-400">
                            You're in read-only mode. You can view and query these documents.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilesPanel;