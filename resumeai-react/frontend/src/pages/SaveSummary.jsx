import React from "react";
import UserButton from "../components/UserButton";
import Sidebar from "../components/sidebar/Sidebar";

export default function SaveSummary() {
  return (
    <div className="bg-gray-50 text-gray-800 h-screen w-screen flex">
      <UserButton />
      <Sidebar />
      {/* Adicione aqui o conteúdo principal da página */}
      <main className="flex-1 flex flex-col items-center p-6 pl-2 pb-12">
        <div className="flex-grow max-h-45"></div>
      </main>
    </div>
  );
}
