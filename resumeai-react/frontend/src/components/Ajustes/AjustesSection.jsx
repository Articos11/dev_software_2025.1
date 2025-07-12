// src/components/AjustesSection.jsx
import React, { useRef, useState, useEffect } from "react";
import SettingsGroup from "./SettingsGroup";
import ToggleSwitch from "../outils/ToggleSwitch";
import SelectDropdown from "../outils/SelectDropdown";

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
    { label: "Português Brasileiro", value: "pt-br" },
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
    <div className="flex flex-grow flex-col">
      <div className="mb-3 flex justify-between items-baseline">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="bg-[var(--color-resumeai-purple)] rounded-[25px] shadow w-full h-full flex flex-col">
        <div className="h-10 items-center flex justify-center px-13">
          {" "}
          <div className="h-2 rounded-full bg-white w-[70%]"></div>
        </div>
        <section className="bg-white w-full h-full rounded-[25px] px-5 pt-5 items-center justify-center last:mb-0 last:mb-0">
          <SettingsGroup title="Estrutura">
            <ToggleSwitch label="Separar em tópicos" initialValue={true} />
            <ToggleSwitch label="Estrutura visual" />
          </SettingsGroup>
          <SettingsGroup title="Linguagem">
            <SelectDropdown
              label="Padrão de escrita"
              options={languageOptions}
            />
            <SelectDropdown
              label="Idioma do Resumo"
              options={resumeLanguageOptions}
            ></SelectDropdown>
          </SettingsGroup>
          <SettingsGroup title="Flashcards">
            <ToggleSwitch label="Gerar flashcards" initialValue={true} />
          </SettingsGroup>
        </section>
      </div>
    </div>
  );
}
