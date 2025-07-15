// src/components ConferirTextoSection.jsx
import React, { useRef, useState, useEffect } from "react";
import CardBox from "./Uteis/CardBox";

export default function ConferirTextoSection({
  title = "Conferir texto",
  charactheres = 0,
}) {
  const [text, setText] = useState(
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate...`
  );

  return (
    <div className="flex flex-grow grow-4  flex-col">
      <div className="mb-3 flex justify-between items-baseline">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <span className="text-sm text-gray-500">{charactheres} caracteres</span>
      </div>

      <CardBox>
        <textarea
          className="px-4 size-full scrollbar-thumb-rounded-full scrollbar-h-20 scrollbar-track-rounded-full scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200 outline-none resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
      </CardBox>
    </div>
  );
}
