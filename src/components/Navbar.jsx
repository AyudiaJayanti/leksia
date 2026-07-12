import { useState, useEffect } from "react";
import logo from "../assets/logo.png";
import Button from "./Button";

export default function Navbar({ setCurrentPage }) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");

  useEffect(() => {
    const sectionIds = ["beranda", "about", "screening"];
    
    const observers = sectionIds.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          // Hanya ubah secara otomatis jika pergerakan berasal dari scroll biasa (bukan klik cepat)
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        { 
          rootMargin: "-20% 0px -60% 0px"
        }
      );

      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.element);
      });
    };
  }, []);

  // FUNGSI BARU: Paksa set active section saat link diklik untuk menghindari lag
  const handleLinkClick = (id) => {
    setActiveSection(id);
    setIsOpen(false); // Sekaligus menutup menu mobile jika sedang terbuka
  };

  const getLinkClass = (id, baseClass) => {
    const isActive = activeSection === id;
    return `${baseClass} ${
      isActive 
        ? "text-indigo-600 font-bold border-b-2 border-indigo-600" 
        : "text-gray-700 font-medium hover:text-indigo-600"
    } transition-all duration-200`;
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center relative">
          
          {/* KIRI: Logo & Nama Brand */}
          <div className="flex-shrink-0 flex items-center z-10">
            <img className="h-8 w-auto" src={logo} alt="Leksia Logo" />
            <span className="ml-2 font-bold text-xl text-indigo-600">Leksia</span>
          </div>

          {/* TENGAH: Menu Desktop */}
          <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
            <div className="flex space-x-8 pointer-events-auto h-full items-center">
              <a 
                href="#beranda" 
                onClick={() => handleLinkClick("beranda")} 
                className={getLinkClass("beranda", "py-2 font-linotte")}
              >
                Beranda
              </a>
              <a 
                href="#about" 
                onClick={() => handleLinkClick("about")} 
                className={getLinkClass("about", "py-2 font-linotte")}
              >
                Tentang
              </a>
              <a 
                href="#screening" 
                onClick={() => handleLinkClick("screening")} 
                className={getLinkClass("screening", "py-2 font-linotte")}
              >
                Screening
              </a>
            </div>
          </div>

          {/* KANAN: Button Custom */}
          <div className="hidden md:block z-10">
            <Button onClick={() => setCurrentPage(2)} size="sm">
              Mulai Skrining
            </Button>
          </div>

          {/* Tombol Hamburger */}
          <div className="flex md:hidden z-10">
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 hover:bg-gray-100 focus:outline-none"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Dropdown Menu Mobile */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden bg-white border-t border-gray-200`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#beranda" onClick={() => handleLinkClick("beranda")} className={getLinkClass("beranda", "block px-3 py-2 rounded-md")}>Beranda</a>
          <a href="#about" onClick={() => handleLinkClick("about")} className={getLinkClass("about", "block px-3 py-2 rounded-md")}>Tentang</a>
          <a href="#screening" onClick={() => handleLinkClick("screening")} className={getLinkClass("screening", "block px-3 py-2 rounded-md")}>Screening</a>
          
          <div className="pt-2 px-3">
            <Button 
              className="w-full" 
              onClick={() => {
                setCurrentPage(2);
                setIsOpen(false);
              }}
            >
              Mulai Skrining
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}