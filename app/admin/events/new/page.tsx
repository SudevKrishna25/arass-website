'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { AdminNavigation } from '@/components/admin/AdminNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { CheckCircle2, AlertCircle, ArrowLeft, Eye, Send } from 'lucide-react';

export default function NewEventPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'BUILDER' | 'CHECKLIST' | 'PREVIEW'>('BUILDER');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [eventType, setEventType] = useState('HACKATHON');
  const [mode, setMode] = useState('ONLINE');
  const [shortDescription, setShortDescription] = useState('');
  const [description, setDescription] = useState('');
  const [registrationStart, setRegistrationStart] = useState('');
  const [registrationEnd, setRegistrationEnd] = useState('');
  const [eventStart, setEventStart] = useState('');
  const [eventEnd, setEventEnd] = useState('');
  const [minTeamSize, setMinTeamSize] = useState(1);
  const [maxTeamSize, setMaxTeamSize] = useState(4);
  const [prizePool, setPrizePool] = useState(10000);

  const [roundName, setRoundName] = useState('Round 1: Concept & Proposal');
  const [roundDescription, setRoundDescription] = useState('Submit executive project whitepaper.');

  // Validation Checklist
  const checklist = [
    { title: 'Event Title Specified', valid: name.trim().length > 3 },
    { title: 'URL Slug Configured', valid: slug.trim().length > 2 },
    { title: 'Short Description Provided', valid: shortDescription.trim().length > 10 },
    { title: 'Detailed Overview Written', valid: description.trim().length > 20 },
    { title: 'Registration Schedule Defined', valid: !!registrationStart && !!registrationEnd },
    { title: 'Event Competition Dates Set', valid: !!eventStart && !!eventEnd },
    { title: 'At Least One Round Configured', valid: roundName.trim().length > 3 },
  ];

  const isReadyToPublish = checklist.every((c) => c.valid);

  const handleSubmit = async (publishImmediately = false) => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/events/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          slug: slug || name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
          shortDescription,
          description,
          eventType,
          mode,
          registrationStart: registrationStart || new Date().toISOString(),
          registrationEnd: registrationEnd || new Date(Date.now() + 86400000 * 7).toISOString(),
          eventStart: eventStart || new Date(Date.now() + 86400000 * 8).toISOString(),
          eventEnd: eventEnd || new Date(Date.now() + 86400000 * 14).toISOString(),
          minTeamSize: Number(minTeamSize),
          maxTeamSize: Number(maxTeamSize),
          prizePool: Number(prizePool),
          rounds: [
            {
              name: roundName,
              description: roundDescription,
              order: 1,
              startAt: eventStart || new Date(Date.now() + 86400000 * 8).toISOString(),
              endAt: eventEnd || new Date(Date.now() + 86400000 * 14).toISOString(),
            },
          ],
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Event creation failed.');

      if (publishImmediately && data.event?.id) {
        await fetch(`/api/events/${data.event.id}/publish`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: 'REGISTRATION_OPEN' }),
        });
      }

      router.push(`/admin/events/${data.event.id}`);
    } catch (err: any) {
      setError(err.message || 'Failed to create event.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-15" />
      <AdminNavigation />

      <main className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <Link href="/admin/events" className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 hover:text-white">
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="text-[10px] font-mono text-electric-cyan tracking-widest uppercase">
                EVENT BUILDER ENGINE
              </div>
              <h1 className="text-xl sm:text-2xl font-heading font-black text-white">Create New Event Specification</h1>
            </div>
          </div>

          <div className="flex border-b border-white/10 gap-2 text-xs font-mono">
            <button
              onClick={() => setTab('BUILDER')}
              className={`px-4 py-2 rounded-xl transition-all ${
                tab === 'BUILDER' ? 'bg-electric-cyan text-background font-bold' : 'text-white/60 hover:text-white'
              }`}
            >
              1. BUILDER
            </button>
            <button
              onClick={() => setTab('CHECKLIST')}
              className={`px-4 py-2 rounded-xl transition-all ${
                tab === 'CHECKLIST' ? 'bg-electric-cyan text-background font-bold' : 'text-white/60 hover:text-white'
              }`}
            >
              2. CHECKLIST ({checklist.filter((c) => c.valid).length}/7)
            </button>
            <button
              onClick={() => setTab('PREVIEW')}
              className={`px-4 py-2 rounded-xl transition-all ${
                tab === 'PREVIEW' ? 'bg-electric-cyan text-background font-bold' : 'text-white/60 hover:text-white'
              }`}
            >
              3. PREVIEW
            </button>
          </div>
        </div>

        {error && (
          <div className="p-4 rounded-xl border border-red-500/30 bg-red-500/10 text-red-300 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* TAB 1: BUILDER */}
        {tab === 'BUILDER' && (
          <div className="p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#020b18]/90 backdrop-blur-2xl shadow-2xl space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-white/70 mb-1">Event Title *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (!slug) setSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
                  }}
                  placeholder="e.g. ARASS NEURAL HACKATHON 2026"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 mb-1">URL Slug *</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="arass-neural-hackathon-2026"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-mono text-white/70 mb-1">Event Type</label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
                >
                  <option value="HACKATHON">HACKATHON</option>
                  <option value="IDEATHON">IDEATHON</option>
                  <option value="CODING_CHALLENGE">CODING CHALLENGE</option>
                  <option value="DESIGN_CHALLENGE">DESIGN CHALLENGE</option>
                  <option value="INNOVATION">INNOVATION CHALLENGE</option>
                  <option value="QUIZ">TECHNICAL QUIZ</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 mb-1">Delivery Mode</label>
                <select
                  value={mode}
                  onChange={(e) => setMode(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
                >
                  <option value="ONLINE">ONLINE</option>
                  <option value="OFFLINE">OFFLINE</option>
                  <option value="HYBRID">HYBRID</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 mb-1">Prize Pool ($ USD)</label>
                <input
                  type="number"
                  value={prizePool}
                  onChange={(e) => setPrizePool(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-white/70 mb-1">Short Tagline Description *</label>
              <input
                type="text"
                required
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="48-hour continuous build challenge for frontier AI models."
                className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-white/70 mb-1">Detailed Event Overview *</label>
              <textarea
                rows={4}
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="ARASS NEURAL HACKATHON brings together engineers to build production autonomous systems..."
                className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono text-white/70 mb-1">Registration Start Date</label>
                <input
                  type="datetime-local"
                  value={registrationStart}
                  onChange={(e) => setRegistrationStart(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 mb-1">Registration Deadline Date</label>
                <input
                  type="datetime-local"
                  value={registrationEnd}
                  onChange={(e) => setRegistrationEnd(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setTab('CHECKLIST')}
                className="px-6 py-2.5 rounded-full border border-white/20 text-white font-mono text-xs font-bold hover:bg-white/5"
              >
                PROCEED TO CHECKLIST →
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: CHECKLIST */}
        {tab === 'CHECKLIST' && (
          <div className="p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#020b18]/90 backdrop-blur-2xl shadow-2xl space-y-6">
            <div className="space-y-2">
              <h2 className="text-lg font-heading font-bold text-white">Event Publication Checklist</h2>
              <p className="text-xs font-sans text-white/60 font-light">
                All validation criteria must pass before an event can be published to the public portal.
              </p>
            </div>

            <div className="space-y-3">
              {checklist.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border flex items-center justify-between font-mono text-xs ${
                    item.valid
                      ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-300'
                      : 'border-amber-500/30 bg-amber-500/10 text-amber-300'
                  }`}
                >
                  <span className="font-bold">{item.title}</span>
                  <span>{item.valid ? '✓ READY' : '⚠️ ACTION NEEDED'}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-white/10 flex flex-wrap justify-between items-center gap-3">
              <button
                type="button"
                onClick={() => setTab('BUILDER')}
                className="px-6 py-2.5 rounded-full border border-white/20 text-white font-mono text-xs"
              >
                ← BACK TO EDIT
              </button>

              <div className="flex gap-3">
                <button
                  type="button"
                  disabled={loading}
                  onClick={() => handleSubmit(false)}
                  className="px-6 py-2.5 rounded-full border border-electric-cyan text-electric-cyan font-mono text-xs font-bold hover:bg-electric-cyan/10"
                >
                  {loading ? 'SAVING...' : 'SAVE AS DRAFT'}
                </button>

                <button
                  type="button"
                  disabled={loading || !isReadyToPublish}
                  onClick={() => handleSubmit(true)}
                  className="px-6 py-2.5 rounded-full bg-electric-cyan disabled:opacity-50 text-background font-mono text-xs font-bold shadow-[0_0_20px_rgba(0,212,255,0.6)]"
                >
                  {loading ? 'PUBLISHING...' : 'PUBLISH PUBLICLY →'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: PREVIEW */}
        {tab === 'PREVIEW' && (
          <div className="p-8 rounded-3xl border border-electric-cyan/40 bg-[#020b18]/90 backdrop-blur-2xl space-y-6">
            <div className="text-center space-y-2">
              <span className="text-[10px] font-mono text-electric-cyan tracking-widest uppercase border border-electric-cyan/30 px-3 py-1 rounded-full">
                LIVE PUBLIC MICROSITE PREVIEW
              </span>
              <h2 className="text-3xl font-heading font-black text-white">{name || 'ARASS EVENT TITLE'}</h2>
              <p className="text-xs font-mono text-white/70">{shortDescription || 'Tagline description preview...'}</p>
            </div>

            <div className="p-6 rounded-2xl bg-[#01050d] border border-white/10 space-y-4 text-xs font-mono">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-white/40">TYPE</div>
                  <div className="text-white font-bold mt-1">{eventType}</div>
                </div>
                <div>
                  <div className="text-white/40">MODE</div>
                  <div className="text-white font-bold mt-1">{mode}</div>
                </div>
                <div>
                  <div className="text-white/40">PRIZE POOL</div>
                  <div className="text-electric-cyan font-bold mt-1">${prizePool} USD</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
