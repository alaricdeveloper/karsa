import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contoh Output Naskah Video & Perbandingan Script",
  description:
    "Lihat contoh nyata output naskah video pendek Karsa Studio — perbandingan script, preview hook & voice-over untuk berbagai sektor UMKM.",
  robots: { index: true, follow: true },
};

export default function ContohLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
