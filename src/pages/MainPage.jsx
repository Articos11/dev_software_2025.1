import React, { useState } from "react";
import MainLogo from "../components/MainLogo";
import ResizableInputBar from "../components/ResizableInputBar";
import PageHeaderSidebar from "../components/PageHeaderSidebar";
import { sendMessageToChat, analyzePdf } from "../services/apiServices";
import { useNavigate } from "react-router-dom";

function MainPage() {
  const [resposta, setResposta] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState(null);
  const [logoVisivel, setLogoVisivel] = useState(true);

  const navigate = useNavigate();

  const handleSubmit = async (mensagemEnviada) => {
    setCarregando(true);
    setErro(null);
    setResposta('');
    setLogoVisivel(false);

    try {
      let data;

      if (typeof mensagemEnviada === 'string') {
        // Envia apenas texto
        data = await sendMessageToChat(mensagemEnviada);
        setResposta(data?.resposta || 'Nenhuma resposta recebida.');
      } else if (mensagemEnviada?.file instanceof File) {
        // Envia PDF com prompt
        const formData = new FormData();
        formData.append('pdf', mensagemEnviada.file);

        if (mensagemEnviada.prompt) {
          formData.append('prompt', mensagemEnviada.prompt);
        }

        data = await analyzePdf(formData);

        // Redireciona com a resposta da LLM
        navigate("/conferir_texto", { state: { texto: data.resposta } });
      } else {
        throw new Error('Formato de mensagem inválido.');
      }

    } catch (e) {
      console.error(e);
      setErro("Erro ao enviar dados. Verifique a conexão ou o formato da mensagem.");
    } finally {
      setCarregando(false);
    }
  };

  return (
    <PageHeaderSidebar>
      <div className="flex-grow max-h-45"></div>
      {logoVisivel && <MainLogo />}
      {carregando && <p className="text-center text-gray-400">Processando...</p>}
      {erro && <p className="text-center text-red-500">{erro}</p>}
      {resposta && <p className="text-center text-green-700 font-medium">{resposta}</p>}
      <div className="flex-grow"></div>
      <ResizableInputBar 
        onSubmit={handleSubmit}
        isLoading={carregando}
      />
    </PageHeaderSidebar>
  );
}

export default MainPage;
