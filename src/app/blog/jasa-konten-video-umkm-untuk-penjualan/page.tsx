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
      <Icon name="trending-up" className="w-3.5 h-3.5" /> FUNNEL PENJUALAN
    </span>
    <span className="truncate sm:overflow-visible text-ink font-bold">Panduan membangun alur konversi video pendek menjadi transaksi DM untuk UMKM.</span>
  </div>

  {/* NAVIGATION HEADER */}
  <header className="border-b-2 border-ink bg-canvas/95 backdrop-blur-md sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
      
      {/* Brand Logo */}
      <a className="flex items-center space-x-2 group shrink-0" href="/">
        <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-ink group-hover:-translate-y-0.5 transition-transform">Karsa</span>
        <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-brutalGreen text-ink rounded font-bold">Video Sales</span>
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
        <span className="flex items-center gap-1.5"><Icon name="message-circle" className="w-4 h-4 text-ink" /> DM Adalah Aset Terbesar</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="video" className="w-4 h-4 text-ink" /> 4 Fase Kalender 30 Hari</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="pie-chart" className="w-4 h-4 text-ink" /> Rasio Feed Sehat</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="check" className="w-4 h-4 text-ink" /> Konsistensi Mengalahkan Viral</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="message-circle" className="w-4 h-4 text-ink" /> DM Adalah Aset Terbesar</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="video" className="w-4 h-4 text-ink" /> 4 Fase Kalender 30 Hari</span>
      </div>
    </div>
  </div>

  {/* ARTICLE CONTENT */}
  <main id="main-content" className="flex-1 py-10 sm:py-16 brutal-dots relative overflow-hidden">
    
    {/* Floating Geometry */}
    <div className="hidden lg:flex absolute top-12 right-12 w-24 h-24 bg-brutalYellow text-ink items-center justify-center font-display font-extrabold text-xs uppercase text-center p-2 rotate-12 z-0 brutal-star border-2 border-ink shadow-brutal pointer-events-none">
      CLOSING<br />FUNNEL
    </div>
    <div className="absolute top-1/3 left-6 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="absolute bottom-1/4 right-8 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✦</div>

    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 relative z-10">
      
      {/* Protected Article Header Plaque to Guarantee Contrast */}
      <section className="hero-plaque p-6 sm:p-10 space-y-4">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="badge-brutal text-[10px] uppercase font-bold px-2.5 py-1 bg-brutalGreen text-ink rounded-lg">
            Konten Video Penjualan
          </span>
          <span className="text-stone-600 font-bold">• 8 Menit Baca</span>
          <span className="text-stone-600 font-bold">• Strategi Konversi 2026</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-ink tracking-tight leading-[1.15]">
          Jasa Konten Video UMKM: <br className="hidden sm:inline" />
          Cara Mengubah 30 Video <span className="bg-brutalYellow text-ink px-3 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">Menjadi Penjualan Nyata</span>
        </h1>

        <p className="text-xs sm:text-base text-stone-800 font-sans max-w-3xl leading-relaxed font-medium pt-1">
          Banyak UMKM sudah rajin mengunggah video setiap hari, namun angka omzet penjualan tidak bergerak naik. Masalahnya bukan pada frekuensi posting, melainkan ketiadaan alur yang memandu penonton dari sekadar menonton hingga menghubungi kasir atau DM tokomu. Artikel ini membedah struktur kalender 30 hari yang terbukti menghasilkan transaksi.
        </p>
      </section>

      {/* Step-by-Step Breakdown Article Card */}
      <article className="bento-card p-6 sm:p-10 rounded-3xl bg-white space-y-8">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
            <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">PROBLEM AUDIT</span>
            <span>•</span>
            <span className="uppercase">Evaluasi Kesalahan</span>
          </div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-ink">Mengapa Konten Video UMKM Sering Gagal Menjual?</h2>
          <p className="text-stone-700 font-sans text-xs sm:text-sm leading-relaxed">
            Mayoritas akun bisnis terjebak pada tiga lubang hitam yang sama:
          </p>

          <div className="space-y-3 pt-2 font-sans text-xs sm:text-sm text-stone-700">
            <div className="p-4 bg-canvas rounded-2xl border-2 border-ink space-y-1">
              <strong className="text-ink font-bold block text-sm">1. Feed Berisi Brosur Iklan Melulu</strong>
              <p className="leading-relaxed">
                Audiens membuka TikTok atau Reels untuk mencari hiburan atau solusi, bukan untuk ditodong promo setiap detik. Saat feed penuh katalog kaku, engagement anjlok drastis.
              </p>
            </div>
            <div className="p-4 bg-canvas rounded-2xl border-2 border-ink space-y-1">
              <strong className="text-ink font-bold block text-sm">2. Posting Sporadis Tanpa Sinyal Algoritma</strong>
              <p className="leading-relaxed">
                Posting seminggu sekali dengan tema yang melompat-lompat membuat algoritma gagal mengidentifikasi siapa audiens ideal produk tokomu.
              </p>
            </div>
            <div className="p-4 bg-canvas rounded-2xl border-2 border-ink space-y-1">
              <strong className="text-ink font-bold block text-sm">3. Video Menggantung Tanpa Call To Action (CTA)</strong>
              <p className="leading-relaxed">
                Penonton yang sebenarnya tertarik tidak tahu harus melangkah ke mana karena video berakhir begitu saja tanpa instruksi jelas untuk mengirim pesan atau klik bio.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: 4 Fase Kalender */}
        <section className="space-y-4 pt-4 border-t-2 border-ink">
          <div>
            <span className="badge-brutal px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-brutalCyan text-ink uppercase">Blueprint Karsa</span>
            <h2 className="font-display font-extrabold text-xl sm:text-2xl text-ink mt-1">4 Fase Kalender Konten 30 Hari yang Menjual</h2>
          </div>
          <p className="text-stone-700 font-sans text-xs sm:text-sm leading-relaxed">
            Kalender 30 hari yang efektif bukanlah tumpukan ide acak, melainkan sebuah rantai perjalanan audiens:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono text-xs">
            
            <div className="p-5 bg-canvas rounded-2xl border-2 border-ink space-y-1.5 shadow-brutal-sm">
              <span className="badge-brutal inline-block px-2 py-0.5 rounded bg-brutalYellow text-ink font-bold text-[10px]">Fase 01 (Hari 1-7)</span>
              <h3 className="font-display font-bold text-base text-ink">Kenalkan Masalah Utama</h3>
              <p className="text-stone-700 font-sans text-xs leading-relaxed">
                Membahas keresahan konsumen, mitos yang keliru, dan rasa sakit yang sering dialami audiens agar mereka merasa: <em>"Ini masalah yang sedang saya alami."</em>
              </p>
            </div>

            <div className="p-5 bg-canvas rounded-2xl border-2 border-ink space-y-1.5 shadow-brutal-sm">
              <span className="badge-brutal inline-block px-2 py-0.5 rounded bg-canvas text-ink font-bold text-[10px]">Fase 02 (Hari 8-14)</span>
              <h3 className="font-display font-bold text-base text-ink">Bangun Kepercayaan Brand</h3>
              <p className="text-stone-700 font-sans text-xs leading-relaxed">
                Edukasi mendalam, proses dapur di balik layar, uji kualitas bahan, dan perbandingan logis yang membuktikan keahlian tokomu.
              </p>
            </div>

            <div className="p-5 bg-canvas rounded-2xl border-2 border-ink space-y-1.5 shadow-brutal-sm">
              <span className="badge-brutal inline-block px-2 py-0.5 rounded bg-brutalCyan text-ink font-bold text-[10px]">Fase 03 (Hari 15-22)</span>
              <h3 className="font-display font-bold text-base text-ink">Tunjukkan Solusi Nyata</h3>
              <p className="text-stone-700 font-sans text-xs leading-relaxed">
                Demonstrasi produk, testimoni autentik pelanggan pertama, dan menjawab keraguan yang paling sering ditanyakan calon pembeli.
              </p>
            </div>

            <div className="p-5 bg-canvas rounded-2xl border-2 border-ink space-y-1.5 shadow-brutal-sm">
              <span className="badge-brutal inline-block px-2 py-0.5 rounded bg-brutalGreen text-ink font-bold text-[10px]">Fase 04 (Hari 23-30)</span>
              <h3 className="font-display font-bold text-base text-ink">Arahkan Aksi Transaksi</h3>
              <p className="text-stone-700 font-sans text-xs leading-relaxed">
                Penawaran khusus, pengingat sisa stok batch, dan arahan tegas menuju percakapan DM atau tautan pembelian langsung.
              </p>
            </div>

          </div>
        </section>

        {/* Section 3: DM Asset & Pillar Ratio */}
        <section className="space-y-4 pt-4 border-t-2 border-ink">
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-ink">DM Adalah Aset Penjualan Terbesar UMKM</h2>
          <p className="text-stone-700 font-sans text-xs sm:text-sm leading-relaxed">
            Setiap video sebaiknya diarahkan untuk memicu percakapan personal. Calon pembeli yang berinteraksi di DM memiliki rasio penutupan transaksi (*closing rate*) berkali-kali lipat lebih tinggi dibandingkan sekadar angka views pasif.
          </p>

          <div className="p-5 bg-canvas rounded-2xl border-2 border-ink space-y-3 shadow-brutal-sm">
            <span className="font-mono text-xs uppercase font-bold text-ink block">Rasio 4 Pilar Feed Sehat Karsa:</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
              <div className="p-3 bg-white rounded-xl border border-ink text-center">
                <span className="font-display font-black text-lg text-ink block">40%</span>
                <span className="text-[10px] text-stone-600 font-bold">Edukasi Solusi</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-ink text-center">
                <span className="font-display font-black text-lg text-ink block">30%</span>
                <span className="text-[10px] text-stone-600 font-bold">Storytelling</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-ink text-center">
                <span className="font-display font-black text-lg text-ink block">15%</span>
                <span className="text-[10px] text-stone-600 font-bold">Penawaran</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-ink text-center">
                <span className="font-display font-black text-lg text-ink block">15%</span>
                <span className="text-[10px] text-stone-600 font-bold">Mitos vs Fakta</span>
              </div>
            </div>
          </div>
        </section>

      </article>

      {/* Bottom Integrated Conversion Plaque */}
      <section className="bento-card p-8 sm:p-10 rounded-3xl bg-brutalYellow text-center space-y-4 shadow-brutal-lg">
        <span className="badge-brutal px-3.5 py-1 rounded-lg text-xs font-mono font-bold bg-ink text-brutalYellow uppercase">Eksekusi Cepat</span>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-ink leading-tight">
          Butuh 30 Hari Konten yang Langsung Bisa Dijalankan?
        </h2>
        <p className="text-xs sm:text-base text-stone-800 max-w-xl mx-auto font-medium font-sans">
          30 video scripts kata-per-kata, 30 caption AIDA, 4 artikel SEO, dan Notion Content OS siap dikirim dalam kurun waktu 1x24 jam kerja mulai dari Rp299.000.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button type="button" data-action="open-modal" data-pkg="Paket 1 Batch - Rp299.000" className="btn-press bg-ink text-brutalYellow hover:bg-white hover:text-ink px-8 py-4 rounded-2xl font-mono text-sm font-bold transition flex items-center gap-2">
            <span>Mulai Order Batch (Rp299.000)</span>
            <Icon name="arrow-right" className="w-4 h-4" />
          </button>
          <a href="https://wa.me/6281288009920?text=Halo%20Karsa%2C%20saya%20baca%20artikel%20video%20penjualan" target="_blank" rel="noopener noreferrer" className="btn-press bg-white hover:bg-canvas text-ink px-6 py-4 rounded-2xl font-mono text-sm font-bold transition flex items-center gap-2">
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
          Isi Brief Batch Konten Penjualan 30 Hari
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
