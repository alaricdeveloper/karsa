const QUALITY_CHECKS = [
  ["Hook dan angle", "Alasan jelas kenapa audiens perlu berhenti scroll dan masalah apa yang sedang dibuka."],
  ["Naskah per detik", "Voiceover kata-per-kata, timing, intonasi, dan urutan penyampaian yang siap dibaca."],
  ["Cue visual dan audio", "Arahan gesture, B-Roll, framing, transisi, dan referensi audio untuk membantu proses rekam."],
  ["Value dan proof", "Penjelasan manfaat, contoh penggunaan, atau bukti yang membuat klaim produk lebih konkret."],
  ["CTA yang sesuai konteks", "Ajakan yang jelas: simpan, komentar, DM, kunjungi profil, atau beli sesuai tujuan kontennya."],
];

export function QualityStandardSection() {
  return (
    <section id="standar-kualitas" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <span className="badge-tag inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-terracotta text-white">Standar Produksi</span>
            <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-3 leading-tight">Bukan cuma “ide konten”. Ini sudah punya instruksi eksekusi.</h2>
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
              {QUALITY_CHECKS.map(([title, description], index) => (
                <div key={title} className="p-4 sm:p-5 flex gap-4 items-start">
                  <span className="font-mono text-xs font-bold text-terracotta">{String(index + 1).padStart(2, "0")}</span>
                  <div><h3 className="font-bold text-sm text-ink">{title}</h3><p className="text-xs text-stone-600 font-sans mt-1">{description}</p></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
