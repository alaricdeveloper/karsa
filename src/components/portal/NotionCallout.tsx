import type { Order } from "@/lib/types";
import { Layout, ArrowUpRight } from "lucide-react";

interface NotionCalloutProps {
  order: Order;
}

export function NotionCallout({ order }: NotionCalloutProps) {
  const hasNotion = order.notion_url && order.notion_url.trim() !== "";

  return (
    <section className="bg-white border-2 border-sand-900 p-5 sm:p-6 rounded-2xl bg-sand-50/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-xl bg-sand-900 text-sand-50 flex items-center justify-center shrink-0">
          <Layout className="w-5 h-5" />
        </div>
        <div>
          <h3 className="font-serif font-bold text-base text-sand-900">Ruang Kerja Notion 30 Hari Anda</h3>
          <p className="text-xs text-stone-600 font-mono mt-0.5">
            {hasNotion
              ? "Workspace Notion 30 Hari Anda aktif & siap diduplikasi."
              : "Workspace sedang disusun oleh tim operasional kami (SLA < 24 jam)."}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2 w-full sm:w-auto">
        <a
          href={hasNotion ? order.notion_url! : "#"}
          target="_blank"
          rel="noopener noreferrer"
          className={`w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-sand-900 hover:bg-stone-800 text-sand-50 rounded-xl text-xs font-mono font-medium transition flex items-center justify-center gap-1.5 min-h-[44px] sm:min-h-0 ${
            !hasNotion ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <span>Buka Notion Workspace</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </div>
    </section>
  );
}
