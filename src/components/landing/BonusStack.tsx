export function BonusStack() {
  const bonuses = [
    {
      number: "01",
      value: "Nilai Rp250.000",
      title: "50 Viral Hook Swipe File Template",
      description:
        "Koleksi 50 kalimat pembuka video teruji yang dapat diadaptasi untuk variasi promosi kilat.",
    },
    {
      number: "02",
      value: "Nilai Rp200.000",
      title: "Panduan Optimasi Bio & Highlight",
      description:
        "Struktur penataan profil Instagram agar pengunjung langsung memahami produk Anda dalam 5 detik.",
    },
    {
      number: "03",
      value: "Nilai Rp300.000",
      title: "Content Repurposing Framework",
      description:
        "SOP mengubah 1 ide video pendek menjadi carousel Instagram, thread X, dan status WhatsApp.",
    },
    {
      number: "04",
      value: "Nilai Rp350.000",
      title: "Garansi Kalibrasi Sudut Pesan 48 Jam",
      description:
        "Fasilitas revisi otomatis jika terdapat penyesuaian istilah produk dalam 48 jam pertama.",
    },
    {
      number: "05",
      value: "Nilai Rp350.000",
      title: "Audio Trending & Pacing Blueprint",
      description:
        "Panduan memilih latar suara komersial yang aman hak cipta dan pengaturan jeda bicara agar penonton tidak bosan.",
      colSpan: "sm:col-span-2 lg:col-span-2",
    },
  ];

  return (
    <section id="bonus-stack" className="py-12 sm:py-20 border-b-2 border-ink bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="badge-tag inline-block text-[11px] sm:text-xs font-mono uppercase tracking-wider bg-sunflower text-ink px-2.5 py-1 mb-2">
            Bonus Stack Eksklusif
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-1">
            5 Bonus Tambahan (Gratis dalam Batch Ini)
          </h2>
          <p className="text-xs sm:text-sm text-ink/60 mt-2 font-mono">
            Diberikan langsung di dalam tautan Notion Workspace Anda tanpa biaya ekstra.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bonuses.map((b) => (
            <div
              key={b.number}
              className={`bento-pop p-5 rounded-3xl bg-canvas flex flex-col justify-between ${b.colSpan || ""}`}
            >
              <div>
                <div className="flex justify-between items-center text-xs font-mono text-ink/40 mb-3">
                  <span className="font-bold text-ink">Bonus {b.number}</span>
                  <span className="line-through">{b.value}</span>
                </div>
                <h4 className="font-bold text-ink font-serif text-base">
                  {b.title}
                </h4>
                <p className="text-xs text-ink/60 mt-2 leading-relaxed">
                  {b.description}
                </p>
              </div>
              <span className="badge-tag text-[11px] font-mono font-bold text-ink bg-wasabi px-2.5 py-1 mt-4 inline-block self-start">
                GRATIS Hari Ini
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
