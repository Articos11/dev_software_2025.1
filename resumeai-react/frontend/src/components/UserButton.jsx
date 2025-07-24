import React from "react";

function UserButton({ username = "Usuário" }) {
  return (
    <div className="absolute justify-end top-4 right-4 flex items-center space-x-2 bg-[var(--color-resumeai-purple)] py-2 pl-4 pr-2 rounded-r-full rounded-bl-full shadow">
      <div className="flex flex-col text-end">
        <span className="text-white text-md font-semibold">{username}</span>
        <span className="text-white text-xs">online</span>
      </div>
      <span className="flex items-center justify-center bg-white rounded-full w-10 h-10 ">
        <img
          src="/src/assets/Ativo 10.svg"
          className="w-10 h-10 rounded-full"
        ></img>
      </span>
    </div>
  );
}

export default UserButton;
