// src/components/TextBox.jsx
import React, { useRef, useState, useEffect } from 'react';

export default function TextBox({
  title = "Conferir texto",
  charactheres = 0,
}) {
  const [text, setText] = useState(
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vulputate...`
  );

  return (
    <div className="w-full h-full">
      <div className="mb-3 flex justify-between items-baseline">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        <span className="text-sm text-gray-500">{charactheres} caracteres</span>
      </div>
      <div
        className="bg-indigo-500 rounded-[25px] shadow pt-8 size-full">
        <section className='bg-white w-full h-full rounded-[25px] p-5 items-center justify-center'>
            <textarea className='px-4 size-full scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200 outline-none resize-none' 
            value={text}
            onChange={e => setText(e.target.value)}
            ></textarea>
        </section>

      </div>
    </div>
  );
}
