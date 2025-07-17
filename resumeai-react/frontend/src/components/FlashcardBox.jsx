import React from "react";

export default function FlashcardBox({
  title = "Titulo",
  date = "data",
  icon = "src/assets/Ativo 29.svg",
}) {
  return (
    <div className="flex bg-white shadow rounded-2xl w-50 h-20 px-1 py-2 items-center cursor-pointer hover:bg-gray-100 transition-colors">
      <img src={icon} className="size-12" />
      <div className="flex items-center flex-grow">
        <div className="flex flex-col pl-2 flex-grow w-full">
          <span className="text-lg font-semibold">{title}</span>
          <span className="text-sm text-gray-500">{date}</span>
        </div>
        <div className="flex align-self-end mr-2">
          <img src="src/assets/Ativo 17.svg" className="size-4" />
        </div>
      </div>
    </div>
  );
}
