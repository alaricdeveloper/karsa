export function ValueStackTable() {
  const rows = [
    { item: "30 Naskah Video Pendek Terstruktur", value: "Rp1.500.000" },
    { item: "30 Captions AIDA & Riset Tagar", value: "Rp600.000" },
    { item: "4 Artikel Blog SEO (1.000 kata)", value: "Rp800.000" },
    { item: "Audit Angle & Gap Kompetitor", value: "Rp400.000" },
    { item: "Notion Dynamic Content OS Template", value: "Rp300.000" },
    { item: "Panduan Shot List B-Roll Kamera HP", value: "Rp250.000" },
    {
      item: "5x Bonus Eksklusif Tambahan",
      value: "Rp1.450.000",
      highlight: true,
    },
  ];

  return (
    <section
      id="value-stack"
      className="py-12 sm:py-20 border-b-2 border-ink bg-canvas"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">
            Transparansi Nilai
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">
            Rincian Akumulasi Nilai Produk
          </h2>
        </div>

        <div className="bento-pop bg-white rounded-3xl overflow-hidden font-mono text-xs">
          <div className="p-3.5 sm:p-5 bg-ink text-canvas flex justify-between items-center font-bold">
            <span>Komponen Deliverables &amp; Bonus</span>
            <span>Estimasi Nilai Pasar</span>
          </div>
          <div className="divide-y-2 divide-ink p-2 sm:p-4 text-ink bg-white">
            {rows.map((row) => (
              <div
                key={row.item}
                className={`py-2.5 px-2 flex justify-between ${
                  row.highlight ? "text-terracotta font-bold" : ""
                }`}
              >
                <span>{row.item}</span>
                <span className="font-bold">{row.value}</span>
              </div>
            ))}
          </div>
          <div className="p-4 sm:p-6 bg-wasabi/40 border-t-2 border-ink flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <span className="text-stone-600 block text-[11px] font-bold">
                Total Nilai Akumulasi Nyata:
              </span>
              <span className="line-through text-stone-400 text-sm sm:text-base">
                Rp5.300.000
              </span>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-stone-600 block text-[11px] font-bold">
                Biaya Flat Batch Anda Hari Ini:
              </span>
              <span className="text-2xl sm:text-3xl font-bold font-serif text-ink">
                Rp299.000
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
