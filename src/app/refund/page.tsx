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
    const items = document.querySelectorAll(".legal-clause");
    const navLinks = document.querySelectorAll("#clauseNavList a");
    items.forEach((section, idx) => {
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
      <Icon name="shield-check" className="w-3.5 h-3.5" /> JAMINAN RESMI
    </span>
    <span className="truncate sm:overflow-visible text-ink font-bold">Protokol garansi SLA 24 jam kerja dan kalibrasi naskah 48 jam Karsa Studio.</span>
  </div>

  {/* NAVIGATION HEADER */}
  <header className="border-b-2 border-ink bg-canvas/95 backdrop-blur-md sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
      
      {/* Brand Logo */}
      <a className="flex items-center space-x-2 group shrink-0" href="/">
        <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-ink group-hover:-translate-y-0.5 transition-transform">Karsa</span>
        <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-brutalGreen text-ink rounded font-bold">SLA & Guarantee</span>
      </a>

      {/* Navigation Actions */}
      <div className="flex items-center gap-2.5 sm:gap-3 text-xs font-mono font-bold">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">
          <span className="w-2 h-2 rounded-full bg-brutalGreen border border-ink animate-ping"></span>
          <span>SLA Status: <strong className="text-ink">100% On-Time</strong></span>
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
        <span className="flex items-center gap-1.5"><Icon name="clock" className="w-4 h-4 text-ink" /> SLA Pasti 24 Jam</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="refresh-cw" className="w-4 h-4 text-ink" /> Kalibrasi Bebas 48 Jam</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="shield-check" className="w-4 h-4 text-ink" /> 100% Hak Cipta Milik Klien</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="file-check" className="w-4 h-4 text-ink" /> Kompensasi Keterlambatan Otomatis</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="clock" className="w-4 h-4 text-ink" /> SLA Pasti 24 Jam</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="refresh-cw" className="w-4 h-4 text-ink" /> Kalibrasi Bebas 48 Jam</span>
      </div>
    </div>
  </div>

  {/* MAIN DOCUMENT CONTENT */}
  <main id="main-content" className="flex-1 py-10 sm:py-16 brutal-grid relative overflow-hidden">
    
    {/* Floating Geometry */}
    <div className="hidden lg:flex absolute top-12 left-8 w-24 h-24 bg-brutalYellow text-ink items-center justify-center font-display font-extrabold text-xs uppercase text-center p-2 rotate-12 z-0 brutal-star border-2 border-ink shadow-brutal pointer-events-none">
      100%<br />PASTI
    </div>
    <div className="absolute top-1/3 right-8 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="absolute bottom-1/4 left-6 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✦</div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 relative z-10">
      
      {/* Protected Hero Plaque to Guarantee Contrast */}
      <section className="hero-plaque p-6 sm:p-10 space-y-4">
        <div className="inline-flex items-center gap-2 badge-brutal bg-brutalYellow px-3.5 py-1 rounded-lg text-xs font-mono font-bold text-ink">
          <Icon name="shield" className="w-4 h-4 text-ink" />
          <span>PROTOKOL JAMINAN KUALITAS & SLA RESMI</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-display font-extrabold text-ink tracking-tight leading-[1.12]">
          Jaminan Layanan, SLA 24 Jam <br className="hidden sm:inline" />
          <span className="bg-brutalGreen text-ink px-3 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">& Kebijakan Kompensasi</span>
        </h1>

        <p className="text-xs sm:text-base text-stone-800 font-sans max-w-3xl leading-relaxed font-medium pt-1">
          Terakhir diperbarui: 1 September 2026. Kami menghargai waktu dan investasi bisnismu. Dokumen ini merinci secara terbuka standar komitmen SLA 1x24 jam kerja, mekanisme kalibrasi naskah 48 jam, serta garansi kompensasi otomatis tanpa birokrasi berbelit.
        </p>
      </section>

      {/* 3 Core Highlight Bento Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
        
        {/* Card 1 */}
        <div className="bento-card p-6 rounded-3xl bg-brutalGreen/30 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-brutalGreen border-2 border-ink flex items-center justify-center shadow-brutal-sm font-bold">
              <Icon name="clock" className="w-5 h-5 text-ink" />
            </div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-ink">Garansi SLA 24 Jam Kerja</h3>
            <p className="text-stone-700 font-sans text-xs leading-relaxed">
              Seluruh 30 naskah, caption AIDA, dan Notion OS wajib terkirim dalam 24 jam kerja sejak brief terkonfirmasi. Keterlambatan sepihak langsung diganti dengan kompensasi 5 naskah video viral tambahan gratis.
            </p>
          </div>
          <span className="badge-brutal text-[10px] text-ink font-bold bg-white px-2.5 py-1 rounded-lg inline-block self-start">
            Tepat Waktu / Kompensasi
          </span>
        </div>

        {/* Card 2 */}
        <div className="bento-card p-6 rounded-3xl bg-brutalYellow/40 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-brutalYellow border-2 border-ink flex items-center justify-center shadow-brutal-sm font-bold">
              <Icon name="refresh-cw" className="w-5 h-5 text-ink" />
            </div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-ink">Garansi Kalibrasi 48 Jam</h3>
            <p className="text-stone-800 font-sans text-xs leading-relaxed">
              Jika nada bicara (*tone of voice*) atau sudut pandang naskah belum 100% selaras dengan persona tokomu, kamu memiliki hak revisi bebas selama 48 jam kalender tanpa biaya tambahan.
            </p>
          </div>
          <span className="badge-brutal text-[10px] text-ink font-bold bg-white px-2.5 py-1 rounded-lg inline-block self-start">
            Bebas Kalibrasi Tone
          </span>
        </div>

        {/* Card 3 */}
        <div className="bento-card p-6 rounded-3xl bg-brutalCyan/30 space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="w-11 h-11 rounded-2xl bg-brutalCyan border-2 border-ink text-ink flex items-center justify-center shadow-brutal-sm font-bold">
              <Icon name="file-check" className="w-5 h-5 text-ink" />
            </div>
            <h3 className="font-display font-bold text-lg sm:text-xl text-ink">Naskah Kata-per-Kata</h3>
            <p className="text-stone-800 font-sans text-xs leading-relaxed">
              Bukan sekadar poin ide kasar. Seluruh 30 naskah disusun kata-per-kata per detik (Hook 0-3s, Problem, Value, CTA) siap dibaca di teleprompter HP dan 100% hak cipta milik brand kamu.
            </p>
          </div>
          <span className="badge-brutal text-[10px] text-ink font-bold bg-white px-2.5 py-1 rounded-lg inline-block self-start">
            Siap Baca Teleprompter
          </span>
        </div>

      </div>

      {/* Main Clauses Layout: Sticky Index + Content Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sticky Navigation Index (4 Cols) */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4">
          <div className="bento-card p-5 rounded-3xl space-y-3 font-mono text-xs bg-white shadow-brutal-lg">
            
            <div className="flex items-center justify-between pb-2 border-b-2 border-ink">
              <span className="font-bold text-ink uppercase tracking-wider text-[11px]">Daftar Bab Jaminan</span>
              <span className="badge-brutal px-2 py-0.5 rounded text-[10px] font-bold bg-canvas text-ink">16 Bab</span>
            </div>

            {/* Search Clause Input */}
            <div className="relative">
              <Icon name="search" className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-500" />
              <input type="text" id="clauseSearchInput" ref={searchRef} placeholder="Cari klausul / garansi..." className="w-full bg-canvas border-2 border-ink rounded-xl px-3 py-2 pl-8 text-xs font-sans text-ink focus:outline-none focus:ring-2 focus:ring-ink min-h-[40px]" />
            </div>

            {/* Nav Links List */}
            <nav className="space-y-1 max-h-[55vh] overflow-y-auto no-scrollbar pr-1 pt-1" id="clauseNavList">
              <a href="#bab-1" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 01 — Standar Penghitungan SLA 24 Jam</a>
              <a href="#bab-2" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 02 — Matriks Kompensasi Keterlambatan</a>
              <a href="#bab-3" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 03 — Mekanisme Garansi Kalibrasi 48 Jam</a>
              <a href="#bab-4" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 04 — Standar Kualitas Deliverables</a>
              <a href="#bab-5" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 05 — Kebijakan Pembatalan & Refund</a>
              <a href="#bab-6" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 06 — Alur Pengajuan Klaim 1 Klik</a>
              <a href="#bab-7" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 07 — Pengecualian & Keadaan Khusus</a>
              <a href="#bab-8" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 08 — Saluran Bantuan Eskalasi</a>
              <a href="#bab-9" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 09 — Hak Cipta & Kepemilikan Materi</a>
              <a href="#bab-10" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 10 — Privasi Data & Opsi NDA</a>
              <a href="#bab-11" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 11 — Pembayaran & Struktur Biaya</a>
              <a href="#bab-12" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 12 — Batasan Tanggung Jawab</a>
              <a href="#bab-13" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 13 — Perubahan Kebijakan</a>
              <a href="#bab-14" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 14 — Penyelesaian Sengketa</a>
              <a href="#bab-15" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 15 — Ketentuan Umum</a>
              <a href="#bab-16" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 16 — Ringkasan Hak Cepat</a>
            </nav>

          </div>
        </aside>

        {/* Detailed Legal Clauses (8 Cols) */}
        <div className="lg:col-span-8 space-y-6 font-sans text-xs sm:text-sm text-stone-700 leading-relaxed" id="clauseContainer">
          
          {/* Bab 01 */}
          <section id="bab-1" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 01</span>
              <span>•</span>
              <span className="uppercase">Standar Penghitungan SLA 24 Jam</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">1. Ketentuan Waktu Produksi</h2>
            <p>Service Level Agreement (SLA) pengerjaan dihitung tepat sejak status pembayaran terkonfirmasi LUNAS di sistem dan formulir parameter brief dinyatakan lengkap diterima oleh tim produksi.</p>
            <p>Jam kerja operasional Karsa Studio berlangsung setiap hari Senin hingga Minggu (pukul 08:00 – 22:00 WIB). Pesanan yang masuk pada jam operasional akan diserahkan selambat-lambatnya 24 jam kalender sejak waktu transaksi dan brief tercatat.</p>
          </section>

          {/* Bab 02 */}
          <section id="bab-2" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 02</span>
              <span>•</span>
              <span className="uppercase">Matriks Kompensasi Keterlambatan</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">2. Tabel Kompensasi Resmi</h2>
            <p>Apabila terjadi keterlambatan penyerahan berkas yang bersumber dari kendala operasional internal tim Karsa, kami memberlakukan kompensasi tanpa syarat berbelit:</p>
            
            <div className="border-2 border-ink rounded-2xl overflow-hidden font-mono text-xs mt-3 shadow-brutal-sm">
              <div className="p-3 bg-ink text-canvas flex justify-between font-bold">
                <span>Waktu Keterlambatan</span>
                <span>Bentuk Kompensasi Tambahan</span>
              </div>
              <div className="divide-y-2 divide-ink text-ink bg-white font-sans">
                <div className="py-2.5 px-3 flex justify-between items-center font-bold">
                  <span>1 – 6 Jam Melebihi SLA</span>
                  <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">+5 Naskah Video Viral Gratis</span>
                </div>
                <div className="py-2.5 px-3 flex justify-between items-center font-bold">
                  <span>6 – 12 Jam Melebihi SLA</span>
                  <span className="text-ink bg-brutalCyan px-2 py-0.5 rounded border border-ink">+10 Naskah + 1 Artikel SEO</span>
                </div>
                <div className="py-2.5 px-3 flex justify-between items-center font-bold">
                  <span>&gt; 12 Jam Melebihi SLA</span>
                  <span className="text-ink bg-brutalGreen px-2 py-0.5 rounded border border-ink">Kompensasi Penuh + Diskon Batch 50%</span>
                </div>
              </div>
            </div>
          </section>

          {/* Bab 03 */}
          <section id="bab-3" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 03</span>
              <span>•</span>
              <span className="uppercase">Mekanisme Garansi Kalibrasi 48 Jam</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">3. Hak Penyesuaian Nada Bicara & Hook</h2>
            <p>Setelah tautan Notion OS dan Customer Hub aktif, Klien diberikan waktu <strong>48 jam kalender penuh</strong> untuk meninjau seluruh naskah yang telah disusun.</p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700 font-sans">
              <li><strong>Kalibrasi yang Diterima:</strong> Penyesuaian gaya bahasa (misal: lebih kasual, formal, jenaka, atau teknis), penajaman hook visual 0-3 detik, dan penyesuaian terminologi teknis industri tokomu.</li>
              <li><strong>Turnaround Kalibrasi:</strong> Permintaan penyesuaian diselesaikan dalam waktu maksimal 12 jam kerja sejak formulir kalibrasi dikirimkan melalui WhatsApp Support atau Customer Hub.</li>
            </ul>
          </section>

          {/* Bab 04 */}
          <section id="bab-4" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 04</span>
              <span>•</span>
              <span className="uppercase">Standar Kualitas Deliverables</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">4. Checklist Kurasi Mutu</h2>
            <p>Setiap naskah yang diserahkan telah melalui 3 tahapan kurasi ketat (*Triple Quality Control*):</p>
            
            <div className="space-y-2.5 font-mono text-xs mt-2">
              <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                <strong className="text-ink block font-bold">1. Hook Retention Audit:</strong>
                <span className="text-stone-600 font-sans text-xs">Memastikan 3 detik pertama memakai formula penahan scroll (Penyangkalan, Pertanyaan Menusuk, atau Kontras).</span>
              </div>
              <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                <strong className="text-ink block font-bold">2. Natural Phrasing Verification:</strong>
                <span className="text-stone-600 font-sans text-xs">Memastikan naskah tidak terdengar kaku seperti hasil prompt AI mentah, melainkan natural saat diucapkan talent.</span>
              </div>
              <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                <strong className="text-ink block font-bold">3. Call-To-Action Clarity:</strong>
                <span className="text-stone-600 font-sans text-xs">Memastikan instruksi penutup jelas dan memandu audiens menuju konversi (DM, klik bio, atau checkout).</span>
              </div>
            </div>
          </section>

          {/* Bab 05 */}
          <section id="bab-5" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 05</span>
              <span>•</span>
              <span className="uppercase">Kebijakan Pembatalan & Refund</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">5. Ketentuan Pembatalan & Pengembalian Dana</h2>
            <p>Mengingat seluruh deliverable berupa produk digital dan sistem Notion yang langsung dapat diduplikasi, aturan pembatalan disusun transparan:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700 font-sans">
              <li><strong>Pengembalian Dana 100%:</strong> Berlaku jika Klien membatalkan pesanan dalam kurun waktu <strong>maksimal 1 jam</strong> setelah pembayaran sebelum proses riset dan penulisan dimulai tim.</li>
              <li><strong>Setelah Proses Produksi Berjalan:</strong> Klien dilindungi penuh oleh <strong>Garansi Kalibrasi 48 Jam</strong> dan <strong>Kompensasi SLA Keterlambatan</strong> pada Bab 2 dan Bab 3.</li>
            </ul>
          </section>

          {/* Bab 06 */}
          <section id="bab-6" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 06</span>
              <span>•</span>
              <span className="uppercase">Alur Pengajuan Klaim 1 Klik</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">6. Cara Mengajukan Klaim atau Kalibrasi</h2>
            <p>Prosedur pengajuan garansi atau kalibrasi naskah bebas dari formulir rumit:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-stone-700 font-sans">
              <li>Buka nomor invoice pesanan Anda (<span className="font-mono text-xs font-bold text-ink bg-sand px-1.5 py-0.5 rounded">INV-XXXXXX</span>).</li>
              <li>Hubungi WhatsApp Support Resmi kami di <span className="font-mono text-xs font-bold text-ink">+62 812-3456-7890</span> atau gunakan menu kalibrasi di Customer Hub.</li>
              <li>Sampaikan bagian script yang ingin disesuaikan. Tim kurator akan langsung memproses naskah dalam antrean prioritas.</li>
            </ol>
          </section>

          {/* Bab 07 */}
          <section id="bab-7" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 07</span>
              <span>•</span>
              <span className="uppercase">Pengecualian & Keadaan Khusus</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">7. Batasan Ruang Lingkup Garansi</h2>
            <p>Garansi SLA dan kalibrasi tidak berlaku apabila:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700 font-sans">
              <li>Klien mengganti total konsep bisnis, nama brand, atau kategori produk di tengah proses pengerjaan yang sedang berjalan.</li>
              <li>Terjadi keadaan kahar (*Force Majeure*) berskala nasional seperti gangguan jaringan internet global atau bencana alam.</li>
            </ul>
          </section>

          {/* Bab 08 */}
          <section id="bab-8" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 08</span>
              <span>•</span>
              <span className="uppercase">Saluran Bantuan Eskalasi</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">8. Saluran Resmi Layanan Klien</h2>
            <p>Untuk pertanyaan mengenai garansi, klaim kompensasi, atau kalibrasi naskah, hubungi saluran resmi Karsa Studio:</p>
            
            <div className="p-4 bg-canvas rounded-2xl border-2 border-ink font-mono text-xs space-y-1.5 text-stone-700 shadow-brutal-sm">
              <p><strong>WhatsApp Support:</strong> +62 812-3456-7890 (Senin - Jumat 09:00 - 18:00 WIB)</p>
              <p><strong>Email Operasional:</strong> halo@usekarsa.co</p>
              <p><strong>Domain Resmi:</strong> https://usekarsa.co</p>
            </div>
          </section>

          {/* Bab 09 */}
          <section id="bab-9" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 09</span>
              <span>•</span>
              <span className="uppercase">Hak Cipta & Kepemilikan Materi</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">9. Hak Penggunaan Komersial & Batas Lisensi</h2>
            <p>Seluruh deliverable batch (naskah kata-per-kata, caption AIDA, artikel SEO, shot list, dan bonus) menjadi <strong>milik penuh Klien</strong> sejak tautan serah terima aktif. Tidak ada lisensi berlapis atau royalti lanjutan.</p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700 font-sans">
              <li><strong>Bebas Dipublikasikan:</strong> Materi boleh dipakai di platform mana pun (TikTok, Reels, YouTube Shorts, website, iklan berbayar) tanpa pemberitahuan atau biaya tambahan.</li>
              <li><strong>Bebas Dimodifikasi:</strong> Klien berhak mengubah, memotong ulang, atau menggabungkan naskah dengan materi lain sesuai kebutuhan produksi.</li>
              <li><strong>Kerangka Produk Tetap Milik Karsa:</strong> Struktur Notion Content OS, template database, dan formula penulisan merupakan kekayaan intelektual Karsa Studio sebagai produk — namun seluruh isi spesifik brand kamu tetap 100% milikmu.</li>
            </ul>
          </section>

          {/* Bab 10 */}
          <section id="bab-10" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 10</span>
              <span>•</span>
              <span className="uppercase">Privasi Data & Opsi NDA</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">10. Perlindungan Data Brief & Kerahasiaan</h2>
            <p>Isi brief, data kontak, dan dokumen kerja hanya digunakan untuk mengerjakan batch kamu. Kami tidak menjual, menyewakan, atau membagikan data tersebut ke pihak ketiga mana pun.</p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700 font-sans">
              <li><strong>Akses Terbatas:</strong> Data hanya dapat diakses oleh anggota tim produksi yang bertanggung jawab atas batch kamu.</li>
              <li><strong>Opsi NDA:</strong> Untuk brief yang sangat sensitif (formula produk, harga pokok, rencana peluncuran), tersedia perjanjian kerahasiaan (NDA) yang dapat ditandatangani sebelum proses produksi dimulai.</li>
              <li><strong>Retensi Data:</strong> Arsip brief disimpan maksimal 12 bulan untuk keperluan batch lanjutan, lalu dihapus permanen kecuali kamu meminta perpanjangan.</li>
            </ul>
          </section>

          {/* Bab 11 */}
          <section id="bab-11" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 11</span>
              <span>•</span>
              <span className="uppercase">Pembayaran & Struktur Biaya</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">11. Metode Pembayaran, Verifikasi & Paket</h2>
            <p>Kami menerima pembayaran instan melalui <strong>QRIS</strong> dan <strong>Virtual Account</strong> dari bank utama di Indonesia. SLA mulai dihitung sejak status pembayaran tercatat <strong>LUNAS</strong> di sistem.</p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700 font-sans">
              <li><strong>1 Batch (Rp299.000):</strong> 30 hari konten, sekali bayar, tanpa langganan.</li>
              <li><strong>3 Batch (Rp799.000):</strong> Ritme 3 bulan, hemat Rp98.000, diproses bertahap.</li>
              <li><strong>6 Batch (Rp1.490.000):</strong> Program 6 bulan, hemat Rp304.000, plus sesi strategi berkala.</li>
              <li><strong>Tanpa Auto-Debit:</strong> Tidak ada potongan otomatis bulanan. Kamu hanya membayar saat memesan batch berikutnya secara sadar.</li>
            </ul>
          </section>

          {/* Bab 12 */}
          <section id="bab-12" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 12</span>
              <span>•</span>
              <span className="uppercase">Batasan Tanggung Jawab</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">12. Ruang Lingkup Garansi & Limitasi Klaim</h2>
            <p>Karsa Studio menjamin <strong>kualitas deliverable</strong> (naskah, struktur, dan ketepatan waktu), bukan <strong>hasil performa platform</strong>. Perlu dipahami dengan jelas:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700 font-sans">
              <li><strong>Metrik Eksternal Tidak Dijamin:</strong> Jumlah views, follower, atau penjualan dipengaruhi algoritma, tren, dan eksekusi harian yang di luar kendali kami.</li>
              <li><strong>Nilai Klaim Maksimal:</strong> Seluruh kewajiban kompensasi dibatasi pada nilai batch yang telah dibayarkan, kecuali diatur berbeda oleh hukum yang berlaku.</li>
              <li><strong>Di Luar Cakupan:</strong> Karsa tidak bertanggung jawab atas produksi video, editing, pemasangan iklan, atau konsekuensi penggunaan materi di luar instruksi yang tertera pada deliverable.</li>
            </ul>
          </section>

          {/* Bab 13 */}
          <section id="bab-13" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 13</span>
              <span>•</span>
              <span className="uppercase">Perubahan Kebijakan</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">13. Prosedur Pembaruan & Pemberitahuan</h2>
            <p>Kebijakan ini dapat diperbarui untuk menyesuaikan perkembangan layanan, regulasi, atau kebutuhan operasional. Setiap pembaruan akan:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700 font-sans">
              <li>Diumumkan melalui email atau WhatsApp resmi ke Klien yang masih memiliki batch aktif, minimal 7 hari sebelum berlaku efektif.</li>
              <li>Mencantumkan tanggal revisi terbaru di bagian atas dokumen agar mudah dilacak.</li>
              <li>Hanya mengikat untuk pesanan yang dilakukan setelah tanggal pembaruan — batch yang sudah berjalan tetap tunduk pada kebijakan saat pemesanan.</li>
            </ul>
          </section>

          {/* Bab 14 */}
          <section id="bab-14" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 14</span>
              <span>•</span>
              <span className="uppercase">Penyelesaian Sengketa</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">14. Mediasi & Hukum yang Berlaku</h2>
            <p>Dokumen ini tunduk pada <strong>hukum Negara Republik Indonesia</strong>, termasuk ketentuan transaksi elektronik yang berlaku.</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-stone-700 font-sans">
              <li>Setiap perselisihan diselesaikan melalui <strong>musyawarah dan mediasi</strong> dalam tenggat maksimal 14 hari kerja sejak pengaduan diterima.</li>
              <li>Apabila mediasi tidak mencapai kesepakatan, penyelesaian dilanjutkan melalui jalur hukum di pengadilan sesuai domisili hukum Karsa Studio.</li>
              <li>Selama proses berlangsung, kewajiban layanan lain yang tidak dipersengketakan tetap dijalankan secara normal.</li>
            </ol>
          </section>

          {/* Bab 15 */}
          <section id="bab-15" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 15</span>
              <span>•</span>
              <span className="uppercase">Ketentuan Umum</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">15. Klausul Pelengkap Perjanjian</h2>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700 font-sans">
              <li><strong>Severability:</strong> Jika salah satu bagian dokumen ini dinyatakan tidak sah oleh otoritas berwenang, bagian lainnya tetap berlaku penuh.</li>
              <li><strong>Keseluruhan Perjanjian:</strong> Dokumen ini beserta formulir brief dan invoice merupakan keseluruhan kesepakatan dan menggantikan komunikasi lisan sebelumnya.</li>
              <li><strong>Larangan Pengalihan:</strong> Hak atas batch tidak dapat dialihkan ke pihak lain tanpa persetujuan tertulis dari Karsa Studio.</li>
              <li><strong>Kelalaian Tidak Menghapus Hak:</strong> Keterlambatan kami dalam menegakkan klausul tertentu tidak dianggap sebagai pelepasan hak atas klausul tersebut.</li>
            </ul>
          </section>

          {/* Bab 16 */}
          <section id="bab-16" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-brutalYellow/30">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-700 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 16</span>
              <span>•</span>
              <span className="uppercase">Ringkasan Hak Cepat</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">16. Tabel Rangkuman Perlindungan Kamu</h2>
            <p>Lupa detail panjang lebar di atas? Ini intisari hak kamu dalam satu tabel:</p>

            <div className="border-2 border-ink rounded-2xl overflow-hidden font-mono text-xs mt-2 shadow-brutal-sm">
              <div className="p-3 bg-ink text-canvas flex justify-between font-bold">
                <span>Situasi</span>
                <span>Hak Kamu</span>
              </div>
              <div className="divide-y-2 divide-ink text-ink bg-white font-sans">
                <div className="py-2.5 px-3 flex justify-between items-center gap-3 font-bold">
                  <span>Pengiriman telat &gt; 24 jam</span>
                  <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink shrink-0">Kompensasi Otomatis</span>
                </div>
                <div className="py-2.5 px-3 flex justify-between items-center gap-3 font-bold">
                  <span>Naskah kurang sesuai tone</span>
                  <span className="text-ink bg-brutalCyan px-2 py-0.5 rounded border border-ink shrink-0">Kalibrasi 48 Jam Gratis</span>
                </div>
                <div className="py-2.5 px-3 flex justify-between items-center gap-3 font-bold">
                  <span>Batal &lt; 1 jam setelah bayar</span>
                  <span className="text-ink bg-brutalGreen px-2 py-0.5 rounded border border-ink shrink-0">Refund 100%</span>
                </div>
                <div className="py-2.5 px-3 flex justify-between items-center gap-3 font-bold">
                  <span>Materi dipakai iklan / media</span>
                  <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink shrink-0">Hak Cipta 100% Kamu</span>
                </div>
                <div className="py-2.5 px-3 flex justify-between items-center gap-3 font-bold">
                  <span>Isi brief bersifat rahasia</span>
                  <span className="text-ink bg-brutalCyan px-2 py-0.5 rounded border border-ink shrink-0">Dijamin Privat + NDA</span>
                </div>
                <div className="py-2.5 px-3 flex justify-between items-center gap-3 font-bold">
                  <span>Butuh bantuan / klaim</span>
                  <span className="text-ink bg-brutalGreen px-2 py-0.5 rounded border border-ink shrink-0">WA Dibalas &le; 4 Jam Kerja</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-stone-600 font-mono pt-1">Dokumen ini hanya kerangka komitmen layanan. Hal yang tidak diatur di sini mengikuti ketentuan umum hukum yang berlaku di Indonesia.</p>
          </section>

        </div>

      </div>

      {/* Bottom Quick Navigation Matrix */}
      <div className="text-center pt-8 border-t-2 border-ink font-mono text-xs space-y-3">
        <div className="flex items-center justify-center gap-4 text-stone-600 font-bold">
          <a href="/terms" className="hover:underline hover:text-ink transition">Syarat & Ketentuan</a>
          <span>•</span>
          <a href="/privacy" className="hover:underline hover:text-ink transition">Kebijakan Privasi</a>
          <span>•</span>
          <a href="/refund" className="text-ink font-black underline">Jaminan SLA & Kompensasi</a>
        </div>
        <p className="text-stone-500 text-[11px] font-bold">&copy; 2026 Karsa Studio (usekarsa.co). Seluruh hak cipta dilindungi undang-undang.</p>
      </div>

    </div>
  </main>

  {/* FOOTER */}
  <footer className="border-t-2 border-ink py-6 px-4 font-mono text-xs text-stone-600 bg-canvas brutal-grid">
    <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
      <p className="font-bold">&copy; 2026 Karsa Studio. Built for High Performance Execution.</p>
      <div className="flex items-center gap-4 font-bold">
        <a className="hover:underline hover:text-ink" href="/terms">Syarat & Ketentuan</a>
        <a className="hover:underline hover:text-ink" href="/privacy">Kebijakan Privasi</a>
        <a className="hover:underline hover:text-ink" href="/">Kembali ke Beranda</a>
      </div>
    </div>
  </footer>

  

    </div>
  );
}
