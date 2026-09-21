'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Vote, BarChart2, TrendingUp, Layers, CheckCircle2, BookOpen, Shield, Building2, Users, MapPin } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();

  const links = [
    { name: 'Control Board', href: '/', icon: Vote },
    { name: 'Local Races (Pop ≥ 1k)', href: '/local', icon: MapPin },
    { name: 'All Races', href: '/races', icon: Layers },
    { name: 'Candidates', href: '/candidates', icon: Users },
    { name: 'All Offices', href: '/offices', icon: Building2 },
    { name: 'Polls', href: '/polls', icon: BarChart2 },
    { name: 'Chamber Control', href: '/senate', icon: TrendingUp },
    { name: 'Rating Moves', href: '/rating-changes', icon: CheckCircle2 },
    { name: 'Sources & Methods', href: '/sources', icon: BookOpen },
    { name: 'Admin', href: '/admin', icon: Shield },
  ];

  return (
    <header className="bg-[#FFFFFF] border-b border-[#E4E9F0]">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded bg-[#0E63C4] flex items-center justify-center text-white font-bold text-base">
            B
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-[#0B1220] text-lg font-mono tracking-tight">BALLOT.WATCH</span>
              <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#EBF3FD] text-[#0A3F73] font-semibold border border-[#CBD5E1]">
                2026 Midterms
              </span>
            </div>
            <p className="text-xs text-[#5B6779]">Every race, every poll, every filing — with its source and method.</p>
          </div>
        </Link>

        <nav className="flex items-center gap-1 overflow-x-auto py-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                  isActive
                    ? 'bg-[#EBF3FD] text-[#0E63C4] font-semibold border border-[#CBD5E1]'
                    : 'text-[#24303F] hover:bg-[#F6F8FB]'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
