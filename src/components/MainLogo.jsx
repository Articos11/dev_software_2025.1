import React from "react";
import Ativo2LogoExpand2 from "../assets/Ativo_2logoexpand2.svg";

function MainLogo() {
  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center">
        <img src={Ativo2LogoExpand2} className="w-120" alt="Logo" />
      </div>
    </div>
  );
}

export default MainLogo;
