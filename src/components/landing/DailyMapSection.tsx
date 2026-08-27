"use client";

export function DailyMapSection() {
  return (
<section id="isi-harian" className="py-12 sm:py-20 border-b-2 border-ink bg-surface">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              <div className="lg:col-span-4">
                <span className="badge-tag inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Bukan Ide Acak</span>
                <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-3 leading-tight">Setiap hari punya peran dalam kalender.</h2>
                <p className="text-xs sm:text-sm text-stone-600 font-sans mt-3 leading-relaxed">30 hari konten disusun sebagai rangkaian: kenalkan masalah, bangun kepercayaan, tunjukkan solusi, lalu arahkan audiens ke langkah berikutnya.</p>
                <a href="#preview" className="inline-flex items-center gap-2 mt-5 text-xs font-mono font-bold text-terracotta hover:underline">Lihat contoh output lengkap <span>&rarr;</span></a>
              </div>
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                  <div className="p-4 sm:p-5 border-2 border-ink rounded-2xl bg-canvas">
                    <div className="flex items-center justify-between gap-3 font-mono text-[10px] font-bold text-stone-500"><span>DAY 01-07</span><span className="text-terracotta">FOUNDATION</span></div>
                    <h3 className="font-serif text-xl text-ink mt-3">Kenalkan masalah</h3>
                    <p className="text-xs text-stone-600 font-sans leading-relaxed mt-2">Konten pengenalan produk, pain point utama, mitos, dan pertanyaan yang sering muncul dari calon pembeli.</p>
                  </div>
                  <div className="p-4 sm:p-5 border-2 border-ink rounded-2xl bg-wasabi/25">
                    <div className="flex items-center justify-between gap-3 font-mono text-[10px] font-bold text-stone-500"><span>DAY 08-15</span><span className="text-wasabiDark">EDUCATION</span></div>
                    <h3 className="font-serif text-xl text-ink mt-3">Bangun kepercayaan</h3>
                    <p className="text-xs text-stone-600 font-sans leading-relaxed mt-2">Konten edukasi, breakdown bahan atau proses, perbandingan, dan bukti yang membuat value produk lebih mudah dipahami.</p>
                  </div>
                  <div className="p-4 sm:p-5 border-2 border-ink rounded-2xl bg-sunflower/35">
                    <div className="flex items-center justify-between gap-3 font-mono text-[10px] font-bold text-stone-500"><span>DAY 16-23</span><span className="text-ink">PROOF</span></div>
                    <h3 className="font-serif text-xl text-ink mt-3">Tunjukkan solusi</h3>
                    <p className="text-xs text-stone-600 font-sans leading-relaxed mt-2">Demo, use case, objection handling, social proof, dan angle yang membantu audiens membayangkan hasilnya.</p>
                  </div>
                  <div className="p-4 sm:p-5 border-2 border-ink rounded-2xl bg-terracottaLight">
                    <div className="flex items-center justify-between gap-3 font-mono text-[10px] font-bold text-stone-500"><span>DAY 24-30</span><span className="text-terracotta">CONVERSION</span></div>
                    <h3 className="font-serif text-xl text-ink mt-3">Arahkan aksi</h3>
                    <p className="text-xs text-stone-600 font-sans leading-relaxed mt-2">Konten penawaran, FAQ, urgency yang wajar, CTA, dan pengulangan value untuk membantu audiens mengambil keputusan.</p>
                  </div>
                </div>
                <details className="mt-4 bento-pop rounded-2xl bg-white group">
                  <summary className="cursor-pointer list-none p-4 sm:p-5 flex items-center justify-between gap-4 font-mono text-xs font-bold text-ink">
                    <span>Contoh isi satu hari di Notion</span>
                    <span className="text-terracotta transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                  </summary>
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t-2 border-ink grid sm:grid-cols-2 gap-x-6 gap-y-3 text-xs font-sans text-stone-700">
                    <div><strong className="font-mono text-terracotta block mb-1">DAY 04 / EDUKASI</strong>Angle: kenapa masalah ini terjadi dan apa yang biasanya salah dilakukan audiens.</div>
                    <div><strong className="font-mono text-terracotta block mb-1">VIDEO SCRIPT</strong>Hook, voiceover per detik, arahan visual, cue audio, dan CTA.</div>
                    <div><strong className="font-mono text-terracotta block mb-1">CAPTION AIDA</strong>Caption siap copy-paste dengan ajakan menyimpan, berkomentar, atau mengunjungi profil.</div>
                    <div><strong className="font-mono text-terracotta block mb-1">SHOT LIST</strong>Urutan pengambilan gambar yang bisa direkam dengan HP dan alat yang tersedia.</div>
                  </div>
                </details>
              </div>
            </div>
          </div>
        </section>
  );
}
