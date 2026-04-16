"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronLeft, Trophy, Calendar, MapPin, Clock,
  Users, BookOpen, Star, Medal,
} from "lucide-react";
import type { TeamData, TeamAchievement } from "@/lib/teamsData";
import type { Fixture, Result } from "@/lib/db";

// ─── Trophy visual ────────────────────────────────────────────────────────────
const MEDAL_CONFIG = {
  gold: {
    topBar: "from-yellow-400 to-amber-500",
    iconBg: "bg-gradient-to-br from-yellow-50 to-amber-50",
    ring: "ring-amber-300",
    badge: "bg-amber-50 border-amber-200 text-amber-700",
    label: "text-amber-600",
    emoji: "🏆",
  },
  silver: {
    topBar: "from-slate-300 to-slate-400",
    iconBg: "bg-gradient-to-br from-slate-50 to-gray-100",
    ring: "ring-slate-300",
    badge: "bg-slate-50 border-slate-200 text-slate-600",
    label: "text-slate-500",
    emoji: "🥈",
  },
  bronze: {
    topBar: "from-orange-400 to-amber-600",
    iconBg: "bg-gradient-to-br from-orange-50 to-amber-50",
    ring: "ring-orange-300",
    badge: "bg-orange-50 border-orange-200 text-orange-700",
    label: "text-orange-600",
    emoji: "🥉",
  },
  milestone: {
    topBar: "from-emerald-400 to-teal-500",
    iconBg: "bg-gradient-to-br from-emerald-50 to-teal-50",
    ring: "ring-emerald-300",
    badge: "bg-emerald-50 border-emerald-200 text-emerald-700",
    label: "text-emerald-600",
    emoji: "🌍",
  },
  upcoming: {
    topBar: "from-purple-400 to-violet-500",
    iconBg: "bg-gradient-to-br from-purple-50 to-violet-50",
    ring: "ring-purple-300",
    badge: "bg-purple-50 border-purple-200 text-purple-700",
    label: "text-purple-600",
    emoji: "⭐",
  },
} as const;

function AchievementCard({ item, index }: { item: TeamAchievement; index: number }) {
  const cfg = MEDAL_CONFIG[item.medal];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
    >
      <div className={`h-1.5 bg-gradient-to-r ${cfg.topBar}`} />
      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl ring-2 ${cfg.ring} ${cfg.iconBg}`}>
            {cfg.emoji}
          </div>
          <div className="text-right">
            <span className={`inline-block text-xs font-black px-2.5 py-1 rounded-lg border ${cfg.badge}`}>
              {item.year}
            </span>
            <p className={`text-[10px] font-bold uppercase tracking-widest mt-1.5 ${cfg.label}`}>
              {item.medal === "upcoming" ? "Upcoming" : item.medal === "milestone" ? "Milestone" : `${item.medal.charAt(0).toUpperCase() + item.medal.slice(1)} Medal`}
            </p>
          </div>
        </div>
        <h3 className="text-[#0A1628] font-black text-sm leading-snug mb-2">{item.title}</h3>
        <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
      </div>
    </motion.div>
  );
}

// ─── Fixture card (light-themed) ─────────────────────────────────────────────
function FixtureCard({ fixture, index }: { fixture: Fixture; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-black text-[#006B3F] bg-[#006B3F]/8 border border-[#006B3F]/15 px-2 py-0.5 rounded-md uppercase tracking-widest">
          {fixture.competition || "Fixture"}
        </span>
        <span className="text-[10px] text-blue-600 font-bold bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
          Upcoming
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="flex-1 text-center text-sm font-black text-[#0A1628]">{fixture.homeTeam}</span>
        <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
          <span className="text-lg font-black text-gray-200">VS</span>
          {fixture.time && (
            <span className="flex items-center gap-0.5 text-[10px] text-gray-400">
              <Clock size={8} /> {fixture.time}
            </span>
          )}
        </div>
        <span className="flex-1 text-center text-sm font-black text-[#006B3F]">{fixture.awayTeam}</span>
      </div>
      <div className="border-t border-gray-100 pt-2.5 flex items-center gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <Calendar size={10} className="text-[#006B3F]" />
          {new Date(fixture.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
        </span>
        {fixture.venue && (
          <span className="flex items-center gap-1 truncate">
            <MapPin size={10} className="text-[#006B3F] flex-shrink-0" />
            {fixture.venue}
          </span>
        )}
      </div>
    </motion.div>
  );
}

function ResultCard({ result, index }: { result: Result; index: number }) {
  const zimHome = result.homeTeam === "Zimbabwe";
  const zimScore = zimHome ? result.homeScore : result.awayScore;
  const oppScore = zimHome ? result.awayScore : result.homeScore;
  const isWin = zimScore > oppScore;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
      className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-black text-[#006B3F] bg-[#006B3F]/8 border border-[#006B3F]/15 px-2 py-0.5 rounded-md uppercase tracking-widest">
          {result.competition || "Result"}
        </span>
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider ${
          isWin ? "bg-green-50 border border-green-200 text-green-700" : "bg-red-50 border border-red-200 text-red-600"
        }`}>
          {isWin ? "Win" : "Loss"}
        </span>
      </div>
      <div className="flex items-center justify-between gap-3 mb-3">
        <span className="flex-1 text-center text-sm font-black text-[#0A1628]">{result.homeTeam}</span>
        <div className="text-center flex-shrink-0">
          <span className="text-2xl font-black text-[#0A1628] tabular-nums">
            {result.homeScore} <span className="text-gray-300">—</span> {result.awayScore}
          </span>
          <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-0.5">Full Time</p>
        </div>
        <span className="flex-1 text-center text-sm font-black text-[#006B3F]">{result.awayTeam}</span>
      </div>
      <div className="border-t border-gray-100 pt-2.5 flex items-center gap-4 text-xs text-gray-400">
        <span className="flex items-center gap-1">
          <Calendar size={10} className="text-[#006B3F]" />
          {new Date(result.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
        </span>
        {result.venue && (
          <span className="flex items-center gap-1 truncate">
            <MapPin size={10} className="text-[#006B3F] flex-shrink-0" />
            {result.venue}
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ─── Tab types ────────────────────────────────────────────────────────────────
type TabId = "achievements" | "matches" | "history";

// ─── Main client component ────────────────────────────────────────────────────
type FormEntry = { result: "W" | "L" | "D"; opponent: string; date: string };

export default function TeamDetailClient({ team }: { team: TeamData }) {
  const [activeTab, setActiveTab] = useState<TabId>("achievements");
  const [fixtures, setFixtures] = useState<Fixture[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [loadingMatches, setLoadingMatches] = useState(true);
  const [formEntries, setFormEntries] = useState<FormEntry[]>([]);
  const [formLoading, setFormLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch("/api/fixtures").then(r => r.json()).catch(() => []),
      fetch("/api/results").then(r => r.json()).catch(() => []),
    ]).then(([fixData, resData]) => {
      const allFix: Fixture[] = Array.isArray(fixData) ? fixData : [];
      const allRes: Result[] = Array.isArray(resData) ? resData : [];

      // Filter to matches involving this team
      const teamNames = team.matchTeamNames.map(n => n.toLowerCase());
      const filtered = allFix.filter(f =>
        teamNames.includes(f.homeTeam.toLowerCase()) ||
        teamNames.includes(f.awayTeam.toLowerCase())
      );
      const filteredRes = allRes.filter(r =>
        teamNames.includes(r.homeTeam.toLowerCase()) ||
        teamNames.includes(r.awayTeam.toLowerCase())
      );

      setFixtures(filtered);
      setResults(filteredRes);
    }).finally(() => setLoadingMatches(false));
  }, [team.matchTeamNames]);

  useEffect(() => {
    fetch("/api/team-form")
      .then(r => r.json())
      .then((data: Array<{ teamSlug: string } & FormEntry>) => {
        if (!Array.isArray(data)) return;
        const filtered = data
          .filter(e => e.teamSlug === team.slug)
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5)
          .map(({ result, opponent, date }) => ({ result, opponent, date }));
        setFormEntries(filtered);
      })
      .catch(() => {})
      .finally(() => setFormLoading(false));
  }, [team.slug]);

  const TABS: { id: TabId; label: string; icon: React.ElementType }[] = [
    { id: "achievements", label: "Achievements", icon: Trophy },
    { id: "matches",      label: "Matches",      icon: Calendar },
    { id: "history",      label: "History",      icon: BookOpen },
  ];

  const formColors: Record<string, string> = {
    W: "bg-emerald-500 text-white",
    L: "bg-red-100 text-red-600 border border-red-200",
    D: "bg-yellow-100 text-yellow-700 border border-yellow-200",
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Hero Header ─────────────────────────────────────────────────────── */}
      <div
        className="relative pt-28 pb-20 overflow-hidden"
        style={{
          background: team.heroImage
            ? `linear-gradient(135deg, rgba(10,22,40,0.88) 0%, ${team.heroBgColor}CC 100%), url(${team.heroImage}) center/cover no-repeat`
            : `linear-gradient(135deg, #0A1628 0%, ${team.heroBgColor} 100%)`,
        }}
      >
        {/* Subtle dot overlay */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "24px 24px" }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-b from-transparent to-slate-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link
            href="/teams"
            className="inline-flex items-center gap-1.5 text-white/60 hover:text-white text-sm mb-8 transition-colors"
          >
            <ChevronLeft size={14} /> Back to Teams
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            {/* Badge icon */}
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 border-2 shadow-2xl"
              style={{ backgroundColor: `${team.accentColor}30`, borderColor: `${team.accentColor}60` }}
            >
              <Medal size={36} className="text-white" />
            </div>

            <div>
              <span
                className="inline-block text-[10px] font-black tracking-[0.25em] uppercase px-3 py-1 rounded-lg mb-3"
                style={{ backgroundColor: `${team.accentColor}30`, color: "#fff", border: `1px solid ${team.accentColor}60` }}
              >
                {team.badgeText}
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight drop-shadow-lg">
                {team.name}
              </h1>
              <p className="font-bold text-lg mt-1" style={{ color: team.accentColor }}>
                {team.nickname}
              </p>
            </div>

            {/* Key stats row (desktop) */}
            <div className="hidden sm:flex items-center gap-4 ml-auto pb-1">
              {[
                { label: "Founded", value: team.founded },
                { label: "Coach", value: team.coach },
                { label: "Captain", value: team.captain },
              ].map(s => (
                <div key={s.label} className="text-center">
                  <p className="text-white font-black text-base leading-none">{s.value}</p>
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="grid lg:grid-cols-4 gap-8">

          {/* ── Sidebar ── */}
          <aside className="lg:col-span-1 space-y-5 order-last lg:order-first">
            {/* About */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-[#0A1628] font-black text-sm uppercase tracking-widest mb-3 flex items-center gap-2">
                <Users size={14} style={{ color: team.accentColor }} /> About
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed">{team.description}</p>
            </div>

            {/* Key Facts */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-[#0A1628] font-black text-sm uppercase tracking-widest mb-3">Key Facts</h3>
              <div className="space-y-2.5">
                {team.keyFacts.map((f, i) => (
                  <div key={i} className="flex justify-between items-center">
                    <span className="text-gray-400 text-xs">{f.label}</span>
                    <span className="text-[#0A1628] text-xs font-black">{f.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Form */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-[#0A1628] font-black text-sm uppercase tracking-widest mb-3">Recent Form</h3>
              {formLoading ? (
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(i => (
                    <div key={i} className="w-9 h-9 rounded-lg bg-gray-100 animate-pulse" />
                  ))}
                </div>
              ) : formEntries.length === 0 ? (
                <p className="text-gray-300 text-xs italic">No recent match data</p>
              ) : (
                <>
                  <div className="flex gap-2">
                    {formEntries.map((e, i) => (
                      <div
                        key={i}
                        title={`vs ${e.opponent}`}
                        className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black cursor-default ${formColors[e.result]}`}
                      >
                        {e.result}
                      </div>
                    ))}
                  </div>
                  <p className="text-gray-300 text-xs mt-2">Last {formEntries.length} (newest first)</p>
                </>
              )}
            </div>

            {/* Players CTA */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <p className="text-[#0A1628] font-black text-sm mb-1">Squad Profiles</p>
              <p className="text-gray-400 text-xs mb-3">Full player stats, caps &amp; bios.</p>
              <Link
                href="/players"
                className="inline-flex items-center gap-1.5 w-full justify-center px-4 py-2.5 text-white text-sm font-bold rounded-xl transition-all hover:opacity-90"
                style={{ backgroundColor: team.accentColor }}
              >
                <Users size={13} /> View Players
              </Link>
            </div>
          </aside>

          {/* ── Main Panel ── */}
          <div className="lg:col-span-3">
            {/* Tab Navigation */}
            <div className="flex gap-2 mb-7 bg-white border border-gray-200 p-1 rounded-2xl shadow-sm">
              {TABS.map(tab => {
                const Icon = tab.icon;
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-sm font-bold transition-all ${
                      active
                        ? "text-white shadow-md"
                        : "text-gray-400 hover:text-gray-700"
                    }`}
                    style={active ? { backgroundColor: team.accentColor } : {}}
                  >
                    <Icon size={14} />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {/* ─── Achievements Tab ─── */}
              {activeTab === "achievements" && (
                <motion.div
                  key="achievements"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {team.achievements.length === 0 ? (
                    <p className="text-center text-gray-400 py-16">No achievements recorded yet.</p>
                  ) : (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {team.achievements.map((a, i) => (
                        <AchievementCard key={i} item={a} index={i} />
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* ─── Matches Tab ─── */}
              {activeTab === "matches" && (
                <motion.div
                  key="matches"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-6"
                >
                  {loadingMatches ? (
                    <div className="grid sm:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4 animate-pulse space-y-3">
                          <div className="flex justify-between">
                            <div className="h-3 bg-gray-100 rounded w-24" />
                            <div className="h-3 bg-gray-100 rounded w-16" />
                          </div>
                          <div className="flex justify-between items-center gap-3">
                            <div className="h-4 bg-gray-100 rounded w-20 flex-1" />
                            <div className="h-6 bg-gray-100 rounded w-12" />
                            <div className="h-4 bg-gray-100 rounded w-20 flex-1" />
                          </div>
                          <div className="h-3 bg-gray-100 rounded w-36" />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <>
                      {/* Upcoming Fixtures */}
                      <div>
                        <h3 className="text-[#0A1628] font-black text-base mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                          Upcoming Fixtures
                        </h3>
                        {fixtures.length === 0 ? (
                          <p className="text-gray-400 text-sm py-8 text-center bg-white border border-gray-200 rounded-2xl">
                            No upcoming fixtures scheduled yet.
                          </p>
                        ) : (
                          <div className="grid sm:grid-cols-2 gap-4">
                            {fixtures.map((f, i) => <FixtureCard key={f.id} fixture={f} index={i} />)}
                          </div>
                        )}
                      </div>

                      {/* Recent Results */}
                      <div>
                        <h3 className="text-[#0A1628] font-black text-base mb-4 flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#006B3F]" />
                          Recent Results
                        </h3>
                        {results.length === 0 ? (
                          <p className="text-gray-400 text-sm py-8 text-center bg-white border border-gray-200 rounded-2xl">
                            No results recorded yet.
                          </p>
                        ) : (
                          <div className="grid sm:grid-cols-2 gap-4">
                            {results.map((r, i) => <ResultCard key={r.id} result={r} index={i} />)}
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </motion.div>
              )}

              {/* ─── History Tab ─── */}
              {activeTab === "history" && (
                <motion.div
                  key="history"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white border border-gray-200 rounded-2xl p-7 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-6 pb-5 border-b border-gray-100">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: `${team.accentColor}15` }}
                    >
                      <Star size={18} style={{ color: team.accentColor }} />
                    </div>
                    <div>
                      <h2 className="text-[#0A1628] font-black text-lg leading-none">
                        The {team.nickname} Story
                      </h2>
                      <p className="text-gray-400 text-xs mt-0.5">Est. {team.founded}</p>
                    </div>
                  </div>
                  <div className="space-y-5">
                    {team.history.map((para, i) => (
                      <p key={i} className={`text-gray-600 leading-relaxed ${i === 0 ? "text-base font-medium text-gray-700" : "text-sm"}`}>
                        {para}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
