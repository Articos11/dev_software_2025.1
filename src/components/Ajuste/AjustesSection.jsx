import React, { useState } from "react";
import SettingsGroup from "./SettingsGroup";
import ToggleSwitch from "../Uteis/ToggleSwitch";
import SelectDropdown from "../Uteis/SelectDropdown";
import CardBox from "../Uteis/CardBox";
import QuantityInput from "../Uteis/QuantityInput";

export default function AjustesSection({ title = "Ajustes" }) {
  // Estado geral "ajustes" inspirado no primeiro código
  const [ajustes, setAjustes] = useState({
    separarTopicos: true,
    estruturaVisual: false,
    nivel: "simplified",
    linguagem: "pt-br",
    gerarFlashcards: true,
    qtdFlashcards: 1,
  });

  // Controle separado do flashcards (para não perder a lógica do segundo)
  const [generateFlashcards, setGenerateFlashcards] = useState(ajustes.gerarFlashcards);

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

  // Atualiza ajustes mantendo o estado de gerarFlashcards sincronizado
  const handleToggleChange = (label, newValue) => {
    console.log(`${label} Toggled:`, newValue);

    if (label === "Gerar flashcards") {
      setGenerateFlashcards(newValue);
      setAjustes(prev => ({ ...prev, gerarFlashcards: newValue }));
      return;
    }

    // Mapeamento dos labels para as chaves do estado ajustes
    const mapLabelToKey = {
      "Separar em tópicos": "separarTopicos",
      "Estrutura visual": "estruturaVisual",
    };

    const key = mapLabelToKey[label];
    if (key) {
      setAjustes(prev => ({ ...prev, [key]: newValue }));
    }
  };

  const handleLanguageChange = (value) => {
    console.log("Linguagem selecionada:", value);
    setAjustes(prev => ({ ...prev, nivel: value }));
  };

  const handleResumeLanguageChange = (value) => {
    console.log("Idioma do Resumo selecionado:", value);
    setAjustes(prev => ({ ...prev, linguagem: value }));
  };

  const handleQuantityChange = (newValue) => {
    console.log("Quantidade selecionada:", newValue);
    setAjustes(prev => ({ ...prev, qtdFlashcards: newValue }));
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
            initialValue={ajustes.separarTopicos}
            onToggle={(val) => handleToggleChange("Separar em tópicos", val)}
          />
          <ToggleSwitch
            label="Estrutura visual"
            initialValue={ajustes.estruturaVisual}
            onToggle={(val) => handleToggleChange("Estrutura visual", val)}
          />
        </SettingsGroup>

        <SettingsGroup title="Linguagem">
          <SelectDropdown
            label="Padrão de escrita"
            options={languageOptions}
            value={ajustes.nivel}
            onChange={handleLanguageChange}
          />
          <SelectDropdown
            label="Idioma do Resumo"
            options={resumeLanguageOptions}
            value={ajustes.linguagem}
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
              initialValue={ajustes.qtdFlashcards}
              max={15}
              onChange={handleQuantityChange}
            />
          )}
        </SettingsGroup>
      </CardBox>
    </div>
  );
}
