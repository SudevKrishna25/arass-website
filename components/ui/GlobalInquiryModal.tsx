'use client';

import React, { useState, useEffect } from 'react';
import { InstitutionalInquiryModal } from './InstitutionalInquiryModal';

export function GlobalInquiryModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleOpen = () => setIsOpen(true);
    window.addEventListener('arass:open-inquiry', handleOpen);
    return () => window.removeEventListener('arass:open-inquiry', handleOpen);
  }, []);

  return (
    <InstitutionalInquiryModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    />
  );
}
