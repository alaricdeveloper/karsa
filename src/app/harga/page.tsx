"use client";
import { useEffect, useRef } from "react";
import { Icon } from "@/components/Icon";

export default function Page() {

  useEffect(() => {
    const modal = document.getElementById("checkoutModal");
    if (!modal) return;
    const openBtn = document.querySelectorAll('[data-action="open-modal"], [data-action="mobile-open-modal"]');
    const closeBtn = document.querySelectorAll('[data-action="close-modal"]');
    const openModal = (btn) => {
      const pkg = btn.getAttribute("data-pkg");
      const priceEl = document.getElementById("modalPackagePrice");
      if (priceEl && pkg) priceEl.textContent = pkg;
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    };
    const closeModal = () => {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    };
    openBtn.forEach((b) => b.addEventListener("click", () => openModal(b)));
    closeBtn.forEach((b) => b.addEventListener("click", closeModal));
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
    const onKey = (e) => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); };
    document.addEventListener("keydown", onKey);
    return () => {
      openBtn.forEach((b) => b.removeEventListener("click", () => openModal(b)));
      closeBtn.forEach((b) => b.removeEventListener("click", closeModal));
      modal.removeEventListener("click", () => {});
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    const form = document.getElementById("orderForm");
    if (!form) return;
    const onSubmit = (e) => {
      e.preventDefault();
      const formStatus = document.getElementById("formStatus");
      const orderId = "INV-" + Math.floor(100000 + Math.random() * 900000);
      if (formStatus) {
        formStatus.textContent = "Menyimpan brief & mengarahkan ke checkout...";
        formStatus.classList.add("text-ink", "font-bold");
      }
      setTimeout(() => { window.location.href = "/checkout?id=" + orderId; }, 500);
    };
    form.addEventListener("submit", onSubmit);
    return () => form.removeEventListener("submit", onSubmit);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">


  {/* TOP PROMO TICKER */}
  <div className="bg-brutalYellow text-ink text-[11px] sm:text-xs font-mono py-2.5 px-3 text-center tracking-tight border-b-2 border-ink flex items-center justify-center gap-2 font-bold relative z-30">
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-ink text-brutalYellow text-[10px] uppercase font-mono font-black border border-ink shadow-brutal-sm shrink-0">
      <Icon name="zap" className="w-3.5 h-3.5" /> SLA 24 Jam
    </span>
    <span className="truncate sm:overflow-visible text-ink font-bold">Brief lengkap diproses dalam maksimal 1x24 jam kerja. Satu harga flat tanpa langganan.</span>
  </div>

  {/* NAVIGATION HEADER */}
  <header className="border-b-2 border-ink bg-canvas/95 backdrop-blur-md sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
      
      {/* Brand Logo */}
      <a className="flex items-center space-x-2 group shrink-0" href="/">
        <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-ink group-hover:-translate-y-0.5 transition-transform">Karsa</span>
        <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-brutalYellow text-ink rounded font-bold">Pricing</span>
      </a>

      {/* Navigation Actions */}
      <div className="flex items-center gap-2.5 sm:gap-3 text-xs font-mono font-bold">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">
          <span className="w-2 h-2 rounded-full bg-brutalGreen border border-ink animate-ping"></span>
          <span>Slot Batch: <strong className="text-ink">Tersedia</strong></span>
        </div>
        <a className="btn-press inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-white text-ink rounded-xl font-bold transition" href="/">
          <Icon name="arrow-left" className="w-4 h-4" />
          <span className="hidden xs:inline">Kembali ke Beranda</span>
          <span className="xs:hidden">Beranda</span>
        </a>
      </div>

    </div>
  </header>

  {/* MARQUEE STRIP */}
  <div className="py-3 sm:py-3.5 border-b-2 border-ink bg-brutalYellow overflow-hidden relative">
    <div className="flex items-center gap-3 px-4 max-w-7xl mx-auto">
      <div className="marquee-track flex gap-8 font-mono text-xs sm:text-sm font-bold text-ink uppercase tracking-wider whitespace-nowrap shrink-0 items-center">
        <span className="flex items-center gap-1.5"><Icon name="check-circle-2" className="w-4 h-4 text-ink" /> Tanpa Auto-Debit</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="tag" className="w-4 h-4 text-ink" /> Flat Sekali Bayar</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="clock" className="w-4 h-4 text-ink" /> SLA Pasti 24 Jam</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="refresh-cw" className="w-4 h-4 text-ink" /> Garansi Kalibrasi 48 Jam</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="check-circle-2" className="w-4 h-4 text-ink" /> Tanpa Auto-Debit</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="tag" className="w-4 h-4 text-ink" /> Flat Sekali Bayar</span>
      </div>
    </div>
  </div>

  {/* MAIN PRICING CONTENT */}
  <main id="main-content" className="flex-1 py-10 sm:py-16 brutal-grid relative overflow-hidden">
    
    {/* Floating Geometry */}
    <div className="hidden lg:flex absolute top-12 right-12 w-24 h-24 bg-brutalYellow text-ink items-center justify-center font-display font-extrabold text-xs uppercase text-center p-2 rotate-12 z-0 brutal-star border-2 border-ink shadow-brutal pointer-events-none">
      100%<br />FLAT
    </div>
    <div className="absolute top-1/3 left-6 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="absolute bottom-1/4 right-8 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✦</div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 relative z-10">
      
      {/* Protected Hero Plaque */}
      <section className="hero-plaque p-6 sm:p-10 space-y-4">
        <div className="inline-flex items-center gap-2 badge-brutal bg-brutalYellow px-3.5 py-1 rounded-lg text-xs font-mono font-bold text-ink">
          <Icon name="tag" className="w-4 h-4 text-ink" />
          <span>PRICING TRANSPARAN TANPA BIAYA TERSEMBUNYI</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-display font-extrabold text-ink tracking-tight leading-[1.12]">
          Pilih Ritme Batch Konten <br className="hidden sm:inline" />
          <span className="bg-brutalYellow text-ink px-3 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">Sesuai Kebutuhan Tokomu</span>
        </h1>

        <p className="text-xs sm:text-base text-stone-800 font-sans max-w-3xl leading-relaxed font-medium pt-1">
          Satu harga flat, tanpa langganan otomatis, tanpa biaya pembaruan tersembunyi. Setiap batch mencakup 30 video scripts kata-per-kata, 30 caption AIDA, 4 artikel SEO, audit kompetitor, Notion Content OS, dan garansi kalibrasi 48 jam penuh.
        </p>
      </section>

      {/* 3 Tier Pricing Cards Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
        
        {/* 1 Batch */}
        <div className="bento-card p-6 sm:p-8 rounded-3xl bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-stone-500">Uji Coba Sistem</span>
              <span className="badge-brutal text-[10px] font-mono font-bold px-2 py-0.5 bg-canvas text-ink rounded">Trial</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl text-ink mt-2">1 Batch</h2>
            <div className="mt-4 font-mono">
              <span className="text-3xl sm:text-4xl font-display font-extrabold text-ink">Rp299.000</span>
              <span className="text-xs text-stone-500 block mt-1">Flat / 30 Hari Konten</span>
            </div>
            <ul className="mt-6 space-y-3 text-xs sm:text-sm font-sans text-stone-700">
              <li className="flex gap-2.5 items-start">
                <span className="text-ink font-bold">✓</span>
                <span>30 Script Video 9:16 Kata-per-Kata</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-ink font-bold">✓</span>
                <span>30 Caption AIDA + Riset 3-Tier Tagar</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-ink font-bold">✓</span>
                <span>4 Artikel Blog SEO (1.000 Kata / Post)</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-ink font-bold">✓</span>
                <span>Audit Celah 1 Akun Kompetitor</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-ink font-bold">✓</span>
                <span>Notion Content OS + Panduan B-Roll HP</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-ink font-bold">✓</span>
                <span>Garansi Kalibrasi Pesan 48 Jam</span>
              </li>
            </ul>
          </div>
          <button type="button" data-action="open-modal" data-pkg="1 Batch - Rp299.000" className="btn-press mt-8 w-full py-3.5 bg-white hover:bg-canvas text-ink font-mono text-xs font-bold rounded-xl border-2 border-ink shadow-brutal-sm text-center">
            Pilih 1 Batch &rarr;
          </button>
        </div>

        {/* 3 Batch (Featured) */}
        <div className="bento-card p-6 sm:p-8 rounded-3xl bg-brutalYellow flex flex-col justify-between relative shadow-brutal-xl">
          <span className="absolute -top-3.5 left-6 badge-brutal bg-ink text-brutalYellow px-3 py-1 rounded-lg text-[10px] font-mono font-bold uppercase">
            Paling Efisien • Hemat Rp98.000
          </span>
          <div>
            <div className="flex items-center justify-between gap-2 mt-1">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-stone-800">Ritme 3 Bulan</span>
              <span className="badge-brutal text-[10px] font-mono font-bold px-2 py-0.5 bg-white text-ink rounded">Populer</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl text-ink mt-2">3 Batch</h2>
            <div className="mt-4 font-mono">
              <span className="text-3xl sm:text-4xl font-display font-extrabold text-ink">Rp799.000</span>
              <span className="text-xs text-stone-800 font-bold block mt-1">Hemat Rp98.000 • 90 Hari Konten</span>
            </div>
            <ul className="mt-6 space-y-3 text-xs sm:text-sm font-sans text-ink font-medium">
              <li className="flex gap-2.5 items-start">
                <span className="text-ink font-bold">✓</span>
                <span>Semua isi paket 1 Batch x3 (Bertahap)</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-ink font-bold">✓</span>
                <span>Prioritas antrean pengerjaan tim QC</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-ink font-bold">✓</span>
                <span>Data performa batch 1 dipakai untuk kalibrasi batch 2</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-ink font-bold">✓</span>
                <span>Jendela kalibrasi pesan diperpanjang</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-ink font-bold">✓</span>
                <span>Harga terkunci tetap untuk batch berikutnya</span>
              </li>
            </ul>
          </div>
          <button type="button" data-action="open-modal" data-pkg="3 Batch - Rp799.000" className="btn-press mt-8 w-full py-3.5 bg-ink text-brutalYellow hover:bg-white hover:text-ink font-mono text-xs font-bold rounded-xl border-2 border-ink shadow-brutal text-center">
            Ambil 3 Batch (Rp799k) &rarr;
          </button>
        </div>

        {/* 6 Batch */}
        <div className="bento-card p-6 sm:p-8 rounded-3xl bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-stone-500">Skala Penuh Semester</span>
              <span className="badge-brutal text-[10px] font-mono font-bold px-2 py-0.5 bg-brutalGreen text-ink rounded">Skala Besar</span>
            </div>
            <h2 className="font-display font-extrabold text-2xl text-ink mt-2">6 Batch</h2>
            <div className="mt-4 font-mono">
              <span className="text-3xl sm:text-4xl font-display font-extrabold text-ink">Rp1.490.000</span>
              <span className="text-xs text-stone-500 block mt-1">Hemat Rp304.000 • 180 Hari Konten</span>
            </div>
            <ul className="mt-6 space-y-3 text-xs sm:text-sm font-sans text-stone-700">
              <li className="flex gap-2.5 items-start">
                <span className="text-ink font-bold">✓</span>
                <span>Semua benefit lengkap 3 Batch</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-ink font-bold">✓</span>
                <span>1 Sesi kalibrasi strategi 30 menit per 2 bulan</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-ink font-bold">✓</span>
                <span>Laporan evaluasi tren performa konten toko</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-ink font-bold">✓</span>
                <span>Dukungan prioritas WhatsApp Dedicated Officer</span>
              </li>
              <li className="flex gap-2.5 items-start">
                <span className="text-ink font-bold">✓</span>
                <span>Garansi lock harga termurah selama 1 tahun</span>
              </li>
            </ul>
          </div>
          <button type="button" data-action="open-modal" data-pkg="6 Batch - Rp1.490.000" className="btn-press mt-8 w-full py-3.5 bg-white hover:bg-brutalYellow hover:text-ink text-ink font-mono text-xs font-bold rounded-xl border-2 border-ink shadow-brutal-sm text-center">
            Pilih 6 Batch &rarr;
          </button>
        </div>

      </section>

      {/* Cost Comparison Table Section [RETRO GRID] */}
      <section className="bento-card p-6 sm:p-10 rounded-3xl bg-white space-y-6">
        <div>
          <span className="badge-brutal px-3 py-1 rounded-lg text-xs font-mono font-bold bg-brutalYellow text-ink uppercase">Komparasi Riil</span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">Karsa vs Biaya Konten Konvensional</h2>
          <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1">Perbandingan objektif biaya dan komitmen produksi konten di Indonesia.</p>
        </div>

        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left text-xs sm:text-sm font-sans border-collapse border-2 border-ink min-w-[640px]">
            <thead>
              <tr className="bg-ink text-canvas font-mono text-xs uppercase">
                <th className="p-3.5 border-r border-stone-700">Model Opsi</th>
                <th className="p-3.5 border-r border-stone-700">Biaya / Bulan</th>
                <th className="p-3.5 border-r border-stone-700">Estimasi Output</th>
                <th className="p-3.5">Bentuk Komitmen</th>
              </tr>
            </thead>
            <tbody className="divide-y-2 divide-ink">
              <tr className="bg-brutalYellow/20 font-bold text-ink">
                <td className="p-3.5 border-r-2 border-ink flex items-center gap-2">
                  <Icon name="check" className="w-4 h-4 text-ink" />
                  <span>Karsa Studio (1 Batch)</span>
                </td>
                <td className="p-3.5 border-r-2 border-ink font-mono">Rp299.000</td>
                <td className="p-3.5 border-r-2 border-ink">30 Script + Caption + 4 SEO Docs + Notion OS</td>
                <td className="p-3.5 font-mono">Sekali Bayar (Tanpa Langganan)</td>
              </tr>
              <tr className="hover:bg-sand/30 transition text-stone-700">
                <td className="p-3.5 border-r-2 border-ink font-bold text-ink">Content Creator In-House</td>
                <td className="p-3.5 border-r-2 border-ink font-mono">Rp3.500.000 - Rp6.000.000</td>
                <td className="p-3.5 border-r-2 border-ink">15 - 20 video sporadis per bulan</td>
                <td className="p-3.5 font-mono">Gaji Bulanan + Kontrak Kerja</td>
              </tr>
              <tr className="hover:bg-sand/30 transition text-stone-700">
                <td className="p-3.5 border-r-2 border-ink font-bold text-ink">Agensi Konten Pihak Ketiga</td>
                <td className="p-3.5 border-r-2 border-ink font-mono">Rp5.000.000 - Rp15.000.000</td>
                <td className="p-3.5 border-r-2 border-ink">12 - 16 video (menunggu antrean meeting)</td>
                <td className="p-3.5 font-mono">Kontrak Minimal 3 - 6 Bulan</td>
              </tr>
              <tr className="hover:bg-sand/30 transition text-stone-700">
                <td className="p-3.5 border-r-2 border-ink font-bold text-ink">Freelancer Per Konten</td>
                <td className="p-3.5 border-r-2 border-ink font-mono">Rp150.000 - Rp300.000 / video</td>
                <td className="p-3.5 border-r-2 border-ink">Bervariasi (kualitas tidak seragam)</td>
                <td className="p-3.5 font-mono">Per Project Tanpa Sistem OS</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="badge-brutal px-3 py-1 rounded-lg text-xs font-mono font-bold bg-brutalYellow text-ink uppercase">Pusat Bantuan</span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink">FAQ Harga & Pembayaran</h2>
        </div>

        <div className="max-w-4xl mx-auto space-y-3">
          
          <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group" open>
            <summary className="flex justify-between items-center gap-3 font-display font-bold text-base text-ink">
              <span>Apakah ada biaya bulanan atau langganan tersembunyi?</span>
              <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-xs sm:text-sm text-stone-700 mt-3 leading-relaxed font-sans">
              Tidak ada sama sekali. Karsa menggunakan sistem satu kali bayar per batch tanpa auto-debit kartu. Kamu hanya membayar saat membutuhkan batch baru untuk tokomu.
            </p>
          </details>

          <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
            <summary className="flex justify-between items-center gap-3 font-display font-bold text-base text-ink">
              <span>Metode pembayaran apa saja yang didukung?</span>
              <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-xs sm:text-sm text-stone-700 mt-3 leading-relaxed font-sans">
              Kami mendukung pembayaran instan via QRIS Nasional (BCA, Mandiri, BRI, BNI, GoPay, OVO, DANA, ShopeePay) dan Virtual Account bank terverifikasi otomatis.
            </p>
          </details>

          <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
            <summary className="flex justify-between items-center gap-3 font-display font-bold text-base text-ink">
              <span>Bagaimana jika ada naskah yang nadanya kurang cocok?</span>
              <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-xs sm:text-sm text-stone-700 mt-3 leading-relaxed font-sans">
              Setiap pembelian batch dilindungi garansi kalibrasi pesan 48 jam penuh. Tim copywriter kami akan merevisi nada bicara dan istilah naskah secara gratis maksimal dalam 12 jam kerja.
            </p>
          </details>

          <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
            <summary className="flex justify-between items-center gap-3 font-display font-bold text-base text-ink">
              <span>Kapan deliverable dikirimkan setelah checkout?</span>
              <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-xs sm:text-sm text-stone-700 mt-3 leading-relaxed font-sans">
              Sesuai standar SLA, seluruh 30 naskah, caption AIDA, 4 artikel SEO, dan tautan Notion OS diserahkan dalam kurun waktu maksimal 1x24 jam kerja ke email serta Customer Hub akunmu.
            </p>
          </details>

        </div>
      </section>

      {/* Bottom Call To Action Banner */}
      <section className="bento-card p-8 sm:p-12 rounded-3xl bg-brutalYellow flex flex-col items-center text-center space-y-4 shadow-brutal-lg">
        <span className="badge-brutal px-3.5 py-1 rounded-lg text-xs font-mono font-bold bg-ink text-brutalYellow uppercase">Mulai Hari Ini</span>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-ink leading-tight">
          Satu Batch, Fondasi Konten 30 Hari Beres.
        </h2>
        <p className="text-xs sm:text-base text-stone-800 max-w-xl font-medium font-sans">
          Amankan slot antrean produksi sekarang — brief lengkap langsung diproses dan dikirimkan dalam 24 jam kerja.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button type="button" data-action="open-modal" data-pkg="1 Batch - Rp299.000" className="btn-press bg-ink text-brutalYellow hover:bg-white hover:text-ink px-8 py-4 rounded-2xl font-mono text-sm font-bold transition flex items-center gap-2.5">
            <span>Isi Brief & Amankan Slot</span>
            <Icon name="arrow-right" className="w-4 h-4" />
          </button>
          <a href="https://wa.me/6281288009920?text=Halo%20Karsa%20Studio%2C%20saya%20mau%20tanya%20paket%20konten" target="_blank" rel="noopener noreferrer" className="btn-press bg-white hover:bg-canvas text-ink px-6 py-4 rounded-2xl font-mono text-sm font-bold transition flex items-center gap-2">
            <Icon name="message-circle" className="w-4 h-4" />
            <span>Konsultasi WhatsApp</span>
          </a>
        </div>
      </section>

    </div>
  </main>

  {/* FOOTER */}
  <footer className="border-t-2 border-ink py-8 px-4 font-mono text-xs text-stone-600 bg-canvas brutal-grid">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
      <p className="font-bold">&copy; 2026 Karsa Studio (usekarsa.co). Built for High Performance Execution.</p>
      <div className="flex items-center gap-4 font-bold">
        <a className="hover:underline hover:text-ink" href="/terms">Syarat & Ketentuan</a>
        <a className="hover:underline hover:text-ink" href="/privacy">Kebijakan Privasi</a>
        <a className="hover:underline hover:text-ink" href="/refund">Jaminan SLA</a>
        <a className="hover:underline hover:text-ink" href="/">Beranda</a>
      </div>
    </div>
  </footer>

  {/* ============================================== */}
  {/* CHECKOUT MODAL INTERAKTIF */}
  {/* ============================================== */}
  <div id="checkoutModal" className="modal-backdrop fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
    <div className="modal-box w-full max-w-2xl bg-canvas brutal-grid border-3 border-ink rounded-3xl p-6 sm:p-8 shadow-brutal-xl relative max-h-[90vh] overflow-y-auto">
      
      {/* Close Button */}
      <button type="button" data-action="close-modal" aria-label="Tutup Modal" className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-white border-2 border-ink flex items-center justify-center text-ink shadow-brutal-sm hover:bg-brutalYellow transition">
        <Icon name="x" className="w-5 h-5" />
      </button>

      {/* Modal Header */}
      <div className="mb-6">
        <span className="badge-brutal px-3 py-1 rounded-lg text-[11px] font-mono font-bold bg-brutalYellow text-ink uppercase">Checkout Form</span>
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-ink mt-2">
          Isi Brief & Amankan Batch Konten
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm mt-1 font-mono">Deliverables dikirimkan via email & Notion dalam 24 jam kerja.</p>
      </div>

      {/* Checkout Form */}
      <form id="orderForm" className="space-y-4 bg-white p-5 sm:p-6 rounded-2xl border-2 border-ink shadow-brutal-sm">
        
        <div>
          <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputBrand">Nama Brand / Bisnis *</label>
          <input type="text" id="inputBrand" required placeholder="Contoh: Kopi Teras Senja" className="w-full bg-canvas border-2 border-ink rounded-xl px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink font-sans" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputCategory">Kategori Industri *</label>
            <select id="inputCategory" required className="w-full bg-canvas border-2 border-ink rounded-xl px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink font-sans">
              <option value="Kuliner / F&B">Kuliner / F&B</option>
              <option value="Fashion & Apparel">Fashion & Apparel</option>
              <option value="Skincare & Beauty">Skincare & Beauty</option>
              <option value="Jasa Profesional">Jasa Profesional</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputCompetitor">Akun Kompetitor Acuan</label>
            <input type="text" id="inputCompetitor" placeholder="@namakompetitor" className="w-full bg-canvas border-2 border-ink rounded-xl px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink font-sans" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputDesc">Produk Utama & Target Pembeli *</label>
          <textarea id="inputDesc" rows="3" required placeholder="Jelaskan produk unggulan, harga, dan target pembeli utama kamu..." className="w-full bg-canvas border-2 border-ink rounded-xl px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink font-sans"></textarea>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputEmail">Email Penerima File *</label>
            <input type="email" id="inputEmail" required placeholder="nama@email.com" className="w-full bg-canvas border-2 border-ink rounded-xl px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink font-sans" />
          </div>
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputPhone">Nomor WhatsApp Aktif *</label>
            <input type="tel" id="inputPhone" required placeholder="081234567890" className="w-full bg-canvas border-2 border-ink rounded-xl px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink font-sans" />
          </div>
        </div>

        {/* Order Summary Pill */}
        <div className="p-3.5 bg-brutalYellow/30 rounded-xl border-2 border-ink flex justify-between items-center text-xs font-mono font-bold">
          <span id="modalPackageLabel">Paket Terpilih:</span>
          <span id="modalPackagePrice" className="text-sm font-black text-ink font-display">1 Batch - Rp299.000</span>
        </div>

        <div className="pt-2">
          <button type="submit" className="btn-press w-full py-3.5 bg-ink hover:bg-brutalYellow text-brutalYellow hover:text-ink font-mono font-bold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2.5">
            <span>Kirim Brief & Selesaikan Order</span>
            <Icon name="arrow-right" className="w-4 h-4" />
          </button>
          <p id="formStatus" role="status" className="text-center text-xs text-stone-600 mt-2 min-h-4"></p>
        </div>

      </form>

    </div>
  </div>

  

    </div>
  );
}
