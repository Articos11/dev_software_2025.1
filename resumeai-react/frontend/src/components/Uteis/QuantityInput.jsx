import Ativo17Icon from "../../assets/Ativo 17.svg";
import React, { useState } from "react";

function QuantityInput({
  label = "Quantidade:",
  initialValue = 1,
  min = 1,
  max = 15,
  onChange,
}) {
  const [count, setCount] = useState(initialValue);

  const handleIncrement = () => {
    const newValue = Math.min(count + 1, max);
    setCount(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleDecrement = () => {
    const newValue = Math.max(count - 1, min);
    setCount(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const handleChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      const newValue = Math.min(Math.max(value, min), max);
      setCount(newValue);
      if (onChange) {
        onChange(newValue);
      }
    } else {
      setCount(min);
      if (onChange) {
        onChange(min);
      }
    }
  };

  return (
    // O contêiner principal agora é 'flex items-center justify-between' e ocupa 'w-full'
    // Isso fará com que o 'label' fique à esquerda e a 'div' da contagem à direita.
    <div className="flex items-center justify-between w-full">
      {/* Rótulo da quantidade */}
      <label className="text-base text-gray-700">{label}</label>

      {/* Container do input numérico e botões */}
      <div className="flex items-center rounded-xl bg-gray-200 shadow-sm overflow-hidden h-8 min-h-8">
        {/* Input Numérico: Largura diminuída de w-16 para w-12 */}
        <input
          type="number"
          value={String(count).padStart(2, "0")} // Garante dois dígitos: '01', '02', etc.
          onChange={handleChange}
          min={min}
          max={max}
          className="w-12 h-8 p-1 text-center text-base font-medium text-gray-800 bg-transparent outline-none appearance-none [-moz-appearance:_textfield] [&::-webkit-outer-spin-button]:m-0 [&::-webkit-inner-spin-button]:m-0"
        />

        {/* Botões de Incremento/Decremento */}
        <div className="flex flex-col border-l border-gray-300 h-8 min-h-8">
          <button
            onClick={handleIncrement}
            disabled={count === max}
            className="flex-1 px-1 py-0 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed h-4 min-h-4"
          >
            <img
              src={Ativo17Icon}
              alt="Incrementar"
              className="w-3 h-3 rotate-[270deg]"
            />
          </button>
          <button
            onClick={handleDecrement}
            disabled={count === min}
            className="flex-1 px-1 py-0 flex items-center justify-center text-gray-600 hover:bg-gray-300 transition disabled:opacity-50 disabled:cursor-not-allowed h-4 min-h-4"
          >
            <img
              src={Ativo17Icon}
              alt="Decrementar"
              className="w-3 h-3 rotate-90"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuantityInput;
