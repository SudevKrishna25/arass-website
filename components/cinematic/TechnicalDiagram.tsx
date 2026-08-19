'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface NodeItem {
  id: string;
  label: string;
  sublabel: string;
  code: string;
  status: string;
}

const DEFAULT_NODES: NodeItem[] = [
  { id: 'input', label: '01 / INPUT', sublabel: 'Foundational Physics & Axioms', code: 'AXM-9', status: 'SYNCHRONIZED' },
  { id: 'research', label: '02 / RESEARCH', sublabel: 'Atomic & Quantum Modeling', code: 'Q-SIM', status: 'ACTIVE' },
  { id: 'model', label: '03 / MODEL', sublabel: 'Photonic & Neural Simulation', code: 'SIM-X', status: 'COMPUTING' },
  { id: 'validation', label: '04 / VALIDATE', sublabel: 'Cryogenic & Thermal Testing', code: 'TRL-6', status: 'VERIFIED' },
  { id: 'system', label: '05 / SYSTEM', sublabel: 'Sovereign Architecture Build', code: 'SYS-0', status: 'INTEGRATED' },
  { id: 'deployment', label: '06 / DEPLOY', sublabel: 'Planetary Infrastructure Scale', code: 'PLN-1', status: 'OPERATIONAL' },
];

export function TechnicalDiagram({
  nodes = DEFAULT_NODES,
  className = '',
}: {
  nodes?: NodeItem[];
  className?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    if (!containerRef.current || !pathRef.current) return;

    const path = pathRef.current;
    const pathLength = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength,
    });

    const ctx = gsap.context(() => {
      gsap.to(path, {
        strokeDashoffset: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 60%',
          scrub: 1.2,
        },
      });

      // Animate node entries
      const nodeElements = containerRef.current?.querySelectorAll('.diagram-node');
      if (nodeElements) {
        gsap.fromTo(
          nodeElements,
          { opacity: 0.2, y: 20 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 70%',
              end: 'bottom 70%',
              scrub: 1,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className={`relative w-full max-w-5xl mx-auto py-12 px-4 ${className}`}>
      {/* SVG Connection Trace */}
      <div className="hidden md:block absolute inset-x-8 top-16 bottom-16 pointer-events-none">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1000 400">
          <defs>
            <linearGradient id="cyanLineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#1E90FF" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.8" />
            </linearGradient>
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <path
            ref={pathRef}
            d="M 60 50 C 250 50, 250 180, 500 180 C 750 180, 750 340, 940 340"
            fill="none"
            stroke="url(#cyanLineGrad)"
            strokeWidth="2"
            filter="url(#glow)"
          />
        </svg>
      </div>

      {/* Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        {nodes.map((node) => (
          <div
            key={node.id}
            className="diagram-node group relative p-6 rounded-xl bg-[#020b18]/80 border border-electric-cyan/20 hover:border-electric-cyan/60 transition-all duration-500 backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]"
          >
            {/* Header Telemetry */}
            <div className="flex items-center justify-between text-[9px] font-mono tracking-widest text-secondary-text/60 mb-3">
              <span className="text-electric-cyan font-bold">{node.code}</span>
              <span className="px-2 py-0.5 rounded-full border border-electric-cyan/30 text-electric-cyan/90 bg-electric-cyan/5">
                {node.status}
              </span>
            </div>

            {/* Title & Sublabel */}
            <h4 className="text-sm font-mono font-bold tracking-widest text-primary-text mb-1">
              {node.label}
            </h4>
            <p className="text-xs text-secondary-text/80 leading-relaxed font-sans">
              {node.sublabel}
            </p>

            {/* Corner Decorative Accent */}
            <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-electric-cyan/40 rounded-full group-hover:scale-150 transition-transform duration-300" />
          </div>
        ))}
      </div>
    </div>
  );
}
