'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface HorizontalScrollSceneProps {
  id?: string;
  items: React.ReactNode[];
  className?: string;
}

export function HorizontalScrollScene({
  id,
  items,
  className = '',
}: HorizontalScrollSceneProps) {
  const targetRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!targetRef.current || !trackRef.current) return;

    const track = trackRef.current;
    const target = targetRef.current;

    const ctx = gsap.context(() => {
      const scrollWidth = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: -scrollWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: target,
          start: 'top top',
          end: `+=${scrollWidth + 400}`,
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
    }, target);

    return () => ctx.revert();
  }, [items]);

  return (
    <section ref={targetRef} id={id} className={`relative overflow-hidden ${className}`}>
      <div
        ref={trackRef}
        className="flex h-screen items-center px-8 md:px-16 gap-8 md:gap-16 w-max will-change-transform"
      >
        {items.map((item, idx) => (
          <div key={idx} className="shrink-0">
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}
