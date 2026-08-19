'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { EventsNavigation } from '@/components/events/EventsNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { ShieldCheck, CheckCircle2, AlertCircle } from 'lucide-react';

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token') || '';

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/events/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, newPassword: password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Password reset failed.');

      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Password reset failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl border border-white/15 bg-[#020b18]/85 backdrop-blur-2xl shadow-2xl space-y-6">
        <div className="space-y-2 text-center">
          <div className="inline-flex p-3 rounded-2xl bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan mb-2">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-heading font-black text-white">Create New Password</h1>
          <p className="text-xs font-sans text-white/70 font-light">
            Enter a strong cryptographic secret (minimum 8 characters).
          </p>
        </div>

        {error && (
          <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-mono space-y-3">
            <div className="flex items-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>PASSWORD UPDATED</span>
            </div>
            <p className="text-white/80 font-sans font-light leading-relaxed">
              Your password has been successfully updated and verified.
            </p>
            <Link
              href="/login"
              className="inline-block mt-2 px-6 py-2.5 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs hover:scale-105 transition-all"
            >
              SIGN IN NOW →
            </Link>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-white/70 mb-1">New Password</label>
              <input
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-mono focus:outline-none focus:border-electric-cyan transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-white/70 mb-1">Confirm New Password</label>
              <input
                type="password"
                required
                minLength={8}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-4 py-3 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-mono focus:outline-none focus:border-electric-cyan transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !token}
              className="w-full py-3 rounded-full bg-electric-cyan disabled:opacity-50 text-background font-mono font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,212,255,0.7)] transition-all hover:scale-[1.02]"
            >
              {loading ? 'SECURING PASSWORD...' : 'UPDATE PASSWORD →'}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-25" />
      <EventsNavigation />
      <Suspense fallback={<div className="text-center py-20 text-white font-mono text-xs">LOADING...</div>}>
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
}
