"use client";

import { useState } from "react";
import { Search, Plus } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: "Bagaimana format berkas yang akan saya terima?",
    answer:
      "Anda akan menerima tautan ruang kerja Notion Database terstruktur per hari (Day 01 hingga Day 30), lengkap dengan tabel jadwal posting, video script kata-per-kata, caption AIDA, dan shot-list B-Roll. Kami juga menyertakan file cadangan Google Docs (.docx).",
  },
  {
    question: "Apakah saya harus merekam videonya sendiri?",
    answer:
      "Ya. Karsa menyediakan video script kata-per-kata per detik yang siap dibaca langsung di teleprompter ponsel Anda. Anda atau tim cukup berbicara di depan kamera HP mengikuti panduan visual dan intonasi yang telah kami siapkan.",
  },
  {
    question: "Bagaimana jika ada naskah yang kurang cocok (Garansi Revisi)?",
    answer:
      "Kami menyediakan garansi kalibrasi pesan 48 jam gratis. Jika ada istilah teknis atau nada bicara yang ingin disesuaikan dengan persona brand Anda, tim kami akan memperbarui Notion Anda dalam kurun waktu 12 jam kerja.",
  },
  {
    question: "Bagaimana hak cipta dan kepemilikan materi konten?",
    answer:
      "100% Hak Milik Komersial (IP Transfer) menjadi milik Anda secara penuh sejak dokumen diserahterimakan. Anda bebas mempublikasikan, memodifikasi, mengiklankan (Ads), atau mendaftarkannya sebagai materi promosi resmi brand Anda.",
  },
  {
    question: "Berapa lama waktu pengerjaan dari pengisian brief (SLA)?",
    answer:
      "Standar SLA pengiriman adalah maksimal 1x24 jam kerja. Waktu ini digunakan untuk memproses parameter brief, menyusun naskah kata-per-kata, dan menjalankan kurasi kualitas oleh tim copywriter sebelum link Notion dikirimkan ke email Anda.",
  },
  {
    question: "Apakah ini sistem langganan yang memotong saldo otomatis?",
    answer:
      "Bukan langganan mengikat (no auto-debit). Anda hanya membayar flat Rp299.000 per batch saat membutuhkan kalender konten 30 hari yang baru. Tidak ada biaya tersembunyi di bulan berikutnya.",
  },
  {
    question: "Bagaimana jika industri bisnis saya sangat unik / niche?",
    answer:
      "Di formulir brief, Anda dapat mencantumkan deskripsi produk sedetail mungkin dan menyertakan 1 akun kompetitor rujukan. Sistem kami akan membedah target audiens dan pain-point spesifik produk Anda, apa pun industrinya (B2B, retail, klinik, atau jasa profesional).",
  },
  {
    question: "Metode pembayaran apa saja yang didukung?",
    answer:
      "Kami menerima pembayaran instan via QRIS (BCA Mobile, Livin Mandiri, GoPay, OVO, Dana, ShopeePay) serta Virtual Account bank utama di Indonesia. Verifikasi transaksi berjalan instan dalam hitungan detik.",
  },
  {
    question: "Apakah naskah ini bisa dipakai untuk iklan berbayar (Meta/TikTok Ads)?",
    answer:
      "Sangat bisa. Struktur video script kami menggunakan pola hook psikologis dan direct CTA yang teruji menghasilkan Click-Through-Rate (CTR) tinggi saat dialihkan menjadi materi iklan berbayar.",
  },
  {
    question: "Bagaimana jika pengiriman melebihi 24 jam kerja?",
    answer:
      "Kami memiliki Kebijakan Kompensasi SLA Resmi: jika terjadi keterlambatan dari sisi tim internal kami, Anda secara otomatis berhak mendapatkan 5 naskah video viral tambahan gratis langsung di Notion Anda.",
  },
];

export function FAQSection() {
  const [search, setSearch] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const filtered = FAQ_ITEMS.filter(
    (item) =>
      item.question.toLowerCase().includes(search.toLowerCase()) ||
      item.answer.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section id="faq" className="py-12 sm:py-20 border-b-2 border-ink bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8">
          <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">
            Pusat Informasi
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">10 Pertanyaan yang Sering Diajukan</h2>
          <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1">Ketahui segala detail sebelum kamu memesan batch konten 30 hari.</p>
        </div>

        <div className="max-w-md mx-auto mb-6 sm:mb-8 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari pertanyaan (misal: revisi, notion, format, kamera)..."
            className="w-full bg-canvas border-2 border-ink rounded-xl pl-10 pr-4 py-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta font-mono transition min-h-[44px]"
          />
        </div>

        <div className="space-y-3">
          {filtered.map((item, idx) => {
            const realIdx = FAQ_ITEMS.indexOf(item);
            const num = String(realIdx + 1).padStart(2, "0");
            return (
              <div
                key={realIdx}
                className="faq-item bento-pop p-4 sm:p-5 rounded-2xl cursor-pointer bg-white"
                onClick={() => setOpenIdx(openIdx === realIdx ? null : realIdx)}
              >
                <div className="flex justify-between items-center gap-3">
                  <span className="text-xs font-mono font-bold text-terracotta">{num}</span>
                  <h4 className="text-xs sm:text-base font-bold text-ink flex-1">{item.question}</h4>
                  <Plus className={`w-4 h-4 text-ink transition-transform shrink-0 ${openIdx === realIdx ? "rotate-45" : ""}`} />
                </div>
                {openIdx === realIdx && (
                  <p className="text-xs sm:text-sm text-stone-600 mt-2.5 sm:mt-3 pl-5 sm:pl-8 leading-relaxed font-sans">
                    {item.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
