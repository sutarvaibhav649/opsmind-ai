import React from 'react'
import { useState } from 'react';
const Leftbar = () => {

    const [chats,setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null);
    

  return (
    <>
        <div className='flex flex-col'>
          <button className='bg-blue-400 text-xs px-22 py-2 rounded-md'>NewChat</button>
          <br />
          <button className='bg-blue-400 text-xs px-22 py-2 rounded-md'>AllChats</button>

</div>

    </>
  )
}

export default Leftbar
