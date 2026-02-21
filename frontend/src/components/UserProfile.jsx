import React from 'react'

const UserProfile = () => {
    return (
        // Removed translate-y and relative; using standard padding/border instead
        <div className='w-full p-4 bg-[#11234a] border-t border-gray-700 flex flex-col gap-3'>
            <div className='flex items-center'>
                <div className='h-8 w-8 rounded-full bg-white mr-3 overflow-hidden border border-black cursor-pointer'>
                    <img src="/vite.svg" alt="User" className="w-full h-full object-cover" />
                </div>
                <p className='text-sm truncate'>email@gmail.com</p>
            </div>
            
            <button className='border border-white/50 py-1.5 px-4 rounded-lg hover:cursor-pointer transition-all text-sm w-full'>
                Sign Out
            </button>
        </div>
    )
}

export default UserProfile;