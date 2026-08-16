export function ValueStackTable() {
  const rows = [
    { item: "30 Naskah Video Pendek Terstruktur", value: "Rp1.500.000" },
    { item: "30 Takarir AIDA & Riset Tagar", value: "Rp600.000" },
    { item: "4 Artikel Blog SEO (1.000 kata)", value: "Rp800.000" },
    { item: "Audit Celah 1 Kompetitor Utama", value: "Rp400.000" },
    { item: "Notion Dynamic Content OS Template", value: "Rp300.000" },
    { item: "Panduan Shot List B-Roll & Visual", value: "Rp250.000" },
    { item: "5x Bonus Eksklusif Tambahan", value: "Rp1.450.000", highlight: true },
  ];

  return (
    <section id="value-stack" className="py-14 sm:py-20 bg-sand-100/60 border-b border-sand-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-stone-500">Transparansi Nilai</span>
          <h2 className="text-2xl sm:text-4xl font-serif text-sand-900 mt-1">Rincian Akumulasi Nilai Produk</h2>
        </div>

        <div className="bento-card rounded-2xl overflow-hidden shadow-sm font-mono text-xs">
          <div className="p-4 sm:p-5 bg-sand-900 text-sand-50 flex justify-between items-center font-bold">
            <span>Komponen Deliverables & Bonus</span>
            <span>Estimasi Nilai Pasar</span>
          </div>
          <div className="divide-y divide-sand-200 p-2 sm:p-4 text-stone-700">
            {rows.map((row) => (
              <div key={row.item} className={`py-2.5 px-2 flex justify-between ${row.highlight ? "text-emerald-800 font-semibold" : ""}`}>
                <span>{row.item}</span>
                <span className="font-bold">{row.value}</span>
              </div>
            ))}
          </div>
          <div className="p-4 sm:p-5 bg-sand-100 border-t border-sand-300 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <span className="text-stone-500 block text-[11px]">Total Nilai Akumulasi Nyata:</span>
              <span className="line-through text-stone-400 text-sm">Rp5.300.000</span>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-stone-500 block text-[11px]">Biaya Flat Batch Anda Hari Ini:</span>
              <span className="text-2xl sm:text-3xl font-bold text-sand-900">Rp299.000</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
