"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Calendar, MapPin, Clock, Ticket } from "lucide-react";
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
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-50 to-white">
      {/* Top transition from dark Hero */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#006B3F] to-transparent" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "linear-gradient(#006B3F 1px, transparent 1px), linear-gradient(90deg, #006B3F 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative">
        {/* ── Info block ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          {/* Tournament badge */}
          <div className="inline-flex items-center gap-2 bg-[#006B3F]/8 border border-[#006B3F]/20 rounded-full px-5 py-2 mb-6">
            <span className="w-2 h-2 bg-[#006B3F] rounded-full animate-pulse" />
            <span className="text-[#006B3F] text-xs font-black tracking-[0.3em] uppercase">World Rugby</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-black text-[#0A1628] mb-3">
            Nations Cup{" "}
            <span className="text-[#006B3F]">2026</span>
          </h2>

          {/* Countdown pill */}
          <div className="inline-flex items-center gap-3 bg-white border border-gray-200 shadow-sm rounded-2xl px-6 py-3 mb-8">
            <span className="text-gray-500 text-sm">The Nations Cup is approaching!</span>
            {days > 0 ? (
              <span className="bg-[#006B3F] text-white text-sm font-black px-3 py-1 rounded-lg tabular-nums">
                {days} days to go
              </span>
            ) : (
              <span className="bg-emerald-500 text-white text-sm font-black px-3 py-1 rounded-lg">
                Underway!
              </span>
            )}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* PRIMARY — Buy Ticket (high-contrast amber) */}
            <Link
              href="https://go.usa.rugby/nations-cup-2026-presale"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-amber-500 hover:bg-amber-400 text-[#0A1628] font-black rounded-xl transition-all hover:shadow-xl hover:shadow-amber-500/30 hover:-translate-y-0.5 text-sm tracking-wide"
            >
              <Ticket size={16} />
              Buy Ticket
            </Link>

            {/* SECONDARY — See More Info */}
            <Link
              href="https://www.world.rugby/nations-cup/en/matches/2026"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white hover:bg-gray-50 text-[#006B3F] border-2 border-[#006B3F] font-bold rounded-xl transition-all hover:shadow-md text-sm"
            >
              See More Info <ExternalLink size={14} />
            </Link>
          </div>
        </motion.div>

        {/* ── Fixture cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FIXTURES.map((f, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-white border border-gray-200 hover:border-[#006B3F]/40 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-[#006B3F]/10 transition-all hover:-translate-y-1"
            >
              {/* Card top accent stripe */}
              <div className="h-1 bg-gradient-to-r from-[#006B3F] via-[#D4AF37] to-[#006B3F]" />

              <div className="p-5">
                {/* Badges row */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] text-[#006B3F] font-black uppercase tracking-widest bg-[#006B3F]/8 px-2 py-1 rounded-md border border-[#006B3F]/15">
                    Nations Cup
                  </span>
                  <span className="text-[10px] text-blue-600 font-bold uppercase tracking-wider bg-blue-50 px-2 py-1 rounded-md border border-blue-100">
                    Upcoming
                  </span>
                </div>

                {/* Teams row */}
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="flex flex-col items-center gap-1.5 flex-1">
                    <span className="text-4xl leading-none">{f.homeFlag}</span>
                    <span className="text-[#0A1628] font-black text-sm text-center leading-tight">{f.home}</span>
                    <span className="text-gray-400 text-[10px] font-bold tracking-wider">{f.homeCode}</span>
                  </div>

                  <div className="flex flex-col items-center gap-1 flex-shrink-0">
                    <div className="text-xl font-black text-gray-300">VS</div>
                    <div className="flex items-center gap-1 text-gray-400 text-[10px]">
                      <Clock size={9} />
                      <span className="font-semibold">{f.kickoff}</span>
                    </div>
                    <span className="text-[9px] text-gray-300 uppercase tracking-wider">Local</span>
                  </div>

                  <div className="flex flex-col items-center gap-1.5 flex-1">
                    <span className="text-4xl leading-none">{f.awayFlag}</span>
                    <span className="text-[#006B3F] font-black text-sm text-center leading-tight">{f.away}</span>
                    <span className="text-[#006B3F]/50 text-[10px] font-bold tracking-wider">{f.awayCode}</span>
                  </div>
                </div>

                {/* Date & Venue */}
                <div className="border-t border-gray-100 pt-3 space-y-1.5">
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                    <Calendar size={11} className="text-[#006B3F] flex-shrink-0" />
                    <span className="font-semibold text-gray-700">{f.date}</span>
                  </div>
                  <div className="flex items-start gap-1.5 text-gray-400 text-xs">
                    <MapPin size={11} className="text-[#006B3F] flex-shrink-0 mt-0.5" />
                    <span>
                      {f.venue},{" "}
                      <span className="text-gray-400">{f.city}</span>
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-gray-400 text-xs mt-6 uppercase tracking-widest">
          All kick-off times are local
        </p>
      </div>

      {/* Bottom transition to white MatchCenter */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-b from-transparent to-white" />
    </section>
  );
}
