'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RotateCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Runtime Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl border border-white/10 bg-[#020b18]/80 backdrop-blur-2xl shadow-2xl">
        <div className="w-14 h-14 mx-auto rounded-2xl bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
          <AlertTriangle className="w-7 h-7" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-heading font-black tracking-tight text-white">
            System Telemetry Anomaly
          </h2>
          <p className="text-xs sm:text-sm font-sans text-white/70 leading-relaxed font-light">
            An unexpected error occurred while executing this component stream.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-wider transition-all duration-300 hover:scale-105 shadow-[0_0_20px_rgba(0,212,255,0.4)]"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>RETRY PROCESS</span>
          </button>

          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-white/20 bg-white/5 hover:border-electric-cyan/40 text-white font-mono font-medium text-xs tracking-wider transition-colors"
          >
            <Home className="w-3.5 h-3.5" />
            <span>RETURN HOME</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
