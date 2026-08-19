'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { EventsNavigation } from '@/components/events/EventsNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { MailCheck, CheckCircle2, AlertCircle } from 'lucide-react';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';

  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError('Verification token is missing from the request URL.');
      setLoading(false);
      return;
    }

    const verify = async () => {
      try {
        const res = await fetch('/api/events/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Verification failed.');

        setSuccess(true);
      } catch (err: any) {
        setError(err.message || 'Verification token is invalid or expired.');
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [token]);

  return (
    <main className="relative z-10 flex-1 flex items-center justify-center px-4 sm:px-6 py-12">
      <div className="max-w-md w-full p-8 sm:p-10 rounded-3xl border border-white/15 bg-[#020b18]/85 backdrop-blur-2xl shadow-2xl space-y-6 text-center">
        <div className="inline-flex p-3 rounded-2xl bg-electric-cyan/10 border border-electric-cyan/20 text-electric-cyan mb-2">
          <MailCheck className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-heading font-black text-white">Email Verification</h1>

        {loading && (
          <div className="text-xs font-mono text-electric-cyan animate-pulse py-4">
            AUTHENTICATING VERIFICATION TOKEN...
          </div>
        )}

        {error && (
          <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-xs font-mono flex items-center gap-2 justify-center">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {success && (
          <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-mono space-y-3">
            <div className="flex items-center justify-center gap-2 font-bold">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>EMAIL OFFICIALLY VERIFIED</span>
            </div>
            <p className="text-white/80 font-sans font-light leading-relaxed">
              Your identity has been verified. You have full access to competition registrations and deliverable submissions.
            </p>
            <Link
              href="/dashboard"
              className="inline-block mt-2 px-6 py-2.5 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs hover:scale-105 transition-all"
            >
              GO TO COMMAND CENTER →
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-25" />
      <EventsNavigation />
      <Suspense fallback={<div className="text-center py-20 text-white font-mono text-xs">LOADING...</div>}>
        <VerifyEmailContent />
      </Suspense>
    </div>
  );
}
