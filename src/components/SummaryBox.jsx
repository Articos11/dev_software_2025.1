import React from "react";
import { Link } from "react-router-dom";
import DefaultSummaryIcon from "../assets/Ativo 29.svg";
import Ativo17Icon from "../assets/Ativo 17.svg";

export default function SummaryBox({
  title = "Título do Resumo",
  date = "DD/MM/YYYY",
  icon = DefaultSummaryIcon,
  id,
  onDownload,  // função para download do PDF
}) {
  return (
    <div className="flex bg-white shadow rounded-2xl flex-grow max-h-22 px-2 py-2 items-center cursor-pointer hover:bg-gray-100 transition-colors">
      <Link
        to={`/summaries/${id}`}
        className="flex items-center flex-grow min-w-0"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <img src={icon} className="size-12 flex-shrink-0" alt="Ícone do Resumo" />

        <div className="flex flex-col pl-2 flex-grow min-w-0">
          <span className="text-xl text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </span>
          <span className="text-sm text-gray-500">Criado em {date}</span>
        </div>
      </Link>

      <button
        onClick={onDownload}
        className="ml-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        type="button"
      >
        Baixar PDF
      </button>

      <div className="flex flex-shrink-0 ml-2">
        <img src={Ativo17Icon} className="size-4" alt="Seta para avançar" />
      </div>
    </div>
  );
}
