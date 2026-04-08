"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, MapPin, Clock } from "lucide-react";
import Link from "next/link";

const FIRST_MATCH = new Date("2026-07-04T00:00:00");

const FIXTURES = [
  {
    date: "SAT 04 JULY 2026",
    kickoff: "16:15",
    home: "Tonga",
    homeCode: "TGA",
    away: "Zimbabwe",
    awayCode: "ZIM",
    venue: "Dick's Sporting Goods Park",
    city: "Denver, CO, USA",
    homeFlag: "🇹🇴",
    awayFlag: "🇿🇼",
  },
  {
    date: "SAT 11 JULY 2026",
    kickoff: "19:30",
    home: "USA",
    homeCode: "USA",
    away: "Zimbabwe",
    awayCode: "ZIM",
    venue: "American Legion Memorial Stadium",
    city: "Charlotte, NC, USA",
    homeFlag: "🇺🇸",
    awayFlag: "🇿🇼",
  },
  {
    date: "SAT 18 JULY 2026",
    kickoff: "19:00",
    home: "Canada",
    homeCode: "CAN",
    away: "Zimbabwe",
    awayCode: "ZIM",
    venue: "Princess Auto Stadium",
    city: "Winnipeg, Canada",
    homeFlag: "🇨🇦",
    awayFlag: "🇿🇼",
  },
];

function getDaysUntil(target: Date) {
  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const diff = target.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24)));
}

export default function NationsCupBanner() {
  const [days, setDays] = useState(getDaysUntil(FIRST_MATCH));

  useEffect(() => {
    const id = setInterval(() => setDays(getDaysUntil(FIRST_MATCH)), 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="py-20 bg-[#050D1A] relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0"
          style={{ backgroundImage: "repeating-linear-gradient(45deg, #006B3F 0, #006B3F 1px, transparent 0, transparent 50%)", backgroundSize: "20px 20px" }}
        />
      </div>
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* World Rugby Nations Cup wordmark */}
          <div className="inline-flex items-center gap-3 bg-[#006B3F]/20 border border-[#006B3F]/40 rounded-full px-5 py-2 mb-6">
            <span className="w-2 h-2 bg-[#D4AF37] rounded-full animate-pulse" />
            <span className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase">World Rugby</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-3">
            Nations Cup <span className="text-[#D4AF37]">2026</span>
          </h2>
          <p className="text-white/50 text-base mb-6">
            The Nations Cup is approaching!
            {days > 0 ? (
              <> <span className="text-[#D4AF37] font-bold">{days} days to go.</span></>
            ) : (
              <> The tournament is <span className="text-[#4ade80] font-bold">underway!</span></>
            )}
          </p>
          <Link
            href="https://www.world.rugby/nations-cup/en/matches/2026"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#006B3F] hover:bg-[#004D2C] text-white font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-[#006B3F]/40 hover:-translate-y-0.5 text-sm"
          >
            See More Info <ExternalLink size={14} />
          </Link>
        </motion.div>

        {/* Fixtures grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FIXTURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#0A1628] border border-white/8 hover:border-[#006B3F]/50 rounded-2xl p-5 transition-all hover:shadow-2xl hover:shadow-[#006B3F]/15 hover:-translate-y-1 group"
            >
              {/* Competition badge */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-[10px] text-[#D4AF37] font-bold uppercase tracking-widest bg-[#D4AF37]/10 px-2 py-1 rounded-md">
                  World Rugby Nations Cup
                </span>
                <span className="text-[10px] text-blue-400 font-bold uppercase tracking-wider bg-blue-500/20 px-2 py-1 rounded-md">
                  Upcoming
                </span>
              </div>

              {/* Teams */}
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <span className="text-4xl leading-none">{f.homeFlag}</span>
                  <span className="text-white font-black text-sm text-center leading-tight">{f.home}</span>
                  <span className="text-white/30 text-[10px] font-bold tracking-wider">{f.homeCode}</span>
                </div>

                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <div className="text-xl font-black text-white/30">VS</div>
                  <div className="flex items-center gap-1 text-white/40 text-[10px]">
                    <Clock size={9} />
                    <span className="font-medium">{f.kickoff}</span>
                  </div>
                  <span className="text-[9px] text-white/20 uppercase tracking-wider">Local</span>
                </div>

                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <span className="text-4xl leading-none">{f.awayFlag}</span>
                  <span className="text-[#D4AF37] font-black text-sm text-center leading-tight">{f.away}</span>
                  <span className="text-[#D4AF37]/50 text-[10px] font-bold tracking-wider">{f.awayCode}</span>
                </div>
              </div>

              {/* Date & Venue */}
              <div className="border-t border-white/5 pt-3 space-y-1.5">
                <div className="flex items-center gap-1.5 text-white/40 text-xs">
                  <Calendar size={11} className="text-[#006B3F] flex-shrink-0" />
                  <span className="font-medium">{f.date}</span>
                </div>
                <div className="flex items-start gap-1.5 text-white/40 text-xs">
                  <MapPin size={11} className="text-[#006B3F] flex-shrink-0 mt-0.5" />
                  <span>{f.venue}, <span className="text-white/25">{f.city}</span></span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* All times local note */}
        <p className="text-center text-white/20 text-xs mt-6 uppercase tracking-widest">All kick-off times are local</p>
      </div>
    </section>
  );
}
