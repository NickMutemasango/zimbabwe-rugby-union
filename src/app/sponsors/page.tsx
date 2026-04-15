"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

// ─── Logo components (enlarged for sponsors page) ─────────────────────────────

function CfaoLogo({ size = "lg" }: { size?: "lg" | "md" | "sm" }) {
  const scale = size === "lg" ? "text-4xl gap-2.5" : size === "md" ? "text-2xl gap-2" : "text-xl gap-1.5";
  const dotSize = size === "lg" ? "w-5 h-5" : size === "md" ? "w-4 h-4" : "w-3 h-3";
  const sub = size === "lg" ? "text-xs" : "text-[9px]";
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className={`flex items-center ${scale}`}>
        <div className={`${dotSize} rounded-full bg-red-500 shadow-sm flex-shrink-0`} />
        <span className={`font-black ${scale} text-gray-800 tracking-tight leading-none`}>cfao</span>
      </div>
      <span className={`${sub} font-bold text-gray-400 tracking-[0.18em] uppercase`}>Mobility</span>
    </div>
  );
}

function NedbankLogo({ size = "lg" }: { size?: "lg" | "md" | "sm" }) {
  const boxSize = size === "lg" ? "w-16 h-16" : size === "md" ? "w-12 h-12" : "w-10 h-10";
  const textSize = size === "lg" ? "text-4xl" : size === "md" ? "text-2xl" : "text-xl";
  const sub = size === "lg" ? "text-xs" : "text-[9px]";
  return (
    <div className="flex flex-col items-center gap-2">
      <div className={`${boxSize} rounded-xl bg-[#007A4D] flex items-center justify-center shadow-lg`}>
        <span className={`text-white font-black ${textSize} leading-none`} style={{ fontFamily: "serif" }}>N</span>
      </div>
      <span className={`${sub} font-black text-[#007A4D] tracking-[0.2em] uppercase`}>Nedbank</span>
    </div>
  );
}

function IntaChemLogo({ size = "lg" }: { size?: "lg" | "md" | "sm" }) {
  const letters = size === "lg" ? "text-xs" : "text-[8px]";
  const main = size === "lg" ? "text-2xl" : size === "md" ? "text-base" : "text-sm";
  const sub = size === "lg" ? "text-[10px]" : "text-[8px]";
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-end gap-0.5">
        <div className="flex flex-col text-right leading-none">
          {["I", "N", "T", "R", "A"].map((l, i) => (
            <span key={i} className={`${letters} font-black text-gray-700 leading-tight`}>{l}</span>
          ))}
        </div>
        <span className={`font-black ${main} text-[#006B3F] leading-none tracking-tighter mb-0.5`}>CHEM</span>
      </div>
      <span className={`${sub} text-gray-400 tracking-widest uppercase font-medium`}>Holdings</span>
    </div>
  );
}

function SableLagerLogo({ size = "lg" }: { size?: "lg" | "md" | "sm" }) {
  const circleSize = size === "lg" ? "w-16 h-16" : size === "md" ? "w-12 h-12" : "w-10 h-10";
  const mainText = size === "lg" ? "text-sm" : "text-[10px]";
  const subText = size === "lg" ? "text-[9px]" : "text-[7px]";
  return (
    <div className={`relative ${circleSize} rounded-full border-2 border-amber-800 bg-gradient-to-b from-amber-500 to-amber-700 flex flex-col items-center justify-center shadow-lg`}>
      <span className={`text-white font-black ${mainText} leading-none tracking-wide`}>SABLE</span>
      <span className={`text-amber-200 ${subText} font-bold leading-none tracking-widest mt-0.5`}>LAGER</span>
    </div>
  );
}

function AllianceHealthLogo({ size = "lg" }: { size?: "lg" | "md" | "sm" }) {
  const crossSize = size === "lg" ? "w-7 h-7" : size === "md" ? "w-5 h-5" : "w-4 h-4";
  const bar = size === "lg" ? "h-2" : "h-1.5";
  const name = size === "lg" ? "text-xl" : size === "md" ? "text-sm" : "text-xs";
  const sub = size === "lg" ? "text-xs" : "text-[9px]";
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="flex items-center gap-2">
        <div className={`relative ${crossSize} flex-shrink-0`}>
          <div className={`absolute inset-x-0 top-1/2 -translate-y-1/2 ${bar} rounded-sm bg-red-500`} />
          <div className={`absolute inset-y-0 left-1/2 -translate-x-1/2 w-2 rounded-sm bg-red-500`} />
        </div>
        <span className={`font-black ${name} text-[#1a3a6b] leading-none tracking-tight`}>Alliance</span>
      </div>
      <span className={`${sub} font-bold text-red-500 tracking-[0.15em] uppercase`}>Health</span>
    </div>
  );
}

// ─── Tier data ────────────────────────────────────────────────────────────────
const TIERS = [
  {
    id: "premium",
    name: "Premium Global Partner",
    description: "Our flagship partner — integral to Zimbabwe Rugby's national programme.",
    cols: "grid-cols-1 sm:grid-cols-1 max-w-sm mx-auto",
    cardPad: "p-12",
    logoSize: "lg" as const,
    accent: "border-[#D4AF37]/40 bg-gradient-to-br from-[#D4AF37]/5 to-white",
    badgeBg: "bg-[#D4AF37]/10 text-[#92740A]",
    partners: [
      { id: "cfao", name: "CFAO Mobility", website: "#", Logo: CfaoLogo },
    ],
  },
  {
    id: "global",
    name: "Global Partners",
    description: "Strategic partners supporting our international and domestic programme.",
    cols: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 max-w-2xl mx-auto",
    cardPad: "p-10",
    logoSize: "md" as const,
    accent: "border-gray-200 bg-white hover:border-[#006B3F]/30",
    badgeBg: "bg-[#006B3F]/10 text-[#006B3F]",
    partners: [
      { id: "nedbank", name: "Nedbank", website: "#", Logo: NedbankLogo },
      { id: "intachem", name: "IntaChem Holdings", website: "#", Logo: IntaChemLogo },
    ],
  },
  {
    id: "supporters",
    name: "Supporters & Suppliers",
    description: "Organisations providing essential support to our teams and operations.",
    cols: "grid-cols-2 sm:grid-cols-2 lg:grid-cols-4",
    cardPad: "p-7",
    logoSize: "sm" as const,
    accent: "border-gray-100 bg-gray-50/60 hover:border-gray-200 hover:bg-white",
    badgeBg: "bg-gray-100 text-gray-500",
    partners: [
      { id: "sable-lager", name: "Sable Lager", website: "#", Logo: SableLagerLogo },
      { id: "alliance", name: "Alliance Health", website: "#", Logo: AllianceHealthLogo },
    ],
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function SponsorsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-[#0A1628] pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#006B3F]/20 to-transparent" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ label: "Partners & Sponsors" }]} />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-6">
            <p className="text-[#006B3F] text-xs font-bold tracking-[0.3em] uppercase mb-3">Supporting Zimbabwe Rugby</p>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">
              Partners &amp; <span className="text-[#006B3F]">Sponsors</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl mb-8">
              We are proud to work alongside organisations that share our vision of growing rugby in Zimbabwe and across Africa.
            </p>
            <Link
              href="/contact?department=sponsorship"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#006B3F] hover:bg-[#004D2C] text-white font-bold rounded-xl transition-all text-sm hover:shadow-lg hover:shadow-[#006B3F]/40"
            >
              Become a Partner
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Tier sections */}
      <div className="py-20 space-y-20">
        {TIERS.map((tier, ti) => (
          <motion.section
            key={tier.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: ti * 0.1 }}
          >
            {/* Tier header */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
              <div className="flex items-center gap-4 mb-2">
                <div className="h-px flex-1 bg-gray-100" />
                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.2em] ${tier.badgeBg}`}>
                  {tier.name}
                </span>
                <div className="h-px flex-1 bg-gray-100" />
              </div>
              <p className="text-center text-gray-400 text-sm">{tier.description}</p>
            </div>

            {/* Partner cards */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className={`grid ${tier.cols} gap-6`}>
                {tier.partners.map((p, pi) => (
                  <motion.a
                    key={p.id}
                    href={p.website}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: pi * 0.08 }}
                    className={`group flex flex-col items-center justify-center rounded-2xl border-2 transition-all hover:-translate-y-1 hover:shadow-xl ${tier.cardPad} ${tier.accent}`}
                  >
                    <div className="flex items-center justify-center h-24 w-full">
                      <p.Logo size={tier.logoSize} />
                    </div>
                    <p className="mt-4 text-[#0A1628] font-bold text-sm text-center">{p.name}</p>
                    <p className="text-gray-400 text-xs mt-1 group-hover:text-[#006B3F] transition-colors">Visit website →</p>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.section>
        ))}

        {/* Become a partner CTA */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="relative rounded-3xl bg-[#0A1628] overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#006B3F]/30 to-transparent" />
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />
            <div className="relative px-8 py-16 text-center">
              <p className="text-[#006B3F] text-xs font-bold tracking-[0.3em] uppercase mb-3">Join Our Family</p>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">Become a Partner</h2>
              <p className="text-white/60 max-w-lg mx-auto mb-8 text-sm leading-relaxed">
                Partner with Zimbabwe Rugby Union and connect your brand to a passionate nation of rugby supporters. From grassroots to international level, your investment drives the game forward.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  href="/contact?department=sponsorship"
                  className="px-8 py-4 bg-[#006B3F] hover:bg-[#004D2C] text-white font-black rounded-xl transition-all hover:shadow-xl hover:shadow-[#006B3F]/40 hover:-translate-y-0.5"
                >
                  Get in Touch
                </Link>
                <Link
                  href="/contact"
                  className="px-8 py-4 border-2 border-white/20 text-white hover:bg-white/5 font-bold rounded-xl transition-all"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
