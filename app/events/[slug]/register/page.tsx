'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { EventsNavigation } from '@/components/events/EventsNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { Event, RegistrationField } from '@/lib/events-db/types';
import { CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, UserCheck, Users, Sparkles } from 'lucide-react';

export default function EventRegistrationPage() {
  const params = useParams();
  const slug = params.slug as string;
  const router = useRouter();

  const [event, setEvent] = useState<Event | null>(null);
  const [fields, setFields] = useState<RegistrationField[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [step, setStep] = useState<number>(1);

  // Google Simulation State
  const [showGoogleModal, setShowGoogleModal] = useState(false);
  const [customGoogleEmail, setCustomGoogleEmail] = useState('');
  const [customGoogleName, setCustomGoogleName] = useState('');

  // Form State
  const [user, setUser] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [participationMode, setParticipationMode] = useState<'INDIVIDUAL' | 'CREATE_TEAM' | 'JOIN_TEAM'>('INDIVIDUAL');
  const [teamName, setTeamName] = useState('');
  const [teamCode, setTeamCode] = useState('');
  const [customAnswers, setCustomAnswers] = useState<Record<string, any>>({});
  const [agreeTerms, setAgreeTerms] = useState(false);

  const handleGoogleLogin = async (selectedEmail: string, selectedName: string) => {
    setError(null);
    try {
      const res = await fetch('/api/events/auth/google', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: selectedEmail, name: selectedName }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Google sign-in failed');
      
      setUser(data.user);
      setName(data.profile?.name || selectedName);
      setEmail(data.user.email);
      setCollege(data.profile?.college || '');
      setShowGoogleModal(false);
      setStep(2);
    } catch (err: any) {
      setError(err.message || 'Google Auth error.');
    }
  };

  useEffect(() => {
    // Check auth status
    fetch('/api/events/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
          setName(data.profile?.name || '');
          setCollege(data.profile?.college || '');
          setEmail(data.user.email);
        }
      });

    // Load event data
    fetch(`/api/events/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.event) {
          setEvent(data.event);
          setFields(data.registrationFields || []);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch('/api/events/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name, college }),
      });
      const data = await res.json();
      if (!res.ok) {
        // If user already exists, try logging in
        const loginRes = await fetch('/api/events/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password }),
        });
        const loginData = await loginRes.json();
        if (!loginRes.ok) throw new Error(loginData.error || 'Authentication failed');
        setUser(loginData.user);
        setName(loginData.profile?.name || name);
      } else {
        setUser(data.user);
      }
      setStep(2);
    } catch (err: any) {
      setError(err.message || 'Authentication error.');
    }
  };

  const handleFinalSubmit = async () => {
    if (!agreeTerms) {
      setError('You must agree to the competition terms and code of conduct.');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      let assignedTeamId: string | undefined = undefined;

      // Handle team creation if selected
      if (participationMode === 'CREATE_TEAM' && teamName.trim() && event) {
        const teamRes = await fetch(`/api/events/${event.id}/teams`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name: teamName.trim() }),
        });
        const teamData = await teamRes.json();
        if (!teamRes.ok) throw new Error(teamData.error || 'Failed to create team');
        assignedTeamId = teamData.team.id;
      }

      // Submit registration
      if (!event) throw new Error('Event not loaded');
      const regRes = await fetch(`/api/events/${event.id}/registrations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          teamId: assignedTeamId,
          customValues: customAnswers,
        }),
      });

      const regData = await regRes.json();
      if (!regRes.ok) {
        if (regData.error && regData.error.toLowerCase().includes('already registered')) {
          router.push(`/events/${event.slug}/live`);
          return;
        }
        throw new Error(regData.error || 'Registration failed');
      }

      // Success -> Redirect to Live Event Portal
      router.push(`/events/${event.slug}/live`);
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please try again.');
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#01050d] flex items-center justify-center text-white font-mono text-sm">
        INITIALIZING REGISTRATION PORTAL...
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#01050d] flex items-center justify-center text-white">
        Event not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-20" />
      <EventsNavigation />

      <main className="relative z-10 flex-1 max-w-3xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 space-y-8">
        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-electric-cyan/30 bg-electric-cyan/10 text-[10px] font-mono text-electric-cyan tracking-widest uppercase">
            <span>OFFICIAL REGISTRATION</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-heading font-black text-white">{event.name}</h1>
          <p className="text-xs sm:text-sm font-sans text-white/70 font-light">
            Complete your registration details to gain access to the live competition stage.
          </p>
        </div>

        {/* Multi-Step Wizard Container */}
        <div className="p-6 sm:p-10 rounded-3xl border border-white/15 bg-[#020b18]/85 backdrop-blur-2xl shadow-2xl space-y-6">
          {/* Progress Indicator */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono text-white/60">
            <span className="text-electric-cyan font-bold">STEP 0{step} OF 03</span>
            <span>
              {step === 1 && 'Participant Authentication'}
              {step === 2 && 'Team & Custom Details'}
              {step === 3 && 'Verification & Terms'}
            </span>
          </div>

          {error && (
            <div className="p-4 rounded-xl border border-red-500/40 bg-red-500/10 text-red-300 text-xs font-mono">
              {error}
            </div>
          )}

          {/* STEP 1: AUTHENTICATION */}
          {step === 1 && (
            <div className="space-y-5">
              {user ? (
                <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-mono text-xs font-semibold">
                    <UserCheck className="w-4 h-4" />
                    <span>AUTHENTICATED AS: {name || user.email}</span>
                  </div>
                  <p className="text-xs font-sans text-white/80 font-light">
                    Logged in with <span className="font-mono text-white">{user.email}</span>.
                  </p>
                  <button
                    onClick={() => setStep(2)}
                    className="mt-3 px-6 py-2 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs"
                  >
                    CONTINUE AS {name || 'PARTICIPANT'} →
                  </button>
                </div>
              ) : (
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
                    <span className="text-[10px] font-mono text-white/40">OR USE EMAIL</span>
                    <div className="flex-1 h-px bg-white/10" />
                  </div>

                  <form onSubmit={handleAuthSubmit} className="space-y-4">
                    <h3 className="text-sm font-mono tracking-wider text-white uppercase">Enter Your Credentials</h3>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-mono text-white/70 mb-1">Full Name</label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="Alex Chen"
                          className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-mono focus:outline-none focus:border-electric-cyan"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-white/70 mb-1">Email Address</label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@university.edu"
                          className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-mono focus:outline-none focus:border-electric-cyan"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-white/70 mb-1">Password</label>
                        <input
                          type="password"
                          required
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="••••••••••••"
                          className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-mono focus:outline-none focus:border-electric-cyan"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-white/70 mb-1">College / University</label>
                        <input
                          type="text"
                          required
                          value={college}
                          onChange={(e) => setCollege(e.target.value)}
                          placeholder="Stanford University"
                          className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-mono focus:outline-none focus:border-electric-cyan"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-wider hover:shadow-[0_0_20px_rgba(0,212,255,0.7)] transition-all"
                    >
                      AUTHENTICATE & PROCEED →
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* STEP 2: TEAM & CUSTOM EVENT DETAILS */}
          {step === 2 && (
            <div className="space-y-6">
              {/* Participation Mode */}
              <div className="space-y-3">
                <label className="block text-xs font-mono text-white/80 uppercase">Participation Format</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { id: 'INDIVIDUAL', label: 'Solo / Individual' },
                    { id: 'CREATE_TEAM', label: 'Create New Team' },
                    { id: 'JOIN_TEAM', label: 'Join Existing Team' },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => setParticipationMode(opt.id as any)}
                      className={`p-3 rounded-xl border text-xs font-mono text-left transition-all ${
                        participationMode === opt.id
                          ? 'border-electric-cyan bg-electric-cyan/15 text-white font-bold'
                          : 'border-white/10 text-white/70 bg-[#01050d]/60'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>

                {participationMode === 'CREATE_TEAM' && (
                  <div className="pt-2">
                    <label className="block text-xs font-mono text-white/70 mb-1">Team Name</label>
                    <input
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      placeholder="e.g. Synapse Autonomous Labs"
                      className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-mono focus:outline-none focus:border-electric-cyan"
                    />
                  </div>
                )}
              </div>

              {/* Dynamic Registration Fields */}
              {fields.length > 0 && (
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h4 className="text-xs font-mono text-white/80 uppercase">Event Questions</h4>
                  {fields.map((f) => (
                    <div key={f.id} className="space-y-1">
                      <label className="block text-xs font-mono text-white/70">
                        {f.label} {f.required && <span className="text-electric-cyan">*</span>}
                      </label>

                      {f.type === 'SELECT' && f.options ? (
                        <select
                          value={customAnswers[f.id] || ''}
                          onChange={(e) => setCustomAnswers({ ...customAnswers, [f.id]: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-mono focus:outline-none focus:border-electric-cyan"
                        >
                          <option value="">Select option...</option>
                          {f.options.map((opt) => (
                            <option key={opt} value={opt}>
                              {opt}
                            </option>
                          ))}
                        </select>
                      ) : (
                        <input
                          type={f.type === 'URL' ? 'url' : 'text'}
                          required={f.required}
                          value={customAnswers[f.id] || ''}
                          onChange={(e) => setCustomAnswers({ ...customAnswers, [f.id]: e.target.value })}
                          placeholder={f.placeholder || 'Your response...'}
                          className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-mono focus:outline-none focus:border-electric-cyan"
                        />
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Buttons */}
              <div className="flex items-center justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-full border border-white/15 text-white/70 hover:text-white font-mono text-xs"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs"
                >
                  Review & Confirm →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW & TERMS */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl border border-white/10 bg-[#01050d]/60 space-y-3 text-xs font-mono">
                <h4 className="text-white font-bold uppercase tracking-wider text-xs border-b border-white/10 pb-2">
                  Registration Summary
                </h4>
                <div className="grid grid-cols-2 gap-2 text-white/80">
                  <div>Participant: <span className="text-white font-semibold">{name}</span></div>
                  <div>Format: <span className="text-white font-semibold">{participationMode}</span></div>
                  {participationMode === 'CREATE_TEAM' && (
                    <div className="col-span-2">Team Name: <span className="text-electric-cyan">{teamName}</span></div>
                  )}
                </div>
              </div>

              {/* Code of Conduct Checkbox */}
              <label className="flex items-start gap-3 text-xs font-sans text-white/80 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded border-white/20 bg-[#01050d] text-electric-cyan focus:ring-0"
                />
                <span>
                  I agree to the ARASS Events Code of Conduct, intellectual property integrity policy, and competition guidelines.
                </span>
              </label>

              {/* Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 rounded-full border border-white/15 text-white/70 hover:text-white font-mono text-xs"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  disabled={submitting || !agreeTerms}
                  onClick={handleFinalSubmit}
                  className="px-8 py-3 rounded-full bg-electric-cyan disabled:opacity-50 text-background font-mono font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,212,255,0.8)] transition-all hover:scale-105"
                >
                  {submitting ? 'PROCESSING REGISTRATION...' : 'CONFIRM & ENTER COMPETITION →'}
                </button>
              </div>
            </div>
          )}
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
              Select a pre-configured Google account for sandbox event registration or enter a custom one:
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
