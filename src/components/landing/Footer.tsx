"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="py-10 sm:py-12 bg-sand-50 text-xs font-mono text-stone-500 border-t border-sand-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center space-x-2">
          <span className="font-serif text-sand-900 text-base font-normal">Karsa Studio</span>
          <span>&mdash; Automated Operations</span>
        </div>
        <div>
          &copy; 2026 Karsa Inc. Hak Cipta Dilindungi.
        </div>
        <div className="flex flex-wrap justify-center gap-4 text-stone-700 font-medium">
          <Link href="/terms" className="hover:text-sand-900 transition underline underline-offset-4 py-1">Terms</Link>
          <Link href="/privacy" className="hover:text-sand-900 transition underline underline-offset-4 py-1">Privacy</Link>
          <Link href="/refund" className="hover:text-sand-900 transition underline underline-offset-4 py-1">Refund</Link>
        </div>
      </div>
    </footer>
  );
}
