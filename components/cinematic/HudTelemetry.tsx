'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Activity, Compass } from 'lucide-react';

interface HudTelemetryProps {
  scrollProgress: number;
  onNavigateChapter?: (progress: number) => void;
}

const CHAPTERS = [
  { id: '01', name: 'HERO', target: 0.0 },
  { id: '02', name: 'DISCIPLINES', target: 0.2 },
  { id: '03', name: 'AI SYSTEMS', target: 0.34 },
  { id: '04', name: 'PRODUCTS', target: 0.48 },
  { id: '05', name: 'AUTOMATION', target: 0.61 },
  { id: '06', name: 'SENSORY', target: 0.74 },
  { id: '07', name: 'PORTFOLIO', target: 0.85 },
  { id: '08', name: 'INITIATE', target: 0.96 },
];

export function HudTelemetry({ scrollProgress, onNavigateChapter }: HudTelemetryProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine active chapter index
  const activeChapterIndex = CHAPTERS.reduce((acc, ch, idx) => {
    return scrollProgress >= ch.target - 0.05 ? idx : acc;
  }, 0);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 select-none overflow-hidden font-mono">
      {/* Sleek Top Edge 1px Laser Progress Line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-white/[0.05] z-50">
        <div
          className="h-full bg-gradient-to-r from-transparent via-electric-cyan to-white shadow-[0_0_12px_#00d4ff] transition-all duration-75"
          style={{ width: `${Math.max(1, scrollProgress * 100)}%` }}
        />
      </div>

      {/* Refined Right-Side Floating Chapter Dial (Unobtrusive & Spacious) */}
      <div className="hidden xl:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col items-end gap-2 pointer-events-auto">
        <div className="text-[9px] text-white/30 tracking-[0.25em] uppercase mb-1 pr-1 font-bold">
          CHAPTER // {CHAPTERS[activeChapterIndex]?.id}
        </div>
        {CHAPTERS.map((ch, idx) => {
          const isActive = idx === activeChapterIndex;
          return (
            <button
              key={ch.id}
              onClick={() => onNavigateChapter?.(ch.target)}
              className={cn(
                'group flex items-center gap-2.5 px-3 py-1.5 rounded-full transition-all duration-300 backdrop-blur-md',
                isActive
                  ? 'bg-electric-cyan/15 border border-electric-cyan/50 shadow-[0_0_20px_rgba(0,212,255,0.3)] text-electric-cyan'
                  : 'bg-black/30 hover:bg-white/[0.08] border border-white/5 text-white/40 hover:text-white'
              )}
            >
              <span
                className={cn(
                  'text-[10px] font-bold tracking-widest transition-colors',
                  isActive ? 'text-electric-cyan' : 'text-white/40 group-hover:text-white'
                )}
              >
                {ch.id}
              </span>
              <span
                className={cn(
                  'text-[9px] tracking-widest transition-all duration-300',
                  isActive
                    ? 'opacity-100 max-w-[100px] font-bold'
                    : 'opacity-0 max-w-0 overflow-hidden group-hover:opacity-80 group-hover:max-w-[100px]'
                )}
              >
                {ch.name}
              </span>
              <span
                className={cn(
                  'w-1.5 h-1.5 rounded-full transition-all duration-300',
                  isActive
                    ? 'bg-electric-cyan scale-125 shadow-[0_0_8px_#00d4ff]'
                    : 'bg-white/20 group-hover:bg-white/60'
                )}
              />
            </button>
          );
        })}
      </div>

      {/* Minimal Bottom Right Timeline Index */}
      <div className="absolute bottom-6 right-6 hidden md:flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-black/40 border border-white/10 backdrop-blur-md text-[10px] text-white/50">
        <Activity className="w-3 h-3 text-electric-cyan animate-pulse" />
        <span className="tracking-widest font-semibold text-white/70">
          {(scrollProgress * 100).toFixed(0)}%
        </span>
        <span className="text-white/30">|</span>
        <span className="text-[9px] text-electric-cyan tracking-wider">
          {CHAPTERS[activeChapterIndex]?.name}
        </span>
      </div>
    </div>
  );
}
