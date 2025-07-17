import React from "react";
import { Breadcrumbs } from "@mui/material";

export default function PageHeader({
  title = "Flashcards",
  icon = "src/assets/Ativo 28.svg",
}) {
  return (
    <div className="min-h-40 w-full flex flex-col gap-4">
      <div className="text-sm mb-2 cursor-pointer w-fit text-gray-500 flex items-center gap-1">
        <img src="src/assets/Ativo 17.svg" className="h-3 w-3 rotate-180" />{" "}
        Voltar
      </div>
      <div className="flex items-center gap-2">
        <div
          className="ml-6 flex items-center justify-center"
          style={{ width: 60, height: 60 }}
        >
          <img src={icon} alt={title} className="w-11 h-11" />
        </div>
        <div className="flex flex-col justify-center">
          <span className="text-lg leading-tight ml-[1px]">Meus</span>
          <span className="text-3xl leading-none">{title}</span>
        </div>
      </div>
      <div className="mt-4 ml-23">
        <Breadcrumbs
          aria-label="breadcrumb"
          separator={
            <img
              src="src/assets/Ativo 17.svg"
              className="h-3 w-3 inline-block mx-1"
              alt=">"
            />
          }
        >
          <span
            className="text-gray-500 cursor-pointer hover:text-[var(--color-resumeai-blue)]"
            style={{
              fontFamily:
                "Sofia Pro, system-ui, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Início
          </span>
          <span
            className="text-gray-700 text-semibold"
            style={{
              fontFamily:
                "Sofia Pro, system-ui, Avenir, Helvetica, Arial, sans-serif",
            }}
          >
            Coleção de Flashcards
          </span>
        </Breadcrumbs>
      </div>
    </div>
  );
}
