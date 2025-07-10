import React from "react";
import UserButton from "../components/UserButton";
import Sidebar from "../components/Sidebar/Sidebar";
import AjustesSection from "../components/AjustesSection";
import ConferirTextoSection from "../components/ConferirTextoSection";

function CheckInfosPage() {
  return (
    <div className="bg-gray-50 text-gray-800 h-screen w-screen flex">
      <UserButton />
      <Sidebar />
      <main className="flex-1 flex flex-col items-center p-6 pl-2 pb-12">
        <div className="flex-grow max-h-45"></div>
        <div className="flex flex-grow space-between gap-8 w-full p-4">
          <AjustesSection />
          <ConferirTextoSection />
        </div>
        <button className="self-end mr-4 bg-teal-400 text-white font-bold px-3 py-2 rounded-full hover:bg-teal-500 shadow-sm">
          Prosseguir
        </button>
      </main>
    </div>
  );
}

export default CheckInfosPage;
