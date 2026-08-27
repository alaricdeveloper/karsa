"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { PROOFS } from "./landing-data";

export function SocialProofToast() {
  const [toast, setToast] = useState<{ brand: string; time: string } | null>(null);
  const proofIdx = useRef(0);
  const proofShown = useRef(false);

  // Hanya muncul setelah user scroll (tidak menimpa hero), lalu berotasi tiap 12 detik
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canShow = () => window.scrollY > Math.min(window.innerHeight * 0.6, 900);
    const showProof = () => {
      const data = PROOFS[proofIdx.current % PROOFS.length];
      setToast({ brand: `${data.brand} (${data.location})`, time: `Baru memesan batch 30 hari • ${data.time}` });
      window.setTimeout(() => setToast(null), 4500);
      proofIdx.current += 1;
    };
    const showOnce = () => {
      if (canShow() && !proofShown.current) {
        proofShown.current = true;
        showProof();
        window.removeEventListener("scroll", showOnce);
      }
    };
    window.addEventListener("scroll", showOnce, { passive: true });
    const fallback = window.setTimeout(showOnce, 15000);
    const rotation = window.setInterval(() => {
      if (proofShown.current) showProof();
    }, 12000);
    return () => {
      window.removeEventListener("scroll", showOnce);
      window.clearTimeout(fallback);
      window.clearInterval(rotation);
    };
  }, []);

  if (!toast) return null;

  return (
    <div id="liveProofToast" role="status" aria-live="polite" aria-atomic="true" className="fixed bottom-20 sm:bottom-24 xl:bottom-6 left-4 z-30 bg-white border-2 border-ink p-2.5 sm:p-3 rounded-2xl shadow-brutal flex items-center gap-2.5 sm:gap-3 max-w-[280px] sm:max-w-xs">
      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-wasabi text-ink border-2 border-ink flex items-center justify-center shrink-0 font-bold text-xs sm:text-sm">✓</div>
      <div className="font-mono text-[9px] sm:text-[10px] leading-tight">
        <span className="font-bold text-ink block truncate">{toast.brand}</span>
        <span className="text-stone-500">{toast.time}</span>
      </div>
      <button type="button" aria-label="Tutup notifikasi order" onClick={() => setToast(null)} className="p-1 text-stone-400 hover:text-ink transition shrink-0">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}