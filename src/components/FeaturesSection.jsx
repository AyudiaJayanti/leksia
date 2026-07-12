export default function FeaturesSection() {
  return (
    <section id="about" className="w-full max-w-4xl mx-auto px-4 py-20 space-y-8 animate-fadeIn">
      
      <p className="font-linotte font-normal text-base md:text-xl text-slate-700 text-center max-w-2xl mx-auto leading-relaxed tracking-wide">
        Bersama Leksia, kita ciptakan ruang belajar yang ramah 📖 dan menyenangkan ✨ bagi anak melalui skrining adaptif, pemetaan profil literasi 📊, dan rekomendasi aktivitas bermain 🎁 yang menumbuhkan rasa percaya diri.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-x-6 pt-6">
        <div className="relative bg-brand-hover rounded-3xl p-6 text-left shadow-md hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 flex flex-col justify-end pt-12 min-h-[240px]">
          <div className="absolute -top-6 left-6 w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-md border-2 border-indigo-100 transform -rotate-12">
            🚀
          </div>
          <div className="space-y-2">
            <h3 className="font-linotte font-bold text-lg md:text-xl text-white tracking-wide">
              Skrining Ramah Anak
            </h3>
            <p className="font-linotte font-reguler text-xs md:text-sm text-indigo-100/90 leading-relaxed">
              Pertanyaan interaktif yang dirancang khusus agar anak merasa seperti sedang bercerita, bukan diuji.
            </p>
          </div>
        </div>

        <div className="relative bg-amber-500 rounded-3xl p-6 text-left shadow-md hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 flex flex-col justify-end pt-12 min-h-[240px]">
          <div className="absolute -top-6 left-6 w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-md border-2 border-amber-100 transform rotate-6">
            🏆
          </div>
          <div className="space-y-2">
            <h3 className="font-linotte font-bold text-lg md:text-xl text-white tracking-wide">
              Standardisasi IDA
            </h3>
            <p className="font-linotte font-reguler text-xs md:text-sm text-amber-50/90 leading-relaxed">
              Menggunakan metode pembobotan resmi International Dyslexia Association (IDA) untuk hasil awal yang tepercaya.
            </p>
          </div>
        </div>

        <div className="relative bg-pink-500 rounded-3xl p-6 text-left shadow-md hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1 flex flex-col justify-end pt-12 min-h-[240px]">
          <div className="absolute -top-6 left-6 w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-3xl shadow-md border-2 border-pink-100 transform -rotate-6">
            🎁
          </div>
          <div className="space-y-2">
            <h3 className="font-linotte font-bold text-lg md:text-xl text-white tracking-wide">
              Rekomendasi AI Game
            </h3>
            <p className="font-linotte font-reguler text-xs md:text-sm text-pink-100/90 leading-relaxed">
              Dapatkan kartu aktivitas belajar mandiri berbasis kecerdasan buatan yang disesuaikan dengan profil unik anak.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}