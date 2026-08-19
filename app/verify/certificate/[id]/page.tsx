'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { EventsNavigation } from '@/components/events/EventsNavigation';
import { LiveCinematicAtmosphere } from '@/components/cinematic/LiveCinematicAtmosphere';
import { ShieldCheck, AlertTriangle, CheckCircle2, Award, Calendar, ExternalLink } from 'lucide-react';

export default function CertificateVerificationPage() {
  const params = useParams();
  const certId = params.id as string;

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/events/certificates/verify/${encodeURIComponent(certId)}`)
      .then((res) => res.json())
      .then((resData) => {
        setData(resData);
        setLoading(false);
      })
      .catch(() => {
        setData({ valid: false });
        setLoading(false);
      });
  }, [certId]);

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col justify-between selection:bg-electric-cyan selection:text-background relative">
      <LiveCinematicAtmosphere className="opacity-20" />
      <EventsNavigation />

      <main className="relative z-10 flex-1 max-w-2xl mx-auto w-full px-4 sm:px-6 py-12 flex flex-col items-center justify-center space-y-8">
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-electric-cyan/30 bg-electric-cyan/10 text-[10px] font-mono text-electric-cyan tracking-widest uppercase">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ARASS OFFICIAL CREDENTIAL REGISTRY</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-heading font-black text-white">Certificate Verification</h1>
        </div>

        {loading ? (
          <div className="p-12 rounded-3xl border border-white/10 bg-[#020b18]/60 text-center font-mono text-xs text-white/60">
            VERIFYING CRYPTOGRAPHIC RECORD...
          </div>
        ) : data?.valid && data.certificate ? (
          <div className="w-full p-8 sm:p-10 rounded-3xl border border-emerald-500/40 bg-[#020b18]/90 backdrop-blur-2xl shadow-[0_0_40px_rgba(16,185,129,0.15)] space-y-6">
            {/* Status Banner */}
            <div className="flex items-center gap-3 p-4 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 font-mono text-xs font-bold">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
              <span>OFFICIALLY VERIFIED & VALID CREDENTIAL</span>
            </div>

            {/* Credential Details */}
            <div className="space-y-4 border-y border-white/10 py-6 text-xs font-mono">
              <div>
                <div className="text-white/40 uppercase text-[10px]">Recipient Name</div>
                <div className="text-lg font-heading font-bold text-white mt-0.5">
                  {data.certificate.recipientName}
                </div>
              </div>

              <div>
                <div className="text-white/40 uppercase text-[10px]">Recognition Tier</div>
                <div className="text-sm font-semibold text-electric-cyan mt-0.5">
                  {data.certificate.position || data.certificate.type}
                </div>
              </div>

              <div>
                <div className="text-white/40 uppercase text-[10px]">Event Program</div>
                <div className="text-sm font-semibold text-white mt-0.5">
                  {data.event?.name || 'ARASS National Challenge'}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <div>
                  <div className="text-white/40 uppercase text-[10px]">Issue Date</div>
                  <div className="text-white mt-0.5">
                    {new Date(data.certificate.issuedAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </div>
                </div>

                <div>
                  <div className="text-white/40 uppercase text-[10px]">Certificate ID</div>
                  <div className="text-white font-mono mt-0.5">{data.certificate.certificateId}</div>
                </div>
              </div>

              <div className="pt-2 border-t border-white/10">
                <div className="text-white/40 uppercase text-[10px]">SHA-256 Verification Hash</div>
                <div className="text-[10px] text-white/60 font-mono break-all mt-0.5">
                  {data.certificate.verificationHash}
                </div>
              </div>
            </div>

            <div className="text-center pt-2">
              <Link
                href="/events"
                className="inline-flex items-center gap-2 text-xs font-mono text-electric-cyan hover:underline"
              >
                <span>Browse All ARASS Competitions</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ) : (
          <div className="w-full p-8 sm:p-10 rounded-3xl border border-red-500/40 bg-[#020b18]/90 backdrop-blur-2xl text-center space-y-4">
            <AlertTriangle className="w-10 h-10 text-red-400 mx-auto" />
            <h3 className="text-lg font-heading font-bold text-white">
              {data?.status === 'REVOKED' ? 'CERTIFICATE HAS BEEN REVOKED' : 'Certificate Invalid or Not Found'}
            </h3>
            <p className="text-xs font-sans text-white/60 max-w-sm mx-auto font-light">
              {data?.status === 'REVOKED'
                ? `The credential with ID ${certId} was officially invalidated and revoked by the ARASS Governance Board.`
                : `No matching active credential was found for ID ${certId}. The certificate may have been revoked or the identifier was mistyped.`}
            </p>
            {data?.certificate?.revocationReason && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-300 text-xs font-mono">
                Reason: {data.certificate.revocationReason}
              </div>
            )}
            <div>
              <Link
                href="/events"
                className="inline-block px-6 py-2 rounded-full bg-electric-cyan text-background font-mono text-xs font-bold"
              >
                RETURN TO EVENTS
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
