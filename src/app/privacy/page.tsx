"use client";

import { useEffect, useRef, useState } from "react";
import { Lock, Search } from "lucide-react";
import { LegalHeader } from "@/components/legal/LegalHeader";
import { PRIVACY_CLAUSES } from "@/lib/legal-content";

const TOC_LINKS = PRIVACY_CLAUSES.map((c) => ({
  href: "#" + c.id,
  label: c.num.replace("BAB ", "Bab ") + " — " + c.label,
}));

export default function PrivacyPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState("bab-1");
  const clauseRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      let currentId = "bab-1";
      clauseRefs.current.forEach((sec) => {
        if (!sec) return;
        const top = sec.offsetTop - 120;
        if (window.pageYOffset >= top) {
          currentId = sec.id;
        }
      });
      setActiveSection(currentId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const filterClauses = (text: string) => {
    if (!searchQuery) return true;
    return text.toLowerCase().includes(searchQuery.toLowerCase());
  };

  return (
    <div className="min-h-screen bg-canvas text-ink font-sans antialiased selection:bg-wasabi selection:text-ink">
      <LegalHeader badge="Data Protection" />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 sm:space-y-10">
        <section className="space-y-3 max-w-3xl">
          <div className="inline-flex items-center gap-2 badge-tag bg-sunflower px-3.5 py-1.5 rounded-full text-xs font-mono font-bold text-ink">
            <Lock className="w-4 h-4 text-ink" />
            <span>Pelindungan Data Pribadi & Privasi Bisnis Klien</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-serif text-ink leading-tight">
            Kebijakan Privasi & Data Pribadi <br />
            <span className="italic text-terracotta">(Privacy Policy & PDP Compliance)</span>
          </h1>
          <p className="text-xs sm:text-sm text-inkMuted font-sans leading-relaxed font-medium">
            Terakhir diperbarui: 19 Agustus 2026. Disusun berdasarkan Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP) dan standar tata kelola data digital global.
          </p>
        </section>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-mono text-xs">
          <div className="bento-pop p-4 rounded-2xl space-y-1 bg-white">
            <span className="text-[10px] text-inkMuted uppercase font-bold block">1. Perlindungan Brief</span>
            <span className="text-sm sm:text-base font-bold text-ink block font-serif">100% Rahasia Dagang</span>
            <span className="text-[10px] text-inkMuted">Enkripsi data formulir</span>
          </div>
          <div className="bento-pop p-4 rounded-2xl space-y-1 bg-wasabi/30">
            <span className="text-[10px] text-wasabiDark uppercase font-bold block">2. Monetisasi Pihak Ketiga</span>
            <span className="text-sm sm:text-base font-bold text-ink block font-serif">Zero Data Selling</span>
            <span className="text-[10px] text-wasabiDark font-bold">Tidak pernah menjual data</span>
          </div>
          <div className="bento-pop p-4 rounded-2xl space-y-1 bg-white">
            <span className="text-[10px] text-inkMuted uppercase font-bold block">3. Keamanan Transaksi</span>
            <span className="text-sm sm:text-base font-bold text-ink block font-serif">Enkripsi 256-Bit SSL</span>
            <span className="text-[10px] text-inkMuted">PCI-DSS terakreditasi</span>
          </div>
          <div className="bento-pop p-4 rounded-2xl space-y-1 bg-sunflower/20">
            <span className="text-[10px] text-inkMuted uppercase font-bold block">4. Hak Kendali Klien</span>
            <span className="text-sm sm:text-base font-bold text-terracotta block font-serif">Hak Hapus Data</span>
            <span className="text-[10px] text-inkMuted">1-click data erasure</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <aside className="hidden lg:block lg:col-span-4 sticky top-24 space-y-4">
            <div className="bento-pop p-5 rounded-3xl space-y-3 font-mono text-xs bg-white">
              <div className="flex items-center justify-between pb-2 border-b-2 border-ink">
                <span className="font-bold text-ink uppercase tracking-wider text-[11px]">Daftar Bab Privasi</span>
                <span className="badge-tag px-2 py-0.5 rounded text-[10px] font-bold bg-canvas">10 Bab</span>
              </div>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Cari topik privasi / data..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-canvas border-2 border-ink rounded-xl px-3 py-2 pl-8 text-xs font-sans text-ink focus:outline-none focus:ring-2 focus:ring-terracotta min-h-[44px] caret-terracotta"
                />
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-inkMuted" />
              </div>
              <nav className="space-y-1 max-h-[60vh] overflow-y-auto pr-1 no-scrollbar">
                {TOC_LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`block py-2 pl-3 border-l-2 text-[11px] rounded-r-lg transition ${
                      activeSection === link.href.replace("#", "")
                        ? "border-terracotta text-ink font-bold bg-canvas"
                        : "border-transparent text-inkMuted hover:text-ink"
                    }`}
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          <div className="lg:col-span-8 space-y-6 font-sans text-xs sm:text-sm text-inkMuted leading-relaxed">
            {PRIVACY_CLAUSES.map((c, i) => (
              <section
                key={c.id}
                id={c.id}
                ref={(el) => { clauseRefs.current[i] = el; }}
                className={`legal-clause bento-pop p-6 sm:p-8 rounded-3xl space-y-3 bg-white ${
                  filterClauses(c.searchText) ? "" : "hidden"
                }`}
              >
                <div className="flex items-center gap-2 font-mono text-xs text-inkMuted pb-2 border-b-2 border-ink font-bold">
                  <span className="text-terracotta">{c.num}</span>
                  <span>&bull;</span>
                  <span className="uppercase">{c.label}</span>
                </div>
                <h2 className="font-serif font-bold text-lg sm:text-xl text-ink">{c.heading}</h2>
                {c.body}
              </section>
            ))}
          </div>
        </div>

        <div className="text-center pt-8 border-t-2 border-ink font-mono text-xs space-y-3">
          <div className="flex items-center justify-center gap-4 text-inkMuted font-bold">
            <a href="/terms" className="hover:text-terracotta transition underline">Syarat & Ketentuan (Terms)</a>
            <span>&bull;</span>
            <a href="/privacy" className="text-terracotta">Kebijakan Privasi (Privacy)</a>
            <span>&bull;</span>
            <a href="/dashboard" className="hover:text-terracotta transition underline">Workspace Member</a>
          </div>
          <p className="text-inkMuted text-[11px] font-bold">&copy; 2026 Karsa Studio. Seluruh hak cipta dilindungi undang-undang.</p>
        </div>
      </main>
    </div>
  );
}