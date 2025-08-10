import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import PageHeaderSidebar from "../components/PageHeaderSidebar";
import PageHeader from "../components/PageHeader";
import Ativo29Icon from "../assets/Ativo_29.svg";

function SummaryPage() {
  const { summaryId } = useParams();

  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSummary() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:5000/api/summary/${summaryId}`);
        if (!response.ok) throw new Error(`Erro ao carregar resumo: ${response.statusText}`);

        const data = await response.json();
        setSummary(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchSummary();
  }, [summaryId]);

  if (loading) {
    return (
      <PageHeaderSidebar>
        <p className="text-center mt-20 text-gray-500">Carregando resumo...</p>
      </PageHeaderSidebar>
    );
  }

  if (error) {
    return (
      <PageHeaderSidebar>
        <p className="text-center mt-20 text-red-600">{error}</p>
        <Link to="/resumos" className="block mt-4 text-blue-600 hover:underline">Voltar para a lista de Resumos</Link>
      </PageHeaderSidebar>
    );
  }

  if (!summary) {
    return (
      <PageHeaderSidebar>
        <p className="text-center mt-20 text-gray-500">Resumo não encontrado.</p>
        <Link to="/resumos" className="block mt-4 text-blue-600 hover:underline">Voltar para a lista de Resumos</Link>
      </PageHeaderSidebar>
    );
  }

  return (
    <PageHeaderSidebar>
      <PageHeader
        title="Resumos"
        icon={Ativo29Icon}
        breadcrumbs={[
          { label: "Início", href: "/", className: "text-gray-500 cursor-pointer hover:text-[var(--color-resumeai-blue)]" },
          { label: "Coleção de Resumos", href: "/resumos", className: "text-gray-500 cursor-pointer hover:text-[var(--color-resumeai-blue)]" },
          { label: summary.titulo, className: "text-gray-700 text-semibold" }
        ]}
      />
      <h2 className="text-2xl mb-4 text-gray-800 mt-15 ml-23 self-start">{summary.titulo}</h2>
      <div className="flex-grow px-23 overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200">
        <div className="bg-white shadow-md p-7 rounded-[35px]">
          <p className="text-gray-800 text-base leading-relaxed whitespace-pre-wrap">{summary.texto}</p>
        </div>
      </div>
    </PageHeaderSidebar>
  );
}

export default SummaryPage;
