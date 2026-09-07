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
      <Icon name="calculator" className="w-3.5 h-3.5" /> RISET BIAYA KONTEN
    </span>
    <span className="truncate sm:overflow-visible text-ink font-bold">Panduan komparasi biaya content creator UMKM di Indonesia per 2026.</span>
  </div>

  {/* NAVIGATION HEADER */}
  <header className="border-b-2 border-ink bg-canvas/95 backdrop-blur-md sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
      
      {/* Brand Logo */}
      <a className="flex items-center space-x-2 group shrink-0" href="/">
        <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-ink group-hover:-translate-y-0.5 transition-transform">Karsa</span>
        <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-brutalCyan text-ink rounded font-bold">Biaya & Riset</span>
      </a>

      {/* Navigation Actions */}
      <div className="flex items-center gap-2.5 sm:gap-3 text-xs font-mono font-bold">
        <a className="btn-press inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-white text-ink rounded-xl font-bold transition" href="/blog">
          <Icon name="arrow-left" className="w-4 h-4" />
          <span className="hidden xs:inline">Semua Artikel</span>
          <span className="xs:hidden">Blog</span>
        </a>
        <a className="btn-press hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-brutalYellow text-ink rounded-xl font-bold transition" href="index.html#order">
          <Icon name="plus" className="w-4 h-4" />
          <span>Order Batch (Rp299k)</span>
        </a>
      </div>

    </div>
  </header>

  {/* MARQUEE STRIP */}
  <div className="py-3 sm:py-3.5 border-b-2 border-ink bg-brutalYellow overflow-hidden relative">
    <div className="flex items-center gap-3 px-4 max-w-7xl mx-auto">
      <div className="marquee-track flex gap-8 font-mono text-xs sm:text-sm font-bold text-ink uppercase tracking-wider whitespace-nowrap shrink-0 items-center">
        <span className="flex items-center gap-1.5"><Icon name="dollar-sign" className="w-4 h-4 text-ink" /> Komparasi Biaya Riil 2026</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="users" className="w-4 h-4 text-ink" /> In-House vs Agensi</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="zap" className="w-4 h-4 text-ink" /> Sistem Konten Flat Rp299k</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="check" className="w-4 h-4 text-ink" /> Bebas Gaji & Kontrak Bulanan</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="dollar-sign" className="w-4 h-4 text-ink" /> Komparasi Biaya Riil 2026</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="users" className="w-4 h-4 text-ink" /> In-House vs Agensi</span>
      </div>
    </div>
  </div>

  {/* ARTICLE CONTENT */}
  <main id="main-content" className="flex-1 py-10 sm:py-16 brutal-dots relative overflow-hidden">
    
    {/* Floating Geometry */}
    <div className="hidden lg:flex absolute top-12 right-12 w-24 h-24 bg-brutalYellow text-ink items-center justify-center font-display font-extrabold text-xs uppercase text-center p-2 rotate-12 z-0 brutal-star border-2 border-ink shadow-brutal pointer-events-none">
      RISET<br />BIAYA
    </div>
    <div className="absolute top-1/3 left-6 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="absolute bottom-1/4 right-8 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✦</div>

    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 relative z-10">
      
      {/* Protected Article Header Plaque to Guarantee Contrast */}
      <section className="hero-plaque p-6 sm:p-10 space-y-4">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="badge-brutal text-[10px] uppercase font-bold px-2.5 py-1 bg-brutalCyan text-ink rounded-lg">
            Biaya & Efisiensi
          </span>
          <span className="text-stone-600 font-bold">• 9 Menit Baca</span>
          <span className="text-stone-600 font-bold">• Riset Pasar 2026</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-ink tracking-tight leading-[1.15]">
          Berapa Biaya Jasa Content Creator UMKM 2026? <br className="hidden sm:inline" />
          <span className="bg-brutalYellow text-ink px-3 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">(Agensi vs In-house vs Sistem)</span>
        </h1>

        <p className="text-xs sm:text-base text-stone-800 font-sans max-w-3xl leading-relaxed font-medium pt-1">
          Pertanyaan yang paling sering muncul dari pemilik UMKM: berapa sebenarnya anggaran realistis untuk mengelola konten media sosial per bulan? Jawabannya berkisar dari Rp2 juta hingga Rp20 juta per bulan. Artikel ini membandingkan empat opsi model kerja berdasarkan harga pasar Indonesia terkini.
        </p>
      </section>

      {/* Step-by-Step Breakdown Article Card */}
      <article className="bento-card p-6 sm:p-10 rounded-3xl bg-white space-y-8">
        
        {/* Option 1 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
            <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">OPSI 01</span>
            <span>•</span>
            <span className="uppercase">Model Lepas</span>
          </div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-ink">Freelancer Per Proyek (Rp150.000 — Rp500.000 / Konten)</h2>
          <p className="text-stone-700 font-sans text-xs sm:text-sm leading-relaxed">
            Freelancer menjual jasa secara satuan atau per paket kecil: satu video, satu desain carousel, atau satu naskah. Model ini fleksibel untuk kebutuhan sporadis saat ada peluncuran produk khusus.
          </p>
          <div className="p-4 bg-canvas rounded-2xl border-2 border-ink font-mono text-xs space-y-1 text-stone-700">
            <span className="font-bold text-ink block">Kelemahan Finansial:</span>
            <p className="font-sans">Jika tokomu membutuhkan 30 video dalam sebulan, biaya total membengkak menjadi Rp4.500.000 hingga Rp15.000.000 tanpa adanya jaminan konsistensi nada pesan antar-konten karena tiap proyek dikerjakan dari nol.</p>
          </div>
        </section>

        {/* Option 2 */}
        <section className="space-y-3 pt-4 border-t-2 border-ink">
          <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
            <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">OPSI 02</span>
            <span>•</span>
            <span className="uppercase">Tenaga Internal</span>
          </div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-ink">Content Creator In-House (Rp3.500.000 — Rp8.000.000 / Bulan)</h2>
          <p className="text-stone-700 font-sans text-xs sm:text-sm leading-relaxed">
            Gaji bulanan staf in-house umumnya berkisar antara Rp3,5 juta sampai Rp8 juta per bulan, belum termasuk biaya perekrutan, BPJS, tunjangan, dan laptop kerja.
          </p>
          <div className="p-4 bg-canvas rounded-2xl border-2 border-ink font-mono text-xs space-y-1 text-stone-700">
            <span className="font-bold text-ink block">Kelemahan Operasional:</span>
            <p className="font-sans">Satu orang creator in-house sering kali mengalami burnout karena dituntut menjalankan seluruh rantai kerja sendirian: riset tren, menulis naskah, menjadi talent, merekam, mengedit, hingga menjadwalkan postingan setiap hari.</p>
          </div>
        </section>

        {/* Option 3 */}
        <section className="space-y-3 pt-4 border-t-2 border-ink">
          <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
            <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">OPSI 03</span>
            <span>•</span>
            <span className="uppercase">Outsourcing Agensi</span>
          </div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-ink">Agensi Konten Media Sosial (Rp5.000.000 — Rp20.000.000 / Bulan)</h2>
          <p className="text-stone-700 font-sans text-xs sm:text-sm leading-relaxed">
            Agensi menyediakan tim lengkap: content strategist, copywriter, videografer, dan editor. Kualitas visualnya terjamin rapi, namun biaya bulanannya terlalu berat bagi margin laba UMKM tahap awal.
          </p>
          <div className="p-4 bg-canvas rounded-2xl border-2 border-ink font-mono text-xs space-y-1 text-stone-700">
            <span className="font-bold text-ink block">Kelemahan Kontrak:</span>
            <p className="font-sans">Mayoritas agensi mewajibkan kontrak pengikatan minimal 3 hingga 6 bulan dengan birokrasi meeting persetujuan naskah yang lambat (1-2 minggu per batch konten).</p>
          </div>
        </section>

        {/* Option 4 */}
        <section className="space-y-3 pt-4 border-t-2 border-ink">
          <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
            <span className="text-ink bg-brutalGreen px-2 py-0.5 rounded border border-ink">OPSI 04</span>
            <span>•</span>
            <span className="uppercase">Solusi Karsa</span>
          </div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-ink">Sistem Konten Productized (Rp299.000 / Batch 30 Hari)</h2>
          <p className="text-stone-700 font-sans text-xs sm:text-sm leading-relaxed">
            Ini model yang dirancang oleh Karsa Studio: kamu membeli <strong>sistem produksi</strong>, bukan menggaji orang. Satu batch berisi 30 naskah kata-per-kata, 30 caption AIDA, 4 artikel SEO, dan Notion OS. Tim internalmu tinggal merekam memakai HP dan menjadwalkan tayang.
          </p>
          <div className="p-4 bg-brutalGreen/30 border-2 border-ink rounded-2xl font-mono text-xs space-y-1 text-stone-800 shadow-brutal-sm">
            <span className="font-bold text-ink block">Keunggulan Sistem:</span>
            <p className="font-sans">Biaya flat Rp299.000 per batch, sekali bayar, tanpa langganan otomatis, dan seluruh aset selesai dikirim dalam kurun waktu 1x24 jam kerja.</p>
          </div>
        </section>

        {/* Comparison Table Section */}
        <section className="space-y-4 pt-4 border-t-2 border-ink">
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-ink">Tabel Perbandingan Cepat</h2>
          
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-left text-xs sm:text-sm font-sans border-collapse border-2 border-ink min-w-[600px]">
              <thead>
                <tr className="bg-ink text-canvas font-mono text-xs uppercase">
                  <th className="p-3.5 border-r border-stone-700">Model Opsi</th>
                  <th className="p-3.5 border-r border-stone-700">Biaya Rata-Rata</th>
                  <th className="p-3.5 border-r border-stone-700">Estimasi Output</th>
                  <th className="p-3.5">Bentuk Komitmen</th>
                </tr>
              </thead>
              <tbody className="divide-y-2 divide-ink">
                <tr className="hover:bg-sand/30 transition text-stone-700">
                  <td className="p-3.5 border-r-2 border-ink font-bold text-ink">Freelancer Per Konten</td>
                  <td className="p-3.5 border-r-2 border-ink font-mono">Rp150k - Rp500k / video</td>
                  <td className="p-3.5 border-r-2 border-ink">Bervariasi tidak tentu</td>
                  <td className="p-3.5 font-mono">Per Proyek</td>
                </tr>
                <tr className="hover:bg-sand/30 transition text-stone-700">
                  <td className="p-3.5 border-r-2 border-ink font-bold text-ink">Creator In-House</td>
                  <td className="p-3.5 border-r-2 border-ink font-mono">Rp3.500.000 - Rp8.000.000</td>
                  <td className="p-3.5 border-r-2 border-ink">15 - 20 video / bulan</td>
                  <td className="p-3.5 font-mono">Gaji + Kontrak Kerja</td>
                </tr>
                <tr className="hover:bg-sand/30 transition text-stone-700">
                  <td className="p-3.5 border-r-2 border-ink font-bold text-ink">Agensi Konten</td>
                  <td className="p-3.5 border-r-2 border-ink font-mono">Rp5.000.000 - Rp20.000.000</td>
                  <td className="p-3.5 border-r-2 border-ink">Tim produksi lengkap</td>
                  <td className="p-3.5 font-mono">Kontrak 3-6 Bulan</td>
                </tr>
                <tr className="bg-brutalYellow/30 font-bold text-ink">
                  <td className="p-3.5 border-r-2 border-ink flex items-center gap-2">
                    <Icon name="check" className="w-4 h-4 text-ink" />
                    <span>Sistem Konten Karsa</span>
                  </td>
                  <td className="p-3.5 border-r-2 border-ink font-mono">Rp299.000 / batch</td>
                  <td className="p-3.5 border-r-2 border-ink">30 Script + 4 SEO + Notion OS</td>
                  <td className="p-3.5 font-mono">Sekali Bayar (Tanpa Ikatan)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

      </article>

      {/* Bottom Integrated Conversion Plaque */}
      <section className="bento-card p-8 sm:p-10 rounded-3xl bg-brutalYellow text-center space-y-4 shadow-brutal-lg">
        <span className="badge-brutal px-3.5 py-1 rounded-lg text-xs font-mono font-bold bg-ink text-brutalYellow uppercase">Solusi Efisien</span>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-ink leading-tight">
          Butuh 30 Hari Konten yang Langsung Bisa Dijalankan?
        </h2>
        <p className="text-xs sm:text-base text-stone-800 max-w-xl mx-auto font-medium font-sans">
          30 video scripts kata-per-kata, 30 caption AIDA, dan 4 artikel SEO dikirimkan dalam kurun waktu 1x24 jam kerja mulai dari Rp299.000.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button type="button" data-action="open-modal" data-pkg="Paket 1 Batch - Rp299.000" className="btn-press bg-ink text-brutalYellow hover:bg-white hover:text-ink px-8 py-4 rounded-2xl font-mono text-sm font-bold transition flex items-center gap-2">
            <span>Mulai Order Batch (Rp299.000)</span>
            <Icon name="arrow-right" className="w-4 h-4" />
          </button>
          <a href="https://wa.me/6281288009920?text=Halo%20Karsa%2C%20saya%20baca%20artikel%20biaya%20content%20creator" target="_blank" rel="noopener noreferrer" className="btn-press bg-white hover:bg-canvas text-ink px-6 py-4 rounded-2xl font-mono text-sm font-bold transition flex items-center gap-2">
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
    <div className="modal-box w-full max-w-2xl bg-canvas brutal-dots border-3 border-ink rounded-3xl p-6 sm:p-8 shadow-brutal-xl relative max-h-[90vh] overflow-y-auto">
      
      {/* Close Button */}
      <button type="button" data-action="close-modal" aria-label="Tutup Modal" className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-white border-2 border-ink flex items-center justify-center text-ink shadow-brutal-sm hover:bg-brutalYellow transition">
        <Icon name="x" className="w-5 h-5" />
      </button>

      {/* Modal Header */}
      <div className="mb-6">
        <span className="badge-brutal px-3 py-1 rounded-lg text-[11px] font-mono font-bold bg-brutalYellow text-ink uppercase">Checkout Form</span>
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-ink mt-2">
          Isi Brief Batch Konten 30 Hari
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
          <span id="modalPackagePrice" className="text-sm font-black text-ink font-display">Paket 1 Batch - Rp299.000</span>
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
