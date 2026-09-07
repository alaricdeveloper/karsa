import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ revisi — Pertanyaan yang Sering Ditanyakan",
  description: "Jawaban lengkap kategori FAQ revisi Karsa Studio — revisi.",
  robots: { index: true, follow: true },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
