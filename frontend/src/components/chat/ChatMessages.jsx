import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ChatMessages = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMessage = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="flex flex-col gap-4 w-[95%] m-auto py-4">
            {/* --- Query Section --- */}
            <div className='w-[70%] p-3 rounded-xl flex flex-col transition-all border border-white/5'>
                <div className={`
                    flex w-full ml-auto bg-[#05122b] rounded-2xl p-3 transition-all duration-300 ease-in-out
                    ${isOpen ? 'max-h-250 overflow-visible' : 'max-h-12 overflow-hidden'}
                `}>
                    <p className='text-[16px] leading-tight text-gray-200'>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum, quod eligendi suscipit eius temporibus fugit! Voluptatibus atque quis, amet nulla vel, quibusdam iusto possimus illum repellendus aliquam consectetur eos modi exercitationem! Accusantium quaerat sed error, a soluta repellat officiis quas animi voluptate itaque incidunt, harum iusto, deleniti sunt blanditiis adipisci facere reprehenderit voluptas! Enim atque deserunt blanditiis aliquid, qui mollitia, itaque odit recusandae voluptates quam harum, id deleniti quo quas necessitatibus porro commodi perferendis libero. Iusto corporis, voluptatem odio provident minus tenetur!
                    </p>                
                </div>

                <div 
                    className='ml-auto mt-1 mr-2 hover:cursor-pointer p-1 hover:bg-[#11234a] rounded-full transition-colors w-fit' 
                    onClick={toggleMessage}
                >
                    <ChevronDown 
                        size={20} 
                        color="#ffffff" 
                        strokeWidth={1.5} 
                        className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
                    />
                </div>
            </div>

            {/* --- Answer Section (Dynamic Height) --- */}
            <div className='w-full bg-[#091837] p-4 rounded-xl border border-white/5'>
                <div className='flex flex-col gap-2'>
                    <p className='text-xs font-bold text-blue-400 uppercase tracking-wider'>AI Assistant</p>
                    
                    {/* This div will grow automatically based on the content length */}
                    <div className='h-auto w-full text-gray-200 leading-relaxed text-[16px]'>
                        <p>
                            This is the dynamic answer area. Because it uses <b>h-auto</b> (the default), 
                            it will expand vertically as more content is added. 
                        </p>
                        <br />
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod 
                            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
                            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
                            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
                            eu fugiat nulla pariatur.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatMessages;