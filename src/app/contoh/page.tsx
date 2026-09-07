"use client";
import { useEffect, useRef } from "react";
import { Icon } from "@/components/Icon";

export default function Page() {

  const toggleMobileMenuFn = () => {
    const menu = document.getElementById("mobileMenu");
    const iconOpen = document.getElementById("menuIconOpen");
    const iconClose = document.getElementById("menuIconClose");
    if (!menu) return;
    const isHidden = menu.classList.toggle("hidden");
    if (iconOpen) iconOpen.classList.toggle("hidden", !isHidden);
    if (iconClose) iconClose.classList.toggle("hidden", isHidden);
  };

  useEffect(() => {
    const openModalBtns = document.querySelectorAll('[data-action="mobile-open-modal"], [data-action="mobile-menu"]');
    openModalBtns.forEach((b) => b.addEventListener("click", toggleMobileMenuFn));
    return () => openModalBtns.forEach((b) => b.removeEventListener("click", toggleMobileMenuFn));
  }, []);

  useEffect(() => {
    const modal = document.getElementById("checkoutModal");
    if (!modal) return;
    const openBtn = document.querySelectorAll('[data-action="open-modal"], [data-action="mobile-open-modal"]');
    const closeBtn = document.querySelectorAll('[data-action="close-modal"]');
    const openModal = (btn) => {
      const pkg = btn.getAttribute("data-pkg");
      const priceEl = document.getElementById("modalPackagePrice");
      if (priceEl && pkg) priceEl.textContent = pkg;
      modal.classList.add("open");
      document.body.style.overflow = "hidden";
    };
    const closeModal = () => {
      modal.classList.remove("open");
      document.body.style.overflow = "";
    };
    openBtn.forEach((b) => b.addEventListener("click", () => openModal(b)));
    closeBtn.forEach((b) => b.addEventListener("click", closeModal));
    modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
    const onKey = (e) => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); };
    document.addEventListener("keydown", onKey);
    return () => {
      openBtn.forEach((b) => b.removeEventListener("click", () => openModal(b)));
      closeBtn.forEach((b) => b.removeEventListener("click", closeModal));
      modal.removeEventListener("click", () => {});
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    const form = document.getElementById("orderForm");
    if (!form) return;
    const onSubmit = (e) => {
      e.preventDefault();
      const formStatus = document.getElementById("formStatus");
      const orderId = "INV-" + Math.floor(100000 + Math.random() * 900000);
      if (formStatus) {
        formStatus.textContent = "Menyimpan brief & mengarahkan ke checkout...";
        formStatus.classList.add("text-ink", "font-bold");
      }
      setTimeout(() => { window.location.href = "/checkout?id=" + orderId; }, 500);
    };
    form.addEventListener("submit", onSubmit);
    return () => form.removeEventListener("submit", onSubmit);
  }, []);

  useEffect(() => {
    const cards = document.querySelectorAll('[data-action="accordion"]');
    const handlers: Array<[Element, () => void]> = [];
    cards.forEach((card) => {
      const h = () => {
        const p = card.querySelector("p");
        const icon = card.querySelector("svg");
        const open = card.getAttribute("aria-expanded") === "true";
        card.setAttribute("aria-expanded", String(!open));
        if (!p) return;
        const pp = p as HTMLElement;
        if (open) {
          pp.style.maxHeight = "0px";
          pp.style.opacity = "0";
          setTimeout(function () { pp.classList.add("hidden"); }, 450);
        } else {
          pp.style.maxHeight = "0px";
          pp.style.opacity = "0";
          pp.classList.remove("hidden");
          requestAnimationFrame(function () {
            pp.style.maxHeight = pp.scrollHeight + "px";
            pp.style.opacity = "1";
          });
        }
        if (icon) icon.style.transform = open ? "rotate(0deg)" : "rotate(45deg)";
      };
      card.addEventListener("click", h);
      handlers.push([card, h]);
    });
    return () => handlers.forEach(([c, h]) => c.removeEventListener("click", h));
  }, []);

  useEffect(() => {
    const bar = document.getElementById("scrollProgress");
    if (!bar) return;
    const onScroll = () => {
      const h = document.documentElement;
      const max = h.scrollHeight - h.clientHeight;
      bar.style.transform = "scaleX(" + (max > 0 ? window.scrollY / max : 0) + ")";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const PREVIEWS: Record<string, { badge: string; niche: string; hook: string; vo: string; cta: string }> = {
      fb: {
        badge: "Contoh: Day 04 &mdash; Edukasi Solusi",
        niche: "Niche: Artisan Roastery (F&amp;B)",
        hook: "Talent menuang kopi instan ke gelas tapi langsung menggumpal di dasar. Ekspresi heran.",
        vo: "&ldquo;Kenapa kopi sachet kamu sering bikin perut kembung padahal baru 3 teguk? Ini alasan ilmiahnya&hellip;&rdquo;",
        cta: "Tunjukkan biji cold brew asli, jelaskan kadar asam 70% lebih rendah, tutup dengan ajakan cek link di bio.",
      },
      skincare: {
        badge: "Contoh: Day 07 &mdash; Myth-Busting",
        niche: "Niche: Skincare Lokal (Beauty)",
        hook: "Talent memegang dua botol serum, satu mahal satu terjangkau, komposisi aktifnya hampir sama. Ekspresi skeptis.",
        vo: "&ldquo;Mahal belum tentu bagus. Ini 3 bahan aktif yang bikin serum Rp30 ribuan tetap efektif&hellip;&rdquo;",
        cta: "Tampilkan tekstur &amp; % kandungan aktif, bandingkan harga per ml, tutup dengan ajakan &ldquo;cek jenis kulitmu di link bio&rdquo;.",
      },
      fashion: {
        badge: "Contoh: Day 12 &mdash; Styling Tips",
        niche: "Niche: Fashion Lokal (Apparel)",
        hook: "Talent pakai dua kaos polos berbeda kualitas, look sama tapi kesan beda. Zoom ke detail jahitan.",
        vo: "&ldquo;Baju murah keliatan murah kalau detailnya salah. Ini 3 tanda kaos berkualitas yang wajib dicek&hellip;&rdquo;",
        cta: "Tunjukkan bahan, jahitan, dan bentuk setelah dicuci, tutup dengan ajakan klik link di bio buat lihat katalog.",
      },
      jasa: {
        badge: "Contoh: Day 15 &mdash; Edukasi Value",
        niche: "Niche: Konsultan &amp; Les (Edukasi)",
        hook: "Talent menunjuk kalender yang penuh deadline lalu ekspresi frustasi. Visual workload yang menumpuk.",
        vo: "&ldquo;Jasa konsultasi susah dipercaya kalau cuma modal testimoni. Ini bukti kerja yang bisa kamu audit&hellip;&rdquo;",
        cta: "Tampilkan proses kerja + studi kasus singkat, tutup dengan ajakan DM &ldquo;AUDIT&rdquo; untuk konsultasi gratis.",
      },
    };

    const setTab = (key: string) => {
      document.querySelectorAll('#sectorTabs [role="tab"]').forEach((btn) => {
        const active = btn.getAttribute("data-sektor") === key;
        btn.classList.toggle("bg-brutalGreen", active);
        btn.classList.toggle("text-ink", active);
        btn.classList.toggle("shadow-brutal-sm", active);
        btn.classList.toggle("bg-white", !active);
      });
    };

    const switchPreview = (key: string) => {
      const p = PREVIEWS[key] || PREVIEWS.fb;
      const set = (id: string, html: string) => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = html;
      };
      const setText = (id: string, txt: string) => {
        const el = document.getElementById(id);
        if (el) el.textContent = txt;
      };
      set("pvBadge", p.badge);
      setText("pvNiche", p.niche);
      setText("pvHook", p.hook);
      set("pvVo", p.vo + '<span class="blink-caret"></span>');
      set("pvCta", p.cta);
      setTab(key);
    };

    const handlers: Array<[Element, () => void]> = [];
    document.querySelectorAll('[data-action="switch-preview"]').forEach((el) => {
      const h = () => switchPreview(el.getAttribute("data-sektor") || "fb");
      el.addEventListener("click", h);
      handlers.push([el, h]);
    });

    const params = new URLSearchParams(window.location.search);
    const sektor = params.get("sektor");
    if (sektor && PREVIEWS[sektor]) {
      switchPreview(sektor);
      const el = document.getElementById("preview");
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    return () => handlers.forEach(([el, h]) => el.removeEventListener("click", h));
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">

  <div id="scrollProgress" className="fixed top-0 left-0 right-0 h-1 bg-ink z-[70] pointer-events-none"></div>
  <a href="/#main-content" className="sr-only text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-3 focus:bg-brutalYellow focus:text-ink focus:font-mono focus:text-xs focus:font-bold focus:rounded-xl focus:border-2 focus:border-ink">Lewati ke konten utama</a>

  {/* TOP PROMO TICKER */}
  <div className="bg-brutalYellow text-ink text-[11px] sm:text-xs font-mono py-2.5 px-3 text-center tracking-tight border-b-2 border-ink flex items-center justify-center gap-2 font-bold relative z-50">
    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-ink text-brutalYellow text-[10px] uppercase font-mono font-black border border-ink shadow-brutal-sm shrink-0">
      <Icon name="zap" className="w-3.5 h-3.5" /> SLA 24 Jam
    </span>
    <span className="truncate sm:overflow-visible text-ink font-bold">Brief lengkap diproses dalam maksimal 1x24 jam kerja.</span>
  </div>

  {/* INTERACTIVE NEO-BRUTALIST NAVBAR */}
  <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur-md border-b-2 border-ink">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between whitespace-nowrap gap-4 relative">
      
      {/* Brand Logo with Shake & Spin Hover */}
      <a href="/#main-content" className="flex items-center space-x-2 shrink-0 group">
        <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-ink group-hover:-translate-y-0.5 group-hover:rotate-1 transition-transform">Karsa</span>
        <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-brutalYellow text-ink rounded-lg font-bold group-hover:rotate-6 transition-transform">Studio</span>
      </a>

      {/* Desktop Nav with Interactive Capsule Hover */}
      <nav className="hidden xl:flex absolute left-1/2 -translate-x-1/2 items-center gap-0.5 text-xs font-mono font-bold text-ink bg-sand/60 p-1.5 rounded-2xl border-2 border-ink shadow-brutal-sm">

        {/* Mega Dropdown: Isi Paket */}
        <div className="relative group">
          <button type="button" className="nav-pill px-2.5 py-1.5 rounded-xl flex items-center gap-1 hover:text-ink transition font-bold">
            <span>Isi Paket</span>
            <Icon name="chevron-down" className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
          </button>

          <div className="dropdown-menu absolute top-full left-0 mt-2 w-[820px] max-w-[calc(100vw-2rem)] bg-white border-2 border-ink rounded-2xl p-4 shadow-brutal-lg z-50 whitespace-normal">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

              <div>
                <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink">
                  <span className="w-6 h-6 rounded bg-ink text-brutalYellow flex items-center justify-center font-mono font-bold text-[10px]"><Icon name="package-check" className="w-3.5 h-3.5" /></span>
                  <span className="font-bold text-[10px] uppercase tracking-wider">Output Utama</span>
                </div>
                <div className="space-y-1 mt-2">
                  <a href="/#modul-video" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink">
                    <span className="w-6 h-6 rounded bg-brutalYellow text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">01</span>
                    <div><span className="block font-bold text-xs">30 Video Scripts</span><span className="block text-[9px] text-stone-500 font-mono">Hook, visual, audio, CTA.</span></div>
                  </a>
                  <a href="/#modul-caption" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalCyan/40 transition border border-transparent hover:border-ink">
                    <span className="w-6 h-6 rounded bg-brutalCyan text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">02</span>
                    <div><span className="block font-bold text-xs">30 Caption & Tagar</span><span className="block text-[9px] text-stone-500 font-mono">AIDA + 3 tier tagar.</span></div>
                  </a>
                  <a href="/#modul-seo" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalGreen/40 transition border border-transparent hover:border-ink">
                    <span className="w-6 h-6 rounded bg-brutalGreen text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">03</span>
                    <div><span className="block font-bold text-xs">4 Artikel Blog SEO</span><span className="block text-[9px] text-stone-500 font-mono">Struktur H1-H3 + meta.</span></div>
                  </a>
                  <a href="/#modul-audit" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalPink/40 transition border border-transparent hover:border-ink">
                    <span className="w-6 h-6 rounded bg-brutalPink text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">04</span>
                    <div><span className="block font-bold text-xs">Audit Gap Kompetitor</span><span className="block text-[9px] text-stone-500 font-mono">Teardown 1 akun acuan.</span></div>
                  </a>
                  <a href="/#modul-notion" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink">
                    <span className="w-6 h-6 rounded bg-white text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">05</span>
                    <div><span className="block font-bold text-xs">Notion Content OS</span><span className="block text-[9px] text-stone-500 font-mono">Calendar + Kanban produksi.</span></div>
                  </a>
                  <a href="/#modul-shotlist" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalCyan/40 transition border border-transparent hover:border-ink">
                    <span className="w-6 h-6 rounded bg-brutalCyan/60 text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">06</span>
                    <div><span className="block font-bold text-xs">Panduan B-Roll HP</span><span className="block text-[9px] text-stone-500 font-mono">Shot-list buat rekam sendiri.</span></div>
                  </a>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink">
                  <span className="w-6 h-6 rounded bg-ink text-brutalCyan flex items-center justify-center font-mono font-bold text-[10px]"><Icon name="settings" className="w-3.5 h-3.5" /></span>
                  <span className="font-bold text-[10px] uppercase tracking-wider">Strategi & Sistem</span>
                </div>
                <div className="space-y-1 mt-2">
                  <a href="/sistem#isi-harian" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Peta Konten 30 Hari</span><span className="block text-[9px] text-stone-500 font-mono">Foundation sampai conversion.</span></a>
                  <a href="/sistem#cakupan" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Standar Setiap Output</span><span className="block text-[9px] text-stone-500 font-mono">Checklist sebelum dipakai tim.</span></a>
                  <a href="/#cara-kerja" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Cara Kerja Karsa</span><span className="block text-[9px] text-stone-500 font-mono">Brief, riset, tulis, kirim.</span></a>
                  <a href="/sistem#cakupan" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Scope Layanan</span><span className="block text-[9px] text-stone-500 font-mono">Termasuk & tidak termasuk.</span></a>
                  <a href="/sistem#anatomi-script" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Anatomi Script 25 Detik</span><span className="block text-[9px] text-stone-500 font-mono">Hook, value, CTA per detik.</span></a>
                  <a href="/sistem#pillar-konten" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Pilar Konten 30 Hari</span><span className="block text-[9px] text-stone-500 font-mono">4 pilar & rasio mingguan.</span></a>
                  <a href="/sistem#alur-produksi" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Template Produksi</span><span className="block text-[9px] text-stone-500 font-mono">Senin-Jumat siap eksekusi.</span></a>
                  <a href="/#garansi" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Garansi & SLA</span><span className="block text-[9px] text-stone-500 font-mono">24 jam + kalibrasi 48 jam.</span></a>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink">
                  <span className="w-6 h-6 rounded bg-ink text-brutalPink flex items-center justify-center font-mono font-bold text-[10px]"><Icon name="bar-chart-3" className="w-3.5 h-3.5" /></span>
                  <span className="font-bold text-[10px] uppercase tracking-wider">Proof & Keputusan</span>
                </div>
                <div className="space-y-1 mt-2">
                  <a href="/contoh#compare-scripts" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Bandingkan Kualitas</span><span className="block text-[9px] text-stone-500 font-mono">Script generik vs Karsa.</span></a>
                  <a href="/#studi-kasus" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Case Study Nyata</span><span className="block text-[9px] text-stone-500 font-mono">Metrik dari implementasi.</span></a>
                  <a href="/contoh#preview" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Contoh Output</span><span className="block text-[9px] text-stone-500 font-mono">Script, caption, dan SEO.</span></a>
                  <a href="/#calculator" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Kalkulator Hemat</span><span className="block text-[9px] text-stone-500 font-mono">Bandingkan biaya per batch.</span></a>
                  <a href="/#komparasi" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Karsa vs Agensi vs AI</span><span className="block text-[9px] text-stone-500 font-mono">Tabel perbandingan jujur.</span></a>
                  <a href="/#harga" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Harga & Paket</span><span className="block text-[9px] text-stone-500 font-mono">1, 3, atau 6 batch.</span></a>
                  <a href="/#testimoni" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Testimoni Customer</span><span className="block text-[9px] text-stone-500 font-mono">Kata mereka yang sudah pakai.</span></a>
                  <a href="/sistem#bonus" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Lihat Semua Bonus &rarr;</span><span className="block text-[9px] text-stone-500 font-mono">5 bonus sudah termasuk.</span></a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Dropdown: Untuk Bisnis */}
        <div className="relative group">
          <button type="button" className="nav-pill px-2.5 py-1.5 rounded-xl flex items-center gap-1 hover:text-ink transition font-bold">
            <span>Untuk Bisnis</span>
            <Icon name="chevron-down" className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
          </button>

          <div className="dropdown-menu absolute top-full left-0 mt-2 w-[540px] max-w-[calc(100vw-2rem)] bg-white border-2 border-ink rounded-2xl p-4 shadow-brutal-lg z-50 whitespace-normal">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink">
                  <span className="w-6 h-6 rounded bg-ink text-brutalGreen flex items-center justify-center font-mono font-bold text-[10px]"><Icon name="store" className="w-3.5 h-3.5" /></span>
                  <span className="font-bold text-[10px] uppercase tracking-wider">Sektor Bisnis</span>
                </div>
                <div className="space-y-1 mt-2">
                  <a href="/contoh#preview" className="block p-2 rounded-xl hover:bg-brutalGreen/30 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">F&B & Cafe</span><span className="block text-[9px] text-stone-500 font-mono">Menu, review, edukasi.</span></a>
                  <a href="/contoh#preview" className="block p-2 rounded-xl hover:bg-brutalGreen/30 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Skincare & Beauty</span><span className="block text-[9px] text-stone-500 font-mono">Ingredient, myth-busting.</span></a>
                  <a href="/contoh#preview" className="block p-2 rounded-xl hover:bg-brutalGreen/30 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Fashion & Apparel</span><span className="block text-[9px] text-stone-500 font-mono">Styling, fit, detail bahan.</span></a>
                  <a href="/contoh#preview" className="block p-2 rounded-xl hover:bg-brutalGreen/30 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Jasa & Edukasi</span><span className="block text-[9px] text-stone-500 font-mono">Konsultan, klinik, les.</span></a>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink">
                  <span className="w-6 h-6 rounded bg-ink text-brutalYellow flex items-center justify-center font-mono font-bold text-[10px]"><Icon name="target" className="w-3.5 h-3.5" /></span>
                  <span className="font-bold text-[10px] uppercase tracking-wider">Tujuan Konten</span>
                </div>
                <div className="space-y-1 mt-2">
                  <a href="/sistem#kenapa-video" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Edukasi & Awareness</span><span className="block text-[9px] text-stone-500 font-mono">Buat audiens lebih paham.</span></a>
                  <a href="/sistem#kenapa-video" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Leads & DM</span><span className="block text-[9px] text-stone-500 font-mono">Arahkan percakapan baru.</span></a>
                  <a href="/#harga" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Penjualan Produk</span><span className="block text-[9px] text-stone-500 font-mono">Perjelas value dan CTA.</span></a>
                  <a href="/sistem#cocok-untuk" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Cek Kecocokan</span><span className="block text-[9px] text-stone-500 font-mono">Lihat apakah Karsa untukmu.</span></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dropdown: Layanan */}
        <div className="relative group">
          <button type="button" className="nav-pill px-2.5 py-1.5 rounded-xl flex items-center gap-1 hover:text-ink transition font-bold">
            <span>Layanan</span>
            <Icon name="chevron-down" className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
          </button>

          <div className="dropdown-menu absolute top-full left-0 mt-2 w-72 max-w-[calc(100vw-2rem)] bg-white border-2 border-ink rounded-2xl p-3 shadow-brutal-lg z-50 whitespace-normal">
            <div className="space-y-1">
              <a href="/jasa-konten-video-umkm" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink">
                <span className="w-6 h-6 rounded bg-brutalYellow text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0"><Icon name="clapperboard" className="w-3.5 h-3.5" /></span>
                <div><span className="block font-bold text-xs">Jasa Konten Video UMKM</span><span className="block text-[9px] text-stone-500 font-mono">Kalender 30 hari lengkap.</span></div>
              </a>
              <a href="/jasa-script-video-tiktok" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink">
                <span className="w-6 h-6 rounded bg-brutalCyan text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0"><Icon name="file-text" className="w-3.5 h-3.5" /></span>
                <div><span className="block font-bold text-xs">Jasa Script Video TikTok</span><span className="block text-[9px] text-stone-500 font-mono">30 naskah kata-per-kata.</span></div>
              </a>
              <a href="/jasa-content-creator-umkm" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink">
                <span className="w-6 h-6 rounded bg-brutalGreen text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0"><Icon name="users" className="w-3.5 h-3.5" /></span>
                <div><span className="block font-bold text-xs">Jasa Content Creator UMKM</span><span className="block text-[9px] text-stone-500 font-mono">Tanpa gaji bulanan.</span></div>
              </a>
              <a href="/jasa-artikel-seo" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink">
                <span className="w-6 h-6 rounded bg-brutalPink text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0"><Icon name="search" className="w-3.5 h-3.5" /></span>
                <div><span className="block font-bold text-xs">Jasa Artikel SEO</span><span className="block text-[9px] text-stone-500 font-mono">4 artikel 1.000 kata.</span></div>
              </a>
              <a href="/paket-konten-instagram" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink">
                <span className="w-6 h-6 rounded bg-brutalYellow/60 text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0"><Icon name="instagram" className="w-3.5 h-3.5" /></span>
                <div><span className="block font-bold text-xs">Paket Konten Instagram</span><span className="block text-[9px] text-stone-500 font-mono">Reels, caption, kalender.</span></div>
              </a>
            </div>
          </div>
        </div>

        <a href="/#harga" className="nav-pill px-2.5 py-1.5 rounded-xl transition">Harga</a>
        <a href="/#testimoni" className="nav-pill px-2.5 py-1.5 rounded-xl transition">Testimoni</a>
        <a href="/#cara-kerja" className="nav-pill px-2.5 py-1.5 rounded-xl transition">Cara Kerja</a>
        <a href="/faq" className="nav-pill px-2.5 py-1.5 rounded-xl transition">FAQ</a>
        <a href="/blog" className="nav-pill px-2.5 py-1.5 rounded-xl transition">Blog</a>
        <a href="/tentang-kami" className="nav-pill px-2.5 py-1.5 rounded-xl transition">Tentang</a>
      </nav>

      {/* Right CTAs & Live Slot Indicator */}
      <div className="flex items-center space-x-2.5 sm:space-x-3 shrink-0">
        
        {/* Live Batch Slot Pulse Indicator */}
        <div className="hidden lg:flex xl:hidden items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm font-mono text-[11px] font-bold">
          <span className="w-2 h-2 rounded-full bg-brutalGreen border border-ink animate-ping"></span>
          <span>Slot Batch: <span className="text-ink font-black">Tersedia</span></span>
        </div>

        <a href="/login" className="hidden xl:inline-flex text-xs font-mono font-bold text-ink hover:underline px-2.5 py-2 transition">
          Workspace
        </a>
        
        <button type="button" data-action="open-modal" className="btn-press bg-brutalYellow text-ink hover:bg-ink hover:text-brutalYellow px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-xl font-mono text-xs font-bold transition flex items-center gap-1.5">
          <span>Isi Brief</span>
          <Icon name="arrow-up-right" className="w-4 h-4" />
        </button>

        <button id="mobileMenuToggle" type="button" data-action="mobile-menu" aria-label="Buka Menu" className="xl:hidden p-2 rounded-xl text-ink border-2 border-ink bg-white shadow-brutal-sm">
          <Icon name="menu" className="w-5 h-5" id="menuIconOpen" />
          <Icon name="x" className="w-5 h-5 hidden" id="menuIconClose" />
        </button>
      </div>
    </div>

    {/* Mobile Drawer */}
    <div id="mobileMenu" className="hidden xl:hidden bg-canvas brutal-grid border-b-2 border-ink px-4 pt-3 pb-6 space-y-2.5 font-bold text-xs font-mono text-ink shadow-brutal-lg max-h-[85vh] overflow-y-auto">
      <a href="/#deliverables" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Isi Paket (6 Output)</a>
      <a href="/sistem#anatomi-script" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Anatomi Script</a>
      <a href="/sistem#pillar-konten" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-brutalYellow border-2 border-ink shadow-brutal-sm">Pilar Konten 30 Hari</a>
      <a href="/#cara-kerja" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Cara Kerja</a>
      <a href="/#testimoni" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Testimoni Customer</a>
      <a href="/#harga" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Harga & Paket</a>
      <a href="/#garansi" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Garansi & SLA</a>
      <a href="/#calculator" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Kalkulator Penghematan</a>
      <a href="/faq" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">FAQ & Bantuan</a>
      <a href="/blog" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Blog Karsa</a>
      <a href="/tentang-kami" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Tentang Kami</a>
      <div className="pt-2">
        <button type="button" data-action="mobile-open-modal" className="block w-full text-center py-3.5 bg-ink text-brutalYellow font-mono font-bold rounded-xl text-xs border-2 border-ink shadow-brutal">
          Isi Brief & Checkout (Rp299.000)
        </button>
      </div>
    </div>
  </header>

  <main id="main-content">

  {/* PAGE HERO */}
  <section className="pt-10 pb-16 sm:pt-20 sm:pb-24 border-b-2 border-ink bg-canvas brutal-grid relative overflow-hidden">
    <div className="hidden lg:flex absolute top-10 right-16 w-24 h-24 bg-brutalCyan/50 text-ink items-center justify-center font-display font-extrabold text-xs uppercase text-center p-2 rotate-12 z-0 brutal-star border-2 border-ink shadow-brutal animate-pulse pointer-events-none">
      BUKTI<br />NYATA
    </div>
    <div className="hidden xl:flex absolute top-28 left-6 badge-brutal bg-white px-3.5 py-2 rounded-xl items-center gap-2.5 -rotate-6 z-20">
      <div className="w-8 h-8 rounded-lg bg-ink text-brutalPink flex items-center justify-center font-bold text-xs border border-ink"><Icon name="eye" className="w-4 h-4" /></div>
      <span className="font-mono font-bold text-xs text-ink">Transparansi Mutu</span>
    </div>
    <div className="absolute top-1/3 left-2 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">&#10022;</div>
    <div className="absolute bottom-1/4 right-8 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">&#10013;</div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-3xl space-y-4 sm:space-y-5">
        <div className="inline-flex items-center gap-2.5 badge-brutal bg-brutalYellow px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold">
          <Icon name="sparkles" className="w-4 h-4 text-ink" />
          <span>CONTOH OUTPUT & PERBANDINGAN</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-display font-extrabold tracking-tight text-ink leading-[1.12]">
          Lihat Contoh Output <br className="hidden sm:inline" />
          <span className="bg-brutalYellow text-ink px-2.5 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">Sebelum Kamu Pesan</span>
        </h1>
        <p className="text-xs sm:text-base text-stone-800 leading-relaxed font-sans font-medium">
          Bandingkan script generik vs naskah Karsa, lalu lihat contoh deliverable nyata per detik. Semua transparan &mdash; biar kamu yakin sebelum bayar.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a href="/#harga" className="btn-press bg-ink text-brutalYellow hover:bg-brutalYellow hover:text-ink px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold transition border-2 border-ink shadow-brutal-sm">Lihat Harga &amp; Paket</a>
          <a href="/" className="btn-press bg-white hover:bg-sand text-ink px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold transition border-2 border-ink">&larr; Kembali ke Beranda</a>
        </div>
      </div>
    </div>
  </section>
<section id="compare-scripts" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-grid relative">
    {/* Decorative Theme Elements */}
    <div className="absolute top-5 left-8 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-8 right-6 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="hidden md:block absolute top-1/4 right-4 w-5 h-5 bg-brutalCyan rotate-12 border border-ink shadow-brutal-sm"></div>
    <div className="hidden xl:flex absolute top-12 left-8 badge-brutal bg-white px-3 py-1 rounded-lg items-center gap-2 -rotate-3 z-20">
      <Icon name="message-circle" className="w-4 h-4 text-ink" />
      <span className="font-mono text-[10px] font-bold">AIDA Copywriting</span>
    </div>
    <div className="hidden lg:flex absolute bottom-8 right-12 badge-brutal bg-brutalYellow px-3 py-1 rounded-lg items-center gap-2 rotate-6 z-20">
      <Icon name="repeat" className="w-4 h-4 text-ink" />
      <span className="font-mono text-[10px] font-bold">TikTok + Reels + Shorts</span>
    </div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
        <div>
          <span className="badge-brutal px-3.5 py-1 rounded-lg text-xs font-mono font-bold bg-brutalYellow text-ink uppercase">Head to Head</span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">
            Script Biasa vs <span className="bg-brutalCyan text-ink px-2.5 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">Formula Karsa</span>
          </h2>
        </div>
        <div className="font-mono text-xs sm:text-sm text-stone-700 max-w-sm font-medium">
          Setiap detik punya alasan: hook, visual, ritme, sampai CTA-nya.
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

        {/* Left 5 Cols: Generic Script */}
        <div className="lg:col-span-5 bento-card p-5 sm:p-7 rounded-3xl bg-sand/40 relative overflow-hidden flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-3 border-b-2 border-ink mb-4">
              <span className="badge-brutal bg-white text-ink text-xs font-mono font-bold px-2.5 py-1 rounded flex items-center gap-1.5">
                <Icon name="x-circle" className="w-4 h-4 text-ink" /> Prompt AI / Script Biasa
              </span>
              <span className="text-ink font-mono font-bold text-xs bg-white px-2 py-0.5 rounded border border-ink">Retensi 12%</span>
            </div>
            <div className="space-y-3 text-xs sm:text-sm text-stone-800 font-sans">
              <div className="p-3.5 bg-white border-2 border-ink rounded-xl shadow-brutal-sm">
                <strong className="font-mono text-ink text-xs block mb-1">00:00 - Opening Basi:</strong>
                "Halo semuanya! Hari ini aku mau kenalin produk baru kita nih, dibuat dengan bahan alami terbaik..."
              </div>
              <div className="p-3.5 bg-white border-2 border-ink rounded-xl shadow-brutal-sm">
                <strong className="font-mono text-ink text-xs block mb-1">Tanpa Cue Visual & Audio:</strong>
                Talent berdiri kaku ngomong ke kamera, gak ada pergantian angle atau bukti visual yang konkret.
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t-2 border-ink font-mono text-[11px] text-stone-700 font-bold">
            Evaluasi: Penonton swipe away sebelum produk sempat dijelaskan.
          </div>
        </div>

        {/* Right 7 Cols: Karsa Formula */}
        <div className="lg:col-span-7 bento-card p-5 sm:p-7 rounded-3xl bg-brutalYellow/30 relative overflow-hidden shadow-brutal-lg flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center pb-3 border-b-2 border-ink mb-4">
              <span className="badge-brutal bg-brutalYellow text-ink text-xs font-mono font-bold px-3 py-1 rounded flex items-center gap-1.5">
                <Icon name="check-circle" className="w-4 h-4 text-ink" /> Formula Karsa Studio
              </span>
              <span className="text-ink font-mono font-bold text-xs bg-brutalGreen px-2.5 py-0.5 rounded border border-ink">High Retention 9:16</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs sm:text-sm text-stone-900 font-sans">
              <div className="p-4 bg-white border-2 border-ink rounded-xl shadow-brutal-sm">
                <strong className="font-mono text-ink text-xs block mb-1.5 bg-brutalYellow/60 px-2 py-0.5 rounded w-fit border border-ink">[00:00-00:03] HOOK</strong>
                "Berhenti minum kopi sachet kalau jam 2 siang lambungmu selalu kembung. Ini cara simpelnya..."
              </div>
              <div className="p-4 bg-white border-2 border-ink rounded-xl shadow-brutal-sm">
                <strong className="font-mono text-ink text-xs block mb-1.5 bg-brutalCyan/60 px-2 py-0.5 rounded w-fit border border-ink">[00:04-00:18] PROOF</strong>
                Tunjukkan es batu retak dalam cold brew (audio ASMR), jelaskan penurunan asam 70% secara visual.
              </div>
            </div>
          </div>
          <div className="mt-4 pt-3 border-t-2 border-ink font-mono text-xs text-ink font-bold flex flex-wrap justify-between items-center gap-2">
            <span>Hasil: Retention naik, DM leads terisi otomatis.</span>
            <span className="badge-brutal bg-brutalYellow px-2.5 py-0.5 rounded text-xs font-bold">Pola 25 Detik</span>
          </div>
        </div>

      </div>

    </div>
  </section>
<section id="preview" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-grid relative">
    {/* Decorative Theme Elements */}

    <div className="absolute top-6 right-8 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-10 left-6 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="hidden md:block absolute bottom-1/4 right-4 w-6 h-6 rounded-full border-2 border-ink bg-brutalCyan rotate-45 pointer-events-none shadow-brutal-sm"></div>
    <div className="hidden xl:flex absolute top-10 left-8 badge-brutal bg-brutalYellow px-3 py-1.5 rounded-lg items-center gap-2 -rotate-3 z-20"><Icon name="eye" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">Contoh Nyata</span></div>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <span className="badge-brutal px-3 py-1 rounded-lg text-xs font-mono font-bold bg-ink text-brutalYellow uppercase">Transparansi Mutu</span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">
            Lihat Contoh Output <span className="bg-brutalYellow text-ink px-2.5 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">Sebelum Pesan</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 font-mono max-w-sm leading-relaxed">Pilih sektor bisnismu, lihat contoh naskah yang akan kamu dapatkan. Topik &amp; angle tetap disesuaikan dengan brief kamu.</p>
      </div>

      {/* Sector Switcher */}
      <div className="flex flex-wrap items-center gap-2 mb-5 font-mono text-xs" id="sectorTabs" role="tablist" aria-label="Pilih sektor bisnis">
        <span className="text-[10px] uppercase tracking-wider font-bold text-stone-500 mr-1 shrink-0">Pilih Sektor:</span>
        <button type="button" role="tab" data-sektor="fb" data-action="switch-preview" data-sektor="fb" className="btn-press px-3 py-2 rounded-xl font-bold transition border-2 border-ink bg-brutalGreen text-ink shadow-brutal-sm">F&amp;B &amp; Cafe</button>
        <button type="button" role="tab" data-sektor="skincare" data-action="switch-preview" data-sektor="skincare" className="btn-press px-3 py-2 rounded-xl font-bold transition border-2 border-ink bg-white text-ink">Skincare &amp; Beauty</button>
        <button type="button" role="tab" data-sektor="fashion" data-action="switch-preview" data-sektor="fashion" className="btn-press px-3 py-2 rounded-xl font-bold transition border-2 border-ink bg-white text-ink">Fashion &amp; Apparel</button>
        <button type="button" role="tab" data-sektor="jasa" data-action="switch-preview" data-sektor="jasa" className="btn-press px-3 py-2 rounded-xl font-bold transition border-2 border-ink bg-white text-ink">Jasa &amp; Edukasi</button>
      </div>

      <div className="bento-card p-5 sm:p-8 rounded-3xl bg-white shine">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-ink mb-5">
          <span id="pvBadge" className="badge-brutal text-[10px] font-mono font-bold bg-brutalYellow px-2.5 py-1 rounded">Contoh: Day 04 — Edukasi Solusi</span>
          <span id="pvNiche" className="font-mono text-[10px] sm:text-[11px] font-bold text-stone-500 uppercase">Niche: Artisan Roastery (F&B)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs sm:text-sm text-stone-800 font-sans">
          <div className="p-4 bg-canvas border-2 border-ink rounded-xl">
            <span className="font-mono text-[10px] font-bold text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">[VISUAL HOOK 00:00-00:03]</span>
            <p id="pvHook" className="mt-2 leading-relaxed">Talent menuang kopi instan ke gelas tapi langsung menggumpal di dasar. Ekspresi heran.</p>
          </div>
          <div className="p-4 bg-canvas border-2 border-ink rounded-xl">
            <span className="font-mono text-[10px] font-bold text-ink bg-brutalCyan/60 px-2 py-0.5 rounded border border-ink">[AUDIO / VOICEOVER]</span>
            <p id="pvVo" className="mt-2 leading-relaxed">"Kenapa kopi sachet kamu sering bikin perut kembung padahal baru 3 teguk? Ini alasan ilmiahnya..."<span className="blink-caret"></span></p>
          </div>
          <div className="p-4 bg-canvas border-2 border-ink rounded-xl">
            <span className="font-mono text-[10px] font-bold text-ink bg-brutalGreen/50 px-2 py-0.5 rounded border border-ink">[VALUE & CTA 00:04-00:25]</span>
            <p id="pvCta" className="mt-2 leading-relaxed">Tunjukkan biji cold brew asli, jelaskan kadar asam 70% lebih rendah, tutup dengan ajakan cek link di bio.</p>
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-mono text-[10px] sm:text-[11px] text-stone-500 font-bold flex items-center gap-2"><Icon name="file-check" className="w-4 h-4 text-ink" /> Output ini lengkap dengan caption AIDA, tagar 3 tier, dan shot list — semua ada di Notion Workspace.</span>
          <button type="button" data-action="open-modal" className="btn-press bg-ink text-brutalYellow hover:bg-brutalYellow hover:text-ink px-5 py-3 rounded-xl font-mono text-xs font-bold transition flex items-center gap-2 shrink-0">
            <span>Isi Brief & Dapatkan Versi Kamu</span>
            <Icon name="arrow-right" className="w-4 h-4" />
          </button>
        </div>
      </div>

    </div>
  </section>

  {/* CTA BANNER */}
  <section className="py-12 sm:py-20 bg-canvas brutal-grid border-b-2 border-ink relative">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <div className="bento-card p-8 sm:p-12 rounded-3xl bg-brutalYellow flex flex-col items-center space-y-4 shadow-brutal-lg">
        <span className="badge-brutal px-3.5 py-1 rounded-lg text-xs font-mono font-bold bg-ink text-brutalYellow uppercase">Mulai Eksekusi</span>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-ink leading-tight">
          Sistemnya Sudah Jelas. <br className="hidden sm:inline" />
          Tinggal Eksekusi dalam 24 Jam.
        </h2>
        <p className="text-xs sm:text-base text-stone-800 max-w-xl font-medium font-sans">
          Dapatkan 30 video script kata-per-kata, 30 caption AIDA, 4 artikel SEO, dan Notion Content OS &mdash; tanpa mikirin ide dari nol.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button type="button" data-action="open-modal" className="btn-press bg-ink text-brutalYellow hover:bg-white hover:text-ink px-8 py-4 rounded-2xl font-mono text-sm font-bold transition flex items-center gap-2.5">
            <span>Isi Brief (Rp299.000)</span>
            <Icon name="arrow-right" className="w-4 h-4" />
          </button>
          <a href="/#calculator" className="btn-press bg-white hover:bg-sand text-ink px-6 py-4 rounded-2xl font-mono text-sm font-bold transition flex items-center gap-2">
            <Icon name="calculator" className="w-4 h-4" />
            <span>Hitung Penghematan</span>
          </a>
        </div>
      </div>
    </div>
  </section>

</main>

<footer className="py-8 sm:py-12 bg-canvas brutal-grid text-stone-700 text-xs border-t-2 border-ink">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">

        <div className="rounded-2xl bg-white border-2 border-ink shadow-brutal-sm p-4 sm:p-5 flex flex-col">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-brutalYellow border-2 border-ink flex items-center justify-center font-display font-black text-ink text-base shadow-brutal-sm shrink-0">K</div>
            <div>
              <span className="font-display text-ink text-base font-bold leading-none block">Karsa</span>
              <span className="block text-[9px] font-mono uppercase tracking-wider text-stone-600 mt-1 font-bold">Studio</span>
            </div>
          </div>
          <p className="text-[11px] text-stone-600 leading-relaxed mt-3">Sistem konten 30 hari siap rekam. Tanpa kontrak, tanpa langganan.</p>
          <div className="mt-3 flex items-center gap-2 font-mono text-[9px] font-bold flex-wrap">
            <span className="badge-brutal inline-flex items-center gap-1 px-2 py-1 bg-brutalYellow text-ink rounded"><Icon name="zap" className="w-3 h-3" /> SLA 24 Jam</span>
            <span className="badge-brutal inline-flex items-center gap-1 px-2 py-1 bg-brutalCyan/60 text-ink rounded"><Icon name="refresh-cw" className="w-3 h-3" /> Kalibrasi 48 Jam</span>
          </div>
          <div className="flex gap-2 mt-3 pt-3 border-t-2 border-ink">
            <a href="/#" aria-label="Instagram" className="w-7 h-7 rounded-lg bg-canvas border-2 border-ink flex items-center justify-center text-ink shadow-brutal-sm hover:bg-brutalYellow transition"><Icon name="instagram" className="w-3.5 h-3.5" /></a>
            <a href="/#" aria-label="WhatsApp" className="w-7 h-7 rounded-lg bg-canvas border-2 border-ink flex items-center justify-center text-ink shadow-brutal-sm hover:bg-brutalGreen transition"><Icon name="message-circle" className="w-3.5 h-3.5" /></a>
            <a href="/#" aria-label="YouTube" className="w-7 h-7 rounded-lg bg-canvas border-2 border-ink flex items-center justify-center text-ink shadow-brutal-sm hover:bg-brutalPink transition"><Icon name="youtube" className="w-3.5 h-3.5" /></a>
          </div>
        </div>

        <div className="rounded-2xl bg-white border-2 border-ink shadow-brutal-sm p-4 sm:p-5">
          <h4 className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-[10px] text-ink">
            <span className="w-5 h-5 rounded-md bg-brutalYellow border border-ink flex items-center justify-center font-black text-[9px] shrink-0">01</span>
            Navigasi
          </h4>
          <ul className="mt-3 space-y-2 text-[11px] font-medium">
            <li><a href="/#deliverables" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Isi Paket (6 Output)</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="/sistem#pillar-konten" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Pilar Konten 30 Hari</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="/#cara-kerja" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Cara Kerja</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="/#harga" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Harga & Paket</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="/#testimoni" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Testimoni Customer</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="/faq" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>FAQ & Bantuan</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="/blog" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Blog Karsa</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="/tentang-kami" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Tentang Kami</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
          </ul>
        </div>

        <div className="rounded-2xl bg-white border-2 border-ink shadow-brutal-sm p-4 sm:p-5">
          <h4 className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-[10px] text-ink">
            <span className="w-5 h-5 rounded-md bg-brutalCyan border border-ink flex items-center justify-center font-black text-[9px] shrink-0">02</span>
            Layanan
          </h4>
          <ul className="mt-3 space-y-2 text-[11px] font-medium">
            <li><a href="/jasa-konten-video-umkm" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Jasa Konten Video UMKM</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="/jasa-script-video-tiktok" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Jasa Script Video TikTok</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="/jasa-content-creator-umkm" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Jasa Content Creator UMKM</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="/jasa-artikel-seo" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Jasa Artikel SEO</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="/paket-konten-instagram" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Paket Konten Instagram</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
          </ul>
        </div>

        <div className="rounded-2xl bg-white border-2 border-ink shadow-brutal-sm p-4 sm:p-5">
          <h4 className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-[10px] text-ink">
            <span className="w-5 h-5 rounded-md bg-brutalPink border border-ink flex items-center justify-center font-black text-[9px] shrink-0">03</span>
            Keputusan
          </h4>
          <ul className="mt-3 space-y-2 text-[11px] font-medium">
            <li><a href="/#harga" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Harga & Paket</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="/#komparasi" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Karsa vs Agensi vs AI</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="/#testimoni" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Testimoni Customer</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="/#studi-kasus" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Case Study</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="/#garansi" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Garansi & SLA</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="/#calculator" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Kalkulator Penghematan</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
          </ul>
        </div>

        <div className="rounded-2xl bg-white border-2 border-ink shadow-brutal-sm p-4 sm:p-5">
          <h4 className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-[10px] text-ink">
            <span className="w-5 h-5 rounded-md bg-brutalGreen border border-ink flex items-center justify-center font-black text-[9px] shrink-0">04</span>
            Kontak & Legal
          </h4>
          <ul className="mt-3 space-y-2 text-[11px] font-medium">
            <li><a href="/login" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Member Workspace</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><button type="button" data-action="open-modal" className="group flex items-center justify-between gap-2 w-full text-left text-stone-700 hover:text-ink transition"><span>Isi Brief (Rp299.000)</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></button></li>
            <li><a href="/terms" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Syarat & Ketentuan</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="/privacy" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Kebijakan Privasi</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="/refund" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Jaminan SLA & Refund</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="https://wa.me/6281288009920" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span className="font-mono text-[10px] font-bold">WA: +62 812-3456-7890</span><Icon name="message-circle" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
          </ul>
        </div>

      </div>

      <div className="mt-6 pt-4 border-t-2 border-ink text-[10px] sm:text-[11px] text-stone-600 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <span className="font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brutalGreen border border-ink shrink-0"></span>
          &copy; 2026 Karsa Studio (usekarsa.co). All rights reserved.
        </span>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-brutalYellow border-2 border-ink shadow-brutal-sm font-mono font-bold uppercase tracking-wider text-ink text-[10px]">
          Built for High Performance Execution <Icon name="zap" className="w-3 h-3" />
        </span>
      </div>
    </div>
  </footer>

{/* SMOOTH NEO-BRUTALIST CHECKOUT MODAL */}
  {/* ============================================== */}
  <div id="checkoutModal" className="modal-backdrop fixed inset-0 z-50 bg-ink/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
    <div className="modal-box w-full max-w-2xl bg-canvas brutal-grid border-3 border-ink rounded-3xl p-6 sm:p-8 shadow-brutal-xl relative max-h-[90vh] overflow-y-auto">
      
      {/* Close Button */}
      <button type="button" data-action="close-modal" aria-label="Tutup Modal" className="absolute top-5 right-5 w-9 h-9 rounded-xl bg-white border-2 border-ink flex items-center justify-center text-ink shadow-brutal-sm hover:bg-brutalYellow transition">
        <Icon name="x" className="w-5 h-5" />
      </button>

      {/* Modal Header */}
      <div className="mb-6">
        <span className="badge-brutal px-3 py-1 rounded-lg text-[11px] font-mono font-bold bg-brutalYellow text-ink uppercase">Checkout Form</span>
        <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-ink mt-2">
          Isi Brief & Amankan Batch 30 Hari
        </h2>
        <p className="text-stone-600 text-xs sm:text-sm mt-1 font-mono">Deliverable dikirim via email & Notion dalam 24 jam kerja.</p>
      </div>

      {/* Checkout Form */}
      <form id="orderForm" className="space-y-4 bg-white p-5 sm:p-6 rounded-2xl border-2 border-ink shadow-brutal-sm">
        
        <div>
          <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputBrand">Nama Brand / Bisnis *</label>
          <input type="text" id="inputBrand" required placeholder="Contoh: Kopi Teras Senja" className="w-full bg-canvas border-2 border-ink rounded-xl px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink font-sans" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputCategory">Kategori Industri *</label>
            <select id="inputCategory" required className="w-full bg-canvas border-2 border-ink rounded-xl px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink font-sans">
              <option value="Kuliner / F&B">Kuliner / F&B</option>
              <option value="Fashion & Apparel">Fashion & Apparel</option>
              <option value="Skincare & Beauty">Skincare & Beauty</option>
              <option value="Jasa Profesional">Jasa Profesional</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputCompetitor">Akun Kompetitor Acuan</label>
            <input type="text" id="inputCompetitor" placeholder="@namakompetitor" className="w-full bg-canvas border-2 border-ink rounded-xl px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink font-sans" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputDesc">Produk Utama & Target Pembeli *</label>
          <textarea id="inputDesc" rows={3} required placeholder="Jelaskan produk unggulan, harga, dan target pembeli utama kamu..." className="w-full bg-canvas border-2 border-ink rounded-xl px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink font-sans"></textarea>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputEmail">Email Penerima File *</label>
            <input type="email" id="inputEmail" required placeholder="nama@email.com" className="w-full bg-canvas border-2 border-ink rounded-xl px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink font-sans" />
          </div>
          <div>
            <label className="block text-xs font-mono font-bold uppercase text-ink mb-1.5" htmlFor="inputPhone">Nomor WhatsApp Aktif *</label>
            <input type="tel" id="inputPhone" required placeholder="081234567890" className="w-full bg-canvas border-2 border-ink rounded-xl px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink font-sans" />
          </div>
        </div>

        {/* Order Summary Pill inside Form */}
        <div className="p-3.5 bg-brutalYellow/30 rounded-xl border border-ink flex justify-between items-center text-xs font-mono font-bold">
          <span>Total Investasi (Batch 30 Hari):</span>
          <span className="text-base text-ink">Rp299.000</span>
        </div>

        <div className="pt-2">
          <button type="submit" className="btn-press w-full py-3.5 bg-ink hover:bg-brutalYellow text-brutalYellow hover:text-ink font-mono font-bold rounded-xl text-xs sm:text-sm transition flex items-center justify-center gap-2.5">
            <span>Kirim Brief & Selesaikan Order (Rp299.000)</span>
            <Icon name="arrow-right" className="w-4 h-4" />
          </button>
          <p id="formStatus" role="status" className="text-center text-xs text-stone-600 mt-2 min-h-4"></p>
        </div>

      </form>

    </div>
  </div>

  


    </div>
  );
}
