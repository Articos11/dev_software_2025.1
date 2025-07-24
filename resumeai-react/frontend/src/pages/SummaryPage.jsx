// src/pages/SummaryPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import PageHeaderSidebar from "../components/PageHeaderSidebar";
import PageHeader from "../components/PageHeader";
import Ativo29Icon from "../assets/Ativo 29.svg";

function SummaryPage({ allSummaries = [] }) {
  const { summaryId } = useParams(); // Pega o ID do resumo da URL

  // Encontra o resumo completo com base no summaryId
  const currentSummary = allSummaries.find((summary) => {
    // Adicionando .trim() para robustez na comparação
    const trimmedSummaryId = summaryId.trim();
    const trimmedSummaryDotId = summary.id.trim();
    return trimmedSummaryDotId === trimmedSummaryId;
  });

  // Se o resumo não for encontrado, exibe uma mensagem de erro
  if (!currentSummary) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center text-red-600">
        <p className="text-xl mb-4">
          Resumo com ID "{summaryId}" não encontrado.
        </p>
        <Link
          to="/resumos"
          className="block mt-4 text-blue-600 hover:underline"
        >
          Voltar para a lista de Resumos
        </Link>
      </div>
    );
  }

  return (
    <PageHeaderSidebar>
      {/* Cabeçalho da página (com o título do resumo) */}
      <PageHeader
        title="Resumos"
        icon={Ativo29Icon}
        breadcrumbs={[
          {
            label: "Início",
            href: "/",
            className:
              "text-gray-500 cursor-pointer hover:text-[var(--color-resumeai-blue)]",
          },
          {
            label: "Coleção de Resumos",
            href: "/resumos",
            className:
              "text-gray-500 cursor-pointer hover:text-[var(--color-resumeai-blue)]",
          },
          {
            label: currentSummary.title,
            className: "text-gray-700 text-semibold",
          },
        ]}
      />

      {/* Área principal de exibição do resumo */}
      {/* flex-grow para ocupar o espaço restante, p-8 para padding */}
      {/* overflow-y-auto para rolagem interna se o conteúdo for longo */}
      <h2 className="text-2xl mb-4 text-gray-800 mt-15 ml-23 self-start">
        {currentSummary.title}
      </h2>
      <div className="flex-grow px-23 overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <div className="bg-white shadow-md p-7 rounded-[35px]">
            {/*Seria uma boa ideia depois mudar essa fonte pra alguma mais confortavel pra leitura */}
          <p className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">
            {" "}
            {/* whitespace-pre-wrap para preservar quebras de linha */}
            {currentSummary.content}
          </p>
        </div>
      </div>
    </PageHeaderSidebar>
  );
}

export default SummaryPage;
