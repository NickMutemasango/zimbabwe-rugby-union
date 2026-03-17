"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { X, Trophy } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RWC_DATE } from "@/lib/data";

function useCountdown(target: Date) {
  const calc = useCallback(() => {
    const diff = target.getTime() - Date.now();
    if (diff <= 0) return null;
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    };
  }, [target]);

  const [timeLeft, setTimeLeft] = useState(calc);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(timer);
  }, [calc]);

  return timeLeft;
}

export default function CountdownModal() {
  const [visible, setVisible] = useState(false);
  const timeLeft = useCountdown(RWC_DATE);
  // Use a ref so the one-time show effect only fires on mount, not on every tick
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) return;
    didMount.current = true;
    // If RWC date has already passed, never show
    if (RWC_DATE.getTime() - Date.now() <= 0) return;
    const dismissed = sessionStorage.getItem("rwc-modal-dismissed");
    if (!dismissed) {
      const t = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(t);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const dismiss = () => {
    sessionStorage.setItem("rwc-modal-dismissed", "1");
    setVisible(false);
  };

  if (!timeLeft) return null;

  const units = [
    { label: "Days", value: timeLeft.days },
    { label: "Hours", value: timeLeft.hours },
    { label: "Minutes", value: timeLeft.minutes },
    { label: "Seconds", value: timeLeft.seconds },
  ];

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={dismiss}
            className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-sm"
          />
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none"
          >
            <div className="pointer-events-auto relative w-full max-w-lg bg-gradient-to-br from-[#0A1628] to-[#050D1A] border border-[#006B3F]/50 rounded-2xl overflow-hidden shadow-2xl shadow-black/60">
              {/* Gold top accent */}
              <div className="h-1 bg-gradient-to-r from-[#D4AF37] via-[#F0D060] to-[#D4AF37]" />

              {/* Close */}
              <button
                onClick={dismiss}
                className="absolute top-4 right-4 w-8 h-8 bg-white/5 hover:bg-white/15 rounded-full flex items-center justify-center text-white/60 hover:text-white transition-all"
              >
                <X size={16} />
              </button>

              <div className="p-8 text-center">
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-[#006B3F]/20 border border-[#006B3F]/40 rounded-full mb-5">
                  <Trophy size={28} className="text-[#D4AF37]" />
                </div>

                <p className="text-[#D4AF37] text-xs font-bold tracking-[0.3em] uppercase mb-2">Countdown to</p>
                <h2 className="text-white text-3xl font-black leading-tight mb-1">Rugby World Cup</h2>
                <p className="text-white/40 text-sm mb-8">Australia 2027 — The Sables are coming</p>

                {/* Countdown grid */}
                <div className="grid grid-cols-4 gap-3 mb-8">
                  {units.map(({ label, value }) => (
                    <div key={label} className="bg-[#006B3F]/15 border border-[#006B3F]/30 rounded-xl p-3">
                      <motion.div
                        key={value}
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="text-3xl font-black text-white tabular-nums"
                      >
                        {String(value).padStart(2, "0")}
                      </motion.div>
                      <div className="text-[#D4AF37] text-[10px] font-bold uppercase tracking-widest mt-1">{label}</div>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={dismiss}
                    className="flex-1 px-5 py-3 bg-[#006B3F] hover:bg-[#004D2C] text-white font-bold rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#006B3F]/30"
                  >
                    Go Sables! 🇿🇼
                  </button>
                  <button
                    onClick={dismiss}
                    className="flex-1 px-5 py-3 bg-white/5 hover:bg-white/10 text-white/60 hover:text-white font-medium rounded-xl transition-colors text-sm"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
