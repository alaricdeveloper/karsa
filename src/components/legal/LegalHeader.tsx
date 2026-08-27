import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type Props = {
  badge: string;
};

export function LegalHeader({ badge }: Props) {
  return (
    <header className="sticky top-0 z-40 bg-canvas/95 backdrop-blur-md border-b-2 border-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between whitespace-nowrap">
        <Link href="/" className="flex items-center space-x-2 shrink-0 group">
          <span className="font-serif text-2xl sm:text-4xl tracking-tight text-ink font-normal group-hover:rotate-1 transition-transform">
            Karsa
          </span>
          <span className="badge-tag text-[10px] font-mono uppercase px-2 py-0.5 bg-wasabi text-ink rounded font-bold">
            {badge}
          </span>
        </Link>
        <div className="flex items-center space-x-3 text-xs font-mono">
          <Link
            href="/login"
            className="badge-tag bg-white hover:bg-canvas text-ink px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 shadow-brutal-sm min-h-[44px]"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Workspace</span>
          </Link>
        </div>
      </div>
    </header>
  );
}