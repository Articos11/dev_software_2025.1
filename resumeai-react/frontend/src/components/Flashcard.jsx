import React, { useState } from 'react';

function Flashcard({ frontContent, backContent, onFlip }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (onFlip) {
      onFlip(!isFlipped); // Notifica o componente pai sobre a virada
    }
  };

  return (
    <div
      onClick={handleFlip} // Torna o flashcard clicável para virar
      className="relative w-80 h-48 bg-white rounded-lg shadow-xl cursor-pointer perspective-1000"
      // 'perspective-1000' é necessário para o efeito 3D de virar. Adicione-o ao tailwind.config.js
      // no theme.extend.perspective e theme.extend.transformPerspective
    >
      <div
        className={`relative w-full h-full text-center transition-transform duration-700 preserve-3d
                    ${isFlipped ? 'rotate-y-180' : ''}`}
        // 'preserve-3d' é necessário para o efeito 3D. Adicione ao tailwind.config.js
      >
        {/* Frente do Flashcard */}
        <div className="absolute w-full h-full backface-hidden rounded-lg flex items-center justify-center p-4 bg-white text-gray-800 text-2xl font-semibold">
          {frontContent}
        </div>

        {/* Verso do Flashcard */}
        <div className="absolute w-full h-full backface-hidden rounded-lg flex items-center justify-center p-4 bg-blue-500 text-white text-xl rotate-y-180">
          {backContent}
        </div>
      </div>
    </div>
  );
}

export default Flashcard;