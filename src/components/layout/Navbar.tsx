"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Our Team", href: "/teams" },
  {
    label: "Matches",
    href: "#",
    children: [
      { label: "Fixtures", href: "/matches#fixtures" },
      { label: "Results", href: "/matches#results" },
    ],
  },
  { label: "News", href: "/news" },
  { label: "Articles & PDFs", href: "/articles" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const [scrolled, setScrolled] = useState(!isHome);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    // Non-home pages are always "solid" — reset state when route changes
    if (!isHome) {
      setScrolled(true);
      return;
    }
    setScrolled(window.scrollY > 60);
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [isHome]);

  // solid = white navbar; transparent = hero overlay mode (home only)
  const solid = scrolled || !isHome;

  const logoTextColor = solid ? "text-[#0A1628]" : "text-white";
  const logoSubColor  = solid ? "text-[#006B3F]"  : "text-[#D4AF37]";
  const linkColor     = solid ? "text-gray-600 hover:text-[#006B3F]" : "text-white/80 hover:text-white";
  const linkHoverBg   = solid ? "hover:bg-gray-50" : "hover:bg-white/5";

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        solid
          ? "bg-white/95 backdrop-blur-md shadow-md shadow-black/10 border-b border-gray-100"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image src="/Rugby Logo.jpeg" alt="Zimbabwe Rugby Union Logo" width={40} height={40} className="group-hover:scale-105 transition-transform rounded-full object-cover" />
            <div className="hidden sm:block">
              <div className={`font-black text-sm leading-none tracking-wide transition-colors ${logoTextColor}`}>ZIMBABWE</div>
              <div className={`font-bold text-[10px] tracking-[0.2em] uppercase transition-colors ${logoSubColor}`}>Rugby Union</div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(link.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className={`flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-colors ${linkColor} ${linkHoverBg}`}>
                    {link.label}
                    <ChevronDown size={14} className={`transition-transform ${activeDropdown === link.label ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-100 rounded-xl shadow-xl overflow-hidden"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="block px-4 py-3 text-sm text-gray-600 hover:text-[#006B3F] hover:bg-[#006B3F]/5 transition-colors border-b border-gray-50 last:border-0"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${linkColor} ${linkHoverBg}`}
                >
                  {link.label}
                </Link>
              )
            )}
          </div>

          {/* CTA */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/donate"
              className="px-5 py-2 bg-[#006B3F] hover:bg-[#004D2C] text-white rounded-lg text-sm font-bold transition-all hover:shadow-lg hover:shadow-[#006B3F]/30 hover:-translate-y-0.5"
            >
              Donate
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${solid ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"}`}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-gray-100 overflow-hidden shadow-lg"
          >
            <div className="px-4 py-4 space-y-1">
              {NAV_LINKS.map((link) => (
                <div key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-gray-700 hover:text-[#006B3F] rounded-lg hover:bg-[#006B3F]/5 font-medium transition-colors"
                  >
                    {link.label}
                  </Link>
                  {link.children?.map((child) => (
                    <Link
                      key={child.label}
                      href={child.href}
                      onClick={() => setMobileOpen(false)}
                      className="block pl-8 py-2 text-gray-400 hover:text-[#006B3F] text-sm rounded-lg hover:bg-[#006B3F]/5 transition-colors"
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ))}
              <div className="pt-3 border-t border-gray-100">
                <Link href="/donate" onClick={() => setMobileOpen(false)}
                  className="block px-4 py-3 text-center bg-[#006B3F] text-white rounded-lg font-bold">
                  Donate
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
