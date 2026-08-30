'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface ArassBrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'hero';
  className?: string;
  showAura?: boolean;
}

export function ArassBrandLogo({
  size = 'md',
  className = '',
  showAura = true,
}: ArassBrandLogoProps) {
  const [isHovered, setIsHovered] = useState(false);

  // Balanced, luxury size mapping with 5.95:1 cropped aspect ratio
  const sizeClasses = {
    sm: 'w-24 sm:w-28 h-4 sm:h-5',
    md: 'w-28 sm:w-32 md:w-36 h-5 sm:h-6',
    lg: 'w-36 sm:w-40 md:w-44 h-6 sm:h-7',
    xl: 'w-48 sm:w-56 h-8 sm:h-9.5',
    hero: 'w-64 sm:w-72 md:w-80 h-11 sm:h-12 md:h-14',
  }[size];

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        'relative group cursor-pointer select-none transition-all duration-500 ease-out will-change-transform',
        sizeClasses,
        className
      )}
    >
      {/* Background Volumetric Glow / Cyan Atmospheric Aura */}
      {showAura && (
        <div
          className={cn(
            'absolute inset-0 -inset-x-3 -inset-y-1 rounded-2xl bg-gradient-to-r from-electric-cyan/20 via-sky-400/25 to-electric-cyan/20 blur-xl transition-all duration-700 pointer-events-none -z-10',
            isHovered
              ? 'opacity-100 scale-110 bg-gradient-to-r from-electric-cyan/35 via-cyan-300/40 to-electric-cyan/35 blur-2xl'
              : 'opacity-40 scale-100'
          )}
        />
      )}

      {/* Main ARASS Logo Image with High-Fidelity Glow & Precision Fit */}
      <div className="relative w-full h-full transition-transform duration-500 ease-out group-hover:scale-[1.04]">
        <Image
          src="/brand/arass-logo.png"
          alt="ARASS — We Don't Follow The Future. We Build It."
          fill
          priority
          className="object-contain filter drop-shadow-[0_0_20px_rgba(0,212,255,0.6)] group-hover:drop-shadow-[0_0_35px_rgba(0,212,255,0.95)] transition-all duration-500"
        />

        {/* Dynamic Holographic Light-Sheen Sweep Animation */}
        <div
          className={cn(
            'absolute inset-0 w-full h-full pointer-events-none overflow-hidden rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-500'
          )}
        >
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12" />
        </div>
      </div>
    </div>
  );
}
