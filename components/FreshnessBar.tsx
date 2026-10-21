'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RotateCw, Calendar, Sparkles, Gamepad2 } from 'lucide-react';

export default function FreshnessBar() {
  const [lastChecked, setLastChecked] = useState<Date>(new Date());
  const [secondsAgo, setSecondsAgo] = useState<number>(30);
  const [nextCountdown, setNextCountdown] = useState<number>(900);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const cooldownRef = useRef<number>(0);

  // Calculate days to 3 Nov 2026
  const electionDate = new Date('2026-11-03T07:00:00-05:00').getTime();
  const now = new Date().getTime();
  const daysToElection = Math.max(0, Math.ceil((electionDate - now) / (1000 * 60 * 60 * 24)));

  const refreshNow = useCallback(async () => {
    if (Date.now() - cooldownRef.current < 30000) return;
    cooldownRef.current = Date.now();
    setIsRefreshing(true);
    try {
      await fetch('/api/health');
      setLastChecked(new Date());
      setSecondsAgo(0);
      setNextCountdown(900);
    } catch {} finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSecondsAgo((p) => p + 1);
      setNextCountdown((p) => (p > 0 ? p - 1 : 900));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const timeEt = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(lastChecked);

  return (
    <div className="sticky top-0 z-50 bg-[#0E0B24] border-b-2 border-[#FFE600] px-4 py-2 text-xs font-mono shadow-[0_4px_15px_rgba(255,230,0,0.25)]" aria-live="polite">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Arcade Marquee */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#1C1642] border border-[#00F0FF] shadow-[0_0_8px_rgba(0,240,255,0.4)]">
            <span className="w-2 h-2 rounded-full bg-[#00F0FF] arcade-blink"></span>
            <span className="font-arcade text-[9px] text-[#00F0FF] tracking-wider uppercase">
              1P READY
            </span>
          </div>

          <div className="flex items-center gap-2 bg-[#2D0A1E] border border-[#FF007F] px-3 py-1 rounded shadow-[0_0_10px_rgba(255,0,127,0.4)]">
            <Calendar className="w-3.5 h-3.5 text-[#FFE600] arcade-blink" />
            <span className="font-arcade text-[10px] text-[#FFE600] arcade-text-glow-yellow tracking-wider">
              {daysToElection} DAYS TO ELECTION DAY (03 NOV 2026)
            </span>
          </div>

          <span className="text-[#3A2E70] hidden sm:inline">|</span>

          <span className="text-[#A5B4FC] text-xs font-crt text-[15px] tracking-wide">
            DATA CHECKED <strong className="text-[#00F0FF] font-bold">{timeEt} ET</strong> · NEXT PULL in <strong className="text-[#39FF14]">{Math.floor(nextCountdown / 60)}m</strong>
          </span>
        </div>

        {/* Right: Arcade Coin / Refresh Button */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1 text-[10px] font-arcade text-[#FFE600] bg-[#161238] px-2 py-1 rounded border border-[#2D2264]">
            <span>🪙</span>
            <span>CREDIT: 02</span>
          </div>

          <button
            type="button"
            onClick={refreshNow}
            disabled={isRefreshing}
            className="arcade-btn flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#FF007F] hover:bg-[#D9006C] text-white font-arcade text-[9px] border-2 border-black tracking-wider transition cursor-pointer"
          >
            <RotateCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin text-[#FFE600]' : 'text-white'}`} />
            <span>{isRefreshing ? 'PULLING...' : 'SYNC NOW'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
