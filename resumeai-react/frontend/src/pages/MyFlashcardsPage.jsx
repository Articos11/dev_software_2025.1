import React from "react";
import PageHeaderSidebar from "../components/PageHeaderSidebar";
import PageHeader from "../components/PageHeader";
import FlashcardBox from "../components/FlashcardBox";

export default function MyFlashcardsPage({ flashcards = [] }) {
  return (
    <div>
      <PageHeaderSidebar>
        <PageHeader />
        <div className="flex flex-grow pl-22 h-full w-full overflow-y-hidden">
          <div className="flex grow-1 max-w-230 flex-wrap mt-15 gap-6 overflow-y-auto overflow-x-hidden scrollbar-thumb-rounded-full scrollbar-h-20 scrollbar-track-rounded-full scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {flashcards.length > 0 ? (
              flashcards.map((flashcard) => (
                <FlashcardBox
                  key={flashcard.id}
                  id={flashcard.id}
                  title={flashcard.title}
                  date={flashcard.date}
                  icon={flashcard.icon}
                />
              ))
            ) : (
              <p className="text-gray-500 text-lg">Nenhum flashcard encontrado. Crie um novo!</p>
            )}
          </div>
        </div>
      </PageHeaderSidebar>
    </div>
  );
}