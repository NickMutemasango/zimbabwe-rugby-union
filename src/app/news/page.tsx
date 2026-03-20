import { findAll, type NewsArticle } from "@/lib/db";
import NewsPageClient from "@/components/news/NewsPageClient";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const dynamic = "force-dynamic";

export default async function NewsPage() {
  const news = await findAll<NewsArticle>("news");
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Breadcrumbs crumbs={[{ label: "News" }]} />
          <h1 className="text-5xl font-black text-[#0A1628] mt-4 mb-2">News &amp; Media</h1>
          <p className="text-gray-500">Latest news, match highlights and live coverage from Zimbabwe Rugby.</p>
        </div>
        <NewsPageClient news={news} />
      </div>
    </div>
  );
}
