import React, { useState } from "react";
import { Link } from "react-router-dom";
import SidebarHeader from "./SidebarHeader";
import {
  Sidebar,
  Menu,
  MenuItem,
  SubMenu,
  sidebarClasses,
} from "react-pro-sidebar";
import MeuEspacoDivision from "./MeuEspacoDivision";
import SidebarFooter from "./SidebarFooter";
import Ativo23Icon from "../../assets/Ativo_23.svg";
import Ativo24Icon from "../../assets/Ativo_24.svg";
import Ativo28Icon from "../../assets/Ativo_28.svg";
import Ativo29Icon from "../../assets/Ativo_29.svg";

export default function NewSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = () => setCollapsed((prev) => !prev);

  return (
    <Sidebar
      collapsed={collapsed}
      className="w-60 shadow-md flex flex-col rounded-[40px] m-4"
      rootStyles={{
        [`.${sidebarClasses.container}`]: {
          backgroundColor: "white",
          borderRadius: "40px",
        },
      }}
    >
      <SidebarHeader onCollapse={handleCollapse} collapsed={collapsed} />

      <Menu>
        <MenuItem
          icon={
            <span
              className={
                collapsed
                  ? "flex items-center justify-center w-full h-full"
                  : ""
              }
            >
              <img
                src={Ativo23Icon}
                className="w-5 h-5 mx-auto my-auto"
                alt="Novo"
                title="Novo"
              />
            </span>
          }
          component={<Link to="/home"></Link>}
        >
          Novo...
        </MenuItem>
        <MenuItem
          icon={
            <span
              className={
                collapsed
                  ? "flex items-center justify-center w-full h-full"
                  : ""
              }
            >
              <img
                src={Ativo24Icon}
                className="w-5 h-5 mx-auto my-auto"
                alt="Buscar"
                title="Buscar"
              />
            </span>
          }
          component={<Link to="/buscar">Buscar</Link>}
        >
          Buscar
        </MenuItem>
        {collapsed ? <div style={{ height: 32 }} /> : <MeuEspacoDivision />}
        <MenuItem
          icon={
            <span className="flex items-center justify-center w-full h-full ml-1">
              <img
                src={Ativo28Icon}
                className="w-7 h-7 mx-auto my-auto"
                alt="Flashcards"
                title="Flashcards"
              />
            </span>
          }
          component={<Link to="/flashcards"></Link>}
        >
          {!collapsed && "Flashcards"}
        </MenuItem>
        <MenuItem
          icon={
            <span className="flex items-center justify-center w-full h-full">
              <img
                src={Ativo29Icon}
                className="w-7 h-7 mx-auto my-auto"
                alt="Resumos"
                title="Resumos"
              />
            </span>
          }
          component={<Link to="/resumos"></Link>}
        >
          {!collapsed && "Resumos"}
        </MenuItem>
      </Menu>

      {/* A footer está comentada pois não tivemos tempo de fazer as páginas de ajustes e Suporte*/}
      {/*{!collapsed && (
        <div className="w-full absolute bottom-2 left-0">
          <SidebarFooter />
        </div>
      )}*/}
    </Sidebar>
  );
}
