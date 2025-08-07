import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import PageHeaderSidebar from "../components/PageHeaderSidebar";
import CardBox from "../components/Uteis/CardBox";
import SettingsGroup from "../components/Ajuste/SettingsGroup";
import FlashcardThumbnails from "../components/Salvamento/FlashcardThumbnails";
import SelectDropdown from "../components/Uteis/SelectDropdown";
import jsPDF from "jspdf";

export default function SaveSummaryPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const { texto = "Nenhum resumo recebido.", ajustes = {}, promptAdicional = "" } = location.state || {};
  const [text, setText] = useState(texto);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState(null);

  const projetosSalvos = [
    { value: "none", label: "Selecionar..." },
    { value: "project1", label: "Projeto 1" },
    { value: "project2", label: "Projeto 2" },
    { value: "project3", label: "Projeto 3" },
  ];

  // Função para gerar PDF e retornar base64
  const gerarPdfBase64 = () => {
    const doc = new jsPDF();

    const margem = 10;
    const larguraPagina = doc.internal.pageSize.getWidth() - margem * 2;
    let posY = 20;

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.text("Resumo Final", margem, posY);
    posY += 10;

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    const linhas = doc.splitTextToSize(text, larguraPagina);
    doc.text(linhas, margem, posY);

    // Retorna o PDF em base64 (data URI)
    return doc.output("datauristring");
  };

  const handleSaveSummary = async () => {
    setSalvando(true);
    setErro(null);

    try {
      const storedUser = localStorage.getItem("user");
      if (!storedUser) {
        setErro("Usuário não autenticado.");
        setSalvando(false);
        return;
      }
      const user = JSON.parse(storedUser);

      // Envia para a API salvar o resumo
      const response = await fetch("http://localhost:5000/api/save-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          texto: text,
          ajustes,
          promptAdicional,
          user_id: user.id,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.erro || "Falha ao salvar resumo");
      }

      // Gera PDF e salva base64 no localStorage, usando o id do resumo retornado da API
      const pdfBase64 = gerarPdfBase64();
      localStorage.setItem(`pdfResumo_${data.summary_id}`, pdfBase64);

      alert("Resumo salvo com sucesso! PDF armazenado localmente para download.");

      navigate("/resumos");

    } catch (error) {
      setErro(error.message);
    } finally {
      setSalvando(false);
    }
  };

  return (
    <PageHeaderSidebar>
      <div className="flex-grow max-h-30"></div>

      <div className="flex items-center justify-between gap-3">
        <h2 className="text-2xl align-middle">Aqui está seu resumo</h2>
        <span>
          <img src="src/assets/Ativo_4.svg" className="h-6 w-6 mt-1" alt="Ícone resumo" />
        </span>
      </div>

      <div className="flex grow w-full p-6 gap-8 mt-8">
        <div className="flex flex-col grow w-full">
          <div className="w-full h-10 text-2xl pl-4 mb-2 font-bold">Resumo</div>
          <textarea
            className="bg-white shadow-md rounded-[25px] p-5 size-full scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200 outline-none resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
        </div>

        <CardBox className="max-w-[400px]">
          <SettingsGroup title="Flashcards">
            <FlashcardThumbnails
              quantidade={ajustes.flashcards?.quantidade || 1}
              gerar={ajustes.flashcards?.gerar || false}
            />
          </SettingsGroup>

          <SettingsGroup title="Projeto">
            <SelectDropdown
              label="Salvar em algum projeto?"
              options={projetosSalvos}
            />
          </SettingsGroup>

          <div className="flex-1" />

          <div className="w-full flex flex-col items-center gap-2 justify-center mt-5">
            <button
              onClick={handleSaveSummary}
              disabled={salvando}
              className="bg-[var(--color-resumeai-teal)] text-white font-semibold px-3 py-2 w-50 rounded-full hover:bg-teal-700 shadow-sm"
            >
              {salvando ? "Salvando..." : "Salvar Resumo"}
            </button>

            {erro && <p className="text-red-600 mt-2">{erro}</p>}

            <Link to="/conferir_texto" state={{ texto: text, ajustes, promptAdicional }}>
              <button className="px-4 py-1 bg-gray-200 rounded-full text-gray-700 font-semibold hover:bg-gray-300 mt-2">
                Refazer
              </button>
            </Link>
          </div>
        </CardBox>
      </div>
    </PageHeaderSidebar>
  );
}
