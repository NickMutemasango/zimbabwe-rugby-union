"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, MapPin, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import type { Fixture, Result } from "@/lib/db";

type AnyMatch = (Fixture & { status: "upcoming" }) | (Result & { status: "result" });

// ─── Match card — Lite theme ──────────────────────────────────────────────────
function MatchCard({ match, index }: { match: AnyMatch; index: number }) {
  const isResult = match.status === "result";
  const homeScore = isResult ? (match as Result).homeScore : undefined;
  const awayScore = isResult ? (match as Result).awayScore : undefined;
  const time = !isResult ? (match as Fixture).time : undefined;

  const isZimHome = match.homeTeam === "Zimbabwe";
  const isZimAway = match.awayTeam === "Zimbabwe";
  const isZimWin =
    isResult &&
    ((isZimHome && (homeScore ?? 0) > (awayScore ?? 0)) ||
      (isZimAway && (awayScore ?? 0) > (homeScore ?? 0)));

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group bg-white border border-gray-200 hover:border-[#006B3F]/40 rounded-2xl p-5 transition-all shadow-sm hover:shadow-lg hover:shadow-gray-100 hover:-translate-y-0.5"
    >
      {/* Competition + status row */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-[10px] text-[#006B3F] font-bold uppercase tracking-widest bg-[#006B3F]/8 border border-[#006B3F]/15 px-2 py-1 rounded-md">
          {match.competition || "Match"}
        </span>
        <span
          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${
            isResult
              ? isZimWin
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-red-50 text-red-600 border border-red-200"
              : "bg-blue-50 text-blue-600 border border-blue-100"
          }`}
        >
          {isResult ? (isZimWin ? "Win" : "Loss") : "Upcoming"}
        </span>
      </div>

      {/* Teams row */}
      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex flex-col items-center gap-1.5 flex-1">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center border text-xs font-black ${
              isZimHome
                ? "bg-[#006B3F]/8 border-[#006B3F]/25 text-[#006B3F]"
                : "bg-gray-50 border-gray-200 text-gray-600"
            }`}
          >
            {match.homeTeam.slice(0, 3).toUpperCase()}
          </div>
          <span
            className={`font-bold text-sm text-center leading-tight ${
              isZimHome ? "text-[#006B3F]" : "text-slate-800"
            }`}
          >
            {match.homeTeam}
          </span>
        </div>

        <div className="text-center flex-shrink-0">
          {isResult ? (
            <div className="text-3xl font-black tabular-nums text-slate-800">
              <span className={isZimHome && isZimWin ? "text-[#006B3F]" : ""}>{homeScore}</span>
              <span className="text-gray-300 mx-1">—</span>
              <span className={isZimAway && isZimWin ? "text-[#006B3F]" : ""}>{awayScore}</span>
            </div>
          ) : (
            <div className="text-xl font-black text-gray-200">VS</div>
          )}
          <div className="text-[10px] text-gray-400 mt-1 uppercase tracking-wider">
            {isResult ? "Full Time" : time}
          </div>
        </div>

        <div className="flex flex-col items-center gap-1.5 flex-1">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center border text-xs font-black ${
              isZimAway
                ? "bg-[#006B3F]/8 border-[#006B3F]/25 text-[#006B3F]"
                : "bg-gray-50 border-gray-200 text-gray-600"
            }`}
          >
            {match.awayTeam.slice(0, 3).toUpperCase()}
          </div>
          <span
            className={`font-bold text-sm text-center leading-tight ${
              isZimAway ? "text-[#006B3F]" : "text-slate-800"
            }`}
          >
            {match.awayTeam}
          </span>
        </div>
      </div>

      {/* Date + venue */}
      <div className="flex items-center gap-4 text-gray-400 text-xs border-t border-gray-100 pt-3">
        <span className="flex items-center gap-1">
          <Calendar size={11} className="text-[#006B3F]" />
          {new Date(match.date).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </span>
        {!isResult && time && (
          <span className="flex items-center gap-1">
            <Clock size={11} className="text-[#006B3F]" />
            {time}
          </span>
        )}
        {match.venue && (
          <span className="flex items-center gap-1 truncate">
            <MapPin size={11} className="text-[#006B3F] flex-shrink-0" />
            {match.venue}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ─── Skeleton card — Lite theme ───────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm animate-pulse space-y-4">
      <div className="flex justify-between">
        <div className="h-4 bg-gray-100 rounded-md w-24" />
        <div className="h-4 bg-gray-100 rounded-md w-16" />
      </div>
      <div className="flex justify-between items-center gap-4">
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="w-12 h-12 bg-gray-100 rounded-full" />
          <div className="h-3 bg-gray-100 rounded w-16" />
        </div>
        <div className="h-8 bg-gray-100 rounded w-14" />
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="w-12 h-12 bg-gray-100 rounded-full" />
          <div className="h-3 bg-gray-100 rounded w-16" />
        </div>
      </div>
      <div className="h-3 bg-gray-100 rounded w-40" />
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
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
      const resultList: Result[] = Array.isArray(resultData) ? resultData : [];

      if (process.env.NODE_ENV !== "production") {
        console.group("%c[MatchCenter] API", "color:#22c55e;font-weight:bold");
        console.log(`Fixtures: ${fixtureList.length} | Results: ${resultList.length}`);
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
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#006B3F] to-transparent opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[#006B3F] text-xs font-bold tracking-[0.3em] uppercase mb-3">
            Match Centre
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-[#0A1628]">
            Fixtures &amp; Results
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Upcoming Fixtures */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#0A1628] font-bold text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                Upcoming Fixtures
              </h3>
              <Link
                href="/matches"
                className="text-[#006B3F] text-sm flex items-center gap-1 hover:gap-2 transition-all font-medium"
              >
                All fixtures <ChevronRight size={14} />
              </Link>
            </div>
            <div className="space-y-4">
              {loading ? (
                Array.from({ length: 2 }).map((_, i) => <SkeletonCard key={i} />)
              ) : upcomingMatches.length === 0 ? (
                <div className="bg-gray-50 border border-gray-200 rounded-2xl text-center py-10 text-gray-400 text-sm">
                  No upcoming fixtures scheduled.
                </div>
              ) : (
                upcomingMatches.slice(0, 2).map((m, i) => (
                  <MatchCard key={m.id} match={m} index={i} />
                ))
              )}
            </div>
          </div>

          {/* Recent Results */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-[#0A1628] font-bold text-lg flex items-center gap-2">
                <span className="w-2 h-2 bg-[#006B3F] rounded-full" />
                Recent Results
              </h3>
              <Link
                href="/matches"
                className="text-[#006B3F] text-sm flex items-center gap-1 hover:gap-2 transition-all font-medium"
              >
                All results <ChevronRight size={14} />
              </Link>
            </div>
            <div className="space-y-4">
              {loading ? (
                Array.from({ length: 2 }).map((_, i) => <SkeletonCard key={i} />)
              ) : resultMatches.length === 0 ? (
                <div className="bg-gray-50 border border-gray-200 rounded-2xl text-center py-10 text-gray-400 text-sm">
                  No results yet.
                </div>
              ) : (
                resultMatches.slice(0, 2).map((m, i) => (
                  <MatchCard key={m.id} match={m} index={i} />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
