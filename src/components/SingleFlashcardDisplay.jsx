import React, { useState } from "react";
import Ativo17Icon from "../assets/Ativo_17.svg";

function SingleFlashcardDisplay({
  flashcard,
  cardIndex = 1,
  totalCards = 1,
  onNextCard,
  onPreviousCard,
}) {
  const [isFlipped, setIsFlipped] = useState(false);

  // Ajuste para pegar os dados vindos do backend
  const {
    id,
    title = "Flashcard Sem Título",
    question = "Nenhuma pergunta fornecida.",
    answer = "Nenhuma resposta fornecida.",
    icon,
  } = flashcard || {};

  const handleFlip = () => setIsFlipped(!isFlipped);
  const handleNextClick = (e) => { e.stopPropagation(); onNextCard?.(); };
  const handlePreviousClick = (e) => { e.stopPropagation(); onPreviousCard?.(); };

  return (
    <div className="flex flex-col items-center justify-center h-full pt-4">
      <div className="flex items-center justify-center w-full">
        {cardIndex > 1 ? (
          <button onClick={handlePreviousClick} className="bg-gray-200 p-4 rounded-full shadow-lg hover:bg-gray-300 transition mr-4 flex items-center justify-center">
            <img src={Ativo17Icon} alt="Anterior" className="w-6 h-6 mr-1 rotate-180" />
          </button>
        ) : <div className="w-16 mr-4" />}

        <div className="relative w-96 h-96 cursor-pointer rounded-[35px] perspective-[1000px] shadow-xl" onClick={handleFlip}>
          <div className={`absolute inset-0 w-full h-full transition-transform duration-700 preserve-3d ${isFlipped ? "rotate-y-180" : "rotate-y-0"}`}>
            <div className="absolute inset-0 bg-white rounded-[35px] backface-hidden flex flex-col justify-between items-center p-8 border-[7px] border-[var(--color-resumeai-purple)]">
              <h3 className="text-xl font-semibold text-gray-700 my-4">Frente</h3>
              <p className="text-xl text-gray-900 text-center">{question}</p>
              <button onClick={(e) => { e.stopPropagation(); handleFlip(); }} className="text-[var(--color-resumeai-blue)] hover:underline mt-auto">Ver o verso</button>
            </div>

            <div className="absolute inset-0 bg-white rounded-[35px] backface-hidden transform rotate-y-180 flex flex-col justify-between items-center p-8 border-[7px] border-[var(--color-resumeai-purple)]">
              <h3 className="text-xl font-semibold text-gray-700 my-4">Verso</h3>
              <p className="text-xl text-gray-900 text-center">{answer}</p>
              <button onClick={(e) => { e.stopPropagation(); handleFlip(); }} className="text-[var(--color-resumeai-blue)] hover:underline mt-auto">Ver a frente</button>
            </div>
          </div>
        </div>

        {cardIndex < totalCards ? (
          <button onClick={handleNextClick} className="bg-gray-200 p-4 rounded-full shadow-lg hover:bg-gray-300 transition ml-4 flex items-center justify-center">
            <img src={Ativo17Icon} alt="Próximo" className="w-6 h-6 ml-1" />
          </button>
        ) : <div className="w-16 ml-4" />}
      </div>

      <p className="text-lg text-gray-600 mt-8">{cardIndex} de {totalCards}</p>
    </div>
  );
}

export default SingleFlashcardDisplay;
