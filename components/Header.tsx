'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Vote, BarChart2, TrendingUp, Layers, CheckCircle2, BookOpen, Shield, Building2, Users, MapPin, Gamepad2 } from 'lucide-react';

export default function Header() {
  const pathname = usePathname();

  const links = [
    { name: 'Control Board', href: '/', icon: Vote, color: '#00F0FF' },
    { name: 'Local Contests', href: '/local', icon: MapPin, color: '#FF5500' },
    { name: 'All 537 Races', href: '/races', icon: Layers, color: '#FFE600' },
    { name: 'Candidates', href: '/candidates', icon: Users, color: '#39FF14' },
    { name: 'All Offices', href: '/offices', icon: Building2, color: '#A855F7' },
    { name: 'Polls', href: '/polls', icon: BarChart2, color: '#00F0FF' },
    { name: 'Chamber Control', href: '/senate', icon: TrendingUp, color: '#FF007F' },
    { name: 'Coverage Matrix', href: '/coverage', icon: Layers, color: '#FFE600' },
    { name: 'Rating Moves', href: '/rating-changes', icon: CheckCircle2, color: '#39FF14' },
    { name: 'Sources & Method', href: '/sources', icon: BookOpen, color: '#00F0FF' },
    { name: 'Admin', href: '/admin', icon: Shield, color: '#A855F7' },
  ];

  return (
    <header className="bg-[#0C0922] border-b-2 border-[#2D2264] shadow-[0_4px_20px_rgba(0,0,0,0.6)]">
      <div className="max-w-7xl mx-auto px-4 py-3.5 flex flex-wrap items-center justify-between gap-4">
        {/* Arcade Cabinet Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 rounded-lg bg-[#161238] border-2 border-[#00F0FF] flex items-center justify-center text-[#FFE600] font-arcade text-lg shadow-[0_0_12px_rgba(0,240,255,0.5)] group-hover:scale-105 transition-transform">
            BW
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-arcade text-[#00F0FF] text-base sm:text-lg arcade-text-glow-cyan tracking-tight">
                BALLOT.WATCH
              </span>
              <span className="font-arcade text-[8px] uppercase px-2 py-0.5 rounded bg-[#FF007F] text-white border border-[#FF66B2] shadow-[0_0_8px_rgba(255,0,127,0.5)]">
                ARCADE &#39;86
              </span>
            </div>
            <p className="text-[11px] font-crt text-[#A5B4FC] tracking-wider mt-0.5">
              Every race, every poll, every filing — with its source and method.
            </p>
          </div>
        </Link>

        {/* Arcade Cabinet Navigation Buttons */}
        <nav className="flex items-center gap-1.5 overflow-x-auto py-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href));
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`arcade-btn flex items-center gap-1.5 px-3 py-1.5 rounded text-[9px] font-arcade whitespace-nowrap transition ${
                  isActive
                    ? 'bg-[#FFE600] text-[#080616] border-2 border-white shadow-[0_0_12px_rgba(255,230,0,0.7)] font-bold'
                    : 'bg-[#181338] text-[#C7D2FE] hover:bg-[#231C4E] hover:text-white border border-[#3A2E70]'
                }`}
              >
                <Icon className="w-3 h-3" style={{ color: isActive ? '#080616' : link.color }} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
