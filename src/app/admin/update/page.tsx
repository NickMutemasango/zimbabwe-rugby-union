"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Save, Shield, Lock, Eye, EyeOff, AlertCircle,
  Upload, FileText, Image as ImageIcon, X, CheckCircle,
  Loader2, Users, Trash2, RefreshCw, ChevronDown, ChevronUp,
} from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const ADMIN_PIN = process.env.NEXT_PUBLIC_ADMIN_PIN || "zru2025admin";

// ── Safe API helpers ──────────────────────────────────────────────────────────
async function apiPost(url: string, body: FormData): Promise<unknown> {
  const res  = await fetch(url, { method: "POST", body });
  const text = await res.text();
  let json: Record<string, unknown>;
  try { json = JSON.parse(text); }
  catch { throw new Error(`Server error (HTTP ${res.status}). Check the terminal for details.`); }
  if (!res.ok) throw new Error((json.error as string) || (json.message as string) || `HTTP ${res.status}`);
  return json;
}

async function apiDelete(url: string): Promise<void> {
  const res = await fetch(url, { method: "DELETE" });
  if (!res.ok) {
    const text = await res.text();
    let msg = `HTTP ${res.status}`;
    try { msg = (JSON.parse(text) as Record<string, string>).error || msg; } catch { /* ignore */ }
    throw new Error(msg);
  }
}

// ── Shared UI primitives ─────────────────────────────────────────────────────
const baseInput =
  "w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#006B3F] rounded-xl text-[#0A1628] placeholder:text-gray-300 focus:outline-none transition-colors text-sm";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-gray-600 text-sm font-medium">{label}</label>
      {children}
      {error && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={11} />{error}</p>}
    </div>
  );
}

function Input({ label, error, ...props }: { label: string; error?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <Field label={label} error={error}><input {...props} className={baseInput} /></Field>;
}

function Textarea({ label, ...props }: { label: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <Field label={label}><textarea {...props} rows={4} className={baseInput + " resize-none"} /></Field>;
}

function Select({ label, children, ...props }: { label: string } & React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) {
  return (
    <Field label={label}>
      <div className="relative">
        <select {...props} className={baseInput + " appearance-none pr-10"}>{children}</select>
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs pointer-events-none">▼</span>
      </div>
    </Field>
  );
}

function FileZone({ label, accept, helpText, icon: Icon, file, onChange, error }: {
  label: string; accept: string; helpText: string;
  icon: React.ElementType; file: File | null;
  onChange: (f: File | null) => void; error?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <Field label={label} error={error}>
      <div
        onClick={() => ref.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); onChange(e.dataTransfer.files[0] ?? null); }}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all
          ${file ? "border-[#006B3F] bg-[#006B3F]/5" : "border-gray-200 hover:border-[#006B3F]/50 hover:bg-gray-50"}`}
      >
        <input ref={ref} type="file" accept={accept} className="hidden"
          onChange={(e) => onChange(e.target.files?.[0] ?? null)} />
        {file ? (
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 bg-[#006B3F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon size={18} className="text-[#006B3F]" />
              </div>
              <div className="text-left min-w-0">
                <p className="text-[#0A1628] font-medium text-sm truncate">{file.name}</p>
                <p className="text-gray-400 text-xs">{(file.size / 1024).toFixed(0)} KB</p>
              </div>
            </div>
            <button type="button" onClick={(e) => { e.stopPropagation(); onChange(null); }}
              className="p-1.5 bg-red-50 hover:bg-red-100 rounded-lg text-red-400 hover:text-red-600 transition-colors flex-shrink-0">
              <X size={14} />
            </button>
          </div>
        ) : (
          <>
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Icon size={22} className="text-gray-400" />
            </div>
            <p className="text-gray-600 text-sm font-medium mb-1">Click or drag file here</p>
            <p className="text-gray-400 text-xs">{helpText}</p>
          </>
        )}
      </div>
    </Field>
  );
}

function SubmitBtn({ loading, label }: { loading: boolean; label: string }) {
  return (
    <button type="submit" disabled={loading}
      className="flex items-center gap-2 px-8 py-4 bg-[#006B3F] hover:bg-[#004D2C] disabled:opacity-60 text-white font-black rounded-xl transition-all hover:shadow-xl hover:shadow-[#006B3F]/30 hover:-translate-y-0.5">
      {loading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
      {loading ? "Saving…" : label}
    </button>
  );
}

// ── Generic Manage Section ────────────────────────────────────────────────────
type AnyRecord = Record<string, unknown>;

function ManageSection({
  endpoint,
  label,
  renderRow,
  onDeleted,
}: {
  endpoint: string;
  label: string;
  renderRow: (item: AnyRecord) => React.ReactNode;
  onDeleted?: () => void;
}) {
  const [items, setItems]   = useState<AnyRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen]     = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError]   = useState("");

  const load = useCallback(async () => {
    setLoading(true); setError("");
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setItems(Array.isArray(data) ? data : []);
    } catch { setError("Failed to load items"); }
    finally { setLoading(false); }
  }, [endpoint]);

  useEffect(() => { if (open) load(); }, [open, load]);

  async function handleDelete(id: string) {
    if (!confirm(`Delete this ${label}? This cannot be undone.`)) return;
    setDeletingId(id);
    try {
      await apiDelete(`${endpoint}/${id}`);
      setItems(prev => prev.filter(i => (i.id as string) !== id));
      onDeleted?.();
    } catch (e) { alert(e instanceof Error ? e.message : "Delete failed"); }
    finally { setDeletingId(null); }
  }

  return (
    <div className="mt-6 border-t border-gray-100 pt-5">
      <button
        type="button"
        onClick={() => setOpen(v => !v)}
        className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-[#006B3F] transition-colors w-full"
      >
        {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        Manage existing {label}s
        {open && (
          <button type="button" onClick={(e) => { e.stopPropagation(); load(); }}
            className="ml-auto p-1 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-600 transition-colors">
            <RefreshCw size={13} />
          </button>
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
            <div className="mt-3 space-y-2">
              {loading && (
                <div className="flex items-center gap-2 text-gray-400 text-sm py-4 justify-center">
                  <Loader2 size={15} className="animate-spin" /> Loading…
                </div>
              )}
              {error && <p className="text-red-500 text-sm">{error}</p>}
              {!loading && items.length === 0 && !error && (
                <p className="text-gray-400 text-sm text-center py-4">No {label}s found.</p>
              )}
              {items.map(item => (
                <div key={item.id as string}
                  className="flex items-center justify-between gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex-1 min-w-0">{renderRow(item)}</div>
                  <button
                    type="button"
                    disabled={deletingId === (item.id as string)}
                    onClick={() => handleDelete(item.id as string)}
                    className="p-2 bg-red-50 hover:bg-red-100 text-red-400 hover:text-red-600 rounded-lg transition-colors flex-shrink-0 disabled:opacity-40"
                  >
                    {deletingId === (item.id as string)
                      ? <Loader2 size={14} className="animate-spin" />
                      : <Trash2 size={14} />}
                  </button>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ── Tab Forms ─────────────────────────────────────────────────────────────────
function PlayerForm({ onSuccess }: { onSuccess: () => void }) {
  const [pic, setPic] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true); setError("");
    const fd = new FormData(e.currentTarget);
    if (pic) fd.set("profilePicture", pic);
    try {
      await apiPost("/api/players", fd);
      formRef.current?.reset(); setPic(null); onSuccess();
    } catch (err: unknown) { setError(err instanceof Error ? err.message : "Failed"); }
    finally { setLoading(false); }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Full Name *" name="name" placeholder="e.g. Brendan Munyai" required />
        <Input label="Jersey Number *" name="jerseyNumber" type="number" placeholder="10" required />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Select label="Position *" name="position">
          {["Prop","Hooker","Lock","Flanker","Number 8","Scrum-half","Fly-half","Centre","Wing","Fullback"].map(p => (
            <option key={p}>{p}</option>
          ))}
        </Select>
        <Input label="Club" name="club" placeholder="e.g. Old Hararians" />
      </div>
      <div className="grid grid-cols-3 gap-4">
        <Input label="Age" name="age" type="number" placeholder="26" />
        <Input label="Caps" name="caps" type="number" placeholder="34" />
        <Input label="Points" name="points" type="number" placeholder="187" />
      </div>
      <FileZone label="Profile Picture" accept="image/jpeg,image/png,image/webp"
        helpText="Max 5 MB · JPEG, PNG or WEBP" icon={ImageIcon} file={pic} onChange={setPic} />
      <SubmitBtn loading={loading} label="Save Player" />
    </form>
  );
}

function NewsForm({ onSuccess }: { onSuccess: () => void }) {
  const [img, setImg] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true); setError("");
    const fd = new FormData(e.currentTarget);
    if (img) fd.set("featuredImage", img);
    try {
      await apiPost("/api/news", fd);
      formRef.current?.reset(); setImg(null); onSuccess();
    } catch (err: unknown) { setError(err instanceof Error ? err.message : "Failed"); }
    finally { setLoading(false); }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}
      <Input label="Headline *" name="title" placeholder="e.g. Sables Named for Rugby Africa Cup" required />
      <div className="grid sm:grid-cols-2 gap-4">
        <Select label="Category *" name="category">
          {["Squad News","Match Report","Development","Partnership","Tournament","Club Rugby","General"].map(c => (
            <option key={c}>{c}</option>
          ))}
        </Select>
        <Input label="Date *" name="date" type="date" required defaultValue={new Date().toISOString().split("T")[0]} />
      </div>
      <Textarea label="Excerpt *" name="excerpt" placeholder="Short summary shown on news cards…" />
      <Textarea label="Full Article Body" name="content" placeholder="Full article content…" />
      <FileZone label="Featured Image (optional)" accept="image/jpeg,image/png,image/webp"
        helpText="Max 5 MB · JPEG, PNG or WEBP" icon={ImageIcon} file={img} onChange={setImg} />
      <SubmitBtn loading={loading} label="Publish News" />

      <ManageSection
        endpoint="/api/news"
        label="news article"
        renderRow={(item) => (
          <div>
            <p className="text-[#0A1628] text-sm font-semibold truncate">{item.title as string}</p>
            <p className="text-gray-400 text-xs">{item.date as string}</p>
          </div>
        )}
      />
    </form>
  );
}

function ArticleForm({ onSuccess }: { onSuccess: () => void }) {
  const [pdf, setPdf] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!pdf) { setError("Please select a PDF file"); return; }
    setLoading(true); setError("");
    const fd = new FormData(e.currentTarget);
    fd.set("pdf", pdf);
    try {
      await apiPost("/api/articles", fd);
      formRef.current?.reset(); setPdf(null); onSuccess();
    } catch (err: unknown) { setError(err instanceof Error ? err.message : "Failed"); }
    finally { setLoading(false); }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}
      <Input label="Document Title *" name="title" placeholder="e.g. ZRU Annual Report 2025" required />
      <Input label="Date *" name="date" type="date" required defaultValue={new Date().toISOString().split("T")[0]} />
      <Textarea label="Description" name="description" placeholder="Brief description of this document…" />
      <FileZone label="Upload PDF *" accept="application/pdf"
        helpText="Max 20 MB · PDF files only" icon={FileText} file={pdf} onChange={setPdf} />
      <SubmitBtn loading={loading} label="Upload Article" />

      <ManageSection
        endpoint="/api/articles"
        label="article"
        renderRow={(item) => (
          <div>
            <p className="text-[#0A1628] text-sm font-semibold truncate">{item.title as string}</p>
            <p className="text-gray-400 text-xs">{item.date as string} · {item.fileSize as string}</p>
          </div>
        )}
      />
    </form>
  );
}

function FixtureForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true); setError("");
    try {
      await apiPost("/api/fixtures", new FormData(e.currentTarget));
      formRef.current?.reset(); onSuccess();
    } catch (err: unknown) { setError(err instanceof Error ? err.message : "Failed"); }
    finally { setLoading(false); }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Home Team *" name="homeTeam" placeholder="Zimbabwe" required />
        <Input label="Away Team *" name="awayTeam" placeholder="Namibia" required />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Date *" name="date" type="date" required />
        <Input label="Kick-off Time" name="time" type="time" defaultValue="15:00" />
      </div>
      <Input label="Venue *" name="venue" placeholder="e.g. Harare Sports Club" required />
      <Input label="Competition *" name="competition" placeholder="e.g. Rugby Africa Cup 2025" required />
      <SubmitBtn loading={loading} label="Schedule Fixture" />

      <ManageSection
        endpoint="/api/fixtures"
        label="fixture"
        renderRow={(item) => (
          <div>
            <p className="text-[#0A1628] text-sm font-semibold truncate">
              {item.homeTeam as string} vs {item.awayTeam as string}
            </p>
            <p className="text-gray-400 text-xs">{item.date as string} · {item.venue as string}</p>
          </div>
        )}
      />
    </form>
  );
}

function ResultForm({ onSuccess }: { onSuccess: () => void }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault(); setLoading(true); setError("");
    try {
      await apiPost("/api/results", new FormData(e.currentTarget));
      formRef.current?.reset(); onSuccess();
    } catch (err: unknown) { setError(err instanceof Error ? err.message : "Failed"); }
    finally { setLoading(false); }
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">{error}</div>}
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Home Team *" name="homeTeam" placeholder="Zimbabwe" required />
        <Input label="Away Team *" name="awayTeam" placeholder="Kenya" required />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Home Score *" name="homeScore" type="number" placeholder="27" required />
        <Input label="Away Score *" name="awayScore" type="number" placeholder="22" required />
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Input label="Match Date *" name="date" type="date" required />
        <Input label="Venue" name="venue" placeholder="e.g. Harare Sports Club" />
      </div>
      <Input label="Competition *" name="competition" placeholder="e.g. Rugby Africa Cup 2025" required />
      <Textarea label="Match Report Summary" name="report" placeholder="Brief match summary…" />
      <SubmitBtn loading={loading} label="Save Result" />

      <ManageSection
        endpoint="/api/results"
        label="result"
        renderRow={(item) => (
          <div>
            <p className="text-[#0A1628] text-sm font-semibold truncate">
              {item.homeTeam as string} {item.homeScore as number}–{item.awayScore as number} {item.awayTeam as string}
            </p>
            <p className="text-gray-400 text-xs">{item.date as string} · {item.competition as string}</p>
          </div>
        )}
      />
    </form>
  );
}

// ── PIN Gate ──────────────────────────────────────────────────────────────────
function PinGate({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === ADMIN_PIN) { onUnlock(); return; }
    setError(true); setShake(true); setPin("");
    setTimeout(() => setShake(false), 600);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 pt-24">
      <motion.div animate={shake ? { x: [-10, 10, -10, 10, 0] } : {}} transition={{ duration: 0.4 }} className="w-full max-w-sm">
        <div className="bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-[#0A1628] p-8 text-center">
            <div className="w-16 h-16 bg-[#006B3F]/20 border border-[#006B3F]/40 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock size={28} className="text-[#D4AF37]" />
            </div>
            <h1 className="text-white font-black text-2xl">Admin Portal</h1>
            <p className="text-white/50 text-sm mt-1">Enter your access PIN to continue</p>
          </div>
          <form onSubmit={submit} className="p-8 space-y-4">
            <Field label="Admin PIN" error={error ? "Incorrect PIN. Please try again." : undefined}>
              <div className="relative">
                <input type={show ? "text" : "password"} value={pin}
                  onChange={(e) => { setPin(e.target.value); setError(false); }}
                  placeholder="Enter PIN" required autoComplete="current-password"
                  className={baseInput + " pr-12 " + (error ? "border-red-400" : "")} />
                <button type="button" onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </Field>
            <button type="submit"
              className="w-full py-3 bg-[#006B3F] hover:bg-[#004D2C] text-white font-black rounded-xl transition-all flex items-center justify-center gap-2">
              <Shield size={16} /> Unlock Admin Portal
            </button>
            <p className="text-gray-400 text-xs text-center">Authorised ZRU personnel only.</p>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
type Tab = "player" | "news" | "fixture" | "result" | "article";
const TABS: { value: Tab; label: string; emoji: string }[] = [
  { value: "player",  label: "Player",      emoji: "🏉" },
  { value: "news",    label: "News",         emoji: "📰" },
  { value: "article", label: "Article/PDF",  emoji: "📄" },
  { value: "fixture", label: "Fixture",      emoji: "📅" },
  { value: "result",  label: "Result",       emoji: "🏆" },
];

export default function AdminUpdatePage() {
  const [unlocked, setUnlocked] = useState(false);
  const [tab, setTab] = useState<Tab>("player");
  const [saved, setSaved] = useState(false);

  if (!unlocked) return <PinGate onUnlock={() => setUnlocked(true)} />;

  const handleSuccess = () => { setSaved(true); setTimeout(() => setSaved(false), 4000); };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Breadcrumbs crumbs={[{ label: "Admin" }, { label: "Content Manager" }]} />
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#006B3F]/10 border border-[#006B3F]/20 rounded-xl flex items-center justify-center">
                <Shield size={18} className="text-[#006B3F]" />
              </div>
              <div>
                <h1 className="text-3xl font-black text-[#0A1628]">Content Manager</h1>
                <p className="text-gray-400 text-sm">Add, manage &amp; delete site content</p>
              </div>
            </div>
            <button onClick={() => setUnlocked(false)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 text-sm rounded-xl transition-colors">
              <Lock size={14} /> Lock
            </button>
          </div>
        </div>

        <AnimatePresence>
          {saved && (
            <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              className="mb-6 flex items-center gap-3 p-4 bg-[#006B3F]/10 border border-[#006B3F]/30 rounded-xl text-[#006B3F] font-medium text-sm">
              <CheckCircle size={18} /> Saved! Changes are live on the site immediately.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Actions */}
        <div className="mb-6 p-4 bg-white border border-gray-100 rounded-2xl shadow-sm">
          <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Quick Actions</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/players"
              className="flex items-center gap-2 px-4 py-2.5 bg-[#0A1628] hover:bg-[#0d2040] text-white text-sm font-bold rounded-xl transition-all hover:shadow-lg hover:-translate-y-0.5 border border-white/10">
              <Users size={15} className="text-[#D4AF37]" />
              Manage &amp; Edit Squad Players
              <span className="text-[10px] text-white/40 bg-white/10 px-1.5 py-0.5 rounded-md ml-1">Edit / Delete</span>
            </Link>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white border border-gray-100 rounded-2xl p-2 shadow-sm mb-6 flex gap-1 flex-wrap">
          {TABS.map(({ value, label, emoji }) => (
            <button key={value} onClick={() => setTab(value)}
              className={`flex-1 min-w-[80px] py-3 px-3 rounded-xl text-sm font-bold transition-all ${
                tab === value ? "bg-[#006B3F] text-white shadow-sm" : "text-gray-500 hover:bg-gray-50"
              }`}>
              <span className="mr-1.5">{emoji}</span>{label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.18 }}
            className="bg-white border border-gray-100 rounded-2xl p-6 shadow-sm">
            <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-100">
              <Upload size={16} className="text-[#006B3F]" />
              <h2 className="text-[#0A1628] font-bold text-sm uppercase tracking-wider">
                {TABS.find(t => t.value === tab)?.label} Details
              </h2>
            </div>
            {tab === "player"  && <PlayerForm  onSuccess={handleSuccess} />}
            {tab === "news"    && <NewsForm    onSuccess={handleSuccess} />}
            {tab === "article" && <ArticleForm onSuccess={handleSuccess} />}
            {tab === "fixture" && <FixtureForm onSuccess={handleSuccess} />}
            {tab === "result"  && <ResultForm  onSuccess={handleSuccess} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
