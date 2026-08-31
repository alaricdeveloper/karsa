import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://usekarsa.com"),
  title: {
    default:
      "Karsa Studio — 30 Hari Konten Siap Rekam (30 Script + SEO + Notion OS)",
    template: "%s | Karsa Studio",
  },
  description:
    "30 video script kata-per-kata, 30 caption AIDA, 4 artikel SEO, Notion Content OS, dikirim dalam 24 jam kerja.",
  keywords: [
    "jasa konten video umkm",
    "jasa script video tiktok",
    "jasa content creator umkm",
    "jasa artikel seo",
    "paket konten instagram",
    "script video reels",
    "kalender konten 30 hari",
    "jasa konten instagram umkm",
    "karsa studio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://usekarsa.com",
    siteName: "Karsa Studio",
    title:
      "Karsa Studio — 30 Hari Konten Siap Rekam (30 Script + SEO + Notion OS)",
    description:
      "30 video scripts kata-per-kata, 30 caption AIDA, 4 artikel SEO, dan Notion OS dalam 24 jam kerja. Mulai Rp299.000.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Karsa Studio — Jasa Konten Video UMKM 30 Hari" }],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Karsa Studio — 30 Hari Konten Siap Rekam (30 Script + SEO + Notion OS)",
    description:
      "30 video scripts kata-per-kata, 30 caption AIDA, 4 artikel SEO, dan Notion OS dalam 24 jam kerja. Mulai Rp299.000.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: [
      { url: "/icon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/icon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-48x48.png", sizes: "48x48", type: "image/png" },
    ],
    apple: [{ url: "/icon-180x180.png", sizes: "180x180", type: "image/png" }],
    other: [
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Karsa Studio",
  url: "https://usekarsa.com",
  logo: "https://usekarsa.com/icon-512x512.png",
  email: "halo@usekarsa.com",
  telephone: "+6281288009920",
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: "+6281288009920",
    availableLanguage: "id",
  },
  areaServed: "ID",
  sameAs: [],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Karsa Studio",
  url: "https://usekarsa.com",
  inLanguage: "id-ID",
  publisher: {
    "@type": "Organization",
    name: "Karsa Studio",
    url: "https://usekarsa.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@500;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`bg-canvas text-ink font-sans antialiased selection:bg-brutalYellow selection:text-ink overflow-x-hidden`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}