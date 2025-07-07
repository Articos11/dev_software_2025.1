import React from "react";

function UserButton({ username = "Usuário" }) {
  return (
    <div class="absolute justify-end top-4 right-4 flex items-center space-x-2 bg-indigo-500 py-2 pl-4 pr-2 rounded-r-full rounded-bl-full shadow">
      <div class="flex flex-col text-end">
        <span class="text-white text-md font-semibold">{username}</span>
        <span class="text-white text-xs">online</span>
      </div>
      {/* Substituir isso aqui depois pelo icone do bonequinho*/}
      <span class="flex items-center justify-center bg-white rounded-full w-10 h-10 ">
        <img src="/src/assets/Ativo 10.svg" className="w-10 h-10 rounded-full"></img>
      </span>
    </div>
  );
}

export default UserButton;
