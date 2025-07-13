// src/components/FlashcardThumbnails.jsx
import React, { useState } from "react";

const defaultCards = [
  { id: 1, question: "Pergunta 1", answer: "Resposta 1" },
  { id: 2, question: "Pergunta 2", answer: "Resposta 2" },
];

export default function FlashcardThumbnails() {
  const [cards, setCards] = useState(defaultCards);
  const [showModal, setShowModal] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [startIdx, setStartIdx] = useState(0); // índice do primeiro card visível
  const maxVisible = 3;

  const openCard = (card) => {
    setSelectedCard(card);
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);
  const addCard = () => {
    const next = cards.length + 1;
    setCards([
      ...cards,
      { id: next, question: `Pergunta ${next}`, answer: `Resposta ${next}` },
    ]);
  };

  // cards a serem mostrados
  const visibleCards = cards.slice(startIdx, startIdx + maxVisible);
  const canGoNext = startIdx + maxVisible < cards.length;
  const canGoPrev = startIdx > 0;

  const goNext = () => {
    if (canGoNext) setStartIdx(startIdx + 1);
  };
  const goPrev = () => {
    if (canGoPrev) setStartIdx(startIdx - 1);
  };

  return (
    <>
      <div
        className="inline-flex items-center space-x-2 bg-gray-100 p-1 rounded-lg"
        style={{ width: "auto", minWidth: 0 }}
      >
        {/* seta para trás */}
        <button
          onClick={goPrev}
          disabled={!canGoPrev}
          className={`w-7 h-14 bg-gray-200 shadow rounded-md flex items-center justify-center text-gray-600 ${
            !canGoPrev ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-300"
          }`}
        >
          ‹
        </button>
        {visibleCards.map((card) => (
          <div
            key={card.id}
            className="w-10 h-14 bg-white shadow rounded-md flex items-center justify-center cursor-pointer hover:bg-gray-50 text-sm"
            onClick={() => openCard(card)}
          >
            {card.id}
          </div>
        ))}
        <button
          onClick={addCard}
          className="w-10 h-14 bg-gray-200 shadow rounded-md flex items-center justify-center text-lg text-gray-600 hover:bg-gray-300"
        >
          +
        </button>
        {/* seta para frente */}
        <button
          onClick={goNext}
          disabled={!canGoNext}
          className={`w-7 h-14 bg-gray-200 shadow rounded-md flex items-center justify-center text-gray-600 ${
            !canGoNext ? "opacity-30 cursor-not-allowed" : "hover:bg-gray-300"
          }`}
        >
          ›
        </button>
      </div>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-transparent bg-opacity-50">
          <div className="bg-white rounded-lg shadow-2xl w-[440px] min-h-[260px] max-w-full p-6 flex flex-col">
            <h3 className="text-lg font-semibold mb-2">
              Flashcard {selectedCard.id}
            </h3>
            <p className="mb-4">
              <strong>P:</strong> {selectedCard.question}
            </p>
            <p>
              <strong>R:</strong> {selectedCard.answer}
            </p>
            <div className="flex-1" />
            <button
              onClick={closeModal}
              className="self-center px-4 py-2 bg-[var(--color-resumeai-blue)] text-white rounded hover:bg-blue-500"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
