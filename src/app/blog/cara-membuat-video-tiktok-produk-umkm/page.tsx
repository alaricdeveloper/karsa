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
    const btns = document.querySelectorAll('[data-action="copy"]');
    const handlers = [];
    btns.forEach((b) => {
      const h = () => {
        const target = document.getElementById(b.getAttribute("data-target"));
        if (!target) return;
        const text = target.innerText;
        navigator.clipboard?.writeText(text).then(() => {
          const old = b.textContent;
          b.textContent = "Copied!";
          setTimeout(() => { b.textContent = old; }, 1200);
        });
      };
      b.addEventListener("click", h);
      handlers.push([b, h]);
    });
    return () => handlers.forEach(([b, h]) => b.removeEventListener("click", h));
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">


  {/* TOP PROMO TICKER */}
  <div className="bg-brutalYellow text-ink text-[11px] sm:text-xs font-mono py-2.5 px-3 text-center tracking-tight border-b-2 border-ink flex items-center justify-center gap-2 font-bold relative z-30">
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-ink text-brutalYellow text-[10px] uppercase font-mono font-black border border-ink shadow-brutal-sm shrink-0">
      <Icon name="zap" className="w-3.5 h-3.5" /> KONTEN STRATEGY
    </span>
    <span className="truncate sm:overflow-visible text-ink font-bold">Panduan formula naskah video 25 detik teruji untuk UMKM. Tanpa sewa kamera mahal.</span>
  </div>

  {/* NAVIGATION HEADER */}
  <header className="border-b-2 border-ink bg-canvas/95 backdrop-blur-md sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
      
      {/* Brand Logo */}
      <a className="flex items-center space-x-2 group shrink-0" href="/">
        <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-ink group-hover:-translate-y-0.5 transition-transform">Karsa</span>
        <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-brutalGreen text-ink rounded font-bold">TikTok Strategy</span>
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
        <span className="flex items-center gap-1.5"><Icon name="bookmark" className="w-4 h-4 text-ink" /> Saves Mengalahkan Views</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="clock" className="w-4 h-4 text-ink" /> Hook 0-3 Detik</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="video" className="w-4 h-4 text-ink" /> Problem Framing 3-10s</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="check" className="w-4 h-4 text-ink" /> Value Solution 10-20s</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="bookmark" className="w-4 h-4 text-ink" /> Saves Mengalahkan Views</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="clock" className="w-4 h-4 text-ink" /> Hook 0-3 Detik</span>
      </div>
    </div>
  </div>

  {/* ARTICLE CONTENT */}
  <main id="main-content" className="flex-1 py-10 sm:py-16 brutal-dots relative overflow-hidden">
    
    {/* Floating Geometry */}
    <div className="hidden lg:flex absolute top-12 right-12 w-24 h-24 bg-brutalYellow text-ink items-center justify-center font-display font-extrabold text-xs uppercase text-center p-2 rotate-12 z-0 brutal-star border-2 border-ink shadow-brutal pointer-events-none">
      FORMULA<br />25s
    </div>
    <div className="absolute top-1/3 left-6 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="absolute bottom-1/4 right-8 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✦</div>

    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 relative z-10">
      
      {/* Protected Article Header Plaque to Guarantee Contrast */}
      <section className="hero-plaque p-6 sm:p-10 space-y-4">
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="badge-brutal text-[10px] uppercase font-bold px-2.5 py-1 bg-brutalGreen text-ink rounded-lg">
            Formula TikTok UMKM
          </span>
          <span className="text-stone-600 font-bold">• 7 Menit Baca</span>
          <span className="text-stone-600 font-bold">• Diperbarui: Agustus 2026</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-ink tracking-tight leading-[1.15]">
          Cara Membuat Video TikTok Produk UMKM yang Di-Save <br className="hidden sm:inline" />
          <span className="bg-brutalYellow text-ink px-3 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">(Formula 25 Detik)</span>
        </h1>

        <p className="text-xs sm:text-base text-stone-800 font-sans max-w-3xl leading-relaxed font-medium pt-1">
          Saves adalah metrik konversi paling jujur di algoritma TikTok saat ini: penonton menyimpan video yang mereka anggap bernilai untuk dipelajari atau dibeli nanti. Video produk yang disimpan berarti penonton menilai tokomu punya solusi nyata. Inilah struktur 25 detik yang kami pakai di setiap naskah Karsa Studio.
        </p>
      </section>

      {/* Step-by-Step Breakdown Article Card */}
      <article className="bento-card p-6 sm:p-10 rounded-3xl bg-white space-y-8">
        
        {/* Section 1 */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
            <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">TAHAP 01</span>
            <span>•</span>
            <span className="uppercase">Anatomi Waktu Per Detik</span>
          </div>
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-ink">Anatomi 25 Detik yang Menghentikan Scroll</h2>
          <p className="text-stone-700 font-sans text-xs sm:text-sm leading-relaxed">
            Struktur waktu ini memberi alasan psikologis yang jelas pada penonton untuk bertahan di setiap detiknya:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 font-mono text-xs">
            
            <div className="p-4 bg-canvas rounded-2xl border-2 border-ink space-y-1.5 shadow-brutal-sm">
              <span className="badge-brutal inline-block px-2 py-0.5 rounded bg-brutalYellow text-ink font-bold text-[10px]">00:00 - 00:03</span>
              <h3 className="font-display font-bold text-base text-ink">Visual & Audio Hook</h3>
              <p className="text-stone-700 font-sans text-xs leading-relaxed">
                Membuka pertanyaan menusuk atau pola penyangkalan di kepala penonton tanpa langsung memberi jawaban instan agar rasa penasaran tertahan.
              </p>
            </div>

            <div className="p-4 bg-canvas rounded-2xl border-2 border-ink space-y-1.5 shadow-brutal-sm">
              <span className="badge-brutal inline-block px-2 py-0.5 rounded bg-canvas text-ink font-bold text-[10px]">00:03 - 00:10</span>
              <h3 className="font-display font-bold text-base text-ink">Problem Framing</h3>
              <p className="text-stone-700 font-sans text-xs leading-relaxed">
                Memperjelas masalah konkret yang dialami penonton sehari-hari. Detail yang tajam membuat audiens merasa dipahami dan terdorong menekan save.
              </p>
            </div>

            <div className="p-4 bg-canvas rounded-2xl border-2 border-ink space-y-1.5 shadow-brutal-sm">
              <span className="badge-brutal inline-block px-2 py-0.5 rounded bg-brutalCyan text-ink font-bold text-[10px]">00:10 - 00:20</span>
              <h3 className="font-display font-bold text-base text-ink">Value Solution</h3>
              <p className="text-stone-700 font-sans text-xs leading-relaxed">
                Sampaikan keunggulan produkmu dengan bukti nyata: proses racikan, angka penghematan, bahan aktif, atau perbandingan sebelum-sesudah.
              </p>
            </div>

            <div className="p-4 bg-canvas rounded-2xl border-2 border-ink space-y-1.5 shadow-brutal-sm">
              <span className="badge-brutal inline-block px-2 py-0.5 rounded bg-brutalGreen text-ink font-bold text-[10px]">00:20 - 00:25</span>
              <h3 className="font-display font-bold text-base text-ink">Call To Action (CTA)</h3>
              <p className="text-stone-700 font-sans text-xs leading-relaxed">
                Satu arahan tegas tanpa ambiguitas: mengarahkan penonton menyimpan video untuk contekan atau langsung klik link di bio untuk transaksi.
              </p>
            </div>

          </div>
        </section>

        {/* Section 2: Complete Script Example */}
        <section className="space-y-4 pt-4 border-t-2 border-ink">
          <div className="flex items-center justify-between gap-3">
            <div>
              <span className="badge-brutal px-2.5 py-0.5 rounded text-[10px] font-mono font-bold bg-brutalGreen text-ink uppercase">Contoh Nyata</span>
              <h2 className="font-display font-extrabold text-xl sm:text-2xl text-ink mt-1">Struktur Naskah Lengkap: Produk Kopi Cold Brew</h2>
            </div>
            <button type="button" data-action="copy" data-target="exampleScript" className="btn-press px-3 py-1.5 bg-brutalYellow text-ink font-mono text-xs font-bold rounded-xl flex items-center gap-1.5">
              <Icon name="copy" className="w-3.5 h-3.5" />
              <span id="copyBtnLabel">Salin Naskah</span>
            </button>
          </div>

          {/* Script Box */}
          <div id="scriptContentBox" className="p-5 sm:p-6 bg-canvas border-2 border-ink rounded-2xl font-mono text-xs sm:text-sm space-y-3 leading-relaxed text-stone-800 shadow-brutal-sm">
            <p><strong className="text-ink font-bold">[00:00 - 00:03 Visual Hook]</strong> Talent menuangkan kopi instan ke dalam gelas — terlihat langsung menggumpal di dasar. Pasang ekspresi heran menghadap kamera.</p>
            <p><strong className="text-ink font-bold">[Audio Cue]</strong> <em>"Kenapa kopi sachet kamu sering bikin perut kembung padahal baru tiga teguk? Ini alasan ilmiahnya..."</em></p>
            <p><strong className="text-ink font-bold">[00:03 - 00:10 Problem Framing]</strong> <em>"Asam klorogenat dalam kopi komersial diproses memakai panas berlebih, dan itu yang bikin lambung sensitif kamu bereaksi kembung."</em></p>
            <p><strong className="text-ink font-bold">[00:10 - 00:20 Value Solution]</strong> Tunjukkan biji kopi cold brew asli dan proses slow drip. <em>"Metode slow-drip 12 jam kami memecah senyawa asam secara alami — kadar asamnya 70% lebih rendah dibanding metode roasting konvensional."</em></p>
            <p><strong className="text-ink font-bold">[00:20 - 00:25 Call To Action]</strong> <em>"Simpan video ini buat referensi ngopi aman, atau klik link di bio untuk amankan sampler pack lambung sensitif minggu ini!"</em></p>
          </div>
        </section>

        {/* Section 3: 3 Kesalahan Fatal */}
        <section className="space-y-4 pt-4 border-t-2 border-ink">
          <h2 className="font-display font-extrabold text-xl sm:text-2xl text-ink">3 Kesalahan Fatal yang Membunuh Saves</h2>
          
          <div className="space-y-3 font-sans text-xs sm:text-sm text-stone-700">
            <div className="p-4 bg-white rounded-2xl border-2 border-ink space-y-1">
              <strong className="text-ink font-bold block text-sm">1. Hook Terlalu Klise & Basa-Basi</strong>
              <p className="leading-relaxed">
                Pembuka seperti <em>"Halo guys kali ini aku mau share tips..."</em> langsung dibuang penonton dalam 0.5 detik. Otak audiens butuh teka-teki, kontras, atau ancaman masalah di detik 0.
              </p>
            </div>
            <div className="p-4 bg-white rounded-2xl border-2 border-ink space-y-1">
              <strong className="text-ink font-bold block text-sm">2. Menjual Fitur, Bukan Masalah</strong>
              <p className="leading-relaxed">
                Audiens tidak peduli spesifikasi teknis pabrikmu sampai mereka yakin produkmu bisa menyelesaikan rasa sakit atau kerepotan harian mereka.
              </p>
            </div>
            <div className="p-4 bg-white rounded-2xl border-2 border-ink space-y-1">
              <strong className="text-ink font-bold block text-sm">3. Tidak Ada Perintah Menyimpan (Save CTA)</strong>
              <p className="leading-relaxed">
                Jika videomu berisi informasi atau contekan bermanfaat, minta mereka menekan tombol simpan secara gamblang: <em>"Save video ini biar nggak bingung pas belanja nanti."</em>
              </p>
            </div>
          </div>
        </section>

      </article>

      {/* Bottom Integrated Conversion Plaque */}
      <section className="bento-card p-8 sm:p-10 rounded-3xl bg-brutalYellow text-center space-y-4 shadow-brutal-lg">
        <span className="badge-brutal px-3.5 py-1 rounded-lg text-xs font-mono font-bold bg-ink text-brutalYellow uppercase">Produksi Cepat</span>
        <h2 className="text-3xl sm:text-4xl font-display font-extrabold text-ink leading-tight">
          Butuh 30 Naskah Seperti Ini untuk Tokomu?
        </h2>
        <p className="text-xs sm:text-base text-stone-800 max-w-xl mx-auto font-medium font-sans">
          Menulis satu naskah butuh waktu riset. Di Karsa Studio, kamu menerima 30 naskah kata-per-kata, 30 caption AIDA, dan 4 artikel SEO dalam 1x24 jam kerja.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button type="button" data-action="open-modal" data-pkg="Paket 1 Batch - Rp299.000" className="btn-press bg-ink text-brutalYellow hover:bg-white hover:text-ink px-8 py-4 rounded-2xl font-mono text-sm font-bold transition flex items-center gap-2">
            <span>Mulai Order Batch (Rp299.000)</span>
            <Icon name="arrow-right" className="w-4 h-4" />
          </button>
          <a href="https://wa.me/6281288009920?text=Halo%20Karsa%2C%20saya%20baca%20artikel%20formula%20TikTok" target="_blank" rel="noopener noreferrer" className="btn-press bg-white hover:bg-canvas text-ink px-6 py-4 rounded-2xl font-mono text-sm font-bold transition flex items-center gap-2">
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
          Isi Brief Konten Video TikTok 30 Hari
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
