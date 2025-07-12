import React from "react";
import UserButton from "../components/UserButton";
import Sidebar from "../components/sidebar/Sidebar";
import AjustesSection from "../components/AjustesSection";
import ConferirTextoSection from "../components/ConferirTextoSection";
import PromptSection from "../components/PromptSection";
import { Link } from "react-router-dom";

function CheckInfosPage() {
  return (
    <div className="bg-gray-50 text-gray-800 h-screen w-screen flex">
      <UserButton />
      <Sidebar />
      <main className="flex-1 flex flex-col items-center p-6 pl-2 pb-12">
        <div className="flex-grow max-h-45"></div>
        <div className="flex flex-grow space-between gap-6 w-full p-4">
          <ConferirTextoSection />
          <AjustesSection />
          <div className="flex flex-col grow-[2]">
            <PromptSection />
            <Link to="/salvar_resumo">
              <button className="bg-[var(--color-resumeai-teal)] text-white font-bold px-3 py-2 w-32 rounded-full hover:bg-teal-500 shadow-sm">
                Prosseguir
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CheckInfosPage;
