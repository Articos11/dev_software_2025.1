// src/components/SidebarNewButton.jsx
import React from 'react';

function NavAction({ icon, text }) {
  return (
    <button class="w-full pl-4 flex items-center space-x-2 mb-1 py-1 rounded-md hover:bg-gray-100 transition">
      <span>{icon}</span><span>{text}</span>
    </button>
  )
}

export default NavAction