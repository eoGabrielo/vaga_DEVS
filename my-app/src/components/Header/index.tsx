// src/components/Header.jsx

import { useState } from "react";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  isLoggedIn?: boolean;
  onLogout?: () => void;
  onNavigate?: (page: 'login' | 'register' | 'dashboard') => void;
}

export default function Header({ isLoggedIn = false, onLogout, onNavigate }: HeaderProps) {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full sticky top-0 z-50">
      {/* Container com largura máxima e centralizado */}
      <div className="mx-auto max-w-[1024px]">
        {/* Fundo com gradiente moderno */}
        <div className="bg-gradient-to-r from-[#011526] via-[#012E40] to-[#025959] text-white px-6 py-4 flex justify-between items-center rounded-b-lg">

          {/* Logo */}
          <h1 className="text-2xl font-bold tracking-wide text-main-5">DevVagas Blog</h1>



          {/* Menu desktop */}
          <nav className="hidden md:flex gap-8 text-lg font-medium items-center">
            <a
              href="/home"
              className="hover:text-main-5 transition-colors"
            >Inicio</a>
            <a
              href="#dashboard"
              className="hover:text-main-5 transition-colors"
              onClick={e => { e.preventDefault(); onNavigate && onNavigate('dashboard'); }}
            >Dashboard</a>
            {isLoggedIn ? (
              <>
                <span className="ml-4 text-main-5 font-semibold">Logado</span>
                <button
                  className="ml-4 bg-main-5 text-white px-3 py-1 rounded hover:bg-main-3"
                  onClick={onLogout}
                >Sair</button>
              </>
            ) : null}
          </nav>

          {/* Botão mobile */}
          <button
            className="md:hidden p-2 rounded hover:bg-main-4 transition-colors"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Menu mobile */}
        {open && (
          <nav className="md:hidden bg-main-2 px-6 py-4 flex flex-col gap-4 rounded-b-lg">
            <a
              href="#dashboard"
              className="hover:text-main-5 transition-colors font-medium"
              onClick={e => { e.preventDefault(); onNavigate && onNavigate('dashboard'); setOpen(false); }}
            >Dashboard</a>
            {isLoggedIn ? (
              <>
                <span className="text-main-5 font-semibold">Logado</span>
                <button
                  className="bg-main-5 text-white px-3 py-1 rounded hover:bg-main-3 mt-2"
                  onClick={() => { onLogout && onLogout(); setOpen(false); }}
                >Sair</button>
              </>
            ) : null}
          </nav>
        )}
      </div>
    </header>
  );
}
