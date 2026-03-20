"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Tag, Play, Radio, Newspaper, ExternalLink } from "lucide-react";
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

// ── Article card ──────────────────────────────────────────────────────────────
function ArticleCard({ article, index }: { article: NewsArticle; index: number }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
      className="group bg-white border border-gray-100 hover:border-[#006B3F]/30 rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:shadow-[#006B3F]/10 hover:-translate-y-1"
    >
      <div className="h-48 bg-gradient-to-br from-[#006B3F]/20 to-[#0A1628]/20 relative overflow-hidden flex items-center justify-center">
        {article.featuredImage ? (
          <Image src={article.featuredImage} alt={article.title} fill className="object-cover" />
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
        <p className="text-gray-500 text-sm leading-relaxed">{article.excerpt}</p>
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
      {/* Thumbnail */}
      <div className="h-48 bg-gradient-to-br from-[#0A1628] to-[#006B3F]/40 relative flex items-center justify-center overflow-hidden">
        {video.thumbnail ? (
          <Image src={video.thumbnail} alt={video.title} fill className="object-cover" />
        ) : (
          <>
            <div className="absolute inset-0 bg-[#0A1628]/80" />
            <div className="relative z-10 text-5xl opacity-10">🏉</div>
          </>
        )}
        {/* Play button overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 bg-white/10 group-hover:bg-[#006B3F] backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 border border-white/20">
            <Play size={20} className="text-white ml-1" fill="white" />
          </div>
        </div>
        {/* Duration badge */}
        <div className="absolute bottom-3 right-3 px-2 py-0.5 bg-black/60 rounded text-white text-xs font-bold">
          {video.duration}
        </div>
        {/* Competition badge */}
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
                  <ArticleCard key={article.id} article={article} index={i} />
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
    </>
  );
}
