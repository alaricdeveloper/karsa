"use client";

import { Camera, CheckCircle2, Clapperboard, Mic, Smartphone, Sun } from "lucide-react";
export function ToolsSection() {
  return (
<section id="tools" className="py-12 sm:py-16 border-b-2 border-ink bg-surface">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Modal Minimal</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Cukup HP yang kamu sudah punya.</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1">Total investasi alat mulai dari Rp200 ribu, sekali beli.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              <div className="bento-pop p-5 rounded-2xl bg-white">
                <Smartphone className="w-6 h-6 text-terracotta mb-3" />
                <h3 className="font-bold text-sm text-ink">HP kamera 1080p</h3>
                <p className="text-xs text-stone-600 font-sans mt-1.5 leading-relaxed">Hampir semua HP keluaran 3 tahun terakhir sudah memenuhi. Rekam pakai kamera belakang, bukan selfie.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-white">
                <Camera className="w-6 h-6 text-terracotta mb-3" />
                <h3 className="font-bold text-sm text-ink">Tripod ringan</h3>
                <p className="text-xs text-stone-600 font-sans mt-1.5 leading-relaxed">Tripod ponsel Rp100 ribuan dengan clamp yang kokoh sudah cukup untuk angle statis dan miring.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-sunflower/40">
                <Mic className="w-6 h-6 text-ink mb-3" />
                <h3 className="font-bold text-sm text-ink">Mic clip-on</h3>
                <p className="text-xs text-stone-700 font-sans mt-1.5 leading-relaxed">Mic lavalier wireless Rp150 ribuan membuat suara jauh lebih jelas daripada mic HP bawaan.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-wasabi/30">
                <Clapperboard className="w-6 h-6 text-wasabiDark mb-3" />
                <h3 className="font-bold text-sm text-ink">Aplikasi edit gratis</h3>
                <p className="text-xs text-stone-700 font-sans mt-1.5 leading-relaxed">CapCut untuk potong &amp; subtitle otomatis. Tidak perlu langganan berbayar untuk kebutuhan dasar.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-white">
                <Sun className="w-6 h-6 text-terracotta mb-3" />
                <h3 className="font-bold text-sm text-ink">Cahaya jendela</h3>
                <p className="text-xs text-stone-600 font-sans mt-1.5 leading-relaxed">Rekam menghadap jendela di siang hari. Cahaya alami gratis adalah light setup terbaik untuk pemula.</p>
              </div>
              <div className="bento-pop p-5 rounded-2xl bg-ink text-canvas">
                <CheckCircle2 className="w-6 h-6 text-wasabi mb-3" />
                <h3 className="font-bold text-sm">Dan yang paling penting...</h3>
                <p className="text-xs text-stone-300 font-sans mt-1.5 leading-relaxed">Naskah yang jelas. Karsa menyediakan arahan visual, shot list, dan teleprompter — sisanya tinggal eksekusi.</p>
              </div>
            </div>
          </div>
        </section>
  );
}
