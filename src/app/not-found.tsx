"use client";
import { useEffect, useRef } from "react";
import { Icon } from "@/components/Icon";

export default function Page() {
const searchRef = useRef<HTMLInputElement>(null);

useEffect(() => {
  const input = searchRef.current;
  if (!input) return;
  const filter = () => {
    const q = input.value.toLowerCase();
    const items = document.querySelectorAll(".dir-item");
    items.forEach((item) => {
      const t = (item.textContent ?? "").toLowerCase();
      (item as HTMLElement).style.display = t.includes(q) ? "block" : "none";
    });
  };
  input.addEventListener("input", filter);
  return () => input.removeEventListener("input", filter);
}, []);
  return (
    <div className="min-h-screen flex flex-col justify-between">


  {/* TOP STATUS TICKER */}
  <div className="bg-brutalYellow text-ink text-[11px] sm:text-xs font-mono py-2.5 px-3 text-center tracking-tight border-b-2 border-ink flex items-center justify-center gap-2 font-bold relative z-30">
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-ink text-brutalYellow text-[10px] uppercase font-mono font-black border border-ink shadow-brutal-sm shrink-0">
      <Icon name="alert-triangle" className="w-3.5 h-3.5" /> STATUS 404
    </span>
    <span className="truncate sm:overflow-visible text-ink font-bold">Halaman tidak ditemukan. Gunakan direktori portal di bawah untuk melanjutkan navigasi.</span>
  </div>

  {/* NAVIGATION HEADER */}
  <header className="border-b-2 border-ink bg-canvas/95 backdrop-blur-md sticky top-0 z-30">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
      
      {/* Brand Logo */}
      <a className="flex items-center space-x-2 group shrink-0" href="/">
        <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-ink group-hover:-translate-y-0.5 transition-transform">Karsa</span>
        <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-brutalPink text-ink rounded font-bold">404</span>
      </a>

      {/* Status Indicator & Navigation Action Button */}
      <div className="flex items-center gap-3 text-xs font-mono font-bold">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">
          <span className="w-2 h-2 rounded-full bg-brutalGreen border border-ink animate-ping"></span>
          <span>Gateway: <strong className="text-ink">Online</strong></span>
        </div>
        <a className="btn-press inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-white text-ink rounded-xl font-bold transition" href="/">
          <Icon name="home" className="w-4 h-4" />
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
        <span className="flex items-center gap-1.5"><Icon name="compass" className="w-4 h-4 text-ink" /> Routing System</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="alert-circle" className="w-4 h-4 text-ink" /> 404 URL Terputus</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="layout-grid" className="w-4 h-4 text-ink" /> 8 Kanal Direktori Aktif</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="zap" className="w-4 h-4 text-ink" /> SLA 24 Jam Tetap Jalan</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="compass" className="w-4 h-4 text-ink" /> Routing System</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="alert-circle" className="w-4 h-4 text-ink" /> 404 URL Terputus</span>
      </div>
    </div>
  </div>

  {/* MAIN 404 HERO & SEARCH */}
  <main id="main-content" className="flex-1 py-12 sm:py-20 brutal-grid relative overflow-hidden flex flex-col justify-center">
    
    {/* Floating Geometry */}
    <div className="hidden lg:flex absolute top-12 left-12 w-24 h-24 bg-brutalYellow text-ink items-center justify-center font-display font-extrabold text-xs uppercase text-center p-2 rotate-12 z-0 brutal-star border-2 border-ink shadow-brutal pointer-events-none">
      URL<br />HILANG
    </div>
    <div className="absolute top-1/3 right-8 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="absolute bottom-1/4 left-6 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✦</div>

    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-6 sm:space-y-8 w-full">
      
      {/* Protected Content Plaque to Eliminate Dot Distraction behind text */}
      <div className="hero-plaque p-6 sm:p-10 space-y-5">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 badge-brutal bg-brutalYellow px-4 py-1.5 rounded-lg text-xs font-mono font-bold text-ink">
          <span className="w-2 h-2 rounded-full bg-ink animate-pulse"></span>
          <span>ALAMAT URL TIDAK DITEMUKAN</span>
        </div>

        {/* Big Typography 404 */}
        <div className="space-y-3">
          <h1 className="text-8xl sm:text-9xl font-display font-black tracking-tight text-ink select-none leading-none">
            404
          </h1>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink leading-tight">
            Naskah konten ini <span className="bg-brutalPink/50 text-ink px-3 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">belum terbit</span> atau tautannya berpindah.
          </h2>
          <p className="text-xs sm:text-base text-stone-800 font-sans max-w-xl mx-auto leading-relaxed font-medium pt-1">
            Halaman yang Anda cari tidak tersedia dalam repositori Karsa Studio. Kemungkinan URL salah ketik atau telah dialihkan ke ruang kerja produksi yang baru.
          </p>
        </div>

        {/* Search Input Interactive with Shielded Contrast */}
        <div className="max-w-md mx-auto relative pt-2">
          <Icon name="search" className="w-4 h-4 absolute left-4 top-[60%] -translate-y-1/2 text-stone-500" />
          <input type="text" id="dirSearchInput" ref={searchRef} placeholder="Cari halaman (workspace, brief, blog, kontak)..." className="w-full bg-white border-2 border-ink rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink font-mono shadow-brutal transition min-h-[46px]" />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <a href="/" className="btn-press w-full sm:w-auto px-6 py-3.5 bg-brutalYellow text-ink hover:bg-ink hover:text-brutalYellow rounded-2xl font-mono text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 shadow-brutal min-h-[48px]">
            <Icon name="arrow-left" className="w-4 h-4" />
            <span>Kembali ke Beranda Utama</span>
          </a>
          <a href="/login" className="btn-press w-full sm:w-auto px-6 py-3.5 bg-white text-ink hover:bg-canvas rounded-2xl font-mono text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2 min-h-[48px] shadow-brutal-sm">
            <Icon name="layout-grid" className="w-4 h-4" />
            <span>Buka Member Workspace</span>
          </a>
        </div>

      </div>

      {/* 8 Channels Directory Bento Grid */}
      <section className="pt-6 border-t-2 border-ink space-y-4 text-left font-mono">
        <div className="flex items-center justify-between pb-1">
          <span className="text-xs text-stone-700 uppercase tracking-wider font-bold">Direktori Portal Karsa</span>
          <span className="badge-brutal text-[10px] px-2 py-0.5 bg-brutalGreen text-ink rounded font-bold">8 Saluran Aktif</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4" id="directoryGrid">
          
          {/* Channel 01 */}
          <a href="/dashboard" className="dir-item bento-card p-4 rounded-2xl bg-white block group">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-display font-bold text-sm text-ink group-hover:underline">Customer Hub</span>
              <Icon name="arrow-up-right" className="w-4 h-4 text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-stone-600 font-sans leading-snug">Akses 30 naskah, teleprompter, dan Notion.</p>
          </a>

          {/* Channel 02 */}
          <a href="/login" className="dir-item bento-card p-4 rounded-2xl bg-brutalYellow/30 block group">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-display font-bold text-sm text-ink group-hover:underline">Member Tools</span>
              <Icon name="arrow-up-right" className="w-4 h-4 text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-stone-700 font-sans leading-snug">Generator Hook, Kalkulator ROI, & Brand Vault.</p>
          </a>

          {/* Channel 03 */}
          <a href="index.html#orderForm" className="dir-item bento-card p-4 rounded-2xl bg-white block group">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-display font-bold text-sm text-ink group-hover:underline">Formulir Brief</span>
              <Icon name="arrow-up-right" className="w-4 h-4 text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-stone-600 font-sans leading-snug">Order batch 30 hari dalam 3 menit.</p>
          </a>

          {/* Channel 04 */}
          <a href="index.html#harga" className="dir-item bento-card p-4 rounded-2xl bg-brutalCyan/30 block group">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-display font-bold text-sm text-ink group-hover:underline">Pilihan Paket</span>
              <Icon name="arrow-up-right" className="w-4 h-4 text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-stone-700 font-sans leading-snug">Batch 30 hari flat Rp299k tanpa langganan.</p>
          </a>

          {/* Channel 05 */}
          <a href="/blog" className="dir-item bento-card p-4 rounded-2xl bg-white block group">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-display font-bold text-sm text-ink group-hover:underline">Blog & Panduan</span>
              <Icon name="arrow-up-right" className="w-4 h-4 text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-stone-600 font-sans leading-snug">Panduan naskah video vertikal & SEO UMKM.</p>
          </a>

          {/* Channel 06 */}
          <a href="/tentang-kami" className="dir-item bento-card p-4 rounded-2xl bg-white block group">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-display font-bold text-sm text-ink group-hover:underline">Tentang Studio</span>
              <Icon name="arrow-up-right" className="w-4 h-4 text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-stone-600 font-sans leading-snug">Manifesto & 5 prinsip pembuatan konten.</p>
          </a>

          {/* Channel 07 */}
          <a href="https://wa.me/6281288009920" target="_blank" rel="noopener noreferrer" className="dir-item bento-card p-4 rounded-2xl bg-brutalGreen/30 block group">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-display font-bold text-sm text-ink group-hover:underline">Bantuan CS WA</span>
              <Icon name="arrow-up-right" className="w-4 h-4 text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-stone-700 font-sans leading-snug">Konsultasi langsung tim via WhatsApp.</p>
          </a>

          {/* Channel 08 */}
          <a href="/refund" className="dir-item bento-card p-4 rounded-2xl bg-white block group">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-display font-bold text-sm text-ink group-hover:underline">Garansi & SLA</span>
              <Icon name="arrow-up-right" className="w-4 h-4 text-ink group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
            <p className="text-[11px] text-stone-600 font-sans leading-snug">Jaminan 24 jam & revisi kalibrasi 48 jam.</p>
          </a>

        </div>
      </section>

    </div>
  </main>

  {/* FOOTER */}
  <footer className="border-t-2 border-ink py-6 px-4 font-mono text-xs text-stone-600 bg-canvas brutal-grid">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
      <p className="font-bold">&copy; 2026 Karsa Studio (usekarsa.co). All rights reserved.</p>
      <div className="flex items-center gap-4 font-bold">
        <a className="hover:underline hover:text-ink" href="/terms">Syarat & Ketentuan</a>
        <a className="hover:underline hover:text-ink" href="/privacy">Kebijakan Privasi</a>
        <a className="hover:underline hover:text-ink" href="/refund">Jaminan SLA</a>
      </div>
    </div>
  </footer>

  

    </div>
  );
}
