// src/components/FlashcardBox.jsx
import React from "react";
import { Link } from "react-router-dom";
import Ativo29Icon from "../assets/Ativo 29.svg";
import Ativo17Icon from "../assets/Ativo 17.svg";

export default function FlashcardBox({
  title = "Titulo",
  date = "data",
  icon = Ativo29Icon,
  id,
}) {
  return (
    <Link
      to={`/flashcards/${id}`}
      className="flex bg-white shadow rounded-2xl w-64 h-24 px-3 py-3 items-center cursor-pointer hover:bg-gray-100 transition-colors"
    >
      {/* Ícone: Garante que não encolhe (flex-shrink-0) para preservar seu tamanho */}
      <img src={icon} className="size-16 flex-shrink-0" alt="Ícone do Flashcard" />
      
      {/* Container principal do texto e seta: Cresce para ocupar espaço, mas permite que o conteúdo encolha (min-w-0) */}
      <div className="flex items-center flex-grow min-w-0">
        
        {/* Container do Título e Data: Cresce, mas com min-w-0 para permitir ellipsis no span */}
        <div className="flex flex-col pl-2 flex-grow min-w-0">
          {/* Título: Aplica as classes de ellipsis e tem um min-w-0 implícito por ser filho de flex-grow min-w-0 */}
          <span className="text-semibold text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis">
            {title}
          </span>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        
        {/* Seta Direita: Garante que não encolhe (flex-shrink-0) e tem uma margem à esquerda (ml-auto ou ml-2) */}
        {/* Use ml-2 para um espaçamento fixo, ou ml-auto se quiser que ela sempre vá para a extrema direita */}
        <div className="flex flex-shrink-0 ml-2"> 
          <img src={Ativo17Icon} className="size-4" alt="Seta para avançar" />
        </div>
      </div>
    </Link>
  );
}