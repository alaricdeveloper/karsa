"use client";

import { CalendarClock, Mail, MessageCircle } from "lucide-react";
export function ContactStrip() {
  return (
<section id="kontak" className="py-10 sm:py-14 border-b-2 border-ink bg-surface">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <div className="bento-pop rounded-3xl p-5 sm:p-8 bg-white grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 items-center">
              <div>
                <span className="badge-tag inline-flex px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Butuh Bantuan?</span>
                <h2 className="font-serif text-2xl sm:text-3xl text-ink mt-3">Tim kami balas &le; 4 jam kerja.</h2>
              </div>
              <div className="font-mono text-xs space-y-2.5">
                <div className="flex items-center gap-2.5"><span className="w-7 h-7 rounded-lg bg-wasabi border-2 border-ink flex items-center justify-center shrink-0"><MessageCircle className="w-3.5 h-3.5 text-ink" /></span><a href="https://wa.me/6281288009920" target="_blank" rel="noopener noreferrer" className="hover:text-terracotta hover:underline transition">WhatsApp: <strong className="text-ink">0812-8800-9920</strong></a></div>
                <div className="flex items-center gap-2.5"><span className="w-7 h-7 rounded-lg bg-sunflower border-2 border-ink flex items-center justify-center shrink-0"><Mail className="w-3.5 h-3.5 text-ink" /></span><span>Email: <strong className="text-ink">halo@usekarsa.com</strong></span></div>
                <div className="flex items-center gap-2.5"><span className="w-7 h-7 rounded-lg bg-terracottaLight border-2 border-ink flex items-center justify-center shrink-0"><CalendarClock className="w-3.5 h-3.5 text-terracotta" /></span><span>Senin-Jumat, 09.00-18.00 WIB</span></div>
              </div>
              <div className="md:text-right">
                <div className="font-mono text-[10px] font-bold text-stone-500 uppercase tracking-wider mb-1">Slot produksi mingguan terbatas</div>
                <p className="text-xs text-stone-600 font-sans leading-relaxed max-w-xs md:ml-auto">Batch diproses sesuai urutan pembayaran. Pesan lebih awal agar antrean tidak menunda tanggal mulai kamu.</p>
                <a href="#order" className="mt-3 inline-flex items-center gap-2 badge-tag bg-ink text-canvas px-4 py-2.5 rounded-xl font-mono text-xs font-bold hover:bg-terracotta hover:text-ink transition">Amankan slot minggu ini &rarr;</a>
              </div>
            </div>
          </div>
        </section>
  );
}
