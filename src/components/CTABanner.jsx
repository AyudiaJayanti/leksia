import ctaImage from "../assets/cta-image.png"
import Button from "./Button";

export default function CtaBanner({ onStart }) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8">
      <div className="relative bg-sky-100 rounded-[32px] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between overflow-visible min-h-[260px] gap-8">
        
        <div className="w-full md:w-1/2 text-left space-y-4 z-10">
          {/* Kicker */}
          <span className="font-inter font-semibold text-xs text-sky-600 tracking-wider uppercase">
            Langkah Awal Bersama Leksia
          </span>
          
          {/* Headline */}
          <h2 className="font-linotte font-bold text-2xl md:text-3xl text-slate-900 leading-tight">
            Mulai Petualangan Membaca yang Menyenangkan!
          </h2>
          
          {/* Sub-headline */}
          <p className="font-linotte font-normal text-xs md:text-sm text-slate-600 max-w-xs leading-relaxed">
            Hanya butuh 5-10 menit untuk mengenali profil literasi dan gaya belajar unik anak Anda.
          </p>
          
          {/* Button */}
          <div bg-brand className="pt-2">
            <Button onClick={onStart}>
                Mulai Skrining Sekarang
            </Button>
          </div>
        </div>

        <div className="relative w-full md:w-1/2 flex justify-center md:justify-end h-full">
          <img
            src={ctaImage} 
            alt="Ilustrasi anak meluncur dengan pensil"
            className="w-full max-w-[280px] md:max-w-[340px] h-auto object-contain md:absolute md:-bottom-4 md:-right-4 transform md:scale-110 drop-shadow-md animate-bounce-slow"
          />
        </div>

      </div>
    </div>
  );
}