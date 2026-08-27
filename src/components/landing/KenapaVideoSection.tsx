"use client";

import { MessagesSquare, Radar, Repeat2, Smartphone, TrendingUp } from "lucide-react";
export function KenapaVideoSection() {
  return (
<section id="kenapa-video" className="py-12 sm:py-16 border-b-2 border-ink bg-surface">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start">
              <div className="lg:col-span-5">
                <span className="badge-tag inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-wasabi text-ink">Pertanyaan Pertama</span>
                <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-3 leading-tight">Kenapa video pendek, bukan sekadar feed statis?</h2>
                <p className="text-xs sm:text-sm text-stone-600 font-sans mt-3 leading-relaxed">
                  Algoritma TikTok, Reels, dan Shorts memprioritaskan video yang membuat orang bertahan menonton. Untuk UMKM, artinya satu hal: video pendek memberi jangkauan terbesar dengan modal produksi terkecil.
                </p>
                <div className="mt-6 grid grid-cols-2 gap-3 font-mono text-xs">
                  <div className="p-3.5 border-2 border-ink rounded-xl bg-white shadow-brutal-sm">
                    <span className="font-serif text-2xl text-terracotta block">4x</span>
                    <span className="text-stone-600 text-[10px] font-bold">Jangkauan video vs foto statis</span>
                  </div>
                  <div className="p-3.5 border-2 border-ink rounded-xl bg-white shadow-brutal-sm">
                    <span className="font-serif text-2xl text-terracotta block">15-30s</span>
                    <span className="text-stone-600 text-[10px] font-bold">Durasi ideal yang ditonton sampai selesai</span>
                  </div>
                </div>
              </div>
              <div className="lg:col-span-7 grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="bento-pop p-5 rounded-2xl bg-white">
                  <Radar className="w-6 h-6 text-terracotta mb-3" />
                  <h3 className="font-bold text-sm text-ink">Algoritma menyukai retention</h3>
                  <p className="text-xs text-stone-600 font-sans mt-1.5 leading-relaxed">Video 15-30 detik yang ditonton penuh memberi sinyal kuat ke algoritma — postingan berikutnya mendapat jangkauan lebih besar.</p>
                </div>
                <div className="bento-pop p-5 rounded-2xl bg-sunflower/40">
                  <MessagesSquare className="w-6 h-6 text-ink mb-3" />
                  <h3 className="font-bold text-sm text-ink">DM adalah aset penjualan</h3>
                  <p className="text-xs text-stone-700 font-sans mt-1.5 leading-relaxed">Setiap video bisa diakhiri ajakan DM. Percakapan di DM = calon pembeli hangat yang bisa ditindaklanjuti.</p>
                </div>
                <div className="bento-pop p-5 rounded-2xl bg-wasabi/30">
                  <Smartphone className="w-6 h-6 text-wasabiDark mb-3" />
                  <h3 className="font-bold text-sm text-ink">Modal HP sudah cukup</h3>
                  <p className="text-xs text-stone-700 font-sans mt-1.5 leading-relaxed">Tidak perlu kamera sinema. Panduan B-Roll Karsa dirancang untuk direkam dengan HP yang kamu miliki hari ini.</p>
                </div>
                <div className="bento-pop p-5 rounded-2xl bg-white">
                  <Repeat2 className="w-6 h-6 text-terracotta mb-3" />
                  <h3 className="font-bold text-sm text-ink">Satu ide, banyak format</h3>
                  <p className="text-xs text-stone-600 font-sans mt-1.5 leading-relaxed">Satu naskah bisa dipotong menjadi Reels, TikTok, Shorts, dan Story — bonus repurposing framework kami mengaturnya.</p>
                </div>
                <div className="bento-pop p-5 rounded-2xl bg-white sm:col-span-2">
                  <TrendingUp className="w-6 h-6 text-terracotta mb-3" />
                  <h3 className="font-bold text-sm text-ink">Konsistensi mengalahkan viral</h3>
                  <p className="text-xs text-stone-600 font-sans mt-1.5 leading-relaxed">Satu video viral tidak membangun bisnis. 30 video konsisten dengan pesan yang sama — itulah yang membangun kepercayaan dan penjualan. Kalender Karsa dirancang untuk konsistensi itu.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
  );
}
