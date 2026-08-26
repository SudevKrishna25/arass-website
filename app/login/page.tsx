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

  // Google Simulation State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');

  const handleGoogleLogin = async (selectedEmail: string, selectedName: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/events/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: selectedEmail, name: selectedName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Google sign-in failed');
      
      if (data.user?.role === 'SUPER_ADMIN') {
        router.push('/admin');
      } else if (data.user?.role === 'ORGANIZER') {
        router.push('/organizer/dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Google Auth error.');
      setLoading(false);
    }
  };

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

          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setShowGoogleModal(true)}
              className="w-full py-3 rounded-full bg-white hover:bg-white/95 text-black font-mono font-bold text-xs tracking-wider flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(255,255,255,0.15)]"
            >
              {/* Google Icon */}
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.47 15.01.5 12 .5 7.42.5 3.51 3.12 1.6 6.94l3.96 3.07C6.47 7.28 9.03 5.04 12 5.04z"
                />
                <path
                  fill="#4285F4"
                  d="M23.49 12.27c0-.81-.07-1.59-.2-2.35H12v4.51h6.44c-.28 1.48-1.12 2.73-2.38 3.58l3.7 2.87c2.16-1.99 3.73-4.92 3.73-8.61z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.56 14.86a7.1 7.1 0 0 1 0-4.32L1.6 7.47a11.96 11.96 0 0 0 0 9.06l3.96-3.07z"
                />
                <path
                  fill="#34A853"
                  d="M12 18.96c-2.97 0-5.53-2.24-6.44-4.97L1.6 17.06C3.51 20.88 7.42 23.5 12 23.5c3.08 0 5.67-1.02 7.56-2.77l-3.7-2.87c-1.04.7-2.38 1.1-3.86 1.1z"
                />
              </svg>
              <span>SIGN IN WITH GOOGLE</span>
            </button>

            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[10px] font-mono text-white/40">OR USE CREDENTIALS</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

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
                <label className="block text-xs font-mono text-white/70 mb-1">Username or Email</label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Username (e.g. sudevkrishna) or Email"
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
                    : 'SIGN IN TO ARASS →'}
                </button>
              </div>
            </form>
          </div>

          {/* 5 Sovereign Founders Fast Access */}
          <div className="pt-4 border-t border-white/10 space-y-2">
            <div className="text-[10px] font-mono text-electric-cyan uppercase tracking-widest text-center font-bold">
              ★ FIVE SOVEREIGN FOUNDERS ACCESS
            </div>
            <div className="grid grid-cols-1 gap-1 text-[11px] font-mono text-white/70">
              {[
                { u: 'sudevkrishna', p: 'Arass@123-admin001', n: 'Sudev Krishna (Lead)' },
                { u: 'abhinavajith', p: 'Arass@123-admin002', n: 'Abhinav Ajith' },
                { u: 'abelsangeeth', p: 'Arass@123-admin003', n: 'Abel Sangeeth' },
                { u: 'ryanpaul', p: 'Arass@123-admin004', n: 'Ryan Paul' },
                { u: 'sanikuttan', p: 'Arass@123-admin005', n: 'Sani Kuttan' },
              ].map((f) => (
                <button
                  key={f.u}
                  type="button"
                  onClick={() => {
                    setEmail(f.u);
                    setPassword(f.p);
                    setIsRegister(false);
                  }}
                  className="px-3 py-1.5 rounded-lg border border-white/10 hover:border-electric-cyan/50 bg-white/[0.02] flex items-center justify-between text-left transition-colors"
                >
                  <span className="text-white font-bold">{f.n}</span>
                  <span className="text-electric-cyan text-[10px]">Auto-Fill</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Simulated Google Accounts Selector Modal */}
      {showGoogleModal && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#020b18] border border-white/20 p-6 rounded-3xl space-y-4 font-mono text-xs text-white">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <h3 className="text-sm font-bold text-white tracking-widest uppercase flex items-center gap-2">
                {/* Google Logo SVG */}
                <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.67 1.47 15.01.5 12 .5 7.42.5 3.51 3.12 1.6 6.94l3.96 3.07C6.47 7.28 9.03 5.04 12 5.04z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.49 12.27c0-.81-.07-1.59-.2-2.35H12v4.51h6.44c-.28 1.48-1.12 2.73-2.38 3.58l3.7 2.87c2.16-1.99 3.73-4.92 3.73-8.61z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.56 14.86a7.1 7.1 0 0 1 0-4.32L1.6 7.47a11.96 11.96 0 0 0 0 9.06l3.96-3.07z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 18.96c-2.97 0-5.53-2.24-6.44-4.97L1.6 17.06C3.51 20.88 7.42 23.5 12 23.5c3.08 0 5.67-1.02 7.56-2.77l-3.7-2.87c-1.04.7-2.38 1.1-3.86 1.1z"
                  />
                </svg>
                <span>CHOOSE A GOOGLE ACCOUNT</span>
              </h3>
              <button
                onClick={() => setShowGoogleModal(false)}
                className="text-white/60 hover:text-white"
              >
                CLOSE
              </button>
            </div>

            <p className="text-white/60 font-sans font-light">
              Select a pre-configured Google account or enter a custom one:
            </p>

            <div className="space-y-2">
              {[
                { name: 'Alex Chen', email: 'alex.chen@sovereign-tech.org' },
                { name: 'Marcus Lindqvist', email: 'marcus.systems@gmail.com' },
              ].map((acc) => (
                <button
                  key={acc.email}
                  onClick={() => handleGoogleLogin(acc.email, acc.name)}
                  className="w-full p-4 rounded-2xl border border-white/10 hover:border-electric-cyan/40 bg-[#01050d] text-left flex justify-between items-center group transition-colors"
                >
                  <div>
                    <div className="text-white font-bold group-hover:text-electric-cyan transition-colors">{acc.name}</div>
                    <div className="text-white/50 text-[10px]">{acc.email}</div>
                  </div>
                  <span className="text-[10px] font-mono text-electric-cyan/70 group-hover:text-electric-cyan uppercase">
                    SELECT →
                  </span>
                </button>
              ))}
            </div>

            <div className="pt-2 border-t border-white/10 space-y-3">
              <span className="text-[10px] font-mono text-white/50 uppercase">OR CUSTOM ACCOUNT</span>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Full Name (e.g. John Doe)"
                  value={customGoogleName}
                  onChange={(e) => setCustomGoogleName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
                />
                <input
                  type="email"
                  placeholder="Email Address (e.g. john@gmail.com)"
                  value={customGoogleEmail}
                  onChange={(e) => setCustomGoogleEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
                />
                <button
                  onClick={() => {
                    if (customGoogleEmail && customGoogleName) {
                      handleGoogleLogin(customGoogleEmail, customGoogleName);
                    }
                  }}
                  disabled={!customGoogleEmail || !customGoogleName}
                  className="w-full py-2.5 rounded-xl bg-electric-cyan disabled:opacity-50 text-background font-mono font-bold text-xs"
                >
                  CONNECT CUSTOM GOOGLE ACCOUNT →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
