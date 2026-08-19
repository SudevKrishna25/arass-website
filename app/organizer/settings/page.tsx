'use client';

import React, { useState } from 'react';
import { OrganizerLayout } from '@/components/organizer/OrganizerLayout';
import { Settings, Save, CheckCircle2, Building, Globe, Mail } from 'lucide-react';

export default function OrganizerSettingsPage() {
  const [name, setName] = useState('ARASS Technology Foundation');
  const [slug, setSlug] = useState('arass');
  const [website, setWebsite] = useState('https://arass.technology');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <OrganizerLayout>
      <div className="max-w-3xl space-y-6">
        <div>
          <div className="text-[10px] font-mono text-electric-cyan uppercase tracking-widest">
            ORGANIZATION SETTINGS
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">Host Organization Profile</h1>
          <p className="text-xs font-sans text-white/70 font-light">
            Manage your public entity details, brand domain, and default competition policies.
          </p>
        </div>

        {saved && (
          <div className="p-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>Organization profile saved successfully.</span>
          </div>
        )}

        <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4 text-xs font-mono">
          <div>
            <label className="block text-white/70 mb-1">Organization Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm focus:outline-none focus:border-electric-cyan font-sans"
            />
          </div>

          <div>
            <label className="block text-white/70 mb-1">Organization URL Slug</label>
            <input
              type="text"
              required
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs focus:outline-none focus:border-electric-cyan"
            />
          </div>

          <div>
            <label className="block text-white/70 mb-1">Official Website URL</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs focus:outline-none focus:border-electric-cyan"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-electric-cyan text-background font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,212,255,0.7)] transition-all hover:scale-105"
            >
              <Save className="w-4 h-4" />
              <span>SAVE CONFIGURATION</span>
            </button>
          </div>
        </form>
      </div>
    </OrganizerLayout>
  );
}
