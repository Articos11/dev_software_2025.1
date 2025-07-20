// src/components/SummaryBox.jsx
import React from "react";
import { Link } from "react-router-dom";
// Ícone padrão para Resumo (você pode substituir pelo seu)
import DefaultSummaryIcon from "../assets/Ativo 29.svg"; 
// Ícone da seta para a direita
import Ativo17Icon from "../assets/Ativo 17.svg"; 

export default function SummaryBox({
  title = "Título do Resumo",
  date = "DD/MM/YYYY",
  icon = DefaultSummaryIcon, // Usando um ícone padrão para resumos
  id,
}) {
  return (
    <Link
      to={`/summaries/${id}`} // Ajuste a rota para a página de detalhes de resumos
      className="flex bg-white shadow rounded-2xl w-full h-22 px-2 py-2 items-center cursor-pointer hover:bg-gray-100 transition-colors"
    >
      {/* Ícone: Garante que não encolhe (flex-shrink-0) para preservar seu tamanho */}
      <img
        src={icon}
        className="size-12 flex-shrink-0"
        alt="Ícone do Resumo"
      />

      {/* Container principal do texto e seta: Cresce para ocupar espaço, mas permite que o conteúdo encolha (min-w-0) */}
      <div className="flex items-center flex-grow min-w-0">
        {/* Container do Título e Data: Cresce, mas com min-w-0 para permitir ellipsis no span */}
        <div className="flex flex-col pl-2 flex-grow min-w-0">
          {/* Título: Aplica as classes de ellipsis e tem um min-w-0 implícito por ser filho de flex-grow min-w-0 */}
          <span className="text-xl text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </span>
          <span className="text-sm text-gray-500">Criado em {date}</span>
        </div>

        {/* Seta Direita: Garante que não encolhe (flex-shrink-0) e tem uma margem à esquerda */}
        <div className="flex flex-shrink-0 ml-2">
          <img src={Ativo17Icon} className="size-4" alt="Seta para avançar" />
        </div>
      </div>
    </Link>
  );
}