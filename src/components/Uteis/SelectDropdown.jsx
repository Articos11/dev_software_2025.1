// src/components/SelectDropdown.jsx
import React, { useState } from 'react';

function SelectDropdown({ label, options, defaultValue, onChange }) {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    if (onChange) {
      onChange(newValue); // Chama a função onChange passada pelo componente pai
    }
  };

  return (
    <div className="flex flex-grow items-center justify-between w-full">
      {/* Rótulo do dropdown */}
      {label && (
        <label htmlFor={`select-${label}`} className="text-md text-gray-700 mb-2">
          {label}
        </label>
      )}

      {/* Contêiner do select com um ícone de seta customizado */}
      <div className="relative">
        <select
          id={`select-${label}`}
          value={selectedValue}
          onChange={handleChange}
          className="w-full p-2 pr-8 rounded-full bg-gray-200 text-base cursor-pointer
                     appearance-none focus:outline-none focus:ring-2 focus:ring-[var(--color-resumeai-blue)]"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Ícone de seta customizado (usando um SVG simples ou um caractere) */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg
            className="fill-current h-4 w-4"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
          </svg>
        </div>
      </div>
    </div>
  );
}

export default SelectDropdown;