import React from "react";
import Ativo21Icon from "../../assets/Ativo_21.svg";

export default function MeuEspacoDivision() {
  return (
    <div className="bg-[var(--color-resumeai-purple)] h-8 flex gap-3 items-center">
      <img src={Ativo21Icon} className="size-11 bg-white rounded-full py-1 px-2 ml-4" />
      <span className="text-middle text-white font-[Qanelas] font-bold text-lg tracking-wider">Meu Espaço</span>
    </div>
  );
}
