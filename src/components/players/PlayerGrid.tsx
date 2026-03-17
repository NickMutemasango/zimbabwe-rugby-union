"use client";
import { motion } from "framer-motion";
import { Shield, User } from "lucide-react";
import Image from "next/image";
import type { Player } from "@/lib/db";

export default function PlayerGrid({ players }: { players: Player[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {players.map((player, i) => (
        <motion.div
          key={player.id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.08 }}
          className="group bg-[#0A1628] border border-white/5 hover:border-[#006B3F]/50 rounded-2xl overflow-hidden transition-all hover:shadow-2xl hover:shadow-[#006B3F]/15"
        >
          <div className="relative h-40 bg-gradient-to-br from-[#006B3F]/30 to-[#0A1628] overflow-hidden">
            <span className="absolute inset-0 flex items-center justify-center text-9xl font-black text-white/5">
              {player.jerseyNumber}
            </span>
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#0A1628] to-transparent" />
            <div className="absolute top-4 right-4 w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center">
              <span className="text-[#050D1A] font-black text-sm">#{player.jerseyNumber}</span>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              {player.profilePicture ? (
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#006B3F]/60 relative">
                  <Image src={player.profilePicture} alt={player.name} fill className="object-cover" />
                </div>
              ) : (
                <div className="w-20 h-20 bg-[#006B3F]/20 rounded-full border-2 border-[#006B3F]/30 flex items-center justify-center">
                  <User size={32} className="text-[#006B3F]" />
                </div>
              )}
            </div>
          </div>
          <div className="p-5">
            <h3 className="text-white font-black text-lg mb-0.5">{player.name}</h3>
            <p className="text-[#D4AF37] text-sm font-medium mb-4">{player.position}</p>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "Caps", value: player.caps },
                { label: "Points", value: player.points },
                { label: "Age", value: player.age },
              ].map(({ label, value }) => (
                <div key={label} className="bg-[#006B3F]/10 border border-[#006B3F]/20 rounded-xl p-3 text-center">
                  <div className="text-white font-black text-xl">{value}</div>
                  <div className="text-white/40 text-[10px] uppercase tracking-wide">{label}</div>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 text-white/40 text-xs">
              <Shield size={12} className="text-[#006B3F]" />
              <span>{player.club}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
