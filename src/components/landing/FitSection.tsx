"use client";

export function FitSection() {
  return (
<section id="cocok-untuk" className="py-12 sm:py-20 border-b-2 border-ink bg-surface">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-wasabi text-ink">Apakah Ini Buat Kamu?</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-3">Satu sistem untuk tim kecil yang ingin bergerak cepat.</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-mono mt-2 leading-relaxed">Karsa paling cocok untuk bisnis yang sudah punya produk, tetapi belum punya waktu atau sistem untuk mengubahnya menjadi konten rutin.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-wasabi/25">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-wasabiDark mb-4">
                  <span className="w-6 h-6 rounded-full bg-wasabi border-2 border-ink flex items-center justify-center">✓</span>
                  Cocok untuk kamu jika...
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-stone-800 font-sans">
                  <li className="flex gap-2"><span className="font-bold text-terracotta">01</span><span>Punya produk atau layanan yang siap dipasarkan.</span></li>
                  <li className="flex gap-2"><span className="font-bold text-terracotta">02</span><span>Bisa merekam sendiri dengan HP atau punya satu orang talent.</span></li>
                  <li className="flex gap-2"><span className="font-bold text-terracotta">03</span><span>Butuh arah yang jelas untuk posting konsisten selama 30 hari.</span></li>
                  <li className="flex gap-2"><span className="font-bold text-terracotta">04</span><span>Ingin menghemat waktu tanpa menyerahkan seluruh brand voice ke agensi.</span></li>
                </ul>
              </div>
              <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-canvas">
                <div className="flex items-center gap-2 font-mono text-xs font-bold text-terracotta mb-4">
                  <span className="w-6 h-6 rounded-full bg-terracotta text-ink border-2 border-ink flex items-center justify-center">!</span>
                  Kurang cocok jika...
                </div>
                <ul className="space-y-3 text-xs sm:text-sm text-stone-700 font-sans">
                  <li className="flex gap-2"><span className="font-bold text-stone-400">01</span><span>Yang kamu cari adalah jasa shooting, editing, atau talent di lokasi.</span></li>
                  <li className="flex gap-2"><span className="font-bold text-stone-400">02</span><span>Produk belum siap dijual atau positioning-nya masih berubah setiap hari.</span></li>
                  <li className="flex gap-2"><span className="font-bold text-stone-400">03</span><span>Kamu membutuhkan konten real-time untuk berita atau tren harian.</span></li>
                </ul>
                <p className="pt-4 mt-4 border-t-2 border-ink text-[11px] font-mono text-stone-500">Kalau kebutuhanmu di luar cakupan ini, tetap boleh konsultasi lewat brief.</p>
              </div>
            </div>
          </div>
        </section>
  );
}
