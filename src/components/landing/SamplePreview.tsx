"use client";

import type { ReactNode } from "react";
import { useState } from "react";

type Category = "script" | "caption" | "seo";

interface SampleItem {
  title: string;
  niche: string;
  body: ReactNode;
}

const sampleData: Record<Category, SampleItem[]> = {
  script: [
    {
      title: "[Contoh 1] Day 04 — Edukasi Solusi Nilai Produk",
      niche: "Niche: Artisan Roastery (F&B)",
      body: (
        <>
          <div><strong className="text-terracotta font-mono text-xs block mb-1">[VISUAL HOOK 00:00 - 00:03]</strong><p>Talent menuang kopi instan ke gelas tapi langsung menggumpal di dasar. Ekspresi heran.</p></div>
          <div><strong className="text-ink font-mono text-xs block mb-1">[AUDIO / VOICEOVER]</strong><p>&quot;Kenapa kopi sachet kamu sering bikin perut kembung padahal baru 3 teguk? Ini alasan ilmiahnya...&quot;</p></div>
          <div><strong className="text-ink font-mono text-xs block mb-1">[VALUE &amp; SOLUTION 00:04 - 00:20]</strong><p>Tunjukkan biji kopi cold brew asli. Jelaskan kadar asam yang 70% lebih rendah dibanding metode roasting konvensional.</p></div>
          <div><strong className="text-terracotta font-mono text-xs block mb-1">[CALL TO ACTION 00:21 - 00:25]</strong><p>&quot;Cek link di bio untuk coba sampler pack khusus lambung sensitif minggu ini.&quot;</p></div>
        </>
      ),
    },
    {
      title: "[Contoh 2] Day 09 — Myth Busting Skincare",
      niche: "Niche: D2C Skincare",
      body: (
        <>
          <div><strong className="text-terracotta font-mono text-xs block mb-1">[VISUAL HOOK 00:00 - 00:03]</strong><p>Talent mengoleskan 5 layer serum sekaligus ke wajah secara berlebihan, lalu membuat gestur &quot;stop&quot;.</p></div>
          <div><strong className="text-ink font-mono text-xs block mb-1">[AUDIO / VOICEOVER]</strong><p>&quot;Makin banyak layer serum bikin skin barrier makin cepet sembuh? Kulit tidak bekerja seperti spons cuci piring.&quot;</p></div>
          <div><strong className="text-ink font-mono text-xs block mb-1">[VALUE &amp; SOLUTION 00:04 - 00:20]</strong><p>Perlihatkan tekstur Ceramide Barrier Gel yang menggabungkan 3 fungsi dalam 1 formula ringan.</p></div>
          <div><strong className="text-terracotta font-mono text-xs block mb-1">[CALL TO ACTION 00:21 - 00:25]</strong><p>&quot;Ketik &apos;BARRIER&apos; di DM buat dapet panduan formulasi yang pas sesuai jenis kulitmu.&quot;</p></div>
        </>
      ),
    },
  ],
  caption: [
    {
      title: "[Contoh 1] Caption Instagram — F&B Coffee",
      niche: "Niche: Artisan Roastery",
      body: (
        <p className="leading-relaxed">
          Bukan kopi kamu yang salah. Cara ekstraksinya yang bikin lambung &apos;protes&apos; tiap jam 2 siang. <span aria-hidden="true">👇</span><br /><br />
          Sebagian besar produsen mempercepat proses roasting dengan suhu ekstrem yang mengunci asam klorogenat berlebih.<br /><br />
          Metode slow-drip 12 jam kami memecah senyawa ini secara alami. Kafein tetap optimal tanpa drama asam lambung naik.<br /><br />
          <span aria-hidden="true">📌 </span>Simpan postingan ini untuk rekomendasi ngopi aman besok pagi!
        </p>
      ),
    },
    {
      title: "[Contoh 2] Caption Instagram — Skincare",
      niche: "Niche: D2C Skincare",
      body: (
        <p className="leading-relaxed">
          Kulit kamu lagi kemerahan setelah ganti produk? Jangan langsung panik borong 4 toner baru. <span aria-hidden="true">🛑</span><br /><br />
          Saat skin barrier rusak, hal paling penting adalah &apos;puasa aktif&apos; dan fokus ke lipid seimbang: Ceramide &amp; Fatty Acids.<br /><br />
          <span aria-hidden="true">💬 </span>Bagikan pengalaman kamu di kolom komentar, apa pemicu breakout terbesar kulitmu bulan ini?
        </p>
      ),
    },
  ],
  seo: [
    {
      title: "[Contoh 1] Kerangka Artikel SEO F&B",
      niche: "Target Keyword: cara memilih kopi untuk lambung",
      body: (
        <>
          <h4 className="font-bold text-ink text-xs sm:text-sm">H1: Panduan Lengkap Memilih Biji Kopi yang Aman untuk Asam Lambung</h4>
          <p className="text-[11px] text-stone-500 font-mono">Vol: 2.400/bln | Intent: Edukatif</p>
          <div className="pl-3 border-l-2 border-ink space-y-1 text-xs text-stone-700 mt-2">
            <p><strong>H2: Apa yang Menyebabkan Kopi Memicu Maag?</strong></p>
            <p><strong>H2: 3 Ciri Kopi Low-Acid yang Wajib Kamu Perhatikan</strong></p>
            <p><strong>H2: Cold Brew vs Americano: Mana yang Lebih Ramah di Perut?</strong></p>
          </div>
        </>
      ),
    },
    {
      title: "[Contoh 2] Kerangka Artikel SEO Skincare",
      niche: "Target Keyword: cara memperbaiki skin barrier rusak",
      body: (
        <>
          <h4 className="font-bold text-ink text-xs sm:text-sm">H1: 5 Tanda Skin Barrier Rusak dan Cara Mengatasinya dalam 14 Hari</h4>
          <p className="text-[11px] text-stone-500 font-mono">Vol: 4.100/bln | Intent: Solusi Kulit</p>
          <div className="pl-3 border-l-2 border-ink space-y-1 text-xs text-stone-700 mt-2">
            <p><strong>H2: Ciri-ciri Skin Barrier Rusak yang Sering Salah Didiagnosis</strong></p>
            <p><strong>H2: Kandungan Skincare yang Wajib Dihindari Sementara Waktu</strong></p>
          </div>
        </>
      ),
    },
  ],
};

const categories: { key: Category; label: string }[] = [
  { key: "script", label: "Video Scripts" },
  { key: "caption", label: "Captions AIDA" },
  { key: "seo", label: "Struktur SEO" },
];

export function SamplePreview() {
  const [activeCategory, setActiveCategory] = useState<Category>("script");
  const [activeSampleIdx, setActiveSampleIdx] = useState(0);
  const samples = sampleData[activeCategory];
  const current = samples[activeSampleIdx];

  const switchCategory = (category: Category) => {
    setActiveCategory(category);
    setActiveSampleIdx(0);
  };

  return (
    <section id="preview" className="py-12 sm:py-20 border-b-2 border-ink bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8">
          <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Transparansi Mutu</span>
          <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Lihat contoh output sebelum kamu memesan.</h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans mt-2 max-w-xl mx-auto leading-relaxed">Preview ini menunjukkan format dan kedalaman pengerjaan. Topik, angle, dan tone akan disesuaikan dengan brief bisnis kamu.</p>
        </div>

        <div role="tablist" aria-label="Jenis output" className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:justify-center mb-3">
          {categories.map((category) => (
            <button key={category.key} type="button" role="tab" aria-selected={activeCategory === category.key} aria-controls="samplePanel" onClick={() => switchCategory(category.key)} className={`tab-btn badge-tag px-3.5 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold transition shrink-0 ${activeCategory === category.key ? "active bg-ink text-white" : "bg-white text-ink"}`}>
              {category.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:justify-center mb-4 sm:mb-5 font-mono text-xs">
          {samples.map((sample, index) => (
            <button key={sample.title} type="button" aria-pressed={activeSampleIdx === index} onClick={() => setActiveSampleIdx(index)} className={`sample-pill px-3 py-1.5 rounded-lg border-2 border-ink font-bold shrink-0 ${activeSampleIdx === index ? "active bg-ink text-white" : "bg-white text-ink"}`}>
              {index === 0 ? "Contoh 1: Kuliner (F&B)" : "Contoh 2: Skincare / D2C"}
            </button>
          ))}
        </div>

        <div id="samplePanel" role="tabpanel" aria-live="polite" className="bento-pop p-5 sm:p-8 rounded-3xl bg-white font-mono text-xs min-h-[240px]">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2.5 sm:pb-3 border-b-2 border-ink text-stone-500 gap-1 mb-3 sm:mb-4">
            <span className="font-bold text-ink sm:font-normal">{current.title}</span>
            <span className="text-[10px] badge-tag bg-wasabi px-2 py-0.5 rounded text-ink font-bold self-start sm:self-auto">{current.niche}</span>
          </div>
          <div className="space-y-3 sm:space-y-4 font-sans text-xs sm:text-sm text-stone-800 leading-relaxed">{current.body}</div>
        </div>
      </div>
    </section>
  );
}
