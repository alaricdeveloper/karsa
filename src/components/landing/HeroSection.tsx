import { ArrowRight, ArrowDown } from "lucide-react";

export function HeroSection() {
  return (
    <section className="pt-12 pb-12 sm:pt-20 sm:pb-20 border-b border-sand-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-stone-600 bg-sand-100 border border-sand-200 px-3 py-1 rounded-full mb-6 sm:mb-8 text-left">
          <span className="w-1.5 h-1.5 rounded-full bg-stone-500"></span>
          Sistem Konten Lengkap untuk Brand Mandiri & Kreator
        </div>

        <h1 className="text-3xl sm:text-6xl lg:text-7xl font-serif tracking-tight text-sand-900 leading-[1.12]">
          Inventaris konten 30 hari penuh. <br className="hidden sm:block" />
          <span className="italic font-serif text-stone-600">Riset tajam, naskah kata-per-kata, siap rekam.</span>
        </h1>

        <p className="mt-4 sm:mt-6 text-sm sm:text-lg text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed">
          Bukan agensi lambat dengan rapat berminggu-minggu. Dapatkan 30 naskah video TikTok/Reels, 30 takarir Instagram, 4 artikel SEO Google, dan ruang kerja Notion terstruktur dalam 1x24 jam.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
          <a href="#order" className="w-full sm:w-auto px-7 py-3.5 bg-sand-900 hover:bg-stone-800 text-sand-50 rounded-xl font-medium text-sm transition flex items-center justify-center gap-2 shadow-sm min-h-[48px]">
            <span>Isi Brief Bisnis Saya</span>
            <ArrowRight className="w-4 h-4" />
          </a>
          <a href="#deliverables" className="w-full sm:w-auto px-7 py-3.5 bg-sand-100 hover:bg-sand-200 text-sand-900 border border-sand-200 rounded-xl font-medium text-sm transition flex items-center justify-center gap-2 min-h-[48px]">
            <span>Pelajari 6 Modul Lengkap</span>
            <ArrowDown className="w-4 h-4 text-stone-500" />
          </a>
        </div>

        {/* Hero Metrics */}
        <div className="mt-12 sm:mt-14 pt-6 border-t border-sand-200/80 grid grid-cols-3 gap-2 sm:gap-4 text-left max-w-md sm:max-w-lg mx-auto font-mono text-[11px] sm:text-xs text-stone-500">
          <div>
            <div className="text-sand-900 font-bold text-sm sm:text-base">30 Hari</div>
            <div>Struktur Siap Post</div>
          </div>
          <div>
            <div className="text-sand-900 font-bold text-sm sm:text-base">1x24 Jam</div>
            <div>SLA Kurasi</div>
          </div>
          <div>
            <div className="text-sand-900 font-bold text-sm sm:text-base">Rp299.000</div>
            <div>Flat Tanpa Langganan</div>
          </div>
        </div>
      </div>
    </section>
  );
}
