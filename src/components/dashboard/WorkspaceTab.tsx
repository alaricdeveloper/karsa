"use client";

import { Send, Zap, SlidersHorizontal, Play, Calendar, Plus, ArrowRight, Clock, RefreshCw, CheckCircle2, Sparkles, Wand2, ChevronDown } from "lucide-react";
import { getOrderStatusLabel, getOrderStatusClass, orderStageIndex, type Order, type Profile } from "./dashboard-lib";

type Props = {
  orders: Order[];
  profile: Profile;
  onOpenNewOrder: () => void;
  onGoToTools: () => void;
};

export function WorkspaceTab({ orders, profile, onOpenNewOrder, onGoToTools }: Props) {
  return (
<section id="view-workspace" tabIndex={-1} role="tabpanel" aria-labelledby="tab-nav-workspace" className="space-y-6 sm:space-y-8">
          <header className="flex items-center gap-3.5">
            <span className="w-11 h-11 rounded-xl bg-terracotta border-2 border-ink flex items-center justify-center font-mono font-bold text-sm shadow-brutal-sm shrink-0">01</span>
            <div>
              <h1 className="text-2xl sm:text-4xl font-serif font-bold text-ink leading-tight">Workspace & Inventaris</h1>
              <p className="text-[11px] sm:text-xs font-mono text-stone-600">Konsol kalender 30 hari: status, antrean, dan pipeline produksi.</p>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-5">
            <div className="lg:col-span-2 bento-pop p-5 sm:p-8 rounded-3xl bg-white flex flex-col justify-between gap-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-mono uppercase tracking-wider text-ink bg-wasabi border-2 border-ink px-3 py-1 rounded-full font-bold shadow-brutal-sm">
                  <span className="w-2 h-2 rounded-full bg-terracotta pulse-dot border border-ink"></span>
                  SLA 24 Jam: Siap Menerima Brief
                </div>
                <h2 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-serif text-ink leading-[1.1]">
                  Selamat datang, <span className="italic text-terracotta">{profile.displayName || "Kreator"}</span>.
                  <span className="block text-stone-700 text-lg sm:text-2xl mt-2 font-normal">Inventaris konten 30 harimu siap diorkestrasi.</span>
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 font-medium leading-relaxed max-w-xl">
                  Kirim formulir brief bisnismu untuk menerima 30 naskah video kata-per-kata, 30 takarir AIDA, 4 artikel SEO, dan Notion Content OS dalam 1&times;24 jam kerja.
                </p>
              </div>
            </div>

            <aside className="bg-terracotta border-2 border-ink rounded-3xl shadow-brutal p-5 sm:p-7 flex flex-col justify-between gap-5">
              <div className="space-y-3">
                <h3 className="font-serif text-2xl sm:text-3xl text-white leading-tight">Batch baru,<br />24 jam jadi.</h3>
                <p className="text-xs text-ink leading-relaxed font-medium">30 naskah + 30 takarir AIDA + 4 artikel SEO + Notion Content OS.</p>
                <p className="font-mono text-lg sm:text-xl font-bold text-ink">Rp299.000 <span className="text-ink text-xs font-bold">/ 30 hari</span></p>
              </div>
              <div className="space-y-2.5">
                <button onClick={onOpenNewOrder} className="w-full px-5 py-4 bg-ink hover:bg-canvas hover:text-ink text-canvas rounded-2xl font-mono text-xs font-bold transition flex items-center justify-center gap-2 min-h-[48px] shadow-brutal-sm">
                  <Sparkles className="w-4 h-4 text-wasabi" />
                  <span>Mulai Order Batch</span>
                </button>
                <button onClick={onGoToTools} className="w-full px-5 py-3 border-2 border-ink bg-white hover:bg-canvas text-ink rounded-2xl font-mono text-xs font-bold transition flex items-center justify-center gap-2 min-h-[44px]">
                  <Wand2 className="w-4 h-4" />
                  <span>Coba Generator Hook Gratis</span>
                </button>
              </div>
            </aside>
          </div>

          <div className="bento-pop rounded-3xl bg-surface overflow-hidden p-0">
            <div className="readout-grid font-mono text-xs">
              <div className="readout-cell">
                <span className="text-[10px] text-stone-600 uppercase font-bold block tracking-wide">Batch Aktif</span>
                <span className="text-xl sm:text-2xl font-bold font-serif text-ink mt-1 block">{orders.length} Batch</span>
                <span className="text-[10px] text-stone-600 block">Antrean real-time</span>
              </div>
              <div className="readout-cell">
                <span className="text-[10px] text-stone-600 uppercase font-bold block tracking-wide">Deliverables</span>
                <span className="text-xl sm:text-2xl font-bold font-serif text-ink mt-1 block">30 Naskah</span>
                <span className="text-[10px] text-stone-600 block">Visual + audio hook</span>
              </div>
              <div className="readout-cell bg-wasabi">
                <span className="text-[10px] text-wasabiDark uppercase font-bold block tracking-wide">Turnaround</span>
                <span className="text-xl sm:text-2xl font-bold font-serif text-ink mt-1 block">&lt; 24 Jam</span>
                <span className="text-[10px] text-wasabiDark font-bold block">QC tim copywriter</span>
              </div>
              <div className="readout-cell">
                <span className="text-[10px] text-stone-600 uppercase font-bold block tracking-wide">Kalibrasi</span>
                <span className="text-xl sm:text-2xl font-bold font-serif text-terracotta mt-1 block">48 Jam</span>
                <span className="text-[10px] text-stone-600 block">Bebas revisi sudut</span>
              </div>
            </div>
          </div>

          <section className="space-y-4">
            <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Perjalanan Batch Kamu</h3>
            <div className="bento-pop rounded-3xl bg-surface overflow-hidden p-0">
              <div className="readout-grid font-mono text-xs">
                <div className="readout-cell space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-canvas border-2 border-ink flex items-center justify-center shrink-0">
                      <Send className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-ink">Kirim Brief</span>
                  </div>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Form 5 menit, Brand Vault mengisi otomatis, cukup tambah deskripsi produk.</p>
                </div>
                <div className="readout-cell space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-canvas border-2 border-ink flex items-center justify-center shrink-0">
                      <Zap className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-ink">Produksi 24 Jam</span>
                  </div>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">AI drafting + kurasi copywriter senior. Timer berjalan begitu brief masuk.</p>
                </div>
                <div className="readout-cell space-y-2 bg-wasabi/30">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-wasabi border-2 border-ink flex items-center justify-center shrink-0">
                      <SlidersHorizontal className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-ink">Kalibrasi 48 Jam</span>
                  </div>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Bebas revisi sudut pesan sampai tone-nya pas dengan karakter tokomu.</p>
                </div>
                <div className="readout-cell space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-canvas border-2 border-ink flex items-center justify-center shrink-0">
                      <Play className="w-4 h-4" />
                    </div>
                    <span className="font-bold text-ink">Rekam & Posting</span>
                  </div>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Baca naskah langsung dari teleprompter di Customer Hub, rekam pakai HP.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Anatomi Kalender 30 Hari: 4 Pilar</h3>
            <div className="bento-pop rounded-3xl bg-surface overflow-hidden p-0">
              <div className="readout-grid font-mono text-xs">
                <div className="readout-cell space-y-2">
                  <span className="badge-tag inline-block px-2 py-0.5 rounded bg-sunflower text-ink font-bold text-[10px]">Hari 1 — 7</span>
                  <h4 className="font-serif font-bold text-base text-ink">Edukasi Solusi</h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Naskah yang mendidik sekaligus menjual: bangun otoritas sejak hari pertama.</p>
                  <p className="text-stone-500 font-sans text-[11px] italic leading-relaxed">Contoh: "Mengapa [masalah umum] bikin pembelimu rugi setiap minggu."</p>
                </div>
                <div className="readout-cell space-y-2">
                  <span className="badge-tag inline-block px-2 py-0.5 rounded bg-canvas text-ink font-bold text-[10px]">Hari 8 — 14</span>
                  <h4 className="font-serif font-bold text-base text-ink">Bukti Sosial & Kredibilitas</h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Testimoni, proses produksi, behind-the-scene: buktikan kamu bukan abal-abal.</p>
                  <p className="text-stone-500 font-sans text-[11px] italic leading-relaxed">Contoh: "3 pembeli pertama kami bilang hal yang sama tentang produk ini."</p>
                </div>
                <div className="readout-cell space-y-2 bg-sunflower/20">
                  <span className="badge-tag inline-block px-2 py-0.5 rounded bg-sunflower text-ink font-bold text-[10px]">Hari 15 — 22</span>
                  <h4 className="font-serif font-bold text-base text-ink">Hiburan Ringan</h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Meme, tren, dan interaksi: jaga akun tetap hidup dan relatable.</p>
                  <p className="text-stone-500 font-sans text-[11px] italic leading-relaxed">Contoh: "POV: kamu baru tahu cara pakai produk ini yang bener."</p>
                </div>
                <div className="readout-cell space-y-2 bg-wasabi/40">
                  <span className="badge-tag inline-block px-2 py-0.5 rounded bg-wasabi text-ink font-bold text-[10px]">Hari 23 — 30</span>
                  <h4 className="font-serif font-bold text-base text-ink">Jualan & CTA</h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Penawaran, promo, dan urgency: konversi penonton jadi pembeli.</p>
                  <p className="text-stone-500 font-sans text-[11px] italic leading-relaxed">Contoh: "Batch minggu ini tersisa [X] slot — amankan sebelum tutup."</p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex justify-between items-center gap-3">
              <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Inventaris Batch Konten Saya</h3>
              <span className="badge-tag px-3 py-1 bg-sunflower text-ink rounded-xl text-xs font-mono font-bold shrink-0">{orders.length} Batch</span>
            </div>

            <div className="space-y-3">
              {orders.length === 0 ? (
                <div className="bento-pop p-8 sm:p-12 rounded-3xl text-center space-y-4 bg-white">
                  <div className="w-12 h-12 rounded-2xl bg-canvas border-2 border-ink flex items-center justify-center mx-auto text-stone-600 shadow-brutal-sm">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <div className="max-w-md mx-auto space-y-1">
                    <h3 className="font-serif font-bold text-lg sm:text-xl text-ink">Belum Ada Pesanan Aktif</h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      Kirim brief pertamamu sekarang untuk mendapatkan inventaris kalender 30 hari siap pakai.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button onClick={onOpenNewOrder} className="inline-flex items-center gap-2 px-6 py-3.5 bg-terracotta text-white text-xs font-mono font-bold rounded-2xl hover:bg-ink transition shadow-brutal min-h-[44px]">
                      <Plus className="w-4 h-4 text-wasabi" />
                      <span>Kirim Parameter Brief (Rp299k)</span>
                    </button>
                  </div>
                </div>
              ) : (
                orders.map((order) => {
                  const stage = orderStageIndex(order.status);
                  const stageDots = [1, 2, 3, 4].map((s) => (
                    <span key={s} className={`pipe-dot ${s <= stage ? "on" : ""}`}></span>
                  ));
                  return (
                    <div key={order.orderId} className="bento-pop hoverable p-5 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white">
                      <div className="space-y-1.5 min-w-0">
                        <div className="flex items-center gap-2 font-mono text-xs text-stone-600">
                          <span className="font-bold text-ink">{order.orderId}</span>
                          <span>{order.category}</span>
                        </div>
                        <h4 className="font-serif font-bold text-lg text-ink truncate">{order.brand}</h4>
                        <p className="text-xs text-stone-600 truncate">{order.description}</p>
                        <div className="flex items-center gap-1.5 pt-1" aria-label={`Progress produksi: tahap ${stage} dari 4`}>
                          {stageDots}
                          <span className="text-[10px] text-stone-600 font-bold ml-1">Tahap {stage}/4</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end pt-3 sm:pt-0 border-t-2 sm:border-t-0 border-ink shrink-0">
                        <span className={`border-2 ${getOrderStatusClass(order.status)} px-3 py-1 rounded-xl text-xs font-mono font-bold`}>
                          {getOrderStatusLabel(order.status)}
                        </span>
                        <a href={`/portal/${order.orderId}`} className="px-4 py-2.5 bg-ink text-canvas hover:bg-terracotta hover:text-white text-xs font-mono font-bold rounded-xl transition flex items-center gap-1.5 min-h-[40px] shadow-brutal-sm">
                          <span>Buka Hub</span>
                          <ArrowRight className="w-3.5 h-3.5 text-wasabi" />
                        </a>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </section>

          <section className="space-y-4 pt-2">
            <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Alur Kerja Produksi 24 Jam Kami</h3>
            <div className="bento-pop rounded-3xl bg-surface overflow-hidden p-0">
              <div className="readout-grid font-mono text-xs">
                <div className="readout-cell space-y-2">
                  <span className="badge-tag inline-block px-2 py-0.5 rounded bg-canvas text-ink font-bold text-[10px]">Jam 00 — 04</span>
                  <h4 className="font-serif font-bold text-base text-ink">Audit Celah & Positioning</h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Pembedahan akun kompetitor dan penetapan 4 pilar sudut pandang diferensiasi brand.</p>
                </div>
                <div className="readout-cell space-y-2">
                  <span className="badge-tag inline-block px-2 py-0.5 rounded bg-canvas text-ink font-bold text-[10px]">Jam 04 — 12</span>
                  <h4 className="font-serif font-bold text-base text-ink">AI Script Drafting Engine</h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Penyusunan 30 naskah video per detik, 30 takarir AIDA, dan 4 artikel SEO.</p>
                </div>
                <div className="readout-cell space-y-2">
                  <span className="badge-tag inline-block px-2 py-0.5 rounded bg-canvas text-ink font-bold text-[10px]">Jam 12 — 20</span>
                  <h4 className="font-serif font-bold text-base text-ink">Human QC & Polish</h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Kurasi oleh tim copywriter senior untuk memastikan nada bicara alami.</p>
                </div>
                <div className="readout-cell space-y-2 bg-wasabi/40">
                  <span className="badge-tag inline-block px-2 py-0.5 rounded bg-wasabi text-ink font-bold text-[10px]">Jam 20 — 24</span>
                  <h4 className="font-serif font-bold text-base text-ink">Notion & Studio Delivery</h4>
                  <p className="text-stone-600 font-sans text-xs leading-relaxed">Pengiriman link Notion Database dan akses Teleprompter interaktif.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="bento-pop rounded-3xl bg-canvas overflow-hidden p-0">
            <div className="trio-grid">
              <div className="trio-cell flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-wasabi border-2 border-ink flex items-center justify-center shrink-0 shadow-brutal-sm">
                  <Clock className="w-5 h-5 text-ink" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-ink">Garansi Tepat Waktu 24 Jam</h4>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">Jika pengiriman lewat 24 jam, dapatkan ekstra 5 naskah video gratis.</p>
                </div>
              </div>
              <div className="trio-cell flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-sunflower border-2 border-ink flex items-center justify-center shrink-0 shadow-brutal-sm">
                  <RefreshCw className="w-5 h-5 text-ink" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-ink">Garansi Kalibrasi 48 Jam</h4>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">Bebas revisi sudut pesan jika belum sesuai dengan karakter tokomu.</p>
                </div>
              </div>
              <div className="trio-cell flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-terracottaLight border-2 border-ink flex items-center justify-center shrink-0 shadow-brutal-sm">
                  <CheckCircle2 className="w-5 h-5 text-terracotta" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-base text-ink">Naskah Kata-per-Kata</h4>
                  <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">Bukan poin kasar. Naskah siap dibaca langsung di teleprompter HP.</p>
                </div>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <h3 className="text-xl sm:text-3xl font-serif font-bold text-ink">Pertanyaan Umum Member</h3>
            <div className="bento-pop rounded-3xl bg-surface overflow-hidden p-0">
              <details className="faq-item border-b-2 border-ink last:border-b-0">
                <summary className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4 cursor-pointer list-none font-mono text-xs font-bold text-ink hover:bg-canvas transition">
                  <span>Kalau naskahnya nggak cocok sama tone toko saya?</span>
                  <ChevronDown className="faq-chev w-4 h-4 shrink-0 transition-transform" />
                </summary>
                <div className="px-5 sm:px-7 pb-5 -mt-1 text-xs text-stone-600 font-sans leading-relaxed max-w-3xl">
                  Tenang, ada garansi kalibrasi 48 jam. Tim copywriter merevisi sudut pesan gratis sampai nadanya pas dengan karakter brand kamu. Bukan revisi token, tapi paham sudut.
                </div>
              </details>
              <details className="faq-item border-b-2 border-ink last:border-b-0">
                <summary className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4 cursor-pointer list-none font-mono text-xs font-bold text-ink hover:bg-canvas transition">
                  <span>Kapan batch mulai diproduksi setelah saya kirim brief?</span>
                  <ChevronDown className="faq-chev w-4 h-4 shrink-0 transition-transform" />
                </summary>
                <div className="px-5 sm:px-7 pb-5 -mt-1 text-xs text-stone-600 font-sans leading-relaxed max-w-3xl">
                  Begitu brief masuk, timer 24 jam langsung berjalan. Pengiriman via email dan WhatsApp: link Notion Content OS siap duplicate + akses teleprompter Customer Hub.
                </div>
              </details>
              <details className="faq-item border-b-2 border-ink last:border-b-0">
                <summary className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4 cursor-pointer list-none font-mono text-xs font-bold text-ink hover:bg-canvas transition">
                  <span>Saya cuma punya HP. Bisa bikin kontennya?</span>
                  <ChevronDown className="faq-chev w-4 h-4 shrink-0 transition-transform" />
                </summary>
                <div className="px-5 sm:px-7 pb-5 -mt-1 text-xs text-stone-600 font-sans leading-relaxed max-w-3xl">
                  Bisa, malah itu skenario utama kami. Semua naskah ditulis untuk direkam pakai kamera HP, dibaca langsung dari teleprompter di Customer Hub, dengan panduan rekam di Panel 04.
                </div>
              </details>
              <details className="faq-item">
                <summary className="flex items-center justify-between gap-4 px-5 sm:px-7 py-4 cursor-pointer list-none font-mono text-xs font-bold text-ink hover:bg-canvas transition">
                  <span>Bisa pesan batch lagi bulan depan?</span>
                  <ChevronDown className="faq-chev w-4 h-4 shrink-0 transition-transform" />
                </summary>
                <div className="px-5 sm:px-7 pb-5 -mt-1 text-xs text-stone-600 font-sans leading-relaxed max-w-3xl">
                  Bisa. Batch bersifat bulanan, dan karena Brand Vault menyimpan parameter tokomu, brief batch berikutnya tinggal 1 menit; tim kami juga menyiapkan sudut baru tiap bulan biar nggak monoton.
                </div>
              </details>
            </div>
          </section>
        </section>
  );
}
