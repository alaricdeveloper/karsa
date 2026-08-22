export function ProblemSection() {
  return (
    <section id="problem" className="py-12 sm:py-20 bg-ink text-canvas border-b-2 border-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
          <div className="lg:col-span-5">
            <span className="badge-tag inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-wasabi text-ink">Masalah yang Sering Terjadi</span>
            <h2 className="text-2xl sm:text-4xl font-serif mt-3 leading-tight">Bukan kurang niat. Sistem kontennya yang belum ada.</h2>
            <p className="text-xs sm:text-sm text-stone-300 mt-3 leading-relaxed font-sans max-w-md">Saat semua keputusan harus dibuat dari nol, konten jadi pekerjaan yang selalu ditunda. Karsa mengubah brief singkat menjadi sistem produksi yang bisa langsung dijalankan.</p>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-3 gap-3 sm:gap-4">
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 border-2 border-stone-700">
              <span className="text-terracotta font-mono font-bold text-xl">01</span>
              <h3 className="font-bold font-serif text-lg mt-3">Ide mandek</h3>
              <p className="text-[11px] text-stone-400 font-sans leading-relaxed mt-2">Setiap minggu mulai lagi dari halaman kosong dan akhirnya tidak posting.</p>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 border-2 border-stone-700">
              <span className="text-sunflower font-mono font-bold text-xl">02</span>
              <h3 className="font-bold font-serif text-lg mt-3">Rekam tanpa arah</h3>
              <p className="text-[11px] text-stone-400 font-sans leading-relaxed mt-2">Sudah punya produk, tapi tidak tahu harus membuka video dengan kalimat apa.</p>
            </div>
            <div className="p-4 sm:p-5 rounded-2xl bg-stone-900 border-2 border-stone-700">
              <span className="text-wasabi font-mono font-bold text-xl">03</span>
              <h3 className="font-bold font-serif text-lg mt-3">Posting tidak konsisten</h3>
              <p className="text-[11px] text-stone-400 font-sans leading-relaxed mt-2">Konten ada sesekali, tetapi tidak punya kalender, prioritas, atau alur produksi.</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-5 border-t-2 border-stone-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <span className="font-mono text-xs font-bold text-wasabi">Dari brief mentah menjadi 30 hari konten siap eksekusi.</span>
          <a href="#deliverables" className="text-xs font-mono font-bold text-white hover:text-wasabi transition">Lihat isi paket <span aria-hidden="true">&darr;</span></a>
        </div>
      </div>
    </section>
  );
}
