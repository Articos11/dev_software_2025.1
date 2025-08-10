import React from "react";
import SidebarHeader from "./SidebarHeader";
import NavAction from "./NavAction";
import Ativo23Icon from "../../assets/Ativo_23.svg";
import Ativo24Icon from "../../assets/Ativo_24.svg";

function Sidebar() {
  return (
    <aside className="w-60 bg-white shadow-sm flex flex-col rounded-[40px] m-4">
      <SidebarHeader />

      <nav className="flex-1 p-4 space-y-3">
        <NavAction icon={Ativo23Icon} text="Novo..." />
        <NavAction icon={Ativo24Icon} text="Buscar" />
      </nav>
    </aside>
  );
}

export default Sidebar;
