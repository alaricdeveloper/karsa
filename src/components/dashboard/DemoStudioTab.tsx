"use client";

import { FileText, MessageSquare, Globe, Radar, Database, Camera, MonitorPlay } from "lucide-react";
import { DEMO_DAYS, NOTION_PILLAR_CLASSES, type DemoTab, type DemoDay } from "./dashboard-lib";

type Props = {
  activeDemoTab: DemoTab;
  activeDemoDay: DemoDay;
  onSwitchDemoTab: (tab: DemoTab) => void;
  onSwitchDemoDay: (day: DemoDay) => void;
};

export function DemoStudioTab({ activeDemoTab, activeDemoDay, onSwitchDemoTab, onSwitchDemoDay }: Props) {
  const sampleTabClass = (tab: DemoTab) => {
    const active = activeDemoTab === tab;
    return [
      "sample-tab-btn badge-tag px-4 py-2 rounded-xl text-xs font-mono font-bold transition",
      active ? "active bg-ink text-white" : "bg-white text-ink",
    ].join(" ");
  };

  const dayTabClass = (day: DemoDay) => {
    const active = activeDemoDay === day;
    return [
      "day-tab-btn sample-tab-btn badge-tag px-3.5 py-1.5 rounded-xl text-[10px] font-mono font-bold transition shrink-0",
      active ? "active bg-ink text-white" : "bg-white text-ink",
    ].join(" ");
  };

  return (
<section id="view-demo" role="tabpanel" aria-labelledby="tab-nav-demo" className="space-y-6 sm:space-y-8">
          <header className="flex items-center gap-3.5">
            <span className="w-11 h-11 rounded-xl bg-sunflower border-2 border-ink flex items-center justify-center font-mono font-bold text-sm shadow-brutal-sm shrink-0">03</span>
            <div>
              <h2 className="text-2xl sm:text-4xl font-serif font-bold text-ink leading-tight">Deliverables & Studio Demo</h2>
              <p className="text-[11px] sm:text-xs font-mono text-stone-600">Spesimen mutu: semua yang siap digunakan dalam 24 jam.</p>
            </div>
          </header>

          <section className="space-y-4">
            <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Semua yang Siap Digunakan dalam 24 Jam</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 font-mono text-xs">
              <div className="bento-pop p-5 rounded-2xl space-y-2 bg-white">
                <div className="w-9 h-9 rounded-xl bg-wasabi border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                  <FileText className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-ink">30 Naskah Video Pendek</h4>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Format kata-per-kata: Visual Hook (0-3s), Problem Framing, Solution, dan CTA.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl space-y-2 bg-white">
                <div className="w-9 h-9 rounded-xl bg-sunflower border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-ink">30 Takarir AIDA & 15 Tagar</h4>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Copywriting Attention, Interest, Desire, Action siap salin ke Instagram & Threads.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl space-y-2 bg-white">
                <div className="w-9 h-9 rounded-xl bg-canvas border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                  <Globe className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-ink">4 Artikel SEO Website</h4>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Artikel 1.000 kata lengkap dengan susunan heading H1/H2/H3 dan meta deskripsi.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl space-y-2 bg-white">
                <div className="w-9 h-9 rounded-xl bg-terracottaLight border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                  <Radar className="w-4 h-4 text-terracotta" />
                </div>
                <h4 className="font-serif font-bold text-base text-ink">Audit Celah Kompetitor</h4>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Pembedahan 1 akun kompetitor untuk menemukan sudut pesan yang belum tergarap.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl space-y-2 bg-white">
                <div className="w-9 h-9 rounded-xl bg-sunflower border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                  <Database className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-ink">Notion Content OS</h4>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Database Notion dengan Calendar Matrix View siap 1-click duplicate.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl space-y-2 bg-white">
                <div className="w-9 h-9 rounded-xl bg-wasabi border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                  <Camera className="w-4 h-4" />
                </div>
                <h4 className="font-serif font-bold text-base text-ink">Panduan Shot-List B-Roll</h4>
                <p className="text-stone-600 font-sans text-xs leading-relaxed">Panduan sudut kamera dan pencahayaan yang mudah direkam pakai kamera HP.</p>
              </div>
            </div>
          </section>

          <section className="space-y-4 pt-2">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Tampilan Naskah & Takarir Karsa</h3>
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1" role="tablist" aria-label="Contoh deliverables">
                <button role="tab" aria-selected={activeDemoTab === "script"} aria-controls="dview-script" onClick={() => onSwitchDemoTab("script")} id="dtab-script" className={sampleTabClass("script")}>Naskah Video</button>
                <button role="tab" aria-selected={activeDemoTab === "caption"} aria-controls="dview-caption" onClick={() => onSwitchDemoTab("caption")} id="dtab-caption" className={sampleTabClass("caption")}>Takarir AIDA</button>
                <button role="tab" aria-selected={activeDemoTab === "seo"} aria-controls="dview-seo" onClick={() => onSwitchDemoTab("seo")} id="dtab-seo" className={sampleTabClass("seo")}>Artikel SEO</button>
              </div>
            </div>

            <div className="bento-pop p-5 sm:p-8 rounded-3xl font-mono text-xs space-y-4 bg-white">
              <div id="dview-script" role="tabpanel" aria-labelledby="dtab-script" className={`space-y-4 ${activeDemoTab !== "script" ? "hidden" : ""}`}>
                <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1" role="tablist" aria-label="Pilih contoh hari">
                  {DEMO_DAYS.map((d) => (
                    <button key={d} role="tab" aria-selected={activeDemoDay === d} aria-controls={`dview-day-${d}`} onClick={() => onSwitchDemoDay(d)} id={`dday-${d}`} className={dayTabClass(d)}>
                      {d === "01" && "Day 01 · Edukasi"}
                      {d === "04" && "Day 04 · Edukasi"}
                      {d === "09" && "Day 09 · Bukti Sosial"}
                      {d === "21" && "Day 21 · Hiburan"}
                      {d === "26" && "Day 26 · Jualan"}
                    </button>
                  ))}
                </div>

                <div id="dview-day-01" role="tabpanel" aria-labelledby="dday-01" className={`space-y-4 ${activeDemoDay !== "01" ? "hidden" : ""}`}>
                  <div className="flex justify-between items-center pb-3 border-b-2 border-ink gap-3">
                    <div>
                      <span className="badge-tag px-2.5 py-1 rounded-lg text-[10px] font-bold bg-sunflower text-ink">Pilar: Edukasi Solusi</span>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-ink mt-1.5">Day 01 — Kesalahan Nomor 1 Pemilik Toko Online</h4>
                    </div>
                    <span className="text-stone-600 font-bold shrink-0">20-25s</span>
                  </div>
                  <div className="space-y-3 font-sans text-xs sm:text-sm text-stone-800 leading-relaxed">
                    <div className="p-4 bg-sunflower/20 border-2 border-ink rounded-2xl">
                      <strong className="text-ink font-mono text-xs block mb-1 font-bold">[00:00 - 00:03] VISUAL & AUDIO HOOK</strong>
                      <p>Talent menunjuk ke arah kamera dengan tumpukan HP di meja: <em>"Kesalahan nomor 1 yang bikin tokomu sepi padahal produknya bagus banget..."</em></p>
                    </div>
                    <div className="p-4 bg-canvas border-2 border-ink rounded-2xl">
                      <strong className="text-stone-600 font-mono text-xs block mb-1 font-bold">[00:03 - 00:18] VALUE DELIVERY</strong>
                      <p>Potong ke layar: <em>"Bukan produknya — tapi caramu ngomong. Kebanyakan toko jual fitur, padahal pembeli cuma peduli masalah mereka keselesaikan."</em> Lalu satu contoh: <em>"Kamu jualan serum, tapi yang mereka beli itu 'pagi tanpa muka kusam'."</em></p>
                    </div>
                    <div className="p-4 bg-wasabi/40 border-2 border-ink rounded-2xl">
                      <strong className="text-ink font-mono text-xs block mb-1 font-bold">[00:18 - 00:25] CALL TO ACTION</strong>
                      <p><em>"Follow dulu — besok gue bongkar rumus naskah yang ngejual tanpa jualan."</em></p>
                    </div>
                  </div>
                </div>

                <div id="dview-day-04" role="tabpanel" aria-labelledby="dday-04" className={`space-y-4 ${activeDemoDay !== "04" ? "hidden" : ""}`}>
                  <div className="flex justify-between items-center pb-3 border-b-2 border-ink gap-3">
                    <div>
                      <span className="badge-tag px-2.5 py-1 rounded-lg text-[10px] font-bold bg-sunflower text-ink">Pilar: Edukasi Solusi</span>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-ink mt-1.5">Day 04 — Mengapa Produk Konvensional Membebani Pengguna</h4>
                    </div>
                    <span className="text-stone-600 font-bold shrink-0">20-25s</span>
                  </div>
                  <div className="space-y-3 font-sans text-xs sm:text-sm text-stone-800 leading-relaxed">
                    <div className="p-4 bg-sunflower/20 border-2 border-ink rounded-2xl">
                      <strong className="text-ink font-mono text-xs block mb-1 font-bold">[00:00 - 00:03] VISUAL & AUDIO HOOK</strong>
                      <p>Talent menunjukkan tumpukan catatan manual berantakan: <em>"Kenapa masih buang waktu 2 jam tiap malam cuma buat mikirin ide konten besok?"</em></p>
                    </div>
                    <div className="p-4 bg-canvas border-2 border-ink rounded-2xl">
                      <strong className="text-stone-600 font-mono text-xs block mb-1 font-bold">[00:03 - 00:18] VALUE DELIVERY</strong>
                      <p>Tunjukkan kalender 30 hari Karsa: <em>"Di Karsa, kamu dapet 30 naskah per detik, takarir AIDA, dan panduan rekam HP langsung dalam 24 jam."</em></p>
                    </div>
                    <div className="p-4 bg-wasabi/40 border-2 border-ink rounded-2xl">
                      <strong className="text-ink font-mono text-xs block mb-1 font-bold">[00:18 - 00:25] CALL TO ACTION</strong>
                      <p><em>"Cek link di bio kami sekarang buat amankan batch tokomu sebelum kuota minggu ini ditutup!"</em></p>
                    </div>
                  </div>
                </div>

                <div id="dview-day-09" role="tabpanel" aria-labelledby="dday-09" className={`space-y-4 ${activeDemoDay !== "09" ? "hidden" : ""}`}>
                  <div className="flex justify-between items-center pb-3 border-b-2 border-ink gap-3">
                    <div>
                      <span className="badge-tag px-2.5 py-1 rounded-lg text-[10px] font-bold bg-canvas text-ink">Pilar: Bukti Sosial & Kredibilitas</span>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-ink mt-1.5">Day 09 — Apa Kata Pembeli Pertama Kami</h4>
                    </div>
                    <span className="text-stone-600 font-bold shrink-0">20-25s</span>
                  </div>
                  <div className="space-y-3 font-sans text-xs sm:text-sm text-stone-800 leading-relaxed">
                    <div className="p-4 bg-sunflower/20 border-2 border-ink rounded-2xl">
                      <strong className="text-ink font-mono text-xs block mb-1 font-bold">[00:00 - 00:03] VISUAL & AUDIO HOOK</strong>
                      <p>Talent memegang 3 tangkapan layar chat pembeli: <em>"3 pembeli pertama kami bilang hal yang sama — dan itu bikin kami deg-degan."</em></p>
                    </div>
                    <div className="p-4 bg-canvas border-2 border-ink rounded-2xl">
                      <strong className="text-stone-600 font-mono text-xs block mb-1 font-bold">[00:03 - 00:18] VALUE DELIVERY</strong>
                      <p>Zoom ke chat: <em>"'Awalnya ragu karena murah, ternyata hasilnya di luar ekspektasi.'"</em> Lanjut proses produksi: <em>"Di balik tiap batch, ada audit kompetitor dan QC copywriter — bukan naskah instan generik."</em></p>
                    </div>
                    <div className="p-4 bg-wasabi/40 border-2 border-ink rounded-2xl">
                      <strong className="text-ink font-mono text-xs block mb-1 font-bold">[00:18 - 00:25] CALL TO ACTION</strong>
                      <p><em>"Tanya apa pun soal batch kami di kolom komentar — dijawab langsung sama tim, bukan bot."</em></p>
                    </div>
                  </div>
                </div>

                <div id="dview-day-21" role="tabpanel" aria-labelledby="dday-21" className={`space-y-4 ${activeDemoDay !== "21" ? "hidden" : ""}`}>
                  <div className="flex justify-between items-center pb-3 border-b-2 border-ink gap-3">
                    <div>
                      <span className="badge-tag px-2.5 py-1 rounded-lg text-[10px] font-bold bg-sunflower text-ink">Pilar: Hiburan Ringan</span>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-ink mt-1.5">Day 21 — POV: Kamu Baru Tahu Fungsi Ini</h4>
                    </div>
                    <span className="text-stone-600 font-bold shrink-0">15-20s</span>
                  </div>
                  <div className="space-y-3 font-sans text-xs sm:text-sm text-stone-800 leading-relaxed">
                    <div className="p-4 bg-sunflower/20 border-2 border-ink rounded-2xl">
                      <strong className="text-ink font-mono text-xs block mb-1 font-bold">[00:00 - 00:03] VISUAL & AUDIO HOOK</strong>
                      <p>Talent memasang ekspresi terkejut sambil menunjuk produk: <em>"POV: kamu baru tahu fungsi ini setelah 3 bulan beli."</em></p>
                    </div>
                    <div className="p-4 bg-canvas border-2 border-ink rounded-2xl">
                      <strong className="text-stone-600 font-mono text-xs block mb-1 font-bold">[00:03 - 00:15] VALUE DELIVERY</strong>
                      <p>Demonstrasi cepat dengan gestur lucu: <em>"Ternyata begini cara pakainya — dan sekarang aku paham kenapa orang repeat order."</em> Satu fakta ringan soal produk diselipkan tanpa terasa jualan.</p>
                    </div>
                    <div className="p-4 bg-wasabi/40 border-2 border-ink rounded-2xl">
                      <strong className="text-ink font-mono text-xs block mb-1 font-bold">[00:15 - 00:20] CALL TO ACTION</strong>
                      <p><em>"Simpan video ini biar nggak lupa pas butuh."</em></p>
                    </div>
                  </div>
                </div>

                <div id="dview-day-26" role="tabpanel" aria-labelledby="dday-26" className={`space-y-4 ${activeDemoDay !== "26" ? "hidden" : ""}`}>
                  <div className="flex justify-between items-center pb-3 border-b-2 border-ink gap-3">
                    <div>
                      <span className="badge-tag px-2.5 py-1 rounded-lg text-[10px] font-bold bg-wasabi text-ink">Pilar: Jualan & CTA</span>
                      <h4 className="font-serif font-bold text-base sm:text-lg text-ink mt-1.5">Day 26 — Amankan Batch Sebelum Kuota Tutup</h4>
                    </div>
                    <span className="text-stone-600 font-bold shrink-0">20-25s</span>
                  </div>
                  <div className="space-y-3 font-sans text-xs sm:text-sm text-stone-800 leading-relaxed">
                    <div className="p-4 bg-sunflower/20 border-2 border-ink rounded-2xl">
                      <strong className="text-ink font-mono text-xs block mb-1 font-bold">[00:00 - 00:03] VISUAL & AUDIO HOOK</strong>
                      <p>Talent menunjukkan kalender dengan 3 slot tersisa: <em>"Sisa 3 slot batch minggu ini — dan selalu abis duluan di hari Jumat."</em></p>
                    </div>
                    <div className="p-4 bg-canvas border-2 border-ink rounded-2xl">
                      <strong className="text-stone-600 font-mono text-xs block mb-1 font-bold">[00:03 - 00:18] VALUE DELIVERY</strong>
                      <p>Bongkar isi batch sambil pegang barang: <em>"30 naskah, 30 takarir, 4 artikel SEO, semua jadi dalam 24 jam. Kalau nggak cocok? Revisi sudut 48 jam gratis."</em></p>
                    </div>
                    <div className="p-4 bg-wasabi/40 border-2 border-ink rounded-2xl">
                      <strong className="text-ink font-mono text-xs block mb-1 font-bold">[00:18 - 00:25] CALL TO ACTION</strong>
                      <p><em>"Klik link di bio, isi brief 5 menit, konten 30 harimu mulai diproduksi hari ini."</em></p>
                    </div>
                  </div>
                </div>
              </div>

              <div id="dview-caption" role="tabpanel" aria-labelledby="dtab-caption" className={`space-y-3 ${activeDemoTab !== "caption" ? "hidden" : ""}`}>
                <div className="pb-3 border-b-2 border-ink font-serif font-bold text-base text-ink">
                  Takarir Instagram & Threads — Formula AIDA
                </div>
                <div className="p-4 bg-canvas border-2 border-ink rounded-2xl font-sans text-xs sm:text-sm text-stone-800 leading-relaxed whitespace-pre-line">
                  {`Bukan produk Anda yang sepi peminat, cara penyampaian pesannya yang belum menyentuh masalah utama audiens. 👇

Saat Anda menjual fitur, orang bosan. Saat Anda menjual penghematan waktu dan kejelasan solusi, mereka langsung checkout.

Di Karsa Studio, kami menyusun 30 hari kalender konten berdasarkan audit celah kompetitor dan psikologi audiens spesifik Anda.

📌 Simpan postingan ini untuk referensi menyusun naskah minggu depan!
#karsastudio #kontenmarketing #umkmindonesia #strategibisnis`}
                </div>
                <div className="p-4 bg-white border-2 border-ink rounded-2xl font-sans text-xs sm:text-sm text-stone-800 leading-relaxed whitespace-pre-line">
                  {`Kulit kusam itu bukan karena kamu malas skincare-an — tapi karena rutinitas pagimu melewatkan satu langkah kecil. 👇

Kebanyakan orang pakai serum tanpa menyiapkan skin barrier-nya dulu. Hasilnya? Bahan aktif nggak terserap optimal, dan kamu menuduh produknya nggak ngefek.

Makanya Glow Skincare meracik serum dengan [bahan aktif] yang diformulasikan khusus untuk pemula — aman dipakai setiap hari tanpa iritasi.

✨ Minggu ini ada penawaran khusus: beli 2 serum gratis [bonus produk]. Kuota terbatas 50 paket.

📌 Klik link di bio sebelum promo berakhir!
#skincareroutine #glowingskin #skincareindonesia #beautytips`}
                </div>
              </div>

              <div id="dview-seo" role="tabpanel" aria-labelledby="dtab-seo" className={`space-y-3 ${activeDemoTab !== "seo" ? "hidden" : ""}`}>
                <div className="pb-3 border-b-2 border-ink font-serif font-bold text-base text-ink">
                  Kerangka Artikel SEO (1.000 Kata Siap Rank Google)
                </div>
                <div className="p-4 bg-canvas border-2 border-ink rounded-2xl font-mono text-xs space-y-2 text-stone-800">
                  <div className="font-bold text-ink text-sm sm:text-base">H1: Panduan Lengkap Memilih Strategi Konten untuk UMKM 2026</div>
                  <div className="text-xs text-stone-500">Volume Pencarian: 3.200/bln | Intent: Komersial & Solutif | Target: 1.000 kata</div>
                  <div className="p-3 bg-sunflower/20 border-2 border-ink rounded-xl text-xs text-stone-700 font-sans">
                    <strong className="text-ink font-mono block mb-1 text-[10px]">META DESCRIPTION (155 Karakter)</strong>
                    Bingung pilih strategi konten untuk UMKM? Ini 3 kesalahan fatal, perbandingan agensi vs kalender productized, dan cara rekam video profesional modal HP.
                  </div>
                  <div className="pl-4 space-y-1 text-stone-700 font-sans text-xs sm:text-sm mt-3">
                    <p><strong>H2: 3 Kesalahan Fatal yang Sering Dilakukan Pemilik Bisnis Baru</strong></p>
                    <p className="pl-4 text-stone-600">H3: Jual fitur, bukan solusi — cara membalik sudut pesan</p>
                    <p className="pl-4 text-stone-600">H3: Posting tanpa struktur: kenapa kalender 4 pilar mengalahkan posting acak</p>
                    <p><strong>H2: Perbandingan Efisiensi: Agensi Bulanan vs Kalender Productized</strong></p>
                    <p className="pl-4 text-stone-600">H3: Biaya riil agensi untuk UMKM + waktu tunggu revisi</p>
                    <p className="pl-4 text-stone-600">H3: Model 30 hari fixed-price: apa yang kamu terima di hari ke-1</p>
                    <p><strong>H2: Cara Merekam Video Profesional Hanya Bermodalkan Kamera Ponsel</strong></p>
                    <p className="pl-4 text-stone-600">H3: Pencahayaan window light tanpa beli lampu studio</p>
                    <p className="pl-4 text-stone-600">H3: Teleprompter HP: baca naskah tanpa terlihat membaca</p>
                    <p className="pt-1 text-terracotta font-bold font-mono text-[10px] uppercase tracking-wide">Bonus: FAQ Schema + internal link ke halaman order</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4 pt-2">
            <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Pratinjau Sistem yang Kamu Terima</h3>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
              <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-white space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-wasabi border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                      <Database className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-base text-ink leading-tight">Notion Content OS</h4>
                      <p className="text-[10px] font-mono text-stone-600 font-bold">Calendar Matrix View — siap 1-click duplicate</p>
                    </div>
                  </div>
                  <span className="badge-tag px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-canvas text-ink shrink-0">Demo</span>
                </div>

                <div className="border-2 border-ink rounded-2xl bg-canvas p-3 sm:p-4 space-y-2.5">
                  <div className="grid grid-cols-7 gap-1 text-center font-mono text-[10px] font-bold text-stone-600">
                    <span>Sen</span><span>Sel</span><span>Rab</span><span>Kam</span><span>Jum</span><span>Sab</span><span>Min</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {NOTION_PILLAR_CLASSES.map((cls, i) => (
                      <span key={i} className={`h-6 sm:h-7 flex items-center justify-center rounded-md border border-ink text-[10px] font-bold ${cls}`}>{i + 1}</span>
                    ))}
                  </div>
                  <div className="flex flex-wrap items-center gap-2 pt-1.5 font-mono text-[10px] font-bold text-stone-600">
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-sunflower border border-ink"></span>Edukasi</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-white border border-ink"></span>Bukti</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-sunflower/40 border border-ink"></span>Hiburan</span>
                    <span className="flex items-center gap-1"><span className="w-3 h-3 rounded bg-wasabi border border-ink"></span>Jualan</span>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">Setiap sel berisi naskah + takarir + shot-list lengkap. Klik hari, salin, rekam. Semua status produksi terpantau dari sini.</p>
              </div>

              <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-canvas space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-sunflower border-2 border-ink flex items-center justify-center shadow-brutal-sm">
                      <MonitorPlay className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-serif font-bold text-base text-ink leading-tight">Teleprompter Customer Hub</h4>
                      <p className="text-[10px] font-mono text-stone-600 font-bold">Baca naskah sambil rekam, tanpa terlihat membaca</p>
                    </div>
                  </div>
                  <span className="badge-tag px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-canvas text-ink shrink-0">Demo</span>
                </div>

                <div className="flex justify-center pt-1">
                  <div className="w-full max-w-[280px] bg-ink border-2 border-ink rounded-[2rem] p-2.5 shadow-brutal">
                    <div className="bg-ink rounded-[1.6rem] border border-stone-700 px-5 py-7 space-y-5">
                      <div className="flex items-center justify-between font-mono text-[10px] text-stone-400 font-bold">
                        <span>DAY 04 · 20-25s</span>
                        <span className="text-wasabi">1.0x</span>
                      </div>
                      <div className="space-y-3 text-center">
                        <p className="text-canvas text-base sm:text-lg leading-relaxed font-medium">"Kenapa masih buang waktu <span className="text-wasabi">2 jam tiap malam</span> cuma buat mikirin ide konten besok?"</p>
                        <p className="text-stone-400 text-xs leading-relaxed">Tunjukkan kalender 30 hari Karsa: <em>"Di Karsa, kamu dapet 30 naskah per detik dalam 24 jam."</em></p>
                      </div>
                      <div className="flex items-center justify-center gap-1.5 pt-1">
                        <span className="pipe-dot on"></span><span className="pipe-dot on"></span><span className="pipe-dot on"></span><span className="pipe-dot"></span>
                      </div>
                      <div className="text-center font-mono text-[10px] text-stone-500 font-bold">Gulir otomatis menyesuaikan kecepatan bacamu</div>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed">Mode gulir otomatis dengan kontrol kecepatan, besaran teks, dan pencahayaan — dirancang buat direkam pakai HP di depan jendela.</p>
              </div>
            </div>
          </section>
        </section>
  );
}
