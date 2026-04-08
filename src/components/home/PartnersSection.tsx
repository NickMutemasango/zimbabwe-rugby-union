"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const PARTNERS = [
  { name: "CFAO Mobility", category: "Mobility Partner", placeholder: true },
  { name: "IntaChem", category: "Official Sponsor", placeholder: true },
  { name: "Nedbank", category: "Banking Partner", placeholder: true },
  { name: "Sable Lager", category: "Beverage Partner", placeholder: true },
  { name: "Alliance Health", category: "Health Partner", placeholder: true },
  { name: "Your Brand Here", category: "Become a Partner", placeholder: true },
];

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
          <p className="text-[#006B3F] text-xs font-bold tracking-[0.3em] uppercase mb-3">Supporting Zimbabwe Rugby</p>
          <h2 className="text-4xl sm:text-5xl font-black text-[#0A1628]">Our Partners &amp; Sponsors</h2>
          <p className="text-gray-400 mt-4 max-w-xl mx-auto text-sm">
            We are proud to partner with organisations that share our vision of growing rugby in Zimbabwe and across Africa.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5">
          {PARTNERS.map((partner, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className={`group relative flex flex-col items-center justify-center gap-3 rounded-2xl border-2 p-6 aspect-square transition-all hover:-translate-y-1 hover:shadow-xl ${
                partner.name === "Your Brand Here"
                  ? "border-dashed border-[#006B3F]/30 hover:border-[#006B3F]/60 bg-[#006B3F]/3 cursor-pointer"
                  : "border-gray-100 hover:border-[#006B3F]/30 bg-gray-50/50 hover:bg-white"
              }`}
            >
              {/* Logo placeholder */}
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-black text-lg ${
                partner.name === "Your Brand Here"
                  ? "bg-[#006B3F]/10 text-[#006B3F]"
                  : "bg-[#0A1628]/8 text-[#0A1628]/40"
              }`}>
                {partner.name === "Your Brand Here" ? "+" : partner.name.slice(0, 2).toUpperCase()}
              </div>
              <div className="text-center">
                <p className={`font-bold text-xs leading-tight ${
                  partner.name === "Your Brand Here" ? "text-[#006B3F]" : "text-[#0A1628]"
                }`}>
                  {partner.name}
                </p>
                <p className="text-gray-400 text-[10px] mt-0.5">{partner.category}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-10"
        >
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
