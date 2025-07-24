// frontend/src/pages/CheckPage_PDF.jsx
import React, { useState, useEffect } from 'react';
import ConferirTextoSection from '../components/ConferirTextoSection'; // Ajuste o caminho conforme sua estrutura

function CheckPage_PDF() {
    const [summaryText, setSummaryText] = useState('');
    const [summaryPrompt, setSummaryPrompt] = useState(''); // Opcional: para exibir o prompt usado

    useEffect(() => {
        // Tenta carregar o resumo e o prompt do localStorage ao montar a página
        const storedSummary = localStorage.getItem('currentPdfSummary');
        const storedPrompt = localStorage.getItem('currentPdfPrompt');
        if (storedSummary) {
            setSummaryText(storedSummary);
        }
        if (storedPrompt) {
            setSummaryPrompt(storedPrompt);
        }
    }, []); // Executa apenas uma vez ao montar

    return (
        <div className="p-4">
            {/* Você pode adicionar um título ou outra UI aqui */}
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Conferir Informações do Resumo</h1>
            
            {summaryText ? (
                <ConferirTextoSection 
                    title="Resumo Gerado" 
                    initialText={summaryText} // Passa o resumo real para o componente
                    charactheres={summaryText.length} 
                />
            ) : (
                <p className="text-gray-600 text-center">Nenhum resumo disponível. Por favor, gere um resumo na página de sumarização.</p>
            )}

            {/* Opcional: Exibir o prompt usado */}
            {summaryPrompt && (
                <div className="mt-4 p-3 bg-gray-100 rounded-md text-sm text-gray-700">
                    <p><strong>Prompt Utilizado:</strong> {summaryPrompt}</p>
                </div>
            )}
        </div>
    );
}

export default CheckPage_PDF;
