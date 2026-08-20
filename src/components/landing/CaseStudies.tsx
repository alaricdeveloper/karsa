export function CaseStudies() {
  return (
    <section id="studi-kasus" className="py-12 sm:py-20 border-b-2 border-ink bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <span className="badge-tag bg-sunflower text-ink px-3 py-1 text-[11px] sm:text-xs font-mono uppercase tracking-wider">
            Metrik Pembuktian
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-ink mt-3">
            Dampak Konsistensi Konten Terstruktur
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Study 01 */}
          <div className="bento-pop rounded-3xl bg-canvas p-6 sm:p-8">
            <span className="badge-tag text-[10px] bg-white text-ink/70 px-2 py-0.5">
              Studi Kasus 01: Retail Fashion
            </span>
            <h3 className="font-serif text-lg sm:text-xl text-ink mt-3">
              Brand Apparel Lokal di Bandung
            </h3>
            <p className="text-xs text-ink/60 mt-2 leading-relaxed">
              Sebelumnya mengunggah foto katalog tanpa cerita. Beralih ke 30 naskah video
              dengan fokus pada detail bahan dan panduan fitting tubuh (*body fit guide*).
            </p>
            <div className="mt-6 pt-4 border-t-2 border-ink grid grid-cols-2 gap-2 font-mono text-xs">
              <div>
                <span className="text-ink/40 block text-[10px]">Saves Rate</span>
                <span className="font-serif text-ink font-bold text-sm">+240%</span>
              </div>
              <div>
                <span className="text-ink/40 block text-[10px]">Waktu Produksi</span>
                <span className="font-serif text-terracotta font-bold text-sm">Turun 80%</span>
              </div>
            </div>
          </div>

          {/* Study 02 */}
          <div className="bento-pop rounded-3xl bg-canvas p-6 sm:p-8">
            <span className="badge-tag text-[10px] bg-white text-ink/70 px-2 py-0.5">
              Studi Kasus 02: F&amp;B Brand
            </span>
            <h3 className="font-serif text-lg sm:text-xl text-ink mt-3">
              Kedai Kopi Khusus Cold Brew
            </h3>
            <p className="text-xs text-ink/60 mt-2 leading-relaxed">
              Mengisi kalender konten dengan naskah perbandingan kadar asam kopi dan 4 artikel SEO
              seputar tips ngopi aman untuk lambung di situs resmi mereka.
            </p>
            <div className="mt-6 pt-4 border-t-2 border-ink grid grid-cols-2 gap-2 font-mono text-xs">
              <div>
                <span className="text-ink/40 block text-[10px]">Trafik Blog Google</span>
                <span className="font-serif text-ink font-bold text-sm">1.800+ Kunjungan/bln</span>
              </div>
              <div>
                <span className="text-ink/40 block text-[10px]">Konsistensi Post</span>
                <span className="font-serif text-terracotta font-bold text-sm">30 Hari Penuh</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
