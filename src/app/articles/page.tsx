import { readDb, type Article } from "@/lib/db";
import ArticlesGrid from "@/components/articles/ArticlesGrid";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const dynamic = "force-dynamic";

export default function ArticlesPage() {
  const articles = readDb<Article>("articles");
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Breadcrumbs crumbs={[{ label: "Articles & PDFs" }]} />
          <h1 className="text-5xl font-black text-[#0A1628] mt-4 mb-2">Article &amp; PDF Centre</h1>
          <p className="text-gray-500">Official reports, guides and publications from the Zimbabwe Rugby Union.</p>
        </div>
        {articles.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No articles yet. Upload PDFs via the Admin Portal.</div>
        ) : (
          <ArticlesGrid articles={articles} />
        )}
      </div>
    </div>
  );
}
