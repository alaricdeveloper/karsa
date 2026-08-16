export function ProblemSection() {
  return (
    <section className="py-14 sm:py-20 bg-sand-100/40 border-b border-sand-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-stone-500">Tantangan Nyata Pemilik Bisnis</span>
          <h2 className="text-2xl sm:text-3xl font-serif text-sand-900 mt-1">Mengapa membuat konten terasa melelahkan?</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          <div className="bento-card p-6 rounded-2xl">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-mono font-bold text-xs mb-4">01</div>
            <h3 className="font-bold text-sand-900 font-serif text-lg">Creative Burnout</h3>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              Menghabiskan waktu 2 jam setiap malam hanya untuk menatap layar kosong tanpa tahu hook apa yang memicu interaksi penonton besok pagi.
            </p>
          </div>

          <div className="bento-card p-6 rounded-2xl">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-mono font-bold text-xs mb-4">02</div>
            <h3 className="font-bold text-sand-900 font-serif text-lg">Biaya Agensi Membengkak</h3>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              Merekrut agensi atau admin konten menuntut komitmen Rp3.500.000–Rp5.000.000 setiap bulan dengan proses onboarding dan revisi berhari-hari.
            </p>
          </div>

          <div className="bento-card p-6 rounded-2xl">
            <div className="w-8 h-8 rounded-lg bg-rose-100 text-rose-800 flex items-center justify-center font-mono font-bold text-xs mb-4">03</div>
            <h3 className="font-bold text-sand-900 font-serif text-lg">Konten Tanpa Niat Beli</h3>
            <p className="text-xs text-stone-600 mt-2 leading-relaxed">
              Mengunggah konten sporadis tanpa struktur penawaran (CTA), psikologi AIDA, atau riset kata kunci Google yang mampu mendatangkan pelanggan pasif.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
