"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { FileText, Download, Eye, Calendar } from "lucide-react";
import type { Article } from "@/lib/db";

export default function ArticlesGrid({ articles }: { articles: Article[] }) {

  // Dev: log the full articles list + field mapping on mount
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.group("%c[ArticlesGrid] Loaded from /api/articles", "color:#D4AF37;font-weight:bold");
      console.log(`Total articles: ${articles.length}`);
      console.table(
        articles.map((a) => ({
          id:       a.id,
          title:    a.title,
          pdf_url:  a.pdfUrl   || "(missing — check upload)",
          fileSize: a.fileSize || "(unknown)",
          date:     a.date,
        }))
      );
      // Warn if any article is missing a pdfUrl
      articles.forEach((a) => {
        if (!a.pdfUrl) {
          console.warn(`[ArticlesGrid] Article "${a.title}" (${a.id}) has no pdf_url — download/preview links will be broken.`);
        }
      });
      console.groupEnd();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {articles.map((article, i) => {
        const hasPdf   = Boolean(article.pdfUrl);
        const dateStr  = article.date
          ? new Date(article.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
          : "—";

        return (
          <motion.div
            key={article.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="group bg-white border border-gray-100 hover:border-[#006B3F]/30 rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:shadow-[#006B3F]/10"
          >
            <div className="flex">
              {/* PDF icon panel */}
              <div className="w-28 flex-shrink-0 bg-gradient-to-b from-[#006B3F]/15 to-[#0A1628]/10 flex flex-col items-center justify-center p-4 border-r border-gray-100 gap-2">
                <FileText size={30} className="text-[#D4AF37]" />
                <span className="text-[#006B3F] text-[10px] font-black uppercase tracking-widest">PDF</span>
                {article.fileSize && (
                  <span className="text-gray-400 text-[10px]">{article.fileSize}</span>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
                <div>
                  <h3 className="text-[#0A1628] font-bold text-base leading-snug mb-1.5 group-hover:text-[#006B3F] transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                  {article.description && (
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{article.description}</p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-2 mt-4">
                  {hasPdf ? (
                    <>
                      {/* Download — browser triggers file download */}
                      <a
                        href={article.pdfUrl}
                        download
                        onClick={() => {
                          if (process.env.NODE_ENV !== "production")
                            console.log(`[ArticlesGrid] Download clicked — pdf_url: ${article.pdfUrl}`);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-[#006B3F] hover:bg-[#004D2C] text-white text-xs font-bold rounded-lg transition-all hover:shadow-lg hover:shadow-[#006B3F]/30 active:scale-95"
                      >
                        <Download size={12} /> Download
                      </a>

                      {/* Preview — opens PDF in new tab */}
                      <a
                        href={article.pdfUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => {
                          if (process.env.NODE_ENV !== "production")
                            console.log(`[ArticlesGrid] Preview clicked — pdf_url: ${article.pdfUrl}`);
                        }}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium rounded-lg transition-colors"
                      >
                        <Eye size={12} /> Preview
                      </a>
                    </>
                  ) : (
                    <span className="text-xs text-red-400 bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg">
                      PDF unavailable
                    </span>
                  )}

                  {/* Date */}
                  <span className="ml-auto flex items-center gap-1 text-gray-400 text-xs whitespace-nowrap">
                    <Calendar size={11} />{dateStr}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
