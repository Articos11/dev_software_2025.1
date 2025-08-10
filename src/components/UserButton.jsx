import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Ativo10Icon from "../assets/Ativo_10.svg";

export default function UserButton({ username = "Usuário" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const navigate = useNavigate();

  // Fecha o menu ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = (e) => {
    e.stopPropagation();
    setOpen(false);
    navigate("/login");
  };

  return (
    <div
      className="absolute top-4 right-4 flex flex-col items-end z-50"
      ref={ref}
    >
      <div
        className="flex items-center space-x-2 bg-[var(--color-resumeai-purple)] py-2 pl-4 pr-2 rounded-r-full rounded-bl-full shadow cursor-pointer select-none"
        onClick={() => setOpen((v) => !v)}
        tabIndex={0}
      >
        <div className="flex flex-col text-end">
          <span className="text-white text-md">{username}</span>
          <span className="text-white text-xs">online</span>
        </div>
        <span className="flex items-center justify-center bg-white rounded-full w-10 h-10 ">
          <img
            src={Ativo10Icon}
            className="w-10 h-10 rounded-full"
            alt="Avatar"
          />
        </span>
      </div>
      {open && (
        <button
          onClick={handleLogout}
          className="mt-2 bg-white text-red-600 hover:bg-gray-100 px-4 py-2 rounded-full shadow w-full flex justify-center animate-fade-in"
        >
          Sair
        </button>
      )}
    </div>
  );
}
