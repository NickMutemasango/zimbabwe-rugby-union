"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Shield, Award, Users, CheckCircle, Loader2, Smartphone, CreditCard, ExternalLink } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const SUGGESTED_AMOUNTS = [5, 10, 25, 50, 100, 250];

const PAYMENT_METHODS = [
  { id: "ecocash",  label: "EcoCash",   icon: "📱", type: "mobile", color: "from-red-500 to-red-600" },
  { id: "onemoney", label: "OneMoney",  icon: "📱", type: "mobile", color: "from-yellow-500 to-yellow-600" },
  { id: "telecash", label: "TeleCash",  icon: "📱", type: "mobile", color: "from-blue-500 to-blue-600" },
  { id: "card",     label: "Card / Web", icon: "💳", type: "web",   color: "from-gray-600 to-gray-700" },
];

const IMPACT_ITEMS = [
  { icon: Users, amount: "$5",   description: "Covers training balls for one youth session" },
  { icon: Shield, amount: "$10",  description: "Provides kit maintenance for a team session" },
  { icon: Award,  amount: "$25",  description: "Funds travel for a player to an away match" },
  { icon: Heart,  amount: "$50",  description: "Sponsors a junior player's full season registration" },
];

type Stage = "form" | "mobile-pending" | "success";

export default function DonatePage() {
  const [selected, setSelected]   = useState<number | null>(10);
  const [custom, setCustom]       = useState("");
  const [name, setName]           = useState("");
  const [email, setEmail]         = useState("");
  const [phone, setPhone]         = useState("");
  const [method, setMethod]       = useState<string>("ecocash");
  const [loading, setLoading]     = useState(false);
  const [error, setError]         = useState("");
  const [stage, setStage]         = useState<Stage>("form");
  const [mobileMsg, setMobileMsg] = useState("");

  const amount = custom ? Number(custom) : selected;
  const isMobile = PAYMENT_METHODS.find(m => m.id === method)?.type === "mobile";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || amount <= 0) return;
    setLoading(true); setError("");

    try {
      const res  = await fetch("/api/donate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, name, email, phone: phone || undefined, method }),
      });
      const data = await res.json() as {
        success?: boolean; error?: string; type?: string;
        redirectUrl?: string; instructions?: string;
      };

      if (!res.ok || !data.success) {
        setError(data.error ?? "Payment initiation failed. Please try again.");
        return;
      }

      if (data.type === "web" && data.redirectUrl) {
        // Redirect to Paynow checkout
        window.location.href = data.redirectUrl;
      } else if (data.type === "mobile") {
        setMobileMsg(data.instructions ?? `Check your phone (${phone}) for a payment prompt.`);
        setStage("mobile-pending");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Breadcrumbs crumbs={[{ label: "Donate" }]} />
          <h1 className="text-5xl font-black text-[#0A1628] mt-4 mb-2">Support the Sables</h1>
          <p className="text-gray-500 text-lg">Every dollar directly funds Zimbabwe&apos;s rugby future.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* ── Donation Form ── */}
          <div>
            <AnimatePresence mode="wait">

              {/* Mobile pending */}
              {stage === "mobile-pending" && (
                <motion.div key="pending"
                  initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm"
                >
                  <div className="w-16 h-16 bg-[#006B3F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Smartphone size={32} className="text-[#006B3F]" />
                  </div>
                  <h2 className="text-[#0A1628] font-black text-2xl mb-2">Check Your Phone</h2>
                  <p className="text-gray-500 mb-6">{mobileMsg}</p>
                  <div className="flex items-center justify-center gap-2 text-[#006B3F] text-sm font-medium mb-6">
                    <Loader2 size={14} className="animate-spin" /> Waiting for payment confirmation…
                  </div>
                  <button onClick={() => { setStage("form"); setError(""); }}
                    className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl font-bold transition-colors text-sm">
                    Start Over
                  </button>
                </motion.div>
              )}

              {/* Success */}
              {stage === "success" && (
                <motion.div key="success"
                  initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                  className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm"
                >
                  <div className="w-16 h-16 bg-[#006B3F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-[#006B3F]" />
                  </div>
                  <h2 className="text-[#0A1628] font-black text-2xl mb-2">Thank You!</h2>
                  <p className="text-gray-500 mb-6">Your donation of <span className="text-[#006B3F] font-bold">${amount}</span> is confirmed.</p>
                  <button onClick={() => { setStage("form"); setCustom(""); setSelected(10); }}
                    className="px-6 py-3 bg-[#006B3F] text-white rounded-xl font-bold hover:bg-[#004D2C] transition-colors">
                    Donate Again
                  </button>
                </motion.div>
              )}

              {/* Main form */}
              {stage === "form" && (
                <motion.form key="form" onSubmit={handleSubmit}
                  className="bg-white border border-gray-100 rounded-2xl p-6 space-y-6 shadow-sm"
                >
                  {error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                      {error}
                    </div>
                  )}

                  {/* Amount selection */}
                  <div>
                    <h2 className="text-[#0A1628] font-bold text-base mb-3">Choose an Amount (USD)</h2>
                    <div className="grid grid-cols-3 gap-2">
                      {SUGGESTED_AMOUNTS.map((amt) => (
                        <button key={amt} type="button"
                          onClick={() => { setSelected(amt); setCustom(""); }}
                          className={`py-3 rounded-xl font-bold text-sm transition-all ${
                            selected === amt && !custom
                              ? "bg-[#006B3F] text-white shadow-lg shadow-[#006B3F]/30 scale-105"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                      <input type="number" value={custom} min="1" placeholder="Custom amount"
                        onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
                        className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#006B3F] rounded-xl text-[#0A1628] placeholder:text-gray-300 focus:outline-none transition-colors text-sm" />
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  {/* Payment method */}
                  <div>
                    <h2 className="text-[#0A1628] font-bold text-base mb-3">Payment Method</h2>
                    <div className="grid grid-cols-2 gap-2">
                      {PAYMENT_METHODS.map((m) => (
                        <button key={m.id} type="button"
                          onClick={() => setMethod(m.id)}
                          className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
                            method === m.id
                              ? "border-[#006B3F] bg-[#006B3F]/5 text-[#006B3F]"
                              : "border-gray-200 text-gray-600 hover:border-gray-300"
                          }`}
                        >
                          <span className="text-lg">{m.icon}</span>
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <hr className="border-gray-100" />

                  {/* Personal details */}
                  <div>
                    <h2 className="text-[#0A1628] font-bold text-base mb-3">Your Details</h2>
                    <div className="space-y-3">
                      <input type="text" value={name} onChange={(e) => setName(e.target.value)}
                        placeholder="Full Name *" required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#006B3F] rounded-xl text-[#0A1628] placeholder:text-gray-300 focus:outline-none transition-colors text-sm" />
                      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder="Email Address *" required
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#006B3F] rounded-xl text-[#0A1628] placeholder:text-gray-300 focus:outline-none transition-colors text-sm" />
                      {isMobile && (
                        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)}
                            placeholder="Mobile Number * (e.g. 0771234567)" required={isMobile}
                            className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#006B3F] rounded-xl text-[#0A1628] placeholder:text-gray-300 focus:outline-none transition-colors text-sm" />
                        </motion.div>
                      )}
                    </div>
                  </div>

                  <button type="submit" disabled={!amount || amount <= 0 || loading}
                    className="w-full py-4 bg-gradient-to-r from-[#006B3F] to-[#004D2C] hover:from-[#004D2C] hover:to-[#006B3F] disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-base rounded-xl transition-all hover:shadow-2xl hover:shadow-[#006B3F]/40 hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <><Loader2 size={18} className="animate-spin" /> Processing…</>
                    ) : isMobile ? (
                      <><Smartphone size={18} /> Donate ${amount ?? "0"} via {PAYMENT_METHODS.find(m => m.id === method)?.label}</>
                    ) : (
                      <><CreditCard size={18} /> Donate ${amount ?? "0"} — Pay Online <ExternalLink size={14} /></>
                    )}
                  </button>

                  <p className="text-gray-400 text-xs text-center">Payments processed securely through Paynow Zimbabwe.</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* ── Impact Sidebar ── */}
          <div className="space-y-6">
            <div className="bg-white border border-[#006B3F]/20 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#006B3F]/10 rounded-full flex items-center justify-center">
                  <Shield size={18} className="text-[#006B3F]" />
                </div>
                <div>
                  <h3 className="text-[#0A1628] font-bold">Trusted &amp; Transparent</h3>
                  <p className="text-gray-400 text-xs">Registered under Sports &amp; Recreation Commission</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                100% of your donation goes directly to player development, match operations, and grassroots rugby programs across Zimbabwe.
              </p>
            </div>

            <div>
              <h3 className="text-[#0A1628] font-bold mb-4">Your Impact</h3>
              <div className="space-y-3">
                {IMPACT_ITEMS.map(({ icon: Icon, amount: amt, description }, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                    <div className="w-10 h-10 bg-[#006B3F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-[#006B3F]" />
                    </div>
                    <div>
                      <span className="text-[#006B3F] font-black text-sm">{amt}</span>
                      <span className="text-gray-500 text-sm"> — {description}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Payment method icons */}
            <div className="bg-white border border-gray-100 rounded-2xl p-4 shadow-sm">
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">Accepted Payments</p>
              <div className="flex items-center gap-3 flex-wrap">
                {PAYMENT_METHODS.map(m => (
                  <div key={m.id} className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 rounded-lg border border-gray-100">
                    <span className="text-base">{m.icon}</span>
                    <span className="text-gray-600 text-xs font-medium">{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
