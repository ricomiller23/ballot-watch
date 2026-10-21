'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Race, Candidate, Rating, Poll } from '@/lib/races';
import { 
  Search, Filter, ExternalLink, Vote, CheckCircle2, ChevronRight, 
  BarChart2, ShieldCheck, AlertTriangle, MapPin, Building, Globe, 
  Landmark, Layers, X, ChevronLeft, Swords, Trophy, Zap
} from 'lucide-react';

interface Props {
  initialRaces: Race[];
}

export default function RacesExplorerView({ initialRaces }: Props) {
  const [activeTab, setActiveTab] = useState<'all_races' | 'battlegrounds' | 'polling_guards'>('all_races');
  const [searchQuery, setSearchQuery] = useState('');
  const [tierFilter, setTierFilter] = useState<'all' | '1' | '2' | '3' | '6'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'sourced' | 'pending'>('all');
  const [stateFilter, setStateFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 30;

  const states = useMemo(() => {
    const set = new Set<string>();
    initialRaces.forEach(r => set.add(r.state));
    return Array.from(set).sort();
  }, [initialRaces]);

  const filteredRaces = useMemo(() => {
    return initialRaces.filter(race => {
      if (activeTab === 'battlegrounds') {
        const isBattleground = race.is_featured || race.ratings.some(rt => rt.verbatim_label.toLowerCase().includes('toss'));
        if (!isBattleground) return false;
      }

      if (tierFilter !== 'all' && race.tier.toString() !== tierFilter) {
        return false;
      }

      const hasSourcedNominee = race.candidates.some(c => c.status === 'nominee' && Boolean(c.source_url));
      if (statusFilter === 'sourced' && !hasSourcedNominee) return false;
      if (statusFilter === 'pending' && hasSourcedNominee) return false;

      if (stateFilter !== 'all' && race.state !== stateFilter) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchOffice = race.office.toLowerCase().includes(q);
        const matchState = race.state_name.toLowerCase().includes(q) || race.state.toLowerCase().includes(q);
        const matchCandidate = race.candidates.some(c => c.name.toLowerCase().includes(q));
        const matchId = race.id.toLowerCase().includes(q);
        if (!matchOffice && !matchState && !matchCandidate && !matchId) return false;
      }

      return true;
    });
  }, [initialRaces, activeTab, tierFilter, statusFilter, stateFilter, searchQuery]);

  const totalPages = Math.ceil(filteredRaces.length / pageSize);
  const pagedRaces = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return filteredRaces.slice(start, start + pageSize);
  }, [filteredRaces, currentPage, pageSize]);

  const formatCandidateStatus = (s: string) => {
    if (s === 'incumbent-defeated-in-primary-runoff') return 'Defeated in Primary Runoff';
    if (s === 'nominee') return 'Nominee';
    if (s === 'incumbent-not-running') return 'Incumbent (Retiring)';
    if (s === 'primary-pending') return 'Primary Pending';
    if (s === 'runoff') return 'Primary Runoff';
    return s;
  };

  const getTierLabel = (tier: number) => {
    if (tier === 1) return 'SENATE (FEDERAL)';
    if (tier === 2) return 'GOVERNOR (STATE)';
    if (tier === 3) return 'HOUSE (FEDERAL)';
    if (tier === 6) return 'MAYORAL (MUNICIPAL)';
    return `TIER ${tier}`;
  };

  return (
    <div className="space-y-6 font-mono">
      {/* ── ARCADE TERMINAL HEADER & VIEW SWITCHER ───────────────────────── */}
      <div className="bg-[#100C2A] border-3 border-[#00F0FF] p-5 rounded-2xl shadow-[0_0_20px_rgba(0,240,255,0.3)] flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#FFE600]" />
            <h1 className="font-arcade text-base sm:text-lg text-[#FFE600] arcade-text-glow-yellow tracking-tight">
              2026 RACES &amp; MATHEMATICAL MODEL HUB
            </h1>
          </div>
          <p className="text-xs font-crt text-[16px] text-[#C7D2FE] mt-1">
            Tracking U.S. Senate (35), Governors (36), U.S. House (435), and Monitored Mayoral Contests (31).
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 bg-[#090618] border border-[#2D2264] p-1.5 rounded-xl">
          <button
            onClick={() => { setActiveTab('all_races'); setCurrentPage(1); }}
            className={`arcade-btn px-3 py-1.5 rounded text-[9px] font-arcade transition-all ${
              activeTab === 'all_races'
                ? 'bg-[#00F0FF] text-[#080616] border-2 border-white shadow-[0_0_10px_rgba(0,240,255,0.6)] font-bold'
                : 'bg-[#151032] text-[#A5B4FC] hover:text-white border border-[#2D2264]'
            }`}
          >
            ALL 537 CONTESTS
          </button>
          <button
            onClick={() => { setActiveTab('battlegrounds'); setCurrentPage(1); }}
            className={`arcade-btn px-3 py-1.5 rounded text-[9px] font-arcade transition-all ${
              activeTab === 'battlegrounds'
                ? 'bg-[#FF007F] text-white border-2 border-white shadow-[0_0_10px_rgba(255,0,127,0.6)] font-bold'
                : 'bg-[#151032] text-[#A5B4FC] hover:text-white border border-[#2D2264]'
            }`}
          >
            BATTLEGROUNDS
          </button>
          <button
            onClick={() => { setActiveTab('polling_guards'); }}
            className={`arcade-btn px-3 py-1.5 rounded text-[9px] font-arcade transition-all ${
              activeTab === 'polling_guards'
                ? 'bg-[#39FF14] text-[#080616] border-2 border-white shadow-[0_0_10px_rgba(57,255,20,0.6)] font-bold'
                : 'bg-[#151032] text-[#A5B4FC] hover:text-white border border-[#2D2264]'
            }`}
          >
            POLLING GUARDS (&lt;2 POLLS)
          </button>
        </div>
      </div>

      {activeTab === 'polling_guards' ? (
        <div className="space-y-4">
          <div className="bg-[#0C241B] border-2 border-[#39FF14] p-4 rounded-xl text-xs text-[#86EFAC] shadow-[0_0_15px_rgba(57,255,20,0.3)]">
            <strong className="font-arcade text-[10px] text-[#39FF14] flex items-center gap-2 mb-1">
              <ShieldCheck className="w-4 h-4 text-[#39FF14]" /> POLLING MATH INVARIANT RULE
            </strong>
            <p className="font-crt text-[16px] text-white leading-relaxed">
              Any race with ≥2 qualifying surveys renders a published inverse-variance mathematical average. Races with fewer than 2 surveys strictly suppress averaging to prevent synthetic bias.
            </p>
          </div>

          <div className="space-y-4">
            {initialRaces.filter(r => r.tier <= 2 || r.is_featured).map((race) => {
              const hasAvg = Boolean(race.polling_average);

              return (
                <div key={race.id} id={race.id} className="bg-[#130E2E] border-2 border-[#2D2264] rounded-xl p-5 shadow-md text-xs space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2D2264] pb-2.5">
                    <div>
                      <span className="font-arcade text-[8px] bg-[#00F0FF] text-[#080616] px-2 py-0.5 rounded font-bold">
                        {race.id} · {race.office.toUpperCase()}
                      </span>
                      <strong className="font-arcade text-sm text-white block mt-1.5">
                        {race.state_name} {race.district ? `District ${race.district}` : ''}
                      </strong>
                    </div>
                    <span className="font-arcade text-[8px] text-[#FFE600]">Tier {race.tier} Contest</span>
                  </div>

                  {hasAvg && race.polling_average?.averages ? (
                    <div className="p-3.5 rounded-lg bg-[#0E281E] border border-[#39FF14] space-y-1.5">
                      <div className="flex justify-between items-center font-arcade text-[9px] text-[#39FF14]">
                        <span>QUALIFYING AVERAGE PUBLISHED ({race.polling_average.qualifying_polls_count} surveys)</span>
                        <span>Leader: {race.polling_average.leader} (+{race.polling_average.spread}%)</span>
                      </div>
                      <div className="text-xs font-arcade text-white flex flex-wrap gap-4 pt-1">
                        {Object.entries(race.polling_average.averages).map(([cand, pct]) => (
                          <span key={cand} className="text-[#FFE600]">{cand}: {pct}%</span>
                        ))}
                      </div>
                      <p className="font-crt text-[14px] text-[#A5B4FC] pt-1 border-t border-[#39FF14]/30">
                        Method: {race.polling_average.method}
                      </p>
                    </div>
                  ) : (
                    <div className="p-3.5 rounded-lg bg-[#2E1610] border border-[#FF5500] space-y-1">
                      <div className="flex items-center gap-1.5 font-arcade text-[9px] text-[#FFE600]">
                        <AlertTriangle className="w-4 h-4 text-[#FF5500]" />
                        <span>INSUFFICIENT POLLS FOR AN AVERAGE ({race.polls.length} qualifying surveys)</span>
                      </div>
                      <p className="font-crt text-[15px] text-[#FCA5A5]">
                        No averaging method is applied below two qualifying independent surveys. Displaying raw poll points only to prevent synthetic bias.
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {/* ── ARCADE SEARCH AND FILTER CONSOLE ───────────────────────── */}
          <div className="bg-[#120D2F] border-2 border-[#2D2264] p-4 rounded-xl shadow-md space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-[#00F0FF] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="SEARCH CONTEST, CANDIDATE, STATE OR ID..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border-2 border-[#2D2264] focus:border-[#00F0FF] bg-[#09061A] text-xs font-arcade text-white focus:outline-hidden shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#FF007F] hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Tier Filter */}
              <div className="flex items-center gap-1.5">
                <span className="font-arcade text-[8px] text-[#FFE600]">LEVEL:</span>
                <select
                  value={tierFilter}
                  onChange={(e) => { setTierFilter(e.target.value as any); setCurrentPage(1); }}
                  className="px-2.5 py-1.5 rounded-lg border border-[#2D2264] bg-[#09061A] font-arcade text-[8px] text-[#00F0FF] focus:border-[#00F0FF]"
                >
                  <option value="all">ALL LEVELS (537)</option>
                  <option value="1">SENATE (35)</option>
                  <option value="2">GOVERNOR (36)</option>
                  <option value="3">HOUSE (435)</option>
                  <option value="6">MAYORAL (31)</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5">
                <span className="font-arcade text-[8px] text-[#FFE600]">STATUS:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value as any); setCurrentPage(1); }}
                  className="px-2.5 py-1.5 rounded-lg border border-[#2D2264] bg-[#09061A] font-arcade text-[8px] text-[#00F0FF] focus:border-[#00F0FF]"
                >
                  <option value="all">ALL CONTESTS</option>
                  <option value="sourced">SOURCED NOMINEES (82)</option>
                  <option value="pending">PRIMARY PENDING (455)</option>
                </select>
              </div>

              {/* State Filter */}
              <div className="flex items-center gap-1.5">
                <span className="font-arcade text-[8px] text-[#FFE600]">STATE:</span>
                <select
                  value={stateFilter}
                  onChange={(e) => { setStateFilter(e.target.value); setCurrentPage(1); }}
                  className="px-2.5 py-1.5 rounded-lg border border-[#2D2264] bg-[#09061A] font-arcade text-[8px] text-[#00F0FF] focus:border-[#00F0FF]"
                >
                  <option value="all">ALL STATES</option>
                  {states.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Counter */}
            <div className="flex items-center justify-between text-[10px] font-arcade text-[#A5B4FC] pt-2 border-t border-[#2D2264]">
              <div>
                SHOWING <strong className="text-[#FFE600]">{filteredRaces.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}</strong> –{' '}
                <strong className="text-[#FFE600]">{Math.min(currentPage * pageSize, filteredRaces.length)}</strong> OF{' '}
                <strong className="text-[#00F0FF]">{filteredRaces.length}</strong> MATCHING CONTESTS
              </div>
              {(searchQuery || tierFilter !== 'all' || statusFilter !== 'all' || stateFilter !== 'all') && (
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setTierFilter('all');
                    setStatusFilter('all');
                    setStateFilter('all');
                    setCurrentPage(1);
                  }}
                  className="text-[#FF007F] hover:underline font-arcade text-[8px]"
                >
                  [ RESET FILTERS ]
                </button>
              )}
            </div>
          </div>

          {/* ── RACES LIST ─────────────────────────────────────────────── */}
          <div className="space-y-4">
            {pagedRaces.map((race) => (
              <div 
                key={race.id} 
                id={race.id}
                className="bg-[#120D2F] border-2 border-[#2D2264] hover:border-[#00F0FF] rounded-xl p-5 shadow-md space-y-4 transition-all"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2D2264] pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-arcade text-[8px] bg-[#00F0FF] text-[#080616] px-2 py-0.5 rounded font-bold">
                        {getTierLabel(race.tier)}
                      </span>
                      <span className="font-arcade text-[8px] text-[#FFE600]">
                        ID: #{race.id}
                      </span>
                    </div>
                    <h2 className="font-arcade text-sm sm:text-base text-white mt-1.5">
                      {race.office} ({race.state_name})
                    </h2>
                  </div>

                  {race.ratings.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <span className="font-arcade text-[8px] text-[#A5B4FC]">RATING:</span>
                      <span className="font-arcade text-[9px] px-2.5 py-1 rounded bg-[#2A1435] text-[#FFE600] border border-[#FFE600] shadow-[0_0_8px_rgba(255,230,0,0.3)]">
                        {race.ratings[0].verbatim_label}
                      </span>
                    </div>
                  )}
                </div>

                {/* Candidate Roster */}
                <div className="space-y-2">
                  <span className="font-arcade text-[8px] text-[#00F0FF] uppercase tracking-wider block">
                    CANDIDATE ROSTER &amp; SOURCE RECEIPTS:
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {race.candidates.map((c, i) => (
                      <div key={i} className="p-3 rounded-lg bg-[#0B081F] border border-[#2D2264] flex items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-white text-xs">{c.name}</span>
                            <span className={`font-arcade text-[8px] px-1.5 py-0.5 rounded border ${
                              c.party === 'REP' ? 'bg-[#FF007F] text-white border-white' :
                              c.party === 'DEM' ? 'bg-[#00F0FF] text-[#080616] border-white' :
                              'bg-[#39FF14] text-[#080616] border-white'
                            }`}>
                              {c.party}
                            </span>
                          </div>
                          <span className="font-crt text-[14px] text-[#A5B4FC] block mt-0.5">
                            {formatCandidateStatus(c.status)} {c.is_incumbent ? '· Incumbent' : ''}
                          </span>
                        </div>

                        {c.source_url ? (
                          <a
                            href={c.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="arcade-btn font-arcade text-[8px] text-[#080616] bg-[#00F0FF] hover:bg-white px-2 py-1 rounded border border-white flex items-center gap-1 flex-shrink-0"
                          >
                            <span>RECEIPT</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ) : (
                          <span className="font-arcade text-[8px] text-[#64748B] italic">PENDING FILING</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Forecaster Spread (Unblended) */}
                {race.ratings.length > 0 && (
                  <div className="pt-2 border-t border-[#2D2264] space-y-1.5 text-xs">
                    <span className="font-arcade text-[8px] text-[#FFE600] uppercase block">
                      FORECASTER RATINGS SPREAD (UNBLENDED):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {race.ratings.map((rt, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-[#0B081F] border border-[#2D2264] text-[11px] space-y-0.5">
                          <strong className="font-arcade text-[8px] text-[#A5B4FC] block uppercase">{rt.rater}</strong>
                          <span className="font-arcade text-[9px] text-[#39FF14] block">{rt.verbatim_label}</span>
                          <span className="font-crt text-[14px] text-[#94A3B8] block">As of: {rt.rater_date}</span>
                          {rt.source_url && (
                            <a
                              href={rt.source_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="font-arcade text-[7px] text-[#00F0FF] hover:underline flex items-center gap-0.5 mt-1 inline-flex"
                            >
                              <span>FORECASTER LINK</span>
                              <ExternalLink className="w-2 h-2" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Polling Average / Latest Poll */}
                {race.polling_average && (
                  <div className="p-3.5 rounded-lg bg-[#0B1E19] border border-[#39FF14] text-xs space-y-1">
                    <div className="flex justify-between items-center font-arcade text-[9px] text-[#39FF14]">
                      <span>POLLING AVERAGE: {race.polling_average.leader} (+{race.polling_average.spread}%)</span>
                      <span className="text-[9px] text-[#A5B4FC] font-normal">{race.polling_average.qualifying_polls_count} qualifying surveys</span>
                    </div>
                    {race.polling_average.averages && (
                      <div className="flex flex-wrap gap-4 font-arcade text-white text-[10px] pt-1">
                        {Object.entries(race.polling_average.averages).map(([cand, pct]) => (
                          <span key={cand} className="text-[#FFE600]">{cand}: {pct}%</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── PAGINATION CONTROLS ────────────────────────────────────── */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-3 pt-6 pb-8">
              <button
                onClick={() => {
                  setCurrentPage(p => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                className="arcade-btn px-4 py-2 rounded-lg border-2 border-white bg-[#FF007F] disabled:opacity-30 font-arcade text-[9px] text-white hover:bg-[#D9006C] flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>PREVIOUS</span>
              </button>
              <span className="font-arcade text-[10px] text-[#FFE600] px-4">
                PAGE {currentPage} OF {totalPages}
              </span>
              <button
                onClick={() => {
                  setCurrentPage(p => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage >= totalPages}
                className="arcade-btn px-4 py-2 rounded-lg border-2 border-white bg-[#00F0FF] disabled:opacity-30 font-arcade text-[9px] text-[#080616] hover:bg-[#00D4E0] flex items-center gap-1.5 cursor-pointer"
              >
                <span>NEXT</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
