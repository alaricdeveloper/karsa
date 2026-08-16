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
      "Anda akan menerima tautan ruang kerja Notion Database terstruktur per hari (Day 01 hingga Day 30), lengkap dengan tabel status jadwal posting, kolom takarir, naskah video, dan shot-list. Kami juga melampirkan berkas cadangan Google Docs (.docx).",
  },
  {
    question: "Apakah saya harus merekam dan mengedit videonya sendiri?",
    answer:
      "Ya. Karsa menyediakan konsep kreatif terstruktur, naskah kata-per-kata, arahan angle visual kamera, teks di layar (*on-screen text*), dan referensi audio. Anda atau staf Anda tinggal merekam di depan ponsel dengan panduan naskah tersebut.",
  },
  {
    question: "Bagaimana jika ada sudut komunikasi yang perlu disesuaikan (Revisi)?",
    answer:
      "Kami menyediakan garansi 48 jam penyesuaian konten gratis. Jika ada sudut pesan atau istilah teknis industri yang perlu diperbaiki, Anda dapat mengirimkan catatan revisi via portal klien dan sistem kami akan memperbarui Notion Anda.",
  },
  {
    question: "Bagaimana hak cipta dan kepemilikan materi konten?",
    answer:
      "100% Hak Milik Komersial menjadi milik Anda secara penuh sejak dokumen diserahterimakan. Anda bebas mempublikasikan, memodifikasi, memecah artikel, atau mendaftarkannya sebagai materi promosi resmi brand Anda.",
  },
  {
    question: "Berapa lama waktu pengerjaan dari pengisian brief?",
    answer:
      "Standar SLA pengiriman adalah maksimal 1x24 jam kerja. Waktu ini digunakan untuk memproses parameter brief, menghasilkan variasi sudut pesan, dan menjalankan kurasi kualitas sebelum link Notion dikirimkan ke email Anda.",
  },
  {
    question: "Apakah ini sistem langganan yang memotong saldo otomatis?",
    answer:
      "Bukan langganan mengikat (*no auto-debit*). Anda hanya membayar flat Rp299.000 per paket saat membutuhkan batch kalender 30 hari yang baru. Tidak ada biaya siluman di bulan berikutnya.",
  },
  {
    question: "Bagaimana metode pembayaran yang didukung?",
    answer:
      "Kami menerima pembayaran instan via QRIS (BCA Mobile, GoPay, OVO, Dana, ShopeePay) serta Virtual Account bank utama di Indonesia. Verifikasi berjalan otomatis setelah transaksi selesai.",
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
    <section id="faq" className="py-14 sm:py-20 border-b border-sand-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-10">
          <span className="text-[11px] sm:text-xs font-mono uppercase tracking-wider text-stone-500">Pusat Informasi</span>
          <h2 className="text-2xl sm:text-4xl font-serif text-sand-900 mt-1">Pertanyaan yang Sering Diajukan</h2>
        </div>

        {/* FAQ Search */}
        <div className="max-w-md mx-auto mb-6 sm:mb-8 relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari pertanyaan (misal: revisi, notion, format)..."
            className="w-full bg-white border border-sand-300 rounded-xl pl-10 pr-4 py-3 text-base sm:text-xs text-sand-900 focus:outline-none focus:border-sand-900 font-mono transition min-h-[44px]"
          />
        </div>

        <div className="space-y-3">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="faq-item bento-card p-4 sm:p-6 rounded-xl cursor-pointer"
              onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
            >
              <div className="flex justify-between items-center gap-3">
                <span className="text-xs font-mono text-stone-400">{String(idx + 1).padStart(2, "0")}</span>
                <h4 className="text-xs sm:text-base font-semibold text-sand-900 flex-1">{item.question}</h4>
                <Plus className={`w-4 h-4 text-stone-500 transition-transform shrink-0 ${openIdx === idx ? "rotate-45" : ""}`} />
              </div>
              {openIdx === idx && (
                <p className="text-xs sm:text-sm text-stone-600 mt-3 pl-6 sm:pl-8 leading-relaxed font-normal">
                  {item.answer}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
