'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SceneTypographyProps {
  stageKey: string;
  tag?: string;
  title: string;
  statement?: string;
  badgeIcon?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

export function SceneTypography({
  stageKey,
  tag,
  title,
  statement,
  badgeIcon,
  children,
  className,
}: SceneTypographyProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stageKey}
        initial={{ opacity: 0, y: 35, filter: 'blur(10px)', scale: 0.96 }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)', scale: 1 }}
        exit={{ opacity: 0, y: -30, filter: 'blur(8px)', scale: 1.03 }}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className={cn('flex flex-col items-center justify-center gap-5 max-w-5xl text-center', className)}
      >
        {/* Telemetry Badge / Tag */}
        {tag && (
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#020b18]/80 border border-electric-cyan/30 backdrop-blur-md text-[10px] sm:text-xs font-mono tracking-[0.3em] text-electric-cyan uppercase shadow-[0_0_20px_rgba(0,212,255,0.18)]">
            {badgeIcon || <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse shadow-[0_0_8px_#00d4ff]" />}
            <span>{tag}</span>
          </div>
        )}

        {/* Cinematic Display Title */}
        <h2 className="font-display text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.08] text-white drop-shadow-[0_0_45px_rgba(0,212,255,0.35)] uppercase max-w-full break-words">
          {title}
        </h2>

        {/* Minimal Supporting Statement */}
        {statement && (
          <p className="font-sans text-sm sm:text-lg md:text-xl text-secondary-text/90 font-light tracking-wide max-w-2xl text-balance leading-relaxed">
            {statement}
          </p>
        )}

        {/* Actions / CTA Slot */}
        {children && <div className="mt-4 pointer-events-auto">{children}</div>}
      </motion.div>
    </AnimatePresence>
  );
}
