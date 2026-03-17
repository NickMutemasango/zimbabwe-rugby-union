"use client";
import { motion } from "framer-motion";
import { FileText, Download, Eye } from "lucide-react";
import { ARTICLES } from "@/lib/data";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default function ArticlesPage() {
  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Breadcrumbs crumbs={[{ label: "Articles & PDFs" }]} />
          <h1 className="text-5xl font-black text-[#0A1628] mt-4 mb-2">Article & PDF Centre</h1>
          <p className="text-gray-500">Official reports, guides and publications from the Zimbabwe Rugby Union.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {ARTICLES.map((article, i) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white border border-gray-100 hover:border-[#006B3F]/30 rounded-2xl overflow-hidden transition-all hover:shadow-xl hover:shadow-[#006B3F]/10"
            >
              <div className="flex">
                <div className="w-28 flex-shrink-0 bg-gradient-to-b from-[#006B3F]/15 to-[#0A1628]/10 flex flex-col items-center justify-center p-4 border-r border-gray-100">
                  <FileText size={32} className="text-[#D4AF37] mb-2" />
                  <span className="text-[#006B3F] text-[10px] font-black uppercase">PDF</span>
                  <span className="text-gray-400 text-[10px] mt-1">{article.pages}p</span>
                  <span className="text-gray-400 text-[10px]">{article.fileSize}</span>
                </div>
                <div className="flex-1 p-5 flex flex-col justify-between">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-[#D4AF37]/10 text-[#B8920A] text-[10px] font-bold uppercase tracking-wider rounded mb-2">
                      {article.category}
                    </span>
                    <h3 className="text-[#0A1628] font-bold text-base leading-snug mb-2 group-hover:text-[#006B3F] transition-colors">
                      {article.title}
                    </h3>
                    <p className="text-gray-400 text-xs leading-relaxed line-clamp-2">{article.description}</p>
                  </div>
                  <div className="flex items-center gap-2 mt-4">
                    <a href={article.file} className="flex items-center gap-1.5 px-3 py-1.5 bg-[#006B3F] hover:bg-[#004D2C] text-white text-xs font-bold rounded-lg transition-all hover:shadow-lg hover:shadow-[#006B3F]/30">
                      <Download size={12} /> Download
                    </a>
                    <a href={article.file} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 hover:text-gray-800 text-xs font-medium rounded-lg transition-colors">
                      <Eye size={12} /> Preview
                    </a>
                    <span className="ml-auto text-gray-400 text-xs">
                      {new Date(article.date).toLocaleDateString("en-GB", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
