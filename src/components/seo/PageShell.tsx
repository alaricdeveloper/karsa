import { NavHeader } from "@/components/landing/NavHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";

export function PageShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-canvas text-ink font-sans antialiased">
      <NavHeader />
      <main>{children}</main>
      <LandingFooter />
    </div>
  );
}