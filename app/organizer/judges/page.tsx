'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { OrganizerLayout } from '@/components/organizer/OrganizerLayout';
import { Judge } from '@/lib/events-db/types';
import { Layers, UserPlus, Shield, Award, CheckCircle2 } from 'lucide-react';

export default function GlobalJudgesPage() {
  const [intel, setIntel] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Invite form
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [org, setOrg] = useState('');
  const [expertise, setExpertise] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const loadData = () => {
    fetch('/api/events/evt-arass-ideathon-2026/judges')
      .then((res) => res.json())
      .then((data) => {
        if (data) setIntel(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const res = await fetch('/api/events/evt-arass-ideathon-2026/judges', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        action: 'INVITE',
        name,
        email,
        organization: org || 'Independent Juror',
        expertise: expertise ? expertise.split(',').map((s) => s.trim()) : ['Systems Engineering'],
      }),
    });

    if (res.ok) {
      setStatusMessage(`Juror credential issued to ${name}`);
      setName('');
      setEmail('');
      setOrg('');
      setExpertise('');
      loadData();
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  return (
    <OrganizerLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">Global Evaluation Jury Panel</h1>
            <p className="text-xs font-mono text-white/60">
              Cross-competition panel of technical jurors, mentors, scoring workloads, and ethical conflict declarations.
            </p>
          </div>
        </div>

        {statusMessage && (
          <div className="p-3 rounded-xl bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan text-xs font-mono">
            {statusMessage}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Judges List */}
          <div className="lg:col-span-2 p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider">Active Jurors Directory</h3>
            <div className="divide-y divide-white/10">
              {intel?.judgesList?.map((j: Judge) => (
                <div key={j.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-bold text-white text-sm flex items-center gap-2">
                      <span>{j.name}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                        {j.status}
                      </span>
                    </div>
                    <div className="text-xs text-white/60 font-mono">{j.organization}</div>
                    <div className="text-[11px] text-electric-cyan font-mono mt-1">
                      Expertise: {j.expertise?.join(', ')}
                    </div>
                  </div>

                  <Link
                    href={`/judge/dashboard`}
                    className="px-3 py-1 rounded-lg border border-white/20 hover:border-electric-cyan text-white text-xs font-mono"
                  >
                    VIEW CONSOLE
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Invite Form */}
          <div className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-electric-cyan" />
              <span>Enroll Expert Juror</span>
            </h3>

            <form onSubmit={handleInvite} className="space-y-3 text-xs font-mono">
              <div>
                <label className="block text-white/60 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dr. Alan Turing"
                  className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="juror@mit.edu"
                  className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1">Institution</label>
                <input
                  type="text"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  placeholder="MIT CSAIL / DeepMind"
                  className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1">Expertise Tags</label>
                <input
                  type="text"
                  value={expertise}
                  onChange={(e) => setExpertise(e.target.value)}
                  placeholder="Consensus, Neural Models, Compilers"
                  className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-electric-cyan text-background font-bold tracking-wider hover:scale-[1.02] transition-transform"
              >
                ENROLL JUROR
              </button>
            </form>
          </div>
        </div>
      </div>
    </OrganizerLayout>
  );
}
