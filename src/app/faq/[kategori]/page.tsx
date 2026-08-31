"use client";

import { use, useState } from "react";
import Link from "next/link";
import faqData from "@/data/faq.json";
import {
  ArrowLeft,
  Camera,
  Clapperboard,
  Clock,
  MessageCircle,
  Package,
  Plus,
  Search,
  ShieldCheck,
  Users,
  Video,
  Wallet,
  type LucideIcon,
} from "lucide-react";

const CATS: {
  key: string;
  label: string;
  desc: string;
  icon: LucideIcon;
}[] = [
  { key: "umum", label: "Umum & Deliverable", desc: "Apa itu Karsa, format berkas, hak cipta, bahasa, tone, privasi, akses materi.", icon: Package },
  { key: "harga", label: "Harga & Pembayaran", desc: "Biaya, metode bayar, invoice, pajak, diskon, batch tambahan, refund pembayaran.", icon: Wallet },
  { key: "sla", label: "SLA & Pengiriman", desc: "Waktu kerja 24 jam, hari libur, brief tidak lengkap, pengiriman cepat, akses Notion.", icon: Clock },
  { key: "revisi", label: "Revisi & Garansi", desc: "Kalibrasi 48 jam, jumlah revisi, QC, garansi uang kembali, kompensasi.", icon: ShieldCheck },
  { key: "tiktok", label: "Jasa Script Video TikTok", desc: "Durasi, format vertikal, shot-list B-roll, teleprompter, arahan kamera.", icon: Clapperboard },
  { key: "video", label: "Jasa Konten Video UMKM", desc: "Beda dengan shooting, YouTube, portofolio, editing, aset brand.", icon: Video },
  { key: "creator", label: "Jasa Content Creator", desc: "Pengganti full-time, konsultasi, alur kolaborasi, iklan berbayar.", icon: Users },
  { key: "seo", label: "Jasa Artikel SEO", desc: "Jumlah artikel, riset keyword, publish di blog, meta description, traffic.", icon: Search },
  { key: "ig", label: "Paket Konten Instagram", desc: "Desain feed, frekuensi posting, caption & tagar, repost, penjadwalan.", icon: Camera },
];

export default function FaqCategoryPage({ params }: { params: Promise<{ kategori: string }> }) {
  const { kategori } = use(params);
  const cat = CATS.find((c) => c.key === kategori);
  const items = (faqData as Record<string, { q: string; a: string }[]>)[kategori] ?? [];
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <Link
        href="/faq"
        className="inline-flex items-center gap-1.5 text-[11px] font-mono font-bold text-stone-600 hover:text-ink transition mb-6"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Semua Kategori FAQ
      </Link>

      <div className="mb-8">
        <div className="flex items-center gap-2.5 flex-wrap">
          <span className="badge-brutal px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-brutalGreen text-ink">
            {items.length} FAQ
          </span>
          <span className="badge-brutal px-2.5 py-1 rounded-lg text-[10px] font-mono font-bold bg-brutalYellow text-ink">
            Kategori
          </span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight text-ink mt-3">
          {cat?.label ?? kategori}
        </h1>
        <p className="text-xs sm:text-sm text-stone-600 font-mono mt-2">{cat?.desc}</p>
      </div>

      <div className="space-y-3">
        {items.map((f, i) => {
          const isOpen = open === i;
          return (
            <button
              key={i}
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i + 1}`}
              className="faq-item bento-card w-full p-4 sm:p-5 rounded-2xl cursor-pointer bg-white text-left"
            >
              <div className="flex justify-between items-center gap-3">
                <span className="text-xs font-mono font-bold text-ink">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-xs sm:text-base font-bold text-ink flex-1">{f.q}</h3>
                <Plus
                  className={`w-4 h-4 text-ink shrink-0 transition-transform ${isOpen ? "rotate-45" : ""}`}
                  aria-hidden="true"
                />
              </div>
              <p
                id={`faq-answer-${i + 1}`}
                className="text-xs sm:text-sm text-stone-600 mt-2.5 sm:mt-3 pl-5 sm:pl-8 font-sans"
                style={{
                  maxHeight: isOpen ? "600px" : "0px",
                  opacity: isOpen ? "1" : "0",
                  overflow: "hidden",
                  transition: "max-height 0.45s cubic-bezier(0.16,1,0.3,1), opacity 0.35s ease",
                }}
              >
                {f.a}
              </p>
            </button>
          );
        })}
      </div>

      <div className="mt-12 pt-6 border-t-2 border-ink">
        <p className="text-xs font-mono font-bold text-stone-600 mb-3">Kategori lainnya:</p>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {CATS.filter((c) => c.key !== kategori).map((c) => (
            <Link
              key={c.key}
              href={`/faq/${c.key}`}
              className="shrink-0 px-3.5 py-2 bg-white border-2 border-ink rounded-xl font-mono text-[10px] sm:text-xs font-bold text-ink hover:bg-brutalYellow transition shadow-brutal-sm"
            >
              {c.label}
            </Link>
          ))}
        </div>
      </div>

      <div className="text-center mt-10 pt-6 border-t-2 border-ink">
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