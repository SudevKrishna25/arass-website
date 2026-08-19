'use client';

import React, { useState, useEffect } from 'react';
import { OrganizerLayout } from '@/components/organizer/OrganizerLayout';
import { Send, CheckCircle2, AlertCircle, Mail, Users } from 'lucide-react';

export default function OrganizerCommunicationsPage() {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [targetAudience, setTargetAudience] = useState('ALL_PARTICIPANTS');
  const [sending, setSending] = useState(false);
  const [successResult, setSuccessResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError(null);
    setSuccessResult(null);

    try {
      const res = await fetch('/api/events/communications/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject,
          message,
          targetAudience,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send broadcast');

      setSuccessResult(data);
      setSubject('');
      setMessage('');
      setSending(false);
    } catch (err: any) {
      setError(err.message || 'Dispatch error');
      setSending(false);
    }
  };

  return (
    <OrganizerLayout>
      <div className="max-w-4xl space-y-6">
        <div>
          <div className="text-[10px] font-mono text-electric-cyan uppercase tracking-widest">
            COMMUNICATIONS SUITE
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">Broadcast & Announcements</h1>
          <p className="text-xs font-sans text-white/70 font-light">
            Dispatch official email notifications, stage opening alerts, and deadline reminders to participants.
          </p>
        </div>

        {successResult && (
          <div className="p-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>
              Broadcast successfully delivered to {successResult.recipientCount} verified recipients (Message ID: {successResult.messageId}).
            </span>
          </div>
        )}

        {error && (
          <div className="p-4 rounded-2xl border border-red-500/40 bg-red-500/10 text-red-300 text-xs font-mono flex items-center gap-2">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSend} className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">Target Audience</label>
            <select
              value={targetAudience}
              onChange={(e) => setTargetAudience(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-mono focus:outline-none focus:border-electric-cyan"
            >
              <option value="ALL_PARTICIPANTS">All Registered Participants</option>
              <option value="SHORTLISTED_ONLY">Shortlisted Teams Only</option>
              <option value="JURY_MEMBERS">Evaluators & Judges</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">Broadcast Subject *</label>
            <input
              type="text"
              required
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="e.g. [URGENT] Round 1 Submission Deadline Approaching in 2 Hours"
              className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-mono focus:outline-none focus:border-electric-cyan"
            />
          </div>

          <div>
            <label className="block text-xs font-mono text-white/70 mb-1">Message Content (HTML Supported) *</label>
            <textarea
              rows={5}
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter official communique text to be transmitted..."
              className="w-full px-4 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-sm font-sans focus:outline-none focus:border-electric-cyan"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-electric-cyan disabled:opacity-50 text-background font-mono font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,212,255,0.7)] transition-all hover:scale-105"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{sending ? 'DISPATCHING COMMUNIQUE...' : 'DISPATCH BROADCAST'}</span>
            </button>
          </div>
        </form>
      </div>
    </OrganizerLayout>
  );
}
