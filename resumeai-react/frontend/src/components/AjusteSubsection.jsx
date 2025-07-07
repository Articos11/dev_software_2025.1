// src/components/SettingsGroup.jsx
import React from 'react';

function AjusteSubsection({ title, children }) {
  return (
    // Estilos para a div do grupo: padding-bottom e margin-bottom, com uma borda inferior para separar
    <div className="pb-4 mb-6 border-b border-gray-200">
      {/* Título da subseção */}
      <h3 className="text-lg font-medium text-gray-700 mb-4">{title}</h3>
      {/* O conteúdo (os toggles, inputs, etc.) será renderizado aqui */}
      <div className="space-y-2"> {/* Adiciona espaço vertical entre os itens filhos */}
        {children}
      </div>
    </div>
  );
}

export default AjusteSubsection;