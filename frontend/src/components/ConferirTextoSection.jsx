import React from "react";
import CardBox from "./Uteis/CardBox";

export default function ConferirTextoSection({ texto, setTexto, title = "Conferir texto" }) {
  const charCount = texto?.length || 0;

  return (
    <div className="flex flex-grow grow-4 flex-col">
      <div className="mb-3 flex justify-between items-baseline">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <span className="text-sm text-gray-500">{charCount} caracteres</span>
      </div>

      <CardBox>
        <textarea
          className="px-4 size-full scrollbar-thumb-rounded-full scrollbar-h-20 scrollbar-track-rounded-full scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200 outline-none resize-none"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />
      </CardBox>
    </div>
  );
}
