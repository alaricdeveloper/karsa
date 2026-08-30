import { NavHeader } from "@/components/landing/NavHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";

export function ArticleShell({
  children,
  tag,
  date,
  readTime,
}: {
  children: React.ReactNode;
  tag: string;
  date: string;
  readTime: string;
}) {
  return (
    <div className="min-h-screen bg-canvas text-ink font-sans antialiased">
      <NavHeader />
      <main>
        <article className="py-12 sm:py-16 border-b-2 border-ink">
          <div className="max-w-3xl mx-auto px-4 sm:px-6">
            <div className="flex items-center gap-2 text-[11px] font-mono text-stone-500">
              <a href="/blog" className="text-terracotta font-bold hover:underline">
                &larr; Semua artikel
              </a>
              <span>&middot;</span>
              <span className="badge-tag px-2 py-0.5 rounded-full bg-wasabi text-ink font-bold">
                {tag}
              </span>
              <span>
                {date} &middot; {readTime}
              </span>
            </div>
            {children}
          </div>
        </article>
        <section className="py-12 sm:py-16 bg-terracotta text-ink border-b-2 border-ink">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-2xl sm:text-4xl font-serif leading-tight">
              Butuh 30 hari konten yang langsung bisa dijalankan?
            </h2>
            <p className="text-xs sm:text-sm text-white/85 font-sans mt-3">
              30 video scripts + 30 caption + 4 artikel SEO, dikirim 1x24 jam kerja. Mulai Rp299.000.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
              <a
                href="/harga"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-ink text-canvas font-mono text-sm font-bold hover:bg-wasabi hover:text-ink transition shadow-brutal-sm"
              >
                Lihat Harga <span>&rarr;</span>
              </a>
              <a
                href="https://wa.me/6281288009920?text=Halo%2C%20saya%20baca%20artikel%20di%20blog%20Karsa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-wasabi text-ink font-mono text-sm font-bold hover:bg-canvas transition shadow-brutal-sm"
              >
                Konsultasi WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}