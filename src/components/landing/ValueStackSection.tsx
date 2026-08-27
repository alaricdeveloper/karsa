"use client";

export function ValueStackSection() {
  return (
<section id="value-stack" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Rincian Paket</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Satu batch, semua fondasi kontenmu.</h2>
            </div>
            <div className="bento-pop rounded-3xl overflow-hidden font-mono text-xs">
              <div className="p-3.5 sm:p-5 bg-ink text-canvas flex justify-between items-center font-bold">
                <span>Komponen yang Kamu Terima</span>
                <span>Nilai Referensi</span>
              </div>
              <div className="divide-y-2 divide-ink p-2 sm:p-4 text-ink bg-white">
                <div className="py-2.5 px-2 flex justify-between"><span>30 Naskah Video Pendek Terstruktur</span><span className="font-bold">Rp1.500.000</span></div>
                <div className="py-2.5 px-2 flex justify-between"><span>30 Caption AIDA &amp; Riset Tagar</span><span className="font-bold">Rp600.000</span></div>
                <div className="py-2.5 px-2 flex justify-between"><span>4 Artikel Blog SEO (1.000 kata)</span><span className="font-bold">Rp800.000</span></div>
                <div className="py-2.5 px-2 flex justify-between"><span>Audit Angle &amp; Gap Kompetitor</span><span className="font-bold">Rp400.000</span></div>
                <div className="py-2.5 px-2 flex justify-between"><span>Notion Dynamic Content OS Template</span><span className="font-bold">Rp300.000</span></div>
                <div className="py-2.5 px-2 flex justify-between"><span>Panduan Shot List B-Roll Kamera HP</span><span className="font-bold">Rp250.000</span></div>
                <div className="py-2.5 px-2 flex justify-between text-terracotta font-bold"><span>5 Bonus Eksklusif Tambahan</span><span>Rp1.450.000</span></div>
              </div>
              <div className="p-4 sm:p-6 bg-wasabi/40 border-t-2 border-ink flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <span className="text-stone-600 block text-[11px] font-bold">Total Nilai Referensi:</span>
                  <span className="line-through text-stone-400 text-sm sm:text-base">Rp5.300.000</span>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-stone-600 block text-[11px] font-bold">Harga satu kali per batch:</span>
                  <span className="text-2xl sm:text-3xl font-bold font-serif text-ink">Rp299.000</span>
                </div>
              </div>
            </div>
          </div>
        </section>
  );
}
