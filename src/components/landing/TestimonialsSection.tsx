"use client";

import { TESTIMONI } from "./landing-data";
export function TestimonialsSection() {
  return (
<section id="testimoni" className="py-12 sm:py-16 border-b-2 border-ink bg-surface">
          <div className="max-w-5xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Kata Mereka</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Dari tim kecil yang mulai berhenti panik tiap Minggu malam.</h2>
              <div className="mt-4 inline-flex items-center gap-2 badge-tag bg-white px-4 py-2 rounded-full font-mono text-xs font-bold text-ink">
                <span className="text-sunflower text-sm">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
                <span>4.9/5 dari 40+ review batch</span>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {TESTIMONI.map((t) => (
                <div key={t.name} className={`bento-pop p-5 rounded-2xl ${t.dark ? "bg-ink text-canvas" : "bg-white"}`}>
                  <div className="flex items-center gap-1.5 text-sunflower text-xs mb-2">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                  <p className={`text-xs ${t.dark ? "text-stone-300" : "text-stone-700"} font-sans leading-relaxed`}>{t.quote}</p>
                  <div className={`mt-4 pt-3 border-t-2 ${t.dark ? "border-stone-700" : "border-ink"} flex items-center gap-2.5`}>
                    <span className={`w-8 h-8 rounded-full ${t.bg} border-2 border-ink flex items-center justify-center font-mono font-bold text-[10px] ${t.dark ? "text-ink" : ""}`}>{t.initial}</span>
                    <div><span className="block font-bold text-xs text-ink font-sans">{t.name}</span><span className={`block font-mono text-[10px] ${t.dark ? "text-stone-400" : "text-stone-500"}`}>{t.role}</span></div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-[10px] sm:text-[11px] text-stone-500 font-mono mt-5">Testimoni dikumpulkan dari percakapan WhatsApp &amp; email customer. Nama disamarkan demi privasi.</p>
          </div>
        </section>
  );
}
