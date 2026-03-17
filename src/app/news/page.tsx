import { readDb, type NewsArticle } from "@/lib/db";
import NewsGrid from "@/components/news/NewsGrid";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const dynamic = "force-dynamic";

export default function NewsPage() {
  const news = readDb<NewsArticle>("news");
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Breadcrumbs crumbs={[{ label: "News" }]} />
          <h1 className="text-5xl font-black text-[#0A1628] mt-4 mb-2">News &amp; Updates</h1>
          <p className="text-gray-500">Latest news from the Zimbabwe Rugby Union and the Sables.</p>
        </div>
        {news.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No news articles yet. Add some via the Admin Portal.</div>
        ) : (
          <NewsGrid news={news} />
        )}
      </div>
    </div>
  );
}
