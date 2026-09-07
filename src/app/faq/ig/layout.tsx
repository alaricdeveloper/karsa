import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ ig — Pertanyaan yang Sering Ditanyakan",
  description: "Jawaban lengkap kategori FAQ ig Karsa Studio — ig.",
  robots: { index: true, follow: true },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
