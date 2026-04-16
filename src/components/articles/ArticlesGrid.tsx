"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, Eye, Calendar, ArrowUpDown } from "lucide-react";
import type { Article } from "@/lib/db";

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Parse a formatted size string like "2.4 MB" or "980 KB" into bytes */
function parseSizeBytes(size: string): number {
  if (!size) return 0;
  const [num, unit] = size.trim().split(/\s+/);
  const n = parseFloat(num);
  if (unit?.toUpperCase() === 'MB') return n * 1024 * 1024;
  if (unit?.toUpperCase() === 'KB') return n * 1024;
  return n;
}

type SortKey = 'latest' | 'oldest' | 'largest';

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'latest',  label: 'Latest first'      },
  { value: 'oldest',  label: 'Oldest first'       },
  { value: 'largest', label: 'File size (largest)' },
];

// ── File type badge ───────────────────────────────────────────────────────────
function FileTypeBadge({ fileType }: { fileType?: string }) {
  const ft = fileType ?? 'pdf';
  if (ft === 'pdf') {
    return (
      <div className="w-28 flex-shrink-0 bg-gradient-to-b from-[#006B3F]/15 to-[#0A1628]/10 flex flex-col items-center justify-center p-4 border-r border-gray-100 gap-2">
        <FileText size={30} className="text-[#D4AF37]" />
        <span className="text-[#006B3F] text-[10px] font-black uppercase tracking-widest">PDF</span>
      </div>
    );
  }
  // Word doc
  return (
    <div className="w-28 flex-shrink-0 bg-gradient-to-b from-blue-50 to-blue-100/30 flex flex-col items-center justify-center p-4 border-r border-gray-100 gap-2">
      <FileText size={30} className="text-blue-500" />
      <span className="text-blue-600 text-[10px] font-black uppercase tracking-widest">{ft.toUpperCase()}</span>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ArticlesGrid({ articles }: { articles: Article[] }) {
  const [sort, setSort] = useState<SortKey>('latest');

  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.group("%c[ArticlesGrid] Loaded", "color:#D4AF37;font-weight:bold");
      console.log(`Total: ${articles.length}`);
      console.table(articles.map((a) => ({ id: a.id, title: a.title, fileType: a.fileType ?? 'pdf', fileSize: a.fileSize, date: a.date })));
      articles.forEach((a) => {
        if (!a.pdfUrl) console.warn(`[ArticlesGrid] "${a.title}" (${a.id}) has no document URL.`);
      });
      console.groupEnd();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sorted = useMemo(() => {
    const copy = [...articles];
    if (sort === 'latest')  return copy.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    if (sort === 'oldest')  return copy.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    if (sort === 'largest') return copy.sort((a, b) => parseSizeBytes(b.fileSize) - parseSizeBytes(a.fileSize));
    return copy;
  }, [articles, sort]);

  return (
    <div>
      {/* Sort bar */}
      <div className="flex items-center justify-between mb-6">
        <p className="text-gray-400 text-sm">{articles.length} document{articles.length !== 1 ? 's' : ''}</p>
        <div className="relative flex items-center gap-2">
          <ArrowUpDown size={14} className="text-gray-400 pointer-events-none absolute left-3" />
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="pl-8 pr-4 py-2 text-sm bg-white border border-gray-200 hover:border-[#006B3F]/40 rounded-xl text-gray-600 focus:outline-none focus:border-[#006B3F] transition-colors cursor-pointer appearance-none"
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {sorted.map((article) => {
            const hasPdf  = Boolean(article.pdfUrl);
            const dateStr = article.date
              ? new Date(article.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
              : "—";

            return (
              <motion.div
                key={article.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.2 }}
                className="group bg-white border border-gray-100 hover:border-[#006B3F]/30 rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:shadow-[#006B3F]/10"
              >
                <div className="flex">
                  {/* File type icon panel */}
                  <FileTypeBadge fileType={article.fileType} />

                  {/* Content */}
                  <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
                    <div>
                      <h3 className="text-[#0A1628] font-bold text-base leading-snug mb-1.5 group-hover:text-[#006B3F] transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      {article.description && (
                        <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{article.description}</p>
                      )}
                      {article.fileSize && (
                        <p className="text-gray-300 text-[11px] mt-1">{article.fileSize}</p>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-2 mt-4">
                      {hasPdf ? (
                        <>
                          <a
                            href={article.pdfUrl}
                            download
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#006B3F] hover:bg-[#004D2C] text-white text-xs font-bold rounded-lg transition-all hover:shadow-lg hover:shadow-[#006B3F]/30 active:scale-95"
                          >
                            <Download size={12} /> Download
                          </a>
                          <a
                            href={article.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium rounded-lg transition-colors"
                          >
                            <Eye size={12} /> Preview
                          </a>
                        </>
                      ) : (
                        <span className="text-xs text-red-400 bg-red-50 border border-red-100 px-3 py-1.5 rounded-lg">
                          File unavailable
                        </span>
                      )}
                      <span className="ml-auto flex items-center gap-1 text-gray-400 text-xs whitespace-nowrap">
                        <Calendar size={11} />{dateStr}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {sorted.length === 0 && (
        <p className="text-center text-gray-400 py-16">No documents uploaded yet.</p>
      )}
    </div>
  );
}
