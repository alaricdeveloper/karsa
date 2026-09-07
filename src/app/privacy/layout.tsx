import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kebijakan Privasi & Kepatuhan UU PDP",
  description:
    "Kebijakan privasi Karsa Studio — bagaimana data bisnis, brief, dan hasil produksi konten dikelola, dilindungi, dan diproses sesuai UU PDP.",
  robots: { index: true, follow: true },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
