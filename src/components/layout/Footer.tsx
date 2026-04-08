import Link from "next/link";
import { Twitter, Facebook, Instagram, Youtube, Mail, Phone, MapPin, Link2 } from "lucide-react";
import { ZRULogo } from "@/components/shared/ZRULogo";

export default function Footer() {
  return (
    <footer className="bg-[#050D1A] border-t border-[#006B3F]/30">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-5">
              <ZRULogo size={48} />
              <div>
                <div className="text-white font-black text-base leading-none">ZIMBABWE</div>
                <div className="text-[#D4AF37] text-[10px] tracking-[0.2em] font-bold uppercase">Rugby Union</div>
              </div>
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-5">
              The official governing body of rugby union in Zimbabwe. Developing the game from grassroots to international level.
            </p>
            <div className="flex gap-3 flex-wrap">
              {[Twitter, Facebook, Instagram, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="w-9 h-9 bg-white/5 hover:bg-[#006B3F] border border-white/10 hover:border-[#006B3F] rounded-lg flex items-center justify-center text-white/50 hover:text-white transition-all">
                  <Icon size={16} />
                </a>
              ))}
              <a
                href="https://linktr.ee/ZRUSables"
                target="_blank"
                rel="noopener noreferrer"
                title="Official Links (Linktree)"
                className="w-9 h-9 bg-white/5 hover:bg-[#39E09B] border border-white/10 hover:border-[#39E09B] rounded-lg flex items-center justify-center text-white/50 hover:text-white transition-all"
              >
                <Link2 size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", href: "/" },
                { label: "Our Team", href: "/teams" },
                { label: "Fixtures", href: "/matches#fixtures" },
                { label: "Results", href: "/matches#results" },
                { label: "News", href: "/news" },
                { label: "Articles", href: "/articles" },
              ].map((item) => (
                <li key={item.label}>
                  <Link href={item.href} className="text-white/50 hover:text-[#D4AF37] text-sm transition-colors">{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/50 text-sm">
                <MapPin size={16} className="mt-0.5 text-[#006B3F] flex-shrink-0" />
                <span>93 Leopold Takawira Ave, Harare, Zimbabwe</span>
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <Phone size={16} className="text-[#006B3F] flex-shrink-0" />
                <span>+263 4 251 280</span>
              </li>
              <li className="flex items-center gap-3 text-white/50 text-sm">
                <Mail size={16} className="text-[#006B3F] flex-shrink-0" />
                <a href="mailto:info@zru.co.zw" className="hover:text-[#D4AF37] transition-colors">info@zru.co.zw</a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Stay Updated</h3>
            <p className="text-white/50 text-sm mb-4">Get the latest Sables news direct to your inbox.</p>
            <form className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-[#006B3F]"
              />
              <button className="px-4 py-2.5 bg-[#006B3F] hover:bg-[#004D2C] text-white text-sm font-bold rounded-lg transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs">© {new Date().getFullYear()} Zimbabwe Rugby Union. All rights reserved.</p>
          <div className="flex gap-4">
            {["Privacy Policy", "Terms of Use", "Cookies"].map((item) => (
              <Link key={item} href="#" className="text-white/30 hover:text-white/60 text-xs transition-colors">{item}</Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
