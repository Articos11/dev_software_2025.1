import Ativo32Icon from "../assets/Ativo_32.svg";
import React, { useRef, useState, useEffect } from "react";
import Ativo4Pag1 from "../assets/Ativo_4pag1.svg";
import Ativo5Pag1 from "../assets/Ativo_5pag1.svg";

function ResizableInputBar({
  placeholder = "Novo resumo rápido...",
  initialText = "",
  maxRows = 4,
  onFilesSelected,
  onSubmit,
}) {
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const cardsContainerRef = useRef(null);

  const [text, setText] = useState(initialText);
  const [files, setFiles] = useState([]);
  const [hasOverflow, setHasOverflow] = useState(false);

  const lineHeight = 24;
  const calculatedMaxHeight = maxRows * lineHeight;

  useEffect(() => {
    if (!textareaRef.current) return;
    const ta = textareaRef.current;
    ta.style.height = "auto";
    ta.style.height = ta.scrollHeight + "px";
  }, [text]);

  useEffect(() => {
    const el = cardsContainerRef.current;
    if (!el) return;
    setHasOverflow(el.scrollHeight > el.clientHeight);
  }, [files]);

  const handleAttachClick = () => fileInputRef.current?.click();

  const handleFileChange = (e) => {
    const sel = e.target.files;
    if (sel?.length) {
      const arr = Array.from(sel);
      setFiles((existing) => [...existing, ...arr]);
      onFilesSelected?.([...files, ...arr]);
      e.target.value = "";
    }
  };

  const handleChange = (e) => setText(e.target.value);

  const removeFile = (idx) =>
    setFiles((curr) => curr.filter((_, i) => i !== idx));

  const handleSubmitClick = (e) => {
    e.preventDefault();

    const hasPDF = files.some((file) => file.type === "application/pdf");
    const selectedPDF = hasPDF
      ? files.find((file) => file.type === "application/pdf")
      : null;

    if (hasPDF && selectedPDF) {
      onSubmit?.({ file: selectedPDF, prompt: text });
    } else {
      onSubmit?.(text);
    }
  };

  return (
    <div className="w-full max-w-3xl relative">
      {files.length > 0 && (
        <div className="mb-2 relative">
          <div
            ref={cardsContainerRef}
            className="
              flex flex-wrap gap-2
              max-h-[5rem] md:max-h-[9.1rem] overflow-y-auto pr-1
              no-scrollbar
            "
          >
            {files.map((file, idx) => {
              const isImage = file.type?.startsWith("image/");
              const previewUrl = isImage ? URL.createObjectURL(file) : null;
              return (
                <div
                  key={idx}
                  className="flex items-center bg-gray-100 rounded-2xl p-2 space-x-2"
                >
                  {isImage ? (
                    <img
                      src={previewUrl}
                      alt={file.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    <div className="h-12 w-12 flex items-center justify-center rounded-xl bg-gray-200 rounded">
                      <span className="text-sm text-gray-600">📄</span>
                    </div>
                  )}
                  <div className="text-sm flex-1 truncate">{file.name}</div>
                  <button
                    onClick={() => removeFile(idx)}
                    className="text-red-500 hover:text-red-700 p-1 rounded-full"
                    type="button"
                    aria-label="Remover arquivo"
                  >
                    <img src={Ativo32Icon} alt="Remover" className="w-5 h-5" />
                  </button>
                </div>
              );
            })}
          </div>
          {hasOverflow && (
            <div className="absolute bottom-0 left-0 right-0 h-2 pointer-events-none bg-gradient-to-b from-transparent to-gray-50" />
          )}
        </div>
      )}

      {/* Contêiner da barra de input, agora responsivo */}
      <div className="flex flex-col md:flex-row items-end md:items-center bg-white rounded-[40px] shadow-sm px-2 py-2 mb-6">
        
        {/* Botão de Anexar (visível em telas grandes, escondido em pequenas) */}
        {/* O botão fica à esquerda do textarea no layout md:flex-row */}
        <button
          type="button"
          onClick={handleAttachClick}
          className="hidden md:flex text-gray-400 w-8 h-8 items-center justify-center rounded-full"
        >
          <img
            src={Ativo4Pag1}
            className="w-8 h-8 hover:bg-gray-100 rounded-full p-1"
            alt="Anexar"
          />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          hidden
          onChange={handleFileChange}
        />

        {/* Textarea: ocupa o espaço restante em ambas as direções */}
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          placeholder={placeholder}
          rows={1}
          className="flex-1 m-1 md:pl-3 md:border-l outline-none resize-none overflow-y-auto"
          style={{ maxHeight: `${calculatedMaxHeight}px` }}
        />

        {/* Container para os botões (Enviar e Anexar - em telas pequenas) */}
        {/* Este div se torna uma linha em telas pequenas (`flex justify-end`) */}
        <div className="flex items-center justify-end w-full md:w-auto mt-2 md:mt-0 space-x-2">
          {/* Botão de Anexar (visível apenas em telas pequenas) */}
          <button
            type="button"
            onClick={handleAttachClick}
            className="md:hidden text-gray-400 w-8 h-8 flex items-center justify-center rounded-full"
          >
            <img
              src={Ativo4Pag1}
              className="w-8 h-8 hover:bg-gray-100 rounded-full p-1"
              alt="Anexar"
            />
          </button>
          
          {/* Botão de Enviar */}
          <button
            type="button"
            onClick={handleSubmitClick}
            className={`
              rounded-full
              ${!text.trim() && files.length === 0 ? "opacity-50 cursor-not-allowed" : ""}
            `}
            disabled={!text.trim() && files.length === 0}
          >
            <img
              src={Ativo5Pag1}
              className="w-7 h-7 hover:bg-gray-100 rounded-full p-1"
              alt="Enviar"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ResizableInputBar;