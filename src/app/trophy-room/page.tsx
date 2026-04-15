"use client";
import { motion } from "framer-motion";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

// ─── Types ────────────────────────────────────────────────────────────────────
type Medal = "gold" | "silver";

interface Achievement {
  year: string;
  title: string;
  medal: Medal;
}

interface CategoryGroup {
  id: string;
  name: string;
  subtitle: string;
  color: string;
  achievements: Achievement[];
}

// ─── Data (Gold & Silver only, sourced from ZRU records) ─────────────────────
const TROPHY_CATEGORIES: CategoryGroup[] = [
  {
    id: "sables",
    name: "Sables",
    subtitle: "Men's XV",
    color: "#006B3F",
    achievements: [
      { year: "2024", title: "Rugby Africa Cup XVs", medal: "gold" },
      { year: "2020", title: "Rugby Africa Cup XVs", medal: "gold" },
      { year: "2020", title: "Victoria Cup XVs", medal: "gold" },
      { year: "2015", title: "Rugby Africa Cup XVs", medal: "silver" },
      { year: "2014", title: "Rugby Africa Cup XVs", medal: "silver" },
    ],
  },
  {
    id: "lady-sables",
    name: "Lady Sables",
    subtitle: "Women's 7s",
    color: "#9333EA",
    achievements: [
      { year: "2022", title: "Rugby Africa 7s Tournament", medal: "gold" },
    ],
  },
  {
    id: "junior-sables",
    name: "Junior Sables",
    subtitle: "U20 Men",
    color: "#0369A1",
    achievements: [
      { year: "2023", title: "U20 Barthes Trophy", medal: "gold" },
      { year: "2022", title: "U20 Barthes Trophy", medal: "gold" },
      { year: "2024", title: "U20 Barthes Trophy", medal: "silver" },
      { year: "2022", title: "U20 World Rugby Canada Conference", medal: "silver" },
    ],
  },
  {
    id: "cheetahs",
    name: "Cheetahs",
    subtitle: "Men's 7s",
    color: "#D97706",
    achievements: [
      { year: "2023", title: "7s Zambezi Challenge Cup", medal: "gold" },
      { year: "2018", title: "Rugby Cup Africa 7s", medal: "gold" },
      { year: "2024", title: "All Africa Games 7s", medal: "silver" },
      { year: "2022", title: "Rugby Africa Cup — World Rugby Qualifiers", medal: "silver" },
      { year: "2022", title: "7s Zambezi Challenge Cup", medal: "silver" },
    ],
  },
];

// ─── Medal badge ──────────────────────────────────────────────────────────────
function MedalBadge({ medal }: { medal: Medal }) {
  if (medal === "gold") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-black uppercase tracking-wider">
        <span className="w-2 h-2 rounded-full bg-amber-400 shadow-sm" />
        Gold
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-slate-600 text-xs font-black uppercase tracking-wider">
      <span className="w-2 h-2 rounded-full bg-slate-400" />
      Silver
    </span>
  );
}

// ─── Trophy SVG (reused from home section) ────────────────────────────────────
function TrophyIcon({ medal }: { medal: Medal }) {
  const gold = medal === "gold";
  const cup    = gold ? "#F59E0B" : "#9CA3AF";
  const base   = gold ? "#D97706" : "#6B7280";
  const shine  = gold ? "#FDE68A" : "#E5E7EB";
  const shadow = gold ? "#92400E" : "#374151";

  return (
    <svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow">
      <path d="M18 22 Q4 22 4 36 Q4 50 18 52" stroke={cup} strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M62 22 Q76 22 76 36 Q76 50 62 52" stroke={cup} strokeWidth="5" strokeLinecap="round" fill="none" />
      <path d="M16 8 H64 L58 52 Q54 62 40 64 Q26 62 22 52 Z" fill={cup} />
      <path d="M22 12 L32 12 L28 38 Q26 44 24 46 L20 52 Q18 40 18 26 Z" fill={shine} opacity="0.35" />
      <rect x="36" y="64" width="8" height="18" rx="1" fill={base} />
      <rect x="22" y="82" width="36" height="10" rx="3" fill={base} />
      <rect x="22" y="82" width="36" height="4" rx="2" fill={shine} opacity="0.4" />
      <ellipse cx="40" cy="94" rx="18" ry="2.5" fill={shadow} opacity="0.25" />
    </svg>
  );
}

// ─── Category section ─────────────────────────────────────────────────────────
function CategorySection({ group, index }: { group: CategoryGroup; index: number }) {
  const goldCount   = group.achievements.filter(a => a.medal === "gold").length;
  const silverCount = group.achievements.filter(a => a.medal === "silver").length;

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="mb-16"
    >
      {/* Category header */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-1.5 h-12 rounded-full flex-shrink-0"
          style={{ backgroundColor: group.color }}
        />
        <div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0A1628]">{group.name}</h2>
          <p className="text-gray-400 text-sm font-medium">{group.subtitle}</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          {goldCount > 0 && (
            <span className="flex items-center gap-1 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-700 text-xs font-black">
              🥇 {goldCount}
            </span>
          )}
          {silverCount > 0 && (
            <span className="flex items-center gap-1 px-3 py-1 bg-slate-50 border border-slate-200 rounded-full text-slate-600 text-xs font-black">
              🥈 {silverCount}
            </span>
          )}
        </div>
      </div>

      {/* Achievement grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {group.achievements.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            className={`relative flex items-center gap-4 p-5 rounded-2xl border-2 transition-all hover:-translate-y-0.5 hover:shadow-lg ${
              item.medal === "gold"
                ? "bg-gradient-to-br from-amber-50 to-white border-amber-100 hover:border-amber-200 hover:shadow-amber-100/60"
                : "bg-gradient-to-br from-slate-50 to-white border-slate-100 hover:border-slate-200 hover:shadow-slate-100/60"
            }`}
          >
            {/* Trophy icon */}
            <div className="w-12 h-14 flex-shrink-0">
              <TrophyIcon medal={item.medal} />
            </div>

            {/* Content */}
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2 mb-1.5">
                <span
                  className="text-xs font-black px-2 py-0.5 rounded-md"
                  style={{ backgroundColor: `${group.color}15`, color: group.color }}
                >
                  {item.year}
                </span>
                <MedalBadge medal={item.medal} />
              </div>
              <p className="text-[#0A1628] font-bold text-sm leading-snug">{item.title}</p>
              <p className="text-gray-400 text-xs mt-0.5">{group.name} · {group.subtitle}</p>
            </div>

            {/* Gold accent line */}
            {item.medal === "gold" && (
              <div className="absolute left-0 top-4 bottom-4 w-0.5 rounded-full bg-gradient-to-b from-amber-300 to-amber-500" />
            )}
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function TrophyRoomPage() {
  const totalGold   = TROPHY_CATEGORIES.flatMap(c => c.achievements).filter(a => a.medal === "gold").length;
  const totalSilver = TROPHY_CATEGORIES.flatMap(c => c.achievements).filter(a => a.medal === "silver").length;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-[#0A1628] pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/10 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ label: "Trophy Room" }]} />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-6">
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-3">A Legacy of Excellence</p>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">
              Trophy <span className="text-[#D4AF37]">Room</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mb-8">
              Gold and Silver medal achievements across all Zimbabwe Rugby Union teams — Sables, Lady Sables, Junior Sables & Cheetahs.
            </p>

            {/* Summary stats */}
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-amber-400/10 border border-amber-400/20 rounded-xl">
                <span className="text-xl">🥇</span>
                <div>
                  <p className="text-amber-300 font-black text-lg leading-none">{totalGold}</p>
                  <p className="text-amber-400/70 text-[10px] uppercase tracking-wider font-bold">Gold Medals</p>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-slate-400/10 border border-slate-400/20 rounded-xl">
                <span className="text-xl">🥈</span>
                <div>
                  <p className="text-slate-300 font-black text-lg leading-none">{totalSilver}</p>
                  <p className="text-slate-400/70 text-[10px] uppercase tracking-wider font-bold">Silver Medals</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {TROPHY_CATEGORIES.map((group, i) => (
            <CategorySection key={group.id} group={group} index={i} />
          ))}
        </div>
      </section>
    </div>
  );
}
