'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { OrganizerLayout } from '@/components/organizer/OrganizerLayout';
import { Sparkles, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export default function EventCreationStudioPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [organizations, setOrganizations] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [orgId, setOrgId] = useState('');
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [description, setDescription] = useState('');
  const [eventType, setEventType] = useState('HACKATHON');
  const [mode, setMode] = useState('ONLINE');
  const [prizePool, setPrizePool] = useState('50000');
  const [minTeamSize, setMinTeamSize] = useState('1');
  const [maxTeamSize, setMaxTeamSize] = useState('3');
  const [regStart, setRegStart] = useState(new Date().toISOString().split('T')[0]);
  const [regEnd, setRegEnd] = useState(new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0]);
  const [eventStart, setEventStart] = useState(new Date(Date.now() + 86400000 * 8).toISOString().split('T')[0]);
  const [eventEnd, setEventEnd] = useState(new Date(Date.now() + 86400000 * 10).toISOString().split('T')[0]);

  useEffect(() => {
    fetch('/api/events/organizations')
      .then((res) => res.json())
      .then((data) => {
        if (data.organizations && data.organizations.length > 0) {
          setOrganizations(data.organizations);
          setOrgId(data.organizations[0].id);
        }
      });
  }, []);

  const handleNameChange = (val: string) => {
    setName(val);
    if (!slug || slug === name.toLowerCase().replace(/[^a-z0-9]+/g, '-')) {
      setSlug(val.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
    }
  };

  const handleCreate = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/events/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          organizationId: orgId,
          name,
          slug,
          shortDescription: shortDesc,
          description,
          eventType,
          mode,
          prizePool: parseInt(prizePool, 10) || 0,
          minTeamSize: parseInt(minTeamSize, 10) || 1,
          maxTeamSize: parseInt(maxTeamSize, 10) || 1,
          registrationStart: new Date(regStart).toISOString(),
          registrationEnd: new Date(regEnd).toISOString(),
          eventStart: new Date(eventStart).toISOString(),
          eventEnd: new Date(eventEnd).toISOString(),
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to create event');

      router.push(`/organizer/events/${data.event.slug}/participants`);
    } catch (err: any) {
      setError(err.message || 'Creation failed');
      setLoading(false);
    }
  };

  return (
    <OrganizerLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <div className="text-[10px] font-mono text-electric-cyan uppercase tracking-widest">
            EVENT CREATION STUDIO
          </div>
          <h1 className="text-2xl sm:text-4xl font-heading font-black text-white">Create New Competition</h1>
        </div>

        <div className="p-6 sm:p-10 rounded-3xl border border-white/15 bg-[#020b18]/85 backdrop-blur-2xl space-y-6 shadow-2xl">
          {/* Progress Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono text-white/60">
            <span className="text-electric-cyan font-bold">STAGE 0{step} OF 03</span>
            <span>
              {step === 1 && 'Basic Identification & Scope'}
              {step === 2 && 'Format, Sizing & Timeline'}
              {step === 3 && 'Verification & Launch'}
            </span>
          </div>

          {error && (
            <div className="p-4 rounded-xl border border-red-500/40 bg-red-500/10 text-red-300 text-xs font-mono flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* STAGE 1: BASIC DETAILS */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Host Organization</label>
                  <select
                    value={orgId}
                    onChange={(e) => setOrgId(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-mono focus:outline-none focus:border-electric-cyan"
                  >
                    {organizations.map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Event Type</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-mono focus:outline-none focus:border-electric-cyan"
                  >
                    <option value="HACKATHON">Hackathon</option>
                    <option value="IDEATHON">Ideathon</option>
                    <option value="CODING_CHALLENGE">Coding Challenge</option>
                    <option value="DESIGN_CHALLENGE">Design Challenge</option>
                    <option value="ASSESSMENT">Assessment</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 mb-1">Event Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => handleNameChange(e.target.value)}
                  placeholder="e.g. National Frontier Hackathon 2026"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-mono focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 mb-1">URL Slug *</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. national-frontier-hackathon-2026"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 mb-1">Short Elevator Pitch (1–2 sentences) *</label>
                <input
                  type="text"
                  required
                  value={shortDesc}
                  onChange={(e) => setShortDesc(e.target.value)}
                  placeholder="e.g. 48-hour continuous build sprint for decentralized neural infrastructure."
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-sans focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 mb-1">Comprehensive Problem Statement & Directive *</label>
                <textarea
                  rows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detail the technical parameters, problem thesis, required deliverables, and evaluation rubric..."
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-sans focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="button"
                  disabled={!name || !slug || !shortDesc}
                  onClick={() => setStep(2)}
                  className="px-6 py-2.5 rounded-full bg-electric-cyan disabled:opacity-50 text-background font-mono font-bold text-xs"
                >
                  Next: Format & Timeline →
                </button>
              </div>
            </div>
          )}

          {/* STAGE 2: FORMAT & TIMELINE */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Delivery Mode</label>
                  <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
                  >
                    <option value="ONLINE">Online</option>
                    <option value="OFFLINE">Offline</option>
                    <option value="HYBRID">Hybrid</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Min Team Size</label>
                  <input
                    type="number"
                    min="1"
                    value={minTeamSize}
                    onChange={(e) => setMinTeamSize(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Max Team Size</label>
                  <input
                    type="number"
                    min="1"
                    value={maxTeamSize}
                    onChange={(e) => setMaxTeamSize(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-white/70 mb-1">Prize Pool Amount (INR ₹)</label>
                <input
                  type="number"
                  value={prizePool}
                  onChange={(e) => setPrizePool(e.target.value)}
                  placeholder="50000"
                  className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-mono focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Registration Start Date</label>
                  <input
                    type="date"
                    value={regStart}
                    onChange={(e) => setRegStart(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Registration End Date</label>
                  <input
                    type="date"
                    value={regEnd}
                    onChange={(e) => setRegEnd(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Event Start Date</label>
                  <input
                    type="date"
                    value={eventStart}
                    onChange={(e) => setEventStart(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">Event End Date</label>
                  <input
                    type="date"
                    value={eventEnd}
                    onChange={(e) => setEventEnd(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
                  />
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-2 rounded-full border border-white/15 text-white/70 font-mono text-xs"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-6 py-2 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs"
                >
                  Review & Publish →
                </button>
              </div>
            </div>
          )}

          {/* STAGE 3: REVIEW & LAUNCH */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="p-5 rounded-2xl border border-white/10 bg-[#01050d]/60 space-y-3 text-xs font-mono">
                <h4 className="text-white font-bold uppercase tracking-wider border-b border-white/10 pb-2">
                  Competition Summary
                </h4>
                <div className="grid grid-cols-2 gap-3 text-white/80">
                  <div>Name: <span className="text-white font-semibold">{name}</span></div>
                  <div>Slug: <span className="text-electric-cyan">{slug}</span></div>
                  <div>Discipline: <span className="text-white font-semibold">{eventType}</span></div>
                  <div>Mode: <span className="text-white font-semibold">{mode}</span></div>
                  <div>Prize Pool: <span className="text-electric-cyan font-bold">₹{parseInt(prizePool, 10).toLocaleString()}</span></div>
                  <div>Team Sizing: <span className="text-white">{minTeamSize} – {maxTeamSize} Members</span></div>
                </div>
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-2 rounded-full border border-white/15 text-white/70 font-mono text-xs"
                >
                  ← Back
                </button>
                <button
                  type="button"
                  disabled={loading}
                  onClick={handleCreate}
                  className="px-8 py-3 rounded-full bg-electric-cyan disabled:opacity-50 text-background font-mono font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,212,255,0.7)] transition-all hover:scale-105"
                >
                  {loading ? 'CREATING EVENT PROGRAM...' : 'CREATE & INITIALIZE EVENT →'}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </OrganizerLayout>
  );
}
