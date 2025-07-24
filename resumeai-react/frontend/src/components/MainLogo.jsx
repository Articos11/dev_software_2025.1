import React from "react";

function MainLogo() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center mb-4">
        <span className="text-5xl mr-4 text-[var(--color-resumeai-purple)]">
          <img src="src/assets/Ativo 37.svg" className="w-20 h-20"></img>
        </span>
        <div className="flex flex-col items-center space-y-1 mt-5">
          <h1 className="text-[65px]/[1] font-bold text-[var(--color-resumeai-purple)]">ResumeAI</h1>
          <p className="italic text-gray-500 text-lg">
            Da complexidade à <u>clareza</u>
          </p>
        </div>
      </div>
    </div>
  );
}

export default MainLogo;
