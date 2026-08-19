'use client';

import React from 'react';
import { DISCOVERY_STAGES } from '@/lib/world-state';
import { useWorldState } from '@/context/WorldStateContext';
import { cn } from '@/lib/utils';

export function StageProgressIndicator({ sectionProgress }: { sectionProgress: number }) {
  const { activeSection } = useWorldState();

  if (activeSection !== 'discovery') return null;

  return (
    <div className="sticky top-0 h-screen w-full pointer-events-none z-30 -mt-[100vh]">
      <div className="absolute right-3 sm:right-6 md:right-12 top-1/2 -translate-y-1/2 flex flex-col gap-3.5 sm:gap-5 items-end">
        {DISCOVERY_STAGES.map((stage) => {
          const isActive = sectionProgress >= stage.startPct && sectionProgress < stage.endPct;
          const isPassed = sectionProgress >= stage.endPct;

          return (
            <div key={stage.id} className="flex items-center gap-2.5 sm:gap-3 group">
              <span
                className={cn(
                  'text-[9px] sm:text-[10px] md:text-xs font-mono tracking-widest transition-all duration-300',
                  isActive
                    ? 'text-electric-cyan font-bold scale-110 drop-shadow-[0_0_8px_#00D4FF]'
                    : isPassed
                    ? 'text-secondary-text/60'
                    : 'text-secondary-text/30'
                )}
              >
                {stage.number}
              </span>
              <div
                className={cn(
                  'w-1.5 h-1.5 rounded-full transition-all duration-300',
                  isActive
                    ? 'bg-electric-cyan shadow-cyan-glow scale-125'
                    : isPassed
                    ? 'bg-ocean-blue'
                    : 'bg-white/10'
                )}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
