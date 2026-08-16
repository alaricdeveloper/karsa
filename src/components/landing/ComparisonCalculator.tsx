export function ComparisonCalculator() {
  return (
    <section id="calculator" className="py-14 sm:py-20 border-b border-sand-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-stone-500">Perbandingan Setara</span>
          <h2 className="text-2xl sm:text-3xl font-serif text-sand-900 mt-1 sm:mt-2">Biaya Produksi 1 Batch (30 Konten)</h2>
          <p className="text-stone-600 text-xs sm:text-sm mt-1 sm:mt-2">Perbandingan biaya langsung untuk output aset yang sama persis.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Pengerjaan Manual */}
          <div className="bento-card p-6 sm:p-8 rounded-2xl">
            <span className="text-[11px] font-mono uppercase text-stone-500">Pengerjaan Manual</span>
            <h3 className="text-base sm:text-lg font-bold text-stone-900 mt-1">Jasa Lepas / Agensi</h3>

            <div className="mt-4 sm:mt-6 space-y-2.5 sm:space-y-3 text-xs font-mono text-stone-600">
              <div className="flex justify-between py-1.5 border-b border-sand-200">
                <span>30 Naskah Video Pendek</span>
                <span className="font-bold text-stone-900">Rp1.500.000</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-sand-200">
                <span>30 Takarir & Riset Tagar</span>
                <span className="font-bold text-stone-900">Rp600.000</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-sand-200">
                <span>4 Artikel Blog SEO (1.000 kata)</span>
                <span className="font-bold text-stone-900">Rp800.000</span>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-sand-200 flex justify-between items-baseline">
              <span className="text-xs font-medium text-stone-500">Estimasi Total Biaya:</span>
              <span className="text-lg sm:text-xl font-bold font-mono text-stone-900">Rp2.900.000</span>
            </div>
          </div>

          {/* Karsa */}
          <div className="bento-card p-6 sm:p-8 rounded-2xl border-2 border-sand-900 bg-white relative">
            <div className="absolute -top-3 right-4 sm:right-6 bg-sand-900 text-sand-50 text-[10px] font-mono uppercase px-2.5 py-0.5 rounded">
              Karsa
            </div>

            <span className="text-[11px] font-mono uppercase text-stone-500">Karsa Studio</span>
            <h3 className="text-base sm:text-lg font-bold text-stone-900 mt-1">Paket Komplit 30 Hari</h3>

            <div className="mt-4 sm:mt-6 space-y-2.5 sm:space-y-3 text-xs font-mono text-stone-600">
              <div className="flex justify-between py-1.5 border-b border-sand-200">
                <span>30 Naskah Video + 30 Takarir</span>
                <span className="font-bold text-stone-900">Termasuk</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-sand-200">
                <span>4 Artikel SEO Website</span>
                <span className="font-bold text-stone-900">Termasuk</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-sand-200">
                <span>Audit Sudut Kompetitor + 5 Bonus</span>
                <span className="font-bold text-stone-900">Termasuk</span>
              </div>
            </div>

            <div className="mt-6 sm:mt-8 pt-3 sm:pt-4 border-t border-sand-200 flex justify-between items-baseline">
              <span className="text-xs font-medium text-stone-500">Biaya Sekali Bayar:</span>
              <span className="text-xl sm:text-2xl font-bold font-mono text-sand-900">Rp299.000</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
