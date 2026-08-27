"use client";

import { useState } from "react";
import { SAMPLE_DATA } from "./landing-data";

export function SamplePreview() {
  const [category, setCategory] = useState("script");
  const [sampleIdx, setSampleIdx] = useState(0);
  const sample = SAMPLE_DATA[category][sampleIdx];

  return (
    <section id="preview" className="py-12 sm:py-20 border-b-2 border-ink bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8">
          <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Transparansi Mutu</span>
          <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">Lihat contoh output sebelum kamu memesan.</h2>
          <p className="text-xs sm:text-sm text-stone-600 font-sans mt-2 max-w-xl mx-auto leading-relaxed">Preview ini menunjukkan format dan kedalaman pengerjaan. Topik, angle, dan tone akan disesuaikan dengan brief bisnis kamu.</p>
        </div>
        <div role="tablist" aria-label="Jenis output" className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:justify-center mb-3">
          {(["script", "caption", "seo"] as const).map((cat) => (
            <button
              key={cat}
              type="button"
              id={`tab-${cat}`}
              role="tab"
              aria-selected={category === cat}
              aria-controls="samplePanel"
              onClick={() => { setCategory(cat); setSampleIdx(0); }}
              className={`tab-btn ${category === cat ? "active badge-tag bg-ink text-white" : "badge-tag bg-white text-ink"} px-3.5 sm:px-4 py-2 rounded-xl text-xs font-mono font-bold transition shrink-0`}
            >
              {cat === "script" ? "Video Scripts" : cat === "caption" ? "Captions AIDA" : "Struktur SEO"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 sm:justify-center mb-4 sm:mb-5 font-mono text-xs">
          {SAMPLE_DATA[category].map((_, idx) => (
            <button
              key={idx}
              type="button"
              aria-pressed={sampleIdx === idx}
              onClick={() => setSampleIdx(idx)}
              className={`sample-pill ${sampleIdx === idx ? "active px-3 py-1.5 rounded-lg border-2 border-ink bg-ink text-white" : "px-3 py-1.5 rounded-lg border-2 border-ink bg-white text-ink"} font-bold shrink-0`}
            >
              {`Contoh ${idx + 1}: ${idx === 0 ? "Kuliner (F&B)" : "Skincare / D2C"}`}
            </button>
          ))}
        </div>
        <div id="samplePanel" role="tabpanel" aria-live="polite" className="bento-pop p-5 sm:p-8 rounded-3xl bg-white font-mono text-xs min-h-[240px]">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2.5 sm:pb-3 border-b-2 border-ink text-stone-500 gap-1 mb-3 sm:mb-4">
            <span id="sampleTitle" className="font-bold text-ink sm:font-normal">{sample.title}</span>
            <span id="sampleBadge" className="text-[10px] badge-tag bg-wasabi px-2 py-0.5 rounded text-ink font-bold self-start sm:self-auto">{sample.niche}</span>
          </div>
          <div id="sampleBody" className="space-y-3 sm:space-y-4 font-sans text-xs sm:text-sm text-stone-800 leading-relaxed">
            {sample.body}
          </div>
        </div>
      </div>
    </section>
  );
}