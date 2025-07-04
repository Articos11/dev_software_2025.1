// src/components/SidebarNewButton.jsx
import React from 'react';

function NavAction({ text }) {
  return (
    <>
        <li className="flex items-center py-2 px-5 my-0.5 cursor-pointer">
            <span className="text-1xl w-6 text-center text-purple-600 leading-none">➕</span> 
            <span className="text-base font-medium flex-grow ps-2">{text}</span>
        </li>
    </>
  )
}

export default NavAction