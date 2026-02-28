import React from 'react'

const Rightbar = () => {
    return (
        <>
            <div >
                <label className='px-4 py-2 bg-blue-700
               hover:bg-blue-500 rounded-lg text-xs cursor-pointer text-center transition duration-200'>Upload File
                    <input type='file' className='hidden' />
                </label>
                <div className='flex-1 mt-4 overflow-auto space-y-2'>
                    <div className="bg-blue-500/20 p-2 rounded-md text-sm">
                        example.pdf
                    </div>
                </div>
            </div>
        </>
    )
}

export default Rightbar
