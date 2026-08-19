'use client';

import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

interface ArassOpeningExperienceProps {
  onComplete: () => void;
  forceShow?: boolean;
}

export function ArassOpeningExperience({
  onComplete,
  forceShow = false,
}: ArassOpeningExperienceProps) {
  const [phase, setPhase] = useState<'signal' | 'assemble' | 'warp' | 'done'>('signal');

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const letterRefA1 = useRef<HTMLDivElement>(null);
  const letterRefR = useRef<HTMLDivElement>(null);
  const letterRefA2 = useRef<HTMLDivElement>(null);
  const letterRefS1 = useRef<HTMLDivElement>(null);
  const letterRefS2 = useRef<HTMLDivElement>(null);
  const lettersContainerRef = useRef<HTMLDivElement>(null);
  const lightPulseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion or previously seen session
    if (!forceShow && typeof window !== 'undefined') {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const seen = sessionStorage.getItem('arass_intro_seen');
      if (prefersReducedMotion || seen === 'true') {
        onComplete();
        return;
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleSkip();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    // =========================================================================
    // BACKGROUND 2D ATMOSPHERE (LIVING GLOW & DIGITAL DUST)
    // =========================================================================
    const canvas = canvasRef.current;
    let animId: number;
    let width = 0;
    let height = 0;

    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;

        const handleResize = () => {
          if (!canvas) return;
          width = canvas.width = window.innerWidth;
          height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        const particles = Array.from({ length: 32 }, () => ({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: -Math.random() * 0.35 - 0.1,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.35 + 0.1,
        }));

        let time = 0;

        const renderBackground = () => {
          ctx.clearRect(0, 0, width, height);

          time += 0.01;
          const auraX = width * 0.5 + Math.sin(time) * 40;
          const auraY = height * 0.5 + Math.cos(time * 0.7) * 30;

          // Organic soft radial cyan atmosphere
          const radGrad = ctx.createRadialGradient(auraX, auraY, 10, auraX, auraY, width * 0.5);
          radGrad.addColorStop(0, 'rgba(0, 212, 255, 0.08)');
          radGrad.addColorStop(0.4, 'rgba(0, 140, 255, 0.025)');
          radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
          ctx.fillStyle = radGrad;
          ctx.fillRect(0, 0, width, height);

          // Digital dust
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;

            if (p.y < -10) p.y = height + 10;
            if (p.x < -10) p.x = width + 10;
            if (p.x > width + 10) p.x = -10;

            ctx.fillStyle = `rgba(0, 212, 255, ${p.alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }

          animId = requestAnimationFrame(renderBackground);
        };
        renderBackground();
      }
    }

    // =========================================================================
    // MASTER CINEMATIC CHOREOGRAPHY (ZERO STATIC INITIAL FLASH)
    // =========================================================================
    const masterTl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('arass_intro_seen', 'true');
        setPhase('done');
        onComplete();
      },
    });

    const letterElements = [
      letterRefA1.current,
      letterRefR.current,
      letterRefA2.current,
      letterRefS1.current,
      letterRefS2.current,
    ].filter(Boolean);

    // Initial state setup: hidden by default
    gsap.set(lettersContainerRef.current, { opacity: 0, scale: 0.75 });
    gsap.set(letterElements, {
      opacity: 0,
      y: (i) => (i % 2 === 0 ? 30 : -30),
      filter: 'blur(16px)',
    });

    // 1. PHASE 01: Microscopic Signal Pulse (0.0s -> 0.6s)
    masterTl.fromTo(
      lightPulseRef.current,
      { scale: 0, opacity: 0 },
      { scale: 2.5, opacity: 1, duration: 0.55, ease: 'power2.out' }
    );
    masterTl.to(lightPulseRef.current, { scale: 8, opacity: 0, duration: 0.45, ease: 'power2.in' }, '-=0.1');

    // 2. PHASE 02: Dynamic Letter Assembly with Fluid Drift (0.6s -> 1.6s)
    masterTl.set(lettersContainerRef.current, { opacity: 1 }, '-=0.3');
    masterTl.to(
      letterElements,
      {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 0.85,
        stagger: 0.08,
        ease: 'power3.out',
      },
      '-=0.25'
    );

    // Continuous floating kinetic drift on letters container
    masterTl.to(
      lettersContainerRef.current,
      {
        scale: 1.04,
        duration: 1.0,
        ease: 'sine.inOut',
      },
      '<'
    );

    // 3. PHASE 03: Letter Separation & Filament Link Tension (1.6s -> 2.4s)
    masterTl.to(
      letterRefA1.current,
      { x: -50, duration: 0.7, ease: 'power2.out' },
      '+=0.1'
    );
    masterTl.to(
      letterRefR.current,
      { x: -25, duration: 0.7, ease: 'power2.out' },
      '<'
    );
    masterTl.to(
      letterRefA2.current,
      { scale: 1.08, duration: 0.7, ease: 'power2.out' },
      '<'
    );
    masterTl.to(
      letterRefS1.current,
      { x: 25, duration: 0.7, ease: 'power2.out' },
      '<'
    );
    masterTl.to(
      letterRefS2.current,
      { x: 50, duration: 0.7, ease: 'power2.out' },
      '<'
    );

    // 4. PHASE 04: Rapid Snap Collapse
    masterTl.to(letterElements, {
      x: 0,
      scale: 1,
      duration: 0.2,
      ease: 'power4.in',
    }, '+=0.15');

    // 5. PHASE 05: 36x Camera Warp Directly into Homepage Hero
    masterTl.to(
      lettersContainerRef.current,
      {
        scale: 36,
        opacity: 0,
        filter: 'blur(30px)',
        duration: 0.8,
        ease: 'power3.in',
      },
      '+=0.05'
    );

    // Fade out intro wrapper
    masterTl.to(
      containerRef.current,
      {
        opacity: 0,
        duration: 0.3,
        ease: 'power2.out',
      },
      '-=0.25'
    );

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('keydown', handleKeyDown);
      masterTl.kill();
    };
  }, []);

  const handleSkip = () => {
    sessionStorage.setItem('arass_intro_seen', 'true');
    setPhase('done');
    onComplete();
  };

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label="ARASS Opening Experience"
      className="fixed inset-0 z-[9999] bg-[#01050d] text-primary-text flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Top Status Bar */}
      <div className="relative z-10 flex items-center justify-between px-6 sm:px-12 py-6 text-[10px] font-mono tracking-[0.25em] text-white/50 uppercase">
        <div className="flex items-center gap-3">
          <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
          <span>ARASS // SYSTEM ONLINE</span>
        </div>
        <div className="hidden sm:block text-white/40 tracking-widest">
          AI SYSTEMS • DIGITAL PRODUCTS • AUTOMATION • EXPERIENCES
        </div>
      </div>

      {/* Center Kinetic Logo Stage */}
      <div className="relative z-10 flex-1 flex items-center justify-center">
        {/* Microscopic Signal Pulse */}
        <div
          ref={lightPulseRef}
          className="absolute w-6 h-6 rounded-full bg-electric-cyan blur-sm pointer-events-none"
          style={{ opacity: 0 }}
        />

        {/* Assembling Letters Container (starts at opacity: 0 via inline style to prevent static initial flash) */}
        <div
          ref={lettersContainerRef}
          style={{ opacity: 0 }}
          className="relative flex items-center justify-center gap-1 sm:gap-3 md:gap-4 will-change-transform"
        >
          <div
            ref={letterRefA1}
            style={{ opacity: 0 }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-heading font-black tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
          >
            A
          </div>
          <div
            ref={letterRefR}
            style={{ opacity: 0 }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-heading font-black tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
          >
            R
          </div>
          <div
            ref={letterRefA2}
            style={{ opacity: 0 }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-heading font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white via-electric-cyan to-white drop-shadow-[0_0_40px_rgba(0,212,255,0.8)]"
          >
            A
          </div>
          <div
            ref={letterRefS1}
            style={{ opacity: 0 }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-heading font-black tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
          >
            S
          </div>
          <div
            ref={letterRefS2}
            style={{ opacity: 0 }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[11rem] font-heading font-black tracking-tight text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.4)]"
          >
            S
          </div>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="relative z-10 flex items-center justify-between px-6 sm:px-12 py-6 text-[10px] font-mono tracking-widest text-white/50 uppercase">
        <span className="hidden sm:inline">WE DON&apos;T FOLLOW THE FUTURE. WE BUILD IT.</span>
        <button
          onClick={handleSkip}
          data-cursor="explore"
          className="group flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/15 hover:border-electric-cyan bg-[#020b18]/80 text-white/80 hover:text-electric-cyan transition-all duration-300 ml-auto cursor-pointer focus:outline-none"
        >
          <span>SKIP INTRO</span>
          <span className="text-electric-cyan">[ESC]</span>
        </button>
      </div>
    </div>
  );
}
