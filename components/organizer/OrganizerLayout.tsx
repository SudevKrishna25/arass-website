'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  Send,
  BarChart3,
  Settings,
  Shield,
  LogOut,
  Menu,
  X,
  Sparkles,
  Plus,
  Bell,
  Layers,
  Award,
} from 'lucide-react';

interface OrganizerLayoutProps {
  children: React.ReactNode;
}

export function OrganizerLayout({ children }: OrganizerLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    fetch('/api/events/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          if (data.user.role !== 'SUPER_ADMIN' && data.user.role !== 'ORGANIZER' && data.user.role !== 'MANAGER') {
            router.push('/login');
          } else {
            setCurrentUser({ ...data.user, profile: data.profile });
          }
        } else {
          router.push('/login');
        }
        setLoading(false);
      })
      .catch(() => {
        router.push('/login');
        setLoading(false);
      });
  }, [router]);

  const handleLogout = async () => {
    await fetch('/api/events/auth/logout', { method: 'POST' });
    router.push('/login');
  };

  const navItems = [
    { name: 'Dashboard', href: '/organizer/dashboard', icon: LayoutDashboard },
    { name: 'Events', href: '/organizer/events', icon: Calendar },
    { name: 'Tasks', href: '/organizer/tasks', icon: Layers },
    { name: 'Judges', href: '/organizer/judges', icon: Layers },
    { name: 'Analytics', href: '/organizer/analytics', icon: BarChart3 },
    { name: 'Certificates', href: '/organizer/certificates', icon: Award },
    { name: 'Messages', href: '/organizer/communications', icon: Send },
    { name: 'Audit Logs', href: '/organizer/audit', icon: Shield },
    { name: 'Settings', href: '/organizer/settings', icon: Settings },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-[#01050d] flex items-center justify-center text-white font-mono text-sm">
        AUTHENTICATING OPERATOR CONSOLE...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#01050d] text-primary-text flex flex-col md:flex-row selection:bg-electric-cyan selection:text-background">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col justify-between w-64 border-r border-white/10 bg-[#020b18]/90 backdrop-blur-2xl p-5 select-none">
        <div className="space-y-6">
          {/* Brand */}
          <Link href="/organizer/dashboard" className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-electric-cyan animate-pulse" />
            <span className="font-heading font-black tracking-wider text-lg text-white">
              ARASS <span className="text-electric-cyan font-mono text-xs px-1.5 py-0.5 rounded border border-electric-cyan/30 bg-electric-cyan/10">OPS</span>
            </span>
          </Link>

          {/* Quick Event Create Action */}
          <Link
            href="/organizer/events/new"
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-electric-cyan text-background font-mono font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(0,212,255,0.7)] transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>CREATE EVENT</span>
          </Link>

          {/* Primary Nav Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono tracking-wider transition-all ${
                    isActive
                      ? 'bg-electric-cyan/15 text-electric-cyan border border-electric-cyan/30 font-semibold'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Founder Admin Direct Link */}
            {currentUser?.role === 'SUPER_ADMIN' && (
              <Link
                href="/admin"
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-mono tracking-wider transition-all mt-4 border border-violet-500/30 ${
                  pathname.startsWith('/admin')
                    ? 'bg-violet-500/20 text-violet-300'
                    : 'text-violet-400/80 hover:text-violet-300 hover:bg-violet-500/10'
                }`}
              >
                <Shield className="w-4 h-4 text-violet-400" />
                <span>ARASS Admin</span>
              </Link>
            )}
          </nav>
        </div>

        {/* User Info & Logout Footer */}
        <div className="pt-4 border-t border-white/10 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono">
            <div>
              <div className="font-bold text-white truncate max-w-[120px]">{currentUser?.profile?.name || currentUser?.email}</div>
              <div className="text-[10px] text-electric-cyan uppercase">{currentUser?.role}</div>
            </div>
            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 rounded-lg text-white/50 hover:text-red-400 hover:bg-white/5"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between p-4 border-b border-white/10 bg-[#020b18]/90">
        <Link href="/organizer/dashboard" className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-electric-cyan" />
          <span className="font-heading font-bold text-white text-base">ARASS OPS</span>
        </Link>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 text-white/70 hover:text-white"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileOpen && (
        <div className="md:hidden border-b border-white/10 bg-[#020b18] p-5 space-y-3">
          <Link
            href="/organizer/events/new"
            onClick={() => setMobileOpen(false)}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-electric-cyan text-background font-mono font-bold text-xs"
          >
            <Plus className="w-4 h-4" />
            <span>CREATE EVENT</span>
          </Link>

          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 py-2 text-xs font-mono text-white/80 hover:text-electric-cyan"
            >
              <item.icon className="w-4 h-4 text-electric-cyan" />
              <span>{item.name}</span>
            </Link>
          ))}

          {currentUser?.role === 'SUPER_ADMIN' && (
            <Link
              href="/admin"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 py-2 text-xs font-mono text-violet-400"
            >
              <Shield className="w-4 h-4" />
              <span>ARASS Admin</span>
            </Link>
          )}

          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-xs font-mono text-red-400 pt-2"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <main className="flex-1 p-4 sm:p-8 lg:p-10 max-w-7xl w-full mx-auto space-y-8">
          {children}
        </main>
      </div>
    </div>
  );
}
