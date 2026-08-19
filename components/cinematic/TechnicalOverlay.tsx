'use client';

import React from 'react';

interface TechnicalOverlayProps {
  sectionCode?: string;
  stageName?: string;
  coordinates?: string;
  classification?: string;
  showGrid?: boolean;
  showBottom?: boolean;
  className?: string;
}

export function TechnicalOverlay({
  sectionCode = 'AR-01',
  stageName = 'SYSTEM ACTIVE',
  coordinates = '37.7749° N, 122.4194° W',
  classification = 'RESTRICTED // INSTITUTIONAL ACCESS',
  showGrid = true,
  showBottom = true,
  className = '',
}: TechnicalOverlayProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 z-20 overflow-hidden ${className}`}>
      {/* Precision Corner Reticles positioned safely below fixed navbar */}
      <div className="absolute top-20 left-6 w-3.5 h-3.5 border-t border-l border-electric-cyan/40" />
      <div className="absolute top-20 right-6 w-3.5 h-3.5 border-t border-r border-electric-cyan/40" />
      {showBottom && (
        <>
          <div className="absolute bottom-6 left-6 w-3.5 h-3.5 border-b border-l border-electric-cyan/40" />
          <div className="absolute bottom-6 right-6 w-3.5 h-3.5 border-b border-r border-electric-cyan/40" />
        </>
      )}

      {/* Top Telemetry - Safely below navbar (top-20 sm:top-24) */}
      <div className="absolute top-20 sm:top-24 left-8 sm:left-12 right-8 sm:right-12 flex items-center justify-between text-[8px] sm:text-[9px] font-mono tracking-[0.25em] text-secondary-text/60 uppercase">
        <div className="flex items-center gap-3">
          <span className="text-electric-cyan font-bold">{sectionCode}</span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-electric-cyan/50 animate-pulse" />
          <span className="hidden sm:inline-block">{stageName}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline-block text-secondary-text/40">{coordinates}</span>
          <span className="border border-white/10 px-2 py-0.5 rounded bg-[#020b18]/60 text-secondary-text/80">
            {classification}
          </span>
        </div>
      </div>

      {/* Bottom Footer Telemetry */}
      {showBottom && (
        <div className="absolute bottom-6 left-8 sm:left-12 right-8 sm:right-12 flex items-center justify-between text-[8px] sm:text-[9px] font-mono tracking-[0.25em] text-secondary-text/50 uppercase">
          <span>ARASS RESEARCH ARCHIVE</span>
          <span className="hidden sm:inline">SOVEREIGN FOUNDATIONAL INFRASTRUCTURE</span>
        </div>
      )}

      {/* Subtle Coordinate Grid */}
      {showGrid && (
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#00d4ff05_1px,transparent_1px),linear-gradient(to_bottom,#00d4ff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-25" />
      )}
    </div>
  );
}
