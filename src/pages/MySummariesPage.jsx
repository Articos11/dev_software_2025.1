import React, { useEffect, useState } from "react";
import PageHeaderSidebar from "../components/PageHeaderSidebar";
import PageHeader from "../components/PageHeader";
import SummaryBox from "../components/SummaryBox";
import DefaultSummaryIcon from "../assets/Ativo 29.svg";

export default function MySummariesPage() {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => {
    const fetchSummaries = async () => {
      try {
        const storedUser = localStorage.getItem("user");
        if (!storedUser) {
          setErro("Usuário não autenticado.");
          setLoading(false);
          return;
        }
        const user = JSON.parse(storedUser);

        const response = await fetch(`http://localhost:5000/api/my-summaries?user_id=${user.id}`);
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.erro || "Falha ao buscar resumos");
        }

        setSummaries(data);
      } catch (error) {
        setErro(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSummaries();
  }, []);

  // Função para baixar PDF do resumo pelo id
  const baixarPdfResumo = (id, title) => {
    const pdfBase64 = localStorage.getItem(`pdfResumo_${id}`);
    if (!pdfBase64) {
      alert(`PDF do resumo "${title}" não encontrado para download.`);
      return;
    }

    const link = document.createElement("a");
    link.href = pdfBase64;
    // Usa título para nome do arquivo, substituindo espaços por _
    link.download = `${title.replace(/\s+/g, "_")}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <PageHeaderSidebar>
        <PageHeader
          title="Resumos"
          icon="src/assets/Ativo 29.svg"
          breadcrumbs={[
            { label: "Início", href: "/", className: "text-gray-500 cursor-pointer hover:text-[var(--color-resumeai-blue)]" },
            { label: "Coleção de Resumos", className: "text-gray-700 text-semibold" }
          ]}
        />

        <div className="flex flex-grow px-22 h-full w-full overflow-y-hidden overflow-x-hidden">
          <div className="flex grow-1 max-w-290 flex-col mt-15 gap-4 pr-4 overflow-y-auto overflow-x-hidden scrollbar-thumb-rounded-full scrollbar-h-20 scrollbar-track-rounded-full scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {loading && <p>Carregando resumos...</p>}
            {erro && <p className="text-red-600">{erro}</p>}
            {!loading && !erro && (
              summaries.length > 0 ? (
                summaries.map((summary) => (
                  <SummaryBox
                    key={summary.id}
                    id={summary.id}
                    title={summary.title}
                    date={summary.date}
                    icon={DefaultSummaryIcon}
                    onDownload={() => baixarPdfResumo(summary.id, summary.title)}
                  />
                ))
              ) : (
                <p className="text-gray-500 text-lg">
                  Nenhum resumo encontrado. Crie um novo!
                </p>
              )
            )}
          </div>
        </div>
      </PageHeaderSidebar>
    </div>
  );
}
