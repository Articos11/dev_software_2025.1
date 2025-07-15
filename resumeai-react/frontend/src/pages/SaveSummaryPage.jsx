import React, { useState } from "react";
import { Link } from "react-router-dom";
import PageHeaderSidebar from "../components/PageHeaderSidebar";
import CardBox from "../components/Uteis/CardBox";
import SettingsGroup from "../components/Ajuste/SettingsGroup";
import FlashcardThumbnails from "../components/Salvamento/FlashcardThumbnails";
import SelectDropdown from "../components/Uteis/SelectDropdown";

export default function SaveSummaryPage() {
  const projetosSalvos = [
    { value: "none", label: "Selecionar..." },
    { value: "project1", label: "Projeto 1" },
    { value: "project2", label: "Projeto 2" },
    { value: "project3", label: "Projeto 3" },
  ];

  const [text, setText] = useState(`Seu resumo aqui...`);

  return (
    <PageHeaderSidebar>
      <div className="flex-grow max-h-30"></div>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl align-middle">Aqui está seu resumo</h2>
        <span>
          <img src="src/assets/Ativo 4.svg" className="h-6 w-6 mt-1" />
        </span>
      </div>
      <div className="flex grow w-full p-6 gap-8 mt-8">
        {" "}
        <div className="flex flex-col grow w-full">
          <div className="w-full h-10 text-2xl pl-4 mb-2 font-bold">Titulo</div>
          <textarea
            className="bg-white rounded-[25px] p-5 size-full scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200 outline-none resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>{" "}
        </div>
        <CardBox className="max-w-[400px]">
          <SettingsGroup title="Flashcards">
            <FlashcardThumbnails />
          </SettingsGroup>
          <SettingsGroup title="Projeto">
            <SelectDropdown
              label="Salvar em algum projeto?"
              options={projetosSalvos}
            ></SelectDropdown>
          </SettingsGroup>
          <div className="flex-1" />
          <div className="w-full flex justify-center mt-10">
            <button className="bg-[var(--color-resumeai-teal)] text-white font-semibold px-3 py-2 w-50 rounded-full hover:bg-teal-500 shadow-sm">
              Salvar Resumo
            </button>
          </div>
          <div className="flex flex-col items-center justify-end mb-2 flex-1">
            <div className="flex gap-2 mt-2 items-center">
              <Link to="/conferir_texto">
                <button className="px-4 py-1 bg-gray-200 rounded-full text-gray-700 font-semibold hover:bg-gray-300">
                  Refazer
                </button>
              </Link>
            </div>
          </div>
        </CardBox>
      </div>
    </PageHeaderSidebar>
  );
}
