'use client';

import React, { useState } from 'react';
import CandidatesExplorer from '@/components/CandidatesExplorer';
import { SEED_RACES, SEED_POLLS } from '@/lib/fallback-data';
import { calculatePollingAverage } from '@/lib/average';
import { Layers, AlertTriangle, BarChart2, ShieldCheck, Filter } from 'lucide-react';

export default function RacesPage() {
  const [activeTab, setActiveTab] = useState<'all_races' | 'polling_invariants'>('all_races');

  return (
    <div className="space-y-6">
      {/* Tab Switcher Header */}
      <div className="bg-[#FFFFFF] border border-[#E4E9F0] p-4 rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#0E63C4]" />
            <h1 className="font-extrabold text-lg text-[#0B1220] tracking-tight">
              2026 Comprehensive Races & Mathematical Model Hub
            </h1>
          </div>
          <p className="text-xs text-[#5B6779] mt-0.5">
            Every electable contest in the United States — from U.S. Senate and Governors down to County Treasurers, School Boards, and Town Dog Catchers (Pop. ≥ 1,000).
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-[#F6F8FB] border border-[#CBD5E1] p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('all_races')}
            className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
              activeTab === 'all_races'
                ? 'bg-[#0E63C4] text-white shadow-xs'
                : 'text-[#5B6779] hover:text-[#0B1220]'
            }`}
          >
            All Races & Candidates Explorer
          </button>
          <button
            onClick={() => setActiveTab('polling_invariants')}
            className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
              activeTab === 'polling_invariants'
                ? 'bg-[#0E63C4] text-white shadow-xs'
                : 'text-[#5B6779] hover:text-[#0B1220]'
            }`}
          >
            Polling Average Threshold Guards (&lt;3 Polls)
          </button>
        </div>
      </div>

      {activeTab === 'all_races' ? (
        <CandidatesExplorer />
      ) : (
        <div className="space-y-4 font-mono">
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] p-4 rounded-xl text-xs text-[#166534]">
            <strong className="block text-sm font-bold flex items-center gap-2 text-[#15803D]">
              <ShieldCheck className="w-4 h-4" /> Polling Math Invariant Rule
            </strong>
            <p className="mt-1">
              Any race with ≥3 qualifying surveys renders a certified, published exponential decay mathematical average. Races with fewer than 3 surveys strictly suppress averaging to prevent synthetic bias.
            </p>
          </div>

          <div className="space-y-4">
            {SEED_RACES.map((race) => {
              const avg = calculatePollingAverage(race.id, SEED_POLLS);
              const hasAvg = avg.status === 'published';

              return (
                <div key={race.id} className="bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl p-5 shadow-xs text-xs space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E4E9F0] pb-2">
                    <div>
                      <span className="font-bold text-xs bg-[#EBF3FD] text-[#0A3F73] px-2 py-0.5 rounded border border-[#CBD5E1]">
                        {race.id} · {race.office.toUpperCase()}
                      </span>
                      <strong className="text-sm text-[#0B1220] block mt-1">
                        {race.state} {race.district ? `District ${race.district}` : ''}
                      </strong>
                    </div>
                    <span className="text-xs text-[#5B6779]">Historical 2024 Baseline: +{race.margin_2024}%</span>
                  </div>

                  {/* Polling Average Status */}
                  {hasAvg && avg.averages ? (
                    <div className="p-3 rounded-lg bg-[#F0FDF4] border border-[#BBF0CC] space-y-1">
                      <div className="flex justify-between items-center font-bold text-[#067647]">
                        <span>QUALIFYING AVERAGE PUBLISHED ({avg.methodBlock.qualifyingPollCount} surveys)</span>
                        <span>Status: Validated</span>
                      </div>
                      <div className="text-xs font-bold text-[#0B1220] flex gap-4 pt-1">
                        {Object.entries(avg.averages).map(([cand, pct]) => (
                          <span key={cand}>{cand}: {pct}%</span>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg bg-[#FFFBEB] border border-[#FCE8A5] space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-[#8A6100]">
                        <AlertTriangle className="w-4 h-4" />
                        <span>INSUFFICIENT POLLS FOR AN AVERAGE ({avg.methodBlock.qualifyingPollCount} qualifying surveys)</span>
                      </div>
                      <p className="text-[#5B6779] text-[11px]">
                        No averaging method is applied below three qualifying independent surveys. Displaying raw poll points only to prevent synthetic bias.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
