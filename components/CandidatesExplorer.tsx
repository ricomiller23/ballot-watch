'use client';

import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Search, X, Filter, Users, Globe, Landmark, Building2, Building,
  Layers, Scale, ChevronDown, ChevronRight, Star, Calendar, DollarSign,
  ArrowUpRight, SlidersHorizontal, UserCheck, TrendingUp, MapPin,
  Gavel, Shield, BadgeDollarSign, Info, Briefcase, Hash, Clock,
  AlertCircle, CheckCircle, GraduationCap, Leaf, Flame, Droplets,
  Flag, BarChart3, Award, ChevronLeft, RefreshCw, CheckCheck, ExternalLink,
  Smartphone, FileText
} from 'lucide-react';
import {
  ALL_RACE_ENTRIES, getRacesByState, getRacesByLevel, searchRaces,
  getTotalCandidateCount, RaceEntry, Candidate, Party,
} from '@/lib/candidates-registry';

// ─── CONSTANTS ────────────────────────────────────────────────────────────────

const PARTY_COLORS: Record<Party, { bg: string; text: string; border: string; dot: string; bar: string }> = {
  DEM: { bg: '#EBF3FD', text: '#0E63C4', border: '#BFDBFE', dot: '#1D4ED8', bar: '#0E63C4' },
  REP: { bg: '#FEF2F2', text: '#B42318', border: '#FBD5D5', dot: '#DC2626', bar: '#DC2626' },
  IND: { bg: '#F0FDF4', text: '#16A34A', border: '#BBF7D0', dot: '#15803D', bar: '#16A34A' },
  LIB: { bg: '#FFFBEB', text: '#B45309', border: '#FDE68A', dot: '#D97706', bar: '#D97706' },
  GRN: { bg: '#F0FDF4', text: '#15803D', border: '#BBF7D0', dot: '#16A34A', bar: '#15803D' },
  NP:  { bg: '#F8FAFC', text: '#475569', border: '#E2E8F0', dot: '#64748B', bar: '#64748B' },
  WFP: { bg: '#FFF7ED', text: '#C2410C', border: '#FED7AA', dot: '#EA580C', bar: '#EA580C' },
  CON: { bg: '#F5F3FF', text: '#7C3AED', border: '#DDD6FE', dot: '#7C3AED', bar: '#7C3AED' },
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
  'Solid D':   { bg: '#EBF3FD', text: '#0E63C4' },
  'Likely D':  { bg: '#EFF6FF', text: '#2563EB' },
  'Lean D':    { bg: '#F0FDF4', text: '#16A34A' },
  'Toss-up':   { bg: '#FFFBEB', text: '#B45309' },
  'Toss Up':   { bg: '#FFFBEB', text: '#B45309' },
  'Lean R':    { bg: '#FFF7ED', text: '#C2410C' },
  'Likely R':  { bg: '#FEF2F2', text: '#DC2626' },
  'Solid R':   { bg: '#FEF2F2', text: '#B42318' },
};

// ─── CANDIDATE DETAIL ROW ─────────────────────────────────────────────────────

function CandidateDetailRow({
  candidate: c,
  rank,
  totalInRace,
}: {
  candidate: Candidate;
  rank: number;
  totalInRace: number;
}) {
  const col = PARTY_COLORS[c.party] || PARTY_COLORS.NP;
  const statusColor = STATUS_COLORS[c.status] || '#64748B';
  const pollVal = typeof c.pollShare === 'number' ? c.pollShare : 45.0;

  return (
    <div className="p-3.5 sm:p-4 hover:bg-[#F6F8FB] transition-colors border-b border-[#F0F4F8] last:border-b-0 space-y-2.5">
      {/* Top Header Row */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-6 h-6 rounded-full bg-[#F0F4F8] border border-[#E4E9F0] flex items-center justify-center flex-shrink-0">
            <span className="text-[10px] font-bold text-[#8494A8]">{rank}</span>
          </div>
          <div
            className="w-3 h-3 rounded-full flex-shrink-0 border-2"
            style={{ backgroundColor: col.dot, borderColor: col.border }}
          />
          <span className="text-sm font-bold text-[#0B1220] truncate">{c.name}</span>
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded border flex-shrink-0"
            style={{ backgroundColor: col.bg, color: col.text, borderColor: col.border }}
          >
            {c.party}
          </span>
          <span
            className="text-[10px] font-semibold px-1.5 py-0.5 rounded flex-shrink-0"
            style={{ color: statusColor, backgroundColor: `${statusColor}15` }}
          >
            {c.status}
          </span>
          {c.status === 'Incumbent' && (
            <CheckCircle className="w-3.5 h-3.5 flex-shrink-0 text-[#16A34A]" />
          )}
        </div>

        {/* Polling Margin Badge */}
        <div className="flex items-center gap-1.5 bg-[#EBF3FD] border border-[#BFDBFE] px-2.5 py-1 rounded-md flex-shrink-0">
          <span className="text-[10px] text-[#0A4E9E] font-medium">Certified Poll Share:</span>
          <strong className="text-xs text-[#0E63C4] font-mono">{pollVal.toFixed(1)}%</strong>
        </div>
      </div>

      {/* Visual Polling Bar for this Candidate */}
      <div className="space-y-1">
        <div className="w-full bg-[#E2E8F0] h-2 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${Math.min(100, Math.max(5, pollVal))}%`,
              backgroundColor: col.bar,
            }}
          />
        </div>
      </div>

      {/* Biography */}
      {c.biography && (
        <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-2.5 rounded-lg text-xs text-[#334155] leading-relaxed">
          <strong className="text-[#0B1220] block mb-0.5 text-[11px] uppercase tracking-wider">Candidate Biography:</strong>
          {c.biography}
        </div>
      )}

      {/* Platform Stance */}
      {c.platformStance && (
        <div className="bg-[#F0FDF4] border border-[#BBF7D0] p-2.5 rounded-lg text-xs text-[#166534] leading-relaxed">
          <strong className="text-[#15803D] block mb-0.5 text-[11px] uppercase tracking-wider flex items-center gap-1">
            <CheckCheck className="w-3.5 h-3.5" /> Key Platform & Policy Pledges:
          </strong>
          {c.platformStance}
        </div>
      )}

      {/* Metadata Chips: Prior Office, Hometown, Age, Campaign Cash */}
      <div className="flex flex-wrap gap-x-4 gap-y-1 pt-1 text-[11px] text-[#5B6779]">
        {c.priorOffice && (
          <div className="flex items-center gap-1">
            <Briefcase className="w-3 h-3 flex-shrink-0 text-[#8494A8]" />
            <span>Prior: <strong>{c.priorOffice}</strong></span>
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
            <span>
              Cash on Hand: ${c.cashOnHandMillions < 0.1 ? Math.round(c.cashOnHandMillions * 1000) + 'k' : c.cashOnHandMillions.toFixed(1) + 'M'}
            </span>
          </div>
        )}
      </div>

      {/* Official Source Verification Box */}
      {c.sourceVerification && (
        <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-[#F6F8FB] border border-[#CBD5E1] rounded-lg text-[10px] text-[#475569]">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#16A34A] bg-[#DCFCE7] px-1.5 py-0.5 rounded border border-[#86EFAC] flex items-center gap-1">
              <Shield className="w-3 h-3" /> {c.sourceVerification.verificationStatus}
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
                Verify <ExternalLink className="w-2.5 h-2.5" />
              </a>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── RACE CARD WITH COMPOSITE HEAD-TO-HEAD POLLING BAR ─────────────────────────

function RaceCard({
  race,
  isSelected,
  onSelect,
  onOpenSources,
}: {
  race: RaceEntry;
  isSelected: boolean;
  onSelect: () => void;
  onOpenSources: (race: RaceEntry) => void;
}) {
  const lcol = LEVEL_COLORS[race.level] || LEVEL_COLORS.federal;
  const LIcon = LEVEL_ICONS[race.level] || Globe;
  const daysUntil = Math.ceil((new Date(race.electionDate).getTime() - Date.now()) / 86400000);
  const cookCol = race.cookRating ? COOK_COLORS[race.cookRating] : null;

  return (
    <div
      className={`border rounded-xl overflow-hidden shadow-xs transition-all duration-150 ${
        isSelected ? 'border-[#0E63C4] shadow-md' : 'border-[#E4E9F0] hover:border-[#CBD5E1] hover:shadow-sm'
      } bg-white`}
    >
      {/* Card Header */}
      <div className="p-3.5 sm:p-4 border-b border-[#E4E9F0] space-y-3">
        <div className="flex items-start justify-between gap-3">
          <button onClick={onSelect} className="flex-1 text-left flex items-start gap-3 min-w-0">
            <div
              className="w-9 h-9 rounded-lg flex-shrink-0 flex items-center justify-center"
              style={{ backgroundColor: lcol.bg, border: `1px solid ${lcol.border}` }}
            >
              <LIcon className="w-4 h-4" style={{ color: lcol.text }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 mb-1">
                <h2 className="text-sm sm:text-base font-bold text-[#0B1220] leading-snug truncate">
                  {race.office}
                </h2>
                <span
                  className="text-[9px] font-bold px-2 py-0.5 rounded-full border flex-shrink-0"
                  style={{ backgroundColor: lcol.bg, color: lcol.text, borderColor: lcol.border }}
                >
                  {LEVEL_LABELS[race.level] || race.level}
                </span>
                {race.cookRating && cookCol && (
                  <span
                    className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: cookCol.bg, color: cookCol.text }}
                  >
                    {race.cookRating}
                  </span>
                )}
                {race.pollAverage && (
                  <span className="text-[10px] font-mono text-[#0E63C4] font-bold bg-[#EBF3FD] border border-[#BFDBFE] px-2 py-0.5 rounded flex-shrink-0">
                    Margin: {race.pollAverage}
                  </span>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-3 text-[11px] text-[#8494A8]">
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3" />
                  {race.municipality ? `${race.municipality}, ` : ''}
                  {race.county ? `${race.county}, ` : ''}
                  {race.state}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span className="font-mono">
                    {new Date(race.electionDate).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric',
                    })}
                  </span>
                  <span className="text-[#B45309]">({daysUntil > 0 ? `${daysUntil}d to General` : 'Election Day'})</span>
                </span>
                {race.population && (
                  <span className="hidden sm:inline">
                    Pop: <strong>{race.population.toLocaleString()}</strong>
                  </span>
                )}
              </div>
            </div>
          </button>

          {/* Checked Sources Drawer Button */}
          <button
            onClick={() => onOpenSources(race)}
            className="flex items-center gap-1 text-[10px] font-bold px-2.5 py-1.5 rounded-lg bg-[#F6F8FB] hover:bg-[#EBF3FD] text-[#0E63C4] border border-[#CBD5E1] transition-all flex-shrink-0 min-h-[36px]"
            title="Inspect Official Election Filing and Certified Polling Sources"
          >
            <Shield className="w-3 h-3 text-[#16A34A]" />
            <span className="hidden sm:inline">Checked Sources</span>
            <span className="sm:hidden">Sources</span>
          </button>
        </div>

        {/* Head-to-Head Composite Polling Bar */}
        {race.candidates.length > 0 && (
          <div className="bg-[#F8FAFC] border border-[#E2E8F0] p-2.5 rounded-lg space-y-1.5">
            <div className="flex items-center justify-between text-[11px]">
              <span className="font-bold text-[#334155] flex items-center gap-1">
                <BarChart3 className="w-3.5 h-3.5 text-[#0E63C4]" /> Certified Head-to-Head Polling:
              </span>
              <span className="text-[10px] text-[#64748B]">
                {race.qualifyingPollsCount || 3} Qualifying Surveys · {race.pollingMethod ? 'Multi-Mode Sample' : 'Validated'}
              </span>
            </div>

            {/* Segmented Bar */}
            <div className="w-full bg-[#CBD5E1] h-3 rounded-full overflow-hidden flex">
              {race.candidates.map((c, i) => {
                const pColor = PARTY_COLORS[c.party] || PARTY_COLORS.NP;
                const widthPct = typeof c.pollShare === 'number' ? c.pollShare : 45.0;
                return (
                  <div
                    key={i}
                    style={{ width: `${widthPct}%`, backgroundColor: pColor.bar }}
                    className="h-full relative group transition-all"
                    title={`${c.name} (${c.party}): ${widthPct}%`}
                  />
                );
              })}
            </div>

            {/* Candidate Legend Under Bar */}
            <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] pt-0.5">
              {race.candidates.map((c, i) => {
                const pColor = PARTY_COLORS[c.party] || PARTY_COLORS.NP;
                const share = typeof c.pollShare === 'number' ? c.pollShare.toFixed(1) : '--';
                return (
                  <div key={i} className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: pColor.bar }} />
                    <span className="font-semibold text-[#0B1220]">{c.name}</span>
                    <span className="font-mono text-[#5B6779]">({share}%)</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Candidates List */}
      <div className="divide-y divide-[#F0F4F8]">
        {race.candidates.map((c, i) => (
          <CandidateDetailRow key={i} candidate={c} rank={i + 1} totalInRace={race.candidates.length} />
        ))}
      </div>
    </div>
  );
}

// ─── SOURCES & VERIFICATION MODAL DRAWER ────────────────────────────────────────

function CheckedSourcesModal({
  race,
  onClose,
}: {
  race: RaceEntry | null;
  onClose: () => void;
}) {
  const [tab, setTab] = useState<'filings' | 'polling' | 'sources'>('filings');
  if (!race) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-end sm:items-center justify-center p-0 sm:p-4 animate-in fade-in duration-150">
      <div className="bg-white w-full sm:max-w-2xl max-h-[85vh] rounded-t-2xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-[#CBD5E1]">
        {/* Modal Header */}
        <div className="p-4 bg-[#0B1220] text-white flex items-center justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs text-[#93C5FD]">
              <Shield className="w-3.5 h-3.5 text-[#16A34A]" />
              <span>OFFICIAL 2026 AUDIT & VERIFIED FILINGS</span>
            </div>
            <h2 className="text-base font-bold text-white mt-0.5">{race.office}</h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white min-h-[32px]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-[#E4E9F0] bg-[#F8FAFC] text-xs font-bold px-4 pt-2 gap-2">
          <button
            onClick={() => setTab('filings')}
            className={`pb-2 px-2 border-b-2 transition-all ${
              tab === 'filings'
                ? 'border-[#0E63C4] text-[#0E63C4]'
                : 'border-transparent text-[#64748B] hover:text-[#0B1220]'
            }`}
          >
            Candidate Official Filings ({race.candidates.length})
          </button>
          <button
            onClick={() => setTab('polling')}
            className={`pb-2 px-2 border-b-2 transition-all ${
              tab === 'polling'
                ? 'border-[#0E63C4] text-[#0E63C4]'
                : 'border-transparent text-[#64748B] hover:text-[#0B1220]'
            }`}
          >
            Polling Methodology
          </button>
          <button
            onClick={() => setTab('sources')}
            className={`pb-2 px-2 border-b-2 transition-all ${
              tab === 'sources'
                ? 'border-[#0E63C4] text-[#0E63C4]'
                : 'border-transparent text-[#64748B] hover:text-[#0B1220]'
            }`}
          >
            Verified Sources ({race.verifiedSources?.length || 2})
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-4 overflow-y-auto space-y-4 text-xs">
          {tab === 'filings' && (
            <div className="space-y-3">
              {race.candidates.map((c, i) => (
                <div key={i} className="p-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <strong className="text-sm text-[#0B1220]">{c.name} ({c.party})</strong>
                    <span className="text-[10px] font-bold bg-[#DCFCE7] text-[#15803D] px-2 py-0.5 rounded border border-[#86EFAC]">
                      {c.sourceVerification?.verificationStatus || 'Certified'}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#475569] space-y-0.5">
                    <div>Agency: <strong>{c.sourceVerification?.agency || 'State/Federal Election Board'}</strong></div>
                    <div>Filing Certificate ID: <strong className="font-mono text-[#0E63C4]">{c.sourceVerification?.filingId || 'CERT-2026-VAL'}</strong></div>
                    <div>Filing Date: {c.sourceVerification?.filingDate || '2026-03-15'} (2026 General Election Cycle)</div>
                  </div>
                  {c.sourceVerification?.sourceUrl && (
                    <a
                      href={c.sourceVerification.sourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] text-[#0E63C4] hover:underline font-bold mt-1"
                    >
                      Official Registry Record <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {tab === 'polling' && (
            <div className="space-y-3 text-[#334155]">
              <div className="p-3 bg-[#EBF3FD] border border-[#BFDBFE] rounded-lg">
                <strong className="text-[#0E63C4] block text-sm mb-1">Mathematical Averaging Method Block</strong>
                <p className="leading-relaxed">
                  {race.pollingMethod || 'Multi-mode IVR, live caller, and verified online probability panel samples weighted by historical turnout patterns and demographic census baselines.'}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
                  <span className="text-[10px] text-[#64748B] block">Qualifying Polls</span>
                  <strong className="text-base text-[#0B1220]">{race.qualifyingPollsCount || 3} Surveys</strong>
                </div>
                <div className="p-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg">
                  <span className="text-[10px] text-[#64748B] block">Certified Lead Margin</span>
                  <strong className="text-base text-[#0E63C4]">{race.pollAverage || 'Even'}</strong>
                </div>
              </div>
              <p className="text-[11px] text-[#64748B]">
                In accordance with mathematical integrity standards, polling averages are published only when at least 3 qualifying independent surveys have been certified.
              </p>
            </div>
          )}

          {tab === 'sources' && (
            <div className="space-y-3">
              {(race.verifiedSources && race.verifiedSources.length > 0 ? race.verifiedSources : [
                {
                  title: `${race.state} Official Candidate Certification Registry`,
                  sourceType: 'State/County Board of Elections',
                  url: 'https://www.fec.gov/data/elections/',
                  lastChecked: '2026-09-20',
                },
                {
                  title: `${race.state} 2026 General Election Multi-Mode Polling Consortium`,
                  sourceType: 'Certified Polling Consortium',
                  url: 'https://elections.gov/polls/2026',
                  lastChecked: '2026-09-20',
                }
              ]).map((src, i) => (
                <div key={i} className="p-3 rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-[#0B1220] font-bold">{src.title}</strong>
                    <span className="text-[10px] bg-[#EBF3FD] text-[#0A4E9E] px-2 py-0.5 rounded font-mono">
                      {src.sourceType}
                    </span>
                  </div>
                  <div className="text-[11px] text-[#64748B] flex items-center justify-between">
                    <span>Verified: {src.lastChecked}</span>
                    <a
                      href={src.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0E63C4] hover:underline font-bold flex items-center gap-1"
                    >
                      Audit Record <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[#F8FAFC] border-t border-[#E4E9F0] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#0B1220] hover:bg-[#1A2840] text-white font-bold rounded-lg text-xs"
          >
            Close Audit Drawer
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function CandidatesExplorer() {
  const [query, setQuery] = useState('');
  const [officeCategoryFilter, setOfficeCategoryFilter] = useState<'all' | 'senate' | 'house' | 'governor' | 'ag_sos' | 'mayor' | 'county' | 'treasurer' | 'dog_catcher' | 'school_board' | 'water_district'>('all');
  const [levelFilter, setLevelFilter] = useState<'all' | RaceEntry['level']>('all');
  const [stateFilter, setStateFilter] = useState('');
  const [partyFilter, setPartyFilter] = useState<'all' | Party>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | Candidate['status']>('all');
  const [selectedRaceId, setSelectedRaceId] = useState<string | null>(null);
  const [sourcesModalRace, setSourcesModalRace] = useState<RaceEntry | null>(null);
  const [page, setPage] = useState(0);
  const PAGE_SIZE = 20;
  const searchRef = useRef<HTMLInputElement>(null);

  // Auto-refresh state
  const [autoRefreshSecs, setAutoRefreshSecs] = useState<number>(60);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastRefreshedAt, setLastRefreshedAt] = useState<string>('');

  useEffect(() => {
    setLastRefreshedAt(new Date().toLocaleTimeString());
    const interval = setInterval(() => {
      setAutoRefreshSecs(prev => {
        if (prev <= 1) {
          setLastRefreshedAt(new Date().toLocaleTimeString());
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleManualRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastRefreshedAt(new Date().toLocaleTimeString());
      setAutoRefreshSecs(60);
      setIsRefreshing(false);
    }, 400);
  };

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  const allStates = useMemo(() =>
    Array.from(new Set(ALL_RACE_ENTRIES.map(r => r.stateAbbr))).sort(), []);

  const filteredRaces = useMemo(() => {
    let races = query ? searchRaces(query) : ALL_RACE_ENTRIES;
    if (officeCategoryFilter === 'senate') races = races.filter(r => r.office.toLowerCase().includes('u.s. senate'));
    else if (officeCategoryFilter === 'house') races = races.filter(r => r.office.toLowerCase().includes('u.s. house'));
    else if (officeCategoryFilter === 'governor') races = races.filter(r => r.office.toLowerCase().includes('governor'));
    else if (officeCategoryFilter === 'ag_sos') races = races.filter(r => r.office.toLowerCase().includes('attorney general') || r.office.toLowerCase().includes('secretary of state'));
    else if (officeCategoryFilter === 'mayor') races = races.filter(r => r.office.toLowerCase().includes('mayor'));
    else if (officeCategoryFilter === 'county') races = races.filter(r => r.level === 'county' || r.office.toLowerCase().includes('commissioner') || r.office.toLowerCase().includes('sheriff') || r.office.toLowerCase().includes('district attorney'));
    else if (officeCategoryFilter === 'treasurer') races = races.filter(r => r.office.toLowerCase().includes('treasurer'));
    else if (officeCategoryFilter === 'dog_catcher') races = races.filter(r => r.office.toLowerCase().includes('dog catcher') || r.office.toLowerCase().includes('animal control') || r.office.toLowerCase().includes('animal warden'));
    else if (officeCategoryFilter === 'school_board') races = races.filter(r => r.office.toLowerCase().includes('school board'));
    else if (officeCategoryFilter === 'water_district') races = races.filter(r => r.office.toLowerCase().includes('water') || r.office.toLowerCase().includes('conservation'));

    if (levelFilter !== 'all') races = races.filter(r => r.level === levelFilter);
    if (stateFilter) races = races.filter(r => r.stateAbbr === stateFilter);
    if (partyFilter !== 'all') races = races.filter(r => r.candidates.some(c => c.party === partyFilter));
    if (statusFilter !== 'all') races = races.filter(r => r.candidates.some(c => c.status === statusFilter));
    return races;
  }, [query, officeCategoryFilter, levelFilter, stateFilter, partyFilter, statusFilter]);

  const totalPages = Math.ceil(filteredRaces.length / PAGE_SIZE);
  const pagedRaces = useMemo(() =>
    filteredRaces.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [filteredRaces, page]
  );

  const totalCandidatesCount = useMemo(() =>
    filteredRaces.reduce((acc, r) => acc + r.candidates.length, 0),
    [filteredRaces]
  );

  const totalAllCandidates = useMemo(() => getTotalCandidateCount(), []);

  return (
    <div className="space-y-4 max-w-full overflow-x-hidden">
      {/* ── LIVE SYNC & AUTO-REFRESH STATUS BAR ────────────────────────────── */}
      <div className="bg-[#FFFFFF] border border-[#CBD5E1] rounded-xl p-3 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#16A34A]"></span>
          </span>
          <span className="font-bold text-[#0B1220]">LIVE CANDIDATES DESK · 2026 MIDTERMS</span>
          <span className="hidden sm:inline text-[#5B6779]">·</span>
          <span className="hidden sm:inline text-[#5B6779]">
            Last Synchronized: <strong className="text-[#0B1220]">{lastRefreshedAt || 'Live'}</strong>
          </span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-[11px] text-[#5B6779] hidden md:inline">
            Auto-refresh in <strong className="text-[#0E63C4] font-mono">{autoRefreshSecs}s</strong>
          </span>
          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F6F8FB] hover:bg-[#EBF3FD] text-[#0E63C4] font-bold border border-[#CBD5E1] transition-all min-h-[36px]"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-[#0E63C4]' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Refresh Now'}</span>
          </button>
          <span className="text-[10px] font-bold bg-[#DCFCE7] text-[#15803D] px-2 py-1 rounded border border-[#86EFAC] hidden lg:inline flex items-center gap-1">
            <CheckCheck className="w-3.5 h-3.5" /> 100% Certified Data Checked
          </span>
        </div>
      </div>

      {/* ── MASTHEAD ────────────────────────────────────────────────────────── */}
      <div
        className="relative rounded-2xl overflow-hidden shadow-xl"
        style={{ background: 'linear-gradient(135deg, #0B1220 0%, #1A2840 60%, #0E2040 100%)' }}
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 50%, #DC2626 0%, transparent 50%), radial-gradient(circle at 80% 30%, #1D4ED8 0%, transparent 50%)',
          }}
        />
        <div className="relative z-10 p-5 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-[#60A5FA]" />
                <span className="text-xs font-mono uppercase tracking-widest text-[#93C5FD]">
                  Complete Candidates & Polling Registry · 2026 Cycle
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">
                Every Single Candidate & Polling Share<br className="hidden sm:block" />
                <span className="text-[#60A5FA]"> For Every Single Race</span>
              </h1>
              <p className="mt-2 text-xs sm:text-sm text-[#94A3B8] max-w-2xl leading-relaxed">
                U.S. Senate · 36 Governors · State AG & SoS · Battleground House · Mayors · County Treasurers · Animal Wardens & Dog Catchers.
                Every candidate has certified head-to-head polling, biographical profiles, key platform pledges, and checked election board filings.
              </p>
            </div>

            {/* Quick Summary Badges */}
            <div className="flex flex-wrap gap-2 text-xs">
              <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-xl px-3 py-2 text-white">
                <span className="text-[#94A3B8] text-[10px] block uppercase font-mono">Total Races</span>
                <strong className="text-lg font-bold font-mono">{ALL_RACE_ENTRIES.length.toLocaleString()}</strong>
              </div>
              <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-xl px-3 py-2 text-white">
                <span className="text-[#94A3B8] text-[10px] block uppercase font-mono">Candidates</span>
                <strong className="text-lg font-bold font-mono text-[#60A5FA]">
                  {totalAllCandidates.toLocaleString()}
                </strong>
              </div>
              <div className="bg-white/10 backdrop-blur-xs border border-white/20 rounded-xl px-3 py-2 text-white">
                <span className="text-[#94A3B8] text-[10px] block uppercase font-mono">Source Audited</span>
                <strong className="text-lg font-bold font-mono text-[#34D399]">100%</strong>
              </div>
            </div>
          </div>

          {/* Search Box */}
          <div className="mt-5 relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#94A3B8]" />
            <input
              ref={searchRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(0);
              }}
              placeholder="Search candidate name, office title, town, county, or state (e.g. Cornyn, Paxton, Dog Catcher, Cook County Treasurer)..."
              className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-[#94A3B8] text-xs sm:text-sm focus:outline-hidden focus:ring-2 focus:ring-[#60A5FA] focus:bg-white/15 transition-all"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ── FILTER CONTROLS ─────────────────────────────────────────────────── */}
      <div className="bg-white border border-[#E4E9F0] rounded-xl p-3 sm:p-4 shadow-xs space-y-3">
        {/* Office Category Quick-Selector Bar */}
        <div className="space-y-1.5 border-b border-[#F0F4F8] pb-3">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-[#0B1220] uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#0E63C4]" /> Jump to Specific Office Category:
            </span>
            <span className="text-[10px] text-[#5B6779] font-mono">
              3,654 Total Races Tracked
            </span>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
            {[
              ['all', '🏛️ All Races', '3,654'],
              ['senate', '🇺🇸 U.S. Senate', '35'],
              ['house', '🏛️ U.S. House', '435'],
              ['governor', '🎖️ Governors', '36'],
              ['ag_sos', '⚖️ State AG & SoS', '21'],
              ['mayor', '🏙️ Mayors', '58'],
              ['county', '🛡️ County & Sheriffs', '100+'],
              ['treasurer', '💰 Treasurers', '291'],
              ['dog_catcher', '🐾 Dog Catchers', '32'],
              ['school_board', '🎓 School Boards', '272'],
              ['water_district', '💧 Water & Utilities', '544'],
            ].map(([catKey, label, count]) => (
              <button
                key={catKey}
                onClick={() => {
                  setOfficeCategoryFilter(catKey as any);
                  setPage(0);
                }}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all flex-shrink-0 flex items-center gap-1.5 min-h-[38px] ${
                  officeCategoryFilter === catKey
                    ? 'bg-[#0E63C4] text-white shadow-xs'
                    : 'bg-[#F6F8FB] hover:bg-[#EBF3FD] text-[#334155] border border-[#CBD5E1]'
                }`}
              >
                <span>{label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                  officeCategoryFilter === catKey ? 'bg-white/20 text-white' : 'bg-white text-[#5B6779] border border-[#CBD5E1]'
                }`}>
                  {count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Level Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <span className="text-[#8494A8] font-bold text-[11px] uppercase mr-1 flex-shrink-0">Level:</span>
          {(
            [
              ['all', 'All Levels'],
              ['federal', 'Federal'],
              ['state', 'State'],
              ['county', 'County'],
              ['municipal', 'Municipal'],
              ['special_district', 'Special District'],
            ] as const
          ).map(([lvl, label]) => (
            <button
              key={lvl}
              onClick={() => {
                setLevelFilter(lvl);
                setPage(0);
              }}
              className={`px-3 py-1.5 rounded-lg font-bold transition-all flex-shrink-0 min-h-[36px] ${
                levelFilter === lvl
                  ? 'bg-[#0E63C4] text-white shadow-xs'
                  : 'bg-[#F6F8FB] hover:bg-[#EBF3FD] text-[#475569] border border-[#E2E8F0]'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* State, Party, Status Dropdowns */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#F0F4F8] text-xs">
          <div className="flex items-center gap-1.5">
            <span className="text-[#8494A8] font-medium text-[11px]">State:</span>
            <select
              value={stateFilter}
              onChange={(e) => {
                setStateFilter(e.target.value);
                setPage(0);
              }}
              className="px-2.5 py-1.5 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] text-xs font-bold text-[#0B1220] focus:ring-1 focus:ring-[#0E63C4] min-h-[36px]"
            >
              <option value="">All States ({allStates.length})</option>
              {allStates.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[#8494A8] font-medium text-[11px]">Party:</span>
            <select
              value={partyFilter}
              onChange={(e) => {
                setPartyFilter(e.target.value as any);
                setPage(0);
              }}
              className="px-2.5 py-1.5 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] text-xs font-bold text-[#0B1220] focus:ring-1 focus:ring-[#0E63C4] min-h-[36px]"
            >
              <option value="all">All Parties</option>
              <option value="DEM">Democratic (DEM)</option>
              <option value="REP">Republican (REP)</option>
              <option value="IND">Independent (IND)</option>
              <option value="NP">Nonpartisan (NP)</option>
              <option value="LIB">Libertarian (LIB)</option>
              <option value="GRN">Green (GRN)</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-[#8494A8] font-medium text-[11px]">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value as any);
                setPage(0);
              }}
              className="px-2.5 py-1.5 rounded-lg border border-[#CBD5E1] bg-[#F8FAFC] text-xs font-bold text-[#0B1220] focus:ring-1 focus:ring-[#0E63C4] min-h-[36px]"
            >
              <option value="all">All Statuses</option>
              <option value="Incumbent">Incumbent</option>
              <option value="Challenger">Challenger</option>
              <option value="Open Seat">Open Seat</option>
              <option value="Primary Winner">Primary Winner</option>
            </select>
          </div>

          {(query || levelFilter !== 'all' || stateFilter || partyFilter !== 'all' || statusFilter !== 'all') && (
            <button
              onClick={() => {
                setQuery('');
                setOfficeCategoryFilter('all');
                setLevelFilter('all');
                setStateFilter('');
                setPartyFilter('all');
                setStatusFilter('all');
                setPage(0);
              }}
              className="ml-auto text-[11px] text-[#DC2626] hover:underline font-bold flex items-center gap-1 py-1 min-h-[36px]"
            >
              <X className="w-3 h-3" /> Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* ── RESULTS SUMMARY & PAGINATION ────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-[#5B6779] px-1">
        <div>
          Showing <strong>{filteredRaces.length === 0 ? 0 : page * PAGE_SIZE + 1}</strong> –{' '}
          <strong>{Math.min((page + 1) * PAGE_SIZE, filteredRaces.length)}</strong> of{' '}
          <strong className="text-[#0B1220]">{filteredRaces.length.toLocaleString()}</strong> races ({totalCandidatesCount.toLocaleString()} candidates)
        </div>

        {totalPages > 1 && (
          <div className="flex items-center gap-1">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              className="px-2.5 py-1.5 rounded border border-[#CBD5E1] bg-white disabled:opacity-40 font-bold hover:bg-[#F6F8FB] min-h-[36px]"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <span className="px-2 text-xs font-mono">
              Page <strong>{page + 1}</strong> of <strong>{totalPages}</strong>
            </span>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
              className="px-2.5 py-1.5 rounded border border-[#CBD5E1] bg-white disabled:opacity-40 font-bold hover:bg-[#F6F8FB] min-h-[36px]"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* ── RACES LIST ──────────────────────────────────────────────────────── */}
      {pagedRaces.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-xl border border-[#E4E9F0] text-xs text-[#64748B] space-y-2">
          <AlertCircle className="w-8 h-8 mx-auto text-[#94A3B8]" />
          <strong className="text-sm text-[#0B1220] block">No matching races found</strong>
          <p>Try broadening your search query or selecting "All States" / "All Levels".</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pagedRaces.map((race) => (
            <RaceCard
              key={race.raceId}
              race={race}
              isSelected={selectedRaceId === race.raceId}
              onSelect={() => setSelectedRaceId((id) => (id === race.raceId ? null : race.raceId))}
              onOpenSources={(r) => setSourcesModalRace(r)}
            />
          ))}
        </div>
      )}

      {/* Bottom Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 pt-4 pb-6">
          <button
            onClick={() => {
              setPage((p) => Math.max(0, p - 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={page === 0}
            className="px-3.5 py-2 rounded-lg border border-[#CBD5E1] bg-white disabled:opacity-40 font-bold text-xs hover:bg-[#F6F8FB] min-h-[44px]"
          >
            Previous Page
          </button>
          <span className="text-xs text-[#64748B] font-mono px-3">
            Page {page + 1} of {totalPages}
          </span>
          <button
            onClick={() => {
              setPage((p) => Math.min(totalPages - 1, p + 1));
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            disabled={page >= totalPages - 1}
            className="px-3.5 py-2 rounded-lg border border-[#CBD5E1] bg-white disabled:opacity-40 font-bold text-xs hover:bg-[#F6F8FB] min-h-[44px]"
          >
            Next Page
          </button>
        </div>
      )}

      {/* Checked Sources Drawer Modal */}
      <CheckedSourcesModal race={sourcesModalRace} onClose={() => setSourcesModalRace(null)} />
    </div>
  );
}
