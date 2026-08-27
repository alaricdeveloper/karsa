"use client";

export function QualityStandardSection() {
  return (
<section id="standar-kualitas" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              <div className="lg:col-span-5">
                <span className="badge-tag inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-terracotta text-white">Standar Produksi</span>
                <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-3 leading-tight">Bukan cuma "ide konten". Ini sudah punya instruksi eksekusi.</h2>
                <p className="text-xs sm:text-sm text-stone-600 font-sans mt-3 leading-relaxed">Setiap output dibuat agar bisa langsung dipindahkan dari Notion ke proses produksi tanpa tim kamu harus menerjemahkan ulang maksudnya.</p>
                <div className="mt-6 p-4 sm:p-5 rounded-2xl bg-ink text-canvas">
                  <span className="text-[10px] uppercase tracking-wider font-mono text-wasabi font-bold">Definition of done</span>
                  <p className="font-serif text-xl mt-2">Kalau dibuka oleh orang lain di tim, mereka tetap tahu harus membuat apa.</p>
                </div>
              </div>
              <div className="lg:col-span-7 bg-white border-2 border-ink rounded-3xl overflow-hidden shadow-brutal">
                <div className="px-4 sm:px-6 py-4 border-b-2 border-ink flex items-center justify-between gap-4">
                  <span className="font-mono text-xs font-bold text-ink">CHECKLIST OUTPUT</span>
                  <span className="text-[10px] font-mono text-stone-500">Per video / post</span>
                </div>
                <div className="divide-y-2 divide-ink">
                  <div className="p-4 sm:p-5 flex gap-4 items-start"><span className="font-mono text-xs font-bold text-terracotta">01</span><div><h3 className="font-bold text-sm text-ink">Hook dan angle</h3><p className="text-xs text-stone-600 font-sans mt-1">Alasan jelas kenapa audiens perlu berhenti scroll dan masalah apa yang sedang dibuka.</p></div></div>
                  <div className="p-4 sm:p-5 flex gap-4 items-start"><span className="font-mono text-xs font-bold text-terracotta">02</span><div><h3 className="font-bold text-sm text-ink">Naskah per detik</h3><p className="text-xs text-stone-600 font-sans mt-1">Voiceover kata-per-kata, timing, intonasi, dan urutan penyampaian yang siap dibaca.</p></div></div>
                  <div className="p-4 sm:p-5 flex gap-4 items-start"><span className="font-mono text-xs font-bold text-terracotta">03</span><div><h3 className="font-bold text-sm text-ink">Cue visual dan audio</h3><p className="text-xs text-stone-600 font-sans mt-1">Arahan gesture, B-Roll, framing, transisi, dan referensi audio untuk membantu proses rekam.</p></div></div>
                  <div className="p-4 sm:p-5 flex gap-4 items-start"><span className="font-mono text-xs font-bold text-terracotta">04</span><div><h3 className="font-bold text-sm text-ink">Value dan proof</h3><p className="text-xs text-stone-600 font-sans mt-1">Penjelasan manfaat, contoh penggunaan, atau bukti yang membuat klaim produk lebih konkret.</p></div></div>
                  <div className="p-4 sm:p-5 flex gap-4 items-start"><span className="font-mono text-xs font-bold text-terracotta">05</span><div><h3 className="font-bold text-sm text-ink">CTA yang sesuai konteks</h3><p className="text-xs text-stone-600 font-sans mt-1">Ajakan yang jelas: simpan, komentar, DM, kunjungi profil, atau beli sesuai tujuan kontennya.</p></div></div>
                </div>
              </div>
            </div>
          </div>
        </section>
  );
}
