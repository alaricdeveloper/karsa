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
      <Icon name="help-circle" className="w-3.5 h-3.5" /> FAQ HARGA & PEMBAYARAN
    </span>
    <span className="truncate sm:overflow-visible text-ink font-bold">Jawaban detail seputar sistem sekali bayar Rp299k, metode QRIS/VA, invoice resmi, dan diskon batch.</span>
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
        <span className="flex items-center gap-1.5"><Icon name="wallet" className="w-4 h-4 text-ink" /> 17 FAQ Harga & Pembayaran</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="check-circle-2" className="w-4 h-4 text-ink" /> Flat Rp299.000 Tanpa Auto-Debit</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="qr-code" className="w-4 h-4 text-ink" /> QRIS & Virtual Account Instan</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="file-text" className="w-4 h-4 text-ink" /> Invoice & Faktur Resmi</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="wallet" className="w-4 h-4 text-ink" /> 17 FAQ Harga & Pembayaran</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="check-circle-2" className="w-4 h-4 text-ink" /> Flat Rp299.000 Tanpa Auto-Debit</span>
      </div>
    </div>
  </div>

  {/* MAIN FAQ CONTENT */}
  <main id="main-content" className="flex-1 py-10 sm:py-16 brutal-dots relative overflow-hidden">
    
    {/* Floating Geometry */}
    <div className="hidden lg:flex absolute top-12 right-12 w-24 h-24 bg-brutalYellow text-ink items-center justify-center font-display font-extrabold text-xs uppercase text-center p-2 rotate-12 z-0 brutal-star border-2 border-ink shadow-brutal pointer-events-none">
      17 FAQ<br />HARGA
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
            17 Pertanyaan Terpilih
          </span>
          <span className="badge-brutal text-[10px] uppercase font-bold px-2.5 py-1 bg-brutalYellow text-ink rounded-lg">
            Kategori: Harga & Pembayaran
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-ink tracking-tight leading-[1.15]">
          FAQ Harga & Pembayaran — <br className="hidden sm:inline" />
          <span className="bg-brutalYellow text-ink px-3 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">Biaya Transparan Tanpa Kejutan</span>
        </h1>

        <p className="text-xs sm:text-base text-stone-800 font-sans max-w-3xl leading-relaxed font-medium pt-1">
          Ketahui rincian skema biaya flat Rp299.000 per batch: tidak adanya pemotongan saldo otomatis, metode pembayaran QRIS/Virtual Account, penerbitan invoice resmi perusahaan, diskon paket multi-batch, hingga kebijakan garansi pengembalian dana.
        </p>
      </section>

      {/* 17 Accordion Questions List */}
      <div className="space-y-4">
        
        {/* FAQ 1 */}
        <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group" open>
          <summary className="flex justify-between items-center gap-3 font-display font-bold text-sm sm:text-base text-ink">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-brutalYellow border border-ink flex items-center justify-center font-mono font-black text-xs shrink-0">01</span>
              <span>Berapa lama waktu pengerjaan dari pengisian brief (SLA)?</span>
            </div>
            <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform shrink-0">+</span>
          </summary>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-10 leading-relaxed font-sans border-t-2 border-sand pt-3">
            Standar SLA pengiriman adalah maksimal 1x24 jam kerja. Waktu ini dialokasikan untuk membedah brief tokomu, meriset celah 1 akun kompetitor, menyusun 30 naskah kata-per-kata, dan melewati tahap kurasi kendali mutu sebelum tautan Notion dikirimkan.
          </p>
        </details>

        {/* FAQ 2 */}
        <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
          <summary className="flex justify-between items-center gap-3 font-display font-bold text-sm sm:text-base text-ink">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-brutalCyan border border-ink flex items-center justify-center font-mono font-black text-xs shrink-0">02</span>
              <span>Apakah ini sistem langganan yang memotong saldo otomatis setiap bulan?</span>
            </div>
            <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform shrink-0">+</span>
          </summary>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-10 leading-relaxed font-sans border-t-2 border-sand pt-3">
            Sama sekali bukan langganan dan tanpa auto-debit. Kamu hanya membayar flat Rp299.000 per batch saat membutuhkan pasokan kalender konten 30 hari yang baru. Tidak ada tagihan siluman di bulan berikutnya.
          </p>
        </details>

        {/* FAQ 3 */}
        <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
          <summary className="flex justify-between items-center gap-3 font-display font-bold text-sm sm:text-base text-ink">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-brutalGreen border border-ink flex items-center justify-center font-mono font-black text-xs shrink-0">03</span>
              <span>Metode pembayaran apa saja yang didukung di halaman checkout?</span>
            </div>
            <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform shrink-0">+</span>
          </summary>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-10 leading-relaxed font-sans border-t-2 border-sand pt-3">
            Kami menerima pembayaran instan otomatis via QRIS (BCA, Mandiri, BRI, BNI, GoPay, OVO, DANA, ShopeePay) serta Virtual Account bank-bank terkemuka di Indonesia. Konfirmasi pembayaran diverifikasi secara otomatis dalam hitungan detik.
          </p>
        </details>

        {/* FAQ 4 */}
        <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
          <summary className="flex justify-between items-center gap-3 font-display font-bold text-sm sm:text-base text-ink">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-brutalPink border border-ink flex items-center justify-center font-mono font-black text-xs shrink-0">04</span>
              <span>Apa bedanya Karsa dengan jasa manajemen konten bulanan atau agensi?</span>
            </div>
            <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform shrink-0">+</span>
          </summary>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-10 leading-relaxed font-sans border-t-2 border-sand pt-3">
            Agensi umumnya mengikat kontrak bulanan Rp5-20 juta dan memegang kendali penuh atas akunmu. Karsa menjual sistem produksi sekali bayar: riset, naskah, caption, SEO, dan kalender siap pakai — kamu atau tim tokomu yang merekam dan memposting. Lebih hemat hingga 90%, tanpa kontrak, dan kendali brand tetap 100% milikmu.
          </p>
        </details>

        {/* FAQ 5 */}
        <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
          <summary className="flex justify-between items-center gap-3 font-display font-bold text-sm sm:text-base text-ink">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-sand border border-ink flex items-center justify-center font-mono font-black text-xs shrink-0">05</span>
              <span>Apakah tersedia invoice resmi dan faktur pajak untuk pembukuan usaha?</span>
            </div>
            <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform shrink-0">+</span>
          </summary>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-10 leading-relaxed font-sans border-t-2 border-sand pt-3">
            Ya. Setiap transaksi secara otomatis menerbitkan bukti invoice digital yang dapat diunduh dalam format PDF. Untuk keperluan faktur pajak badan usaha (PT/CV), kamu cukup menghubungi tim support kami melalui email atau WhatsApp setelah proses checkout.
          </p>
        </details>

        {/* FAQ 6 */}
        <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
          <summary className="flex justify-between items-center gap-3 font-display font-bold text-sm sm:text-base text-ink">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-brutalYellow border border-ink flex items-center justify-center font-mono font-black text-xs shrink-0">06</span>
              <span>Bisakah saya memesan paket sekaligus untuk beberapa brand toko berbeda?</span>
            </div>
            <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform shrink-0">+</span>
          </summary>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-10 leading-relaxed font-sans border-t-2 border-sand pt-3">
            Bisa. Setiap brand toko dihitung sebagai 1 batch tersendiri dengan formulir brief masing-masing. Diskon paket multi-batch (3 Batch hemat Rp98.000 atau 6 Batch hemat Rp304.000) dapat digunakan lintas brand tokomu.
          </p>
        </details>

        {/* FAQ 7 */}
        <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
          <summary className="flex justify-between items-center gap-3 font-display font-bold text-sm sm:text-base text-ink">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-brutalGreen border border-ink flex items-center justify-center font-mono font-black text-xs shrink-0">07</span>
              <span>Apakah ada biaya bulanan atau komitmen langganan tersembunyi?</span>
            </div>
            <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform shrink-0">+</span>
          </summary>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-10 leading-relaxed font-sans border-t-2 border-sand pt-3">
            Tidak ada sama sekali. Satu harga flat per batch, tanpa langganan berulang, tanpa biaya perpanjangan, dan tanpa auto-debit. Kamu hanya membayar kembali saat tokomu siap menjalankan batch 30 hari berikutnya.
          </p>
        </details>

        {/* FAQ 8 */}
        <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
          <summary className="flex justify-between items-center gap-3 font-display font-bold text-sm sm:text-base text-ink">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-brutalCyan border border-ink flex items-center justify-center font-mono font-black text-xs shrink-0">08</span>
              <span>Bagaimana alur pembayaran hingga pesanan mulai diproses?</span>
            </div>
            <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform shrink-0">+</span>
          </summary>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-10 leading-relaxed font-sans border-t-2 border-sand pt-3">
            Isi formulir brief singkat produk &rarr; pilih metode pembayaran QRIS/VA di checkout &rarr; bayar &rarr; sistem otomatis menerbitkan nomor invoice dan memasukkan brief ke antrean tim kurator 24 jam kerja.
          </p>
        </details>

        {/* FAQ 9 */}
        <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
          <summary className="flex justify-between items-center gap-3 font-display font-bold text-sm sm:text-base text-ink">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-brutalPink border border-ink flex items-center justify-center font-mono font-black text-xs shrink-0">09</span>
              <span>Apakah harga paket bisa berubah saat saya ingin memesan batch lanjutan?</span>
            </div>
            <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform shrink-0">+</span>
          </summary>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-10 leading-relaxed font-sans border-t-2 border-sand pt-3">
            Bagi pemilik paket 6 Batch, harga terkunci secara permanen selama 1 tahun penuh untuk penambahan batch berikutnya. Untuk pemesanan 1 batch satuan, harga mengikuti daftar harga resmi yang berlaku pada saat checkout.
          </p>
        </details>

        {/* FAQ 10 */}
        <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
          <summary className="flex justify-between items-center gap-3 font-display font-bold text-sm sm:text-base text-ink">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-sand border border-ink flex items-center justify-center font-mono font-black text-xs shrink-0">10</span>
              <span>Apakah ada potongan harga atau promo bundle khusus?</span>
            </div>
            <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform shrink-0">+</span>
          </summary>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-10 leading-relaxed font-sans border-t-2 border-sand pt-3">
            Diskon resmi sudah diterapkan secara otomatis pada paket multi-batch: paket 3 Batch seharga Rp799.000 (hemat Rp98.000) dan paket 6 Batch seharga Rp1.490.000 (hemat Rp304.000) dibanding memesan satuan.
          </p>
        </details>

        {/* FAQ 11 */}
        <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
          <summary className="flex justify-between items-center gap-3 font-display font-bold text-sm sm:text-base text-ink">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-brutalYellow border border-ink flex items-center justify-center font-mono font-black text-xs shrink-0">11</span>
              <span>Apakah sistem ini benar-benar bisa menggantikan content creator full-time?</span>
            </div>
            <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform shrink-0">+</span>
          </summary>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-10 leading-relaxed font-sans border-t-2 border-sand pt-3">
            Bagi UMKM tahap awal hingga menengah, ya. Porsi kerja terberat creator (riset tren, penulisan hook retensi, caption AIDA, artikel SEO) telah diselesaikan oleh Karsa. Staf internal tokomu cukup meluangkan 1-2 jam per minggu untuk syuting mandiri dengan kamera HP.
          </p>
        </details>

        {/* FAQ 12 */}
        <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
          <summary className="flex justify-between items-center gap-3 font-display font-bold text-sm sm:text-base text-ink">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-brutalGreen border border-ink flex items-center justify-center font-mono font-black text-xs shrink-0">12</span>
              <span>Apakah nominal harga Rp299.000 sudah termasuk seluruh pajak dan biaya platform?</span>
            </div>
            <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform shrink-0">+</span>
          </summary>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-10 leading-relaxed font-sans border-t-2 border-sand pt-3">
            Harga Rp299.000 adalah harga bersih flat. Tidak ada biaya admin platform tambahan atau biaya langganan software tersembunyi yang ditagihkan saat pembayaran.
          </p>
        </details>

        {/* FAQ 13 */}
        <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
          <summary className="flex justify-between items-center gap-3 font-display font-bold text-sm sm:text-base text-ink">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-brutalCyan border border-ink flex items-center justify-center font-mono font-black text-xs shrink-0">13</span>
              <span>Bagaimana jika proses pembayaran QRIS/VA saya mengalami kendala atau gagal?</span>
            </div>
            <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform shrink-0">+</span>
          </summary>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-10 leading-relaxed font-sans border-t-2 border-sand pt-3">
            Data brief dan nomor invoice pesananmu tetap tersimpan aman di sistem kami selama 24 jam. Kamu cukup menghubungi tim operasional via WhatsApp dengan menunjukkan bukti transfer untuk proses validasi manual seketika.
          </p>
        </details>

        {/* FAQ 14 */}
        <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
          <summary className="flex justify-between items-center gap-3 font-display font-bold text-sm sm:text-base text-ink">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-brutalPink border border-ink flex items-center justify-center font-mono font-black text-xs shrink-0">14</span>
              <span>Apakah tersedia program diskon referral jika saya merekomendasikan rekan bisnis?</span>
            </div>
            <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform shrink-0">+</span>
          </summary>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-10 leading-relaxed font-sans border-t-2 border-sand pt-3">
            Tersedia. Kamu dapat menghubungi tim kemitraan kami via WhatsApp untuk mendapatkan kode voucher diskon referral atau bonus tambahan naskah video pada pemesanan batch berikutnya.
          </p>
        </details>

        {/* FAQ 15 */}
        <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
          <summary className="flex justify-between items-center gap-3 font-display font-bold text-sm sm:text-base text-ink">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-sand border border-ink flex items-center justify-center font-mono font-black text-xs shrink-0">15</span>
              <span>Bisakah pembayaran ditagihkan atas nama rekening atau kartu perusahaan?</span>
            </div>
            <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform shrink-0">+</span>
          </summary>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-10 leading-relaxed font-sans border-t-2 border-sand pt-3">
            Bisa. Cukup isi nama entitas perusahaan dan email keuangan pada formulir pemesanan. Invoice resmi akan diterbitkan dengan data pembayar perusahaan yang kamu daftarkan.
          </p>
        </details>

        {/* FAQ 16 */}
        <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
          <summary className="flex justify-between items-center gap-3 font-display font-bold text-sm sm:text-base text-ink">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-brutalYellow border border-ink flex items-center justify-center font-mono font-black text-xs shrink-0">16</span>
              <span>Apakah ada garansi jika hasil naskah kurang sesuai dengan ekspektasi brief?</span>
            </div>
            <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform shrink-0">+</span>
          </summary>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-10 leading-relaxed font-sans border-t-2 border-sand pt-3">
            Setiap pesanan dilindungi oleh garansi kalibrasi pesan 48 jam gratis. Tim kurator Karsa akan merevisi istilah produk, sapaan audiens, dan sudut naskah maksimal dalam 12 jam kerja tanpa biaya tambahan.
          </p>
        </details>

        {/* FAQ 17 */}
        <details className="bento-card rounded-2xl bg-white p-5 cursor-pointer list-none group">
          <summary className="flex justify-between items-center gap-3 font-display font-bold text-sm sm:text-base text-ink">
            <div className="flex items-center gap-3">
              <span className="w-7 h-7 rounded-lg bg-brutalGreen border border-ink flex items-center justify-center font-mono font-black text-xs shrink-0">17</span>
              <span>Apakah ada biaya konsultasi tambahan selama batch 30 hari berjalan?</span>
            </div>
            <span className="font-mono text-base font-bold text-ink group-open:rotate-45 transition-transform shrink-0">+</span>
          </summary>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-10 leading-relaxed font-sans border-t-2 border-sand pt-3">
            Tidak ada biaya konsultasi tambahan. Asistensi teknis seputar strategi posting, tips membaca naskah di teleprompter, dan kendala Notion dapat ditanyakan langsung ke WhatsApp tim operasional Karsa secara gratis.
          </p>
        </details>

      </div>

      {/* Horizontal Scroll Category Chips */}
      <div className="pt-6 border-t-2 border-ink space-y-3">
        <p className="text-xs font-mono font-bold text-stone-600 uppercase tracking-wider">Jelajahi Kategori FAQ Lainnya:</p>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          <a href="../faq.html" className="btn-press shrink-0 px-3.5 py-2 bg-white text-ink rounded-xl font-mono text-xs font-bold border-2 border-ink">Semua Topik</a>
          <a href="umum.html" className="btn-press shrink-0 px-3.5 py-2 bg-white text-ink rounded-xl font-mono text-xs font-bold border-2 border-ink">Umum & Deliverable</a>
          <a href="sla.html" className="btn-press shrink-0 px-3.5 py-2 bg-white text-ink rounded-xl font-mono text-xs font-bold border-2 border-ink">SLA & Pengiriman</a>
          <a href="revisi.html" className="btn-press shrink-0 px-3.5 py-2 bg-white text-ink rounded-xl font-mono text-xs font-bold border-2 border-ink">Revisi & Garansi</a>
          <a href="../jasa-script-video-tiktok.html" className="btn-press shrink-0 px-3.5 py-2 bg-white text-ink rounded-xl font-mono text-xs font-bold border-2 border-ink">Script TikTok</a>
          <a href="../jasa-konten-video-umkm.html" className="btn-press shrink-0 px-3.5 py-2 bg-white text-ink rounded-xl font-mono text-xs font-bold border-2 border-ink">Video UMKM</a>
          <a href="creator.html" className="btn-press shrink-0 px-3.5 py-2 bg-white text-ink rounded-xl font-mono text-xs font-bold border-2 border-ink">Content Creator</a>
          <a href="seo.html" className="btn-press shrink-0 px-3.5 py-2 bg-white text-ink rounded-xl font-mono text-xs font-bold border-2 border-ink">Artikel SEO</a>
          <a href="ig.html" className="btn-press shrink-0 px-3.5 py-2 bg-white text-ink rounded-xl font-mono text-xs font-bold border-2 border-ink">Instagram Reels</a>
        </div>
      </div>

      {/* Bottom WhatsApp Support Plaque */}
      <section className="bento-card p-6 sm:p-8 rounded-3xl bg-brutalYellow text-center space-y-3 shadow-brutal-lg">
        <span className="badge-brutal px-3 py-1 rounded-lg text-xs font-mono font-bold bg-ink text-brutalYellow uppercase">Live Assistance</span>
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-ink">Butuh Bantuan Proses Pembayaran?</h2>
        <p className="text-xs sm:text-sm text-stone-800 font-sans max-w-lg mx-auto leading-relaxed font-medium">
          Tim finance Karsa siap membantu verifikasi invoice manual atau panduan transfer Virtual Account via WhatsApp.
        </p>
        <div className="pt-2">
          <a href="https://wa.me/6281288009920?text=Halo%20Karsa%2C%20saya%20mau%20konfirmasi%20pembayaran%20paket" target="_blank" rel="noopener noreferrer" className="btn-press inline-flex items-center gap-2 px-6 py-3.5 bg-ink text-brutalYellow hover:bg-white hover:text-ink font-mono text-xs sm:text-sm font-bold rounded-xl transition">
            <Icon name="message-circle" className="w-4 h-4 text-brutalYellow" />
            <span>Chat WhatsApp Finance Karsa</span>
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
