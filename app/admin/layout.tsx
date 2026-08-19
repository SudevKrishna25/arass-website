'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    fetch('/api/events/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (!data.user || (data.user.role !== 'SUPER_ADMIN' && data.user.role !== 'ORGANIZER')) {
          setAuthorized(false);
          router.push(data.user ? '/dashboard' : '/login');
        } else {
          setAuthorized(true);
        }
      })
      .catch(() => {
        setAuthorized(false);
        router.push('/login');
      });
  }, [router]);

  if (authorized === null) {
    return (
      <div className="min-h-screen bg-[#01050d] flex items-center justify-center text-xs font-mono text-electric-cyan animate-pulse">
        VERIFYING EXECUTIVE PRIVILEGES...
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return <>{children}</>;
}
