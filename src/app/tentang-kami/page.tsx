import { Icon } from "@/components/Icon";

export default function Page() {

  return (
    <div className="min-h-screen flex flex-col justify-between">

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
                  <a href="index.html#komparasi" className="block p-2 rounded-xl hover:bg-brutalYellow/40 transition border border-transparent hover:border-ink"><span className="block font-bold text-xs">Karsa vs Agensi vs In-house</span><span className="block text-[9px] text-stone-500 font-mono">Tabel perbandingan jujur.</span></a>
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
        <span className="flex items-center gap-1.5"><Icon name="check-circle-2" className="w-4 h-4 text-ink" /> 40+ Brand UMKM</span>
        <span>///</span>
        <span className="flex items-center gap-1.5"><Icon name="video" className="w-4 h-4 text-ink" /> TikTok FYP</span>
      </div>
    </div>
  </div>

  <main id="main-content">

  {/* HERO SECTION [POLKADOT BACKGROUND & BALANCED ASYMMETRICAL GRID] */}
  <section className="pt-10 pb-16 sm:pt-20 sm:pb-24 border-b-2 border-ink bg-canvas brutal-grid relative overflow-hidden">
    
    {/* Floating Brutalist Badges */}
    <div className="hidden lg:flex absolute top-10 right-16 w-28 h-28 bg-brutalYellow text-ink items-center justify-center font-display font-extrabold text-xs uppercase text-center p-2 rotate-12 z-0 brutal-star border-2 border-ink shadow-brutal animate-pulse pointer-events-none">
      100%<br />KREATIF
    </div>
    <div className="hidden xl:flex absolute top-28 left-6 badge-brutal bg-white px-3.5 py-2 rounded-xl items-center gap-2.5 -rotate-6 z-20">
      <div className="w-8 h-8 rounded-lg bg-ink text-brutalCyan flex items-center justify-center font-bold text-xs border border-ink">
        <Icon name="sparkles" className="w-4 h-4" />
      </div>
      <span className="font-mono font-bold text-xs text-ink">Built for Growth</span>
    </div>
    <div className="absolute top-1/3 left-2 text-2xl font-mono font-black text-ink select-none pointer-events-none opacity-40">✦</div>
    <div className="absolute bottom-1/4 right-8 text-3xl font-mono font-black text-ink select-none pointer-events-none opacity-30">✛</div>

    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        
        {/* Left Hero Text (7 Cols) */}
        <div className="lg:col-span-7 text-center lg:text-left space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-2.5 badge-brutal bg-brutalYellow px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs font-mono font-bold">
            <Icon name="info" className="w-4 h-4 sm:w-5 sm:h-5 text-ink" />
            <span>APA ITU KARSA STUDIO?</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-display font-extrabold tracking-tight text-ink leading-[1.12]">
            Sistem konten 30 hari untuk UMKM yang <br className="hidden sm:inline" />
            <span className="bg-brutalYellow text-ink px-2.5 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">bergerak cepat</span> tanpa burnout.
          </h1>

          <p className="text-xs sm:text-base text-stone-800 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans font-medium">
            Karsa Studio adalah penyedia sistem produksi konten untuk bisnis kecil dan menengah di Indonesia. Kami mengubah brief singkat menjadi inventaris 30 hari yang siap dieksekusi: naskah video kata-per-kata, caption berstruktur AIDA, artikel SEO, dan Notion OS — semuanya dikirim dalam 1x24 jam kerja.
          </p>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-3 pt-2">
            <button type="button" data-action="open-modal" className="btn-press bg-ink text-brutalYellow hover:bg-brutalYellow hover:text-ink px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl font-mono text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2.5 min-h-[48px] sm:min-h-[50px]">
              <span>Mulai dengan Brief (Rp299.000)</span>
              <Icon name="arrow-right" className="w-4 h-4" />
            </button>
            <a href="https://wa.me/6281288009920?text=Halo%20Karsa%20Studio%2C%20saya%20mau%20tanya%20paket%20konten" target="_blank" rel="noopener noreferrer" className="btn-press bg-white hover:bg-sand text-ink px-5 sm:px-6 py-3.5 sm:py-4 rounded-xl font-mono text-xs sm:text-sm font-bold transition flex items-center justify-center gap-2.5 min-h-[48px] sm:min-h-[50px]">
              <Icon name="message-circle" className="w-4 h-4 text-ink" />
              <span>Tanya via WhatsApp</span>
            </a>
          </div>

          {/* Proof Badges */}
          <div className="pt-6 border-t-2 border-ink grid grid-cols-3 gap-2.5 sm:gap-3 font-mono text-xs max-w-lg mx-auto lg:mx-0">
            <div className="p-3 sm:p-3.5 bg-white border-2 border-ink rounded-xl shadow-brutal-sm">
              <span className="font-display font-bold text-lg sm:text-2xl text-ink block">30</span>
              <span className="text-[10px] sm:text-[11px] text-stone-600 font-medium uppercase">Naskah Siap Rekam</span>
            </div>
            <div className="p-3 sm:p-3.5 bg-brutalYellow border-2 border-ink rounded-xl shadow-brutal-sm">
              <span className="font-display font-bold text-lg sm:text-2xl text-ink block">&lt;24 Jam</span>
              <span className="text-[10px] sm:text-[11px] text-ink font-bold uppercase">SLA Pengiriman</span>
            </div>
            <div className="p-3 sm:p-3.5 bg-white border-2 border-ink rounded-xl shadow-brutal-sm">
              <span className="font-display font-bold text-lg sm:text-2xl text-ink block">40+</span>
              <span className="text-[10px] sm:text-[11px] text-stone-600 font-medium uppercase">Brand Terlayani</span>
            </div>
          </div>
        </div>

        {/* Right Side: Manifesto Bento Card (5 Cols) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bento-card p-6 sm:p-8 rounded-3xl bg-white border-2 border-ink relative shadow-brutal-lg">
            <div className="flex items-center justify-between pb-4 border-b-2 border-ink mb-4">
              <span className="font-mono text-xs font-bold text-ink bg-brutalYellow px-2.5 py-1 rounded border border-ink">MANIFESTO STUDIO</span>
              <span className="text-xs font-mono font-bold text-stone-500">EST. 2026</span>
            </div>
            <h3 className="font-display font-bold text-xl sm:text-2xl text-ink">Konsistensi Mengalahkan Viral</h3>
            <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed mt-2">
              Sebagian besar UMKM Indonesia sudah punya produk bagus, tapi berhenti di tengah jalan saat harus konsisten membuat konten. Bukan karena tidak mau — melainkan karena setiap minggu mereka harus mulai dari halaman kosong.
            </p>
            <div className="mt-4 pt-4 border-t-2 border-ink font-mono text-xs text-ink font-bold flex items-center gap-2">
              <Icon name="check" className="w-4 h-4 text-ink" />
              <span>Sistem di Atas Keberuntungan</span>
            </div>
          </div>

          <div className="bento-card p-4 sm:p-5 rounded-2xl bg-brutalCyan/30 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                <Icon name="shield-check" className="w-5 h-5 text-ink" />
              </div>
              <div>
                <span className="font-display font-bold text-sm text-ink block">Garansi Kalibrasi 48 Jam</span>
                <span className="font-mono text-[10px] text-stone-700 block">Kesesuaian tone pesan brand 100% terjaga.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>

  {/* SECTION 2: 5 PRINSIP DASAR [FULL BALANCED BENTO GRID] */}
  <section className="py-12 sm:py-20 bg-canvas brutal-grid border-b-2 border-ink relative overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
        <div>
          <span className="badge-brutal inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-mono font-bold bg-ink text-brutalYellow uppercase">
            <Icon name="compass" className="w-3.5 h-3.5 text-brutalYellow" /> Core Values
          </span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2 sm:mt-3">
            5 Prinsip yang Kami Pegang di <span className="bg-brutalYellow text-ink px-2.5 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">Setiap Naskah</span>
          </h2>
        </div>
        <div className="font-mono text-xs sm:text-sm text-stone-700 max-w-sm font-medium leading-relaxed">
          Standar mutlak penulisan script dan arahan visual agar selalu bernilai bagi audiens toko kamu.
        </div>
      </div>

      {/* 6-Cell Balanced Bento Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        
        {/* Principle 01 */}
        <div className="bento-card p-6 rounded-3xl bg-brutalYellow flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="w-10 h-10 rounded-xl bg-white border-2 border-ink flex items-center justify-center font-mono font-bold text-ink shadow-brutal-sm">01</span>
              <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-white rounded font-bold">Fokus</span>
            </div>
            <h3 className="text-lg sm:text-xl font-display font-bold text-ink">Satu Video, Satu Pesan</h3>
            <p className="text-stone-800 text-xs sm:text-sm mt-2 font-sans leading-relaxed">
              Penonton hanya mengingat satu hal per video. Kami membuang basa-basi agar pesan utamamu tertanam kuat.
            </p>
          </div>
          <span className="font-mono text-[10px] text-ink mt-4 pt-2.5 border-t-2 border-ink block font-bold">Retensi Optimal</span>
        </div>

        {/* Principle 02 */}
        <div className="bento-card p-6 rounded-3xl bg-brutalCyan/40 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="w-10 h-10 rounded-xl bg-white border-2 border-ink flex items-center justify-center font-mono font-bold text-ink shadow-brutal-sm">02</span>
              <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-white rounded font-bold">Integritas</span>
            </div>
            <h3 className="text-lg sm:text-xl font-display font-bold text-ink">Hook Itu Janji, Bukan Clickbait</h3>
            <p className="text-stone-800 text-xs sm:text-sm mt-2 font-sans leading-relaxed">
              Pembuka yang memikat harus langsung ditepati dan dijawab oleh isi video tanpa membuat audiens kecewa.
            </p>
          </div>
          <span className="font-mono text-[10px] text-ink mt-4 pt-2.5 border-t-2 border-ink block font-bold">Brand Trust</span>
        </div>

        {/* Principle 03 */}
        <div className="bento-card p-6 rounded-3xl bg-brutalPink/40 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="w-10 h-10 rounded-xl bg-white border-2 border-ink flex items-center justify-center font-mono font-bold text-ink shadow-brutal-sm">03</span>
              <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-white rounded font-bold">Relevansi</span>
            </div>
            <h3 className="text-lg sm:text-xl font-display font-bold text-ink">Jual Masalah Sebelum Produk</h3>
            <p className="text-stone-800 text-xs sm:text-sm mt-2 font-sans leading-relaxed">
              Audiens membeli karena masalah mereka relevan dan dipahami, bukan sekadar melihat daftar spesifikasi fitur.
            </p>
          </div>
          <span className="font-mono text-[10px] text-ink mt-4 pt-2.5 border-t-2 border-ink block font-bold">Empathy First</span>
        </div>

        {/* Principle 04 */}
        <div className="bento-card p-6 rounded-3xl bg-brutalGreen/40 flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="w-10 h-10 rounded-xl bg-white border-2 border-ink flex items-center justify-center font-mono font-bold text-ink shadow-brutal-sm">04</span>
              <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-white rounded font-bold">Sistem</span>
            </div>
            <h3 className="text-lg sm:text-xl font-display font-bold text-ink">Konsistensi Mengalahkan Viral</h3>
            <p className="text-stone-800 text-xs sm:text-sm mt-2 font-sans leading-relaxed">
              Satu video viral tidak membangun bisnis, tetapi 30 video terstruktur konsisten membangun kepercayaan dan konversi.
            </p>
          </div>
          <span className="font-mono text-[10px] text-ink mt-4 pt-2.5 border-t-2 border-ink block font-bold">Repeatable Engine</span>
        </div>

        {/* Principle 05 */}
        <div className="bento-card p-6 rounded-3xl bg-white flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="w-10 h-10 rounded-xl bg-brutalYellow border-2 border-ink flex items-center justify-center font-mono font-bold text-ink shadow-brutal-sm">05</span>
              <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-canvas rounded font-bold">Data-Driven</span>
            </div>
            <h3 className="text-lg sm:text-xl font-display font-bold text-ink">Data Mengalahkan Perasaan</h3>
            <p className="text-stone-700 text-xs sm:text-sm mt-2 font-sans leading-relaxed">
              Keputusan struktur konten diambil dari retensi detik awal, shares, dan saves — bukan sekadar feeling subjektif tanpa arah.
            </p>
          </div>
          <span className="font-mono text-[10px] text-stone-500 mt-4 pt-2.5 border-t-2 border-ink block font-bold">Proven Metrics</span>
        </div>

        {/* Principle 06 (Filler / SLA Verification Card) */}
        <div className="bento-card p-6 rounded-3xl bg-ink text-canvas flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-start mb-4">
              <span className="w-10 h-10 rounded-xl bg-brutalYellow border-2 border-ink flex items-center justify-center font-mono font-black text-ink text-sm">SLA</span>
              <span className="badge-brutal text-[10px] font-mono uppercase px-2 py-0.5 bg-brutalGreen text-ink rounded font-bold">Garansi 48 Jam</span>
            </div>
            <h3 className="text-lg sm:text-xl font-display font-bold text-canvas">Jaminan Kualitas Studio</h3>
            <p className="text-stone-300 text-xs sm:text-sm mt-2 font-sans leading-relaxed">
              Semua paket terikat SLA 1x24 jam kerja dan garansi kalibrasi sudut pesan selama 48 jam penuh.
            </p>
          </div>
          <div className="mt-4 pt-2.5 border-t-2 border-stone-800 flex items-center justify-between font-mono text-[10px] text-brutalYellow font-bold">
            <span>Standar Produksi Karsa</span>
            <span>✓ Verified</span>
          </div>
        </div>

      </div>

    </div>
  </section>

  {/* SECTION 3: CARA KERJA SISTEM [POLKADOT] */}
  <section className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-grid relative">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
        <div>
          <span className="badge-brutal px-3.5 py-1 rounded-lg text-xs font-mono font-bold bg-brutalYellow text-ink uppercase">Alur Produksi</span>
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">
            Cara Kerja <span className="bg-brutalCyan text-ink px-2.5 py-0.5 inline-block -rotate-1 border-2 border-ink shadow-brutal-sm">Karsa Studio</span>
          </h2>
        </div>
        <div className="font-mono text-xs sm:text-sm text-stone-700 max-w-sm font-medium">
          Dari brief singkat sampai workspace siap pakai hanya dalam 4 tahapan cepat.
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        <div className="bento-card p-6 rounded-3xl bg-white flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs font-bold text-ink bg-brutalYellow px-2.5 py-1 rounded border border-ink mb-4 inline-block">LANGKAH 01</span>
            <h3 className="font-display font-bold text-lg text-ink mt-2">Isi Brief Singkat</h3>
            <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed mt-2">
              Kamu menceritakan produk unggulan, target pembeli, gaya komunikasi brand, dan akun kompetitor acuan.
            </p>
          </div>
          <span className="font-mono text-[10px] text-stone-500 mt-4 pt-2.5 border-t-2 border-ink block font-bold">Waktu: ~3 Menit</span>
        </div>

        <div className="bento-card p-6 rounded-3xl bg-white flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs font-bold text-ink bg-brutalCyan px-2.5 py-1 rounded border border-ink mb-4 inline-block">LANGKAH 02</span>
            <h3 className="font-display font-bold text-lg text-ink mt-2">Pemetaan Angle</h3>
            <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed mt-2">
              Tim Karsa membedah celah pasar menjadi 4 pilar sudut pesan yang relevan dan siap menarik perhatian target tokomu.
            </p>
          </div>
          <span className="font-mono text-[10px] text-stone-500 mt-4 pt-2.5 border-t-2 border-ink block font-bold">Riset Pasar & Gap</span>
        </div>

        <div className="bento-card p-6 rounded-3xl bg-white flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs font-bold text-ink bg-brutalPink px-2.5 py-1 rounded border border-ink mb-4 inline-block">LANGKAH 03</span>
            <h3 className="font-display font-bold text-lg text-ink mt-2">Naskah Disusun</h3>
            <p className="text-xs sm:text-sm text-stone-700 font-sans leading-relaxed mt-2">
              30 script kata-per-kata per detik, 30 caption AIDA, 4 artikel SEO, dan shot-list B-roll dirangkai menjadi kalender utuh.
            </p>
          </div>
          <span className="font-mono text-[10px] text-stone-500 mt-4 pt-2.5 border-t-2 border-ink block font-bold">Full 30-Day Pack</span>
        </div>

        <div className="bento-card p-6 rounded-3xl bg-brutalGreen/40 flex flex-col justify-between">
          <div>
            <span className="font-mono text-xs font-bold text-ink bg-white px-2.5 py-1 rounded border border-ink mb-4 inline-block">LANGKAH 04</span>
            <h3 className="font-display font-bold text-lg text-ink mt-2">Terima & Eksekusi</h3>
            <p className="text-xs sm:text-sm text-stone-800 font-sans leading-relaxed mt-2">
              Output dikirim dalam Notion Workspace dan cadangan Docs maksimal 1x24 jam kerja. Tinggal baca di teleprompter dan posting.
            </p>
          </div>
          <span className="font-mono text-[10px] text-ink mt-4 pt-2.5 border-t-2 border-ink block font-bold">SLA 24 Jam Kerja</span>
        </div>

      </div>

    </div>
  </section>

  {/* SECTION 4: HUBUNGI KAMI [RETRO GRID] */}
  <section className="py-12 sm:py-20 border-b-2 border-ink bg-canvas brutal-grid relative">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="badge-brutal px-3.5 py-1 rounded-lg text-xs font-mono font-bold bg-brutalYellow text-ink uppercase">Kontak Langsung</span>
        <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-ink mt-2">
          Terhubung dengan <span className="bg-brutalYellow text-ink px-2.5 py-0.5 inline-block rotate-1 border-2 border-ink shadow-brutal-sm">Studio Kami</span>
        </h2>
        <p className="text-xs sm:text-sm text-stone-600 font-mono mt-2">Melayani brand UMKM di seluruh Indonesia secara asinkron dan efisien.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        <div className="bento-card p-6 sm:p-8 rounded-3xl bg-white flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-brutalGreen border-2 border-ink flex items-center justify-center shadow-brutal-sm mb-4">
              <Icon name="message-square" className="w-6 h-6 text-ink" />
            </div>
            <h3 className="font-display font-bold text-xl text-ink">WhatsApp Studio</h3>
            <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed mt-1">Konsultasi seputar paket, kustomisasi industri, dan invoice.</p>
            <a href="https://wa.me/6281288009920" target="_blank" rel="noopener noreferrer" className="font-mono font-bold text-base sm:text-lg text-ink hover:underline mt-3 block">
              +62 812-8800-9920
            </a>
          </div>
          <span className="font-mono text-[11px] text-stone-500 mt-4 pt-3 border-t-2 border-ink block">Respon cepat: Senin-Jumat 09.00-18.00 WIB</span>
        </div>

        <div className="bento-card p-6 sm:p-8 rounded-3xl bg-white flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-brutalCyan border-2 border-ink flex items-center justify-center shadow-brutal-sm mb-4">
              <Icon name="mail" className="w-6 h-6 text-ink" />
            </div>
            <h3 className="font-display font-bold text-xl text-ink">Email Korespondensi</h3>
            <p className="text-xs sm:text-sm text-stone-600 font-sans leading-relaxed mt-1">Pengiriman brief terperinci, kerjasama agensi, dan bantuan akun.</p>
            <a href="mailto:halo@usekarsa.co" className="font-mono font-bold text-base sm:text-lg text-ink hover:underline mt-3 block">
              halo@usekarsa.co
            </a>
          </div>
          <span className="font-mono text-[11px] text-stone-500 mt-4 pt-3 border-t-2 border-ink block">Inquiry & Serah Terima Deliverable</span>
        </div>

      </div>

    </div>
  </section>

  {/* SECTION 5: CTA BANNER */}
  <section className="py-12 sm:py-20 bg-canvas brutal-grid border-b-2 border-ink relative">
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
      <div className="bento-card p-8 sm:p-12 rounded-3xl bg-brutalYellow flex flex-col items-center space-y-4 shadow-brutal-lg">
        <span className="badge-brutal px-3.5 py-1 rounded-lg text-xs font-mono font-bold bg-ink text-brutalYellow uppercase">Mulai Sekarang</span>
        <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-ink leading-tight">
          Kenal Kami? Sekarang Lihat Hasilnya.
        </h2>
        <p className="text-xs sm:text-base text-stone-800 max-w-xl font-medium font-sans">
          Dapatkan 30 video script kata-per-kata, 30 caption AIDA, 4 artikel SEO, dan Notion Content OS dalam 1x24 jam kerja.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button type="button" data-action="open-modal" className="btn-press bg-ink text-brutalYellow hover:bg-white hover:text-ink px-8 py-4 rounded-2xl font-mono text-sm font-bold transition flex items-center gap-2.5">
            <span>Buka Formulir Brief (Rp299.000)</span>
            <Icon name="arrow-right" className="w-4 h-4" />
          </button>
          <a href="index.html#harga" className="btn-press bg-white hover:bg-sand text-ink px-6 py-4 rounded-2xl font-mono text-sm font-bold transition">
            Lihat Pilihan Paket &rarr;
          </a>
        </div>
      </div>
    </div>
  </section>

  </main>

  {/* FOOTER */}
  <footer className="py-10 sm:py-14 bg-canvas brutal-grid text-stone-700 text-xs font-mono border-t-2 border-ink">
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center space-x-2">
            <span className="font-display text-ink text-2xl font-bold">Karsa</span>
            <span className="badge-brutal text-[9px] font-mono uppercase px-2 py-0.5 bg-brutalYellow text-ink rounded font-bold">Studio</span>
          </div>
          <p className="text-[11px] text-stone-600 font-sans mt-3 leading-relaxed">Sistem konten siap eksekusi untuk UMKM Indonesia. 30 hari naskah kata-per-kata, tanpa langganan mengikat.</p>
        </div>

        <div>
          <h4 className="text-ink font-bold uppercase tracking-wider text-[10px] mb-3">Navigasi</h4>
          <ul className="space-y-2 text-[11px]">
            <li><a href="index.html#deliverables" className="hover:underline transition">Isi Paket (6 Output)</a></li>
            <li><a href="index.html#harga" className="hover:underline transition">Harga & Paket</a></li>
            <li><button type="button" data-action="open-modal" className="hover:underline transition text-left">Formulir Brief</button></li>
          </ul>
        </div>

        <div>
          <h4 className="text-ink font-bold uppercase tracking-wider text-[10px] mb-3">Legal & Jaminan</h4>
          <ul className="space-y-2 text-[11px]">
            <li><a href="/terms" className="hover:underline transition">Syarat & Ketentuan</a></li>
            <li><a href="/privacy" className="hover:underline transition">Kebijakan Privasi</a></li>
            <li><a href="/refund" className="hover:underline transition">Jaminan SLA 24 Jam</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-ink font-bold uppercase tracking-wider text-[10px] mb-3">Kontak Studio</h4>
          <p className="text-[11px] text-stone-600 font-sans">WhatsApp: +62 812-3456-7890<br />Email: halo@usekarsa.co<br />Senin-Jumat, 09.00-18.00 WIB</p>
        </div>
      </div>

      <div className="mt-8 pt-5 border-t-2 border-ink text-[10px] text-stone-600 text-center sm:text-left flex flex-col sm:flex-row justify-between gap-2">
        <span>&copy; 2026 Karsa Studio (usekarsa.co). All rights reserved.</span>
        <span>Built for High Performance Execution.</span>
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
