import React, { useState, useMemo } from "react";
import { Link } from "react-router-dom";
// ✨ Importe o novo ícone SVG de fechar
import Ativo32Icon from '../assets/Ativo_32.svg';

export default function SearchModal({
  isOpen,
  onClose,
  flashcardThemes = [],
  summaries = [],
}) {
  const [query, setQuery] = useState("");

  const searchableItems = useMemo(() => {
    return [...summaries, ...flashcardThemes];
  }, [summaries, flashcardThemes]);

  const flashcardResults = useMemo(() => {
    if (!query) return [];
    return flashcardThemes.flatMap((theme) =>
      theme.flashcards
        .filter(
          (f) =>
            f.question.toLowerCase().includes(query.toLowerCase()) ||
            f.answer.toLowerCase().includes(query.toLowerCase())
        )
        .map((f) => ({ ...f, themeTitle: theme.title, themeId: theme.id }))
    );
  }, [query, flashcardThemes]);

  const summaryResults = useMemo(() => {
    if (!query) return [];
    return summaries.filter(
      (s) =>
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        (s.content && s.content.toLowerCase().includes(query.toLowerCase()))
    );
  }, [query, summaries]);

  if (!isOpen) {
    return null;
  }

  return (
    <div 
      className="fixed inset-0 z-50 bg-gray-400/15 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-[35px] shadow-xl w-full max-w-2xl max-h-full overflow-hidden flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center px-6 pb-3 pt-5 pr-4 bg-[var(--color-resumeai-purple)] rounded-t-[35px] text-white">
          <h2 className="text-2xl font-bold">Buscar</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-3xl font-bold transition-colors"
          >
            {/* ✨ Substituído o &times; pelo novo ícone */}
            <img src={Ativo32Icon} alt="Fechar" className="w-8 h-8 cursor-pointer" />
          </button>
        </div>

        <div className="p-6 border-b border-gray-200">
          <input
            type="text"
            autoFocus
            placeholder="Digite para buscar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-[35px] shadow-sm outline-none focus:ring-2 focus:ring-[var(--color-resumeai-blue)]"
          />
        </div>

        <div className="flex-grow overflow-y-auto p-6 space-y-4">
          {query.trim() === "" ? (
            <p className="text-gray-500 text-lg text-center">
              Comece a digitar para ver os resultados.
            </p>
          ) : (
            <>
              <h3 className="text-lg font-semibold text-gray-700">
                Resumos ({summaryResults.length})
              </h3>
              {summaryResults.length === 0 && (
                <div className="text-gray-400 text-sm">
                  Nenhum resumo encontrado.
                </div>
              )}
              {summaryResults.map((s) => (
                <Link
                  key={s.id}
                  to={`/resumos/${s.id}`}
                  onClick={onClose}
                  className="block py-2 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <strong>{s.title}</strong>
                  <div className="text-xs text-gray-500 truncate">
                    {s.content?.slice(0, 80)}...
                  </div>
                </Link>
              ))}

              <h3 className="text-lg font-semibold text-gray-700 mt-4">
                Flashcards ({flashcardResults.length})
              </h3>
              {flashcardResults.length === 0 && (
                <div className="text-gray-400 text-sm">
                  Nenhum flashcard encontrado.
                </div>
              )}
              {flashcardResults.map((f) => (
                <Link
                  key={f.id + f.themeId}
                  to={`/flashcards/${f.themeId}`}
                  onClick={onClose}
                  className="block py-2 border-b border-gray-200 last:border-b-0 hover:bg-gray-50 transition-colors"
                >
                  <strong>{f.themeTitle}</strong>
                  <div className="text-xs text-gray-700">Q: {f.question}</div>
                  <div className="text-xs text-gray-500">A: {f.answer}</div>
                </Link>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}