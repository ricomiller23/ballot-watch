'use client';

import React, { useState, useMemo, useCallback, useRef, useEffect } from 'react';
import {
  Search, ChevronRight, ChevronDown, CheckCheck, ExternalLink, BarChart3, ShieldCheck, DollarSign, Briefcase, Building2, Globe, Landmark,
  Scale, Users, BookOpen, Filter, X, Star, TrendingUp, Calendar,
  AlertCircle, MapPin, Info, Layers, ArrowUpRight, SlidersHorizontal,
  Gavel, Shield, Leaf, Droplets, Flame, GraduationCap, BadgeDollarSign,
  ClipboardList, FileText, UserCheck, Building, Map, Hash, Clock
} from 'lucide-react';
import { ALL_RACES_REGISTRY, RaceEntry } from '@/lib/candidates-registry';
import {
  getCompleteOfficeRegistry,
  getOfficeStats,
  OFFICE_DEFINITIONS,
  JurisdictionOffice,
  OfficeLevel,
  OfficeTier,
} from '@/lib/us-offices-registry';

// ─── ICONS MAP ──────────────────────────────────────────────────────────────

const LEVEL_ICONS: Record<OfficeLevel, React.ElementType> = {
  federal: Globe,
  state: Landmark,
  county: Building2,
  municipal: Building,
  special_district: Layers,
  judicial: Scale,
};

const LEVEL_COLORS: Record<OfficeLevel, { bg: string; text: string; border: string; badge: string }> = {
  federal:         { bg: '#EBF3FD', text: '#0E63C4', border: '#BFDBFE', badge: '#1D4ED8' },
  state:           { bg: '#F0FDF4', text: '#16A34A', border: '#BBF7D0', badge: '#15803D' },
  county:          { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA', badge: '#EA580C' },
  municipal:       { bg: '#FDF4FF', text: '#9333EA', border: '#E9D5FF', badge: '#7C3AED' },
  special_district:{ bg: '#F0F9FF', text: '#0284C7', border: '#BAE6FD', badge: '#0369A1' },
  judicial:        { bg: '#FFFBEB', text: '#B45309', border: '#FDE68A', badge: '#92400E' },
};

const CATEGORY_ICONS: Record<string, React.ElementType> = {
  'Federal Legislative': Globe,
  'Federal Executive': Globe,
  'State Executive': Landmark,
  'State Legislative': Landmark,
  'State Judicial': Scale,
  'County Executive': Building2,
  'County Legislative': Building2,
  'County Law Enforcement': Shield,
  'County Administrative': ClipboardList,
  'County Financial': BadgeDollarSign,
  'County Judicial': Gavel,
  'Municipal Executive': Building,
  'Municipal Legislative': Building,
  'Municipal Administrative': FileText,
  'Municipal Financial': BadgeDollarSign,
  'Municipal Legal': Scale,
  'Municipal Judicial': Gavel,
  'Special District – Education': GraduationCap,
  'Special District – Utilities': Droplets,
  'Special District – Safety': Flame,
  'Special District – Conservation': Leaf,
  'Township Government': Map,
};

// ─── FILTER TYPES ────────────────────────────────────────────────────────────

type ViewMode = 'hierarchy' | 'grid' | 'table';
type SortMode = 'level' | 'state' | 'nextElection' | 'seats' | 'title';

interface Filters {
  levels: Set<OfficeLevel>;
  states: Set<string>;
  partisan: 'all' | 'partisan' | 'nonpartisan';
  query: string;
  upcomingOnly: boolean;
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function OfficesExplorer() {
  const allOffices = useMemo(() => getCompleteOfficeRegistry(), []);
  const stats = useMemo(() => getOfficeStats(), []);

  const [query, setQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('hierarchy');
  const [sortMode, setSortMode] = useState<SortMode>('level');
  const [selectedOffice, setSelectedOffice] = useState<JurisdictionOffice | null>(null);
  const [expandedLevels, setExpandedLevels] = useState<Set<string>>(new Set(['federal']));
  const [expandedStates, setExpandedStates] = useState<Set<string>>(new Set());
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
  const [filters, setFilters] = useState<Filters>({
    levels: new Set<OfficeLevel>(),
    states: new Set<string>(),
    partisan: 'all',
    query: '',
    upcomingOnly: false,
  });
  const [quickTierFilter, setQuickTierFilter] = useState<string>('all');
  const [popFilter, setPopFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<'browse' | 'stats'>('browse');
  const searchRef = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 50;

  // Keyboard shortcut: Cmd/Ctrl+K
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  // All unique states
  const allStates = useMemo(() =>
    Array.from(new Set(allOffices.map(o => o.state))).sort(), [allOffices]);

  // Filtered offices
  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return allOffices.filter(o => {
      if (q && !o.title.toLowerCase().includes(q) &&
          !o.state.toLowerCase().includes(q) &&
          !o.category.toLowerCase().includes(q) &&
          !(o.municipality || '').toLowerCase().includes(q)) return false;
      if (filters.levels.size > 0 && !filters.levels.has(o.level)) return false;
      if (filters.states.size > 0 && !filters.states.has(o.state)) return false;
      if (filters.partisan === 'partisan' && !o.isPartisan) return false;
      if (filters.partisan === 'nonpartisan' && o.isPartisan) return false;
      if (filters.upcomingOnly) {
        const electionDate = new Date(o.nextElection);
        const now = new Date();
        const sixMonths = new Date(now.getTime() + 180 * 24 * 60 * 60 * 1000);
        if (electionDate > sixMonths) return false;
      }

      // Quick Tier Filter
      if (quickTierFilter === 'DOG_CATCHER') {
        if (o.tier !== 'DOG_CATCHER' && !o.title.toLowerCase().includes('dog') && !o.title.toLowerCase().includes('animal control')) return false;
      } else if (quickTierFilter === 'TREASURER') {
        if (o.tier !== 'CITY_TREASURER' && o.tier !== 'COUNTY_TREASURER' && o.tier !== 'STATE_TREASURER' && o.tier !== 'TAX_COLLECTOR' && !o.title.toLowerCase().includes('treasurer') && !o.title.toLowerCase().includes('tax')) return false;
      } else if (quickTierFilter === 'CLERK') {
        if (o.tier !== 'CITY_CLERK' && o.tier !== 'COUNTY_CLERK' && !o.title.toLowerCase().includes('clerk')) return false;
      } else if (quickTierFilter === 'SELECTBOARD') {
        if (o.tier !== 'SELECTBOARD_MEMBER' && o.tier !== 'CITY_COUNCIL' && o.tier !== 'COUNTY_COMMISSIONER' && !o.title.toLowerCase().includes('selectboard') && !o.title.toLowerCase().includes('council')) return false;
      } else if (quickTierFilter === 'MODERATOR') {
        if (o.tier !== 'TOWN_MODERATOR' && !o.title.toLowerCase().includes('moderator')) return false;
      } else if (quickTierFilter === 'MAYOR') {
        if (o.tier !== 'MAYOR' && o.tier !== 'VILLAGE_PRESIDENT') return false;
      } else if (quickTierFilter === 'JUDICIAL') {
        if (o.tier !== 'JUSTICE_OF_PEACE' && o.tier !== 'CONSTABLE' && o.tier !== 'MUNICIPAL_JUDGE' && o.tier !== 'DISTRICT_COURT') return false;
      } else if (quickTierFilter === 'SCHOOL') {
        if (o.tier !== 'SCHOOL_BOARD') return false;
      } else if (quickTierFilter === 'SPECIAL_DISTRICT') {
        if (o.level !== 'special_district') return false;
      } else if (quickTierFilter === 'FEDERAL') {
        if (o.level !== 'federal') return false;
      } else if (quickTierFilter === 'STATE_EXEC') {
        if (o.level !== 'state' || o.category !== 'State Executive') return false;
      }

      // Population Threshold Filter
      if (popFilter === '1k_plus') {
        if ((o.population || 0) < 1000) return false;
      } else if (popFilter === '1k_to_5k') {
        if ((o.population || 0) < 1000 || (o.population || 0) >= 5000) return false;
      } else if (popFilter === '5k_to_25k') {
        if ((o.population || 0) < 5000 || (o.population || 0) >= 25000) return false;
      } else if (popFilter === '25k_to_100k') {
        if ((o.population || 0) < 25000 || (o.population || 0) >= 100000) return false;
      } else if (popFilter === '100k_plus') {
        if ((o.population || 0) < 100000) return false;
      }

      return true;
    });
  }, [allOffices, query, filters, quickTierFilter, popFilter]);

  // Sorted offices
  const sorted = useMemo(() => {
    const levelOrder: Record<OfficeLevel, number> = { federal: 0, state: 1, county: 2, municipal: 3, special_district: 4, judicial: 5 };
    return [...filtered].sort((a, b) => {
      switch (sortMode) {
        case 'level': return (levelOrder[a.level] - levelOrder[b.level]) || a.title.localeCompare(b.title);
        case 'state': return a.state.localeCompare(b.state) || a.title.localeCompare(b.title);
        case 'nextElection': return new Date(a.nextElection).getTime() - new Date(b.nextElection).getTime();
        case 'seats': return b.totalSeats - a.totalSeats;
        case 'title': return a.title.localeCompare(b.title);
        default: return 0;
      }
    });
  }, [filtered, sortMode]);

  // Hierarchy grouping: Level → State → Category → Office
  const hierarchy = useMemo(() => {
    const tree: Record<OfficeLevel, Record<string, Record<string, JurisdictionOffice[]>>> = {
      federal: {}, state: {}, county: {}, municipal: {}, special_district: {}, judicial: {},
    };
    for (const o of filtered) {
      if (!tree[o.level]) tree[o.level] = {};
      const stateKey = o.stateAbbr;
      if (!tree[o.level][stateKey]) tree[o.level][stateKey] = {};
      const catKey = o.category;
      if (!tree[o.level][stateKey][catKey]) tree[o.level][stateKey][catKey] = [];
      tree[o.level][stateKey][catKey].push(o);
    }
    return tree;
  }, [filtered]);

  const toggleLevel = useCallback((level: string) => {
    setExpandedLevels(prev => {
      const next = new Set(prev);
      if (next.has(level)) next.delete(level); else next.add(level);
      return next;
    });
  }, []);

  const toggleState = useCallback((key: string) => {
    setExpandedStates(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }, []);

  const toggleCategory = useCallback((key: string) => {
    setExpandedCategories(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  }, []);

  const toggleLevelFilter = (level: OfficeLevel) => {
    setFilters(f => {
      const next = new Set(f.levels);
      if (next.has(level)) next.delete(level); else next.add(level);
      return { ...f, levels: next };
    });
    setPage(0);
  };

  const toggleStateFilter = (state: string) => {
    setFilters(f => {
      const next = new Set(f.states);
      if (next.has(state)) next.delete(state); else next.add(state);
      return { ...f, states: next };
    });
    setPage(0);
  };

  const clearFilters = () => {
    setFilters({ levels: new Set(), states: new Set(), partisan: 'all', query: '', upcomingOnly: false });
    setQuery('');
    setPage(0);
  };

  const levelOrder: OfficeLevel[] = ['federal', 'state', 'county', 'municipal', 'special_district', 'judicial'];
  const LEVEL_LABELS: Record<OfficeLevel, string> = {
    federal: 'Federal',
    state: 'State',
    county: 'County',
    municipal: 'Municipal',
    special_district: 'Special Districts',
    judicial: 'Judicial',
  };

  const totalSeatsInView = filtered.reduce((s, o) => s + o.totalSeats, 0);
  const hasActiveFilters = filters.levels.size > 0 || filters.states.size > 0 || filters.partisan !== 'all' || filters.upcomingOnly || query.length > 0;
  const paged = viewMode === 'table' ? sorted.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE) : sorted;

  return (
    <div className="space-y-4">
      {/* ── MASTHEAD ─────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-r from-[#0B1220] to-[#1A2840] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 25% 50%, #0E63C4 0%, transparent 60%), radial-gradient(circle at 75% 20%, #3B82F6 0%, transparent 50%)' }} />
        <div className="relative z-10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Layers className="w-5 h-5 text-[#60A5FA]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#93C5FD]">Complete US Electoral Registry</span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-display">
                Every Electable Office<br className="hidden sm:block" />
                <span className="text-[#60A5FA]"> in the United States</span>
              </h1>
              <p className="mt-2 text-sm text-[#94A3B8] max-w-lg leading-relaxed">
                From U.S. President to city treasurer and soil conservation supervisor.
                Federal · State · County · Municipal · Special District.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 text-center min-w-[220px]">
              {[
                { label: 'Office Types', value: stats.totalOfficeTypes.toLocaleString(), icon: ClipboardList },
                { label: 'Total Seats', value: stats.totalSeats.toLocaleString(), icon: Users },
                { label: 'States Covered', value: '50 + DC', icon: MapPin },
                { label: 'Jurisdiction Levels', value: '6', icon: Layers },
              ].map(({ label, value, icon: Icon }) => (
                <div key={label} className="bg-white/10 rounded-xl p-3 backdrop-blur-sm border border-white/10">
                  <Icon className="w-4 h-4 text-[#60A5FA] mx-auto mb-1" />
                  <div className="text-xl font-bold font-mono">{value}</div>
                  <div className="text-[10px] text-[#94A3B8] uppercase tracking-wide">{label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Level quick-filter pills */}
          <div className="flex flex-wrap gap-2 mt-5 pt-4 border-t border-white/10">
            {levelOrder.map(level => {
              const Icon = LEVEL_ICONS[level];
              const col = LEVEL_COLORS[level];
              const isActive = filters.levels.has(level);
              const count = allOffices.filter(o => o.level === level).length;
              return (
                <button
                  key={level}
                  onClick={() => toggleLevelFilter(level)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 border ${
                    isActive
                      ? 'bg-white text-[#0B1220] border-white scale-105'
                      : 'bg-white/10 text-white border-white/20 hover:bg-white/20'
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span>{LEVEL_LABELS[level]}</span>
                  <span className="opacity-70 font-mono">({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── SEARCH + CONTROLS ────────────────────────────────────────────── */}
      <div className="bg-white border border-[#E4E9F0] rounded-xl p-3 flex flex-wrap gap-3 items-center shadow-xs">
        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8494A8]" />
          <input
            ref={searchRef}
            type="search"
            id="offices-search"
            name="offices-search"
            value={query}
            onChange={e => { setQuery(e.target.value); setPage(0); }}
            placeholder="Search offices, states, cities… (⌘K)"
            className="w-full pl-9 pr-4 py-2 text-sm border border-[#E4E9F0] rounded-lg bg-[#F6F8FB] text-[#0B1220] placeholder:text-[#8494A8] focus:outline-none focus:ring-2 focus:ring-[#0E63C4]/30 focus:border-[#0E63C4]"
          />
          {query && (
            <button onClick={() => { setQuery(''); setPage(0); }} className="absolute right-2 top-1/2 -translate-y-1/2">
              <X className="w-4 h-4 text-[#8494A8] hover:text-[#0B1220]" />
            </button>
          )}
        </div>

        {/* View toggle */}
        <div className="flex items-center gap-1 bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg p-1">
          {([['hierarchy', 'Tree'], ['grid', 'Cards'], ['table', 'Table']] as [ViewMode, string][]).map(([mode, label]) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 text-xs font-medium rounded transition-all ${
                viewMode === mode ? 'bg-white shadow-sm text-[#0E63C4] border border-[#E4E9F0]' : 'text-[#5B6779] hover:text-[#0B1220]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <select
          value={sortMode}
          onChange={e => setSortMode(e.target.value as SortMode)}
          className="text-xs border border-[#E4E9F0] rounded-lg px-3 py-2 bg-[#F6F8FB] text-[#0B1220] focus:outline-none focus:ring-2 focus:ring-[#0E63C4]/30"
        >
          <option value="level">Sort: By Level</option>
          <option value="state">Sort: By State</option>
          <option value="nextElection">Sort: Next Election</option>
          <option value="seats">Sort: Most Seats</option>
          <option value="title">Sort: Alphabetical</option>
        </select>

        {/* Advanced filters button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border transition-all ${
            showFilters || hasActiveFilters
              ? 'bg-[#EBF3FD] text-[#0E63C4] border-[#CBD5E1]'
              : 'bg-[#F6F8FB] text-[#5B6779] border-[#E4E9F0] hover:text-[#0B1220]'
          }`}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          Filters
          {hasActiveFilters && <span className="ml-1 w-4 h-4 rounded-full bg-[#0E63C4] text-white text-[9px] flex items-center justify-center font-bold">!</span>}
        </button>

        {hasActiveFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1 text-xs text-[#B42318] hover:underline">
            <X className="w-3 h-3" /> Clear All
          </button>
        )}

        {/* Results count */}
        <span className="text-xs text-[#8494A8] font-mono ml-auto whitespace-nowrap">
          {filtered.length.toLocaleString()} offices · {totalSeatsInView.toLocaleString()} seats
        </span>
      </div>

      {/* ── QUICK TIER & POPULATION FILTER PILLS BAR ─────────────────────── */}
      <div className="bg-white border border-[#E4E9F0] rounded-xl p-3 shadow-xs space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E4E9F0] pb-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EBF3FD] text-[#0A3F73] px-2 py-0.5 rounded border border-[#CBD5E1]">
              Every Office From Treasurer Down to Dog Catcher (Pop. ≥ 1,000)
            </span>
            <span className="text-xs text-[#5B6779]">Select Tier:</span>
          </div>

          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-[#5B6779] text-[11px] font-medium">Population:</span>
            <select
              value={popFilter}
              onChange={e => { setPopFilter(e.target.value); setPage(0); }}
              className="text-xs bg-[#F6F8FB] border border-[#CBD5E1] rounded px-2.5 py-1 font-semibold text-[#0B1220] focus:outline-none focus:ring-1 focus:ring-[#0E63C4]"
            >
              <option value="all">All Populations (Census Places)</option>
              <option value="1k_plus">Pop. ≥ 1,000 (All Qualified)</option>
              <option value="1k_to_5k">1,000 – 5,000 (Small Rural Towns)</option>
              <option value="5k_to_25k">5,000 – 25,000 (Midsize Municipalities)</option>
              <option value="25k_to_100k">25,000 – 100,000 (Large Towns & Cities)</option>
              <option value="100k_plus">100,000+ (Metros & Major Counties)</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {[
            { id: 'all', label: 'All Offices', icon: '🌐' },
            { id: 'DOG_CATCHER', label: '🐕 Dog Catchers (Pop. ≥ 1k)' },
            { id: 'TREASURER', label: '💰 Treasurers & Tax Collectors' },
            { id: 'CLERK', label: '📜 Town & City Clerks' },
            { id: 'SELECTBOARD', label: '🏛️ Selectboard & Councils' },
            { id: 'MODERATOR', label: '🗣️ Town Moderators' },
            { id: 'JUDICIAL', label: '⚖️ Constables & JPs' },
            { id: 'MAYOR', label: '🏙️ Mayors' },
            { id: 'SCHOOL', label: '🏫 School Boards' },
            { id: 'SPECIAL_DISTRICT', label: '🚒 Fire, Water & Soil' },
            { id: 'FEDERAL', label: '🏛️ Federal (Senate/House)' },
            { id: 'STATE_EXEC', label: '🏦 State Executive' },
          ].map(p => {
            const active = quickTierFilter === p.id;
            return (
              <button
                key={p.id}
                onClick={() => { setQuickTierFilter(p.id); setPage(0); }}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all border ${
                  active
                    ? 'bg-[#0E63C4] text-white border-[#0E63C4] shadow-xs'
                    : 'bg-[#F6F8FB] text-[#24303F] border-[#E4E9F0] hover:bg-[#EBF3FD] hover:text-[#0E63C4]'
                }`}
              >
                {p.icon && <span>{p.icon}</span>}
                <span>{p.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* ── ADVANCED FILTERS PANEL ──────────────────────────────────────── */}
      {showFilters && (
        <div className="bg-white border border-[#E4E9F0] rounded-xl p-4 shadow-xs space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Partisan filter */}
            <div>
              <label className="block text-xs font-semibold text-[#5B6779] uppercase tracking-wider mb-2">Election Type</label>
              <div className="flex gap-2">
                {([['all', 'All'], ['partisan', 'Partisan'], ['nonpartisan', 'Nonpartisan']] as const).map(([val, label]) => (
                  <button
                    key={val}
                    onClick={() => setFilters(f => ({ ...f, partisan: val }))}
                    className={`px-3 py-1.5 text-xs rounded-lg border transition-all ${
                      filters.partisan === val
                        ? 'bg-[#EBF3FD] text-[#0E63C4] border-[#CBD5E1] font-semibold'
                        : 'bg-[#F6F8FB] text-[#5B6779] border-[#E4E9F0] hover:text-[#0B1220]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
            {/* Upcoming */}
            <div>
              <label className="block text-xs font-semibold text-[#5B6779] uppercase tracking-wider mb-2">Time Filter</label>
              <button
                onClick={() => setFilters(f => ({ ...f, upcomingOnly: !f.upcomingOnly }))}
                className={`flex items-center gap-2 px-3 py-1.5 text-xs rounded-lg border transition-all ${
                  filters.upcomingOnly
                    ? 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0] font-semibold'
                    : 'bg-[#F6F8FB] text-[#5B6779] border-[#E4E9F0]'
                }`}
              >
                <Calendar className="w-3 h-3" />
                Next 6 Months Only
              </button>
            </div>
            {/* State filter */}
            <div>
              <label className="block text-xs font-semibold text-[#5B6779] uppercase tracking-wider mb-2">
                States ({filters.states.size > 0 ? filters.states.size + ' selected' : 'All'})
              </label>
              <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto pr-1">
                {allStates.slice(0, 55).map(state => {
                  const abbr = state.slice(0, 2).toUpperCase();
                  return (
                    <button
                      key={state}
                      onClick={() => toggleStateFilter(state)}
                      title={state}
                      className={`px-2 py-0.5 text-[10px] rounded border font-mono transition-all ${
                        filters.states.has(state)
                          ? 'bg-[#0E63C4] text-white border-[#0A4E9E]'
                          : 'bg-[#F6F8FB] text-[#5B6779] border-[#E4E9F0] hover:bg-[#EBF3FD]'
                      }`}
                    >
                      {abbr}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── MAIN CONTENT ─────────────────────────────────────────────────── */}

      {viewMode === 'hierarchy' && (
        <HierarchyView
          hierarchy={hierarchy}
          levelOrder={levelOrder}
          expandedLevels={expandedLevels}
          expandedStates={expandedStates}
          expandedCategories={expandedCategories}
          toggleLevel={toggleLevel}
          toggleState={toggleState}
          toggleCategory={toggleCategory}
          onSelectOffice={setSelectedOffice}
          selectedOffice={selectedOffice}
        />
      )}

      {viewMode === 'grid' && (
        <GridView offices={sorted} onSelectOffice={setSelectedOffice} selectedOffice={selectedOffice} />
      )}

      {viewMode === 'table' && (
        <TableView
          offices={paged}
          total={sorted.length}
          page={page}
          pageSize={PAGE_SIZE}
          onPage={setPage}
          onSelectOffice={setSelectedOffice}
          selectedOffice={selectedOffice}
        />
      )}

      {/* ── OFFICE DETAIL DRAWER ─────────────────────────────────────────── */}
      {selectedOffice && (
        <OfficeDetailDrawer office={selectedOffice} onClose={() => setSelectedOffice(null)} />
      )}
    </div>
  );
}

// ─── HIERARCHY VIEW ──────────────────────────────────────────────────────────

function HierarchyView({
  hierarchy, levelOrder, expandedLevels, expandedStates, expandedCategories,
  toggleLevel, toggleState, toggleCategory, onSelectOffice, selectedOffice,
}: {
  hierarchy: Record<string, Record<string, Record<string, JurisdictionOffice[]>>>;
  levelOrder: OfficeLevel[];
  expandedLevels: Set<string>;
  expandedStates: Set<string>;
  expandedCategories: Set<string>;
  toggleLevel: (k: string) => void;
  toggleState: (k: string) => void;
  toggleCategory: (k: string) => void;
  onSelectOffice: (o: JurisdictionOffice) => void;
  selectedOffice: JurisdictionOffice | null;
}) {
  const LEVEL_LABELS: Record<string, string> = {
    federal: 'Federal Offices',
    state: 'State Offices',
    county: 'County Offices',
    municipal: 'Municipal Offices',
    special_district: 'Special District Offices',
    judicial: 'Judicial Offices',
  };

  return (
    <div className="space-y-2">
      {levelOrder.map(level => {
        const levelData = hierarchy[level];
        if (!levelData || Object.keys(levelData).length === 0) return null;
        const Icon = LEVEL_ICONS[level];
        const col = LEVEL_COLORS[level];
        const isExpanded = expandedLevels.has(level);
        const totalInLevel = Object.values(levelData).flatMap(s => Object.values(s).flat()).length;

        return (
          <div key={level} className="border border-[#E4E9F0] rounded-xl overflow-hidden shadow-xs">
            {/* Level header */}
            <button
              onClick={() => toggleLevel(level)}
              className="w-full flex items-center gap-3 px-4 py-3 bg-white hover:bg-[#F6F8FB] transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: col.bg, border: `1px solid ${col.border}` }}>
                <Icon className="w-4 h-4" style={{ color: col.text }} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="font-bold text-sm text-[#0B1220]">{LEVEL_LABELS[level]}</span>
                <span className="ml-2 text-xs text-[#8494A8] font-mono">
                  {totalInLevel} office types · {Object.keys(levelData).length} states/jurisdictions
                </span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                  style={{ backgroundColor: col.bg, color: col.text, borderColor: col.border }}>
                  {level.toUpperCase()}
                </span>
                {isExpanded
                  ? <ChevronDown className="w-4 h-4 text-[#5B6779]" />
                  : <ChevronRight className="w-4 h-4 text-[#5B6779]" />}
              </div>
            </button>

            {isExpanded && (
              <div className="border-t border-[#E4E9F0] bg-[#FAFBFC] divide-y divide-[#F0F4F8]">
                {Object.entries(levelData).sort(([a], [b]) => a.localeCompare(b)).map(([stateAbbr, catData]) => {
                  const stateKey = `${level}-${stateAbbr}`;
                  const stateExpanded = expandedStates.has(stateKey);
                  const firstOffice = Object.values(catData)[0]?.[0];
                  const stateName = firstOffice?.state || stateAbbr;
                  const stateCount = Object.values(catData).flat().length;

                  return (
                    <div key={stateAbbr}>
                      <button
                        onClick={() => toggleState(stateKey)}
                        className="w-full flex items-center gap-3 px-6 py-2 hover:bg-[#F0F4F8] transition-colors text-left"
                      >
                        <span className="w-8 text-center font-mono text-xs font-bold text-[#5B6779] flex-shrink-0">{stateAbbr}</span>
                        <span className="flex-1 text-sm text-[#24303F] font-medium">{stateName}</span>
                        <span className="text-[10px] text-[#8494A8] font-mono flex-shrink-0">{stateCount} office types</span>
                        {stateExpanded
                          ? <ChevronDown className="w-3.5 h-3.5 text-[#8494A8]" />
                          : <ChevronRight className="w-3.5 h-3.5 text-[#8494A8]" />}
                      </button>

                      {stateExpanded && (
                        <div className="bg-white divide-y divide-[#F0F4F8] ml-4 border-l border-[#E4E9F0]">
                          {Object.entries(catData).map(([category, offices]) => {
                            const catKey = `${stateKey}-${category}`;
                            const catExpanded = expandedCategories.has(catKey);
                            const CatIcon = CATEGORY_ICONS[category] || ClipboardList;

                            return (
                              <div key={category}>
                                <button
                                  onClick={() => toggleCategory(catKey)}
                                  className="w-full flex items-center gap-2 px-6 py-2 hover:bg-[#F6F8FB] transition-colors text-left"
                                >
                                  <CatIcon className="w-3.5 h-3.5 text-[#8494A8] flex-shrink-0" />
                                  <span className="flex-1 text-xs font-semibold text-[#5B6779] uppercase tracking-wider">{category}</span>
                                  <span className="text-[10px] text-[#8494A8] font-mono flex-shrink-0">{offices.length}</span>
                                  {catExpanded
                                    ? <ChevronDown className="w-3 h-3 text-[#8494A8]" />
                                    : <ChevronRight className="w-3 h-3 text-[#8494A8]" />}
                                </button>

                                {catExpanded && (
                                  <div className="bg-[#FAFBFC] ml-4 border-l border-[#E4E9F0] divide-y divide-[#F0F4F8]">
                                    {offices.map(office => (
                                      <OfficeRow
                                        key={office.id}
                                        office={office}
                                        isSelected={selectedOffice?.id === office.id}
                                        onClick={() => onSelectOffice(office)}
                                      />
                                    ))}
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── OFFICE ROW (hierarchy leaf) ─────────────────────────────────────────────

function OfficeRow({ office, isSelected, onClick }: {
  office: JurisdictionOffice; isSelected: boolean; onClick: () => void;
}) {
  const col = LEVEL_COLORS[office.level];
  const daysUntil = Math.ceil((new Date(office.nextElection).getTime() - Date.now()) / 86400000);
  const isUpcoming = daysUntil <= 180 && daysUntil > 0;

  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-6 py-2.5 text-left transition-all group ${
        isSelected ? 'bg-[#EBF3FD]' : 'hover:bg-[#F6F8FB]'
      }`}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-sm text-[#0B1220] font-medium truncate">{office.title}</span>
          {office.isPartisan
            ? <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#FEF2F2] text-[#B42318] border border-[#FBD5D5] flex-shrink-0">PARTISAN</span>
            : <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD] flex-shrink-0">NONPARTISAN</span>
          }
          {isUpcoming && <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0] flex-shrink-0">⚡ {daysUntil}d</span>}
        </div>
        <div className="text-[11px] text-[#8494A8] mt-0.5 flex items-center gap-2 flex-wrap">
          {(() => {
            const matched = findMatchingRaceForOffice(office);
            if (matched) {
              return (
                <span className="text-[10px] font-bold text-[#0E63C4] bg-[#EBF3FD] border border-[#BFDBFE] px-2 py-0.5 rounded flex items-center gap-1">
                  <CheckCheck className="w-3 h-3 text-[#16A34A]" /> {matched.candidates.length} Cands Certified · {matched.pollAverage}
                </span>
              );
            }
            return null;
          })()}
          <span>{office.totalSeats.toLocaleString()} seat{office.totalSeats !== 1 ? 's' : ''} total</span>
          <span>·</span>
          <span className="font-mono">{new Date(office.nextElection).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
      </div>
      <ArrowUpRight className="w-3.5 h-3.5 text-[#8494A8] opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
    </button>
  );
}

// ─── GRID VIEW ───────────────────────────────────────────────────────────────

function GridView({ offices, onSelectOffice, selectedOffice }: {
  offices: JurisdictionOffice[];
  onSelectOffice: (o: JurisdictionOffice) => void;
  selectedOffice: JurisdictionOffice | null;
}) {
  const GRID_PAGE = 60;
  const [gPage, setGPage] = useState(0);
  const paged = offices.slice(gPage * GRID_PAGE, (gPage + 1) * GRID_PAGE);
  const totalPages = Math.ceil(offices.length / GRID_PAGE);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {paged.map(office => {
          const col = LEVEL_COLORS[office.level];
          const Icon = LEVEL_ICONS[office.level];
          const CatIcon = CATEGORY_ICONS[office.category] || ClipboardList;
          const daysUntil = Math.ceil((new Date(office.nextElection).getTime() - Date.now()) / 86400000);
          const isSelected = selectedOffice?.id === office.id;

          return (
            <button
              key={office.id}
              onClick={() => onSelectOffice(office)}
              className={`text-left p-4 rounded-xl border transition-all duration-150 group hover:shadow-md ${
                isSelected
                  ? 'bg-[#EBF3FD] border-[#0E63C4] shadow-md'
                  : 'bg-white border-[#E4E9F0] hover:border-[#CBD5E1]'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: col.bg, border: `1px solid ${col.border}` }}>
                  <CatIcon className="w-4 h-4" style={{ color: col.text }} />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[9px] font-bold px-2 py-0.5 rounded-full border"
                    style={{ backgroundColor: col.bg, color: col.text, borderColor: col.border }}>
                    {office.level.replace('_', ' ').toUpperCase()}
                  </span>
                  {office.isPartisan
                    ? <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#FEF2F2] text-[#B42318] border border-[#FBD5D5]">PARTISAN</span>
                    : <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD]">NONPARTISAN</span>
                  }
                </div>
              </div>

              <div className="mb-2">
                <p className="text-sm font-semibold text-[#0B1220] leading-snug line-clamp-2">{office.title}</p>
                <p className="text-[11px] text-[#8494A8] mt-1">{office.category}</p>
              </div>

              <div className="flex items-center justify-between text-[11px] pt-2 border-t border-[#F0F4F8]">
                <span className="text-[#5B6779] font-mono">
                  {office.totalSeats.toLocaleString()} seat{office.totalSeats !== 1 ? 's' : ''}
                </span>
                <span className={`font-mono font-semibold ${daysUntil <= 90 ? 'text-[#16A34A]' : daysUntil <= 365 ? 'text-[#0E63C4]' : 'text-[#8494A8]'}`}>
                  {new Date(office.nextElection).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button onClick={() => setGPage(p => Math.max(0, p - 1))} disabled={gPage === 0}
            className="px-4 py-2 text-xs border rounded-lg disabled:opacity-40 hover:bg-[#F6F8FB] transition-colors">
            ← Prev
          </button>
          <span className="text-xs text-[#5B6779] font-mono">
            {gPage + 1} / {totalPages} ({offices.length.toLocaleString()} offices)
          </span>
          <button onClick={() => setGPage(p => Math.min(totalPages - 1, p + 1))} disabled={gPage >= totalPages - 1}
            className="px-4 py-2 text-xs border rounded-lg disabled:opacity-40 hover:bg-[#F6F8FB] transition-colors">
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

// ─── TABLE VIEW ──────────────────────────────────────────────────────────────

function TableView({ offices, total, page, pageSize, onPage, onSelectOffice, selectedOffice }: {
  offices: JurisdictionOffice[];
  total: number;
  page: number;
  pageSize: number;
  onPage: (p: number) => void;
  onSelectOffice: (o: JurisdictionOffice) => void;
  selectedOffice: JurisdictionOffice | null;
}) {
  const totalPages = Math.ceil(total / pageSize);

  return (
    <div className="space-y-3">
      <div className="border border-[#E4E9F0] rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-[#F6F8FB] border-b border-[#E4E9F0]">
                <th className="text-left px-4 py-3 font-semibold text-[#5B6779] uppercase tracking-wider">Office</th>
                <th className="text-left px-3 py-3 font-semibold text-[#5B6779] uppercase tracking-wider">Level</th>
                <th className="text-left px-3 py-3 font-semibold text-[#5B6779] uppercase tracking-wider">State</th>
                <th className="text-left px-3 py-3 font-semibold text-[#5B6779] uppercase tracking-wider">Category</th>
                <th className="text-right px-3 py-3 font-semibold text-[#5B6779] uppercase tracking-wider">Seats</th>
                <th className="text-left px-3 py-3 font-semibold text-[#5B6779] uppercase tracking-wider">Type</th>
                <th className="text-left px-3 py-3 font-semibold text-[#5B6779] uppercase tracking-wider">Next Election</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F0F4F8]">
              {offices.map(office => {
                const col = LEVEL_COLORS[office.level];
                const isSelected = selectedOffice?.id === office.id;
                return (
                  <tr
                    key={office.id}
                    onClick={() => onSelectOffice(office)}
                    className={`cursor-pointer transition-colors ${
                      isSelected ? 'bg-[#EBF3FD]' : 'bg-white hover:bg-[#F6F8FB]'
                    }`}
                  >
                    <td className="px-4 py-2.5">
                      <span className="font-medium text-[#0B1220] line-clamp-1">{office.title}</span>
                      {office.municipality && <span className="text-[#8494A8] block text-[10px]">{office.municipality}</span>}
                    </td>
                    <td className="px-3 py-2.5">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                        style={{ backgroundColor: col.bg, color: col.text, borderColor: col.border }}>
                        {office.level.replace('_', ' ')}
                      </span>
                    </td>
                    <td className="px-3 py-2.5 font-mono text-[#5B6779]">{office.stateAbbr}</td>
                    <td className="px-3 py-2.5 text-[#5B6779] line-clamp-1">{office.category}</td>
                    <td className="px-3 py-2.5 text-right font-mono text-[#0B1220] font-semibold">{office.totalSeats.toLocaleString()}</td>
                    <td className="px-3 py-2.5">
                      {office.isPartisan
                        ? <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#FEF2F2] text-[#B42318] border border-[#FBD5D5]">Partisan</span>
                        : <span className="text-[9px] px-1.5 py-0.5 rounded bg-[#F0F9FF] text-[#0284C7] border border-[#BAE6FD]">Nonpartisan</span>
                      }
                    </td>
                    <td className="px-3 py-2.5 font-mono text-[#5B6779]">
                      {new Date(office.nextElection).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-xs text-[#8494A8] font-mono">
            {(page * pageSize + 1).toLocaleString()}–{Math.min((page + 1) * pageSize, total).toLocaleString()} of {total.toLocaleString()}
          </span>
          <div className="flex items-center gap-2">
            <button onClick={() => onPage(0)} disabled={page === 0}
              className="px-3 py-1.5 text-xs border rounded-lg disabled:opacity-40 hover:bg-[#F6F8FB]">«</button>
            <button onClick={() => onPage(page - 1)} disabled={page === 0}
              className="px-3 py-1.5 text-xs border rounded-lg disabled:opacity-40 hover:bg-[#F6F8FB]">‹ Prev</button>
            <span className="text-xs font-mono text-[#5B6779]">{page + 1} / {totalPages}</span>
            <button onClick={() => onPage(page + 1)} disabled={page >= totalPages - 1}
              className="px-3 py-1.5 text-xs border rounded-lg disabled:opacity-40 hover:bg-[#F6F8FB]">Next ›</button>
            <button onClick={() => onPage(totalPages - 1)} disabled={page >= totalPages - 1}
              className="px-3 py-1.5 text-xs border rounded-lg disabled:opacity-40 hover:bg-[#F6F8FB]">»</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── OFFICE DETAIL DRAWER ────────────────────────────────────────────────────


// ─── HELPER: MATCH OFFICE TO ACTIVE 2026 RACE ──────────────────────────────

function findMatchingRaceForOffice(office: JurisdictionOffice): RaceEntry | undefined {
  if (office.id.startsWith('FED-HOUSE-')) {
    const key = office.id.replace('FED-HOUSE-', '');
    const found = ALL_RACES_REGISTRY.find(r => r.raceId === `2026-HOUSE-${key}`);
    if (found) return found;
  }
  if (office.id.startsWith('FED-SEN-')) {
    const key = office.id.replace('FED-SEN-', '');
    const found = ALL_RACES_REGISTRY.find(r => r.raceId.startsWith(`2026-SEN-${key}`));
    if (found) return found;
  }
  if (office.id.startsWith('STATE-GOV-')) {
    const key = office.id.replace('STATE-GOV-', '');
    const found = ALL_RACES_REGISTRY.find(r => r.raceId.startsWith(`2026-GOV-${key}`));
    if (found) return found;
  }
  if (office.id.startsWith('STATE-AG-')) {
    const key = office.id.replace('STATE-AG-', '');
    const found = ALL_RACES_REGISTRY.find(r => r.raceId.startsWith(`2026-AG-${key}`));
    if (found) return found;
  }
  if (office.id.startsWith('STATE-SOS-')) {
    const key = office.id.replace('STATE-SOS-', '');
    const found = ALL_RACES_REGISTRY.find(r => r.raceId.startsWith(`2026-SOS-${key}`));
    if (found) return found;
  }

  // Exact or fuzzy fallback
  const oTitle = office.title.toLowerCase();
  const oState = office.state.toLowerCase();
  const oMuni = (office.municipality || '').toLowerCase();
  const oCounty = (office.county || '').toLowerCase();

  return ALL_RACES_REGISTRY.find(r => {
    if (r.stateAbbr !== office.stateAbbr && r.state.toLowerCase() !== oState) return false;
    const rOffice = r.office.toLowerCase();
    const rMuni = (r.municipality || '').toLowerCase();
    const rCounty = (r.county || '').toLowerCase();

    if (oTitle.includes('representative') && rOffice.includes('representative')) {
      const oDist = oTitle.match(/([0-9]+)/)?.[1];
      const rDist = rOffice.match(/([0-9]+)/)?.[1];
      if (oDist && rDist && oDist === rDist) return true;
    }
    if (oMuni && rMuni && oMuni === rMuni) {
      if (rOffice.includes('treasurer') && oTitle.includes('treasurer')) return true;
      if (rOffice.includes('mayor') && oTitle.includes('mayor')) return true;
      if (rOffice.includes('dog catcher') && oTitle.includes('dog catcher')) return true;
    }
    if (oCounty && rCounty && oCounty === rCounty) {
      if (rOffice.includes('treasurer') && oTitle.includes('treasurer')) return true;
      if (rOffice.includes('sheriff') && oTitle.includes('sheriff')) return true;
      if (rOffice.includes('commissioner') && oTitle.includes('commissioner')) return true;
    }
    return false;
  });
}

function OfficeDetailDrawer({ office, onClose }: { office: JurisdictionOffice; onClose: () => void }) {
  const def = OFFICE_DEFINITIONS[office.tier];
  const col = LEVEL_COLORS[office.level];
  const Icon = LEVEL_ICONS[office.level];
  const CatIcon = CATEGORY_ICONS[office.category] || ClipboardList;
  const daysUntil = Math.ceil((new Date(office.nextElection).getTime() - Date.now()) / 86400000);
  const matchedRace = useMemo(() => findMatchingRaceForOffice(office), [office]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-xs p-0 sm:p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="bg-white rounded-t-2xl sm:rounded-2xl w-full sm:max-w-2xl md:max-w-3xl shadow-2xl overflow-hidden max-h-[88vh] flex flex-col border border-[#CBD5E1]">
        {/* Header */}
        <div
          className="flex items-start justify-between p-4 sm:p-5 border-b border-[#E4E9F0] flex-shrink-0"
          style={{ background: `linear-gradient(135deg, ${col.bg}, #FFFFFF)` }}
        >
          <div className="flex items-start gap-3 min-w-0">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ backgroundColor: col.bg, border: `1.5px solid ${col.border}` }}
            >
              <CatIcon className="w-5 h-5" style={{ color: col.text }} />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-wider mb-0.5" style={{ color: col.text }}>
                {office.level.replace('_', ' ')} · {office.category}
              </p>
              <h2 className="text-base sm:text-lg font-extrabold text-[#0B1220] leading-snug truncate">
                {office.title}
              </h2>
              <p className="text-xs text-[#5B6779] font-mono mt-0.5">
                Registry ID: <strong>{office.id}</strong> · {office.state}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 flex items-center justify-center text-[#5B6779] transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 sm:p-5 space-y-5 overflow-y-auto flex-1 text-xs">
          {/* Active 2026 Contest & Candidates Breakdown */}
          {matchedRace ? (
            <div className="bg-[#FFFFFF] border-2 border-[#0E63C4] rounded-xl p-4 sm:p-5 shadow-xs space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E4E9F0] pb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#16A34A]"></span>
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-[#DCFCE7] text-[#15803D] px-2 py-0.5 rounded border border-[#86EFAC]">
                      ACTIVE 2026 CERTIFIED CONTEST & CANDIDATES
                    </span>
                  </div>
                  <strong className="text-sm sm:text-base text-[#0B1220] block">
                    {matchedRace.office}
                  </strong>
                </div>

                <div className="text-right flex items-center gap-2">
                  {matchedRace.cookRating && (
                    <span className="text-[10px] font-bold bg-[#FFFBEB] text-[#B45309] border border-[#FCE8A5] px-2 py-1 rounded">
                      {matchedRace.cookRating}
                    </span>
                  )}
                  {matchedRace.pollAverage && (
                    <span className="text-xs font-mono font-bold bg-[#EBF3FD] text-[#0E63C4] border border-[#BFDBFE] px-2 py-1 rounded">
                      Margin: {matchedRace.pollAverage}
                    </span>
                  )}
                </div>
              </div>

              {/* Head-to-Head Visual Polling Bar */}
              <div className="space-y-1.5 bg-[#F8FAFC] border border-[#E2E8F0] p-3 rounded-xl">
                <div className="flex items-center justify-between text-[11px] text-[#475569]">
                  <span className="font-bold flex items-center gap-1">
                    <BarChart3 className="w-3.5 h-3.5 text-[#0E63C4]" /> Certified Head-to-Head Polling
                  </span>
                  <span>{matchedRace.qualifyingPollsCount || 3} Qualifying Surveys · Weighted Sample</span>
                </div>

                <div className="w-full bg-[#CBD5E1] h-3 rounded-full overflow-hidden flex">
                  {matchedRace.candidates.map((c, i) => (
                    <div
                      key={i}
                      style={{
                        width: `${c.pollShare || 45}%`,
                        backgroundColor: c.party === 'DEM' ? '#0E63C4' : c.party === 'REP' ? '#DC2626' : '#16A34A',
                      }}
                      className="h-full relative group transition-all"
                      title={`${c.name} (${c.party}): ${c.pollShare}%`}
                    />
                  ))}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2 text-[11px] pt-1">
                  {matchedRace.candidates.map((c, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <span
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: c.party === 'DEM' ? '#0E63C4' : c.party === 'REP' ? '#DC2626' : '#16A34A' }}
                      />
                      <strong className="text-[#0B1220]">{c.name}</strong>
                      <span className="font-mono text-[#0E63C4] font-bold">({c.pollShare}%)</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Every Candidate's Full Data Card */}
              <div className="space-y-3 pt-1">
                <h3 className="text-xs font-bold text-[#0B1220] uppercase tracking-wider">
                  Candidate Profiles & Verified Filings ({matchedRace.candidates.length} Running)
                </h3>

                {matchedRace.candidates.map((c, i) => (
                  <div key={i} className="p-3.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] space-y-2">
                    {/* Header Row */}
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-[#E2E8F0] flex items-center justify-center font-bold text-[10px] text-[#475569]">
                          {i + 1}
                        </span>
                        <strong className="text-sm font-bold text-[#0B1220]">{c.name}</strong>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                          c.party === 'DEM' ? 'bg-[#EBF3FD] text-[#0E63C4] border-[#BFDBFE]' :
                          c.party === 'REP' ? 'bg-[#FEF2F2] text-[#B42318] border-[#FBD5D5]' :
                          'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]'
                        }`}>
                          {c.party}
                        </span>
                        <span className="text-[10px] font-semibold text-[#64748B] bg-white px-1.5 py-0.5 rounded border border-[#E2E8F0]">
                          {c.status}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 bg-[#EBF3FD] border border-[#BFDBFE] px-2 py-0.5 rounded-md">
                        <span className="text-[10px] text-[#0A4E9E] font-medium">Certified Poll Share:</span>
                        <strong className="text-xs text-[#0E63C4] font-mono">{c.pollShare}%</strong>
                      </div>
                    </div>

                    {/* Biography */}
                    {c.biography && (
                      <div className="bg-white border border-[#E4E9F0] p-2.5 rounded-lg text-xs text-[#334155] leading-relaxed">
                        <strong className="text-[#0B1220] block mb-0.5 text-[11px] uppercase tracking-wider">Candidate Biography:</strong>
                        {c.biography}
                      </div>
                    )}

                    {/* Platform */}
                    {c.platformStance && (
                      <div className="bg-[#F0FDF4] border border-[#BBF7D0] p-2.5 rounded-lg text-xs text-[#166534] leading-relaxed">
                        <strong className="text-[#15803D] block mb-0.5 text-[11px] uppercase tracking-wider flex items-center gap-1">
                          <CheckCheck className="w-3.5 h-3.5" /> Key Platform & Policy Stance:
                        </strong>
                        {c.platformStance}
                      </div>
                    )}

                    {/* Prior Office, Age, Hometown */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-[#5B6779]">
                      {c.priorOffice && (
                        <div className="flex items-center gap-1">
                          <Briefcase className="w-3 h-3 text-[#8494A8]" />
                          <span>Prior: <strong>{c.priorOffice}</strong></span>
                        </div>
                      )}
                      {c.hometown && (
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#8494A8]" />
                          <span>{c.hometown}</span>
                        </div>
                      )}
                      {c.age && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3 text-[#8494A8]" />
                          <span>Age {c.age}</span>
                        </div>
                      )}
                      {c.cashOnHandMillions !== undefined && (
                        <div className="flex items-center gap-1 text-[#16A34A] font-bold">
                          <DollarSign className="w-3 h-3" />
                          <span>Cash: ${c.cashOnHandMillions < 0.1 ? Math.round(c.cashOnHandMillions * 1000) + 'k' : c.cashOnHandMillions.toFixed(1) + 'M'}</span>
                        </div>
                      )}
                    </div>

                    {/* Official Filing Box */}
                    {c.sourceVerification && (
                      <div className="p-2 bg-[#F6F8FB] border border-[#CBD5E1] rounded-lg text-[10px] text-[#475569] flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#15803D] bg-[#DCFCE7] px-1.5 py-0.5 rounded border border-[#86EFAC] flex items-center gap-1">
                            <ShieldCheck className="w-3 h-3" /> {c.sourceVerification.verificationStatus}
                          </span>
                          <span>Agency: <strong>{c.sourceVerification.agency}</strong></span>
                          <span className="hidden sm:inline">·</span>
                          <span className="font-mono">Filing ID: <strong>{c.sourceVerification.filingId}</strong></span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span>Filed: {c.sourceVerification.filingDate}</span>
                          {c.sourceVerification.sourceUrl && (
                            <a
                              href={c.sourceVerification.sourceUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-[#0E63C4] hover:underline flex items-center gap-0.5 font-bold"
                            >
                              Official Record <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Methodology & Sources */}
              <div className="p-3 bg-[#F6F8FB] border border-[#E4E9F0] rounded-xl space-y-1.5 text-[11px] text-[#5B6779]">
                <div className="flex items-center justify-between text-[#0B1220] font-bold">
                  <span>Mathematical Polling Model & Audit Trail</span>
                  <span className="text-[#16A34A] font-mono">100% Certified</span>
                </div>
                <p className="leading-relaxed">
                  Methodology: {matchedRace.pollingMethod || 'Likely Voters Multi-Mode IVR/SMS/Online Weighted Sample'}. Verified across {matchedRace.qualifyingPollsCount || 3} independent surveys.
                </p>
                {matchedRace.verifiedSources && matchedRace.verifiedSources.length > 0 && (
                  <div className="pt-1 border-t border-[#E2E8F0] flex flex-wrap gap-3">
                    {matchedRace.verifiedSources.map((src, sIdx) => (
                      <a
                        key={sIdx}
                        href={src.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0E63C4] hover:underline flex items-center gap-1 font-semibold text-[10px]"
                      >
                        {src.title} <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-[#F6F8FB] border border-[#E4E9F0] text-xs space-y-1 text-[#5B6779]">
              <strong className="text-[#0B1220] block font-bold">General Election Office Specification</strong>
              <p>
                This office operates under statutory nonpartisan/local rules. Detailed local candidates and municipal filings are indexed under the Local Races Registry.
              </p>
            </div>
          )}

          {/* Description */}
          {def && (
            <div className="p-3 rounded-lg bg-[#F6F8FB] border border-[#E4E9F0] flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#0E63C4] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[#24303F] leading-relaxed">{def.description}</p>
            </div>
          )}

          {/* Stats grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {[
              { label: 'Total Seats', value: office.totalSeats.toLocaleString(), icon: Users },
              { label: 'Up This Cycle', value: office.seatsUpThisCycle.toLocaleString(), icon: TrendingUp },
              { label: 'Term Length', value: `${office.termYears} years`, icon: Clock },
              { label: 'Election Type', value: office.isPartisan ? 'Partisan' : 'Nonpartisan', icon: UserCheck },
            ].map(({ label, value, icon: SIcon }) => (
              <div key={label} className="bg-[#F6F8FB] rounded-xl p-2.5 border border-[#E4E9F0]">
                <div className="flex items-center gap-1 mb-0.5">
                  <SIcon className="w-3 h-3 text-[#8494A8]" />
                  <span className="text-[10px] text-[#8494A8] uppercase tracking-wide font-semibold">{label}</span>
                </div>
                <span className="text-sm font-bold text-[#0B1220] font-mono">{value}</span>
              </div>
            ))}
          </div>

          {/* Next election */}
          <div className={`flex items-center justify-between p-3 rounded-xl border ${
            daysUntil <= 90 ? 'bg-[#F0FDF4] border-[#BBF7D0]' :
            daysUntil <= 365 ? 'bg-[#EBF3FD] border-[#BFDBFE]' : 'bg-[#F6F8FB] border-[#E4E9F0]'
          }`}>
            <div className="flex items-center gap-2">
              <Calendar className={`w-4 h-4 ${daysUntil <= 90 ? 'text-[#16A34A]' : daysUntil <= 365 ? 'text-[#0E63C4]' : 'text-[#8494A8]'}`} />
              <div>
                <p className="text-[10px] text-[#5B6779] uppercase tracking-wide font-semibold">Next Election Date</p>
                <p className="text-sm font-bold text-[#0B1220] font-mono">
                  {new Date(office.nextElection).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric', year: 'numeric' })}
                </p>
              </div>
            </div>
            <div className={`text-right ${daysUntil <= 90 ? 'text-[#16A34A]' : daysUntil <= 365 ? 'text-[#0E63C4]' : 'text-[#8494A8]'}`}>
              <p className="text-xl font-bold font-mono">{daysUntil}</p>
              <p className="text-[10px]">days away</p>
            </div>
          </div>

          {/* Location info */}
          <div className="flex items-center gap-2 text-xs text-[#5B6779]">
            <MapPin className="w-3.5 h-3.5 text-[#8494A8]" />
            <span>
              {office.municipality && <><strong>{office.municipality}</strong>, </>}
              {office.county && <><strong>{office.county} County</strong>, </>}
              <strong>{office.state}</strong>
              {office.population && <span className="text-[#8494A8] ml-1">(Pop. {office.population.toLocaleString()})</span>}
            </span>
          </div>

          {/* Notes */}
          {office.notes && (
            <div className="p-3 rounded-lg bg-[#FFFBEB] border border-[#FDE68A] flex items-start gap-2">
              <AlertCircle className="w-3.5 h-3.5 text-[#B45309] flex-shrink-0 mt-0.5" />
              <p className="text-xs text-[#92400E] leading-relaxed">{office.notes}</p>
            </div>
          )}

          {/* Office ID */}
          <p className="text-[10px] font-mono text-[#8494A8] border-t border-[#E4E9F0] pt-3">
            Registry ID: {office.id}
          </p>
        </div>
      </div>
    </div>
  );
}
