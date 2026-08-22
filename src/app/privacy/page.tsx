"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Lock, Search } from "lucide-react";

export default function PrivacyPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("bab-1");
  const clauseRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      let currentId = "bab-1";
      clauseRefs.current.forEach((sec) => {
        if (!sec) return;
        const top = sec.offsetTop - 120;
        if (window.pageYOffset >= top) {
          currentId = sec.id;
        }
      });
      setActiveSection(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const tocLinks = [
    { href: "#bab-1", label: "Bab 01 — Ruang Lingkup & Komitmen" },
    { href: "#bab-2", label: "Bab 02 — Kategori Data yang Dikumpulkan" },
    { href: "#bab-3", label: "Bab 03 — Tujuan Pemrosesan Data" },
    { href: "#bab-4", label: "Bab 04 — Kerahasiaan Brief & AI Engine" },
    { href: "#bab-5", label: "Bab 05 — Keamanan & Enkripsi Data" },
    { href: "#bab-6", label: "Bab 06 — Pembagian Pihak Ketiga" },
    { href: "#bab-7", label: "Bab 07 — Hak-Hak Subjek Data (Klien)" },
    { href: "#bab-8", label: "Bab 08 — Retensi & Penghapusan Data" },
    { href: "#bab-9", label: "Bab 09 — Penggunaan Cookies & Analitik" },
    { href: "#bab-10", label: "Bab 10 — Data Protection Officer (DPO)" },
  ];

  const setClauseRef = (index: number) => (el: HTMLElement | null) => {
    clauseRefs.current[index] = el;
  };

  const matchesSearch = (text: string) =>
    text.toLowerCase().includes(searchQuery.toLowerCase());

  const filterClauses = (text: string) => {
    if (!searchQuery) return true;
    return matchesSearch(text);
  };

  return (
    <>
      <style>{`
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
      `}</style>

      <div className="bg-sand-50 text-sand-900 font-sans antialiased selection:bg-sand-900 selection:text-sand-50 pb-24 touch-manipulation min-h-screen">
        {/* TOP APP BAR */}
        <header className="sticky top-0 z-30 bg-sand-50/95 backdrop-blur-md border-b border-sand-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href="/" className="flex items-center space-x-2">
              <span className="font-serif text-2xl sm:text-3xl tracking-tight text-sand-900 font-normal">
                Karsa
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono uppercase px-2 py-0.5 bg-sand-200 text-sand-800 rounded font-semibold">
                Data Protection
              </span>
            </a>
            <div className="flex items-center space-x-3 text-xs font-mono">
              <a
                href="/login"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-sand-300 rounded-xl hover:bg-sand-100 transition text-stone-700 shadow-sm"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Workspace</span>
              </a>
            </div>
          </div>
        </header>

        {/* MAIN VIEWPORT */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10">
          {/* PAGE HERO HEADER */}
          <section className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-stone-700 bg-sand-100 border border-sand-200 px-3 py-1 rounded-full">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              Pelindungan Data Pribadi & Privasi Bisnis Klien
            </div>
            <h1 className="text-3xl sm:text-5xl font-serif text-sand-900 leading-tight">
              Kebijakan Privasi & Data Pribadi <br />
              <span className="italic text-stone-600 font-serif">
                (Privacy Policy & PDP Compliance)
              </span>
            </h1>
            <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed">
              Terakhir diperbarui: 19 Agustus 2026. Disusun berdasarkan
              Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang
              Pelindungan Data Pribadi (UU PDP) dan standar tata kelola data
              digital global.
            </p>
          </section>

          {/* HIGHLIGHT TRUST TILES */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-mono text-xs">
            <div className="bento-card p-4 rounded-2xl space-y-1">
              <span className="text-[10px] text-stone-400 uppercase block">
                1. Perlindungan Brief
              </span>
              <span className="text-sm sm:text-base font-bold text-sand-900 block font-serif">
                100% Rahasia Dagang
              </span>
              <span className="text-[10px] text-stone-500">
                Enkripsi data formulir
              </span>
            </div>
            <div className="bento-card p-4 rounded-2xl space-y-1">
              <span className="text-[10px] text-stone-400 uppercase block">
                2. Monetisasi Pihak Ketiga
              </span>
              <span className="text-sm sm:text-base font-bold text-emerald-700 block font-serif">
                Zero Data Selling
              </span>
              <span className="text-[10px] text-stone-500">
                Tidak pernah menjual data
              </span>
            </div>
            <div className="bento-card p-4 rounded-2xl space-y-1">
              <span className="text-[10px] text-stone-400 uppercase block">
                3. Keamanan Transaksi
              </span>
              <span className="text-sm sm:text-base font-bold text-sand-900 block font-serif">
                Enkripsi 256-Bit SSL
              </span>
              <span className="text-[10px] text-stone-500">
                PCI-DSS terakreditasi
              </span>
            </div>
            <div className="bento-card p-4 rounded-2xl space-y-1">
              <span className="text-[10px] text-stone-400 uppercase block">
                4. Hak Kendali Klien
              </span>
              <span className="text-sm sm:text-base font-bold text-sand-900 block font-serif">
                Hak Hapus Data
              </span>
              <span className="text-[10px] text-stone-500">
                1-click data erasure
              </span>
            </div>
          </div>

          {/* MAIN LEGAL DOCUMENT GRID (SIDEBAR TOC + CONTENT) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* STICKY SIDEBAR TABLE OF CONTENTS */}
            <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4">
              <div className="bento-card p-5 rounded-2xl space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-sand-200">
                  <span className="font-bold text-sand-900 uppercase tracking-wider text-[11px]">
                    Daftar Bab Privasi
                  </span>
                  <span className="text-[10px] text-stone-400">10 Bab</span>
                </div>

                {/* SEARCH FILTER */}
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Cari topik privasi / data..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-sand-50 border border-sand-300 rounded-xl px-3 py-2 pl-8 text-xs font-sans focus:outline-none focus:border-sand-900"
                  />
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-stone-400" />
                </div>

                <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-1 no-scrollbar">
                  {tocLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      className={`toc-link block py-1.5 pl-3 border-l-2 transition text-[11px] ${
                        activeSection === link.href.replace("#", "")
                          ? "active border-sand-900 text-sand-900 font-bold"
                          : "border-transparent text-stone-600 hover:text-sand-900"
                      }`}
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* CONTENT SECTIONS */}
            <div className="lg:col-span-8 space-y-6 font-sans text-xs sm:text-sm text-stone-700 leading-relaxed">
              {/* BAB 1 */}
              <section
                id="bab-1"
                ref={setClauseRef(0)}
                className={`legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 ${
                  filterClauses("BAB 01 Ruang Lingkup Komitmen Privasi Prinsip Perlindungan Data Karsa Studio usekarsa.co") ? "" : "hidden"
                }`}
              >
                <div className="flex items-center gap-2 font-mono text-xs text-stone-500 pb-2 border-b border-sand-200">
                  <span className="font-bold text-sand-900">BAB 01</span>
                  <span>&bull;</span>
                  <span className="uppercase">
                    Ruang Lingkup & Komitmen Privasi
                  </span>
                </div>
                <h2 className="font-serif font-bold text-lg sm:text-xl text-sand-900">
                  1. Prinsip Perlindungan Data Karsa
                </h2>
                <p>
                  Karsa Studio (<span className="font-mono text-xs">usekarsa.co</span>) memegang
                  komitmen tertinggi dalam menjaga integritas, kerahasiaan, dan
                  keamanan informasi pribadi serta data komersial bisnis yang
                  dipercayakan oleh Klien.
                </p>
                <p>
                  Kebijakan Privasi ini menjelaskan secara transparan bagaimana
                  kami mengumpulkan, mengelola, memproses, menyimpan, dan
                  melindungi data pribadi sesuai ketentuan{" "}
                  <strong>
                    Undang-Undang No. 27 Tahun 2022 tentang Pelindungan Data
                    Pribadi (UU PDP)
                  </strong>
                  .
                </p>
              </section>

              {/* BAB 2 */}
              <section
                id="bab-2"
                ref={setClauseRef(1)}
                className={`legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 ${
                  filterClauses("BAB 02 Kategori Data Dikumpulkan Data Peroleh Klien Identitas Akun Pribadi Parameter Brief Bisnis Transaksi Pembayaran") ? "" : "hidden"
                }`}
              >
                <div className="flex items-center gap-2 font-mono text-xs text-stone-500 pb-2 border-b border-sand-200">
                  <span className="font-bold text-sand-900">BAB 02</span>
                  <span>&bull;</span>
                  <span className="uppercase">
                    Kategori Data yang Dikumpulkan
                  </span>
                </div>
                <h2 className="font-serif font-bold text-lg sm:text-xl text-sand-900">
                  2. Data yang Kami Peroleh dari Klien
                </h2>
                <p>
                  Kami hanya mengumpulkan data yang mutlak diperlukan untuk
                  mengeksekusi penyusunan 30 naskah konten dan pengiriman
                  deliverables:
                </p>
                <div className="space-y-2 font-mono text-xs text-stone-800">
                  <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
                    <strong className="text-sand-900 block">
                      A. Data Identitas & Akun Pribadi
                    </strong>
                    <p className="font-sans text-stone-600 mt-0.5">
                      Nama lengkap, nama display, alamat email aktif, nomor
                      WhatsApp terverifikasi, dan foto profil/avatar akun.
                    </p>
                  </div>
                  <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
                    <strong className="text-sand-900 block">
                      B. Data Parameter Brief Bisnis
                    </strong>
                    <p className="font-sans text-stone-600 mt-0.5">
                      Nama brand/produk, kategori industri, rentang harga
                      produk, target audiens spesifik, profil masalah konsumen,
                      dan nama 1 akun kompetitor acuan.
                    </p>
                  </div>
                  <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
                    <strong className="text-sand-900 block">
                      C. Data Transaksi & Pembayaran
                    </strong>
                    <p className="font-sans text-stone-600 mt-0.5">
                      Nomor invoice pesanan (<span className="font-mono">INV-XXXXXX</span>),
                      metode pembayaran (QRIS/VA), tanggal/waktu transaksi, dan
                      status verifikasi bayar. Kami <em>tidak pernah</em>{" "}
                      menyimpan nomor kartu kredit atau PIN m-Banking Klien.
                    </p>
                  </div>
                </div>
              </section>

              {/* BAB 3 */}
              <section
                id="bab-3"
                ref={setClauseRef(2)}
                className={`legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 ${
                  filterClauses("BAB 03 Tujuan Pemrosesan Data Landasan Pemanfaatan Data") ? "" : "hidden"
                }`}
              >
                <div className="flex items-center gap-2 font-mono text-xs text-stone-500 pb-2 border-b border-sand-200">
                  <span className="font-bold text-sand-900">BAB 03</span>
                  <span>&bull;</span>
                  <span className="uppercase">Tujuan Pemrosesan Data</span>
                </div>
                <h2 className="font-serif font-bold text-lg sm:text-xl text-sand-900">
                  3. Landasan & Pemanfaatan Data
                </h2>
                <p>
                  Informasi yang diberikan Klien diproses secara sah untuk
                  tujuan:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-stone-800 font-sans">
                  <li>
                    Memetakan 4 pilar sudut pesan diferensiasi brand dan
                    menyusun 30 naskah video pendek kata-per-kata.
                  </li>
                  <li>
                    Membuat database ruang kerja Notion Content OS dan mengatur
                    hak akses Customer Hub.
                  </li>
                  <li>
                    Mengirimkan notifikasi status SLA pengerjaan, berkas invoice
                    resmi, dan tautan duplikasi via Email atau WhatsApp.
                  </li>
                  <li>
                    Memverifikasi transaksi keuangan bersama mitra payment
                    gateway resmi berlisensi Bank Indonesia.
                  </li>
                </ul>
              </section>

              {/* BAB 4 */}
              <section
                id="bab-4"
                ref={setClauseRef(3)}
                className={`legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 ${
                  filterClauses("BAB 04 Kerahasiaan Brief Isolasi AI Engine Perlakuan Data Sistem AI Zero AI Training") ? "" : "hidden"
                }`}
              >
                <div className="flex items-center gap-2 font-mono text-xs text-stone-500 pb-2 border-b border-sand-200">
                  <span className="font-bold text-sand-900">BAB 04</span>
                  <span>&bull;</span>
                  <span className="uppercase">
                    Kerahasiaan Brief & Isolasi AI Engine
                  </span>
                </div>
                <h2 className="font-serif font-bold text-lg sm:text-xl text-sand-900">
                  4. Perlakuan Data pada Sistem AI
                </h2>
                <p>
                  Dalam proses drafting naskah, data brief Klien diproses
                  melalui infrastruktur <em>enterprise API</em> terisolasi.
                </p>
                <div className="p-4 bg-sand-50 border border-sand-200 rounded-2xl font-mono text-xs space-y-1 text-stone-700">
                  <strong className="text-sand-900 font-bold block">
                    Zero AI Training Clause:
                  </strong>
                  <p className="font-sans">
                    Parameter brief, rahasia dagang, strategi margin, dan nama
                    produk Klien{" "}
                    <strong>
                      tidak digunakan untuk melatih model AI publik (*zero
                      training retention*)
                    </strong>
                    . Data Klien bersifat privat dan hanya digunakan untuk
                    merancang kalender konten milik Klien bersangkutan.
                  </p>
                </div>
              </section>

              {/* BAB 5 */}
              <section
                id="bab-5"
                ref={setClauseRef(4)}
                className={`legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 ${
                  filterClauses("BAB 05 Keamanan Enkripsi Data Proteksi Teknis Operasional") ? "" : "hidden"
                }`}
              >
                <div className="flex items-center gap-2 font-mono text-xs text-stone-500 pb-2 border-b border-sand-200">
                  <span className="font-bold text-sand-900">BAB 05</span>
                  <span>&bull;</span>
                  <span className="uppercase">Keamanan & Enkripsi Data</span>
                </div>
                <h2 className="font-serif font-bold text-lg sm:text-xl text-sand-900">
                  5. Proteksi Teknis & Operasional
                </h2>
                <p>
                  Kami menerapkan standar keamanan berlapis untuk mencegah akses
                  tidak sah:
                </p>
                <ul className="list-disc pl-5 space-y-1.5 text-stone-700 font-sans">
                  <li>
                    <strong>Enkripsi Transit:</strong> Seluruh lalu lintas data di{" "}
                    <span className="font-mono text-xs">usekarsa.co</span>{" "}
                    dilindungi enkripsi SSL/TLS 256-bit standar industri
                    perbankan.
                  </li>
                  <li>
                    <strong>Enkripsi Database:</strong> Informasi akun dan pesanan
                    disimpan dalam infrastruktur basis data terenkripsi
                    (*encryption at rest*).
                  </li>
                  <li>
                    <strong>Akses Terbatas:</strong> Hanya tim copywriter dan
                    kurator QC yang memiliki otorisasi tugas yang dapat mengakses
                    detail brief naskah.
                  </li>
                </ul>
              </section>

              {/* BAB 6 */}
              <section
                id="bab-6"
                ref={setClauseRef(5)}
                className={`legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 ${
                  filterClauses("BAB 06 Pembagian Data Pihak Ketiga Komitmen Nol Penjualan") ? "" : "hidden"
                }`}
              >
                <div className="flex items-center gap-2 font-mono text-xs text-stone-500 pb-2 border-b border-sand-200">
                  <span className="font-bold text-sand-900">BAB 06</span>
                  <span>&bull;</span>
                  <span className="uppercase">Pembagian Data Pihak Ketiga</span>
                </div>
                <h2 className="font-serif font-bold text-lg sm:text-xl text-sand-900">
                  6. Komitmen Nol Penjualan Data
                </h2>
                <p>
                  Karsa Studio{" "}
                  <strong>
                    tidak pernah dan tidak akan pernah menjual, menyewakan, atau
                    memperdagangkan data pribadi Klien
                  </strong>{" "}
                  kepada pihak ketiga, pengiklan, atau broker data mana pun.
                </p>
                <p>
                  Data hanya dibagikan secara terbatas kepada mitra
                  infrastruktur esensial berikut:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-stone-700 font-sans">
                  <li>
                    <strong>Payment Gateway:</strong> Untuk penerbitan kode QRIS
                    dinamis dan verifikasi Virtual Account otomatis.
                  </li>
                  <li>
                    <strong>Infrastruktur Hosting & Database:</strong> Penyedia
                    server cloud dengan standar keamanan SOC2 Type II.
                  </li>
                </ul>
              </section>

              {/* BAB 7 */}
              <section
                id="bab-7"
                ref={setClauseRef(6)}
                className={`legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 ${
                  filterClauses("BAB 07 Hak Subjek Data Klien UU PDP Kendali Penuh Akses Portabilitas Pembaruan Penghapusan Penarikan Persetujuan") ? "" : "hidden"
                }`}
              >
                <div className="flex items-center gap-2 font-mono text-xs text-stone-500 pb-2 border-b border-sand-200">
                  <span className="font-bold text-sand-900">BAB 07</span>
                  <span>&bull;</span>
                  <span className="uppercase">
                    Hak Subjek Data Klien (UU PDP)
                  </span>
                </div>
                <h2 className="font-serif font-bold text-lg sm:text-xl text-sand-900">
                  7. Hak Kendali Penuh Klien
                </h2>
                <p>
                  Sesuai dengan UU PDP Nomor 27 Tahun 2022, Klien memiliki hak
                  penuh untuk:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 font-mono text-xs pt-1">
                  <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
                    <strong className="text-sand-900 block font-sans">
                      Hak Akses & Portabilitas
                    </strong>
                    <span className="text-stone-500 text-[11px]">
                      Meminta salinan data brief dan naskah milik akun Anda.
                    </span>
                  </div>
                  <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
                    <strong className="text-sand-900 block font-sans">
                      Hak Pembaruan Data
                    </strong>
                    <span className="text-stone-500 text-[11px]">
                      Mengubah profil dan nomor kontak di Pengaturan Profil.
                    </span>
                  </div>
                  <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
                    <strong className="text-sand-900 block font-sans">
                      Hak Penghapusan (Erasure)
                    </strong>
                    <span className="text-stone-500 text-[11px]">
                      Meminta penghapusan permanen riwayat akun dari basis data.
                    </span>
                  </div>
                  <div className="p-3 bg-sand-50 rounded-xl border border-sand-200">
                    <strong className="text-sand-900 block font-sans">
                      Hak Penarikan Persetujuan
                    </strong>
                    <span className="text-stone-500 text-[11px]">
                      Membatalkan izin penerimaan notifikasi operasional berkala.
                    </span>
                  </div>
                </div>
              </section>

              {/* BAB 8 */}
              <section
                id="bab-8"
                ref={setClauseRef(7)}
                className={`legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 ${
                  filterClauses("BAB 08 Retensi Masa Simpan Data Jangka Waktu Penyimpanan") ? "" : "hidden"
                }`}
              >
                <div className="flex items-center gap-2 font-mono text-xs text-stone-500 pb-2 border-b border-sand-200">
                  <span className="font-bold text-sand-900">BAB 08</span>
                  <span>&bull;</span>
                  <span className="uppercase">
                    Retensi & Masa Simpan Data
                  </span>
                </div>
                <h2 className="font-serif font-bold text-lg sm:text-xl text-sand-900">
                  8. Jangka Waktu Penyimpanan
                </h2>
                <p>
                  Data riwayat naskah dan duplikasi Notion disimpan di Customer
                  Hub selama akun Klien aktif, guna memudahkan Klien mengakses
                  kembali arsip kalender konten di masa depan.
                </p>
                <p>
                  Jika Klien mengajukan permohonan penutupan akun, seluruh data
                  identitas dan arsip brief akan dihapus secara permanen dari
                  server aktif dalam waktu maksimal{" "}
                  <strong>14 hari kerja</strong>.
                </p>
              </section>

              {/* BAB 9 */}
              <section
                id="bab-9"
                ref={setClauseRef(8)}
                className={`legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 ${
                  filterClauses("BAB 09 Penggunaan Cookies Analitik Teknologi Penyimpanan Lokal") ? "" : "hidden"
                }`}
              >
                <div className="flex items-center gap-2 font-mono text-xs text-stone-500 pb-2 border-b border-sand-200">
                  <span className="font-bold text-sand-900">BAB 09</span>
                  <span>&bull;</span>
                  <span className="uppercase">
                    Penggunaan Cookies & Analitik
                  </span>
                </div>
                <h2 className="font-serif font-bold text-lg sm:text-xl text-sand-900">
                  9. Teknologi Penyimpanan Lokal
                </h2>
                <p>
                  Kami menggunakan <em>Local Storage</em> browser dan cookies
                  fungsional untuk menyimpan preferensi sesi login dan data Brand
                  Vault lokal pengguna. Kami tidak menggunakan cookies pihak
                  ketiga yang bersifat melacak (*cross-site invasive tracking*).
                </p>
              </section>

              {/* BAB 10 */}
              <section
                id="bab-10"
                ref={setClauseRef(9)}
                className={`legal-clause bento-card p-6 sm:p-8 rounded-3xl space-y-3 ${
                  filterClauses("BAB 10 Kontak Petugas Pelindungan Data DPO Saluran Resmi Permohonan") ? "" : "hidden"
                }`}
              >
                <div className="flex items-center gap-2 font-mono text-xs text-stone-500 pb-2 border-b border-sand-200">
                  <span className="font-bold text-sand-900">BAB 10</span>
                  <span>&bull;</span>
                  <span className="uppercase">
                    Kontak Petugas Pelindungan Data (DPO)
                  </span>
                </div>
                <h2 className="font-serif font-bold text-lg sm:text-xl text-sand-900">
                  10. Saluran Resmi Permohonan Data
                </h2>
                <p>
                  Untuk mengajukan hak penghapusan data, pertanyaan privasi,
                  atau permintaan klarifikasi, hubungi Petugas Pelindungan Data
                  resmi kami melalui:
                </p>
                <div className="p-4 bg-sand-50 rounded-2xl border border-sand-200 font-mono text-xs space-y-1 text-stone-800">
                  <p>
                    <strong>Email Tim Privasi:</strong>{" "}
                    hello.usekarsa@gmail.com
                  </p>
                  <p>
                    <strong>WhatsApp Data Officer:</strong> +62 812-8800-9920
                  </p>
                  <p>
                    <strong>Entitas Layanan:</strong> Karsa Studio Indonesia (
                    <span className="font-mono">usekarsa.co</span>)
                  </p>
                </div>
              </section>
            </div>
          </div>

          {/* FOOTER NAV */}
          <div className="text-center pt-8 border-t border-sand-200 font-mono text-xs space-y-3">
            <div className="flex items-center justify-center gap-4 text-stone-500">
              <a
                href="/terms"
                className="hover:text-sand-900 transition underline"
              >
                Syarat & Ketentuan (Terms)
              </a>
              <span>&bull;</span>
              <a href="/privacy" className="font-bold text-sand-900">
                Kebijakan Privasi (Privacy)
              </a>
              <span>&bull;</span>
              <a
                href="/dashboard"
                className="hover:text-sand-900 transition underline"
              >
                Workspace Member
              </a>
            </div>
            <p className="text-stone-400 text-[11px]">
              &copy; 2026 Karsa Studio. Seluruh hak cipta dilindungi
              undang-undang.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
