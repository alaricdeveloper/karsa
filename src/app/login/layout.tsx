import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login & Workspace Member",
  description:
    "Masuk ke workspace Karsa Studio — akses Notion Content OS, Brand Vault, dan pemantauan SLA produksi batch konten kamu.",
  robots: { index: false, follow: false },
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
