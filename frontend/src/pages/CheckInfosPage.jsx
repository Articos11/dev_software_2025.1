import React, { useState } from "react";
import PageHeaderSidebar from "../components/PageHeaderSidebar";
import AjustesSection from "../components/Ajuste/AjustesSection";
import ConferirTextoSection from "../components/ConferirTextoSection";
import PromptSection from "../components/PromptSection";
import { useLocation, useNavigate } from "react-router-dom";
import { sendMessageToChat } from "../services/apiServices";

function CheckInfosPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const texto = location.state?.texto || "";

  // Estado para ajustes e prompt adicional
  const [ajustes, setAjustes] = useState({
    estrutura: {
      separarTopicos: true,
      estruturaVisual: false,
    },
    linguagem: {
      padrao: "simplified",
      idiomaResumo: "pt-br",
    },
    flashcards: {
      gerar: true,
      quantidade: 1,
    },
  });

  const [promptAdicional, setPromptAdicional] = useState("");

  const atualizarAjuste = (grupo, chave, valor) => {
    setAjustes((prev) => ({
      ...prev,
      [grupo]: {
        ...prev[grupo],
        [chave]: valor,
      },
    }));
  };

  // Função para construir a mensagem enviada à API
  const construirMensagem = (texto, ajustes, prompt) => {
    let mensagem = texto;

    if (ajustes.estrutura.separarTopicos) {
      mensagem += "\nPor favor, separe o texto em tópicos.";
    }

    if (ajustes.estrutura.estruturaVisual) {
      mensagem += "\nUtilize uma estrutura visual clara.";
    }

    mensagem += `\nPadrão de escrita: ${ajustes.linguagem.padrao}`;
    mensagem += `\nIdioma do resumo: ${ajustes.linguagem.idiomaResumo}`;

    if (prompt) {
      mensagem += `\n${prompt}`;
    }

    return mensagem;
  };

  // Enviar dados ao backend e navegar para salvar resumo
  const handleProsseguir = async () => {
   try {
    const mensagem = construirMensagem(texto, ajustes, promptAdicional);

    const response = await sendMessageToChat(mensagem);

    // Aqui enviamos todos os dados para a próxima página
    navigate("/salvar_resumo", {
      state: {
        texto: response.resposta,  // resumo recebido da API
        ajustes,
        promptAdicional,
      },
    });
  } catch (error) {
    console.error("Erro ao gerar resumo ajustado:", error);
  }
  };

  return (
    <PageHeaderSidebar>
      <div className="flex-grow max-h-45"></div>
      <div className="flex flex-grow space-between gap-6 w-full p-4">
        <ConferirTextoSection texto={texto} />
        <AjustesSection ajustes={ajustes} onChange={atualizarAjuste} />
        <div className="flex flex-col grow-[2]">
          <PromptSection prompt={promptAdicional} setPrompt={setPromptAdicional} />
          <button
            onClick={handleProsseguir}
            className="bg-[var(--color-resumeai-teal)] text-white font-bold px-3 py-2 w-32 rounded-full hover:bg-teal-500 shadow-sm"
          >
            Prosseguir
          </button>
        </div>
      </div>
    </PageHeaderSidebar>
  );
}

export default CheckInfosPage;
