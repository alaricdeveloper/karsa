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
      <Icon name="shield-check" className="w-3.5 h-3.5" /> PRIVASI TERJAMIN
    </span>
    <span className="truncate sm:overflow-visible text-ink font-bold">Kepatuhan UU No. 27 Tahun 2022 (UU PDP). Kerahasiaan brief klien terlindungi 100%.</span>
  </div>

  {/* NAVIGATION HEADER */}
  <header className="border-b-2 border-ink bg-canvas/95 backdrop-blur-md sticky top-0 z-40">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
      
      {/* Brand Logo */}
      <a className="flex items-center space-x-2 group shrink-0" href="/">
        <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-ink group-hover:-translate-y-0.5 transition-transform">Karsa</span>
        <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-brutalCyan text-ink rounded font-bold">Data Protection</span>
      </a>

      {/* Navigation Actions */}
      <div className="flex items-center gap-2.5 sm:gap-3 text-xs font-mono font-bold">
        <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">
          <span className="w-2 h-2 rounded-full bg-brutalGreen border border-ink animate-ping"></span>
          <span>Sistem: <strong className="text-ink">Enkripsi 256-Bit</strong></span>
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
        <span className="flex items-center gap-1.5"><Icon name="lock" className="w-4 h-4 text-ink" /> Zero Data Selling</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="cpu" className="w-4 h-4 text-ink" /> Zero AI Model Training</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="shield-check" className="w-4 h-4 text-ink" /> Hak Hapus Data Permanen</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="key" className="w-4 h-4 text-ink" /> Enkripsi End-to-End</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="lock" className="w-4 h-4 text-ink" /> Zero Data Selling</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="cpu" className="w-4 h-4 text-ink" /> Zero AI Model Training</span>
      </div>
    </div>
  </div>

  {/* MAIN DOCUMENT CONTENT */}
  <main id="main-content" className="flex-1 py-10 sm:py-16 brutal-grid relative overflow-hidden">
    
    {/* Floating Geometry */}
    <div className="hidden lg:flex absolute top-12 left-8 w-24 h-24 bg-brutalYellow text-ink items-center justify-center font-display font-extrabold text-xs uppercase text-center p-2 rotate-12 z-0 brutal-star border-2 border-ink shadow-brutal pointer-events-none">
      100%<br />PRIVAT
    </div>
    <div className="absolute top-1/3 right-8 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="absolute bottom-1/4 left-6 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✦</div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-10 relative z-10">
      
      {/* Protected Hero Plaque */}
      <section className="hero-plaque p-6 sm:p-10 space-y-4">
        <div className="inline-flex items-center gap-2 badge-brutal bg-brutalYellow px-3.5 py-1 rounded-lg text-xs font-mono font-bold text-ink">
          <Icon name="lock" className="w-4 h-4 text-ink" />
          <span>PERLINDUNGAN DATA PRIBADI & PRIVASI KOMERSIAL KLIEN</span>
        </div>

        <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-display font-extrabold text-ink tracking-tight leading-[1.12]">
          Kebijakan Privasi & Data Pribadi <br className="hidden sm:inline" />
          <span className="bg-brutalCyan text-ink px-3 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">(Privacy Policy & UU PDP)</span>
        </h1>

        <p className="text-xs sm:text-base text-stone-800 font-sans max-w-3xl leading-relaxed font-medium pt-1">
          Terakhir diperbarui: 1 September 2026. Disusun mengacu pada Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP) serta standar tata kelola data digital global.
        </p>
      </section>

      {/* 4 Core Privacy Highlight Bento Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 font-mono text-xs">
        
        <div className="bento-card p-5 rounded-3xl space-y-2 bg-white flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-stone-500 uppercase font-bold block">1. Brief Bisnis</span>
            <span className="text-sm sm:text-base font-extrabold text-ink block font-display mt-1">100% Rahasia Dagang</span>
          </div>
          <span className="badge-brutal text-[10px] text-ink font-bold bg-sand px-2 py-0.5 rounded self-start">Enkripsi Formulir</span>
        </div>

        <div className="bento-card p-5 rounded-3xl space-y-2 bg-brutalGreen/30 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-stone-700 uppercase font-bold block">2. Monetisasi Data</span>
            <span className="text-sm sm:text-base font-extrabold text-ink block font-display mt-1">Zero Data Selling</span>
          </div>
          <span className="badge-brutal text-[10px] text-ink font-bold bg-white px-2 py-0.5 rounded self-start">Tidak Dijual</span>
        </div>

        <div className="bento-card p-5 rounded-3xl space-y-2 bg-white flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-stone-500 uppercase font-bold block">3. Keamanan Transaksi</span>
            <span className="text-sm sm:text-base font-extrabold text-ink block font-display mt-1">256-Bit SSL/TLS</span>
          </div>
          <span className="badge-brutal text-[10px] text-ink font-bold bg-sand px-2 py-0.5 rounded self-start">Gateway Bank Indonesia</span>
        </div>

        <div className="bento-card p-5 rounded-3xl space-y-2 bg-brutalYellow/40 flex flex-col justify-between">
          <div>
            <span className="text-[10px] text-stone-700 uppercase font-bold block">4. Hak Kendali Klien</span>
            <span className="text-sm sm:text-base font-extrabold text-ink block font-display mt-1">Hak Hapus Permanen</span>
          </div>
          <span className="badge-brutal text-[10px] text-ink font-bold bg-white px-2 py-0.5 rounded self-start">1-Click Erasure</span>
        </div>

      </div>

      {/* Main Clauses Layout: Sticky Index + Content Blocks */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Sticky Navigation Index (4 Cols) */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4">
          <div className="bento-card p-5 rounded-3xl space-y-3 font-mono text-xs bg-white shadow-brutal-lg">
            
            <div className="flex items-center justify-between pb-2 border-b-2 border-ink">
              <span className="font-bold text-ink uppercase tracking-wider text-[11px]">Daftar Bab Privasi</span>
              <span className="badge-brutal px-2 py-0.5 rounded text-[10px] font-bold bg-canvas text-ink">10 Bab</span>
            </div>

            {/* Search Clause Input */}
            <div className="relative">
              <Icon name="search" className="w-3.5 h-3.5 absolute left-3 top-3 text-stone-500" />
              <input type="text" id="clauseSearchInput" ref={searchRef} placeholder="Cari topik privasi / data..." className="w-full bg-canvas border-2 border-ink rounded-xl px-3 py-2 pl-8 text-xs font-sans text-ink focus:outline-none focus:ring-2 focus:ring-ink min-h-[40px]" />
            </div>

            {/* Nav Links List */}
            <nav className="space-y-1 max-h-[55vh] overflow-y-auto no-scrollbar pr-1 pt-1" id="clauseNavList">
              <a href="#bab-1" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 01 — Ruang Lingkup & Komitmen Privasi</a>
              <a href="#bab-2" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 02 — Kategori Data yang Dikumpulkan</a>
              <a href="#bab-3" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 03 — Tujuan Pemrosesan Data</a>
              <a href="#bab-4" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 04 — Kerahasiaan Brief & Isolasi AI Engine</a>
              <a href="#bab-5" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 05 — Keamanan & Enkripsi Data</a>
              <a href="#bab-6" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 06 — Pembagian Data Pihak Ketiga</a>
              <a href="#bab-7" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 07 — Hak Subjek Data Klien (UU PDP)</a>
              <a href="#bab-8" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 08 — Retensi & Masa Simpan Data</a>
              <a href="#bab-9" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 09 — Penggunaan Penyimpanan Lokal</a>
              <a href="#bab-10" className="block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition border-transparent text-stone-600 hover:text-ink hover:border-ink hover:bg-sand/40">Bab 10 — Kontak Petugas Pelindungan Data (DPO)</a>
            </nav>

          </div>
        </aside>

        {/* Detailed Privacy Clauses (8 Cols) */}
        <div className="lg:col-span-8 space-y-6 font-sans text-xs sm:text-sm text-stone-700 leading-relaxed" id="clauseContainer">
          
          {/* Bab 01 */}
          <section id="bab-1" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 01</span>
              <span>•</span>
              <span className="uppercase">Ruang Lingkup & Komitmen Privasi</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">1. Prinsip Perlindungan Data Karsa Studio</h2>
            <p>Karsa Studio (usekarsa.co) memegang komitmen tertinggi dalam menjaga integritas, kerahasiaan, dan keamanan informasi pribadi serta data komersial bisnis yang dipercayakan oleh Klien.</p>
            <p>Kebijakan Privasi ini menjelaskan secara transparan bagaimana kami mengumpulkan, mengelola, memproses, menyimpan, dan melindungi data pribadi sesuai ketentuan Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).</p>
          </section>

          {/* Bab 02 */}
          <section id="bab-2" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 02</span>
              <span>•</span>
              <span className="uppercase">Kategori Data yang Dikumpulkan</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">2. Data yang Kami Peroleh dari Klien</h2>
            <p>Kami hanya mengumpulkan data yang mutlak diperlukan untuk mengeksekusi penyusunan 30 naskah konten dan pengiriman deliverables:</p>
            
            <div className="space-y-2.5 font-mono text-xs mt-2">
              <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                <strong className="text-ink block font-bold">A. Data Identitas & Akun Pribadi</strong>
                <p className="font-sans text-stone-600 mt-0.5">Nama lengkap, nama display, alamat email aktif, nomor WhatsApp terverifikasi, dan foto profil/avatar akun.</p>
              </div>
              <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                <strong className="text-ink block font-bold">B. Data Parameter Brief Bisnis</strong>
                <p className="font-sans text-stone-600 mt-0.5">Nama brand/produk, kategori industri, rentang harga, target audiens spesifik, profil masalah konsumen, dan nama 1 akun kompetitor acuan.</p>
              </div>
              <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                <strong className="text-ink block font-bold">C. Data Transaksi & Pembayaran</strong>
                <p className="font-sans text-stone-600 mt-0.5">Nomor invoice pesanan (INV-XXXXXX), metode pembayaran (QRIS/VA), tanggal transaksi, dan status verifikasi bayar. Kami tidak pernah menyimpan nomor kartu kredit atau data otentikasi perbankan Klien.</p>
              </div>
            </div>
          </section>

          {/* Bab 03 */}
          <section id="bab-3" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 03</span>
              <span>•</span>
              <span className="uppercase">Tujuan Pemrosesan Data</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">3. Landasan & Pemanfaatan Data</h2>
            <p>Informasi yang diberikan Klien diproses secara sah untuk tujuan:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700 font-sans">
              <li>Memetakan 4 pilar sudut pesan diferensiasi brand dan menyusun 30 naskah video vertikal kata-per-kata.</li>
              <li>Membuat database ruang kerja Notion Content OS dan mengatur hak akses Customer Hub.</li>
              <li>Mengirimkan notifikasi status SLA pengerjaan, berkas invoice resmi, dan link serah terima via Email atau WhatsApp.</li>
              <li>Memverifikasi transaksi keuangan bersama mitra payment gateway resmi berlisensi Bank Indonesia.</li>
            </ul>
          </section>

          {/* Bab 04 */}
          <section id="bab-4" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 04</span>
              <span>•</span>
              <span className="uppercase">Kerahasiaan Brief & Isolasi AI Engine</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">4. Perlakuan Data pada Sistem AI</h2>
            <p>Dalam proses drafting naskah, data brief Klien diproses melalui infrastruktur enterprise API terisolasi.</p>
            
            <div className="p-4 bg-brutalYellow/30 border-2 border-ink rounded-2xl font-mono text-xs space-y-1 text-stone-800 shadow-brutal-sm">
              <strong className="text-ink font-bold block">Zero AI Training Clause:</strong>
              <p className="font-sans text-xs sm:text-sm">Parameter brief, rahasia dagang, strategi margin, dan nama produk Klien <strong>tidak digunakan untuk melatih model AI publik (zero training retention)</strong>. Data Klien bersifat privat dan hanya digunakan untuk menyusun kalender konten milik Klien bersangkutan.</p>
            </div>
          </section>

          {/* Bab 05 */}
          <section id="bab-5" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 05</span>
              <span>•</span>
              <span className="uppercase">Keamanan & Enkripsi Data</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">5. Proteksi Teknis & Operasional</h2>
            <p>Kami menerapkan standar keamanan berlapis untuk mencegah akses tidak sah:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700 font-sans">
              <li><strong>Enkripsi Transit:</strong> Seluruh lalu lintas data di usekarsa.co dilindungi enkripsi SSL/TLS 256-bit standar industri perbankan.</li>
              <li><strong>Enkripsi Database:</strong> Informasi akun dan pesanan disimpan dalam infrastruktur basis data terenkripsi (encryption at rest).</li>
              <li><strong>Akses Terbatas:</strong> Hanya tim copywriter dan kurator QC berwenang yang dapat mengakses detail brief naskah.</li>
            </ul>
          </section>

          {/* Bab 06 */}
          <section id="bab-6" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 06</span>
              <span>•</span>
              <span className="uppercase">Pembagian Data Pihak Ketiga</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">6. Komitmen Nol Penjualan Data</h2>
            <p>Karsa Studio <strong>tidak pernah dan tidak akan pernah menjual, menyewakan, atau memperdagangkan data pribadi Klien</strong> kepada pihak ketiga, pengiklan, atau broker data mana pun.</p>
            <p>Data hanya dibagikan secara terbatas kepada mitra infrastruktur esensial:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-stone-700 font-sans">
              <li><strong>Payment Gateway:</strong> Untuk penerbitan kode QRIS dinamis dan verifikasi Virtual Account otomatis.</li>
              <li><strong>Infrastruktur Hosting & Database:</strong> Penyedia server cloud dengan standar keamanan ketat.</li>
            </ul>
          </section>

          {/* Bab 07 */}
          <section id="bab-7" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 07</span>
              <span>•</span>
              <span className="uppercase">Hak Subjek Data Klien (UU PDP)</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">7. Hak Kendali Penuh Klien</h2>
            <p>Sesuai dengan UU PDP Nomor 27 Tahun 2022, Klien memiliki hak penuh untuk:</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs pt-1">
              <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                <strong className="text-ink block font-sans font-bold">Hak Akses & Portabilitas</strong>
                <span className="text-stone-600 text-xs">Meminta salinan data brief dan naskah milik akun Anda.</span>
              </div>
              <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                <strong className="text-ink block font-sans font-bold">Hak Pembaruan Data</strong>
                <span className="text-stone-600 text-xs">Mengubah profil dan kontak di menu Pengaturan Profil.</span>
              </div>
              <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                <strong className="text-ink block font-sans font-bold">Hak Penghapusan (Erasure)</strong>
                <span className="text-stone-600 text-xs">Meminta penghapusan permanen riwayat akun dari basis data.</span>
              </div>
              <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                <strong className="text-ink block font-sans font-bold">Hak Penarikan Persetujuan</strong>
                <span className="text-stone-600 text-xs">Membatalkan izin penerimaan notifikasi operasional berkala.</span>
              </div>
            </div>
          </section>

          {/* Bab 08 */}
          <section id="bab-8" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 08</span>
              <span>•</span>
              <span className="uppercase">Retensi & Masa Simpan Data</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">8. Jangka Waktu Penyimpanan</h2>
            <p>Data riwayat naskah dan duplikasi Notion disimpan di Customer Hub selama akun Klien aktif, guna memudahkan Klien mengakses kembali arsip kalender konten di masa depan.</p>
            <p>Jika Klien mengajukan permohonan penutupan akun, seluruh data identitas dan arsip brief akan dihapus secara permanen dari server aktif dalam waktu maksimal <strong>14 hari kerja</strong>.</p>
          </section>

          {/* Bab 09 */}
          <section id="bab-9" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 09</span>
              <span>•</span>
              <span className="uppercase">Penggunaan Penyimpanan Lokal</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">9. Teknologi Penyimpanan Perangkat</h2>
            <p>Kami menggunakan Local Storage browser dan cookies fungsional untuk menyimpan sesi login dan data Brand Vault lokal pengguna. Kami tidak menggunakan cookies pihak ketiga yang bersifat melacak lintas situs (cross-site invasive tracking).</p>
          </section>

          {/* Bab 10 */}
          <section id="bab-10" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 bg-white">
            <div className="flex items-center gap-2 font-mono text-xs text-stone-600 pb-2 border-b-2 border-ink font-bold">
              <span className="text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">BAB 10</span>
              <span>•</span>
              <span className="uppercase">Kontak Petugas Pelindungan Data (DPO)</span>
            </div>
            <h2 className="font-display font-extrabold text-lg sm:text-xl text-ink">10. Saluran Resmi Permohonan Data</h2>
            <p>Untuk mengajukan hak penghapusan data, pertanyaan privasi, atau permintaan klarifikasi, hubungi Petugas Pelindungan Data resmi kami melalui:</p>
            
            <div className="p-4 bg-canvas rounded-2xl border-2 border-ink font-mono text-xs space-y-1.5 text-stone-700 shadow-brutal-sm">
              <p><strong>Email Tim Privasi:</strong> halo@usekarsa.co</p>
              <p><strong>WhatsApp Data Officer:</strong> +62 812-3456-7890</p>
              <p><strong>Entitas Layanan:</strong> Karsa Studio Indonesia (usekarsa.co)</p>
            </div>
          </section>

        </div>

      </div>

      {/* Bottom Quick Navigation Matrix */}
      <div className="text-center pt-8 border-t-2 border-ink font-mono text-xs space-y-3">
        <div className="flex items-center justify-center gap-4 text-stone-600 font-bold">
          <a href="/terms" className="hover:underline hover:text-ink transition">Syarat & Ketentuan</a>
          <span>•</span>
          <a href="/privacy" className="text-ink font-black underline">Kebijakan Privasi</a>
          <span>•</span>
          <a href="/refund" className="hover:underline hover:text-ink transition">Jaminan SLA & Kompensasi</a>
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
        <a className="hover:underline hover:text-ink" href="/refund">Jaminan SLA</a>
        <a className="hover:underline hover:text-ink" href="/">Kembali ke Beranda</a>
      </div>
    </div>
  </footer>

  

    </div>
  );
}
