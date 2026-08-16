import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Karsa Studio",
  description:
    "30-Day Content Calendar untuk UMKM Indonesia. Produksi konten viral dalam 1x24 jam.",
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
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-sand-50 text-sand-900 font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
