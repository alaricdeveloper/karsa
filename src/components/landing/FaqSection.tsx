"use client";

import { useEffect, useState } from "react";
import { Plus, Search } from "lucide-react";
import { FAQ_ITEMS } from "./landing-data";

export function FaqSection() {
  const [faqQuery, setFaqQuery] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [mounted, setMounted] = useState(false);
  const toggleFaq = (idx: number) => setOpenFaq(openFaq === idx ? null : idx);
  const filteredFaqs = FAQ_ITEMS.filter((item) => item.q.toLowerCase().includes(faqQuery.toLowerCase()));

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section id="faq" className="py-12 sm:py-20 border-b-2 border-ink bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-6 sm:mb-8">
          <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">Pusat Informasi</span>
          <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-2">24 Pertanyaan Sebelum Kamu Memesan</h2>
          <p className="text-xs sm:text-sm text-stone-600 font-mono mt-1">Ketahui segala detail sebelum kamu memesan batch konten 30 hari.</p>
        </div>
        <div className="max-w-md mx-auto mb-6 sm:mb-8 relative">
          <label htmlFor="faqSearch" className="sr-only">Cari pertanyaan FAQ</label>
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
          <input type="text" id="faqSearch" value={faqQuery} onChange={(event) => setFaqQuery(event.target.value)} placeholder="Cari: revisi, tone, format, SLA, pembayaran, invoice, bahasa..." className="w-full bg-canvas border-2 border-ink rounded-xl pl-10 pr-4 py-3 text-xs text-ink focus:outline-none focus:ring-2 focus:ring-terracotta font-mono transition min-h-[44px]" />
        </div>
        <div className="space-y-3" id="faqContainer" aria-live="polite">
          {filteredFaqs.map((item) => {
            const originalIdx = FAQ_ITEMS.indexOf(item);
            return (
              <button
                key={item.q}
                type="button"
                className="faq-item bento-pop w-full p-4 sm:p-5 rounded-2xl cursor-pointer bg-white text-left"
                aria-expanded={openFaq === originalIdx}
                aria-controls={`faq-answer-${originalIdx + 1}`}
                onClick={() => toggleFaq(originalIdx)}
              >
                <div className="flex justify-between items-center gap-3">
                  <span className="text-xs font-mono font-bold text-terracotta">{String(originalIdx + 1).padStart(2, "0")}</span>
                  <h3 className="text-xs sm:text-base font-bold text-ink flex-1">{item.q}</h3>
                  <Plus className={`w-4 h-4 text-ink transition-transform shrink-0 ${openFaq === originalIdx ? "rotate-45" : ""}`} />
                </div>
                {(!mounted || openFaq === originalIdx) && (
                  <p id={`faq-answer-${originalIdx + 1}`} className="text-xs sm:text-sm text-stone-600 mt-2.5 sm:mt-3 pl-5 sm:pl-8 leading-relaxed font-sans">
                    {item.a}
                  </p>
                )}
              </button>
            );
          })}
        </div>
        {filteredFaqs.length === 0 && (
          <p id="faqEmptyState" className="text-center text-xs text-stone-500 font-mono mt-5">Tidak ada pertanyaan yang cocok. Coba kata kunci lain seperti revisi atau pembayaran.</p>
        )}
      </div>
    </section>
  );
}