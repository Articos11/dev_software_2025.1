import React from "react";
import SidebarHeader from "./SidebarHeader";
import NavAction from "./NavAction";

function Sidebar() {
  return (
    <aside className="w-64 bg-white shadow-sm flex flex-col rounded-[40px] m-4">
      <SidebarHeader />

      <nav className="flex-1 p-4 space-y-3">
        <NavAction icon="🆕" text="Novo..." />
        <NavAction icon="🔍" text="Buscar" />
      </nav>
    </aside>
  );
}

export default Sidebar;
