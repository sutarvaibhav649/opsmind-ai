import React from 'react'

const Middlebar = () => {
    return (
        <>
        <section className='flex flex-col flex-1 p-4'>
            <div className='flex-1 overflow-y-auto'>
                    message
            </div>
            <div className='flex  items-center  bg-blue-600 rounded-2xl px-3 py-1 gap-4'>

                <input
                    type="text"
                    placeholder="Ask anything..."
                    className="flex-1 bg-transparent outline-none text-xs"
                    
                />
                <button className='w-8 h-8 flex items-center justify-center rounded-full
                    bg-blue-600 hover:bg-blue-500 transition duration-200'>
                    +
                </button>
                <button className='px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm transition duration-200'>
                    send
                </button>
            
            </div>
            </section>
        </>
    )
}

export default Middlebar
