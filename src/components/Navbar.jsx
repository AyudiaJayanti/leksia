import React from "react";
import logoLeksia from "../assets/logo.png";
import Button from "./Button";

export default function Navbar({ resetApp, setCurrentPage }) {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-white border-b border-indigo-500/30 z-50">
      <div className="max-w-6xl font-inter mx-auto px-4 h-16 flex items-center justify-between">
        <button
          onClick={resetApp}
          className="flex items-center gap-2 font-extrabold text-xl text-slate-800 tracking-tight cursor-pointer hover:opacity-80 transition"
        >
          <img src={logoLeksia} className="w-8 h-auto" alt="logo" />
          <div 
            onClick={resetApp} 
            className="font-linotte font-bold text-2xl text-indigo-600 cursor-pointer tracking-tight"
          >
            Leksia
          </div>
        </button>

        <div className="flex items-center gap-6">
          <a
            href="#beranda"
            className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition"
          >
            Beranda
          </a>
          <a
            href="#about"
            className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition"
          >
            Tentang
          </a>
          <a
            href="#screening"
            className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition"
          >
            Screening
          </a>
        </div>
        <div>
          <Button onClick={() => setCurrentPage(2)} size="sm">
          Mulai Skrining
        </Button>
        </div>
      </div>
    </nav>
  );
}
