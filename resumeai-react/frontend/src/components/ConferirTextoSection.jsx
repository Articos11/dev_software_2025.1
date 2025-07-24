// frontend/src/components/ConferirTextoSection.jsx
import React, { useRef, useState, useEffect } from "react";
import CardBox from "./Uteis/CardBox"; // Ajuste o caminho se necessário

export default function ConferirTextoSection({
  title = "Conferir texto",
  charactheres = 0,
  initialText = "", // NOVO: Aceita um texto inicial como prop
}) {
  // Use initialText como o valor inicial do estado 'text'
  const [text, setText] = useState(initialText); 

  const textareaRef = useRef(null); // Mantenha se o textarea for redimensionável
  // const cardsContainerRef = useRef(null); // Removido se não for mais usado para cards de arquivo

  // Ajuste de altura do textarea (mantido se o textarea for redimensionável)
  useEffect(() => {
    if (!textareaRef.current) return;
    const ta = textareaRef.current;
    ta.style.height = "auto";
    ta.style.height = ta.scrollHeight + "px";
  }, [text]); // Re-ajusta a altura quando o texto muda

  // ATENÇÃO: A lógica de 'files', 'hasOverflow', 'fileInputRef', 'cardsContainerRef'
  // e métodos relacionados (handleAttachClick, handleFileChange, removeFile)
  // não são mais necessários AQUI se este componente é apenas para exibir/editar texto.
  // Eles pertencem ao ResizableInputBar.

  return (
    <div className="flex flex-grow grow-4 flex-col">
      <div className="mb-3 flex justify-between items-baseline">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {/* Atualiza a contagem de caracteres com base no texto real */}
        <span className="text-sm text-gray-500">{text.length} caracteres</span> 
      </div>

      <CardBox>
        <textarea
          ref={textareaRef} // Mantenha a ref para o ajuste de altura
          className="px-4 size-full scrollbar-thumb-rounded-full scrollbar-h-20 scrollbar-track-rounded-full scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200 outline-none resize-none"
          value={text} // O valor do textarea é o estado 'text'
          onChange={(e) => setText(e.target.value)} // Permite edição do texto
        ></textarea>
      </CardBox>
    </div>
  );
}
