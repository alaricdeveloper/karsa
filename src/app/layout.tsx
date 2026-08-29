import type { Metadata } from "next";
import { Instrument_Serif, Plus_Jakarta_Sans, Space_Mono } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const mono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://usekarsa.com"),
  title: {
    default:
      "Jasa Konten Video UMKM 30 Hari — 30 Script + 4 Artikel SEO | Karsa Studio",
    template: "%s | Karsa Studio",
  },
  description:
    "Jasa konten video UMKM & script video 30 hari: 30 naskah kata-per-kata untuk TikTok/Reels/Shorts, 30 caption AIDA, 4 artikel SEO, dan Notion OS — dikirim dalam 24 jam kerja. Mulai Rp299.000.",
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
      "Jasa Konten Video UMKM 30 Hari — 30 Script + 4 Artikel SEO | Karsa Studio",
    description:
      "30 video scripts kata-per-kata, 30 caption AIDA, 4 artikel SEO, dan Notion OS dalam 24 jam kerja. Mulai Rp299.000.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Karsa Studio — Jasa Konten Video UMKM 30 Hari" }],
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Jasa Konten Video UMKM 30 Hari — 30 Script + 4 Artikel SEO | Karsa Studio",
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
      <body
        className={`${jakarta.variable} ${serif.variable} ${mono.variable} bg-canvas text-ink font-sans antialiased selection:bg-wasabi selection:text-ink overflow-x-hidden`}
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