import React from "react";
import { Link } from "react-router-dom";
import DefaultSummaryIcon from "../assets/Ativo_29.svg";
import Ativo17Icon from "../assets/Ativo_17.svg";

export default function SummaryBox({
  title = "Título do Resumo",
  date = "DD/MM/YYYY",
  icon = DefaultSummaryIcon, // Usando um ícone padrão para resumos
  id,
}) {
  return (
    <Link
      to={`/resumos/${id}`}
      className="flex bg-white shadow rounded-2xl flex-grow max-h-22 px-2 py-2 items-center cursor-pointer hover:bg-gray-100 transition-colors"
    >
      <img src={icon} className="size-12 flex-shrink-0" alt="Ícone do Resumo" />

      <div className="flex items-center flex-grow min-w-0">
        <div className="flex flex-col pl-2 flex-grow min-w-0">
          {/* tem algum problema com essa elipsis, não descobri ainda */}
          <span className="text-xl text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </span>
          <span className="text-sm text-gray-500">Criado em {date}</span>
        </div>

        <div className="flex flex-shrink-0 ml-2">
          <img src={Ativo17Icon} className="size-4" alt="Seta para avançar" />
        </div>
      </div>
    </Link>
  );
}
