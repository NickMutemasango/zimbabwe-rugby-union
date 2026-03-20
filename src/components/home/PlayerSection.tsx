"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Shield, ChevronRight, User } from "lucide-react";
import type { Player } from "@/lib/db";

// Position-based gradient — identical to PlayerGrid.tsx
const POSITION_COLORS: Record<string, string> = {
  "Prop":      "from-orange-900/40 to-[#0A1628]",
  "Hooker":    "from-orange-900/40 to-[#0A1628]",
  "Lock":      "from-blue-900/40 to-[#0A1628]",
  "Flanker":   "from-purple-900/40 to-[#0A1628]",
  "Number 8":  "from-purple-900/40 to-[#0A1628]",
  "Scrum-half":"from-[#006B3F]/40 to-[#0A1628]",
  "Fly-half":  "from-[#006B3F]/40 to-[#0A1628]",
  "Centre":    "from-teal-900/40 to-[#0A1628]",
  "Wing":      "from-yellow-900/40 to-[#0A1628]",
  "Fullback":  "from-red-900/40 to-[#0A1628]",
};

// ── Shared PlayerCard — identical styling to PlayerGrid.tsx ───────────────────
function PlayerCard({ player, index }: { player: Player; index: number }) {
  const gradientClass = POSITION_COLORS[player.position] ?? "from-[#006B3F]/30 to-[#0A1628]";

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
      className="group relative bg-[#0A1628] border border-white/8 hover:border-[#006B3F]/60 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#006B3F]/20 hover:-translate-y-1"
    >
      {/* ── Photo area ── */}
      <div className={`relative h-64 bg-gradient-to-b ${gradientClass} overflow-hidden`}>
        {/* Jersey number watermark */}
        <span className="absolute inset-0 flex items-center justify-center text-[9rem] font-black text-white/[0.04] select-none leading-none">
          {player.jerseyNumber}
        </span>

        {/* Player photo — large portrait */}
        <div className="absolute inset-0 flex items-end justify-center pb-4">
          {player.profilePicture ? (
            <div className="relative w-36 h-48 overflow-hidden rounded-xl border-2 border-white/20 shadow-2xl shadow-black/50">
              <Image
                src={player.profilePicture}
                alt={player.name}
                fill
                className="object-cover object-top brightness-110 contrast-105"
                unoptimized={player.profilePicture.startsWith("/uploads")}
                sizes="144px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A1628]/60 via-transparent to-transparent" />
            </div>
          ) : (
            <div className="w-36 h-48 bg-[#006B3F]/15 rounded-xl border-2 border-[#006B3F]/30 flex flex-col items-center justify-center gap-3">
              <User size={44} className="text-[#006B3F]/60" />
              <span className="text-white/20 text-xs font-medium">No photo</span>
            </div>
          )}
        </div>

        {/* Jersey number badge */}
        <div className="absolute top-4 right-4 w-11 h-11 bg-[#D4AF37] rounded-xl flex items-center justify-center shadow-lg shadow-black/30">
          <span className="text-[#050D1A] font-black text-sm leading-none">#{player.jerseyNumber}</span>
        </div>

        {/* Position badge */}
        <div className="absolute top-4 left-4">
          <span className="inline-block px-2.5 py-1 bg-black/40 backdrop-blur-sm border border-white/10 text-white/70 text-[10px] font-bold uppercase tracking-wider rounded-lg">
            {player.position}
          </span>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-[#0A1628] to-transparent" />
      </div>

      {/* ── Card body ── */}
      <div className="p-5 pt-4">
        <div className="mb-4">
          <h3 className="text-white font-black text-lg leading-tight">{player.name}</h3>
          <div className="flex items-center gap-1.5 mt-1">
            <Shield size={10} className="text-[#006B3F]" />
            <span className="text-white/40 text-xs">{player.club || "—"}</span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Caps",   value: player.caps   },
            { label: "Points", value: player.points },
            { label: "Age",    value: player.age    },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white/5 border border-white/8 rounded-xl p-2.5 text-center hover:bg-[#006B3F]/15 hover:border-[#006B3F]/30 transition-colors">
              <div className="text-white font-black text-xl leading-none mb-1">{value ?? "—"}</div>
              <div className="text-white/30 text-[9px] uppercase tracking-widest font-bold">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-[#0A1628] border border-white/5 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-64 bg-white/5" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/10 rounded w-1/2" />
        <div className="grid grid-cols-3 gap-2 mt-3">
          {[0,1,2].map(i => <div key={i} className="h-12 bg-white/5 rounded-xl" />)}
        </div>
      </div>
    </div>
  );
}

export default function PlayerSection() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/players")
      .then((r) => r.json())
      .then((data: unknown) => {
        setPlayers(Array.isArray(data) ? (data as Player[]) : []);
      })
      .catch(() => setPlayers([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-[#006B3F] text-xs font-bold tracking-[0.3em] uppercase mb-3">The Team</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0A1628]">Meet the Sables</h2>
          </div>
          <Link href="/players" className="hidden sm:flex items-center gap-2 text-[#006B3F] font-bold hover:gap-3 transition-all text-sm">
            Full Squad <ChevronRight size={16} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, i) => <SkeletonCard key={i} />)
          ) : players.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <p className="text-gray-400">No players in the squad yet.</p>
              <Link href="/admin/update" className="text-[#006B3F] text-sm underline underline-offset-2 mt-1 inline-block">
                Add via Admin Portal
              </Link>
            </div>
          ) : (
            players.slice(0, 3).map((player, i) => (
              <PlayerCard key={player.id} player={player} index={i} />
            ))
          )}
        </div>

        <div className="mt-10 text-center sm:hidden">
          <Link href="/players" className="inline-flex items-center gap-2 text-[#006B3F] font-bold text-sm">
            Full Squad <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
