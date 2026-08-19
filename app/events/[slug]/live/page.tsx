'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { EventsNavigation } from '@/components/events/EventsNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { ServerAuthoritativeClock } from '@/components/events/ServerAuthoritativeClock';
import { Event, Round, Submission, LiveAnnouncement } from '@/lib/events-db/types';
import {
  Send,
  Github,
  FileText,
  CheckCircle2,
  AlertCircle,
  Award,
  Layers,
  HelpCircle,
  Bell,
  ArrowRight,
  ExternalLink,
  Save,
  Check,
  History,
  Shield,
  LifeBuoy,
  Clock,
  Code,
  FileArchive,
  Film,
} from 'lucide-react';

export default function ParticipantLiveCompetitionRoomPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [rounds, setRounds] = useState<Round[]>([]);
  const [activeRound, setActiveRound] = useState<Round | null>(null);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [announcements, setAnnouncements] = useState<LiveAnnouncement[]>([]);
  const [loading, setLoading] = useState(true);

  // Multi-format Submission State
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [demoUrl, setDemoUrl] = useState('');
  const [pdfUrl, setPdfUrl] = useState('');
  const [zipUrl, setZipUrl] = useState('');
  const [submissionStatus, setSubmissionStatus] = useState<'DRAFT' | 'READY' | 'SUBMITTED'>('READY');
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Support / Help Desk Modal State
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [helpCategory, setHelpCategory] = useState<'TECHNICAL' | 'SUBMISSION' | 'TEAM' | 'OTHER'>('TECHNICAL');
  const [helpMessage, setHelpMessage] = useState('');
  const [helpSuccess, setHelpSuccess] = useState<string | null>(null);

  const loadData = () => {
    fetch(`/api/events/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.event) {
          setEvent(data.event);
          setRounds(data.rounds || []);
          if (data.rounds && data.rounds.length > 0) {
            const liveRound = data.rounds.find((r: Round) => r.status === 'LIVE') || data.rounds[0];
            setActiveRound(liveRound);
          }

          // Fetch submissions & announcements
          fetch(`/api/events/${data.event.id}/submissions`)
            .then((r) => r.json())
            .then((subData) => {
              if (subData.submissions) setSubmissions(subData.submissions);
            });

          fetch(`/api/events/${data.event.id}/announcements`)
            .then((r) => r.json())
            .then((annData) => {
              if (annData.announcements) setAnnouncements(annData.announcements);
            });
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 10000);
    return () => clearInterval(interval);
  }, [slug]);

  const handleValidate = () => {
    const errs: string[] = [];
    if (!title.trim()) errs.push('Project Title is required.');
    if (!url.trim() && !pdfUrl.trim()) errs.push('At least a Code Repository URL or PDF Blueprint is required.');
    setValidationErrors(errs);
    if (errs.length === 0) {
      setSubmissionStatus('READY');
      return true;
    }
    return false;
  };

  const handleSaveDraft = () => {
    setSubmissionStatus('DRAFT');
    setSubmitSuccess('Draft saved locally in workspace state.');
    setTimeout(() => setSubmitSuccess(null), 4000);
  };

  const handleSubmitDeliverable = async () => {
    if (!event || !activeRound) return;
    if (!handleValidate()) return;

    setSubmitting(true);
    setError(null);
    setSubmitSuccess(null);
    setShowConfirmModal(false);

    try {
      const res = await fetch(`/api/events/${event.id}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          roundId: activeRound.id,
          title,
          description,
          url,
          demoUrl,
          pdfUrl,
          zipUrl,
          files: [
            { filename: 'architecture_blueprint.pdf', url: pdfUrl || 'https://cdn.arass.technology/docs/blueprint.pdf', size: 102400, mimeType: 'application/pdf' },
            ...(zipUrl ? [{ filename: 'bundle.zip', url: zipUrl, size: 204800, mimeType: 'application/zip' }] : []),
          ],
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Submission failed.');

      setSubmitSuccess(`Deliverable submitted successfully (Version ${data.submission?.version || 1}). Immutable hash recorded.`);
      setTitle('');
      setDescription('');
      setUrl('');
      setDemoUrl('');
      setPdfUrl('');
      setZipUrl('');
      setSubmitting(false);
      loadData();
    } catch (err: any) {
      setError(err.message || 'Submission failed.');
      setSubmitting(false);
    }
  };

  const handleCreateSupportTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event || !helpMessage.trim()) return;

    try {
      const res = await fetch(`/api/events/${event.id}/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: helpCategory,
          priority: 'MEDIUM',
          message: helpMessage,
        }),
      });

      if (res.ok) {
        setHelpSuccess('Support ticket dispatched to Event Operations Desk.');
        setHelpMessage('');
        setTimeout(() => {
          setHelpSuccess(null);
          setShowHelpModal(false);
        }, 2500);
      }
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-20" />
      <EventsNavigation />

      <main className="relative z-10 flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Top Header & Navigation Breadcrumb */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <div className="text-[10px] font-mono text-electric-cyan uppercase tracking-widest flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-electric-cyan animate-ping" />
              <span>LIVE COMPETITION COMMAND CENTER</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">{event?.name || 'Competition Room'}</h1>
            <p className="text-xs font-sans text-white/60 font-light mt-1">
              Authoritative workspace for stage objectives, technical submissions, and live announcements.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2 text-xs font-mono">
            <button
              onClick={() => setShowHelpModal(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-white/20 hover:border-white/40 bg-white/5 text-white/80 hover:text-white"
            >
              <LifeBuoy className="w-3.5 h-3.5 text-electric-cyan" />
              <span>HELP DESK</span>
            </button>

            <Link
              href={`/events/${slug}/assessment/assess-ideathon-1`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-violet-500/40 bg-violet-500/15 text-violet-300 font-bold hover:bg-violet-500/25"
            >
              <Award className="w-3.5 h-3.5" />
              <span>ASSESSMENT SPRINT →</span>
            </Link>

            <Link
              href={`/events/${slug}/leaderboard`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-electric-cyan/40 bg-electric-cyan/10 text-electric-cyan font-bold hover:bg-electric-cyan/20"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>LIVE LEADERBOARD</span>
            </Link>
          </div>
        </div>

        {/* Live Clock & Announcements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            {event && <ServerAuthoritativeClock eventId={event.id} />}
          </div>

          <div className="md:col-span-2 p-5 rounded-2xl border border-white/10 bg-[#020b18]/80 backdrop-blur-xl space-y-3">
            <div className="flex items-center justify-between text-xs font-mono border-b border-white/10 pb-2">
              <div className="flex items-center gap-1.5 text-white/80 font-bold uppercase">
                <Bell className="w-3.5 h-3.5 text-electric-cyan" />
                <span>Live Event Announcements</span>
              </div>
              <span className="text-[10px] text-white/40">{announcements.length} Published</span>
            </div>

            <div className="space-y-2 max-h-28 overflow-y-auto pr-1">
              {announcements.length > 0 ? (
                announcements.map((ann) => (
                  <div key={ann.id} className="p-2.5 rounded-xl border border-white/5 bg-[#01050d]/70 text-xs space-y-0.5">
                    <div className="flex items-center justify-between font-mono">
                      <span className="text-electric-cyan font-bold text-[11px]">{ann.title}</span>
                      <span className="text-[10px] text-white/40">{new Date(ann.publishedAt).toLocaleTimeString()}</span>
                    </div>
                    <p className="text-white/70 font-sans text-[11px] font-light">{ann.message}</p>
                  </div>
                ))
              ) : (
                <div className="text-center py-3 text-white/40 text-xs font-mono">No announcements at this time.</div>
              )}
            </div>
          </div>
        </div>

        {/* Stage Directives & Multi-Format Submission Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Active Challenge Directives & Version History */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#020b18]/80 backdrop-blur-xl space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div>
                  <div className="text-[10px] font-mono text-electric-cyan uppercase">
                    CURRENT STAGE: 0{activeRound?.order || 1}
                  </div>
                  <h2 className="text-xl font-heading font-bold text-white">
                    {activeRound?.name || 'Stage 01: Concept Architecture & Technical Blueprint'}
                  </h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {activeRound?.status || 'LIVE'}
                </span>
              </div>

              <p className="text-xs font-sans text-white/80 font-light leading-relaxed">
                {activeRound?.description ||
                  'Architect a distributed multi-agent consensus system capable of sub-second asynchronous state reconciliation. Deliverables must include public repository link and system architecture blueprint.'}
              </p>

              <div className="p-4 rounded-2xl border border-white/10 bg-[#01050d]/60 space-y-2 text-xs font-mono">
                <div className="text-white/50 text-[10px] uppercase">Stage Submission Requirements:</div>
                <div className="flex items-center gap-2 text-white/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-electric-cyan" />
                  <span>Public GitHub / GitLab Repository URL</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-electric-cyan" />
                  <span>System Architecture Proposal / PDF Document</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <CheckCircle2 className="w-3.5 h-3.5 text-electric-cyan" />
                  <span>Optional Interactive Demo URL or ZIP Deliverable</span>
                </div>
              </div>
            </div>

            {/* Submission History / Versions */}
            <div className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <div className="flex items-center gap-2">
                  <History className="w-4 h-4 text-electric-cyan" />
                  <h3 className="text-sm font-heading font-bold text-white uppercase tracking-wider">
                    Submission History & Version Chain
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-white/50">{submissions.length} Total Versions</span>
              </div>

              {submissions.length > 0 ? (
                <div className="space-y-3">
                  {submissions.map((sub) => (
                    <div
                      key={sub.id}
                      className="p-4 rounded-2xl border border-white/10 bg-[#01050d]/70 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white">{sub.title}</span>
                          <span className="px-2 py-0.5 rounded-full text-[9px] bg-electric-cyan/20 text-electric-cyan border border-electric-cyan/40">
                            v{sub.version}
                          </span>
                        </div>
                        <div className="text-white/50 text-[11px] font-sans font-light mt-0.5">
                          Submitted {new Date(sub.submittedAt).toLocaleTimeString()} ({new Date(sub.submittedAt).toLocaleDateString()})
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        {sub.url && (
                          <a
                            href={sub.url}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1 text-electric-cyan hover:underline text-[11px]"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>Repository</span>
                          </a>
                        )}
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          {sub.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6 text-white/40 text-xs font-mono">
                  No deliverables submitted yet for this stage.
                </div>
              )}
            </div>
          </div>

          {/* Submission Workspace Form */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#020b18]/90 backdrop-blur-2xl space-y-4 shadow-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-electric-cyan uppercase">SUBMISSION WORKSPACE</div>
                  <h3 className="text-lg font-heading font-bold text-white">Project Deliverables</h3>
                </div>
                <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-white/10 bg-white/5 text-[10px] font-mono text-white/70">
                  <Shield className="w-3 h-3 text-electric-cyan" />
                  <span>IMMUTABLE RECORD</span>
                </div>
              </div>

              {submitSuccess && (
                <div className="p-3.5 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs font-mono flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  <span>{submitSuccess}</span>
                </div>
              )}

              {error && (
                <div className="p-3.5 rounded-xl border border-red-500/40 bg-red-500/10 text-red-300 text-xs font-mono flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {validationErrors.length > 0 && (
                <div className="p-3.5 rounded-xl border border-amber-500/40 bg-amber-500/10 text-amber-300 text-xs font-mono space-y-1">
                  <div className="font-bold">Validation Required:</div>
                  {validationErrors.map((err, idx) => (
                    <div key={idx} className="text-[11px]">• {err}</div>
                  ))}
                </div>
              )}

              <div className="space-y-3.5 text-xs font-mono">
                <div>
                  <label className="block text-white/70 mb-1">Project / Submission Title *</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Autonomous Multi-Agent Consensus Protocol"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs focus:outline-none focus:border-electric-cyan"
                  />
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Public Code Repository (GitHub / GitLab) *</label>
                  <input
                    type="url"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://github.com/org/project-repo"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs focus:outline-none focus:border-electric-cyan"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-white/70 mb-1">Live Interactive Demo URL</label>
                    <input
                      type="url"
                      value={demoUrl}
                      onChange={(e) => setDemoUrl(e.target.value)}
                      placeholder="https://demo.project.org"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs focus:outline-none focus:border-electric-cyan"
                    />
                  </div>

                  <div>
                    <label className="block text-white/70 mb-1">PDF Architecture Blueprint</label>
                    <input
                      type="url"
                      value={pdfUrl}
                      onChange={(e) => setPdfUrl(e.target.value)}
                      placeholder="https://cdn.link/blueprint.pdf"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs focus:outline-none focus:border-electric-cyan"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Technical Architecture Abstract</label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide an overview of the consensus formulation and benchmark metrics..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-sans focus:outline-none focus:border-electric-cyan"
                  />
                </div>

                {/* Submission Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-center gap-2">
                  <button
                    type="button"
                    onClick={handleSaveDraft}
                    className="w-full sm:w-1/3 py-2.5 rounded-xl border border-white/20 hover:border-white/40 bg-white/5 text-white/80 font-mono text-xs flex items-center justify-center gap-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>SAVE DRAFT</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmitDeliverable}
                    disabled={submitting}
                    className="w-full sm:w-2/3 py-3 rounded-full bg-electric-cyan disabled:opacity-50 text-background font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,212,255,0.7)] transition-all hover:scale-105"
                  >
                    {submitting ? 'TRANSMITTING DELIVERABLE...' : 'TRANSMIT DELIVERABLE →'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showConfirmModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl border border-electric-cyan/40 bg-[#020b18] shadow-2xl space-y-4 font-mono text-xs">
              <div className="text-base font-heading font-black text-white flex items-center gap-2">
                <Shield className="w-5 h-5 text-electric-cyan" />
                <span>Confirm Final Deliverable Submission</span>
              </div>
              <p className="text-white/70 font-sans text-xs leading-relaxed">
                You are transmitting a signed deliverable for <strong className="text-white">{event?.name}</strong>. An immutable cryptographic timestamp will be recorded.
              </p>
              <div className="p-3 rounded-xl border border-white/10 bg-[#01050d] text-[11px] text-white/60 space-y-1">
                <div>Title: <span className="text-white">{title}</span></div>
                <div>Repository: <span className="text-electric-cyan">{url}</span></div>
              </div>
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowConfirmModal(false)}
                  className="px-4 py-2 rounded-xl border border-white/20 text-white/70 hover:text-white"
                >
                  CANCEL
                </button>
                <button
                  type="button"
                  onClick={handleSubmitDeliverable}
                  className="px-5 py-2 rounded-full bg-electric-cyan text-background font-bold"
                >
                  CONFIRM & TRANSMIT
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Help Desk Support Modal */}
        {showHelpModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="max-w-md w-full p-6 sm:p-8 rounded-3xl border border-white/20 bg-[#020b18] shadow-2xl space-y-4 font-mono text-xs">
              <div className="text-base font-heading font-black text-white flex items-center gap-2">
                <LifeBuoy className="w-5 h-5 text-electric-cyan" />
                <span>Event Help Desk & Support</span>
              </div>

              {helpSuccess && (
                <div className="p-3 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs">
                  {helpSuccess}
                </div>
              )}

              <form onSubmit={handleCreateSupportTicket} className="space-y-3">
                <div>
                  <label className="block text-white/70 mb-1">Issue Category</label>
                  <select
                    value={helpCategory}
                    onChange={(e) => setHelpCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs focus:outline-none focus:border-electric-cyan"
                  >
                    <option value="TECHNICAL">Technical Issue</option>
                    <option value="SUBMISSION">Submission Issue</option>
                    <option value="TEAM">Team / Squad Issue</option>
                    <option value="OTHER">Other Query</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Describe Your Issue</label>
                  <textarea
                    rows={4}
                    required
                    value={helpMessage}
                    onChange={(e) => setHelpMessage(e.target.value)}
                    placeholder="Provide details about your query or technical issue..."
                    className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white text-xs font-sans focus:outline-none focus:border-electric-cyan"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowHelpModal(false)}
                    className="px-4 py-2 rounded-xl border border-white/20 text-white/70 hover:text-white"
                  >
                    CLOSE
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-electric-cyan text-background font-bold"
                  >
                    DISPATCH TICKET
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
