import React from 'react'
import {Paperclip} from 'lucide-react'
const ChatInput = () => {
    return (
        <>
            <div className=' w-[80%] h-22 bg-[#11234a] m-auto rounded-[15px] overflow-hidden'>
                <div className='w-full h-[60%] p-2.5'>
                    <input
                        className='w-full h-full pl-1.5 focus:outline-none outline-white rounded-md'
                        type="text" 
                        placeholder='Ask Anything ...'
                    />
                </div>
                <div className='w-full h-[40%] flex justify-end align-middle'>
                    <div className=' hover:cursor-pointer transition-all'>
                        <Paperclip size={20} color="#ffffff" strokeWidth={1.5} />
                    </div>
                    <div className='mr-10'>
                        <button className='w-25 h-9 -translate-y-2.5 font-[30px] bg-[#08142f] rounded-[5px] ml-5 hover:cursor-pointer transition-all'>
                            send
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatInput