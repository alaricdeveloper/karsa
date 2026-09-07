import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ sla — Pertanyaan yang Sering Ditanyakan",
  description: "Jawaban lengkap kategori FAQ sla Karsa Studio — sla.",
  robots: { index: true, follow: true },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
