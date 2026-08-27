"use client";

export function AnatomySection() {
  return (
<section id="anatomi-script" className="py-12 sm:py-16 border-b-2 border-ink bg-canvas">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Di Balik Layar</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Anatomi 25 detik yang bikin orang berhenti scroll.</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-mono mt-2 leading-relaxed">Setiap naskah Karsa mengikuti struktur waktu ini — alasan di balik setiap detiknya.</p>
            </div>
            <div className="timeline-bar rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-4 font-mono text-xs">
              <div className="p-4 sm:p-5 bg-terracotta text-white">
                <span className="text-[9px] uppercase tracking-wider font-bold block">00:00 - 00:03</span>
                <h3 className="font-serif text-lg mt-1">HOOK</h3>
                <p className="text-white/85 text-[11px] mt-1.5 leading-relaxed font-sans">Pernyataan kontras, pertanyaan, atau klaim yang memicu rasa penasaran dalam 3 detik pertama.</p>
              </div>
              <div className="p-4 sm:p-5 bg-sunflower/70 text-ink">
                <span className="text-[9px] uppercase tracking-wider font-bold block">00:03 - 00:10</span>
                <h3 className="font-serif text-lg mt-1">KONTEKS</h3>
                <p className="text-stone-800 text-[11px] mt-1.5 leading-relaxed font-sans">Siapa ini untuk dan masalah apa yang dibuka. Audiens merasa "ini cerita saya".</p>
              </div>
              <div className="p-4 sm:p-5 bg-wasabi/70 text-ink">
                <span className="text-[9px] uppercase tracking-wider font-bold block">00:10 - 00:18</span>
                <h3 className="font-serif text-lg mt-1">VALUE</h3>
                <p className="text-stone-800 text-[11px] mt-1.5 leading-relaxed font-sans">Solusi, cara kerja, dan bukti. Disampaikan dengan visual yang mudah diikuti.</p>
              </div>
              <div className="p-4 sm:p-5 bg-ink text-canvas">
                <span className="text-[9px] uppercase tracking-wider font-bold block">00:18 - 00:25</span>
                <h3 className="font-serif text-lg mt-1">CTA</h3>
                <p className="text-stone-300 text-[11px] mt-1.5 leading-relaxed font-sans">Satu ajakan jelas: simpan, komentar, DM, atau kunjungi profil. Tidak pernah dua-duanya.</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 text-xs font-sans">
              <div className="p-4 rounded-2xl border-2 border-ink bg-white shadow-brutal-sm">
                <span className="font-mono text-[10px] font-bold text-terracotta block mb-2">PSIKOLOGI 01</span>
                <h3 className="font-bold text-ink text-sm">Curiosity gap</h3>
                <p className="text-stone-600 mt-1.5 leading-relaxed">Hook membuka pertanyaan di kepala penonton tanpa menjawabnya langsung — otak memaksa mereka bertahan.</p>
              </div>
              <div className="p-4 rounded-2xl border-2 border-ink bg-white shadow-brutal-sm">
                <span className="font-mono text-[10px] font-bold text-terracotta block mb-2">PSIKOLOGI 02</span>
                <h3 className="font-bold text-ink text-sm">Loss aversion</h3>
                <p className="text-stone-600 mt-1.5 leading-relaxed">"Jangan beli ini sebelum tahu…" memicu rasa takut ketinggalan informasi penting — retention naik drastis.</p>
              </div>
              <div className="p-4 rounded-2xl border-2 border-ink bg-white shadow-brutal-sm">
                <span className="font-mono text-[10px] font-bold text-terracotta block mb-2">PSIKOLOGI 03</span>
                <h3 className="font-bold text-ink text-sm">Satu pesan, satu aksi</h3>
                <p className="text-stone-600 mt-1.5 leading-relaxed">Penonton mengingat satu hal per video. CTA tunggal membuat langkah berikutnya tidak ambigu.</p>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl border-2 border-ink bg-wasabi/25">
              <span className="font-mono text-xs font-bold text-ink text-center sm:text-left">50 template hook ada di Bonus 01 — mulai dari penyangkalan, angka mengejutkan, sampai "stop doing X".</span>
              <a href="#bonus-stack" className="badge-tag bg-ink text-canvas px-4 py-2.5 rounded-xl font-mono text-xs font-bold hover:bg-terracotta hover:text-white transition shrink-0">Lihat semua bonus &rarr;</a>
            </div>
          </div>
        </section>
  );
}
