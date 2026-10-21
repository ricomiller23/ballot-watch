'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { Race, Candidate, Rating, Poll } from '@/lib/races';
import { 
  Search, Filter, ExternalLink, Vote, CheckCircle2, ChevronRight, 
  BarChart2, ShieldCheck, AlertTriangle, MapPin, Building, Globe, 
  Landmark, Layers, X, ChevronLeft 
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
    if (tier === 1) return 'Senate (Federal)';
    if (tier === 2) return 'Governor (State)';
    if (tier === 3) return 'House (Federal)';
    if (tier === 6) return 'Mayoral (Municipal)';
    return `Tier ${tier}`;
  };

  return (
    <div className="space-y-6">
      {/* Tab Navigation */}
      <div className="bg-white border border-[#E4E9F0] p-4 rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[#0E63C4]" />
            <h1 className="font-extrabold text-lg text-[#0B1220] tracking-tight">
              2026 Comprehensive Races & Mathematical Model Hub
            </h1>
          </div>
          <p className="text-xs text-[#5B6779] mt-0.5">
            Tracking U.S. Senate (35), Governors (36), U.S. House (435), and Monitored Mayoral Contests (31).
          </p>
        </div>

        <div className="flex items-center gap-1.5 bg-[#F6F8FB] border border-[#CBD5E1] p-1 rounded-lg">
          <button
            onClick={() => { setActiveTab('all_races'); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
              activeTab === 'all_races'
                ? 'bg-[#0E63C4] text-white shadow-xs'
                : 'text-[#5B6779] hover:text-[#0B1220]'
            }`}
          >
            All 537 Contests
          </button>
          <button
            onClick={() => { setActiveTab('battlegrounds'); setCurrentPage(1); }}
            className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
              activeTab === 'battlegrounds'
                ? 'bg-[#0E63C4] text-white shadow-xs'
                : 'text-[#5B6779] hover:text-[#0B1220]'
            }`}
          >
            Battlegrounds & Toss-Ups
          </button>
          <button
            onClick={() => { setActiveTab('polling_guards'); }}
            className={`px-3 py-1.5 rounded text-xs font-bold transition-all ${
              activeTab === 'polling_guards'
                ? 'bg-[#0E63C4] text-white shadow-xs'
                : 'text-[#5B6779] hover:text-[#0B1220]'
            }`}
          >
            Polling Average Threshold Guards (&lt;2 Polls)
          </button>
        </div>
      </div>

      {activeTab === 'polling_guards' ? (
        <div className="space-y-4">
          <div className="bg-[#F0FDF4] border border-[#BBF7D0] p-4 rounded-xl text-xs text-[#166534]">
            <strong className="block text-sm font-bold flex items-center gap-2 text-[#15803D]">
              <ShieldCheck className="w-4 h-4" /> Polling Math Invariant Rule
            </strong>
            <p className="mt-1">
              Any race with ≥2 qualifying surveys renders a published inverse-variance mathematical average. Races with fewer than 2 surveys strictly suppress averaging to prevent synthetic bias.
            </p>
          </div>

          <div className="space-y-4">
            {initialRaces.filter(r => r.tier <= 2 || r.is_featured).map((race) => {
              const hasAvg = Boolean(race.polling_average);

              return (
                <div key={race.id} id={race.id} className="bg-white border border-[#E4E9F0] rounded-xl p-5 shadow-xs text-xs space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E4E9F0] pb-2">
                    <div>
                      <span className="font-bold text-xs bg-[#EBF3FD] text-[#0A3F73] px-2 py-0.5 rounded border border-[#CBD5E1]">
                        {race.id} · {race.office.toUpperCase()}
                      </span>
                      <strong className="text-sm text-[#0B1220] block mt-1">
                        {race.state_name} {race.district ? `District ${race.district}` : ''}
                      </strong>
                    </div>
                    <span className="text-xs text-[#5B6779]">Tier {race.tier} Contest</span>
                  </div>

                  {hasAvg && race.polling_average?.averages ? (
                    <div className="p-3 rounded-lg bg-[#F0FDF4] border border-[#BBF0CC] space-y-1">
                      <div className="flex justify-between items-center font-bold text-[#067647]">
                        <span>QUALIFYING AVERAGE PUBLISHED ({race.polling_average.qualifying_polls_count} surveys)</span>
                        <span>Leader: {race.polling_average.leader} (+{race.polling_average.spread}%)</span>
                      </div>
                      <div className="text-xs font-bold text-[#0B1220] flex gap-4 pt-1">
                        {Object.entries(race.polling_average.averages).map(([cand, pct]) => (
                          <span key={cand}>{cand}: {pct}%</span>
                        ))}
                      </div>
                      <p className="text-[10px] text-[#5B6779] pt-1 border-t border-[#BBF0CC]/50">
                        Method: {race.polling_average.method}
                      </p>
                    </div>
                  ) : (
                    <div className="p-3 rounded-lg bg-[#FFFBEB] border border-[#FCE8A5] space-y-1">
                      <div className="flex items-center gap-1.5 font-bold text-[#8A6100]">
                        <AlertTriangle className="w-4 h-4" />
                        <span>INSUFFICIENT POLLS FOR AN AVERAGE ({race.polls.length} qualifying surveys)</span>
                      </div>
                      <p className="text-[#5B6779] text-[11px]">
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
          {/* Search and Filters Bar */}
          <div className="bg-white border border-[#E4E9F0] p-4 rounded-xl shadow-xs space-y-3">
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 text-[#8494A8] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search by state, office, candidate, or race ID..."
                  value={searchQuery}
                  onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                  className="w-full pl-9 pr-4 py-2 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] text-xs font-mono text-[#0B1220] focus:outline-hidden focus:ring-2 focus:ring-[#0E63C4]"
                />
                {searchQuery && (
                  <button
                    onClick={() => { setSearchQuery(''); setCurrentPage(1); }}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8494A8] hover:text-[#0B1220]"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Tier Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-[#64748B] text-xs">Office:</span>
                <select
                  value={tierFilter}
                  onChange={(e) => { setTierFilter(e.target.value as any); setCurrentPage(1); }}
                  className="px-2.5 py-1.5 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] text-xs font-bold text-[#0B1220]"
                >
                  <option value="all">All Levels (537)</option>
                  <option value="1">Senate (35)</option>
                  <option value="2">Governor (36)</option>
                  <option value="3">House (435)</option>
                  <option value="6">Mayoral (31)</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-[#64748B] text-xs">Nominee:</span>
                <select
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value as any); setCurrentPage(1); }}
                  className="px-2.5 py-1.5 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] text-xs font-bold text-[#0B1220]"
                >
                  <option value="all">All Contests</option>
                  <option value="sourced">Sourced Nominees (82)</option>
                  <option value="pending">Primary Pending (455)</option>
                </select>
              </div>

              {/* State Filter */}
              <div className="flex items-center gap-1.5">
                <span className="text-[#64748B] text-xs">State:</span>
                <select
                  value={stateFilter}
                  onChange={(e) => { setStateFilter(e.target.value); setCurrentPage(1); }}
                  className="px-2.5 py-1.5 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] text-xs font-bold text-[#0B1220]"
                >
                  <option value="all">All States</option>
                  {states.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count & Active Filters Summary */}
            <div className="flex items-center justify-between text-[11px] text-[#5B6779] pt-2 border-t border-[#F1F5F9]">
              <div>
                Showing <strong>{filteredRaces.length === 0 ? 0 : (currentPage - 1) * pageSize + 1}</strong> –{' '}
                <strong>{Math.min(currentPage * pageSize, filteredRaces.length)}</strong> of{' '}
                <strong className="text-[#0B1220]">{filteredRaces.length}</strong> matching contests
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
                  className="text-[#DC2626] hover:underline font-bold"
                >
                  Reset Filters
                </button>
              )}
            </div>
          </div>

          {/* Races List */}
          <div className="space-y-4">
            {pagedRaces.map((race) => (
              <div 
                key={race.id} 
                id={race.id}
                className="bg-white border border-[#E4E9F0] rounded-xl p-5 shadow-xs space-y-3 transition-colors hover:border-[#CBD5E1]"
              >
                {/* Header */}
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E4E9F0] pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[10px] bg-[#EBF3FD] text-[#0A3F73] px-2 py-0.5 rounded border border-[#CBD5E1]">
                        {getTierLabel(race.tier)}
                      </span>
                      <span className="text-xs font-mono text-[#8494A8]">
                        ID: #{race.id}
                      </span>
                    </div>
                    <h2 className="text-base font-bold text-[#0B1220] mt-1">
                      {race.office} ({race.state_name})
                    </h2>
                  </div>

                  {race.ratings.length > 0 && (
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-[#64748B]">Rating:</span>
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-[#FFFBEB] text-[#8A6100] border border-[#FCE8A5]">
                        {race.ratings[0].verbatim_label}
                      </span>
                    </div>
                  )}
                </div>

                {/* Candidate Roster */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold uppercase text-[#64748B] block">Candidate Roster & Source Receipts:</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                    {race.candidates.map((c, i) => (
                      <div key={i} className="p-2.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-[#0B1220]">{c.name}</span>
                            <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                              c.party === 'REP' ? 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]' :
                              c.party === 'DEM' ? 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]' :
                              'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]'
                            }`}>
                              {c.party}
                            </span>
                          </div>
                          <span className="text-[10px] text-[#64748B] block mt-0.5">
                            {formatCandidateStatus(c.status)} {c.is_incumbent ? '· Incumbent' : ''}
                          </span>
                        </div>

                        {c.source_url ? (
                          <a
                            href={c.source_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-bold text-[#0E63C4] hover:underline flex items-center gap-1 flex-shrink-0 bg-white px-2 py-1 rounded border border-[#CBD5E1]"
                          >
                            <span>Receipt</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </a>
                        ) : (
                          <span className="text-[10px] text-[#94A3B8] italic">Pending Filing</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Forecaster Spread (Unblended) */}
                {race.ratings.length > 0 && (
                  <div className="pt-2 border-t border-[#F1F5F9] space-y-1.5 text-xs">
                    <span className="text-[10px] font-bold uppercase text-[#64748B] block">Forecaster Ratings Spread (Unblended):</span>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      {race.ratings.map((rt, i) => (
                        <div key={i} className="p-2 rounded bg-[#F8FAFC] border border-[#E2E8F0] text-[11px]">
                          <strong className="text-[#334155] block uppercase text-[10px]">{rt.rater}</strong>
                          <span className="font-bold text-[#0E63C4]">{rt.verbatim_label}</span>
                          <span className="text-[10px] text-[#8494A8] block mt-0.5">As of: {rt.rater_date}</span>
                          {rt.source_url && (
                            <a
                              href={rt.source_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[10px] text-[#0E63C4] hover:underline flex items-center gap-0.5 mt-1"
                            >
                              <span>Forecaster Link</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Polling Average / Latest Poll */}
                {race.polling_average && (
                  <div className="p-3 rounded-lg bg-[#F0FDF4] border border-[#BBF0CC] text-xs space-y-1">
                    <div className="flex justify-between items-center font-bold text-[#067647]">
                      <span>POLLING AVERAGE: {race.polling_average.leader} (+{race.polling_average.spread}%)</span>
                      <span className="text-[10px] text-[#5B6779] font-normal">{race.polling_average.qualifying_polls_count} qualifying surveys</span>
                    </div>
                    {race.polling_average.averages && (
                      <div className="flex gap-4 font-bold text-[#0B1220] text-[11px] pt-0.5">
                        {Object.entries(race.polling_average.averages).map(([cand, pct]) => (
                          <span key={cand}>{cand}: {pct}%</span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4 pb-6">
              <button
                onClick={() => {
                  setCurrentPage(p => Math.max(1, p - 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded-lg border border-[#CBD5E1] bg-white disabled:opacity-40 font-bold text-xs hover:bg-[#F6F8FB] min-h-[36px] flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Previous</span>
              </button>
              <span className="text-xs text-[#64748B] font-mono px-3">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => {
                  setCurrentPage(p => Math.min(totalPages, p + 1));
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                disabled={currentPage >= totalPages}
                className="px-3 py-1.5 rounded-lg border border-[#CBD5E1] bg-white disabled:opacity-40 font-bold text-xs hover:bg-[#F6F8FB] min-h-[36px] flex items-center gap-1"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
