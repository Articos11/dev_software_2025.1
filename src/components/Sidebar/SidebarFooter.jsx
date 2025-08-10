import React from "react";
import Ativo22Icon from "../../assets/Ativo 22.svg";
import Ativo25Icon from "../../assets/Ativo 25.svg";
import Ativo20Icon from "../../assets/Ativo 20.svg";

export default function SidebarFooter() {
  return (
    <div className=" pt-4 pb-2 flex flex-col flex-grow items-center w-full pl-1">
      <div className="flex flex-col gap-4 w-full px-6">
        <hr className="border-t border-gray-300"></hr>
        <div className="flex items-center gap-3 cursor-pointer">
          <img src={Ativo22Icon} alt="Suporte" className="w-4 h-4" />
          <span className="text-md">Suporte</span>
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <img src={Ativo25Icon} alt="Sobre" className="w-4 h-4" />
          <span className="text-md">Sobre</span>
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <img src={Ativo20Icon} alt="Ajustes" className="w-4 h-4" />
          <span className="text-md">Ajustes</span>
        </div>
      </div>
      <div className="flex flex-col items-center w-full mt-8">
        <span className="text-md cursor-pointer hover:text-[var(--color-resumeai-blue)]">
          Sair
        </span>
      </div>
    </div>
  );
}
