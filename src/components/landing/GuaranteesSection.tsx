"use client";

import { Clock3, ShieldCheck, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
export function GuaranteesSection() {
  return (
<section id="garansi" className="py-12 sm:py-16 border-b-2 border-ink bg-surface">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Komitmen Kami</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Garansi yang tertulis, bukan sekadar janji.</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-mono mt-2">Tiga lapis perlindungan sebelum dan sesudah kamu memesan.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
              <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-white">
                <span className="w-10 h-10 rounded-xl bg-terracotta text-ink border-2 border-ink flex items-center justify-center"><Clock3 className="w-5 h-5" /></span>
                <h3 className="font-serif text-xl text-ink mt-4">SLA 24 Jam</h3>
                <p className="text-xs text-stone-600 font-sans mt-2 leading-relaxed">Deliverable dikirim maksimal 1x24 jam kerja setelah brief lengkap &amp; pembayaran terkonfirmasi.</p>
                <div className="mt-4 pt-3 border-t-2 border-ink font-mono text-[11px] font-bold text-terracotta">Terlambat? +5 naskah gratis</div>
              </div>
              <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-wasabi/25">
                <span className="w-10 h-10 rounded-xl bg-wasabi text-ink border-2 border-ink flex items-center justify-center"><SlidersHorizontal className="w-5 h-5" /></span>
                <h3 className="font-serif text-xl text-ink mt-4">Kalibrasi 48 Jam</h3>
                <p className="text-xs text-stone-700 font-sans mt-2 leading-relaxed">Tone, istilah produk, dan sudut pesan bisa dikalibrasi dalam 48 jam pertama. Update kembali ke Notion maksimal 12 jam kerja.</p>
                <div className="mt-4 pt-3 border-t-2 border-ink font-mono text-[11px] font-bold text-wasabiDark">Gratis, sudah termasuk</div>
              </div>
              <div className="bento-pop p-5 sm:p-7 rounded-3xl bg-white">
                <span className="w-10 h-10 rounded-xl bg-sunflower text-ink border-2 border-ink flex items-center justify-center"><ShieldCheck className="w-5 h-5" /></span>
                <h3 className="font-serif text-xl text-ink mt-4">Hak Cipta &amp; Privasi</h3>
                <p className="text-xs text-stone-600 font-sans mt-2 leading-relaxed">Semua materi menjadi milik kamu setelah serah terima. Brief tidak dibagikan ke pihak lain. Opsi NDA tersedia.</p>
                <div className="mt-4 pt-3 border-t-2 border-ink font-mono text-[11px] font-bold text-ink">Detail di halaman Jaminan SLA</div>
              </div>
            </div>
            <div className="mt-6 p-4 sm:p-5 rounded-2xl border-2 border-ink bg-canvas flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="font-mono text-xs font-bold text-ink text-center sm:text-left">Proses pengerjaan bisa dipantau dari Member Workspace — status order kamu update di tiap tahap.</span>
              <Link href="/login" className="text-xs font-mono font-bold text-terracotta hover:underline shrink-0">Buka Member Workspace &rarr;</Link>
            </div>
          </div>
        </section>
  );
}
