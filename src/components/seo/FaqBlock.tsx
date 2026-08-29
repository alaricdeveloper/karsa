export function FaqBlock({
  items,
  title = "Pertanyaan yang Sering Diajukan",
}: {
  items: { q: string; a: string }[];
  title?: string;
}) {
  return (
    <section className="py-12 sm:py-20 border-b-2 border-ink bg-surface">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-8">
          <span className="badge-tag px-3 py-1 rounded-full text-xs font-mono font-bold bg-sunflower text-ink">
            FAQ
          </span>
          <h2 className="text-2xl sm:text-4xl font-serif text-ink mt-3">{title}</h2>
        </div>
        <div className="space-y-3">
          {items.map((item, idx) => (
            <details
              key={item.q}
              className="faq-item bento-pop rounded-2xl bg-white p-4 sm:p-5 group"
              open={idx === 0}
            >
              <summary className="flex justify-between items-center gap-3 cursor-pointer list-none">
                <h3 className="text-sm sm:text-base font-bold text-ink">{item.q}</h3>
                <span className="text-terracotta font-mono font-bold shrink-0">+</span>
              </summary>
              <p className="text-xs sm:text-sm text-stone-600 mt-3 leading-relaxed font-sans">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}