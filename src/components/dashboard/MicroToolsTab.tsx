"use client";

import { useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  Copy,
  MessageSquare,
  Sparkles,
  Wand2,
} from "lucide-react";

type Props = {
  onOpenNewOrder: () => void;
};

export function MicroToolsTab({ onOpenNewOrder }: Props) {
  // Generator Hook
  const [hookBrand, setHookBrand] = useState("");
  const [hookCategory, setHookCategory] = useState("Kuliner / Minuman");
  const [hookProblem, setHookProblem] = useState("");
  const [hookResults, setHookResults] = useState<React.ReactNode | null>(null);

  // Generator Ide Kalender
  const [ideBrand, setIdeBrand] = useState("");
  const [ideProblem, setIdeProblem] = useState("");
  const [ideResults, setIdeResults] = useState<React.ReactNode | null>(null);

  // Generator Takarir AIDA
  const [capBrand, setCapBrand] = useState("");
  const [capProduct, setCapProduct] = useState("");
  const [capOffer, setCapOffer] = useState("");
  const [capResults, setCapResults] = useState<React.ReactNode | null>(null);

  // Kalkulator ROI
  const [roiHours, setRoiHours] = useState(6);
  const [roiAgency, setRoiAgency] = useState(3500000);
  const roiSavedHours = roiHours * 4;
  const roiNetSavings = roiAgency - 299000;

  // Audit kesiapan
  const [auditQ1, setAuditQ1] = useState(25);
  const [auditQ2, setAuditQ2] = useState(10);
  const [auditQ3, setAuditQ3] = useState(20);
  const auditTotal = auditQ1 + auditQ2 + auditQ3;

  const generateDemoHooks = () => {
    const brand = hookBrand.trim() || "Brand Anda";
    const problem = hookProblem.trim() || "susah closing";
    const category = hookCategory;

    setHookResults(
      <>
        <div className="p-4 bg-white border-2 border-ink rounded-2xl space-y-1.5 shadow-brutal-sm">
          <div className="flex justify-between items-center gap-2">
            <span className="badge-tag px-2 py-0.5 rounded text-[10px] font-bold bg-sunflower text-ink">Formula Penyangkalan</span>
            <span className="text-[10px] text-stone-600 font-mono font-bold shrink-0">Hook 0-3 Detik</span>
          </div>
          <p className="text-xs sm:text-sm font-sans text-ink leading-relaxed">"Berhenti buang uang buat [kebiasaan lama]. Ini alasan kenapa pelanggan {brand} gak pernah ngeluh {problem}..."</p>
        </div>

        <div className="p-4 bg-white border-2 border-ink rounded-2xl space-y-1.5 shadow-brutal-sm">
          <div className="flex justify-between items-center gap-2">
            <span className="badge-tag px-2 py-0.5 rounded text-[10px] font-bold bg-wasabi text-ink">Formula Callout Niche</span>
            <span className="text-[10px] text-stone-600 font-mono font-bold shrink-0">Hook 0-3 Detik</span>
          </div>
          <p className="text-xs sm:text-sm font-sans text-ink leading-relaxed">"Khusus buat kamu yang lagi nyari {category} tapi capek kena masalah {problem} tiap hari..."</p>
        </div>

        <div className="p-4 bg-white border-2 border-ink rounded-2xl space-y-1.5 shadow-brutal-sm">
          <div className="flex justify-between items-center gap-2">
            <span className="badge-tag px-2 py-0.5 rounded text-[10px] font-bold bg-terracottaLight text-terracotta">Formula Secret Shortcut</span>
            <span className="text-[10px] text-stone-600 font-mono font-bold shrink-0">Hook 0-3 Detik</span>
          </div>
          <p className="text-xs sm:text-sm font-sans text-ink leading-relaxed">"Trik sederhana dari {brand} yang bikin kamu bebas dari {problem} tanpa ribet!"</p>
        </div>

        <div className="pt-2 text-center">
          <button onClick={onOpenNewOrder} className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-terracotta underline underline-offset-4">
            <span>Dapatkan 30 Naskah Lengkap untuk {brand}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </>
    );
  };

  const generateIdeaCalendar = () => {
    const brand = ideBrand.trim() || "Brand Anda";
    const problem = ideProblem.trim() || "masalah utama pembeli";

    const pillars = [
      { name: "Edukasi Solusi", range: "Hari 1 — 7", chip: "bg-sunflower text-ink", ideas: [
        `Kesalahan #1 yang bikin tokomu sepi padahal produknya bagus — ${problem}`,
        `Cara ${brand} menyelesaikan ${problem} dalam 3 langkah sederhana`,
        `Kenapa kamu salah pilih produk untuk ${problem} selama ini`
      ]},
      { name: "Bukti Sosial & Kredibilitas", range: "Hari 8 — 14", chip: "bg-canvas text-ink", ideas: [
        `Apa kata 3 pembeli pertama ${brand} — tanpa diedit`,
        `Di balik proses produksi ${brand}: 24 jam dari brief ke jadi`,
        `5 pertanyaan yang paling sering ditanya pembeli ${brand}, dijawab`
      ]},
      { name: "Hiburan Ringan", range: "Hari 15 — 22", chip: "bg-sunflower/40 text-ink", ideas: [
        `POV: kamu baru tahu fungsi ini setelah beli ${brand}`,
        `Tantangan 7 hari tanpa ${problem} — coba ikut?`,
        `Tebak: mana yang bener, mitos atau fakta soal ${problem}`
      ]},
      { name: "Jualan & CTA", range: "Hari 23 — 30", chip: "bg-wasabi text-ink", ideas: [
        `Sisa slot minggu ini — kenapa batch ${brand} selalu abis duluan`,
        `Hitung-hitungan jujur: biaya ${brand} vs bikin konten sendiri`,
        `Penawaran terbatas: apa isi paket ${brand} dan garansinya`
      ]}
    ];

    setIdeResults(
      <>
        {pillars.map((p) => (
          <div key={p.name} className="p-4 bg-white border-2 border-ink rounded-2xl space-y-2 shadow-brutal-sm">
            <div className="flex items-center justify-between gap-2">
              <span className={`badge-tag px-2 py-0.5 rounded text-[10px] font-bold ${p.chip}`}>{p.range}</span>
              <span className="text-[10px] text-stone-600 font-mono font-bold">{p.name}</span>
            </div>
            <ul className="space-y-1.5 text-xs font-sans text-stone-700 leading-relaxed">
              {p.ideas.map((i, idx) => (
                <li key={idx} className="flex gap-2">
                  <span className="w-1.5 h-1.5 bg-ink rounded-full shrink-0 mt-1.5"></span>
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div className="pt-1 text-center">
          <button onClick={onOpenNewOrder} className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-terracotta underline underline-offset-4">
            <span>Terima 30 ide lengkap + naskah jadi untuk {brand}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </>
    );
  };

  const generateAidaCaption = () => {
    const brand = capBrand.trim() || "Brand Anda";
    const product = capProduct.trim() || "produk unggulan";
    const offer = capOffer.trim() || "penawaran minggu ini";

    setCapResults(
      <>
        <div className="p-4 sm:p-5 bg-white border-2 border-ink rounded-2xl space-y-3 shadow-brutal-sm">
          <div className="flex items-center justify-between gap-2 pb-2 border-b-2 border-ink">
            <span className="text-[10px] font-mono font-bold text-stone-600">TAKARIR SIAP SALIN · FORMULA AIDA</span>
            <button onClick={copyCaptionResult} className="inline-flex items-center gap-1 text-[10px] font-mono font-bold text-ink bg-canvas border-2 border-ink rounded-lg px-2 py-1">
              <Copy className="w-3 h-3" />
              <span>Salin</span>
            </button>
          </div>
          <div id="capResultText" className="font-sans text-xs sm:text-sm text-stone-800 leading-relaxed whitespace-pre-line">
            {`${brand} bukan soal ${product} biasa — ini soal kamu yang udah capek coba banyak cara tapi hasilnya gitu-gitu aja. 👇

Coba perhatiin: kebanyakan orang fokus ke produknya, padahal yang bikin kamu maju itu rutinitas yang konsisten dan formula yang udah teruji.

Di ${brand}, kami meracik ${product} dengan fokus ke hasil nyata — bukan janji manis. Pembeli kamu bakal ngerasain bedanya sejak minggu pertama.

✨ ${offer}. Kuota terbatas, dan selalu habis duluan di akhir pekan.

📌 Klik link di bio dan mulai hari ini!
#kontenbrand #umkmindonesia #belanjacerdas #rekomendasiproduk`}
          </div>
        </div>
        <div className="pt-1 text-center">
          <button onClick={onOpenNewOrder} className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-terracotta underline underline-offset-4">
            <span>30 takarir AIDA khusus brand-mu, jadi dalam 24 jam</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </>
    );
  };

  const copyCaptionResult = () => {
    const text = document.getElementById("capResultText")?.innerText;
    if (!text) return;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert("Takarir disalin ke clipboard!");
      });
    } else {
      alert("Browser kamu tidak mendukung salin otomatis.");
    }
  };

  return (
    <section id="view-tools" role="tabpanel" aria-labelledby="tab-nav-tools" className="space-y-6 sm:space-y-8">
      <header className="flex items-center gap-3.5">
        <span className="w-11 h-11 rounded-xl bg-wasabi border-2 border-ink flex items-center justify-center font-mono font-bold text-sm shadow-brutal-sm shrink-0">02</span>
        <div>
          <h2 className="text-2xl sm:text-4xl font-serif font-bold text-ink leading-tight">Micro-Tools & Kalkulator</h2>
          <p className="text-[11px] sm:text-xs font-mono text-stone-600">Bench instrumen member: generator, kalkulator, dan audit kesiapan.</p>
        </div>
      </header>

      <section className="bento-pop p-5 sm:p-8 rounded-3xl space-y-5 bg-white">
        <div className="max-w-2xl space-y-1.5">
          <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Generator Hook Video Viral Instan</h3>
          <p className="text-xs sm:text-sm text-stone-600">Ketik nama bisnismu dan lihat bagaimana formula psikologi Karsa menyusun pembuka video dalam hitungan detik.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
          <div className="md:col-span-1 space-y-3.5 bg-canvas p-5 rounded-2xl border-2 border-ink">
            <div>
              <label htmlFor="toolBrand" className="block text-ink mb-1 font-bold">Nama Brand / Produk</label>
              <input type="text" id="toolBrand" placeholder="Contoh: Kopi Teras" value={hookBrand} onChange={(e) => setHookBrand(e.target.value)} className="w-full bg-white border-2 border-ink rounded-xl p-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
            </div>
            <div>
              <label htmlFor="toolCategory" className="block text-ink mb-1 font-bold">Kategori Bisnis</label>
              <select id="toolCategory" value={hookCategory} onChange={(e) => setHookCategory(e.target.value)} className="w-full bg-white border-2 border-ink rounded-xl p-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]">
                <option value="Kuliner / Minuman">Kuliner / Minuman</option>
                <option value="Fashion & Aksesoris">Fashion & Aksesoris</option>
                <option value="Skincare & Perawatan">Skincare & Perawatan</option>
                <option value="Jasa / Layanan">Jasa / Layanan</option>
              </select>
            </div>
            <div>
              <label htmlFor="toolProblem" className="block text-ink mb-1 font-bold">Masalah Terbesar Pembeli</label>
              <input type="text" id="toolProblem" placeholder="Contoh: gampang kembung / mahal" value={hookProblem} onChange={(e) => setHookProblem(e.target.value)} className="w-full bg-white border-2 border-ink rounded-xl p-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
            </div>
            <button type="button" onClick={generateDemoHooks} className="w-full py-3.5 bg-terracotta hover:bg-ink text-ink hover:text-white rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-brutal min-h-[48px]">
              <Wand2 className="w-4 h-4 text-wasabi" />
              <span>Generate 3 Hook Video</span>
            </button>
          </div>

          <div className="md:col-span-2 space-y-3">
            {hookResults ?? (
              <div className="h-full min-h-[220px] border-2 border-dashed border-ink rounded-2xl flex flex-col items-center justify-center p-6 text-center text-stone-500 space-y-2 bg-canvas">
                <Sparkles className="w-8 h-8 text-stone-400" />
                <p className="text-xs font-mono font-bold text-stone-600">Isi parameter di samping lalu tekan tombol Generate.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bento-pop p-5 sm:p-8 rounded-3xl space-y-5 bg-white">
        <div className="max-w-2xl space-y-1.5">
          <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Generator Ide Kalender 30 Hari</h3>
          <p className="text-xs sm:text-sm text-stone-600">Lihat bagaimana 4 pilar Karsa disusun untuk brand-mu: pratinjau 12 dari 30 ide naskah yang akan kamu terima.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
          <div className="md:col-span-1 space-y-3.5 bg-canvas p-5 rounded-2xl border-2 border-ink">
            <div>
              <label htmlFor="ideBrand" className="block text-ink mb-1 font-bold">Nama Brand / Produk</label>
              <input type="text" id="ideBrand" placeholder="Contoh: Kopi Teras" value={ideBrand} onChange={(e) => setIdeBrand(e.target.value)} className="w-full bg-white border-2 border-ink rounded-xl p-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
            </div>
            <div>
              <label htmlFor="ideProblem" className="block text-ink mb-1 font-bold">Masalah Utama Pembeli</label>
              <input type="text" id="ideProblem" placeholder="Contoh: ngantuk saat kerja" value={ideProblem} onChange={(e) => setIdeProblem(e.target.value)} className="w-full bg-white border-2 border-ink rounded-xl p-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
            </div>
            <button type="button" onClick={generateIdeaCalendar} className="w-full py-3.5 bg-ink hover:bg-terracotta text-ink rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-brutal min-h-[48px]">
              <CalendarDays className="w-4 h-4 text-wasabi" />
              <span>Generate 12 Ide Naskah</span>
            </button>
            <p className="text-[10px] text-stone-600 font-sans text-center">Simulasi gratis; output lengkap 30 hari ada di dalam batch.</p>
          </div>

          <div className="md:col-span-2 space-y-3">
            {ideResults ?? (
              <div className="h-full min-h-[220px] border-2 border-dashed border-ink rounded-2xl flex flex-col items-center justify-center p-6 text-center text-stone-500 space-y-2 bg-canvas">
                <CalendarDays className="w-8 h-8 text-stone-400" />
                <p className="text-xs font-mono font-bold text-stone-600">Isi nama brand lalu tekan Generate untuk melihat peta 30 harimu.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="bento-pop p-5 sm:p-8 rounded-3xl space-y-5 bg-canvas">
        <div className="max-w-2xl space-y-1.5">
          <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Generator Takarir AIDA</h3>
          <p className="text-xs sm:text-sm text-stone-600">Rasakan kualitas takarir Karsa: Attention, Interest, Desire, Action — dibuat dari parameter brand-mu dalam hitungan detik.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 font-mono text-xs">
          <div className="md:col-span-1 space-y-3.5 bg-surface p-5 rounded-2xl border-2 border-ink">
            <div>
              <label htmlFor="capBrand" className="block text-ink mb-1 font-bold">Nama Brand / Produk</label>
              <input type="text" id="capBrand" placeholder="Contoh: Glow Skincare" value={capBrand} onChange={(e) => setCapBrand(e.target.value)} className="w-full bg-white border-2 border-ink rounded-xl p-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
            </div>
            <div>
              <label htmlFor="capProduct" className="block text-ink mb-1 font-bold">Produk Unggulan</label>
              <input type="text" id="capProduct" placeholder="Contoh: Serum niacinamide 10%" value={capProduct} onChange={(e) => setCapProduct(e.target.value)} className="w-full bg-white border-2 border-ink rounded-xl p-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
            </div>
            <div>
              <label htmlFor="capOffer" className="block text-ink mb-1 font-bold">Penawaran / CTA</label>
              <input type="text" id="capOffer" placeholder="Contoh: Diskon 15% minggu ini" value={capOffer} onChange={(e) => setCapOffer(e.target.value)} className="w-full bg-white border-2 border-ink rounded-xl p-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px]" />
            </div>
            <button type="button" onClick={generateAidaCaption} className="w-full py-3.5 bg-terracotta hover:bg-ink text-ink hover:text-white rounded-xl font-bold transition flex items-center justify-center gap-2 shadow-brutal min-h-[48px]">
              <MessageSquare className="w-4 h-4 text-wasabi" />
              <span>Generate Takarir AIDA</span>
            </button>
          </div>

          <div className="md:col-span-2 space-y-3">
            {capResults ?? (
              <div className="h-full min-h-[220px] border-2 border-dashed border-ink rounded-2xl flex flex-col items-center justify-center p-6 text-center text-stone-500 space-y-2 bg-white">
                <MessageSquare className="w-8 h-8 text-stone-400" />
                <p className="text-xs font-mono font-bold text-stone-600">Isi parameter di samping lalu tekan Generate untuk lihat takarir siap salin.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section id="calculator-section" className="bento-pop p-5 sm:p-8 rounded-3xl space-y-5 bg-canvas">
        <div className="space-y-1.5">
          <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Berapa Banyak Waktu & Uang yang Kamu Hemat?</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 font-mono text-xs">
          <div className="space-y-4 bg-surface p-5 rounded-2xl border-2 border-ink shadow-brutal-sm">
            <div>
              <div className="flex justify-between font-bold text-ink mb-2">
                <label htmlFor="sliderHours">Jam Merancang Konten / Minggu:</label>
                <span className="text-terracotta text-sm">{roiHours} Jam</span>
              </div>
              <input type="range" id="sliderHours" min={2} max={15} value={roiHours} step={1} onChange={(e) => setRoiHours(Number(e.target.value))} className="w-full py-2" />
            </div>
            <div>
              <div className="flex justify-between font-bold text-ink mb-2">
                <label htmlFor="sliderAgency">Biaya Hire Agensi Bulanan:</label>
                <span className="text-terracotta text-sm">Rp {roiAgency.toLocaleString("id-ID")}</span>
              </div>
              <input type="range" id="sliderAgency" min={1500000} max={8000000} value={roiAgency} step={250000} onChange={(e) => setRoiAgency(Number(e.target.value))} className="w-full py-2" />
            </div>
          </div>

          <div className="bg-wasabi/30 border-2 border-ink rounded-2xl p-5 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2.5 border-b-2 border-ink">
                <span className="text-stone-700 font-bold">Total Waktu Dihemat:</span>
                <span className="text-base font-bold text-ink font-serif">{roiSavedHours} Jam / Bulan</span>
              </div>
              <div className="flex justify-between items-center pb-2.5 border-b-2 border-ink">
                <span className="text-stone-700 font-bold">Biaya Karsa Studio:</span>
                <span className="text-base font-bold text-ink font-serif">Rp 299.000</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-stone-700 font-bold">Penghematan Finansial:</span>
                <span className="text-xl sm:text-2xl font-bold text-terracotta font-serif">Rp {roiNetSavings.toLocaleString("id-ID")} / Bulan</span>
              </div>
            </div>

            <button onClick={onOpenNewOrder} className="w-full py-3.5 bg-ink hover:bg-terracotta hover:text-ink text-canvas rounded-2xl font-bold transition flex items-center justify-center gap-2 shadow-brutal min-h-[48px]">
              <Check className="w-4 h-4 text-wasabi" />
              <span>Klaim Penghematan & Order Batch</span>
            </button>
          </div>
        </div>
      </section>

      <section className="bento-pop p-5 sm:p-8 rounded-3xl space-y-4 bg-white">
        <div className="space-y-1.5">
          <h3 className="text-xl sm:text-2xl font-serif font-bold text-ink">Audit Kesiapan Konten Brand</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 font-mono text-xs">
          <div className="bg-canvas p-4 rounded-2xl border-2 border-ink space-y-2">
            <label htmlFor="auditQ1" className="font-bold text-ink block">1. Konsistensi Posting</label>
            <select id="auditQ1" value={auditQ1} onChange={(e) => setAuditQ1(Number(e.target.value))} className="w-full bg-white border-2 border-ink rounded-xl p-2.5 text-xs text-ink font-bold min-h-[44px]">
              <option value="10">Jarang (&lt; 2 video/minggu)</option>
              <option value="25">Kadang-kadang (3-4 video/minggu)</option>
              <option value="40">Setiap hari konsisten</option>
            </select>
          </div>
          <div className="bg-canvas p-4 rounded-2xl border-2 border-ink space-y-2">
            <label htmlFor="auditQ2" className="font-bold text-ink block">2. Struktur Naskah Video</label>
            <select id="auditQ2" value={auditQ2} onChange={(e) => setAuditQ2(Number(e.target.value))} className="w-full bg-white border-2 border-ink rounded-xl p-2.5 text-xs text-ink font-bold min-h-[44px]">
              <option value="10">Spontan / Tanpa naskah</option>
              <option value="25">Poin garis besar saja</option>
              <option value="40">Naskah kata-per-kata & CTA</option>
            </select>
          </div>
          <div className="bg-canvas p-4 rounded-2xl border-2 border-ink space-y-2">
            <label htmlFor="auditQ3" className="font-bold text-ink block">3. Pemahaman Target</label>
            <select id="auditQ3" value={auditQ3} onChange={(e) => setAuditQ3(Number(e.target.value))} className="w-full bg-white border-2 border-ink rounded-xl p-2.5 text-xs text-ink font-bold min-h-[44px]">
              <option value="10">Masih umum / Semua orang</option>
              <option value="20">Paham usia & demografi</option>
              <option value="20">Paham pain-point emosional</option>
            </select>
          </div>
        </div>

        <div className="p-5 bg-wasabi/30 border-2 border-ink rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <div className="w-12 h-12 rounded-xl bg-ink text-canvas flex items-center justify-center font-bold text-lg font-serif shrink-0 border-2 border-ink">
              {auditTotal}%
            </div>
            <div>
              <span className="font-bold text-ink block text-sm">{auditTotal < 60 ? "Status: Perlu Sistematisasi Naskah" : "Status: Siap Skalasi Produksi Batch"}</span>
              <span className="text-stone-600 text-xs block">{auditTotal < 60 ? "Kalender Karsa 30 hari akan menyusun inventaris kontenmu agar konsisten tanpa mikir ide dari nol." : "Tokomu punya pondasi bagus, batch Karsa akan mempercepat pembuatan naskah video jadi 1 hari."}</span>
            </div>
          </div>
          <button onClick={onOpenNewOrder} className="w-full sm:w-auto px-5 py-3.5 bg-terracotta text-ink hover:text-white rounded-xl active:bg-ink hover:bg-ink transition font-bold min-h-[44px] flex items-center justify-center gap-2 shadow-brutal font-mono">
            Tingkatkan Skor Sekarang
            <ArrowRight className="w-4 h-4 text-wasabi" />
          </button>
        </div>
      </section>
    </section>
  );
}