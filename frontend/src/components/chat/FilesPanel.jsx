import React from 'react';

const FilesPanel = ({ files = [] }) => {
    return (
        <div className='flex flex-col h-screen w-64 bg-[#0a192f] text-white border-l border-gray-800 overflow-hidden'>
            <div className='p-4 border-b border-gray-800'>
                <h2 className='font-bold text-sm uppercase tracking-widest text-blue-400'>
                    Uploaded Files
                </h2>
            </div>
            <div className='flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-[#132d68] scrollbar-track-transparent'>
                <ul className='flex flex-col gap-2'>
                    {files.length === 0 ? (
                        <p className="text-gray-500 text-xs text-center mt-10">
                            No files uploaded yet.
                        </p>
                    ) : (
                        files.map((file) => (
                            <li
                                key={file.id}
                                className='p-2 bg-[#11234a]/50 rounded text-xs truncate border border-white/5 hover:border-blue-500/50 transition-all group'
                            >
                                <div className="flex flex-col">
                                    <span className="text-gray-200 font-medium truncate">
                                        {file.name}
                                    </span>
                                    <span className="text-gray-500 text-[10px]">
                                        {file.size}
                                        {file.status && (
                                            <span className={`ml-2 ${file.status === 'processed' ? 'text-green-400' : file.status === 'failed' ? 'text-red-400' : 'text-yellow-400'}`}>
                                                • {file.status}
                                            </span>
                                        )}
                                    </span>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </div>
        </div>
    );
};

export default FilesPanel;