import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Para navegação nos resultados
import SummaryBox from "./SummaryBox";
import FlashcardBox from "./FlashcardBox";

// Este componente é o pop-up de busca
export default function SearchModal({ isOpen, onClose, flashcardThemes = [], summaries = [] }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  // Combina todos os itens pesquisáveis em um único array
  const searchableItems = [...summaries, ...flashcardThemes];

  // Use um useEffect para reagir às mudanças no campo de busca
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setSearchResults([]);
      return;
    }

    const filteredResults = searchableItems.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setSearchResults(filteredResults);
  }, [searchQuery, searchableItems]);

  if (!isOpen) {
    return null; // Não renderiza nada se o modal não estiver aberto
  }

  return (
    // Fundo escuro do pop-up
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4 z-50">
      {/* Contêiner branco do pop-up */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-full overflow-hidden flex flex-col relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-900 text-2xl font-bold"
        >
          &times;
        </button>

        {/* Barra de Busca */}
        <div className="p-6 border-b border-gray-200">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Pesquisar por resumos e flashcards..."
            className="w-full p-3 border border-gray-300 rounded-lg shadow-sm outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus // Foca automaticamente no input ao abrir
          />
        </div>

        {/* Área de Resultados da Busca */}
        <div className="flex-grow overflow-y-auto p-6 scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {searchQuery.trim() === "" ? (
            <p className="text-gray-500 text-lg text-center">Comece a digitar para ver os resultados.</p>
          ) : searchResults.length > 0 ? (
            <div className="flex flex-col gap-4">
              {searchResults.map((item) => (
                <Link key={item.id} to={item.id.startsWith('r') ? `/resumos/${item.id}` : `/flashcards/${item.id}`} onClick={onClose}>
                  {item.id.startsWith('r') ? (
                    <SummaryBox
                      id={item.id}
                      title={item.title}
                      date={item.date}
                      icon={item.icon}
                    />
                  ) : (
                    <FlashcardBox
                      id={item.id}
                      title={item.title}
                      date={item.date}
                      icon={item.icon}
                      flashcardCount={item.flashcards ? item.flashcards.length : 0}
                    />
                  )}
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-red-500 text-lg text-center">Nenhum resultado encontrado para "{searchQuery}".</p>
          )}
        </div>
      </div>
    </div>
  );
}