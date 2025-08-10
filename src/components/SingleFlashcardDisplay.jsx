import React, { useState } from "react";
import { Link } from "react-router-dom"; // Necessário para o botão "Voltar"
import Ativo17Icon from "../assets/Ativo_17.svg";

function SingleFlashcardDisplay({
  flashcard, // Objeto do flashcard individual com (id, title, question, answer, etc.)
  cardIndex = 1, // Número do flashcard atual (ex: 1 para "Flashcard 1")
  totalCards = 1, // Número total de flashcards no tema
  onNextCard, // Função de callback para ir para o próximo card
  onPreviousCard, // Função de callback para ir para o card anterior
}) {
  const [isFlipped, setIsFlipped] = useState(false); // Estado para controlar se o card está virado

  // Desestruturando as propriedades do objeto 'flashcard'.
  // Incluí o 'icon' aqui caso você queira usá-lo na frente do card.
  const {
    id, // ID do flashcard individual
    title = "Flashcard Sem Título",
    question = "Nenhuma pergunta fornecida.",
    answer = "Nenhuma resposta fornecida.",
    icon, // Se o flashcard individual tiver um ícone diferente do tema
  } = flashcard || {};

  // Função para virar o flashcard ao clicar nele
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Função para ir para o próximo card (e.stopPropagation para não virar o card)
  const handleNextClick = (e) => {
    e.stopPropagation(); // Impede que o clique no botão de navegação vire o card
    if (onNextCard) {
      onNextCard();
    }
  };

  // Função para ir para o card anterior (e.stopPropagation para não virar o card)
  const handlePreviousClick = (e) => {
    e.stopPropagation(); // Impede que o clique no botão de navegação vire o card
    if (onPreviousCard) {
      onPreviousCard();
    }
  };

  return (
    // Contêiner principal da página: centraliza o conteúdo vertical e horizontalmente
    <div className="flex flex-col items-center justify-center h-full pt-4">
      {/* Área Principal do Flashcard (com animação 3D) */}
      {/* O clique nesta div vira o flashcard */}
      <div className="flex items-center justify-center w-full">
        {/* Seta anterior */}
        {cardIndex > 1 ? (
          <button
            onClick={handlePreviousClick}
            className="bg-gray-200 p-4 rounded-full shadow-lg hover:bg-gray-300 transition mr-4 flex items-center justify-center"
          >
            <img
              src={Ativo17Icon}
              alt="Anterior"
              className="w-6 h-6 mr-1 rotate-180"
            />
          </button>
        ) : (
          <div className="w-16 mr-4" />
        )}
        <div
          className="relative w-96 h-96 cursor-pointer rounded-[35px] perspective-[1000px] shadow-xl"
          onClick={handleFlip}
        >
          {/* Contêiner interno que faz a rotação 3D */}
          <div
            className={`absolute inset-0 w-full h-full transition-transform duration-700 preserve-3d
            ${isFlipped ? "rotate-y-180" : "rotate-y-0"}
          `}
          >
            {/* FACE FRONTAL (PERGUNTA) */}
            {/* backface-hidden é essencial para esconder a parte de trás durante o flip */}
            <div className="absolute inset-0 bg-white rounded-[35px] backface-hidden flex flex-col justify-between items-center p-8 border-[7px] border-[var(--color-resumeai-purple)]">
              <h3 className="text-xl font-semibold text-gray-700 my-4">
                Frente
              </h3>
              <p className="text-xl text-gray-900 text-center">{question}</p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFlip();
                }} // Clicar no botão vira o card
                className="text-[var(--color-resumeai-blue)] hover:underline mt-auto"
              >
                Ver o verso
              </button>
            </div>

            {/* FACE TRASEIRA (RESPOSTA) */}
            {/* backface-hidden e transform rotate-y-180 são essenciais para posicioná-la e escondê-la inicialmente */}
            <div className="absolute inset-0 bg-white rounded-[35px] backface-hidden transform rotate-y-180 flex flex-col justify-between items-center p-8 border-[7px] border-[var(--color-resumeai-purple)]">
              <h3 className="text-xl font-semibold text-gray-700 my-4">
                Verso
              </h3>
              <p className="text-xl text-gray-900 text-center">
                {answer}
              </p>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleFlip();
                }}
                className="text-[var(--color-resumeai-blue)] hover:underline mt-auto"
              >
                Ver a frente
              </button>
            </div>
          </div>
        </div>
        {/* Seta próxima */}
        {cardIndex < totalCards ? (
          <button
            onClick={handleNextClick}
            className="bg-gray-200 p-4 rounded-full shadow-lg hover:bg-gray-300 transition ml-4 flex items-center justify-center"
          >
            <img src={Ativo17Icon} alt="Próximo" className="w-6 h-6 ml-1" />
          </button>
        ) : (
          <div className="w-16 ml-4" />
        )}
      </div>

      {/* Paginação (1 de 3) */}
      <p className="text-lg text-gray-600 mt-8">
        {cardIndex} de {totalCards}
      </p>
    </div>
  );
}

export default SingleFlashcardDisplay;
