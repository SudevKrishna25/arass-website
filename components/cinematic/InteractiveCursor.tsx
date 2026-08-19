'use client';

import React, { useEffect, useRef, useState } from 'react';

export type CursorState = 'default' | 'link' | 'view' | 'drag' | 'explore' | 'open' | 'hidden';

export function InteractiveCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const [cursorText, setCursorText] = useState<string>('');
  const [cursorState, setCursorState] = useState<CursorState>('default');
  const [isTouch, setIsTouch] = useState<boolean>(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.matchMedia('(pointer: coarse)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    setIsTouch(false);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let isVisible = false;
    let prevX = mouseX;
    let prevY = mouseY;
    let velocity = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const dx = mouseX - prevX;
      const dy = mouseY - prevY;
      velocity = Math.min(1.5, Math.sqrt(dx * dx + dy * dy) * 0.04);
      prevX = mouseX;
      prevY = mouseY;

      if (!isVisible) {
        isVisible = true;
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (ringRef.current) ringRef.current.style.opacity = '1';
      }

      const target = e.target as HTMLElement | null;
      if (target) {
        const cursorAttr = target.closest('[data-cursor]')?.getAttribute('data-cursor');
        const isClickable = target.closest('a, button, [role="button"], input, select, textarea');

        if (cursorAttr === 'view') {
          setCursorState('view');
          setCursorText('VIEW');
        } else if (cursorAttr === 'drag') {
          setCursorState('drag');
          setCursorText('DRAG');
        } else if (cursorAttr === 'explore') {
          setCursorState('explore');
          setCursorText('EXPLORE ↗');
        } else if (cursorAttr === 'open') {
          setCursorState('open');
          setCursorText('OPEN');
        } else if (cursorAttr === 'hidden') {
          setCursorState('hidden');
          setCursorText('');
        } else if (isClickable) {
          setCursorState('link');
          setCursorText('');
        } else {
          setCursorState('default');
          setCursorText('');
        }
      }
    };

    const onMouseLeave = () => {
      isVisible = false;
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (ringRef.current) ringRef.current.style.opacity = '0';
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    let animationFrame: number;
    const render = () => {
      // Smooth interpolation for follower ring
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
      if (ringRef.current) {
        const scaleEffect = 1 + velocity * 0.15;
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) scale(${scaleEffect})`;
      }

      animationFrame = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      {/* Precision Core Dot */}
      <div
        ref={dotRef}
        className={`fixed top-0 left-0 -ml-1 -mt-1 w-2 h-2 rounded-full bg-electric-cyan transition-opacity duration-300 pointer-events-none ${
          cursorState === 'hidden' ? 'opacity-0' : 'opacity-90'
        } ${cursorState === 'link' || cursorText ? 'scale-0' : 'scale-100'}`}
        style={{ willChange: 'transform' }}
      />

      {/* Outer Follower Ring / Interactive Pill */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 transition-[width,height,border-color,background-color,margin,padding] duration-200 ease-out pointer-events-none flex items-center justify-center ${
          cursorText
            ? '-ml-12 -mt-4 w-24 h-8 rounded-full bg-[#020b18]/90 border border-electric-cyan/70 text-[9px] font-mono font-bold tracking-widest text-electric-cyan shadow-[0_0_25px_rgba(0,212,255,0.4)]'
            : cursorState === 'link'
            ? '-ml-5 -mt-5 w-10 h-10 rounded-full border border-electric-cyan/70 bg-electric-cyan/15 backdrop-blur-[1px]'
            : cursorState === 'hidden'
            ? 'opacity-0'
            : '-ml-3.5 -mt-3.5 w-7 h-7 rounded-full border border-electric-cyan/35'
        }`}
        style={{ willChange: 'transform' }}
      >
        {cursorText && (
          <span ref={labelRef} className="animate-in fade-in zoom-in duration-200">
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
}
