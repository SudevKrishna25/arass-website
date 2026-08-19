'use client';

import React, { useState, useEffect } from 'react';
import { AdminNavigation } from '@/components/admin/AdminNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { Navigation as NavIcon, ArrowUp, ArrowDown, Eye, EyeOff, Save, ShieldAlert } from 'lucide-react';

export default function AdminNavigationPage() {
  const [items, setItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch('/api/admin/navigation')
      .then((res) => res.json())
      .then((data) => {
        setItems(data.items || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('/api/admin/navigation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      });
      alert('Public navigation hierarchy saved.');
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleMove = (index: number, direction: 'UP' | 'DOWN') => {
    const targetIdx = direction === 'UP' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= items.length) return;

    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIdx];
    newItems[targetIdx] = temp;
    setItems(newItems);
  };

  const handleToggleVis = (index: number) => {
    const newItems = [...items];
    newItems[index].visibility = newItems[index].visibility === 'VISIBLE' ? 'HIDDEN' : 'VISIBLE';
    setItems(newItems);
  };

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-15" />
      <AdminNavigation />

      <main className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 space-y-6">
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <div>
            <div className="text-[10px] font-mono text-electric-cyan tracking-widest uppercase mb-1">
              NAVIGATION CMS ENGINE
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">Public Navigation Manager</h1>
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,212,255,0.5)]"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'SAVING...' : 'SAVE NAVIGATION HIERARCHY'}</span>
          </button>
        </div>

        {/* Protection Warning */}
        <div className="p-4 rounded-2xl border border-electric-cyan/30 bg-electric-cyan/10 text-xs font-mono text-electric-cyan flex items-center gap-3">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>
            System routes like <strong className="text-white">/events</strong> and primary CTA{' '}
            <strong className="text-white">START A PROJECT</strong> are protected system navigation items.
          </span>
        </div>

        {/* Item List */}
        <div className="p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#020b18]/90 backdrop-blur-2xl shadow-2xl space-y-3">
          {loading ? (
            <div className="py-12 text-center text-xs font-mono text-electric-cyan animate-pulse">
              LOADING NAVIGATION ITEMS...
            </div>
          ) : (
            items.map((item, idx) => (
              <div
                key={item.id || idx}
                className="p-4 rounded-2xl border border-white/10 bg-[#01050d] flex items-center justify-between font-mono text-xs hover:border-electric-cyan/40 transition-all"
              >
                <div className="flex items-center gap-4">
                  <span className="text-white/40 text-[10px]">#{idx + 1}</span>
                  <div>
                    <span className="font-bold text-white">{item.label}</span>
                    <span className="text-white/40 text-[11px] ml-3">→ {item.destination}</span>
                    {item.isCta && (
                      <span className="ml-2 px-2 py-0.5 rounded bg-electric-cyan/20 text-electric-cyan text-[10px] font-bold">
                        PRIMARY CTA
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleMove(idx, 'UP')}
                    disabled={idx === 0}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 disabled:opacity-30"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleMove(idx, 'DOWN')}
                    disabled={idx === items.length - 1}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 disabled:opacity-30"
                  >
                    <ArrowDown className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleToggleVis(idx)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70"
                  >
                    {item.visibility === 'VISIBLE' ? (
                      <Eye className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <EyeOff className="w-4 h-4 text-white/40" />
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
