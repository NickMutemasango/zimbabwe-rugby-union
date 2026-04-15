"use client";
import { motion } from "framer-motion";
import Link from "next/link";

// ─── Brand-styled logo components ────────────────────────────────────────────

function CfaoLogo() {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-1.5">
        <div className="w-3.5 h-3.5 rounded-full bg-red-500 shadow-sm" />
        <span className="font-black text-xl text-gray-800 tracking-tight leading-none">cfao</span>
      </div>
      <span className="text-[9px] font-bold text-gray-400 tracking-[0.18em] uppercase">Mobility</span>
    </div>
  );
}

function NedbankLogo() {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="w-11 h-11 rounded-lg bg-[#007A4D] flex items-center justify-center shadow-md">
        <span className="text-white font-black text-2xl leading-none" style={{ fontFamily: "serif" }}>N</span>
      </div>
      <span className="text-[9px] font-black text-[#007A4D] tracking-[0.2em] uppercase">Nedbank</span>
    </div>
  );
}

function SableLagerLogo() {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="relative w-12 h-12 rounded-full border-2 border-amber-800 bg-gradient-to-b from-amber-500 to-amber-700 flex flex-col items-center justify-center shadow-md">
        <span className="text-white font-black text-[10px] leading-none tracking-wide">SABLE</span>
        <span className="text-amber-200 text-[7px] font-bold leading-none tracking-widest mt-0.5">LAGER</span>
      </div>
    </div>
  );
}

function IntaChemLogo() {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-end gap-0.5">
        <div className="flex flex-col text-right leading-none">
          {["I", "N", "T", "R", "A"].map((l, i) => (
            <span key={i} className="text-[8px] font-black text-gray-700 leading-tight">{l}</span>
          ))}
        </div>
        <span className="font-black text-base text-[#006B3F] leading-none tracking-tighter mb-0.5">CHEM</span>
      </div>
      <span className="text-[8px] text-gray-400 tracking-widest uppercase font-medium">Holdings</span>
    </div>
  );
}

function AllianceHealthLogo() {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="flex items-center gap-1">
        {/* Cross symbol */}
        <div className="relative w-5 h-5 flex-shrink-0">
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-1.5 rounded-sm bg-red-500" />
          <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-1.5 rounded-sm bg-red-500" />
        </div>
        <span className="font-black text-sm text-[#1a3a6b] leading-none tracking-tight">Alliance</span>
      </div>
      <span className="text-[9px] font-bold text-red-500 tracking-[0.15em] uppercase">Health</span>
    </div>
  );
}

function BePartnerLogo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-10 h-10 rounded-xl bg-[#006B3F]/10 border-2 border-dashed border-[#006B3F]/30 flex items-center justify-center">
        <span className="text-[#006B3F] text-xl font-black leading-none">+</span>
      </div>
      <span className="text-[10px] font-bold text-[#006B3F] text-center leading-tight">Your Brand<br />Here</span>
    </div>
  );
}

// ─── Partner data — 4 featured sponsors (full list at /sponsors) ──────────────
const PARTNERS = [
  {
    id: "cfao",
    name: "CFAO Mobility",
    category: "Mobility Partner",
    LogoComponent: CfaoLogo,
    href: "#",
    hoverBorder: "hover:border-red-200",
    hoverShadow: "hover:shadow-red-100/80",
  },
  {
    id: "intachem",
    name: "IntaChem",
    category: "Official Sponsor",
    LogoComponent: IntaChemLogo,
    href: "#",
    hoverBorder: "hover:border-green-200",
    hoverShadow: "hover:shadow-green-100/80",
  },
  {
    id: "nedbank",
    name: "Nedbank",
    category: "Banking Partner",
    LogoComponent: NedbankLogo,
    href: "#",
    hoverBorder: "hover:border-emerald-200",
    hoverShadow: "hover:shadow-emerald-100/80",
  },
  {
    id: "sable-lager",
    name: "Sable Lager",
    category: "Beverage Partner",
    LogoComponent: SableLagerLogo,
    href: "#",
    hoverBorder: "hover:border-amber-200",
    hoverShadow: "hover:shadow-amber-100/80",
  },
];

// ─── Section ──────────────────────────────────────────────────────────────────
export default function PartnersSection() {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#006B3F] to-transparent opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <p className="text-[#006B3F] text-xs font-bold tracking-[0.3em] uppercase mb-3">
            Supporting Zimbabwe Rugby
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-[#0A1628]">
            Our Partners &amp; Sponsors
          </h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm">
            We are proud to partner with organisations that share our vision of growing rugby in Zimbabwe and across Africa.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PARTNERS.map((p, i) => {
            const Logo = p.LogoComponent;
            return (
              <div key={p.id}>
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className={`group flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-8 aspect-square transition-all hover:-translate-y-1 hover:shadow-xl border-gray-100 ${p.hoverBorder} bg-gray-50/50 hover:bg-white ${p.hoverShadow}`}
                >
                  <Logo />
                  <p className="text-[10px] text-gray-400 font-medium tracking-wide uppercase">{p.category}</p>
                </motion.div>
              </div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10"
        >
          <Link
            href="/sponsors"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#006B3F] hover:bg-[#004D2C] text-white font-bold rounded-xl transition-all text-sm hover:shadow-lg hover:shadow-[#006B3F]/30"
          >
            View All Partners
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 border-2 border-[#006B3F] text-[#006B3F] hover:bg-[#006B3F] hover:text-white font-bold rounded-xl transition-all text-sm"
          >
            Become a Partner
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
