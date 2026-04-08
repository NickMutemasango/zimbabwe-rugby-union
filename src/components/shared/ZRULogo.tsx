"use client";
import { useState } from "react";
import Image from "next/image";

interface ZRULogoProps {
  size?: number;
  className?: string;
}

export function ZRULogo({ size = 40, className = "" }: ZRULogoProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`bg-[#006B3F] rounded-full flex items-center justify-center border-2 border-[#D4AF37] flex-shrink-0 ${className}`}
        style={{ width: size, height: size, minWidth: size }}
      >
        <span className="text-white font-black" style={{ fontSize: size * 0.22 }}>ZRU</span>
      </div>
    );
  }

  return (
    <div
      className={`relative rounded-full overflow-hidden bg-white border-2 border-[#D4AF37] flex-shrink-0 ${className}`}
      style={{ width: size, height: size, minWidth: size }}
    >
      <Image
        src="/zimbabwe-rugby-logo.png"
        alt="Zimbabwe Rugby Union"
        fill
        className="object-contain p-0.5"
        sizes={`${size}px`}
        priority
        onError={() => setError(true)}
      />
    </div>
  );
}
