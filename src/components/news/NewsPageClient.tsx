"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Tag, Play, Radio, Newspaper, ExternalLink, X, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import type { NewsArticle } from "@/lib/db";

// ── Sample video highlights (replace URLs with real ones as available) ────────
const HIGHLIGHTS = [
  {
    id: "h1",
    title: "Zimbabwe vs Namibia — Rugby Africa Cup Highlights",
    duration: "8:24",
    date: "2025-07-06",
    thumbnail: null,
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    competition: "Rugby Africa Cup",
  },
  {
    id: "h2",
    title: "Sables vs Uganda — Full Match Highlights",
    duration: "12:05",
    date: "2025-07-20",
    thumbnail: null,
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    competition: "Rugby Africa Cup",
  },
  {
    id: "h3",
    title: "Junior Sables Regional Tournament — Best Moments",
    duration: "5:48",
    date: "2025-04-22",
    thumbnail: null,
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    competition: "U20 Regional",
  },
];

type FilterTab = "articles" | "highlights" | "live";

const TABS: { value: FilterTab; label: string; icon: React.ElementType }[] = [
  { value: "articles",   label: "Articles",   icon: Newspaper },
  { value: "highlights", label: "Highlights", icon: Play      },
  { value: "live",       label: "Live",       icon: Radio     },
];

// ── Article modal ─────────────────────────────────────────────────────────────
function ArticleModal({ article, onClose }: { article: NewsArticle; onClose: () => void }) {
  // Close on Escape
  useState(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  });

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
        <div className="px-6 sm:px-8 pb-6 pt-4 border-t border-gray-100">
          <button
            onClick={onClose}
            className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#006B3F] transition-colors"
          >
            <ArrowLeft size={14} /> Back to News
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ── Article card ──────────────────────────────────────────────────────────────
function ArticleCard({
  article,
  index,
  onClick,
}: {
  article: NewsArticle;
  index: number;
  onClick: () => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      onClick={onClick}
      className="group bg-white border border-gray-100 hover:border-[#006B3F]/30 rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:shadow-[#006B3F]/10 hover:-translate-y-1 cursor-pointer"
    >
      <div className="h-48 bg-gradient-to-br from-[#006B3F]/20 to-[#0A1628]/20 relative overflow-hidden flex items-center justify-center">
        {article.featuredImage ? (
          <Image src={article.featuredImage} alt={article.title} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="text-6xl opacity-20">🏉</div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/50 to-transparent" />
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#006B3F] text-white text-[10px] font-bold uppercase tracking-wider rounded-md">
            <Tag size={9} /> {article.category}
          </span>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-2 text-gray-400 text-xs mb-3">
          <Calendar size={11} />
          {new Date(article.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </div>
        <h2 className="text-[#0A1628] font-bold text-lg leading-snug mb-3 group-hover:text-[#006B3F] transition-colors">
          {article.title}
        </h2>
        <p className="text-gray-500 text-sm leading-relaxed mb-4">{article.excerpt}</p>
        <span className="inline-flex items-center gap-1 text-[#006B3F] text-sm font-bold group-hover:gap-2 transition-all">
          Read More <ArrowRight size={13} />
        </span>
      </div>
    </motion.article>
  );
}

// ── Video highlight card ──────────────────────────────────────────────────────
function VideoCard({ video, index }: { video: typeof HIGHLIGHTS[0]; index: number }) {
  return (
    <motion.a
      href={video.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="group bg-white border border-gray-100 hover:border-[#006B3F]/30 rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:shadow-[#006B3F]/10 hover:-translate-y-1 block"
    >
      <div className="h-48 bg-gradient-to-br from-[#0A1628] to-[#006B3F]/40 relative flex items-center justify-center overflow-hidden">
        {video.thumbnail ? (
          <Image src={video.thumbnail} alt={video.title} fill className="object-cover" />
        ) : (
          <>
            <div className="absolute inset-0 bg-[#0A1628]/80" />
            <div className="relative z-10 text-5xl opacity-10">🏉</div>
          </>
        )}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 bg-white/10 group-hover:bg-[#006B3F] backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 border border-white/20">
            <Play size={20} className="text-white ml-1" fill="white" />
          </div>
        </div>
        <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/60 rounded text-white text-xs font-bold">
          {video.duration}
        </div>
        <div className="absolute top-3 left-3">
          <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#D4AF37] text-[#0A1628] text-[10px] font-bold uppercase tracking-wider rounded-md">
            {video.competition}
          </span>
        </div>
      </div>
      <div className="p-5">
        <div className="flex items-center gap-2 text-gray-400 text-xs mb-2">
          <Calendar size={11} />
          {new Date(video.date).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
        </div>
        <h3 className="text-[#0A1628] font-bold text-base leading-snug group-hover:text-[#006B3F] transition-colors flex items-start justify-between gap-2">
          {video.title}
          <ExternalLink size={13} className="text-gray-300 flex-shrink-0 mt-0.5" />
        </h3>
      </div>
    </motion.a>
  );
}

// ── Live section ──────────────────────────────────────────────────────────────
function LiveSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-20"
    >
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-5">
        <Radio size={32} className="text-red-400" />
      </div>
      <h3 className="text-[#0A1628] font-black text-2xl mb-2">No Live Matches</h3>
      <p className="text-gray-400 max-w-sm mx-auto">
        Live streams will appear here when a match is in progress. Check the{" "}
        <a href="/matches" className="text-[#006B3F] font-semibold hover:underline">Fixtures page</a>{" "}
        for upcoming matches.
      </p>
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function NewsPageClient({ news }: { news: NewsArticle[] }) {
  const [filter, setFilter] = useState<FilterTab>("articles");
  const [selected, setSelected] = useState<NewsArticle | null>(null);

  return (
    <>
      {/* Filter tabs */}
      <div className="flex gap-2 mb-10 p-1 bg-gray-100 rounded-xl w-fit">
        {TABS.map(({ value, label, icon: Icon }) => (
          <button
            key={value}
            onClick={() => setFilter(value)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              filter === value
                ? "bg-[#006B3F] text-white shadow-lg shadow-[#006B3F]/30"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            <Icon size={14} />
            {label}
            {value === "live" && (
              <span className="w-1.5 h-1.5 bg-red-400 rounded-full animate-pulse" />
            )}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {filter === "articles" && (
          <motion.div key="articles" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {news.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                No news articles yet. Add some via the Admin Portal.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news.map((article, i) => (
                  <ArticleCard key={article.id} article={article} index={i} onClick={() => setSelected(article)} />
                ))}
              </div>
            )}
          </motion.div>
        )}

        {filter === "highlights" && (
          <motion.div key="highlights" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {HIGHLIGHTS.map((video, i) => (
                <VideoCard key={video.id} video={video} index={i} />
              ))}
            </div>
            <p className="text-center text-gray-400 text-xs mt-8">
              More highlights added after each match. All videos open on YouTube.
            </p>
          </motion.div>
        )}

        {filter === "live" && (
          <motion.div key="live" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <LiveSection />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Article modal */}
      <AnimatePresence>
        {selected && (
          <ArticleModal article={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
