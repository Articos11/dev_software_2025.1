// src/components/SidebarNewButton.jsx
import React from "react";

function NavAction({ icon, text }) {
  return (
    <button class="w-full pl-4 flex items-center space-x-3 mb-1 py-1 rounded-md hover:bg-gray-100 transition">
      <img src={icon} className="w-4 h-4"></img>
      <span>{text}</span>
    </button>
  );
}

export default NavAction;
