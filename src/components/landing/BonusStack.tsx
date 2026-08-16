export function BonusStack() {
  const bonuses = [
    {
      number: "01",
      value: "Nilai Rp250.000",
      title: "50 Viral Hook Swipe File Template",
      description: "Koleksi 50 kalimat pembuka video teruji yang dapat diadaptasi untuk variasi promosi kilat.",
    },
    {
      number: "02",
      value: "Nilai Rp200.000",
      title: "Panduan Optimasi Bio & Highlight",
      description: "Struktur penataan profil Instagram agar pengunjung langsung memahami produk Anda dalam 5 detik.",
    },
    {
      number: "03",
      value: "Nilai Rp300.000",
      title: "Content Repurposing Framework",
      description: "SOP mengubah 1 ide video pendek menjadi carousel Instagram, thread X, dan status WhatsApp.",
    },
    {
      number: "04",
      value: "Nilai Rp350.000",
      title: "Garansi Kalibrasi Sudut Pesan 48 Jam",
      description: "Fasilitas revisi otomatis jika terdapat penyesuaian istilah produk dalam 48 jam pertama.",
    },
    {
      number: "05",
      value: "Nilai Rp350.000",
      title: "Audio Trending & Pacing Blueprint",
      description: "Panduan memilih latar suara komersial yang aman hak cipta dan pengaturan jeda bicara agar penonton tidak bosan.",
      colSpan: "sm:col-span-2 lg:col-span-2",
    },
  ];

  return (
    <section id="bonus-stack" className="py-14 sm:py-20 border-b border-sand-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-stone-500">Bonus Eksklusif Tambahan</span>
          <h2 className="text-2xl sm:text-4xl font-serif text-sand-900 mt-1">5 Bonus Tambahan (Gratis dalam Batch Ini)</h2>
          <p className="text-xs sm:text-sm text-stone-600 mt-2 font-mono">Diberikan langsung di dalam tautan Notion Workspace Anda tanpa biaya ekstra.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {bonuses.map((b) => (
            <div key={b.number} className={`bento-card p-5 rounded-2xl flex flex-col justify-between ${b.colSpan || ""}`}>
              <div>
                <div className="flex justify-between items-center text-xs font-mono text-stone-400 mb-3">
                  <span>Bonus {b.number}</span>
                  <span className="line-through text-stone-400">{b.value}</span>
                </div>
                <h4 className="font-bold text-sand-900 font-serif text-base">{b.title}</h4>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                  {b.description}
                </p>
              </div>
              <span className="text-[11px] font-mono text-emerald-700 font-bold mt-4 block">GRATIS Hari Ini</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
