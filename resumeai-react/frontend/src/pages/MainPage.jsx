import MainLogo from "../components/MainLogo";
import ResizableInputBar from "../components/ResizableInputBar";
import Sidebar from "../components/Sidebar/Sidebar";
import UserButton from "../components/UserButton";
import SidebarTeste from "./SidebarTeste";
import React from "react";

function MainPage() {
  return (
    <div className="bg-gray-50 text-gray-800 h-screen w-screen flex">
      <UserButton />
      <Sidebar />
      <main className="flex-1 flex flex-col items-center relative p-6">
        <div className="flex-grow max-h-45"></div>
        <MainLogo />
        <div className="flex-grow"></div>
        <ResizableInputBar />
      </main>
    </div>
  );
}

export default MainPage;
