import React from "react";

export default function CardBox({ children, className = "", grow = 1 }) {
  // grow pode ser 0, 1, 2, etc. Gera a classe flex-grow-X do Tailwind, ou grow se 1
  const growClass = grow === 1 ? "grow" : grow === 0 ? "" : `grow-[${grow}]`;
  return (
    <div
      className={`bg-[var(--color-resumeai-purple)] rounded-[25px] shadow w-full h-full flex flex-col ${growClass} ${className}`}
    >
      <div className="h-10 items-center flex justify-center">
        <div className="h-2 rounded-full bg-white w-[70%]"></div>{" "}
      </div>
      <section className="bg-white w-full h-full rounded-[25px] p-5 pb-2 items-center justify-center">
        {children}
      </section>
    </div>
  );
}
