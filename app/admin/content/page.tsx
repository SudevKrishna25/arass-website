'use client';

import React, { useState, useEffect } from 'react';
import { AdminNavigation } from '@/components/admin/AdminNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import {
  FileText,
  Plus,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  Trash2,
  Edit,
  Save,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';

export default function AdminContentPage() {
  const [pages, setPages] = useState<any[]>([]);
  const [selectedPageId, setSelectedPageId] = useState<string>('page-home');
  const [sections, setSections] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // New Section Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newType, setNewType] = useState('HERO');
  const [newTitle, setNewTitle] = useState('');
  const [newEyebrow, setNewEyebrow] = useState('');
  const [newBody, setNewBody] = useState('');

  useEffect(() => {
    fetch('/api/admin/content/pages')
      .then((res) => res.json())
      .then((data) => setPages(data.pages || []))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedPageId) return;
    setLoading(true);
    fetch(`/api/admin/content/sections?pageId=${selectedPageId}`)
      .then((res) => res.json())
      .then((data) => {
        setSections(data.sections || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [selectedPageId]);

  const handleAddSection = async () => {
    if (!newTitle.trim()) return;

    try {
      const res = await fetch('/api/admin/content/sections', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageId: selectedPageId,
          type: newType,
          title: newTitle,
          eyebrow: newEyebrow,
          body: newBody,
        }),
      });
      const data = await res.json();
      if (data.section) {
        setSections([...sections, data.section]);
        setShowAddModal(false);
        setNewTitle('');
        setNewEyebrow('');
        setNewBody('');
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleVisibility = async (sec: any) => {
    const newVis = sec.visibility === 'VISIBLE' ? 'HIDDEN' : 'VISIBLE';
    try {
      const res = await fetch('/api/admin/content/sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: sec.id, visibility: newVis }),
      });
      const data = await res.json();
      if (data.section) {
        setSections(sections.map((s) => (s.id === sec.id ? data.section : s)));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleMove = async (index: number, direction: 'UP' | 'DOWN') => {
    const targetIdx = direction === 'UP' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= sections.length) return;

    const newSections = [...sections];
    const temp = newSections[index];
    newSections[index] = newSections[targetIdx];
    newSections[targetIdx] = temp;

    setSections(newSections);

    try {
      await fetch('/api/admin/content/sections', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          reorder: true,
          pageId: selectedPageId,
          sectionIds: newSections.map((s) => s.id),
        }),
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/admin/content/sections?id=${id}`, { method: 'DELETE' });
      setSections(sections.filter((s) => s.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-15" />
      <AdminNavigation />

      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="text-[10px] font-mono text-electric-cyan tracking-widest uppercase mb-1">
              EDITORIAL CMS ARCHITECTURE
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">Website Content Management</h1>
          </div>

          <button
            onClick={() => setShowAddModal(true)}
            className="px-5 py-2.5 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs flex items-center gap-2 hover:scale-105 transition-all shadow-[0_0_20px_rgba(0,212,255,0.5)] self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>ADD NEW SECTION</span>
          </button>
        </div>

        {/* Brand Tagline Security Callout */}
        <div className="p-4 rounded-2xl border border-electric-cyan/30 bg-electric-cyan/10 text-xs font-mono text-electric-cyan flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldAlert className="w-5 h-5 shrink-0" />
            <div>
              <span className="font-bold uppercase">Mandatory Brand Tagline Lock: </span>
              <span className="text-white font-bold">"WE DON'T FOLLOW THE FUTURE. WE BUILD IT."</span>
              <span className="text-white/70"> is protected in source code and cannot be overwritten by CMS edits.</span>
            </div>
          </div>
        </div>

        {/* Page Selector Tabs */}
        <div className="flex overflow-x-auto gap-2 text-xs font-mono bg-[#020b18]/60 p-2 rounded-2xl border border-white/10">
          {[
            { id: 'page-home', label: 'HOME' },
            { id: 'page-work', label: 'WORK' },
            { id: 'page-solutions', label: 'SOLUTIONS' },
            { id: 'page-products', label: 'PRODUCTS' },
            { id: 'page-lab', label: 'LAB' },
            { id: 'page-company', label: 'COMPANY' },
            { id: 'page-insights', label: 'INSIGHTS' },
            { id: 'page-contact', label: 'CONTACT' },
          ].map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPageId(p.id)}
              className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                selectedPageId === p.id
                  ? 'bg-electric-cyan text-background font-bold shadow-[0_0_12px_rgba(0,212,255,0.4)]'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {p.label} PAGE
            </button>
          ))}
        </div>

        {/* Section List Container */}
        <div className="p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#020b18]/90 backdrop-blur-2xl shadow-2xl space-y-4">
          {loading ? (
            <div className="py-12 text-center text-xs font-mono text-electric-cyan animate-pulse">
              FETCHING PAGE SECTIONS...
            </div>
          ) : sections.length > 0 ? (
            <div className="space-y-3">
              {sections.map((sec, idx) => (
                <div
                  key={sec.id}
                  className="p-5 rounded-2xl border border-white/10 bg-[#01050d] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-xs hover:border-electric-cyan/40 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] px-2 py-0.5 rounded bg-electric-cyan/20 text-electric-cyan font-bold">
                        {sec.type}
                      </span>
                      <span className="text-white/40 text-[10px]">ORDER #{sec.order}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded ${
                          sec.visibility === 'VISIBLE' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/40'
                        }`}
                      >
                        {sec.visibility}
                      </span>
                    </div>
                    <div className="text-sm font-bold text-white">{sec.title}</div>
                    {sec.eyebrow && <div className="text-white/50 text-[11px]">{sec.eyebrow}</div>}
                  </div>

                  <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                    <button
                      onClick={() => handleMove(idx, 'UP')}
                      disabled={idx === 0}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 disabled:opacity-30"
                    >
                      <ArrowUp className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleMove(idx, 'DOWN')}
                      disabled={idx === sections.length - 1}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 disabled:opacity-30"
                    >
                      <ArrowDown className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleToggleVisibility(sec)}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/70"
                    >
                      {sec.visibility === 'VISIBLE' ? (
                        <Eye className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <EyeOff className="w-4 h-4 text-white/40" />
                      )}
                    </button>
                    <button
                      onClick={() => handleDelete(sec.id)}
                      className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-xs font-mono text-white/50 space-y-3">
              <div>No sections configured for this page yet.</div>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 rounded-full border border-electric-cyan text-electric-cyan font-bold hover:bg-electric-cyan/10"
              >
                + Create First Section
              </button>
            </div>
          )}
        </div>

        {/* Modal: Add Section */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-[#020b18] border border-white/20 p-6 rounded-3xl space-y-4 font-mono text-xs text-white">
              <h3 className="text-lg font-heading font-bold text-white">Add Page Section</h3>

              <div>
                <label className="block text-white/70 mb-1">Section Type</label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value)}
                  className="w-full px-4 py-2 rounded-xl bg-[#01050d] border border-white/15 text-white"
                >
                  <option value="HERO">HERO</option>
                  <option value="TEXT">TEXT STATEMENT</option>
                  <option value="FEATURE">FEATURE GRID</option>
                  <option value="WORK">WORK SHOWCASE</option>
                  <option value="EVENTS">FEATURED EVENTS</option>
                  <option value="CTA">CALL TO ACTION</option>
                </select>
              </div>

              <div>
                <label className="block text-white/70 mb-1">Section Title *</label>
                <input
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Architectural Foundations"
                  className="w-full px-4 py-2 rounded-xl bg-[#01050d] border border-white/15 text-white"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">Eyebrow Tag</label>
                <input
                  type="text"
                  value={newEyebrow}
                  onChange={(e) => setNewEyebrow(e.target.value)}
                  placeholder="01 // DISCIPLINE"
                  className="w-full px-4 py-2 rounded-xl bg-[#01050d] border border-white/15 text-white"
                />
              </div>

              <div>
                <label className="block text-white/70 mb-1">Body Copy</label>
                <textarea
                  rows={3}
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  placeholder="Enter body text..."
                  className="w-full px-4 py-2 rounded-xl bg-[#01050d] border border-white/15 text-white"
                />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-full border border-white/20 text-white"
                >
                  CANCEL
                </button>
                <button
                  onClick={handleAddSection}
                  className="px-4 py-2 rounded-full bg-electric-cyan text-background font-bold"
                >
                  SAVE SECTION
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
