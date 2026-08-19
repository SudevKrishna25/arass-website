'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { EventsNavigation } from '@/components/events/EventsNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { KeyRound, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch('/api/events/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Request failed.');

      setMessage(data.message || 'If an account exists, a reset link has been dispatched.');
    } catch (err: any) {
      setError(err.message || 'Unable to process reset request.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-25" />
      <EventsNavigation />

      <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
        <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl border border-white/15 bg-[#020b18]/85 backdrop-blur-2xl shadow-2xl space-y-6">
          <div className="space-y-2 text-center">
            <div className="inline-flex p-3 rounded-2xl bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan mb-2">
              <KeyRound className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-heading font-black text-white">Reset Account Password</h1>
            <p className="text-xs font-sans text-white/70 font-light">
              Enter your registered email address to receive an authorization link.
            </p>
          </div>

          {error && (
            <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {message ? (
            <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-mono space-y-3">
              <div className="flex items-center gap-2 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>REQUEST TRANSMITTED</span>
              </div>
              <p className="text-white/80 font-sans font-light leading-relaxed">{message}</p>
              <Link
                href="/login"
                className="inline-block mt-2 text-electric-cyan font-mono text-xs hover:underline"
              >
                ← Return to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-white/70 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex.chen@sovereign-tech.org"
                  className="w-full px-4 py-3 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-mono focus:outline-none focus:border-electric-cyan transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full bg-electric-cyan disabled:opacity-50 text-background font-mono font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,212,255,0.7)] transition-all hover:scale-[1.02]"
              >
                {loading ? 'TRANSMITTING TOKEN...' : 'DISPATCH RESET LINK →'}
              </button>

              <div className="text-center pt-2">
                <Link
                  href="/login"
                  className="inline-flex items-center gap-1.5 text-xs font-mono text-white/50 hover:text-white transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </Link>
              </div>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
