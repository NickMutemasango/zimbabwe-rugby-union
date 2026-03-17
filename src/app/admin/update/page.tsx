"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Save, Shield, ChevronDown, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || "zru2025admin";

type UpdateType = "player" | "news" | "fixture" | "result";

const UPDATE_TYPES: { value: UpdateType; label: string; description: string }[] = [
  { value: "player", label: "Player Profile", description: "Add or update a player in the squad" },
  { value: "news", label: "News Article", description: "Publish a news article or announcement" },
  { value: "fixture", label: "Match Fixture", description: "Schedule an upcoming match" },
  { value: "result", label: "Match Result", description: "Record the result of a played match" },
];

function Input({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-gray-600 text-sm font-medium">{label}</label>
      <input {...props}
        className="px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#006B3F] rounded-xl text-[#0A1628] placeholder:text-gray-300 focus:outline-none transition-colors text-sm" />
    </div>
  );
}

function Textarea({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-gray-600 text-sm font-medium">{label}</label>
      <textarea {...props} rows={4}
        className="px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#006B3F] rounded-xl text-[#0A1628] placeholder:text-gray-300 focus:outline-none transition-colors text-sm resize-none" />
    </div>
  );
}

function Select({ label, children, ...props }: { label: string } & React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-gray-600 text-sm font-medium">{label}</label>
      <div className="relative">
        <select {...props} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#006B3F] rounded-xl text-[#0A1628] appearance-none focus:outline-none transition-colors text-sm">
          {children}
        </select>
        <ChevronDown size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

function PlayerForm() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <Input label="Full Name *" placeholder="e.g. Brendan Munyai" required />
      <Input label="Jersey Number *" type="number" placeholder="e.g. 10" required />
      <Select label="Position *">
        {["Prop","Hooker","Lock","Flanker","Number 8","Scrum-half","Fly-half","Centre","Wing","Fullback"].map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
      </Select>
      <Input label="Club" placeholder="e.g. Old Hararians" />
      <Input label="Age" type="number" placeholder="e.g. 26" />
      <Input label="International Caps" type="number" placeholder="e.g. 34" />
      <Input label="Points Scored" type="number" placeholder="e.g. 187" />
      <Input label="Player Photo URL" placeholder="https://..." type="url" />
    </div>
  );
}

function NewsForm() {
  return (
    <div className="space-y-4">
      <Input label="Article Title *" placeholder="e.g. Sables Named for Rugby Africa Cup Qualifier" required />
      <div className="grid grid-cols-2 gap-4">
        <Select label="Category *">
          {["Squad News","Match Report","Development","Partnership","Tournament","Club Rugby"].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </Select>
        <Input label="Date *" type="date" required />
      </div>
      <Textarea label="Article Excerpt *" placeholder="Brief summary..." required />
      <Textarea label="Full Article Content *" placeholder="Write the full article here..." />
      <Input label="Featured Image URL" placeholder="https://..." type="url" />
    </div>
  );
}

function FixtureForm() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input label="Home Team *" placeholder="e.g. Zimbabwe" required />
        <Input label="Away Team *" placeholder="e.g. Namibia" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Date *" type="date" required />
        <Input label="Kick-off Time *" type="time" required />
      </div>
      <Input label="Venue *" placeholder="e.g. Harare Sports Club" required />
      <Input label="Competition *" placeholder="e.g. Rugby Africa Cup 2025" required />
    </div>
  );
}

function ResultForm() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input label="Home Team *" placeholder="e.g. Zimbabwe" required />
        <Input label="Away Team *" placeholder="e.g. Kenya" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Home Score *" type="number" placeholder="e.g. 27" required />
        <Input label="Away Score *" type="number" placeholder="e.g. 22" required />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <Input label="Match Date *" type="date" required />
        <Input label="Venue *" placeholder="e.g. RFUEA Ground, Nairobi" required />
      </div>
      <Input label="Competition *" placeholder="e.g. Rugby Africa Cup 2025" required />
      <Textarea label="Match Report Summary" placeholder="Brief match report..." />
    </div>
  );
}

// ─── PIN Gate ───────────────────────────────────────────────────────────────
function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) {
      onUnlock();
    } else {
      setError(true);
      setShake(true);
      setPin("");
      setTimeout(() => setShake(false), 600);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-24">
      <motion.div
        animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <div className="bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-[#0A1628] p-8 text-center">
            <div className="w-16 h-16 bg-[#006B3F]/20 border border-[#006B3F]/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={28} className="text-[#D4AF37]" />
            </div>
            <h1 className="text-white font-black text-2xl">Admin Portal</h1>
            <p className="text-white/50 text-sm mt-1">Enter your access PIN to continue</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-4">
            <div>
              <label className="text-gray-600 text-sm font-medium block mb-2">Admin PIN</label>
              <div className="relative">
                <input
                  type={showPin ? "text" : "password"}
                  value={pin}
                  onChange={e => { setPin(e.target.value); setError(false); }}
                  placeholder="Enter PIN"
                  required
                  autoComplete="current-password"
                  className={`w-full px-4 py-3 pr-12 bg-gray-50 border rounded-xl text-[#0A1628] placeholder:text-gray-300 focus:outline-none transition-colors text-sm ${
                    error ? "border-red-400 focus:border-red-400" : "border-gray-200 focus:border-[#006B3F]"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPin(!showPin)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPin ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-1.5 text-red-500 text-xs mt-2"
                >
                  <AlertCircle size={12} />
                  Incorrect PIN. Please try again.
                </motion.p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#006B3F] hover:bg-[#004D2C] text-white font-black rounded-xl transition-all hover:shadow-lg hover:shadow-[#006B3F]/30 flex items-center justify-center gap-2"
            >
              <Shield size={16} />
              Unlock Admin Portal
            </button>

            <p className="text-gray-400 text-xs text-center">
              Authorised ZRU personnel only. Unauthorised access is prohibited.
            </p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function AdminUpdatePage() {
  const [unlocked, setUnlocked] = useState(false);
  const [updateType, setUpdateType] = useState<UpdateType>("player");
  const [saved, setSaved] = useState(false);

  if (!unlocked) {
    return <PinGate onUnlock={() => setUnlocked(true)} />;
  }

  const selectedType = UPDATE_TYPES.find((t) => t.value === updateType)!;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Breadcrumbs crumbs={[{ label: "Admin" }, { label: "Update Content" }]} />
          <div className="flex items-center justify-between mt-4 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#006B3F]/10 border border-[#006B3F]/20 rounded-xl flex items-center justify-center">
                <Shield size={18} className="text-[#006B3F]" />
              </div>
              <h1 className="text-4xl font-black text-[#0A1628]">Admin Portal</h1>
            </div>
            <button
              onClick={() => setUnlocked(false)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm rounded-xl transition-colors"
            >
              <Lock size={14} /> Lock
            </button>
          </div>
          <p className="text-gray-500">Unified content management — select the update type below.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <h2 className="text-[#0A1628] font-bold text-sm uppercase tracking-wider mb-4">Update Type</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {UPDATE_TYPES.map((type) => (
                <button key={type.value} type="button" onClick={() => setUpdateType(type.value)}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    updateType === type.value
                      ? "bg-[#006B3F]/10 border-[#006B3F] shadow-sm"
                      : "bg-gray-50 border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className={`font-bold text-sm mb-1 ${updateType === type.value ? "text-[#006B3F]" : "text-gray-700"}`}>
                    {type.label}
                  </div>
                  <div className="text-gray-400 text-[10px] leading-tight">{type.description}</div>
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={updateType} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm"
            >
              <h2 className="text-[#0A1628] font-bold text-sm uppercase tracking-wider mb-6">{selectedType.label} Details</h2>
              {updateType === "player" && <PlayerForm />}
              {updateType === "news" && <NewsForm />}
              {updateType === "fixture" && <FixtureForm />}
              {updateType === "result" && <ResultForm />}
            </motion.div>
          </AnimatePresence>

          <div className="flex items-center gap-4">
            <button type="submit"
              className="flex items-center gap-2 px-8 py-4 bg-[#006B3F] hover:bg-[#004D2C] text-white font-black rounded-xl transition-all hover:shadow-xl hover:shadow-[#006B3F]/30 hover:-translate-y-0.5">
              <Save size={16} />
              Save {selectedType.label}
            </button>
            <button type="reset" className="px-6 py-4 bg-gray-100 hover:bg-gray-200 text-gray-600 font-medium rounded-xl transition-colors text-sm">
              Clear Form
            </button>
            {saved && (
              <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="text-[#006B3F] font-bold text-sm">
                ✓ Saved successfully!
              </motion.span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
