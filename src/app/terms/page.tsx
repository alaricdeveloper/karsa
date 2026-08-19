"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Search } from "lucide-react";

export default function TermsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("");

  const handleFilterClauses = useCallback((query: string) => {
    const clauses = document.querySelectorAll(".legal-clause");
    clauses.forEach((clause) => {
      const text = (clause as HTMLElement).innerText.toLowerCase();
      if (text.includes(query.toLowerCase())) {
        (clause as HTMLElement).style.display = "block";
      } else {
        (clause as HTMLElement).style.display = "none";
      }
    });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    handleFilterClauses(value);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll(".legal-clause");
      const navLinks = document.querySelectorAll(".toc-link");

      let currentSectionId = "";
      sections.forEach((sec) => {
        const top = (sec as HTMLElement).offsetTop - 120;
        if (window.pageYOffset >= top) {
          currentSectionId = sec.getAttribute("id") || "";
        }
      });

      setActiveSection(currentSectionId);

      navLinks.forEach((link) => {
        const el = link as HTMLElement;
        if (el.getAttribute("href") === "#" + currentSectionId) {
          el.classList.add("active");
        } else {
          el.classList.remove("active");
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tocLinks = [
    { href: "#pasal-1", label: "Pasal 01 — Definisi & Pihak Terikat" },
    { href: "#pasal-2", label: "Pasal 02 — Ruang Lingkup Deliverables" },
    { href: "#pasal-3", label: "Pasal 03 — Mekanisme Order & Parameter Brief" },
    { href: "#pasal-4", label: "Pasal 04 — Service Level Agreement (SLA)" },
    { href: "#pasal-5", label: "Pasal 05 — Kebijakan Kalibrasi & Revisi" },
    { href: "#pasal-6", label: "Pasal 06 — Hak Kekayaan Intelektual (IP)" },
    { href: "#pasal-7", label: "Pasal 07 — Kerahasiaan Data Bisnis (NDA)" },
    { href: "#pasal-8", label: "Pasal 08 — Kebijakan Pembayaran & Pengembalian" },
    { href: "#pasal-9", label: "Pasal 09 — Batasan Tanggung Jawab & Liabilitas" },
    { href: "#pasal-10", label: "Pasal 10 — Keadaan Memaksa (Force Majeure)" },
    { href: "#pasal-11", label: "Pasal 11 — Hukum & Penyelesaian Sengketa" },
    { href: "#pasal-12", label: "Pasal 12 — Komunikasi & Kontak Resmi" },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .bento-card {
          background: #FFFFFF;
          border: 1px solid #E5E5E0;
          transition: border-color 0.2s ease, transform 0.2s ease;
        }
        .bento-card:hover {
          border-color: #A3A39E;
        }
        .legal-clause {
          scroll-margin-top: 5.5rem;
        }
        .toc-link.active {
          color: #171615;
          font-weight: 700;
          border-left-color: #171615;
        }
      `}} />

      {/* TOP APP BAR */}
      <header className="sticky top-0 z-30 bg-sand-50/95 backdrop-blur-md border-b border-sand-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-serif text-2xl sm:text-3xl tracking-tight text-sand-900 font-normal">Karsa</span>
            <span className="text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0.5 bg-sand-200 text-sand-800 rounded font-semibold">Legal Council</span>
          </Link>
          <div className="flex items-center space-x-3 text-xs font-mono">
            <Link href="/dashboard" className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-sand-300 rounded-xl hover:bg-sand-100 transition text-stone-700 shadow-sm">
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Workspace</span>
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN VIEWPORT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10">

        {/* PAGE HERO HEADER */}
        <section className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-stone-700 bg-sand-100 border border-sand-200 px-3 py-1 rounded-full">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            Master Service Agreement (MSA) & Ketentuan Hukum Resmi
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-sand-900 leading-tight">
            Perjanjian Induk & Syarat Ketentuan Layanan <br />
            <span className="italic text-stone-600 font-serif">(Terms of Service & IP Policy)</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
            Berlaku per 19 Agustus 2026. Dokumen ini merupakan instrumen hukum yang mengikat antara Karsa Studio (<span className="font-mono text-sand-900">usekarsa.co</span>) dan Klien terkait pemesanan, produksi konten, hak kekayaan intelektual, batas liabilitas, serta jaminan layanan.
          </p>
        </section>

        {/* QUICK HIGHLIGHT TILES */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-mono text-xs">
          <div className="bento-card p-4 rounded-2xl space-y-1">
            <span className="text-[10px] text-stone-400 uppercase block">1. SLA Produksi</span>
            <span className="text-sm sm:text-base font-bold text-sand-900 block font-serif">Maksimal 24 Jam</span>
            <span className="text-[10px] text-emerald-700">Garansi 5 naskah jika telat</span>
          </div>
          <div className="bento-card p-4 rounded-2xl space-y-1">
            <span className="text-[10px] text-stone-400 uppercase block">2. Kepemilikan IP</span>
            <span className="text-sm sm:text-base font-bold text-sand-900 block font-serif">100% Hak Milik Klien</span>
            <span className="text-[10px] text-stone-500">Bebas monetisasi & iklan</span>
          </div>
          <div className="bento-card p-4 rounded-2xl space-y-1">
            <span className="text-[10px] text-stone-400 uppercase block">3. Jendela Kalibrasi</span>
            <span className="text-sm sm:text-base font-bold text-sand-900 block font-serif">48 Jam Bebas Revisi</span>
            <span className="text-[10px] text-stone-500">Penyesuaian tone & hook</span>
          </div>
          <div className="bento-card p-4 rounded-2xl space-y-1">
            <span className="text-[10px] text-stone-400 uppercase block">4. Kerahasiaan Data</span>
            <span className="text-sm sm:text-base font-bold text-sand-900 block font-serif">Standar NDA Penuh</span>
            <span className="text-[10px] text-stone-500">Brief & rahasia aman 100%</span>
          </div>
        </div>

        {/* MAIN LEGAL DOCUMENT SECTION (SIDEBAR TOC + CONTENT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* STICKY SIDEBAR TABLE OF CONTENTS */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4">
            <div className="bento-card p-5 rounded-2xl space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-sand-200">
                <span className="font-bold text-sand-900 uppercase tracking-wider text-[11px]">Daftar Pasal Hukum</span>
                <span className="text-[10px] text-stone-400">12 Pasal</span>
              </div>

              {/* SEARCH INPUT FILTER */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari pasal atau kata kunci..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full bg-sand-50 border border-sand-300 rounded-xl px-3 py-2 pl-8 text-xs font-sans focus:outline-none focus:border-sand-900"
                />
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-400" />
              </div>

              <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-1 no-scrollbar">
                {tocLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`toc-link block py-1.5 pl-3 border-l-2 border-transparent text-stone-600 hover:text-sand-900 transition text-[11px]${activeSection === link.href.slice(1) ? " active" : ""}`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* CONTENT ARTICLES */}
          <div className="lg:col-span-8 space-y-6 font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">

            {/* PASAL 1 */}
            <section id="pasal-1" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-stone-500 pb-2 border-b border-sand-200">
                <span className="font-bold text-sand-900">PASAL 01</span>
                <span>&bull;</span>
                <span className="uppercase">Definisi & Pihak yang Terikat</span>
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-sand-900">1. Definisi Operasional</h2>
              <p>Dalam Syarat dan Ketentuan ini, istilah-istilah di bawah ini memiliki pengertian sebagai berikut:</p>
              <ul className="list-disc pl-5 space-y-1 text-stone-800">
                <li><strong>&quot;Penyedia Layanan&quot;:</strong> Merujuk pada Karsa Studio, entitas pemilik platform <span className="font-mono text-xs">usekarsa.co</span>.</li>
                <li><strong>&quot;Klien / Pengguna&quot;:</strong> Setiap individu, badan usaha, kreator, atau pemegang hak bisnis yang melakukan pendaftaran akun, pengisian brief, atau transaksi pembayaran di platform Karsa.</li>
                <li><strong>&quot;Deliverables&quot;:</strong> Seluruh berkas naskah video, takarir media sosial, artikel blog SEO, audit celah kompetitor, dan ruang kerja Notion yang diserahkan kepada Klien.</li>
                <li><strong>&quot;Kalibrasi&quot;:</strong> Permintaan penyesuaian sudut pesan atau nada bicara naskah dalam batas waktu yang disepakati tanpa mengubah entitas brand utama.</li>
              </ul>
            </section>

            {/* PASAL 2 */}
            <section id="pasal-2" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-stone-500 pb-2 border-b border-sand-200">
                <span className="font-bold text-sand-900">PASAL 02</span>
                <span>&bull;</span>
                <span className="uppercase">Ruang Lingkup 6 Deliverables</span>
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-sand-900">2. Cakupan Inventaris Konten</h2>
              <p>Setiap transaksi 1 Batch (Rp 299.000) mengikat Penyedia Layanan untuk menyerahkan 6 komponen aset digital berikut:</p>
              <div className="space-y-2 font-mono text-xs text-stone-800">
                <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
                  <strong className="text-sand-900 block">A. 30 Naskah Video Pendek Kata-per-Kata (Short-Form Scripts)</strong>
                  <p className="font-sans text-stone-600 mt-0.5">Disusun untuk format vertikal (TikTok, Instagram Reels, YouTube Shorts) dengan durasi rekam 15-30 detik. Format mencakup: Visual & Audio Hook (0-3s), Problem Framing, Value Delivery, dan Direct CTA.</p>
                </div>
                <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
                  <strong className="text-sand-900 block">B. 30 Takarir Berstruktur AIDA & 15 Tagar</strong>
                  <p className="font-sans text-stone-600 mt-0.5">Copywriting formula Attention, Interest, Desire, Action siap pakai untuk Instagram & Threads, lengkap dengan klasifikasi tagar 3-tier (Broad, Niche, Micro).</p>
                </div>
                <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
                  <strong className="text-sand-900 block">C. 4 Artikel Blog SEO (1.000 Kata)</strong>
                  <p className="font-sans text-stone-600 mt-0.5">Artikel panjang siap publikasi dengan penataan heading H1/H2/H3, density kata kunci natural, dan meta deskripsi ramah mesin pencari Google.</p>
                </div>
                <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
                  <strong className="text-sand-900 block">D. Positioning Blueprint & Audit Celah 1 Kompetitor</strong>
                  <p className="font-sans text-stone-600 mt-0.5">Analisis diferensiasi sudut pandang dari 1 akun kompetitor yang didaftarkan oleh Klien.</p>
                </div>
                <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
                  <strong className="text-sand-900 block">E. Notion Content OS Database</strong>
                  <p className="font-sans text-stone-600 mt-0.5">Ruang kerja database Notion dengan Calendar Matrix View dan status manajemen publikasi harian yang dapat diduplikasi dalam 1 klik.</p>
                </div>
                <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
                  <strong className="text-sand-900 block">F. Panduan Visual B-Roll Kamera Ponsel</strong>
                  <p className="font-sans text-stone-600 mt-0.5">Instruksi sudut kamera, pencahayaan alami jendela, dan panduan gestur rekam yang ramah pemula tanpa perlu alat produksi mahal.</p>
                </div>
              </div>
            </section>

            {/* PASAL 3 */}
            <section id="pasal-3" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-stone-500 pb-2 border-b border-sand-200">
                <span className="font-bold text-sand-900">PASAL 03</span>
                <span>&bull;</span>
                <span className="uppercase">Mekanisme Pemesanan & Parameter Brief</span>
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-sand-900">3. Kewajiban & Keabsahan Data Klien</h2>
              <p>Klien bertanggung jawab penuh atas keakuratan data yang dicantumkan dalam formulir brief (Nama Brand, Deskripsi Produk, Target Audiens, dan Akun Kompetitor Acuan).</p>
              <p>Penyedia Layanan tidak bertanggung jawab atas ketidaksesuaian naskah yang diakibatkan oleh informasi produk yang sengaja dipalsukan atau tidak lengkap saat pengisian formulir brief.</p>
            </section>

            {/* PASAL 4 */}
            <section id="pasal-4" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-stone-500 pb-2 border-b border-sand-200">
                <span className="font-bold text-sand-900">PASAL 04</span>
                <span>&bull;</span>
                <span className="uppercase">Service Level Agreement (SLA) 24 Jam</span>
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-sand-900">4. Komitmen Waktu & Klausul Kompensasi</h2>
              <p>Waktu pengerjaan 1x24 jam kerja dihitung secara otomatis sejak sistem mencatat konfirmasi pembayaran LUNAS dan parameter brief telah divalidasi.</p>
              <div className="p-4 bg-sand-50 border border-sand-200 rounded-2xl font-mono text-xs space-y-1 text-stone-700">
                <strong className="text-sand-900 font-bold block">Jaminan Keterlambatan Waktu:</strong>
                <p className="font-sans">Apabila berkas pesanan terlambat diserahkan melampaui batas SLA 24 jam kerja yang diakibatkan oleh kelalaian operasional internal Penyedia Layanan, Klien berhak memperoleh <strong>kompensasi gratis berupa 5 naskah video pendek viral tambahan</strong> yang akan dimasukkan langsung ke Notion OS Klien.</p>
              </div>
            </section>

            {/* PASAL 5 */}
            <section id="pasal-5" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-stone-500 pb-2 border-b border-sand-200">
                <span className="font-bold text-sand-900">PASAL 05</span>
                <span>&bull;</span>
                <span className="uppercase">Kebijakan Kalibrasi & Batas Revisi</span>
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-sand-900">5. Ketentuan Revisi Bebas 48 Jam</h2>
              <p>Klien berhak mengajukan penyesuaian sudut pesan (*kalibrasi*) dalam kurun waktu <strong>48 jam kalender</strong> terhitung sejak tautan Customer Hub dan berkas Notion diserahkan.</p>
              <ul className="list-disc pl-5 space-y-1 text-stone-700 font-sans">
                <li><strong>Cakupan Kalibrasi yang Didukung:</strong> Penyesuaian nada bicara (*casual/formal*), penggantian variasi kata hook, atau penekanan USP produk tertentu.</li>
                <li><strong>Pengecualian:</strong> Kalibrasi tidak berlaku untuk perubahan nama brand bisnis, perpindahan kategori produk secara total, atau penggantian akun kompetitor yang berbeda dari brief awal.</li>
              </ul>
            </section>

            {/* PASAL 6 */}
            <section id="pasal-6" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-stone-500 pb-2 border-b border-sand-200">
                <span className="font-bold text-sand-900">PASAL 06</span>
                <span>&bull;</span>
                <span className="uppercase">Hak Kekayaan Intelektual (Intellectual Property)</span>
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-sand-900">6. Pengalihan Kepemilikan 100% ke Klien</h2>
              <p>Seluruh hak cipta, hak penggandaan, dan hak eksploitasi komersial atas 30 naskah, takarir, dan 4 artikel blog SEO dialihkan secara <strong>penuh, mutlak, dan bebas royalti</strong> kepada Klien segera setelah status transaksi LUNAS.</p>
              <p>Klien berhak menggunakan karya tersebut untuk materi iklan berbayar (Meta Ads, TikTok Ads, Google Ads), mendaftarkan hak cipta, atau mengedit teks sesuai kebutuhan tanpa kewajiban mencantumkan kredit ke Karsa Studio.</p>
            </section>

            {/* PASAL 7 */}
            <section id="pasal-7" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-stone-500 pb-2 border-b border-sand-200">
                <span className="font-bold text-sand-900">PASAL 07</span>
                <span>&bull;</span>
                <span className="uppercase">Kerahasiaan Data Bisnis (Non-Disclosure Agreement)</span>
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-sand-900">7. Perlindungan Rahasia Dagang</h2>
              <p>Penyedia Layanan terikat secara hukum untuk menjaga kerahasiaan seluruh dokumen, data penjualan, margin keuntungan, dan informasi proprietary milik Klien yang dicantumkan dalam formulir brief.</p>
              <p>Data tersebut tidak akan pernah dipublikasikan, dibagikan kepada pihak ketiga, atau dijadikan materi publikasi studi kasus tanpa izin tertulis dari Klien.</p>
            </section>

            {/* PASAL 8 */}
            <section id="pasal-8" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-stone-500 pb-2 border-b border-sand-200">
                <span className="font-bold text-sand-900">PASAL 08</span>
                <span>&bull;</span>
                <span className="uppercase">Kebijakan Pembayaran & Pengembalian Dana</span>
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-sand-900">8. Ketentuan Finansial</h2>
              <p>Seluruh transaksi diproses dalam mata uang Rupiah (IDR) secara flat tanpa biaya tersembunyi. Mengingat produk yang diserahkan berupa aset intelektual digital siap konsumsi, pembatalan pesanan dan pengembalian dana (*refund*) tidak dapat dilakukan setelah proses pengerjaan naskah berjalan lebih dari 2 jam di sistem antrean.</p>
            </section>

            {/* PASAL 9 */}
            <section id="pasal-9" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-stone-500 pb-2 border-b border-sand-200">
                <span className="font-bold text-sand-900">PASAL 09</span>
                <span>&bull;</span>
                <span className="uppercase">Batasan Tanggung Jawab (Limitation of Liability)</span>
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-sand-900">9. Batasan Jaminan Performa Algoritma</h2>
              <p>Penyedia Layanan menjamin kualitas struktur naskah, ketepatan formula hook psikologis, dan relevansi SEO. Namun demikian, performa views, engagement, algoritma platform pihak ketiga (TikTok/Instagram/Google), dan konversi penjualan akhir dipengaruhi oleh faktor eksternal (kualitas pembawaan talent, pencahayaan video, dan kualitas produk Klien) di luar kendali Penyedia Layanan.</p>
            </section>

            {/* PASAL 10 */}
            <section id="pasal-10" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-stone-500 pb-2 border-b border-sand-200">
                <span className="font-bold text-sand-900">PASAL 10</span>
                <span>&bull;</span>
                <span className="uppercase">Keadaan Memaksa (Force Majeure)</span>
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-sand-900">10. Penundaan Akibat Kondisi Luar Biasa</h2>
              <p>Penyedia Layanan dibebaskan dari tuntutan keterlambatan SLA jika terjadi gangguan infrastruktur internet global, bencana alam, pemadaman listrik massal, atau kebijakan regulasi pemerintah yang melumpuhkan operasional secara menyeluruh.</p>
            </section>

            {/* PASAL 11 */}
            <section id="pasal-11" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-stone-500 pb-2 border-b border-sand-200">
                <span className="font-bold text-sand-900">PASAL 11</span>
                <span>&bull;</span>
                <span className="uppercase">Hukum & Penyelesaian Sengketa</span>
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-sand-900">11. Yurisdiksi Hukum Indonesia</h2>
              <p>Perjanjian ini diatur dan ditafsirkan berdasarkan hukum Republik Indonesia. Setiap perselisihan yang timbul akan diselesaikan terlebih dahulu melalui musyawarah mufakat. Apabila tidak tercapai mufakat dalam waktu 30 hari, sengketa akan diselesaikan melalui Badan Arbitrase Nasional Indonesia (BANI).</p>
            </section>

            {/* PASAL 12 */}
            <section id="pasal-12" className="legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3">
              <div className="flex items-center gap-2 font-mono text-xs text-stone-500 pb-2 border-b border-sand-200">
                <span className="font-bold text-sand-900">PASAL 12</span>
                <span>&bull;</span>
                <span className="uppercase">Komunikasi & Kontak Resmi</span>
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-sand-900">12. Saluran Komunikasi Resmi</h2>
              <p>Seluruh notifikasi resmi, pertanyaan legalitas, atau pengajuan kalibrasi dapat disampaikan melalui:</p>
              <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 font-mono text-xs space-y-1 text-stone-800">
                <p><strong>Email Legalitas:</strong> hello.usekarsa@gmail.com</p>
                <p><strong>WhatsApp Support:</strong> +62 812-8800-9920</p>
                <p><strong>Website:</strong> https://usekarsa.co</p>
              </div>
            </section>

          </div>
        </div>

        {/* FOOTER CALL TO ACTION */}
        <div className="text-center pt-8 border-t border-sand-200 font-mono text-xs space-y-3">
          <p className="text-stone-500">Dengan memesan paket Karsa Studio, kamu menyetujui seluruh klausul di atas.</p>
          <div className="flex items-center justify-center gap-3">
            <Link href="/" className="px-5 py-2.5 bg-sand-900 text-sand-50 rounded-xl hover:bg-stone-800 transition font-bold shadow-sm">
              Kembali ke Beranda
            </Link>
            <Link href="/checkout" className="px-5 py-2.5 bg-white border border-sand-300 text-sand-900 rounded-xl hover:bg-sand-100 transition font-bold shadow-sm">
              Lanjut ke Pembayaran &rarr;
            </Link>
          </div>
        </div>

      </main>
    </>
  );
}
