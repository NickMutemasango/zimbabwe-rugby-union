"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Play, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

// 3 hero backgrounds — each is a gradient + SVG pattern overlay
const HERO_BACKGROUNDS = [
  {
    id: 0,
    // Deep green: game-day pitch feel
    gradient: "linear-gradient(135deg, #003822 0%, #006B3F 45%, #0A2818 100%)",
    pattern: `radial-gradient(circle at 20% 50%, rgba(212,175,55,0.08) 0%, transparent 50%),
               radial-gradient(circle at 80% 20%, rgba(0,107,63,0.3) 0%, transparent 40%)`,
    title: "HOME OF",
    accent: "THE SABLES",
    tagline: "Follow Zimbabwe's national rugby team as they battle for glory on the continental and world stage.",
  },
  {
    id: 1,
    // Night stadium: deep navy-blue with gold glow
    gradient: "linear-gradient(135deg, #050D1A 0%, #0A1F3D 50%, #0D2B1A 100%)",
    pattern: `radial-gradient(ellipse at 70% 30%, rgba(212,175,55,0.15) 0%, transparent 55%),
               radial-gradient(ellipse at 20% 70%, rgba(0,107,63,0.2) 0%, transparent 45%)`,
    title: "ONE NATION",
    accent: "ONE TEAM",
    tagline: "Representing Zimbabwe with pride, passion and purpose. The Sables never back down.",
  },
  {
    id: 2,
    // Championship gold dusk: dark maroon fading to gold
    gradient: "linear-gradient(135deg, #1A0A05 0%, #2D1200 40%, #0A1628 100%)",
    pattern: `radial-gradient(ellipse at 60% 40%, rgba(212,175,55,0.2) 0%, transparent 50%),
               radial-gradient(ellipse at 10% 60%, rgba(180,100,0,0.15) 0%, transparent 45%)`,
    title: "BOUND FOR",
    accent: "GLORY",
    tagline: "Zimbabwe Rugby — chasing the World Cup dream and developing champions from grassroots up.",
  },
];

const MAX_CYCLES = 3; // Change images 3 times then stop
const INTERVAL_MS = 5000;

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [stopped, setStopped] = useState(false);

  useEffect(() => {
    if (stopped) return;
    const timer = setInterval(() => {
      setCurrent((prev) => {
        const next = (prev + 1) % HERO_BACKGROUNDS.length;
        // Each time we wrap back to 0, it's one full cycle
        if (next === 0) {
          setCycleCount((c) => {
            const newCount = c + 1;
            if (newCount >= MAX_CYCLES) {
              setStopped(true);
            }
            return newCount;
          });
        }
        return next;
      });
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, [stopped]);

  const bg = HERO_BACKGROUNDS[current];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cycling background layers */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          className="absolute inset-0"
          style={{ background: bg.gradient }}
        >
          {/* Pattern overlay */}
          <div className="absolute inset-0" style={{ background: bg.pattern }} />
          {/* Noise texture */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
              backgroundSize: "200px 200px",
            }}
          />
          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </motion.div>
      </AnimatePresence>

      {/* Decorative rugby ball shapes */}
      <div className="absolute right-8 top-1/4 w-72 h-72 border-2 border-white/10 rounded-[50%] rotate-45 hidden lg:block pointer-events-none" />
      <div className="absolute right-24 top-1/3 w-44 h-44 border border-white/8 rounded-[50%] rotate-45 hidden lg:block pointer-events-none" />

      {/* Bottom gradient into white */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full mb-6"
          >
            <span className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full animate-pulse" />
            <span className="text-white text-xs font-bold tracking-widest uppercase">Official Zimbabwe Rugby Union</span>
          </motion.div>

          {/* Headline */}
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black text-white leading-none tracking-tight mb-4">
                {bg.title}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#006B3F] to-[#D4AF37]">
                  {bg.accent}
                </span>
              </h1>
              <p className="text-white/70 text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl">
                {bg.tagline}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <Link
              href="/matches"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-[#006B3F] hover:bg-[#004D2C] text-white font-bold rounded-xl transition-all hover:-translate-y-1 hover:shadow-2xl hover:shadow-[#006B3F]/40 text-sm uppercase tracking-wide"
            >
              View Fixtures
              <ChevronDown size={16} className="rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/players"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/30 hover:border-white/50 text-white font-bold rounded-xl transition-all hover:-translate-y-1 text-sm uppercase tracking-wide"
            >
              <Play size={16} className="text-[#D4AF37]" />
              Meet the Squad
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 flex flex-wrap gap-8"
          >
            {[
              { value: "1895", label: "Founded" },
              { value: "120+", label: "Years of Rugby" },
              { value: "34", label: "Capped Players" },
              { value: "World Cup", label: "Qualified 4 Times" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl font-black text-white">{stat.value}</span>
                <span className="text-xs text-white/40 uppercase tracking-widest font-medium">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Image indicator dots */}
          <div className="flex gap-2 mt-10">
            {HERO_BACKGROUNDS.map((_, i) => (
              <button
                key={i}
                onClick={() => { setCurrent(i); }}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-[#D4AF37]" : "w-2 bg-white/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-0.5 h-8 bg-gradient-to-b from-white/40 to-transparent rounded-full"
        />
      </motion.div>
    </section>
  );
}
