// src/components/ResizableInputBar.jsx
import React, { useRef, useState, useEffect } from 'react';

function ResizableInputBar({ placeholder = "Novo resumo rápido...", initialText = "", maxRows = 3 }) {
  const textareaRef = useRef(null);
  const [text, setText] = useState(initialText);

  const lineHeight = 24; 
  const calculatedMaxHeight = maxRows * lineHeight;

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px';
    }
  }, [text]);

  const handleChange = (event) => {
    setText(event.target.value);
  };

  return (
    <div className="w-full max-w-3xl flex items-center bg-gray-50 rounded-full shadow-sm px-4 py-2 mb-4">
      <span className="text-gray-400 text-2xl mr-2 self-center
                       hover:bg-gray-100 rounded">📎</span> 
      
      <textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        placeholder={placeholder}
        rows="1"
        className="flex-1 m-2 outline-none text-gray-700 placeholder-gray-400 resize-none overflow-y-auto scrollbar scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100"
        style={{ maxHeight: `${calculatedMaxHeight}px` }} 
      />
      
      <button className="text-indigo-600 text-2xl ml-2 mb-1
                         hover:bg-gray-100 rounded">⬆️</button>
    </div>
  );
}

export default ResizableInputBar;