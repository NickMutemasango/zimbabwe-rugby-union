"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Heart, Shield, Award, Users, CheckCircle, ExternalLink } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const SUGGESTED_AMOUNTS = [10, 25, 50, 100, 250];
const IMPACT_ITEMS = [
  { icon: Users, amount: "$10", description: "Provides training equipment for one youth player" },
  { icon: Shield, amount: "$25", description: "Covers match-day kit maintenance for a team session" },
  { icon: Award, amount: "$50", description: "Funds travel for a player to an away provincial match" },
  { icon: Heart, amount: "$100", description: "Sponsors a junior player's full season registration" },
];

export default function DonatePage() {
  const [selected, setSelected] = useState<number | null>(50);
  const [custom, setCustom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const amount = custom ? Number(custom) : selected;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
          {/* Form */}
          <div>
            {submitted ? (
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white border border-gray-100 rounded-2xl p-8 text-center shadow-sm"
              >
                <div className="w-16 h-16 bg-[#006B3F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-[#006B3F]" />
                </div>
                <h2 className="text-[#0A1628] font-black text-2xl mb-2">Thank You!</h2>
                <p className="text-gray-500 mb-6">Your donation of <span className="text-[#006B3F] font-bold">${amount}</span> is being processed via Paynow.</p>
                <button onClick={() => setSubmitted(false)} className="px-6 py-3 bg-[#006B3F] text-white rounded-xl font-bold hover:bg-[#004D2C] transition-colors">
                  Donate Again
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-6 space-y-6 shadow-sm">
                <h2 className="text-[#0A1628] font-bold text-lg">Choose an Amount</h2>

                <div className="grid grid-cols-5 gap-2">
                  {SUGGESTED_AMOUNTS.map((amt) => (
                    <button
                      key={amt}
                      type="button"
                      onClick={() => { setSelected(amt); setCustom(""); }}
                      className={`py-3 rounded-xl font-bold text-sm transition-all ${
                        selected === amt && !custom
                          ? "bg-[#006B3F] text-white shadow-lg shadow-[#006B3F]/30 scale-105"
                          : "bg-gray-100 text-gray-600 hover:text-gray-800 hover:bg-gray-200 border border-gray-200"
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                </div>

                <div>
                  <label className="text-gray-500 text-sm mb-2 block">Or enter a custom amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                    <input
                      type="number"
                      value={custom}
                      onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
                      placeholder="0.00"
                      min="1"
                      className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#006B3F] rounded-xl text-[#0A1628] placeholder:text-gray-300 focus:outline-none transition-colors"
                    />
                  </div>
                </div>

                <hr className="border-gray-100" />
                <h2 className="text-[#0A1628] font-bold text-lg">Your Details</h2>

                <div className="space-y-3">
                  <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Full Name" required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#006B3F] rounded-xl text-[#0A1628] placeholder:text-gray-300 focus:outline-none transition-colors" />
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" required
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#006B3F] rounded-xl text-[#0A1628] placeholder:text-gray-300 focus:outline-none transition-colors" />
                </div>

                <button type="submit" disabled={!amount || amount <= 0}
                  className="w-full py-4 bg-gradient-to-r from-[#006B3F] to-[#004D2C] hover:from-[#004D2C] hover:to-[#006B3F] disabled:opacity-40 disabled:cursor-not-allowed text-white font-black text-base rounded-xl transition-all hover:shadow-2xl hover:shadow-[#006B3F]/40 hover:-translate-y-0.5 flex items-center justify-center gap-2">
                  <Heart size={18} />
                  Donate ${amount || "0"} via Paynow
                  <ExternalLink size={14} />
                </button>

                <p className="text-gray-400 text-xs text-center">Payments processed securely through Paynow Zimbabwe.</p>
              </form>
            )}
          </div>

          {/* Impact */}
          <div className="space-y-6">
            <div className="bg-white border border-[#006B3F]/20 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#006B3F]/10 rounded-full flex items-center justify-center">
                  <Shield size={18} className="text-[#006B3F]" />
                </div>
                <div>
                  <h3 className="text-[#0A1628] font-bold">Trusted & Transparent</h3>
                  <p className="text-gray-400 text-xs">Registered under Sports & Recreation Commission</p>
                </div>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed">
                100% of your donation goes directly to player development, match operations, and grassroots rugby programs across Zimbabwe.
              </p>
            </div>

            <div>
              <h3 className="text-[#0A1628] font-bold mb-4">Your Impact</h3>
              <div className="space-y-3">
                {IMPACT_ITEMS.map(({ icon: Icon, amount, description }, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
                    <div className="w-10 h-10 bg-[#006B3F]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon size={18} className="text-[#006B3F]" />
                    </div>
                    <div>
                      <span className="text-[#006B3F] font-black text-sm">{amount}</span>
                      <span className="text-gray-500 text-sm"> — {description}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
