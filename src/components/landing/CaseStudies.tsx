export function CaseStudies() {
  return (
    <section id="studi-kasus" className="py-14 sm:py-20 bg-sand-100/60 border-b border-sand-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-stone-500">Metrik Pembuktian</span>
          <h2 className="text-2xl sm:text-3xl font-serif text-sand-900 mt-1 sm:mt-2">Dampak Konsistensi Konten Terstruktur</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <div className="bento-card p-6 sm:p-8 rounded-2xl">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase px-2 py-0.5 bg-sand-100 text-stone-700 rounded border border-sand-200">Studi Kasus 01: Retail Fashion</span>
            <h3 className="text-base sm:text-lg font-bold text-sand-900 mt-3">Brand Apparel Lokal di Bandung</h3>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              Sebelumnya mengunggah foto katalog tanpa cerita. Beralih ke 30 naskah video dengan fokus pada detail bahan dan panduan fitting tubuh (*body fit guide*).
            </p>
            <div className="mt-6 pt-4 border-t border-sand-200 grid grid-cols-2 gap-2 font-mono text-xs">
              <div>
                <span className="text-stone-400 block text-[10px]">Saves Rate</span>
                <span className="text-sand-900 font-bold text-sm">+240%</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Waktu Produksi</span>
                <span className="text-emerald-700 font-bold text-sm">Turun 80%</span>
              </div>
            </div>
          </div>

          <div className="bento-card p-6 sm:p-8 rounded-2xl">
            <span className="text-[10px] sm:text-[11px] font-mono uppercase px-2 py-0.5 bg-sand-100 text-stone-700 rounded border border-sand-200">Studi Kasus 02: F&B Brand</span>
            <h3 className="text-base sm:text-lg font-bold text-sand-900 mt-3">Kedai Kopi Khusus Cold Brew</h3>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              Mengisi kalender konten dengan naskah perbandingan kadar asam kopi dan 4 artikel SEO seputar tips ngopi aman untuk lambung di situs resmi mereka.
            </p>
            <div className="mt-6 pt-4 border-t border-sand-200 grid grid-cols-2 gap-2 font-mono text-xs">
              <div>
                <span className="text-stone-400 block text-[10px]">Trafik Blog Google</span>
                <span className="text-sand-900 font-bold text-sm">1.800+ Kunjungan/bln</span>
              </div>
              <div>
                <span className="text-stone-400 block text-[10px]">Konsistensi Post</span>
                <span className="text-emerald-700 font-bold text-sm">30 Hari Penuh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
