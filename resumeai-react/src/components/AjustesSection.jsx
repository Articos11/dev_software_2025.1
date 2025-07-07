// src/components/AjustesSection.jsx
import React, { useRef, useState, useEffect } from "react";
import ToggleSwitch from "./ToggleSwitch";

export default function AjustesSection({ title = "Ajustes" }) {
  const [text, setText] = useState(
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate...`
  );

  return (
    <div className="flex flex-grow flex-col">
      <div className="mb-3 flex justify-between items-baseline">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      <div className="bg-indigo-500 rounded-[25px] shadow w-full h-full flex flex-col">
        <div className="h-10 items-center flex justify-center px-13">
          {" "}
          <div className="h-2 rounded-full bg-white w-[70%]"></div>{" "}
        </div>
        <section className="bg-white w-full h-full rounded-[25px] p-5 items-center justify-center">
          <ToggleSwitch />
        </section>
      </div>
    </div>
  );
}
