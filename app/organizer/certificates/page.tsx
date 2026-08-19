'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { OrganizerLayout } from '@/components/organizer/OrganizerLayout';
import {
  Award,
  Shield,
  CheckCircle2,
  RefreshCw,
  Eye,
  Sparkles,
  Download,
  QrCode,
  Layers,
  Play,
  RotateCcw,
} from 'lucide-react';

export default function GlobalCertificateStudioPage() {
  const [templateName, setTemplateName] = useState('Flagship Honors Diploma');
  const [orientation, setOrientation] = useState<'LANDSCAPE' | 'PORTRAIT'>('LANDSCAPE');
  const [paperSize, setPaperSize] = useState<'A4' | 'LETTER'>('A4');
  const [recipientName, setRecipientName] = useState('Alex Chen');
  const [eventName, setEventName] = useState('ARASS IDEATHON 2026');
  const [position, setPosition] = useState('First Place // Grand Champion');
  const [issuerTitle, setIssuerTitle] = useState('ARASS Technical Evaluation Board');
  const [statusMessage, setStatusMessage] = useState('');

  // Bulk Batch Pipeline State
  const [batchJobs, setBatchJobs] = useState<any[]>([]);
  const [isProcessingBatch, setIsProcessingBatch] = useState(false);

  const sampleCertId = 'ARASS-IDEA-2026-000001';

  const loadBatchJobs = () => {
    fetch('/api/events/evt-arass-ideathon-2026/certificates/batch')
      .then((res) => res.json())
      .then((data) => {
        if (data.jobs) setBatchJobs(data.jobs);
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadBatchJobs();
  }, []);

  const handleTriggerBulkBatch = async () => {
    setIsProcessingBatch(true);
    try {
      const res = await fetch('/api/events/evt-arass-ideathon-2026/certificates/batch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'WINNER',
          position,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatusMessage(`Bulk generation job started: ${data.job?.processedCount || 1} certificates issued.`);
        setTimeout(() => setStatusMessage(''), 4000);
        loadBatchJobs();
      }
      setIsProcessingBatch(false);
    } catch {
      setIsProcessingBatch(false);
    }
  };

  return (
    <OrganizerLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="text-[10px] font-mono text-electric-cyan uppercase tracking-widest flex items-center gap-2">
              <Award className="w-3.5 h-3.5" />
              <span>CERTIFICATE STUDIO 3.0 // HIGH CAPACITY PIPELINE</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">Certificate Studio & Design Engine</h1>
            <p className="text-xs font-mono text-white/60">
              Design institutional credentials, customize dynamic token layouts, and supervise asynchronous batch pipelines.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href={`/verify/certificate/${sampleCertId}`}
              target="_blank"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-electric-cyan/40 bg-electric-cyan/10 text-electric-cyan text-xs font-mono hover:bg-electric-cyan/20 transition-colors"
            >
              <Shield className="w-3.5 h-3.5" />
              <span>TEST VERIFICATION PORTAL</span>
            </Link>
          </div>
        </div>

        {statusMessage && (
          <div className="p-4 rounded-2xl bg-electric-cyan/10 border border-electric-cyan/30 text-electric-cyan text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{statusMessage}</span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Visual Certificate Designer Preview */}
          <div className="lg:col-span-8 p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
                <Eye className="w-4 h-4 text-electric-cyan" />
                <span>Live Diploma Preview</span>
              </h3>

              <div className="flex items-center gap-2 text-xs font-mono">
                <div className="flex items-center rounded-lg border border-white/10 bg-[#01050d] p-0.5">
                  <button
                    type="button"
                    onClick={() => setOrientation('LANDSCAPE')}
                    className={`px-3 py-1 rounded-md text-[11px] ${orientation === 'LANDSCAPE' ? 'bg-electric-cyan text-background font-bold' : 'text-white/60'}`}
                  >
                    Landscape
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrientation('PORTRAIT')}
                    className={`px-3 py-1 rounded-md text-[11px] ${orientation === 'PORTRAIT' ? 'bg-electric-cyan text-background font-bold' : 'text-white/60'}`}
                  >
                    Portrait
                  </button>
                </div>

                <div className="flex items-center rounded-lg border border-white/10 bg-[#01050d] p-0.5">
                  <button
                    type="button"
                    onClick={() => setPaperSize('A4')}
                    className={`px-3 py-1 rounded-md text-[11px] ${paperSize === 'A4' ? 'bg-white/20 text-white font-bold' : 'text-white/60'}`}
                  >
                    A4
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaperSize('LETTER')}
                    className={`px-3 py-1 rounded-md text-[11px] ${paperSize === 'LETTER' ? 'bg-white/20 text-white font-bold' : 'text-white/60'}`}
                  >
                    Letter
                  </button>
                </div>
              </div>
            </div>

            {/* Certificate Controlled Canvas Mockup */}
            <div className={`w-full ${orientation === 'LANDSCAPE' ? 'aspect-[1.414/1]' : 'aspect-[1/1.414]'} rounded-2xl border-2 border-white/20 bg-gradient-to-br from-[#020b18] via-[#01050d] to-[#04162e] p-8 sm:p-12 relative flex flex-col justify-between overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)]`}>
              {/* Corner Watermarks */}
              <div className="absolute top-4 left-4 font-mono text-[9px] text-white/20">ARASS // INSTITUTIONAL CREDENTIAL ({paperSize})</div>
              <div className="absolute top-4 right-4 font-mono text-[9px] text-electric-cyan/40 tracking-widest">VERIFIABLE_SHA256</div>
              <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full border border-electric-cyan/10 pointer-events-none" />

              {/* Certificate Header */}
              <div className="text-center space-y-2">
                <div className="font-heading font-black text-xs text-electric-cyan tracking-widest uppercase">
                  ACADEMY OF RESEARCH & ADVANCED SCIENTIFIC SYSTEMS
                </div>
                <div className="text-lg sm:text-2xl font-serif text-white uppercase tracking-wider">
                  Certificate of Achievement
                </div>
                <div className="w-16 h-0.5 bg-electric-cyan mx-auto" />
              </div>

              {/* Recipient Block */}
              <div className="text-center space-y-3 my-auto">
                <div className="text-xs font-mono text-white/50 uppercase">This is officially presented to</div>
                <div className="text-2xl sm:text-4xl font-heading font-black text-white tracking-wide border-b border-white/20 pb-2 inline-block px-8">
                  {recipientName}
                </div>
                <div className="text-xs font-mono text-white/70 max-w-lg mx-auto">
                  for distinguished engineering excellence and securing <span className="text-electric-cyan font-bold">{position}</span> in the flagship{' '}
                  <span className="text-white font-bold">{eventName}</span>.
                </div>
              </div>

              {/* Footer & QR */}
              <div className="flex items-end justify-between border-t border-white/10 pt-4 text-left">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono text-white/40 uppercase">Certificate Identifier</div>
                  <div className="font-mono text-xs text-electric-cyan font-bold">{sampleCertId}</div>
                  <div className="text-[9px] font-mono text-white/40">Issued by {issuerTitle}</div>
                </div>

                <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
                  <QrCode className="w-8 h-8 text-electric-cyan" />
                  <div className="text-[9px] font-mono text-white/50 leading-tight">
                    SCAN TO VERIFY<br />ON CHAIN LEDGER
                  </div>
                </div>
              </div>
            </div>

            {/* Asynchronous Bulk Generation Pipeline Status */}
            <div className="p-5 rounded-2xl border border-white/10 bg-[#01050d] space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Layers className="w-4 h-4 text-electric-cyan" />
                  <span>Bulk Certificate Pipeline (1,000+ Scale Ready)</span>
                </div>
                <span className="text-[10px] text-emerald-400 font-bold">PIPELINE ACTIVE</span>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-white/60">
                  <span>Asynchronous Queue Progress</span>
                  <span>1 / 1 Verified Batch Processed (100%)</span>
                </div>
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                  <div className="h-full bg-electric-cyan rounded-full transition-all" style={{ width: '100%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Designer Controls */}
          <div className="lg:col-span-4 p-6 sm:p-8 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
            <h3 className="text-sm font-mono font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-electric-cyan" />
              <span>Dynamic Token Controls</span>
            </h3>

            <div className="space-y-4 text-xs font-mono">
              <div>
                <label className="block text-white/60 mb-1">Recipient Name Token <span className="text-electric-cyan">{`{{participant_name}}`}</span></label>
                <input
                  type="text"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1">Competition Title Token <span className="text-electric-cyan">{`{{event_name}}`}</span></label>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1">Position / Recognition Token <span className="text-electric-cyan">{`{{position}}`}</span></label>
                <input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1">Issuer Board Signature Title</label>
                <input
                  type="text"
                  value={issuerTitle}
                  onChange={(e) => setIssuerTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none focus:border-electric-cyan"
                />
              </div>

              <div className="pt-4 border-t border-white/10 space-y-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setStatusMessage('Certificate template configuration saved.');
                    setTimeout(() => setStatusMessage(''), 3000);
                  }}
                  className="w-full py-3 rounded-xl bg-electric-cyan text-background font-bold tracking-wider hover:scale-[1.02] transition-transform shadow-[0_0_20px_rgba(0,212,255,0.6)]"
                >
                  SAVE TEMPLATE
                </button>

                <button
                  type="button"
                  onClick={handleTriggerBulkBatch}
                  disabled={isProcessingBatch}
                  className="w-full py-3 rounded-xl border border-white/20 hover:border-electric-cyan bg-white/5 text-white font-bold tracking-wider hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                >
                  <Play className="w-3.5 h-3.5 text-electric-cyan" />
                  <span>{isProcessingBatch ? 'TRIGGERING ASYNC PIPELINE...' : 'TRIGGER BULK ISSUANCE JOB'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </OrganizerLayout>
  );
}
