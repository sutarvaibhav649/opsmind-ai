import React from 'react'

const FilesPanel = () => {
    return (
        <div className='flex flex-col h-screen bg-[#0a192f] text-white overflow-hidden'>
            
            {/* Header Section */}
            <div className='flex flex-col'>
                <ul>
                    <li className='flex ml-3 bg-[#11234a] mt-3 p-2.5 rounded-bl-[5px] rounded-tl-[5px] hover:cursor-pointer hover:bg-[#132d68] transition-all group font-bold'>
                        Uploaded Files
                    </li>
                </ul>
            </div>

            {/* Scrollable Content Section */}
            <div className='flex-1 overflow-y-auto mt-4 
                            scrollbar-thin scrollbar-thumb-[#132d68] scrollbar-track-transparent 
                            hover:scrollbar-thumb-[#1e3a8a]'>
                <ul className='flex flex-col gap-1 px-2'>
                    {[...Array(20)].map((_, i) => (
                        <li 
                            key={i} 
                            className='mr-1 p-2.5 text-sm text-gray-400 hover:bg-[#11234a] hover:text-white rounded-md cursor-pointer transition-all'
                        >
                            Document_{i + 1}.pdf
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default FilesPanel