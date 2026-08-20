export function ValueStackTable() {
  const rows = [
    { item: "30 Naskah Video Pendek Terstruktur", value: "Rp1.500.000" },
    { item: "30 Takarir AIDA & Riset Tagar", value: "Rp600.000" },
    { item: "4 Artikel Blog SEO (1.000 kata)", value: "Rp800.000" },
    { item: "Audit Angle & Gap 1 Kompetitor Utama", value: "Rp400.000" },
    { item: "Notion Dynamic Content OS Template", value: "Rp300.000" },
    { item: "Panduan B-Roll & Visual Kamera HP", value: "Rp250.000" },
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
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="badge-tag inline-block text-[11px] sm:text-xs font-mono uppercase tracking-wider bg-sunflower text-ink px-2.5 py-1 mb-2">
            Transparansi Nilai
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-1">
            Rincian Akumulasi Nilai Produk
          </h2>
        </div>

        <div className="bento-pop rounded-3xl overflow-hidden font-mono text-xs">
          <div className="p-4 sm:p-5 bg-ink text-canvas flex justify-between items-center font-bold">
            <span>Komponen Deliverables &amp; Bonus</span>
            <span>Estimasi Nilai Pasar</span>
          </div>
          <div className="divide-y-2 divide-ink bg-white p-2 sm:p-4 text-ink">
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
          <div className="p-4 sm:p-5 bg-wasabi/40 border-t-2 border-ink flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
            <div>
              <span className="text-ink/50 block text-[11px]">
                Total Nilai Akumulasi Nyata:
              </span>
              <span className="line-through text-ink/40 text-sm">
                Rp5.300.000
              </span>
            </div>
            <div className="text-left sm:text-right">
              <span className="text-ink/50 block text-[11px]">
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
