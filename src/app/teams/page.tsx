import Link from "next/link";
import { ChevronRight, Users } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Teams | Zimbabwe Rugby Union",
  description: "Explore Zimbabwe Rugby Union's national squads — Men's XV, Women's XV, Junior Sables, and Sevens.",
};

const TEAMS = [
  {
    slug: "mens-xv",
    name: "Men's XV",
    nickname: "The Sables",
    description:
      "Zimbabwe's senior men's national rugby union team. Competing internationally since 1987, the Sables represent the pinnacle of the game in Zimbabwe.",
    badgeText: "SENIOR MEN",
    accentColor: "#006B3F",
    bgGradient: "from-[#006B3F]/30 to-[#0A1628]",
    borderColor: "border-[#006B3F]/50",
    hoverShadow: "hover:shadow-[#006B3F]/20",
    playerCount: "15",
    founded: "1980",
  },
  {
    slug: "womens-xv",
    name: "Women's XV",
    nickname: "The Lady Sables",
    description:
      "Representing Zimbabwe's women at the highest level of international rugby. The Lady Sables are trailblazers for the women's game across Africa.",
    badgeText: "SENIOR WOMEN",
    accentColor: "#9333ea",
    bgGradient: "from-purple-900/30 to-[#0A1628]",
    borderColor: "border-purple-500/50",
    hoverShadow: "hover:shadow-purple-500/20",
    playerCount: "15",
    founded: "2001",
  },
  {
    slug: "junior-sables",
    name: "Junior Sables",
    nickname: "U20 Men's XV",
    description:
      "The future of Zimbabwean rugby. The Junior Sables develop the next generation of international stars through competitive Under-20 programmes.",
    badgeText: "UNDER 20",
    accentColor: "#3b82f6",
    bgGradient: "from-blue-900/30 to-[#0A1628]",
    borderColor: "border-blue-500/50",
    hoverShadow: "hover:shadow-blue-500/20",
    playerCount: "20",
    founded: "1995",
  },
  {
    slug: "sevens",
    name: "Sevens",
    nickname: "Zimbabwe Sevens",
    description:
      "Fast, explosive, and electrifying. Zimbabwe Sevens compete in continental and international sevens tournaments, showcasing the best of Zimbabwean flair.",
    badgeText: "SEVENS",
    accentColor: "#D4AF37",
    bgGradient: "from-amber-900/30 to-[#0A1628]",
    borderColor: "border-[#D4AF37]/50",
    hoverShadow: "hover:shadow-[#D4AF37]/20",
    playerCount: "7",
    founded: "1999",
  },
];

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-[#050D1A]">
      {/* Page Header */}
      <div className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, #006B3F 0, #006B3F 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#006B3F]/40 to-transparent" />
        <div className="max-w-7xl mx-auto relative text-center">
          <div className="inline-flex items-center gap-2 bg-[#006B3F]/15 border border-[#006B3F]/30 rounded-full px-4 py-1.5 mb-5">
            <Users size={12} className="text-[#006B3F]" />
            <span className="text-[#006B3F] text-xs font-bold tracking-[0.2em] uppercase">Zimbabwe Rugby Union</span>
          </div>
          <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Our Teams</h1>
          <p className="text-white/40 text-lg max-w-2xl mx-auto">
            From the senior Sables to the next generation — discover all Zimbabwe Rugby national squads.
          </p>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
          {TEAMS.map((team) => (
            <Link
              key={team.slug}
              href={`/teams/${team.slug}`}
              className={`group relative bg-[#0A1628] border border-white/8 hover:${team.borderColor} rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl ${team.hoverShadow} hover:-translate-y-1`}
            >
              {/* Card gradient background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${team.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative p-7">
                <div className="flex items-start justify-between mb-5">
                  <div>
                    <span
                      className="inline-block text-[10px] font-black tracking-[0.25em] uppercase px-3 py-1 rounded-lg mb-3"
                      style={{ backgroundColor: `${team.accentColor}20`, color: team.accentColor, border: `1px solid ${team.accentColor}40` }}
                    >
                      {team.badgeText}
                    </span>
                    <h2 className="text-2xl font-black text-white leading-tight">{team.name}</h2>
                    <p className="font-bold text-sm mt-1" style={{ color: team.accentColor }}>{team.nickname}</p>
                  </div>
                  <div
                    className="w-14 h-14 rounded-xl flex items-center justify-center font-black text-lg flex-shrink-0 opacity-40 group-hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: `${team.accentColor}20`, color: team.accentColor }}
                  >
                    {team.playerCount}
                  </div>
                </div>

                <p className="text-white/50 text-sm leading-relaxed mb-6 group-hover:text-white/70 transition-colors">
                  {team.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-5 text-xs text-white/30">
                    <span>Est. {team.founded}</span>
                    <span className="flex items-center gap-1">
                      <Users size={10} />
                      {team.playerCount}-a-side
                    </span>
                  </div>
                  <span
                    className="flex items-center gap-1 text-sm font-bold transition-all group-hover:gap-2"
                    style={{ color: team.accentColor }}
                  >
                    View Squad <ChevronRight size={14} />
                  </span>
                </div>
              </div>

              {/* Bottom accent line */}
              <div
                className="absolute bottom-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ backgroundColor: team.accentColor }}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
