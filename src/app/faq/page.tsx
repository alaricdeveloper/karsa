import type { Metadata } from "next";
import Link from "next/link";
import faqData from "@/data/faq.json";
import {
  Camera,
  Clapperboard,
  Clock,
  MessageCircle,
  Package,
  Search,
  ShieldCheck,
  Users,
  Video,
  Wallet,
  type LucideIcon,
} from "lucide-react";

export const metadata: Metadata = {
  title: "FAQ Karsa Studio — Pilih Kategori Pertanyaan",
  description:
    "Pusat bantuan Karsa Studio: 90 pertanyaan & jawaban dalam 9 kategori — harga, SLA, revisi, garansi, dan semua jasa konten 30 hari.",
  alternates: { canonical: "/faq" },
};

const CATS: {
  key: string;
  label: string;
  desc: string;
  icon: LucideIcon;
  chip: string;
}[] = [
  { key: "umum", label: "Umum & Deliverable", desc: "Apa itu Karsa, format berkas, hak cipta, bahasa, tone, privasi, akses materi.", icon: Package, chip: "bg-brutalYellow" },
  { key: "harga", label: "Harga & Pembayaran", desc: "Biaya, metode bayar, invoice, pajak, diskon, batch tambahan, refund pembayaran.", icon: Wallet, chip: "bg-brutalCyan" },
  { key: "sla", label: "SLA & Pengiriman", desc: "Waktu kerja 24 jam, hari libur, brief tidak lengkap, pengiriman cepat, akses Notion.", icon: Clock, chip: "bg-brutalGreen" },
  { key: "revisi", label: "Revisi & Garansi", desc: "Kalibrasi 48 jam, jumlah revisi, QC, garansi uang kembali, kompensasi.", icon: ShieldCheck, chip: "bg-brutalPink" },
  { key: "tiktok", label: "Jasa Script Video TikTok", desc: "Durasi, format vertikal, shot-list B-roll, teleprompter, arahan kamera.", icon: Clapperboard, chip: "bg-brutalYellow" },
  { key: "video", label: "Jasa Konten Video UMKM", desc: "Beda dengan shooting, YouTube, portofolio, editing, aset brand.", icon: Video, chip: "bg-brutalCyan" },
  { key: "creator", label: "Jasa Content Creator", desc: "Pengganti full-time, konsultasi, alur kolaborasi, iklan berbayar.", icon: Users, chip: "bg-brutalGreen" },
  { key: "seo", label: "Jasa Artikel SEO", desc: "Jumlah artikel, riset keyword, publish di blog, meta description, traffic.", icon: Search, chip: "bg-brutalPink" },
  { key: "ig", label: "Paket Konten Instagram", desc: "Desain feed, frekuensi posting, caption & tagar, repost, penjadwalan.", icon: Camera, chip: "bg-brutalYellow" },
];

const total = Object.values(faqData).reduce((acc, v) => acc + v.length, 0);

export default function FaqPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <div className="text-center mb-10 sm:mb-12">
        <span className="badge-brutal inline-block px-3 py-1 rounded-lg text-xs font-mono font-bold bg-brutalYellow text-ink">
          Pusat Bantuan
        </span>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-ink mt-3">
          Pilih Kategori FAQ
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-mono mt-2">
          {total} pertanyaan dalam 9 kategori — pilih yang paling relevan dengan kebutuhanmu.
        </p>
      </div>

      <div className="max-w-md mx-auto mb-10 relative">
        <label htmlFor="faqSearch" className="sr-only">
          Cari pertanyaan FAQ
        </label>
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" aria-hidden="true" />
        <input
          type="text"
          id="faqSearch"
          placeholder="Cari: revisi, tone, format, SLA, pembayaran, invoice..."
          className="w-full bg-white border-2 border-ink rounded-xl pl-10 pr-4 py-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-ink font-mono transition min-h-[44px]"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5" id="faqGrid">
        {CATS.map((cat) => {
          const Icon = cat.icon;
          const n = (faqData as Record<string, { q: string; a: string }[]>)[cat.key].length;
          return (
            <Link
              key={cat.key}
              href={`/faq/${cat.key}`}
              className="bento-card rounded-3xl p-5 sm:p-6 bg-white flex flex-col gap-3 group hover:bg-canvas transition"
            >
              <div className="flex items-start justify-between gap-3">
                <span className={`w-11 h-11 rounded-xl ${cat.chip} border-2 border-ink flex items-center justify-center shadow-brutal-sm`}>
                  <Icon className="w-5 h-5 text-ink" />
                </span>
                <span className="badge-brutal px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-brutalYellow text-ink shrink-0">
                  {n} FAQ
                </span>
              </div>
              <div>
                <h2 className="text-base sm:text-lg font-display font-bold text-ink group-hover:text-terracotta transition">
                  {cat.label}
                </h2>
                <p className="text-[11px] text-stone-600 font-mono mt-1">{cat.desc}</p>
              </div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-ink mt-auto">
                Buka Kategori <span aria-hidden="true">&rarr;</span>
              </span>
            </Link>
          );
        })}
      </div>

      <div className="text-center mt-12 pt-6 border-t-2 border-ink">
        <p className="text-xs sm:text-sm text-stone-600 font-mono font-bold mb-3">
          Masih ada pertanyaan lain?
        </p>
        <a
          href="https://wa.me/6281288009920"
          target="_blank"
          rel="noopener"
          className="btn-press inline-flex items-center gap-2 px-5 py-3 bg-ink text-brutalYellow hover:bg-brutalYellow hover:text-ink rounded-xl font-mono text-xs font-bold transition shadow-brutal-sm"
        >
          <MessageCircle className="w-4 h-4" />
          Chat Tim Karsa
        </a>
      </div>
    </div>
  );
}