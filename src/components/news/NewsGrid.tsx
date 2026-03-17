"use client";
import { motion } from "framer-motion";
import { Calendar, Tag } from "lucide-react";
import Image from "next/image";
import type { NewsArticle } from "@/lib/db";

export default function NewsGrid({ news }: { news: NewsArticle[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {news.map((article, i) => (
        <motion.article
          key={article.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
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
      ))}
    </div>
  );
}
