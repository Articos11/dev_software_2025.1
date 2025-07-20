// src/components/AjustesSection.jsx
import React, { useState } from "react";
import SettingsGroup from "./SettingsGroup";
import ToggleSwitch from "../Uteis/ToggleSwitch";
import SelectDropdown from "../Uteis/SelectDropdown";
import CardBox from "../Uteis/CardBox";
import QuantityInput from "../Uteis/QuantityInput";

export default function AjustesSection({ title = "Ajustes" }) {
  const [generateFlashcards, setGenerateFlashcards] = useState(true);

  const languageOptions = [
    { label: "Simplificada", value: "simplified" },
    { label: "Informal", value: "informal" },
    { label: "Acadêmica", value: "academic" },
  ];

  const resumeLanguageOptions = [
    { label: "Português", value: "pt-br" },
    { label: "English", value: "en" },
    { label: "Español", value: "es" },
  ];

  const handleToggleChange = (label, newValue) => {
    console.log(`${label} Toggled:`, newValue);
    if (label === "Gerar flashcards") {
      setGenerateFlashcards(newValue);
    }
  };

  const handleLanguageChange = (value) => {
    console.log("Linguagem selecionada:", value);
  };

  const handleResumeLanguageChange = (value) => {
    console.log("Idioma do Resumo selecionado:", value);
  };

  const handleQuantityChange = (newValue) => {
    console.log("Quantidade selecionada:", newValue);
  };

  return (
    <div className="flex flex-grow grow-1 flex-col">
      <div className="mb-3 flex justify-between items-baseline">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>

      <CardBox>
        <SettingsGroup title="Estrutura">
          <ToggleSwitch
            label="Separar em tópicos"
            initialValue={true}
            onToggle={(val) => handleToggleChange("Separar em tópicos", val)}
          />
          <ToggleSwitch
            label="Estrutura visual"
            initialValue={false}
            onToggle={(val) => handleToggleChange("Estrutura visual", val)}
          />
        </SettingsGroup>

        <SettingsGroup title="Linguagem">
          <SelectDropdown
            label="Padrão de escrita"
            options={languageOptions}
            onChange={handleLanguageChange}
          />
          <SelectDropdown
            label="Idioma do Resumo"
            options={resumeLanguageOptions}
            onChange={handleResumeLanguageChange}
          />
        </SettingsGroup>

        <SettingsGroup title="Flashcards">
          <ToggleSwitch
            label="Gerar flashcards"
            initialValue={generateFlashcards}
            onToggle={(val) => handleToggleChange("Gerar flashcards", val)}
          />
          {generateFlashcards && (
            <QuantityInput
              label="Quantidade:"
              initialValue={1}
              max={15}
              onChange={handleQuantityChange}
            />
          )}
        </SettingsGroup>
      </CardBox>
    </div>
  );
}