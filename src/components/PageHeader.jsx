import React from "react";
import { Breadcrumbs } from "@mui/material";
import Ativo17Icon from "../assets/Ativo_17.svg";

export default function PageHeader({
  title = "Flashcards",
  icon,
  breadcrumbs = [
    {
      label: "Início",
      href: "/",
      className:
        "text-gray-500 cursor-pointer hover:text-[var(--color-resumeai-blue)]",
    },
    {
      label: "Coleção de Flashcards",
      className: "text-gray-700 text-semibold",
    },
  ],
}) {
  return (
    <div className="min-h-40 w-full flex flex-col gap-4">
      <div className="text-sm mb-2 cursor-pointer w-fit text-gray-500 flex items-center gap-1 transition-colors hover:text-[var(--color-resumeai-blue)] group">
        <img
          src={Ativo17Icon}
          className="h-3 w-3 rotate-180 transition-all group-hover:filter group-hover:brightness-0 group-hover:invert group-hover:sepia group-hover:hue-rotate-[180deg]"
          style={{ filter: "none" }}
        />{" "}
        Voltar
      </div>
      <div className="flex items-center gap-2">
        <div
          className="ml-6 flex items-center justify-center"
          style={{ width: 60, height: 60 }}
        >
          {icon && <img src={icon} alt={title} className="w-11 h-11" />}
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
              src={Ativo17Icon}
              className="h-3 w-3 inline-block mx-1"
              alt=">"
            />
          }
        >
          {breadcrumbs.map((item, idx) =>
            item.href ? (
              <a
                key={idx}
                href={item.href}
                className={item.className}
                style={{
                  fontFamily:
                    "Sofia Pro, system-ui, Avenir, Helvetica, Arial, sans-serif",
                }}
              >
                {item.label}
              </a>
            ) : (
              <span
                key={idx}
                className={item.className}
                style={{
                  fontFamily:
                    "Sofia Pro, system-ui, Avenir, Helvetica, Arial, sans-serif",
                }}
              >
                {item.label}
              </span>
            )
          )}
        </Breadcrumbs>
      </div>
    </div>
  );
}
