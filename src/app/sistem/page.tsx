import { Icon } from "@/components/Icon";

export default function Page() {

  return (
    <div className="min-h-screen flex flex-col justify-between">

  <div id="scrollProgress" className="fixed top-0 left-0 right-0 h-1 bg-ink z-[70] pointer-events-none"></div>
  <a href="index.html#main-content" className="sr-only text-ink focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-3 focus:bg-brutalYellow focus:text-ink focus:font-mono focus:text-xs focus:font-bold focus:rounded-xl focus:border-2 focus:border-ink">Lewati ke konten utama</a>

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
      <a href="index.html#main-content" className="flex items-center space-x-2 shrink-0 group">
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
                  <a href="index.html#modul-video" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink">
                    <span className="w-6 h-6 rounded bg-brutalYellow text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">01</span>
                    <div><span className="block font-bold text-xs">30 Video Scripts</span><span className="block text-[9px] text-stone-500 font-mono">Hook, visual, audio, CTA.</span></div>
                  </a>
                  <a href="index.html#modul-caption" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalCyan/40 transition border border-transparent hover:border-ink">
                    <span className="w-6 h-6 rounded bg-brutalCyan text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">02</span>
                    <div><span className="block font-bold text-xs">30 Caption & Tagar</span><span className="block text-[9px] text-stone-500 font-mono">AIDA + 3 tier tagar.</span></div>
                  </a>
                  <a href="index.html#modul-seo" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalGreen/40 transition border border-transparent hover:border-ink">
                    <span className="w-6 h-6 rounded bg-brutalGreen text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">03</span>
                    <div><span className="block font-bold text-xs">4 Artikel Blog SEO</span><span className="block text-[9px] text-stone-500 font-mono">Struktur H1-H3 + meta.</span></div>
                  </a>
                  <a href="index.html#modul-audit" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalPink/40 transition border border-transparent hover:border-ink">
                    <span className="w-6 h-6 rounded bg-brutalPink text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">04</span>
                    <div><span className="block font-bold text-xs">Audit Gap Kompetitor</span><span className="block text-[9px] text-stone-500 font-mono">Teardown 1 akun acuan.</span></div>
                  </a>
                  <a href="index.html#modul-notion" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink">
                    <span className="w-6 h-6 rounded bg-white text-ink border border-ink flex items-center justify-center font-mono font-bold text-[10px] shrink-0">05</span>
                    <div><span className="block font-bold text-xs">Notion Content OS</span><span className="block text-[9px] text-stone-500 font-mono">Calendar + Kanban produksi.</span></div>
                  </a>
                  <a href="index.html#modul-shotlist" className="flex items-center gap-2.5 p-2 rounded-xl hover:bg-brutalCyan/40 transition border border-transparent hover:border-ink">
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
                  <a href="sistem.html#isi-harian" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Peta Konten 30 Hari</span><span className="block text-[9px] text-stone-500 font-mono">Foundation sampai conversion.</span></a>
                  <a href="sistem.html#cakupan" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Standar Setiap Output</span><span className="block text-[9px] text-stone-500 font-mono">Checklist sebelum dipakai tim.</span></a>
                  <a href="index.html#cara-kerja" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Cara Kerja Karsa</span><span className="block text-[9px] text-stone-500 font-mono">Brief, riset, tulis, kirim.</span></a>
                  <a href="sistem.html#cakupan" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Scope Layanan</span><span className="block text-[9px] text-stone-500 font-mono">Termasuk & tidak termasuk.</span></a>
                  <a href="sistem.html#anatomi-script" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Anatomi Script 25 Detik</span><span className="block text-[9px] text-stone-500 font-mono">Hook, value, CTA per detik.</span></a>
                  <a href="sistem.html#pillar-konten" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Pilar Konten 30 Hari</span><span className="block text-[9px] text-stone-500 font-mono">4 pilar & rasio mingguan.</span></a>
                  <a href="sistem.html#alur-produksi" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Template Produksi</span><span className="block text-[9px] text-stone-500 font-mono">Senin-Jumat siap eksekusi.</span></a>
                  <a href="index.html#garansi" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Garansi & SLA</span><span className="block text-[9px] text-stone-500 font-mono">24 jam + kalibrasi 48 jam.</span></a>
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink">
                  <span className="w-6 h-6 rounded bg-ink text-brutalPink flex items-center justify-center font-mono font-bold text-[10px]"><Icon name="bar-chart-3" className="w-3.5 h-3.5" /></span>
                  <span className="font-bold text-[10px] uppercase tracking-wider">Proof & Keputusan</span>
                </div>
                <div className="space-y-1 mt-2">
                  <a href="contoh.html#compare-scripts" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Bandingkan Kualitas</span><span className="block text-[9px] text-stone-500 font-mono">Script generik vs Karsa.</span></a>
                  <a href="index.html#studi-kasus" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Case Study Nyata</span><span className="block text-[9px] text-stone-500 font-mono">Metrik dari implementasi.</span></a>
                  <a href="contoh.html#preview" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Contoh Output</span><span className="block text-[9px] text-stone-500 font-mono">Script, caption, dan SEO.</span></a>
                  <a href="index.html#calculator" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Kalkulator Hemat</span><span className="block text-[9px] text-stone-500 font-mono">Bandingkan biaya per batch.</span></a>
                  <a href="index.html#komparasi" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Karsa vs Agensi vs AI</span><span className="block text-[9px] text-stone-500 font-mono">Tabel perbandingan jujur.</span></a>
                  <a href="index.html#harga" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Harga & Paket</span><span className="block text-[9px] text-stone-500 font-mono">1, 3, atau 6 batch.</span></a>
                  <a href="index.html#testimoni" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Testimoni Customer</span><span className="block text-[9px] text-stone-500 font-mono">Kata mereka yang sudah pakai.</span></a>
                  <a href="sistem.html#bonus" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Lihat Semua Bonus &rarr;</span><span className="block text-[9px] text-stone-500 font-mono">5 bonus sudah termasuk.</span></a>
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
                  <a href="contoh.html?sektor=fb#preview" className="block p-2 rounded-xl hover:bg-brutalGreen/30 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">F&B & Cafe</span><span className="block text-[9px] text-stone-500 font-mono">Menu, review, edukasi.</span></a>
                  <a href="contoh.html?sektor=skincare#preview" className="block p-2 rounded-xl hover:bg-brutalGreen/30 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Skincare & Beauty</span><span className="block text-[9px] text-stone-500 font-mono">Ingredient, myth-busting.</span></a>
                  <a href="contoh.html?sektor=fashion#preview" className="block p-2 rounded-xl hover:bg-brutalGreen/30 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Fashion & Apparel</span><span className="block text-[9px] text-stone-500 font-mono">Styling, fit, detail bahan.</span></a>
                  <a href="contoh.html?sektor=jasa#preview" className="block p-2 rounded-xl hover:bg-brutalGreen/30 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Jasa & Edukasi</span><span className="block text-[9px] text-stone-500 font-mono">Konsultan, klinik, les.</span></a>
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 px-2 pb-2 border-b-2 border-ink">
                  <span className="w-6 h-6 rounded bg-ink text-brutalYellow flex items-center justify-center font-mono font-bold text-[10px]"><Icon name="target" className="w-3.5 h-3.5" /></span>
                  <span className="font-bold text-[10px] uppercase tracking-wider">Tujuan Konten</span>
                </div>
                <div className="space-y-1 mt-2">
                  <a href="sistem.html#kenapa-video" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Edukasi & Awareness</span><span className="block text-[9px] text-stone-500 font-mono">Buat audiens lebih paham.</span></a>
                  <a href="sistem.html#kenapa-video" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Leads & DM</span><span className="block text-[9px] text-stone-500 font-mono">Arahkan percakapan baru.</span></a>
                  <a href="index.html#harga" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Penjualan Produk</span><span className="block text-[9px] text-stone-500 font-mono">Perjelas value dan CTA.</span></a>
                  <a href="sistem.html#cocok-untuk" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Cek Kecocokan</span><span className="block text-[9px] text-stone-500 font-mono">Lihat apakah Karsa untukmu.</span></a>
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

        <a href="index.html#harga" className="nav-pill px-2.5 py-1.5 rounded-xl transition">Harga</a>
        <a href="index.html#testimoni" className="nav-pill px-2.5 py-1.5 rounded-xl transition">Testimoni</a>
        <a href="index.html#cara-kerja" className="nav-pill px-2.5 py-1.5 rounded-xl transition">Cara Kerja</a>
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
      <a href="index.html#deliverables" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Isi Paket (6 Output)</a>
      <a href="sistem.html#anatomi-script" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Anatomi Script</a>
      <a href="sistem.html#pillar-konten" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-brutalYellow border-2 border-ink shadow-brutal-sm">Pilar Konten 30 Hari</a>
      <a href="index.html#cara-kerja" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Cara Kerja</a>
      <a href="index.html#testimoni" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Testimoni Customer</a>
      <a href="index.html#harga" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Harga & Paket</a>
      <a href="index.html#garansi" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Garansi & SLA</a>
      <a href="index.html#calculator" data-action="mobile-menu" className="block py-3 px-3.5 rounded-xl bg-white border-2 border-ink shadow-brutal-sm">Kalkulator Penghematan</a>
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
    <div className="hidden lg:flex absolute top-10 right-16 w-24 h-24 bg-brutalYellow text-ink items-center justify-center font-display font-extrabold text-xs uppercase text-center p-2 rotate-12 z-0 brutal-star border-2 border-ink shadow-brutal animate-pulse pointer-events-none">
      30<br />HARI
    </div>
    <div className="hidden xl:flex absolute top-28 left-6 badge-brutal bg-white px-3.5 py-2 rounded-xl items-center gap-2.5 -rotate-6 z-20">
      <div className="w-8 h-8 rounded-lg bg-ink text-brutalGreen flex items-center justify-center font-bold text-xs border border-ink"><Icon name="layout-grid" className="w-4 h-4" /></div>
      <span className="font-mono font-bold text-xs text-ink">Sistem Terarah</span>
    </div>
    <div className="absolute top-1/3 left-2 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">&#10022;</div>
    <div className="absolute bottom-1/4 right-8 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">&#10013;</div>
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-3xl space-y-4 sm:space-y-5">
        <div className="inline-flex items-center gap-2.5 badge-brutal bg-brutalYellow px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold">
          <Icon name="settings" className="w-4 h-4 text-ink" />
          <span>SISTEM & STRATEGI KONTEN</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-display font-extrabold tracking-tight text-ink leading-[1.12]">
          Sistem Konten 30 Hari <br className="hidden sm:inline" />
          <span className="bg-brutalGreen/50 text-ink px-2.5 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">yang Bisa Dieksekusi</span>
        </h1>
        <p className="text-xs sm:text-base text-stone-800 leading-relaxed font-sans font-medium">
          Kenapa video, anatomi script 25 detik, pilar konten, peta isi harian, sampai template produksi &mdash; semua dijelaskan transparan di sini. Pelajari sistemnya dulu, baru pesan kalau cocok.
        </p>
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a href="index.html#harga" className="btn-press bg-ink text-brutalYellow hover:bg-brutalYellow hover:text-ink px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold transition border-2 border-ink shadow-brutal-sm">Lihat Harga &amp; Paket</a>
          <a href="/" className="btn-press bg-white hover:bg-sand text-ink px-6 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold transition border-2 border-ink">&larr; Kembali ke Beranda</a>
        </div>
      </div>
    </div>
  </section>
<section id="kenapa-video" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-grid relative">
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
<section id="pillar-konten" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-grid relative">
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
<section id="alur-produksi" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-grid relative">
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
<section id="tools" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-grid relative">
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
<section id="cakupan" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-grid relative">
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
<section id="bonus" className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-grid relative">
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
          <a href="index.html#calculator" className="btn-press bg-white hover:bg-sand text-ink px-6 py-4 rounded-2xl font-mono text-sm font-bold transition flex items-center gap-2">
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
            <a href="index.html#" aria-label="Instagram" className="w-7 h-7 rounded-lg bg-canvas border-2 border-ink flex items-center justify-center text-ink shadow-brutal-sm hover:bg-brutalYellow transition"><Icon name="instagram" className="w-3.5 h-3.5" /></a>
            <a href="index.html#" aria-label="WhatsApp" className="w-7 h-7 rounded-lg bg-canvas border-2 border-ink flex items-center justify-center text-ink shadow-brutal-sm hover:bg-brutalGreen transition"><Icon name="message-circle" className="w-3.5 h-3.5" /></a>
            <a href="index.html#" aria-label="YouTube" className="w-7 h-7 rounded-lg bg-canvas border-2 border-ink flex items-center justify-center text-ink shadow-brutal-sm hover:bg-brutalPink transition"><Icon name="youtube" className="w-3.5 h-3.5" /></a>
          </div>
        </div>

        <div className="rounded-2xl bg-white border-2 border-ink shadow-brutal-sm p-4 sm:p-5">
          <h4 className="flex items-center gap-2 font-mono font-bold uppercase tracking-wider text-[10px] text-ink">
            <span className="w-5 h-5 rounded-md bg-brutalYellow border border-ink flex items-center justify-center font-black text-[9px] shrink-0">01</span>
            Navigasi
          </h4>
          <ul className="mt-3 space-y-2 text-[11px] font-medium">
            <li><a href="index.html#deliverables" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Isi Paket (6 Output)</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="sistem.html#pillar-konten" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Pilar Konten 30 Hari</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="index.html#cara-kerja" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Cara Kerja</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="index.html#harga" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Harga & Paket</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="index.html#testimoni" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Testimoni Customer</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
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
            <li><a href="index.html#harga" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Harga & Paket</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="index.html#komparasi" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Karsa vs Agensi vs AI</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="index.html#testimoni" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Testimoni Customer</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="index.html#studi-kasus" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Case Study</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="index.html#garansi" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Garansi & SLA</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
            <li><a href="index.html#calculator" className="group flex items-center justify-between gap-2 text-stone-700 hover:text-ink transition"><span>Kalkulator Penghematan</span><Icon name="arrow-up-right" className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition" /></a></li>
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
