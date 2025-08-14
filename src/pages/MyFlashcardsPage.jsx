import React, { useState, useEffect } from "react";
import PageHeaderSidebar from "../components/PageHeaderSidebar";
import PageHeader from "../components/PageHeader";
import FlashcardBox from "../components/FlashcardBox";

export default function MyFlashcardsPage({ userId }) {
  const [flashcardThemes, setFlashcardThemes] = useState([]);
  const [isolatedFlashcards, setIsolatedFlashcards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:5000/api";

  useEffect(() => {
    async function fetchFlashcards() {
    setLoading(true);
    setError(null);

    try {
      let uid = userId;
      if (!uid) {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) throw new Error("Usuário não autenticado.");
        uid = JSON.parse(storedUser).id;
      }

      // Busca todos os flashcards do usuário de uma vez
      const res = await fetch(`${baseUrl}/flashcards/by-user/${uid}`);
      if (!res.ok) throw new Error("Falha ao buscar flashcards.");
      const data = await res.json();

      // data.summaries contém os summaries e seus flashcards
      setFlashcardThemes(data.summaries);

      // Se desejar, você pode extrair flashcards isolados do último summary
      if (data.summaries.length > 0) {
        const lastSummary = data.summaries[0]; // último salvo
        setIsolatedFlashcards(lastSummary.flashcards || []);
      } else {
        setIsolatedFlashcards([]);
      }

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

    fetchFlashcards();
  }, [userId]);

  if (loading) {
    return (
      <PageHeaderSidebar>
        <p className="text-center mt-20 text-gray-500">Carregando flashcards...</p>
      </PageHeaderSidebar>
    );
  }

  if (error) {
    return (
      <PageHeaderSidebar>
        <p className="text-center mt-20 text-red-600">{error}</p>
      </PageHeaderSidebar>
    );
  }

  return (
    <div>
      <PageHeaderSidebar>
        <PageHeader
          title="Flashcards"
          icon="src/assets/Ativo_29.svg"
          breadcrumbs={[
            { label: "Início", href: "/", className: "text-gray-500 cursor-pointer hover:text-[var(--color-resumeai-blue)]" },
            { label: "Coleção de Flashcards", className: "text-gray-700 text-semibold" },
          ]}
        />

        <div className="flex flex-col px-22 overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200">

          {/* Se houver flashcards isolados do último resumo, exibe primeiro */}
          {isolatedFlashcards.length > 0 && (
            <section className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Flashcards do último Resumo Salvo</h2>
              <div className="flex flex-wrap gap-4">
                {isolatedFlashcards.map(fc => (
                  <FlashcardBox
                    key={fc.id}
                    id={fc.id}
                    title={fc.pergunta}
                    date={null}
                    icon={null}
                    flashcardCount={1}
                    // Pode adicionar props para indicar que é flashcard único, sem tema
                  />
                ))}
              </div>
            </section>
          )}

          {/* Exibe os temas com flashcards */}
          <section>
            {flashcardThemes.length > 0 ? (
              <div className="flex flex-wrap gap-6 mt-15">
                {flashcardThemes.map((theme) => (
                  <FlashcardBox
                    key={theme.id}
                    id={theme.id}
                    title={theme.title}
                    date={theme.date}
                    icon={theme.icon}
                    flashcardCount={theme.flashcardCount || 0}
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-lg">Nenhum tema de flashcard encontrado. Crie um novo!</p>
            )}
          </section>

        </div>
      </PageHeaderSidebar>
    </div>
  );
}
