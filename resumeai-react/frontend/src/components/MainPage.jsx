import MainLogo from './MainLogo'
import ResizableInputBar from './ResizableInputBar'
import Sidebar from './Sidebar/Sidebar'
import UserButton from './UserButton'
import React from "react";

function MainPage () {
    return (
      <div className='bg-white text-gray-800 h-screen w-screen flex'>
        <UserButton />
        <Sidebar/>
        <main className='flex-1 flex flex-col items-center relative p-6'>
          <div className='flex-grow max-h-45'></div>
          <MainLogo />
          <div className='flex-grow'></div>
          <ResizableInputBar />
        </main>
      </div>
    )
}

export default MainPage