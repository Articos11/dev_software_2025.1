import React from "react";

function SidebarHeader() {
  return (
    <>
      <div className="flex justify-center my-4">
        <div className="h-2 w-[63%] bg-gray-400 rounded-full"> </div>
      </div>

      <div>
        <div className="flex items-center relative justify-center">
          <h1 class="text-2xl font-bold text-indigo-500 self-center">ResumeAI</h1>
          <img src="src/assets/Ativo 4.svg" className="h-6 w-6 right-7 absolute"></img>
        </div>
      </div>
    </>
  );
}

export default SidebarHeader;
