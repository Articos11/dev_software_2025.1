// src/components/AjustesSection.jsx
import React, { useRef, useState, useEffect } from "react";
import SettingsGroup from "./SettingsGroup";
import ToggleSwitch from "../Uteis/ToggleSwitch";
import SelectDropdown from "../Uteis/SelectDropdown";
import CardBox from "../Uteis/CardBox";

export default function AjustesSection({ title = "Ajustes" }) {
  const [text, setText] = useState(
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate...`
  );

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
  };

  const handleLanguageChange = (value) => {
    console.log("Linguagem selecionada:", value);
  };

  const handleResumeLanguageChange = (value) => {
    console.log("Idioma do Resumo selecionado:", value);
  };

  return (
    <div className="flex flex-grow grow-1  flex-col">
      <div className="mb-3 flex justify-between items-baseline">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>

      <CardBox>
        <SettingsGroup title="Estrutura">
          <ToggleSwitch label="Separar em tópicos" initialValue={true} />
          <ToggleSwitch label="Estrutura visual" />
        </SettingsGroup>
        <SettingsGroup title="Linguagem">
          <SelectDropdown label="Padrão de escrita" options={languageOptions} />
          <SelectDropdown
            label="Idioma do Resumo"
            options={resumeLanguageOptions}
          ></SelectDropdown>
        </SettingsGroup>
        <SettingsGroup title="Flashcards">
          <ToggleSwitch label="Gerar flashcards" initialValue={true} />
        </SettingsGroup>
      </CardBox>
    </div>
  );
}
