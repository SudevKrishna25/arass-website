'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { TechnicalOverlay } from '@/components/cinematic/TechnicalOverlay';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { ShieldCheck, Send, CheckCircle2, Lock } from 'lucide-react';

const ACCESS_PROFILES = [
  { id: 'RESEARCHER / SCIENTIST', code: '01', name: 'RESEARCHER / SCIENTIST', desc: 'Laboratory Fellowship & Scientific Director Mandates' },
  { id: 'FOUNDER / BUILDER', code: '02', name: 'FOUNDER / BUILDER', desc: 'Venture Factory Incubation & Hard-Tech Co-founding' },
  { id: 'STRATEGIC CAPITAL', code: '03', name: 'STRATEGIC CAPITAL', desc: 'Sovereign Wealth & Direct Venture Allocation' },
  { id: 'INSTITUTIONAL PARTNER', code: '04', name: 'INSTITUTIONAL PARTNER', desc: 'State Infrastructure & Planetary Deployment' },
  { id: 'GENERAL INQUIRY', code: '05', name: 'GENERAL INQUIRY', desc: 'Press, Archive Access & Institutional Briefings' },
];

export default function ContactPage() {
  const [profile, setProfile] = useState('RESEARCHER / SCIENTIST');
  const [fullName, setFullName] = useState('');
  const [organization, setOrganization] = useState('');
  const [email, setEmail] = useState('');
  const [transmission, setTransmission] = useState('');
  const [status, setStatus] = useState<'idle' | 'transmitting' | 'received'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !transmission) return;

    setStatus('transmitting');

    try {
      await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: fullName.trim(),
          email: email.trim(),
          organization: organization.trim(),
          alignment: profile,
          message: transmission.trim(),
        }),
      });
    } catch (err) {
      console.error('Transmission dispatch error:', err);
    }

    setStatus('received');
  };

  return (
    <div className="relative w-full bg-background text-primary-text min-h-screen">
      {/* 01: Hero Arrival */}
      <section className="relative min-h-[70vh] w-full flex items-center justify-center overflow-hidden pt-28 sm:pt-32 pb-12">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/arass_contact_sanctuary.jpg"
            alt="ARASS Institutional Access Sanctuary"
            fill
            priority
            className="object-cover brightness-40 contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-transparent to-background/90" />
        </div>

        {/* Live Atmosphere Engine */}
        <LiveCinematicAtmosphere />

        <TechnicalOverlay
          sectionCode="ACC-11"
          stageName="INSTITUTIONAL GATEWAY"
          coordinates="46.2044° N, 6.1432° E"
          classification="ENCRYPTED TLS 1.3 // 4096-BIT TRANSMISSION"
        />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center space-y-5">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-electric-cyan/40 bg-[#020b18]/85 backdrop-blur-md text-[10px] font-mono tracking-[0.3em] text-electric-cyan uppercase">
            <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
            CHAPTER 11 // INSTITUTIONAL ACCESS
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tight leading-[1.08] text-primary-text">
            ENTER <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric-cyan via-white to-electric-cyan drop-shadow-[0_0_35px_rgba(0,212,255,0.4)]">
              ARASS
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-xs sm:text-sm md:text-base font-sans text-white/85 leading-relaxed font-normal drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)]">
            Encrypted institutional transmission gateway for sovereign partners, exceptional physical researchers,
            and permanent capital allocators.
          </p>
        </div>
      </section>

      {/* 02: Institutional Protocol Form */}
      <section className="relative py-16 px-6 sm:px-12 max-w-4xl mx-auto pb-32">
        <div className="rounded-2xl bg-[#020b18]/90 border border-electric-cyan/30 p-6 sm:p-12 backdrop-blur-2xl shadow-[0_0_80px_rgba(0,212,255,0.15)] space-y-10">
          {status === 'received' ? (
            <div data-testid="receipt-banner" className="py-12 text-center space-y-6 animate-in fade-in zoom-in duration-500">
              <div className="w-16 h-16 rounded-full bg-electric-cyan/20 border border-electric-cyan mx-auto flex items-center justify-center text-electric-cyan shadow-cyan-glow">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <span className="text-[10px] font-mono tracking-[0.4em] text-electric-cyan uppercase">
                  TRANSMISSION RECEIVED
                </span>
                <h2 className="text-2xl sm:text-4xl font-heading font-black text-primary-text">
                  ARASS WILL REVIEW YOUR INQUIRY.
                </h2>
                <p className="text-sm font-sans text-secondary-text max-w-md mx-auto leading-relaxed">
                  Your communication has been cryptographically sealed and dispatched to the appropriate
                  Directorate. Priority responses occur within 48 institutional hours.
                </p>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => {
                    setStatus('idle');
                    setTransmission('');
                  }}
                  className="px-6 py-2.5 rounded-full border border-electric-cyan/40 hover:border-electric-cyan text-xs font-mono text-electric-cyan hover:bg-electric-cyan/10 transition-all cursor-pointer"
                >
                  TRANSMIT ANOTHER INQUIRY
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Profile Selection */}
              <div className="space-y-3">
                <div className="flex items-center justify-between text-[10px] font-mono text-secondary-text/70 uppercase">
                  <span>01 // SELECT INSTITUTIONAL PROFILE</span>
                  <span className="text-electric-cyan font-bold">{profile}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {ACCESS_PROFILES.map((p) => {
                    const isSelected = profile === p.id;
                    return (
                      <button
                        type="button"
                        key={p.id}
                        onClick={() => setProfile(p.id)}
                        className={`p-3 rounded-xl text-left border transition-all duration-300 ${
                          isSelected
                            ? 'bg-electric-cyan/15 border-electric-cyan text-primary-text shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                            : 'bg-[#020914] border-white/10 text-secondary-text/70 hover:border-electric-cyan/40 hover:text-electric-cyan'
                        }`}
                      >
                        <div className="text-[9px] font-mono text-electric-cyan font-bold mb-1">
                          {p.code}
                        </div>
                        <div className="text-xs font-mono font-bold uppercase truncate">{p.name}</div>
                        <div className="text-[9px] font-sans text-secondary-text/60 truncate pt-1">
                          {p.desc}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Form Inputs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-secondary-text/70 uppercase tracking-wider block">
                    FULL NAME *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Dr. Alexander Vance"
                    className="w-full px-4 py-3 rounded-xl bg-[#020914] border border-white/10 focus:border-electric-cyan text-sm font-sans text-primary-text placeholder:text-secondary-text/30 focus:outline-none transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-secondary-text/70 uppercase tracking-wider block">
                    INSTITUTION / ORGANIZATION
                  </label>
                  <input
                    type="text"
                    value={organization}
                    onChange={(e) => setOrganization(e.target.value)}
                    placeholder="Max Planck / CERN / Sovereign Fund"
                    className="w-full px-4 py-3 rounded-xl bg-[#020914] border border-white/10 focus:border-electric-cyan text-sm font-sans text-primary-text placeholder:text-secondary-text/30 focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-secondary-text/70 uppercase tracking-wider block">
                  OFFICIAL INSTITUTIONAL EMAIL *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="vance@institute.org"
                  className="w-full px-4 py-3 rounded-xl bg-[#020914] border border-white/10 focus:border-electric-cyan text-sm font-sans text-primary-text placeholder:text-secondary-text/30 focus:outline-none transition-colors"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-mono text-secondary-text/70 uppercase tracking-wider block">
                  TECHNICAL DOSSIER / PROPOSAL TRANSMISSION *
                </label>
                <textarea
                  required
                  rows={4}
                  value={transmission}
                  onChange={(e) => setTransmission(e.target.value)}
                  placeholder="Detail the scientific thesis, capital mandate, or infrastructure partnership proposal..."
                  className="w-full px-4 py-3 rounded-xl bg-[#020914] border border-white/10 focus:border-electric-cyan text-sm font-sans text-primary-text placeholder:text-secondary-text/30 focus:outline-none transition-colors resize-none"
                />
              </div>

              {/* Submit Protocol Action */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="flex items-center gap-2 text-[10px] font-mono text-secondary-text/60">
                  <Lock className="w-3.5 h-3.5 text-electric-cyan" />
                  <span>END-TO-END CRYPTOGRAPHIC TRANSMISSION</span>
                </div>

                <button
                  type="submit"
                  data-testid="contact-submit-btn"
                  disabled={status === 'transmitting'}
                  data-cursor="explore"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-cyan-glow transition-all hover:scale-105 disabled:opacity-50 cursor-pointer"
                >
                  <span>{status === 'transmitting' ? 'SEALING TRANSMISSION...' : 'SEND TRANSMISSION ↗'}</span>
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
