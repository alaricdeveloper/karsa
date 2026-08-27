"use client";

export function PricingSection() {
  return (
<section id="harga" className="py-12 sm:py-16 border-b-2 border-ink bg-canvas">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Harga Transparan</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Pilih ritme yang cocok dengan bisnismu.</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1">Satu harga flat, tanpa langganan otomatis. Tidak ada kejutan di bulan berikutnya.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 items-stretch">
              <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-white flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-stone-500">Mulai Coba</span>
                <h3 className="font-serif text-2xl text-ink mt-1">1 Batch</h3>
                <div className="mt-3 font-mono"><span className="text-3xl font-bold font-serif text-ink">Rp299.000</span><span className="text-xs text-stone-500 block mt-1">sekali bayar / 30 hari konten</span></div>
                <ul className="mt-5 space-y-2.5 text-xs font-sans text-stone-700 flex-1">
                  <li className="flex gap-2"><span className="text-terracotta font-bold">+</span><span>30 script + 30 caption + 4 artikel SEO</span></li>
                  <li className="flex gap-2"><span className="text-terracotta font-bold">+</span><span>Audit kompetitor + Notion OS + B-Roll guide</span></li>
                  <li className="flex gap-2"><span className="text-terracotta font-bold">+</span><span>5 bonus eksklusif + garansi kalibrasi 48 jam</span></li>
                  <li className="flex gap-2"><span className="text-terracotta font-bold">+</span><span>SLA pengiriman 24 jam kerja</span></li>
                </ul>
                <a href="#order" className="mt-6 badge-tag bg-ink text-canvas hover:bg-terracotta hover:text-white text-center py-3 rounded-xl font-mono text-xs font-bold transition">Isi Brief Batch 1 &rarr;</a>
              </div>
              <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-wasabi/30 flex flex-col relative">
                <span className="absolute -top-3 left-5 badge-tag bg-terracotta text-white px-3 py-1 rounded-lg text-[10px] font-mono font-bold">PALING LARIS</span>
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-wasabiDark">Ritme 3 Bulan</span>
                <h3 className="font-serif text-2xl text-ink mt-1">3 Batch</h3>
                <div className="mt-3 font-mono"><span className="text-3xl font-bold font-serif text-ink">Rp799.000</span><span className="text-xs text-stone-600 block mt-1">hemat Rp98.000 &bull; 90 hari konten</span></div>
                <ul className="mt-5 space-y-2.5 text-xs font-sans text-stone-800 flex-1">
                  <li className="flex gap-2"><span className="text-terracotta font-bold">+</span><span>Semua isi paket 1 Batch x3 (diproses bertahap)</span></li>
                  <li className="flex gap-2"><span className="text-terracotta font-bold">+</span><span>Prioritas antrean produksi</span></li>
                  <li className="flex gap-2"><span className="text-terracotta font-bold">+</span><span>Data belajar batch 1 dipakai untuk batch 2</span></li>
                  <li className="flex gap-2"><span className="text-terracotta font-bold">+</span><span>Kalibrasi pesan diperpanjang tiap batch</span></li>
                </ul>
                <a href="#order" className="mt-6 badge-tag bg-ink text-canvas hover:bg-terracotta hover:text-white text-center py-3 rounded-xl font-mono text-xs font-bold transition">Ambil 3 Batch &rarr;</a>
              </div>
              <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-ink text-canvas flex flex-col">
                <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-wasabi">Program 6 Bulan</span>
                <h3 className="font-serif text-2xl mt-1">6 Batch</h3>
                <div className="mt-3 font-mono"><span className="text-3xl font-bold font-serif text-wasabi">Rp1.490.000</span><span className="text-xs text-stone-400 block mt-1">hemat Rp304.000 &bull; 180 hari konsisten</span></div>
                <ul className="mt-5 space-y-2.5 text-xs font-sans text-stone-300 flex-1">
                  <li className="flex gap-2"><span className="text-wasabi font-bold">+</span><span>Semua isi paket 3 Batch</span></li>
                  <li className="flex gap-2"><span className="text-wasabi font-bold">+</span><span>1 sesi kalibrasi strategi 30 menit per 2 bulan</span></li>
                  <li className="flex gap-2"><span className="text-wasabi font-bold">+</span><span>Laporan tren performa konten per batch</span></li>
                  <li className="flex gap-2"><span className="text-wasabi font-bold">+</span><span>Harga terkunci untuk penambahan batch</span></li>
                </ul>
                <a href="#order" className="mt-6 badge-tag bg-wasabi text-ink hover:bg-white text-center py-3 rounded-xl font-mono text-xs font-bold transition">Tanya Program 6 Bulan &rarr;</a>
              </div>
            </div>
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl border-2 border-ink bg-white shadow-brutal-sm">
              <span className="font-mono text-xs font-bold text-ink text-center sm:text-left">Bandingkan: agensi konten bulanan rata-rata Rp5-20 juta. 3 batch Karsa = Rp799 ribu, sekali bayar.</span>
              <a href="#calculator" className="text-xs font-mono font-bold text-terracotta hover:underline shrink-0">Hitung penghematanmu &rarr;</a>
            </div>
          </div>
        </section>
  );
}
