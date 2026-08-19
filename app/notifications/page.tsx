'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { EventsNavigation } from '@/components/events/EventsNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { Bell, Check, CheckCheck, Clock, ExternalLink, Filter, Shield } from 'lucide-react';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<any[]>([]);
  const [filter, setFilter] = useState<'ALL' | 'UNREAD'>('ALL');
  const [loading, setLoading] = useState(true);

  const fetchNotifications = () => {
    fetch('/api/notifications')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setNotifications(data.notifications || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      const res = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'MARK_ALL_READ' }),
      });
      if (res.ok) {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
      }
    } catch {}
  };

  const handleMarkRead = async (id: string) => {
    try {
      const res = await fetch('/api/notifications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'MARK_READ', notificationId: id }),
      });
      if (res.ok) {
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
      }
    } catch {}
  };

  const filtered = notifications.filter((n) => (filter === 'UNREAD' ? !n.read : true));

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-25" />
      <EventsNavigation />

      <main className="relative z-10 flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 py-8 sm:py-12 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="space-y-1">
            <div className="text-[10px] font-mono text-electric-cyan uppercase tracking-widest flex items-center gap-2">
              <Bell className="w-3.5 h-3.5" />
              <span>COMMUNICATION ARCHIVE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">Notifications & Dispatches</h1>
            <p className="text-xs font-sans text-white/60 font-light">
              Server-authoritative alerts, stage announcements, and credential releases.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleMarkAllRead}
              className="px-4 py-2 rounded-xl border border-white/20 hover:border-white/40 bg-[#020b18] text-white/80 hover:text-white text-xs font-mono flex items-center gap-2"
            >
              <CheckCheck className="w-4 h-4 text-electric-cyan" />
              <span>MARK ALL READ</span>
            </button>
          </div>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono ${filter === 'ALL' ? 'bg-electric-cyan/20 border border-electric-cyan text-electric-cyan font-bold' : 'text-white/60 hover:text-white border border-transparent'}`}
          >
            ALL ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('UNREAD')}
            className={`px-4 py-1.5 rounded-lg text-xs font-mono ${filter === 'UNREAD' ? 'bg-electric-cyan/20 border border-electric-cyan text-electric-cyan font-bold' : 'text-white/60 hover:text-white border border-transparent'}`}
          >
            UNREAD ({notifications.filter((n) => !n.read).length})
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-3 font-mono">
          {loading ? (
            <div className="p-12 text-center text-white/40 text-xs">Loading notifications...</div>
          ) : filtered.length === 0 ? (
            <div className="p-12 text-center rounded-3xl border border-white/10 bg-[#020b18]/50 text-white/40 text-xs">
              No notifications matching your criteria.
            </div>
          ) : (
            filtered.map((notif) => (
              <div
                key={notif.id}
                className={`p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  notif.read
                    ? 'border-white/10 bg-[#020b18]/60 text-white/60'
                    : 'border-electric-cyan/40 bg-electric-cyan/5 text-white shadow-[0_0_20px_rgba(0,212,255,0.08)]'
                }`}
              >
                <div className="space-y-1 flex-1">
                  <div className="flex items-center gap-2 text-[10px] text-white/40">
                    <span className="px-2 py-0.5 rounded bg-white/10 text-white/70">{notif.type}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-electric-cyan" />
                      <span>{new Date(notif.createdAt).toLocaleString()}</span>
                    </span>
                  </div>
                  <div className="text-base font-heading font-bold text-white">{notif.title}</div>
                  <p className="text-xs font-sans text-white/80 font-light leading-relaxed">{notif.message}</p>
                </div>

                <div className="flex items-center gap-3">
                  {notif.actionUrl && (
                    <Link
                      href={notif.actionUrl}
                      className="px-4 py-2 rounded-xl bg-electric-cyan/20 border border-electric-cyan/40 hover:border-electric-cyan text-electric-cyan text-xs font-bold flex items-center gap-1.5"
                    >
                      <span>VIEW</span>
                      <ExternalLink className="w-3 h-3" />
                    </Link>
                  )}
                  {!notif.read && (
                    <button
                      onClick={() => handleMarkRead(notif.id)}
                      className="p-2 rounded-xl border border-white/20 hover:border-white/40 text-white/60 hover:text-white"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </main>
    </div>
  );
}
