"use client";
import { motion } from "framer-motion";
import { Calendar, MapPin } from "lucide-react";
import { MATCHES } from "@/lib/data";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { useState } from "react";

export default function MatchesPage() {
  const [filter, setFilter] = useState<"all" | "upcoming" | "result">("all");
  const filtered = MATCHES.filter((m) => filter === "all" || m.status === filter);

  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Breadcrumbs crumbs={[{ label: "Matches" }]} />
          <h1 className="text-5xl font-black text-[#0A1628] mt-4 mb-2">Match Centre</h1>
          <p className="text-gray-500">Fixtures, results and match reports for the Zimbabwe Sables.</p>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-2 mb-10 p-1 bg-gray-100 rounded-xl w-fit">
          {(["all", "upcoming", "result"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                filter === f
                  ? "bg-[#006B3F] text-white shadow-lg shadow-[#006B3F]/30"
                  : "text-gray-500 hover:text-gray-800"
              }`}
            >
              {f === "result" ? "Results" : f === "upcoming" ? "Fixtures" : "All"}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((match, i) => {
            const isResult = match.status === "result";
            const isZimWin =
              isResult &&
              ((match.homeTeam === "Zimbabwe" && (match.homeScore ?? 0) > (match.awayScore ?? 0)) ||
                (match.awayTeam === "Zimbabwe" && (match.awayScore ?? 0) > (match.homeScore ?? 0)));

            return (
              <motion.div
                key={match.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-[#0A1628] border border-white/5 hover:border-[#006B3F]/40 rounded-2xl p-6 transition-all shadow-sm hover:shadow-xl hover:shadow-[#006B3F]/10"
              >
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex flex-col gap-1 sm:w-40">
                    <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider">{match.competition}</span>
                    <span className={`text-[10px] font-bold uppercase tracking-wide w-fit px-2 py-0.5 rounded ${
                      isResult
                        ? isZimWin ? "bg-[#006B3F]/20 text-[#4ade80]" : "bg-red-500/20 text-red-400"
                        : "bg-blue-500/20 text-blue-400"
                    }`}>
                      {isResult ? (isZimWin ? "Win" : "Loss") : "Upcoming"}
                    </span>
                  </div>

                  <div className="flex items-center gap-4 flex-1 justify-center">
                    <span className={`text-white font-bold text-lg ${match.homeTeam === "Zimbabwe" ? "text-[#D4AF37]" : ""}`}>
                      {match.homeTeam}
                    </span>
                    <div className="text-center">
                      {isResult ? (
                        <span className="text-2xl font-black text-white">{match.homeScore} — {match.awayScore}</span>
                      ) : (
                        <span className="text-white/30 font-black">VS</span>
                      )}
                    </div>
                    <span className={`text-white font-bold text-lg ${match.awayTeam === "Zimbabwe" ? "text-[#D4AF37]" : ""}`}>
                      {match.awayTeam}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1 sm:w-48 text-right">
                    <span className="flex items-center gap-1.5 text-white/50 text-xs sm:justify-end">
                      <Calendar size={11} />
                      {new Date(match.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      {!isResult && ` · ${match.time}`}
                    </span>
                    <span className="flex items-center gap-1.5 text-white/40 text-xs sm:justify-end">
                      <MapPin size={11} />
                      {match.venue}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
