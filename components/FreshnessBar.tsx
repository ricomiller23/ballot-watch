'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RotateCw, CheckCircle2, Clock, Calendar } from 'lucide-react';

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
    <div className="sticky top-0 z-50 bg-[#FFFFFF] border-b border-[#E4E9F0] px-4 py-2 text-xs font-mono shadow-xs" aria-live="polite">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1.5 font-bold text-[#B42318] bg-[#FEF2F2] border border-[#FBD5D5] px-2 py-0.5 rounded">
            <Calendar className="w-3.5 h-3.5" />
            {daysToElection} DAYS TO ELECTION DAY (03 NOV 2026)
          </span>
          <span className="text-[#5B6779]">|</span>
          <span className="text-[#24303F]">
            DATA CHECKED <strong>{timeEt} ET</strong> · NEXT PULL in <strong className="text-[#0E63C4]">{Math.floor(nextCountdown / 60)}m</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={refreshNow}
            disabled={isRefreshing}
            className="flex items-center gap-1 px-2.5 py-1 rounded bg-[#F6F8FB] border border-[#E4E9F0] hover:bg-[#EBF3FD] text-[#0B1220] transition"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#0E63C4]' : 'text-[#5B6779]'}`} />
            <span>{isRefreshing ? 'Polling…' : 'Check now'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
