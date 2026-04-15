"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Calendar, Tag, ArrowRight, ArrowLeft, X } from "lucide-react";
import type { NewsArticle } from "@/lib/db";

// ─── Article Modal ────────────────────────────────────────────────────────────
function ArticleModal({ article, onClose }: { article: NewsArticle; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-start justify-center overflow-y-auto p-4 sm:p-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-white rounded-2xl overflow-hidden shadow-2xl my-auto"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          aria-label="Close article"
          className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center bg-black/30 hover:bg-black/60 rounded-full text-white transition-colors"
        >
          <X size={16} />
        </button>

        {/* Featured image */}
        <div className={`relative bg-gradient-to-br from-[#006B3F]/20 to-[#0A1628]/30 ${article.featuredImage ? "h-60" : "h-20"}`}>
          {article.featuredImage && (
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 672px"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 to-transparent" />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#006B3F] text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
              <Tag size={9} /> {article.category}
            </span>
            <span className="text-gray-400 text-xs flex items-center gap-1">
              <Calendar size={11} />
              {new Date(article.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
            </span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-[#0A1628] mb-4 leading-snug">
            {article.title}
          </h2>

          <p className="text-gray-600 text-sm leading-relaxed font-medium mb-5 border-l-2 border-[#006B3F]/30 pl-4 italic">
            {article.excerpt}
          </p>

          {article.content && (
            <div
              className="prose prose-sm max-w-none text-gray-600 leading-relaxed [&>p]:mb-3 [&>h2]:font-black [&>h2]:text-[#0A1628] [&>h3]:font-bold [&>h3]:text-[#0A1628]"
              dangerouslySetInnerHTML={{ __html: article.content }}
            />
          )}
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-8 pb-6 pt-4 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#006B3F] transition-colors"
          >
            <ArrowLeft size={14} /> Back to News
          </button>
          <Link
            href="/news"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#006B3F] hover:underline"
          >
            All News <ArrowRight size={13} />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ─── News card ────────────────────────────────────────────────────────────────
function NewsCard({
  article,
  index,
  featured = false,
  onClick,
}: {
  article: NewsArticle;
  index: number;
  featured?: boolean;
  onClick: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      onClick={onClick}
      className={`group relative bg-white border border-gray-100 hover:border-[#006B3F]/30 rounded-2xl overflow-hidden transition-all hover:shadow-2xl hover:shadow-[#006B3F]/10 hover:-translate-y-1 cursor-pointer ${featured ? "lg:col-span-2" : ""}`}
    >
      {/* Image area */}
      <div className={`relative overflow-hidden bg-gradient-to-br from-[#006B3F]/20 to-[#0A1628]/30 ${featured ? "h-56" : "h-44"}`}>
        {article.featuredImage ? (
          <Image
            src={article.featuredImage}
            alt={article.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes={featured ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-6xl opacity-20">🏉</div>
          </div>
        )}
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
        <span className="inline-flex items-center gap-1 text-[#006B3F] text-sm font-bold group-hover:gap-2 transition-all">
          Read More <ArrowRight size={13} />
        </span>
      </div>
    </motion.article>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────
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

// ─── Section ──────────────────────────────────────────────────────────────────
export default function NewsSection() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<NewsArticle | null>(null);

  useEffect(() => {
    fetch("/api/news")
      .then((r) => r.json())
      .then((data: unknown) => {
        setNews(Array.isArray(data) ? (data as NewsArticle[]) : []);
      })
      .catch(() => setNews([]))
      .finally(() => setLoading(false));
  }, []);

  const [featured, ...rest] = news;

  return (
    <>
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
                <NewsCard article={featured} index={0} featured onClick={() => setSelected(featured)} />
                {rest.slice(0, 2).map((article, i) => (
                  <NewsCard key={article.id} article={article} index={i + 1} onClick={() => setSelected(article)} />
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* Article modal */}
      <AnimatePresence>
        {selected && (
          <ArticleModal article={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
