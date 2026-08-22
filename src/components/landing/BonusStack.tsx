export function BonusStack() {
  const bonuses = [
    {
      number: "01",
      price: "Rp250.000",
       title: "50 Template Hook untuk Membuka Video",
      description:
         "Koleksi 50 kalimat pembuka yang bisa kamu adaptasi untuk berbagai jenis promosi produk.",
    },
    {
      number: "02",
      price: "Rp200.000",
      title: "Panduan Optimasi Bio & Highlight",
      description:
         "Struktur profil Instagram agar pengunjung langsung memahami value bisnismu dalam 5 detik.",
    },
    {
      number: "03",
      price: "Rp300.000",
      title: "Content Repurposing Framework",
      description:
         "SOP untuk mengubah satu ide video menjadi carousel Instagram, thread X, dan status WhatsApp.",
    },
    {
      number: "04",
      price: "Rp350.000",
      title: "Garansi Kalibrasi Sudut Pesan 48 Jam",
      description:
         "Penyesuaian istilah produk dan tone naskah jika ada bagian yang kurang pas dalam 48 jam pertama.",
    },
    {
      number: "05",
      price: "Rp350.000",
       title: "Audio & Pacing Blueprint",
      description:
         "Panduan memilih referensi audio dan tempo jeda bicara agar video terasa lebih hidup.",
      colSpan: "sm:col-span-2 lg:col-span-2",
    },
  ];

  return (
    <section id="bonus-stack" className="py-12 sm:py-20 border-b-2 border-ink bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">
            Bonus Stack Eksklusif
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">
             5 Bonus Tambahan untuk Memaksimalkan Konten
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1">
             Semua bonus langsung masuk ke Notion Workspace kamu tanpa biaya ekstra.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {bonuses.map((b) => (
            <div
              key={b.number}
              className={`bento-pop p-5 sm:p-6 rounded-3xl flex flex-col justify-between bg-canvas ${b.colSpan || ""}`}
            >
              <div>
                <div className="flex justify-between items-center text-xs font-mono text-stone-500 mb-2">
                  <span className="font-bold text-ink">Bonus {b.number}</span>
                  <span className="line-through text-stone-400">{b.price}</span>
                </div>
                <h4 className="font-bold text-ink font-serif text-lg">
                  {b.title}
                </h4>
                <p className="text-xs text-stone-600 mt-2 leading-relaxed font-sans">
                  {b.description}
                </p>
              </div>
             <span className="badge-tag text-[10px] font-mono text-ink font-bold bg-wasabi px-2.5 py-1 rounded-lg mt-4 inline-block text-center">
                 SUDAH TERMASUK
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
