'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { OrganizerLayout } from '@/components/organizer/OrganizerLayout';
import { EventSubNav } from '@/components/organizer/EventSubNav';
import { Event, Certificate } from '@/lib/events-db/types';
import { Award, Plus, CheckCircle2, ExternalLink, ShieldCheck, RefreshCw } from 'lucide-react';

export default function EventCertificatesManagerPage() {
  const params = useParams();
  const slug = params.id as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  // Issue modal
  const [showModal, setShowModal] = useState(false);
  const [recipientUserId, setRecipientUserId] = useState('');
  const [type, setType] = useState('WINNER');
  const [position, setPosition] = useState('First Place // Grand Champion');
  const [issueSuccess, setIssueSuccess] = useState<string | null>(null);

  const loadData = () => {
    fetch(`/api/events/${slug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.event) {
          setEvent(data.event);
          return fetch(`/api/events/${data.event.id}/certificates`);
        }
        throw new Error('Event not found');
      })
      .then((res) => res.json())
      .then((certData) => {
        if (certData.certificates) setCertificates(certData.certificates);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, [slug]);

  const handleIssueCertificate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!event) return;

    const res = await fetch(`/api/events/${event.id}/certificates`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        recipientUserId,
        type,
        position,
      }),
    });

    const data = await res.json();
    if (res.ok) {
      setShowModal(false);
      setIssueSuccess(`Certificate ${data.certificate.certificateId} issued successfully.`);
      setTimeout(() => setIssueSuccess(null), 4000);
      loadData();
    }
  };

  return (
    <OrganizerLayout>
      <div className="space-y-6">
        <EventSubNav slug={slug} eventName={event?.name || 'Loading Event...'} />

        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h2 className="text-lg font-heading font-bold text-white">Cryptographic Certificate Studio</h2>
            <p className="text-xs font-sans text-white/60 font-light">
              Issue and manage tamper-proof digital achievement credentials verified on the public registry.
            </p>
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>ISSUE CERTIFICATE</span>
          </button>
        </div>

        {issueSuccess && (
          <div className="p-4 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-emerald-300 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
            <span>{issueSuccess}</span>
          </div>
        )}

        <div className="p-6 rounded-3xl border border-white/10 bg-[#020b18]/80 space-y-4">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-white/10 text-white/40 text-[10px] uppercase">
                  <th className="pb-3">Certificate ID</th>
                  <th className="pb-3">Recipient Name</th>
                  <th className="pb-3">Recognition Tier</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Issued Timestamp</th>
                  <th className="pb-3 text-right">Verification</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {certificates.length > 0 ? (
                  certificates.map((cert) => (
                    <tr key={cert.id} className="hover:bg-white/5 transition-colors">
                      <td className="py-3.5 font-bold text-white">{cert.certificateId}</td>
                      <td className="py-3.5 text-white/90">{cert.recipientName}</td>
                      <td className="py-3.5 text-electric-cyan">{cert.position || cert.type}</td>
                      <td className="py-3.5">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                          {cert.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-white/50 text-[11px]">
                        {new Date(cert.issuedAt).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 text-right">
                        <Link
                          href={`/verify/certificate/${cert.certificateId}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-electric-cyan hover:underline text-[11px]"
                        >
                          <span>Verify</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-white/40">
                      No certificates issued for this event yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Modal for issuing new certificate */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
            <div className="w-full max-w-md p-6 sm:p-8 rounded-3xl border border-white/15 bg-[#020b18] space-y-4">
              <h3 className="text-lg font-heading font-bold text-white">Issue Official Certificate</h3>
              <form onSubmit={handleIssueCertificate} className="space-y-3 text-xs font-mono">
                <div>
                  <label className="block text-white/70 mb-1">Recipient User ID</label>
                  <input
                    type="text"
                    required
                    value={recipientUserId}
                    onChange={(e) => setRecipientUserId(e.target.value)}
                    placeholder="user-participant-1"
                    className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none focus:border-electric-cyan"
                  />
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Achievement Tier</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none focus:border-electric-cyan"
                  >
                    <option value="WINNER">Winner</option>
                    <option value="RUNNER_UP">Runner Up</option>
                    <option value="FINALIST">Finalist</option>
                    <option value="SPECIAL_AWARD">Special Award</option>
                    <option value="PARTICIPATION">Participation</option>
                  </select>
                </div>

                <div>
                  <label className="block text-white/70 mb-1">Position / Citation Text</label>
                  <input
                    type="text"
                    required
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                    placeholder="Grand Champion // First Place"
                    className="w-full px-3 py-2 rounded-xl border border-white/15 bg-[#01050d] text-white focus:outline-none focus:border-electric-cyan"
                  />
                </div>

                <div className="pt-3 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-full border border-white/15 text-white/70"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 rounded-full bg-electric-cyan text-background font-bold"
                  >
                    Generate & Sign
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </OrganizerLayout>
  );
}
