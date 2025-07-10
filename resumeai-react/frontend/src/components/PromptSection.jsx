// src/components/PromptSection.jsx
import React, { useState } from 'react';

function PromptSection({
  title = "Prompt",
  optionalText = "(opcional)",
  placeholder = "Aqui você pode especificar mais ainda os detalhes...",
  initialValue = "",
  onChange
}) {
  const [text, setText] = useState(initialValue);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setText(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <div className="flex flex-grow flex-col mt-8 pb-4 mb-6">
      {/* Título da seção */}
      <h3 className="text-lg font-medium text-gray-700 mb-2">
        {title}
        {optionalText && <span className="text-sm text-gray-500 ml-2">{optionalText}</span>}
      </h3>
      
      {/* Textarea para o prompt */}
      <textarea
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        rows="5"
        className="w-full p-4 bg-white shadow-sm rounded-md font-sans text-sm resize-y 
                   min-h-[100px] max-h-[150px] outline-none focus:ring-2 focus:ring-blue-500
                   overflow-y-auto scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200"
      ></textarea>
    </div>
  );
}

export default PromptSection;