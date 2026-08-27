"use client";

import { PRINCIPLES } from "./landing-data";
export function ContentSchool() {
  return (
<section id="edukasi" className="py-12 sm:py-16 border-b-2 border-ink bg-canvas">
          <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
              <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Content School</span>
              <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">5 prinsip konten yang bertahan (gratis dibaca).</h2>
              <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1">Ini prinsip yang dipakai tim Karsa di setiap naskah. Bisa kamu pakai bahkan tanpa memesan.</p>
            </div>
            <div className="space-y-3">
              {PRINCIPLES.map((item) => (
                <details key={item.title} className="bento-pop rounded-2xl bg-white group">
                  <summary className="cursor-pointer list-none p-4 sm:p-5 flex items-center justify-between gap-4 font-mono text-xs font-bold text-ink">
                    <span>{item.title}</span>
                    <span className="text-terracotta transition-transform group-open:rotate-45 text-xl leading-none">+</span>
                  </summary>
                  <div className="px-4 sm:px-5 pb-5 pt-1 border-t-2 border-ink text-xs sm:text-sm text-stone-700 font-sans leading-relaxed">
                    {item.body}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
  );
}
