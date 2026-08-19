'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ImageRevealProps {
  src: string;
  alt: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'iris';
  className?: string;
  aspectRatio?: string;
  priority?: boolean;
}

export function ImageReveal({
  src,
  alt,
  direction = 'up',
  className = '',
  aspectRatio = 'aspect-[16/9]',
  priority = false,
}: ImageRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !imageRef.current) return;

    let initialClip = 'inset(100% 0 0 0)';
    if (direction === 'down') initialClip = 'inset(0 0 100% 0)';
    if (direction === 'left') initialClip = 'inset(0 0 0 100%)';
    if (direction === 'right') initialClip = 'inset(0 100% 0 0)';
    if (direction === 'iris') initialClip = 'circle(0% at 50% 50%)';

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        {
          clipPath: initialClip,
          scale: 1.15,
        },
        {
          clipPath: direction === 'iris' ? 'circle(100% at 50% 50%)' : 'inset(0% 0 0 0)',
          scale: 1.0,
          ease: 'power3.out',
          duration: 1.4,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [direction]);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-xl bg-[#020b18] ${aspectRatio} ${className}`}
    >
      <div ref={imageRef} className="relative w-full h-full will-change-[clip-path,transform]">
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          className="object-cover transition-transform duration-700 hover:scale-105"
        />
        {/* Subtle Dark Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020914] via-transparent to-transparent opacity-80 pointer-events-none" />
      </div>
    </div>
  );
}
