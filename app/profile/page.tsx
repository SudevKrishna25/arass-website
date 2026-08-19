'use client';

import React, { useState, useEffect } from 'react';
import { EventsNavigation } from '@/components/events/EventsNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { User, Profile } from '@/lib/events-db/types';
import { UserCircle, Save, CheckCircle2, Github, Linkedin, Globe, FileText, Sparkles } from 'lucide-react';

export default function ParticipantProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState(false);

  useEffect(() => {
    fetch('/api/events/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
          setProfile(data.profile);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setSavedMsg(true);
      setTimeout(() => setSavedMsg(false), 3000);
    }, 600);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#01050d] flex items-center justify-center text-white font-mono text-sm">
        LOADING PROFILE DOSSIER...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-20" />
      <EventsNavigation />

      <main className="relative z-10 flex-1 max-w-4xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        <div className="space-y-2">
          <div className="text-[10px] font-mono text-electric-cyan uppercase tracking-widest">
            PARTICIPANT PROFILE
          </div>
          <h1 className="text-2xl sm:text-4xl font-heading font-black text-white">Engineering Portfolio & Profile</h1>
        </div>

        {savedMsg && (
          <div className="p-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>Profile changes updated successfully.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="p-6 sm:p-10 rounded-3xl border border-white/15 bg-[#020b18]/85 backdrop-blur-2xl space-y-6 shadow-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono text-white/70 mb-1">Full Name</label>
              <input
                type="text"
                defaultValue={profile?.name || ''}
                className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-mono focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-white/70 mb-1">Email Address</label>
              <input
                type="email"
                disabled
                defaultValue={user?.email || ''}
                className="w-full px-4 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white/50 text-sm font-mono cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-white/70 mb-1">College / University</label>
              <input
                type="text"
                defaultValue={profile?.college || 'Stanford University'}
                className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-mono focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-white/70 mb-1">Course & Graduation Year</label>
              <input
                type="text"
                defaultValue={profile?.course ? `${profile.course} (${profile.year || 2026})` : 'Computer Science (2026)'}
                className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-mono focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-mono text-white/70 mb-1">Skills & Technical Stack (comma separated)</label>
              <input
                type="text"
                defaultValue={profile?.skills?.join(', ') || 'Next.js, PyTorch, Distributed Consensus, Rust'}
                className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-mono focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-white/70 mb-1">GitHub Profile URL</label>
              <input
                type="url"
                defaultValue={profile?.github || 'https://github.com/alexchen'}
                className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-white/70 mb-1">LinkedIn Profile URL</label>
              <input
                type="url"
                defaultValue={profile?.linkedin || 'https://linkedin.com/in/alexchen'}
                className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-white/10 flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-electric-cyan disabled:opacity-50 text-background font-mono font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,212,255,0.7)] transition-all hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>{saving ? 'SAVING CHANGES...' : 'SAVE PROFILE'}</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
