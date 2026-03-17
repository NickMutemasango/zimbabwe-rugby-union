"use client";
import { motion } from "framer-motion";
import { Shield, Trophy, Users, Globe, Award, ChevronRight } from "lucide-react";
import Link from "next/link";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const MILESTONES = [
  { year: "1895", event: "Zimbabwe Rugby Union founded, one of Africa's oldest rugby unions." },
  { year: "1983", event: "Zimbabwe qualifies for the inaugural Rugby World Cup in 1987." },
  { year: "1987", event: "The Sables compete at the Rugby World Cup in New Zealand & Australia." },
  { year: "1991", event: "Second Rugby World Cup appearance — defeating Spain in the pool stages." },
  { year: "1999", event: "Third Rugby World Cup qualification, competing in Europe." },
  { year: "2024", event: "ZRU launches ambitious national development program targeting grassroots growth." },
  { year: "2025", event: "Sables compete in Rugby Africa Cup with eyes on World Cup 2027 qualification." },
];

const LEADERSHIP = [
  { name: "Aaron Jani", role: "President", initials: "AJ" },
  { name: "Brenda Mudzimuirema", role: "CEO", initials: "BM" },
  { name: "Brendan Dawson", role: "Head Coach", initials: "BD" },
  { name: "Kevin Dube", role: "Director of Rugby", initials: "KD" },
];

const VALUES = [
  { icon: Shield, title: "Integrity", description: "We uphold the highest standards of ethics, fair play, and transparency in everything we do." },
  { icon: Users, title: "Inclusion", description: "Rugby is for everyone. We actively develop the game across all communities in Zimbabwe." },
  { icon: Trophy, title: "Excellence", description: "We strive for podium performance on and off the field, setting high standards at every level." },
  { icon: Globe, title: "Unity", description: "The Sables represent all of Zimbabwe — one nation, one team, one pride." },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-[#0A1628] pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#006B3F]/30 to-transparent" />
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full translate-x-1/2 -translate-y-1/2" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ label: "About" }]} />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-6 max-w-3xl">
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-3">Who We Are</p>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-5 leading-tight">
              About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#006B3F] to-[#D4AF37]">Zimbabwe Rugby</span>
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              The Zimbabwe Rugby Union (ZRU) is the governing body for rugby union in Zimbabwe, responsible for developing and promoting the sport at all levels — from grassroots schools rugby to the national Sables team.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                label: "Our Mission",
                icon: "🎯",
                text: "To develop, promote and administer rugby union in Zimbabwe at all levels, creating a sustainable pathway from grassroots participation to international excellence.",
                bg: "bg-[#006B3F]",
              },
              {
                label: "Our Vision",
                icon: "🌍",
                text: "To be a world-class rugby nation that consistently qualifies for — and competes at — Rugby World Cups, while growing the sport to every corner of Zimbabwe.",
                bg: "bg-[#0A1628]",
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`${item.bg} rounded-2xl p-8 text-white`}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-black mb-3 text-[#D4AF37]">{item.label}</h3>
                <p className="text-white/70 leading-relaxed">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-[#006B3F] text-xs font-bold tracking-[0.3em] uppercase mb-3">What Drives Us</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0A1628]">Our Core Values</h2>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 text-center hover:border-[#006B3F]/30 hover:shadow-lg hover:shadow-[#006B3F]/10 transition-all hover:-translate-y-1"
              >
                <div className="w-14 h-14 bg-[#006B3F]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon size={24} className="text-[#006B3F]" />
                </div>
                <h3 className="text-[#0A1628] font-black text-lg mb-2">{title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* History Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-[#006B3F] text-xs font-bold tracking-[0.3em] uppercase mb-3">Our Journey</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0A1628]">History & Milestones</h2>
          </motion.div>
          <div className="relative">
            <div className="absolute left-[28px] top-0 bottom-0 w-px bg-gray-200" />
            <div className="space-y-8">
              {MILESTONES.map((m, i) => (
                <motion.div
                  key={m.year}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex gap-6"
                >
                  <div className="w-14 h-14 bg-[#006B3F] rounded-full flex items-center justify-center flex-shrink-0 border-4 border-white shadow-md z-10">
                    <span className="text-white font-black text-[10px] text-center leading-none">{m.year}</span>
                  </div>
                  <div className="bg-white border border-gray-100 rounded-2xl p-5 flex-1 shadow-sm">
                    <p className="text-[#006B3F] font-black text-sm mb-1">{m.year}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">{m.event}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-[#006B3F] text-xs font-bold tracking-[0.3em] uppercase mb-3">The People Behind the Sables</p>
            <h2 className="text-4xl sm:text-5xl font-black text-[#0A1628]">Leadership Team</h2>
          </motion.div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERSHIP.map((person, i) => (
              <motion.div
                key={person.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white border border-gray-100 rounded-2xl p-6 text-center hover:border-[#006B3F]/30 hover:shadow-lg transition-all"
              >
                <div className="w-16 h-16 bg-[#0A1628] rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#D4AF37]">
                  <span className="text-[#D4AF37] font-black text-lg">{person.initials}</span>
                </div>
                <h3 className="text-[#0A1628] font-bold text-base mb-1">{person.name}</h3>
                <p className="text-[#006B3F] text-xs font-bold uppercase tracking-wide">{person.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0A1628]">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-black text-white mb-4">Be Part of the Journey</h2>
          <p className="text-white/60 mb-8">Support Zimbabwe rugby and help the Sables reach new heights.</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/donate" className="px-8 py-4 bg-[#006B3F] hover:bg-[#004D2C] text-white font-bold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#006B3F]/30 flex items-center gap-2">
              Support the Sables <ChevronRight size={16} />
            </Link>
            <Link href="/contact" className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white font-bold rounded-xl transition-all border border-white/20">
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
