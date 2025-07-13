import React from "react";
import PageHeaderSidebar from "../components/PageHeaderSidebar";
import AjustesSection from "../components/Ajuste/AjustesSection";
import ConferirTextoSection from "../components/ConferirTextoSection";
import PromptSection from "../components/PromptSection";
import { Link } from "react-router-dom";

function CheckInfosPage() {
  return (
    <PageHeaderSidebar>
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
    </PageHeaderSidebar>
  );
}

export default CheckInfosPage;
