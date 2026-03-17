"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Fixture, Result } from "@/lib/db";

type AnyMatch = (Fixture & { status: "upcoming" }) | (Result & { status: "result" });

function MatchCard({ match, index }: { match: AnyMatch; index: number }) {
  const isResult = match.status === "result";
  const homeScore = isResult ? (match as Result).homeScore : undefined;
  const awayScore = isResult ? (match as Result).awayScore : undefined;
  const time = !isResult ? (match as Fixture).time : undefined;

  const isZimWin =
    isResult &&
    ((match.homeTeam === "Zimbabwe" && (homeScore ?? 0) > (awayScore ?? 0)) ||
      (match.awayTeam === "Zimbabwe" && (awayScore ?? 0) > (homeScore ?? 0)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group bg-[#0A1628] border border-white/5 hover:border-[#006B3F]/50 rounded-2xl p-5 transition-all hover:shadow-2xl hover:shadow-[#006B3F]/15 hover:-translate-y-1"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest bg-[#D4AF37]/10 px-2 py-1 rounded-md">
          {match.competition}
        </span>
        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
          isResult
            ? isZimWin ? "bg-[#006B3F]/20 text-[#4ade80]" : "bg-red-500/20 text-red-400"
            : "bg-blue-500/20 text-blue-400"
        }`}>
          {isResult ? (isZimWin ? "Win" : "Loss") : "Upcoming"}
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex flex-col items-center gap-1 flex-1">
          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 text-xs font-black text-white">
            {match.homeTeam.slice(0, 3).toUpperCase()}
          </div>
          <span className="text-white font-bold text-sm text-center">{match.homeTeam}</span>
        </div>

        <div className="text-center flex-shrink-0">
          {isResult ? (
            <div className="text-3xl font-black text-white tabular-nums">
              <span className={match.homeTeam === "Zimbabwe" && isZimWin ? "text-[#D4AF37]" : ""}>{homeScore}</span>
              <span className="text-white/30 mx-1">—</span>
              <span className={match.awayTeam === "Zimbabwe" && isZimWin ? "text-[#D4AF37]" : ""}>{awayScore}</span>
            </div>
          ) : (
            <div className="text-xl font-black text-white/30">VS</div>
          )}
          <div className="text-[10px] text-white/40 mt-1 uppercase tracking-wider">{isResult ? "Full Time" : time}</div>
        </div>

        <div className="flex flex-col items-center gap-1 flex-1">
          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 text-xs font-black text-white">
            {match.awayTeam.slice(0, 3).toUpperCase()}
          </div>
          <span className="text-white font-bold text-sm text-center">{match.awayTeam}</span>
        </div>
      </div>

      <div className="flex items-center gap-4 text-white/40 text-xs border-t border-white/5 pt-3">
        <span className="flex items-center gap-1">
          <Calendar size={11} />
          {new Date(match.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
        </span>
        <span className="flex items-center gap-1 truncate">
          <MapPin size={11} />
          {match.venue}
        </span>
      </div>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-[#0A1628] border border-white/5 rounded-2xl p-5 animate-pulse space-y-4">
      <div className="flex justify-between">
        <div className="h-3 bg-white/10 rounded w-24" />
        <div className="h-3 bg-white/10 rounded w-16" />
      </div>
      <div className="flex justify-between items-center gap-4">
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="w-12 h-12 bg-white/10 rounded-full" />
          <div className="h-3 bg-white/10 rounded w-16" />
        </div>
        <div className="h-8 bg-white/10 rounded w-16" />
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="w-12 h-12 bg-white/10 rounded-full" />
          <div className="h-3 bg-white/10 rounded w-16" />
        </div>
      </div>
      <div className="h-3 bg-white/10 rounded w-32 pt-3" />
    </div>
  );
}

export default function MatchCenter() {
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/fixtures").then((r) => r.json()).catch(() => []),
      fetch("/api/results").then((r) => r.json()).catch(() => []),
    ]).then(([fixtureData, resultData]) => {
      const fixtureList: Fixture[] = Array.isArray(fixtureData) ? fixtureData : [];
      const resultList:  Result[]  = Array.isArray(resultData)  ? resultData  : [];

      // ── DEV: log API responses ─────────────────────────────────────────────
      if (process.env.NODE_ENV !== "production") {
        console.group("%c[MatchCenter] GET /api/fixtures + /api/results", "color:#22c55e;font-weight:bold");
        console.log(`Fixtures: ${fixtureList.length} | Results: ${resultList.length}`);
        if (fixtureList.length) console.table(fixtureList.map(f => ({ id: f.id, home: f.homeTeam, away: f.awayTeam, date: f.date, venue: f.venue })));
        if (resultList.length)  console.table(resultList.map(r  => ({ id: r.id,  home: r.homeTeam, away: r.awayTeam, score: `${r.homeScore}–${r.awayScore}`, date: r.date })));
        console.groupEnd();
      }

      setFixtures(fixtureList);
      setResults(resultList);
    }).finally(() => setLoading(false));
  }, []);

  const upcomingMatches: AnyMatch[] = fixtures.map((f) => ({ ...f, status: "upcoming" as const }));
  const resultMatches: AnyMatch[] = results.map((r) => ({ ...r, status: "result" as const }));

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Top green accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#006B3F] to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[#006B3F] text-xs font-bold tracking-[0.3em] uppercase mb-3">Match Centre</p>
          <h2 className="text-4xl sm:text-5xl font-black text-[#0A1628]">Fixtures &amp; Results</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#0A1628] font-bold text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                Upcoming Fixtures
              </h3>
              <Link href="/matches" className="text-[#006B3F] text-sm flex items-center gap-1 hover:gap-2 transition-all font-medium">
                All fixtures <ChevronRight size={14} />
              </Link>
            </div>
            <div className="space-y-4">
              {loading ? (
                Array.from({ length: 2 }).map((_, i) => <SkeletonCard key={i} />)
              ) : upcomingMatches.length === 0 ? (
                <div className="text-center py-10 text-gray-400 text-sm">No upcoming fixtures.</div>
              ) : (
                upcomingMatches.map((m, i) => <MatchCard key={m.id} match={m} index={i} />)
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#0A1628] font-bold text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-[#006B3F] rounded-full" />
                Recent Results
              </h3>
              <Link href="/matches" className="text-[#006B3F] text-sm flex items-center gap-1 hover:gap-2 transition-all font-medium">
                All results <ChevronRight size={14} />
              </Link>
            </div>
            <div className="space-y-4">
              {loading ? (
                Array.from({ length: 2 }).map((_, i) => <SkeletonCard key={i} />)
              ) : resultMatches.length === 0 ? (
                <div className="text-center py-10 text-gray-400 text-sm">No results yet.</div>
              ) : (
                resultMatches.map((m, i) => <MatchCard key={m.id} match={m} index={i} />)
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
