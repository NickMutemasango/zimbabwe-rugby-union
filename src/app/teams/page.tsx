import Link from "next/link";
import { ChevronRight, Users, Shield } from "lucide-react";
import type { Metadata } from "next";
import { TEAMS_LIST } from "@/lib/teamsData";

export const metadata: Metadata = {
  title: "Our Teams | Zimbabwe Rugby Union",
  description: "Explore Zimbabwe Rugby Union's national squads — Men's XV, Women's XV, Junior Sables, and Sevens.",
};

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ── Page Header ── */}
      <div className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-slate-50 to-white overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "linear-gradient(#006B3F 1px, transparent 1px), linear-gradient(90deg, #006B3F 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#006B3F] to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        <div className="max-w-7xl mx-auto relative text-center">
          <div className="inline-flex items-center gap-2 bg-[#006B3F]/8 border border-[#006B3F]/20 rounded-full px-4 py-1.5 mb-5">
            <Users size={12} className="text-[#006B3F]" />
            <span className="text-[#006B3F] text-xs font-bold tracking-[0.2em] uppercase">Zimbabwe Rugby Union</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-[#0A1628] mb-4">Our Teams</h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From the senior Sables to the next generation — discover all Zimbabwe Rugby national squads.
          </p>
        </div>
      </div>

      {/* ── Teams Grid ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TEAMS_LIST.map((team) => (
            <Link
              key={team.slug}
              href={`/teams/${team.slug}`}
              className="group relative bg-white border-2 border-gray-100 hover:border-gray-200 rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1"
            >
              {/* Hero gradient bar */}
              <div
                className="h-2"
                style={{ background: `linear-gradient(to right, ${team.accentColor}, ${team.heroBgColor})` }}
              />

              {/* Card Body */}
              <div className="p-7">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <span
                      className="inline-block text-[10px] font-black tracking-[0.25em] uppercase px-3 py-1 rounded-lg mb-3"
                      style={{
                        backgroundColor: `${team.accentColor}12`,
                        color: team.accentColor,
                        border: `1px solid ${team.accentColor}30`,
                      }}
                    >
                      {team.badgeText}
                    </span>
                    <h2 className="text-2xl font-black text-[#0A1628] leading-tight">{team.name}</h2>
                    <p className="font-bold text-sm mt-1" style={{ color: team.accentColor }}>
                      {team.nickname}
                    </p>
                  </div>

                  {/* Shield icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 opacity-60 group-hover:opacity-100 transition-opacity"
                    style={{ backgroundColor: `${team.accentColor}12` }}
                  >
                    <Shield size={26} style={{ color: team.accentColor }} />
                  </div>
                </div>

                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {team.description}
                </p>

                {/* Stats row */}
                <div className="flex items-center gap-5 text-xs text-gray-300 mb-5">
                  <span>Est. {team.founded}</span>
                  <span className="flex items-center gap-1">
                    <Users size={10} /> {team.playerCount}-a-side
                  </span>
                  <span>{team.achievements.length} achievements</span>
                </div>

                {/* CTA row */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  {/* Recent form dots */}
                  <div className="flex gap-1.5">
                    {team.recentForm.map((r, i) => (
                      <div
                        key={i}
                        className={`w-6 h-6 rounded-md flex items-center justify-center text-[9px] font-black ${
                          r === "W" ? "bg-emerald-500 text-white" :
                          r === "L" ? "bg-red-100 text-red-500" :
                          "bg-yellow-100 text-yellow-600"
                        }`}
                      >
                        {r}
                      </div>
                    ))}
                  </div>

                  <span
                    className="flex items-center gap-1 text-sm font-bold group-hover:gap-2 transition-all"
                    style={{ color: team.accentColor }}
                  >
                    View Squad <ChevronRight size={14} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
