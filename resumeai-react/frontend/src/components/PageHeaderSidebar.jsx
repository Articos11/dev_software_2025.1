import React from "react";
import UserButton from "./UserButton";
import Sidebar from "./Sidebar/Sidebar";

// Componente que agrupa UserButton e Sidebar
export default function PageHeaderSidebar({ children }) {
  return (
    <div className="bg-gray-50 text-gray-800 h-screen w-screen flex">
      <UserButton />
      <Sidebar />
      <main className="flex-1 flex flex-col items-center p-6 pl-2 pb-12">
        {children}
      </main>
    </div>
  );
}
