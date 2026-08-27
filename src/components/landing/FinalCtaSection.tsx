"use client";

export function FinalCtaSection() {
  return (
<section id="final-cta" className="py-12 sm:py-20 bg-terracotta text-white border-b-2 border-ink">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="bento-pop rounded-3xl p-6 sm:p-10 bg-terracotta text-white flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="badge-tag inline-flex px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-wasabi text-ink">Satu keputusan untuk 30 hari ke depan</span>
                <h2 className="text-3xl sm:text-5xl font-serif mt-3 leading-tight">Berhenti mulai dari nol setiap minggu.</h2>
                <p className="text-xs sm:text-sm text-white/85 font-sans leading-relaxed mt-3">Isi brief hari ini. Setelah diproses, kamu punya kalender konten yang jelas untuk direkam, ditulis, dan dipublikasikan.</p>
              </div>
              <div className="shrink-0 md:text-right">
                <div className="font-mono text-xs font-bold text-white/75 mb-2">Karsa Content Batch</div>
                <div className="font-serif text-3xl text-wasabi">Rp299.000</div>
                <a href="#order" className="mt-4 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-ink text-canvas font-mono text-xs font-bold hover:bg-wasabi hover:text-ink transition shadow-brutal-sm">Isi brief sekarang <span>&rarr;</span></a>
              </div>
            </div>
          </div>
        </section>
  );
}
