// frontend/src/pages/SummariesPage.jsx
import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://127.0.0.1:5000/api';

function SummariesPage() {
    const navigate = useNavigate();
    const fileInputRef = useRef(null); // Cria uma referência para o input de arquivo

    const [promptText, setPromptText] = useState('');
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [summary, setSummary] = useState(''); // Este estado não é usado diretamente na renderização, mas mantido para consistência
    const [isLoadingPdf, setIsLoadingPdf] = useState(false);
    const [pdfError, setPdfError] = useState('');

    const clearPdfFeedback = () => {
        setPdfError('');
        setIsLoadingPdf(false);
        setSummary('');
    };

    const handleFilesSelected = (event) => {
        // Acessa os arquivos de event.target.files
        const files = Array.from(event.target.files);
        setSelectedFiles(files);
        console.log('DEBUG: Arquivos selecionados atualizados no estado da SummariesPage:', files);
    };

    const handleTextChange = (event) => {
        setPromptText(event.target.value);
        console.log('DEBUG: Prompt atualizado no estado da SummariesPage:', event.target.value);
    };

    const handlePdfSubmit = async () => {
        console.log('DEBUG: handlePdfSubmit acionado na SummariesPage!');
        clearPdfFeedback();
        setIsLoadingPdf(true);

        console.log('DEBUG: Arquivos disponíveis:', selectedFiles);
        selectedFiles.forEach(file => {
            console.log(`Arquivo: ${file.name}, tipo: ${file.type}`);
        });

        // Aprimorada a verificação do tipo de arquivo
        const pdfFileToSend = selectedFiles.find(file =>
            file.type === 'application/pdf' ||
            file.name.toLowerCase().endsWith('.pdf')
        );

        if (!pdfFileToSend) {
            setPdfError('Por favor, selecione um arquivo PDF válido.');
            setIsLoadingPdf(false);
            console.log('DEBUG: Erro: Nenhum PDF válido selecionado.');
            return;
        }

        const formData = new FormData();
        formData.append('pdf', pdfFileToSend);
        formData.append('prompt', promptText);

        console.log('DEBUG: Preparando requisição fetch para /analyze-pdf...');
        console.log('DEBUG: URL:', `${API_BASE_URL}/analyze-pdf`);
        console.log('DEBUG: Prompt a ser enviado:', promptText);
        console.log('DEBUG: Arquivo PDF a ser enviado:', pdfFileToSend.name);

        try {
            const response = await fetch(`${API_BASE_URL}/analyze-pdf`, {
                method: 'POST',
                body: formData,
            });
            const data = await response.json();

            console.log('DEBUG: Resposta da API (status):', response.status);
            console.log('DEBUG: Resposta da API (dados):', data);

            if (response.ok) {
                localStorage.setItem('currentPdfSummary', data.resposta);
                localStorage.setItem('currentPdfPrompt', promptText);
                console.log('DEBUG: Resumo salvo no localStorage ANTES DE NAVEGAR:', data.resposta);
                navigate('/conferir_pdf');
            } else {
                setPdfError(data.erro || 'Erro ao analisar PDF.');
                localStorage.removeItem('currentPdfSummary');
                localStorage.removeItem('currentPdfPrompt');
                console.error('DEBUG: Erro da API ao gerar resumo:', data.erro);
            }
        } catch (error) {
            console.error('DEBUG: Erro na comunicação com a API de PDF (catch):', error);
            setPdfError('Não foi possível conectar ao servidor para análise de PDF. Verifique se o backend está em execução.');
            localStorage.removeItem('currentPdfSummary');
            localStorage.removeItem('currentPdfPrompt');
        } finally {
            setIsLoadingPdf(false);
            console.log('DEBUG: Finalizado handlePdfSubmit.');
        }
    };

    const isSubmitButtonDisabled =
        isLoadingPdf ||
        selectedFiles.length === 0 ||
        !selectedFiles.some(file =>
            file.type === 'application/pdf' ||
            file.name.toLowerCase().endsWith('.pdf')
        );

    return (
        <div className="p-4 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold text-purple-700 text-center mb-6">Gerar Resumo de PDF</h1>

            {/* Prompt Textarea */}
            <div className="mb-4">
                <label htmlFor="prompt-text" className="block text-gray-700 text-sm font-bold mb-2">
                    Digite seu prompt (opcional):
                </label>
                <textarea
                    id="prompt-text"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32 resize-y"
                    placeholder="Você gostaria de algo mais específico no resumo? Digite aqui..."
                    value={promptText}
                    onChange={handleTextChange}
                ></textarea>
            </div>

            {/* File Input */}
            <div className="mb-6">
                <label htmlFor="pdf-file" className="block text-gray-700 text-sm font-bold mb-2">
                    Selecione um arquivo PDF:
                </label>
                <input
                    type="file"
                    id="pdf-file"
                    ref={fileInputRef} // Anexa a referência
                    accept=".pdf" // Sugere apenas arquivos PDF
                    onChange={handleFilesSelected}
                    className="block w-full text-sm text-gray-500
                               file:mr-4 file:py-2 file:px-4
                               file:rounded-full file:border-0
                               file:text-sm file:font-semibold
                               file:bg-purple-50 file:text-purple-700
                               hover:file:bg-purple-100"
                />
                {selectedFiles.length > 0 && (
                    <p className="mt-2 text-sm text-gray-600">
                        Arquivo selecionado: {selectedFiles[0]?.name}
                    </p>
                )}
            </div>

            {/* Submit Button */}
            <button
                onClick={handlePdfSubmit}
                disabled={isSubmitButtonDisabled}
                className={`w-full py-3 px-4 rounded-md text-white font-semibold transition duration-300
                            ${isSubmitButtonDisabled
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2'
                            }`}
            >
                {isLoadingPdf ? 'Gerando Resumo...' : 'Gerar Resumo do PDF'}
            </button>


            {pdfError && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative text-center mt-4 rounded-md" role="alert">
                    {pdfError}
                </div>
            )}
        </div>
    );
}

export default SummariesPage;