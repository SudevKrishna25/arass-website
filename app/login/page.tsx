'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { EventsNavigation } from '@/components/events/EventsNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { Lock, Mail, User, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const endpoint = isRegister ? '/api/events/auth/register' : '/api/events/auth/login';
    const body = isRegister ? { name, email, password } : { email, password };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Authentication failed');

      if (data.user?.role === 'SUPER_ADMIN') {
        router.push('/admin');
      } else if (data.user?.role === 'ORGANIZER') {
        router.push('/organizer/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Authentication failed.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-25" />
      <EventsNavigation />

      <main className="relative z-10 flex-1 max-w-md mx-auto w-full px-4 sm:px-6 py-12 flex flex-col items-center justify-center space-y-6">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-electric-cyan/30 bg-electric-cyan/10 text-[10px] font-mono text-electric-cyan tracking-widest uppercase">
            <Lock className="w-3.5 h-3.5" />
            <span>ARASS AUTHENTICATION</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">
            {isRegister ? 'Create Account' : 'Platform Login'}
          </h1>
          <p className="text-xs font-sans text-white/60 font-light">
            {isRegister
              ? 'Register a participant identity to enter hackathons and build portfolios.'
              : 'Sign in to access your registered events, live submissions, and organizer dashboards.'}
          </p>
        </div>

        <div className="w-full p-8 rounded-3xl border border-white/15 bg-[#020b18]/90 backdrop-blur-2xl shadow-2xl space-y-5">
          {/* Mode Switcher Tabs */}
          <div className="flex border-b border-white/10 pb-2 gap-2 text-xs font-mono">
            <button
              type="button"
              onClick={() => { setIsRegister(false); setError(null); }}
              className={`flex-1 py-2 rounded-xl transition-all ${
                !isRegister
                  ? 'bg-electric-cyan text-background font-bold shadow-[0_0_12px_rgba(0,212,255,0.6)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              LOGIN
            </button>
            <button
              type="button"
              onClick={() => { setIsRegister(true); setError(null); }}
              className={`flex-1 py-2 rounded-xl transition-all ${
                isRegister
                  ? 'bg-electric-cyan text-background font-bold shadow-[0_0_12px_rgba(0,212,255,0.6)]'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              REGISTER
            </button>
          </div>

          {error && (
            <div className="p-4 rounded-2xl border border-red-500/40 bg-red-500/10 text-red-300 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <div>
                <label className="block text-xs font-mono text-white/70 mb-1">Full Name</label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Chen"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-mono focus:outline-none focus:border-electric-cyan"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono text-white/70 mb-1">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3 w-4 h-4 text-white/40" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@arass.local"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-mono focus:outline-none focus:border-electric-cyan"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-mono text-white/70">Password</label>
                {!isRegister && (
                  <Link href="/forgot-password" className="text-[11px] font-mono text-electric-cyan hover:underline">
                    Forgot Password?
                  </Link>
                )}
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3 w-4 h-4 text-white/40" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-mono focus:outline-none focus:border-electric-cyan"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full bg-electric-cyan disabled:opacity-50 text-background font-mono font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,212,255,0.7)] transition-all hover:scale-[1.01]"
              >
                {loading
                  ? 'AUTHENTICATING...'
                  : isRegister
                  ? 'CREATE ACCOUNT →'
                  : 'SIGN IN →'}
              </button>
            </div>
          </form>

          <div className="pt-4 border-t border-white/10 text-center text-xs font-mono text-white/50 space-y-2">
            <div>
              Demo Admin: <span className="text-white">admin@arass.local</span> (ARASS@Admin2026!)
            </div>
            <div>
              Demo Participant: <span className="text-white">alex.chen@sovereign-tech.org</span> (Participant@2026!)
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
