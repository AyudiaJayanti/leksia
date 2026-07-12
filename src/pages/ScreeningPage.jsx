import { useState, useRef } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import questions from "../assets/question.json";

const SHARED_OPTIONS = [
  "Tidak Pernah / Sama Sekali Tidak",
  "Jarang / Sedikit",
  "Kadang-kadang",
  "Sering / Cukup Banyak",
  "Selalu / Sangat Banyak",
];

const SCORE_MAP = {
  "Tidak Pernah / Sama Sekali Tidak": 1,
  "Jarang / Sedikit": 2,
  "Kadang-kadang": 3,
  "Sering / Cukup Banyak": 4,
  "Selalu / Sangat Banyak": 5
};

export default function ScreeningPage({ onBackToHome }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [aiResult, setAiResult] = useState(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  
  const areaHasilRef = useRef(null);
  
  //Fitur untuk menghitung total skor berdasarkan jawaban pertanyaan
  const hitungTotalSkor = (daftarJawaban) => {
    return Object.values(daftarJawaban).reduce((total, jawaban) => total + (SCORE_MAP[jawaban] || 0), 0);
  };
  //Fitur memanggil AI dengan menggunkan model Gemini
  const panggilAI = async (daftarJawaban) => {
    setIsLoadingAi(true);
    try {
      const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

      const ai = new GoogleGenerativeAI(API_KEY);
      const model = ai.getGenerativeModel({ 
        model: "gemini-3.1-flash-lite",
        generationConfig: { responseMimeType: "application/json" }
      });

      const totalSkor = hitungTotalSkor(daftarJawaban);
      // Deklarasi var prompt dengan menyimpan prompt yang akan dikirimkan ke model AI
      const prompt = `
        Anda adalah pakar pembelajaran inklusi anak. Berdasarkan hasil kuesioner skor ${totalSkor}/30 dan data ini:
        ${questions.map((q) => `- ${q.question}: ${daftarJawaban[q.id]}`).join("\n")}
        
        Berikan analisis kondisi singkat dan 3 rekomendasi permainan konkret di rumah.
        Output WAJIB berupa JSON dengan struktur persis seperti ini:
        {
          "ringkasanKondisi": "Tulis 3 kalimat ringkas tentang kondisi kesulitan dan kekuatan anak di sini.",
          "saranPermainan": [
            { "judul": "Nama permainan 1", "deskripsi": "Penjelasan singkat cara mainnya.", "icon": "🧩" },
            { "judul": "Nama permainan 2", "deskripsi": "Penjelasan singkat cara mainnya.", "icon": "🎨" },
            { "judul": "Nama permainan 3", "deskripsi": "Penjelasan singkat cara mainnya.", "icon": "🎯" }
          ]
        }
      `;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const dataJson = JSON.parse(response.text());
      setAiResult(dataJson);
    } catch (error) {
      console.error("Gagal memanggil AI:", error);
      setAiResult({
        "ringkasanKondisi": "Gagal memuat analisis dari AI. Periksa kembali koneksi internet atau API Key Anda.",
        "saranPermainan": []
      });
    } finally {
      setIsLoadingAi(false);
    }
  };

  const handleAnswer = (option) => {
    const nextAnswers = { ...answers, [questions[currentQuestion].id]: option };
    setAnswers(nextAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsFinished(true);
      panggilAI(nextAnswers);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const totalSkorAkhir = hitungTotalSkor(answers);

  const dapatkanStatusSkor = (skor) => {
    if (skor >= 23) return { teks: "Indikasi Risiko Tinggi", warna: "text-rose-600 bg-rose-50 border-rose-100" };
    if (skor >= 15) return { teks: "Indikasi Risiko Sedang", warna: "text-amber-600 bg-amber-50 border-amber-100" };
    return { teks: "Indikasi Risiko Rendah", warna: "text-emerald-600 bg-emerald-50 border-emerald-100" };
  };

  const statusSkor = dapatkanStatusSkor(totalSkorAkhir);

  return (
    <div ref={areaHasilRef} className="w-full max-w-2xl bg-white rounded-[32px] shadow-xl shadow-slate-100/80 p-6 md:p-10 border border-slate-100 animate-fadeIn relative overflow-hidden h-fit">
      
      <div className="mb-8 border-b border-slate-100 pb-5">
        <h1 className="text-2xl font-linotte font-bold text-slate-900 tracking-tight">Kuesioner Leksia</h1>
        <p className="text-xs md:text-sm font-inter text-slate-500 mt-1">Silakan bantu jawab karakteristik belajar anak dengan santai dan jujur.</p>
      </div>

      {!isFinished ? (
        <div className="space-y-6">
          <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-brand h-full transition-all duration-300 rounded-full"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            ></div>
          </div>

          <div className="flex flex-col text-left">
            <span className="text-xs font-inter font-bold uppercase tracking-wider text-brand">
              Pertanyaan {currentQuestion + 1} dari {questions.length}
            </span>
            <h2 className="text-base md:text-lg font-linotte font-bold text-slate-800 mt-2 mb-4 leading-relaxed">
              {questions[currentQuestion].question}
            </h2>
          </div>

          <div className="grid gap-3">
            {SHARED_OPTIONS.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full text-left px-5 py-3.5 border border-slate-200/80 rounded-2xl hover:border-brand hover:bg-purple-50/40 font-inter font-medium text-xs md:text-sm text-slate-700 transition duration-150 ease-in-out cursor-pointer shadow-2xs hover:shadow-xs"
              >
                {option}
              </button>
            ))}
          </div>

          {currentQuestion > 0 && (
            <button
              onClick={handleBack}
              className="font-linotte font-bold text-xs md:text-sm text-slate-400 hover:text-slate-600 transition flex items-center gap-1 cursor-pointer pt-2"
            >
              ← Pertanyaan Sebelumnya
            </button>
          )}
        </div>
      ) : (
        // HALAMAN HASIL SKRINING & REKOMENDASI AI
        <div className="space-y-8 animate-fadeIn">
          
          <div className="text-center py-2">
            <div className="w-14 h-14 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center mx-auto text-2xl mb-3 shadow-2xs transform rotate-3">
              🎉
            </div>
            <h2 className="text-xl font-linotte font-bold text-slate-900">Kuesioner Selesai!</h2>
            <p className="font-inter text-xs text-slate-500 mt-1">Data jawaban si kecil berhasil dianalisis dengan aman.</p>
          </div>

          <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-100 text-center space-y-3">
            <span className="font-inter text-xs font-bold text-slate-400 uppercase tracking-wider">Total Skor Skrining</span>
            <p className="text-5xl font-linotte font-bold text-brand mt-1">
              {totalSkorAkhir} <span className="text-xl font-inter font-normal text-slate-400">/ 30</span>
            </p>
            <div className={`mx-auto w-fit px-4 py-1.5 rounded-full border text-xs font-linotte font-bold ${statusSkor.warna}`}>
              {statusSkor.teks}
            </div>
          </div>

          {isLoadingAi ? (
            <div className="bg-purple-50/40 rounded-2xl p-8 border border-purple-100/50 text-center space-y-3">
              <div className="w-6 h-6 border-2 border-brand border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="font-linotte font-bold text-xs text-brand animate-pulse">
                Leksia AI sedang merancang permainan khusus untuk petualangan anak...
              </p>
            </div>
          ) : aiResult ? (
            <div className="space-y-6">
              
              <div className="bg-slate-50/80 rounded-2xl p-5 border border-slate-100 text-left space-y-2">
                <h3 className="font-linotte font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  📊 Analisis Kondisi Literasi:
                </h3>
                <p className="font-inter text-xs md:text-sm text-slate-700 leading-relaxed">
                  {aiResult.ringkasanKondisi}
                </p>
              </div>

              <div className="space-y-3">
                <h3 className="font-linotte font-bold text-sm text-slate-800 flex items-center gap-2 mb-1">
                  ✨ Rekomendasi Kartu Game di Rumah:
                </h3>
                <div className="grid gap-3.5">
                  {aiResult.saranPermainan?.map((game, index) => (
                    <div 
                      key={index} 
                      className="flex gap-4 p-4 bg-white border border-slate-100 rounded-2xl shadow-2xs hover:shadow-xs hover:border-purple-100 hover:bg-purple-50/10 transition duration-200 group text-left items-center"
                    >
                      <div className="w-11 h-11 bg-purple-50 text-brand rounded-xl flex items-center justify-center text-xl shrink-0 group-hover:bg-purple-100 group-hover:scale-105 transition duration-200 shadow-3xs">
                        {game.icon || "🎮"}
                      </div>
                      <div className="space-y-0.5">
                        <h4 className="font-linotte font-bold text-sm text-slate-800">{game.judul}</h4>
                        <p className="font-inter text-xs text-slate-500 leading-relaxed">{game.deskripsi}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div 
                className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3 justify-center items-center" 
                data-html2canvas-ignore="true"
              >

                <button
                  onClick={onBackToHome}
                  className="w-full sm:w-auto font-linotte font-bold text-xs md:text-sm bg-emerald-500 hover:bg-emerald-600 text-white rounded-full px-6 py-2.5 shadow-sm hover:shadow-md transition cursor-pointer flex items-center justify-center gap-2 order-1 sm:order-2"
                >
                  ← Selesai & Kembali ke Beranda
                </button>
              </div>

            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}