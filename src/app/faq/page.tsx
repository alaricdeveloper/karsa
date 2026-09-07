"use client";
import { useEffect, useRef } from "react";
import { Icon } from "@/components/Icon";

export default function Page() {

  const searchRef = useRef<HTMLInputElement>(null);

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

  useEffect(() => {
    const input = searchRef.current;
    if (!input) return;
    const filter = () => {
      const q = input.value.toLowerCase();
      const items = document.querySelectorAll("faqSearch");
      const navLinks = document.querySelectorAll("#faqGrid > a");
      items.forEach((section, idx) => {
        const t = (section.textContent ?? "").toLowerCase();
        const m = t.includes(q);
        (section as HTMLElement).style.display = m ? "block" : "none";
        if (navLinks.length && navLinks[idx]) (navLinks[idx] as HTMLElement).style.display = m ? "block" : "none";
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
      <Icon name="help-circle" className="w-3.5 h-3.5" /> PUSAT BANTUAN
    </span>
    <span className="truncate sm:overflow-visible text-ink font-bold">90 pertanyaan dalam 9 kategori layanan konten siap eksekusi Karsa Studio.</span>
  </div>

  {/* NAVIGATION HEADER */}
  <header className="border-b-2 border-ink bg-canvas/95 backdrop-blur-md sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
      
      {/* Brand Logo */}
      <a className="flex items-center space-x-2 group shrink-0" href="/">
        <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-ink group-hover:-translate-y-0.5 transition-transform">Karsa</span>
        <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-brutalYellow text-ink rounded font-bold">FAQ Hub</span>
      </a>

      {/* Navigation Actions */}
      <div className="flex items-center gap-2.5 sm:gap-3 text-xs font-mono font-bold">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">
          <span className="w-2 h-2 rounded-full bg-brutalGreen border border-ink animate-ping"></span>
          <span>Support: <strong className="text-ink">Online 08:00 - 22:00</strong></span>
        </div>
        <a className="btn-press inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-white text-ink rounded-xl font-bold transition" href="/">
          <Icon name="arrow-left" className="w-4 h-4" />
          <span className="hidden xs:inline">Kembali ke Beranda</span>
          <span className="xs:hidden">Beranda</span>
        </a>
        <button type="button" data-action="open-modal" className="btn-press hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 bg-brutalYellow text-ink rounded-xl font-bold transition">
          <Icon name="plus" className="w-4 h-4" />
          <span>Order Batch (Rp299k)</span>
        </button>
      </div>

    </div>
  </header>

  {/* MARQUEE STRIP */}
  <div className="py-3 sm:py-3.5 border-b-2 border-ink bg-brutalYellow overflow-hidden relative">
    <div className="flex items-center gap-3 px-4 max-w-7xl mx-auto">
      <div className="marquee-track flex gap-8 font-mono text-xs sm:text-sm font-bold text-ink uppercase tracking-wider whitespace-nowrap shrink-0 items-center">
        <span className="flex items-center gap-1.5"><Icon name="help-circle" className="w-4 h-4 text-ink" /> 90 FAQ Terstruktur</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="clock" className="w-4 h-4 text-ink" /> SLA 24 Jam Kerja</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="refresh-cw" className="w-4 h-4 text-ink" /> Kalibrasi 48 Jam</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="tag" className="w-4 h-4 text-ink" /> Flat Rp299.000 Sekali Bayar</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="help-circle" className="w-4 h-4 text-ink" /> 90 FAQ Terstruktur</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="clock" className="w-4 h-4 text-ink" /> SLA 24 Jam Kerja</span>
      </div>
    </div>
  </div>

  {/* MAIN FAQ DIRECTORY CONTENT */}
  <main id="main-content" className="flex-1 py-10 sm:py-16 brutal-grid relative overflow-hidden">
    
    {/* Floating Geometry */}
    <div className="hidden lg:flex absolute top-12 right-12 w-24 h-24 bg-brutalYellow text-ink items-center justify-center font-display font-extrabold text-xs uppercase text-center p-2 rotate-12 z-0 brutal-star border-2 border-ink shadow-brutal pointer-events-none">
      90<br />JAWABAN
    </div>
    <div className="absolute top-1/3 left-6 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="absolute bottom-1/4 right-8 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✦</div>

    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 relative z-10">
      
      {/* Protected Hero Plaque to Guarantee Legibility */}
      <section className="hero-plaque p-6 sm:p-10 space-y-4 text-center">
        <div className="inline-flex items-center gap-2 badge-brutal bg-brutalYellow px-3.5 py-1 rounded-lg text-xs font-mono font-bold text-ink mx-auto">
          <Icon name="compass" className="w-4 h-4 text-ink" />
          <span>PUSAT PENGETAHUAN & DIREKTORI FAQ</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-ink tracking-tight leading-[1.15]">
          Pilih Kategori Pertanyaan <br className="hidden sm:inline" />
          <span className="bg-brutalYellow text-ink px-3 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">Seputar Layanan Karsa</span>
        </h1>

        <p className="text-xs sm:text-base text-stone-800 font-sans max-w-2xl mx-auto leading-relaxed font-medium pt-1">
          90 pertanyaan terinci dalam 9 kelompok bahasan — temukan jawaban tuntas seputar harga, SLA 24 jam, proses kalibrasi, hak cipta, hingga detail naskah harian.
        </p>

        {/* Live FAQ Filter Search Bar */}
        <div className="max-w-md mx-auto pt-3 relative">
          <Icon name="search" className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-stone-500" />
          <input type="text" id="faqSearch" ref={searchRef} placeholder="Cari topik: revisi, harga, script, SLA, tone..." className="w-full bg-white border-2 border-ink rounded-2xl pl-11 pr-4 py-3 text-xs sm:text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink font-mono shadow-brutal transition min-h-[46px]" />
        </div>
      </section>

      {/* 9 Categories Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5" id="faqGrid">
        
        {/* Category 1: Umum */}
        <a href="/faq/umum" className="faq-category-card bento-card rounded-3xl p-6 bg-white flex flex-col justify-between gap-4 group">
          <div>
            <div className="flex items-start justify-between gap-3">
              <span className="w-11 h-11 rounded-2xl bg-brutalYellow border-2 border-ink flex items-center justify-center shadow-brutal-sm group-hover:rotate-6 transition-transform">
                <Icon name="package" className="w-5 h-5 text-ink" />
              </span>
              <span className="badge-brutal text-[10px] font-mono font-bold px-2.5 py-0.5 bg-canvas text-ink rounded-full">15 FAQ</span>
            </div>
            <h2 className="font-display font-extrabold text-lg text-ink mt-3 group-hover:underline">Umum & Deliverable</h2>
            <p className="text-xs text-stone-600 font-sans mt-1 leading-relaxed">
              Format berkas, hak cipta 100%, bahasa, tone of voice, privasi NDA, dan akses ke Notion OS.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-ink mt-2">
            <span>Buka Kategori</span>
            <Icon name="arrow-up-right" className="w-3.5 h-3.5" />
          </span>
        </a>

        {/* Category 2: Harga */}
        <a href="/faq/harga" className="faq-category-card bento-card rounded-3xl p-6 bg-white flex flex-col justify-between gap-4 group">
          <div>
            <div className="flex items-start justify-between gap-3">
              <span className="w-11 h-11 rounded-2xl bg-brutalGreen border-2 border-ink flex items-center justify-center shadow-brutal-sm group-hover:rotate-6 transition-transform">
                <Icon name="wallet" className="w-5 h-5 text-ink" />
              </span>
              <span className="badge-brutal text-[10px] font-mono font-bold px-2.5 py-0.5 bg-canvas text-ink rounded-full">17 FAQ</span>
            </div>
            <h2 className="font-display font-extrabold text-lg text-ink mt-3 group-hover:underline">Harga & Pembayaran</h2>
            <p className="text-xs text-stone-600 font-sans mt-1 leading-relaxed">
              Biaya flat Rp299k, QRIS & VA, invoice resmi, tanpa langganan otomatis, dan penghematan biaya.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-ink mt-2">
            <span>Buka Kategori</span>
            <Icon name="arrow-up-right" className="w-3.5 h-3.5" />
          </span>
        </a>

        {/* Category 3: SLA */}
        <a href="/faq/sla" className="faq-category-card bento-card rounded-3xl p-6 bg-white flex flex-col justify-between gap-4 group">
          <div>
            <div className="flex items-start justify-between gap-3">
              <span className="w-11 h-11 rounded-2xl bg-brutalCyan border-2 border-ink flex items-center justify-center shadow-brutal-sm group-hover:rotate-6 transition-transform">
                <Icon name="clock" className="w-5 h-5 text-ink" />
              </span>
              <span className="badge-brutal text-[10px] font-mono font-bold px-2.5 py-0.5 bg-canvas text-ink rounded-full">9 FAQ</span>
            </div>
            <h2 className="font-display font-extrabold text-lg text-ink mt-3 group-hover:underline">SLA & Pengiriman</h2>
            <p className="text-xs text-stone-600 font-sans mt-1 leading-relaxed">
              Penghitungan 24 jam kerja, hari libur, validasi brief, notifikasi serah terima, dan link Notion.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-ink mt-2">
            <span>Buka Kategori</span>
            <Icon name="arrow-up-right" className="w-3.5 h-3.5" />
          </span>
        </a>

        {/* Category 4: Revisi & Garansi */}
        <a href="/faq/revisi" className="faq-category-card bento-card rounded-3xl p-6 bg-white flex flex-col justify-between gap-4 group">
          <div>
            <div className="flex items-start justify-between gap-3">
              <span className="w-11 h-11 rounded-2xl bg-brutalPink border-2 border-ink flex items-center justify-center shadow-brutal-sm group-hover:rotate-6 transition-transform">
                <Icon name="shield-check" className="w-5 h-5 text-ink" />
              </span>
              <span className="badge-brutal text-[10px] font-mono font-bold px-2.5 py-0.5 bg-canvas text-ink rounded-full">11 FAQ</span>
            </div>
            <h2 className="font-display font-extrabold text-lg text-ink mt-3 group-hover:underline">Revisi & Garansi</h2>
            <p className="text-xs text-stone-600 font-sans mt-1 leading-relaxed">
              Jendela kalibrasi 48 jam, batasan revisi nada bicara, kurasi QC copywriter, dan kompensasi SLA.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-ink mt-2">
            <span>Buka Kategori</span>
            <Icon name="arrow-up-right" className="w-3.5 h-3.5" />
          </span>
        </a>

        {/* Category 5: Script TikTok */}
        <a href="/faq/tiktok" className="faq-category-card bento-card rounded-3xl p-6 bg-white flex flex-col justify-between gap-4 group">
          <div>
            <div className="flex items-start justify-between gap-3">
              <span className="w-11 h-11 rounded-2xl bg-brutalYellow border-2 border-ink flex items-center justify-center shadow-brutal-sm group-hover:rotate-6 transition-transform">
                <Icon name="clapperboard" className="w-5 h-5 text-ink" />
              </span>
              <span className="badge-brutal text-[10px] font-mono font-bold px-2.5 py-0.5 bg-canvas text-ink rounded-full">8 FAQ</span>
            </div>
            <h2 className="font-display font-extrabold text-lg text-ink mt-3 group-hover:underline">Jasa Script Video TikTok</h2>
            <p className="text-xs text-stone-600 font-sans mt-1 leading-relaxed">
              Format 9:16 durasi 15-30s, shot-list B-roll kamera HP, teleprompter, dan hook retensi tinggi.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-ink mt-2">
            <span>Buka Kategori</span>
            <Icon name="arrow-up-right" className="w-3.5 h-3.5" />
          </span>
        </a>

        {/* Category 6: Video UMKM */}
        <a href="/faq/video" className="faq-category-card bento-card rounded-3xl p-6 bg-white flex flex-col justify-between gap-4 group">
          <div>
            <div className="flex items-start justify-between gap-3">
              <span className="w-11 h-11 rounded-2xl bg-brutalGreen border-2 border-ink flex items-center justify-center shadow-brutal-sm group-hover:rotate-6 transition-transform">
                <Icon name="video" className="w-5 h-5 text-ink" />
              </span>
              <span className="badge-brutal text-[10px] font-mono font-bold px-2.5 py-0.5 bg-canvas text-ink rounded-full">7 FAQ</span>
            </div>
            <h2 className="font-display font-extrabold text-lg text-ink mt-3 group-hover:underline">Jasa Konten Video UMKM</h2>
            <p className="text-xs text-stone-600 font-sans mt-1 leading-relaxed">
              Perbedaan dengan jasa shooting lokasi, editing CapCut, kecocokan bisnis, dan funnel closing DM.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-ink mt-2">
            <span>Buka Kategori</span>
            <Icon name="arrow-up-right" className="w-3.5 h-3.5" />
          </span>
        </a>

        {/* Category 7: Content Creator (Current Context) */}
        <a href="/faq/creator" className="faq-category-card bento-card rounded-3xl p-6 bg-brutalYellow/30 flex flex-col justify-between gap-4 group shadow-brutal-lg">
          <div>
            <div className="flex items-start justify-between gap-3">
              <span className="w-11 h-11 rounded-2xl bg-ink text-brutalYellow border-2 border-ink flex items-center justify-center shadow-brutal-sm group-hover:rotate-6 transition-transform">
                <Icon name="users" className="w-5 h-5" />
              </span>
              <span className="badge-brutal text-[10px] font-mono font-bold px-2.5 py-0.5 bg-brutalYellow text-ink rounded-full">7 FAQ</span>
            </div>
            <h2 className="font-display font-extrabold text-lg text-ink mt-3 group-hover:underline">Jasa Content Creator</h2>
            <p className="text-xs text-stone-700 font-sans mt-1 leading-relaxed">
              Alternatif pengganti staf in-house, alur kolaborasi, konsultasi asinkron, dan materi ads berbayar.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-ink mt-2">
            <span>Buka Kategori</span>
            <Icon name="arrow-up-right" className="w-3.5 h-3.5" />
          </span>
        </a>

        {/* Category 8: SEO */}
        <a href="/faq/seo" className="faq-category-card bento-card rounded-3xl p-6 bg-white flex flex-col justify-between gap-4 group">
          <div>
            <div className="flex items-start justify-between gap-3">
              <span className="w-11 h-11 rounded-2xl bg-brutalCyan border-2 border-ink flex items-center justify-center shadow-brutal-sm group-hover:rotate-6 transition-transform">
                <Icon name="search" className="w-5 h-5 text-ink" />
              </span>
              <span className="badge-brutal text-[10px] font-mono font-bold px-2.5 py-0.5 bg-canvas text-ink rounded-full">8 FAQ</span>
            </div>
            <h2 className="font-display font-extrabold text-lg text-ink mt-3 group-hover:underline">Jasa Artikel SEO</h2>
            <p className="text-xs text-stone-600 font-sans mt-1 leading-relaxed">
              Jumlah artikel, riset search intent pembeli, struktur H1-H3, publikasi blog, dan indexing Google.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-ink mt-2">
            <span>Buka Kategori</span>
            <Icon name="arrow-up-right" className="w-3.5 h-3.5" />
          </span>
        </a>

        {/* Category 9: Instagram */}
        <a href="/faq/ig" className="faq-category-card bento-card rounded-3xl p-6 bg-white flex flex-col justify-between gap-4 group">
          <div>
            <div className="flex items-start justify-between gap-3">
              <span className="w-11 h-11 rounded-2xl bg-brutalPink border-2 border-ink flex items-center justify-center shadow-brutal-sm group-hover:rotate-6 transition-transform">
                <Icon name="camera" className="w-5 h-5 text-ink" />
              </span>
              <span className="badge-brutal text-[10px] font-mono font-bold px-2.5 py-0.5 bg-canvas text-ink rounded-full">8 FAQ</span>
            </div>
            <h2 className="font-display font-extrabold text-lg text-ink mt-3 group-hover:underline">Paket Konten Instagram</h2>
            <p className="text-xs text-stone-600 font-sans mt-1 leading-relaxed">
              Optimasi bio & highlight, frekuensi posting Reels, caption AIDA, dan repurposing ke story/status.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-ink mt-2">
            <span>Buka Kategori</span>
            <Icon name="arrow-up-right" className="w-3.5 h-3.5" />
          </span>
        </a>

      </div>

      {/* Bottom WhatsApp Support Plaque */}
      <section className="bento-card p-6 sm:p-8 rounded-3xl bg-brutalYellow text-center space-y-3 shadow-brutal-lg">
        <span className="badge-brutal px-3 py-1 rounded-lg text-xs font-mono font-bold bg-ink text-brutalYellow uppercase">Live Assistance</span>
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-ink">Belum Menemukan Jawaban yang Dicari?</h2>
        <p className="text-xs sm:text-sm text-stone-800 font-sans max-w-lg mx-auto leading-relaxed font-medium">
          Tim operasional Karsa siap berdiskusi langsung mengenai kecocokan format naskah untuk kategori bisnismu via WhatsApp.
        </p>
        <div className="pt-2">
          <a href="https://wa.me/6281288009920?text=Halo%20Karsa%2C%20saya%20mau%20tanya%20seputar%20paket%20konten" target="_blank" rel="noopener noreferrer" className="btn-press inline-flex items-center gap-2 px-6 py-3.5 bg-ink text-brutalYellow hover:bg-white hover:text-ink font-mono text-xs sm:text-sm font-bold rounded-xl transition">
            <Icon name="message-circle" className="w-4 h-4 text-brutalYellow" />
            <span>Chat Tim Karsa Sekarang</span>
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
          <textarea id="inputDesc" rows={3} required placeholder="Jelaskan produk unggulan, harga, dan target pembeli utama kamu..." className="w-full bg-canvas border-2 border-ink rounded-xl px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink font-sans"></textarea>
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
