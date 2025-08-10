import React from "react";
import Ativo4Icon from "../../assets/Ativo_4.svg";

function SidebarHeader({ onCollapse, collapsed }) {
  return (
    <>
      <div
        className="flex justify-center my-4 mb-2"
        style={{ visibility: collapsed ? "hidden" : "visible" }}
      >
        <div className="h-2 w-[63%] bg-gray-400 rounded-full"> </div>
      </div>

      <div style={{ minHeight: "48px", height: "48px" }}>
        <div
          className={`flex items-center h-full ${
            collapsed ? "justify-center" : "relative justify-center"
          }`}
        >
          {!collapsed && (
            <h1 className="font-[Qanelas] text-3xl font-bold text-[var(--color-resumeai-purple)]  tracking-wide self-center">
              ResumeAI
            </h1>
          )}
          <img
            src={Ativo4Icon}
            className={`h-7 w-7 hover:bg-[var(--color-resumeai-purple)] p-1 rounded-md cursor-pointer ${
              collapsed ? "" : "right-4 absolute"
            }`}
            onClick={onCollapse}
            alt="Colapsar Sidebar"
          />
        </div>
      </div>
    </>
  );
}

export default SidebarHeader;
