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
    const selectedPDF = hasPDF ? files.find((file) => file.type === "application/pdf") : null;

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
              max-h-[8rem] overflow-y-auto pr-1
              no-scrollbar
            "
          >
            {files.map((file, idx) => {
              const isImage = file.type?.startsWith("image/");
              const previewUrl = isImage ? URL.createObjectURL(file) : null;
              return (
                <div
                  key={idx}
                  className="flex items-center bg-gray-100 rounded-lg p-2 space-x-2"
                >
                  {isImage ? (
                    <img
                      src={previewUrl}
                      alt={file.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  ) : (
                    <div className="h-12 w-12 flex items-center justify-center bg-gray-200 rounded">
                      <span className="text-sm text-gray-600">📄</span>
                    </div>
                  )}
                  <div className="text-sm flex-1 truncate">{file.name}</div>
                  <button
                    onClick={() => removeFile(idx)}
                    className="text-red-500 hover:text-red-700"
                    type="button"
                  >
                    ❌
                  </button>
                </div>
              );
            })}
          </div>
          {hasOverflow && (
            <div className="absolute bottom-0 left-0 right-0 h-2 pointer-events-none bg-gradient-to-b from-transparent to-white" />
          )}
        </div>
      )}

      <div className="flex items-center bg-white rounded-[40px] shadow-sm px-2 py-1 mb-6">
        <button type="button" onClick={handleAttachClick} className="text-gray-400 w-7 h-7">
          <img src={Ativo4Pag1} className="w-5 h-5" alt="Anexar" />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          multiple
          hidden
          onChange={handleFileChange}
        />

        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleChange}
          placeholder={placeholder}
          rows={1}
          className="flex-1 m-1 pl-3 border-l outline-none resize-none overflow-y-auto"
          style={{ maxHeight: `${calculatedMaxHeight}px` }}
        />

        <button type="button" onClick={handleSubmitClick} className="ml-2">
          <img src={Ativo5Pag1} className="w-4 h-4 rounded-full" alt="Enviar" />
        </button>
      </div>
    </div>
  );
}

export default ResizableInputBar;
