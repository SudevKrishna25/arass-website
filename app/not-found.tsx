'use client';

import React from 'react';
import Link from 'next/link';
import { Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl border border-white/10 bg-[#020b18]/80 backdrop-blur-2xl shadow-2xl">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-electric-cyan/10 border border-electric-cyan/30 flex items-center justify-center text-electric-cyan">
          <Compass className="w-7 h-7 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <div className="text-4xl font-heading font-black text-white tracking-tight">404</div>
          <h2 className="text-lg font-mono text-electric-cyan uppercase tracking-widest">
            Sector Not Found
          </h2>
          <p className="text-xs sm:text-sm font-sans text-white/70 leading-relaxed font-light">
            The telemetry coordinates or system endpoint you requested does not exist on this network.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-wider transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,212,255,0.4)]"
          >
            <Home className="w-3.5 h-3.5" />
            <span>RETURN TO ARASS CORE</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
