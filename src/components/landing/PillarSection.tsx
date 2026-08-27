"use client";

export function PillarSection() {
  return (
<section id="pillar-konten" className="py-12 sm:py-16 border-b-2 border-ink bg-surface">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
              <div>
                <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Sistem Bukan Acak</span>
                <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">4 pilar yang mengisi 30 hari kalendermu.</h2>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 font-mono max-w-sm leading-relaxed">Setiap video masuk salah satu pilar. Rasio antar pilar dijaga agar feed tidak jadi brosur iklan.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              <div className="bento-pop p-5 rounded-2xl bg-amber-100/70">
                <span className="w-3 h-3 rounded-full bg-amber-500 border-2 border-ink inline-block"></span>
                <h3 className="font-serif text-lg text-ink mt-2">Edukasi Solusi</h3>
                <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Jawab pertanyaan yang sering ditanyakan calon pembeli. Bangun otoritas tanpa terlihat menggurui.</p>
                <span className="font-mono text-[10px] font-bold text-stone-500 block mt-3">Porsi: 40% feed</span>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-indigo-100/70">
                <span className="w-3 h-3 rounded-full bg-indigo-500 border-2 border-ink inline-block"></span>
                <h3 className="font-serif text-lg text-ink mt-2">Storytelling Nyata</h3>
                <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Cerita pelanggan, proses produksi, dan perjalanan brand. Emosi adalah bahan bakar engagement.</p>
                <span className="font-mono text-[10px] font-bold text-stone-500 block mt-3">Porsi: 30% feed</span>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-emerald-100/70">
                <span className="w-3 h-3 rounded-full bg-emerald-500 border-2 border-ink inline-block"></span>
                <h3 className="font-serif text-lg text-ink mt-2">Penawaran Spesial</h3>
                <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Promo, produk baru, dan CTA langsung. Dibatasi porsinya agar tidak membuat audiens lelah.</p>
                <span className="font-mono text-[10px] font-bold text-stone-500 block mt-3">Porsi: 15% feed</span>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-pink-100/70">
                <span className="w-3 h-3 rounded-full bg-pink-500 border-2 border-ink inline-block"></span>
                <h3 className="font-serif text-lg text-ink mt-2">Mitos vs Fakta</h3>
                <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Bongkar anggapan salah di industrimu. Format debunk ini mudah dibagikan dan memicu komentar.</p>
                <span className="font-mono text-[10px] font-bold text-stone-500 block mt-3">Porsi: 15% feed</span>
              </div>
            </div>
            <div className="mt-6 bento-pop rounded-3xl bg-white p-5 sm:p-7">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                <span className="font-mono text-xs font-bold text-ink uppercase tracking-wider">Rasio mingguan yang kami terapkan</span>
                <span className="text-[10px] font-mono text-stone-500">Aturan praktis: 70% value, 30% promosi</span>
              </div>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between font-mono text-[11px] font-bold text-stone-600 mb-1"><span>Edukasi Solusi</span><span>12 hari / 30</span></div>
                  <div className="h-3 rounded-full bg-stone-200 overflow-hidden border border-ink"><div className="h-full bg-amber-500" style={{ width: "40%" }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between font-mono text-[11px] font-bold text-stone-600 mb-1"><span>Storytelling Nyata</span><span>9 hari / 30</span></div>
                  <div className="h-3 rounded-full bg-stone-200 overflow-hidden border border-ink"><div className="h-full bg-indigo-500" style={{ width: "30%" }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between font-mono text-[11px] font-bold text-stone-600 mb-1"><span>Penawaran Spesial</span><span>5 hari / 30</span></div>
                  <div className="h-3 rounded-full bg-stone-200 overflow-hidden border border-ink"><div className="h-full bg-emerald-500" style={{ width: "15%" }}></div></div>
                </div>
                <div>
                  <div className="flex justify-between font-mono text-[11px] font-bold text-stone-600 mb-1"><span>Mitos vs Fakta</span><span>4 hari / 30</span></div>
                  <div className="h-3 rounded-full bg-stone-200 overflow-hidden border border-ink"><div className="h-full bg-pink-500" style={{ width: "15%" }}></div></div>
                </div>
              </div>
              <p className="text-[11px] font-sans text-stone-500 mt-4 leading-relaxed">Rasio ini menyesuaikan tujuan brief kamu (edukasi, leads, atau penjualan) dan dijelaskan per hari di dalam kalender.</p>
            </div>
          </div>
        </section>
  );
}
