"use client";
import { useEffect, useRef } from "react";
import { Icon } from "@/components/Icon";

export default function Page() {

  const toggleMobileMenuFn = () => {
    const menu = document.getElementById("mobileMenu");
    const iconOpen = document.getElementById("menuIconOpen");
    const iconClose = document.getElementById("menuIconClose");
    if (!menu) return;
    const isHidden = menu.classList.toggle("hidden");
    if (iconOpen) iconOpen.classList.toggle("hidden", !isHidden);
    if (iconClose) iconClose.classList.toggle("hidden", isHidden);
  };

  useEffect(() => {
    const openModalBtns = document.querySelectorAll('[data-action="mobile-open-modal"], [data-action="mobile-menu"]');
    openModalBtns.forEach((b) => b.addEventListener("click", toggleMobileMenuFn));
    return () => openModalBtns.forEach((b) => b.removeEventListener("click", toggleMobileMenuFn));
  }, []);

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
  <div className="bg-brutalYellow text-ink text-[11px] sm:text-xs font-mono py-2.5 px-3 text-center tracking-tight border-b-2 border-ink flex items-center justify-center gap-2 font-bold relative z-50">
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-ink text-brutalYellow text-[10px] uppercase font-mono font-black border border-ink shadow-brutal-sm shrink-0">
      <Icon name="zap" className="w-3.5 h-3.5" /> SLA 24 Jam
    </span>
    <span className="truncate sm:overflow-visible text-ink font-bold">Brief lengkap diproses dalam maksimal 1x24 jam kerja.</span>
  </div>

  {/* INTERACTIVE NEO-BRUTALIST NAVBAR */}
  <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur-md border-b-2 border-ink">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between whitespace-nowrap gap-4 relative">
      
      {/* Brand Logo with Shake & Spin Hover */}
      <a href="../index.html#main-content" className="flex items-center space-x-2 shrink-0 group">
        <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-ink group-hover:-translate-y-0.5 group-hover:rotate-1 transition-transform">Karsa</span>
        <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-brutalYellow text-ink rounded-lg font-bold group-hover:rotate-6 transition-transform">Studio</span>
      </a>

      {/* Desktop Nav with Interactive Capsule Hover */}
      <nav className="hidden xl:flex absolute left-1/2 -translate-x-1/2 items-center gap-0.5 text-xs font-mono font-bold text-ink bg-sand/60 p-1.5 rounded-2xl border-2 border-ink shadow-brutal-sm">

        {/* Mega Dropdown: Isi Paket */}
        <div className="relative group">
          <button type="button" className="nav-pill px-2.5 py-1.5 rounded-xl flex items-center gap-1 hover:text-ink transition font-bold">
            <span>Isi Paket</span>
            <Icon name="chevron-down" className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
          </button>

          <div className="dropdown-menu absolute top-full left-0 mt-2 w-[820px] max-w-[calc(100vw-2rem)] bg-white border-2 border-ink rounded-2xl p-4 shadow-brutal-lg z-50 whitespace-normal">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div>
                <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink">
                  <span className="w-6 h-6 rounded bg-ink text-brutalYellow flex items-center justify-center font-mono font-bold text-[10px]"><Icon name="package-check" className="w-3.5 h-3.5" /></span>
                  <span className="font-bold text-[10px] uppercase tracking-wider">Output Utama</span>
                </div>
                <div className="space-y-1 mt-2">
                  <a href="../index.html#modul-video" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink">
                    <span className="w-6 h-6 rounded bg-brutalYellow text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">01</span>
                    <div><span className="block font-bold text-xs">30 Video Scripts</span><span className="block text-[9px] text-stone-500 font-mono">Hook, visual, audio, CTA.</span></div>
                  </a>
                  <a href="../index.html#modul-caption" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalCyan/40 transition border border-transparent hover:border-ink">
                    <span className="w-6 h-6 rounded bg-brutalCyan text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">02</span>
                    <div><span className="block font-bold text-xs">30 Caption & Tagar</span><span className="block text-[9px] text-stone-500 font-mono">AIDA + 3 tier tagar.</span></div>
                  </a>
                  <a href="../index.html#modul-seo" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalGreen/40 transition border border-transparent hover:border-ink">
                    <span className="w-6 h-6 rounded bg-brutalGreen text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">03</span>
                    <div><span className="block font-bold text-xs">4 Artikel Blog SEO</span><span className="block text-[9px] text-stone-500 font-mono">Struktur H1-H3 + meta.</span></div>
                  </a>
                  <a href="../index.html#modul-audit" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalPink/40 transition border border-transparent hover:border-ink">
                    <span className="w-6 h-6 rounded bg-brutalPink text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">04</span>
                    <div><span className="block font-bold text-xs">Audit Gap Kompetitor</span><span className="block text-[9px] text-stone-500 font-mono">Teardown 1 akun acuan.</span></div>
                  </a>
                  <a href="../index.html#modul-notion" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink">
                    <span className="w-6 h-6 rounded bg-white text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">05</span>
                    <div><span className="block font-bold text-xs">Notion Content OS</span><span className="block text-[9px] text-stone-500 font-mono">Calendar + Kanban produksi.</span></div>
                  </a>
                  <a href="../index.html#modul-shotlist" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalCyan/40 transition border border-transparent hover:border-ink">
                    <span className="w-6 h-6 rounded bg-brutalCyan/60 text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">06</span>
                    <div><span className="block font-bold text-xs">Panduan B-Roll HP</span><span className="block text-[9px] text-stone-500 font-mono">Shot-list buat rekam sendiri.</span></div>
                  </a>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink">
                  <span className="w-6 h-6 rounded bg-ink text-brutalCyan flex items-center justify-center font-mono font-bold text-[10px]"><Icon name="settings" className="w-3.5 h-3.5" /></span>
                  <span className="font-bold text-[10px] uppercase tracking-wider">Strategi & Sistem</span>
                </div>
                <div className="space-y-1 mt-2">
                  <a href="../sistem.html#isi-harian" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Peta Konten 30 Hari</span><span className="block text-[9px] text-stone-500 font-mono">Foundation sampai conversion.</span></a>
                  <a href="../sistem.html#cakupan" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Standar Setiap Output</span><span className="block text-[9px] text-stone-500 font-mono">Checklist sebelum dipakai tim.</span></a>
                  <a href="../index.html#cara-kerja" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Cara Kerja Karsa</span><span className="block text-[9px] text-stone-500 font-mono">Brief, riset, tulis, kirim.</span></a>
                  <a href="../sistem.html#cakupan" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Scope Layanan</span><span className="block text-[9px] text-stone-500 font-mono">Termasuk & tidak termasuk.</span></a>
                  <a href="../sistem.html#anatomi-script" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Anatomi Script 25 Detik</span><span className="block text-[9px] text-stone-500 font-mono">Hook, value, CTA per detik.</span></a>
                  <a href="../sistem.html#pillar-konten" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Pilar Konten 30 Hari</span><span className="block text-[9px] text-stone-500 font-mono">4 pilar & rasio mingguan.</span></a>
                  <a href="../sistem.html#alur-produksi" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Template Produksi</span><span className="block text-[9px] text-stone-500 font-mono">Senin-Jumat siap eksekusi.</span></a>
                  <a href="../index.html#garansi" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Garansi & SLA</span><span className="block text-[9px] text-stone-500 font-mono">24 jam + kalibrasi 48 jam.</span></a>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink">
                  <span className="w-6 h-6 rounded bg-ink text-brutalPink flex items-center justify-center font-mono font-bold text-[10px]"><Icon name="bar-chart-3" className="w-3.5 h-3.5" /></span>
                  <span className="font-bold text-[10px] uppercase tracking-wider">Proof & Keputusan</span>
                </div>
                <div className="space-y-1 mt-2">
                  <a href="../contoh.html#compare-scripts" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Bandingkan Kualitas</span><span className="block text-[9px] text-stone-500 font-mono">Script generik vs Karsa.</span></a>
                  <a href="../index.html#studi-kasus" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Case Study Nyata</span><span className="block text-[9px] text-stone-500 font-mono">Metrik dari implementasi.</span></a>
                  <a href="../contoh.html#preview" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Contoh Output</span><span className="block text-[9px] text-stone-500 font-mono">Script, caption, dan SEO.</span></a>
                  <a href="../index.html#calculator" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Kalkulator Hemat</span><span className="block text-[9px] text-stone-500 font-mono">Bandingkan biaya per batch.</span></a>
                  <a href="../index.html#komparasi" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Karsa vs Agensi vs In-house</span><span className="block text-[9px] text-stone-500 font-mono">Tabel perbandingan jujur.</span></a>
                  <a href="../index.html#harga" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Harga & Paket</span><span className="block text-[9px] text-stone-500 font-mono">1, 3, atau 6 batch.</span></a>
                  <a href="../index.html#testimoni" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Testimoni Customer</span><span className="block text-[9px] text-stone-500 font-mono">Kata mereka yang sudah pakai.</span></a>
                  <a href="../sistem.html#bonus" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Lihat Semua Bonus &rarr;</span><span className="block text-[9px] text-stone-500 font-mono">5 bonus sudah termasuk.</span></a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Dropdown: Untuk Bisnis */}
        <div className="relative group">
          <button type="button" className="nav-pill px-2.5 py-1.5 rounded-xl flex items-center gap-1 hover:text-ink transition font-bold">
            <span>Untuk Bisnis</span>
            <Icon name="chevron-down" className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
          </button>

          <div className="dropdown-menu absolute top-full left-0 mt-2 w-[540px] max-w-[calc(100vw-2rem)] bg-white border-2 border-ink rounded-2xl p-4 shadow-brutal-lg z-50 whitespace-normal">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink">
                  <span className="w-6 h-6 rounded bg-ink text-brutalGreen flex items-center justify-center font-mono font-bold text-[10px]"><Icon name="store" className="w-3.5 h-3.5" /></span>
                  <span className="font-bold text-[10px] uppercase tracking-wider">Sektor Bisnis</span>
                </div>
                <div className="space-y-1 mt-2">
                  <a href="../contoh.html#preview" className="block p-2 rounded-xl hover:bg-brutalGreen/30 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">F&B & Cafe</span><span className="block text-[9px] text-stone-500 font-mono">Menu, review, edukasi.</span></a>
                  <a href="../contoh.html#preview" className="block p-2 rounded-xl hover:bg-brutalGreen/30 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Skincare & Beauty</span><span className="block text-[9px] text-stone-500 font-mono">Ingredient, myth-busting.</span></a>
                  <a href="../contoh.html#preview" className="block p-2 rounded-xl hover:bg-brutalGreen/30 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Fashion & Apparel</span><span className="block text-[9px] text-stone-500 font-mono">Styling, fit, detail bahan.</span></a>
                  <a href="../contoh.html#preview" className="block p-2 rounded-xl hover:bg-brutalGreen/30 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Jasa & Edukasi</span><span className="block text-[9px] text-stone-500 font-mono">Konsultan, klinik, les.</span></a>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink">
                  <span className="w-6 h-6 rounded bg-ink text-brutalYellow flex items-center justify-center font-mono font-bold text-[10px]"><Icon name="target" className="w-3.5 h-3.5" /></span>
                  <span className="font-bold text-[10px] uppercase tracking-wider">Tujuan Konten</span>
                </div>
                <div className="space-y-1 mt-2">
                  <a href="../sistem.html#kenapa-video" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Edukasi & Awareness</span><span className="block text-[9px] text-stone-500 font-mono">Buat audiens lebih paham.</span></a>
                  <a href="../sistem.html#kenapa-video" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Leads & DM</span><span className="block text-[9px] text-stone-500 font-mono">Arahkan percakapan baru.</span></a>
                  <a href="../index.html#harga" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Penjualan Produk</span><span className="block text-[9px] text-stone-500 font-mono">Perjelas value dan CTA.</span></a>
                  <a href="../sistem.html#cocok-untuk" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Cek Kecocokan</span><span className="block text-[9px] text-stone-500 font-mono">Lihat apakah Karsa untukmu.</span></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dropdown: Layanan */}
        <div className="relative group">
          <button type="button" className="nav-pill px-2.5 py-1.5 rounded-xl flex items-center gap-1 hover:text-ink transition font-bold">
            <span>Layanan</span>
            <Icon name="chevron-down" className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
          </button>

          <div className="dropdown-menu absolute top-full left-0 mt-2 w-72 max-w-[calc(100vw-2rem)] bg-white border-2 border-ink rounded-2xl p-3 shadow-brutal-lg z-50 whitespace-normal">
            <div className="space-y-1">
              <a href="jasa-konten-video-umkm.html" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink">
                <span className="w-6 h-6 rounded bg-brutalYellow text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0"><Icon name="clapperboard" className="w-3.5 h-3.5" /></span>
                <div><span className="block font-bold text-xs">Jasa Konten Video UMKM</span><span className="block text-[9px] text-stone-500 font-mono">Kalender 30 hari lengkap.</span></div>
              </a>
              <a href="jasa-script-video-tiktok.html" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink">
                <span className="w-6 h-6 rounded bg-brutalCyan text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0"><Icon name="file-text" className="w-3.5 h-3.5" /></span>
                <div><span className="block font-bold text-xs">Jasa Script Video TikTok</span><span className="block text-[9px] text-stone-500 font-mono">30 naskah kata-per-kata.</span></div>
              </a>
              <a href="jasa-content-creator-umkm.html" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink">
                <span className="w-6 h-6 rounded bg-brutalGreen text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0"><Icon name="users" className="w-3.5 h-3.5" /></span>
                <div><span className="block font-bold text-xs">Jasa Content Creator UMKM</span><span className="block text-[9px] text-stone-500 font-mono">Tanpa gaji bulanan.</span></div>
              </a>
              <a href="jasa-artikel-seo.html" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink">
                <span className="w-6 h-6 rounded bg-brutalPink text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0"><Icon name="search" className="w-3.5 h-3.5" /></span>
                <div><span className="block font-bold text-xs">Jasa Artikel SEO</span><span className="block text-[9px] text-stone-500 font-mono">4 artikel 1.000 kata.</span></div>
              </a>
              <a href="paket-konten-instagram.html" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink">
                <span className="w-6 h-6 rounded bg-brutalYellow/60 text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0"><Icon name="instagram" className="w-3.5 h-3.5" /></span>
                <div><span className="block font-bold text-xs">Paket Konten Instagram</span><span className="block text-[9px] text-stone-500 font-mono">Reels, caption, kalender.</span></div>
              </a>
            </div>
          </div>
        </div>

        <a href="../index.html#harga" className="nav-pill px-2.5 py-1.5 rounded-xl transition">Harga</a>
        <a href="../index.html#testimoni" className="nav-pill px-2.5 py-1.5 rounded-xl transition">Testimoni</a>
        <a href="../index.html#cara-kerja" className="nav-pill px-2.5 py-1.5 rounded-xl transition">Cara Kerja</a>
        <a href="../faq.html" className="nav-pill px-2.5 py-1.5 rounded-xl transition">FAQ</a>
        <a href="../blog.html" className="nav-pill px-2.5 py-1.5 rounded-xl transition">Blog</a>
        <a href="../tentang-kami.html" className="nav-pill px-2.5 py-1.5 rounded-xl transition">Tentang</a>
      </nav>

      {/* Right CTAs & Live Slot Indicator */}
      <div className="flex items-center space-x-2.5 sm:space-x-3 shrink-0">
        
        {/* Live Batch Slot Pulse Indicator */}
        <div className="hidden lg:flex xl:hidden items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm font-mono text-[11px] font-bold">
          <span className="w-2 h-2 rounded-full bg-brutalGreen border border-ink animate-ping"></span>
          <span>Slot Batch: <span className="text-ink font-black">Tersedia</span></span>
        </div>

        <a href="../login.html" className="hidden xl:inline-flex text-xs font-mono font-bold text-ink hover:underline px-2.5 py-2 transition">
          Workspace
        </a>
        
        <button type="button" data-action="open-modal" className="btn-press bg-brutalYellow text-ink hover:bg-ink hover:text-brutalYellow px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-1.5">
          <span>Isi Brief</span>
          <Icon name="arrow-up-right" className="w-4 h-4" />
        </button>

        <button id="mobileMenuToggle" type="button" data-action="mobile-menu" aria-label="Buka Menu" className="xl:hidden p-2 rounded-xl text-ink border-2 border-ink bg-white shadow-brutal-sm">
          <Icon name="menu" className="w-5 h-5" id="menuIconOpen" />
          <Icon name="x" className="w-5 h-5 hidden" id="menuIconClose" />
        </button>
      </div>
    </div>

    {/* Mobile Drawer */}
    <div id="mobileMenu" className="hidden xl:hidden bg-canvas brutal-grid border-b-2 border-ink px-4 pt-3 pb-6 space-y-2.5 font-bold text-xs font-mono text-ink shadow-brutal-lg max-h-[85vh] overflow-y-auto">
      <a href="../index.html#deliverables" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Isi Paket (6 Output)</a>
      <a href="../sistem.html#anatomi-script" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Anatomi Script</a>
      <a href="../sistem.html#pillar-konten" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-brutalYellow border-2 border-ink shadow-brutal-sm">Pilar Konten 30 Hari</a>
      <a href="../index.html#cara-kerja" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Cara Kerja</a>
      <a href="../index.html#testimoni" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Testimoni Customer</a>
      <a href="../index.html#harga" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Harga & Paket</a>
      <a href="../index.html#garansi" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Garansi & SLA</a>
      <a href="../index.html#calculator" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Kalkulator Penghematan</a>
      <a href="../faq.html" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">FAQ & Bantuan</a>
      <a href="../blog.html" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Blog Karsa</a>
      <a href="../tentang-kami.html" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Tentang Kami</a>
      <div className="pt-2">
        <button type="button" data-action="mobile-open-modal" className="block w-full text-center py-3.5 bg-ink text-brutalYellow font-mono font-bold rounded-xl text-xs border-2 border-ink shadow-brutal">
          Isi Brief & Checkout (Rp299.000)
        </button>
      </div>
    </div>
  </header>

  {/* MARQUEE STRIP */}
  <div className="py-3 sm:py-3.5 border-b-2 border-ink bg-brutalYellow overflow-hidden relative">
    <div className="flex items-center gap-3 px-4 max-w-7xl mx-auto">
      <div className="marquee-track flex gap-8 font-mono text-xs sm:text-sm font-bold text-ink uppercase tracking-wider whitespace-nowrap shrink-0 items-center">
        <span className="flex items-center gap-1.5"><Icon name="instagram" className="w-4 h-4 text-ink" /> 30 Script Reels 9:16</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="message-square" className="w-4 h-4 text-ink" /> Caption Struktur AIDA</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="user-check" className="w-4 h-4 text-ink" /> Panduan Bio & Highlight</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="repeat" className="w-4 h-4 text-ink" /> Repurposing Framework</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="layout-grid" className="w-4 h-4 text-ink" /> Notion Content OS</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="instagram" className="w-4 h-4 text-ink" /> 30 Script Reels 9:16</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="message-square" className="w-4 h-4 text-ink" /> Caption Struktur AIDA</span>
      </div>
    </div>
  </div>

  {/* MAIN CONTENT */}
  <main id="main-content" className="flex-1 py-10 sm:py-16 brutal-grid relative overflow-hidden">
    
    {/* Floating Geometry */}
    <div className="hidden lg:flex absolute top-12 right-12 w-24 h-24 bg-brutalPink text-ink items-center justify-center font-display font-extrabold text-xs uppercase text-center p-2 rotate-12 z-0 brutal-star border-2 border-ink shadow-brutal pointer-events-none">
      KHUSUS<br />REELS
    </div>
    <div className="absolute top-1/3 left-6 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="absolute bottom-1/4 right-8 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✦</div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16 relative z-10">
      
      {/* Protected Hero Plaque to Eliminate Dot Distraction behind text */}
      <section className="hero-plaque p-6 sm:p-10 space-y-4">
        <div className="inline-flex items-center gap-2 badge-brutal bg-brutalYellow px-3.5 py-1 rounded-lg text-xs font-mono font-bold text-ink">
          <Icon name="instagram" className="w-4 h-4 text-ink" />
          <span>EKOSISTEM KONTEN INSTAGRAM UMKM</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-display font-extrabold text-ink tracking-tight leading-[1.12]">
          Paket Konten Instagram UMKM — <br className="hidden sm:inline" />
          <span className="bg-brutalYellow text-ink px-3 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">30 Konten Terencana, Bukan Asal Posting</span>
        </h1>

        <p className="text-xs sm:text-base text-stone-800 font-sans max-w-3xl leading-relaxed font-medium pt-1">
          Feed yang cuma berisi foto katalog produk tanpa cerita terbukti gagal menggerakkan penjualan. Paket ini memberi kamu 30 video script Reels kata-per-kata, 30 caption AIDA, panduan optimasi bio & highlight, dan Notion OS kalender 30 hari — membuat profil Instagram tokomu bekerja aktif menghasilkan DM dan transaksi.
        </p>

        <div className="flex flex-wrap gap-3 pt-3">
          <button type="button" data-action="open-modal" data-pkg="Paket Instagram 30 Hari - Rp299.000" className="btn-press px-7 py-3.5 bg-ink text-brutalYellow hover:bg-brutalYellow hover:text-ink font-mono text-xs sm:text-sm font-bold rounded-2xl flex items-center gap-2.5">
            <span>Mulai dengan Brief (Rp299.000)</span>
            <Icon name="arrow-right" className="w-4 h-4" />
          </button>
          <a href="https://wa.me/6281288009920?text=Halo%2C%20saya%20mau%20tanya%20paket%20konten%20Instagram" target="_blank" rel="noopener noreferrer" className="btn-press px-6 py-3.5 bg-white text-ink hover:bg-canvas font-mono text-xs sm:text-sm font-bold rounded-2xl border-2 border-ink shadow-brutal-sm flex items-center gap-2">
            <Icon name="message-circle" className="w-4 h-4" />
            <span>Tanya via WhatsApp</span>
          </a>
        </div>
      </section>

      {/* Isi Paket Grid */}
      <section className="space-y-6">
        <div>
          <span className="badge-brutal px-3 py-1 rounded-lg text-xs font-mono font-bold bg-brutalGreen text-ink uppercase">Rincian Deliverables</span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">Isi Paket Konten Instagram</h2>
          <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1">Struktur lengkap agar akun tokomu profesional dan berkonversi tinggi.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          
          <div className="bento-card p-6 rounded-3xl bg-brutalYellow flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="w-9 h-9 rounded-xl bg-white border-2 border-ink flex items-center justify-center font-mono font-bold text-sm shadow-brutal-sm">01</span>
                <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-white rounded font-bold">Reels 9:16</span>
              </div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-ink">30 Script Reels Kata-per-Kata</h3>
              <p className="text-stone-800 font-sans text-xs sm:text-sm leading-relaxed mt-2">
                Format vertikal 15-30 detik: visual hook pembuka 0-3 detik, problem framing, value solution produk, dan CTA ajakan interaksi langsung.
              </p>
            </div>
            <span className="font-mono text-[10px] text-ink mt-4 pt-2.5 border-t-2 border-ink block font-bold">Teleprompter HP Ready</span>
          </div>

          <div className="bento-card p-6 rounded-3xl bg-brutalCyan/40 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="w-9 h-9 rounded-xl bg-white border-2 border-ink flex items-center justify-center font-mono font-bold text-sm shadow-brutal-sm">02</span>
                <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-white rounded font-bold">Copywriting</span>
              </div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-ink">30 Caption Struktur AIDA</h3>
              <p className="text-stone-800 font-sans text-xs sm:text-sm leading-relaxed mt-2">
                Attention, Interest, Desire, Action — copywriting persuasif siap salin lengkap dengan riset klaster tagar 3-tier (broad, niche, micro).
              </p>
            </div>
            <span className="font-mono text-[10px] text-ink mt-4 pt-2.5 border-t-2 border-ink block font-bold">High Conversion Copy</span>
          </div>

          <div className="bento-card p-6 rounded-3xl bg-brutalPink/40 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="w-9 h-9 rounded-xl bg-white border-2 border-ink flex items-center justify-center font-mono font-bold text-sm shadow-brutal-sm">03</span>
                <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-white rounded font-bold">Bio Audit</span>
              </div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-ink">Panduan Optimasi Bio & Highlight</h3>
              <p className="text-stone-800 font-sans text-xs sm:text-sm leading-relaxed mt-2">
                Cetak biru profil toko agar pengunjung baru langsung paham apa yang kamu jual dan kenapa harus beli dalam kurun waktu 5 detik pertama.
              </p>
            </div>
            <span className="font-mono text-[10px] text-ink mt-4 pt-2.5 border-t-2 border-ink block font-bold">Conversion-Driven Profile</span>
          </div>

          <div className="bento-card p-6 rounded-3xl bg-white flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="w-9 h-9 rounded-xl bg-brutalYellow border-2 border-ink flex items-center justify-center font-mono font-bold text-sm shadow-brutal-sm">04</span>
                <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-canvas rounded font-bold">Calendar</span>
              </div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-ink">Kalender Konten 30 Hari</h3>
              <p className="text-stone-700 font-sans text-xs sm:text-sm leading-relaxed mt-2">
                Setiap hari punya misi spesifik: kenalkan masalah, bangun kepercayaan, tunjukkan solusi, dan tutup dengan ajakan transaksi ke DM.
              </p>
            </div>
            <span className="font-mono text-[10px] text-stone-600 mt-4 pt-2.5 border-t-2 border-ink block font-bold">Runtun & Terarah</span>
          </div>

          <div className="bento-card p-6 rounded-3xl bg-white flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="w-9 h-9 rounded-xl bg-brutalGreen border-2 border-ink flex items-center justify-center font-mono font-bold text-sm shadow-brutal-sm">05</span>
                <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-canvas rounded font-bold">Repurposing</span>
              </div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-ink">Content Repurposing Framework</h3>
              <p className="text-stone-700 font-sans text-xs sm:text-sm leading-relaxed mt-2">
                SOP efisien mengubah 1 video Reels menjadi karusel edukasi, bahan Instagram Story, thread di media sosial lain, dan status WhatsApp.
              </p>
            </div>
            <span className="font-mono text-[10px] text-stone-600 mt-4 pt-2.5 border-t-2 border-ink block font-bold">Hemat Tenaga Produksi</span>
          </div>

          <div className="bento-card p-6 rounded-3xl bg-white flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-start mb-4">
                <span className="w-9 h-9 rounded-xl bg-brutalCyan border-2 border-ink flex items-center justify-center font-mono font-bold text-sm shadow-brutal-sm">06</span>
                <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-canvas rounded font-bold">Bonus Ekstra</span>
              </div>
              <h3 className="font-display font-bold text-lg sm:text-xl text-ink">4 Artikel SEO Bonus</h3>
              <p className="text-stone-700 font-sans text-xs sm:text-sm leading-relaxed mt-2">
                Artikel pilar 1.000 kata yang bisa disematkan sebagai link di bio toko dan mendatangkan traffic pencarian organik gratis dari Google.
              </p>
            </div>
            <span className="font-mono text-[10px] text-stone-600 mt-4 pt-2.5 border-t-2 border-ink block font-bold">Google Organic Traffic</span>
          </div>

        </div>
      </section>

      {/* 4 Pillars Section [RETRO GRID] */}
      <section className="bento-card p-6 sm:p-10 rounded-3xl bg-white space-y-6">
        <div>
          <span className="badge-brutal px-3 py-1 rounded-lg text-xs font-mono font-bold bg-brutalYellow text-ink uppercase">Formula Rasio Feed</span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">Pilar Konten yang Menjaga Feed Tetap Sehat</h2>
          <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1">Rasio seimbang agar akun bisnismu tidak menjadi brosur iklan yang membosankan.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
          
          <div className="p-5 bg-canvas rounded-2xl border-2 border-ink space-y-2 shadow-brutal-sm">
            <span className="badge-brutal inline-block px-2 py-0.5 rounded bg-brutalYellow text-ink font-bold text-[10px]">Porsi 40%</span>
            <h3 className="font-display font-bold text-base text-ink">Edukasi Solusi</h3>
            <p className="text-stone-700 font-sans text-xs leading-relaxed">
              Jawab keresahan calon pembeli, bahas cara pemakaian, dan bangun otoritas brand tanpa terkesan menggurui.
            </p>
          </div>

          <div className="p-5 bg-canvas rounded-2xl border-2 border-ink space-y-2 shadow-brutal-sm">
            <span className="badge-brutal inline-block px-2 py-0.5 rounded bg-canvas text-ink font-bold text-[10px]">Porsi 30%</span>
            <h3 className="font-display font-bold text-base text-ink">Storytelling Nyata</h3>
            <p className="text-stone-700 font-sans text-xs leading-relaxed">
              Kisah autentik pelanggan, proses dapur di balik layar (*behind the scenes*), dan perjalanan mengembangkan produk.
            </p>
          </div>

          <div className="p-5 bg-canvas rounded-2xl border-2 border-ink space-y-2 shadow-brutal-sm">
            <span className="badge-brutal inline-block px-2 py-0.5 rounded bg-brutalPink/50 text-ink font-bold text-[10px]">Porsi 15%</span>
            <h3 className="font-display font-bold text-base text-ink">Penawaran Spesial</h3>
            <p className="text-stone-700 font-sans text-xs leading-relaxed">
              Peluncuran produk baru, penawaran bundle hemat, dan direct call-to-action menuju DM atau link pemesanan.
            </p>
          </div>

          <div className="p-5 bg-canvas rounded-2xl border-2 border-ink space-y-2 shadow-brutal-sm">
            <span className="badge-brutal inline-block px-2 py-0.5 rounded bg-brutalGreen text-ink font-bold text-[10px]">Porsi 15%</span>
            <h3 className="font-display font-bold text-base text-ink">Mitos vs Fakta</h3>
            <p className="text-stone-700 font-sans text-xs leading-relaxed">
              Membongkar salah kaprah industri dalam format kontras yang mudah dibagikan (*shareable*) dan memicu komentar.
            </p>
          </div>

        </div>
      </section>

      {/* FAQ Section */}
      <section className="space-y-6">
        <div>
          <span className="badge-brutal px-3 py-1 rounded-lg text-xs font-mono font-bold bg-brutalYellow text-ink uppercase">Tanya Jawab</span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">FAQ Paket Konten Instagram</h2>
        </div>

        <div className="space-y-3">
          
          <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group" open>
            <summary className="flex justify-between items-center gap-3 font-display font-bold text-base text-ink">
              <span>Apakah paket ini termasuk desain visual feed atau foto produk?</span>
              <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-xs sm:text-sm text-stone-700 mt-3 leading-relaxed font-sans">
              Fokus utama paket ini adalah naskah video Reels 9:16 + copywriting caption AIDA + kalender editorial Notion, bukan desain grafis statis. Naskah video vertikal adalah format paling efektif untuk menjangkau audiens baru di Instagram saat ini, dan panduan bio/highlight kami memastikan profilmu langsung siap menerima traffic.
            </p>
          </details>

          <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
            <summary className="flex justify-between items-center gap-3 font-display font-bold text-base text-ink">
              <span>Berapa kali idealnya saya harus memposting Reels dalam seminggu?</span>
              <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-xs sm:text-sm text-stone-700 mt-3 leading-relaxed font-sans">
              Kalender Karsa dirancang untuk ritme posting harian (1 konten/hari selama 30 hari). Kamu cukup meluangkan 1-2 jam di akhir pekan untuk merekam 6-7 video sekaligus mengikuti naskah, lalu menjadwalkannya otomatis lewat Meta Business Suite.
            </p>
          </details>

          <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
            <summary className="flex justify-between items-center gap-3 font-display font-bold text-base text-ink">
              <span>Apakah caption dan riset tagarnya sudah spesifik dengan produk saya?</span>
              <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-xs sm:text-sm text-stone-700 mt-3 leading-relaxed font-sans">
              Ya, seluruh 30 caption ditulis berdasarkan brief bisnismu menggunakan formula AIDA. Riset tagar juga dibagi dalam 3 lapis (tagar umum industri, tagar spesifik niche, dan tagar konversi) agar jangkauan Reels optimal.
            </p>
          </details>

          <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
            <summary className="flex justify-between items-center gap-3 font-display font-bold text-base text-ink">
              <span>Bagaimana pemanfaatan untuk Instagram Story?</span>
              <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="text-xs sm:text-sm text-stone-700 mt-3 leading-relaxed font-sans">
              Setiap naskah Reels dapat dipecah menjadi interaksi Story (polling, stiker pertanyaan, behind the scenes singkat) menggunakan Repurposing Framework yang kami sertakan di dalam Notion OS.
            </p>
          </details>

        </div>
      </section>

      {/* Bottom Banner */}
      <section className="bento-card p-8 sm:p-12 rounded-3xl bg-brutalYellow flex flex-col items-center text-center space-y-4 shadow-brutal-lg">
        <span className="badge-brutal px-3.5 py-1 rounded-lg text-xs font-mono font-bold bg-ink text-brutalYellow uppercase">Mulai Sekarang</span>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-ink leading-tight">
          Instagram Tokomu Seharusnya Menjual, <br className="hidden sm:inline" />Bukan Sekadar Ada.
        </h2>
        <p className="text-xs sm:text-base text-stone-800 max-w-xl font-medium font-sans">
          Dapatkan 30 konten Reels terencana dengan pesan yang konsisten mengarahkan calon pembeli langsung ke tokomu.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button type="button" data-action="open-modal" data-pkg="Paket Instagram 30 Hari - Rp299.000" className="btn-press bg-ink text-brutalYellow hover:bg-white hover:text-ink px-8 py-4 rounded-2xl font-mono text-sm font-bold transition flex items-center gap-2.5">
            <span>Isi Brief & Amankan Paket (Rp299k)</span>
            <Icon name="arrow-right" className="w-4 h-4" />
          </button>
          <a href="https://wa.me/6281288009920?text=Halo%2C%20saya%20mau%20tanya%20paket%20konten%20Instagram" target="_blank" rel="noopener noreferrer" className="btn-press bg-white hover:bg-canvas text-ink px-6 py-4 rounded-2xl font-mono text-sm font-bold transition flex items-center gap-2">
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
        <a className="hover:underline hover:text-ink" href="../terms.html">Syarat & Ketentuan</a>
        <a className="hover:underline hover:text-ink" href="../privacy.html">Kebijakan Privasi</a>
        <a className="hover:underline hover:text-ink" href="../refund.html">Jaminan SLA</a>
        <a className="hover:underline hover:text-ink" href="../index.html">Beranda</a>
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
          Isi Brief Konten Instagram 30 Hari
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
          <span id="modalPackagePrice" className="text-sm font-black text-ink font-display">Paket Instagram 30 Hari - Rp299.000</span>
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
