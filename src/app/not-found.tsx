"use client";

import { useState } from "react";
import Link from "next/link";
import { Home, LayoutGrid, ArrowUpRight, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  const [searchQuery, setSearchQuery] = useState("");

  const directoryCards = [
    {
      title: "Customer Hub",
      desc: "Akses 30 naskah, teleprompter, dan duplikasi Notion.",
      href: "/portal/demo",
      external: false,
      bg: "bg-white",
      iconColor: "text-terracotta",
    },
    {
      title: "Member Tools",
      desc: "Generator Hook, Kalkulator ROI, dan Brand Vault.",
      href: "/login",
      external: false,
      bg: "bg-white",
      iconColor: "text-terracotta",
    },
    {
      title: "Checkout Gateway",
      desc: "Pembayaran instan QRIS & Virtual Account.",
      href: "/checkout",
      external: false,
      bg: "bg-white",
      iconColor: "text-terracotta",
    },
    {
      title: "Terms & IP Transfer",
      desc: "Syarat ketentuan resmi & 100% hak cipta.",
      href: "/terms",
      external: false,
      bg: "bg-canvas",
      iconColor: "text-inkMuted",
    },
    {
      title: "SLA & Guarantee",
      desc: "Garansi 24 jam & revisi kalibrasi 48 jam.",
      href: "/refund",
      external: false,
      bg: "bg-canvas",
      iconColor: "text-inkMuted",
    },
    {
      title: "Bantuan CS",
      desc: "Hubungi tim operasional langsung via WhatsApp.",
      href: "https://wa.me/6281288009920",
      external: true,
      bg: "bg-wasabi/40",
      iconColor: "text-ink",
    },
    {
      title: "Harga Paket",
      desc: "Batch 30 hari mulai Rp299.000, tanpa langganan.",
      href: "/harga",
      external: false,
      bg: "bg-white",
      iconColor: "text-terracotta",
    },
    {
      title: "Blog & Panduan",
      desc: "Panduan konten video & SEO untuk UMKM.",
      href: "/blog",
      external: false,
      bg: "bg-white",
      iconColor: "text-terracotta",
    },
  ];

  const isCardVisible = (title: string, desc: string) => {
    if (!searchQuery) return true;
    return `${title} ${desc}`.toLowerCase().includes(searchQuery.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans antialiased selection:bg-wasabi selection:text-ink flex flex-col justify-between">
      {/* TOP APP BAR */}
      <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur-md border-b-2 border-ink">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between whitespace-nowrap">
          <Link href="/" className="flex items-center space-x-2 shrink-0 group">
            <span className="font-serif text-3xl sm:text-4xl tracking-tight text-ink font-normal group-hover:rotate-1 transition-transform">Karsa</span>
            <span className="badge-tag text-[10px] font-mono uppercase px-2 py-0.5 bg-terracotta text-white rounded font-bold">Status 404</span>
          </Link>
          <div className="flex items-center space-x-3 text-xs font-mono">
            <Link href="/" className="badge-tag bg-white hover:bg-canvas text-ink px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 shadow-brutal-sm min-h-[44px]">
              <Home className="w-3.5 h-3.5 text-inkMuted" />
              <span>Beranda</span>
            </Link>
          </div>
        </div>
      </header>

      {/* MAIN 404 CONTENT */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10 sm:py-16 my-auto text-center space-y-8 relative">
        {/* Decorative Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-sunflower/30 blur-3xl pointer-events-none -z-10"></div>

        {/* BIG EDITORIAL 404 DISPLAY */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 badge-tag bg-sunflower px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-ink">
            <span className="w-2 h-2 rounded-full bg-terracotta animate-ping"></span>
            <span>Alamat URL Tidak Ditemukan</span>
          </div>

          <h1 className="text-7xl sm:text-9xl font-serif text-ink tracking-tight select-none leading-none">
            404
          </h1>

          <h2 className="text-2xl sm:text-4xl font-serif text-terracotta italic leading-tight">
            Naskah konten ini belum terbit atau tautannya berpindah.
          </h2>

          <p className="text-xs sm:text-sm text-inkMuted font-sans max-w-lg mx-auto leading-relaxed font-medium">
            Halaman yang kamu cari tidak tersedia dalam arsip Karsa Studio. Mungkin tautan salah ketik atau telah dialihkan ke ruang kerja baru.
          </p>
        </div>

        {/* INTERACTIVE REAL-TIME SEARCH BOX */}
        <div className="max-w-md mx-auto relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-inkMuted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari halaman (workspace, hub, legal, brief)..."
            className="w-full bg-white border-2 border-ink rounded-2xl pl-10 pr-4 py-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta font-mono shadow-brutal-sm transition min-h-[44px] caret-terracotta"
          />
        </div>

        {/* PRIMARY ACTION BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 font-mono text-xs max-w-md mx-auto">
          <Link href="/" className="w-full sm:w-auto px-6 py-3.5 bg-terracotta hover:bg-ink text-white rounded-2xl font-bold transition flex items-center justify-center gap-2 shadow-brutal min-h-[48px]">
            <ArrowLeft className="w-4 h-4 text-wasabi" />
            <span>Kembali ke Beranda Utama</span>
          </Link>
          <Link href="/login" className="w-full sm:w-auto px-6 py-3.5 bg-white border-2 border-ink hover:bg-canvas text-ink rounded-2xl font-bold transition flex items-center justify-center gap-2 min-h-[48px] shadow-brutal-sm">
            <LayoutGrid className="w-4 h-4 text-inkMuted" />
            <span>Buka Member Workspace</span>
          </Link>
        </div>

        {/* QUICK DIRECTORY BENTO CARDS */}
        <div className="pt-8 border-t-2 border-ink space-y-4 text-left font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-inkMuted uppercase tracking-wider font-bold">Direktori Portal Karsa</span>
            <span className="text-[10px] text-inkMuted">8 Saluran Aktif</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            {directoryCards.map((card) => (
              <div key={card.title} className={isCardVisible(card.title, card.desc) ? "" : "hidden"}>
                {card.external ? (
                  <a
                    href={card.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`dir-card bento-pop p-4 rounded-2xl space-y-1 block ${card.bg}`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-ink font-sans text-sm">{card.title}</span>
                      <ArrowUpRight className={`w-4 h-4 ${card.iconColor}`} />
                    </div>
                    <p className="text-[11px] text-inkMuted font-sans leading-snug">{card.desc}</p>
                  </a>
                ) : (
                  <Link href={card.href} className={`dir-card bento-pop p-4 rounded-2xl space-y-1 block ${card.bg}`}>
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-ink font-sans text-sm">{card.title}</span>
                      <ArrowUpRight className={`w-4 h-4 ${card.iconColor}`} />
                    </div>
                    <p className="text-[11px] text-inkMuted font-sans leading-snug">{card.desc}</p>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t-2 border-ink py-6 px-4 font-mono text-xs text-inkMuted text-center bg-surface">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 text-[11px] font-bold text-ink">
            <Link href="/terms" className="hover:text-terracotta transition underline">Terms</Link>
            <span>&bull;</span>
            <Link href="/privacy" className="hover:text-terracotta transition underline">Privacy</Link>
            <span>&bull;</span>
            <Link href="/refund" className="hover:text-terracotta transition underline">SLA Guarantee</Link>
          </div>
          <p className="text-[11px] text-inkMuted font-bold">&copy; 2026 Karsa Studio (<span className="text-ink">usekarsa.com</span>). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
