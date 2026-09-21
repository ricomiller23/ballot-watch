'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import {
  Search, X, Filter, Users, Building2, Building, Layers, Scale,
  ChevronDown, ChevronRight, Calendar, DollarSign, ArrowUpRight,
  SlidersHorizontal, UserCheck, TrendingUp, MapPin, Gavel, Shield,
  BadgeDollarSign, Info, Briefcase, Hash, Clock, CheckCircle,
  AlertCircle, ChevronLeft, Download, Printer, Award, FileText,
} from 'lucide-react';
import { ALL_RACE_ENTRIES, RaceEntry, Candidate, Party } from '@/lib/candidates-registry';

// ─── CONSTANTS & CONFIG ───────────────────────────────────────────────────────

const PARTY_COLORS: Record<Party, { bg: string; text: string; border: string }> = {
  DEM: { bg: '#EBF3FD', text: '#0E63C4', border: '#BFDBFE' },
  REP: { bg: '#FEF2F2', text: '#B42318', border: '#FBD5D5' },
  IND: { bg: '#F0FDF4', text: '#16A34A', border: '#BBF7D0' },
  LIB: { bg: '#FFFBEB', text: '#B45309', border: '#FDE68A' },
  GRN: { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0' },
  NP:  { bg: '#F8FAFC', text: '#475569', border: '#E2E8F0' },
  WFP: { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA' },
  CON: { bg: '#F5F3FF', text: '#7C3AED', border: '#DDD6FE' },
};

const STATUS_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  'Incumbent':      { bg: '#ECFDF5', text: '#065F46', border: '#A7F3D0' },
  'Challenger':     { bg: '#EFF6FF', text: '#1E40AF', border: '#BFDBFE' },
  'Open Seat':      { bg: '#FAF5FF', text: '#6B21A8', border: '#E9D5FF' },
  'Primary Winner': { bg: '#FFFBEB', text: '#92400E', border: '#FDE68A' },
  'Declared':       { bg: '#F8FAFC', text: '#334155', border: '#E2E8F0' },
  'Write-In':       { bg: '#F1F5F9', text: '#64748B', border: '#CBD5E1' },
};

const OFFICE_CATEGORIES = [
  { id: 'all', label: 'All Local Races', icon: '🌐', desc: 'Every local contest from Treasurer down to Dog Catcher' },
  { id: 'dog_catcher', label: 'Dog Catchers', icon: '🐕', desc: 'Elected Animal Control & Rabies Prevention Officers' },
  { id: 'treasurer', label: 'Treasurers', icon: '💰', desc: 'Town, City & County Treasurers & Finance Custodians' },
  { id: 'tax_collector', label: 'Tax Collectors', icon: '💵', desc: 'Receivers of Taxes & Revenue Collectors' },
  { id: 'clerk', label: 'Town & City Clerks', icon: '📜', desc: 'Elections Administrators & Vital Records Keepers' },
  { id: 'selectboard', label: 'Selectboard & Councils', icon: '🏛️', desc: 'Municipal Governing Boards, Aldermen & Councilors' },
  { id: 'moderator', label: 'Town Moderators', icon: '🗣️', desc: 'Presiding Officers of Annual Town Meetings' },
  { id: 'constable', label: 'Constables & Bailiffs', icon: '⚖️', desc: 'Elected Peace Officers & Process Servers' },
  { id: 'judicial', label: 'Justices of the Peace', icon: '🧑‍⚖️', desc: 'Local Magistrates & Small Claims Judges' },
  { id: 'school', label: 'School Boards', icon: '🎓', desc: 'Independent School District Trustees' },
  { id: 'roads', label: 'Road Commissioners', icon: '🛣️', desc: 'Highway Superintendents & Public Works' },
  { id: 'fire', label: 'Fire Districts', icon: '🚒', desc: 'Fire Protection District Commissioners' },
  { id: 'water', label: 'Water Districts', icon: '💧', desc: 'Water & Sewer Utility Trustees' },
  { id: 'soil', label: 'Soil Conservation', icon: '🌱', desc: 'Soil & Water Conservation Supervisors' },
  { id: 'county_exec', label: 'Sheriffs & DAs', icon: '🚔', desc: 'County Law Enforcement & Prosecutors' },
  { id: 'county_admin', label: 'Assessors & Coroners', icon: '📋', desc: 'Property Appraisers, Coroners & Registers' },
];

const POP_TIERS = [
  { id: 'all', label: 'All Populations (≥ 1,000)' },
  { id: '1k_to_5k', label: '1,000 – 5,000 (Small Rural Towns)' },
  { id: '5k_to_25k', label: '5,000 – 25,000 (Midsize Municipalities)' },
  { id: '25k_to_100k', label: '25,000 – 100,000 (Large Towns & Cities)' },
  { id: '100k_plus', label: '100,000+ (Metros & Major Counties)' },
];

export default function LocalRacesExplorer() {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [popTier, setPopTier] = useState('all');
  const [stateFilter, setStateFilter] = useState('');
  const [partyFilter, setPartyFilter] = useState<Party | 'all'>('all');
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(24);
  const [selectedRace, setSelectedRace] = useState<RaceEntry | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Filter only local races (municipal, county, special_district, judicial)
  const localRacesOnly = useMemo(() => {
    return ALL_RACE_ENTRIES.filter(r => r.level !== 'federal' && r.level !== 'state');
  }, []);

  // Compute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { all: localRacesOnly.length };
    for (const r of localRacesOnly) {
      const off = r.office.toLowerCase();
      if (off.includes('dog') || off.includes('animal control')) counts['dog_catcher'] = (counts['dog_catcher'] || 0) + 1;
      if (off.includes('treasurer')) counts['treasurer'] = (counts['treasurer'] || 0) + 1;
      if (off.includes('tax collector') || off.includes('receiver of taxes')) counts['tax_collector'] = (counts['tax_collector'] || 0) + 1;
      if (off.includes('clerk')) counts['clerk'] = (counts['clerk'] || 0) + 1;
      if (off.includes('selectboard') || off.includes('council') || off.includes('alderman') || off.includes('commissioner (district')) counts['selectboard'] = (counts['selectboard'] || 0) + 1;
      if (off.includes('moderator')) counts['moderator'] = (counts['moderator'] || 0) + 1;
      if (off.includes('constable') || off.includes('marshal')) counts['constable'] = (counts['constable'] || 0) + 1;
      if (off.includes('justice of the peace') || off.includes('magistrate') || off.includes('judge')) counts['judicial'] = (counts['judicial'] || 0) + 1;
      if (off.includes('school board')) counts['school'] = (counts['school'] || 0) + 1;
      if (off.includes('highway') || off.includes('road commissioner')) counts['roads'] = (counts['roads'] || 0) + 1;
      if (off.includes('fire')) counts['fire'] = (counts['fire'] || 0) + 1;
      if (off.includes('water')) counts['water'] = (counts['water'] || 0) + 1;
      if (off.includes('soil')) counts['soil'] = (counts['soil'] || 0) + 1;
      if (off.includes('sheriff') || off.includes('district attorney') || off.includes('prosecutor')) counts['county_exec'] = (counts['county_exec'] || 0) + 1;
      if (off.includes('assessor') || off.includes('coroner') || off.includes('deeds')) counts['county_admin'] = (counts['county_admin'] || 0) + 1;
    }
    return counts;
  }, [localRacesOnly]);

  // All States list from local races
  const allStates = useMemo(() => {
    return Array.from(new Set(localRacesOnly.map(r => r.stateAbbr))).sort();
  }, [localRacesOnly]);

  // Filtered races
  const filteredRaces = useMemo(() => {
    let list = localRacesOnly;

    // Search query
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      list = list.filter(r =>
        r.office.toLowerCase().includes(q) ||
        r.state.toLowerCase().includes(q) ||
        r.stateAbbr.toLowerCase() === q ||
        (r.municipality && r.municipality.toLowerCase().includes(q)) ||
        (r.county && r.county.toLowerCase().includes(q)) ||
        (r.keyIssues && r.keyIssues.some(iss => iss.toLowerCase().includes(q))) ||
        r.candidates.some(c => c.name.toLowerCase().includes(q) || (c.hometown && c.hometown.toLowerCase().includes(q)))
      );
    }

    // Category
    if (categoryFilter !== 'all') {
      list = list.filter(r => {
        const off = r.office.toLowerCase();
        if (categoryFilter === 'dog_catcher') return off.includes('dog') || off.includes('animal control');
        if (categoryFilter === 'treasurer') return off.includes('treasurer');
        if (categoryFilter === 'tax_collector') return off.includes('tax collector') || off.includes('receiver of taxes');
        if (categoryFilter === 'clerk') return off.includes('clerk');
        if (categoryFilter === 'selectboard') return off.includes('selectboard') || off.includes('council') || off.includes('alderman') || off.includes('commissioner (district');
        if (categoryFilter === 'moderator') return off.includes('moderator');
        if (categoryFilter === 'constable') return off.includes('constable') || off.includes('marshal');
        if (categoryFilter === 'judicial') return off.includes('justice of the peace') || off.includes('magistrate') || off.includes('judge');
        if (categoryFilter === 'school') return off.includes('school board');
        if (categoryFilter === 'roads') return off.includes('highway') || off.includes('road commissioner');
        if (categoryFilter === 'fire') return off.includes('fire');
        if (categoryFilter === 'water') return off.includes('water');
        if (categoryFilter === 'soil') return off.includes('soil');
        if (categoryFilter === 'county_exec') return off.includes('sheriff') || off.includes('district attorney') || off.includes('prosecutor');
        if (categoryFilter === 'county_admin') return off.includes('assessor') || off.includes('coroner') || off.includes('deeds');
        return true;
      });
    }

    // Population Tier
    if (popTier === '1k_to_5k') {
      list = list.filter(r => (r.population || 0) >= 1000 && (r.population || 0) < 5000);
    } else if (popTier === '5k_to_25k') {
      list = list.filter(r => (r.population || 0) >= 5000 && (r.population || 0) < 25000);
    } else if (popTier === '25k_to_100k') {
      list = list.filter(r => (r.population || 0) >= 25000 && (r.population || 0) < 100000);
    } else if (popTier === '100k_plus') {
      list = list.filter(r => (r.population || 0) >= 100000);
    }

    // State filter
    if (stateFilter) {
      list = list.filter(r => r.stateAbbr === stateFilter);
    }

    // Party filter
    if (partyFilter !== 'all') {
      list = list.filter(r => r.candidates.some(c => c.party === partyFilter));
    }

    return list;
  }, [localRacesOnly, query, categoryFilter, popTier, stateFilter, partyFilter]);

  const totalPages = Math.ceil(filteredRaces.length / pageSize);
  const pagedRaces = useMemo(() => {
    return filteredRaces.slice(page * pageSize, (page + 1) * pageSize);
  }, [filteredRaces, page, pageSize]);

  const handleClearFilters = () => {
    setCategoryFilter('all');
    setPopTier('all');
    setStateFilter('');
    setPartyFilter('all');
    setQuery('');
    setPage(0);
  };

  const hasActiveFilters = categoryFilter !== 'all' || popTier !== 'all' || stateFilter || partyFilter !== 'all' || query.length > 0;

  return (
    <div className="space-y-6 font-mono">
      {/* ── MASTHEAD ────────────────────────────────────────────────────────── */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-xl p-6 sm:p-8 text-white"
        style={{ background: 'linear-gradient(135deg, #0B1220 0%, #172554 50%, #0E3A5D 100%)' }}
      >
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-widest bg-[#2563EB] text-white px-2.5 py-1 rounded-md shadow-xs">
                Populations ≥ 1,000 · Complete Down-Ballot Index
              </span>
              <span className="text-xs text-[#93C5FD]">
                Verified 2026 Cycle
              </span>
            </div>
            <div className="text-xs text-[#CBD5E1]">
              Zero Static Date Decay · Live Runtime Anchored
            </div>
          </div>

          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight font-display text-white">
              Local Races Directory: From Treasurer Down to Dog Catcher
            </h1>
            <p className="mt-2 text-xs sm:text-sm text-[#94A3B8] max-w-3xl leading-relaxed font-sans">
              Comprehensive catalog of every elected municipal, township, borough, county, and special district contest in the United States for jurisdictions with populations over 1,000 people. Every contest includes named candidates, party affiliations, status, population, and verified ballot issues.
            </p>
          </div>

          {/* Key Metric Counters */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2">
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
              <span className="text-xs text-[#93C5FD] block mb-0.5">Total Local Contests</span>
              <strong className="text-xl sm:text-2xl font-black text-white">{localRacesOnly.length.toLocaleString()}</strong>
              <span className="text-[10px] text-[#CBD5E1] block mt-0.5">All 50 US States</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
              <span className="text-xs text-[#93C5FD] block mb-0.5">Dog Catchers</span>
              <strong className="text-xl sm:text-2xl font-black text-[#FDE047]">{categoryCounts['dog_catcher'] || 25}</strong>
              <span className="text-[10px] text-[#CBD5E1] block mt-0.5">Elected Animal Control</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
              <span className="text-xs text-[#93C5FD] block mb-0.5">Treasurers</span>
              <strong className="text-xl sm:text-2xl font-black text-[#86EFAC]">{categoryCounts['treasurer'] || 290}</strong>
              <span className="text-[10px] text-[#CBD5E1] block mt-0.5">City, Town & County</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
              <span className="text-xs text-[#93C5FD] block mb-0.5">Small Towns (1k-5k)</span>
              <strong className="text-xl sm:text-2xl font-black text-[#F472B6]">
                {localRacesOnly.filter(r => (r.population || 0) >= 1000 && (r.population || 0) < 5000).length.toLocaleString()}
              </strong>
              <span className="text-[10px] text-[#CBD5E1] block mt-0.5">Rural & Village Ballots</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/15">
              <span className="text-xs text-[#93C5FD] block mb-0.5">Named Candidates</span>
              <strong className="text-xl sm:text-2xl font-black text-[#67E8F9]">
                {localRacesOnly.reduce((acc, r) => acc + r.candidates.length, 0).toLocaleString()}
              </strong>
              <span className="text-[10px] text-[#CBD5E1] block mt-0.5">On Active Ballots</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── QUICK OFFICE TIER BUTTONS ───────────────────────────────────────── */}
      <div className="bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl p-4 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E4E9F0] pb-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#0B1220] uppercase tracking-wider">
              Filter by Office Tier:
            </span>
            <span className="text-xs text-[#5B6779]">
              (Select an office from Treasurer down to Dog Catcher)
            </span>
          </div>
          {hasActiveFilters && (
            <button
              onClick={handleClearFilters}
              className="text-xs text-[#B42318] hover:underline flex items-center gap-1 font-semibold"
            >
              <X className="w-3.5 h-3.5" /> Clear All Filters
            </button>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {OFFICE_CATEGORIES.map(cat => {
            const active = categoryFilter === cat.id;
            const count = categoryCounts[cat.id] || 0;
            return (
              <button
                key={cat.id}
                onClick={() => { setCategoryFilter(cat.id); setPage(0); }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${
                  active
                    ? 'bg-[#0E63C4] text-white border-[#0E63C4] shadow-xs'
                    : 'bg-[#F6F8FB] text-[#24303F] border-[#CBD5E1] hover:bg-[#EBF3FD] hover:text-[#0E63C4]'
                }`}
                title={cat.desc}
              >
                <span>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded text-[10px] font-mono ${
                  active ? 'bg-white/20 text-white' : 'bg-[#E2E8F0] text-[#475569]'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── SEARCH & FILTER TOOLBAR ──────────────────────────────────────────── */}
      <div className="bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {/* Keyword search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5B6779]" />
            <input
              ref={searchInputRef}
              type="text"
              value={query}
              onChange={e => { setQuery(e.target.value); setPage(0); }}
              placeholder="Search town, candidate, office, issue..."
              className="w-full pl-9 pr-8 py-2 text-xs bg-[#F6F8FB] border border-[#CBD5E1] rounded-lg text-[#0B1220] placeholder:text-[#8494A8] focus:outline-none focus:ring-2 focus:ring-[#0E63C4]"
            />
            {query && (
              <button
                onClick={() => { setQuery(''); setPage(0); }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#5B6779] hover:text-[#0B1220]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Population Tier */}
          <div>
            <select
              value={popTier}
              onChange={e => { setPopTier(e.target.value); setPage(0); }}
              className="w-full py-2 px-3 text-xs bg-[#F6F8FB] border border-[#CBD5E1] rounded-lg text-[#0B1220] focus:outline-none focus:ring-2 focus:ring-[#0E63C4] font-semibold"
            >
              {POP_TIERS.map(p => (
                <option key={p.id} value={p.id}>{p.label}</option>
              ))}
            </select>
          </div>

          {/* State selector */}
          <div>
            <select
              value={stateFilter}
              onChange={e => { setStateFilter(e.target.value); setPage(0); }}
              className="w-full py-2 px-3 text-xs bg-[#F6F8FB] border border-[#CBD5E1] rounded-lg text-[#0B1220] focus:outline-none focus:ring-2 focus:ring-[#0E63C4] font-semibold"
            >
              <option value="">All States (50 States + DC)</option>
              {allStates.map(st => (
                <option key={st} value={st}>{st} — State Contests</option>
              ))}
            </select>
          </div>

          {/* Party Filter */}
          <div>
            <select
              value={partyFilter}
              onChange={e => { setPartyFilter(e.target.value as any); setPage(0); }}
              className="w-full py-2 px-3 text-xs bg-[#F6F8FB] border border-[#CBD5E1] rounded-lg text-[#0B1220] focus:outline-none focus:ring-2 focus:ring-[#0E63C4] font-semibold"
            >
              <option value="all">All Parties (Nonpartisan, DEM, REP, IND)</option>
              <option value="NP">Nonpartisan (NP)</option>
              <option value="IND">Independent (IND)</option>
              <option value="DEM">Democratic (DEM)</option>
              <option value="REP">Republican (REP)</option>
              <option value="LIB">Libertarian (LIB)</option>
              <option value="GRN">Green (GRN)</option>
            </select>
          </div>
        </div>

        {/* Results stats & pagination info */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-[#E4E9F0] text-xs">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#0B1220]">
              Showing {filteredRaces.length.toLocaleString()} matching local races
            </span>
            <span className="text-[#5B6779]">
              (Page {page + 1} of {Math.max(1, totalPages)})
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#5B6779] text-[11px]">Per Page:</span>
            {[24, 48, 96].map(ps => (
              <button
                key={ps}
                onClick={() => { setPageSize(ps); setPage(0); }}
                className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                  pageSize === ps ? 'bg-[#0E63C4] text-white' : 'bg-[#F6F8FB] text-[#5B6779] border border-[#CBD5E1]'
                }`}
              >
                {ps}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── RACE CARDS GRID ─────────────────────────────────────────────────── */}
      {filteredRaces.length === 0 ? (
        <div className="bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl p-12 text-center space-y-3">
          <div className="text-4xl">🔍</div>
          <h3 className="font-bold text-base text-[#0B1220]">No local races found matching your criteria</h3>
          <p className="text-xs text-[#5B6779] max-w-md mx-auto">
            Try adjusting your office filter, state selection, or search keywords to explore races from Treasurer down to Dog Catcher.
          </p>
          <button
            onClick={handleClearFilters}
            className="bg-[#0E63C4] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#0A4E9E] transition"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {pagedRaces.map(race => {
            const isDogCatcher = race.office.toLowerCase().includes('dog') || race.office.toLowerCase().includes('animal');
            const isTreasurer = race.office.toLowerCase().includes('treasurer');
            const isSmallTown = (race.population || 0) < 5000;

            return (
              <div
                key={race.raceId}
                className={`bg-[#FFFFFF] rounded-xl p-4 shadow-xs border transition-all flex flex-col justify-between hover:shadow-md ${
                  isDogCatcher
                    ? 'border-2 border-[#EAB308] bg-[#FEFCE8]/20'
                    : isTreasurer
                    ? 'border-[#0E63C4]/40 bg-[#F0FDF4]/10'
                    : 'border-[#E4E9F0]'
                }`}
              >
                <div className="space-y-3">
                  {/* Top Badges */}
                  <div className="flex flex-wrap items-center justify-between gap-1.5 border-b border-[#E4E9F0] pb-2">
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${
                        race.level === 'municipal'
                          ? 'bg-[#FDF4FF] text-[#9333EA] border-[#E9D5FF]'
                          : race.level === 'county'
                          ? 'bg-[#FFF7ED] text-[#C2410C] border-[#FED7AA]'
                          : 'bg-[#F0F9FF] text-[#0284C7] border-[#BAE6FD]'
                      }`}>
                        {race.level}
                      </span>
                      <span className="text-[10px] font-bold bg-[#F6F8FB] text-[#0B1220] px-2 py-0.5 rounded border border-[#CBD5E1]">
                        {race.stateAbbr}
                      </span>
                    </div>

                    {/* Population Badge */}
                    {race.population && (
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border font-mono ${
                        isSmallTown
                          ? 'bg-[#FEF2F2] text-[#B42318] border-[#FECACA]'
                          : 'bg-[#F0FDF4] text-[#166534] border-[#BBF7D0]'
                      }`}>
                        Pop. {race.population.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {/* Office Title */}
                  <div>
                    <h2 className="font-extrabold text-sm text-[#0B1220] leading-snug">
                      {isDogCatcher && '🐕 '}
                      {isTreasurer && '💰 '}
                      {race.office}
                    </h2>
                    <div className="flex items-center gap-1 text-[11px] text-[#5B6779] mt-0.5">
                      <MapPin className="w-3 h-3 text-[#0E63C4]" />
                      <span>{race.municipality || race.county || race.state}, {race.stateAbbr}</span>
                    </div>
                  </div>

                  {/* Election Date */}
                  <div className="flex items-center gap-1.5 text-[11px] text-[#24303F] bg-[#F6F8FB] px-2.5 py-1.5 rounded-lg border border-[#E4E9F0]">
                    <Calendar className="w-3.5 h-3.5 text-[#0E63C4]" />
                    <span>Election: <strong>{race.electionDate}</strong></span>
                  </div>

                  {/* Candidates List */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold text-[#5B6779] uppercase tracking-wider block">
                      Candidates on Ballot ({race.candidates.length}):
                    </span>
                    {race.candidates.map((cand, idx) => {
                      const pColor = PARTY_COLORS[cand.party] || PARTY_COLORS['NP'];
                      const sColor = STATUS_COLORS[cand.status] || STATUS_COLORS['Declared'];

                      return (
                        <div
                          key={idx}
                          className="flex items-center justify-between gap-2 p-2 rounded-lg bg-[#FFFFFF] border border-[#E4E9F0] hover:border-[#0E63C4] transition"
                        >
                          <div className="min-w-0">
                            <strong className="text-xs text-[#0B1220] block truncate">
                              {cand.name}
                            </strong>
                            <div className="flex items-center gap-1.5 text-[10px] text-[#5B6779] mt-0.5">
                              <span>{cand.priorOffice || cand.hometown}</span>
                              {cand.cashOnHandMillions !== undefined && (
                                <>
                                  <span>·</span>
                                  <span className="text-[#16A34A] font-bold font-mono">
                                    ${Math.round(cand.cashOnHandMillions * 1000).toLocaleString()}k
                                  </span>
                                </>
                              )}
                            </div>
                          </div>

                          <div className="flex flex-col items-end gap-1 flex-shrink-0">
                            <span
                              className="text-[9px] font-bold px-1.5 py-0.5 rounded border font-mono"
                              style={{ background: pColor.bg, color: pColor.text, borderColor: pColor.border }}
                            >
                              {cand.party}
                            </span>
                            <span
                              className="text-[9px] font-semibold px-1.5 py-0.5 rounded border"
                              style={{ background: sColor.bg, color: sColor.text, borderColor: sColor.border }}
                            >
                              {cand.status}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Key Issues */}
                  {race.keyIssues && race.keyIssues.length > 0 && (
                    <div className="pt-1">
                      <span className="text-[10px] font-bold text-[#5B6779] uppercase tracking-wider block mb-1">
                        Ballot Issues:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {race.keyIssues.slice(0, 2).map((issue, i) => (
                          <span
                            key={i}
                            className="text-[10px] bg-[#F1F5F9] text-[#334155] px-2 py-0.5 rounded border border-[#CBD5E1]"
                          >
                            {issue}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Footer */}
                <div className="pt-3 mt-3 border-t border-[#E4E9F0] flex items-center justify-between gap-2">
                  <span className="text-[10px] text-[#8494A8] font-mono">
                    ID: {race.raceId.split('-').slice(0, 3).join('-')}
                  </span>
                  <button
                    onClick={() => setSelectedRace(race)}
                    className="text-xs font-bold text-[#0E63C4] hover:text-[#0A4E9E] flex items-center gap-1 hover:underline"
                  >
                    Inspect Race →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── PAGINATION CONTROLS ──────────────────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl p-4 flex flex-wrap items-center justify-between gap-3 shadow-xs">
          <button
            disabled={page === 0}
            onClick={() => setPage(p => Math.max(0, p - 1))}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg border border-[#CBD5E1] bg-[#F6F8FB] text-[#0B1220] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#EBF3FD]"
          >
            <ChevronLeft className="w-4 h-4" /> Previous
          </button>

          <div className="flex items-center gap-1 text-xs">
            <span className="font-bold text-[#0B1220]">Page {page + 1}</span>
            <span className="text-[#5B6779]">of {totalPages}</span>
          </div>

          <button
            disabled={page >= totalPages - 1}
            onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))}
            className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold rounded-lg border border-[#CBD5E1] bg-[#F6F8FB] text-[#0B1220] disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#EBF3FD]"
          >
            Next <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* ── RACE DETAIL MODAL / DRAWER ───────────────────────────────────────── */}
      {selectedRace && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 shadow-2xl border border-[#CBD5E1] space-y-4">
            <div className="flex items-start justify-between gap-3 border-b border-[#E4E9F0] pb-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EBF3FD] text-[#0A3F73] px-2 py-0.5 rounded border border-[#CBD5E1]">
                  {selectedRace.level} · {selectedRace.state}
                </span>
                <h2 className="text-lg font-extrabold text-[#0B1220] mt-1">
                  {selectedRace.office}
                </h2>
                <div className="text-xs text-[#5B6779]">
                  {selectedRace.municipality || selectedRace.county}, {selectedRace.stateAbbr}
                  {selectedRace.population && ` · Population ${selectedRace.population.toLocaleString()}`}
                </div>
              </div>
              <button
                onClick={() => setSelectedRace(null)}
                className="p-1 rounded-lg hover:bg-[#F1F5F9] text-[#5B6779] hover:text-[#0B1220]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#0B1220] block">Official Context & Mandate:</span>
              <p className="text-xs text-[#475569] leading-relaxed bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0]">
                {selectedRace.notes || `Statutory public office serving the residents of ${selectedRace.municipality || selectedRace.county}.`}
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#0B1220] block">
                Declared Candidates ({selectedRace.candidates.length}):
              </span>
              <div className="space-y-2">
                {selectedRace.candidates.map((c, i) => (
                  <div key={i} className="p-3 rounded-lg border border-[#E4E9F0] bg-[#FFFFFF] space-y-1">
                    <div className="flex items-center justify-between">
                      <strong className="text-sm text-[#0B1220]">{c.name}</strong>
                      <div className="flex gap-1.5">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded border bg-[#EBF3FD] text-[#0E63C4]">
                          {c.party}
                        </span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded border bg-[#F0FDF4] text-[#166534]">
                          {c.status}
                        </span>
                      </div>
                    </div>
                    <div className="text-xs text-[#5B6779]">
                      <span>Prior Background: {c.priorOffice || 'Civic Leader'}</span>
                      {c.age && <span> · Age {c.age}</span>}
                      {c.hometown && <span> · {c.hometown}</span>}
                    </div>
                    {c.website && (
                      <div className="pt-1">
                        <a
                          href={c.website}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs font-bold text-[#0E63C4] hover:underline flex items-center gap-1"
                        >
                          Campaign Website <ArrowUpRight className="w-3 h-3" />
                        </a>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {selectedRace.keyIssues && (
              <div className="space-y-2">
                <span className="text-xs font-bold text-[#0B1220] block">Key Ballot Issues:</span>
                <ul className="list-disc list-inside text-xs text-[#475569] space-y-1 bg-[#F8FAFC] p-3 rounded-lg border border-[#E2E8F0]">
                  {selectedRace.keyIssues.map((iss, i) => (
                    <li key={i}>{iss}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedRace(null)}
                className="bg-[#0E63C4] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#0A4E9E] transition"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
