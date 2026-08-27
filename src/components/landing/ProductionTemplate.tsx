"use client";

export function ProductionTemplate() {
  return (
<section id="alur-produksi" className="py-12 sm:py-16 border-b-2 border-ink bg-canvas">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-wasabi text-ink">Beban Kerja Terbagi</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Template produksi satu minggu: 4 hari kerja, 1 hari cadangan.</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-mono mt-2 leading-relaxed">30 naskah sudah membagi beban. Tim kamu tinggal mengikuti ritme produksi ini.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
              <div className="bento-pop p-4 rounded-2xl bg-white">
                <span className="font-mono text-[10px] font-bold text-terracotta block">SENIN</span>
                <h3 className="font-bold text-sm text-ink mt-2">Rekam batch</h3>
                <p className="text-[11px] text-stone-600 font-sans mt-1.5 leading-relaxed">Rekam 4-6 video sekali jalan dengan teleprompter. Satu sesi 2-3 jam.</p>
                <span className="font-mono text-[10px] font-bold text-stone-400 block mt-3">Day 01-06</span>
              </div>
              <div className="bento-pop p-4 rounded-2xl bg-sunflower/40">
                <span className="font-mono text-[10px] font-bold text-terracotta block">SELASA</span>
                <h3 className="font-bold text-sm text-ink mt-2">Edit &amp; caption</h3>
                <p className="text-[11px] text-stone-700 font-sans mt-1.5 leading-relaxed">Potong di CapCut, tempel caption AIDA yang sudah jadi. Selesai lebih cepat.</p>
                <span className="font-mono text-[10px] font-bold text-stone-400 block mt-3">Day 01-06</span>
              </div>
              <div className="bento-pop p-4 rounded-2xl bg-white">
                <span className="font-mono text-[10px] font-bold text-terracotta block">RABU</span>
                <h3 className="font-bold text-sm text-ink mt-2">Jadwal posting</h3>
                <p className="text-[11px] text-stone-600 font-sans mt-1.5 leading-relaxed">Jadwalkan lewat Meta Business Suite / TikTok Scheduler sesuai jam terbaik.</p>
                <span className="font-mono text-[10px] font-bold text-stone-400 block mt-3">Day 07-09</span>
              </div>
              <div className="bento-pop p-4 rounded-2xl bg-wasabi/40">
                <span className="font-mono text-[10px] font-bold text-terracotta block">KAMIS</span>
                <h3 className="font-bold text-sm text-ink mt-2">Balas &amp; pantau</h3>
                <p className="text-[11px] text-stone-700 font-sans mt-1.5 leading-relaxed">Balas komentar &amp; DM dalam 24 jam. Catat video mana yang paling disimpan.</p>
                <span className="font-mono text-[10px] font-bold text-stone-400 block mt-3">Semua</span>
              </div>
              <div className="bento-pop p-4 rounded-2xl bg-ink text-canvas">
                <span className="font-mono text-[10px] font-bold text-wasabi block">JUMAT</span>
                <h3 className="font-bold text-sm mt-2">Review data</h3>
                <p className="text-[11px] text-stone-300 font-sans mt-1.5 leading-relaxed">Lihat retention &amp; saves. Pilih format terbaik untuk minggu depan.</p>
                <span className="font-mono text-[10px] font-bold text-stone-400 block mt-3">30 menit</span>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl border-2 border-ink bg-wasabi/25">
              <span className="font-mono text-xs font-bold text-ink text-center sm:text-left">Hasilnya: 30 hari konten selesai dengan total &plusmn;10 jam produksi per bulan — bukan 40 jam brainstorming tanpa arah.</span>
              <a href="#cara-kerja" className="badge-tag bg-ink text-canvas px-4 py-2.5 rounded-xl font-mono text-xs font-bold hover:bg-terracotta hover:text-white transition shrink-0">Lihat alur kerja Karsa &rarr;</a>
            </div>
          </div>
        </section>
  );
}
