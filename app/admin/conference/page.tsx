'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AdminNavigation } from '@/components/admin/AdminNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import {
  Send,
  Users,
  Shield,
  Clock,
  Sparkles,
  Activity,
  History,
  CheckCircle2,
  RefreshCw,
  Hash,
  MessageSquare,
  AlertTriangle,
} from 'lucide-react';

export default function FounderConferencePage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [audits, setAudits] = useState<any[]>([]);
  const [founders, setFounders] = useState<any[]>([]);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('GENERAL');
  const [selectedCategory, setSelectedCategory] = useState('GENERAL');

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const fetchTelemetry = async () => {
    try {
      const res = await fetch('/api/admin/conference');
      if (res.ok) {
        const data = await res.json();
        setMessages(data.messages || []);
        setAudits(data.audits || []);
        setFounders(data.founders || []);
        setCurrentUser(data.currentUser || null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTelemetry();
    const interval = setInterval(fetchTelemetry, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || sending) return;

    setSending(true);
    try {
      const res = await fetch('/api/admin/conference', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: inputMessage,
          channel: selectedChannel,
          category: selectedCategory,
        }),
      });

      if (res.ok) {
        setInputMessage('');
        fetchTelemetry();
      }
    } catch (e) {
      console.error(e);
    } finally {
      setSending(false);
    }
  };

  const channels = ['GENERAL', 'INFRASTRUCTURE', 'AI_SYSTEMS', 'PRODUCT', 'OPERATIONS'];
  const categories = ['GENERAL', 'DEPLOYMENT', 'AUDIT', 'PRIORITY', 'NOTICE'];

  const filteredMessages = messages.filter((m) => m.channel === selectedChannel);

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-15" />
      <AdminNavigation />

      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-0.5 rounded-full border border-electric-cyan/30 bg-electric-cyan/10 text-[9px] sm:text-[10px] font-mono text-electric-cyan tracking-widest uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />
              <span>SOVEREIGN FOUNDER ENCLAVE</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-heading font-black text-white">
              Founder Conference Room & Site Edit Audit Log
            </h1>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-white/60">
            <button
              onClick={fetchTelemetry}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/15 bg-white/5 hover:border-electric-cyan/50 text-white transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>REFRESH STREAM</span>
            </button>
          </div>
        </div>

        {/* 3-Column Layout: Left (Founders & Channels), Center (Live Chat), Right (Site Edit Activity Audit) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Channels & The 5 Founders */}
          <div className="lg:col-span-3 space-y-5">
            {/* Channels Card */}
            <div className="p-4 rounded-2xl border border-white/10 bg-[#020b18]/80 backdrop-blur-xl space-y-3">
              <div className="text-[10px] font-mono text-electric-cyan tracking-wider uppercase font-bold flex items-center gap-1.5">
                <Hash className="w-3.5 h-3.5" />
                <span>CONFERENCE CHANNELS</span>
              </div>
              <div className="space-y-1">
                {channels.map((ch) => (
                  <button
                    key={ch}
                    onClick={() => setSelectedChannel(ch)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-all text-left ${
                      selectedChannel === ch
                        ? 'bg-electric-cyan text-background font-bold shadow-[0_0_15px_rgba(0,212,255,0.4)]'
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>#{ch}</span>
                    <span className="text-[10px] opacity-70">
                      {messages.filter((m) => m.channel === ch).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* The 5 Sovereign Founders Presence */}
            <div className="p-4 rounded-2xl border border-white/10 bg-[#020b18]/80 backdrop-blur-xl space-y-3">
              <div className="text-[10px] font-mono text-electric-cyan tracking-wider uppercase font-bold flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>FIVE FOUNDERS (SUPER ADMINS)</span>
              </div>

              <div className="space-y-2">
                {founders.map((f) => (
                  <div
                    key={f.id}
                    className="p-2.5 rounded-xl border border-white/5 bg-white/[0.02] flex items-center justify-between text-xs font-mono"
                  >
                    <div>
                      <div className="flex items-center gap-1.5 font-bold text-white">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span>{f.name}</span>
                      </div>
                      <div className="text-[10px] text-electric-cyan/70">@{f.username}</div>
                    </div>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan">
                      ACTIVE
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Center Column: Live Conference Messaging */}
          <div className="lg:col-span-5 flex flex-col justify-between p-4 sm:p-5 rounded-2xl border border-white/10 bg-[#020b18]/90 backdrop-blur-2xl min-h-[550px]">
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <div className="flex items-center gap-2 text-xs font-mono text-white">
                <MessageSquare className="w-4 h-4 text-electric-cyan" />
                <span className="font-bold">CHANNEL: #{selectedChannel}</span>
              </div>
              <span className="text-[10px] font-mono text-white/40">
                {filteredMessages.length} Messages
              </span>
            </div>

            {/* Message Stream */}
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 max-h-[380px]">
              {loading && filteredMessages.length === 0 ? (
                <div className="text-center py-12 text-xs font-mono text-white/40 animate-pulse">
                  CONNECTING TO CONCLAVE SECURE LINE...
                </div>
              ) : filteredMessages.length === 0 ? (
                <div className="text-center py-12 text-xs font-mono text-white/40">
                  NO MESSAGES IN #{selectedChannel}. TRANSMIT THE FIRST ENTRY.
                </div>
              ) : (
                filteredMessages.map((msg) => {
                  const isCurrent = currentUser && msg.senderId === currentUser.id;
                  return (
                    <div
                      key={msg.id}
                      className={`p-3 rounded-xl border transition-all ${
                        isCurrent
                          ? 'border-electric-cyan/40 bg-electric-cyan/5 ml-4'
                          : 'border-white/10 bg-white/[0.02] mr-4'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                        <div className="flex items-center gap-1.5">
                          <span className="font-bold text-electric-cyan">
                            {msg.senderName} (@{msg.senderUsername})
                          </span>
                          <span className="px-1.5 py-0.2 rounded text-[8px] bg-white/10 text-white/70 uppercase">
                            {msg.category}
                          </span>
                        </div>
                        <span className="text-white/40">
                          {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <p className="text-xs font-sans text-white/90 leading-relaxed break-words">
                        {msg.message}
                      </p>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input & Tag Selector */}
            <form onSubmit={handleSendMessage} className="pt-4 border-t border-white/10 space-y-2 mt-3">
              <div className="flex items-center gap-2 text-[10px] font-mono text-white/60">
                <span>TAG:</span>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-[#01050d] border border-white/15 rounded px-2 py-0.5 text-electric-cyan focus:outline-none focus:border-electric-cyan"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder={`Broadcast message to #${selectedChannel}...`}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-white/15 focus:border-electric-cyan bg-[#01050d] text-white text-xs font-mono placeholder:text-white/30 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  disabled={sending || !inputMessage.trim()}
                  className="px-4 py-2.5 rounded-xl bg-electric-cyan text-background font-mono font-bold text-xs flex items-center gap-1.5 hover:scale-105 transition-all disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>TRANSMIT</span>
                </button>
              </div>
            </form>
          </div>

          {/* Right Column: Site Edit & Activity Audit Log */}
          <div className="lg:col-span-4 p-4 sm:p-5 rounded-2xl border border-white/10 bg-[#020b18]/80 backdrop-blur-xl space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2 text-xs font-mono text-white font-bold">
                <Activity className="w-4 h-4 text-electric-cyan" />
                <span>SITE EDITS AUDIT STREAM</span>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            <p className="text-[10px] font-mono text-white/50 leading-relaxed">
              Every edit, configuration update, and publish action by all 5 founders is synchronized here.
            </p>

            <div className="space-y-2.5 overflow-y-auto max-h-[460px] pr-1">
              {audits.map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-xl border border-white/10 bg-white/[0.02] hover:border-electric-cyan/30 transition-colors space-y-1 text-xs font-mono"
                >
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="font-bold text-electric-cyan">@{item.actorUsername}</span>
                    <span className="text-white/40">
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>

                  <div className="text-[10px] font-bold text-white/80">{item.action}</div>
                  <p className="text-[11px] font-sans text-white/70 font-light leading-relaxed">
                    {item.details}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
