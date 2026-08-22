"use client";

import { useState } from "react";
import { Plus, Search } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  { question: "Bagaimana format berkas yang akan saya terima?", answer: "Kamu akan menerima tautan Notion Workspace terstruktur per hari (Day 01 hingga Day 30), lengkap dengan jadwal posting, video script kata-per-kata, caption AIDA, dan shot-list B-Roll. Kami juga menyertakan file cadangan Google Docs (.docx)." },
  { question: "Apakah saya harus merekam videonya sendiri?", answer: "Ya. Karsa menyediakan video script kata-per-kata per detik yang siap dibaca langsung di teleprompter ponsel kamu. Kamu atau tim cukup berbicara di depan kamera HP mengikuti panduan visual dan intonasi yang telah kami siapkan." },
  { question: "Bagaimana jika ada naskah yang kurang cocok (Garansi Revisi)?", answer: "Kami menyediakan garansi kalibrasi pesan selama 48 jam. Jika ada istilah teknis atau nada bicara yang ingin disesuaikan dengan persona brand kamu, tim kami akan memperbarui Notion dalam kurun waktu 12 jam kerja." },
  { question: "Bagaimana hak cipta dan kepemilikan materi konten?", answer: "Hak pakai komersial materi menjadi milik kamu setelah dokumen diserahterimakan. Kamu bebas mempublikasikan, memodifikasi, atau menggunakannya sebagai materi promosi brand." },
  { question: "Berapa lama waktu pengerjaan dari pengisian brief (SLA)?", answer: "Standar SLA pengiriman adalah maksimal 1x24 jam kerja. Waktu ini digunakan untuk memproses brief, menyusun naskah kata-per-kata, dan menjalankan kurasi kualitas sebelum link Notion dikirimkan ke email kamu." },
  { question: "Apakah ini sistem langganan yang memotong saldo otomatis?", answer: "Bukan langganan mengikat dan tidak ada auto-debit. Kamu hanya membayar flat Rp299.000 per batch saat membutuhkan kalender konten 30 hari yang baru. Tidak ada biaya tersembunyi di bulan berikutnya." },
  { question: "Bagaimana jika industri bisnis saya sangat unik / niche?", answer: "Di formulir brief, kamu dapat mencantumkan deskripsi produk sedetail mungkin dan menyertakan 1 akun kompetitor rujukan. Tim kami akan membedah target audiens dan pain point spesifik produkmu, apa pun industrinya." },
  { question: "Metode pembayaran apa saja yang didukung?", answer: "Kami menerima pembayaran instan via QRIS serta Virtual Account dari bank utama di Indonesia. Detail metode pembayaran akan muncul di halaman checkout." },
  { question: "Apakah naskah ini bisa dipakai untuk iklan berbayar (Meta/TikTok Ads)?", answer: "Sangat bisa. Struktur video script kami menggunakan pola hook psikologis dan direct CTA yang teruji menghasilkan Click-Through-Rate (CTR) tinggi saat dialihkan menjadi materi iklan berbayar." },
  { question: "Bagaimana jika pengiriman melebihi 24 jam kerja?", answer: "Jika terjadi keterlambatan dari sisi tim internal kami, kamu akan mendapatkan 5 naskah video tambahan sebagai kompensasi sesuai kebijakan SLA." },
  { question: "Apa yang harus saya siapkan sebelum mengisi brief?", answer: "Siapkan deskripsi produk, target pembeli, rentang harga, satu kompetitor acuan, dan contoh tone yang kamu suka. Semakin jelas konteksnya, semakin spesifik arah naskah yang bisa kami susun." },
  { question: "Apakah gaya bahasa bisa disesuaikan dengan brand saya?", answer: "Bisa. Pilihan tone di brief menjadi acuan awal, lalu kamu bisa menjelaskan istilah, kata yang harus dihindari, dan cara brand kamu berbicara kepada audiens." },
  { question: "Berapa banyak penyesuaian yang termasuk dalam garansi?", answer: "Garansi berfokus pada kalibrasi istilah produk, tone, dan sudut pesan yang kurang sesuai dengan brief. Untuk kebutuhan yang berubah jauh dari konteks awal, hubungi tim agar cakupannya bisa disepakati lebih dulu." },
  { question: "Kapan hitungan SLA 1x24 jam kerja dimulai?", answer: "SLA mulai dihitung setelah brief terisi lengkap dan pembayaran terkonfirmasi. Jika ada informasi penting yang belum jelas, kami akan menghubungi kamu sebelum proses penulisan dimulai." },
];

export function FAQSection() {
  const [search, setSearch] = useState("");
  const [openIdx, setOpenIdx] = useState<number | null>(null);

  const query = search.trim().toLowerCase();
  const filtered = FAQ_ITEMS.map((item, index) => ({ item, index })).filter(({ item }) =>
    `${item.question} ${item.answer}`.toLowerCase().includes(query)
  );

  return (
    <section id="faq" className="py-12 sm:py-20 border-b-2 border-ink bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8">
          <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Pusat Informasi</span>
          <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">14 Pertanyaan Sebelum Kamu Memesan</h2>
          <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1">Ketahui segala detail sebelum kamu memesan batch konten 30 hari.</p>
        </div>

        <div className="max-w-md mx-auto mb-6 sm:mb-8 relative">
          <label htmlFor="faqSearch" className="sr-only">Cari pertanyaan FAQ</label>
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" aria-hidden="true" />
          <input id="faqSearch" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Cari: revisi, tone, format, SLA, pembayaran..." className="w-full bg-canvas border-2 border-ink rounded-xl pl-10 pr-4 py-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta font-mono transition min-h-[44px]" />
        </div>

        <div className="space-y-3" aria-live="polite">
          {filtered.map(({ item, index }) => {
            const isOpen = openIdx === index;
            const answerId = `faq-answer-${index + 1}`;
            return (
              <button key={index} type="button" aria-expanded={isOpen} aria-controls={answerId} onClick={() => setOpenIdx(isOpen ? null : index)} className="faq-item bento-pop w-full p-4 sm:p-5 rounded-2xl cursor-pointer bg-white text-left">
                <span className="flex justify-between items-center gap-3">
                  <span className="text-xs font-mono font-bold text-terracotta">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-xs sm:text-base font-bold text-ink flex-1">{item.question}</span>
                  <Plus className={`w-4 h-4 text-ink transition-transform shrink-0 ${isOpen ? "rotate-45" : ""}`} aria-hidden="true" />
                </span>
                <span id={answerId} className={`${isOpen ? "block" : "hidden"} text-xs sm:text-sm text-stone-600 mt-2.5 sm:mt-3 pl-5 sm:pl-8 leading-relaxed font-sans font-normal`}>{item.answer}</span>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 && <p className="text-center text-xs text-stone-500 font-mono mt-5">Tidak ada pertanyaan yang cocok. Coba kata kunci lain seperti revisi atau pembayaran.</p>}
      </div>
    </section>
  );
}
