'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Sparkles, Trophy, Code2, Users, Search, Menu, X, ArrowRight, UserCircle, LogOut, LayoutDashboard, Calendar, Award } from 'lucide-react';

export function EventsNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [currentUser, setCurrentUser] = useState<{ id: string; email: string; role: string; name?: string } | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    fetch('/api/events/auth/me')
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setCurrentUser({
            ...data.user,
            name: data.profile?.name || data.user.email.split('@')[0],
          });
        } else {
          setCurrentUser(null);
        }
      })
      .catch(() => setCurrentUser(null));
  }, [pathname]);

  const handleLogout = async () => {
    await fetch('/api/events/auth/logout', { method: 'POST' });
    setCurrentUser(null);
    router.push('/events');
    router.refresh();
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/events?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  const navLinks = [
    { name: 'All Events', href: '/events', icon: Calendar },
    { name: 'Hackathons', href: '/events?eventType=HACKATHON', icon: Code2 },
    { name: 'Competitions', href: '/events?eventType=IDEATHON', icon: Trophy },
    { name: 'Tech Reviews', href: '/tech-review', icon: Award },
    { name: 'My Events', href: '/my-events', icon: Users, authOnly: true },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#01050d]/85 backdrop-blur-xl border-b border-white/10 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand */}
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center gap-2.5 group">
            <span className="w-2.5 h-2.5 rounded-full bg-electric-cyan animate-pulse group-hover:shadow-[0_0_12px_#00d4ff]" />
            <span className="font-heading font-black tracking-wider text-lg sm:text-xl text-white group-hover:text-electric-cyan transition-colors">
              ARASS <span className="hidden sm:inline-block text-electric-cyan font-mono text-xs font-semibold px-2 py-0.5 rounded border border-electric-cyan/30 bg-electric-cyan/10">EVENTS</span>
            </span>
          </Link>

          {/* Desktop Primary Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              if (link.authOnly && !currentUser) return null;
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono tracking-wider transition-all duration-200 ${
                    isActive
                      ? 'bg-electric-cyan/15 text-electric-cyan border border-electric-cyan/30'
                      : 'text-white/70 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Search Trigger */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search Events"
            className="p-2 rounded-full border border-white/10 hover:border-electric-cyan/50 text-white/70 hover:text-electric-cyan bg-[#020b18]/60 transition-colors"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Auth State */}
          {currentUser ? (
            <div className="flex items-center gap-2">
              <Link
                href="/dashboard"
                className="hidden sm:flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-white/15 hover:border-electric-cyan/60 bg-[#020b18]/80 text-white text-xs font-mono tracking-wide transition-all"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-electric-cyan" />
                <span>{currentUser.name}</span>
              </Link>
              <button
                onClick={handleLogout}
                title="Logout"
                className="p-2 rounded-full border border-white/10 hover:border-red-500/50 text-white/60 hover:text-red-400 bg-[#020b18]/60 transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="hidden sm:inline-block px-4 py-1.5 rounded-full border border-white/20 hover:border-electric-cyan/70 text-white/80 hover:text-white text-xs font-mono tracking-wide transition-colors"
              >
                LOGIN
              </Link>
              <Link
                href="/organizer/dashboard"
                className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs tracking-wider hover:shadow-[0_0_20px_rgba(0,212,255,0.7)] transition-all hover:scale-105"
              >
                <span>ORGANIZE</span>
                <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
          )}

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-white/70 hover:text-white focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Expandable Search Overlay */}
      {searchOpen && (
        <div className="border-t border-white/10 bg-[#01050d]/95 px-4 sm:px-6 lg:px-8 py-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex items-center gap-2">
            <Search className="w-4 h-4 text-electric-cyan" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search hackathons, ideathons, coding contests, skills (e.g. AI, Next.js, PyTorch)..."
              className="flex-1 bg-transparent border-none text-white text-sm focus:outline-none placeholder:text-white/40 font-mono"
              autoFocus
            />
            <button
              type="submit"
              className="px-4 py-1 rounded-full bg-electric-cyan text-background font-mono font-bold text-xs"
            >
              SEARCH
            </button>
            <button
              type="button"
              onClick={() => setSearchOpen(false)}
              className="p-1 text-white/40 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-white/10 bg-[#01050d]/95 px-6 py-5 space-y-4 animate-in fade-in duration-200">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => {
              if (link.authOnly && !currentUser) return null;
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 py-2 text-sm font-mono text-white/80 hover:text-electric-cyan"
                >
                  <Icon className="w-4 h-4 text-electric-cyan" />
                  <span>{link.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
            {currentUser ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-xs font-mono text-white/80 hover:text-electric-cyan"
                >
                  <LayoutDashboard className="w-4 h-4 text-electric-cyan" />
                  <span>Participant Dashboard ({currentUser.name})</span>
                </Link>
                <Link
                  href="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 text-xs font-mono text-white/80 hover:text-electric-cyan"
                >
                  <UserCircle className="w-4 h-4 text-electric-cyan" />
                  <span>My Profile & Resume</span>
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-2 text-xs font-mono text-red-400 hover:text-red-300 text-left pt-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center rounded-full border border-white/20 text-white font-mono text-xs"
                >
                  LOGIN
                </Link>
                <Link
                  href="/organizer/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-2.5 text-center rounded-full bg-electric-cyan text-background font-mono font-bold text-xs"
                >
                  ORGANIZE AN EVENT
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
