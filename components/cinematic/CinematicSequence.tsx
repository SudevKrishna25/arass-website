'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useWorldState } from '@/context/WorldStateContext';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export interface CinematicSequenceProps {
  id: string;
  height?: string; // e.g. '450vh'
  sectionName: 'hero' | 'discovery' | 'ecosystem' | 'frontier' | 'horizon' | 'directive';
  globalProgressBase: number;
  globalProgressSpan: number;
  children: (progress: number) => React.ReactNode;
  className?: string;
}

export function CinematicSequence({
  id,
  height = '450vh',
  sectionName,
  globalProgressBase,
  globalProgressSpan,
  children,
  className,
}: CinematicSequenceProps) {
  const containerRef = useRef<HTMLDivElement>(null!);
  const { setWorldState } = useWorldState();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: true,
        pinSpacing: true,
        scrub: 1.2,
        onUpdate: (self) => {
          setProgress(self.progress);
          setWorldState({
            activeSection: sectionName,
            sectionProgress: self.progress,
            globalProgress: globalProgressBase + self.progress * globalProgressSpan,
          });
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [sectionName, globalProgressBase, globalProgressSpan, setWorldState]);

  return (
    <section
      ref={containerRef}
      id={id}
      style={{ height }}
      className={cn('relative w-full bg-background text-primary-text overflow-hidden', className)}
    >
      <div className="relative h-screen w-full overflow-hidden">
        {children(progress)}
      </div>
    </section>
  );
}
