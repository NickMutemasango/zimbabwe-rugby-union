"use client";
import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Shield, Globe, ChevronLeft, ChevronRight } from "lucide-react";

const ACHIEVEMENTS = [
  {
    year: "1987",
    title: "Inaugural Rugby World Cup",
    description: "Zimbabwe proudly represented Africa at the very first Rugby World Cup in New Zealand & Australia.",
    icon: Globe,
    type: "milestone",
    label: "World Cup",
  },
  {
    year: "1991",
    title: "Rugby World Cup — UK & France",
    description: "The Sables qualified for the 1991 Rugby World Cup held across the UK, Ireland & France.",
    icon: Globe,
    type: "milestone",
    label: "World Cup",
  },
  {
    year: "1995",
    title: "Rugby World Cup — South Africa",
    description: "Zimbabwe featured at a third consecutive Rugby World Cup on home soil in South Africa.",
    icon: Globe,
    type: "milestone",
    label: "World Cup",
  },
  {
    year: "2001",
    title: "Africa Cup Champions",
    description: "Zimbabwe claimed the Africa Cup title, cementing their status as one of the continent's top rugby nations.",
    icon: Trophy,
    type: "trophy",
    label: "Champions",
  },
  {
    year: "2023",
    title: "Africa Cup Division 1A",
    description: "The Sables competed at the highest tier of African rugby, showing renewed strength on the continent.",
    icon: Shield,
    type: "achievement",
    label: "Division 1A",
  },
  {
    year: "2026",
    title: "World Rugby Nations Cup",
    description: "Zimbabwe qualifies for the World Rugby Nations Cup, facing Tonga, USA, and Canada in the Americas.",
    icon: Star,
    type: "upcoming",
    label: "Upcoming",
  },
];

const TYPE_CONFIG: Record<string, {
  iconBg: string;
  iconText: string;
  badgeBg: string;
  badgeText: string;
  topBar: string;
  label: string;
}> = {
  trophy: {
    iconBg: "bg-amber-50",
    iconText: "text-amber-500",
    badgeBg: "bg-amber-50 border-amber-200",
    badgeText: "text-amber-700",
    topBar: "from-amber-400 to-amber-500",
    label: "text-amber-600",
  },
  milestone: {
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-600",
    badgeBg: "bg-emerald-50 border-emerald-200",
    badgeText: "text-emerald-700",
    topBar: "from-[#006B3F] to-emerald-500",
    label: "text-emerald-600",
  },
  achievement: {
    iconBg: "bg-blue-50",
    iconText: "text-blue-600",
    badgeBg: "bg-blue-50 border-blue-200",
    badgeText: "text-blue-700",
    topBar: "from-blue-500 to-blue-600",
    label: "text-blue-600",
  },
  upcoming: {
    iconBg: "bg-purple-50",
    iconText: "text-purple-600",
    badgeBg: "bg-purple-50 border-purple-200",
    badgeText: "text-purple-700",
    topBar: "from-purple-500 to-purple-600",
    label: "text-purple-600",
  },
};

export default function AchievementsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  function updateScrollState() {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 8);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
  }

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    return () => el.removeEventListener("scroll", updateScrollState);
  }, []);

  function scroll(dir: "left" | "right") {
    scrollRef.current?.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  }

  return (
    <section className="relative overflow-hidden bg-slate-50">
      {/* Top transition from white MatchCenter/News */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-60" />

      {/* Subtle dot texture */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "radial-gradient(circle, #0A1628 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        {/* Section header */}
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
            <h2 className="text-4xl sm:text-5xl font-black text-[#0A1628]">
              Trophy Room
            </h2>
            <p className="text-gray-500 mt-3 max-w-md text-sm leading-relaxed">
              From Rugby World Cup debuts to continental titles — a proud history spanning four decades.
            </p>
          </div>

          {/* Nav arrows */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              aria-label="Scroll left"
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                canScrollLeft
                  ? "border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628] hover:text-white"
                  : "border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              aria-label="Scroll right"
              className={`w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all ${
                canScrollRight
                  ? "border-[#0A1628] text-[#0A1628] hover:bg-[#0A1628] hover:text-white"
                  : "border-gray-200 text-gray-300 cursor-not-allowed"
              }`}
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </motion.div>

        {/* Trophy Room slider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="relative"
        >
          {/* Left fade */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-slate-50 to-transparent pointer-events-none transition-opacity duration-300 ${
              canScrollLeft ? "opacity-100" : "opacity-0"
            }`}
          />
          {/* Right fade */}
          <div
            className={`absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-slate-50 to-transparent pointer-events-none transition-opacity duration-300 ${
              canScrollRight ? "opacity-100" : "opacity-0"
            }`}
          />

          <div
            ref={scrollRef}
            className="trophy-slider flex gap-5 overflow-x-auto pb-4 scroll-smooth"
            style={{ scrollSnapType: "x mandatory", scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {ACHIEVEMENTS.map((item, i) => {
              const Icon = item.icon;
              const cfg = TYPE_CONFIG[item.type];

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="flex-shrink-0 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-gray-200/80 hover:-translate-y-1 transition-all group cursor-default"
                  style={{ width: "280px", scrollSnapAlign: "start" }}
                >
                  {/* Coloured top bar */}
                  <div className={`h-1.5 bg-gradient-to-r ${cfg.topBar}`} />

                  <div className="p-6">
                    {/* Icon + year */}
                    <div className="flex items-start justify-between mb-5">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${cfg.iconBg} group-hover:scale-105 transition-transform`}>
                        <Icon size={26} className={cfg.iconText} />
                      </div>
                      <div className="text-right">
                        <span className={`inline-block text-xs font-black px-2.5 py-1 rounded-lg border ${cfg.badgeBg} ${cfg.badgeText}`}>
                          {item.year}
                        </span>
                        <p className={`text-[10px] font-bold uppercase tracking-widest mt-1.5 ${cfg.label}`}>
                          {item.label}
                        </p>
                      </div>
                    </div>

                    {/* Text */}
                    <h3 className="text-[#0A1628] font-black text-base leading-snug mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}

            {/* "More to come" placeholder card */}
            <div
              className="flex-shrink-0 bg-white border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center gap-3 text-center p-8 hover:border-[#006B3F]/30 transition-colors"
              style={{ width: "220px", scrollSnapAlign: "start" }}
            >
              <div className="w-12 h-12 rounded-2xl bg-gray-50 border border-gray-200 flex items-center justify-center">
                <Star size={20} className="text-gray-300" />
              </div>
              <p className="text-gray-400 text-sm font-bold leading-tight">More milestones to come</p>
              <p className="text-gray-300 text-xs">The Sables story continues…</p>
            </div>
          </div>
        </motion.div>

        {/* Scroll hint (mobile) */}
        <p className="text-center text-gray-300 text-xs mt-3 uppercase tracking-widest sm:hidden">
          Swipe to explore →
        </p>
      </div>

      {/* Bottom transition */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-white" />
    </section>
  );
}
