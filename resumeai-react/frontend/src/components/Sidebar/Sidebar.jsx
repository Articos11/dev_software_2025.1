import React from "react";
import SidebarHeader from "./SidebarHeader";
import NavAction from "./NavAction";

function Sidebar() {
  const newIcon = "src/assets/Ativo 23.svg";
  const searchIcon = "src/assets/Ativo 24.svg";

  return (
    <aside className="w-64 bg-white shadow-sm flex flex-col rounded-[40px] m-4">
      <SidebarHeader />

      <nav className="flex-1 p-4 space-y-3">
        <NavAction icon={newIcon} text="Novo..." />
        <NavAction icon={searchIcon} text="Buscar" />
      </nav>
    </aside>
  );
}

export default Sidebar;
