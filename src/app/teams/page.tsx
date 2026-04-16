import Link from "next/link";
import { ChevronRight, Users } from "lucide-react";
import type { Metadata } from "next";
import { TEAMS_LIST, type TeamData } from "@/lib/teamsData";

export const metadata: Metadata = {
  title: "Our Teams | Zimbabwe Rugby Union",
  description:
    "Explore Zimbabwe Rugby Union's national squads — The Sables, Lady Sables, Cheetahs, and Junior Sables.",
};

type FormBadge = { result: "W" | "L" | "D"; opponent: string };

// ─── Individual image card ───────────────────────────────────────────────────
function TeamCard({
  team,
  formData,
  className = "",
}: {
  team: TeamData;
  formData?: FormBadge[];
  className?: string;
}) {
  const badges: FormBadge[] =
    formData && formData.length > 0
      ? formData
      : team.recentForm.map((r) => ({ result: r, opponent: "" }));

  return (
    <Link
      href={`/teams/${team.slug}`}
      className={`group relative overflow-hidden rounded-2xl block ${className}`}
    >
      {/* Background image */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
        style={{
          backgroundImage: `url(${team.cardImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/90 transition-all duration-300" />

      {/* Top badge */}
      <div className="absolute top-4 left-4">
        <span
          className="text-[10px] font-black tracking-[0.22em] uppercase px-3 py-1 rounded-full backdrop-blur-sm"
          style={{
            backgroundColor: `${team.accentColor}30`,
            color: "#fff",
            border: `1px solid ${team.accentColor}70`,
          }}
        >
          {team.badgeText}
        </span>
      </div>

      {/* Content — pinned to bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
        <h2 className="text-white font-black text-2xl sm:text-3xl leading-tight drop-shadow-md">
          {team.name}
        </h2>
        <p className="text-white/70 text-sm mt-1.5 leading-relaxed line-clamp-2">
          {team.tagline}
        </p>

        <div className="flex items-center justify-between mt-4">
          {/* Recent form badges with hover tooltip */}
          <div className="flex gap-1.5">
            {badges.map(({ result: r, opponent }, i) => (
              <div key={i} className="relative group/badge">
                <div
                  className={`w-5 h-5 rounded-sm flex items-center justify-center text-[8px] font-black cursor-default ${
                    r === "W"
                      ? "bg-emerald-500 text-white"
                      : r === "L"
                      ? "bg-red-500/80 text-white"
                      : "bg-yellow-400 text-black"
                  }`}
                >
                  {r}
                </div>
                {opponent && (
                  <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10
                    opacity-0 group-hover/badge:opacity-100
                    transition-opacity duration-150 pointer-events-none">
                    <div className="bg-black/90 text-white text-[9px] font-bold px-2 py-1 rounded-md whitespace-nowrap">
                      vs {opponent}
                    </div>
                    <div className="w-0 h-0 mx-auto border-x-4 border-x-transparent border-t-4 border-t-black/90" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* CTA */}
          <span
            className="inline-flex items-center gap-1.5 text-sm font-bold group-hover:gap-2.5 transition-all duration-200"
            style={{ color: team.accentColor === "#006B3F" ? "#4ade80" : "#fff" }}
          >
            View Team <ChevronRight size={14} />
          </span>
        </div>
      </div>
    </Link>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────
export default async function TeamsPage() {
  const [sables, ladySables, cheetahs, juniorSables] = [
    TEAMS_LIST.find((t) => t.slug === "mens-xv")!,
    TEAMS_LIST.find((t) => t.slug === "womens-xv")!,
    TEAMS_LIST.find((t) => t.slug === "cheetahs")!,
    TEAMS_LIST.find((t) => t.slug === "junior-sables")!,
  ].filter(Boolean) as TeamData[];

  // Fetch dynamic form data — only when MongoDB is configured
  let formByTeam: Record<string, FormBadge[]> = {};
  if (process.env.MONGODB_URI) {
    try {
      const { findAll } = await import("@/lib/db");
      type RawEntry = { teamSlug: string; result: "W" | "L" | "D"; opponent: string; date: string };
      const entries = await findAll<RawEntry>("team-form");
      const grouped: Record<string, RawEntry[]> = {};
      for (const e of entries) {
        if (!grouped[e.teamSlug]) grouped[e.teamSlug] = [];
        grouped[e.teamSlug].push(e);
      }
      for (const slug in grouped) {
        formByTeam[slug] = grouped[slug]
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5)
          .map((e) => ({ result: e.result, opponent: e.opponent }));
      }
    } catch {
      // DB error — fall back to static form data
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* ── Page Header ── */}
      <div className="relative pt-28 pb-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#006B3F 1px, transparent 1px), linear-gradient(90deg, #006B3F 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#006B3F] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        <div className="max-w-7xl mx-auto relative text-center">
          <div className="inline-flex items-center gap-2 bg-[#006B3F]/8 border border-[#006B3F]/20 rounded-full px-4 py-1.5 mb-5">
            <Users size={12} className="text-[#006B3F]" />
            <span className="text-[#006B3F] text-xs font-bold tracking-[0.2em] uppercase">
              Zimbabwe Rugby Union
            </span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-[#0A1628] mb-4">
            Our Teams
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From the senior Sables to the next generation — discover all four
            Zimbabwe Rugby national squads.
          </p>
        </div>
      </div>

      {/* ── Card Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* Row 1: Sables (featured, 2/3 width) + Lady Sables (1/3 width) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
          {sables && (
            <TeamCard team={sables} formData={formByTeam["mens-xv"]} className="h-72 sm:h-80 lg:col-span-2" />
          )}
          {ladySables && (
            <TeamCard team={ladySables} formData={formByTeam["womens-xv"]} className="h-72 sm:h-80 lg:col-span-1" />
          )}
        </div>

        {/* Row 2: Cheetahs + Junior Sables (equal halves) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {cheetahs && (
            <TeamCard team={cheetahs} formData={formByTeam["cheetahs"]} className="h-64 sm:h-72" />
          )}
          {juniorSables && (
            <TeamCard team={juniorSables} formData={formByTeam["junior-sables"]} className="h-64 sm:h-72" />
          )}
        </div>
      </div>
    </div>
  );
}
