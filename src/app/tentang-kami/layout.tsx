import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tentang Karsa Studio",
  description:
    "Tim di balik sistem konten 30 hari Karsa Studio — misi membantu UMKM Indonesia punya mesin konten berkelanjutan.",
  robots: { index: true, follow: true },
};

export default function TentangLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
