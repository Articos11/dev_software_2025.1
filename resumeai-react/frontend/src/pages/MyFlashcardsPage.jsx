// src/pages/MyFlashcardsPage.jsx
import React from "react";
import PageHeaderSidebar from "../components/PageHeaderSidebar";
import PageHeader from "../components/PageHeader";
import FlashcardBox from "../components/FlashcardBox"; // FlashcardBox agora é para temas

export default function MyFlashcardsPage({ flashcardThemes = [] }) {
  return (
    <div>
      <PageHeaderSidebar>
        <PageHeader
          title="Flashcards"
          icon="src/assets/Ativo 29.svg"
          breadcrumbs={[
            { label: "Início", href: "/", className: "text-gray-500 cursor-pointer hover:text-[var(--color-resumeai-blue)]" },
            { label: "Coleção de Flashcards", className: "text-gray-700 text-semibold" },
          ]}
        />
        <div className="flex flex-grow px-22 overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          <div className="flex flex-wrap gap-6 mt-15">
            {flashcardThemes.length > 0 ? (
              flashcardThemes.map((theme) => (
                <FlashcardBox
                  key={theme.id}
                  id={theme.id} // ID do TEMA
                  title={theme.title} // Título do TEMA
                  date={theme.date} // Data do TEMA
                  icon={theme.icon} // Ícone do TEMA
                  flashcardCount={theme.flashcards ? theme.flashcards.length : 0} // Quantidade de flashcards no tema
                />
              ))
            ) : (
              <p className="text-gray-500 text-lg">Nenhum tema de flashcard encontrado. Crie um novo!</p>
            )}
          </div>
        </div>
      </PageHeaderSidebar>
    </div>
  );
}