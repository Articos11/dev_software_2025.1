import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function FlashcardPage() {
  const { id } = useParams(); // Hook para pegar o 'id' da URL
  const [isFlipped, setIsFlipped] = useState(false); // Estado para controlar o flip do flashcard

  // --- Dados de Exemplo para Flashcards ---
  // IMPORTANTE: Em um aplicativo real, você buscaria esses dados de uma API
  // ou de um contexto/estado global, usando o 'id' da URL.
  const allFlashcards = [
    { id: '1', title: 'Matemática Discreta - Conjuntos', date: '15/07/2025', question: 'O que é um conjunto no contexto da matemática discreta?', answer: 'É uma coleção não ordenada de elementos distintos.' },
    { id: '2', title: 'SQL Básico - Comandos DML', date: '16/07/2025', question: 'Quais comandos DML são usados para manipular dados em um banco de dados?', answer: 'INSERT, UPDATE, DELETE.' },
    { id: '3', title: 'React Hooks - useState', date: '17/07/2025', question: 'Para que serve o hook useState no React?', answer: 'Para adicionar estado a componentes funcionais.' },
  ];

  // Encontra o flashcard atual com base no ID da URL
  const currentFlashcard = allFlashcards.find(card => card.id === id);

  // Exibe mensagem se o flashcard não for encontrado
  if (!currentFlashcard) {
    return (
      <div className="p-8 text-center text-red-600">
        Flashcard com ID "{id}" não encontrado.
        <Link to="/meus-flashcards" className="block mt-4 text-blue-600 hover:underline">Voltar para a lista</Link>
      </div>
    );
  }

  // Função para virar o flashcard
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    // Contêiner principal da página: centraliza o conteúdo vertical e horizontalmente
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      {/* Botão de Voltar */}
      <Link to="/flashcards" className="self-start mb-6 inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition">
        &lt; Voltar
      </Link>

      {/* Título da Página */}
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Flashcard: {currentFlashcard.title}</h1>

      {/* Área Principal do Flashcard (com animação 3D) */}
      {/* O clique nesta div vira o flashcard */}
      <div
        className="relative w-96 h-64 cursor-pointer rounded-2xl perspective-[1000px] shadow-xl" // Tamanho maior para a página
        onClick={handleFlip}
      >
        {/* Contêiner interno que faz a rotação 3D */}
        <div
          className={`absolute inset-0 w-full h-full transition-transform duration-700 preserve-3d
            ${isFlipped ? 'rotate-y-180' : 'rotate-y-0'}
          `}
        >
          {/* FACE FRONTAL (PERGUNTA) */}
          {/* backface-hidden é essencial para esconder a parte de trás durante o flip */}
          <div className="absolute inset-0 bg-white rounded-2xl backface-hidden flex items-center justify-center p-6 border border-gray-200">
            <p className="text-xl font-semibold text-center text-gray-800">{currentFlashcard.question}</p>
          </div>

          {/* FACE TRASEIRA (RESPOSTA) */}
          {/* backface-hidden e transform rotate-y-180 são essenciais para posicioná-la e escondê-la inicialmente */}
          <div className="absolute inset-0 bg-white rounded-2xl backface-hidden transform rotate-y-180 flex items-center justify-center p-6 border border-gray-200">
            <p className="text-xl text-center text-gray-700">{currentFlashcard.answer}</p>
          </div>
        </div>
      </div>
    </div>
  );
}