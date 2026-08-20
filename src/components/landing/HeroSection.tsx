import { ArrowRight, Eye, Play } from "lucide-react";

export function HeroSection() {
  return (
    <section className="pt-8 pb-12 sm:pt-20 sm:pb-24 border-b-2 border-ink bg-canvas relative overflow-hidden">
      <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-wasabi/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 -left-12 w-64 h-64 rounded-full bg-sunflower/30 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

          {/* Left Hero Text (7 Cols) */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-6">
            <div className="inline-flex items-center gap-1.5 sm:gap-2 badge-tag bg-sunflower px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-full text-[11px] sm:text-xs font-mono font-bold">
              <span>👋 Stop pusing mikirin ide konten tiap malam!</span>
            </div>

            <h1 className="text-3xl sm:text-6xl lg:text-[62px] font-serif tracking-tight text-ink leading-[1.1] sm:leading-[1.08]">
              30 Hari konten organik,{" "}
              <br className="hidden sm:inline" />
              <span className="italic text-terracotta">naskah kata-per-kata siap rekam.</span>
            </h1>

            <p className="text-xs sm:text-base text-stone-700 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans font-medium">
              Tinggalkan cara lama yang bikin burnout. Kamu dapet 30 video script vertikal (TikTok/Reels), 30 caption berstruktur AIDA, 4 artikel SEO, 5 bonus stack eksklusif, dan Notion OS rapi dalam 1x24 jam kerja.
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-1 sm:pt-2">
              <a
                href="#order"
                className="bento-pop bg-terracotta text-white px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl font-mono text-xs font-bold transition flex items-center justify-center gap-2 min-h-[48px] sm:min-h-[50px]"
              >
                <span>Mulai Order Batch (Rp299.000)</span>
                <ArrowRight className="w-4 h-4 text-wasabi" />
              </a>
              <a
                href="#compare-scripts"
                className="badge-tag bg-white hover:bg-canvas text-ink px-5 sm:px-6 py-3.5 sm:py-4 rounded-2xl font-mono text-xs font-bold transition flex items-center justify-center gap-2 min-h-[48px] sm:min-h-[50px]"
              >
                <Eye className="w-4 h-4 text-stone-500" />
                <span>Lihat Contoh Script</span>
              </a>
            </div>

            {/* Hero Proof Tiles */}
            <div className="pt-4 sm:pt-6 border-t-2 border-ink/20 grid grid-cols-3 gap-2 sm:gap-3 font-mono text-xs text-stone-600 max-w-lg mx-auto lg:mx-0">
              <div className="p-2.5 sm:p-3 bg-white border-2 border-ink rounded-xl shadow-brutal-sm">
                <span className="font-serif font-bold text-sm sm:text-xl text-ink block">30 Video Scripts</span>
                <span className="text-[9px] sm:text-[10px] text-stone-500">Format vertikal 9:16</span>
              </div>
              <div className="p-2.5 sm:p-3 bg-wasabi border-2 border-ink rounded-xl shadow-brutal-sm">
                <span className="font-serif font-bold text-sm sm:text-xl text-ink block">&lt; 24 Jam</span>
                <span className="text-[9px] sm:text-[10px] text-wasabiDark font-bold">Turnaround SLA</span>
              </div>
              <div className="p-2.5 sm:p-3 bg-white border-2 border-ink rounded-xl shadow-brutal-sm">
                <span className="font-serif font-bold text-sm sm:text-xl text-terracotta block">Rp299k</span>
                <span className="text-[9px] sm:text-[10px] text-stone-500">Flat tanpa langganan</span>
              </div>
            </div>
          </div>

          {/* Right 9:16 Vertical Teleprompter Mockup (5 Cols) */}
          <div className="lg:col-span-5 flex justify-center pt-2 lg:pt-0">
            <div className="w-[280px] sm:w-[320px] h-[480px] sm:h-[540px] bg-ink rounded-[38px] sm:rounded-[44px] p-3.5 sm:p-4 shadow-brutal-lg border-4 border-ink relative overflow-hidden flex flex-col justify-between select-none">

              {/* Phone Notch & Status */}
              <div className="flex justify-between items-center px-2 sm:px-3 pt-1 z-20 text-[10px] font-mono text-stone-400">
                <span className="font-bold text-white">09:41</span>
                <div className="w-20 sm:w-24 h-4 sm:h-5 bg-stone-900 rounded-full flex items-center justify-center gap-1.5 px-2 border border-stone-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-terracotta animate-pulse" />
                  <span className="text-[7px] sm:text-[8px] text-white uppercase font-bold">Teleprompter</span>
                </div>
                <div className="flex items-center gap-1 text-wasabi font-bold text-[9px] sm:text-[10px]">
                  <span>REC</span>
                </div>
              </div>

              {/* Rolling Teleprompter Canvas */}
              <div className="relative flex-1 overflow-hidden my-2 sm:my-3">
                <div className="animate-teleprompter space-y-3 font-mono text-xs text-stone-300 px-1">
                  <div className="p-3 bg-stone-900 border border-stone-700 rounded-2xl">
                    <span className="text-[9px] font-bold text-sunflower uppercase block tracking-wider">[00:00 - 00:03] HOOK PENYANGKALAN</span>
                    <p className="text-white text-xs mt-1 leading-snug">"Kenapa kopi sachet kamu sering bikin perut kembung padahal baru 3 teguk?"</p>
                  </div>
                  <div className="p-3 bg-stone-900 border border-stone-700 rounded-2xl">
                    <span className="text-[9px] font-bold text-wasabi uppercase block tracking-wider">[00:04 - 00:18] VALUE DELIVERY</span>
                    <p className="text-stone-200 text-xs mt-1 leading-snug">"Metode slow-drip 12 jam kami memecah asam klorogenat secara alami tanpa ngurangin kadar kafein."</p>
                  </div>
                  <div className="p-3 bg-stone-900 border border-stone-700 rounded-2xl">
                    <span className="text-[9px] font-bold text-terracotta uppercase block tracking-wider">[00:19 - 00:25] DIRECT CALL TO ACTION</span>
                    <p className="text-white text-xs mt-1 leading-snug">"Cek link di bio sekarang buat amankan sampler pack ramah lambung minggu ini!"</p>
                  </div>
                  <div className="p-3 bg-stone-900 border border-stone-700 rounded-2xl">
                    <span className="text-[9px] font-bold text-sunflower uppercase block tracking-wider">[00:00 - 00:03] HOOK PENYANGKALAN</span>
                    <p className="text-white text-xs mt-1 leading-snug">"Kenapa kopi sachet kamu sering bikin perut kembung padahal baru 3 teguk?"</p>
                  </div>
                </div>
              </div>

              {/* Teleprompter Bottom Controls Bar */}
              <div className="bg-stone-900 rounded-2xl p-2 sm:p-2.5 flex items-center justify-between text-stone-400 font-mono text-[9px] sm:text-[10px] z-20 border border-stone-800">
                <div className="flex items-center gap-1 text-white font-bold">
                  <Play className="w-3.5 h-3.5 text-wasabi" />
                  <span>Speed: 1.0x</span>
                </div>
                <span className="px-2 py-0.5 bg-stone-800 text-stone-300 rounded font-bold">Day 04 / 30</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
