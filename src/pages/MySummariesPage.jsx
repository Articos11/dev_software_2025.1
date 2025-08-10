import React, { useState, useEffect } from "react";
import PageHeaderSidebar from "../components/PageHeaderSidebar";
import PageHeader from "../components/PageHeader";
import SummaryBox from "../components/SummaryBox";

export default function MySummariesPage() {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      setError("Usuário não autenticado.");
      setLoading(false);
      return;
    }
    const user = JSON.parse(storedUser);

    fetch(`http://localhost:5000/api/my-summaries?user_id=${user.id}`)
      .then((res) => {
        if (!res.ok) throw new Error(`Erro ao carregar resumos: ${res.statusText}`);
        return res.json();
      })
      .then((data) => {
        setSummaries(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <PageHeaderSidebar>
        <p className="text-center mt-20 text-gray-500">Carregando resumos...</p>
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
    <PageHeaderSidebar>
      <PageHeader
        title="Resumos"
        icon="src/assets/Ativo_29.svg"
        breadcrumbs={[
          { label: "Início", href: "/", className: "text-gray-500 cursor-pointer hover:text-[var(--color-resumeai-blue)]" },
          { label: "Coleção de Resumos", className: "text-gray-700 text-semibold" }
        ]}
      />
      <div className="flex flex-grow px-22 h-full w-full overflow-y-hidden overflow-x-hidden">
        <div className="flex grow-1 max-w-290 flex-col mt-15 gap-4 pr-4 overflow-y-auto overflow-x-hidden scrollbar-thumb-rounded-full scrollbar-h-20 scrollbar-track-rounded-full scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200">
          {summaries.length > 0 ? (
            summaries.map((summary) => (
              <SummaryBox
                key={summary.id}
                id={summary.id}
                title={summary.title}
                date={summary.date}
                icon={summary.icon}
              />
            ))
          ) : (
            <p className="text-gray-500 text-lg">
              Nenhum resumo encontrado. Crie um novo!
            </p>
          )}
        </div>
      </div>
    </PageHeaderSidebar>
  );
}
