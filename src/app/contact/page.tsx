"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, Facebook, Twitter, Instagram, Youtube } from "lucide-react";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

const CONTACT_INFO = [
  {
    icon: MapPin,
    label: "Address",
    value: "36 Walmer Drive, Harare, Zimbabwe",
    sub: "Head Office",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+263 789 199 906",
    sub: "Mon – Fri, 8:00 AM – 5:00 PM",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@zru.co.zw",
    sub: "General enquiries",
  },
  {
    icon: Clock,
    label: "Office Hours",
    value: "Mon – Fri: 8:00 AM – 5:00 PM",
    sub: "Central Africa Time",
  },
];

const DEPARTMENTS = [
  { label: "General Enquiries", value: "general" },
  { label: "Media & Press", value: "media" },
  { label: "Player Development", value: "development" },
  { label: "Sponsorship & Partnerships", value: "sponsorship" },
  { label: "Match Ticketing", value: "ticketing" },
  { label: "Club Affiliation", value: "clubs" },
];

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", department: "general", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  const inputClass = "w-full px-4 py-3 bg-gray-50 border border-gray-200 focus:border-[#006B3F] rounded-xl text-[#0A1628] placeholder:text-gray-300 focus:outline-none transition-colors text-sm";

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="relative bg-[#0A1628] pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#006B3F]/20 to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumbs crumbs={[{ label: "Contact" }]} />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="mt-6">
            <p className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-3">Get in Touch</p>
            <h1 className="text-5xl sm:text-6xl font-black text-white mb-4">Contact <span className="text-[#006B3F]">ZRU</span></h1>
            <p className="text-white/60 text-lg max-w-2xl">Have a question, media enquiry, or want to partner with us? We&apos;d love to hear from you.</p>
          </motion.div>
        </div>
      </div>

      {/* Contact grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Left: Info cards + socials */}
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {CONTACT_INFO.map(({ icon: Icon, label, value, sub }, i) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="bg-white border border-gray-100 rounded-2xl p-5 hover:border-[#006B3F]/30 hover:shadow-lg hover:shadow-[#006B3F]/10 transition-all"
                  >
                    <div className="w-10 h-10 bg-[#006B3F]/10 rounded-xl flex items-center justify-center mb-3">
                      <Icon size={18} className="text-[#006B3F]" />
                    </div>
                    <p className="text-[#006B3F] text-[10px] font-bold uppercase tracking-widest mb-1">{label}</p>
                    <p className="text-[#0A1628] font-bold text-sm leading-snug">{value}</p>
                    <p className="text-gray-400 text-xs mt-0.5">{sub}</p>
                  </motion.div>
                ))}
              </div>

              {/* Map placeholder */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-[#006B3F]/10 to-[#0A1628]/5 border border-gray-100 rounded-2xl h-48 flex items-center justify-center overflow-hidden relative"
              >
                <div className="text-center">
                  <MapPin size={32} className="text-[#006B3F] mx-auto mb-2" />
                  <p className="text-[#0A1628] font-bold text-sm">Zimbabwe Rugby Union</p>
                  <p className="text-gray-400 text-xs">36 Walmer Drive, Harare</p>
                  <a
                    href="https://maps.google.com/?q=36+Walmer+Drive+Harare+Zimbabwe"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 px-4 py-2 bg-[#006B3F] text-white text-xs font-bold rounded-lg hover:bg-[#004D2C] transition-colors"
                  >
                    Open in Google Maps
                  </a>
                </div>
              </motion.div>

              {/* Social links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-[#0A1628] rounded-2xl p-6"
              >
                <p className="text-white font-bold mb-4">Follow the Sables</p>
                <div className="grid grid-cols-4 gap-3">
                  {[
                    { icon: Facebook, label: "Facebook", handle: "@ZimRugby" },
                    { icon: Twitter, label: "Twitter/X", handle: "@ZimSables" },
                    { icon: Instagram, label: "Instagram", handle: "@zimbabwe_rugby" },
                    { icon: Youtube, label: "YouTube", handle: "ZRU Official" },
                  ].map(({ icon: Icon, label, handle }) => (
                    <a
                      key={label}
                      href="#"
                      className="flex flex-col items-center gap-2 p-3 bg-white/5 hover:bg-[#006B3F]/30 rounded-xl transition-all group"
                    >
                      <Icon size={20} className="text-white/60 group-hover:text-white transition-colors" />
                      <span className="text-white/40 text-[10px] text-center leading-tight group-hover:text-white/70">{handle}</span>
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right: Contact form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              {sent ? (
                <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center shadow-sm h-full flex flex-col items-center justify-center">
                  <div className="w-16 h-16 bg-[#006B3F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-[#006B3F]" />
                  </div>
                  <h3 className="text-[#0A1628] font-black text-2xl mb-2">Message Sent!</h3>
                  <p className="text-gray-500 mb-6">Thank you for reaching out. Our team will get back to you within 2 business days.</p>
                  <button onClick={() => setSent(false)} className="px-6 py-3 bg-[#006B3F] text-white rounded-xl font-bold hover:bg-[#004D2C] transition-colors">
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-8 shadow-sm space-y-5">
                  <h2 className="text-[#0A1628] font-black text-xl mb-2">Send Us a Message</h2>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-600 text-sm font-medium block mb-1.5">Full Name *</label>
                      <input type="text" required placeholder="Your full name" value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className={inputClass} />
                    </div>
                    <div>
                      <label className="text-gray-600 text-sm font-medium block mb-1.5">Email Address *</label>
                      <input type="email" required placeholder="your@email.com" value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        className={inputClass} />
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-600 text-sm font-medium block mb-1.5">Department</label>
                    <div className="relative">
                      <select value={form.department} onChange={e => setForm(f => ({ ...f, department: e.target.value }))}
                        className={inputClass + " appearance-none pr-10"}>
                        {DEPARTMENTS.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400 text-xs">▼</div>
                    </div>
                  </div>

                  <div>
                    <label className="text-gray-600 text-sm font-medium block mb-1.5">Subject *</label>
                    <input type="text" required placeholder="Brief subject of your message" value={form.subject}
                      onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      className={inputClass} />
                  </div>

                  <div>
                    <label className="text-gray-600 text-sm font-medium block mb-1.5">Message *</label>
                    <textarea required rows={5} placeholder="Write your message here..." value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      className={inputClass + " resize-none"} />
                  </div>

                  <button type="submit"
                    className="w-full py-4 bg-[#006B3F] hover:bg-[#004D2C] text-white font-black rounded-xl transition-all hover:shadow-xl hover:shadow-[#006B3F]/30 hover:-translate-y-0.5 flex items-center justify-center gap-2">
                    <Send size={16} />
                    Send Message
                  </button>

                  <p className="text-gray-400 text-xs text-center">We typically respond within 2 business days.</p>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
