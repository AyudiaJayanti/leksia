import { useState } from "react";
import Navbar from "./components/Navbar";
import ScreeningPage from "./pages/ScreeningPage";
import hero from "./assets/hero.png";
import FeaturesSection from "./components/FeaturesSection";
import Footer from "./components/Footer";
import CtaBanner from "./components/CtaBanner";
import Button from "./components/Button";

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);

  const resetKuesioner = () => {
    setCurrentPage(1);
    setTimeout(() => {
      const heroSection = document.getElementById("beranda");
      if (heroSection) {
        heroSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-slate-50 antialiased selection:bg-brand/20 flex flex-col justify-between">
      {currentPage === 1 && (
        <div className="relative z-50">
          <Navbar resetApp={resetKuesioner} setCurrentPage={setCurrentPage} />
        </div>
      )}

      <div
        className={`w-full flex-grow pb-16 px-4 flex flex-col items-center justify-start ${currentPage === 1 ? "pt-28" : "pt-12 md:pt-20"}`}
      >
        {currentPage === 1 && (
          <div
            id="beranda"
            className="w-full max-w-4xl mx-auto text-center space-y-4 animate-fadeIn px-2 py-6"
          >
            <p className="font-linotte font-normal text-xs inline-block bg-brand text-white rounded-full px-4 py-1 tracking-wide shadow-xs">
              Tumbuh Bersama. Belajar Lebih Ceria.
            </p>
            <h1 className="font-linotte font-heavy text-2xl md:text-5xl font-black text-slate-900 tracking-tight leading-tight max-w-2xl mx-auto">
              Ubah Tantangan Membaca Jadi Petualangan Seru!
            </h1>
            <p className="font-linotte font-reguler text-sm md:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Setiap anak memiliki ritme belajarnya sendiri. Bersama Leksia,
              kenali profil literasi anak sejak dini melalui skrining ramah dan
              aktivitas bermain yang dirancang khusus untuknya.
            </p>
            <div className="pt-2">
              <Button onClick={() => setCurrentPage(2)} size="lg">
                Mulai Screening
              </Button>
            </div>
            <div className="w-full max-w-3xl mx-auto pt-4 rounded-2xl overflow-hidden">
              <img
                src={hero}
                alt="Ilustrasi anak-anak"
                className="w-full h-auto object-contain mx-auto max-h-[380px]"
              />
            </div>
            <FeaturesSection />
            <div id="screening" className="h-fit w-full">
              <CtaBanner onStart={() => setCurrentPage(2)} />
            </div>
          </div>
        )}

        {currentPage === 2 && (
          <div className="w-full flex justify-center py-4 relative z-10">
            <div className="w-full max-w-2xl bg-white rounded-[32px] shadow-xl shadow-slate-100/80 p-8 md:p-10 border border-slate-100 text-center space-y-8 animate-fadeIn relative overflow-hidden h-fit">
              <div className="mx-auto w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center text-3xl shadow-xs border border-sky-100/60 transform rotate-3">
                📖
              </div>
              <div className="space-y-3 max-w-md mx-auto">
                <h2 className="text-2xl md:text-3xl font-linotte font-bold text-slate-900">
                  Persiapan Skrining Disleksia
                </h2>
                <p className="font-inter font-normal text-xs md:text-sm text-slate-500">
                  Leksia instruments are adopted from International Dyslexia
                  Association (IDA) standards to observe children's learning
                  profiles.
                </p>
              </div>
              <div className="bg-amber-50/60 border border-amber-200/50 rounded-2xl p-4 text-left flex gap-3">
                <span className="text-amber-600 text-base shrink-0">⚠️</span>
                <p className="font-inter text-xs text-amber-800">
                  <strong className="font-linotte font-bold">Penting:</strong>{" "}
                  Alat ini bersifat sebagai skrining awal, bukan diagnosis medis
                  mutlak.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-2 justify-center items-center">
                <button
                  onClick={resetKuesioner}
                  className="font-linotte font-bold text-sm text-slate-400 hover:text-slate-600 px-4 py-2 cursor-pointer"
                >
                  ← Kembali ke Beranda
                </button>
                <Button onClick={() => setCurrentPage(3)} size="lg">
                  Mulai Skrining Sekarang →
                </Button>
              </div>
            </div>
          </div>
        )}

        {currentPage === 3 && (
          <div className="w-full max-w-2xl flex justify-center animate-fadeIn py-4 relative z-10">
            <ScreeningPage onBackToHome={resetKuesioner} />
          </div>
        )}
      </div>
      <Footer resetApp={resetKuesioner} />
    </div>
  );
}
