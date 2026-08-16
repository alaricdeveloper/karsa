import type { SeoArticle } from "@/lib/types";

interface SeoArticlesProps {
  articles: SeoArticle[];
}

const ARTICLE_LABELS = ["Artikel 01", "Artikel 02", "Artikel 03", "Artikel 04"];

export function SeoArticles({ articles }: SeoArticlesProps) {
  const handleCopy = (article: SeoArticle) => {
    navigator.clipboard.writeText(`JUDUL: ${article.title}\nDESKRIPSI: ${article.description}`);
  };

  if (articles.length === 0) {
    return (
      <div className="bg-white border border-[#E5E5E0] rounded-2xl p-6 text-center">
        <p className="text-sm text-sand-700 font-mono">Artikel SEO belum tersedia.</p>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
        {articles.map((article, i) => (
          <div key={article.id} className="bg-white border border-[#E5E5E0] p-5 sm:p-6 rounded-2xl space-y-3">
            <span className="text-[10px] text-stone-400">
              {ARTICLE_LABELS[i] || `Artikel 0${i + 1}`} &bull; {article.article_type}
            </span>
            <h4 className="font-serif font-bold text-base text-sand-900">{article.title}</h4>
            <p className="text-stone-600 font-sans text-xs leading-relaxed">{article.description}</p>
            <button
              onClick={() => handleCopy(article)}
              className="w-full py-2 bg-sand-100 hover:bg-sand-200 border border-sand-300 rounded-lg text-sand-900 font-medium transition"
            >
              Salin Kerangka Artikel {i + 1}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
