"use client";

import Link from "next/link";
export function LandingFooter() {
  return (
<footer className="py-10 sm:py-14 bg-ink text-stone-300 text-xs font-mono border-t-2 border-ink">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-serif text-canvas text-2xl font-normal">Karsa</span>
                <span className="badge-tag text-[9px] font-mono uppercase px-1.5 py-0.5 bg-wasabi text-ink rounded font-bold">Studio</span>
              </div>
              <p className="text-[11px] text-stone-400 font-sans mt-3 leading-relaxed">Sistem konten siap eksekusi untuk UMKM Indonesia. 30 hari naskah kata-per-kata, tanpa kontrak, tanpa langganan.</p>
              <div className="mt-4 flex items-center gap-2 font-mono text-[10px] text-stone-400">
                <span className="inline-block px-2 py-1 bg-wasabi text-ink rounded font-bold border border-ink">SLA 24 Jam</span>
                <span className="inline-block px-2 py-1 bg-terracotta text-white rounded font-bold border border-ink">Kalibrasi 48 Jam</span>
              </div>
            </div>
            <div>
              <h3 className="text-canvas font-bold uppercase tracking-wider text-[10px] mb-3">Navigasi</h3>
              <ul className="space-y-2 text-[11px]">
                <li><a href="#deliverables" className="hover:text-wasabi transition">Isi Paket (6 Output)</a></li>
                <li><Link href="/harga" className="hover:text-wasabi transition">Harga &amp; Paket</Link></li>
                <li><Link href="/blog" className="hover:text-wasabi transition">Blog &amp; Panduan</Link></li>
                <li><Link href="/tentang-kami" className="hover:text-wasabi transition">Tentang Kami</Link></li>
                <li><a href="#cara-kerja" className="hover:text-wasabi transition">Cara Kerja</a></li>
                <li><a href="#faq" className="hover:text-wasabi transition">FAQ (24 Pertanyaan)</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-canvas font-bold uppercase tracking-wider text-[10px] mb-3">Layanan</h3>
              <ul className="space-y-2 text-[11px]">
                <li><Link href="/jasa-konten-video-umkm" className="hover:text-wasabi transition">Jasa Konten Video UMKM</Link></li>
                <li><Link href="/jasa-script-video-tiktok" className="hover:text-wasabi transition">Jasa Script Video TikTok</Link></li>
                <li><Link href="/jasa-content-creator-umkm" className="hover:text-wasabi transition">Jasa Content Creator UMKM</Link></li>
                <li><Link href="/jasa-artikel-seo" className="hover:text-wasabi transition">Jasa Artikel SEO</Link></li>
                <li><Link href="/paket-konten-instagram" className="hover:text-wasabi transition">Paket Konten Instagram</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-canvas font-bold uppercase tracking-wider text-[10px] mb-3">Keputusan</h3>
              <ul className="space-y-2 text-[11px]">
                <li><Link href="/harga" className="hover:text-wasabi transition">Harga &amp; Paket</Link></li>
                <li><a href="#komparasi" className="hover:text-wasabi transition">Karsa vs Agensi vs In-house</a></li>
                <li><a href="#testimoni" className="hover:text-wasabi transition">Testimoni Customer</a></li>
                <li><a href="#studi-kasus" className="hover:text-wasabi transition">Case Study</a></li>
                <li><a href="#garansi" className="hover:text-wasabi transition">Garansi &amp; SLA</a></li>
                <li><a href="#calculator" className="hover:text-wasabi transition">Kalkulator Penghematan</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-canvas font-bold uppercase tracking-wider text-[10px] mb-3">Layanan &amp; Kontak</h3>
              <ul className="space-y-2 text-[11px]">
                <li><Link href="/login" className="hover:text-wasabi transition">Member Workspace</Link></li>
                <li><a href="#order" className="hover:text-wasabi transition">Isi Brief (Rp299.000)</a></li>
                <li><Link href="/terms" className="hover:text-wasabi transition">Syarat &amp; Ketentuan</Link></li>
                <li><Link href="/privacy" className="hover:text-wasabi transition">Kebijakan Privasi</Link></li>
                <li><Link href="/refund" className="hover:text-wasabi transition">Jaminan SLA &amp; Refund</Link></li>
                <li className="pt-1"><a href="https://wa.me/6281288009920" target="_blank" rel="noopener noreferrer" className="text-stone-400 hover:text-wasabi transition">WA: 0812-8800-9920</a><br /><a href="mailto:halo@usekarsa.com" className="text-stone-400 hover:text-wasabi transition">halo@usekarsa.com</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-5 border-t-2 border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[10px] text-stone-500 text-center sm:text-left">
            <span>&copy; 2026 Karsa Studio (<span className="text-canvas font-bold">usekarsa.com</span>). All rights reserved.</span>
            <span>Dibuat di Indonesia &mdash; melayani brand di seluruh Nusantara.</span>
          </div>
        </div>
      </footer>
  );
}
