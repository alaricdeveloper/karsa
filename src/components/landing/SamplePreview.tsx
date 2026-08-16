"use client";

import { useState } from "react";

type Category = "script" | "caption" | "seo";

interface SampleItem {
  title: string;
  niche: string;
  html: string;
}

const sampleData: Record<Category, SampleItem[]> = {
  script: [
    {
      title: "[Sample 1] Day 04 — Sudut Edukasi Nilai Produk",
      niche: "Niche: Artisan Roastery (F&B)",
      html: `
        <div><strong class="text-amber-800">[VISUAL HOOK 00:00 - 00:03]</strong><p class="mt-0.5">Talent menuang kopi instan ke gelas, tapi langsung menggumpal di dasar. Ekspresi heran.</p></div>
        <div><strong class="text-amber-800">[AUDIO / VOICEOVER]</strong><p class="mt-0.5">"Kenapa kopi sachet kamu sering bikin perut kembung padahal baru minum 3 teguk? Ini alasan kimia sederhananya..."</p></div>
        <div><strong class="text-amber-800">[VALUE & SOLUTION 00:04 - 00:20]</strong><p class="mt-0.5">Tampilkan biji kopi cold brew asli. Jelaskan kadar asam yang 70% lebih rendah dibanding metode roasting temperatur tinggi konvensional.</p></div>
        <div><strong class="text-amber-800">[CALL TO ACTION 00:21 - 00:25]</strong><p class="mt-0.5">"Cek link di bio untuk coba sampler pack khusus lambung sensitif minggu ini."</p></div>
      `,
    },
    {
      title: "[Sample 2] Day 09 — Myth Busting Skincare",
      niche: "Niche: D2C Skincare",
      html: `
        <div><strong class="text-amber-800">[VISUAL HOOK 00:00 - 00:03]</strong><p class="mt-0.5">Talent mengoleskan 5 layer serum sekaligus ke wajah secara berlebihan, lalu membuat gestur 'stop'.</p></div>
        <div><strong class="text-amber-800">[AUDIO / VOICEOVER]</strong><p class="mt-0.5">"Makin banyak layer serum bikin skin barrier makin cepet sembuh? Kulit tidak bekerja seperti spons cuci piring."</p></div>
        <div><strong class="text-amber-800">[VALUE & SOLUTION 00:04 - 00:20]</strong><p class="mt-0.5">Perlihatkan tekstur Ceramide Barrier Gel yang menggabungkan 3 fungsi dalam 1 formula ringan tanpa menyumbat pori-pori.</p></div>
        <div><strong class="text-amber-800">[CALL TO ACTION 00:21 - 00:25]</strong><p class="mt-0.5">"Ketik 'BARRIER' di DM buat dapet panduan formulasi yang pas sesuai jenis kulitmu."</p></div>
      `,
    },
  ],
  caption: [
    {
      title: "[Sample 1] Instagram Caption — F&B Coffee",
      niche: "Niche: Artisan Roastery",
      html: `
        <p class="leading-relaxed">
          Bukan kopi Anda yang salah. Cara ekstraksinya yang bikin lambung 'protes' tiap jam 2 siang. 👇<br><br>
          Sebagian besar produsen mempercepat proses roasting dengan suhu ekstrem, yang justru mengunci senyawa asam klorogenat berlebih.<br><br>
          Metode slow-drip 12 jam yang kami gunakan memecah senyawa ini secara alami. Kafein tetap optimal, tanpa drama asam lambung naik.<br><br>
          📌 Simpan postingan ini untuk rekomendasi ngopi aman besok pagi.<br>
          #coldbrewjakarta #kopilambung #manualbrew #edukasikopi
        </p>
      `,
    },
    {
      title: "[Sample 2] Instagram Caption — Skincare",
      niche: "Niche: D2C Skincare",
      html: `
        <p class="leading-relaxed">
          Kulit kamu lagi kemerahan setelah ganti produk? Jangan langsung panik borong 4 toner baru. 🛑<br><br>
          Saat skin barrier rusak, hal paling penting adalah 'puasa aktif' dan fokus ke lipid seimbang: Ceramide, Cholesterol, & Fatty Acids dalam rasio tepat.<br><br>
          Formula kami dirancang seringkas mungkin agar kulit beristirahat dan memulihkan lapisan pelindungnya dalam 7 hari.<br><br>
          💬 Bagikan pengalaman kamu di kolom komentar, apa pemicu breakout terbesar kulitmu bulan ini?
        </p>
      `,
    },
  ],
  seo: [
    {
      title: "[Sample 1] Kerangka Artikel SEO F&B",
      niche: "Target Keyword: cara memilih kopi untuk lambung",
      html: `
        <h4 class="font-bold text-stone-900 text-xs sm:text-sm">H1: Panduan Lengkap Memilih Biji Kopi yang Aman untuk Asam Lambung</h4>
        <p class="text-[11px] text-stone-500 font-mono">Vol: 2.400/bln | Intent: Komersial / Edukatif</p>
        <div class="pl-3 sm:pl-4 border-l-2 border-sand-300 space-y-1.5 text-xs text-stone-700 mt-2">
          <p><strong>H2: Apa yang Menyebabkan Kopi Memicu Maag?</strong> (Eksplorasi pH & profil sangrai)</p>
          <p><strong>H2: 3 Ciri Kopi Low-Acid yang Wajib Anda Perhatikan</strong> (Single-origin, dark roast, wash)</p>
          <p><strong>H2: Cold Brew vs Americano: Mana yang Lebih Ramah di Perut?</strong></p>
        </div>
      `,
    },
    {
      title: "[Sample 2] Kerangka Artikel SEO Skincare",
      niche: "Target Keyword: cara memperbaiki skin barrier rusak",
      html: `
        <h4 class="font-bold text-stone-900 text-xs sm:text-sm">H1: 5 Tanda Skin Barrier Rusak dan Cara Mengatasinya dalam 14 Hari</h4>
        <p class="text-[11px] text-stone-500 font-mono">Vol: 4.100/bln | Intent: Solusi Masalah Kulit</p>
        <div class="pl-3 sm:pl-4 border-l-2 border-sand-300 space-y-1.5 text-xs text-stone-700 mt-2">
          <p><strong>H2: Ciri-ciri Skin Barrier Rusak yang Sering Salah Didiagnosis</strong></p>
          <p><strong>H2: Kandungan Skincare yang Wajib Dihindari Sementara Waktu</strong> (AHA/BHA, scrub fisik)</p>
          <p><strong>H2: Rutinitas Perawatan Sederhana Pagi & Malam untuk Pemulihan Cepat</strong></p>
        </div>
      `,
    },
  ],
};

const categories: { key: Category; label: string }[] = [
  { key: "script", label: "Naskah Video" },
  { key: "caption", label: "Takarir Instagram" },
  { key: "seo", label: "Struktur SEO" },
];

export function SamplePreview() {
  const [activeCategory, setActiveCategory] = useState<Category>("script");
  const [activeSampleIdx, setActiveSampleIdx] = useState(0);

  const samples = sampleData[activeCategory];
  const current = samples[activeSampleIdx];

  const switchCategory = (cat: Category) => {
    setActiveCategory(cat);
    setActiveSampleIdx(0);
  };

  return (
    <section id="preview" className="py-14 sm:py-20 border-b border-sand-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-10">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-stone-500">Transparansi Kualitas</span>
          <h2 className="text-2xl sm:text-3xl font-serif text-sand-900 mt-1">Contoh Output Nyata Berbagai Sektor</h2>
        </div>

        {/* Main Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:justify-center mb-3">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => switchCategory(cat.key)}
              className={`shrink-0 px-4 py-2.5 rounded-lg text-xs font-medium border border-sand-300 transition ${
                activeCategory === cat.key
                  ? "active bg-sand-900 text-white border-sand-900"
                  : "bg-white text-stone-700"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Niche Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:justify-center mb-5 font-mono text-[11px]">
          {samples.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSampleIdx(idx)}
              className={`shrink-0 px-3 py-1.5 rounded-md border transition ${
                activeSampleIdx === idx
                  ? "active bg-sand-900 font-semibold text-white border-sand-900"
                  : "border-sand-200 bg-white text-stone-600"
              }`}
            >
              {idx === 0 ? "Sample 1: Kuliner (F&B)" : "Sample 2: Skincare / D2C"}
            </button>
          ))}
        </div>

        {/* Reader Container */}
        <div className="bg-white border border-sand-300 rounded-2xl p-5 sm:p-8 font-mono text-xs shadow-sm min-h-[260px]">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-3 border-b border-sand-200 text-stone-500 gap-1 mb-4">
            <span className="font-bold text-sand-900 sm:font-normal sm:text-stone-500">{current.title}</span>
            <span className="text-[10px] text-stone-400">{current.niche}</span>
          </div>
          <div
            className="space-y-4 font-sans text-xs sm:text-sm text-stone-800 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: current.html }}
          />
        </div>
      </div>
    </section>
  );
}
