'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface CinematicSectionProps {
  id?: string;
  height?: string; // e.g. '250vh' or '300vh'
  children: (progress: number) => React.ReactNode;
  className?: string;
  pin?: boolean;
}

/**
 * CinematicSection: Continuous pinned scroll container that exposes normalized 0.0 -> 1.0 progress
 * to all child planes for synchronized camera push, typography reveals, and live background transitions.
 */
export function CinematicSection({
  id,
  height = '250vh',
  children,
  className = '',
  pin = true,
}: CinematicSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: pin,
        pinSpacing: pin,
        scrub: 1.0,
        anticipatePin: 1,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [pin]);

  return (
    <section
      ref={containerRef}
      id={id}
      style={{ height }}
      className={cn('relative w-full bg-background text-primary-text overflow-hidden', className)}
    >
      <div className="relative h-screen w-full overflow-hidden flex flex-col justify-between">
        {children(progress)}
      </div>
    </section>
  );
}
