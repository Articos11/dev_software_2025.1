import React from "react";

export default function SidebarFooter() {
  return (
    <div className=" pt-4 pb-2 flex flex-col flex-grow items-center w-full pl-1">
      <div className="flex flex-col gap-4 w-full px-6">
        <hr className="border-t border-gray-300"></hr>
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="src/assets/Ativo 22.svg"
            alt="Suporte"
            className="w-4 h-4"
          />
          <span className="text-md">Suporte</span>
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <img src="src/assets/Ativo 25.svg" alt="Sobre" className="w-4 h-4" />
          <span className="text-md">Sobre</span>
        </div>
        <div className="flex items-center gap-3 cursor-pointer">
          <img
            src="src/assets/Ativo 20.svg"
            alt="Ajustes"
            className="w-4 h-4"
          />
          <span className="text-md">Ajustes</span>
        </div>
      </div>
      <div className="flex flex-col items-center w-full mt-8">
        <span className="text-md cursor-pointer">Sair</span>
      </div>
    </div>
  );
}
