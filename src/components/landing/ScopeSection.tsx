"use client";

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
              <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-wasabi/25">
                <div className="flex items-center gap-2 pb-4 border-b-2 border-ink">
                  <span className="w-7 h-7 rounded-full bg-wasabi border-2 border-ink flex items-center justify-center font-bold">✓</span>
                  <h3 className="font-serif text-xl text-ink">Termasuk dalam batch</h3>
                </div>
                <ul className="mt-5 space-y-3 text-xs sm:text-sm font-sans text-stone-800">
                  <li className="flex gap-2"><span className="text-terracotta font-bold">+</span><span>Riset angle dan audit satu akun kompetitor acuan.</span></li>
                  <li className="flex gap-2"><span className="text-terracotta font-bold">+</span><span>30 video script, caption AIDA, dan riset tagar.</span></li>
                  <li className="flex gap-2"><span className="text-terracotta font-bold">+</span><span>4 artikel SEO, Notion Content OS, dan backup Docs.</span></li>
                  <li className="flex gap-2"><span className="text-terracotta font-bold">+</span><span>Shot-list B-Roll, 5 bonus, dan kalibrasi pesan 48 jam.</span></li>
                </ul>
              </div>
              <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-canvas">
                <div className="flex items-center gap-2 pb-4 border-b-2 border-ink">
                  <span className="w-7 h-7 rounded-full bg-terracotta text-white border-2 border-ink flex items-center justify-center font-bold">-</span>
                  <h3 className="font-serif text-xl text-ink">Tidak termasuk dalam batch</h3>
                </div>
                <ul className="mt-5 space-y-3 text-xs sm:text-sm font-sans text-stone-700">
                  <li className="flex gap-2"><span className="text-stone-400 font-bold">-</span><span>Shooting, talent, atau produksi video di lokasi.</span></li>
                  <li className="flex gap-2"><span className="text-stone-400 font-bold">-</span><span>Editing video, desain aset, dan pengelolaan posting harian.</span></li>
                  <li className="flex gap-2"><span className="text-stone-400 font-bold">-</span><span>Budget iklan, pembelian media, atau jaminan angka performa tertentu.</span></li>
                  <li className="flex gap-2"><span className="text-stone-400 font-bold">-</span><span>Penulisan ulang di luar kalibrasi tone dan istilah brand.</span></li>
                </ul>
              </div>
            </div>
            <div className="mt-5 p-4 sm:p-5 rounded-2xl border-2 border-ink bg-canvas flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
              <div>
                <span className="font-mono text-[10px] uppercase tracking-wider text-terracotta font-bold">Sebelum mulai</span>
                <p className="text-xs sm:text-sm text-stone-700 font-sans mt-1">Siapkan deskripsi produk, target pembeli, satu kompetitor acuan, dan akses komunikasi yang aktif.</p>
              </div>
              <a href="#order" className="text-xs font-mono font-bold text-ink hover:text-terracotta transition shrink-0">Isi brief &rarr;</a>
            </div>
          </div>
        </section>
  );
}
