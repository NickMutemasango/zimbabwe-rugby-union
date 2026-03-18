"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, User, Pencil, Trash2, X, Upload, CheckCircle, AlertCircle, Loader2 } from "lucide-react";
import Image from "next/image";
import type { Player } from "@/lib/db";

const POSITIONS = [
  "Prop","Hooker","Lock","Flanker","Number 8",
  "Scrum-half","Fly-half","Centre","Wing","Fullback",
];

const inputCls =
  "px-3 py-2.5 bg-[#0A1628] border border-white/10 focus:border-[#006B3F] rounded-xl text-white placeholder:text-white/20 focus:outline-none text-sm transition-colors w-full";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{label}</label>
      {children}
    </div>
  );
}

// ── Edit Modal ────────────────────────────────────────────────────────────────
function EditPlayerModal({
  player, onClose, onSaved,
}: { player: Player; onClose: () => void; onSaved: (p: Player) => void }) {
  const [form, setForm] = useState({
    name: player.name, position: player.position,
    jerseyNumber: String(player.jerseyNumber), club: player.club,
    age: String(player.age), caps: String(player.caps), points: String(player.points),
  });
  const [photoFile,    setPhotoFile]    = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(player.profilePicture);
  const [status,  setStatus]  = useState<"idle"|"saving"|"success"|"error">("idle");
  const [errMsg,  setErrMsg]  = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handlePhoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg","image/png","image/webp"].includes(file.type)) {
      setErrMsg("Only JPG, PNG, or WEBP allowed."); setStatus("error"); return;
    }
    if (file.size > 50 * 1024 * 1024) {
      setErrMsg("Image must be under 50 MB."); setStatus("error"); return;
    }
    setPhotoFile(file);
    setPhotoPreview(URL.createObjectURL(file));
    setStatus("idle"); setErrMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("saving"); setErrMsg("");

    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (photoFile) fd.append("profilePicture", photoFile);

    try {
      const res  = await fetch(`/api/players/${player.id}`, { method: "PUT", body: fd });

      // ── Safe parse: res.json() on an HTML error page throws "Unexpected token '<'"
      const text = await res.text();
      let data: Record<string, unknown> = {};
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error(`Server error (HTTP ${res.status}). Check terminal for details.`);
      }

      // ── DEV console logging ────────────────────────────────────────────────
      if (process.env.NODE_ENV !== "production") {
        console.group(`%c[PlayerGrid] PUT /api/players/${player.id}`, "color:#22c55e;font-weight:bold");
        console.log("HTTP status     :", res.status);
        console.log("id              :", data.id);
        console.log("name            :", data.name);
        console.log("profile_picture :", data.profilePicture ?? "(none — no photo uploaded)");
        console.log("Full response   :", data);
        console.groupEnd();
      }

      if (!res.ok) throw new Error((data.error as string) || `HTTP ${res.status}`);
      setStatus("success");
      setTimeout(() => { onSaved(data as unknown as Player); onClose(); }, 700);
    } catch (err) {
      setErrMsg(err instanceof Error ? err.message : "Unknown error");
      setStatus("error");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 280 }}
        className="relative w-full max-w-lg bg-[#0D1F3C] border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#0A1628]">
          <div>
            <h2 className="text-white font-black text-lg">Edit Player</h2>
            <p className="text-white/40 text-xs">#{player.jerseyNumber} · {player.position}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl text-white/50 hover:text-white transition-colors">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[72vh] overflow-y-auto">
          {/* Photo upload */}
          <Field label="Profile Picture">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-[#006B3F]/50 bg-[#006B3F]/10 flex-shrink-0 relative">
                {photoPreview ? (
                  <Image src={photoPreview} alt="preview" fill className="object-cover" unoptimized />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <User size={20} className="text-[#006B3F]" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={handlePhoto} />
                <button type="button" onClick={() => fileRef.current?.click()}
                  className="flex items-center gap-2 px-3 py-2.5 border border-dashed border-white/20 hover:border-[#006B3F] rounded-xl text-white/40 hover:text-white text-xs transition-all w-full justify-center">
                  <Upload size={13} />
                  {photoFile ? photoFile.name : "JPG / PNG / WEBP  ·  max 50 MB"}
                </button>
              </div>
            </div>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Full Name">
              <input required value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} className={inputCls} placeholder="Full name" />
            </Field>
            <Field label="Jersey #">
              <input required type="number" value={form.jerseyNumber} onChange={e => setForm(f => ({...f, jerseyNumber: e.target.value}))} className={inputCls} placeholder="10" />
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Position">
              <div className="relative">
                <select value={form.position} onChange={e => setForm(f => ({...f, position: e.target.value}))} className={inputCls + " appearance-none pr-8"}>
                  {POSITIONS.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 text-xs pointer-events-none">▼</span>
              </div>
            </Field>
            <Field label="Club">
              <input value={form.club} onChange={e => setForm(f => ({...f, club: e.target.value}))} className={inputCls} placeholder="Club name" />
            </Field>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {(["age","caps","points"] as const).map(k => (
              <Field key={k} label={k.charAt(0).toUpperCase()+k.slice(1)}>
                <input type="number" value={form[k]} onChange={e => setForm(f => ({...f, [k]: e.target.value}))} className={inputCls} placeholder="0" />
              </Field>
            ))}
          </div>

          <AnimatePresence>
            {status === "error" && (
              <motion.p initial={{ opacity:0,y:-6 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }}
                className="flex items-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
                <AlertCircle size={13}/>{errMsg}
              </motion.p>
            )}
            {status === "success" && (
              <motion.p initial={{ opacity:0,y:-6 }} animate={{ opacity:1,y:0 }} exit={{ opacity:0 }}
                className="flex items-center gap-2 px-4 py-3 bg-[#006B3F]/10 border border-[#006B3F]/20 rounded-xl text-green-400 text-sm">
                <CheckCircle size={13}/> Player saved!
              </motion.p>
            )}
          </AnimatePresence>

          <div className="flex gap-3 pt-1">
            <button type="button" onClick={onClose} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white/60 rounded-xl text-sm transition-colors">Cancel</button>
            <button type="submit" disabled={status==="saving"||status==="success"}
              className="flex-1 py-3 bg-[#006B3F] hover:bg-[#004D2C] disabled:opacity-50 text-white font-black rounded-xl text-sm transition-all flex items-center justify-center gap-2">
              {status === "saving" ? <><Loader2 size={14} className="animate-spin"/>Saving…</> : "Save Changes"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

// ── Delete Confirm ────────────────────────────────────────────────────────────
function DeleteConfirm({ player, onClose, onDeleted }: { player: Player; onClose: () => void; onDeleted: (id: string) => void }) {
  const [loading, setLoading] = useState(false);
  const confirm = async () => {
    setLoading(true);
    const res = await fetch(`/api/players/${player.id}`, { method: "DELETE" });
    if (process.env.NODE_ENV !== "production") console.log(`[PlayerGrid] DELETE /api/players/${player.id} →`, res.status);
    if (res.ok) onDeleted(player.id);
    setLoading(false); onClose();
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <motion.div initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }}
        className="relative bg-[#0A1628] border border-white/10 rounded-2xl p-6 w-full max-w-sm text-center">
        <div className="w-12 h-12 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Trash2 size={20} className="text-red-400" />
        </div>
        <h3 className="text-white font-black text-lg mb-1">Remove Player?</h3>
        <p className="text-white/50 text-sm mb-6"><span className="text-white font-bold">{player.name}</span> will be permanently removed.</p>
        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white/60 rounded-xl text-sm transition-colors">Cancel</button>
          <button onClick={confirm} disabled={loading}
            className="flex-1 py-3 bg-red-500 hover:bg-red-600 disabled:opacity-50 text-white font-black rounded-xl text-sm flex items-center justify-center gap-2">
            {loading ? <Loader2 size={13} className="animate-spin"/> : <Trash2 size={13}/>} Remove
          </button>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main PlayerGrid ───────────────────────────────────────────────────────────
export default function PlayerGrid({ players: initial, editable = false }: { players: Player[]; editable?: boolean }) {
  const [players,      setPlayers]      = useState<Player[]>(initial);
  const [editTarget,   setEditTarget]   = useState<Player | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Player | null>(null);

  // Dev: log full dataset + field mapping on mount
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.group("%c[PlayerGrid] Loaded from /api/players", "color:#D4AF37;font-weight:bold");
      console.log(`Total players: ${players.length}`);
      console.table(players.map(p => ({
        id:              p.id,
        name:            p.name,
        position:        p.position,
        jerseyNumber:    p.jerseyNumber,
        caps:            p.caps,
        points:          p.points,
        profile_picture: p.profilePicture ?? "(none)",
      })));
      console.groupEnd();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {players.map((player, i) => (
          <motion.div key={player.id}
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07 }}
            className="group relative bg-[#0A1628] border border-white/5 hover:border-[#006B3F]/50 rounded-2xl overflow-hidden transition-all hover:shadow-2xl hover:shadow-[#006B3F]/15"
          >
            {/* Image area */}
            <div className="relative h-44 bg-gradient-to-br from-[#006B3F]/30 to-[#0A1628] overflow-hidden">
              <span className="absolute inset-0 flex items-center justify-center text-[7rem] font-black text-white/[0.04] select-none">
                {player.jerseyNumber}
              </span>
              <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-[#0A1628] to-transparent" />
              <div className="absolute top-4 right-4 w-10 h-10 bg-[#D4AF37] rounded-full flex items-center justify-center shadow-lg">
                <span className="text-[#050D1A] font-black text-xs">#{player.jerseyNumber}</span>
              </div>

              {/* Profile picture */}
              <div className="absolute inset-0 flex items-center justify-center">
                {player.profilePicture ? (
                  <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#006B3F]/60 shadow-lg relative">
                    <Image
                      src={player.profilePicture}
                      alt={player.name}
                      fill
                      className="object-cover"
                      unoptimized={player.profilePicture.startsWith("/uploads")}
                      onError={() => {
                        if (process.env.NODE_ENV !== "production")
                          console.warn(`[PlayerGrid] profile_picture load error for "${player.name}":`, player.profilePicture);
                      }}
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-[#006B3F]/20 rounded-full border-2 border-[#006B3F]/30 flex items-center justify-center">
                    <User size={30} className="text-[#006B3F]" />
                  </div>
                )}
              </div>

              {/* Hover stats overlay */}
              <div className="absolute inset-0 bg-[#006B3F]/95 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center gap-3 p-4">
                <span className="text-white font-black text-sm text-center">{player.name}</span>
                <div className="grid grid-cols-2 gap-2 w-full">
                  <div className="bg-white/10 rounded-xl p-2 text-center">
                    <div className="text-white font-black text-xl">{player.caps}</div>
                    <div className="text-white/50 text-[9px] uppercase tracking-widest">Caps</div>
                  </div>
                  <div className="bg-white/10 rounded-xl p-2 text-center">
                    <div className="text-white font-black text-xl">{player.points}</div>
                    <div className="text-white/50 text-[9px] uppercase tracking-widest">Points</div>
                  </div>
                </div>
                <div className="text-white/60 text-xs">{player.club}</div>
              </div>
            </div>

            {/* Card body */}
            <div className="p-5">
              <h3 className="text-white font-black text-base">{player.name}</h3>
              <p className="text-[#D4AF37] text-xs font-medium mb-3">{player.position}</p>
              <div className="grid grid-cols-3 gap-2 mb-3">
                {[{l:"Caps",v:player.caps},{l:"Pts",v:player.points},{l:"Age",v:player.age}].map(({l,v}) => (
                  <div key={l} className="bg-[#006B3F]/10 border border-[#006B3F]/20 rounded-xl p-2 text-center">
                    <div className="text-white font-black text-lg">{v}</div>
                    <div className="text-white/40 text-[9px] uppercase tracking-widest">{l}</div>
                  </div>
                ))}
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-1.5 text-white/40 text-xs">
                  <Shield size={11} className="text-[#006B3F]" />{player.club}
                </span>
                {editable && (
                  <div className="flex gap-1">
                    <button onClick={() => setEditTarget(player)}
                      className="p-1.5 rounded-lg hover:bg-[#006B3F]/20 text-white/30 hover:text-[#006B3F] transition-colors" title="Edit">
                      <Pencil size={13} />
                    </button>
                    <button onClick={() => setDeleteTarget(player)}
                      className="p-1.5 rounded-lg hover:bg-red-500/20 text-white/30 hover:text-red-400 transition-colors" title="Delete">
                      <Trash2 size={13} />
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {editTarget && (
          <EditPlayerModal key="edit" player={editTarget}
            onClose={() => setEditTarget(null)}
            onSaved={(p) => { setPlayers(prev => prev.map(x => x.id===p.id ? p : x)); }} />
        )}
        {deleteTarget && (
          <DeleteConfirm key="del" player={deleteTarget}
            onClose={() => setDeleteTarget(null)}
            onDeleted={(id) => setPlayers(prev => prev.filter(x => x.id !== id))} />
        )}
      </AnimatePresence>
    </>
  );
}
