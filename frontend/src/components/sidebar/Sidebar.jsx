import { Notebook, Pencil } from 'lucide-react';
import UserProfile from '../UserProfile.jsx'; // Ensure path is correct

const Sidebar = () => {
    return (
        <div className="flex flex-col h-screen w-64 bg-[#0a192f] text-white overflow-hidden">
            
            <ul className='w-full flex flex-col'>
                <li className='flex mr-3 bg-[#11234a] mt-3 p-2.5 rounded-br-[5px] rounded-tr-[5px] hover:cursor-pointer hover:bg-[#132d68] transition-all group'>
                    <Pencil size={16} color="#ffffff" strokeWidth={1.5} className='mt-1'/> 
                    <p className='ml-3 font-bold'>New Chat</p>
                </li>
                <li className='flex mr-3 bg-[#11234a] mt-3 p-2.5 rounded-br-[5px] rounded-tr-[5px] hover:cursor-pointer hover:bg-[#132d68] transition-all'>
                    <Notebook size={20} color="#ffffff" strokeWidth={1.5} className='mt-0.5' />
                    <p className='font-bold ml-2.5'>All Chats</p>
                </li>
            </ul>

            <div className='flex-1 overflow-y-auto mt-4 
                            scrollbar-thin scrollbar-thumb-[#132d68] scrollbar-track-transparent hover:scrollbar-thumb-[#1e3a8a]'>
                <ul className='flex flex-col gap-1 px-2'>
                    {[...Array(15)].map((_, i) => (
                        <li key={i} className=' mr-1 p-2.5 text-sm text-gray-300 hover:bg-[#11234a] hover:text-white rounded-md cursor-pointer transition-colors'>
                            Chat History {i + 1}
                        </li>
                    ))}
                </ul>
            </div>
            
            <div className="mt-auto border-t border-gray-800">
                <UserProfile />
            </div>
        </div>
    )
}

export default Sidebar;