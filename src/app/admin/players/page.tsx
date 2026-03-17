"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, EyeOff, AlertCircle, ChevronLeft, UserPlus } from "lucide-react";
import Link from "next/link";
import PlayerGrid from "@/components/players/PlayerGrid";
import type { Player } from "@/lib/db";

const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || "zru2025admin";

// ── PIN Gate (reused pattern) ─────────────────────────────────────────────────
function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) { onUnlock(); return; }
    setError(true); setShake(true); setPin("");
    setTimeout(() => setShake(false), 500);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-24">
      <motion.div animate={shake ? { x: [-10,10,-10,10,0] } : {}} transition={{ duration: 0.4 }} className="w-full max-w-sm">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-[#0A1628] p-8 text-center">
            <div className="w-14 h-14 bg-[#006B3F]/20 border border-[#006B3F]/40 rounded-full flex items-center justify-center mx-auto mb-3">
              <Lock size={24} className="text-[#D4AF37]" />
            </div>
            <h1 className="text-white font-black text-xl">Squad Manager</h1>
            <p className="text-white/40 text-sm mt-1">Admin access required</p>
          </div>
          <form onSubmit={submit} className="p-6 space-y-4">
            <div className="relative">
              <input type={show ? "text" : "password"} value={pin} required
                onChange={e => { setPin(e.target.value); setError(false); }}
                placeholder="Enter admin PIN"
                className={`w-full px-4 py-3 pr-11 bg-gray-50 border rounded-xl text-[#0A1628] placeholder:text-gray-300 focus:outline-none text-sm transition-colors ${error ? "border-red-400" : "border-gray-200 focus:border-[#006B3F]"}`}
              />
              <button type="button" onClick={() => setShow(!show)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                {show ? <EyeOff size={15}/> : <Eye size={15}/>}
              </button>
            </div>
            {error && <p className="flex items-center gap-1.5 text-red-500 text-xs"><AlertCircle size={12}/>Incorrect PIN.</p>}
            <button type="submit" className="w-full py-3 bg-[#006B3F] hover:bg-[#004D2C] text-white font-black rounded-xl transition-all flex items-center justify-center gap-2">
              <Shield size={15}/> Unlock
            </button>
            <Link href="/admin/update" className="block text-center text-gray-400 text-xs hover:text-[#006B3F] transition-colors">
              ← Back to Admin Portal
            </Link>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function AdminPlayersPage() {
  const [unlocked, setUnlocked] = useState(false);
  const [players, setPlayers]   = useState<Player[]>([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    if (!unlocked) return;
    fetch("/api/players")
      .then(r => r.json())
      .then(data => setPlayers(Array.isArray(data) ? data : []))
      .catch(() => setPlayers([]))
      .finally(() => setLoading(false));
  }, [unlocked]);

  if (!unlocked) return <PinGate onUnlock={() => setUnlocked(true)} />;

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <div>
            <Link href="/admin/update" className="flex items-center gap-1.5 text-[#006B3F] text-sm font-medium hover:gap-2.5 transition-all mb-3">
              <ChevronLeft size={15}/> Admin Portal
            </Link>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#006B3F]/10 border border-[#006B3F]/20 rounded-xl flex items-center justify-center">
                <Shield size={18} className="text-[#006B3F]" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-[#0A1628]">Squad Manager</h1>
                <p className="text-gray-400 text-sm">Edit or remove players — click the <strong className="text-[#006B3F]">pencil icon</strong> on any card</p>
              </div>
            </div>
          </div>

          <Link href="/admin/update"
            className="flex items-center gap-2 px-5 py-3 bg-[#006B3F] hover:bg-[#004D2C] text-white font-bold rounded-xl transition-all hover:shadow-lg hover:shadow-[#006B3F]/30 hover:-translate-y-0.5">
            <UserPlus size={16}/> Add New Player
          </Link>
        </div>

        {/* Tip banner */}
        <div className="flex items-start gap-3 px-5 py-4 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-2xl mb-8">
          <span className="text-[#D4AF37] text-lg mt-0.5">💡</span>
          <div>
            <p className="text-[#0A1628] font-bold text-sm">How to edit a player</p>
            <p className="text-gray-500 text-xs mt-0.5">
              Each card has a <strong>pencil (✏️)</strong> icon in the bottom-right corner. Click it to open the edit form.
              Changes are saved immediately via <code className="bg-gray-100 px-1 rounded text-[#006B3F]">PUT /api/players/:id</code>.
              To upload a new profile photo, use the upload zone inside the edit form.
            </p>
          </div>
        </div>

        {/* Player count */}
        {!loading && (
          <p className="text-gray-400 text-sm mb-6">
            {players.length === 0 ? "No players in the squad yet." : `${players.length} player${players.length !== 1 ? "s" : ""} in the squad`}
          </p>
        )}

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="bg-[#0A1628] border border-white/5 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-44 bg-white/5" />
                <div className="p-5 space-y-2">
                  <div className="h-3 bg-white/10 rounded w-3/4" />
                  <div className="h-3 bg-white/10 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : players.length === 0 ? (
          <div className="text-center py-24 bg-white border border-gray-100 rounded-2xl">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🏉</span>
            </div>
            <p className="text-gray-500 font-medium mb-2">No players yet</p>
            <Link href="/admin/update" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#006B3F] text-white text-sm font-bold rounded-xl hover:bg-[#004D2C] transition-colors">
              <UserPlus size={14}/> Add First Player
            </Link>
          </div>
        ) : (
          <PlayerGrid players={players} editable={true} />
        )}
      </div>
    </div>
  );
}
