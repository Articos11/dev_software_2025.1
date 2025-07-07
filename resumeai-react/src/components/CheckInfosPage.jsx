import React from "react";
import UserButton from "./UserButton";
import Sidebar from "./Sidebar/Sidebar";
import TextBox from "./TextBox";

function CheckInfosPage () {

    return (
      <div className='bg-white text-gray-800 h-screen w-screen flex'>
        <UserButton />
        <Sidebar/>
        <main className='flex-1 flex items-center relative p-6'>
          <div className='flex-grow max-h-45'></div>
          <div className='border flex space-between'>
            <TextBox />
            
          </div>
          <div className='flex-grow'></div>
        </main>
      </div>
    )
}

export default CheckInfosPage