'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

export type TextAlignment = 'center' | 'left' | 'right' | 'split';
export type ExitDirection = 'up' | 'down' | 'left' | 'right';

export interface CinematicTextProps {
  id: string;
  tag?: string;
  lines?: string[];
  title?: string;
  statement?: string;
  badgeIcon?: React.ReactNode;
  align?: TextAlignment;
  exitDirection?: ExitDirection;
  children?: React.ReactNode;
  className?: string;
  titleClassName?: string;
}

export function CinematicText({
  id,
  tag,
  lines,
  title,
  statement,
  badgeIcon,
  align = 'center',
  exitDirection = 'up',
  children,
  className,
  titleClassName,
}: CinematicTextProps) {
  const displayLines = lines || (title ? [title] : []);

  // Compute directional exit transforms
  const exitTransform =
    exitDirection === 'left'
      ? { x: '-110%', y: '0%' }
      : exitDirection === 'right'
      ? { x: '110%', y: '0%' }
      : exitDirection === 'down'
      ? { x: '0%', y: '115%' }
      : { x: '0%', y: '-115%' };

  const alignStyles = {
    center: 'items-center text-center mx-auto',
    left: 'items-start text-left mr-auto',
    right: 'items-end text-right ml-auto',
    split: 'items-start text-left mr-auto md:items-center md:text-center',
  }[align];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={id}
        initial="initial"
        animate="animate"
        exit="exit"
        className={cn(
          'flex flex-col gap-4 sm:gap-6 max-w-6xl px-4 sm:px-6 will-change-transform',
          alignStyles,
          className
        )}
      >
        {/* Telemetry Badge / Sequence Subtag */}
        {tag && (
          <motion.div
            variants={{
              initial: { opacity: 0, y: -10, filter: 'blur(3px)' },
              animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
              exit: { opacity: 0, y: -8, filter: 'blur(2px)' },
            }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#020b18]/85 border border-electric-cyan/35 backdrop-blur-md text-[9px] sm:text-xs font-mono tracking-[0.25em] text-electric-cyan uppercase shadow-[0_0_20px_rgba(0,212,255,0.2)]"
          >
            {badgeIcon || <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse shadow-[0_0_8px_#00d4ff]" />}
            <span>{tag}</span>
          </motion.div>
        )}

        {/* Masked Multi-Line Editorial Title */}
        <div className={cn('flex flex-col overflow-hidden py-1', align === 'center' ? 'items-center' : align === 'right' ? 'items-end' : 'items-start')}>
          {displayLines.map((lineText, idx) => (
            <div key={idx} className="overflow-hidden">
              <motion.h2
                variants={{
                  initial: { y: '115%', opacity: 0, filter: 'blur(4px)', scale: 0.98 },
                  animate: { y: '0%', opacity: 1, filter: 'blur(0px)', scale: 1 },
                  exit: { ...exitTransform, opacity: 0, filter: 'blur(3px)', scale: 1.02 },
                }}
                transition={{
                  duration: 0.75,
                  delay: idx * 0.07,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={cn(
                  'font-display text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-extrabold tracking-tight leading-[1.02] text-white drop-shadow-[0_0_40px_rgba(0,212,255,0.3)] uppercase max-w-full break-words selection:bg-electric-cyan selection:text-background',
                  titleClassName
                )}
              >
                {lineText}
              </motion.h2>
            </div>
          ))}
        </div>

        {/* Editorial Subtitle / Strategic Statement */}
        {statement && (
          <motion.p
            variants={{
              initial: { opacity: 0, y: 15, filter: 'blur(3px)' },
              animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
              exit: { opacity: 0, y: -12, filter: 'blur(2px)' },
            }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
            className={cn(
              'font-sans text-xs sm:text-base md:text-xl text-secondary-text/90 font-light tracking-wide max-w-2xl text-balance leading-relaxed',
              align === 'right' && 'text-right'
            )}
          >
            {statement}
          </motion.p>
        )}

        {/* Custom Actions / Interaction Slots */}
        {children && (
          <motion.div
            variants={{
              initial: { opacity: 0, scale: 0.95 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.96 },
            }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-1 pointer-events-auto"
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </AnimatePresence>
  );
}
