import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

export default function FlashcardPage() {
  const { id } = useParams(); // ID do resumo ou conjunto de flashcards
  const [flashcards, setFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFlipped, setIsFlipped] = useState(null); // Array de estados para flip

  useEffect(() => {
    async function fetchFlashcards() {
      try {
        const response = await fetch(`http://localhost:5000/api/flashcards/${id}`);
        if (!response.ok) throw new Error(`Erro ao carregar flashcards: ${response.statusText}`);
        const data = await response.json();
        setFlashcards(data.flashcards || []);
        setIsFlipped(new Array(data.flashcards.length).fill(false)); // Estado para flip de cada flashcard
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchFlashcards();
  }, [id]);

  const handleFlip = (index) => {
    setIsFlipped(prev => {
      const newFlipped = [...prev];
      newFlipped[index] = !newFlipped[index];
      return newFlipped;
    });
  };

  if (loading) {
    return <p>Carregando flashcards...</p>;
  }

  if (error) {
    return (
      <div className="p-8 text-center text-red-600">
        Erro: {error}
        <Link to="/flashcards" className="block mt-4 text-blue-600 hover:underline">Voltar para a lista</Link>
      </div>
    );
  }

  if (flashcards.length === 0) {
    return (
      <div className="p-8 text-center text-gray-600">
        Nenhum flashcard encontrado para este resumo.
        <Link to="/flashcards" className="block mt-4 text-blue-600 hover:underline">Voltar para a lista</Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 bg-gray-100">
      <Link to="/flashcards" className="self-start mb-6 inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition">
        &lt; Voltar
      </Link>

      <h1 className="text-3xl font-bold mb-8 text-gray-800">Flashcards</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {flashcards.map((card, index) => (
          <div
            key={card.id}
            className="relative w-96 h-64 cursor-pointer rounded-2xl perspective-[1000px] shadow-xl"
            onClick={() => handleFlip(index)}
          >
            <div
              className={`absolute inset-0 w-full h-full transition-transform duration-700 preserve-3d
                ${isFlipped[index] ? 'rotate-y-180' : 'rotate-y-0'}
              `}
            >
              <div className="absolute inset-0 bg-white rounded-2xl backface-hidden flex items-center justify-center p-6 border border-gray-200">
                <p className="text-xl font-semibold text-center text-gray-800">{card.pergunta}</p>
              </div>

              <div className="absolute inset-0 bg-white rounded-2xl backface-hidden transform rotate-y-180 flex items-center justify-center p-6 border border-gray-200">
                <p className="text-xl text-center text-gray-700">{card.resposta}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
