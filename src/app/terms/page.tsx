"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@/components/Icon";

export default function TermsPage() {
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const input = searchRef.current;
    if (!input) return;
    const filter = () => {
      const q = input.value.toLowerCase();
      const articles = document.querySelectorAll(".legal-article");
      const navLinks = document.querySelectorAll("#articleNavList a");
      articles.forEach((section, idx) => {
        const t = (section.textContent ?? "").toLowerCase();
        const m = t.includes(q);
        (section as HTMLElement).style.display = m ? "block" : "none";
        if (navLinks[idx]) (navLinks[idx] as HTMLElement).style.display = m ? "block" : "none";
      });
    };
    input.addEventListener("input", filter);
    return () => input.removeEventListener("input", filter);
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">



  {/* TOP PROMO TICKER */}
  <div className="bg-brutalYellow text-ink text-[11px] sm:text-xs font-mono py-2.5 px-3 text-center tracking-tight border-b-2 border-ink flex items-center justify-center gap-2 font-bold relative z-30">
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-ink text-brutalYellow text-[10px] uppercase font-mono font-black border border-ink shadow-brutal-sm shrink-0">
      <Icon name="file-text" className="w-3.5 h-3.5" /> PERJANJIAN HUKUM
    </span>
    <span className="truncate sm:overflow-visible text-ink font-bold">Ketentuan Master Service Agreement (MSA). Hak kekayaan intelektual 100% dialihkan ke klien.</span>
  </div>

  {/* NAVIGATION HEADER */}
  <header className="border-b-2 border-ink bg-canvas/95 backdrop-blur-md sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
      
      {/* Brand Logo */}
      <a className="flex items-center space-x-2 group shrink-0" href="/">
        <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-ink group-hover:-translate-y-0.5 transition-transform">Karsa</span>
        <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-brutalYellow text-ink rounded font-bold">Terms of Service</span>
      </a>

      {/* Navigation Actions */}
      <div className="flex items-center gap-2.5 sm:gap-3 text-xs font-mono font-bold">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">
          <span className="w-2 h-2 rounded-full bg-brutalGreen border border-ink animate-ping"></span>
          <span>Status Hukum: <strong className="text-ink">Sah & Mengikat</strong></span>
        </div>
        <a className="btn-press inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-white text-ink rounded-xl font-bold transition" href="/login">
          <Icon name="layout-dashboard" className="w-4 h-4" />
          <span className="hidden xs:inline">Member Workspace</span>
          <span className="xs:hidden">Workspace</span>
        </a>
      </div>

    </div>
  </header>

  {/* MARQUEE STRIP */}
  <div className="py-3 sm:py-3.5 border-b-2 border-ink bg-brutalYellow overflow-hidden relative">
    <div className="flex items-center gap-3 px-4 max-w-7xl mx-auto">
      <div className="marquee-track flex gap-8 font-mono text-xs sm:text-sm font-bold text-ink uppercase tracking-wider whitespace-nowrap shrink-0 items-center">
        <span className="flex items-center gap-1.5"><Icon name="shield-check" className="w-4 h-4 text-ink" /> 100% Hak Milik Klien</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="lock" className="w-4 h-4 text-ink" /> Standar NDA Kerahasiaan Penuh</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="clock" className="w-4 h-4 text-ink" /> SLA Pengerjaan 24 Jam Pasti</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="refresh-cw" className="w-4 h-4 text-ink" /> Jendela Kalibrasi Bebas 48 Jam</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="shield-check" className="w-4 h-4 text-ink" /> 100% Hak Milik Klien</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="lock" className="w-4 h-4 text-ink" /> Standar NDA Kerahasiaan Penuh</span>
      </div>
    </div>
  </div>

  {/* MAIN DOCUMENT CONTENT */}
  <main id="main-content" className="flex-1 py-10 sm:py-16 brutal-grid relative overflow-hidden">
    
    {/* Floating Geometry */}
    <div className="hidden lg:flex absolute top-12 left-8 w-24 h-24 bg-brutalYellow text-ink items-center justify-center font-display font-extrabold text-xs uppercase text-center p-2 rotate-12 z-0 brutal-star border-2 border-ink shadow-brutal pointer-events-none">
      100%<br />LEGAL
    </div>
    <div className="absolute top-1/3 right-8 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="absolute bottom-1/4 left-6 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✦</div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 relative z-10">
      
      {/* Protected Hero Plaque to Guarantee Legibility */}
      <section className="hero-plaque p-6 sm:p-10 space-y-4">
        <div className="inline-flex items-center gap-2 badge-brutal bg-brutalYellow px-3.5 py-1 rounded-lg text-xs font-mono font-bold text-ink">
          <Icon name="file-check" className="w-4 h-4 text-ink" />
          <span>MASTER SERVICE AGREEMENT (MSA) & KETENTUAN HUKUM RESMI</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-display font-extrabold text-ink tracking-tight leading-[1.12]">
          Perjanjian Induk & Syarat Ketentuan Layanan <br className="hidden sm:inline" />
          <span className="bg-brutalYellow text-ink px-3 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">(Terms of Service & IP Policy)</span>
        </h1>

        <p className="text-xs sm:text-base text-stone-800 font-sans max-w-3xl leading-relaxed font-medium pt-1">
          Berlaku per 1 September 2026. Dokumen ini merupakan instrumen hukum yang mengikat antara Karsa Studio (usekarsa.co) dan Klien terkait pemesanan, produksi konten, hak kekayaan intelektual, batas liabilitas, serta jaminan layanan.
        </p>
      </section>

      {/* 4 Core Terms Highlight Bento Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 font-mono text-xs">
        
        <div className="bento-card p-5 rounded-3xl space-y-2 bg-white flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-stone-500 uppercase font-bold block">1. SLA Produksi</span>
            <span className="text-sm sm:text-base font-extrabold text-ink block font-display mt-1">Maksimal 24 Jam</span>
          </div>
          <span className="badge-brutal text-[10px] text-ink font-bold bg-brutalGreen px-2 py-0.5 rounded self-start">Garansi On-Time</span>
        </div>

        <div className="bento-card p-5 rounded-3xl space-y-2 bg-brutalGreen/30 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-stone-700 uppercase font-bold block">2. Kepemilikan IP</span>
            <span className="text-sm sm:text-base font-extrabold text-ink block font-display mt-1">100% Hak Klien</span>
          </div>
          <span className="badge-brutal text-[10px] text-ink font-bold bg-white px-2 py-0.5 rounded self-start">Bebas Iklan & Ads</span>
        </div>

        <div className="bento-card p-5 rounded-3xl space-y-2 bg-white flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-stone-500 uppercase font-bold block">3. Jendela Kalibrasi</span>
            <span className="text-sm sm:text-base font-extrabold text-ink block font-display mt-1">48 Jam Kalender</span>
          </div>
          <span className="badge-brutal text-[10px] text-ink font-bold bg-sand px-2 py-0.5 rounded self-start">Bebas Revisi Tone</span>
        </div>

        <div className="bento-card p-5 rounded-3xl space-y-2 bg-brutalYellow/40 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-stone-700 uppercase font-bold block">4. Kerahasiaan Data</span>
            <span className="text-sm sm:text-base font-extrabold text-ink block font-display mt-1">Standar NDA Penuh</span>
          </div>
          <span className="badge-brutal text-[10px] text-ink font-bold bg-white px-2 py-0.5 rounded self-start">Rahasia Dagang Aman</span>
        </div>

      </div>

      {/* Main Terms Layout: Sticky Index + Content Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sticky Navigation Index (4 Cols) */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4">
          <div className="bento-card p-5 rounded-3xl space-y-3 font-mono text-xs bg-white shadow-brutal-lg">
            
            <div className="flex items-center justify-between pb-2 border-b-2 border-ink">
              <span className="font-bold text-ink uppercase tracking-wider text-[11px]">Daftar Pasal Hukum</span>
              <span className="badge-brutal px-2 py-0.5 rounded text-[10px] font-bold bg-canvas text-ink">12 Pasal</span>
            </div>

            {/* Search Article Input */}
            <div className="relative">
              <Icon name="search" className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-500" />
              <input type="text" id="articleSearchInput" ref={searchRef} placeholder="Cari pasal atau kata kunci..." className="w-full bg-canvas border-2 border-ink rounded-xl px-3 py-2 pl-8 text-xs font-sans text-ink focus:outline-none focus:ring-2 focus:ring-ink min-h-[40px]" />
            </div>

            {/* Nav Links List */}
            <nav className="space-y-1 max-h-[55vh] overflow-y-auto no-scrollbar pr-1 pt-1" id="articleNavList">
              <a href="#pasal-1" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Pasal 01 — Definisi & Pihak Terikat</a>
              <a href="#pasal-2" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Pasal 02 — Ruang Lingkup 6 Deliverables</a>
              <a href="#pasal-3" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Pasal 03 — Mekanisme Pemesanan & Brief</a>
              <a href="#pasal-4" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Pasal 04 — Service Level Agreement (SLA)</a>
              <a href="#pasal-5" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Pasal 05 — Kebijakan Kalibrasi & Revisi</a>
              <a href="#pasal-6" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Pasal 06 — Hak Kekayaan Intelektual (IP)</a>
              <a href="#pasal-7" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Pasal 07 — Kerahasiaan Data Bisnis (NDA)</a>
              <a href="#pasal-8" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Pasal 08 — Kebijakan Finansial & Pembayaran</a>
              <a href="#pasal-9" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Pasal 09 — Batasan Tanggung Jawab</a>
              <a href="#pasal-10" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Pasal 10 — Keadaan Memaksa (Force Majeure)</a>
              <a href="#pasal-11" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Pasal 11 — Hukum & Penyelesaian Sengketa</a>
              <a href="#pasal-12" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Pasal 12 — Saluran Komunikasi Resmi</a>
            </nav>

          </div>
        </aside>

        {/* Detailed Legal Articles (8 Cols) */}
        <div className="lg:col-span-8 space-y-6 font-sans text-xs sm:text-sm text-stone-700 leading-relaxed" id="articleContainer">
          
          {/* Pasal 01 */}
          <section id="pasal-1" className="legal-article bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">PASAL 01</span>
              <span>•</span>
              <span className="uppercase">Definisi & Pihak Terikat</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">1. Definisi Operasional</h2>
            <p>Dalam Syarat dan Ketentuan ini, istilah-istilah di bawah ini memiliki pengertian sebagai berikut:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700">
              <li><strong>"Penyedia Layanan":</strong> Merujuk pada Karsa Studio, entitas pemilik dan pengelola platform usekarsa.co.</li>
              <li><strong>"Klien / Pengguna":</strong> Setiap individu, badan usaha, pemilik brand UMKM, atau pemegang hak bisnis yang melakukan pendaftaran akun, pengisian brief, atau transaksi pemesanan di platform Karsa Studio.</li>
              <li><strong>"Deliverables":</strong> Seluruh berkas naskah video 9:16, caption media sosial AIDA, artikel blog SEO, audit celah kompetitor, dan ruang kerja Notion yang diserahkan kepada Klien.</li>
              <li><strong>"Kalibrasi":</strong> Permintaan penyesuaian sudut pesan, tone of voice, atau hook naskah dalam batas waktu yang disepakati tanpa mengubah entitas brand utama.</li>
            </ul>
          </section>

          {/* Pasal 02 */}
          <section id="pasal-2" className="legal-article bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">PASAL 02</span>
              <span>•</span>
              <span className="uppercase">Ruang Lingkup 6 Deliverables</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">2. Cakupan Inventaris Konten</h2>
            <p>Setiap transaksi 1 Batch (Rp 299.000) mengikat Penyedia Layanan untuk menyerahkan 6 komponen aset digital berikut:</p>
            
            <div className="space-y-2.5 font-mono text-xs mt-2">
              <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                <strong className="text-ink block font-bold">A. 30 Naskah Video Pendek Kata-per-Kata (Short-Form Scripts)</strong>
                <p className="font-sans text-stone-600 mt-0.5">Disusun untuk format vertikal (TikTok, Instagram Reels, YouTube Shorts) dengan durasi rekam 15-30 detik. Format mencakup: Visual & Audio Hook (0-3s), Problem Framing, Value Delivery, dan Direct CTA.</p>
              </div>
              <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                <strong className="text-ink block font-bold">B. 30 Caption Berstruktur AIDA & 15 Tagar</strong>
                <p className="font-sans text-stone-600 mt-0.5">Copywriting formula Attention, Interest, Desire, Action siap pakai untuk Instagram & Threads, lengkap dengan klasifikasi tagar 3-tier (Broad, Niche, Micro).</p>
              </div>
              <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                <strong className="text-ink block font-bold">C. 4 Artikel Blog SEO (1.000 Kata)</strong>
                <p className="font-sans text-stone-600 mt-0.5">Artikel panjang siap publikasi dengan penataan heading H1/H2/H3, density kata kunci natural, dan meta deskripsi ramah mesin pencari Google.</p>
              </div>
              <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                <strong className="text-ink block font-bold">D. Positioning Blueprint & Audit Celah 1 Kompetitor</strong>
                <p className="font-sans text-stone-600 mt-0.5">Analisis diferensiasi sudut pandang dari 1 akun kompetitor yang didaftarkan oleh Klien.</p>
              </div>
              <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                <strong className="text-ink block font-bold">E. Notion Content OS Database</strong>
                <p className="font-sans text-stone-600 mt-0.5">Ruang kerja database Notion dengan Calendar Matrix View dan status manajemen publikasi harian yang dapat diduplikasi dalam 1 klik.</p>
              </div>
              <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                <strong className="text-ink block font-bold">F. Panduan Visual B-Roll Kamera Ponsel</strong>
                <p className="font-sans text-stone-600 mt-0.5">Instruksi sudut kamera, pencahayaan alami jendela (Window Light 45°), dan panduan gestur rekam yang ramah pemula tanpa perlu alat produksi mahal.</p>
              </div>
            </div>
          </section>

          {/* Pasal 03 */}
          <section id="pasal-3" className="legal-article bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">PASAL 03</span>
              <span>•</span>
              <span className="uppercase">Mekanisme Pemesanan & Parameter Brief</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">3. Kewajiban & Keabsahan Data Klien</h2>
            <p>Klien bertanggung jawab penuh atas keakuratan data yang dicantumkan dalam formulir brief (Nama Brand, Deskripsi Produk, Target Audiens, dan Akun Kompetitor Acuan).</p>
            <p>Penyedia Layanan tidak bertanggung jawab atas ketidaksesuaian naskah yang diakibatkan oleh informasi produk yang sengaja dipalsukan atau tidak lengkap saat pengisian formulir brief awal.</p>
          </section>

          {/* Pasal 04 */}
          <section id="pasal-4" className="legal-article bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">PASAL 04</span>
              <span>•</span>
              <span className="uppercase">Service Level Agreement (SLA) 24 Jam</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">4. Komitmen Waktu & Klausul Kompensasi</h2>
            <p>Waktu pengerjaan 1x24 jam kerja dihitung secara otomatis sejak sistem mencatat konfirmasi pembayaran LUNAS dan parameter brief telah divalidasi oleh tim.</p>
            
            <div className="p-4 bg-brutalYellow/30 border-2 border-ink rounded-2xl font-mono text-xs space-y-1 text-stone-800 shadow-brutal-sm">
              <strong className="text-ink font-bold block">Jaminan Keterlambatan Waktu:</strong>
              <p className="font-sans text-xs sm:text-sm">Apabila berkas pesanan terlambat diserahkan melampaui batas SLA 24 jam kerja yang diakibatkan oleh kelalaian operasional internal Penyedia Layanan, Klien berhak memperoleh <strong>kompensasi gratis berupa 5 naskah video pendek viral tambahan</strong> yang akan dimasukkan langsung ke Notion OS Klien.</p>
            </div>
          </section>

          {/* Pasal 05 */}
          <section id="pasal-5" className="legal-article bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">PASAL 05</span>
              <span>•</span>
              <span className="uppercase">Kebijakan Kalibrasi & Batas Revisi</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">5. Ketentuan Revisi Bebas 48 Jam</h2>
            <p>Klien berhak mengajukan penyesuaian sudut pesan (*kalibrasi*) dalam kurun waktu <strong>48 jam kalender</strong> terhitung sejak tautan Customer Hub dan berkas Notion diserahkan.</p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700 font-sans">
              <li><strong>Cakupan Kalibrasi yang Didukung:</strong> Penyesuaian nada bicara (*casual/formal*), penggantian variasi kata hook 0-3s, atau penekanan USP produk tertentu.</li>
              <li><strong>Pengecualian:</strong> Kalibrasi tidak berlaku untuk perubahan nama brand bisnis, perpindahan kategori produk secara total, atau penggantian akun kompetitor yang berbeda dari brief awal.</li>
            </ul>
          </section>

          {/* Pasal 06 */}
          <section id="pasal-6" className="legal-article bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">PASAL 06</span>
              <span>•</span>
              <span className="uppercase">Hak Kekayaan Intelektual (Intellectual Property)</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">6. Pengalihan Kepemilikan 100% ke Klien</h2>
            <p>Seluruh hak cipta, hak penggandaan, dan hak eksploitasi komersial atas 30 naskah, caption AIDA, dan 4 artikel blog SEO dialihkan secara <strong>penuh, mutlak, dan bebas royalti</strong> kepada Klien segera setelah status transaksi LUNAS.</p>
            <p>Klien berhak menggunakan karya tersebut untuk materi iklan berbayar (Meta Ads, TikTok Ads, Google Ads), mendaftarkan hak cipta, atau memodifikasi teks sesuai kebutuhan tanpa kewajiban mencantumkan kredit ke Karsa Studio.</p>
          </section>

          {/* Pasal 07 */}
          <section id="pasal-7" className="legal-article bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">PASAL 07</span>
              <span>•</span>
              <span className="uppercase">Kerahasiaan Data Bisnis (NDA)</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">7. Perlindungan Rahasia Dagang</h2>
            <p>Penyedia Layanan terikat secara hukum untuk menjaga kerahasiaan seluruh dokumen, data penjualan, margin keuntungan, dan informasi proprietary milik Klien yang dicantumkan dalam formulir brief.</p>
            <p>Data tersebut tidak akan pernah dipublikasikan, dibagikan kepada pihak ketiga, atau dijadikan materi publikasi studi kasus tanpa persetujuan tertulis dari Klien.</p>
          </section>

          {/* Pasal 08 */}
          <section id="pasal-8" className="legal-article bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">PASAL 08</span>
              <span>•</span>
              <span className="uppercase">Kebijakan Finansial & Pembayaran</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">8. Ketentuan Finansial</h2>
            <p>Seluruh transaksi diproses dalam mata uang Rupiah (IDR) secara flat tanpa biaya tersembunyi. Mengingat produk yang diserahkan berupa aset intelektual digital siap konsumsi, pembatalan pesanan dan pengembalian dana (*refund*) tidak dapat dilakukan setelah proses pengerjaan naskah berjalan lebih dari 2 jam di sistem antrean.</p>
          </section>

          {/* Pasal 09 */}
          <section id="pasal-9" className="legal-article bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">PASAL 09</span>
              <span>•</span>
              <span className="uppercase">Batasan Tanggung Jawab</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">9. Batasan Jaminan Performa Algoritma</h2>
            <p>Penyedia Layanan menjamin kualitas struktur naskah, ketepatan formula hook psikologis, dan relevansi SEO. Namun demikian, performa views, engagement, algoritma platform pihak ketiga (TikTok/Instagram/Google), dan konversi penjualan akhir dipengaruhi oleh faktor eksternal (kualitas pembawaan talent, pencahayaan video, dan kualitas produk Klien) di luar kendali Penyedia Layanan.</p>
          </section>

          {/* Pasal 10 */}
          <section id="pasal-10" className="legal-article bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">PASAL 10</span>
              <span>•</span>
              <span className="uppercase">Keadaan Memaksa (Force Majeure)</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">10. Penundaan Akibat Kondisi Luar Biasa</h2>
            <p>Penyedia Layanan dibebaskan dari tuntutan keterlambatan SLA jika terjadi gangguan infrastruktur internet global, bencana alam, pemadaman listrik massal, atau kebijakan regulasi pemerintah yang melumpuhkan operasional secara menyeluruh.</p>
          </section>

          {/* Pasal 11 */}
          <section id="pasal-11" className="legal-article bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">PASAL 11</span>
              <span>•</span>
              <span className="uppercase">Hukum & Penyelesaian Sengketa</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">11. Yurisdiksi Hukum Indonesia</h2>
            <p>Perjanjian ini diatur dan ditafsirkan berdasarkan hukum Republik Indonesia. Setiap perselisihan yang timbul akan diselesaikan terlebih dahulu melalui musyawarah mufakat. Apabila tidak tercapai mufakat dalam waktu 30 hari, sengketa akan diselesaikan melalui Badan Arbitrase Nasional Indonesia (BANI).</p>
          </section>

          {/* Pasal 12 */}
          <section id="pasal-12" className="legal-article bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">PASAL 12</span>
              <span>•</span>
              <span className="uppercase">Saluran Komunikasi Resmi</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">12. Saluran Komunikasi Resmi</h2>
            <p>Seluruh notifikasi resmi, pertanyaan legalitas, atau pengajuan kalibrasi dapat disampaikan melalui:</p>
            
            <div className="p-4 bg-canvas rounded-2xl border-2 border-ink font-mono text-xs space-y-1.5 text-stone-700 shadow-brutal-sm">
              <p><strong>Email Legalitas:</strong> halo@usekarsa.co</p>
              <p><strong>WhatsApp Support:</strong> +62 812-3456-7890</p>
              <p><strong>Website Resmi:</strong> https://usekarsa.co</p>
            </div>
          </section>

        </div>

      </div>

      {/* Bottom Quick Navigation Matrix */}
      <div className="text-center pt-8 border-t-2 border-ink font-mono text-xs space-y-3">
        <p className="text-stone-700 font-bold">Dengan memesan paket Karsa Studio, kamu menyetujui seluruh klausul di atas.</p>
        <div className="flex items-center justify-center gap-3">
          <a className="btn-press px-5 py-3 bg-ink text-brutalYellow rounded-2xl transition font-bold shadow-brutal min-h-[44px] flex items-center" href="/">
            Kembali ke Beranda
          </a>
          <a className="btn-press px-5 py-3 bg-white border-2 border-ink text-ink rounded-2xl transition font-bold shadow-brutal-sm min-h-[44px] flex items-center" href="index.html#harga">
            Lihat Pilihan Paket &rarr;
          </a>
        </div>
        <p className="text-stone-500 text-[11px] font-bold pt-2">&copy; 2026 Karsa Studio (usekarsa.co). Seluruh hak cipta dilindungi undang-undang.</p>
      </div>

    </div>
  </main>

  {/* FOOTER */}
  <footer className="border-t-2 border-ink py-6 px-4 font-mono text-xs text-stone-600 bg-canvas brutal-grid">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
      <p className="font-bold">&copy; 2026 Karsa Studio. Built for High Performance Execution.</p>
      <div className="flex items-center gap-4 font-bold">
        <a className="hover:underline hover:text-ink" href="/privacy">Kebijakan Privasi</a>
        <a className="hover:underline hover:text-ink" href="/refund">Jaminan SLA</a>
        <a className="hover:underline hover:text-ink" href="/">Kembali ke Beranda</a>
      </div>
    </div>
  </footer>

  

    </div>
  );
}
