'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Search, X, Filter, Users, Globe, Landmark, Building2, Building,
  Layers, Scale, ChevronDown, ChevronRight, Star, Calendar, DollarSign,
  ArrowUpRight, SlidersHorizontal, UserCheck, TrendingUp, MapPin,
  Gavel, Shield, BadgeDollarSign, Info, Briefcase, Hash, Clock,
  AlertCircle, CheckCircle, GraduationCap, Leaf, Flame, Droplets,
  Flag, BarChart3, Award, ChevronLeft,
} from 'lucide-react';
import {
  ALL_RACE_ENTRIES, getRacesByState, getRacesByLevel, searchRaces,
  getTotalCandidateCount, RaceEntry, Candidate, Party,
} from '@/lib/candidates-registry';

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const PARTY_COLORS: Record<Party, { bg: string; text: string; border: string; dot: string }> = {
  DEM: { bg: '#EBF3FD', text: '#0E63C4', border: '#BFDBFE', dot: '#1D4ED8' },
  REP: { bg: '#FEF2F2', text: '#B42318', border: '#FBD5D5', dot: '#DC2626' },
  IND: { bg: '#F0FDF4', text: '#16A34A', border: '#BBF7D0', dot: '#15803D' },
  LIB: { bg: '#FFFBEB', text: '#B45309', border: '#FDE68A', dot: '#D97706' },
  GRN: { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0', dot: '#16A34A' },
  NP:  { bg: '#F8FAFC', text: '#475569', border: '#E2E8F0', dot: '#64748B' },
  WFP: { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA', dot: '#EA580C' },
  CON: { bg: '#F5F3FF', text: '#7C3AED', border: '#DDD6FE', dot: '#7C3AED' },
};

const LEVEL_ICONS: Record<string, React.ElementType> = {
  federal: Globe,
  state: Landmark,
  county: Building2,
  municipal: Building,
  special_district: Layers,
  judicial: Scale,
};

const LEVEL_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  federal:          { bg: '#EBF3FD', text: '#0E63C4', border: '#BFDBFE' },
  state:            { bg: '#F0FDF4', text: '#16A34A', border: '#BBF7D0' },
  county:           { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA' },
  municipal:        { bg: '#FDF4FF', text: '#9333EA', border: '#E9D5FF' },
  special_district: { bg: '#F0F9FF', text: '#0284C7', border: '#BAE6FD' },
  judicial:         { bg: '#FFFBEB', text: '#B45309', border: '#FDE68A' },
};

const LEVEL_LABELS: Record<string, string> = {
  federal: 'Federal', state: 'State', county: 'County',
  municipal: 'Municipal', special_district: 'Special District', judicial: 'Judicial',
};

const STATUS_COLORS: Record<string, string> = {
  'Incumbent': '#16A34A',
  'Challenger': '#0E63C4',
  'Open Seat': '#9333EA',
  'Primary Winner': '#D97706',
  'Declared': '#475569',
  'Write-In': '#94A3B8',
};

const COOK_COLORS: Record<string, { bg: string; text: string }> = {
  'Solid D':   { bg: '#1D4ED8', text: '#fff' },
  'Likely D':  { bg: '#60A5FA', text: '#1e3a5f' },
  'Lean D':    { bg: '#BFDBFE', text: '#1D4ED8' },
  'Toss-up':   { bg: '#FDE68A', text: '#92400E' },
  'Lean R':    { bg: '#FCA5A5', text: '#991B1B' },
  'Likely R':  { bg: '#F87171', text: '#fff' },
  'Solid R':   { bg: '#DC2626', text: '#fff' },
};

type ViewMode = 'races' | 'candidates' | 'bracket';
type LevelFilter = 'all' | 'federal' | 'state' | 'county' | 'municipal' | 'special_district' | 'judicial';

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function CandidatesExplorer() {
  const total = useMemo(() => getTotalCandidateCount(), []);
  const [query, setQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');
  const [officeTypeFilter, setOfficeTypeFilter] = useState<string>('all');
  const [populationFilter, setPopulationFilter] = useState<string>('all');
  const [stateFilter, setStateFilter] = useState('');
  const [partyFilter, setPartyFilter] = useState<Party | 'all'>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [viewMode, setViewMode] = useState<ViewMode>('races');
  const [selectedRace, setSelectedRace] = useState<RaceEntry | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 20;
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); searchRef.current?.focus(); }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  const allStates = useMemo(() =>
    Array.from(new Set(ALL_RACE_ENTRIES.map(r => r.stateAbbr))).sort(), []);

  const filteredRaces = useMemo(() => {
    let races = query ? searchRaces(query) : ALL_RACE_ENTRIES;
    if (levelFilter !== 'all') races = races.filter(r => r.level === levelFilter);
    if (stateFilter) races = races.filter(r => r.stateAbbr === stateFilter);
    if (partyFilter !== 'all') races = races.filter(r => r.candidates.some(c => c.party === partyFilter));
    if (statusFilter !== 'all') races = races.filter(r => r.candidates.some(c => c.status === statusFilter));
    
    // Quick office type filter
    if (officeTypeFilter === 'dog_catcher') {
      races = races.filter(r => r.office.toLowerCase().includes('dog') || r.office.toLowerCase().includes('animal'));
    } else if (officeTypeFilter === 'treasurer') {
      races = races.filter(r => r.office.toLowerCase().includes('treasurer') || r.office.toLowerCase().includes('collector'));
    } else if (officeTypeFilter === 'clerk') {
      races = races.filter(r => r.office.toLowerCase().includes('clerk'));
    } else if (officeTypeFilter === 'selectboard') {
      races = races.filter(r => r.office.toLowerCase().includes('selectboard') || r.office.toLowerCase().includes('council') || r.office.toLowerCase().includes('alderman'));
    } else if (officeTypeFilter === 'moderator') {
      races = races.filter(r => r.office.toLowerCase().includes('moderator'));
    } else if (officeTypeFilter === 'judicial') {
      races = races.filter(r => r.level === 'judicial' || r.office.toLowerCase().includes('judge') || r.office.toLowerCase().includes('justice of the peace') || r.office.toLowerCase().includes('constable'));
    } else if (officeTypeFilter === 'school') {
      races = races.filter(r => r.office.toLowerCase().includes('school board'));
    } else if (officeTypeFilter === 'roads') {
      races = races.filter(r => r.office.toLowerCase().includes('highway') || r.office.toLowerCase().includes('road commissioner'));
    } else if (officeTypeFilter === 'water_soil') {
      races = races.filter(r => r.office.toLowerCase().includes('water') || r.office.toLowerCase().includes('soil') || r.office.toLowerCase().includes('fire'));
    } else if (officeTypeFilter === 'county_officers') {
      races = races.filter(r => r.office.toLowerCase().includes('sheriff') || r.office.toLowerCase().includes('district attorney') || r.office.toLowerCase().includes('assessor') || r.office.toLowerCase().includes('coroner') || r.office.toLowerCase().includes('deeds'));
    } else if (officeTypeFilter === 'mayor') {
      races = races.filter(r => r.office.toLowerCase().includes('mayor'));
    } else if (officeTypeFilter === 'senate') {
      races = races.filter(r => r.office.toLowerCase().includes('senate'));
    } else if (officeTypeFilter === 'governor') {
      races = races.filter(r => r.office.toLowerCase().includes('governor'));
    } else if (officeTypeFilter === 'house') {
      races = races.filter(r => r.office.toLowerCase().includes('house'));
    }

    // Population threshold filter (e.g. population >= 1,000)
    if (populationFilter === '1k_plus') {
      races = races.filter(r => (r.population || 0) >= 1000);
    } else if (populationFilter === '1k_to_5k') {
      races = races.filter(r => (r.population || 0) >= 1000 && (r.population || 0) < 5000);
    } else if (populationFilter === '5k_to_25k') {
      races = races.filter(r => (r.population || 0) >= 5000 && (r.population || 0) < 25000);
    } else if (populationFilter === '25k_to_100k') {
      races = races.filter(r => (r.population || 0) >= 25000 && (r.population || 0) < 100000);
    } else if (populationFilter === '100k_plus') {
      races = races.filter(r => (r.population || 0) >= 100000);
    }

    return races;
  }, [query, levelFilter, officeTypeFilter, populationFilter, stateFilter, partyFilter, statusFilter]);

  // Flatten to individual candidates for "candidates" view
  const flatCandidates = useMemo(() => {
    return filteredRaces.flatMap(r => r.candidates.map(c => ({ candidate: c, race: r })));
  }, [filteredRaces]);

  const pagedRaces = filteredRaces.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);
  const totalRacePages = Math.ceil(filteredRaces.length / PAGE_SIZE);
  const totalCandidatesFiltered = flatCandidates.length;

  const hasFilters = query || levelFilter !== 'all' || officeTypeFilter !== 'all' || populationFilter !== 'all' || stateFilter || partyFilter !== 'all' || statusFilter !== 'all';

  const clearFilters = () => {
    setQuery(''); setLevelFilter('all'); setOfficeTypeFilter('all'); setPopulationFilter('all'); setStateFilter(''); setPartyFilter('all'); setStatusFilter('all'); setPage(0);
  };

  const levelCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of ALL_RACE_ENTRIES) counts[r.level] = (counts[r.level] || 0) + 1;
    return counts;
  }, []);

  return (
    <div className="space-y-4">
      {/* ── MASTHEAD ────────────────────────────────────────────────────────── */}
      <div className="relative rounded-2xl overflow-hidden shadow-xl"
        style={{ background: 'linear-gradient(135deg, #0B1220 0%, #1A2840 60%, #0E2040 100%)' }}>
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle at 20% 50%, #DC2626 0%, transparent 50%), radial-gradient(circle at 80% 30%, #1D4ED8 0%, transparent 50%)' }} />
        <div className="relative z-10 p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-[#60A5FA]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#93C5FD]">Complete Candidates Registry · 2026 Cycle</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                Every Person Running<br className="hidden sm:block" />
                <span className="text-[#60A5FA]"> for Every Office</span>
              </h1>
              <p className="mt-2 text-sm text-[#94A3B8] max-w-lg">
                U.S. Senate · Governor · Attorney General · Secretary of State · House battlegrounds ·
                County DA · Sheriff · Mayor · School Board · Township Supervisor · Justice of the Peace · Soil & Water Conservation District.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 min-w-[220px]">
              {[
                { label: 'Total Candidates', value: total.toLocaleString(), icon: Users },
                { label: 'Races Tracked', value: ALL_RACE_ENTRIES.length.toLocaleString(), icon: BarChart3 },
                { label: 'States Covered', value: allStates.length.toString(), icon: MapPin },
                { label: 'Jurisdiction Levels', value: '6', icon: Layers },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10 text-center">
                  <Icon className="w-4 h-4 text-[#60A5FA] mx-auto mb-1" />
                  <div className="text-xl font-bold font-mono text-white">{value}</div>
                  <div className="text-[10px] text-[#94A3B8] uppercase tracking-wide">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Level pills */}
          <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/10">
            {(['all', 'federal', 'state', 'county', 'municipal', 'special_district', 'judicial'] as LevelFilter[]).map(level => {
              const Icon = level === 'all' ? Flag : LEVEL_ICONS[level];
              const col = level === 'all' ? null : LEVEL_COLORS[level];
              const isActive = levelFilter === level;
              const count = level === 'all' ? ALL_RACE_ENTRIES.length : (levelCounts[level] || 0);
              return (
                <button
                  key={level}
                  onClick={() => { setLevelFilter(level); setPage(0); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                    isActive ? 'bg-white text-[#0B1220] border-white scale-105' : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  {Icon && <Icon className="w-3 h-3" />}
                  <span>{level === 'all' ? 'All Levels' : LEVEL_LABELS[level]}</span>
                  <span className="opacity-70 font-mono">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      
      {/* ── QUICK FOCUS PRESETS: FROM SENATE TO DOG CATCHER (POP > 1,000) ─── */}
      <div className="bg-[#FFFFFF] border border-[#CBD5E1] rounded-xl p-3 shadow-xs space-y-2">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-semibold text-[#0B1220]">
          <span className="flex items-center gap-1.5 uppercase tracking-wide text-[11px] text-[#0E63C4]">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Quick Focus by Position:
          </span>
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#5B6779] font-normal">Population Threshold:</span>
            <select
              value={populationFilter}
              onChange={e => { setPopulationFilter(e.target.value); setPage(0); }}
              className="text-xs font-medium border border-[#CBD5E1] rounded-md px-2 py-1 bg-[#F6F8FB] text-[#0B1220] focus:outline-none focus:ring-1 focus:ring-[#0E63C4]"
            >
              <option value="all">All Jurisdictions</option>
              <option value="1k_plus">👥 Pop. ≥ 1,000 (Small Towns & Local)</option>
              <option value="10k_plus">🏙️ Pop. ≥ 10,000 (Mid-Sized)</option>
              <option value="50k_plus">🌆 Pop. ≥ 50,000 (Cities)</option>
              <option value="250k_plus">🌃 Pop. ≥ 250,000 (Metros)</option>
            </select>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 pt-1">
          {[
            { id: 'all', label: 'All Offices', icon: '🗳️' },
            { id: 'dog_catcher', label: '🐕 Dog Catchers (Pop. ≥ 1k)', icon: '' },
            { id: 'treasurer', label: '💰 Treasurers & Tax Collectors', icon: '' },
            { id: 'clerk', label: '📜 Town & City Clerks', icon: '' },
            { id: 'selectboard', label: '🏛️ Selectboard & Councils', icon: '' },
            { id: 'moderator', label: '🗣️ Town Moderators', icon: '' },
            { id: 'judicial', label: '⚖️ Constables & JPs', icon: '' },
            { id: 'school', label: '🏫 School Boards', icon: '' },
            { id: 'roads', label: '🛣️ Road Commissioners', icon: '' },
            { id: 'water_soil', label: '🚒 Fire, Water & Soil', icon: '' },
            { id: 'county_officers', label: '🚔 Sheriffs & DAs', icon: '' },
            { id: 'mayor', label: '🏙️ Mayors', icon: '' },
            { id: 'senate', label: '🏛️ U.S. Senate', icon: '' },
            { id: 'governor', label: '🏦 Governors', icon: '' },
            { id: 'house', label: '🇺🇸 House', icon: '' },
          ].map(p => {
            const active = officeTypeFilter === p.id;
            return (
              <button
                key={p.id}
                onClick={() => { setOfficeTypeFilter(p.id); setPage(0); }}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all border ${
                  active
                    ? 'bg-[#0E63C4] text-white border-[#0E63C4] shadow-xs scale-102'
                    : 'bg-[#F6F8FB] text-[#24303F] border-[#E4E9F0] hover:bg-[#EBF3FD] hover:text-[#0E63C4]'
                }`}
              >
                <span>{p.icon}</span>
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── SEARCH + CONTROLS ───────────────────────────────────────────────── */}
      <div className="bg-white border border-[#E4E9F0] rounded-xl p-3 flex flex-wrap gap-3 items-center shadow-xs">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8494A8]" />
          <input
            ref={searchRef}
            type="search"
            id="candidates-search"
            value={query}
            onChange={e => { setQuery(e.target.value); setPage(0); }}
            placeholder="Search by name, office, party, prior job… (⌘K)"
            className="w-full pl-9 pr-4 py-2 text-sm border border-[#E4E9F0] rounded-lg bg-[#F6F8FB] text-[#0B1220] placeholder:text-[#8494A8] focus:outline-none focus:ring-2 focus:ring-[#0E63C4]/30 focus:border-[#0E63C4]"
          />
          {query && <button onClick={() => setQuery('')}><X className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8494A8]" /></button>}
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg p-1">
          {([['races', 'By Race'], ['candidates', 'By Candidate']] as [ViewMode, string][]).map(([mode, label]) => (
            <button key={mode} onClick={() => setViewMode(mode)}
              className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                viewMode === mode ? 'bg-white shadow-sm text-[#0E63C4] border border-[#E4E9F0]' : 'text-[#5B6779] hover:text-[#0B1220]'
              }`}>
              {label}
            </button>
          ))}
        </div>

        {/* State filter */}
        <select value={stateFilter} onChange={e => { setStateFilter(e.target.value); setPage(0); }}
          className="text-xs border border-[#E4E9F0] rounded-lg px-3 py-2 bg-[#F6F8FB] text-[#0B1220] focus:outline-none focus:ring-2 focus:ring-[#0E63C4]/30">
          <option value="">All States</option>
          {allStates.map(s => <option key={s} value={s}>{s}</option>)}
        </select>

        {/* Filters toggle */}
        <button onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
            showFilters || (partyFilter !== 'all' || statusFilter !== 'all')
              ? 'bg-[#EBF3FD] text-[#0E63C4] border-[#CBD5E1]'
              : 'bg-[#F6F8FB] text-[#5B6779] border-[#E4E9F0]'
          }`}>
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filters
        </button>

        {hasFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-[#B42318] hover:underline">
            <X className="w-3 h-3" /> Clear
          </button>
        )}

        <span className="text-xs text-[#8494A8] font-mono ml-auto whitespace-nowrap">
          {totalCandidatesFiltered.toLocaleString()} candidates · {filteredRaces.length.toLocaleString()} races
        </span>
      </div>

      {/* ── ADVANCED FILTERS ────────────────────────────────────────────────── */}
      {showFilters && (
        <div className="bg-white border border-[#E4E9F0] rounded-xl p-4 shadow-xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#5B6779] uppercase tracking-wider mb-2">Party</label>
              <div className="flex flex-wrap gap-2">
                {(['all', 'DEM', 'REP', 'IND', 'LIB', 'GRN', 'NP'] as const).map(party => {
                  const col = party === 'all' ? null : PARTY_COLORS[party];
                  return (
                    <button key={party} onClick={() => setPartyFilter(party as Party | 'all')}
                      className={`px-3 py-1 text-xs rounded-lg border font-semibold transition-all ${
                        partyFilter === party
                          ? party === 'all' ? 'bg-[#0B1220] text-white border-[#0B1220]'
                            : `border-transparent text-white`
                          : 'bg-[#F6F8FB] text-[#5B6779] border-[#E4E9F0]'
                      }`}
                      style={partyFilter === party && party !== 'all' && col
                        ? { backgroundColor: col.dot }
                        : undefined
                      }>
                      {party === 'all' ? 'All Parties' : party}
                    </button>
                  );
                })}
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-[#5B6779] uppercase tracking-wider mb-2">Candidate Status</label>
              <div className="flex flex-wrap gap-2">
                {(['all', 'Incumbent', 'Challenger', 'Open Seat', 'Declared'] as const).map(s => (
                  <button key={s} onClick={() => setStatusFilter(s)}
                    className={`px-3 py-1 text-xs rounded-lg border transition-all ${
                      statusFilter === s
                        ? 'bg-[#EBF3FD] text-[#0E63C4] border-[#BFDBFE] font-semibold'
                        : 'bg-[#F6F8FB] text-[#5B6779] border-[#E4E9F0]'
                    }`}>
                    {s === 'all' ? 'All Status' : s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── CONTENT: BY RACE VIEW ───────────────────────────────────────────── */}
      {viewMode === 'races' && (
        <div className="space-y-3">
          {pagedRaces.map(race => (
            <RaceCard
              key={race.raceId}
              race={race}
              isSelected={selectedRace?.raceId === race.raceId}
              onSelect={() => setSelectedRace(selectedRace?.raceId === race.raceId ? null : race)}
            />
          ))}

          {pagedRaces.length === 0 && (
            <div className="text-center py-16 text-[#8494A8]">
              <Search className="w-10 h-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">No races match your search</p>
              <button onClick={clearFilters} className="mt-2 text-sm text-[#0E63C4] hover:underline">Clear filters</button>
            </div>
          )}

          {totalRacePages > 1 && (
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[#8494A8] font-mono">
                Showing {page * PAGE_SIZE + 1}–{Math.min((page + 1) * PAGE_SIZE, filteredRaces.length)} of {filteredRaces.length} races
              </span>
              <div className="flex gap-2">
                <button onClick={() => setPage(Math.max(0, page - 1))} disabled={page === 0}
                  className="px-3 py-1.5 text-xs border rounded-lg disabled:opacity-40 hover:bg-[#F6F8FB] flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3" /> Prev
                </button>
                <span className="text-xs font-mono text-[#5B6779] px-2 py-1.5">{page + 1}/{totalRacePages}</span>
                <button onClick={() => setPage(Math.min(totalRacePages - 1, page + 1))} disabled={page >= totalRacePages - 1}
                  className="px-3 py-1.5 text-xs border rounded-lg disabled:opacity-40 hover:bg-[#F6F8FB] flex items-center gap-1">
                  Next <ChevronRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── CONTENT: BY CANDIDATE VIEW ──────────────────────────────────────── */}
      {viewMode === 'candidates' && (
        <CandidateGridView entries={flatCandidates} />
      )}
    </div>
  );
}

// ─── RACE CARD ───────────────────────────────────────────────────────────────

function RaceCard({ race, isSelected, onSelect }: {
  race: RaceEntry; isSelected: boolean; onSelect: () => void;
}) {
  const lcol = LEVEL_COLORS[race.level] || LEVEL_COLORS.federal;
  const LIcon = LEVEL_ICONS[race.level] || Globe;
  const daysUntil = Math.ceil((new Date(race.electionDate).getTime() - Date.now()) / 86400000);
  const cookCol = race.cookRating ? COOK_COLORS[race.cookRating] : null;

  return (
    <div className={`border rounded-xl overflow-hidden shadow-xs transition-all duration-150 ${
      isSelected ? 'border-[#0E63C4] shadow-md' : 'border-[#E4E9F0] hover:border-[#CBD5E1] hover:shadow-sm'
    } bg-white`}>
      {/* Header */}
      <button onClick={onSelect} className="w-full text-left p-4 flex items-start gap-3">
        <div className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center"
          style={{ backgroundColor: lcol.bg, border: `1px solid ${lcol.border}` }}>
          <LIcon className="w-4 h-4" style={{ color: lcol.text }} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <h2 className="text-sm font-bold text-[#0B1220] leading-snug">{race.office}</h2>
            <span className="text-[9px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0"
              style={{ backgroundColor: lcol.bg, color: lcol.text, borderColor: lcol.border }}>
              {LEVEL_LABELS[race.level] || race.level}
            </span>
            {race.cookRating && cookCol && (
              <span className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: cookCol.bg, color: cookCol.text }}>
                {race.cookRating}
              </span>
            )}
            {race.pollAverage && (
              <span className="text-[10px] font-mono text-[#5B6779] flex-shrink-0">
                Poll avg: <strong>{race.pollAverage}</strong>
              </span>
            )}
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#8494A8]">
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {race.municipality ? `${race.municipality}, ` : ''}{race.county ? `${race.county}, ` : ''}{race.state}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span className="font-mono">{new Date(race.electionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </span>
            {daysUntil > 0 && (
              <span className={`font-semibold font-mono ${daysUntil <= 90 ? 'text-[#16A34A]' : daysUntil <= 365 ? 'text-[#0E63C4]' : 'text-[#8494A8]'}`}>
                {daysUntil}d out
              </span>
            )}
            {race.totalFundraisingM && (
              <span className="flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                ${race.totalFundraisingM.toFixed(1)}M total raised
              </span>
            )}
          </div>
        </div>
        <div className="flex-shrink-0 flex items-center gap-1">
          <span className="text-xs text-[#5B6779] font-mono">{race.candidates.length} candidates</span>
          {isSelected ? <ChevronDown className="w-4 h-4 text-[#5B6779]" /> : <ChevronRight className="w-4 h-4 text-[#5B6779]" />}
        </div>
      </button>

      {/* Candidate rows — always visible summary, full on expand */}
      <div className={`border-t border-[#F0F4F8] ${isSelected ? '' : 'hidden sm:block'}`}>
        {/* Compact candidate pills (always shown on desktop) */}
        {!isSelected && (
          <div className="px-4 py-3 flex flex-wrap gap-2">
            {race.candidates.map(c => {
              const col = PARTY_COLORS[c.party] || PARTY_COLORS.NP;
              return (
                <div key={c.name} className="flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-xs"
                  style={{ backgroundColor: col.bg, borderColor: col.border }}>
                  <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: col.dot }} />
                  <span className="font-semibold" style={{ color: col.text }}>{c.name}</span>
                  <span className="text-[10px] opacity-70" style={{ color: col.text }}>{c.party}</span>
                  {c.status === 'Incumbent' && <CheckCircle className="w-2.5 h-2.5 flex-shrink-0" style={{ color: col.dot }} />}
                </div>
              );
            })}
          </div>
        )}

        {/* Full candidate detail on expand */}
        {isSelected && (
          <div className="divide-y divide-[#F0F4F8]">
            {race.candidates.map((c, i) => (
              <CandidateDetailRow key={c.name} candidate={c} rank={i + 1} totalInRace={race.candidates.length} />
            ))}
            {(race.keyIssues?.length || race.notes) && (
              <div className="px-4 py-3 bg-[#FAFBFC] flex flex-wrap gap-4">
                {race.keyIssues && (
                  <div>
                    <span className="text-[10px] text-[#8494A8] uppercase tracking-wide font-semibold block mb-1">Key Issues</span>
                    <div className="flex flex-wrap gap-1">
                      {race.keyIssues.map(issue => (
                        <span key={issue} className="text-[11px] px-2 py-0.5 rounded bg-[#F0F4F8] text-[#5B6779] border border-[#E4E9F0]">{issue}</span>
                      ))}
                    </div>
                  </div>
                )}
                {race.notes && (
                  <div className="flex items-start gap-1.5 text-xs text-[#B45309] bg-[#FFFBEB] border border-[#FDE68A] rounded px-2 py-1.5 max-w-md">
                    <AlertCircle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                    <span>{race.notes}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── CANDIDATE DETAIL ROW ─────────────────────────────────────────────────────

function CandidateDetailRow({ candidate: c, rank, totalInRace }: {
  candidate: Candidate; rank: number; totalInRace: number;
}) {
  const col = PARTY_COLORS[c.party] || PARTY_COLORS.NP;
  const statusColor = STATUS_COLORS[c.status] || '#64748B';

  return (
    <div className="px-4 py-3.5 flex items-start gap-3 hover:bg-[#F6F8FB] transition-colors border-b border-[#F0F4F8] last:border-b-0">
      {/* Rank badge */}
      <div className="w-6 h-6 rounded-full bg-[#F0F4F8] border border-[#E4E9F0] flex items-center justify-center flex-shrink-0 mt-0.5">
        <span className="text-[10px] font-bold text-[#8494A8]">{rank}</span>
      </div>

      {/* Party dot */}
      <div className="w-3 h-3 rounded-full flex-shrink-0 mt-1.5 border-2"
        style={{ backgroundColor: col.dot, borderColor: col.border }} />

      {/* Info */}
      <div className="flex-1 min-w-0 space-y-1">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[#0B1220]">{c.name}</span>
            <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border"
              style={{ backgroundColor: col.bg, color: col.text, borderColor: col.border }}>
              {c.party}
            </span>
            <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded" style={{ color: statusColor, backgroundColor: `${statusColor}15` }}>
              {c.status}
            </span>
            {c.status === 'Incumbent' && (
              <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 text-[#16A34A]" />
            )}
          </div>

          {c.pollShare && (
            <div className="flex items-center gap-1.5 bg-[#EBF3FD] border border-[#BFDBFE] px-2.5 py-0.5 rounded-full">
              <span className="text-[10px] text-[#0A4E9E] font-medium">Certified Poll Share:</span>
              <strong className="text-xs text-[#0E63C4] font-mono">{c.pollShare}%</strong>
            </div>
          )}
        </div>

        {/* Biography & Platform */}
        {c.biography && (
          <p className="text-xs text-[#334155] leading-relaxed pt-0.5">
            <strong>Bio:</strong> {c.biography}
          </p>
        )}
        {c.platformStance && (
          <p className="text-xs text-[#475569] leading-relaxed">
            <strong>Platform:</strong> {c.platformStance}
          </p>
        )}

        <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-[11px] text-[#5B6779]">
          {c.priorOffice && (
            <div className="flex items-center gap-1">
              <Briefcase className="w-3 h-3 flex-shrink-0" />
              <span>{c.priorOffice}</span>
            </div>
          )}
          {c.hometown && (
            <div className="flex items-center gap-1 text-[#8494A8]">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span>{c.hometown}</span>
            </div>
          )}
          {c.age && (
            <div className="flex items-center gap-1 text-[#8494A8]">
              <Clock className="w-3 h-3 flex-shrink-0" />
              <span>Age {c.age}</span>
            </div>
          )}
          {c.cashOnHandMillions !== undefined && (
            <div className="flex items-center gap-1 font-semibold text-[#16A34A]">
              <DollarSign className="w-3 h-3 flex-shrink-0" />
              <span>${c.cashOnHandMillions < 0.1 ? Math.round(c.cashOnHandMillions * 1000) + 'k' : c.cashOnHandMillions.toFixed(1) + 'M'} cash on hand</span>
            </div>
          )}
          {c.sourceVerification && (
            <div className="flex items-center gap-1 text-[#047857] bg-[#ECFDF5] px-1.5 py-0.2 rounded border border-[#A7F3D0]">
              <CheckCircle className="w-3 h-3" />
              <span>Filing: {c.sourceVerification.filingId} ({c.sourceVerification.verificationStatus})</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── CANDIDATE GRID VIEW ─────────────────────────────────────────────────────

function CandidateGridView({ entries }: { entries: Array<{ candidate: Candidate; race: RaceEntry }> }) {
  const PAGE = 60;
  const [p, setP] = useState(0);
  const paged = entries.slice(p * PAGE, (p + 1) * PAGE);
  const totalPages = Math.ceil(entries.length / PAGE);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {paged.map(({ candidate: c, race: r }) => {
          const col = PARTY_COLORS[c.party] || PARTY_COLORS.NP;
          const lcol = LEVEL_COLORS[r.level] || LEVEL_COLORS.federal;
          const statusColor = STATUS_COLORS[c.status] || '#64748B';

          return (
            <div key={`${r.raceId}-${c.name}`}
              className="bg-white border border-[#E4E9F0] rounded-xl p-4 hover:border-[#CBD5E1] hover:shadow-sm transition-all">
              {/* Header row */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 flex-shrink-0"
                    style={{ backgroundColor: col.dot, borderColor: col.border }} />
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded border"
                    style={{ backgroundColor: col.bg, color: col.text, borderColor: col.border }}>{c.party}</span>
                </div>
                <span className="text-[9px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0"
                  style={{ backgroundColor: lcol.bg, color: lcol.text, borderColor: lcol.border }}>
                  {LEVEL_LABELS[r.level]}
                </span>
              </div>

              {/* Name & status */}
              <div className="mb-2">
                <h3 className="text-sm font-bold text-[#0B1220] leading-snug">{c.name}</h3>
                <span className="text-[10px] font-semibold" style={{ color: statusColor }}>{c.status}</span>
                {c.status === 'Incumbent' && <CheckCircle className="w-3 h-3 inline ml-1 mb-0.5" style={{ color: '#16A34A' }} />}
              </div>

              {/* Race */}
              <p className="text-[11px] text-[#5B6779] leading-snug mb-2 line-clamp-2">{r.office}</p>

              {/* Details */}
              <div className="space-y-0.5 text-[10px] text-[#8494A8]">
                {c.priorOffice && <div className="flex items-center gap-1"><Briefcase className="w-2.5 h-2.5" /><span className="line-clamp-1">{c.priorOffice}</span></div>}
                {c.hometown && <div className="flex items-center gap-1"><MapPin className="w-2.5 h-2.5" /><span>{c.hometown}</span></div>}
                {c.cashOnHandMillions && <div className="flex items-center gap-1 font-semibold text-[#16A34A]"><DollarSign className="w-2.5 h-2.5" /><span>${c.cashOnHandMillions.toFixed(1)}M CoH</span></div>}
              </div>

              {/* Election date */}
              <div className="mt-3 pt-2 border-t border-[#F0F4F8] flex items-center justify-between text-[10px]">
                <span className="font-mono text-[#8494A8]">
                  {new Date(r.electionDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                {r.cookRating && COOK_COLORS[r.cookRating] && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-bold"
                    style={{ backgroundColor: COOK_COLORS[r.cookRating].bg, color: COOK_COLORS[r.cookRating].text }}>
                    {r.cookRating}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setP(Math.max(0, p - 1))} disabled={p === 0}
            className="px-4 py-2 text-xs border rounded-lg disabled:opacity-40 hover:bg-[#F6F8FB]">← Prev</button>
          <span className="text-xs text-[#5B6779] font-mono">{p + 1}/{totalPages} · {entries.length.toLocaleString()} candidates</span>
          <button onClick={() => setP(Math.min(totalPages - 1, p + 1))} disabled={p >= totalPages - 1}
            className="px-4 py-2 text-xs border rounded-lg disabled:opacity-40 hover:bg-[#F6F8FB]">Next →</button>
        </div>
      )}
    </div>
  );
}
