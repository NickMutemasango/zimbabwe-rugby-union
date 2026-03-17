"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock } from "lucide-react";
import type { Fixture, Result } from "@/lib/db";

type Tab = "all" | "fixtures" | "results";

export default function MatchesClient({ fixtures, results }: { fixtures: Fixture[]; results: Result[] }) {
  const [tab, setTab] = useState<Tab>("all");

  const showFixtures = tab === "all" || tab === "fixtures";
  const showResults  = tab === "all" || tab === "results";

  return (
    <>
      {/* Filter */}
      <div className="flex gap-2 mb-10 p-1 bg-gray-100 rounded-xl w-fit">
        {(["all", "fixtures", "results"] as Tab[]).map((f) => (
          <button key={f} onClick={() => setTab(f)}
            className={`px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
              tab === f ? "bg-[#006B3F] text-white shadow-lg shadow-[#006B3F]/30" : "text-gray-500 hover:text-gray-800"
            }`}>
            {f === "fixtures" ? "Fixtures" : f === "results" ? "Results" : "All"}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {/* Upcoming Fixtures */}
        {showFixtures && fixtures.length > 0 && (
          <>
            {tab === "all" && (
              <p className="text-[#006B3F] text-xs font-bold uppercase tracking-widest mb-3">Upcoming Fixtures</p>
            )}
            {fixtures.map((f, i) => (
              <motion.div key={f.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="bg-[#0A1628] border border-white/5 hover:border-[#006B3F]/40 rounded-2xl p-6 transition-all hover:shadow-xl hover:shadow-[#006B3F]/10">
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <div className="flex flex-col gap-1 sm:w-40">
                    <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider">{f.competition}</span>
                    <span className="text-[10px] font-bold uppercase tracking-wide w-fit px-2 py-0.5 rounded bg-blue-500/20 text-blue-400">
                      Upcoming
                    </span>
                  </div>
                  <div className="flex items-center gap-4 flex-1 justify-center">
                    <span className={`text-white font-bold text-lg ${f.homeTeam === "Zimbabwe" ? "text-[#D4AF37]" : ""}`}>{f.homeTeam}</span>
                    <span className="text-white/30 font-black text-xl">VS</span>
                    <span className={`text-white font-bold text-lg ${f.awayTeam === "Zimbabwe" ? "text-[#D4AF37]" : ""}`}>{f.awayTeam}</span>
                  </div>
                  <div className="flex flex-col gap-1 sm:w-48 text-right">
                    <span className="flex items-center gap-1.5 text-white/50 text-xs sm:justify-end">
                      <Calendar size={11} />
                      {new Date(f.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                    <span className="flex items-center gap-1.5 text-white/50 text-xs sm:justify-end">
                      <Clock size={11} /> {f.time}
                    </span>
                    <span className="flex items-center gap-1.5 text-white/40 text-xs sm:justify-end">
                      <MapPin size={11} /> {f.venue}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </>
        )}

        {/* Results */}
        {showResults && results.length > 0 && (
          <>
            {tab === "all" && (
              <p className="text-[#006B3F] text-xs font-bold uppercase tracking-widest mt-8 mb-3">Recent Results</p>
            )}
            {results.map((r, i) => {
              const zimWin =
                (r.homeTeam === "Zimbabwe" && r.homeScore > r.awayScore) ||
                (r.awayTeam === "Zimbabwe" && r.awayScore > r.homeScore);
              return (
                <motion.div key={r.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                  className="bg-[#0A1628] border border-white/5 hover:border-[#006B3F]/40 rounded-2xl p-6 transition-all hover:shadow-xl hover:shadow-[#006B3F]/10">
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex flex-col gap-1 sm:w-40">
                      <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-wider">{r.competition}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-wide w-fit px-2 py-0.5 rounded ${
                        zimWin ? "bg-[#006B3F]/20 text-[#4ade80]" : "bg-red-500/20 text-red-400"
                      }`}>{zimWin ? "Win" : "Loss"}</span>
                    </div>
                    <div className="flex items-center gap-4 flex-1 justify-center">
                      <span className={`text-white font-bold text-lg ${r.homeTeam === "Zimbabwe" ? "text-[#D4AF37]" : ""}`}>{r.homeTeam}</span>
                      <span className="text-2xl font-black text-white">{r.homeScore} — {r.awayScore}</span>
                      <span className={`text-white font-bold text-lg ${r.awayTeam === "Zimbabwe" ? "text-[#D4AF37]" : ""}`}>{r.awayTeam}</span>
                    </div>
                    <div className="flex flex-col gap-1 sm:w-48 text-right">
                      <span className="flex items-center gap-1.5 text-white/50 text-xs sm:justify-end">
                        <Calendar size={11} />
                        {new Date(r.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                      <span className="flex items-center gap-1.5 text-white/40 text-xs sm:justify-end">
                        <MapPin size={11} /> {r.venue}
                      </span>
                    </div>
                  </div>
                  {r.report && (
                    <p className="mt-4 pt-4 border-t border-white/5 text-white/40 text-xs leading-relaxed">{r.report}</p>
                  )}
                </motion.div>
              );
            })}
          </>
        )}

        {fixtures.length === 0 && results.length === 0 && (
          <div className="text-center py-20 text-gray-400">No matches yet. Add fixtures and results via the Admin Portal.</div>
        )}
      </div>
    </>
  );
}
