"use client";

export function OutcomesSection() {
  return (
<section id="hasil" className="py-12 sm:py-16 border-b-2 border-ink bg-canvas">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-wasabi text-ink">Sebelum &amp; Sesudah</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Apa yang berubah dalam 30 hari.</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1">Bukan janji viral. Ini perubahan sistem yang bisa kamu rasakan langsung.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="bento-pop p-5 rounded-2xl bg-white">
                <div className="flex justify-between items-center font-mono text-[10px] font-bold">
                  <span className="text-rose-700">SEBELUM</span><span className="text-stone-400">&rarr;</span><span className="text-emerald-700">SESUDAH</span>
                </div>
                <h3 className="font-bold text-sm text-ink mt-3">Postingan bulanan</h3>
                <p className="text-xs text-stone-600 font-sans mt-1.5 leading-relaxed">Dari 0-4 posting sporadis menjadi 30 video terencana dengan tanggal jelas di kalender.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-white">
                <div className="flex justify-between items-center font-mono text-[10px] font-bold">
                  <span className="text-rose-700">SEBELUM</span><span className="text-stone-400">&rarr;</span><span className="text-emerald-700">SESUDAH</span>
                </div>
                <h3 className="font-bold text-sm text-ink mt-3">Ide konten</h3>
                <p className="text-xs text-stone-600 font-sans mt-1.5 leading-relaxed">Dari "stuck tiap Minggu malam" menjadi 30 angle siap pakai yang tinggal direkam.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-white">
                <div className="flex justify-between items-center font-mono text-[10px] font-bold">
                  <span className="text-rose-700">SEBELUM</span><span className="text-stone-400">&rarr;</span><span className="text-emerald-700">SESUDAH</span>
                </div>
                <h3 className="font-bold text-sm text-ink mt-3">Proses rekam</h3>
                <p className="text-xs text-stone-600 font-sans mt-1.5 leading-relaxed">Dari improvisasi di depan kamera menjadi naskah per detik + shot list yang menghilangkan tebak-tebakan.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-wasabi/25">
                <div className="flex justify-between items-center font-mono text-[10px] font-bold">
                  <span className="text-rose-700">SEBELUM</span><span className="text-stone-400">&rarr;</span><span className="text-emerald-700">SESUDAH</span>
                </div>
                <h3 className="font-bold text-sm text-ink mt-3">Caption &amp; tagar</h3>
                <p className="text-xs text-stone-700 font-sans mt-1.5 leading-relaxed">Dari caption asal-asalan menjadi copywriting AIDA + riset tagar 3 tier siap tempel.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-sunflower/30">
                <div className="flex justify-between items-center font-mono text-[10px] font-bold">
                  <span className="text-rose-700">SEBELUM</span><span className="text-stone-400">&rarr;</span><span className="text-emerald-700">SESUDAH</span>
                </div>
                <h3 className="font-bold text-sm text-ink mt-3">Traffic Google</h3>
                <p className="text-xs text-stone-700 font-sans mt-1.5 leading-relaxed">Dari blog kosong menjadi 4 artikel SEO yang mulai mendatangkan pembeli dari pencarian.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-ink text-canvas">
                <div className="flex justify-between items-center font-mono text-[10px] font-bold">
                  <span className="text-rose-400">SEBELUM</span><span className="text-stone-500">&rarr;</span><span className="text-wasabi">SESUDAH</span>
                </div>
                <h3 className="font-bold text-sm mt-3">Tim &amp; sistem</h3>
                <p className="text-xs text-stone-300 font-sans mt-1.5 leading-relaxed">Dari "siapa yang ngurus konten?" menjadi SOP produksi mingguan yang bisa dijalankan siapa pun.</p>
              </div>
            </div>
          </div>
        </section>
  );
}
