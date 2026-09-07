"use client";
import { useEffect, useRef } from "react";
import { Icon } from "@/components/Icon";

const LD_PRODUCT = `{"@context":"https://schema.org","@type":"Product","name":"Batch Konten 30 Hari Karsa Studio","description":"Inventaris konten 30 hari untuk UMKM: 30 video scripts kata-per-kata, 30 caption AIDA, 4 artikel SEO, audit kompetitor, Notion Content OS, dan panduan B-Roll — dikirim dalam 1x24 jam kerja.","brand":{"@type":"Brand","name":"Karsa Studio"},"image":"https://usekarsa.com/og-image.png","aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"40","bestRating":"5"},"offers":{"@type":"AggregateOffer","priceCurrency":"IDR","lowPrice":"299000","highPrice":"1490000","offerCount":"3","availability":"https://schema.org/InStock"}}`;
const LD_FAQ = `{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Format berkasnya seperti apa?","acceptedAnswer":{"@type":"Answer","text":"Kamu menerima tautan Notion Workspace terstruktur per hari (Day 01 - Day 30): script kata-per-kata, caption AIDA, cue visual/audio, dan shot-list B-Roll. Ada juga backup Google Docs (.docx) buat jaga-jaga."}},{"@type":"Question","name":"Apakah saya harus merekam videonya sendiri?","acceptedAnswer":{"@type":"Answer","text":"Ya. Kami yang nyusun naskahnya, kamu yang rekam. Script siap dibaca di teleprompter HP, lengkap dengan panduan visual dan cue audio — tinggal ikutin."}},{"@type":"Question","name":"Kalau ada naskah yang kurang pas gimana?","acceptedAnswer":{"@type":"Answer","text":"Ada garansi kalibrasi 48 jam. Istilah produk atau tone yang kurang pas bisa disesuaikan, dan update masuk ke workspace maksimal 12 jam kerja."}},{"@type":"Question","name":"Hak cipta materinya gimana?","acceptedAnswer":{"@type":"Answer","text":"Semua jadi milik kamu setelah diserahterimakan. Bebas dipublikasikan, dimodifikasi, atau dipakai buat apa pun. Brief kamu juga nggak dibagikan ke pihak lain."}},{"@type":"Question","name":"Berapa lama pengerjaannya (SLA)?","acceptedAnswer":{"@type":"Answer","text":"Maksimal 1x24 jam kerja setelah brief dan pembayaran terkonfirmasi. Kalau telat dari sisi kami, kamu dapat 5 naskah tambahan gratis."}}]}`;

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

  const calculateSavings = () => {
    const hoursEl = document.getElementById("sliderHours") as HTMLInputElement | null;
    const agencyEl = document.getElementById("sliderAgency") as HTMLInputElement | null;
    if (!hoursEl || !agencyEl) return;
    const hours = parseInt(hoursEl.value, 10);
    const agencyPrice = parseInt(agencyEl.value, 10);
    const karsaPrice = 299000;
    const set = (id: string, txt: string) => { const el = document.getElementById(id); if (el) el.textContent = txt; };
    const setHtml = (id: string, html: string) => { const el = document.getElementById(id); if (el) el.innerHTML = html; };
    set("dispHours", `${hours} Jam`);
    set("dispAgency", `Rp ${agencyPrice.toLocaleString("id-ID")}`);
    const savedHoursMonthly = hours * 4;
    const netMonthly = agencyPrice - karsaPrice;
    const perYear = netMonthly * 12;
    const karsaPerScript = Math.round(karsaPrice / 30);
    const agencyPerScript = Math.round(agencyPrice / 30);
    set("resSavedHours", `${savedHoursMonthly} Jam / Bulan`);
    set("resSavedMoney", `Rp ${netMonthly.toLocaleString("id-ID")} / Bln`);
    set("resSavedYear", `Rp ${perYear.toLocaleString("id-ID")}`);
    setHtml("resPerScript", `Karsa <span class="bg-brutalGreen/40 px-1 rounded border border-ink">Rp${karsaPerScript.toLocaleString("id-ID")}</span><br>vs Agensi <span class="bg-brutalPink/30 px-1 rounded border border-ink">Rp${agencyPerScript.toLocaleString("id-ID")}</span>`);
  };

  useEffect(() => {
    const els = document.querySelectorAll('[data-action="calculator"]');
    els.forEach((el) => el.addEventListener("input", calculateSavings));
    calculateSavings();
    return () => els.forEach((el) => el.removeEventListener("input", calculateSavings));
  }, []);

  useEffect(() => {
    document.documentElement.classList.add("js");
    const sections = document.querySelectorAll("main section");
    sections.forEach((s) => {
      s.querySelectorAll(".grid").forEach((g) => g.classList.add("reveal-grid"));
    });
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const sec = entry.target;
        sec.classList.add("reveal-in");
        runCounters(sec);
        io.unobserve(sec);
      });
    }, { threshold: 0.06, rootMargin: "0px 0px -40px 0px" });
    sections.forEach((s) => { s.classList.add("reveal"); io.observe(s); });

    function runCounters(scope: Element) {
      scope.querySelectorAll("[data-count]").forEach((el) => {
        const target = parseFloat(el.getAttribute("data-count") || "");
        const prefix = el.getAttribute("data-prefix") || "";
        const suffix = el.getAttribute("data-suffix") || "";
        if (isNaN(target)) return;
        const dur = 1300;
        let start: number | null = null;
        function step(ts: number) {
          if (!start) start = ts;
          const p = Math.min((ts - start) / dur, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = prefix + Math.round(target * eased).toLocaleString("id-ID") + suffix;
          if (p < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
      });
    }

    const floats = document.querySelectorAll("main .text-2xl.font-mono.font-black, main .text-3xl.font-mono.font-black");
    floats.forEach((el, i) => {
      el.classList.add("deco-float");
      (el as HTMLElement).style.animationDelay = (i % 5) * 0.7 + "s";
      (el as HTMLElement).style.animationDuration = (5.5 + (i % 3) * 0.9) + "s";
    });
    return () => io.disconnect();
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
    const wrap = document.getElementById("phoneWrap");
    const phone = document.getElementById("phoneMockup");
    if (!wrap || !phone || !window.matchMedia("(pointer: fine)").matches || window.innerWidth < 1024) return;
    let ticking = false;
    const onMove = (e: MouseEvent) => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const r = wrap.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        phone.style.transform = "perspective(900px) rotateY(" + (x * 12).toFixed(2) + "deg) rotateX(" + (-y * 9).toFixed(2) + "deg)";
        ticking = false;
      });
    };
    const onLeave = () => {
      phone.style.transition = "transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)";
      phone.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
    };
    const onEnter = () => { phone.style.transition = "none"; };
    wrap.addEventListener("mousemove", onMove);
    wrap.addEventListener("mouseleave", onLeave);
    wrap.addEventListener("mouseenter", onEnter);
    return () => {
      wrap.removeEventListener("mousemove", onMove);
      wrap.removeEventListener("mouseleave", onLeave);
      wrap.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  useEffect(() => {
    const garansi = document.getElementById("garansi");
    if (!garansi) return;
    garansi.querySelectorAll(".w-10.h-10").forEach((tile) => tile.classList.add("animate-pulse"));
  }, []);

  return (
    <div className="min-h-screen flex flex-col justify-between">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: LD_PRODUCT }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: LD_FAQ }} />

  <div id="scrollProgress" className="fixed top-0 left-0 right-0 h-1 bg-ink z-[70] pointer-events-none"></div>
  <a href="#main-content" className="sr-only text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-3 focus:bg-brutalYellow focus:text-ink focus:font-mono focus:text-xs focus:font-bold focus:rounded-xl focus:border-2 focus:border-ink">Lewati ke konten utama</a>

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
      <a href="#main-content" className="flex items-center space-x-2 shrink-0 group">
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
                  <a href="#modul-video" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink">
                    <span className="w-6 h-6 rounded bg-brutalYellow text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">01</span>
                    <div><span className="block font-bold text-xs">30 Video Scripts</span><span className="block text-[9px] text-stone-500 font-mono">Hook, visual, audio, CTA.</span></div>
                  </a>
                  <a href="#modul-caption" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalCyan/40 transition border border-transparent hover:border-ink">
                    <span className="w-6 h-6 rounded bg-brutalCyan text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">02</span>
                    <div><span className="block font-bold text-xs">30 Caption & Tagar</span><span className="block text-[9px] text-stone-500 font-mono">AIDA + 3 tier tagar.</span></div>
                  </a>
                  <a href="#modul-seo" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalGreen/40 transition border border-transparent hover:border-ink">
                    <span className="w-6 h-6 rounded bg-brutalGreen text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">03</span>
                    <div><span className="block font-bold text-xs">4 Artikel Blog SEO</span><span className="block text-[9px] text-stone-500 font-mono">Struktur H1-H3 + meta.</span></div>
                  </a>
                  <a href="#modul-audit" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalPink/40 transition border border-transparent hover:border-ink">
                    <span className="w-6 h-6 rounded bg-brutalPink text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">04</span>
                    <div><span className="block font-bold text-xs">Audit Gap Kompetitor</span><span className="block text-[9px] text-stone-500 font-mono">Teardown 1 akun acuan.</span></div>
                  </a>
                  <a href="#modul-notion" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink">
                    <span className="w-6 h-6 rounded bg-white text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">05</span>
                    <div><span className="block font-bold text-xs">Notion Content OS</span><span className="block text-[9px] text-stone-500 font-mono">Calendar + Kanban produksi.</span></div>
                  </a>
                  <a href="#modul-shotlist" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalCyan/40 transition border border-transparent hover:border-ink">
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
                  <a href="#cara-kerja" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Cara Kerja Karsa</span><span className="block text-[9px] text-stone-500 font-mono">Brief, riset, tulis, kirim.</span></a>
                  <a href="/sistem#cakupan" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Scope Layanan</span><span className="block text-[9px] text-stone-500 font-mono">Termasuk & tidak termasuk.</span></a>
                  <a href="/sistem#anatomi-script" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Anatomi Script 25 Detik</span><span className="block text-[9px] text-stone-500 font-mono">Hook, value, CTA per detik.</span></a>
                  <a href="/sistem#pillar-konten" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Pilar Konten 30 Hari</span><span className="block text-[9px] text-stone-500 font-mono">4 pilar & rasio mingguan.</span></a>
                  <a href="/sistem#alur-produksi" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Template Produksi</span><span className="block text-[9px] text-stone-500 font-mono">Senin-Jumat siap eksekusi.</span></a>
                  <a href="#garansi" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Garansi & SLA</span><span className="block text-[9px] text-stone-500 font-mono">24 jam + kalibrasi 48 jam.</span></a>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink">
                  <span className="w-6 h-6 rounded bg-ink text-brutalPink flex items-center justify-center font-mono font-bold text-[10px]"><Icon name="bar-chart-3" className="w-3.5 h-3.5" /></span>
                  <span className="font-bold text-[10px] uppercase tracking-wider">Proof & Keputusan</span>
                </div>
                <div className="space-y-1 mt-2">
                  <a href="/contoh#compare-scripts" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Bandingkan Kualitas</span><span className="block text-[9px] text-stone-500 font-mono">Script generik vs Karsa.</span></a>
                  <a href="#studi-kasus" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Case Study Nyata</span><span className="block text-[9px] text-stone-500 font-mono">Metrik dari implementasi.</span></a>
                  <a href="/contoh#preview" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Contoh Output</span><span className="block text-[9px] text-stone-500 font-mono">Script, caption, dan SEO.</span></a>
                  <a href="#calculator" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Kalkulator Hemat</span><span className="block text-[9px] text-stone-500 font-mono">Bandingkan biaya per batch.</span></a>
                  <a href="#komparasi" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Karsa vs Agensi vs AI</span><span className="block text-[9px] text-stone-500 font-mono">Tabel perbandingan jujur.</span></a>
                  <a href="#harga" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Harga & Paket</span><span className="block text-[9px] text-stone-500 font-mono">1, 3, atau 6 batch.</span></a>
                  <a href="#testimoni" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Testimoni Customer</span><span className="block text-[9px] text-stone-500 font-mono">Kata mereka yang sudah pakai.</span></a>
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
                  <a href="/contoh?sektor=fb#preview" className="block p-2 rounded-xl hover:bg-brutalGreen/30 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">F&B & Cafe</span><span className="block text-[9px] text-stone-500 font-mono">Menu, review, edukasi.</span></a>
                  <a href="/contoh?sektor=skincare#preview" className="block p-2 rounded-xl hover:bg-brutalGreen/30 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Skincare & Beauty</span><span className="block text-[9px] text-stone-500 font-mono">Ingredient, myth-busting.</span></a>
                  <a href="/contoh?sektor=fashion#preview" className="block p-2 rounded-xl hover:bg-brutalGreen/30 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Fashion & Apparel</span><span className="block text-[9px] text-stone-500 font-mono">Styling, fit, detail bahan.</span></a>
                  <a href="/contoh?sektor=jasa#preview" className="block p-2 rounded-xl hover:bg-brutalGreen/30 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Jasa & Edukasi</span><span className="block text-[9px] text-stone-500 font-mono">Konsultan, klinik, les.</span></a>
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
                  <a href="#harga" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Penjualan Produk</span><span className="block text-[9px] text-stone-500 font-mono">Perjelas value dan CTA.</span></a>
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

        <a href="#harga" className="nav-pill px-2.5 py-1.5 rounded-xl transition">Harga</a>
        <a href="#testimoni" className="nav-pill px-2.5 py-1.5 rounded-xl transition">Testimoni</a>
        <a href="#cara-kerja" className="nav-pill px-2.5 py-1.5 rounded-xl transition">Cara Kerja</a>
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
      <a href="#deliverables" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Isi Paket (6 Output)</a>
      <a href="/sistem#anatomi-script" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Anatomi Script</a>
      <a href="/sistem#pillar-konten" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-brutalYellow border-2 border-ink shadow-brutal-sm">Pilar Konten 30 Hari</a>
      <a href="#cara-kerja" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Cara Kerja</a>
      <a href="#testimoni" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Testimoni Customer</a>
      <a href="#harga" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Harga & Paket</a>
      <a href="#garansi" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Garansi & SLA</a>
      <a href="#calculator" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Kalkulator Penghematan</a>
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

  {/* ============================================== */}
  {/* HERO [POLKADOT] */}
  {/* ============================================== */}
  <section className="pt-8 pb-14 sm:pt-16 sm:pb-24 border-b-2 border-ink bg-canvas brutal-grid relative overflow-hidden">

    {/* Floating Brutalist Stickers & Shapes */}
    <div className="hidden lg:flex absolute top-10 right-16 w-24 h-24 bg-brutalYellow text-ink items-center justify-center font-display font-extrabold text-xs uppercase text-center p-2 rotate-12 z-0 brutal-star border-2 border-ink shadow-brutal animate-pulse pointer-events-none">
      100%<br />Organik
    </div>
    <div className="hidden xl:flex absolute top-28 left-6 badge-brutal bg-white px-3.5 py-2 rounded-xl items-center gap-2.5 -rotate-6 z-20">
      <div className="w-8 h-8 rounded-lg bg-ink text-brutalCyan flex items-center justify-center font-bold text-xs border border-ink">
        <Icon name="video" className="w-5 h-5" />
      </div>
      <span className="font-mono font-bold text-xs text-ink">TikTok 9:16 Ready</span>
    </div>
    <div className="hidden xl:flex absolute bottom-8 left-14 badge-brutal bg-ink text-brutalYellow px-3.5 py-2 rounded-xl items-center gap-2 rotate-3 z-20">
      <Icon name="sparkles" className="w-5 h-5 text-brutalYellow" />
      <span className="font-mono font-bold text-xs">Reels Hooks</span>
    </div>

    {/* Random Geometric Markers */}
    <div className="absolute top-1/3 left-2 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-1/4 right-8 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="hidden lg:block absolute bottom-12 right-1/3 w-6 h-6 rounded-full border-2 border-ink bg-brutalYellow rotate-45 pointer-events-none shadow-brutal-sm"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

        {/* Left Hero Text (7 Cols) */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2.5 badge-brutal bg-brutalYellow px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-mono font-bold">
            <Icon name="shield-check" className="w-4 h-4 sm:w-5 sm:h-5 text-ink" />
            <span>KONTEN ORGANIK TANPA BURNOUT</span>
          </div>

          {/* Highlight Hero */}
          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-display font-extrabold tracking-tight text-ink leading-[1.12]">
            30 Hari konten organik, <br className="hidden sm:inline" />
            <span className="bg-brutalYellow text-ink px-2.5 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">siap rekam</span> kata per kata.
          </h1>

          <div className="max-w-xl mx-auto lg:mx-0">
            <p className="bg-white border-2 border-ink rounded-2xl shadow-brutal-sm px-4 sm:px-5 py-3.5 sm:py-4 text-xs sm:text-sm text-stone-800 leading-relaxed font-sans font-medium flex items-start gap-3">
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-brutalYellow border-2 border-ink flex items-center justify-center shadow-brutal-sm shrink-0 mt-0.5"><Icon name="zap" className="w-4 h-4 text-ink" /></span>
              <span>Berhenti mulai dari nol tiap minggu. Isi brief singkat, <strong className="text-ink">24 jam kerja</strong> kemudian kamu pegang <strong className="text-ink">30 video script kata-per-kata</strong> (TikTok/Reels), 30 caption AIDA, 4 artikel SEO, plus Notion Content OS yang rapi.</span>
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2">
            <button type="button" data-action="open-modal" className="btn-press bg-ink text-brutalYellow hover:bg-brutalYellow hover:text-ink px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl font-mono text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2.5 min-h-[48px] sm:min-h-[50px]">
              <span>Mulai dengan Brief (Rp299.000)</span>
              <Icon name="arrow-right" className="w-4 h-4" />
            </button>
            <a href="#deliverables" className="btn-press bg-white hover:bg-sand text-ink px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl font-mono text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2.5 min-h-[48px] sm:min-h-[50px]">
              <Icon name="layers" className="w-4 h-4 text-ink" />
              <span>Lihat Rincian Output</span>
            </a>
          </div>

          {/* Proof Badges */}
          <div className="pt-6 border-t-2 border-ink grid grid-cols-3 gap-2.5 sm:gap-3 font-mono text-xs max-w-lg mx-auto lg:mx-0">
            <div className="p-3 sm:p-3.5 bg-white border-2 border-ink rounded-xl shadow-brutal-sm">
              <span className="font-display font-bold text-lg sm:text-2xl text-ink block">30</span>
              <span className="text-[10px] sm:text-[11px] text-stone-600 font-medium uppercase">Video Scripts</span>
            </div>
            <div className="p-3 sm:p-3.5 bg-brutalYellow border-2 border-ink rounded-xl shadow-brutal-sm">
              <span className="font-display font-bold text-lg sm:text-2xl text-ink block">&lt;24 Jam</span>
              <span className="text-[10px] sm:text-[11px] text-ink font-bold uppercase">SLA Turnaround</span>
            </div>
            <div className="p-3 sm:p-3.5 bg-white border-2 border-ink rounded-xl shadow-brutal-sm">
              <span className="font-display font-bold text-lg sm:text-2xl text-ink block">Rp299k</span>
              <span className="text-[10px] sm:text-[11px] text-stone-600 font-medium uppercase">Flat / Batch</span>
            </div>
          </div>
        </div>

        {/* Right Responsive 9:16 Mockup (5 Cols) */}
        <div id="phoneWrap" className="lg:col-span-5 flex justify-center relative pt-4 lg:pt-0">
          <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-6 badge-brutal bg-white p-2 sm:p-2.5 rounded-xl flex items-center gap-1.5 rotate-6 z-30 shadow-brutal">
            <Icon name="sparkles" className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-ink" />
            <span className="font-mono text-[10px] sm:text-xs font-bold">15-30s Hook</span>
          </div>

          <div id="phoneMockup" className="w-full max-w-[300px] sm:max-w-[340px] h-[480px] sm:h-[530px] bg-ink rounded-[34px] sm:rounded-[38px] p-3.5 sm:p-4 shadow-brutal-xl border-[3px] border-ink relative overflow-hidden flex flex-col justify-between select-none will-change-transform">
            <div className="flex justify-between items-center px-2 pt-1 z-20 text-[10px] font-mono text-stone-400">
              <span className="font-bold text-white">09:41</span>
              <div className="px-2.5 py-0.5 bg-stone-900 rounded-full flex items-center gap-1.5 border border-stone-700">
                <span className="w-2 h-2 rounded-full bg-brutalYellow animate-pulse"></span>
                <span className="text-[9px] text-white uppercase font-bold">Teleprompter</span>
              </div>
              <div className="flex items-center gap-1 text-brutalGreen font-bold">
                <span>REC</span>
              </div>
            </div>

            <div className="relative flex-1 overflow-hidden my-3">
              <div className="animate-teleprompter space-y-3 font-mono text-xs text-stone-300">
                <div className="p-3 sm:p-3.5 bg-stone-900 border border-stone-700 rounded-xl">
                  <span className="text-[9px] sm:text-[10px] font-bold text-brutalYellow uppercase block tracking-wider">[00:00 - 00:03] HOOK PENYANGKALAN</span>
                  <p className="text-white text-xs mt-1 leading-snug font-sans">"Kenapa kopi sachet kamu sering bikin perut kembung padahal baru 3 teguk?"</p>
                </div>
                <div className="p-3 sm:p-3.5 bg-stone-900 border border-stone-700 rounded-xl">
                  <span className="text-[9px] sm:text-[10px] font-bold text-canvas uppercase block tracking-wider">[00:04 - 00:18] VALUE & PROOF</span>
                  <p className="text-stone-200 text-xs mt-1 leading-snug font-sans">"Metode slow-drip 12 jam kami memecah asam klorogenat secara alami tanpa ngurangin kadar kafein."</p>
                </div>
                <div className="p-3 sm:p-3.5 bg-stone-900 border border-stone-700 rounded-xl">
                  <span className="text-[9px] sm:text-[10px] font-bold text-brutalYellow uppercase block tracking-wider">[00:19 - 00:25] DIRECT CALL TO ACTION</span>
                  <p className="text-white text-xs mt-1 leading-snug font-sans">"Cek link di bio sekarang buat amankan sampler pack ramah lambung minggu ini!"</p>
                </div>
              </div>
            </div>

            <div className="bg-stone-900 rounded-xl p-2 sm:p-2.5 flex items-center justify-between text-stone-300 font-mono text-[10px] z-20 border border-stone-800">
              <div className="flex items-center gap-1.5 text-brutalYellow font-bold">
                <Icon name="play" className="w-3.5 h-3.5 text-brutalYellow fill-brutalYellow" />
                <span>Speed: 1.0x</span>
              </div>
              <span className="px-2 py-0.5 bg-stone-800 text-sand rounded font-bold">Day 04 / 30</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  {/* MARQUEE STRIP */}
  <div className="py-3 sm:py-3.5 border-b-2 border-ink bg-sand overflow-hidden relative">
    <div className="flex items-center gap-3 px-4 max-w-7xl mx-auto">
      <div className="marquee-track flex gap-8 font-mono text-xs sm:text-sm font-bold text-ink uppercase tracking-wider whitespace-nowrap shrink-0 items-center">
        <span className="flex items-center gap-1.5"><Icon name="check-circle-2" className="w-4 h-4 text-ink" /> 40+ Brand UMKM</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="video" className="w-4 h-4 text-ink" /> TikTok FYP</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="smartphone" className="w-4 h-4 text-ink" /> IG Reels Viral</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="search" className="w-4 h-4 text-ink" /> Google SEO Traffic</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="layout-grid" className="w-4 h-4 text-ink" /> Notion OS</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="shield-check" className="w-4 h-4 text-ink" /> Tanpa Kontrak</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="check-circle-2" className="w-4 h-4 text-ink" /> 40+ Brand UMKM</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="video" className="w-4 h-4 text-ink" /> TikTok FYP</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="smartphone" className="w-4 h-4 text-ink" /> IG Reels Viral</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="search" className="w-4 h-4 text-ink" /> Google SEO Traffic</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="layout-grid" className="w-4 h-4 text-ink" /> Notion OS</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="shield-check" className="w-4 h-4 text-ink" /> Tanpa Kontrak</span>
        <span>///</span>
      </div>
    </div>
  </div>

  {/* ============================================== */}
  {/* STATS STRIP [RETRO GRID] */}
  {/* ============================================== */}
  <section className="py-10 sm:py-14 border-b-2 border-ink bg-canvas brutal-grid relative">
    {/* Decorative Theme Elements */}
    <div className="absolute top-4 right-10 text-xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="hidden md:block absolute bottom-4 left-8 w-4 h-4 bg-brutalCyan rotate-12 border border-ink shadow-brutal-sm"></div>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bento-card p-4 sm:p-6 rounded-2xl bg-white text-center">
          <span data-count="30" className="font-display font-extrabold text-2xl sm:text-4xl text-ink block">0</span>
          <span className="font-mono text-[10px] sm:text-[11px] text-stone-600 font-bold uppercase mt-1 block">Naskah Video Kata-per-Kata</span>
        </div>
        <div className="bento-card p-4 sm:p-6 rounded-2xl bg-brutalGreen/40 text-center">
          <span className="font-display font-extrabold text-2xl sm:text-4xl text-ink block">&lt;24 Jam</span>
          <span className="font-mono text-[10px] sm:text-[11px] text-ink font-bold uppercase mt-1 block">SLA Pengiriman Maksimal</span>
        </div>
        <div className="bento-card p-4 sm:p-6 rounded-2xl bg-white text-center">
          <span data-count="40" data-suffix="+" className="font-display font-extrabold text-2xl sm:text-4xl text-ink block">0</span>
          <span className="font-mono text-[10px] sm:text-[11px] text-stone-600 font-bold uppercase mt-1 block">Brand UMKM Terlayani</span>
        </div>
        <div className="bento-card p-4 sm:p-6 rounded-2xl bg-brutalCyan/40 text-center">
          <span data-count="92" data-suffix="%" className="font-display font-extrabold text-2xl sm:text-4xl text-ink block">0</span>
          <span className="font-mono text-[10px] sm:text-[11px] text-stone-700 font-bold uppercase mt-1 block">Customer Pesan Batch Lagi</span>
        </div>
      </div>
    </div>
  </section>

  <section id="problem" className="py-12 sm:py-20 bg-canvas brutal-grid border-b-2 border-ink relative overflow-hidden">
    <div className="absolute top-4 right-10 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-6 left-6 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="hidden sm:block absolute top-1/2 left-2 w-5 h-5 bg-brutalYellow rotate-12 border border-ink shadow-brutal-sm"></div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">

        {/* Left Side: Problem Header & Audit Receipt Card */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="badge-brutal inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold bg-ink text-brutalYellow uppercase">
                <Icon name="alert-octagon" className="w-3.5 h-3.5 text-brutalYellow" /> Kendala Utama
              </span>
              <span className="badge-brutal bg-white px-2.5 py-0.5 rounded text-[10px] font-mono font-bold rotate-3">
                <Icon name="message-square-warning" className="w-3 h-3 inline mr-0.5" /> Alert
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-3 leading-tight">
              Bukan Kurang Niat. <br />
              <span className="bg-brutalYellow text-ink px-2.5 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">Sistemnya yang Belum Ada.</span>
            </h2>
            <p className="font-mono text-xs sm:text-sm text-stone-700 mt-3 font-medium leading-relaxed">
              Tiap minggu keputusan konten dibuat dari nol lagi: ide, script, caption, tagar. Diulang dari awal terus-terusan, sampai akhirnya nggak posting sama sekali. Itu yang bikin burnout — bukan kurang semangat.
            </p>
          </div>

          {/* Problem Audit Receipt Card */}
          <div className="bento-card p-5 sm:p-6 rounded-3xl bg-white border-2 border-ink relative overflow-hidden">
            <div className="scan-line"></div>
            <div className="flex justify-between items-center pb-3 border-b-2 border-ink text-xs font-mono font-bold">
              <span className="flex items-center gap-1.5"><Icon name="terminal" className="w-4 h-4 text-ink" /> AUDIT_STATUS</span>
              <span className="text-ink bg-brutalPink/40 px-2 py-0.5 rounded border border-ink">92% Burnout Rate</span>
            </div>
            <div className="space-y-2.5 font-mono text-xs mt-4">
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-600">Waktu mikir ide / minggu:</span>
                <span className="font-bold text-ink">8.5 Jam</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-600">Post yang akhirnya jadi:</span>
                <span className="font-bold text-ink">0-2 Sporadis</span>
              </div>
              <div className="flex justify-between py-1 border-b border-stone-200">
                <span className="text-stone-600">Arah copy & SEO:</span>
                <span className="font-bold text-ink">Tanpa Struktur</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t-2 border-ink flex items-center justify-between text-[11px] font-mono font-bold text-ink">
              <span>Solusi Karsa Studio:</span>
              <span className="bg-brutalGreen px-2 py-0.5 rounded border border-ink">Sistem Terkunci 30 Hari</span>
            </div>
          </div>
        </div>

        {/* Right Side: 3 Error Bento Cards */}
        <div className="lg:col-span-7 space-y-4">

          <div className="bento-card p-5 sm:p-6 rounded-3xl bg-white relative group flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-canvas border-2 border-ink flex items-center justify-center shadow-brutal-sm shrink-0">
                <Icon name="brain" className="w-5 h-5 text-ink" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] font-bold text-ink bg-canvas px-2 py-0.5 rounded border border-ink">ERR_01</span>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-ink">Ide Mandek</h3>
                </div>
                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-sans">
                  Tiap Minggu malam buka laptop, layar kosong 2 jam, nggak ada ide. Akhirnya minggu itu skip posting.
                </p>
              </div>
            </div>
            <span className="badge-brutal text-[10px] font-mono uppercase px-2.5 py-1 bg-sand rounded font-bold shrink-0 self-start sm:self-auto">Efek: Jam Hilang</span>
          </div>

          <div className="bento-card p-5 sm:p-6 rounded-3xl bg-brutalPink/30 relative group flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-white border-2 border-ink flex items-center justify-center shadow-brutal-sm shrink-0">
                <Icon name="clapperboard" className="w-5 h-5 text-ink" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] font-bold text-ink bg-white px-2 py-0.5 rounded border border-ink">ERR_02</span>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-ink">Rekam Tanpa Arah</h3>
                </div>
                <p className="text-stone-800 text-xs sm:text-sm leading-relaxed font-sans">
                  HP sudah siap, tapi kaku di depan kamera. Gak ada script per detik, gak ada cue visual. Rekam ulang berkali-kali.
                </p>
              </div>
            </div>
            <span className="badge-brutal text-[10px] font-mono uppercase px-2.5 py-1 bg-white rounded font-bold shrink-0 self-start sm:self-auto">Efek: Kaku & Awkward</span>
          </div>

          <div className="bento-card p-5 sm:p-6 rounded-3xl bg-white relative group flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-canvas border-2 border-ink flex items-center justify-center shadow-brutal-sm shrink-0">
                <Icon name="trending-down" className="w-5 h-5 text-ink" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-mono text-[10px] font-bold text-ink bg-canvas px-2 py-0.5 rounded border border-ink">ERR_03</span>
                  <h3 className="font-display font-bold text-lg sm:text-xl text-ink">Feed Jadi Brosur Iklan</h3>
                </div>
                <p className="text-stone-700 text-xs sm:text-sm leading-relaxed font-sans">
                  Semua post isinya jualan tanpa edukasi atau cerita. Audiens bosan, follow-nya nggak gerak-gerak.
                </p>
              </div>
            </div>
            <span className="badge-brutal text-[10px] font-mono uppercase px-2.5 py-1 bg-sand rounded font-bold shrink-0 self-start sm:self-auto">Efek: Zero Follow</span>
          </div>

        </div>

      </div>

    </div>
  </section>

  

  

  

  <section id="deliverables" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-grid relative">
    {/* Decorative Theme Elements */}

    <div className="absolute top-4 right-8 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-10 left-6 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="hidden md:block absolute top-1/2 left-4 w-6 h-6 bg-brutalYellow -rotate-12 border border-ink shadow-brutal-sm pointer-events-none"></div>
    <div className="hidden xl:flex absolute top-10 left-8 badge-brutal bg-white px-3 py-1.5 rounded-lg items-center gap-2 rotate-6 z-20"><Icon name="package-check" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">6 Output</span></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12">
        <div>
          <span className="badge-brutal px-3 py-1 rounded-lg text-xs font-mono font-bold bg-ink text-brutalYellow uppercase">Deliverables Pack</span>
        <div className="hidden lg:flex absolute bottom-12 right-10 badge-brutal bg-white px-3 py-1.5 rounded-lg items-center gap-2 -rotate-6 z-20"><Icon name="layout-grid" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">Notion OS Ready</span></div>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">
            6 Output Utama <span className="bg-brutalYellow text-ink px-2.5 py-0.5 inline-block rotate-1 border-2 border-ink shadow-brutal-sm">Siap Eksekusi</span>
          </h2>
        </div>
        <div className="font-mono text-xs sm:text-sm font-bold text-stone-700 mt-2 md:mt-0 flex items-center gap-2">
          <Icon name="file-check" className="w-4 h-4 text-ink" />
          <span>Format: Notion Database + Docs Backup</span>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">

        {/* Output 01 */}
        <div id="modul-video" className="bento-card p-4 sm:p-6 rounded-3xl bg-brutalYellow/40 flex flex-col justify-between shine">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-white border-2 border-ink flex items-center justify-center font-mono font-bold text-ink shadow-brutal-sm">
                01
              </div>
              <span className="badge-brutal text-[10px] font-mono uppercase px-2.5 py-1 bg-white rounded-lg font-bold">9:16 Video</span>
            </div>
            <h3 className="text-xl font-display font-bold text-ink">30 Video Scripts</h3>
            <p className="text-stone-800 text-xs sm:text-sm mt-2 font-sans leading-relaxed">
              Naskah kata-per-kata per detik untuk TikTok & Reels: Visual Hook (0-3s), Value Solution, dan Call To Action.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t-2 border-ink font-mono text-[11px] text-ink font-bold flex items-center gap-2">
            <Icon name="check" className="w-3.5 h-3.5 text-ink" /> Termasuk Audio & Visual Cues
          </div>
        </div>

        {/* Output 02 */}
        <div id="modul-caption" className="bento-card p-4 sm:p-6 rounded-3xl bg-brutalCyan/40 flex flex-col justify-between shine">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-white border-2 border-ink flex items-center justify-center font-mono font-bold text-ink shadow-brutal-sm">
                02
              </div>
              <span className="badge-brutal text-[10px] font-mono uppercase px-2.5 py-1 bg-white rounded-lg font-bold">Copywriting</span>
            </div>
            <h3 className="text-xl font-display font-bold text-ink">30 Caption & Tagar</h3>
            <p className="text-stone-800 text-xs sm:text-sm mt-2 font-sans leading-relaxed">
              Formula Attention, Interest, Desire, Action siap tempel ke Instagram & Threads beserta riset 3 tier tagar relevan.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t-2 border-ink font-mono text-[11px] text-ink font-bold flex items-center gap-2">
            <Icon name="check" className="w-3.5 h-3.5 text-ink" /> 120-180 Kata / Post
          </div>
        </div>

        {/* Output 03 */}
        <div id="modul-seo" className="bento-card p-4 sm:p-6 rounded-3xl bg-brutalGreen/40 flex flex-col justify-between shine">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-white border-2 border-ink flex items-center justify-center font-mono font-bold text-ink shadow-brutal-sm">
                03
              </div>
              <span className="badge-brutal text-[10px] font-mono uppercase px-2.5 py-1 bg-white rounded-lg font-bold">SEO Traffic</span>
            </div>
            <h3 className="text-xl font-display font-bold text-ink">4 Artikel Blog SEO</h3>
            <p className="text-stone-800 text-xs sm:text-sm mt-2 font-sans leading-relaxed">
              Artikel pilar panjang (1.000 kata) terstruktur H1-H3 dan meta deskripsi untuk mendatangkan traffic pencarian Google.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t-2 border-ink font-mono text-[11px] text-ink font-bold flex items-center gap-2">
            <Icon name="check" className="w-3.5 h-3.5 text-ink" /> Format Markdown & Docs
          </div>
        </div>

        {/* Output 04 */}
        <div id="modul-audit" className="bento-card p-4 sm:p-6 rounded-3xl bg-brutalPink/40 flex flex-col justify-between shine">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-white border-2 border-ink flex items-center justify-center font-mono font-bold text-ink shadow-brutal-sm">
                04
              </div>
              <span className="badge-brutal text-[10px] font-mono uppercase px-2.5 py-1 bg-white rounded-lg font-bold">Teardown</span>
            </div>
            <h3 className="text-xl font-display font-bold text-ink">Audit Gap Kompetitor</h3>
            <p className="text-stone-800 text-xs sm:text-sm mt-2 font-sans leading-relaxed">
              Bedah 1 akun kompetitor acuan untuk menemukan celah sudut pesan yang belum dimanfaatkan di pasar tokomu.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t-2 border-ink font-mono text-[11px] text-ink font-bold flex items-center gap-2">
            <Icon name="check" className="w-3.5 h-3.5 text-ink" /> Positioning Blueprint
          </div>
        </div>

        {/* Output 05 */}
        <div id="modul-notion" className="bento-card p-4 sm:p-6 rounded-3xl bg-white flex flex-col justify-between shine">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-brutalYellow border-2 border-ink flex items-center justify-center font-mono font-bold text-ink shadow-brutal-sm">
                05
              </div>
              <span className="badge-brutal text-[10px] font-mono uppercase px-2.5 py-1 bg-canvas rounded-lg font-bold">Database</span>
            </div>
            <h3 className="text-xl font-display font-bold text-ink">Notion Content OS</h3>
            <p className="text-stone-700 text-xs sm:text-sm mt-2 font-sans leading-relaxed">
              Database Notion siap 1-klik duplicate dengan Calendar View, Kanban board produksi, dan pelacakan status post.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t-2 border-ink font-mono text-[11px] text-stone-600 flex items-center gap-2">
            <Icon name="check" className="w-3.5 h-3.5 text-ink" /> 1-Click Duplicate
          </div>
        </div>

        {/* Output 06 */}
        <div id="modul-shotlist" className="bento-card p-4 sm:p-6 rounded-3xl bg-white flex flex-col justify-between shine">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 rounded-xl bg-brutalCyan border-2 border-ink flex items-center justify-center font-mono font-bold text-ink shadow-brutal-sm">
                06
              </div>
              <span className="badge-brutal text-[10px] font-mono uppercase px-2.5 py-1 bg-canvas rounded-lg font-bold">Shot List</span>
            </div>
            <h3 className="text-xl font-display font-bold text-ink">Panduan B-Roll HP</h3>
            <p className="text-stone-700 text-xs sm:text-sm mt-2 font-sans leading-relaxed">
              Panduan sudut kamera, pencahayaan alami jendela, dan gesture visual praktis yang bisa direkam sendiri tanpa sewa studio.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t-2 border-ink font-mono text-[11px] text-stone-600 flex items-center gap-2">
            <Icon name="check" className="w-3.5 h-3.5 text-ink" /> Ramah Pemula
          </div>
        </div>

      </div>

    </div>
  </section>

  

  

  

  <section id="cara-kerja" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-grid relative">
    {/* Decorative Theme Elements */}

    <div className="absolute top-6 right-6 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-10 left-8 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="hidden md:block absolute top-1/2 right-4 w-5 h-5 bg-brutalCyan -rotate-12 border border-ink shadow-brutal-sm pointer-events-none"></div>
    <div className="hidden xl:flex absolute top-12 left-8 badge-brutal bg-brutalYellow px-3 py-1.5 rounded-lg items-center gap-2 -rotate-3 z-20"><Icon name="timer" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">3 Menit Isi Brief</span></div>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="badge-brutal px-3.5 py-1 rounded-lg text-xs font-mono font-bold bg-brutalYellow text-ink uppercase">Alur Kerja</span>
        <div className="hidden xl:flex absolute top-12 right-10 badge-brutal bg-white px-3 py-1.5 rounded-lg items-center gap-2 rotate-6 z-20"><Icon name="users" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">Tanpa Meeting Ribet</span></div>
        <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">
          Dari Brief sampai <span className="bg-brutalYellow text-ink px-2.5 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">Siap Posting</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-mono mt-2">Nggak ada meeting panjang atau onboarding ribet. Isi konteks bisnis, sisanya kami kerjakan.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bento-card p-5 sm:p-6 rounded-2xl bg-white">
          <div className="w-10 h-10 rounded-xl bg-brutalYellow border-2 border-ink flex items-center justify-center font-mono font-bold text-ink shadow-brutal-sm mb-3">01</div>
          <h3 className="font-display font-bold text-base sm:text-lg text-ink">Isi Brief</h3>
          <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Ceritakan produk, target pembeli, gaya komunikasi, dan kompetitor acuanmu.</p>
          <span className="font-mono text-[10px] font-bold text-stone-500 block mt-4 pt-2 border-t-2 border-ink">±3 Menit</span>
        </div>
        <div className="bento-card p-5 sm:p-6 rounded-2xl bg-white">
          <div className="w-10 h-10 rounded-xl bg-brutalCyan border-2 border-ink flex items-center justify-center font-mono font-bold text-ink shadow-brutal-sm mb-3">02</div>
          <h3 className="font-display font-bold text-base sm:text-lg text-ink">Kami Petakan Angle</h3>
          <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Brief dibedah jadi sudut pesan, tema, dan ide yang relevan dengan audiensmu.</p>
          <span className="font-mono text-[10px] font-bold text-stone-500 block mt-4 pt-2 border-t-2 border-ink">Riset & Audit</span>
        </div>
        <div className="bento-card p-5 sm:p-6 rounded-2xl bg-white">
          <div className="w-10 h-10 rounded-xl bg-brutalGreen border-2 border-ink flex items-center justify-center font-mono font-bold text-ink shadow-brutal-sm mb-3">03</div>
          <h3 className="font-display font-bold text-base sm:text-lg text-ink">Naskah Disusun</h3>
          <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Script, caption, SEO, dan shot-list dirangkai jadi kalender 30 hari yang utuh.</p>
          <span className="font-mono text-[10px] font-bold text-stone-500 block mt-4 pt-2 border-t-2 border-ink">6 Output</span>
        </div>
        <div className="bento-card p-5 sm:p-6 rounded-2xl bg-brutalYellow/40">
          <div className="w-10 h-10 rounded-xl bg-ink text-brutalYellow border-2 border-ink flex items-center justify-center font-mono font-bold shadow-brutal-sm mb-3">04</div>
          <h3 className="font-display font-bold text-base sm:text-lg text-ink">Terima & Eksekusi</h3>
          <p className="text-xs text-stone-800 font-sans leading-relaxed mt-1.5">Semua output dikirim lewat Notion Workspace dan backup Docs, siap dibagi ke tim.</p>
          <span className="font-mono text-[10px] font-bold text-stone-800 block mt-4 pt-2 border-t-2 border-ink">SLA 24 Jam</span>
        </div>
      </div>

    </div>
  </section>

  

  <section id="komparasi" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-grid relative">
    {/* Decorative Theme Elements */}

    <div className="absolute top-6 right-8 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-10 left-6 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="hidden md:block absolute top-1/4 left-4 w-6 h-6 bg-brutalPink -rotate-12 border border-ink shadow-brutal-sm pointer-events-none"></div>
    <div className="hidden xl:flex absolute bottom-12 right-10 badge-brutal bg-ink text-brutalYellow px-3 py-1.5 rounded-lg items-center gap-2 -rotate-6 z-20"><Icon name="scale" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">Tanpa Basa-Basi</span></div>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="badge-brutal px-3.5 py-1 rounded-lg text-xs font-mono font-bold bg-brutalYellow text-ink uppercase">Perbandingan Jujur</span>
        <div className="hidden xl:flex absolute top-12 left-8 badge-brutal bg-brutalYellow px-3 py-1.5 rounded-lg items-center gap-2 -rotate-3 z-20"><Icon name="thumbs-up" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">No Hidden Fee</span></div>
        <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">
          Karsa <span className="bg-brutalCyan/50 text-ink px-2.5 py-0.5 inline-block rotate-1 border-2 border-ink shadow-brutal-sm">vs Agensi vs AI</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-mono mt-2">Kami tunjukkan perbandingannya apa adanya, biar kamu yang mutusin.</p>
      </div>

      {/* Polished Matrix Bento Table */}
      <div className="compare-container">
        <div className="overflow-x-auto no-scrollbar">
          <table className="w-full text-left border-collapse min-w-[860px]">
            <thead>
              <tr className="font-mono text-xs text-ink uppercase">
                <th className="p-4 bg-sand/60 border-b-2 border-ink w-[20%]">Parameter Kunci</th>
                <th className="p-4 bg-brutalYellow text-ink font-black border-b-2 border-ink w-[27%]">
                  <div className="flex items-center gap-1.5">
                    <Icon name="zap" className="w-4 h-4 text-ink" />
                    <span>Karsa Studio</span>
                  </div>
                </th>
                <th className="p-4 bg-white text-stone-600 border-b-2 border-ink w-[26%]">Agensi / In-House</th>
                <th className="p-4 bg-white text-stone-600 border-b-2 border-ink w-[27%]">
                  <div className="flex items-center gap-1.5">
                    <Icon name="cpu" className="w-4 h-4" />
                    <span>AI Generik</span>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm divide-y-2 divide-ink font-sans">
              <tr className="hover:bg-sand/20 transition">
                <td className="p-4 font-bold font-mono text-ink bg-sand/30">Investasi Biaya</td>
                <td className="p-4 font-black text-ink bg-brutalYellow/20">
                  Rp299.000 (Flat Sekali Bayar)
                </td>
                <td className="p-4 text-stone-700">Rp5 - 15 Juta / Bulan (Kontrak)</td>
                <td className="p-4 text-stone-700">Langganan Rp150 - 450rb / Bln + jam riset & edit manual</td>
              </tr>
              <tr className="hover:bg-sand/20 transition">
                <td className="p-4 font-bold font-mono text-ink bg-sand/30">Kecepatan Mulai (SLA)</td>
                <td className="p-4 font-black text-ink bg-brutalYellow/20">
                  <Icon name="clock" className="w-4 h-4 text-ink inline-block mr-1" /> Maksimal 1x24 Jam Kerja
                </td>
                <td className="p-4 text-stone-700">2 - 4 Minggu Onboarding</td>
                <td className="p-4 text-stone-700">Instan, tapi tiap batch kamu yang prompt & verifikasi sendiri</td>
              </tr>
              <tr className="hover:bg-sand/20 transition">
                <td className="p-4 font-bold font-mono text-ink bg-sand/30">Riset Kompetitor</td>
                <td className="p-4 font-black text-ink bg-brutalYellow/20">
                  Audit 1 Akun Acuan + Gap Angle
                </td>
                <td className="p-4 text-stone-700">Tergantung Proposal, Sering Manual</td>
                <td className="p-4 text-stone-700">Manual &mdash; kamu riset dulu, baru dituangkan lewat prompt</td>
              </tr>
              <tr className="hover:bg-sand/20 transition">
                <td className="p-4 font-bold font-mono text-ink bg-sand/30">Format Deliverable</td>
                <td className="p-4 font-black text-ink bg-brutalYellow/20">
                  Notion Content OS + Naskah Per Detik
                </td>
                <td className="p-4 text-stone-700">File Spreadsheet / Drive Mentah</td>
                <td className="p-4 text-stone-700">Teks mentah tanpa struktur detik & CTA teruji</td>
              </tr>
              <tr className="hover:bg-sand/20 transition">
                <td className="p-4 font-bold font-mono text-ink bg-sand/30">Kontrol Brand Voice</td>
                <td className="p-4 font-black text-ink bg-brutalYellow/20">
                  100% di Tangan Kamu (Sistem Terarah)
                </td>
                <td className="p-4 text-stone-700">Tergantung Tim Kreatif Pihak Ketiga</td>
                <td className="p-4 text-stone-700">Gampang melenceng dari tone & gampang kedengeran generik AI</td>
              </tr>
              <tr className="hover:bg-sand/20 transition">
                <td className="p-4 font-bold font-mono text-ink bg-sand/30">Garansi & Kalibrasi</td>
                <td className="p-4 font-black text-ink bg-brutalYellow/20">
                  <Icon name="shield-check" className="w-4 h-4 text-ink inline-block mr-1" /> Garansi 48 Jam Tone Kalibrasi
                </td>
                <td className="p-4 text-stone-700">Revisi Terbatas, Antre Meeting</td>
                <td className="p-4 text-stone-700">Tanpa garansi &mdash; "kalibrasi" = ngulang prompt manual</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </section>

  <section id="studi-kasus" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-grid relative">
    {/* Decorative Theme Elements */}

    <div className="absolute top-5 left-6 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-8 right-8 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="hidden md:block absolute top-1/3 right-4 w-5 h-5 bg-brutalYellow rotate-12 border border-ink shadow-brutal-sm pointer-events-none"></div>
    <div className="hidden lg:flex absolute top-10 right-8 badge-brutal bg-white px-3 py-1.5 rounded-lg items-center gap-2 rotate-3 z-20"><Icon name="bar-chart-3" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">Real Data</span></div>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <span className="badge-brutal px-3 py-1 rounded-lg text-xs font-mono font-bold bg-ink text-brutalYellow uppercase">Case Study Nyata</span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">
            Output yang Berubah Jadi <span className="bg-brutalGreen/50 text-ink px-2.5 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">Hasil Terukur</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 font-mono max-w-sm leading-relaxed">Dua contoh implementasi: kalender terstruktur bantu tim mengubah produk jadi konten yang konsisten.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div className="bento-card p-5 sm:p-6 rounded-3xl bg-white flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b-2 border-ink mb-4">
            <span className="badge-brutal text-[10px] font-mono font-bold bg-brutalPink/50 px-2.5 py-1 rounded">Case Study 01</span>
            <span className="font-mono text-[10px] sm:text-[11px] font-bold text-stone-500 uppercase">Retail Fashion</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">Brand apparel lokal di Bandung. Sebelumnya cuma upload foto katalog tanpa cerita. Beralih ke 30 video script: konten diarahkan ke detail bahan dan proses pembuatan.</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="p-3 bg-canvas border-2 border-ink rounded-xl">
              <span data-count="240" data-prefix="+" data-suffix="%" className="font-display font-extrabold text-xl sm:text-2xl text-ink block">0</span>
              <span className="font-mono text-[10px] text-stone-600 font-bold uppercase">Saves Rate</span>
            </div>
            <div className="p-3 bg-canvas border-2 border-ink rounded-xl">
              <span data-count="80" data-prefix="-" data-suffix="%" className="font-display font-extrabold text-xl sm:text-2xl text-ink block">0</span>
              <span className="font-mono text-[10px] text-stone-600 font-bold uppercase">Waktu Produksi</span>
            </div>
          </div>
        </div>

        <div className="bento-card p-5 sm:p-6 rounded-3xl bg-brutalYellow/40 flex flex-col">
          <div className="flex items-center justify-between pb-3 border-b-2 border-ink mb-4">
            <span className="badge-brutal text-[10px] font-mono font-bold bg-white px-2.5 py-1 rounded">Case Study 02</span>
            <span className="font-mono text-[10px] sm:text-[11px] font-bold text-stone-600 uppercase">F&B Cold Brew</span>
          </div>
          <p className="text-xs sm:text-sm text-stone-800 font-sans leading-relaxed">Kedai kopi khusus cold brew. Kalender diisi naskah edukasi soal pH kopi plus artikel SEO yang menjawab pertanyaan calon pembeli.</p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="p-3 bg-white border-2 border-ink rounded-xl">
              <span data-count="1800" data-suffix="+/bln" className="font-display font-extrabold text-xl sm:text-2xl text-ink block">0</span>
              <span className="font-mono text-[10px] text-stone-600 font-bold uppercase">Traffic Google</span>
            </div>
            <div className="p-3 bg-white border-2 border-ink rounded-xl">
              <span data-count="30" data-suffix=" Hari" className="font-display font-extrabold text-xl sm:text-2xl text-ink block">0</span>
              <span className="font-mono text-[10px] text-stone-600 font-bold uppercase">Posting Penuh</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-[10px] sm:text-[11px] text-stone-500 font-mono mt-4">Metrik berasal dari implementasi project masing-masing. Hasil bisa berbeda sesuai konteks bisnis dan eksekusi.</p>

    </div>
  </section>

  <section id="testimoni" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-grid relative">
    {/* Decorative Theme Elements */}

    <div className="absolute top-6 right-6 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-10 left-8 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="hidden md:block absolute top-1/2 left-4 w-6 h-6 rounded-full border-2 border-ink bg-brutalCyan rotate-45 pointer-events-none shadow-brutal-sm"></div>
    <div className="hidden xl:flex absolute top-12 right-10 badge-brutal bg-brutalYellow px-3 py-1.5 rounded-lg items-center gap-2 -rotate-6 z-20"><Icon name="star" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">4.9/5 Rating</span></div>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <span className="badge-brutal px-3 py-1 rounded-lg text-xs font-mono font-bold bg-brutalYellow text-ink uppercase">Kata Mereka</span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">
            Dari Tim Kecil yang <span className="bg-brutalPink/50 text-ink px-2.5 py-0.5 inline-block rotate-1 border-2 border-ink shadow-brutal-sm">Berhenti Panik</span>
          </h2>
        </div>
        <div className="flex items-center gap-2.5 font-mono text-xs sm:text-sm font-bold">
          <span className="flex text-brutalYellow text-sm sm:text-base">
            <Icon name="star" className="w-4 h-4 text-ink fill-ink" /><Icon name="star" className="w-4 h-4 text-ink fill-ink" /><Icon name="star" className="w-4 h-4 text-ink fill-ink" /><Icon name="star" className="w-4 h-4 text-ink fill-ink" /><Icon name="star" className="w-4 h-4 text-ink fill-ink" />
          </span>
          <span className="text-ink">4.9/5</span>
          <span className="text-stone-500">dari 40+ review batch</span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bento-card p-5 sm:p-6 rounded-2xl bg-white flex flex-col">
          <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">"Dulu tiap Jumat buka laptop, stare 2 jam, hasil nol. Sekarang script tinggal dibaca di teleprompter. Minggu pertama langsung kebiasaan baru."</p>
          <div className="mt-4 pt-3 border-t-2 border-ink flex items-center gap-3">
            <span className="w-9 h-9 rounded-lg bg-brutalYellow border-2 border-ink flex items-center justify-center font-mono font-bold text-xs text-ink shadow-brutal-sm">RA</span>
            <div>
              <span className="font-display font-bold text-xs text-ink block">Rani A.</span>
              <span className="font-mono text-[10px] text-stone-500">Owner kedai kopi, Bandung</span>
            </div>
          </div>
        </div>

        <div className="bento-card p-5 sm:p-6 rounded-2xl bg-brutalCyan/30 flex flex-col">
          <p className="text-xs sm:text-sm text-stone-800 font-sans leading-relaxed">"4 artikel SEO-nya yang bikin beda. Blog kami akhirnya muncul di halaman 1 Google untuk kata kunci 'skincare untuk kulit sensitif'. Trafik nggak nol lagi."</p>
          <div className="mt-4 pt-3 border-t-2 border-ink flex items-center gap-3">
            <span className="w-9 h-9 rounded-lg bg-white border-2 border-ink flex items-center justify-center font-mono font-bold text-xs text-ink shadow-brutal-sm">SD</span>
            <div>
              <span className="font-display font-bold text-xs text-ink block">Salsa D.</span>
              <span className="font-mono text-[10px] text-stone-600">Founder skincare lokal, Surabaya</span>
            </div>
          </div>
        </div>

        <div className="bento-card p-5 sm:p-6 rounded-2xl bg-white flex flex-col">
          <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">"Awalnya ragu karena ini sistem, bukan jasa lengkap. Ternyata justru itu kelebihannya — kami tetap pegang kendali, tapi nggak mulai dari nol."</p>
          <div className="mt-4 pt-3 border-t-2 border-ink flex items-center gap-3">
            <span className="w-9 h-9 rounded-lg bg-brutalPink/50 border-2 border-ink flex items-center justify-center font-mono font-bold text-xs text-ink shadow-brutal-sm">FP</span>
            <div>
              <span className="font-display font-bold text-xs text-ink block">Fajar P.</span>
              <span className="font-mono text-[10px] text-stone-500">Brand apparel, Yogyakarta</span>
            </div>
          </div>
        </div>
      </div>

      <p className="text-[10px] sm:text-[11px] text-stone-500 font-mono mt-4">Testimoni dikumpulkan dari percakapan WhatsApp & email customer. Nama disamarkan demi privasi.</p>

    </div>
  </section>

  

  <section id="harga" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-grid relative">
    {/* Decorative Theme Elements */}

    <div className="absolute top-6 left-6 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-8 right-8 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="hidden md:block absolute top-1/4 right-4 w-6 h-6 bg-brutalGreen rotate-12 border border-ink shadow-brutal-sm pointer-events-none"></div>
    <div className="hidden xl:flex absolute top-10 right-8 badge-brutal bg-brutalYellow px-3 py-1.5 rounded-lg items-center gap-2 -rotate-3 z-20"><Icon name="tag" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">Flat Rp299rb</span></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
        <div>
          <span className="badge-brutal px-3 py-1 rounded-lg text-xs font-mono font-bold bg-brutalYellow text-ink uppercase">Pricing Transparan</span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">
            Pilih <span className="bg-brutalYellow text-ink px-2.5 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">Ritme Batch</span> Kamu
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1">Satu kali bayar. Tanpa langganan terselubung.</p>
      </div>

      {/* Value Anchor Banner (Anchoring Technique) */}
      <div className="mb-6 sm:mb-8 bento-card p-4 sm:p-6 rounded-2xl bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-3 font-mono text-xs shadow-brutal-sm">
        <div className="flex items-center gap-3">
          <span className="w-11 h-11 rounded-xl bg-brutalGreen/40 border-2 border-ink flex items-center justify-center shadow-brutal-sm shrink-0"><Icon name="gem" className="w-5 h-5 text-ink" /></span>
          <div>
            <p className="font-bold text-ink">Nilai referensi 30 hari konten di pasaran: <span className="font-display text-base">Rp5.300.000</span></p>
            <p className="text-stone-500 font-bold mt-0.5">Kamu mulai dari Rp299.000 &mdash; hemat sampai <span className="text-ink font-black">94%</span>, tanpa kontrak.</p>
          </div>
        </div>
        <span className="badge-brutal text-[10px] font-mono font-bold bg-brutalYellow text-ink px-2.5 py-1 rounded shrink-0">Harga Transparan &bull; Bukan Janji</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">

        {/* 1 Batch */}
        <div className="bento-card p-6 sm:p-8 rounded-3xl bg-white flex flex-col justify-between shine">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-stone-500">Coba Dulu</span>
              <span className="badge-brutal text-[10px] font-mono font-bold bg-canvas px-2 py-0.5 rounded text-ink">Pintu Masuk</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-ink mt-2">1 Batch</h3>
            <p className="text-[11px] font-mono text-stone-500 font-bold mt-0.5">30 Hari Konten &bull; Satu Kali Bayar</p>
            <div className="mt-4 font-mono">
              <span className="block text-[11px] text-stone-500 line-through decoration-2">Nilai referensi Rp5.300.000</span>
              <span className="text-3xl font-display font-bold text-ink">Rp299.000</span>
              <span className="text-xs text-stone-500 block mt-1">&asymp; Rp299.000 / bulan</span>
            </div>
            <ul className="mt-5 space-y-3 text-xs sm:text-sm font-sans text-stone-700">
              <li className="flex gap-2"><span className="text-ink font-bold">✓</span><span>30 Script + 30 Caption + 4 SEO Docs</span></li>
              <li className="flex gap-2"><span className="text-ink font-bold">✓</span><span>Audit Gap Kompetitor + Notion OS</span></li>
              <li className="flex gap-2"><span className="text-ink font-bold">✓</span><span>5 Bonus Stack + Garansi 48 Jam</span></li>
              <li className="flex gap-2"><span className="text-ink font-bold">✓</span><span>SLA Pengiriman 1x24 Jam</span></li>
            </ul>
          </div>
          <button type="button" data-action="open-modal" className="btn-press mt-6 bg-white hover:bg-canvas text-ink text-center py-3.5 rounded-xl font-mono text-xs font-bold transition">Pilih 1 Batch &rarr;</button>
        </div>

        {/* 3 Batch (Featured: Sweet-Spot Decoy) */}
        <div className="bento-card p-6 sm:p-8 rounded-3xl bg-brutalYellow flex flex-col justify-between relative shadow-brutal-xl">
          <span className="deco-float absolute -top-3.5 left-6 badge-brutal bg-ink text-brutalYellow px-3 py-1 rounded-lg text-[10px] font-mono font-bold uppercase" style={{"animationDuration": "4s"}}>Paling Populer</span>
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-stone-700">Ritme 3 Bulan</span>
              <span className="badge-brutal text-[10px] font-mono font-bold bg-ink text-brutalYellow px-2 py-0.5 rounded">HEMAT 11%</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-ink mt-2">3 Batch</h3>
            <p className="text-[11px] font-mono text-stone-700 font-bold mt-0.5">90 Hari Konten &bull; Hemat Rp98.000</p>
            <div className="mt-4 font-mono">
              <span className="block text-[11px] text-stone-600 line-through decoration-2">Rp897.000</span>
              <span className="text-3xl font-display font-bold text-ink">Rp799.000</span>
              <span className="text-xs text-ink font-bold block mt-1">&asymp; Rp266.333 / bulan &bull; Hemat 11%</span>
            </div>
            <ul className="mt-5 space-y-3 text-xs sm:text-sm font-sans text-ink font-medium">
              <li className="flex gap-2"><span className="text-ink font-bold">✓</span><span>Semua isi paket 1 Batch x3</span></li>
              <li className="flex gap-2"><span className="text-ink font-bold">✓</span><span>Prioritas antrean pengerjaan</span></li>
              <li className="flex gap-2"><span className="text-ink font-bold">✓</span><span>Evaluasi performa antar-batch</span></li>
              <li className="flex gap-2"><span className="text-ink font-bold">✓</span><span>Kalibrasi pesan diperpanjang</span></li>
            </ul>
          </div>
          <button type="button" data-action="open-modal" className="btn-press mt-6 bg-ink text-brutalYellow hover:bg-white hover:text-ink text-center py-3.5 rounded-xl font-mono text-xs font-bold transition shadow-brutal">Ambil 3 Batch &rarr;</button>
        </div>

        {/* 6 Batch */}
        <div className="bento-card p-6 sm:p-8 rounded-3xl bg-white flex flex-col justify-between shine">
          <div>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-ink">Full Scale Semester</span>
              <span className="badge-brutal text-[10px] font-mono font-bold bg-brutalGreen/50 px-2 py-0.5 rounded text-ink">HEMAT 17%</span>
            </div>
            <h3 className="font-display font-bold text-2xl text-ink mt-2">6 Batch</h3>
            <p className="text-[11px] font-mono text-stone-500 font-bold mt-0.5">180 Hari Konten &bull; Hemat Rp304.000</p>
            <div className="mt-4 font-mono">
              <span className="block text-[11px] text-stone-500 line-through decoration-2">Rp1.794.000</span>
              <span className="text-3xl font-display font-bold text-ink">Rp1.490.000</span>
              <span className="text-xs text-stone-500 block mt-1">&asymp; Rp248.333 / bulan &bull; Hemat 17%</span>
            </div>
            <ul className="mt-5 space-y-3 text-xs sm:text-sm font-sans text-stone-700">
              <li className="flex gap-2"><span className="text-ink font-bold">✓</span><span>Semua benefit 3 Batch</span></li>
              <li className="flex gap-2"><span className="text-ink font-bold">✓</span><span>1 Sesi strategi 30 menit per 2 bulan</span></li>
              <li className="flex gap-2"><span className="text-ink font-bold">✓</span><span>Laporan tren performa konten</span></li>
              <li className="flex gap-2"><span className="text-ink font-bold">✓</span><span>Harga lock tetap</span></li>
            </ul>
          </div>
          <button type="button" data-action="open-modal" className="btn-press mt-6 bg-white text-ink hover:bg-brutalYellow hover:text-ink text-center py-3.5 rounded-xl font-mono text-xs font-bold transition">Tanya 6 Batch &rarr;</button>
        </div>

      </div>

    </div>
  </section>

  <section id="value-stack" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-grid relative">
    {/* Decorative Theme Elements */}

    <div className="absolute top-5 right-6 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-10 left-8 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="hidden md:block absolute bottom-1/4 left-4 w-5 h-5 bg-brutalYellow -rotate-12 border border-ink shadow-brutal-sm pointer-events-none"></div>
    <div className="hidden lg:flex absolute top-10 left-8 badge-brutal bg-white px-3 py-1.5 rounded-lg items-center gap-2 rotate-3 z-20"><Icon name="trending-down" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">Hemat 94%</span></div>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <span className="badge-brutal px-3 py-1 rounded-lg text-xs font-mono font-bold bg-brutalYellow text-ink uppercase">Rincian Paket</span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">
            Satu Batch, <span className="bg-brutalYellow text-ink px-2.5 py-0.5 inline-block rotate-1 border-2 border-ink shadow-brutal-sm">Semua Fondasi Kontenmu</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 font-mono max-w-sm leading-relaxed">Ini nilai referensi tiap komponen di pasaran. Kamu dapat semuanya dalam satu paket.</p>
      </div>

      <div className="bento-card p-5 sm:p-7 rounded-3xl bg-white shine">
        <div className="space-y-2.5 font-mono text-xs sm:text-sm">
          <div className="flex justify-between py-2 border-b-2 border-ink"><span className="text-stone-700 font-bold">30 Naskah Video Pendek Terstruktur</span><span className="font-bold text-ink">Rp1.500.000</span></div>
          <div className="flex justify-between py-2 border-b-2 border-ink"><span className="text-stone-700 font-bold">30 Caption AIDA & Riset Tagar</span><span className="font-bold text-ink">Rp600.000</span></div>
          <div className="flex justify-between py-2 border-b-2 border-ink"><span className="text-stone-700 font-bold">4 Artikel Blog SEO (1.000 kata)</span><span className="font-bold text-ink">Rp800.000</span></div>
          <div className="flex justify-between py-2 border-b-2 border-ink"><span className="text-stone-700 font-bold">Audit Angle & Gap Kompetitor</span><span className="font-bold text-ink">Rp400.000</span></div>
          <div className="flex justify-between py-2 border-b-2 border-ink"><span className="text-stone-700 font-bold">Notion Dynamic Content OS Template</span><span className="font-bold text-ink">Rp300.000</span></div>
          <div className="flex justify-between py-2 border-b-2 border-ink"><span className="text-stone-700 font-bold">Panduan Shot List B-Roll Kamera HP</span><span className="font-bold text-ink">Rp250.000</span></div>
          <div className="flex justify-between py-2"><span className="text-stone-700 font-bold">5 Bonus Eksklusif Tambahan</span><span className="font-bold text-ink">Rp1.450.000</span></div>
        </div>
        <div className="mt-4 pt-4 border-t-2 border-ink grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
          <div className="p-4 bg-canvas border-2 border-ink rounded-xl">
            <span className="text-[10px] uppercase font-bold text-stone-500 block">Total Nilai Referensi</span>
            <span className="font-display font-extrabold text-xl text-ink">Rp5.300.000</span>
          </div>
          <div className="p-4 bg-brutalYellow border-2 border-ink rounded-xl">
            <span className="text-[10px] uppercase font-bold text-stone-700 block">Harga Sekali Bayar</span>
            <span className="font-display font-extrabold text-xl text-ink">Rp299.000</span>
          </div>
          <div className="p-4 bg-ink border-2 border-ink rounded-xl text-brutalYellow flex items-center justify-center">
            <span className="text-xs sm:text-sm font-bold text-center">Kamu Hemat &gt; 94%</span>
          </div>
        </div>
      </div>

    </div>
  </section>

  <section id="garansi" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-grid relative">
    {/* Decorative Theme Elements */}

    <div className="absolute top-6 left-8 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-10 right-6 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="hidden md:block absolute top-1/2 right-4 w-6 h-6 bg-brutalCyan -rotate-12 border border-ink shadow-brutal-sm pointer-events-none"></div>
    <div className="hidden xl:flex absolute top-12 right-10 badge-brutal bg-brutalGreen/50 px-3 py-1.5 rounded-lg items-center gap-2 rotate-6 z-20"><Icon name="shield-check" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">48 Jam Kalibrasi</span></div>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="badge-brutal px-3.5 py-1 rounded-lg text-xs font-mono font-bold bg-brutalYellow text-ink uppercase">Komitmen Kami</span>
        <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">
          Garansi yang <span className="bg-brutalYellow text-ink px-2.5 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">Tertulis, Bukan Janji</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-mono mt-2">Tiga lapis perlindungan sebelum dan sesudah kamu memesan.</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <div className="bento-card p-5 sm:p-6 rounded-2xl bg-white">
          <div className="w-10 h-10 rounded-xl bg-brutalYellow border-2 border-ink flex items-center justify-center mb-3 shadow-brutal-sm"><Icon name="clock" className="w-5 h-5 text-ink" /></div>
          <h3 className="font-display font-bold text-lg text-ink">SLA 24 Jam</h3>
          <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Deliverable dikirim maksimal 1x24 jam kerja setelah brief lengkap & pembayaran terkonfirmasi.</p>
          <span className="badge-brutal text-[10px] font-mono font-bold bg-brutalPink/50 px-2 py-0.5 rounded mt-3 inline-block">Terlambat? +5 Naskah Gratis</span>
        </div>
        <div className="bento-card p-5 sm:p-6 rounded-2xl bg-brutalCyan/30">
          <div className="w-10 h-10 rounded-xl bg-white border-2 border-ink flex items-center justify-center mb-3 shadow-brutal-sm"><Icon name="refresh-cw" className="w-5 h-5 text-ink" /></div>
          <h3 className="font-display font-bold text-lg text-ink">Kalibrasi 48 Jam</h3>
          <p className="text-xs text-stone-800 font-sans leading-relaxed mt-1.5">Tone, istilah produk, dan sudut pesan bisa dikalibrasi dalam 48 jam pertama. Update kembali ke Notion maksimal 12 jam kerja.</p>
          <span className="badge-brutal text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded mt-3 inline-block">Gratis, Sudah Termasuk</span>
        </div>
        <div className="bento-card p-5 sm:p-6 rounded-2xl bg-white">
          <div className="w-10 h-10 rounded-xl bg-brutalGreen/50 border-2 border-ink flex items-center justify-center mb-3 shadow-brutal-sm"><Icon name="lock" className="w-5 h-5 text-ink" /></div>
          <h3 className="font-display font-bold text-lg text-ink">Hak Cipta & Privasi</h3>
          <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Semua materi jadi milik kamu setelah serah terima. Brief nggak dibagikan ke pihak lain. Opsi NDA tersedia.</p>
          <span className="badge-brutal text-[10px] font-mono font-bold bg-brutalGreen/50 px-2 py-0.5 rounded mt-3 inline-block">100% Milik Kamu</span>
        </div>
      </div>

    </div>
  </section>

  

  

  <section id="calculator" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-grid relative">
    {/* Decorative Theme Elements */}

    <div className="absolute top-5 right-6 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-8 left-8 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="hidden md:block absolute top-1/2 right-4 w-6 h-6 rounded-full border-2 border-ink bg-brutalYellow rotate-45 pointer-events-none shadow-brutal-sm"></div>
    <div className="hidden lg:flex absolute bottom-12 left-8 badge-brutal bg-white px-3 py-1.5 rounded-lg items-center gap-2 rotate-6 z-20"><Icon name="calculator" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">Hitung Hemat</span></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

        {/* Left 5 Cols: Calculator Context & Badges */}
        <div className="lg:col-span-5 space-y-4">
          <span className="badge-brutal px-3 py-1 rounded-lg text-xs font-mono font-bold bg-brutalYellow text-ink uppercase">Kalkulator Penghematan</span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2 leading-tight">
            Berapa Banyak yang <br />
            <span className="bg-brutalYellow text-ink px-2.5 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">Kamu Hemat?</span>
          </h2>
          <p className="text-xs sm:text-sm text-stone-600 font-mono leading-relaxed">
            Bandingkan biaya agensi bulanan atau gaji in-house dengan sistem satu kali bayar per batch Karsa.
          </p>

          <div className="p-4 bg-white border-2 border-ink rounded-2xl shadow-brutal-sm font-mono text-xs space-y-2">
            <div className="flex items-center gap-2 text-ink font-bold">
              <Icon name="check" className="w-4 h-4 text-ink" /> Tanpa Kontrak Mengikat
            </div>
            <div className="flex items-center gap-2 text-ink font-bold">
              <Icon name="check" className="w-4 h-4 text-ink" /> Hak Cipta 100% Milikmu
            </div>
            <div className="flex items-center gap-2 text-ink font-bold">
              <Icon name="check" className="w-4 h-4 text-ink" /> 30 Naskah + Garansi Kalibrasi 48 Jam
            </div>
          </div>

          <div className="p-4 bg-white border-2 border-ink rounded-2xl shadow-brutal-sm font-mono text-xs flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-brutalGreen/40 border-2 border-ink flex items-center justify-center shadow-brutal-sm shrink-0"><Icon name="zap" className="w-5 h-5 text-ink" /></span>
            <div>
              <p className="font-bold text-ink">Setiap Rp1 kamu bayar ke Karsa</p>
              <p className="text-stone-600 font-bold mt-0.5">&asymp; Rp17 nilai konten di pasaran. <span className="text-ink font-black">Bukan jasa murah, tapi cerdas.</span></p>
            </div>
          </div>
        </div>

        {/* Right 7 Cols: Sliders and Savings Display */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono text-xs items-stretch">

          <div className="bento-card p-5 sm:p-6 rounded-3xl bg-white flex flex-col gap-5">
            <div>
              <div className="flex items-center justify-between gap-4 font-bold text-ink mb-2.5">
                <span>Jam Konten / Minggu</span>
                <span id="dispHours" className="text-sm font-bold text-ink bg-canvas border border-ink rounded-lg px-2 py-0.5 shrink-0">6 Jam</span>
              </div>
              <input type="range" id="sliderHours" min="2" max="15" value="6" step="1" data-action="calculator" className="w-full cursor-pointer" />
            </div>

            <div>
              <div className="flex items-center justify-between gap-4 font-bold text-ink mb-2.5">
                <span>Biaya Agensi / In-House</span>
                <span id="dispAgency" className="text-sm font-bold text-ink bg-canvas border border-ink rounded-lg px-2 py-0.5 shrink-0">Rp 3.500.000</span>
              </div>
              <input type="range" id="sliderAgency" min="1500000" max="8000000" value="3500000" step="250000" data-action="calculator" className="w-full cursor-pointer" />
            </div>
          </div>

          <div className="bento-card p-5 sm:p-6 rounded-3xl bg-brutalGreen/40 flex flex-col justify-between gap-4">
            <div className="divide-y-2 divide-ink/60">
              <div className="flex items-center justify-between gap-4 py-2.5 first:pt-0">
                <span className="text-ink font-bold">Waktu Kembali</span>
                <span id="resSavedHours" className="text-sm font-bold font-display text-ink">24 Jam / Bulan</span>
              </div>
              <div className="flex items-center justify-between gap-4 py-2.5">
                <span className="text-ink font-bold">Biaya Karsa</span>
                <span className="text-sm font-bold font-display text-ink">Rp299.000</span>
              </div>
              <div className="flex items-center justify-between gap-4 py-2.5">
                <span className="text-ink font-bold">Kamu Hemat</span>
                <span id="resSavedMoney" className="text-base font-black font-display text-ink">Rp 3.201.000 / Bln</span>
              </div>
              <div className="flex items-center justify-between gap-4 py-2.5">
                <span className="text-ink font-bold">Hemat Setahun</span>
                <span id="resSavedYear" className="text-base font-black font-display text-ink">Rp 38.412.000</span>
              </div>
              <div className="flex items-center justify-between gap-4 py-2.5 pb-0">
                <span className="text-ink font-bold">Biaya per Script</span>
                <span id="resPerScript" className="text-right text-[11px] leading-snug font-bold text-ink">Karsa Rp9.967<br />vs Agensi Rp116.667</span>
              </div>
            </div>

            <button type="button" data-action="open-modal" className="btn-press bg-ink text-brutalYellow hover:bg-white hover:text-ink py-3 rounded-xl font-bold transition flex items-center justify-center gap-2 text-center text-xs sm:text-sm">
              <span>Amankan Batch Sekarang &rarr;</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  </section>

  

  <section id="faq" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-grid relative">
    {/* Decorative Theme Elements */}

    <div className="absolute top-6 left-6 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-10 right-8 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="hidden md:block absolute top-1/2 right-4 w-6 h-6 bg-brutalPink -rotate-12 border border-ink shadow-brutal-sm pointer-events-none"></div>
    <div className="hidden lg:flex absolute bottom-12 left-8 badge-brutal bg-white px-3 py-1.5 rounded-lg items-center gap-2 rotate-6 z-20"><Icon name="message-circle-question" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">5 Pertanyaan</span></div>
    <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10">

      <div className="text-center mb-8">
        <span className="badge-brutal px-3 py-1 rounded-lg text-xs font-mono font-bold bg-brutalYellow text-ink uppercase">Pusat Informasi</span>
        <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">
          <span className="bg-brutalYellow text-ink px-2.5 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">5 Pertanyaan</span> Sebelum Kamu Pesan
        </h2>
      </div>

      <div className="space-y-3">

        <button type="button" className="faq-item bento-card w-full p-4 sm:p-5 rounded-2xl cursor-pointer bg-white text-left" aria-expanded="false" data-action="accordion">
          <div className="flex justify-between items-center gap-3">
            <span className="text-xs font-mono font-bold text-ink">01</span>
            <h3 className="text-xs sm:text-base font-bold text-ink flex-1">Format berkasnya seperti apa?</h3>
            <Icon name="plus" className="w-4 h-4 text-ink transition-transform shrink-0" />
          </div>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-6 hidden leading-relaxed font-sans">
            Kamu menerima tautan Notion Workspace terstruktur per hari (Day 01 - Day 30): script kata-per-kata, caption AIDA, cue visual/audio, dan shot-list B-Roll. Ada juga backup Google Docs (.docx) buat jaga-jaga.
          </p>
        </button>

        <button type="button" className="faq-item bento-card w-full p-4 sm:p-5 rounded-2xl cursor-pointer bg-white text-left" aria-expanded="false" data-action="accordion">
          <div className="flex justify-between items-center gap-3">
            <span className="text-xs font-mono font-bold text-ink">02</span>
            <h3 className="text-xs sm:text-base font-bold text-ink flex-1">Apakah saya harus merekam videonya sendiri?</h3>
            <Icon name="plus" className="w-4 h-4 text-ink transition-transform shrink-0" />
          </div>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-6 hidden leading-relaxed font-sans">
            Ya. Kami yang nyusun naskahnya, kamu yang rekam. Script siap dibaca di teleprompter HP, lengkap dengan panduan visual dan cue audio — tinggal ikutin.
          </p>
        </button>

        <button type="button" className="faq-item bento-card w-full p-4 sm:p-5 rounded-2xl cursor-pointer bg-white text-left" aria-expanded="false" data-action="accordion">
          <div className="flex justify-between items-center gap-3">
            <span className="text-xs font-mono font-bold text-ink">03</span>
            <h3 className="text-xs sm:text-base font-bold text-ink flex-1">Kalau ada naskah yang kurang pas gimana?</h3>
            <Icon name="plus" className="w-4 h-4 text-ink transition-transform shrink-0" />
          </div>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-6 hidden leading-relaxed font-sans">
            Ada garansi kalibrasi 48 jam. Istilah produk atau tone yang kurang pas bisa disesuaikan, dan update masuk ke workspace maksimal 12 jam kerja.
          </p>
        </button>

        <button type="button" className="faq-item bento-card w-full p-4 sm:p-5 rounded-2xl cursor-pointer bg-white text-left" aria-expanded="false" data-action="accordion">
          <div className="flex justify-between items-center gap-3">
            <span className="text-xs font-mono font-bold text-ink">04</span>
            <h3 className="text-xs sm:text-base font-bold text-ink flex-1">Hak cipta materinya gimana?</h3>
            <Icon name="plus" className="w-4 h-4 text-ink transition-transform shrink-0" />
          </div>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-6 hidden leading-relaxed font-sans">
            Semua jadi milik kamu setelah diserahterimakan. Bebas dipublikasikan, dimodifikasi, atau dipakai buat apa pun. Brief kamu juga nggak dibagikan ke pihak lain.
          </p>
        </button>

        <button type="button" className="faq-item bento-card w-full p-4 sm:p-5 rounded-2xl cursor-pointer bg-white text-left" aria-expanded="false" data-action="accordion">
          <div className="flex justify-between items-center gap-3">
            <span className="text-xs font-mono font-bold text-ink">05</span>
            <h3 className="text-xs sm:text-base font-bold text-ink flex-1">Berapa lama pengerjaannya (SLA)?</h3>
            <Icon name="plus" className="w-4 h-4 text-ink transition-transform shrink-0" />
          </div>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-6 hidden leading-relaxed font-sans">
            Maksimal 1x24 jam kerja setelah brief dan pembayaran terkonfirmasi. Kalau telat dari sisi kami, kamu dapat 5 naskah tambahan gratis.
          </p>
        </button>

      </div>

      {/* See More FAQ CTA */}
      <div className="text-center pt-6">
        <a href="/faq" className="btn-press inline-flex items-center gap-2.5 bg-ink text-brutalYellow hover:bg-brutalYellow hover:text-ink px-6 sm:px-7 py-3.5 rounded-xl font-mono text-xs sm:text-sm font-bold transition border-2 border-ink shadow-brutal">
          <span>Lihat Semua Pertanyaan</span>
          <Icon name="arrow-right" className="w-4 h-4" />
        </a>
        <p className="mt-3 text-[11px] font-mono font-bold text-stone-500">Masih ragu? 90 jawaban terinci dalam 9 kategori di pusat FAQ.</p>
      </div>
    </div>
  </section>

  <section className="py-12 sm:py-20 bg-canvas brutal-grid border-b-2 border-ink relative">
    {/* Decorative Theme Elements */}
    <div className="absolute top-6 right-10 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-8 left-10 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="hidden md:block absolute top-1/3 left-6 w-5 h-5 bg-brutalYellow rotate-12 border border-ink shadow-brutal-sm"></div>
    <div className="hidden md:block absolute bottom-1/4 right-6 w-6 h-6 rounded-full border-2 border-ink bg-brutalPink rotate-45 pointer-events-none shadow-brutal-sm"></div>
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <div className="bento-card p-8 sm:p-12 rounded-3xl bg-brutalYellow flex flex-col items-center space-y-4 shine">
        <span className="badge-brutal px-3.5 py-1 rounded-lg text-xs font-mono font-bold bg-ink text-brutalYellow uppercase">Mulai Hari Ini</span>
        <div className="hidden lg:flex absolute top-8 left-10 badge-brutal bg-white px-3 py-1.5 rounded-lg items-center gap-2 -rotate-6 z-20"><Icon name="zap" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">Rp299rb Flat</span></div>
        <div className="hidden lg:flex absolute bottom-8 right-10 badge-brutal bg-ink text-brutalYellow px-3 py-1.5 rounded-lg items-center gap-2 rotate-3 z-20"><Icon name="rocket" className="w-3.5 h-3.5" /><span className="font-mono text-[10px] font-bold">Gas Mulai</span></div>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-ink leading-tight">
          Siap Punya Kalender Konten 30 Hari Tanpa Stres?
        </h2>
        <p className="text-xs sm:text-base text-stone-800 max-w-xl font-medium font-sans">
          Cukup isi brief produk & kompetitor acuan dalam 3 menit. Tim Karsa mengerjakan seluruh naskah dan sistem Notion kamu.
        </p>
        <button type="button" data-action="open-modal" className="btn-press bg-ink text-brutalYellow hover:bg-white hover:text-ink px-8 py-4 rounded-2xl font-mono text-sm font-bold transition flex items-center gap-2.5 mt-2">
          <span>Buka Formulir Brief (Rp299.000)</span>
          <Icon name="arrow-right" className="w-4 h-4" />
        </button>
        <a href="https://wa.me/6281288009920" className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-ink hover:underline">
          <Icon name="message-circle" className="w-4 h-4 text-ink" /> Atau tanya dulu via WhatsApp — dibalas &le; 4 jam kerja
        </a>
      </div>
    </div>
  </section>

  </main>

  {/* FOOTER [POLKADOT] */}
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
            <a href="#" aria-label="Instagram" className="w-7 h-7 rounded-lg bg-canvas border-2 border-ink flex items-center justify-center text-ink shadow-brutal-sm hover:bg-brutalYellow transition"><Icon name="instagram" className="w-3.5 h-3.5" /></a>
            <a href="#" aria-label="WhatsApp" className="w-7 h-7 rounded-lg bg-canvas border-2 border-ink flex items-center justify-center text-ink shadow-brutal-sm hover:bg-brutalGreen transition"><Icon name="message-circle" className="w-3.5 h-3.5" /></a>
            <a href="#" aria-label="YouTube" className="w-7 h-7 rounded-lg bg-canvas border-2 border-ink flex items-center justify-center text-ink shadow-brutal-sm hover:bg-brutalPink transition"><Icon name="youtube" className="w-3.5 h-3.5" /></a>
          </div>
        </div>

        <div className="rounded-2xl bg-white border-2 border-ink shadow-brutal-sm p-4 sm:p-5">
          <h4 className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-[10px] text-ink">
            <span className="w-5 h-5 rounded-md bg-brutalYellow border border-ink flex items-center justify-center font-black text-[9px] shrink-0">01</span>
            Navigasi
          </h4>
          <ul className="mt-3 space-y-2 text-[11px] font-medium">
            <li><a href="#deliverables" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Isi Paket (6 Output)</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="/sistem#pillar-konten" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Pilar Konten 30 Hari</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="#cara-kerja" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Cara Kerja</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="#harga" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Harga & Paket</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="#testimoni" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Testimoni Customer</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
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
            <li><a href="#harga" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Harga & Paket</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="#komparasi" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Karsa vs Agensi vs AI</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="#testimoni" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Testimoni Customer</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="#studi-kasus" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Case Study</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="#garansi" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Garansi & SLA</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="#calculator" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Kalkulator Penghematan</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
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

  {/* ============================================== */}
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
