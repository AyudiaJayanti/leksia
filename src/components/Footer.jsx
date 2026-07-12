export default function Footer({ resetApp }) {
  return (
    <footer className="w-full bg-slate-50 border-t border-indigo-500/30 pt-8 pb-8 px-6 mt-12">
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 pb-12">
        <div className="md:col-span-2 space-y-4">
          <div 
            onClick={resetApp} 
            className="font-linotte font-bold text-2xl text-indigo-600 cursor-pointer tracking-tight"
          >
            Leksia
          </div>
          <p className="font-inter font-normal text-xs md:text-sm text-slate-500 leading-relaxed max-w-sm">
            Platform inklusi digital yang dirancang untuk membantu orang tua dan guru mengenali 
            profil literasi serta potensi unik anak sejak dini melalui skrining yang ramah dan tervalidasi.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="font-linotte font-bold text-sm text-slate-800 tracking-wide">
            Jelajahi
          </h4>
          <ul className="font-inter font-normal text-xs md:text-sm space-y-2.5 text-slate-500">
            <li>
              <a href="#beranda" onClick={resetApp} className="hover:text-indigo-600 transition-colors">
                Beranda
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-indigo-600 transition-colors">
                Tentang
              </a>
            </li>
            <li>
              <a href="#screening" className="hover:text-indigo-600 transition-colors">
                Screening
              </a>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-linotte font-bold text-sm text-slate-800 tracking-wide">
            Kontak & Hubungan
          </h4>
          <ul className="font-inter font-normal text-xs md:text-sm space-y-2.5 text-slate-500">
            <li className="flex items-center gap-2">
              <span>✉️</span> halo@leksia.id
            </li>
            <li className="flex items-center gap-2">
              <span>📍</span> Cimahi, Jawa Barat
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-4xl mx-auto border-t border-slate-200/60 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-inter font-normal text-xs text-slate-400 text-center md:text-left">
          &copy; {new Date().getFullYear()} Leksia. Hak Cipta Dilindungi Undang-Undang.
        </p>
        <p className="font-inter font-normal text-xs text-slate-400">
          Dibuat dengan cermat untuk Masa Depan Inklusif ✨
        </p>
      </div>
    </footer>
  );
}