import React from 'react';
import { useParams, Link } from 'react-router-dom';

export default function FlashcardPage() {

  const { id } = useParams();

  const allFlashcards = [
    { id: '1', title: 'Matemática Discreta - Conjuntos', date: '15/07/2025', content: 'Conteúdo detalhado de Matemática Discreta.' },
    { id: '2', title: 'SQL Básico - Comandos DML', date: '16/07/2025', content: 'Detalhamento dos comandos SELECT, INSERT, UPDATE, DELETE.' },
    { id: '3', title: 'React Hooks - useState', date: '17/07/2025', content: 'Entendendo como o useState gerencia estados em componentes funcionais.' },
  ];

  const currentFlashcard = allFlashcards.find(card => card.id === id);

  if (!currentFlashcard) {
    return (
      <div className="p-8 text-center text-red-600">
        Flashcard com ID "{id}" não encontrado.
        <Link to="/meus-flashcards" className="block mt-4 text-blue-600 hover:underline">Voltar para a lista</Link>
      </div>
    );
  }

  return (
    <div className="p-8 bg-white shadow-lg rounded-lg max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4 text-gray-800">Detalhes do Flashcard:</h1>
      <h2 className="text-2xl font-semibold mb-2 text-indigo-600">{currentFlashcard.title}</h2>
      <p className="text-gray-600 mb-4">Criado em: {currentFlashcard.date}</p>
      <div className="bg-gray-100 p-4 rounded-md border border-gray-200">
        <p className="text-gray-700">{currentFlashcard.content}</p>
      </div>

      <Link to="/meus-flashcards" className="mt-6 inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition">
        Voltar para a lista de Flashcards
      </Link>
    </div>
  );
}
