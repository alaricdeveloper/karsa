"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, BarChart3, CalendarRange, ChevronDown, PackageCheck, Store, Target } from "lucide-react";

const outputModules = [
  ["01", "30 Video Scripts", "Hook, visual, audio, CTA.", "#modul-video", "bg-wasabi"],
  ["02", "30 Caption & Tagar", "AIDA + 3 tier tagar.", "#modul-caption", "bg-sunflower"],
  ["03", "4 Artikel Blog SEO", "Struktur H1-H3 + meta.", "#modul-seo", "bg-canvas"],
  ["04", "Audit Gap Kompetitor", "Teardown 1 akun acuan.", "#modul-radar", "bg-terracottaLight text-terracotta"],
  ["05", "Notion Content OS", "Calendar + Kanban produksi.", "#modul-notion", "bg-sunflower"],
  ["06", "Panduan B-Roll HP", "Shot-list untuk rekam sendiri.", "#modul-broll", "bg-wasabi"],
] as const;

const sectors = [
  ["F&B & Cafe", "Menu, review, edukasi.", "bg-amber-500"],
  ["Skincare & Beauty", "Ingredient, myth-busting.", "bg-pink-500"],
  ["Fashion & Apparel", "Styling, fit, detail bahan.", "bg-indigo-500"],
  ["Jasa & Edukasi", "Konsultan, klinik, les.", "bg-emerald-500"],
] as const;

function MenuLink({ href, children, onClick }: { href: string; children: React.ReactNode; onClick: () => void }) {
  return <a href={href} onClick={onClick} className="block p-2 rounded-xl hover:bg-canvas transition">{children}</a>;
}

export function MegaDropdownNav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [openAccordions, setOpenAccordions] = useState<Record<string, boolean>>({});
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const openButton = headerRef.current?.querySelector<HTMLButtonElement>(
        '[data-nav-toggle][aria-expanded="true"]'
      );
      setActiveDropdown(null);
      setMobileOpen(false);
      openButton?.focus();
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setActiveDropdown(null);
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("pointerdown", handlePointerDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  const closeMenus = () => {
    setActiveDropdown(null);
    setMobileOpen(false);
  };

  const toggleAccordion = (id: string) => {
    setOpenAccordions((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <header ref={headerRef} className="sticky top-0 z-40 bg-canvas/95 backdrop-blur-md border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between whitespace-nowrap">
        <a href="#main-content" className="flex items-center space-x-2 shrink-0 group" aria-label="Karsa Studio, ke konten utama">
          <span className="font-serif text-2xl sm:text-4xl tracking-tight text-ink font-normal group-hover:rotate-1 transition-transform">Karsa</span>
          <span className="badge-tag text-[9px] sm:text-[10px] font-mono uppercase px-1.5 sm:px-2 py-0.5 bg-wasabi text-ink rounded font-bold">Studio</span>
        </a>

        <nav className="hidden xl:flex items-center gap-4 xl:gap-5 text-xs font-mono font-bold text-ink shrink-0" aria-label="Navigasi utama">
          <div className="relative group py-5" onFocus={() => setActiveDropdown("output")} onBlur={(event) => { if (!event.relatedTarget || !event.currentTarget.contains(event.relatedTarget as Node)) setActiveDropdown(null); }}>
            <button type="button" data-nav-toggle aria-haspopup="true" aria-expanded={activeDropdown === "output"} aria-controls="outputMenu" onClick={() => setActiveDropdown(activeDropdown === "output" ? null : "output")} className="flex items-center gap-1 hover:text-terracotta transition font-bold whitespace-nowrap">
              <span>Isi Paket</span>
              <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${activeDropdown === "output" ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>

            <div id="outputMenu" className={`dropdown-menu absolute top-full left-0 w-[740px] max-w-[calc(100vw-2rem)] bg-white border-2 border-ink rounded-2xl p-4 shadow-brutal z-50 whitespace-normal ${activeDropdown === "output" ? "nav-open" : ""}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink"><PackageCheck className="w-4 h-4 text-terracotta" aria-hidden="true" /><span className="font-mono text-[10px] uppercase tracking-wider font-bold text-ink">Output Utama</span></div>
                  <div className="mt-2 space-y-1">
                    {outputModules.map(([number, title, description, href, color]) => (
                      <a key={number} href={href} onClick={closeMenus} className="group/item flex gap-2.5 p-2 rounded-xl hover:bg-canvas transition">
                        <span className={`w-6 h-6 rounded-lg ${color} text-ink border-2 border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0`}>{number}</span>
                        <span><span className="block font-bold text-ink font-sans text-xs">{title}</span><span className="block text-[10px] text-stone-500 font-mono mt-0.5">{description}</span></span>
                      </a>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink"><CalendarRange className="w-4 h-4 text-wasabiDark" aria-hidden="true" /><span className="font-mono text-[10px] uppercase tracking-wider font-bold text-ink">Strategi & Sistem</span></div>
                  <div className="mt-2 space-y-1 font-sans">
                    <MenuLink href="#isi-harian" onClick={closeMenus}><span className="block font-bold text-xs text-ink">Peta Konten 30 Hari</span><span className="block text-[10px] text-stone-500 mt-0.5">Foundation sampai conversion.</span></MenuLink>
                    <MenuLink href="#standar-kualitas" onClick={closeMenus}><span className="block font-bold text-xs text-ink">Standar Setiap Output</span><span className="block text-[10px] text-stone-500 mt-0.5">Checklist sebelum dipakai tim.</span></MenuLink>
                    <MenuLink href="#cara-kerja" onClick={closeMenus}><span className="block font-bold text-xs text-ink">Cara Kerja Karsa</span><span className="block text-[10px] text-stone-500 mt-0.5">Brief, riset, tulis, kirim.</span></MenuLink>
                    <MenuLink href="#cakupan" onClick={closeMenus}><span className="block font-bold text-xs text-ink">Scope Layanan</span><span className="block text-[10px] text-stone-500 mt-0.5">Termasuk dan tidak termasuk.</span></MenuLink>
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink"><BarChart3 className="w-4 h-4 text-terracotta" aria-hidden="true" /><span className="font-mono text-[10px] uppercase tracking-wider font-bold text-ink">Proof & Keputusan</span></div>
                  <div className="mt-2 space-y-1 font-sans">
                    <MenuLink href="#compare-scripts" onClick={closeMenus}><span className="block font-bold text-xs text-ink">Bandingkan Kualitas</span><span className="block text-[10px] text-stone-500 mt-0.5">Script generik vs Karsa.</span></MenuLink>
                    <MenuLink href="#studi-kasus" onClick={closeMenus}><span className="block font-bold text-xs text-ink">Case Study Nyata</span><span className="block text-[10px] text-stone-500 mt-0.5">Metrik dari implementasi.</span></MenuLink>
                    <MenuLink href="#preview" onClick={closeMenus}><span className="block font-bold text-xs text-ink">Contoh Output</span><span className="block text-[10px] text-stone-500 mt-0.5">Script, caption, dan SEO.</span></MenuLink>
                    <MenuLink href="#calculator" onClick={closeMenus}><span className="block font-bold text-xs text-ink">Kalkulator Hemat</span><span className="block text-[10px] text-stone-500 mt-0.5">Bandingkan biaya per batch.</span></MenuLink>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t-2 border-ink flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono px-2"><span className="font-bold text-terracotta">5 bonus eksklusif sudah termasuk dalam setiap batch.</span><a href="#bonus-stack" onClick={closeMenus} className="text-ink font-bold hover:underline">Lihat semua bonus <span aria-hidden="true">&rarr;</span></a></div>
            </div>
          </div>

          <div className="relative group py-5" onFocus={() => setActiveDropdown("business")} onBlur={(event) => { if (!event.relatedTarget || !event.currentTarget.contains(event.relatedTarget as Node)) setActiveDropdown(null); }}>
            <button type="button" data-nav-toggle aria-haspopup="true" aria-expanded={activeDropdown === "business"} aria-controls="businessMenu" onClick={() => setActiveDropdown(activeDropdown === "business" ? null : "business")} className="flex items-center gap-1 hover:text-terracotta transition font-bold whitespace-nowrap">
              <span>Untuk Bisnis</span>
              <ChevronDown className={`w-3.5 h-3.5 text-stone-500 transition-transform duration-200 ${activeDropdown === "business" ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>

            <div id="businessMenu" className={`dropdown-menu absolute top-full left-0 w-[560px] max-w-[calc(100vw-2rem)] bg-white border-2 border-ink rounded-2xl p-4 shadow-brutal z-50 whitespace-normal ${activeDropdown === "business" ? "nav-open" : ""}`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink"><Store className="w-4 h-4 text-terracotta" aria-hidden="true" /><span className="font-mono text-[10px] uppercase tracking-wider font-bold text-ink">Sektor Bisnis</span></div>
                  <div className="mt-2 space-y-1">
                    {sectors.map(([name, description, color]) => <a key={name} href="#studi-kasus" onClick={closeMenus} className="p-2 rounded-xl hover:bg-canvas transition flex items-center gap-2.5"><span className={`w-2.5 h-2.5 rounded-full ${color} border border-ink shrink-0`} /><span><span className="block font-bold text-ink font-sans text-xs">{name}</span><span className="block text-[10px] text-stone-500 font-mono mt-0.5">{description}</span></span><ArrowUpRight className="w-3.5 h-3.5 text-stone-400 ml-auto" aria-hidden="true" /></a>)}
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink"><Target className="w-4 h-4 text-wasabiDark" aria-hidden="true" /><span className="font-mono text-[10px] uppercase tracking-wider font-bold text-ink">Tujuan Konten</span></div>
                  <div className="mt-2 space-y-1 font-sans">
                    <MenuLink href="#isi-harian" onClick={closeMenus}><span className="block font-bold text-xs text-ink">Edukasi & Awareness</span><span className="block text-[10px] text-stone-500 mt-0.5">Buat audiens lebih paham.</span></MenuLink>
                    <MenuLink href="#order" onClick={closeMenus}><span className="block font-bold text-xs text-ink">Leads & DM</span><span className="block text-[10px] text-stone-500 mt-0.5">Arahkan percakapan baru.</span></MenuLink>
                    <MenuLink href="#order" onClick={closeMenus}><span className="block font-bold text-xs text-ink">Penjualan Produk</span><span className="block text-[10px] text-stone-500 mt-0.5">Perjelas value dan CTA.</span></MenuLink>
                    <MenuLink href="#cocok-untuk" onClick={closeMenus}><span className="block font-bold text-xs text-ink">Cek Kecocokan</span><span className="block text-[10px] text-stone-500 mt-0.5">Lihat apakah Karsa untukmu.</span></MenuLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <a href="#compare-scripts" className="hover:text-terracotta transition whitespace-nowrap">Lihat Kualitas</a>
          <a href="#cara-kerja" className="hover:text-terracotta transition whitespace-nowrap">Cara Kerja</a>
          <a href="#preview" className="hover:text-terracotta transition whitespace-nowrap">Contoh Konten</a>
          <a href="#faq" className="hover:text-terracotta transition whitespace-nowrap">FAQ</a>
        </nav>

        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          <Link href="/login" className="hidden xl:inline-flex text-xs font-mono font-bold text-ink hover:text-terracotta px-3 py-2 transition whitespace-nowrap">Member Workspace</Link>
          <a href="#order" className="badge-tag bg-ink text-canvas hover:bg-terracotta hover:text-white px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-1.5 whitespace-nowrap shadow-brutal-sm sm:shadow-brutal"><span>Mulai dengan Brief <span className="hidden sm:inline">(Rp299k)</span></span><ArrowRight className="w-3.5 h-3.5 text-wasabi" aria-hidden="true" /></a>
          <button type="button" onClick={() => setMobileOpen((open) => !open)} aria-label={mobileOpen ? "Tutup Menu" : "Buka Menu"} aria-expanded={mobileOpen} aria-controls="mobileMenu" className="xl:hidden p-2 rounded-xl text-ink border-2 border-ink bg-white focus:outline-none shadow-brutal-sm">
            {mobileOpen ? <span aria-hidden="true" className="text-xl leading-none">&times;</span> : <span aria-hidden="true" className="text-xl leading-none">&#9776;</span>}
          </button>
        </div>
      </div>

      <div id="mobileMenu" className={`${mobileOpen ? "block" : "hidden"} xl:hidden bg-canvas border-b-2 border-ink px-4 pt-3 pb-6 space-y-2.5 font-bold text-xs font-mono text-ink shadow-brutal max-h-[85vh] overflow-y-auto`}>
        <div className="border-2 border-ink rounded-2xl bg-white p-3.5 shadow-brutal-sm">
          <button type="button" aria-expanded={Boolean(openAccordions["mobile-output"])} aria-controls="mobile-output" onClick={() => toggleAccordion("mobile-output")} className="w-full flex justify-between items-center text-left"><span>Isi Paket (6 Komponen)</span><ChevronDown className={`w-4 h-4 transition-transform ${openAccordions["mobile-output"] ? "rotate-180" : ""}`} aria-hidden="true" /></button>
          <div id="mobile-output" className={`${openAccordions["mobile-output"] ? "block" : "hidden"} mt-3 space-y-2 pt-2.5 border-t-2 border-ink text-[11px]`}>
            {[...outputModules.map(([, title, , href]) => [title, href] as const), ["Peta Konten 30 Hari", "#isi-harian"] as const, ["Standar Setiap Output", "#standar-kualitas"] as const].map(([title, href]) => <a key={title} href={href} onClick={closeMenus} className="block py-1 text-stone-600">&bull; {title}</a>)}
          </div>
        </div>

        <div className="border-2 border-ink rounded-2xl bg-white p-3.5 shadow-brutal-sm">
          <button type="button" aria-expanded={Boolean(openAccordions["mobile-business"])} aria-controls="mobile-business" onClick={() => toggleAccordion("mobile-business")} className="w-full flex justify-between items-center text-left"><span>Untuk Bisnis & Tujuan</span><ChevronDown className={`w-4 h-4 transition-transform ${openAccordions["mobile-business"] ? "rotate-180" : ""}`} aria-hidden="true" /></button>
          <div id="mobile-business" className={`${openAccordions["mobile-business"] ? "block" : "hidden"} mt-3 space-y-2 pt-2.5 border-t-2 border-ink text-[11px]`}>
            <a href="#studi-kasus" onClick={closeMenus} className="block py-1 text-stone-600">&bull; F&B, Cafe & Roastery</a>
            <a href="#studi-kasus" onClick={closeMenus} className="block py-1 text-stone-600">&bull; Skincare & Beauty</a>
            <a href="#studi-kasus" onClick={closeMenus} className="block py-1 text-stone-600">&bull; Fashion & Apparel</a>
            <a href="#studi-kasus" onClick={closeMenus} className="block py-1 text-stone-600">&bull; Jasa Profesional & Edukasi</a>
            <a href="#isi-harian" onClick={closeMenus} className="block py-1 text-stone-600">&bull; Edukasi & Awareness</a>
            <a href="#order" onClick={closeMenus} className="block py-1 text-stone-600">&bull; Leads atau Penjualan</a>
          </div>
        </div>

        <a href="#compare-scripts" onClick={closeMenus} className="block py-3 px-3.5 rounded-2xl bg-white border-2 border-ink shadow-brutal-sm">Lihat Kualitas Script</a>
        <a href="#cara-kerja" onClick={closeMenus} className="block py-3 px-3.5 rounded-2xl bg-sunflower border-2 border-ink shadow-brutal-sm">Cara Kerja Karsa</a>
        <a href="#preview" onClick={closeMenus} className="block py-3 px-3.5 rounded-2xl bg-white border-2 border-ink shadow-brutal-sm">Contoh Output</a>
        <a href="#faq" onClick={closeMenus} className="block py-3 px-3.5 rounded-2xl bg-white border-2 border-ink shadow-brutal-sm">FAQ & Bantuan</a>
        <div className="pt-2">
          <Link href="/login" onClick={closeMenus} className="block w-full text-center py-3 border-2 border-ink bg-white font-bold rounded-xl text-xs mb-2 shadow-brutal-sm">Buka Member Workspace</Link>
          <a href="#order" onClick={closeMenus} className="block w-full text-center py-3.5 bg-terracotta text-white font-bold rounded-xl text-xs shadow-brutal">Isi Brief & Checkout (Rp299.000)</a>
        </div>
      </div>
    </header>
  );
}
