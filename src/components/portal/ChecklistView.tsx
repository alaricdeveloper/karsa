import type { Order, ContentItem, SeoArticle } from "@/lib/types";
import { dayStr, checklistTotal, checklistProgress } from "./hub-lib";

function Row({
  id,
  label,
  title,
  checked,
  onToggle,
  anchor,
}: {
  id: string;
  label: string;
  title: string;
  checked: boolean;
  onToggle: (key: string) => void;
  anchor: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2 py-1.5 border-b border-stone-200">
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={() => onToggle(id)}
        aria-label={`${title} sudah dicek`}
        className="w-5 h-5 shrink-0"
      />
      <label htmlFor={id} className="text-[10px] font-mono font-bold text-ink cursor-pointer shrink-0">{label}</label>
      <span className="font-sans text-xs text-stone-700 truncate flex-1 min-w-0">{title}</span>
      {anchor}
    </div>
  );
}

export function ChecklistView({
  order,
  contentItems,
  seoArticles,
  checklist,
  onToggle,
  onReset,
  onOpenDay,
  onOpenView,
}: {
  order: Order;
  contentItems: ContentItem[];
  seoArticles: SeoArticle[];
  checklist: Record<string, boolean>;
  onToggle: (key: string) => void;
  onReset: () => void;
  onOpenDay: (day: number) => void;
  onOpenView: (view: "seo" | "audit" | "teleprompter" | "notion") => void;
}) {
  const total = checklistTotal(contentItems, seoArticles);
  const done = checklistProgress(checklist);

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="w-11 h-11 rounded-xl bg-sunflower text-ink border-2 border-ink shadow-brutal-sm flex items-center justify-center font-mono font-bold text-sm shrink-0">
          06
        </span>
        <div>
          <h2 className="font-serif font-normal text-xl sm:text-2xl text-ink leading-tight">Checklist Deliverable</h2>
          <p className="text-[10px] sm:text-xs text-inkMuted font-mono font-bold">Semua yang Anda terima — tandai setiap item yang sudah dicek.</p>
        </div>
      </div>

      <div className="bento-pop p-5 sm:p-8 rounded-3xl bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b-2 border-ink">
          <div className="font-mono text-xs">
            <span className="text-inkMuted font-bold">Terverifikasi</span>
            <span className="text-ink font-bold ml-2">{done} / {total}</span>
          </div>
          <button
            onClick={onReset}
            className="px-3.5 py-2 border-2 border-ink rounded-xl bg-canvas hover:bg-wasabi text-ink font-bold transition shadow-brutal-sm text-xs font-mono min-h-[44px]"
          >
            Reset Centang
          </button>
        </div>

        <div className="pt-4 grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-2">
          {contentItems.map((item) => (
            <div key={`s${item.day_number}`} className="contents">
                          <Row
                id={`s${item.day_number}`}
                checked={Boolean(checklist[`s${item.day_number}`])}
                onToggle={onToggle}
                label="Naskah"
                title={`Day ${dayStr(item.day_number)} — ${item.pillar}`}
                anchor={
                  <button onClick={() => onOpenDay(item.day_number)} className="text-terracotta hover:underline font-bold text-[10px] font-mono shrink-0 min-h-[44px]">
                    Buka &rarr;
                  </button>
                }
              />
                          <Row
                id={`c${item.day_number}`}
                checked={Boolean(checklist[`c${item.day_number}`])}
                onToggle={onToggle}
                label="Cap"
                title={`Day ${dayStr(item.day_number)} — Caption ${item.pillar}`}
                anchor={
                  <button onClick={() => onOpenDay(item.day_number)} className="text-terracotta hover:underline font-bold text-[10px] font-mono shrink-0 min-h-[44px]">
                    Buka &rarr;
                  </button>
                }
              />
            </div>
          ))}

          {seoArticles.map((a) => (
                        <Row
              key={`a${a.article_number}`}
              id={`a${a.article_number}`}
              checked={Boolean(checklist[`a${a.article_number}`])}
              onToggle={onToggle}
              label={`Artikel ${a.article_number}`}
              title={a.title}
              anchor={
                <button onClick={() => onOpenView("seo")} className="text-terracotta hover:underline font-bold text-[10px] font-mono shrink-0 min-h-[44px]">
                  Buka &rarr;
                </button>
              }
            />
          ))}

                      <Row
            id="audit"
            checked={Boolean(checklist.audit)}
            onToggle={onToggle}
            label="Audit"
            title="Audit Angle Kompetitor"
            anchor={
              <button onClick={() => onOpenView("audit")} className="text-terracotta hover:underline font-bold text-[10px] font-mono shrink-0 min-h-[44px]">
                Buka &rarr;
              </button>
            }
          />
                      <Row
            id="notion"
            checked={Boolean(checklist.notion)}
            onToggle={onToggle}
            label="Notion"
            title="Ruang Kerja Notion OS 30 Hari"
            anchor={
              <a
                href={order.notion_url || "#"}
                target="_blank"
                rel="noopener"
                aria-disabled={!order.notion_url}
                onClick={(e) => {
                  if (!order.notion_url) e.preventDefault();
                }}
                className="text-terracotta hover:underline font-bold text-[10px] font-mono shrink-0 min-h-[44px]"
              >
                Buka &rarr;
              </a>
            }
          />
                      <Row
            id="tele"
            checked={Boolean(checklist.tele)}
            onToggle={onToggle}
            label="Tele"
            title="Teleprompter Rekaman (coba buka naskah)"
            anchor={
              <button onClick={() => onOpenView("teleprompter")} className="text-terracotta hover:underline font-bold text-[10px] font-mono shrink-0 min-h-[44px]">
                Buka &rarr;
              </button>
            }
          />
        </div>
      </div>
    </section>
  );
}