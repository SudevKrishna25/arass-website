'use client';

import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { cn } from '@/lib/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollSceneProps {
  id?: string;
  height?: string; // e.g. '300vh', '400vh'
  children: (progress: number) => React.ReactNode;
  className?: string;
  onProgressUpdate?: (progress: number) => void;
}

export function ScrollScene({
  id,
  height = '300vh',
  children,
  className,
  onProgressUpdate,
}: ScrollSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null!);
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
          if (onProgressUpdate) {
            onProgressUpdate(self.progress);
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onProgressUpdate]);

  return (
    <div
      ref={containerRef}
      id={id}
      style={{ height }}
      className={cn('relative w-full bg-background text-primary-text overflow-hidden', className)}
    >
      <div className="relative h-screen w-full overflow-hidden">
        {children(progress)}
      </div>
    </div>
  );
}
