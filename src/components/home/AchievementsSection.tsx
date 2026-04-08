"use client";
import { motion } from "framer-motion";
import { Trophy, Star, Shield, Globe } from "lucide-react";

const ACHIEVEMENTS = [
  {
    year: "1987",
    title: "Inaugural Rugby World Cup",
    description: "Zimbabwe proudly represented Africa at the very first Rugby World Cup in New Zealand & Australia.",
    icon: Globe,
    type: "milestone",
  },
  {
    year: "1991",
    title: "Rugby World Cup Qualification",
    description: "The Sables qualified for the 1991 Rugby World Cup held in the UK, Ireland & France.",
    icon: Globe,
    type: "milestone",
  },
  {
    year: "1995",
    title: "Rugby World Cup — South Africa",
    description: "Zimbabwe featured at a third consecutive Rugby World Cup on home soil in South Africa.",
    icon: Globe,
    type: "milestone",
  },
  {
    year: "2001",
    title: "Africa Cup Champions",
    description: "Zimbabwe claimed the Africa Cup title, cementing their status as one of the continent's top rugby nations.",
    icon: Trophy,
    type: "trophy",
  },
  {
    year: "2023",
    title: "Africa Cup Division 1A",
    description: "The Sables competed at the highest tier of African rugby, showing renewed strength on the continent.",
    icon: Shield,
    type: "achievement",
  },
  {
    year: "2026",
    title: "World Rugby Nations Cup",
    description: "Zimbabwe qualifies for the World Rugby Nations Cup, facing Tonga, USA, and Canada in the Americas.",
    icon: Star,
    type: "upcoming",
  },
];

const TYPE_STYLES: Record<string, string> = {
  trophy:      "bg-[#D4AF37]/20 border-[#D4AF37]/40 text-[#D4AF37]",
  milestone:   "bg-[#006B3F]/20 border-[#006B3F]/40 text-[#4ade80]",
  achievement: "bg-blue-500/20 border-blue-500/40 text-blue-400",
  upcoming:    "bg-purple-500/20 border-purple-500/40 text-purple-400",
};

const ICON_BG: Record<string, string> = {
  trophy:      "bg-[#D4AF37]/15 text-[#D4AF37]",
  milestone:   "bg-[#006B3F]/20 text-[#4ade80]",
  achievement: "bg-blue-500/15 text-blue-400",
  upcoming:    "bg-purple-500/15 text-purple-400",
};

export default function AchievementsSection() {
  return (
    <section className="py-20 bg-[#050D1A] relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: "radial-gradient(circle at 50% 50%, #006B3F 1px, transparent 1px)", backgroundSize: "40px 40px" }}
      />
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-30" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-3">A Legacy of Excellence</p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">Our Achievements</h2>
          <p className="text-white/40 mt-4 max-w-xl mx-auto text-sm">
            From Rugby World Cup appearances to continental championships — the Sables have a proud history.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Center line (desktop) */}
          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#006B3F]/40 to-transparent -translate-x-1/2" />

          <div className="space-y-8 lg:space-y-0">
            {ACHIEVEMENTS.map((item, i) => {
              const Icon = item.icon;
              const isLeft = i % 2 === 0;

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className={`lg:grid lg:grid-cols-2 lg:gap-12 lg:mb-12 ${isLeft ? "" : "lg:direction-rtl"}`}
                >
                  {/* Card */}
                  <div className={`${isLeft ? "lg:col-start-1 lg:text-right" : "lg:col-start-2"}`}>
                    <div className={`inline-block bg-[#0A1628] border rounded-2xl p-5 max-w-sm ${
                      isLeft ? "lg:ml-auto" : "lg:mr-auto"
                    } border-white/8 hover:border-[#006B3F]/30 transition-colors group`}>
                      <div className={`flex items-center gap-3 mb-3 ${isLeft ? "lg:flex-row-reverse" : ""}`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${ICON_BG[item.type]}`}>
                          <Icon size={18} />
                        </div>
                        <span className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${TYPE_STYLES[item.type]}`}>
                          {item.year}
                        </span>
                      </div>
                      <h3 className="text-white font-black text-base mb-2 leading-tight">{item.title}</h3>
                      <p className="text-white/40 text-sm leading-relaxed">{item.description}</p>
                    </div>
                  </div>

                  {/* Dot on timeline (desktop) */}
                  <div className="hidden lg:flex items-start justify-center absolute left-1/2 -translate-x-1/2" style={{ marginTop: "1.25rem" }}>
                    <div className="w-3 h-3 rounded-full bg-[#006B3F] border-2 border-[#050D1A] ring-2 ring-[#006B3F]/40" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
