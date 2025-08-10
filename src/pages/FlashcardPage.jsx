import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHeaderSidebar from '../components/PageHeaderSidebar';
import PageHeader from '../components/PageHeader';
import SingleFlashcardDisplay from '../components/SingleFlashcardDisplay';
import Ativo28Icon from '../assets/Ativo_28.svg';

function FlashcardPage() {
  const { themeId } = useParams();

  const [currentTheme, setCurrentTheme] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentCardIdx, setCurrentCardIdx] = useState(0);

  useEffect(() => {
    setLoading(true);
    setError(null);
    setCurrentCardIdx(0);

    fetch(`http://localhost:5000/api/flashcards/${themeId}`) // Ajuste a URL conforme seu backend
      .then((res) => {
        if (!res.ok) throw new Error(`Erro ao buscar flashcards: ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        setCurrentTheme(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [themeId]);

  if (loading) {
    return (
      <PageHeaderSidebar>
        <p className="text-center mt-20 text-gray-500">Carregando flashcards...</p>
      </PageHeaderSidebar>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center text-red-600">
        <p className="text-xl mb-4">{error}</p>
        <Link to="/flashcards" className="block mt-4 text-blue-600 hover:underline">
          Voltar para a lista de Temas
        </Link>
      </div>
    );
  }

  if (!currentTheme) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center text-red-600">
        <p className="text-xl mb-4">Tema de Flashcard com ID "{themeId}" não encontrado.</p>
        <Link to="/flashcards" className="block mt-4 text-blue-600 hover:underline">
          Voltar para a lista de Temas
        </Link>
      </div>
    );
  }

  const flashcardsInTheme = currentTheme.flashcards || [];
  const currentFlashcard = flashcardsInTheme[currentCardIdx];

  if (!currentFlashcard) {
    return (
      <PageHeaderSidebar>
        <PageHeader
          title={currentTheme.title}
          icon={Ativo28Icon}
          breadcrumbs={[
            { label: 'Início', href: '/', className: 'text-gray-500 cursor-pointer hover:text-[var(--color-resumeai-blue)]' },
            { label: 'Coleção de Flashcards', href: '/flashcards', className: 'text-gray-500 cursor-pointer hover:text-[var(--color-resumeai-blue)]' },
            { label: currentTheme.title, className: 'text-gray-700 text-semibold' },
          ]}
        />
        <div className="flex-grow p-8 overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-500 text-lg">Nenhum flashcard neste tema. Adicione um!</p>
            <Link to="/flashcards" className="mt-4 text-blue-600 hover:underline">
              Voltar para Temas
            </Link>
          </div>
        </div>
      </PageHeaderSidebar>
    );
  }

  const handleNextCard = () => {
    if (currentCardIdx < flashcardsInTheme.length - 1) {
      setCurrentCardIdx((prev) => prev + 1);
    }
  };

  const handlePreviousCard = () => {
    if (currentCardIdx > 0) {
      setCurrentCardIdx((prev) => prev - 1);
    }
  };

  return (
    <PageHeaderSidebar>
      <PageHeader
        title="Flashcards"
        icon={Ativo28Icon}
        breadcrumbs={[
          { label: 'Início', href: '/', className: 'text-gray-500 cursor-pointer hover:text-[var(--color-resumeai-blue)]' },
          { label: 'Coleção de Flashcards', href: '/flashcards', className: 'text-gray-500 cursor-pointer hover:text-[var(--color-resumeai-blue)]' },
          { label: currentTheme.title, className: 'text-gray-700 text-semibold' },
        ]}
      />

      <div className="flex-grow flex items-center justify-center p-8">
        <SingleFlashcardDisplay
          flashcard={currentFlashcard}
          cardIndex={currentCardIdx + 1}
          totalCards={flashcardsInTheme.length}
          onNextCard={handleNextCard}
          onPreviousCard={handlePreviousCard}
        />
      </div>
    </PageHeaderSidebar>
  );
}

export default FlashcardPage;
