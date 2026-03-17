"use client";
import { useEffect, useRef } from "react";
import { TICKER_ITEMS } from "@/lib/data";

export default function StickyTicker() {
  const tickerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-[#006B3F] border-b border-[#D4AF37]/30 h-8 overflow-hidden">
      <div className="flex items-center h-full">
        {/* Label */}
        <div className="flex-shrink-0 bg-[#D4AF37] text-[#050D1A] text-[10px] font-black uppercase tracking-widest px-3 h-full flex items-center">
          LIVE
        </div>
        {/* Ticker */}
        <div className="overflow-hidden flex-1">
          <div
            className="flex whitespace-nowrap"
            style={{
              animation: "ticker 40s linear infinite",
            }}
          >
            {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
              <span key={i} className="text-white text-[11px] font-medium tracking-wide px-8">
                {item.text}
                <span className="text-[#D4AF37] mx-4">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
