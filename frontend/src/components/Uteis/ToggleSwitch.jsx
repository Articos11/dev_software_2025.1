// src/components/ToggleSwitch.jsx
import React, { useState } from 'react';

function ToggleSwitch({ label, initialValue = false, onToggle, colorClass = 'peer-checked:bg-[var(--color-resumeai-teal)]' }) {
  const [isChecked, setIsChecked] = useState(initialValue);

  const handleToggle = () => {
    const newValue = !isChecked;
    setIsChecked(newValue);
    if (onToggle) {
      onToggle(newValue);
    }
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-base text-gray-700">{label}</span>
      <label className="relative inline-block w-10 h-6 cursor-pointer">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleToggle}
          className="opacity-0 w-0 h-0 peer"
        />
        <span className={`absolute inset-0 bg-gray-300 rounded-full transition-colors duration-400 ${colorClass}`}></span>
        <span className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-400 peer-checked:translate-x-4 shadow"></span>
      </label>
    </div>
  );
}

export default ToggleSwitch;