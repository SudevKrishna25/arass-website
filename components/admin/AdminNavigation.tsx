'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  FileText,
  Image as ImageIcon,
  Users,
  Navigation as NavIcon,
  ShieldCheck,
  Settings,
  ExternalLink,
  Lock,
} from 'lucide-react';

export function AdminNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/admin', label: 'OVERVIEW', icon: LayoutDashboard },
    { href: '/admin/conference', label: 'CONFERENCE ROOM', icon: ShieldCheck },
    { href: '/admin/founders', label: '5 FOUNDERS', icon: Users },
    { href: '/admin/events', label: 'EVENTS', icon: Calendar },
    { href: '/admin/content', label: 'WEBSITE CMS', icon: FileText },
    { href: '/admin/media', label: 'MEDIA LIBRARY', icon: ImageIcon },
    { href: '/admin/audit', label: 'SITE EDITS AUDIT', icon: ShieldCheck },
    { href: '/admin/settings', label: 'SETTINGS', icon: Settings },
  ];

  return (
    <header className="w-full bg-[#01050d] border-b border-white/15 sticky top-0 z-50 backdrop-blur-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Badge */}
        <div className="flex items-center gap-4">
          <Link href="/admin" className="flex items-center gap-2">
            <span className="font-heading font-black text-lg text-white tracking-wider">ARASS</span>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-electric-cyan/40 bg-electric-cyan/10 text-electric-cyan font-bold tracking-widest uppercase">
              ADMIN CONTROL SYSTEM
            </span>
          </Link>
        </div>

        {/* Links */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2 text-xs font-mono">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all ${
                  isActive
                    ? 'bg-electric-cyan text-background font-bold shadow-[0_0_12px_rgba(0,212,255,0.4)]'
                    : 'text-white/70 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Public Site Link */}
        <div className="flex items-center gap-3">
          <Link
            href="/events"
            target="_blank"
            className="hidden sm:flex items-center gap-1 text-xs font-mono text-white/50 hover:text-electric-cyan transition-colors"
          >
            <span>Public Site</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
    </header>
  );
}
