'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Activity, Cpu, Radio, Shield, Zap } from 'lucide-react';

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
  const [fps, setFps] = useState(60);
  const [timeStr, setTimeStr] = useState('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const updateTime = () => {
      const now = new Date();
      setTimeStr(
        now.toTimeString().split(' ')[0] +
          '.' +
          Math.floor(now.getMilliseconds() / 100)
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 100);

    // Simple FPS calculation
    let frameCount = 0;
    let lastTime = performance.now();
    let animId: number;
    const calcFps = () => {
      frameCount++;
      const now = performance.now();
      if (now - lastTime >= 1000) {
        setFps(Math.min(60, Math.round((frameCount * 1000) / (now - lastTime))));
        frameCount = 0;
        lastTime = now;
      }
      animId = requestAnimationFrame(calcFps);
    };
    animId = requestAnimationFrame(calcFps);

    return () => {
      clearInterval(interval);
      cancelAnimationFrame(animId);
    };
  }, []);

  // Determine active chapter index
  const activeChapterIndex = CHAPTERS.reduce((acc, ch, idx) => {
    return scrollProgress >= ch.target - 0.06 ? idx : acc;
  }, 0);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-30 select-none overflow-hidden font-mono">
      {/* Top Left Bracket & Core Telemetry */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-8 flex flex-col gap-1 text-[10px] text-white/50">
        <div className="flex items-center gap-2 text-electric-cyan font-bold tracking-widest uppercase">
          <span className="w-2 h-2 rounded-full bg-electric-cyan animate-ping" />
          <span>ARASS // NEURAL HUD v4.9</span>
          <span className="hidden md:inline-block px-1.5 py-0.5 rounded text-[9px] bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan">
            LIVE SYNC
          </span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-[9px] tracking-wider text-white/40">
          <span>LAT: 37.7749° N</span>
          <span>•</span>
          <span>LON: 122.4194° W</span>
          <span>•</span>
          <span className="text-white/60">SYS_CLK: {timeStr || '12:00:00.0'}</span>
        </div>
      </div>

      {/* Top Right System Status & Performance Ticker */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-8 flex items-center gap-3 sm:gap-4 text-[10px] text-white/50">
        <div className="hidden md:flex items-center gap-2 px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
          <Cpu className="w-3 h-3 text-electric-cyan" />
          <span className="text-[9px] tracking-widest text-white/70">
            GPU ACCELERATED // {fps} FPS
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-electric-cyan text-[10px] tracking-widest">
          <Activity className="w-3 h-3 animate-pulse" />
          <span className="font-bold">{(scrollProgress * 100).toFixed(0)}% SCRUB</span>
        </div>
      </div>

      {/* Futuristic Right-Side Vertical Chapter Track */}
      <div className="hidden lg:flex absolute right-6 top-1/2 -translate-y-1/2 flex-col items-end gap-2.5 pointer-events-auto">
        <div className="text-[9px] text-white/30 tracking-[0.25em] uppercase mb-1 pr-1">
          CHAPTERS
        </div>
        {CHAPTERS.map((ch, idx) => {
          const isActive = idx === activeChapterIndex;
          return (
            <button
              key={ch.id}
              onClick={() => onNavigateChapter?.(ch.target)}
              className={cn(
                'group flex items-center gap-3 px-3 py-1.5 rounded-xl transition-all duration-300',
                isActive
                  ? 'bg-electric-cyan/15 border border-electric-cyan/40 shadow-[0_0_15px_rgba(0,212,255,0.25)] text-electric-cyan'
                  : 'bg-black/20 hover:bg-white/[0.05] border border-white/5 text-white/40 hover:text-white'
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
                  'text-[10px] tracking-wider transition-all duration-300',
                  isActive
                    ? 'opacity-100 translate-x-0 font-bold'
                    : 'opacity-50 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0'
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

      {/* Bottom Left Status & Protocol Monitor */}
      <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-8 hidden sm:flex items-center gap-3 text-[9px] tracking-widest text-white/40">
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 backdrop-blur-md">
          <Shield className="w-3 h-3 text-electric-cyan" />
          <span className="text-white/70">PROTOCOL: AES-256 ZERO TRUST</span>
        </div>
        <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 border border-white/10 backdrop-blur-md">
          <Radio className="w-3 h-3 text-cyan-400 animate-pulse" />
          <span className="text-white/70">BANDWIDTH: 100 GB/S MESH</span>
        </div>
      </div>

      {/* Bottom Right Scroll Scrubber Gauge */}
      <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-8 flex items-center gap-3 text-[10px] text-white/50">
        <div className="flex flex-col items-end gap-1">
          <div className="flex items-center gap-2">
            <Zap className="w-3 h-3 text-electric-cyan" />
            <span className="text-[9px] tracking-widest uppercase text-white/60">
              TIMELINE TRAVERSE
            </span>
          </div>
          <div className="w-32 sm:w-48 h-1 bg-white/10 rounded-full overflow-hidden border border-white/10">
            <div
              className="h-full bg-gradient-to-r from-electric-cyan via-white to-electric-cyan rounded-full transition-all duration-100 shadow-[0_0_8px_#00d4ff]"
              style={{ width: `${Math.max(2, scrollProgress * 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* High-Tech Corner HUD Brackets */}
      <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-electric-cyan/40 pointer-events-none" />
      <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-electric-cyan/40 pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-electric-cyan/40 pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-electric-cyan/40 pointer-events-none" />
    </div>
  );
}
