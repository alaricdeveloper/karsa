"use client";

export function CaseStudiesSection() {
  return (
<section id="studi-kasus" className="py-12 sm:py-20 border-b-2 border-ink bg-surface">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Case Study Nyata</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Output yang berubah menjadi hasil terukur.</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-mono mt-2 max-w-xl mx-auto leading-relaxed">Dua contoh implementasi berikut menunjukkan bagaimana kalender terstruktur membantu tim mengubah produk menjadi konten yang konsisten.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bento-pop p-5 sm:p-8 rounded-3xl bg-canvas">
                <span className="badge-tag text-[10px] font-mono uppercase px-2.5 py-1 bg-white rounded-lg font-bold text-ink">Case Study 01: Retail Fashion</span>
                <h3 className="text-base sm:text-lg font-bold text-ink mt-3 font-serif">Brand apparel lokal di Bandung</h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed font-sans">
                  Sebelumnya mengunggah foto katalog tanpa cerita. Setelah beralih ke 30 video script Karsa, konten diarahkan ke detail bahan dan panduan fitting tubuh.
                </p>
                <div className="mt-6 pt-4 border-t-2 border-ink grid grid-cols-2 gap-2 font-mono text-xs">
                  <div>
                    <span className="text-stone-500 block text-[10px]">Saves rate</span>
                    <span className="text-ink font-bold text-base font-serif">+240%</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">Waktu produksi</span>
                    <span className="text-terracotta font-bold text-base font-serif">Turun 80%</span>
                  </div>
                </div>
              </div>
              <div className="bento-pop p-5 sm:p-8 rounded-3xl bg-canvas">
                <span className="badge-tag text-[10px] font-mono uppercase px-2.5 py-1 bg-white rounded-lg font-bold text-ink">Case Study 02: F&amp;B Brand</span>
                <h3 className="text-base sm:text-lg font-bold text-ink mt-3 font-serif">Kedai kopi khusus cold brew</h3>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed font-sans">
                  Kalender konten diisi dengan naskah edukasi seputar pH kopi dan artikel SEO yang menjawab pertanyaan calon pembeli.
                </p>
                <div className="mt-6 pt-4 border-t-2 border-ink grid grid-cols-2 gap-2 font-mono text-xs">
                  <div>
                    <span className="text-stone-500 block text-[10px]">Traffic Google</span>
                    <span className="text-ink font-bold text-base font-serif">1.800+/bln</span>
                  </div>
                  <div>
                    <span className="text-stone-500 block text-[10px]">Posting teratur</span>
                    <span className="text-terracotta font-bold text-base font-serif">30 hari penuh</span>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-[10px] sm:text-[11px] text-stone-500 font-mono mt-5">Metrik berasal dari implementasi project masing-masing. Hasil dapat berbeda sesuai konteks bisnis dan eksekusi.</p>
          </div>
        </section>
  );
}
