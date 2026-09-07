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
    const btns = document.querySelectorAll('[data-action="goto-faq"]');
    const h = () => { window.location.href = "/faq"; };
    btns.forEach((b) => b.addEventListener("click", h));
    return () => btns.forEach((b) => b.removeEventListener("click", h));
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between whitespace-nowrap gap-4">
      
      {/* Brand Logo with Shake & Spin Hover */}
      <a href="#main-content" className="flex items-center space-x-2 shrink-0 group">
        <span className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-ink group-hover:-translate-y-0.5 group-hover:rotate-1 transition-transform">Karsa</span>
        <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-brutalYellow text-ink rounded-lg font-bold group-hover:rotate-6 transition-transform">Studio</span>
      </a>

      {/* Desktop Nav with Interactive Capsule Hover */}
      <nav className="hidden xl:flex items-center gap-1 text-xs font-mono font-bold text-ink shrink-0 bg-sand/60 p-1.5 rounded-2xl border-2 border-ink shadow-brutal-sm">

        {/* Mega Dropdown: Isi Paket */}
        <div className="relative group">
          <button type="button" className="nav-pill px-3 py-1.5 rounded-xl flex items-center gap-1 hover:text-ink transition font-bold">
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
                  <a href="#isi-harian" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Peta Konten 30 Hari</span><span className="block text-[9px] text-stone-500 font-mono">Foundation sampai conversion.</span></a>
                  <a href="#cakupan" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Standar Setiap Output</span><span className="block text-[9px] text-stone-500 font-mono">Checklist sebelum dipakai tim.</span></a>
                  <a href="#cara-kerja" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Cara Kerja Karsa</span><span className="block text-[9px] text-stone-500 font-mono">Brief, riset, tulis, kirim.</span></a>
                  <a href="#cakupan" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Scope Layanan</span><span className="block text-[9px] text-stone-500 font-mono">Termasuk & tidak termasuk.</span></a>
                  <a href="#anatomi-script" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Anatomi Script 25 Detik</span><span className="block text-[9px] text-stone-500 font-mono">Hook, value, CTA per detik.</span></a>
                  <a href="#pillar-konten" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Pilar Konten 30 Hari</span><span className="block text-[9px] text-stone-500 font-mono">4 pilar & rasio mingguan.</span></a>
                  <a href="#alur-produksi" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Template Produksi</span><span className="block text-[9px] text-stone-500 font-mono">Senin-Jumat siap eksekusi.</span></a>
                  <a href="#garansi" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Garansi & SLA</span><span className="block text-[9px] text-stone-500 font-mono">24 jam + kalibrasi 48 jam.</span></a>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink">
                  <span className="w-6 h-6 rounded bg-ink text-brutalPink flex items-center justify-center font-mono font-bold text-[10px]"><Icon name="bar-chart-3" className="w-3.5 h-3.5" /></span>
                  <span className="font-bold text-[10px] uppercase tracking-wider">Proof & Keputusan</span>
                </div>
                <div className="space-y-1 mt-2">
                  <a href="#compare-scripts" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Bandingkan Kualitas</span><span className="block text-[9px] text-stone-500 font-mono">Script generik vs Karsa.</span></a>
                  <a href="#studi-kasus" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Case Study Nyata</span><span className="block text-[9px] text-stone-500 font-mono">Metrik dari implementasi.</span></a>
                  <a href="#preview" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Contoh Output</span><span className="block text-[9px] text-stone-500 font-mono">Script, caption, dan SEO.</span></a>
                  <a href="#calculator" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Kalkulator Hemat</span><span className="block text-[9px] text-stone-500 font-mono">Bandingkan biaya per batch.</span></a>
                  <a href="#komparasi" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Karsa vs Agensi vs In-house</span><span className="block text-[9px] text-stone-500 font-mono">Tabel perbandingan jujur.</span></a>
                  <a href="#harga" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Harga & Paket</span><span className="block text-[9px] text-stone-500 font-mono">1, 3, atau 6 batch.</span></a>
                  <a href="#testimoni" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Testimoni Customer</span><span className="block text-[9px] text-stone-500 font-mono">Kata mereka yang sudah pakai.</span></a>
                  <a href="#bonus" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Lihat Semua Bonus &rarr;</span><span className="block text-[9px] text-stone-500 font-mono">5 bonus sudah termasuk.</span></a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Dropdown: Untuk Bisnis */}
        <div className="relative group">
          <button type="button" className="nav-pill px-3 py-1.5 rounded-xl flex items-center gap-1 hover:text-ink transition font-bold">
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
                  <a href="#preview" className="block p-2 rounded-xl hover:bg-brutalGreen/30 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">F&B & Cafe</span><span className="block text-[9px] text-stone-500 font-mono">Menu, review, edukasi.</span></a>
                  <a href="#preview" className="block p-2 rounded-xl hover:bg-brutalGreen/30 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Skincare & Beauty</span><span className="block text-[9px] text-stone-500 font-mono">Ingredient, myth-busting.</span></a>
                  <a href="#preview" className="block p-2 rounded-xl hover:bg-brutalGreen/30 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Fashion & Apparel</span><span className="block text-[9px] text-stone-500 font-mono">Styling, fit, detail bahan.</span></a>
                  <a href="#preview" className="block p-2 rounded-xl hover:bg-brutalGreen/30 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Jasa & Edukasi</span><span className="block text-[9px] text-stone-500 font-mono">Konsultan, klinik, les.</span></a>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink">
                  <span className="w-6 h-6 rounded bg-ink text-brutalYellow flex items-center justify-center font-mono font-bold text-[10px]"><Icon name="target" className="w-3.5 h-3.5" /></span>
                  <span className="font-bold text-[10px] uppercase tracking-wider">Tujuan Konten</span>
                </div>
                <div className="space-y-1 mt-2">
                  <a href="#kenapa-video" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Edukasi & Awareness</span><span className="block text-[9px] text-stone-500 font-mono">Buat audiens lebih paham.</span></a>
                  <a href="#kenapa-video" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Leads & DM</span><span className="block text-[9px] text-stone-500 font-mono">Arahkan percakapan baru.</span></a>
                  <a href="#harga" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Penjualan Produk</span><span className="block text-[9px] text-stone-500 font-mono">Perjelas value dan CTA.</span></a>
                  <a href="#cocok-untuk" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Cek Kecocokan</span><span className="block text-[9px] text-stone-500 font-mono">Lihat apakah Karsa untukmu.</span></a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Dropdown: Layanan */}
        <div className="relative group">
          <button type="button" className="nav-pill px-3 py-1.5 rounded-xl flex items-center gap-1 hover:text-ink transition font-bold">
            <span>Layanan</span>
            <Icon name="chevron-down" className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-200" />
          </button>

          <div className="dropdown-menu absolute top-full left-0 mt-2 w-72 max-w-[calc(100vw-2rem)] bg-white border-2 border-ink rounded-2xl p-3 shadow-brutal-lg z-50 whitespace-normal">
            <div className="space-y-1">
              <a href="#deliverables" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink">
                <span className="w-6 h-6 rounded bg-brutalYellow text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0"><Icon name="clapperboard" className="w-3.5 h-3.5" /></span>
                <div><span className="block font-bold text-xs">Jasa Konten Video UMKM</span><span className="block text-[9px] text-stone-500 font-mono">Kalender 30 hari lengkap.</span></div>
              </a>
              <a href="#modul-video" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink">
                <span className="w-6 h-6 rounded bg-brutalCyan text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0"><Icon name="file-text" className="w-3.5 h-3.5" /></span>
                <div><span className="block font-bold text-xs">Jasa Script Video TikTok</span><span className="block text-[9px] text-stone-500 font-mono">30 naskah kata-per-kata.</span></div>
              </a>
              <a href="#cara-kerja" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink">
                <span className="w-6 h-6 rounded bg-brutalGreen text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0"><Icon name="users" className="w-3.5 h-3.5" /></span>
                <div><span className="block font-bold text-xs">Jasa Content Creator UMKM</span><span className="block text-[9px] text-stone-500 font-mono">Tanpa gaji bulanan.</span></div>
              </a>
              <a href="#modul-seo" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink">
                <span className="w-6 h-6 rounded bg-brutalPink text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0"><Icon name="search" className="w-3.5 h-3.5" /></span>
                <div><span className="block font-bold text-xs">Jasa Artikel SEO</span><span className="block text-[9px] text-stone-500 font-mono">4 artikel 1.000 kata.</span></div>
              </a>
              <a href="#pillar-konten" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink">
                <span className="w-6 h-6 rounded bg-brutalYellow/60 text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0"><Icon name="instagram" className="w-3.5 h-3.5" /></span>
                <div><span className="block font-bold text-xs">Paket Konten Instagram</span><span className="block text-[9px] text-stone-500 font-mono">Reels, caption, kalender.</span></div>
              </a>
            </div>
          </div>
        </div>

        <a href="#harga" className="nav-pill px-3 py-1.5 rounded-xl transition">Harga</a>
        <a href="#testimoni" className="nav-pill px-3 py-1.5 rounded-xl transition">Testimoni</a>
        <a href="#cara-kerja" className="nav-pill px-3 py-1.5 rounded-xl transition">Cara Kerja</a>
        <a href="#faq" className="nav-pill px-3 py-1.5 rounded-xl transition">FAQ</a>
      </nav>

      {/* Right CTAs & Live Slot Indicator */}
      <div className="flex items-center space-x-2.5 sm:space-x-3 shrink-0">
        
        {/* Live Batch Slot Pulse Indicator */}
        <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm font-mono text-[11px] font-bold">
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
    <div id="mobileMenu" className="hidden xl:hidden bg-canvas brutal-dots border-b-2 border-ink px-4 pt-3 pb-6 space-y-2.5 font-bold text-xs font-mono text-ink shadow-brutal-lg max-h-[85vh] overflow-y-auto">
      <a href="#deliverables" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Isi Paket (6 Output)</a>
      <a href="#anatomi-script" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Anatomi Script</a>
      <a href="#pillar-konten" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-brutalYellow border-2 border-ink shadow-brutal-sm">Pilar Konten 30 Hari</a>
      <a href="#cara-kerja" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Cara Kerja</a>
      <a href="#testimoni" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Testimoni Customer</a>
      <a href="#harga" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Harga & Paket</a>
      <a href="#garansi" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Garansi & SLA</a>
      <a href="#calculator" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Kalkulator Penghematan</a>
      <a href="#faq" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">FAQ & Bantuan</a>
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
  <section className="pt-8 pb-14 sm:pt-16 sm:pb-24 border-b-2 border-ink bg-canvas brutal-dots relative overflow-hidden">

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
  <div className="py-3 sm:py-3.5 border-b-2 border-ink bg-brutalYellow overflow-hidden relative">
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
        <div className="bento-card p-4 sm:p-6 rounded-2xl bg-brutalYellow text-center">
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

  {/* ============================================== */}
  {/* SECTION: THE PROBLEM [RETRO GRID] */}
  {/* ============================================== */}
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

          <div className="bento-card p-5 sm:p-6 rounded-3xl bg-brutalYellow relative group flex flex-col sm:flex-row sm:items-center justify-between gap-4">
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

  {/* ============================================== */}
  {/* SECTION: KENAPA VIDEO PENDEK [POLKADOT] */}
  {/* ============================================== */}
  <section id="kenapa-video" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-dots relative">
    {/* Decorative Theme Elements */}

    <div className="absolute top-5 right-6 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-8 left-5 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="hidden md:block absolute top-1/2 right-4 w-5 h-5 bg-brutalPink rotate-12 border border-ink shadow-brutal-sm pointer-events-none"></div>
    <div className="hidden lg:flex absolute top-10 left-8 badge-brutal bg-white px-3 py-1.5 rounded-lg items-center gap-2 -rotate-3 z-20"><Icon name="trending-up" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">4x Jangkauan</span></div>
    <div className="hidden lg:flex absolute bottom-10 right-10 badge-brutal bg-brutalYellow px-3 py-1.5 rounded-lg items-center gap-2 rotate-6 z-20"><Icon name="timer" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">15-30s Durasi</span></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <span className="badge-brutal px-3 py-1 rounded-lg text-xs font-mono font-bold bg-ink text-brutalYellow uppercase">Pertanyaan Pertama</span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">
            Kenapa Video Pendek, <span className="bg-brutalCyan text-ink px-2.5 py-0.5 inline-block rotate-1 border-2 border-ink shadow-brutal-sm">Bukan Foto Statis?</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 font-mono max-w-sm leading-relaxed">Algoritma TikTok, Reels, dan Shorts memprioritaskan video yang ditonton sampai habis. Untuk UMKM artinya satu hal: konsisten bikin video.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bento-card p-5 rounded-2xl bg-white flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-ink text-brutalYellow flex items-center justify-center mb-3 shadow-brutal-sm">
              <Icon name="timer" className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base sm:text-lg text-ink">Retention = Sinyal</h3>
            <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Video 15-30 detik yang ditonton penuh memberi sinyal kuat ke algoritma. Postingan berikutnya dapat jangkauan lebih besar.</p>
          </div>
        </div>

        <div className="bento-card p-5 rounded-2xl bg-white flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-ink text-white flex items-center justify-center mb-3 shadow-brutal-sm">
              <Icon name="message-circle" className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base sm:text-lg text-ink">DM = Pembeli Hangat</h3>
            <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Tiap video ditutup ajakan DM. Orang yang chat duluan = calon pembeli yang bisa kamu follow-up langsung.</p>
          </div>
        </div>

        <div className="bento-card p-5 rounded-2xl bg-brutalYellow/40 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-ink text-white flex items-center justify-center mb-3 shadow-brutal-sm">
              <Icon name="smartphone" className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base sm:text-lg text-ink">HP Kamu Cukup</h3>
            <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Nggak perlu kamera sinema. Panduan B-Roll Karsa dibuat buat kamera belakang HP yang kamu punya hari ini.</p>
          </div>
        </div>

        <div className="bento-card p-5 rounded-2xl bg-white flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-sand border border-ink text-ink flex items-center justify-center mb-3 shadow-brutal-sm">
              <Icon name="repeat" className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base sm:text-lg text-ink">Konsisten &gt; Viral</h3>
            <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Satu video 1 juta views gak bangun toko. Tiga puluh video konsisten dengan pesan sama — itu yang bikin orang percaya.</p>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-4 sm:p-5 bg-white border-2 border-ink rounded-2xl shadow-brutal-sm flex items-center gap-3.5 font-mono">
          <span className="font-display font-extrabold text-2xl sm:text-3xl text-ink">4x</span>
          <span className="text-[11px] sm:text-xs text-stone-700 font-bold leading-snug">Jangkauan video vs foto statis di feed yang sama</span>
        </div>
        <div className="p-4 sm:p-5 bg-white border-2 border-ink rounded-2xl shadow-brutal-sm flex items-center gap-3.5 font-mono">
          <span className="font-display font-extrabold text-2xl sm:text-3xl text-ink">15-30s</span>
          <span className="text-[11px] sm:text-xs text-stone-700 font-bold leading-snug">Durasi ideal yang ditonton sampai selesai</span>
        </div>
      </div>

    </div>
  </section>

  {/* ============================================== */}
  {/* SECTION: SCRIPT COMPARISON [POLKADOT] */}
  {/* ============================================== */}
  <section id="compare-scripts" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-dots relative">
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

  {/* ============================================== */}
  {/* SECTION: ANATOMI SCRIPT [RETRO GRID] */}
  {/* ============================================== */}
  <section id="anatomi-script" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-grid relative">
    {/* Decorative Theme Elements */}

    <div className="absolute top-6 left-8 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-10 right-6 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="hidden md:block absolute top-1/3 right-4 w-6 h-6 rounded-full border-2 border-ink bg-brutalCyan rotate-45 pointer-events-none shadow-brutal-sm"></div>
    <div className="hidden xl:flex absolute top-12 right-10 badge-brutal bg-brutalYellow px-3 py-1.5 rounded-lg items-center gap-2 rotate-3 z-20"><Icon name="clock" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">25 Detik Pola</span></div>
    <div className="hidden lg:flex absolute bottom-12 left-8 badge-brutal bg-ink text-brutalYellow px-3 py-1.5 rounded-lg items-center gap-2 -rotate-6 z-20"><Icon name="zap" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">Teruji</span></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="h-2 w-full bg-white border-2 border-ink rounded-full overflow-hidden mb-8"><div className="timeline-fill h-full bg-gradient-to-r from-brutalYellow via-brutalCyan to-brutalPink"></div></div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <span className="badge-brutal px-3 py-1 rounded-lg text-xs font-mono font-bold bg-brutalYellow text-ink uppercase">Di Balik Layar</span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">
            Anatomi 25 Detik yang <span className="bg-brutalPink/50 text-ink px-2.5 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">Bikin Orang Berhenti Scroll</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 font-mono max-w-sm leading-relaxed">Setiap naskah Karsa mengikuti struktur waktu ini — ada alasan di balik tiap detiknya.</p>
      </div>

      {/* 4 Time Blocks */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bento-card p-5 rounded-2xl bg-white">
          <span className="font-mono text-[10px] font-bold text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">00:00 - 00:03</span>
          <h3 className="font-display font-bold text-base sm:text-lg text-ink mt-3">HOOK</h3>
          <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Pernyataan kontras, pertanyaan, atau klaim yang memicu penasaran dalam 3 detik pertama.</p>
        </div>
        <div className="bento-card p-5 rounded-2xl bg-white">
          <span className="font-mono text-[10px] font-bold text-ink bg-brutalCyan/60 px-2 py-0.5 rounded border border-ink">00:03 - 00:10</span>
          <h3 className="font-display font-bold text-base sm:text-lg text-ink mt-3">KONTEKS</h3>
          <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Siapa ini untuk dan masalah apa yang dibuka. Audiens ngerasa "ini cerita gue".</p>
        </div>
        <div className="bento-card p-5 rounded-2xl bg-white">
          <span className="font-mono text-[10px] font-bold text-ink bg-brutalGreen/50 px-2 py-0.5 rounded border border-ink">00:10 - 00:18</span>
          <h3 className="font-display font-bold text-base sm:text-lg text-ink mt-3">VALUE</h3>
          <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Solusi, cara kerja, dan bukti. Disampaikan dengan visual yang gampang diikuti.</p>
        </div>
        <div className="bento-card p-5 rounded-2xl bg-brutalYellow/40">
          <span className="font-mono text-[10px] font-bold text-ink bg-white px-2 py-0.5 rounded border border-ink">00:18 - 00:25</span>
          <h3 className="font-display font-bold text-base sm:text-lg text-ink mt-3">CTA</h3>
          <p className="text-xs text-stone-800 font-sans leading-relaxed mt-1.5">Satu ajakan jelas: simpan, komentar, DM, atau kunjungi profil. Gak pernah dua-duanya.</p>
        </div>
      </div>

      {/* 3 Psychology Cards */}
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 sm:p-5 bg-white border-2 border-ink rounded-2xl shadow-brutal-sm">
          <span className="font-mono text-[10px] font-bold text-ink bg-canvas px-2 py-0.5 rounded border border-ink">PSIKOLOGI 01</span>
          <h3 className="font-display font-bold text-ink mt-2">Curiosity Gap</h3>
          <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Hook membuka pertanyaan di kepala penonton tanpa langsung menjawabnya. Otak memaksa mereka bertahan.</p>
        </div>
        <div className="p-4 sm:p-5 bg-white border-2 border-ink rounded-2xl shadow-brutal-sm">
          <span className="font-mono text-[10px] font-bold text-ink bg-canvas px-2 py-0.5 rounded border border-ink">PSIKOLOGI 02</span>
          <h3 className="font-display font-bold text-ink mt-2">Loss Aversion</h3>
          <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">"Jangan beli ini sebelum tahu..." memicu takut ketinggalan informasi penting — retention naik drastis.</p>
        </div>
        <div className="p-4 sm:p-5 bg-white border-2 border-ink rounded-2xl shadow-brutal-sm">
          <span className="font-mono text-[10px] font-bold text-ink bg-canvas px-2 py-0.5 rounded border border-ink">PSIKOLOGI 03</span>
          <h3 className="font-display font-bold text-ink mt-2">Satu Pesan, Satu Aksi</h3>
          <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Penonton mengingat satu hal per video. CTA tunggal bikin langkah berikutnya nggak ambigu.</p>
        </div>
      </div>

    </div>
  </section>

  {/* ============================================== */}
  {/* SECTION: 6 OUTPUT UTAMA [RETRO GRID] */}
  {/* ============================================== */}
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

        {/* Output 01 */}
        <div id="modul-video" className="bento-card p-6 rounded-3xl bg-brutalYellow flex flex-col justify-between shine">
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
        <div id="modul-caption" className="bento-card p-6 rounded-3xl bg-brutalCyan/40 flex flex-col justify-between shine">
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
        <div id="modul-seo" className="bento-card p-6 rounded-3xl bg-brutalGreen/40 flex flex-col justify-between shine">
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
        <div id="modul-audit" className="bento-card p-6 rounded-3xl bg-brutalPink/40 flex flex-col justify-between shine">
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
        <div id="modul-notion" className="bento-card p-6 rounded-3xl bg-white flex flex-col justify-between shine">
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
        <div id="modul-shotlist" className="bento-card p-6 rounded-3xl bg-white flex flex-col justify-between shine">
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

  {/* ============================================== */}
  {/* SECTION: 4 CONTENT PILLARS [POLKADOT] */}
  {/* ============================================== */}
  <section id="pillar-konten" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-dots relative">
    {/* Decorative Theme Elements */}

    <div className="absolute top-6 left-6 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-8 right-8 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="hidden md:block absolute top-1/4 right-4 w-5 h-5 bg-brutalPink -rotate-12 border border-ink shadow-brutal-sm pointer-events-none"></div>
    <div className="hidden lg:flex absolute top-10 right-8 badge-brutal bg-brutalYellow px-3 py-1.5 rounded-lg items-center gap-2 -rotate-3 z-20"><Icon name="percent" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">70/30 Rasio</span></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <span className="badge-brutal px-3 py-1 rounded-lg text-xs font-mono font-bold bg-brutalYellow text-ink uppercase">Rasio Teruji</span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">
            <span className="bg-brutalPink/50 text-ink px-2.5 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">4 Pilar Konten</span> 30 Hari
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 font-mono max-w-sm leading-relaxed">Rasio seimbang: 70% edukasi & solusi, 30% direct conversion. Feed nggak jadi brosur iklan.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bento-card p-5 rounded-2xl bg-white flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-ink text-brutalYellow flex items-center justify-center mb-3 shadow-brutal-sm">
              <Icon name="book-open" className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base sm:text-lg text-ink">Edukasi Solusi</h3>
            <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Jawab pertanyaan calon pembeli & bangun otoritas brand.</p>
          </div>
          <span className="font-mono text-[10px] font-bold text-stone-500 block mt-4 pt-2 border-t-2 border-ink">Porsi: 40% Feed</span>
        </div>

        <div className="bento-card p-5 rounded-2xl bg-white flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-ink text-white flex items-center justify-center mb-3 shadow-brutal-sm">
              <Icon name="message-square" className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base sm:text-lg text-ink">Storytelling Nyata</h3>
            <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Proses dapur brand & kisah autentik customer.</p>
          </div>
          <span className="font-mono text-[10px] font-bold text-stone-500 block mt-4 pt-2 border-t-2 border-ink">Porsi: 30% Feed</span>
        </div>

        <div className="bento-card p-5 rounded-2xl bg-brutalYellow/40 flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-ink text-white flex items-center justify-center mb-3 shadow-brutal-sm">
              <Icon name="tag" className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base sm:text-lg text-ink">Penawaran Spesial</h3>
            <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Direct CTA, promo produk, dan dorongan leads ke DM.</p>
          </div>
          <span className="font-mono text-[10px] font-bold text-stone-800 block mt-4 pt-2 border-t-2 border-ink">Porsi: 15% Feed</span>
        </div>

        <div className="bento-card p-5 rounded-2xl bg-white flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-sand border border-ink text-ink flex items-center justify-center mb-3 shadow-brutal-sm">
              <Icon name="scale" className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base sm:text-lg text-ink">Mitos vs Fakta</h3>
            <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Bongkar persepsi keliru industri dengan format debat.</p>
          </div>
          <span className="font-mono text-[10px] font-bold text-stone-500 block mt-4 pt-2 border-t-2 border-ink">Porsi: 15% Feed</span>
        </div>
      </div>

      {/* Weekly Ratio Bar */}
      <div className="mt-5 bento-card p-5 sm:p-6 rounded-2xl bg-white">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase text-stone-500">Rasio Mingguan yang Kami Terapkan</span>
          <span className="badge-brutal text-[10px] font-mono font-bold bg-brutalYellow px-2.5 py-0.5 rounded">Aturan: 70% Value, 30% Promosi</span>
        </div>
        <div className="flex h-7 sm:h-8 w-full border-2 border-ink rounded-lg overflow-hidden font-mono text-[9px] sm:text-[10px] font-bold">
          <span className="r-seg flex items-center justify-center bg-brutalYellow text-ink" style={{"--seg-w": "40%", "width": "40%"}}>Edukasi 12/30</span>
          <span className="r-seg flex items-center justify-center bg-brutalCyan/60 text-ink border-x-2 border-ink" style={{"--seg-w": "30%", "width": "30%"}}>Cerita 9/30</span>
          <span className="r-seg flex items-center justify-center bg-brutalPink/60 text-ink border-r-2 border-ink" style={{"--seg-w": "15%", "width": "15%"}}>Promo 5/30</span>
          <span className="r-seg flex items-center justify-center bg-sand text-stone-700" style={{"--seg-w": "15%", "width": "15%"}}>Mitos 4/30</span>
        </div>
        <p className="text-[11px] text-stone-600 font-mono mt-3">Rasio ini menyesuaikan tujuan brief kamu (edukasi, leads, atau penjualan) dan dijelaskan per hari di dalam kalender.</p>
      </div>
    </div>
  </section>

  {/* ============================================== */}
  {/* SECTION: ISI HARIAN [RETRO GRID] */}
  {/* ============================================== */}
  <section id="isi-harian" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-grid relative">
    {/* Decorative Theme Elements */}

    <div className="absolute top-5 right-8 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-8 left-6 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="hidden md:block absolute bottom-1/3 right-6 w-6 h-6 bg-brutalGreen rotate-12 border border-ink shadow-brutal-sm pointer-events-none"></div>
    <div className="hidden xl:flex absolute top-10 left-8 badge-brutal bg-white px-3 py-1.5 rounded-lg items-center gap-2 rotate-3 z-20"><Icon name="calendar" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">4 Fase</span></div>
    <div className="hidden lg:flex absolute bottom-10 right-8 badge-brutal bg-brutalCyan/60 px-3 py-1.5 rounded-lg items-center gap-2 -rotate-6 z-20"><Icon name="layers" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">Day 01-30</span></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <span className="badge-brutal px-3 py-1 rounded-lg text-xs font-mono font-bold bg-brutalYellow text-ink uppercase">Bukan Ide Acak</span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">
            Setiap Hari Punya <span className="bg-brutalYellow text-ink px-2.5 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">Peran dalam Kalender</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 font-mono max-w-sm leading-relaxed">30 hari disusun berurutan: kenalkan masalah, bangun kepercayaan, tunjukkan solusi, arahkan aksi.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bento-card p-5 rounded-2xl bg-white flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] font-bold bg-ink text-brutalYellow px-2 py-0.5 rounded border border-ink">DAY 01-07</span>
              <span className="font-display font-extrabold text-2xl text-ink">01</span>
            </div>
            <h3 className="font-display font-bold text-base sm:text-lg text-ink">FOUNDATION</h3>
            <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Kenalkan masalah: pain point utama, mitos, dan pertanyaan yang sering muncul dari calon pembeli.</p>
          </div>
          <span className="font-mono text-[10px] font-bold text-stone-500 block mt-4 pt-2 border-t-2 border-ink">Fase: Kenalan</span>
        </div>

        <div className="bento-card p-5 rounded-2xl bg-brutalCyan/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] font-bold bg-ink text-brutalYellow px-2 py-0.5 rounded border border-ink">DAY 08-15</span>
              <span className="font-display font-extrabold text-2xl text-ink">02</span>
            </div>
            <h3 className="font-display font-bold text-base sm:text-lg text-ink">EDUCATION</h3>
            <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Bangun kepercayaan: breakdown bahan atau proses, perbandingan, bukti yang bikin value produk masuk akal.</p>
          </div>
          <span className="font-mono text-[10px] font-bold text-stone-600 block mt-4 pt-2 border-t-2 border-ink">Fase: Percaya</span>
        </div>

        <div className="bento-card p-5 rounded-2xl bg-brutalGreen/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] font-bold bg-ink text-brutalYellow px-2 py-0.5 rounded border border-ink">DAY 16-23</span>
              <span className="font-display font-extrabold text-2xl text-ink">03</span>
            </div>
            <h3 className="font-display font-bold text-base sm:text-lg text-ink">PROOF</h3>
            <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Tunjukkan solusi: demo, use case, objection handling, dan social proof yang bantu audiens bayangin hasilnya.</p>
          </div>
          <span className="font-mono text-[10px] font-bold text-stone-600 block mt-4 pt-2 border-t-2 border-ink">Fase: Bukti</span>
        </div>

        <div className="bento-card p-5 rounded-2xl bg-brutalYellow/40 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] font-bold bg-ink text-brutalYellow px-2 py-0.5 rounded border border-ink">DAY 24-30</span>
              <span className="font-display font-extrabold text-2xl text-ink">04</span>
            </div>
            <h3 className="font-display font-bold text-base sm:text-lg text-ink">CONVERSION</h3>
            <p className="text-xs text-stone-800 font-sans leading-relaxed mt-1.5">Arahkan aksi: penawaran, FAQ, urgency yang wajar, dan CTA buat bantu audiens ambil keputusan.</p>
          </div>
          <span className="font-mono text-[10px] font-bold text-stone-800 block mt-4 pt-2 border-t-2 border-ink">Fase: Beli</span>
        </div>
      </div>

      {/* Daily Example Card */}
      <div className="mt-5 bento-card p-5 sm:p-6 rounded-3xl bg-white">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-ink mb-4">
          <span className="font-mono text-[10px] sm:text-[11px] font-bold uppercase text-stone-500 flex items-center gap-2">
            <Icon name="calendar" className="w-4 h-4 text-ink" /> Contoh Isi Satu Hari di Notion
          </span>
          <span className="badge-brutal text-[10px] font-mono font-bold bg-brutalPink/50 px-2.5 py-0.5 rounded">DAY 04 / EDUKASI</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          <div className="p-3.5 bg-canvas border-2 border-ink rounded-xl">
            <span className="font-mono text-[10px] font-bold text-ink uppercase block">VIDEO SCRIPT</span>
            <p className="text-[11px] text-stone-700 font-sans mt-1.5 leading-relaxed">Hook, voiceover per detik, arahan visual, cue audio, dan CTA.</p>
          </div>
          <div className="p-3.5 bg-canvas border-2 border-ink rounded-xl">
            <span className="font-mono text-[10px] font-bold text-ink uppercase block">CAPTION AIDA</span>
            <p className="text-[11px] text-stone-700 font-sans mt-1.5 leading-relaxed">Caption siap copy-paste dengan ajakan menyimpan, berkomentar, atau kunjungi profil.</p>
          </div>
          <div className="p-3.5 bg-canvas border-2 border-ink rounded-xl">
            <span className="font-mono text-[10px] font-bold text-ink uppercase block">SHOT LIST</span>
            <p className="text-[11px] text-stone-700 font-sans mt-1.5 leading-relaxed">Urutan pengambilan gambar yang bisa direkam dengan HP dan alat yang ada.</p>
          </div>
        </div>
      </div>

    </div>
  </section>

  {/* ============================================== */}
  {/* SECTION: ALUR PRODUKSI MINGGUAN [POLKADOT] */}
  {/* ============================================== */}
  <section id="alur-produksi" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-dots relative">
    {/* Decorative Theme Elements */}

    <div className="absolute top-6 left-8 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-8 right-6 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="hidden md:block absolute top-1/3 left-4 w-6 h-6 rounded-full border-2 border-ink bg-brutalYellow rotate-45 pointer-events-none shadow-brutal-sm"></div>
    <div className="hidden lg:flex absolute top-10 right-10 badge-brutal bg-brutalGreen/50 px-3 py-1.5 rounded-lg items-center gap-2 rotate-6 z-20"><Icon name="clock" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">±10 Jam / Bulan</span></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <span className="badge-brutal px-3 py-1 rounded-lg text-xs font-mono font-bold bg-brutalYellow text-ink uppercase">Beban Kerja Terbagi</span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">
            Template Produksi <span className="bg-brutalCyan/50 text-ink px-2.5 py-0.5 inline-block rotate-1 border-2 border-ink shadow-brutal-sm">Satu Minggu</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 font-mono max-w-sm leading-relaxed">30 naskah sudah membagi beban. Tim kamu tinggal ngikutin ritme produksi ini: 4 hari kerja, 1 hari cadangan.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bento-card p-5 rounded-2xl bg-white">
          <span className="font-mono text-[10px] font-bold text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">SENIN</span>
          <h3 className="font-display font-bold text-base text-ink mt-3">Rekam Batch</h3>
          <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Rekam 4-6 video sekali jalan pakai teleprompter. Satu sesi 2-3 jam.</p>
          <span className="font-mono text-[10px] font-bold text-stone-500 block mt-3 pt-2 border-t-2 border-ink">Day 01-06</span>
        </div>
        <div className="bento-card p-5 rounded-2xl bg-white">
          <span className="font-mono text-[10px] font-bold text-ink bg-brutalCyan/60 px-2 py-0.5 rounded border border-ink">SELASA</span>
          <h3 className="font-display font-bold text-base text-ink mt-3">Edit & Caption</h3>
          <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Potong di CapCut, tempel caption AIDA yang sudah jadi. Selesai lebih cepat.</p>
          <span className="font-mono text-[10px] font-bold text-stone-500 block mt-3 pt-2 border-t-2 border-ink">Day 01-06</span>
        </div>
        <div className="bento-card p-5 rounded-2xl bg-white">
          <span className="font-mono text-[10px] font-bold text-ink bg-brutalGreen/50 px-2 py-0.5 rounded border border-ink">RABU</span>
          <h3 className="font-display font-bold text-base text-ink mt-3">Jadwal Posting</h3>
          <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Jadwalkan lewat Meta Business Suite / TikTok Scheduler sesuai jam terbaik.</p>
          <span className="font-mono text-[10px] font-bold text-stone-500 block mt-3 pt-2 border-t-2 border-ink">Day 07-09</span>
        </div>
        <div className="bento-card p-5 rounded-2xl bg-white">
          <span className="font-mono text-[10px] font-bold text-ink bg-brutalPink/50 px-2 py-0.5 rounded border border-ink">KAMIS</span>
          <h3 className="font-display font-bold text-base text-ink mt-3">Balas & Pantau</h3>
          <p className="text-xs text-stone-700 font-sans leading-relaxed mt-1.5">Balas komentar & DM dalam 24 jam. Catat video mana yang paling disimpan.</p>
          <span className="font-mono text-[10px] font-bold text-stone-500 block mt-3 pt-2 border-t-2 border-ink">Semua Day</span>
        </div>
        <div className="bento-card p-5 rounded-2xl bg-brutalYellow/40">
          <span className="font-mono text-[10px] font-bold text-ink bg-white px-2 py-0.5 rounded border border-ink">JUMAT</span>
          <h3 className="font-display font-bold text-base text-ink mt-3">Review Data</h3>
          <p className="text-xs text-stone-800 font-sans leading-relaxed mt-1.5">Lihat retention & saves. Pilih format terbaik buat minggu depan.</p>
          <span className="font-mono text-[10px] font-bold text-stone-800 block mt-3 pt-2 border-t-2 border-ink">30 Menit</span>
        </div>
      </div>

      <div className="mt-5 p-4 sm:p-5 bg-white border-2 border-ink rounded-2xl shadow-brutal-sm font-mono text-xs sm:text-sm text-ink font-bold flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="flex items-center gap-2.5"><Icon name="clock" className="w-4 h-4 text-ink" /> Hasilnya: 30 hari konten selesai dengan total ±10 jam produksi per bulan — bukan 40 jam mikir tanpa arah.</span>
        <button type="button" data-action="open-modal" className="btn-press bg-ink text-brutalYellow hover:bg-brutalYellow hover:text-ink px-4 py-2.5 rounded-xl font-bold text-xs transition whitespace-nowrap">Mulai Batch &rarr;</button>
      </div>

    </div>
  </section>

  {/* ============================================== */}
  {/* SECTION: CARA KERJA [RETRO GRID] */}
  {/* ============================================== */}
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

  {/* ============================================== */}
  {/* SECTION: TOOLS / MODAL MINIMAL [POLKADOT] */}
  {/* ============================================== */}
  <section id="tools" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-dots relative">
    {/* Decorative Theme Elements */}

    <div className="absolute top-5 left-8 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-8 right-6 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="hidden md:block absolute bottom-1/4 left-4 w-6 h-6 rounded-full border-2 border-ink bg-brutalGreen rotate-45 pointer-events-none shadow-brutal-sm"></div>
    <div className="hidden lg:flex absolute top-10 right-8 badge-brutal bg-white px-3 py-1.5 rounded-lg items-center gap-2 rotate-6 z-20"><Icon name="wallet" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">Modal Rp200rb</span></div>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <span className="badge-brutal px-3 py-1 rounded-lg text-xs font-mono font-bold bg-ink text-brutalYellow uppercase">Modal Minimal</span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">
            Cukup HP yang <span className="bg-brutalYellow text-ink px-2.5 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">Kamu Sudah Punya</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 font-mono max-w-sm leading-relaxed">Total investasi alat mulai dari Rp200 ribuan, sekali beli. Nggak perlu sewa studio.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="p-4 sm:p-5 bg-white border-2 border-ink rounded-2xl shadow-brutal-sm flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-canvas border-2 border-ink flex items-center justify-center shrink-0 wiggle-hover"><Icon name="smartphone" className="w-4 h-4 text-ink" /></div>
          <div>
            <h3 className="font-display font-bold text-sm text-ink">HP Kamera 1080p</h3>
            <p className="text-[11px] text-stone-700 font-sans leading-relaxed mt-1">Hampir semua HP 3 tahun terakhir sudah memenuhi. Rekam pakai kamera belakang, bukan selfie.</p>
          </div>
        </div>
        <div className="p-4 sm:p-5 bg-white border-2 border-ink rounded-2xl shadow-brutal-sm flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-canvas border-2 border-ink flex items-center justify-center shrink-0 wiggle-hover"><Icon name="camera" className="w-4 h-4 text-ink" /></div>
          <div>
            <h3 className="font-display font-bold text-sm text-ink">Tripod Ringan</h3>
            <p className="text-[11px] text-stone-700 font-sans leading-relaxed mt-1">Tripod ponsel Rp100 ribuan dengan clamp yang kokoh sudah cukup buat angle statis dan miring.</p>
          </div>
        </div>
        <div className="p-4 sm:p-5 bg-white border-2 border-ink rounded-2xl shadow-brutal-sm flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-canvas border-2 border-ink flex items-center justify-center shrink-0 wiggle-hover"><Icon name="mic" className="w-4 h-4 text-ink" /></div>
          <div>
            <h3 className="font-display font-bold text-sm text-ink">Mic Clip-On</h3>
            <p className="text-[11px] text-stone-700 font-sans leading-relaxed mt-1">Mic lavalier wireless Rp150 ribuan bikin suara jauh lebih jelas dibanding mic bawaan HP.</p>
          </div>
        </div>
        <div className="p-4 sm:p-5 bg-white border-2 border-ink rounded-2xl shadow-brutal-sm flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-canvas border-2 border-ink flex items-center justify-center shrink-0 wiggle-hover"><Icon name="scissors" className="w-4 h-4 text-ink" /></div>
          <div>
            <h3 className="font-display font-bold text-sm text-ink">Aplikasi Edit Gratis</h3>
            <p className="text-[11px] text-stone-700 font-sans leading-relaxed mt-1">CapCut buat potong & subtitle otomatis. Nggak perlu langganan berbayar untuk kebutuhan dasar.</p>
          </div>
        </div>
        <div className="p-4 sm:p-5 bg-white border-2 border-ink rounded-2xl shadow-brutal-sm flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-canvas border-2 border-ink flex items-center justify-center shrink-0 wiggle-hover"><Icon name="sun" className="w-4 h-4 text-ink" /></div>
          <div>
            <h3 className="font-display font-bold text-sm text-ink">Cahaya Jendela</h3>
            <p className="text-[11px] text-stone-700 font-sans leading-relaxed mt-1">Rekam menghadap jendela di siang hari. Cahaya alami gratis adalah light setup terbaik untuk pemula.</p>
          </div>
        </div>
        <div className="p-4 sm:p-5 bg-brutalYellow/40 border-2 border-ink rounded-2xl shadow-brutal-sm flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-ink text-brutalYellow border-2 border-ink flex items-center justify-center shrink-0 wiggle-hover"><Icon name="file-text" className="w-4 h-4 text-ink" /></div>
          <div>
            <h3 className="font-display font-bold text-sm text-ink">Dan yang Paling Penting...</h3>
            <p className="text-[11px] text-stone-800 font-sans leading-relaxed mt-1">Naskah yang jelas. Karsa menyediakan arahan visual, shot list, dan teleprompter — sisanya tinggal eksekusi.</p>
          </div>
        </div>
      </div>

    </div>
  </section>

  {/* ============================================== */}
  {/* SECTION: KOMPARASI [RETRO GRID] */}
  {/* ============================================== */}
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
          <table className="w-full text-left border-collapse min-w-[640px]">
            <thead>
              <tr className="border-b-2 border-ink font-mono text-xs text-ink uppercase">
                <th className="p-4 sm:p-5 bg-sand/60 w-1/3">Parameter Kunci</th>
                <th className="p-4 sm:p-5 bg-brutalYellow text-ink font-black border-x-2 border-ink w-1/3">
                  <div className="flex items-center gap-1.5">
                    <Icon name="zap" className="w-4 h-4 text-ink" />
                    <span>Karsa Studio</span>
                  </div>
                </th>
                <th className="p-4 sm:p-5 bg-white text-stone-600 w-1/3">Agensi / In-House</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm divide-y-2 divide-ink font-sans">
              <tr className="hover:bg-sand/20 transition">
                <td className="p-4 sm:p-5 font-bold font-mono text-ink bg-sand/30">Investasi Biaya</td>
                <td className="p-4 sm:p-5 font-black text-ink bg-brutalYellow/20 border-x-2 border-ink">
                  Rp299.000 (Flat Sekali Bayar)
                </td>
                <td className="p-4 sm:p-5 text-stone-700">Rp5 - 15 Juta / Bulan (Kontrak)</td>
              </tr>
              <tr className="hover:bg-sand/20 transition">
                <td className="p-4 sm:p-5 font-bold font-mono text-ink bg-sand/30">Kecepatan Mulai (SLA)</td>
                <td className="p-4 sm:p-5 font-black text-ink bg-brutalYellow/20 border-x-2 border-ink flex items-center gap-1.5">
                  <Icon name="clock" className="w-4 h-4 text-ink" /> Maksimal 1x24 Jam Kerja
                </td>
                <td className="p-4 sm:p-5 text-stone-700">2 - 4 Minggu Onboarding</td>
              </tr>
              <tr className="hover:bg-sand/20 transition">
                <td className="p-4 sm:p-5 font-bold font-mono text-ink bg-sand/30">Riset Kompetitor</td>
                <td className="p-4 sm:p-5 font-black text-ink bg-brutalYellow/20 border-x-2 border-ink">
                  Audit 1 Akun Acuan + Gap Angle
                </td>
                <td className="p-4 sm:p-5 text-stone-700">Tergantung Proposal, Sering Manual</td>
              </tr>
              <tr className="hover:bg-sand/20 transition">
                <td className="p-4 sm:p-5 font-bold font-mono text-ink bg-sand/30">Format Deliverable</td>
                <td className="p-4 sm:p-5 font-black text-ink bg-brutalYellow/20 border-x-2 border-ink">
                  Notion Content OS + Naskah Per Detik
                </td>
                <td className="p-4 sm:p-5 text-stone-700">File Spreadsheet / Drive Mentah</td>
              </tr>
              <tr className="hover:bg-sand/20 transition">
                <td className="p-4 sm:p-5 font-bold font-mono text-ink bg-sand/30">Kontrol Brand Voice</td>
                <td className="p-4 sm:p-5 font-black text-ink bg-brutalYellow/20 border-x-2 border-ink">
                  100% di Tangan Kamu (Sistem Terarah)
                </td>
                <td className="p-4 sm:p-5 text-stone-700">Tergantung Tim Kreatif Pihak Ketiga</td>
              </tr>
              <tr className="hover:bg-sand/20 transition">
                <td className="p-4 sm:p-5 font-bold font-mono text-ink bg-sand/30">Garansi & Kalibrasi</td>
                <td className="p-4 sm:p-5 font-black text-ink bg-brutalYellow/20 border-x-2 border-ink flex items-center gap-1.5">
                  <Icon name="shield-check" className="w-4 h-4 text-ink" /> Garansi 48 Jam Tone Kalibrasi
                </td>
                <td className="p-4 sm:p-5 text-stone-700">Revisi Terbatas, Antre Meeting</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </section>

  {/* ============================================== */}
  {/* SECTION: STUDI KASUS [POLKADOT] */}
  {/* ============================================== */}
  <section id="studi-kasus" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-dots relative">
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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

  {/* ============================================== */}
  {/* SECTION: TESTIMONI [RETRO GRID] */}
  {/* ============================================== */}
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

  {/* ============================================== */}
  {/* SECTION: BONUS STACK [POLKADOT] */}
  {/* ============================================== */}
  <section id="bonus" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-dots relative">
    {/* Decorative Theme Elements */}

    <div className="absolute top-5 right-8 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-8 left-6 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="hidden md:block absolute bottom-1/3 right-6 w-6 h-6 rounded-full border-2 border-ink bg-brutalPink rotate-45 pointer-events-none shadow-brutal-sm"></div>
    <div className="hidden lg:flex absolute top-10 left-8 badge-brutal bg-white px-3 py-1.5 rounded-lg items-center gap-2 rotate-6 z-20"><Icon name="gift" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">5 Bonus Gratis</span></div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <span className="badge-brutal px-3 py-1 rounded-lg text-xs font-mono font-bold bg-ink text-brutalYellow uppercase">Bonus Stack Eksklusif</span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">
            5 Bonus Tambahan <span className="bg-brutalYellow text-ink px-2.5 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">Tanpa Biaya Ekstra</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 font-mono max-w-sm leading-relaxed">Semua bonus langsung masuk ke Notion Workspace kamu. Nggak ada harga tersembunyi.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bento-card p-4 sm:p-5 rounded-2xl bg-white flex flex-col justify-between shine">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] font-bold bg-ink text-brutalYellow px-2 py-0.5 rounded border border-ink">BONUS 01</span>
              <span className="font-mono text-[10px] font-bold text-stone-500 line-through">Rp250rb</span>
            </div>
            <h3 className="font-display font-bold text-sm text-ink">50 Template Hook</h3>
            <p className="text-[11px] text-stone-700 font-sans leading-relaxed mt-1.5">50 kalimat pembuka yang bisa kamu adaptasi buat promosi produk apa pun.</p>
          </div>
          <span className="badge-brutal text-[10px] font-mono font-bold bg-brutalGreen/50 px-2 py-0.5 rounded mt-3 w-fit">SUDAH TERMASUK</span>
        </div>

        <div className="bento-card p-4 sm:p-5 rounded-2xl bg-white flex flex-col justify-between shine">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] font-bold bg-ink text-brutalYellow px-2 py-0.5 rounded border border-ink">BONUS 02</span>
              <span className="font-mono text-[10px] font-bold text-stone-500 line-through">Rp200rb</span>
            </div>
            <h3 className="font-display font-bold text-sm text-ink">Bio & Highlight Blueprint</h3>
            <p className="text-[11px] text-stone-700 font-sans leading-relaxed mt-1.5">Struktur profil Instagram biar pengunjung paham value bisnismu dalam 5 detik.</p>
          </div>
          <span className="badge-brutal text-[10px] font-mono font-bold bg-brutalGreen/50 px-2 py-0.5 rounded mt-3 w-fit">SUDAH TERMASUK</span>
        </div>

        <div className="bento-card p-4 sm:p-5 rounded-2xl bg-brutalYellow/40 flex flex-col justify-between shine">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] font-bold bg-ink text-brutalYellow px-2 py-0.5 rounded border border-ink">BONUS 03</span>
              <span className="font-mono text-[10px] font-bold text-stone-600 line-through">Rp300rb</span>
            </div>
            <h3 className="font-display font-bold text-sm text-ink">Repurposing Framework</h3>
            <p className="text-[11px] text-stone-800 font-sans leading-relaxed mt-1.5">SOP ubah satu ide video jadi carousel, thread X, dan status WhatsApp.</p>
          </div>
          <span className="badge-brutal text-[10px] font-mono font-bold bg-white px-2 py-0.5 rounded mt-3 w-fit">SUDAH TERMASUK</span>
        </div>

        <div className="bento-card p-4 sm:p-5 rounded-2xl bg-white flex flex-col justify-between shine">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] font-bold bg-ink text-brutalYellow px-2 py-0.5 rounded border border-ink">BONUS 04</span>
              <span className="font-mono text-[10px] font-bold text-stone-500 line-through">Rp350rb</span>
            </div>
            <h3 className="font-display font-bold text-sm text-ink">Kalibrasi 48 Jam</h3>
            <p className="text-[11px] text-stone-700 font-sans leading-relaxed mt-1.5">Penyesuaian istilah produk dan tone naskah dalam 48 jam pertama.</p>
          </div>
          <span className="badge-brutal text-[10px] font-mono font-bold bg-brutalGreen/50 px-2 py-0.5 rounded mt-3 w-fit">SUDAH TERMASUK</span>
        </div>

        <div className="bento-card p-4 sm:p-5 rounded-2xl bg-white flex flex-col justify-between shine">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="font-mono text-[10px] font-bold bg-ink text-brutalYellow px-2 py-0.5 rounded border border-ink">BONUS 05</span>
              <span className="font-mono text-[10px] font-bold text-stone-500 line-through">Rp350rb</span>
            </div>
            <h3 className="font-display font-bold text-sm text-ink">Audio & Pacing Blueprint</h3>
            <p className="text-[11px] text-stone-700 font-sans leading-relaxed mt-1.5">Panduan milih referensi audio dan tempo jeda bicara biar video terasa hidup.</p>
          </div>
          <span className="badge-brutal text-[10px] font-mono font-bold bg-brutalGreen/50 px-2 py-0.5 rounded mt-3 w-fit">SUDAH TERMASUK</span>
        </div>
      </div>

    </div>
  </section>

  {/* ============================================== */}
  {/* SECTION: HARGA [POLKADOT] */}
  {/* ============================================== */}
  <section id="harga" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-dots relative">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">

        {/* 1 Batch */}
        <div className="bento-card p-6 sm:p-8 rounded-3xl bg-white flex flex-col justify-between shine">
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-stone-500">Coba Dulu</span>
            <h3 className="font-display font-bold text-2xl text-ink mt-1">1 Batch</h3>
            <div className="mt-4 font-mono">
              <span className="text-3xl font-display font-bold text-ink">Rp299.000</span>
              <span className="text-xs text-stone-500 block mt-1">Flat / 30 Hari Konten</span>
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

        {/* 3 Batch (Featured) */}
        <div className="bento-card p-6 sm:p-8 rounded-3xl bg-brutalYellow flex flex-col justify-between relative shadow-brutal-xl">
          <span className="deco-float absolute -top-3.5 left-6 badge-brutal bg-ink text-brutalYellow px-3 py-1 rounded-lg text-[10px] font-mono font-bold uppercase" style={{"animationDuration": "4s"}}>Paling Efisien</span>
          <div>
            <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-stone-700">Ritme 3 Bulan</span>
            <h3 className="font-display font-bold text-2xl text-ink mt-1">3 Batch</h3>
            <div className="mt-4 font-mono">
              <span className="text-3xl font-display font-bold text-ink">Rp799.000</span>
              <span className="text-xs text-ink font-bold block mt-1">Hemat Rp98.000 &bull; 90 Hari Konten</span>
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
            <span className="font-mono text-[10px] uppercase tracking-wider font-bold text-ink">Full Scale Semester</span>
            <h3 className="font-display font-bold text-2xl text-ink mt-1">6 Batch</h3>
            <div className="mt-4 font-mono">
              <span className="text-3xl font-display font-bold text-ink">Rp1.490.000</span>
              <span className="text-xs text-stone-500 block mt-1">Hemat Rp304.000 &bull; 180 Hari Konten</span>
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

  {/* ============================================== */}
  {/* SECTION: VALUE STACK [RETRO GRID] */}
  {/* ============================================== */}
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

  {/* ============================================== */}
  {/* SECTION: GARANSI [POLKADOT] */}
  {/* ============================================== */}
  <section id="garansi" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-dots relative">
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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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

  {/* ============================================== */}
  {/* SECTION: COCOK UNTUK KAMU [RETRO GRID] */}
  {/* ============================================== */}
  <section id="cocok-untuk" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-grid relative">
    {/* Decorative Theme Elements */}

    <div className="absolute top-5 right-8 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-8 left-6 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="hidden md:block absolute top-1/4 left-4 w-6 h-6 rounded-full border-2 border-ink bg-brutalPink rotate-45 pointer-events-none shadow-brutal-sm"></div>
    <div className="hidden lg:flex absolute bottom-12 right-8 badge-brutal bg-white px-3 py-1.5 rounded-lg items-center gap-2 -rotate-6 z-20"><Icon name="check-circle" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">Cek Dulu</span></div>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="badge-brutal px-3.5 py-1 rounded-lg text-xs font-mono font-bold bg-brutalYellow text-ink uppercase">Apakah Ini Buat Kamu?</span>
        <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">
          Satu Sistem untuk Tim Kecil yang <span className="bg-brutalYellow text-ink px-2.5 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">Mau Gerak Cepat</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-mono mt-2">Karsa paling cocok untuk bisnis yang sudah punya produk, tapi belum punya waktu atau sistem buat konten rutin.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bento-card p-5 sm:p-7 rounded-3xl bg-brutalGreen/30">
          <span className="badge-brutal text-[10px] font-mono font-bold bg-brutalGreen px-2.5 py-1 rounded uppercase">Cocok untuk Kamu jika...</span>
          <ul className="pop-in mt-4 space-y-3.5 text-xs sm:text-sm text-stone-800 font-sans">
            <li className="flex gap-2.5"><span className="w-5 h-5 rounded-md bg-white border-2 border-ink flex items-center justify-center shrink-0 mt-0.5"><Icon name="check" className="w-3 h-3 text-ink" /></span><span><strong>Punya produk siap jual.</strong> Tinggal butuh konten yang rapi dan terarah.</span></li>
            <li className="flex gap-2.5"><span className="w-5 h-5 rounded-md bg-white border-2 border-ink flex items-center justify-center shrink-0 mt-0.5"><Icon name="check" className="w-3 h-3 text-ink" /></span><span><strong>Bisa rekam sendiri</strong> pakai HP atau punya satu orang talent.</span></li>
            <li className="flex gap-2.5"><span className="w-5 h-5 rounded-md bg-white border-2 border-ink flex items-center justify-center shrink-0 mt-0.5"><Icon name="check" className="w-3 h-3 text-ink" /></span><span><strong>Butuh arah jelas</strong> buat posting konsisten 30 hari ke depan.</span></li>
            <li className="flex gap-2.5"><span className="w-5 h-5 rounded-md bg-white border-2 border-ink flex items-center justify-center shrink-0 mt-0.5"><Icon name="check" className="w-3 h-3 text-ink" /></span><span><strong>Hemat waktu</strong> tanpa nyerahin seluruh brand voice ke agensi.</span></li>
          </ul>
        </div>

        <div className="bento-card p-5 sm:p-7 rounded-3xl bg-brutalPink/20">
          <span className="badge-brutal text-[10px] font-mono font-bold bg-brutalPink/60 px-2.5 py-1 rounded uppercase">Kurang Cocok jika...</span>
          <ul className="pop-in mt-4 space-y-3.5 text-xs sm:text-sm text-stone-800 font-sans">
            <li className="flex gap-2.5"><span className="w-5 h-5 rounded-md bg-white border-2 border-ink flex items-center justify-center shrink-0 mt-0.5"><Icon name="x" className="w-3 h-3 text-ink" /></span><span><strong>Yang kamu cari jasa shooting/editing</strong> atau talent di lokasi. Kami mengerjakan naskah & sistemnya.</span></li>
            <li className="flex gap-2.5"><span className="w-5 h-5 rounded-md bg-white border-2 border-ink flex items-center justify-center shrink-0 mt-0.5"><Icon name="x" className="w-3 h-3 text-ink" /></span><span><strong>Produk belum siap dijual</strong> atau positioning-nya masih berubah tiap hari.</span></li>
            <li className="flex gap-2.5"><span className="w-5 h-5 rounded-md bg-white border-2 border-ink flex items-center justify-center shrink-0 mt-0.5"><Icon name="x" className="w-3 h-3 text-ink" /></span><span><strong>Butuh konten real-time</strong> buat berita atau tren harian.</span></li>
          </ul>
          <p className="text-[11px] text-stone-600 font-mono mt-5 pt-4 border-t-2 border-ink">Kalau kebutuhanmu di luar cakupan ini, tetap boleh konsultasi lewat brief.</p>
        </div>
      </div>

    </div>
  </section>

  {/* ============================================== */}
  {/* SECTION: CAKUPAN [POLKADOT] */}
  {/* ============================================== */}
  <section id="cakupan" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-dots relative">
    {/* Decorative Theme Elements */}

    <div className="absolute top-6 left-6 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-10 right-8 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="hidden md:block absolute bottom-1/3 right-4 w-5 h-5 bg-brutalGreen rotate-12 border border-ink shadow-brutal-sm pointer-events-none"></div>
    <div className="hidden xl:flex absolute top-10 right-8 badge-brutal bg-brutalYellow px-3 py-1.5 rounded-lg items-center gap-2 rotate-3 z-20"><Icon name="list-check" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">Scope Jelas</span></div>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <span className="badge-brutal px-3 py-1 rounded-lg text-xs font-mono font-bold bg-ink text-brutalYellow uppercase">Biar Ekspektasinya Jelas</span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">
            Apa yang Termasuk dan <span className="bg-brutalPink/50 text-ink px-2.5 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">Apa yang Tidak?</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 font-mono max-w-sm leading-relaxed">Kejelasan scope bikin proses lebih cepat dan hasil lebih gampang dipakai tim kamu.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="bento-card p-5 sm:p-7 rounded-3xl bg-white shine">
          <span className="badge-brutal text-[10px] font-mono font-bold bg-brutalGreen/60 px-2.5 py-1 rounded uppercase flex items-center gap-1.5 w-fit"><Icon name="plus" className="w-3.5 h-3.5" /> Termasuk dalam Batch</span>
          <ul className="pop-in mt-4 space-y-3.5 text-xs sm:text-sm text-stone-700 font-sans">
            <li className="flex gap-2.5"><span className="w-5 h-5 rounded-md bg-brutalGreen/50 border-2 border-ink flex items-center justify-center shrink-0 mt-0.5"><Icon name="check" className="w-3 h-3 text-ink" /></span><span>Riset angle dan audit 1 akun kompetitor acuan.</span></li>
            <li className="flex gap-2.5"><span className="w-5 h-5 rounded-md bg-brutalGreen/50 border-2 border-ink flex items-center justify-center shrink-0 mt-0.5"><Icon name="check" className="w-3 h-3 text-ink" /></span><span>30 video script, caption AIDA, dan riset tagar.</span></li>
            <li className="flex gap-2.5"><span className="w-5 h-5 rounded-md bg-brutalGreen/50 border-2 border-ink flex items-center justify-center shrink-0 mt-0.5"><Icon name="check" className="w-3 h-3 text-ink" /></span><span>4 artikel SEO, Notion Content OS, dan backup Docs.</span></li>
            <li className="flex gap-2.5"><span className="w-5 h-5 rounded-md bg-brutalGreen/50 border-2 border-ink flex items-center justify-center shrink-0 mt-0.5"><Icon name="check" className="w-3 h-3 text-ink" /></span><span>Shot-list B-Roll, 5 bonus, dan kalibrasi pesan 48 jam.</span></li>
          </ul>
        </div>

        <div className="bento-card p-5 sm:p-7 rounded-3xl bg-white shine">
          <span className="badge-brutal text-[10px] font-mono font-bold bg-brutalPink/60 px-2.5 py-1 rounded uppercase flex items-center gap-1.5 w-fit"><Icon name="minus" className="w-3.5 h-3.5" /> Tidak Termasuk dalam Batch</span>
          <ul className="pop-in mt-4 space-y-3.5 text-xs sm:text-sm text-stone-700 font-sans">
            <li className="flex gap-2.5"><span className="w-5 h-5 rounded-md bg-brutalPink/40 border-2 border-ink flex items-center justify-center shrink-0 mt-0.5"><Icon name="x" className="w-3 h-3 text-ink" /></span><span>Shooting, talent, atau produksi video di lokasi.</span></li>
            <li className="flex gap-2.5"><span className="w-5 h-5 rounded-md bg-brutalPink/40 border-2 border-ink flex items-center justify-center shrink-0 mt-0.5"><Icon name="x" className="w-3 h-3 text-ink" /></span><span>Editing video, desain aset, dan pengelolaan posting harian.</span></li>
            <li className="flex gap-2.5"><span className="w-5 h-5 rounded-md bg-brutalPink/40 border-2 border-ink flex items-center justify-center shrink-0 mt-0.5"><Icon name="x" className="w-3 h-3 text-ink" /></span><span>Budget iklan, pembelian media, atau jaminan angka performa tertentu.</span></li>
            <li className="flex gap-2.5"><span className="w-5 h-5 rounded-md bg-brutalPink/40 border-2 border-ink flex items-center justify-center shrink-0 mt-0.5"><Icon name="x" className="w-3 h-3 text-ink" /></span><span>Penulisan ulang di luar kalibrasi tone dan istilah brand.</span></li>
          </ul>
          <p className="text-[11px] text-stone-600 font-mono mt-5 pt-4 border-t-2 border-ink">Sebelum mulai: siapkan deskripsi produk, target pembeli, satu kompetitor acuan, dan akses komunikasi yang aktif.</p>
        </div>
      </div>

    </div>
  </section>

  {/* ============================================== */}
  {/* SECTION: INTERACTIVE ROI SAVINGS CALCULATOR [RETRO GRID] */}
  {/* ============================================== */}
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
          </div>
        </div>

        {/* Right 7 Cols: Sliders and Savings Display */}
        <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-5 font-mono text-xs">

          <div className="bento-card p-5 sm:p-6 rounded-3xl bg-white space-y-4 sm:space-y-5 flex flex-col justify-between">
            <div>
              <div className="flex justify-between font-bold text-ink mb-2">
                <span>Jam Konten / Minggu:</span>
                <span id="dispHours" className="text-ink text-sm font-bold">6 Jam</span>
              </div>
              <input type="range" id="sliderHours" min="2" max="15" value="6" step="1" data-action="calculator" className="w-full cursor-pointer" />
            </div>

            <div>
              <div className="flex justify-between font-bold text-ink mb-2">
                <span>Biaya Agensi / In-House:</span>
                <span id="dispAgency" className="text-ink text-sm font-bold">Rp 3.500.000</span>
              </div>
              <input type="range" id="sliderAgency" min="1500000" max="8000000" value="3500000" step="250000" data-action="calculator" className="w-full cursor-pointer" />
            </div>
          </div>

          <div className="bento-card p-5 sm:p-6 rounded-3xl bg-brutalYellow flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center pb-2 border-b-2 border-ink">
                <span className="text-ink font-bold">Waktu Hemat:</span>
                <span id="resSavedHours" className="text-sm sm:text-base font-bold font-display text-ink">24 Jam / Bulan</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b-2 border-ink">
                <span className="text-ink font-bold">Biaya Karsa:</span>
                <span className="text-sm sm:text-base font-bold font-display text-ink">Rp299.000</span>
              </div>
              <div className="flex justify-between items-center pb-2 border-b-2 border-ink">
                <span className="text-ink font-bold">Selisih Hemat:</span>
                <span id="resSavedMoney" className="text-lg sm:text-xl font-black font-display text-ink">Rp 3.201.000 / Bln</span>
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

  {/* ============================================== */}
  {/* SECTION: PREVIEW OUTPUT [POLKADOT] */}
  {/* ============================================== */}
  <section id="preview" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-dots relative">
    {/* Decorative Theme Elements */}

    <div className="absolute top-6 right-8 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-10 left-6 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>
    <div className="hidden md:block absolute bottom-1/4 right-4 w-6 h-6 rounded-full border-2 border-ink bg-brutalCyan rotate-45 pointer-events-none shadow-brutal-sm"></div>
    <div className="hidden xl:flex absolute top-10 left-8 badge-brutal bg-brutalYellow px-3 py-1.5 rounded-lg items-center gap-2 -rotate-3 z-20"><Icon name="eye" className="w-3.5 h-3.5 text-ink" /><span className="font-mono text-[10px] font-bold text-ink">Contoh Nyata</span></div>
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-10">
        <div>
          <span className="badge-brutal px-3 py-1 rounded-lg text-xs font-mono font-bold bg-ink text-brutalYellow uppercase">Transparansi Mutu</span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">
            Lihat Contoh Output <span className="bg-brutalYellow text-ink px-2.5 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">Sebelum Pesan</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-stone-600 font-mono max-w-sm leading-relaxed">Preview ini cuma contoh. Topik, angle, dan tone akan disesuaikan dengan brief bisnis kamu.</p>
      </div>

      <div className="bento-card p-5 sm:p-8 rounded-3xl bg-white shine">
        <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b-2 border-ink mb-5">
          <span className="badge-brutal text-[10px] font-mono font-bold bg-brutalYellow px-2.5 py-1 rounded">Contoh: Day 04 — Edukasi Solusi</span>
          <span className="font-mono text-[10px] sm:text-[11px] font-bold text-stone-500 uppercase">Niche: Artisan Roastery (F&B)</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-xs sm:text-sm text-stone-800 font-sans">
          <div className="p-4 bg-canvas border-2 border-ink rounded-xl">
            <span className="font-mono text-[10px] font-bold text-ink bg-brutalYellow px-2 py-0.5 rounded border border-ink">[VISUAL HOOK 00:00-00:03]</span>
            <p className="mt-2 leading-relaxed">Talent menuang kopi instan ke gelas tapi langsung menggumpal di dasar. Ekspresi heran.</p>
          </div>
          <div className="p-4 bg-canvas border-2 border-ink rounded-xl">
            <span className="font-mono text-[10px] font-bold text-ink bg-brutalCyan/60 px-2 py-0.5 rounded border border-ink">[AUDIO / VOICEOVER]</span>
            <p className="mt-2 leading-relaxed">"Kenapa kopi sachet kamu sering bikin perut kembung padahal baru 3 teguk? Ini alasan ilmiahnya..."<span className="blink-caret"></span></p>
          </div>
          <div className="p-4 bg-canvas border-2 border-ink rounded-xl">
            <span className="font-mono text-[10px] font-bold text-ink bg-brutalGreen/50 px-2 py-0.5 rounded border border-ink">[VALUE & CTA 00:04-00:25]</span>
            <p className="mt-2 leading-relaxed">Tunjukkan biji cold brew asli, jelaskan kadar asam 70% lebih rendah, tutup dengan ajakan cek link di bio.</p>
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

  {/* ============================================== */}
  {/* SECTION: FAQ [RETRO GRID] */}
  {/* ============================================== */}
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
        <p className="text-xs sm:text-sm text-stone-600 font-mono mt-2">5 pertanyaan terpopuler. Ada 90 lainnya di halaman FAQ lengkap.</p>
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
        </button><button type="button" className="faq-item bento-card w-full p-4 sm:p-5 rounded-2xl cursor-pointer bg-white text-left" aria-expanded="false" data-action="accordion">
          <div className="flex justify-between items-center gap-3">
            <span className="text-xs font-mono font-bold text-ink">02</span>
            <h3 className="text-xs sm:text-base font-bold text-ink flex-1">Apakah saya harus merekam videonya sendiri?</h3>
            <Icon name="plus" className="w-4 h-4 text-ink transition-transform shrink-0" />
          </div>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-6 hidden leading-relaxed font-sans">
            Ya. Kami yang nyusun naskahnya, kamu yang rekam. Script siap dibaca di teleprompter HP, lengkap dengan panduan visual dan cue audio — tinggal ikutin.
          </p>
        </button><button type="button" className="faq-item bento-card w-full p-4 sm:p-5 rounded-2xl cursor-pointer bg-white text-left" aria-expanded="false" data-action="accordion">
          <div className="flex justify-between items-center gap-3">
            <span className="text-xs font-mono font-bold text-ink">03</span>
            <h3 className="text-xs sm:text-base font-bold text-ink flex-1">Kalau ada naskah yang kurang pas gimana?</h3>
            <Icon name="plus" className="w-4 h-4 text-ink transition-transform shrink-0" />
          </div>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-6 hidden leading-relaxed font-sans">
            Ada garansi kalibrasi 48 jam. Istilah produk atau tone yang kurang pas bisa disesuaikan, dan update masuk ke workspace maksimal 12 jam kerja.
          </p>
        </button><button type="button" className="faq-item bento-card w-full p-4 sm:p-5 rounded-2xl cursor-pointer bg-white text-left" aria-expanded="false" data-action="accordion">
          <div className="flex justify-between items-center gap-3">
            <span className="text-xs font-mono font-bold text-ink">04</span>
            <h3 className="text-xs sm:text-base font-bold text-ink flex-1">Hak cipta materinya gimana?</h3>
            <Icon name="plus" className="w-4 h-4 text-ink transition-transform shrink-0" />
          </div>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-6 hidden leading-relaxed font-sans">
            Semua jadi milik kamu setelah diserahterimakan. Bebas dipublikasikan, dimodifikasi, atau dipakai buat apa pun. Brief kamu juga nggak dibagikan ke pihak lain.
          </p>
        </button><button type="button" className="faq-item bento-card w-full p-4 sm:p-5 rounded-2xl cursor-pointer bg-white text-left" aria-expanded="false" data-action="accordion">
          <div className="flex justify-between items-center gap-3">
            <span className="text-xs font-mono font-bold text-ink">05</span>
            <h3 className="text-xs sm:text-base font-bold text-ink flex-1">Berapa lama pengerjaannya (SLA)?</h3>
            <Icon name="plus" className="w-4 h-4 text-ink transition-transform shrink-0" />
          </div>
          <p className="text-xs sm:text-sm text-stone-700 mt-3 pl-6 hidden leading-relaxed font-sans">
            Maksimal 1x24 jam kerja setelah brief dan pembayaran terkonfirmasi. Kalau telat dari sisi kami, kamu dapat 5 naskah tambahan gratis.
          </p>
        </button>
<button type="button" onclick="window.location.href='/faq'" className="bento-card w-full p-4 sm:p-5 rounded-2xl cursor-pointer bg-white text-left group">
  <div className="flex items-center justify-between gap-3">
    <span className="text-xs font-mono font-bold text-ink">+</span>
    <h3 className="text-xs sm:text-base font-bold text-ink flex-1 group-hover:text-brutalPink transition">Masih ada 85+ pertanyaan lain? Lihat FAQ lengkap di halaman khusus.</h3>
    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brutalYellow border-2 border-ink rounded-lg shadow-brutal-sm font-mono text-[10px] font-bold text-ink group-hover:bg-ink group-hover:text-brutalYellow transition">Lihat Semua FAQ &rarr;</span>
  </div>
</button>

        </div>
    </div>
  </section>

  {/* ============================================== */}
  {/* SECTION: FINAL CTA [POLKADOT] */}
  {/* ============================================== */}
  <section className="py-12 sm:py-20 bg-canvas brutal-dots border-b-2 border-ink relative">
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
        <a href="https://wa.me/6281234567890" className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-ink hover:underline">
          <Icon name="message-circle" className="w-4 h-4 text-ink" /> Atau tanya dulu via WhatsApp — dibalas &le; 4 jam kerja
        </a>
      </div>
    </div>
  </section>

  </main>

  {/* FOOTER [POLKADOT] */}
  <footer className="py-8 sm:py-12 bg-canvas brutal-dots text-stone-700 text-xs border-t-2 border-ink">
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
            <li><a href="#pillar-konten" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Pilar Konten 30 Hari</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="#cara-kerja" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Cara Kerja</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="#harga" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Harga & Paket</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="#testimoni" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Testimoni Customer</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="#faq" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>FAQ & Bantuan</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
          </ul>
        </div>

        <div className="rounded-2xl bg-white border-2 border-ink shadow-brutal-sm p-4 sm:p-5">
          <h4 className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-[10px] text-ink">
            <span className="w-5 h-5 rounded-md bg-brutalCyan border border-ink flex items-center justify-center font-black text-[9px] shrink-0">02</span>
            Layanan
          </h4>
          <ul className="mt-3 space-y-2 text-[11px] font-medium">
            <li><a href="#deliverables" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Jasa Konten Video UMKM</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="#modul-video" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Jasa Script Video TikTok</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="#cara-kerja" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Jasa Content Creator UMKM</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="#modul-seo" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Jasa Artikel SEO</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="#pillar-konten" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Paket Konten Instagram</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
          </ul>
        </div>

        <div className="rounded-2xl bg-white border-2 border-ink shadow-brutal-sm p-4 sm:p-5">
          <h4 className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-[10px] text-ink">
            <span className="w-5 h-5 rounded-md bg-brutalPink border border-ink flex items-center justify-center font-black text-[9px] shrink-0">03</span>
            Keputusan
          </h4>
          <ul className="mt-3 space-y-2 text-[11px] font-medium">
            <li><a href="#harga" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Harga & Paket</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="#komparasi" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Karsa vs Agensi vs In-house</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
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
            <li><a href="https://wa.me/6281234567890" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span className="font-mono text-[10px] font-bold">WA: +62 812-3456-7890</span><Icon name="message-circle" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
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
    <div className="modal-box w-full max-w-2xl bg-canvas brutal-dots border-3 border-ink rounded-3xl p-6 sm:p-8 shadow-brutal-xl relative max-h-[90vh] overflow-y-auto">
      
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
          <textarea id="inputDesc" rows="3" required placeholder="Jelaskan produk unggulan, harga, dan target pembeli utama kamu..." className="w-full bg-canvas border-2 border-ink rounded-xl px-3.5 py-2.5 text-sm text-ink focus:outline-none focus:ring-2 focus:ring-ink font-sans"></textarea>
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
