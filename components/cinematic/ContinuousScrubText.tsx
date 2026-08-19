'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

export type ScrubTextAlignment = 'center' | 'left' | 'right';

export interface ContinuousScrubStageProps {
  id: string;
  progress: number;
  startProgress: number;
  peakStart: number;
  peakEnd: number;
  endProgress: number;
  tag?: string;
  lines: string[];
  statement?: string;
  badgeIcon?: React.ReactNode;
  align?: ScrubTextAlignment;
  exitOffset?: number;
  children?: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

export function ContinuousScrubStage({
  progress,
  startProgress,
  peakStart,
  peakEnd,
  endProgress,
  tag,
  lines,
  statement,
  badgeIcon,
  align = 'center',
  exitOffset = 60,
  children,
  className,
  titleClassName,
}: ContinuousScrubStageProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // If outside active scrub window, render nothing for performance
  if (progress < startProgress || progress > endProgress) {
    return null;
  }

  let opacity = 0;
  let y = 0;
  let blur = 0;
  let scale = 1;

  if (progress < peakStart) {
    const t = Math.max(0, Math.min(1, (progress - startProgress) / Math.max(0.0001, peakStart - startProgress)));
    opacity = t;
    y = prefersReducedMotion ? 0 : (1 - t) * exitOffset;
    blur = prefersReducedMotion ? 0 : (1 - t) * 3;
    scale = prefersReducedMotion ? 1 : 0.98 + t * 0.02;
  } else if (progress <= peakEnd) {
    opacity = 1;
    y = 0;
    blur = 0;
    scale = 1;
  } else {
    const t = Math.max(0, Math.min(1, (progress - peakEnd) / Math.max(0.0001, endProgress - peakEnd)));
    opacity = 1 - t;
    y = prefersReducedMotion ? 0 : -t * exitOffset;
    blur = prefersReducedMotion ? 0 : t * 3;
    scale = prefersReducedMotion ? 1 : 1 + t * 0.02;
  }

  const alignClasses = {
    center: 'items-center text-center mx-auto',
    left: 'items-start text-left mr-auto',
    right: 'items-end text-right ml-auto',
  }[align];

  return (
    <div
      className={cn(
        'absolute inset-x-0 flex flex-col gap-3 sm:gap-5 max-w-6xl px-4 sm:px-6 pointer-events-none transform-gpu will-change-transform',
        alignClasses,
        className
      )}
      style={{
        opacity,
        transform: prefersReducedMotion ? 'none' : `translate3d(0, ${y.toFixed(1)}px, 0) scale(${scale.toFixed(3)})`,
        filter: blur > 0.1 && !prefersReducedMotion ? `blur(${blur.toFixed(1)}px)` : undefined,
        transition: prefersReducedMotion ? 'opacity 0.2s ease-out' : 'transform 0.15s ease-out, opacity 0.15s ease-out',
      }}
    >
      {/* Telemetry Badge / Sequence Subtag */}
      {tag && (
        <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#020b18]/85 border border-electric-cyan/35 backdrop-blur-md text-[9px] sm:text-xs font-mono tracking-[0.25em] text-electric-cyan uppercase shadow-[0_0_20px_rgba(0,212,255,0.2)]">
          {badgeIcon || <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse shadow-[0_0_8px_#00d4ff]" />}
          <span>{tag}</span>
        </div>
      )}

      {/* Multi-Line Masked Title */}
      <div className={cn('flex flex-col overflow-hidden py-0.5', align === 'center' ? 'items-center' : align === 'right' ? 'items-end' : 'items-start')}>
        {lines.map((lineText, idx) => (
          <h2
            key={idx}
            className={cn(
              'font-display text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-[1.02] text-white drop-shadow-[0_0_40px_rgba(0,212,255,0.3)] uppercase max-w-full break-words selection:bg-electric-cyan selection:text-background',
              titleClassName
            )}
          >
            {lineText}
          </h2>
        ))}
      </div>

      {/* Strategic Statement */}
      {statement && (
        <p
          className={cn(
            'font-sans text-xs sm:text-base md:text-xl text-secondary-text/90 font-light tracking-wide max-w-2xl text-balance leading-relaxed',
            align === 'right' && 'text-right'
          )}
        >
          {statement}
        </p>
      )}

      {/* Interactive CTA slot */}
      {children && (
        <div className={cn('mt-2 pointer-events-auto', opacity > 0.5 ? 'pointer-events-auto' : 'pointer-events-none')}>
          {children}
        </div>
      )}
    </div>
  );
}
