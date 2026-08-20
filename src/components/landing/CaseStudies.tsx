export function CaseStudies() {
  return (
    <section id="studi-kasus" className="py-12 sm:py-20 border-b-2 border-ink bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">
            Metrik Pembuktian
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">
            Dampak Konsistensi Konten Terstruktur
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bento-pop p-5 sm:p-8 rounded-3xl bg-canvas">
            <span className="badge-tag text-[10px] font-mono uppercase px-2.5 py-1 bg-white rounded-lg font-bold text-ink">
              Studi Kasus 01: Retail Fashion
            </span>
            <h3 className="text-base sm:text-lg font-bold text-ink mt-3 font-serif">
              Brand Apparel Lokal di Bandung
            </h3>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed font-sans">
              Sebelumnya mengunggah foto katalog tanpa cerita. Beralih ke 30 video script Karsa dengan fokus detail bahan dan panduan fitting tubuh (*body fit guide*).
            </p>
            <div className="mt-6 pt-4 border-t-2 border-ink grid grid-cols-2 gap-2 font-mono text-xs">
              <div>
                <span className="text-stone-500 block text-[10px]">Saves Rate</span>
                <span className="text-ink font-bold text-base font-serif">+240%</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">Waktu Produksi</span>
                <span className="text-terracotta font-bold text-base font-serif">Turun 80%</span>
              </div>
            </div>
          </div>

          <div className="bento-pop p-5 sm:p-8 rounded-3xl bg-canvas">
            <span className="badge-tag text-[10px] font-mono uppercase px-2.5 py-1 bg-white rounded-lg font-bold text-ink">
              Studi Kasus 02: F&amp;B Brand
            </span>
            <h3 className="text-base sm:text-lg font-bold text-ink mt-3 font-serif">
              Kedai Kopi Khusus Cold Brew
            </h3>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed font-sans">
              Mengisi kalender konten dengan naskah edukasi pH kopi dan 4 artikel SEO seputar tips ngopi aman untuk lambung di blog resmi.
            </p>
            <div className="mt-6 pt-4 border-t-2 border-ink grid grid-cols-2 gap-2 font-mono text-xs">
              <div>
                <span className="text-stone-500 block text-[10px]">Traffic Google</span>
                <span className="text-ink font-bold text-base font-serif">1.800+/bln</span>
              </div>
              <div>
                <span className="text-stone-500 block text-[10px]">Posting Teratur</span>
                <span className="text-terracotta font-bold text-base font-serif">30 Hari Penuh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
