"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

// ─── Data — 4 Gold Medal highlights (full list at /trophy-room) ───────────────
const ACHIEVEMENTS = [
  {
    year: "2024",
    title: "Rugby Africa Cup XVs — Sables",
    description: "Zimbabwe's Sables claimed Gold at the Rugby Africa Cup, cementing their place among Africa's elite XV-a-side nations.",
    medal: "gold" as const,
    label: "Gold",
  },
  {
    year: "2023",
    title: "U20 Barthes Trophy — Junior Sables",
    description: "The Junior Sables triumphed at the U20 Barthes Trophy, showcasing the depth and quality in Zimbabwe's development pipeline.",
    medal: "gold" as const,
    label: "Gold",
  },
  {
    year: "2023",
    title: "7s Zambezi Challenge Cup — Cheetahs",
    description: "The Cheetahs 7s men dominated the Zambezi Challenge Cup, taking Gold and asserting regional supremacy.",
    medal: "gold" as const,
    label: "Gold",
  },
  {
    year: "2022",
    title: "Rugby Africa 7s Tournament — Lady Sables",
    description: "The Lady Sables made history, winning Gold at the Rugby Africa 7s Tournament — a landmark moment for women's rugby in Zimbabwe.",
    medal: "gold" as const,
    label: "Gold",
  },
];

type Medal = "gold" | "silver" | "bronze" | "milestone" | "upcoming";

// ─── Trophy SVG component ────────────────────────────────────────────────────
function TrophySVG({ medal }: { medal: Medal }) {
  const colors: Record<Medal, { cup: string; base: string; shine: string; shadow: string }> = {
    gold: {
      cup:    "#F59E0B",
      base:   "#D97706",
      shine:  "#FDE68A",
      shadow: "#92400E",
    },
    silver: {
      cup:    "#9CA3AF",
      base:   "#6B7280",
      shine:  "#E5E7EB",
      shadow: "#374151",
    },
    bronze: {
      cup:    "#CD7F32",
      base:   "#A0522D",
      shine:  "#F5DEB3",
      shadow: "#6B3A2A",
    },
    milestone: {
      cup:    "#10B981",
      base:   "#059669",
      shine:  "#A7F3D0",
      shadow: "#064E3B",
    },
    upcoming: {
      cup:    "#8B5CF6",
      base:   "#7C3AED",
      shine:  "#DDD6FE",
      shadow: "#4C1D95",
    },
  };

  const c = colors[medal] ?? colors.milestone;

  return (
    <svg viewBox="0 0 80 96" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-lg">
      {/* Left handle */}
      <path
        d="M18 22 Q4 22 4 36 Q4 50 18 52"
        stroke={c.cup} strokeWidth="5" strokeLinecap="round" fill="none"
      />
      {/* Right handle */}
      <path
        d="M62 22 Q76 22 76 36 Q76 50 62 52"
        stroke={c.cup} strokeWidth="5" strokeLinecap="round" fill="none"
      />
      {/* Cup body */}
      <path
        d="M16 8 H64 L58 52 Q54 62 40 64 Q26 62 22 52 Z"
        fill={c.cup}
      />
      {/* Shine highlight */}
      <path
        d="M22 12 L32 12 L28 38 Q26 44 24 46 L20 52 Q18 40 18 26 Z"
        fill={c.shine} opacity="0.35"
      />
      {/* Stem */}
      <rect x="36" y="64" width="8" height="18" rx="1" fill={c.base} />
      {/* Base plate */}
      <rect x="22" y="82" width="36" height="10" rx="3" fill={c.base} />
      {/* Base shine strip */}
      <rect x="22" y="82" width="36" height="4" rx="2" fill={c.shine} opacity="0.4" />
      {/* Shadow under base */}
      <ellipse cx="40" cy="94" rx="18" ry="2.5" fill={c.shadow} opacity="0.25" />
    </svg>
  );
}

// ─── Config per medal type ────────────────────────────────────────────────────
const MEDAL_STYLE: Record<Medal, {
  topBar: string; cardBg: string; yearBadge: string; yearText: string; label: string;
}> = {
  gold: {
    topBar:    "from-yellow-400 via-amber-400 to-yellow-500",
    cardBg:    "bg-gradient-to-b from-amber-50/60 to-white",
    yearBadge: "bg-amber-50 border-amber-200",
    yearText:  "text-amber-700",
    label:     "text-amber-500",
  },
  silver: {
    topBar:    "from-slate-300 via-gray-300 to-slate-400",
    cardBg:    "bg-gradient-to-b from-slate-50/60 to-white",
    yearBadge: "bg-slate-50 border-slate-200",
    yearText:  "text-slate-600",
    label:     "text-slate-400",
  },
  bronze: {
    topBar:    "from-orange-400 via-amber-500 to-orange-500",
    cardBg:    "bg-gradient-to-b from-orange-50/60 to-white",
    yearBadge: "bg-orange-50 border-orange-200",
    yearText:  "text-orange-700",
    label:     "text-orange-500",
  },
  milestone: {
    topBar:    "from-emerald-400 via-teal-400 to-emerald-500",
    cardBg:    "bg-gradient-to-b from-emerald-50/60 to-white",
    yearBadge: "bg-emerald-50 border-emerald-200",
    yearText:  "text-emerald-700",
    label:     "text-emerald-500",
  },
  upcoming: {
    topBar:    "from-purple-400 via-violet-400 to-purple-500",
    cardBg:    "bg-gradient-to-b from-purple-50/60 to-white",
    yearBadge: "bg-purple-50 border-purple-200",
    yearText:  "text-purple-700",
    label:     "text-purple-500",
  },
};

// ─── Section component ────────────────────────────────────────────────────────
export default function AchievementsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft,  setCanLeft]  = useState(false);
  const [canRight, setCanRight] = useState(true);

  function sync() {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 8);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    sync();
    el.addEventListener("scroll", sync, { passive: true });
    return () => el.removeEventListener("scroll", sync);
  }, []);

  function scroll(dir: "left" | "right") {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  }

  return (
    <section className="relative overflow-hidden bg-slate-50">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-50" />
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: "radial-gradient(circle, #0A1628 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        {/* Header row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-10"
        >
          <div>
            <p className="text-[#006B3F] text-xs font-black tracking-[0.3em] uppercase mb-3">
              A Legacy of Excellence
            </p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0A1628]">Trophy Room</h2>
            <p className="text-gray-500 mt-3 max-w-md text-sm leading-relaxed">
              Highlighting our Gold Medal achievements — a proud history of continental glory.
            </p>
            <Link
              href="/trophy-room"
              className="inline-flex items-center gap-1.5 mt-4 text-sm font-bold text-[#006B3F] hover:text-[#004D2C] transition-colors group"
            >
              View all achievements
              <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {/* Nav arrows */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => scroll("left")}
              disabled={!canLeft}
              aria-label="Scroll left"
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                canLeft
                  ? "border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628] hover:text-white"
                  : "border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canRight}
              aria-label="Scroll right"
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                canRight
                  ? "border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628] hover:text-white"
                  : "border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="relative"
        >
          {/* Edge fades */}
          <div className={`pointer-events-none absolute left-0 top-0 bottom-0 w-14 z-10 bg-gradient-to-r from-slate-50 to-transparent transition-opacity duration-300 ${canLeft ? "opacity-100" : "opacity-0"}`} />
          <div className={`pointer-events-none absolute right-0 top-0 bottom-0 w-14 z-10 bg-gradient-to-l from-slate-50 to-transparent transition-opacity duration-300 ${canRight ? "opacity-100" : "opacity-0"}`} />

          <div
            ref={scrollRef}
            className="trophy-slider flex gap-5 overflow-x-auto pb-4"
            style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {ACHIEVEMENTS.map((item, i) => {
              const sty = MEDAL_STYLE[item.medal];
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className={`flex-shrink-0 border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all group ${sty.cardBg}`}
                  style={{ width: "270px", scrollSnapAlign: "start" }}
                >
                  {/* Gradient top stripe */}
                  <div className={`h-1.5 bg-gradient-to-r ${sty.topBar}`} />

                  <div className="p-5">
                    {/* Trophy + year row */}
                    <div className="flex items-start justify-between mb-3">
                      {/* Trophy illustration */}
                      <div className="w-16 h-20 flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <TrophySVG medal={item.medal} />
                      </div>

                      <div className="text-right ml-2">
                        <span className={`inline-block text-xs font-black px-2.5 py-1 rounded-lg border ${sty.yearBadge} ${sty.yearText}`}>
                          {item.year}
                        </span>
                        <p className={`text-[10px] font-bold uppercase tracking-widest mt-1.5 ${sty.label}`}>
                          {item.label}
                        </p>
                      </div>
                    </div>

                    {/* Text */}
                    <h3 className="text-[#0A1628] font-black text-sm leading-snug mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}

            {/* "View Trophy Room" end card */}
            <Link
              href="/trophy-room"
              className="flex-shrink-0 bg-[#0A1628] rounded-2xl flex flex-col items-center justify-center gap-3 text-center p-8 hover:bg-[#006B3F] transition-colors duration-300 group"
              style={{ width: "200px", scrollSnapAlign: "start" }}
            >
              <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                <ChevronRight size={24} className="text-white group-hover:translate-x-1 transition-transform" />
              </div>
              <p className="text-white text-sm font-bold leading-tight">View Trophy Room</p>
              <p className="text-white/50 text-xs">All achievements →</p>
            </Link>
          </div>
        </motion.div>

        <p className="text-center text-gray-300 text-xs mt-3 uppercase tracking-widest sm:hidden">
          Swipe to explore →
        </p>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-white" />
    </section>
  );
}
