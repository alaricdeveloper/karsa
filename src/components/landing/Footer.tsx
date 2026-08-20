"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-8 sm:py-12 bg-canvas text-xs font-mono text-stone-600 border-t-2 border-ink">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center space-x-2">
          <span className="font-serif text-ink text-xl font-normal">Karsa Studio</span>
          <span>&mdash; Automated Content Operations</span>
        </div>
        <div>
          &copy; 2026 Karsa Studio (<span className="text-ink font-bold">usekarsa.co</span>). All rights reserved.
        </div>
        <div className="flex flex-wrap justify-center gap-4 font-bold text-ink">
          <Link href="/terms" className="hover:text-terracotta transition underline">Terms</Link>
          <Link href="/privacy" className="hover:text-terracotta transition underline">Privacy</Link>
          <Link href="/refund" className="hover:text-terracotta transition underline">SLA Guarantee</Link>
        </div>
      </div>
    </footer>
  );
}
