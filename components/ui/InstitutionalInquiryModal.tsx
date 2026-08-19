'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X, ArrowUpRight, CheckCircle2, ShieldCheck, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface InstitutionalInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialHeader?: string;
}

const ALIGNMENT_OPTIONS = [
  { id: '01', title: 'RESEARCHER / SCIENTIST', desc: 'Pioneering breakthroughs in deep labs & fundamental research' },
  { id: '02', title: 'FOUNDER / BUILDER', desc: 'Building high-impact technological ventures' },
  { id: '03', title: 'STRATEGIC CAPITAL', desc: 'Deploying patient, century-scale capital' },
  { id: '04', title: 'INSTITUTIONAL PARTNER', desc: 'Institutional research, infrastructure, & sovereign alignment' },
  { id: '05', title: 'GENERAL INQUIRY', desc: 'General institutional communication' },
];

export function InstitutionalInquiryModal({
  isOpen,
  onClose,
  initialHeader = 'ENTER ARASS',
}: InstitutionalInquiryModalProps) {
  const [mounted, setMounted] = useState(false);
  const [selectedAlignment, setSelectedAlignment] = useState<string>('01');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Close on ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsSubmitted(false);
      setIsSubmitting(false);
      setErrorMessage(null);
      setFormData({ name: '', email: '', organization: '', message: '' });
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    setErrorMessage(null);

    // Client-side validation
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMessage('Please fill in required fields (Name and Email).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    try {
      const selectedObj = ALIGNMENT_OPTIONS.find((o) => o.id === selectedAlignment);
      const res = await fetch('/api/inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          organization: formData.organization.trim() || 'Undisclosed',
          message: formData.message.trim() || 'Standard institutional contact initiation.',
          alignment: selectedObj?.title || 'GENERAL INQUIRY',
        }),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && data?.success) {
        setIsSubmitted(true);
      } else {
        setErrorMessage(data?.error || 'Submission failed. Please check your details and try again.');
      }
    } catch (err) {
      console.error('[ARASS CLIENT] Submission error:', err);
      setErrorMessage('Network error. Unable to reach ARASS transmission server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Subtle Darkened Backdrop Layer */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#020914]/90 backdrop-blur-sm pointer-events-auto"
          />

          {/* Modal Container Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-50 w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[#031328] border border-electric-cyan/40 rounded-3xl p-6 sm:p-8 text-primary-text shadow-[0_0_60px_rgba(0,212,255,0.25)] my-auto pointer-events-auto"
          >
            {/* Modal Close Button */}
            <button
              onClick={onClose}
              disabled={isSubmitting}
              className="absolute top-6 right-6 p-2 rounded-full bg-white/5 border border-white/10 text-secondary-text hover:text-white hover:border-electric-cyan/50 transition-all duration-300 disabled:opacity-50"
              aria-label="Close inquiry modal"
            >
              <X className="w-4 h-4" />
            </button>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
                {/* Header Badge & Title */}
                <div className="flex flex-col gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-electric-cyan/10 border border-electric-cyan/30 w-fit">
                    <ShieldCheck className="w-3.5 h-3.5 text-electric-cyan" />
                    <span className="text-[10px] font-mono tracking-[0.25em] text-electric-cyan uppercase">
                      INSTITUTIONAL ACCESS PROTOCOL
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white uppercase mt-1">
                    {initialHeader}
                  </h2>
                  <p className="text-xs font-mono text-secondary-text/80">
                    Connect directly with ARASS Labs, Technologies, or Ventures leadership.
                  </p>
                </div>

                {/* Alignment Selector */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {ALIGNMENT_OPTIONS.map((option) => {
                    const isSelected = selectedAlignment === option.id;
                    return (
                      <button
                        type="button"
                        key={option.id}
                        disabled={isSubmitting}
                        onClick={() => setSelectedAlignment(option.id)}
                        className={cn(
                          'flex flex-col text-left p-3.5 rounded-xl border transition-all duration-300 disabled:opacity-60',
                          isSelected
                            ? 'bg-electric-cyan/15 border-electric-cyan text-white shadow-[0_0_15px_rgba(0,212,255,0.2)]'
                            : 'bg-white/5 border-white/10 text-secondary-text/70 hover:border-white/20 hover:text-white'
                        )}
                      >
                        <div className="flex items-center justify-between w-full">
                          <span
                            className={cn(
                              'text-[10px] font-mono font-bold tracking-widest',
                              isSelected ? 'text-electric-cyan' : 'text-secondary-text/50'
                            )}
                          >
                            {option.id}
                          </span>
                          {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-electric-cyan animate-pulse" />}
                        </div>
                        <span className="text-xs font-bold font-mono tracking-wider mt-1 text-white">
                          {option.title}
                        </span>
                        <span className="text-[10px] text-secondary-text/70 mt-0.5 leading-snug">
                          {option.desc}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Form Input Fields */}
                <div className="flex flex-col gap-4 mt-1">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono tracking-widest text-secondary-text/80 uppercase">
                        NAME *
                      </label>
                      <input
                        type="text"
                        disabled={isSubmitting}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Your full name"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white placeholder:text-white/20 focus:outline-none focus:border-electric-cyan transition-colors disabled:opacity-50"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label className="text-[10px] font-mono tracking-widest text-secondary-text/80 uppercase">
                        EMAIL *
                      </label>
                      <input
                        type="email"
                        disabled={isSubmitting}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="institutional@domain.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white placeholder:text-white/20 focus:outline-none focus:border-electric-cyan transition-colors disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-widest text-secondary-text/80 uppercase">
                      ORGANIZATION
                    </label>
                    <input
                      type="text"
                      disabled={isSubmitting}
                      value={formData.organization}
                      onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                      placeholder="Company, Lab, or Institution"
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white placeholder:text-white/20 focus:outline-none focus:border-electric-cyan transition-colors disabled:opacity-50"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] font-mono tracking-widest text-secondary-text/80 uppercase">
                      MESSAGE
                    </label>
                    <textarea
                      rows={3}
                      disabled={isSubmitting}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your research, background, or institutional inquiry..."
                      className="w-full px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-xs font-mono text-white placeholder:text-white/20 focus:outline-none focus:border-electric-cyan transition-colors disabled:opacity-50 resize-none"
                    />
                  </div>
                </div>

                {/* Error Banner Notification */}
                {errorMessage && (
                  <div className="flex items-center gap-2.5 px-4 py-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-mono">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {/* Modal Footer Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-2">
                  <button
                    type="button"
                    onClick={onClose}
                    disabled={isSubmitting}
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-secondary-text hover:text-white hover:border-white/20 transition-all text-center disabled:opacity-50"
                  >
                    CLOSE
                  </button>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-full bg-electric-cyan text-[#020914] font-bold text-xs font-mono tracking-wider uppercase transition-all duration-300 hover:bg-white hover:shadow-[0_0_20px_rgba(0,212,255,0.6)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin text-[#020914]" />
                        <span>TRANSMITTING...</span>
                      </>
                    ) : (
                      <>
                        <span>INITIATE CONTACT</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Confirmation Received State */
              <div className="flex flex-col items-center justify-center text-center py-8 gap-5">
                <div className="w-14 h-14 rounded-full bg-electric-cyan/15 border border-electric-cyan/40 flex items-center justify-center text-electric-cyan shadow-[0_0_25px_rgba(0,212,255,0.4)]">
                  <CheckCircle2 className="w-7 h-7 animate-bounce" />
                </div>

                <div className="flex flex-col gap-2">
                  <span className="text-[10px] font-mono tracking-[0.25em] text-electric-cyan uppercase">
                    PROTOCOL CONFIRMED
                  </span>
                  <h3 className="text-2xl font-bold tracking-tight text-white uppercase">
                    TRANSMISSION RECEIVED
                  </h3>
                  <p className="text-xs font-mono text-secondary-text/90 max-w-md leading-relaxed mt-1">
                    Your transmission has been logged into the ARASS Institutional Intake Protocol. A partner or principal researcher will review and establish secure comms.
                  </p>
                </div>

                <button
                  onClick={onClose}
                  className="px-8 py-3 rounded-full bg-electric-cyan text-[#020914] font-bold text-xs font-mono tracking-wider uppercase shadow-cyan-glow hover:bg-white transition-all cursor-pointer mt-2"
                >
                  RETURN TO ARASS
                </button>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
