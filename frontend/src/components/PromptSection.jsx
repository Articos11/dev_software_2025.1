// src/components/PromptSection.jsx
import React from 'react';

function PromptSection({
  title = "Prompt",
  optionalText = "opcional",
  placeholder = "Aqui você pode especificar mais ainda os detalhes...",
  prompt = "",
  setPrompt
}) {
  const handleChange = (event) => {
    setPrompt?.(event.target.value);
  };

  return (
    <div className="flex flex-col mt-8 pb-4 mb-6">
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        {title}
        {optionalText && <span className="text-sm text-gray-500 ml-2">{optionalText}</span>}
      </h3>
      
      <textarea
        value={prompt}
        onChange={handleChange}
        placeholder={placeholder}
        rows="5"
        className="w-full p-4 bg-white rounded-md font-sans text-sm resize-y 
                   min-h-[100px] max-h-[150px] outline-none focus:ring-2 focus:ring-[var(--color-resumeai-blue)]
                   overflow-y-auto scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200"
      />
    </div>
  );
}

export default PromptSection;
