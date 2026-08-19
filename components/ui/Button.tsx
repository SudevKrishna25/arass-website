'use client';

import React from 'react';
import { motion, HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  children,
  className,
  icon,
  ...props
}: ButtonProps) {
  const baseStyles =
    'relative inline-flex items-center justify-center font-mono font-medium tracking-[0.2em] text-xs uppercase transition-all duration-300 rounded-sm focus:outline-none focus:ring-1 focus:ring-electric-cyan disabled:opacity-50 disabled:pointer-events-none group overflow-hidden px-6 py-3.5';

  const variants = {
    primary:
      'bg-gradient-to-r from-electric-blue via-electric-cyan to-electric-blue bg-[length:200%_auto] text-background font-bold shadow-cyan-glow hover:shadow-cyan-glow-lg border border-electric-cyan/60 hover:border-electric-cyan hover:bg-right',
    secondary:
      'tech-glass-panel text-primary-text hover:text-electric-cyan hover:border-electric-cyan/80 hover:shadow-cyan-glow hover:bg-surface/90 border border-electric-cyan/20',
    ghost:
      'bg-transparent text-secondary-text hover:text-electric-cyan hover:bg-surface/30 border border-transparent hover:border-electric-cyan/20',
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {/* Corner Telemetry Crosshair Accents */}
      <span className="absolute top-0 left-0 w-1.5 h-1.5 border-t border-l border-electric-cyan opacity-60 group-hover:opacity-100 transition-opacity" />
      <span className="absolute top-0 right-0 w-1.5 h-1.5 border-t border-r border-electric-cyan opacity-60 group-hover:opacity-100 transition-opacity" />
      <span className="absolute bottom-0 left-0 w-1.5 h-1.5 border-b border-l border-electric-cyan opacity-60 group-hover:opacity-100 transition-opacity" />
      <span className="absolute bottom-0 right-0 w-1.5 h-1.5 border-b border-r border-electric-cyan opacity-60 group-hover:opacity-100 transition-opacity" />

      <span className="relative z-10 flex items-center gap-2.5">
        {children}
        {icon && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            {icon}
          </span>
        )}
      </span>

      {/* Dynamic Sheen Sweep */}
      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none" />
    </motion.button>
  );
}
