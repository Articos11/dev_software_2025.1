const searchIcon = "src/assets/Ativo 24.svg";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import SidebarHeader from "./SidebarHeader";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import NavAction from "./NavAction";
import MeuEspacoDivision from "./MeuEspacoDivision";
import SidebarFooter from "./SidebarFooter";

export default function NewSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = () => setCollapsed((prev) => !prev);

  return (
    <Sidebar
      collapsed={collapsed}
      className="w-60 bg-white shadow-sm flex flex-col rounded-[40px] m-4"
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
                src="src/assets/Ativo 23.svg"
                className="w-5 h-5 mx-auto my-auto"
                alt="Novo"
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
                src={searchIcon}
                className="w-5 h-5 mx-auto my-auto"
                alt="Buscar"
              />
            </span>
          }
          component={<Link to="/buscar">Buscar</Link>}
        >
          Buscar
        </MenuItem>
        {!collapsed && (
          <>
            <MeuEspacoDivision />
            <MenuItem
              icon={
                <span className="ml-2">
                  <img
                    src="src/assets/Ativo 28.svg"
                    className="w-8 h-8 mx-auto my-auto"
                    alt="Flashcards"
                  />
                </span>
              }
            >
              Flashcards
            </MenuItem>
            <SubMenu
              label="Resumos"
              icon={
                <span className="ml-1">
                  <img
                    src="src/assets/Ativo 29.svg"
                    className="w-7 h-7 mx-auto my-auto"
                    alt="Resumos"
                  />
                </span>
              }
            >
              <MenuItem>
                <Link to="/resumos/novo">Novo Resumo</Link>
              </MenuItem>
              <MenuItem>
                <Link to="/resumos/lista">Lista de Resumos</Link>
              </MenuItem>
            </SubMenu>
          </>
        )}
      </Menu>
      {!collapsed && (
        <div className="w-full absolute bottom-2 left-0">
          <SidebarFooter />
        </div>
      )}
    </Sidebar>
  );
}
