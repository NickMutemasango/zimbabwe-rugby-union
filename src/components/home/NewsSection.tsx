"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import type { NewsArticle } from "@/lib/db";

function NewsCard({ article, index, featured = false }: { article: NewsArticle; index: number; featured?: boolean }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className={`group relative bg-white border border-gray-100 hover:border-[#006B3F]/30 rounded-2xl overflow-hidden transition-all hover:shadow-2xl hover:shadow-[#006B3F]/10 hover:-translate-y-1 ${featured ? "lg:col-span-2" : ""}`}
    >
      {/* Image area */}
      <div className={`relative overflow-hidden bg-gradient-to-br from-[#006B3F]/20 to-[#0A1628]/30 ${featured ? "h-56" : "h-44"}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-6xl opacity-20">🏉</div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#006B3F] text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
            <Tag size={9} />
            {article.category}
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
          <Calendar size={11} />
          {new Date(article.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </div>
        <h3 className="text-[#0A1628] font-bold text-base leading-snug mb-2 group-hover:text-[#006B3F] transition-colors line-clamp-2">
          {article.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed line-clamp-2 mb-4">{article.excerpt}</p>
        <Link
          href="/news"
          className="inline-flex items-center gap-1 text-[#006B3F] text-sm font-bold hover:gap-2 transition-all"
        >
          Read More <ArrowRight size={13} />
        </Link>
      </div>
    </motion.article>
  );
}

function SkeletonCard({ featured = false }: { featured?: boolean }) {
  return (
    <div className={`bg-white border border-gray-100 rounded-2xl overflow-hidden animate-pulse ${featured ? "lg:col-span-2" : ""}`}>
      <div className={`bg-gray-200 ${featured ? "h-56" : "h-44"}`} />
      <div className="p-5 space-y-3">
        <div className="h-3 bg-gray-200 rounded w-24" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-3 bg-gray-200 rounded w-full" />
        <div className="h-3 bg-gray-200 rounded w-2/3" />
      </div>
    </div>
  );
}

export default function NewsSection() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((data: unknown) => {
        const list = Array.isArray(data) ? (data as NewsArticle[]) : [];

        // ── DEV: log API response + field mapping ──────────────────────────
        if (process.env.NODE_ENV !== "production") {
          console.group("%c[NewsSection] GET /api/news", "color:#22c55e;font-weight:bold");
          console.log(`Received ${list.length} article(s)`);
          console.table(
            list.map((a) => ({
              id:            a.id,
              title:         a.title,
              category:      a.category,
              date:          a.date,
              featuredImage: a.featuredImage ?? "(none — gradient placeholder shown)",
            }))
          );
          console.groupEnd();
        }

        setNews(list);
      })
      .catch((err) => {
        if (process.env.NODE_ENV !== "production")
          console.error("[NewsSection] Failed to fetch /api/news:", err);
        setNews([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const [featured, ...rest] = news;

  return (
    <section className="py-20 bg-gray-50 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-[#006B3F] text-xs font-bold tracking-[0.3em] uppercase mb-3">Latest</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0A1628]">News &amp; Updates</h2>
          </div>
          <Link href="/news" className="hidden sm:flex items-center gap-2 text-[#006B3F] font-bold hover:gap-3 transition-all text-sm">
            All News <ArrowRight size={16} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            <>
              <SkeletonCard featured />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : news.length === 0 ? (
            <div className="lg:col-span-3 text-center py-16 text-gray-400">No news articles yet.</div>
          ) : (
            <>
              <NewsCard article={featured} index={0} featured />
              {rest.slice(0, 2).map((article, i) => (
                <NewsCard key={article.id} article={article} index={i + 1} />
              ))}
            </>
          )}
        </div>
      </div>
    </section>
  );
}
