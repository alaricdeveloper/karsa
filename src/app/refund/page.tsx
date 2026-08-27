"use client";

import { useEffect, useRef, useState, type ChangeEvent } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ShieldCheck,
  Clock,
  RefreshCw,
  FileCheck,
  Search,
} from "lucide-react";
import { LegalHeader } from "@/components/legal/LegalHeader";

export default function RefundPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("");
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  // Scrollspy
  useEffect(() => {
    const handleScroll = () => {
      let current = "";
      Object.values(sectionRefs.current).forEach((sec) => {
        if (!sec) return;
        if (window.pageYOffset >= sec.offsetTop - 120) {
          current = sec.id;
        }
      });
      setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Search filter
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
  };

  const clauseIds = [
    "bab-1",
    "bab-2",
    "bab-3",
    "bab-4",
    "bab-5",
    "bab-6",
    "bab-7",
    "bab-8",
  ];

  const tocItems = [
    { id: "bab-1", label: "Bab 01 — Standar Penghitungan SLA 24 Jam" },
    { id: "bab-2", label: "Bab 02 — Matriks Kompensasi Keterlambatan" },
    { id: "bab-3", label: "Bab 03 — Mekanisme Garansi Kalibrasi 48 Jam" },
    { id: "bab-4", label: "Bab 04 — Standar Kualitas Deliverables" },
    { id: "bab-5", label: "Bab 05 — Kebijakan Pembatalan & Refund" },
    { id: "bab-6", label: "Bab 06 — Alur Pengajuan Klaim 1 Klik" },
    { id: "bab-7", label: "Bab 07 — Pengecualian & Keadaan Khusus" },
    { id: "bab-8", label: "Bab 08 — Saluran Bantuan Eskalasi" },
  ];

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans antialiased selection:bg-wasabi selection:text-ink">

      <LegalHeader badge="SLA & Guarantee" />

      {/* MAIN VIEWPORT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10">

        {/* HERO HEADER */}
        <section className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 badge-tag bg-sunflower px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-ink">
            <ShieldCheck className="w-4 h-4 text-ink" />
            <span>Protokol Jaminan Kualitas &amp; SLA Karsa Studio</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-ink leading-tight">
            Jaminan Layanan, SLA 24 Jam <br />
            <span className="italic text-terracotta">&amp; Kebijakan Kompensasi</span>
          </h1>
          <p className="text-xs sm:text-sm text-inkMuted font-sans leading-relaxed font-medium">
            Terakhir diperbarui: 19 Agustus 2026. Kami menghargai waktu dan investasi bisnis Anda. Dokumen ini merinci secara terbuka standar komitmen SLA 1x24 jam kerja, mekanisme kalibrasi naskah 48 jam, serta garansi kompensasi otomatis.
          </p>
        </section>

        {/* TRIPLE GUARANTEE BENTO DISPLAY */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 font-mono text-xs">
          <div className="bento-pop p-6 rounded-3xl space-y-3 bg-wasabi/30">
            <div className="w-10 h-10 rounded-2xl bg-wasabi border-2 border-ink flex items-center justify-center shadow-brutal-sm font-bold">
              <Clock className="w-5 h-5 text-ink" />
            </div>
            <h3 className="font-serif font-bold text-lg text-ink">Garansi SLA 24 Jam Kerja</h3>
            <p className="text-inkMuted font-sans text-xs leading-relaxed">
              Seluruh 30 naskah, takarir, dan berkas Notion wajib terkirim dalam 24 jam kerja. Keterlambatan sepihak langsung diganti dengan kompensasi 5 naskah video viral tambahan gratis.
            </p>
            <span className="badge-tag text-[10px] text-ink font-bold bg-white px-2.5 py-1 rounded-lg inline-block">Tepat Waktu atau Kompensasi</span>
          </div>

          <div className="bento-pop p-6 rounded-3xl space-y-3 bg-sunflower/30">
            <div className="w-10 h-10 rounded-2xl bg-sunflower border-2 border-ink flex items-center justify-center shadow-brutal-sm font-bold">
              <RefreshCw className="w-5 h-5 text-ink" />
            </div>
            <h3 className="font-serif font-bold text-lg text-ink">Garansi Kalibrasi 48 Jam</h3>
            <p className="text-inkMuted font-sans text-xs leading-relaxed">
              Jika nada bicara (*tone of voice*) atau sudut pandang naskah belum 100% selaras dengan persona tokomu, kamu memiliki hak revisi bebas selama 48 jam kalender tanpa biaya tambahan.
            </p>
            <span className="badge-tag text-[10px] text-ink font-bold bg-white px-2.5 py-1 rounded-lg inline-block">Bebas Revisi Nada Bicara</span>
          </div>

          <div className="bento-pop p-6 rounded-3xl space-y-3 bg-terracottaLight">
            <div className="w-10 h-10 rounded-2xl bg-terracotta border-2 border-ink text-white flex items-center justify-center shadow-brutal-sm font-bold">
              <FileCheck className="w-5 h-5 text-wasabi" />
            </div>
            <h3 className="font-serif font-bold text-lg text-ink">Naskah Kata-per-Kata</h3>
            <p className="text-inkMuted font-sans text-xs leading-relaxed">
              Bukan sekadar poin ide kasar atau kerangka abstrak. Seluruh 30 naskah disusun kata-per-kata per detik (Hook 0-3s, Problem, Value, CTA) siap dibaca di teleprompter HP.
            </p>
            <span className="badge-tag text-[10px] text-ink font-bold bg-white px-2.5 py-1 rounded-lg inline-block">Siap Baca di Layar HP</span>
          </div>
        </div>

        {/* MAIN LEGAL DOCUMENT SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

          {/* STICKY SIDEBAR TABLE OF CONTENTS */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4">
            <div className="bento-pop p-5 rounded-3xl space-y-3 font-mono text-xs bg-white">
              <div className="flex items-center justify-between pb-2 border-b-2 border-ink">
                <span className="font-bold text-ink uppercase tracking-wider text-[11px]">Daftar Bab Jaminan</span>
                <span className="badge-tag px-2 py-0.5 rounded text-[10px] font-bold bg-canvas">8 Bab</span>
              </div>

              {/* SEARCH INPUT FILTER */}
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearch}
                  placeholder="Cari jaminan / klausul..."
                  className="w-full bg-canvas border-2 border-ink rounded-xl px-3 py-2 pl-8 text-xs font-sans text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px] caret-terracotta"
                />
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-inkMuted" />
              </div>

              <nav className="space-y-1 max-h-[60vh] overflow-y-auto no-scrollbar pr-1">
                {tocItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition ${
                      activeSection === item.id
                        ? "border-terracotta text-ink font-bold bg-canvas"
                        : "border-transparent text-inkMuted hover:text-ink"
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* CONTENT SECTIONS */}
          <div className="lg:col-span-8 space-y-6 font-sans text-xs sm:text-sm text-inkMuted leading-relaxed">

            {/* BAB 1 */}
            <section
              id="bab-1"
              ref={(el) => { sectionRefs.current["bab-1"] = el; }}
              className={`legal-clause bento-pop p-6 sm:p-8 rounded-3xl space-y-3 bg-white${searchQuery && !("Ketentuan Waktu Produksi SLA pengerjaan dihitung tepat sejak status pembayaran terkonfirmasi LUNAS".toLowerCase().includes(searchQuery) || "jam kerja operasional Karsa Studio berlangsung setiap hari Senin hingga Minggu".toLowerCase().includes(searchQuery)) ? " hidden" : ""}`}
            >
              <div className="flex items-center gap-2 font-mono text-xs text-inkMuted pb-2 border-b-2 border-ink font-bold">
                <span className="text-terracotta">BAB 01</span>
                <span>&bull;</span>
                <span className="uppercase">Standar Penghitungan SLA 24 Jam</span>
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-ink">1. Ketentuan Waktu Produksi</h2>
              <p>
                Service Level Agreement (SLA) pengerjaan dihitung tepat sejak status pembayaran terkonfirmasi LUNAS di sistem dan formulir parameter brief dinyatakan lengkap.
              </p>
              <p>
                Jam kerja operasional Karsa Studio berlangsung setiap hari Senin hingga Minggu (pukul 08:00 – 22:00 WIB). Pesanan yang masuk pada jam operasional akan diserahkan selambat-lambatnya 24 jam kalender sejak waktu transaksi tercatat.
              </p>
            </section>

            {/* BAB 2 */}
            <section
              id="bab-2"
              ref={(el) => { sectionRefs.current["bab-2"] = el; }}
              className="legal-clause bento-pop p-6 sm:p-8 rounded-3xl space-y-3 bg-white"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-inkMuted pb-2 border-b-2 border-ink font-bold">
                <span className="text-terracotta">BAB 02</span>
                <span>&bull;</span>
                <span className="uppercase">Matriks Kompensasi Keterlambatan</span>
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-ink">2. Tabel Kompensasi Resmi</h2>
              <p>Apabila terjadi keterlambatan pengerjaan yang bersumber dari kendala operasional internal tim Karsa, kami memberlakukan matriks kompensasi tanpa syarat:</p>

              <div className="bento-pop rounded-2xl overflow-hidden font-mono text-xs mt-3">
                <div className="p-3 bg-ink text-canvas flex justify-between font-bold">
                  <span>Waktu Keterlambatan</span>
                  <span>Bentuk Kompensasi Tambahan</span>
                </div>
                <div className="divide-y-2 divide-ink p-2 sm:p-3 text-ink bg-white">
                  <div className="py-2.5 px-2 flex justify-between items-center">
                    <span>1 – 6 Jam Melebihi SLA</span>
                    <span className="font-bold text-terracotta font-serif text-sm">+5 Naskah Video Viral Gratis</span>
                  </div>
                  <div className="py-2.5 px-2 flex justify-between items-center">
                    <span>6 – 12 Jam Melebihi SLA</span>
                    <span className="font-bold text-terracotta font-serif text-sm">+10 Naskah Video + 1 Artikel SEO</span>
                  </div>
                  <div className="py-2.5 px-2 flex justify-between items-center">
                    <span>&gt; 12 Jam Melebihi SLA</span>
                    <span className="font-bold text-terracotta font-serif text-sm">Kompensasi Penuh + Batch Berikutnya Diskon 50%</span>
                  </div>
                </div>
              </div>
            </section>

            {/* BAB 3 */}
            <section
              id="bab-3"
              ref={(el) => { sectionRefs.current["bab-3"] = el; }}
              className="legal-clause bento-pop p-6 sm:p-8 rounded-3xl space-y-3 bg-white"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-inkMuted pb-2 border-b-2 border-ink font-bold">
                <span className="text-terracotta">BAB 03</span>
                <span>&bull;</span>
                <span className="uppercase">Mekanisme Garansi Kalibrasi 48 Jam</span>
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-ink">3. Hak Revisi &amp; Penyesuaian Nada Bicara</h2>
              <p>
                Setelah berkas Notion dan Customer Hub aktif, Klien diberikan waktu <strong>48 jam kalender</strong> untuk meninjau seluruh naskah.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-inkMuted font-sans">
                <li><strong>Kalibrasi Diterima:</strong> Penyesuaian nada bicara (misal: dibuat lebih santai, lebih formal, atau lebih jenaka), penggantian variasi hook 3 detik, atau penajaman keunggulan spesifik produk.</li>
                <li><strong>Waktu Pengerjaan Kalibrasi:</strong> Penyesuaian kalibrasi diselesaikan dalam waktu maksimal 12 jam kerja sejak formulir kalibrasi dikirimkan melalui WhatsApp Support atau Customer Hub.</li>
              </ul>
            </section>

            {/* BAB 4 */}
            <section
              id="bab-4"
              ref={(el) => { sectionRefs.current["bab-4"] = el; }}
              className="legal-clause bento-pop p-6 sm:p-8 rounded-3xl space-y-3 bg-white"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-inkMuted pb-2 border-b-2 border-ink font-bold">
                <span className="text-terracotta">BAB 04</span>
                <span>&bull;</span>
                <span className="uppercase">Standar Kualitas Deliverables</span>
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-ink">4. Checklist Mutu Hasil Akhir</h2>
              <p>Setiap naskah yang diserahkan telah melalui 3 tahap kurasi ketat (*Triple Quality Control*):</p>
              <div className="space-y-2.5 font-mono text-xs mt-2">
                <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                  <strong className="text-ink block font-bold">1. Hook Verification:</strong>
                  <span className="text-inkMuted font-sans text-xs">Memastikan kalimat 0-3 detik pertama menggunakan formula psikologis penahan scroll.</span>
                </div>
                <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                  <strong className="text-ink block font-bold">2. Natural Phrasing Check:</strong>
                  <span className="text-inkMuted font-sans text-xs">Memastikan diksi tidak kaku seperti robot terjemahan, melainkan terdengar organik saat diucapkan oleh talent.</span>
                </div>
                <div className="p-3.5 bg-canvas rounded-2xl border-2 border-ink shadow-brutal-sm">
                  <strong className="text-ink block font-bold">3. Call-To-Action Clarity:</strong>
                  <span className="text-inkMuted font-sans text-xs">Memastikan kalimat penutup memiliki arahan konversi yang jelas (cek keranjang kuning, link di bio, atau komentar).</span>
                </div>
              </div>
            </section>

            {/* BAB 5 */}
            <section
              id="bab-5"
              ref={(el) => { sectionRefs.current["bab-5"] = el; }}
              className="legal-clause bento-pop p-6 sm:p-8 rounded-3xl space-y-3 bg-white"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-inkMuted pb-2 border-b-2 border-ink font-bold">
                <span className="text-terracotta">BAB 05</span>
                <span>&bull;</span>
                <span className="uppercase">Kebijakan Pembatalan &amp; Pengembalian Dana</span>
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-ink">5. Ketentuan Refund Finansial</h2>
              <p>
                Mengingat seluruh produk yang diserahkan berupa aset kekayaan intelektual digital yang langsung dapat diduplikasi dan dikonsumsi, kebijakan pembatalan pesanan diatur sebagai berikut:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-inkMuted font-sans">
                <li><strong>Pengembalian Dana 100%:</strong> Dapat diajukan jika Klien membatalkan pesanan dalam kurun waktu <strong>maksimal 1 jam</strong> setelah pembayaran dan proses penyusunan naskah belum dimulai oleh tim.</li>
                <li><strong>Pengembalian Dana Pasca-Produksi:</strong> Apabila proses penyusunan naskah telah berjalan, Klien dilindungi oleh <strong>Garansi Kalibrasi 48 Jam</strong> dan <strong>Kompensasi SLA</strong> sebagaimana tercantum pada Bab 2 dan Bab 3.</li>
              </ul>
            </section>

            {/* BAB 6 */}
            <section
              id="bab-6"
              ref={(el) => { sectionRefs.current["bab-6"] = el; }}
              className="legal-clause bento-pop p-6 sm:p-8 rounded-3xl space-y-3 bg-white"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-inkMuted pb-2 border-b-2 border-ink font-bold">
                <span className="text-terracotta">BAB 06</span>
                <span>&bull;</span>
                <span className="uppercase">Alur Pengajuan Klaim 1 Klik</span>
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-ink">6. Cara Mengajukan Klaim atau Kalibrasi</h2>
              <p>Pengajuan garansi atau kalibrasi sangat mudah dan bebas birokrasi:</p>
              <ol className="list-decimal pl-5 space-y-1.5 text-inkMuted font-sans">
                <li>Buka nomor invoice pesanan Anda (<span className="font-mono text-xs font-bold text-terracotta">INV-XXXXXX</span>).</li>
                <li>Kirimkan pesan ke WhatsApp Support Resmi kami di <span className="font-mono text-xs font-bold text-ink">+62 812-8800-9920</span> atau klik tombol klaim di Customer Hub.</li>
                <li>Sebutkan bagian naskah atau detail yang ingin disesuaikan. Tim kurator akan langsung memproses dalam antrean prioritas.</li>
              </ol>
            </section>

            {/* BAB 7 */}
            <section
              id="bab-7"
              ref={(el) => { sectionRefs.current["bab-7"] = el; }}
              className="legal-clause bento-pop p-6 sm:p-8 rounded-3xl space-y-3 bg-white"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-inkMuted pb-2 border-b-2 border-ink font-bold">
                <span className="text-terracotta">BAB 07</span>
                <span>&bull;</span>
                <span className="uppercase">Pengecualian &amp; Keadaan Khusus</span>
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-ink">7. Batasan Garansi</h2>
              <p>Garansi SLA dan kalibrasi tidak berlaku apabila:</p>
              <ul className="list-disc pl-5 space-y-1.5 text-inkMuted font-sans">
                <li>Klien mengubah formulir brief dengan nama brand atau kategori produk yang sama sekali berbeda di tengah proses pengerjaan.</li>
                <li>Terjadi kendala <em>Force Majeure</em> skala nasional (pemadaman total internet global atau bencana alam).</li>
              </ul>
            </section>

            {/* BAB 8 */}
            <section
              id="bab-8"
              ref={(el) => { sectionRefs.current["bab-8"] = el; }}
              className="legal-clause bento-pop p-6 sm:p-8 rounded-3xl space-y-3 bg-white"
            >
              <div className="flex items-center gap-2 font-mono text-xs text-inkMuted pb-2 border-b-2 border-ink font-bold">
                <span className="text-terracotta">BAB 08</span>
                <span>&bull;</span>
                <span className="uppercase">Saluran Bantuan Eskalasi</span>
              </div>
              <h2 className="font-serif font-bold text-lg sm:text-xl text-ink">8. Layanan Bantuan Klien</h2>
              <p>Untuk pertanyaan mengenai garansi atau konsultasi pra-pemesanan, hubungi saluran resmi kami:</p>
              <div className="p-4 bg-canvas rounded-2xl border-2 border-ink font-mono text-xs space-y-1.5 text-inkMuted shadow-brutal-sm">
                <p><strong>WhatsApp Priority Support:</strong> +62 812-8800-9920</p>
                <p><strong>Email Operasional:</strong> hello.usekarsa@gmail.com</p>
                <p><strong>Domain Resmi:</strong> https://usekarsa.co</p>
              </div>
            </section>

          </div>
        </div>

        {/* FOOTER NAV */}
        <div className="text-center pt-8 border-t-2 border-ink font-mono text-xs space-y-3">
          <div className="flex items-center justify-center gap-4 text-inkMuted font-bold">
            <a href="/terms" className="hover:text-terracotta transition underline">Terms of Service</a>
            <span>&bull;</span>
            <a href="/privacy" className="hover:text-terracotta transition underline">Privacy Policy</a>
            <span>&bull;</span>
            <a href="/refund" className="text-terracotta">SLA &amp; Guarantee</a>
          </div>
          <p className="text-inkMuted text-[11px] font-bold">&copy; 2026 Karsa Studio. Seluruh hak cipta dilindungi undang-undang.</p>
        </div>

      </main>
    </div>
  );
}
