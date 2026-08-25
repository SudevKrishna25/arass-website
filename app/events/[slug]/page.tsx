'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound, useParams } from 'next/navigation';
import { EventsNavigation } from '@/components/events/EventsNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { Event, Round, RegistrationField } from '@/lib/events-db/types';
import {
  Trophy,
  Calendar,
  Users,
  Clock,
  Globe,
  Share2,
  Bookmark,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  ChevronDown,
  Layers,
  FileText,
  HelpCircle,
  Mail,
  ShieldCheck,
} from 'lucide-react';

export default function EventMicrositePage() {
  const params = useParams();
  const slug = params.slug as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [fields, setRegistrationFields] = useState<RegistrationField[]>([]);
  const [organization, setOrganization] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'about' | 'rounds' | 'eligibility' | 'prizes' | 'rules' | 'faq'>('about');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetch(`/api/events/${slug}`)
      .then((res) => {
        if (!res.ok) throw new Error('Event not found');
        return res.json();
      })
      .then((data) => {
        setEvent(data.event);
        setRounds(data.rounds || []);
        setRegistrationFields(data.registrationFields || []);
        setOrganization(data.organization);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#01050d] flex items-center justify-center text-white">
        <div className="flex items-center gap-3 font-mono text-sm">
          <span className="w-2.5 h-2.5 rounded-full bg-electric-cyan animate-ping" />
          <span>LOADING EVENT DOSSIER...</span>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#01050d] text-white flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h1 className="text-3xl font-heading font-bold">Event Not Found</h1>
        <p className="text-white/60 font-sans text-sm max-w-md">
          The requested event URL does not exist or has been archived.
        </p>
        <Link
          href="/events"
          className="px-6 py-2.5 rounded-full bg-electric-cyan text-background font-mono text-xs font-bold"
        >
          EXPLORE ALL EVENTS
        </Link>
      </div>
    );
  }

  const isRegistrationOpen = event.status === 'REGISTRATION_OPEN';
  const isLive = event.status === 'LIVE';

  const formatPrize = (prize: number) => {
    if (!prize) return 'Recognition & Perks';
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(prize);
  };

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const getDaysLeft = (endIso: string) => {
    const diff = new Date(endIso).getTime() - Date.now();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    if (days <= 0) return 'Closes today';
    if (days === 1) return '1 day remaining';
    return `${days} days remaining`;
  };

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-30" />

      {/* Global Navigation */}
      <EventsNavigation />

      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6 sm:py-10 space-y-10">
        {/* ===================================================================
            HERO DOSSIER HEADER
            =================================================================== */}
        <section className="relative rounded-3xl border border-white/15 bg-[#020b18]/80 backdrop-blur-2xl overflow-hidden shadow-2xl">
          {/* Cover Media */}
          <div className="relative w-full h-56 sm:h-72 md:h-80 overflow-hidden bg-[#01050d]">
            <Image
              src={event.banner || '/images/arass_frontier_build_lab.jpg'}
              alt={event.name}
              fill
              priority
              className="object-cover brightness-60 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#020b18] via-[#020b18]/40 to-transparent" />

            {/* Top Action Pills */}
            <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
              <button
                onClick={handleShare}
                aria-label="Share Event"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono bg-[#01050d]/85 text-white/80 hover:text-electric-cyan border border-white/15 backdrop-blur-md transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'COPIED!' : 'SHARE'}</span>
              </button>
            </div>
          </div>

          {/* Hero Content Block */}
          <div className="p-6 sm:p-10 space-y-6 relative -mt-16 sm:-mt-20 z-10">
            {/* Title & Metadata */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-3 max-w-3xl">
                {/* Badges */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase bg-[#01050d] border border-electric-cyan/40 text-electric-cyan">
                    {event.eventType.replace('_', ' ')}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase bg-white/10 text-white/80 border border-white/15">
                    {event.mode}
                  </span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-mono font-bold tracking-wider uppercase ${
                      isLive
                        ? 'bg-red-500/20 text-red-400 border border-red-500/40 animate-pulse'
                        : isRegistrationOpen
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                        : 'bg-white/10 text-white/70 border border-white/20'
                    }`}
                  >
                    {isLive ? '● LIVE STAGE' : event.status.replace('_', ' ')}
                  </span>
                </div>

                {/* Event Title */}
                <h1 className="text-2xl sm:text-4xl font-heading font-black tracking-tight text-white leading-tight">
                  {event.name}
                </h1>

                {/* Short Description */}
                <p className="text-sm sm:text-base font-sans text-white/80 leading-relaxed font-light">
                  {event.shortDescription}
                </p>

                {/* Organizer */}
                <div className="text-xs font-mono text-white/60 flex items-center gap-2">
                  <span>Organized by:</span>
                  <span className="text-white font-semibold">{organization?.name || 'ARASS Technology Foundation'}</span>
                </div>
              </div>

              {/* Primary Action Button */}
              <div className="flex-shrink-0 flex flex-col sm:flex-row md:flex-col gap-3">
                {isRegistrationOpen && (
                  <Link
                    href={`/events/${event.slug}/register`}
                    className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-widest hover:shadow-[0_0_30px_rgba(0,212,255,0.8)] transition-all duration-300 hover:scale-105"
                  >
                    <span>REGISTER NOW</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                )}

                <Link
                  href={`/events/${event.slug}/live`}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full border border-white/20 hover:border-electric-cyan bg-[#01050d]/80 text-white font-mono font-medium text-xs tracking-widest hover:text-electric-cyan transition-all duration-300"
                >
                  <span>LIVE COMMAND CENTER</span>
                  <Sparkles className="w-3.5 h-3.5 text-electric-cyan" />
                </Link>
              </div>
            </div>

            {/* Metrics Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-2xl border border-white/10 bg-[#01050d]/70 text-xs font-mono">
              <div className="space-y-1">
                <div className="text-white/50 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                  <Trophy className="w-3.5 h-3.5 text-electric-cyan" />
                  <span>Prize Pool</span>
                </div>
                <div className="text-base sm:text-lg font-heading font-bold text-white">
                  {formatPrize(event.prizePool)}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-white/50 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-electric-cyan" />
                  <span>Team Size</span>
                </div>
                <div className="text-base sm:text-lg font-heading font-bold text-white">
                  {event.minTeamSize === event.maxTeamSize ? `${event.minTeamSize} Person` : `${event.minTeamSize} - ${event.maxTeamSize} People`}
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-white/50 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-electric-cyan" />
                  <span>Registration Deadline</span>
                </div>
                <div className="text-sm font-semibold text-white truncate">
                  {new Date(event.registrationEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} ({getDaysLeft(event.registrationEnd)})
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-white/50 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-electric-cyan" />
                  <span>Event Timeline</span>
                </div>
                <div className="text-sm font-semibold text-white truncate">
                  {new Date(event.eventStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} – {new Date(event.eventEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ===================================================================
            STICKY SECTION NAVIGATION TABS
            =================================================================== */}
        <div className="sticky top-16 z-30 bg-[#01050d]/90 backdrop-blur-xl border-y border-white/10 -mx-4 px-4 sm:mx-0 sm:px-0 sm:rounded-2xl">
          <nav className="flex items-center gap-2 overflow-x-auto py-3 no-scrollbar">
            {[
              { id: 'about', label: 'About & Scope' },
              { id: 'rounds', label: `Rounds (${rounds.length})` },
              { id: 'eligibility', label: 'Eligibility' },
              { id: 'prizes', label: 'Prizes & Perks' },
              { id: 'rules', label: 'Rules & Guidelines' },
              { id: 'faq', label: 'FAQ' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-electric-cyan text-background font-bold shadow-[0_0_12px_rgba(0,212,255,0.6)]'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* ===================================================================
            TAB CONTENT SECTIONS
            =================================================================== */}
        <div className="space-y-8">
          {/* TAB 1: ABOUT & PROBLEM STATEMENT */}
          {activeTab === 'about' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#020b18]/60 space-y-4">
                <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-electric-cyan" />
                  <span>Problem Statement & Challenge Directive</span>
                </h2>
                <div className="text-sm sm:text-base font-sans text-white/80 leading-relaxed font-light whitespace-pre-line">
                  {event.description}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/60 space-y-3">
                  <h3 className="text-base font-heading font-bold text-white">Deliverables Expected</h3>
                  <ul className="text-xs sm:text-sm font-sans text-white/70 space-y-2 list-disc list-inside font-light">
                    <li>Concept architecture deck / executive technical proposal (PDF)</li>
                    <li>Live codebase repository (GitHub / GitLab)</li>
                    <li>Working prototype sandbox or video demonstration</li>
                    <li>System documentation explaining algorithm design and scalability</li>
                  </ul>
                </div>

                <div className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/60 space-y-3">
                  <h3 className="text-base font-heading font-bold text-white">Why Participate?</h3>
                  <ul className="text-xs sm:text-sm font-sans text-white/70 space-y-2 list-disc list-inside font-light">
                    <li>Win from a verified ₹50,000+ national prize pool</li>
                    <li>Direct evaluation and mentorship by ARASS senior systems architects</li>
                    <li>Cryptographically signed, verifiable ARASS achievement credential</li>
                    <li>Fast-tracked interview access for engineering and research mandates</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: ROUNDS & STAGES */}
          {activeTab === 'rounds' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                <Layers className="w-5 h-5 text-electric-cyan" />
                <span>Multi-Stage Competition Roadmap</span>
              </h2>

              <div className="space-y-4">
                {rounds.map((round) => (
                  <div
                    key={round.id}
                    className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#020b18]/60 space-y-4 transition-all hover:border-white/20"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                      <div>
                        <div className="text-[10px] font-mono text-electric-cyan uppercase tracking-wider">
                          STAGE 0{round.order} // SUBMISSION FORMAT: {round.submissionType}
                        </div>
                        <h3 className="text-lg font-heading font-bold text-white">{round.name}</h3>
                      </div>
                      <span className="self-start sm:self-center px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-white/10 text-white/80 border border-white/15">
                        {round.status}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm font-sans text-white/80 font-light leading-relaxed">
                      {round.description}
                    </p>

                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-white/60 pt-2">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-electric-cyan" />
                        <span>Opens: {new Date(round.startAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-electric-cyan" />
                        <span>Deadline: {new Date(round.endAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span>Max Attempts: {round.maxAttempts}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: ELIGIBILITY */}
          {activeTab === 'eligibility' && (
            <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#020b18]/60 space-y-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Eligibility Criteria</span>
              </h2>

              <div className="space-y-4 text-xs sm:text-sm font-sans text-white/80 font-light leading-relaxed">
                <div className="p-4 rounded-2xl border border-white/10 bg-[#01050d]/50 space-y-1">
                  <div className="font-mono text-white font-semibold text-xs">Eligible Participants:</div>
                  <p>Undergraduate, Postgraduate, and PhD students across Engineering, Science, Management, and Design.</p>
                </div>

                <div className="p-4 rounded-2xl border border-white/10 bg-[#01050d]/50 space-y-1">
                  <div className="font-mono text-white font-semibold text-xs">Team Composition:</div>
                  <p>Teams may consist of {event.minTeamSize} to {event.maxTeamSize} members. Cross-college teams are permitted.</p>
                </div>

                <div className="p-4 rounded-2xl border border-white/10 bg-[#01050d]/50 space-y-1">
                  <div className="font-mono text-white font-semibold text-xs">Originality Requirement:</div>
                  <p>All submitted software architectures and prototypes must be original work created during or for this competition.</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PRIZES */}
          {activeTab === 'prizes' && (
            <div className="space-y-6 animate-in fade-in duration-300">
              <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                <Trophy className="w-5 h-5 text-electric-cyan" />
                <span>Prize Distribution & Awards</span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="p-6 rounded-3xl border border-electric-cyan/50 bg-[#020b18]/90 shadow-[0_0_30px_rgba(0,212,255,0.15)] space-y-3">
                  <div className="text-[10px] font-mono text-electric-cyan uppercase tracking-widest">FIRST PLACE</div>
                  <h3 className="text-2xl font-heading font-black text-white">₹30,000</h3>
                  <p className="text-xs font-sans text-white/70 font-light">
                    Grand Champion Trophy, Verified Winner Certificate, direct interview fast-track, and AWS cloud credits.
                  </p>
                </div>

                <div className="p-6 rounded-3xl border border-white/15 bg-[#020b18]/60 space-y-3">
                  <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest">SECOND PLACE</div>
                  <h3 className="text-2xl font-heading font-black text-white">₹15,000</h3>
                  <p className="text-xs font-sans text-white/70 font-light">
                    Runner-up Trophy, Verified Achievement Certificate, and direct interview fast-track.
                  </p>
                </div>

                <div className="p-6 rounded-3xl border border-white/15 bg-[#020b18]/60 space-y-3">
                  <div className="text-[10px] font-mono text-white/50 uppercase tracking-widest">SPECIAL INNOVATION</div>
                  <h3 className="text-2xl font-heading font-black text-white">₹5,000</h3>
                  <p className="text-xs font-sans text-white/70 font-light">
                    Best Technical Novelty Award & Special Commendation Certificate.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: RULES */}
          {activeTab === 'rules' && (
            <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#020b18]/60 space-y-4 animate-in fade-in duration-300">
              <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-electric-cyan" />
                <span>Rules & Submission Code</span>
              </h2>

              <ul className="text-xs sm:text-sm font-sans text-white/80 space-y-3 list-decimal list-inside font-light leading-relaxed">
                <li>Teams must adhere strictly to round deadlines. Late submissions are locked out automatically.</li>
                <li>All intellectual property developed by participants remains 100% owned by the participant/team.</li>
                <li>Plagiarism, fabricated benchmark data, or unauthorized code copying results in immediate disqualification.</li>
                <li>Decisions of the ARASS Technical Evaluation Board and Judges are final and binding.</li>
              </ul>
            </div>
          )}

          {/* TAB 6: FAQ */}
          {activeTab === 'faq' && (
            <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#020b18]/60 space-y-4 animate-in fade-in duration-300">
              <h2 className="text-xl font-heading font-bold text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-electric-cyan" />
                <span>Frequently Asked Questions</span>
              </h2>

              <div className="space-y-4">
                {[
                  {
                    q: 'Is there any registration fee for ARASS competitions?',
                    a: 'No, registration for ARASS Ideathon and Hackathon events is 100% free of charge.',
                  },
                  {
                    q: 'Can I participate individually without a team?',
                    a: 'Yes, individual participation is supported. You can also form a team of up to 3 members.',
                  },
                  {
                    q: 'How are submissions evaluated?',
                    a: 'Submissions are scored by assigned technical evaluators across defined rubrics: Innovation (30%), Feasibility (40%), and Impact (30%).',
                  },
                  {
                    q: 'Will all participants receive certificates?',
                    a: 'Yes, all verified participants who submit deliverables receive verifiable ARASS digital achievement credentials.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 rounded-2xl border border-white/10 bg-[#01050d]/50 space-y-1.5">
                    <h3 className="text-sm font-heading font-bold text-white">{item.q}</h3>
                    <p className="text-xs font-sans text-white/70 font-light leading-relaxed">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/10 bg-[#01050d] py-8 text-center text-xs font-mono text-white/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>ARASS EVENTS // {event.name}</div>
          <a href="/events" className="text-electric-cyan hover:underline">
            ← Back to All Events
          </a>
        </div>
      </footer>
    </div>
  );
}
