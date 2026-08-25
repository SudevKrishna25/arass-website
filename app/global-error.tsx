'use client';

import React from 'react';

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#020914] text-[#E6F7FF] min-h-screen flex items-center justify-center p-6 font-mono">
        <div className="max-w-md w-full text-center space-y-6 p-8 rounded-3xl border border-white/10 bg-[#020b18]/90">
          <h2 className="text-xl font-bold text-white tracking-wider">CRITICAL SYSTEM ERROR</h2>
          <p className="text-xs text-white/60">A global application fault occurred.</p>
          <button
            onClick={() => reset()}
            className="px-6 py-3 rounded-full bg-[#00D4FF] text-[#020914] font-bold text-xs tracking-widest hover:brightness-110 transition-all"
          >
            REBOOT CORE
          </button>
        </div>
      </body>
    </html>
  );
}
