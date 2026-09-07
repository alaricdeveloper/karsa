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

  useEffect(() => {
    const summaries = document.querySelectorAll(".bento-card summary");
    const handlers: Array<[Element, () => void]> = [];
    summaries.forEach((summary) => {
      const h = () => {
        const details = summary.parentElement;
        const icon = summary.querySelector("span.font-mono");
        if (details && icon) {
          icon.style.transform = (details as HTMLDetailsElement).open ? "rotate(0deg)" : "rotate(45deg)";
        }
      };
      summary.addEventListener("click", h);
      handlers.push([summary, h]);
    });
    return () => handlers.forEach(([el, h]) => el.removeEventListener("click", h));
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">


  {/* TOP PROMO TICKER */}
  <div className="bg-brutalYellow text-ink text-[11px] sm:text-xs font-mono py-2.5 px-3 text-center tracking-tight border-b-2 border-ink flex items-center justify-center gap-2 font-bold relative z-30">
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-ink text-brutalYellow text-[10px] uppercase font-mono font-black border border-ink shadow-brutal-sm shrink-0">
      <Icon name="help-circle" className="w-3.5 h-3.5" /> FAQ PUSAT BANTUAN
    </span>
    <span className="truncate sm:overflow-visible text-ink font-bold">Semua jawaban seputar model kerja, biaya, dan hasil jasa content creator Karsa Studio.</span>
  </div>

  {/* NAVIGATION HEADER */}
  <header className="border-b-2 border-ink bg-canvas/95 backdrop-blur-md sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
      
      {/* Brand Logo */}
      <a className="flex items-center space-x-2 group shrink-0" href="../index.html">
        <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-ink group-hover:-translate-y-0.5 transition-transform">Karsa</span>
        <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-brutalGreen text-ink rounded font-bold">FAQ Hub</span>
      </a>

      {/* Navigation Actions */}
      <div className="flex items-center gap-2.5 sm:gap-3 text-xs font-mono font-bold">
        <a className="btn-press inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-white text-ink rounded-xl font-bold transition" href="../faq.html">
          <Icon name="arrow-left" className="w-4 h-4" />
          <span className="hidden xs:inline">Semua Kategori FAQ</span>
          <span className="xs:hidden">Kategori</span>
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
        <span className="flex items-center gap-1.5"><Icon name="help-circle" className="w-4 h-4 text-ink" /> 7 Pertanyaan Creator Terjawab</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="check-circle-2" className="w-4 h-4 text-ink" /> Tanpa Gaji Bulanan</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="clock" className="w-4 h-4 text-ink" /> SLA 24 Jam Kerja</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="refresh-cw" className="w-4 h-4 text-ink" /> Garansi Kalibrasi 48 Jam</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="help-circle" className="w-4 h-4 text-ink" /> 7 Pertanyaan Creator Terjawab</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="check-circle-2" className="w-4 h-4 text-ink" /> Tanpa Gaji Bulanan</span>
      </div>
    </div>
  </div>

  {/* MAIN FAQ CONTENT */}
  <main id="main-content" className="flex-1 py-10 sm:py-16 brutal-dots relative overflow-hidden">
    
    {/* Floating Geometry */}
    <div className="hidden lg:flex absolute top-12 right-12 w-24 h-24 bg-brutalYellow text-ink items-center justify-center font-display font-extrabold text-xs uppercase text-center p-2 rotate-12 z-0 brutal-star border-2 border-ink shadow-brutal pointer-events-none">
      7 FAQ<br />KREATOR
    </div>
    <div className="absolute top-1/3 left-6 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="absolute bottom-1/4 right-8 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✦</div>

    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 relative z-10">
      
      {/* Back Link */}
      <a href="../faq.html" className="btn-press inline-flex items-center gap-2 px-3.5 py-1.5 bg-white text-ink rounded-xl font-mono text-xs font-bold transition">
        <Icon name="arrow-left" className="w-3.5 h-3.5" />
        <span>Kembali ke Indeks FAQ</span>
      </a>

      {/* Protected Hero Plaque to Eliminate Dot Distraction behind text */}
      <section className="hero-plaque p-6 sm:p-10 space-y-4">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="badge-brutal text-[10px] uppercase font-bold px-2.5 py-1 bg-brutalGreen text-ink rounded-lg">
            7 Pertanyaan Terpilih
          </span>
          <span className="badge-brutal text-[10px] uppercase font-bold px-2.5 py-1 bg-brutalYellow text-ink rounded-lg">
            Kategori: Content Creator
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-ink tracking-tight leading-[1.15]">
          FAQ Jasa Content Creator UMKM — <br className="hidden sm:inline" />
          <span className="bg-brutalYellow text-ink px-3 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">Tanya Jawab Model & Operasional</span>
        </h1>

        <p className="text-xs sm:text-base text-stone-800 font-sans max-w-3xl leading-relaxed font-medium pt-1">
          Segala hal yang perlu kamu ketahui mengenai model alternatif pengganti content creator full-time: dari perbandingan biaya gaji, siapa yang merekam, hak cipta materi, hingga alur kerja serah terima Notion OS.
        </p>
      </section>

      {/* 7 Accordion Questions List */}
      <div className="space-y-4">
        
        {/* FAQ 1 */}
        <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group" open>
          <summary className="flex justify-between items-center gap-3 font-display font-bold text-sm sm:text-base text-ink">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-brutalYellow border border-ink flex items-center justify-center font-mono font-black text-xs shrink-0">01</span>
              <span>Berapa biaya content creator per bulan dibanding sistem Karsa?</span>
            </div>
            <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform shrink-0">+</span>
          </summary>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-10 leading-relaxed font-sans border-t-2 border-sand pt-3">
            Merekrut content creator in-house di Indonesia rata-rata membutuhkan anggaran Rp3.500.000 hingga Rp8.000.000 per bulan (belum termasuk tunjangan, BPJS, dan laptop). Bersama Karsa Studio, kamu cukup membayar flat Rp299.000 per batch 30 hari sekali bayar tanpa ikatan gaji bulanan.
          </p>
        </details>

        {/* FAQ 2 */}
        <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
          <summary className="flex justify-between items-center gap-3 font-display font-bold text-sm sm:text-base text-ink">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-brutalCyan border border-ink flex items-center justify-center font-mono font-black text-xs shrink-0">02</span>
              <span>Siapa yang bertugas merekam dan menjadi talent videonya?</span>
            </div>
            <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform shrink-0">+</span>
          </summary>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-10 leading-relaxed font-sans border-t-2 border-sand pt-3">
            Perekaman dilakukan oleh kamu sendiri atau staf tokomu dengan kamera ponsel biasa. Setiap naskah dari Karsa sudah memuat instruksi gestur visual, cue intonasi bicara per baris, dan daftar B-roll terperinci sehingga siapa pun bisa merekamnya dengan percaya diri tanpa pengalaman modeling.
          </p>
        </details>

        {/* FAQ 3 */}
        <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
          <summary className="flex justify-between items-center gap-3 font-display font-bold text-sm sm:text-base text-ink">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-brutalGreen border border-ink flex items-center justify-center font-mono font-black text-xs shrink-0">03</span>
              <span>Apakah saya bisa tetap berkonsultasi mengenai persona brand saya?</span>
            </div>
            <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform shrink-0">+</span>
          </summary>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-10 leading-relaxed font-sans border-t-2 border-sand pt-3">
            Tentu saja. Setiap pesanan dilindungi oleh garansi kalibrasi 48 jam gratis. Kamu bebas mendiskusikan penyesuaian gaya bahasa, sapaan audiens, dan istilah teknis produk melalui WhatsApp tim operasional kami.
          </p>
        </details>

        {/* FAQ 4 */}
        <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
          <summary className="flex justify-between items-center gap-3 font-display font-bold text-sm sm:text-base text-ink">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-brutalPink border border-ink flex items-center justify-center font-mono font-black text-xs shrink-0">04</span>
              <span>Apakah sistem Karsa ini menggantikan content creator full-time?</span>
            </div>
            <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform shrink-0">+</span>
          </summary>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-10 leading-relaxed font-sans border-t-2 border-sand pt-3">
            Untuk kebutuhan riset ide, penulisan hook retensi, caption AIDA, dan perencanaan editorial bulanan: ya, ini adalah pengganti yang jauh lebih terukur dan murah. Kamu hanya membutuhkan waktu sekitar 1-2 jam per minggu untuk mengeksekusi rekaman secara batch.
          </p>
        </details>

        {/* FAQ 5 */}
        <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
          <summary className="flex justify-between items-center gap-3 font-display font-bold text-sm sm:text-base text-ink">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-sand border border-ink flex items-center justify-center font-mono font-black text-xs shrink-0">05</span>
              <span>Apakah ada sesi konsultasi terstruktur di dalam paket?</span>
            </div>
            <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform shrink-0">+</span>
          </summary>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-10 leading-relaxed font-sans border-t-2 border-sand pt-3">
            Konsultasi asinkron berlangsung via WhatsApp selama pengerjaan batch. Selain itu, laporan audit celah 1 akun kompetitor dan blueprint 4 pilar sudut pesan sudah disematkan langsung di dalam workspace Notion tokomu.
          </p>
        </details>

        {/* FAQ 6 */}
        <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
          <summary className="flex justify-between items-center gap-3 font-display font-bold text-sm sm:text-base text-ink">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-brutalYellow border border-ink flex items-center justify-center font-mono font-black text-xs shrink-0">06</span>
              <span>Bagaimana alur kolaborasi dari awal hingga serah terima?</span>
            </div>
            <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform shrink-0">+</span>
          </summary>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-10 leading-relaxed font-sans border-t-2 border-sand pt-3">
            Alurnya sangat praktis: Isi formulir brief singkat (3 menit) &rarr; tim Karsa memproses dalam kurun waktu 1x24 jam kerja &rarr; terima link Notion Content OS & Google Docs &rarr; rekam & jadwalkan tayang. Kamu punya waktu 48 jam untuk meminta penyesuaian jika diperlukan.
          </p>
        </details>

        {/* FAQ 7 */}
        <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
          <summary className="flex justify-between items-center gap-3 font-display font-bold text-sm sm:text-base text-ink">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-brutalGreen border border-ink flex items-center justify-center font-mono font-black text-xs shrink-0">07</span>
              <span>Apakah naskah kontennya bisa dipakai untuk materi iklan berbayar (Ads)?</span>
            </div>
            <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform shrink-0">+</span>
          </summary>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-10 leading-relaxed font-sans border-t-2 border-sand pt-3">
            Sangat bisa. Seluruh hak cipta materi dialihkan 100% secara mutlak kepadamu. Naskah yang memiliki performa organik tinggi dapat langsung kamu boost menjadi iklan berbayar di TikTok Ads maupun Meta Ads tanpa royalti tambahan.
          </p>
        </details>

      </div>

      {/* Horizontal Scroll Category Chips */}
      <div className="pt-6 border-t-2 border-ink space-y-3">
        <p className="text-xs font-mono font-bold text-stone-600 uppercase tracking-wider">Jelajahi Kategori FAQ Lainnya:</p>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          <a href="../faq.html" className="btn-press shrink-0 px-3.5 py-2 bg-white text-ink rounded-xl font-mono text-xs font-bold border-2 border-ink">Semua Topik</a>
          <a href="../harga.html" className="btn-press shrink-0 px-3.5 py-2 bg-white text-ink rounded-xl font-mono text-xs font-bold border-2 border-ink">Harga & Pembayaran</a>
          <a href="../refund.html" className="btn-press shrink-0 px-3.5 py-2 bg-white text-ink rounded-xl font-mono text-xs font-bold border-2 border-ink">SLA & Garansi</a>
          <a href="../jasa-script-video-tiktok.html" className="btn-press shrink-0 px-3.5 py-2 bg-white text-ink rounded-xl font-mono text-xs font-bold border-2 border-ink">Script TikTok</a>
          <a href="../jasa-konten-video-umkm.html" className="btn-press shrink-0 px-3.5 py-2 bg-white text-ink rounded-xl font-mono text-xs font-bold border-2 border-ink">Video UMKM</a>
          <a href="../jasa-artikel-seo.html" className="btn-press shrink-0 px-3.5 py-2 bg-white text-ink rounded-xl font-mono text-xs font-bold border-2 border-ink">Artikel SEO</a>
          <a href="../paket-konten-instagram.html" className="btn-press shrink-0 px-3.5 py-2 bg-white text-ink rounded-xl font-mono text-xs font-bold border-2 border-ink">Instagram Reels</a>
        </div>
      </div>

      {/* Bottom WhatsApp Support Plaque */}
      <section className="bento-card p-6 sm:p-8 rounded-3xl bg-brutalYellow text-center space-y-3 shadow-brutal-lg">
        <span className="badge-brutal px-3 py-1 rounded-lg text-xs font-mono font-bold bg-ink text-brutalYellow uppercase">Live Assistance</span>
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-ink">Masih Memiliki Pertanyaan Lain?</h2>
        <p className="text-xs sm:text-sm text-stone-800 font-sans max-w-lg mx-auto leading-relaxed font-medium">
          Tim operasional Karsa siap berdiskusi langsung mengenai kecocokan format naskah untuk kategori tokomu.
        </p>
        <div className="pt-2">
          <a href="https://wa.me/6281288009920?text=Halo%20Karsa%2C%20saya%20mau%20tanya%20seputar%20jasa%20content%20creator" target="_blank" rel="noopener noreferrer" className="btn-press inline-flex items-center gap-2 px-6 py-3.5 bg-ink text-brutalYellow hover:bg-white hover:text-ink font-mono text-xs sm:text-sm font-bold rounded-xl transition">
            <Icon name="message-circle" className="w-4 h-4 text-brutalYellow" />
            <span>Chat WhatsApp Tim Karsa</span>
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
