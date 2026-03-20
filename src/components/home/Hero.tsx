"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Play, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

const SLIDES = [
  {
    id: 0,
    bg: "/Backgrounds/Background1.jpg",
    title: "HOME OF",
    accent: "THE SABLES",
    tagline: "Follow Zimbabwe's national rugby team as they battle for glory on the continental and world stage.",
  },
  {
    id: 1,
    bg: "/Backgrounds/Background2.jpg",
    title: "ONE NATION",
    accent: "ONE TEAM",
    tagline: "Representing Zimbabwe with pride, passion and purpose. The Sables never back down.",
  },
  {
    id: 2,
    bg: "/Backgrounds/Background3.jpg",
    title: "BOUND FOR",
    accent: "GLORY",
    tagline: "Zimbabwe Rugby — chasing the World Cup dream and developing champions from grassroots up.",
  },
];

const INTERVAL_MS = 5000;

export default function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % SLIDES.length);
    }, INTERVAL_MS);
    return () => clearInterval(timer);
  }, []);

  const slide = SLIDES[current];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* ── Desktop/Tablet: cycling background images ── */}
      <div className="absolute inset-0 hidden sm:block">
        <AnimatePresence mode="sync">
          <motion.div
            key={current}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="absolute inset-0"
          >
            <Image
              src={slide.bg}
              alt="Hero background"
              fill
              priority
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-[#0A1628]/60" />
        <div className="absolute inset-0 bg-gradient-to-br from-[#006B3F]/20 via-transparent to-[#0A1628]/40" />
      </div>

      {/* ── Mobile: fixed background image ── */}
      <div className="absolute inset-0 block sm:hidden">
        <Image
          src="/Backgrounds/BackgroundSmall1.jpg"
          alt="Hero background"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[#0A1628]/65" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#006B3F]/15 to-[#0A1628]/50" />
      </div>

      {/* Decorative right-side shapes */}
      <div className="absolute right-8 top-1/4 w-72 h-72 border-2 border-white/10 rounded-[50%] rotate-45 hidden lg:block pointer-events-none" />
      <div className="absolute right-24 top-1/3 w-44 h-44 border border-white/8 rounded-[50%] rotate-45 hidden lg:block pointer-events-none" />

      {/* Bottom fade to white */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent" />

      {/* ── Content — left-aligned, matching navbar logo padding ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24">
        <div className="max-w-2xl">

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
                {slide.title}
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#006B3F] to-[#D4AF37]">
                  {slide.accent}
                </span>
              </h1>
              <p className="text-white/80 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
                {slide.tagline}
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

          {/* Stats row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-16 flex flex-wrap gap-8"
          >
            {[
              { value: "1895",      label: "Founded" },
              { value: "120+",      label: "Years of Rugby" },
              { value: "34",        label: "Capped Players" },
              { value: "World Cup", label: "Qualified 4 Times" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <span className="text-2xl font-black text-white">{stat.value}</span>
                <span className="text-xs text-white/40 uppercase tracking-widest font-medium">{stat.label}</span>
              </div>
            ))}
          </motion.div>

          {/* Slide dots */}
          <div className="flex gap-2 mt-10">
            {SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === current ? "w-8 bg-[#D4AF37]" : "w-2 bg-white/30 hover:bg-white/50"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator — left-aligned with content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 left-4 sm:left-6 lg:left-8 flex flex-col items-start gap-2"
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
