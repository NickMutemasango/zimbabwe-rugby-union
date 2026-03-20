"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, Trophy } from "lucide-react";
import type { Fixture, Result } from "@/lib/db";

type Tab = "all" | "fixtures" | "results" | "standings";

// ── Standings calculator ──────────────────────────────────────────────────────
interface TeamStat {
  team: string; P: number; W: number; D: number; L: number;
  PF: number; PA: number; PD: number; Pts: number;
}

function computeStandings(results: Result[]): TeamStat[] {
  const stats: Record<string, TeamStat> = {};
  const get = (team: string): TeamStat => {
    if (!stats[team]) stats[team] = { team, P:0, W:0, D:0, L:0, PF:0, PA:0, PD:0, Pts:0 };
    return stats[team];
  };
  for (const r of results) {
    const home = get(r.homeTeam);
    const away = get(r.awayTeam);
    home.P++; away.P++;
    home.PF += r.homeScore; home.PA += r.awayScore;
    away.PF += r.awayScore; away.PA += r.homeScore;
    if (r.homeScore > r.awayScore) {
      home.W++; home.Pts += 4; away.L++;
    } else if (r.awayScore > r.homeScore) {
      away.W++; away.Pts += 4; home.L++;
    } else {
      home.D++; home.Pts += 2; away.D++; away.Pts += 2;
    }
  }
  for (const s of Object.values(stats)) s.PD = s.PF - s.PA;
  return Object.values(stats).sort((a, b) => b.Pts - a.Pts || b.PD - a.PD);
}

// ── Standings panel ───────────────────────────────────────────────────────────
function Standings({ results }: { results: Result[] }) {
  const rows = computeStandings(results);
  if (rows.length === 0) return null;

  return (
    <div className="bg-[#0A1628] border border-white/5 rounded-2xl overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-4 border-b border-white/5">
        <Trophy size={15} className="text-[#D4AF37]" />
        <h3 className="text-white font-black text-sm uppercase tracking-wider">Standings</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left px-5 py-2.5 text-white/30 font-bold uppercase tracking-widest w-8">#</th>
              <th className="text-left px-2 py-2.5 text-white/30 font-bold uppercase tracking-widest">Team</th>
              <th className="text-center px-2 py-2.5 text-white/30 font-bold uppercase tracking-widest">P</th>
              <th className="text-center px-2 py-2.5 text-white/30 font-bold uppercase tracking-widest">W</th>
              <th className="text-center px-2 py-2.5 text-white/30 font-bold uppercase tracking-widest">D</th>
              <th className="text-center px-2 py-2.5 text-white/30 font-bold uppercase tracking-widest">L</th>
              <th className="text-center px-2 py-2.5 text-white/30 font-bold uppercase tracking-widest">PD</th>
              <th className="text-center px-3 py-2.5 text-[#D4AF37] font-bold uppercase tracking-widest">Pts</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const isZim = row.team === "Zimbabwe";
              return (
                <motion.tr
                  key={row.team}
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className={`border-b border-white/5 last:border-0 transition-colors hover:bg-white/5 ${isZim ? "bg-[#006B3F]/10" : ""}`}
                >
                  <td className="px-5 py-3 text-white/30 font-bold">{i + 1}</td>
                  <td className="px-2 py-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-black flex-shrink-0 ${
                        isZim ? "bg-[#006B3F] text-white" : "bg-white/10 text-white/60"
                      }`}>
                        {row.team.slice(0, 2).toUpperCase()}
                      </div>
                      <span className={`font-bold truncate max-w-[90px] ${isZim ? "text-[#D4AF37]" : "text-white"}`}>
                        {row.team}
                      </span>
                    </div>
                  </td>
                  <td className="text-center px-2 py-3 text-white/60">{row.P}</td>
                  <td className="text-center px-2 py-3 text-[#4ade80] font-bold">{row.W}</td>
                  <td className="text-center px-2 py-3 text-white/40">{row.D}</td>
                  <td className="text-center px-2 py-3 text-red-400">{row.L}</td>
                  <td className={`text-center px-2 py-3 font-bold ${row.PD >= 0 ? "text-[#4ade80]" : "text-red-400"}`}>
                    {row.PD > 0 ? `+${row.PD}` : row.PD}
                  </td>
                  <td className="text-center px-3 py-3 text-[#D4AF37] font-black text-sm">{row.Pts}</td>
                </motion.tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="px-5 py-3 border-t border-white/5">
        <p className="text-white/20 text-[10px]">Win = 4 pts · Draw = 2 pts · Loss = 0 pts</p>
      </div>
    </div>
  );
}

// ── Main client component ─────────────────────────────────────────────────────
export default function MatchesClient({ fixtures, results }: { fixtures: Fixture[]; results: Result[] }) {
  const [tab, setTab] = useState<Tab>("all");

  const showFixtures = tab === "all" || tab === "fixtures";
  const showResults  = tab === "all" || tab === "results";
  const showStandings = tab === "standings";

  const TABS: { value: Tab; label: string }[] = [
    { value: "all",       label: "All"       },
    { value: "fixtures",  label: "Fixtures"  },
    { value: "results",   label: "Results"   },
    { value: "standings", label: "Standings" },
  ];

  return (
    <div className={showStandings ? undefined : "lg:grid lg:grid-cols-3 lg:gap-8 space-y-8 lg:space-y-0"}>

      {/* ── Left: Fixtures + Results (or full-width Standings) ── */}
      <div className={showStandings ? undefined : "lg:col-span-2"}>
        {/* Filter tabs */}
        <div className="flex gap-2 mb-8 p-1 bg-gray-100 rounded-xl w-fit">
          {TABS.map(({ value, label }) => (
            <button key={value} onClick={() => setTab(value)}
              className={`px-5 py-2 rounded-lg text-sm font-bold capitalize transition-all ${
                tab === value ? "bg-[#006B3F] text-white shadow-lg shadow-[#006B3F]/30" : "text-gray-500 hover:text-gray-800"
              }`}>
              {label}
            </button>
          ))}
        </div>

        {/* Standings view (full-width when tab === "standings") */}
        {showStandings && (
          <motion.div key="standings" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            {results.length > 0 ? (
              <Standings results={results} />
            ) : (
              <div className="bg-[#0A1628] border border-white/5 rounded-2xl p-16 text-center">
                <Trophy size={32} className="text-white/10 mx-auto mb-4" />
                <p className="text-white/30 text-sm">Standings will appear once results are added.</p>
              </div>
            )}
          </motion.div>
        )}

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
      </div>

      {/* ── Right: Standings sidebar (hidden when standings tab is active) ── */}
      {!showStandings && (
        <div className="lg:col-span-1">
          <p className="text-[#006B3F] text-xs font-bold uppercase tracking-widest mb-4">League Standings</p>
          {results.length > 0 ? (
            <Standings results={results} />
          ) : (
            <div className="bg-[#0A1628] border border-white/5 rounded-2xl p-8 text-center">
              <Trophy size={28} className="text-white/10 mx-auto mb-3" />
              <p className="text-white/30 text-sm">Standings will appear once results are added.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
