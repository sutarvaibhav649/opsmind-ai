import React from 'react';
import { useAuth } from "../context/AuthContext";

const UserProfile = () => {
    const { logout, user } = useAuth();

    return (
        <div className='w-full p-4 bg-[#11234a] border-t border-gray-700 flex flex-col gap-3'>
            <div className='flex items-center'>
                <div className='h-8 w-8 rounded-full bg-white mr-3 overflow-hidden border border-black shrink-0'>
                    <img src="/vite.svg" alt="User" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0"> {/* Add min-w-0 for text truncation */}
                    <p className='text-sm truncate' title={user?.email}>
                        {user?.email || "Loading..."}
                    </p>
                </div>
            </div>
            <button
                onClick={logout}
                className='border border-white/50 py-1.5 px-4 rounded-lg transition-all text-sm w-full hover:bg-red-600/20'
            >
                Sign Out
            </button>
        </div>
    );
};

export default UserProfile;