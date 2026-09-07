import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ tiktok — Pertanyaan yang Sering Ditanyakan",
  description: "Jawaban lengkap kategori FAQ tiktok Karsa Studio — tiktok.",
  robots: { index: true, follow: true },
};

export default function FaqLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
