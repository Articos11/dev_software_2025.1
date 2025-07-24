import React from "react";
import SettingsGroup from "./SettingsGroup";
import ToggleSwitch from "../Uteis/ToggleSwitch";
import SelectDropdown from "../Uteis/SelectDropdown";
import CardBox from "../Uteis/CardBox";
import QuantityInput from "../Uteis/QuantityInput";

export default function AjustesSection({ title = "Ajustes", ajustes, setAjustes }) {
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

  const handleToggle = (key, value) => {
    setAjustes((prev) => ({ ...prev, [key]: value }));
  };

  const handleSelect = (key, value) => {
    setAjustes((prev) => ({ ...prev, [key]: value }));
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
            onToggle={(val) => handleToggle("separarTopicos", val)}
          />
          <ToggleSwitch
            label="Estrutura visual"
            initialValue={ajustes.estruturaVisual}
            onToggle={(val) => handleToggle("estruturaVisual", val)}
          />
        </SettingsGroup>

        <SettingsGroup title="Linguagem">
          <SelectDropdown
            label="Padrão de escrita"
            options={languageOptions}
            value={ajustes.nivel}
            onChange={(val) => handleSelect("nivel", val)}
          />
          <SelectDropdown
            label="Idioma do Resumo"
            options={resumeLanguageOptions}
            value={ajustes.linguagem}
            onChange={(val) => handleSelect("linguagem", val)}
          />
        </SettingsGroup>

        <SettingsGroup title="Flashcards">
          <ToggleSwitch
            label="Gerar flashcards"
            initialValue={ajustes.gerarFlashcards}
            onToggle={(val) => handleToggle("gerarFlashcards", val)}
          />
          {ajustes.gerarFlashcards && (
            <QuantityInput
              label="Quantidade:"
              initialValue={ajustes.qtdFlashcards}
              max={15}
              onChange={(val) => handleSelect("qtdFlashcards", val)}
            />
          )}
        </SettingsGroup>
      </CardBox>
    </div>
  );
}
