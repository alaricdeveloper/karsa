"use client";

import { useState } from "react";
import type { SeoArticle } from "@/lib/types";
import { Check } from "lucide-react";
import { outlineLines } from "./hub-lib";

const BADGES = ["bg-sunflower text-ink", "bg-wasabi text-ink", "bg-terracottaLight text-terracotta", "bg-sunflower text-ink"];

export function SeoArticles({ articles }: { articles: SeoArticle[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const copyOutline = async (idx: number) => {
    const a = articles[idx];
    if (!a) return;
    let text = `JUDUL: ${a.title}\nDESKRIPSI: ${a.description || ""}\nKEYWORD: ${a.article_type}\n\n`;
    outlineLines(a).forEach((l) => {
      text += `${l}\n`;
    });
    await navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 1600);
  };

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="w-11 h-11 rounded-xl bg-wasabi text-ink border-2 border-ink shadow-brutal-sm flex items-center justify-center font-mono font-bold text-sm shrink-0">
          03
        </span>
        <div>
          <h2 className="font-serif font-normal text-xl sm:text-2xl text-ink leading-tight">4 Artikel SEO Website</h2>
          <p className="text-[10px] sm:text-xs text-inkMuted font-mono font-bold">Kerangka artikel 1.000 kata dengan outline lengkap per bagian.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        {articles.map((a, i) => {
          const isOpen = openIdx === i;
          const isCopied = copiedIdx === i;
          return (
            <div key={a.id} className="bento-pop p-6 rounded-3xl space-y-3 bg-white">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className={`badge-tag px-2.5 py-0.5 rounded text-[10px] font-bold ${BADGES[i % 4]}`}>
                  Artikel 0{i + 1} • {a.article_type}
                </span>
                <span className="text-[10px] text-inkMuted font-mono font-bold">Keyword: {a.article_type}</span>
              </div>
              <h3 className="font-serif font-normal text-lg text-ink">{a.title}</h3>
              <p className="text-inkMuted font-sans text-xs leading-relaxed">{a.description}</p>

              <button
                onClick={() => setOpenIdx(isOpen ? null : i)}
                className="w-full py-2.5 bg-canvas hover:bg-wasabi border-2 border-ink rounded-xl text-ink font-bold transition shadow-brutal-sm min-h-[44px]"
              >
                Lihat Kerangka Lengkap <span>{isOpen ? "−" : "+"}</span>
              </button>

              {isOpen && (
                <div className="p-4 bg-canvas border-2 border-ink rounded-2xl font-sans text-xs space-y-3">
                  {outlineLines(a).map((line, li) => {
                    const isH1 = line.startsWith("H1");
                    const body = line.replace(/^H[12]:\s*/, "");
                    return (
                      <div key={li}>
                        <span className={`font-mono font-bold text-[10px] ${isH1 ? "text-ink" : "text-terracotta"} block`}>
                          {isH1 ? "H1 — " : "H2 — "}
                          {body}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}

              <button
                onClick={() => copyOutline(i)}
                className="w-full py-2.5 border-2 border-ink rounded-xl bg-white hover:bg-canvas text-ink font-bold transition shadow-brutal-sm min-h-[44px]"
              >
                {isCopied ? (
                  <span className="inline-flex items-center gap-1.5"><Check className="w-3.5 h-3.5 text-wasabiDark" /> Tersalin</span>
                ) : (
                  `Salin Kerangka Lengkap Artikel ${i + 1}`
                )}
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}