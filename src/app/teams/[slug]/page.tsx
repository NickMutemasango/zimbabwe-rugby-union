import Link from "next/link";
import { ChevronLeft, Users, Shield, Trophy } from "lucide-react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

const TEAMS: Record<string, {
  name: string;
  nickname: string;
  badgeText: string;
  description: string;
  accentColor: string;
  bgGradient: string;
  coach: string;
  captain: string;
  recentForm: string[];
  keyFacts: { label: string; value: string }[];
}> = {
  "mens-xv": {
    name: "Men's XV",
    nickname: "The Sables",
    badgeText: "SENIOR MEN",
    description:
      "Zimbabwe's senior men's national rugby union team, the Sables have competed at three Rugby World Cups (1987, 1991, 1995) and are a proud fixture of African and international rugby. The team competes in the Africa Cup and other international competitions.",
    accentColor: "#006B3F",
    bgGradient: "from-[#006B3F]/20",
    coach: "TBA",
    captain: "TBA",
    recentForm: ["W", "L", "W", "W", "L"],
    keyFacts: [
      { label: "World Cup Appearances", value: "3" },
      { label: "Africa Cup Titles", value: "1" },
      { label: "World Rugby Ranking", value: "Top 50" },
      { label: "Home Ground", value: "Harare Sports Club" },
    ],
  },
  "womens-xv": {
    name: "Women's XV",
    nickname: "The Lady Sables",
    badgeText: "SENIOR WOMEN",
    description:
      "The Lady Sables represent Zimbabwe in women's international rugby. The team competes in the Africa Women's Championship and is a growing force for the women's game on the continent, inspiring a new generation of female players across Zimbabwe.",
    accentColor: "#9333ea",
    bgGradient: "from-purple-900/20",
    coach: "TBA",
    captain: "TBA",
    recentForm: ["W", "W", "L", "W", "W"],
    keyFacts: [
      { label: "Competition", value: "Africa Women's Champs" },
      { label: "Tier", value: "Senior International" },
      { label: "Governing Body", value: "ZRU / World Rugby" },
      { label: "Founded", value: "2001" },
    ],
  },
  "junior-sables": {
    name: "Junior Sables",
    nickname: "U20 Men's XV",
    badgeText: "UNDER 20",
    description:
      "The Junior Sables are the future of Zimbabwean rugby. The U20 national team competes in the World Rugby U20 Trophy and Africa Under-20 Championship, developing elite players for the senior Sables squad and international professional rugby.",
    accentColor: "#3b82f6",
    bgGradient: "from-blue-900/20",
    coach: "TBA",
    captain: "TBA",
    recentForm: ["W", "L", "W", "L", "W"],
    keyFacts: [
      { label: "Competition", value: "U20 Trophy / Africa U20" },
      { label: "Age Limit", value: "Under 20" },
      { label: "Programme", value: "High Performance" },
      { label: "Founded", value: "1995" },
    ],
  },
  "sevens": {
    name: "Sevens",
    nickname: "Zimbabwe Sevens",
    badgeText: "SEVENS",
    description:
      "Zimbabwe Sevens bring explosive pace, skill, and African flair to the seven-a-side format. The team competes in the Africa Sevens Series and international invitational tournaments, showcasing the depth of Zimbabwean rugby talent.",
    accentColor: "#D4AF37",
    bgGradient: "from-amber-900/20",
    coach: "TBA",
    captain: "TBA",
    recentForm: ["W", "W", "W", "L", "W"],
    keyFacts: [
      { label: "Format", value: "7-a-side" },
      { label: "Competition", value: "Africa Sevens Series" },
      { label: "Tournament Duration", value: "2 Days" },
      { label: "Founded", value: "1999" },
    ],
  },
};

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const team = TEAMS[slug];
  if (!team) return { title: "Team Not Found | ZRU" };
  return {
    title: `${team.name} — ${team.nickname} | Zimbabwe Rugby Union`,
    description: team.description,
  };
}

export function generateStaticParams() {
  return Object.keys(TEAMS).map((slug) => ({ slug }));
}

export default async function TeamDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const team = TEAMS[slug];
  if (!team) notFound();

  const formColors: Record<string, string> = {
    W: "bg-[#006B3F] text-white",
    L: "bg-red-500/20 text-red-400 border border-red-500/30",
    D: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  };

  return (
    <div className="min-h-screen bg-[#050D1A]">
      {/* Header */}
      <div className="relative pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div
          className={`absolute inset-0 bg-gradient-to-br ${team.bgGradient} to-transparent opacity-60`}
        />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="max-w-7xl mx-auto relative">
          <Link
            href="/teams"
            className="inline-flex items-center gap-1.5 text-white/40 hover:text-white/80 text-sm mb-8 transition-colors"
          >
            <ChevronLeft size={14} /> Back to Teams
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end gap-6">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-3xl font-black flex-shrink-0 border-2"
              style={{
                backgroundColor: `${team.accentColor}20`,
                color: team.accentColor,
                borderColor: `${team.accentColor}40`,
              }}
            >
              <Shield size={36} />
            </div>
            <div>
              <span
                className="inline-block text-[10px] font-black tracking-[0.25em] uppercase px-3 py-1 rounded-lg mb-3"
                style={{ backgroundColor: `${team.accentColor}20`, color: team.accentColor, border: `1px solid ${team.accentColor}40` }}
              >
                {team.badgeText}
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-white leading-tight">{team.name}</h1>
              <p className="font-bold text-lg mt-1" style={{ color: team.accentColor }}>{team.nickname}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main info */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div className="bg-[#0A1628] border border-white/8 rounded-2xl p-6">
              <h2 className="text-white font-black text-lg mb-4 flex items-center gap-2">
                <Users size={16} style={{ color: team.accentColor }} /> About the Squad
              </h2>
              <p className="text-white/60 leading-relaxed">{team.description}</p>
            </div>

            {/* Key Facts */}
            <div className="bg-[#0A1628] border border-white/8 rounded-2xl p-6">
              <h2 className="text-white font-black text-lg mb-4 flex items-center gap-2">
                <Trophy size={16} style={{ color: team.accentColor }} /> Key Facts
              </h2>
              <div className="grid grid-cols-2 gap-3">
                {team.keyFacts.map((fact, i) => (
                  <div key={i} className="bg-white/3 border border-white/5 rounded-xl p-4">
                    <p className="text-white/30 text-xs uppercase tracking-widest font-bold mb-1">{fact.label}</p>
                    <p className="text-white font-black text-base">{fact.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Players CTA */}
            <div
              className="rounded-2xl p-6 border"
              style={{ backgroundColor: `${team.accentColor}10`, borderColor: `${team.accentColor}30` }}
            >
              <h2 className="text-white font-black text-lg mb-2">Squad Profiles</h2>
              <p className="text-white/50 text-sm mb-4">
                View full player profiles, stats, caps, and more for the {team.nickname}.
              </p>
              <Link
                href="/players"
                className="inline-flex items-center gap-2 px-5 py-2.5 font-bold rounded-xl text-sm transition-all hover:opacity-90"
                style={{ backgroundColor: team.accentColor, color: "#fff" }}
              >
                View All Players <ChevronLeft size={14} className="rotate-180" />
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Management */}
            <div className="bg-[#0A1628] border border-white/8 rounded-2xl p-5">
              <h3 className="text-white font-black text-sm uppercase tracking-widest mb-4">Management</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-white/30 text-xs uppercase tracking-wider">Head Coach</span>
                  <span className="text-white text-sm font-bold">{team.coach}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-white/30 text-xs uppercase tracking-wider">Captain</span>
                  <span className="text-white text-sm font-bold">{team.captain}</span>
                </div>
              </div>
            </div>

            {/* Recent Form */}
            <div className="bg-[#0A1628] border border-white/8 rounded-2xl p-5">
              <h3 className="text-white font-black text-sm uppercase tracking-widest mb-4">Recent Form</h3>
              <div className="flex gap-2">
                {team.recentForm.map((result, i) => (
                  <div
                    key={i}
                    className={`w-9 h-9 rounded-lg flex items-center justify-center text-xs font-black ${formColors[result]}`}
                  >
                    {result}
                  </div>
                ))}
              </div>
              <p className="text-white/20 text-xs mt-3">Last 5 matches (most recent right)</p>
            </div>

            {/* Nations Cup notice (for mens-xv) */}
            {slug === "mens-xv" && (
              <div className="bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl p-5">
                <p className="text-[#D4AF37] text-xs font-black uppercase tracking-widest mb-2">Upcoming</p>
                <p className="text-white font-bold text-sm mb-1">World Rugby Nations Cup 2026</p>
                <p className="text-white/40 text-xs mb-3">
                  The Sables face Tonga, USA &amp; Canada across North America in July 2026.
                </p>
                <Link
                  href="/#nations-cup"
                  className="text-[#D4AF37] text-xs font-bold hover:text-[#D4AF37]/80 transition-colors"
                >
                  See Fixtures →
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
