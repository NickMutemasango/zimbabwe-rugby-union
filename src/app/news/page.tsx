"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Calendar, Tag, ArrowRight } from "lucide-react";
import { NEWS } from "@/lib/data";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Breadcrumbs crumbs={[{ label: "News" }]} />
          <h1 className="text-5xl font-black text-[#0A1628] mt-4 mb-2">News & Updates</h1>
          <p className="text-gray-500">Latest news from the Zimbabwe Rugby Union and the Sables.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {NEWS.map((article, i) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white border border-gray-100 hover:border-[#006B3F]/30 rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:shadow-[#006B3F]/10 hover:-translate-y-1"
            >
              <div className="h-48 bg-gradient-to-br from-[#006B3F]/20 to-[#0A1628]/20 relative overflow-hidden flex items-center justify-center">
                <div className="text-6xl opacity-20">🏉</div>
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
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{article.excerpt}</p>
                <Link href={`/news/${article.slug}`} className="inline-flex items-center gap-2 text-[#006B3F] text-sm font-bold hover:gap-3 transition-all">
                  Read Full Story <ArrowRight size={14} />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
