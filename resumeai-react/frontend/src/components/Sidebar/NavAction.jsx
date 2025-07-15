// src/components/SidebarNewButton.jsx
import React from "react";

function NavAction({ icon, text }) {
  return (
    <div class="w-full pl-3 flex items-center space-x-3 mb-1 py-1 rounded-md transition font-['Sofia Pro']">
      <img src={icon} className="w-4 h-4"></img>
      <span>{text}</span>
    </div>
  );
}

export default NavAction;
