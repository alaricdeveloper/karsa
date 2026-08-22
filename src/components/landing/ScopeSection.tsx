const included = [
  "Riset angle dan audit satu akun kompetitor acuan.",
  "30 video script, caption AIDA, dan riset tagar.",
  "4 artikel SEO, Notion Content OS, dan backup Docs.",
  "Shot-list B-Roll, 5 bonus, dan kalibrasi pesan 48 jam.",
];

const excluded = [
  "Shooting, talent, atau produksi video di lokasi.",
  "Editing video, desain aset, dan pengelolaan posting harian.",
  "Budget iklan, pembelian media, atau jaminan angka performa tertentu.",
  "Penulisan ulang di luar kalibrasi tone dan istilah brand.",
];

export function ScopeSection() {
  return (
    <section id="cakupan" className="py-12 sm:py-20 border-b-2 border-ink bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Biar Ekspektasinya Jelas</span>
          <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-3">Apa yang termasuk dan apa yang tidak?</h2>
          <p className="text-xs sm:text-sm text-stone-600 font-mono mt-2 leading-relaxed">Kejelasan scope membuat proses lebih cepat dan hasil lebih mudah dipakai oleh tim kamu.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          <ScopeCard title="Termasuk dalam batch" items={included} included />
          <ScopeCard title="Tidak termasuk dalam batch" items={excluded} />
        </div>

        <div className="mt-5 p-4 sm:p-5 rounded-2xl border-2 border-ink bg-canvas flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider text-terracotta font-bold">Sebelum mulai</span>
            <p className="text-xs sm:text-sm text-stone-700 font-sans mt-1">Siapkan deskripsi produk, target pembeli, satu kompetitor acuan, dan akses komunikasi yang aktif.</p>
          </div>
          <a href="#order" className="text-xs font-mono font-bold text-ink hover:text-terracotta transition shrink-0">Isi brief <span aria-hidden="true">&rarr;</span></a>
        </div>
      </div>
    </section>
  );
}

function ScopeCard({ title, items, included: isIncluded = false }: { title: string; items: string[]; included?: boolean }) {
  return (
    <div className={`bento-pop p-5 sm:p-7 rounded-3xl ${isIncluded ? "bg-wasabi/25" : "bg-canvas"}`}>
      <div className="flex items-center gap-2 pb-4 border-b-2 border-ink">
        <span className={`w-7 h-7 rounded-full ${isIncluded ? "bg-wasabi" : "bg-terracotta text-white"} border-2 border-ink flex items-center justify-center font-bold`} aria-hidden="true">{isIncluded ? "✓" : "-"}</span>
        <h3 className="font-serif text-xl text-ink">{title}</h3>
      </div>
      <ul className={`mt-5 space-y-3 text-xs sm:text-sm font-sans ${isIncluded ? "text-stone-800" : "text-stone-700"}`}>
        {items.map((item) => <li key={item} className="flex gap-2"><span className={`font-bold ${isIncluded ? "text-terracotta" : "text-stone-400"}`}>{isIncluded ? "+" : "-"}</span><span>{item}</span></li>)}
      </ul>
    </div>
  );
}
