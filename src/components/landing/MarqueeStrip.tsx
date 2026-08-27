"use client";

import { MARQUEE_ITEMS } from "./landing-data";
export function MarqueeStrip() {
  return (
<div className="py-3.5 border-b-2 border-ink bg-wasabi/30 overflow-hidden">
          <div className="flex items-center px-4 sm:px-6 max-w-7xl mx-auto">
            <div className="marquee-track flex gap-8 font-mono text-xs font-bold text-stone-600 whitespace-nowrap shrink-0">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => {
                const firstItem = i === 0 || i === MARQUEE_ITEMS.length;
                return (
                  <span key={i} className="flex items-center gap-8">
                    {firstItem && <span className="text-ink font-bold">{i === 0 ? "40+ Brand UMKM terlayani" : ""}</span>}
                    <span>{item}</span>
                    <span className="text-terracotta">•</span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
  );
}
