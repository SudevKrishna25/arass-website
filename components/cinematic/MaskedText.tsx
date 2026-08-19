'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface MaskedTextProps {
  lines: string[];
  tag?: string;
  statement?: string;
  progress: number;
  startProgress?: number;
  peakProgress?: number;
  endProgress?: number;
  align?: 'left' | 'center' | 'right';
  className?: string;
  children?: React.ReactNode;
}

export function MaskedText({
  lines,
  tag,
  statement,
  progress,
  startProgress = 0.0,
  peakProgress = 0.5,
  endProgress = 1.0,
  align = 'center',
  className = '',
  children,
}: MaskedTextProps) {
  // Calculate continuous opacity and transform offsets
  let opacity = 0;
  let yOffset = 40;
  let scale = 0.96;

  if (progress < startProgress) {
    opacity = 0;
    yOffset = 40;
    scale = 0.95;
  } else if (progress <= peakProgress) {
    const t = (progress - startProgress) / Math.max(0.01, peakProgress - startProgress);
    opacity = t;
    yOffset = (1 - t) * 40;
    scale = 0.95 + t * 0.05;
  } else if (progress <= endProgress) {
    const t = (progress - peakProgress) / Math.max(0.01, endProgress - peakProgress);
    opacity = 1 - t;
    yOffset = -t * 40;
    scale = 1.0 - t * 0.04;
  } else {
    opacity = 0;
    yOffset = -40;
    scale = 0.96;
  }

  if (opacity <= 0.01) return null;

  return (
    <div
      className={cn(
        'transition-transform duration-100 ease-out will-change-transform max-w-5xl mx-auto px-6 space-y-6',
        align === 'left' ? 'text-left items-start' : align === 'right' ? 'text-right items-end' : 'text-center items-center',
        className
      )}
      style={{
        opacity: Math.max(0, Math.min(1, opacity)),
        transform: `translate3d(0, ${yOffset.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`,
      }}
    >
      {tag && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-electric-cyan/40 bg-[#020b18]/80 backdrop-blur-md text-[10px] font-mono tracking-[0.3em] text-electric-cyan uppercase">
          <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
          {tag}
        </div>
      )}

      <div className="space-y-1 sm:space-y-2">
        {lines.map((line, idx) => (
          <h2
            key={idx}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-black tracking-tight leading-[0.98] text-primary-text"
          >
            {line}
          </h2>
        ))}
      </div>

      {statement && (
        <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-sans text-secondary-text leading-relaxed font-light">
          {statement}
        </p>
      )}

      {children && <div className="pt-2">{children}</div>}
    </div>
  );
}
