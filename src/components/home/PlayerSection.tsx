"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Shield, ChevronRight } from "lucide-react";
import type { Player } from "@/lib/db";

function PlayerCard({ player, index }: { player: Player; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className="group relative bg-[#0A1628] border border-white/5 rounded-2xl overflow-hidden cursor-pointer hover:border-[#006B3F]/50 transition-all hover:shadow-2xl hover:shadow-[#006B3F]/20"
    >
      <div className="relative h-48 bg-gradient-to-b from-[#006B3F]/20 to-[#0A1628] overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-8xl font-black text-white/5">{player.jerseyNumber}</span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0A1628] to-transparent" />
        <div className="absolute top-4 right-4 w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center">
          <span className="text-[#050D1A] font-black text-sm">#{player.jerseyNumber}</span>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-20 h-20 bg-[#006B3F]/20 rounded-full border-2 border-[#006B3F]/30 flex items-center justify-center text-4xl">🏉</div>
        </div>
        {/* Hover stats overlay */}
        <div className="absolute inset-0 bg-[#006B3F]/92 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-4">
          <div className="text-white font-black text-sm text-center">{player.name}</div>
          <div className="grid grid-cols-2 gap-3 w-full">
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <div className="text-white font-black text-lg">{player.caps}</div>
              <div className="text-white/60 text-[10px] uppercase tracking-wide">Caps</div>
            </div>
            <div className="bg-white/10 rounded-lg p-2 text-center">
              <div className="text-white font-black text-lg">{player.points}</div>
              <div className="text-white/60 text-[10px] uppercase tracking-wide">Points</div>
            </div>
          </div>
          <div className="text-white/70 text-xs">{player.club}</div>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-white font-bold text-sm">{player.name}</span>
          <span className="text-[#D4AF37] font-black text-sm">#{player.jerseyNumber}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-white/40 text-xs">{player.position}</span>
          <span className="flex items-center gap-1 text-white/40 text-xs">
            <Shield size={10} className="text-[#006B3F]" />
            {player.caps} caps
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <div className="bg-[#0A1628] border border-white/5 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-48 bg-white/5" />
      <div className="p-4 space-y-2">
        <div className="h-3 bg-white/10 rounded w-3/4" />
        <div className="h-3 bg-white/10 rounded w-1/2" />
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
      .then((data) => setPlayers(Array.isArray(data) ? data : []))
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
            <p className="text-gray-400 text-sm mt-2">Hover over a player card to see quick stats</p>
          </div>
          <Link href="/players" className="hidden sm:flex items-center gap-2 text-[#006B3F] font-bold hover:gap-3 transition-all text-sm">
            Full Squad <ChevronRight size={16} />
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)
          ) : players.length === 0 ? (
            <div className="col-span-full text-center py-16 text-gray-400">No players yet.</div>
          ) : (
            players.map((player, i) => (
              <PlayerCard key={player.id} player={player} index={i} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
