// src/pages/FlashcardPage.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PageHeaderSidebar from '../components/PageHeaderSidebar';
import PageHeader from '../components/PageHeader';
import SingleFlashcardDisplay from '../components/SingleFlashcardDisplay';
import Ativo28Icon from '../assets/Ativo 28.svg'; 

// Esta é a página que exibe a sequência de flashcards de um tema
function FlashcardPage({ allFlashcardThemes = [] }) {
  const { themeId } = useParams(); // Pega o ID do tema da URL
  const navigate = useNavigate(); // Para navegação programática

  // 1. Encontra o tema completo com base no themeId da URL
  const currentTheme = allFlashcardThemes.find(theme => {
    // Adicionando .trim() para robustez na comparação
    const trimmedThemeId = themeId.trim();
    const trimmedThemeDotId = theme.id.trim();
    return trimmedThemeDotId === trimmedThemeId;
  });

  // Gerencia o índice do flashcard atual DENTRO deste tema
  const [currentCardIdx, setCurrentCardIdx] = useState(0);

  // Redefine o índice do card para 0 (primeiro card) sempre que o themeId mudar
  useEffect(() => {
    setCurrentCardIdx(0);
  }, [themeId]);

  // Se o tema não for encontrado, exibe uma mensagem de erro
  if (!currentTheme) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-8 text-center text-red-600">
        <p className="text-xl mb-4">Tema de Flashcard com ID "{themeId}" não encontrado.</p>
        <Link to="/flashcards" className="block mt-4 text-blue-600 hover:underline">Voltar para a lista de Temas</Link>
      </div>
    );
  }

  const flashcardsInTheme = currentTheme.flashcards || [];
  const currentFlashcard = flashcardsInTheme[currentCardIdx];

  // Se o tema for encontrado, mas não tiver flashcards
  if (!currentFlashcard) {
    return (
      <PageHeaderSidebar>
        <PageHeader
          title={currentTheme.title}
          icon={Ativo28Icon}
          breadcrumbs={[
            { label: "Início", href: "/", className: "text-gray-500 cursor-pointer hover:text-[var(--color-resumeai-blue)]" },
            { label: "Coleção de Flashcards", href: "/flashcards", className: "text-gray-500 cursor-pointer hover:text-[var(--color-resumeai-blue)]" },
            { label: currentTheme.title, className: "text-gray-700 text-semibold" },
          ]}
        />
        <div className="flex-grow p-8 overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <div className="flex flex-col items-center justify-center h-full">
            <p className="text-gray-500 text-lg">Nenhum flashcard neste tema. Adicione um!</p>
            <Link to="/flashcards" className="mt-4 text-blue-600 hover:underline">Voltar para Temas</Link>
          </div>
        </div>
      </PageHeaderSidebar>
    );
  }

  // Lógica para ir para o próximo/anterior flashcard
  const handleNextCard = () => {
    if (currentCardIdx < flashcardsInTheme.length - 1) {
      setCurrentCardIdx(prevIndex => prevIndex + 1);
    }
  };

  const handlePreviousCard = () => {
    if (currentCardIdx > 0) {
      setCurrentCardIdx(prevIndex => prevIndex - 1);
    }
  };

  return (
    <PageHeaderSidebar>
      {/* Cabeçalho da página (com o título do tema) */}
      <PageHeader
        title="Flashcards"
        icon={Ativo28Icon}
        breadcrumbs={[
          { label: "Início", href: "/", className: "text-gray-500 cursor-pointer hover:text-[var(--color-resumeai-blue)]" },
          { label: "Coleção de Flashcards", href: "/flashcards", className: "text-gray-500 cursor-pointer hover:text-[var(--color-resumeai-blue)]" },
          { label: currentTheme.title, className: "text-gray-700 text-semibold" },
        ]}
      />
      
      {/* Área principal de exibição do flashcard individual */}
      {/* flex-grow para ocupar o espaço restante, centralizar o card */}
      <div className="flex-grow flex items-center justify-center p-8">
        <SingleFlashcardDisplay
          flashcard={currentFlashcard} // Passa o flashcard atual (com question/answer)
          cardIndex={currentCardIdx + 1} // Índice baseado em 1
          totalCards={flashcardsInTheme.length}
          onNextCard={handleNextCard}
          onPreviousCard={handlePreviousCard}
        />
      </div>
    </PageHeaderSidebar>
  );
}

export default FlashcardPage;