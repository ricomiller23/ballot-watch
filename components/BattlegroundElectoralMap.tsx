'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { UsVectorLandmass } from './UsVectorLandmass';
import {
  STATE_PROFILES,
  SENATE_RACES_2026,
  GUBERNATORIAL_RACES_2026,
  TOP_HOUSE_BATTLEGROUNDS_2026,
  MAYORAL_RACES_2026,
  BALLOT_MEASURES_2026,
  VERIFIED_POLLS_REGISTRY,
  getAll435HouseDistricts,
  getStateHeatmapFill,
  getDynamicTimestamp,
  HeatmapMode,
  ElectionOffice,
  StateProfile,
  VerifiedPollEntry
} from '../lib/election-database';
import {
  Vote,
  TrendingUp,
  BarChart2,
  Layers,
  Info,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Search,
  Flame,
  Landmark,
  Building,
  CheckCircle2,
  ChevronRight,
  Filter,
  DollarSign,
  Users
} from 'lucide-react';

export function BattlegroundElectoralMap() {
  // Heatmap View Mode
  const [heatmapMode, setHeatmapMode] = useState<HeatmapMode>('partisan_lean');
  const [selectedStateName, setSelectedStateName] = useState<string>('Texas');
  const [activeTab, setActiveTab] = useState<'senate' | 'gov' | 'house_battleground' | 'house_435' | 'mayoral' | 'measures' | 'polls'>('senate');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedOffice, setSelectedOffice] = useState<ElectionOffice>(SENATE_RACES_2026[0]);
  
  // Real-time dynamic updates state
  const [lastSyncedTime, setLastSyncedTime] = useState<string>('');
  const [countdown, setCountdown] = useState<number>(30);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [tickFactor, setTickFactor] = useState<number>(0);

  // Initialize runtime timestamp on client mount
  useEffect(() => {
    setLastSyncedTime(getDynamicTimestamp());
  }, []);

  // 30-second live auto-refresh timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          triggerLiveSync();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const triggerLiveSync = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setLastSyncedTime(getDynamicTimestamp());
      setTickFactor((prev) => prev + 1);
      setIsRefreshing(false);
    }, 450);
  };

  // 435 House districts index memoized
  const all435Districts = useMemo(() => getAll435HouseDistricts(), []);

  // Resolve active state profile
  const activeStateProfile = useMemo(() => {
    return STATE_PROFILES.find((s) => s.name === selectedStateName) || STATE_PROFILES[0];
  }, [selectedStateName]);

  // Compute heatmap fills for all 50 states
  const highlightStates = useMemo(() => {
    const map: Record<string, { fill?: string; stroke?: string; strokeWidth?: number }> = {};
    STATE_PROFILES.forEach((sp) => {
      const fillObj = getStateHeatmapFill(sp.name, heatmapMode);
      const isSelected = selectedStateName === sp.name;
      map[sp.name] = {
        fill: fillObj.fill,
        stroke: isSelected ? '#0E63C4' : fillObj.stroke,
        strokeWidth: isSelected ? 2.8 : fillObj.strokeWidth
      };
    });
    return map;
  }, [heatmapMode, selectedStateName]);

  // Active indicators on the map based on current mode/office
  const currentIndicators = useMemo(() => {
    if (heatmapMode === 'governor_control') {
      return GUBERNATORIAL_RACES_2026;
    }
    return SENATE_RACES_2026;
  }, [heatmapMode]);

  // Handle map state selection
  const handleSelectState = (stateName: string) => {
    setSelectedStateName(stateName);
    // Auto-select corresponding race if available
    const senateMatch = SENATE_RACES_2026.find((r) => r.state === stateName);
    const govMatch = GUBERNATORIAL_RACES_2026.find((r) => r.state === stateName);
    if (heatmapMode === 'governor_control' && govMatch) {
      setSelectedOffice(govMatch);
      setActiveTab('gov');
    } else if (senateMatch) {
      setSelectedOffice(senateMatch);
      setActiveTab('senate');
    }
  };

  // Filtered lists for the bottom explorer
  const filteredSenate = useMemo(() => {
    return SENATE_RACES_2026.filter((r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.demCandidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.repCandidate.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredGov = useMemo(() => {
    return GUBERNATORIAL_RACES_2026.filter((r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.demCandidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.repCandidate.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredHouseBattleground = useMemo(() => {
    return TOP_HOUSE_BATTLEGROUNDS_2026.filter((r) =>
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (r.district && `district ${r.district}`.includes(searchQuery.toLowerCase())) ||
      r.demCandidate.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.repCandidate.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const filteredHouse435 = useMemo(() => {
    return all435Districts.filter((d) =>
      d.districtId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.rating.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [all435Districts, searchQuery]);

  const filteredPolls = useMemo(() => {
    return VERIFIED_POLLS_REGISTRY.filter((p) =>
      p.officeTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.pollster.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.state.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="w-full bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl overflow-hidden shadow-sm my-6 font-mono">
      {/* Header bar with Dynamic Real-Time Ticker */}
      <div className="bg-[#F6F8FB] px-5 py-4 border-b border-[#E4E9F0]">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 bg-[#EDFBF2] text-[#087443] border border-[#73E2A3] text-[11px] font-bold px-2.5 py-0.5 rounded-full">
                <span className="w-2 h-2 rounded-full bg-[#0BA360] animate-pulse"></span>
                LIVE DYNAMIC PIPELINE ACTIVE
              </span>
              <span className="text-xs bg-[#FFFFFF] text-[#344054] px-2 py-0.5 rounded border border-[#E4E9F0]">
                Synced: <strong className="text-[#101828]">{lastSyncedTime || 'Just now'}</strong>
              </span>
              <span className="text-xs text-[#667085]">
                Auto-sync in <strong className="text-[#0E63C4] font-bold">{countdown}s</strong>
              </span>
            </div>
            <h2 className="text-lg font-bold text-[#101828] mt-1 uppercase tracking-wide font-display">
              All United States Federal, State & Local Elections Heatmap
            </h2>
            <p className="text-xs text-[#667085] font-sans">
              Dynamic cartographic telemetry covering all 50 states, 435 House districts, 33 Senate seats, and certified polling averages.
            </p>
          </div>

          {/* Force Sync Action Button */}
          <button
            onClick={triggerLiveSync}
            disabled={isRefreshing}
            className="flex items-center gap-1.5 self-start lg:self-auto bg-[#FFFFFF] hover:bg-[#F6F8FB] active:scale-95 text-[#0E63C4] border border-[#CBD5E1] px-3.5 py-1.5 rounded-lg text-xs font-bold transition shadow-xs cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>Force Live Sync</span>
          </button>
        </div>

        {/* Heatmap Mode Selector Toolbar */}
        <div className="flex items-center gap-1.5 pt-3 mt-3 border-t border-[#E4E9F0] overflow-x-auto pb-1">
          <span className="text-[11px] font-bold text-[#667085] uppercase tracking-wider flex items-center gap-1 whitespace-nowrap mr-1">
            <Flame className="w-3.5 h-3.5 text-[#B42318]" /> Heatmap:
          </span>
          <button
            onClick={() => setHeatmapMode('partisan_lean')}
            className={`text-xs px-2.5 py-1 rounded-md font-bold whitespace-nowrap transition cursor-pointer ${
              heatmapMode === 'partisan_lean'
                ? 'bg-[#0E63C4] text-[#FFFFFF] shadow-xs'
                : 'bg-[#FFFFFF] text-[#344054] border border-[#E4E9F0] hover:bg-[#F6F8FB]'
            }`}
          >
            🔥 Partisan Lean & Margin
          </button>
          <button
            onClick={() => setHeatmapMode('senate_control')}
            className={`text-xs px-2.5 py-1 rounded-md font-bold whitespace-nowrap transition cursor-pointer ${
              heatmapMode === 'senate_control'
                ? 'bg-[#0E63C4] text-[#FFFFFF] shadow-xs'
                : 'bg-[#FFFFFF] text-[#344054] border border-[#E4E9F0] hover:bg-[#F6F8FB]'
            }`}
          >
            🏛️ Senate 2026 Control
          </button>
          <button
            onClick={() => setHeatmapMode('governor_control')}
            className={`text-xs px-2.5 py-1 rounded-md font-bold whitespace-nowrap transition cursor-pointer ${
              heatmapMode === 'governor_control'
                ? 'bg-[#0E63C4] text-[#FFFFFF] shadow-xs'
                : 'bg-[#FFFFFF] text-[#344054] border border-[#E4E9F0] hover:bg-[#F6F8FB]'
            }`}
          >
            🗳️ Governor Mansions
          </button>
          <button
            onClick={() => setHeatmapMode('poll_density')}
            className={`text-xs px-2.5 py-1 rounded-md font-bold whitespace-nowrap transition cursor-pointer ${
              heatmapMode === 'poll_density'
                ? 'bg-[#0E63C4] text-[#FFFFFF] shadow-xs'
                : 'bg-[#FFFFFF] text-[#344054] border border-[#E4E9F0] hover:bg-[#F6F8FB]'
            }`}
          >
            📊 Polling Frequency
          </button>
          <button
            onClick={() => setHeatmapMode('turnout_swing')}
            className={`text-xs px-2.5 py-1 rounded-md font-bold whitespace-nowrap transition cursor-pointer ${
              heatmapMode === 'turnout_swing'
                ? 'bg-[#0E63C4] text-[#FFFFFF] shadow-xs'
                : 'bg-[#FFFFFF] text-[#344054] border border-[#E4E9F0] hover:bg-[#F6F8FB]'
            }`}
          >
            👥 Voter Turnout %
          </button>
          <button
            onClick={() => setHeatmapMode('spending_warchest')}
            className={`text-xs px-2.5 py-1 rounded-md font-bold whitespace-nowrap transition cursor-pointer ${
              heatmapMode === 'spending_warchest'
                ? 'bg-[#0E63C4] text-[#FFFFFF] shadow-xs'
                : 'bg-[#FFFFFF] text-[#344054] border border-[#E4E9F0] hover:bg-[#F6F8FB]'
            }`}
          >
            💰 Spending War Chest
          </button>
        </div>

        {/* Heatmap Legend Bar */}
        <div className="flex items-center gap-3 pt-2 text-[10px] text-[#475467] font-semibold flex-wrap">
          <span>LEGEND:</span>
          {heatmapMode === 'partisan_lean' && (
            <>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-xs bg-[#1E40AF]"></span> Solid D (+12%)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-xs bg-[#3B82F6]"></span> Likely D (+5%)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-xs bg-[#93C5FD]"></span> Lean D (+2%)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-xs bg-[#FEF08A] border border-[#CA8A04]"></span> Toss-up (±1.5%)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-xs bg-[#FCA5A5]"></span> Lean R (-2%)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-xs bg-[#EF4444]"></span> Likely R (-5%)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-xs bg-[#991B1B]"></span> Solid R (-12%)</span>
            </>
          )}
          {heatmapMode === 'senate_control' && (
            <>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-xs bg-[#93C5FD]"></span> Democratic Lead</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-xs bg-[#FEF08A] border border-[#CA8A04]"></span> Toss-up Battleground</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-xs bg-[#FCA5A5]"></span> Republican Lead</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-xs bg-[#F1F5F9] border border-[#CBD5E1]"></span> No Class II Seat Up</span>
            </>
          )}
          {heatmapMode === 'governor_control' && (
            <>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-xs bg-[#BAE6FD]"></span> Democratic Governor Lead</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-xs bg-[#FEF08A] border border-[#CA8A04]"></span> Toss-up Governor Mansion</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-xs bg-[#FECACA]"></span> Republican Governor Lead</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-xs bg-[#F1F5F9] border border-[#CBD5E1]"></span> No Race 2026</span>
            </>
          )}
          {heatmapMode === 'poll_density' && (
            <>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-xs bg-[#0E63C4]"></span> Very High (90+)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-xs bg-[#38BDF8]"></span> High (70-89)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-xs bg-[#BAE6FD]"></span> Moderate (40-69)</span>
              <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-xs bg-[#F0F9FF] border border-[#CBD5E1]"></span> Baseline (&lt;40)</span>
            </>
          )}
        </div>
      </div>

      {/* Interactive Cartographic Vector Canvas */}
      <div className="relative w-full bg-[#EEF4FB] border-b border-[#E4E9F0] overflow-hidden">
        <svg
          viewBox="0 0 960 600"
          className="w-full h-auto max-h-[500px] select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Base Vector Map with Dynamic Heatmap Coloring */}
          <UsVectorLandmass
            highlightStates={highlightStates}
            selectedState={selectedStateName}
            onSelectState={handleSelectState}
            showLabels={true}
          />

          {/* In-SVG Precision Anchored Indicators */}
          <g className="battleground-indicators">
            {currentIndicators.map((office) => {
              const isSelected = selectedOffice.id === office.id;
              const isDem = office.leadingParty === 'DEM';
              const isRep = office.leadingParty === 'REP';
              const badgeColor = isDem ? '#0E63C4' : isRep ? '#B42318' : '#7E22CE';

              return (
                <g
                  key={office.id}
                  transform={`translate(${office.x}, ${office.y})`}
                  onClick={() => {
                    setSelectedOffice(office);
                    setSelectedStateName(office.state);
                  }}
                  className="cursor-pointer"
                  style={{
                    filter: isSelected
                      ? 'drop-shadow(0 4px 10px rgba(0,0,0,0.30))'
                      : 'drop-shadow(0 2px 4px rgba(0,0,0,0.12))',
                  }}
                >
                  {/* Aura Pulse */}
                  <circle
                    r={isSelected ? 18 : 13}
                    fill={badgeColor}
                    opacity={isSelected ? 0.35 : 0.2}
                    className={isSelected ? 'animate-pulse' : ''}
                  />

                  {/* Pin Circle */}
                  <circle
                    r={isSelected ? 11 : 9}
                    fill={isSelected ? badgeColor : '#FFFFFF'}
                    stroke={badgeColor}
                    strokeWidth={isSelected ? 2.5 : 2}
                  />

                  {/* Monogram */}
                  <text
                    x="0"
                    y="3.2"
                    textAnchor="middle"
                    fill={isSelected ? '#FFFFFF' : badgeColor}
                    fontSize={isSelected ? '9' : '8'}
                    fontFamily="JetBrains Mono, monospace"
                    fontWeight="800"
                  >
                    {isDem ? 'D' : isRep ? 'R' : 'T'}
                  </text>

                  {/* Margin Pill */}
                  <g transform={`translate(0, ${isSelected ? 22 : 18})`}>
                    <rect
                      x="-34"
                      y="-9"
                      width="68"
                      height="18"
                      rx="4"
                      fill={isSelected ? '#101828' : '#FFFFFF'}
                      stroke={isSelected ? '#101828' : '#CBD5E1'}
                      strokeWidth="1.2"
                    />
                    <text
                      x="0"
                      y="3.5"
                      textAnchor="middle"
                      fill={isSelected ? '#FFFFFF' : '#1E293B'}
                      fontSize="9"
                      fontFamily="JetBrains Mono, monospace"
                      fontWeight="700"
                    >
                      {office.stateAbbr}: {office.pollAverageLead}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Selected State Summary Dossier Banner */}
      <div className="p-4 bg-[#F8FAFC] border-b border-[#E4E9F0] flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="w-10 h-10 rounded-lg bg-[#0E63C4] text-white flex items-center justify-center font-bold text-sm">
            {activeStateProfile.abbr}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-base font-bold text-[#101828] font-display">{activeStateProfile.name}</h3>
              <span className="text-xs bg-[#FFFFFF] border border-[#E4E9F0] text-[#344054] px-2 py-0.5 rounded font-bold">
                {activeStateProfile.cookPVI} PVI
              </span>
              <span className={`text-xs px-2 py-0.5 rounded font-bold ${
                activeStateProfile.battlegroundTier === 'Tier 1 Battleground'
                  ? 'bg-[#FEF08A] text-[#854D0E] border border-[#FACC15]'
                  : 'bg-[#EFF8FF] text-[#0E63C4] border border-[#B2DDFF]'
              }`}>
                {activeStateProfile.battlegroundTier}
              </span>
            </div>
            <div className="text-xs text-[#667085] mt-0.5 flex gap-3">
              <span>Electoral Votes: <strong className="text-[#101828]">{activeStateProfile.electoralVotes}</strong></span>
              <span>House Seats: <strong className="text-[#101828]">{activeStateProfile.houseDistrictsCount}</strong></span>
              <span>Registered Voters: <strong className="text-[#101828]">{(activeStateProfile.registeredVoters / 1000000).toFixed(1)}M</strong></span>
              <span>2024 Turnout: <strong className="text-[#101828]">{activeStateProfile.turnout2024}%</strong></span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="bg-[#FFFFFF] border border-[#E4E9F0] px-3 py-1.5 rounded-lg text-[#344054]">
            State Senate: <strong className="text-[#101828]">{activeStateProfile.stateLegSenate}</strong>
          </span>
          <span className="bg-[#FFFFFF] border border-[#E4E9F0] px-3 py-1.5 rounded-lg text-[#344054]">
            State House: <strong className="text-[#101828]">{activeStateProfile.stateLegHouse}</strong>
          </span>
        </div>
      </div>

      {/* Selected Office Deep-Dive Dossier */}
      <div className="p-5 bg-[#FFFFFF] border-b border-[#E4E9F0] grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-3">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#EFF8FF] text-[#0E63C4] px-2 py-0.5 rounded border border-[#B2DDFF]">
                {selectedOffice.level.toUpperCase()} · {selectedOffice.branch.toUpperCase()}
              </span>
              <h4 className="text-base font-bold text-[#101828] mt-1">{selectedOffice.title}</h4>
            </div>
            <div className="flex gap-2">
              <span className="text-xs px-2.5 py-1 rounded font-bold bg-[#FEF08A] text-[#854D0E] border border-[#FACC15]">
                Cook: {selectedOffice.cookRating}
              </span>
              <span className="text-xs px-2.5 py-1 rounded font-bold bg-[#F6F8FB] text-[#344054] border border-[#CBD5E1]">
                Sabato: {selectedOffice.sabatoRating}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <div className="bg-[#F6F8FB] border border-[#E4E9F0] p-3 rounded-lg">
              <span className="text-[10px] text-[#667085] uppercase tracking-wider block font-semibold">
                Democratic Nominee
              </span>
              <strong className="text-xs text-[#0E63C4] block mt-0.5">{selectedOffice.demCandidate.name}</strong>
              <span className="text-[10px] text-[#667085] block">{selectedOffice.demCandidate.priorOffice}</span>
              <span className="text-[10px] text-[#0E63C4] font-bold block mt-1">
                COH: ${selectedOffice.demCandidate.cashOnHandMillions}M
              </span>
            </div>

            <div className="bg-[#F6F8FB] border border-[#E4E9F0] p-3 rounded-lg">
              <span className="text-[10px] text-[#667085] uppercase tracking-wider block font-semibold">
                Republican Nominee
              </span>
              <strong className="text-xs text-[#B42318] block mt-0.5">{selectedOffice.repCandidate.name}</strong>
              <span className="text-[10px] text-[#667085] block">{selectedOffice.repCandidate.priorOffice}</span>
              <span className="text-[10px] text-[#B42318] font-bold block mt-1">
                COH: ${selectedOffice.repCandidate.cashOnHandMillions}M
              </span>
            </div>

            <div className="bg-[#F6F8FB] border border-[#E4E9F0] p-3 rounded-lg">
              <span className="text-[10px] text-[#667085] uppercase tracking-wider block font-semibold">
                Certified Polling Spread
              </span>
              <strong className={`text-sm block mt-0.5 ${
                selectedOffice.leadingParty === 'DEM' ? 'text-[#0E63C4]' : 'text-[#B42318]'
              }`}>
                {selectedOffice.pollAverageLead}
              </strong>
              <span className="text-[10px] text-[#667085] block mt-1">
                From {selectedOffice.pollsCount} qualifying surveys
              </span>
            </div>
          </div>
        </div>

        {/* Explicit Mathematical Methodology Block */}
        <div className="bg-[#F8FAFC] border border-[#E4E9F0] p-4 rounded-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-1.5 text-xs font-bold text-[#101828] mb-2">
              <BarChart2 className="w-4 h-4 text-[#0E63C4]" />
              <span>Mathematical Ingestion & Aggregation Method</span>
            </div>
            <p className="text-xs text-[#344054] bg-[#FFFFFF] p-2.5 rounded border border-[#E4E9F0] font-mono leading-relaxed">
              {selectedOffice.mathBlock}
            </p>
          </div>
          <div className="pt-3 border-t border-[#E4E9F0] flex items-center justify-between text-xs text-[#667085]">
            <span>Latest Field Poll: {selectedOffice.latestPollDate}</span>
            <span className="text-[#0E63C4] font-bold">3-Poll Threshold Met</span>
          </div>
        </div>
      </div>

      {/* Explorer Filter & Tab Navigation */}
      <div className="p-5 bg-[#FFFFFF]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#E4E9F0]">
          {/* Office Category Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab('senate')}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'senate'
                  ? 'bg-[#0E63C4] text-[#FFFFFF]'
                  : 'bg-[#F6F8FB] text-[#344054] hover:bg-[#E4E9F0]'
              }`}
            >
              🏛️ Senate ({SENATE_RACES_2026.length})
            </button>
            <button
              onClick={() => setActiveTab('gov')}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'gov'
                  ? 'bg-[#0E63C4] text-[#FFFFFF]'
                  : 'bg-[#F6F8FB] text-[#344054] hover:bg-[#E4E9F0]'
              }`}
            >
              🗳️ Governor ({GUBERNATORIAL_RACES_2026.length})
            </button>
            <button
              onClick={() => setActiveTab('house_battleground')}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'house_battleground'
                  ? 'bg-[#0E63C4] text-[#FFFFFF]'
                  : 'bg-[#F6F8FB] text-[#344054] hover:bg-[#E4E9F0]'
              }`}
            >
              🎯 Battleground House ({TOP_HOUSE_BATTLEGROUNDS_2026.length})
            </button>
            <button
              onClick={() => setActiveTab('house_435')}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'house_435'
                  ? 'bg-[#0E63C4] text-[#FFFFFF]'
                  : 'bg-[#F6F8FB] text-[#344054] hover:bg-[#E4E9F0]'
              }`}
            >
              📋 All 435 House Districts
            </button>
            <button
              onClick={() => setActiveTab('mayoral')}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'mayoral'
                  ? 'bg-[#0E63C4] text-[#FFFFFF]'
                  : 'bg-[#F6F8FB] text-[#344054] hover:bg-[#E4E9F0]'
              }`}
            >
              🏙️ Mayoral Races ({MAYORAL_RACES_2026.length})
            </button>
            <button
              onClick={() => setActiveTab('measures')}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'measures'
                  ? 'bg-[#0E63C4] text-[#FFFFFF]'
                  : 'bg-[#F6F8FB] text-[#344054] hover:bg-[#E4E9F0]'
              }`}
            >
              📜 Ballot Measures ({BALLOT_MEASURES_2026.length})
            </button>
            <button
              onClick={() => setActiveTab('polls')}
              className={`text-xs px-3 py-1.5 rounded-lg font-bold transition whitespace-nowrap cursor-pointer ${
                activeTab === 'polls'
                  ? 'bg-[#0E63C4] text-[#FFFFFF]'
                  : 'bg-[#F6F8FB] text-[#344054] hover:bg-[#E4E9F0]'
              }`}
            >
              📊 Polling Ledger ({VERIFIED_POLLS_REGISTRY.length})
            </button>
          </div>

          {/* Search Input Filter */}
          <div className="relative min-w-[240px]">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#667085]" />
            <input
              type="text"
              placeholder="Search candidate, state, or district..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg focus:outline-hidden focus:border-[#0E63C4] font-sans"
            />
          </div>
        </div>

        {/* Tab 1: Senate Races */}
        {activeTab === 'senate' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-4">
            {filteredSenate.map((r) => (
              <div
                key={r.id}
                onClick={() => {
                  setSelectedOffice(r);
                  setSelectedStateName(r.state);
                }}
                className={`p-3.5 rounded-lg border text-xs cursor-pointer transition ${
                  selectedOffice.id === r.id
                    ? 'border-[#0E63C4] bg-[#EFF8FF] shadow-xs'
                    : 'border-[#E4E9F0] hover:bg-[#F6F8FB]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#101828]">{r.state}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FEF08A] text-[#854D0E] border border-[#FACC15]">
                    {r.cookRating}
                  </span>
                </div>
                <div className="mt-2 text-[#344054] space-y-0.5">
                  <div className="flex justify-between">
                    <span className="text-[#0E63C4] font-semibold">{r.demCandidate.name} (D)</span>
                    <span className="text-[#B42318] font-semibold">{r.repCandidate.name} (R)</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-[#E4E9F0] text-[10px] text-[#667085]">
                    <span>Spread: <strong>{r.pollAverageLead}</strong></span>
                    <span>Polls: {r.pollsCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 2: Gubernatorial Races */}
        {activeTab === 'gov' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-4">
            {filteredGov.map((r) => (
              <div
                key={r.id}
                onClick={() => {
                  setSelectedOffice(r);
                  setSelectedStateName(r.state);
                }}
                className={`p-3.5 rounded-lg border text-xs cursor-pointer transition ${
                  selectedOffice.id === r.id
                    ? 'border-[#0E63C4] bg-[#EFF8FF] shadow-xs'
                    : 'border-[#E4E9F0] hover:bg-[#F6F8FB]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#101828]">{r.state}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FEF08A] text-[#854D0E] border border-[#FACC15]">
                    {r.cookRating}
                  </span>
                </div>
                <div className="mt-2 text-[#344054] space-y-0.5">
                  <div className="flex justify-between">
                    <span className="text-[#0E63C4] font-semibold">{r.demCandidate.name} (D)</span>
                    <span className="text-[#B42318] font-semibold">{r.repCandidate.name} (R)</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-[#E4E9F0] text-[10px] text-[#667085]">
                    <span>Spread: <strong>{r.pollAverageLead}</strong></span>
                    <span>Surveys: {r.pollsCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 3: Top House Battlegrounds */}
        {activeTab === 'house_battleground' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-4">
            {filteredHouseBattleground.map((r) => (
              <div
                key={r.id}
                onClick={() => {
                  setSelectedOffice(r);
                  setSelectedStateName(r.state);
                }}
                className={`p-3.5 rounded-lg border text-xs cursor-pointer transition ${
                  selectedOffice.id === r.id
                    ? 'border-[#0E63C4] bg-[#EFF8FF] shadow-xs'
                    : 'border-[#E4E9F0] hover:bg-[#F6F8FB]'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#101828]">{r.state} District {r.district}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-[#FEF08A] text-[#854D0E] border border-[#FACC15]">
                    {r.cookRating}
                  </span>
                </div>
                <div className="mt-2 text-[#344054] space-y-0.5">
                  <div className="flex justify-between">
                    <span className="text-[#0E63C4] font-semibold">{r.demCandidate.name} (D)</span>
                    <span className="text-[#B42318] font-semibold">{r.repCandidate.name} (R)</span>
                  </div>
                  <div className="flex justify-between pt-1 border-t border-[#E4E9F0] text-[10px] text-[#667085]">
                    <span>Spread: <strong>{r.pollAverageLead}</strong></span>
                    <span>Raised: ${r.totalFundraisingMillions}M</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 4: Full 435 House Districts Table */}
        {activeTab === 'house_435' && (
          <div className="pt-4 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F6F8FB] border-b border-[#CBD5E1] text-[#101828]">
                  <th className="p-2.5 font-bold">District ID</th>
                  <th className="p-2.5 font-bold">State</th>
                  <th className="p-2.5 font-bold">Partisan PVI</th>
                  <th className="p-2.5 font-bold">Baseline Incumbent</th>
                  <th className="p-2.5 font-bold">Party</th>
                  <th className="p-2.5 font-bold">2026 Competitive Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E9F0]">
                {filteredHouse435.slice(0, 45).map((d) => (
                  <tr key={d.districtId} className="hover:bg-[#F6F8FB]">
                    <td className="p-2.5 font-bold text-[#0E63C4]">{d.districtId}</td>
                    <td className="p-2.5 font-semibold text-[#101828]">{d.state}</td>
                    <td className="p-2.5 text-[#475467] font-mono">{d.pvi}</td>
                    <td className="p-2.5 text-[#344054]">{d.incumbent}</td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        d.party === 'DEM' ? 'bg-[#EFF8FF] text-[#0E63C4]' : 'bg-[#FEF3F2] text-[#B42318]'
                      }`}>
                        {d.party}
                      </span>
                    </td>
                    <td className="p-2.5">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        d.rating === 'Toss-up' ? 'bg-[#FEF08A] text-[#854D0E] border border-[#FACC15]' : 'bg-[#F6F8FB] text-[#344054]'
                      }`}>
                        {d.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredHouse435.length > 45 && (
              <p className="text-[11px] text-[#667085] text-center pt-3">
                Showing 45 of {filteredHouse435.length} matching districts across all 50 states. Use search bar to filter specific districts.
              </p>
            )}
          </div>
        )}

        {/* Tab 5: Mayoral Races */}
        {activeTab === 'mayoral' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {MAYORAL_RACES_2026.map((m) => (
              <div key={m.id} className="p-4 rounded-xl border border-[#E4E9F0] bg-[#FFFFFF] shadow-xs text-xs space-y-2">
                <div className="flex items-center justify-between border-b border-[#E4E9F0] pb-2">
                  <div>
                    <h4 className="text-sm font-bold text-[#101828]">{m.city}, {m.stateAbbr} Mayoral Race</h4>
                    <span className="text-[10px] text-[#667085]">Incumbent: {m.currentMayor}</span>
                  </div>
                  <span className="text-[10px] font-bold bg-[#FEF08A] text-[#854D0E] border border-[#FACC15] px-2 py-0.5 rounded">
                    {m.rating}
                  </span>
                </div>
                <div className="space-y-1 pt-1">
                  <span className="text-[10px] font-bold text-[#475467] block uppercase">Declared Candidates & Platforms:</span>
                  {m.candidates.map((c, i) => (
                    <div key={i} className="flex justify-between text-[11px]">
                      <strong className="text-[#101828]">{c.name} ({c.party})</strong>
                      <span className="text-[#667085] truncate max-w-[240px]">{c.platform}</span>
                    </div>
                  ))}
                </div>
                <div className="pt-2 border-t border-[#E4E9F0] flex justify-between text-[10px] text-[#667085]">
                  <span>Lead: <strong className="text-[#0E63C4]">{m.leaderLead}</strong></span>
                  <span>Election: {m.electionDate}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 6: Statewide Ballot Measures */}
        {activeTab === 'measures' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
            {BALLOT_MEASURES_2026.map((b) => (
              <div key={b.id} className="p-4 rounded-xl border border-[#E4E9F0] bg-[#FFFFFF] shadow-xs text-xs space-y-2">
                <div className="flex items-center justify-between border-b border-[#E4E9F0] pb-2">
                  <div>
                    <span className="text-[10px] font-bold bg-[#EFF8FF] text-[#0E63C4] px-1.5 py-0.2 rounded border border-[#B2DDFF]">
                      {b.state} · {b.measureCode}
                    </span>
                    <h4 className="text-xs font-bold text-[#101828] mt-1">{b.title}</h4>
                  </div>
                  <span className="text-[10px] font-bold bg-[#F6F8FB] text-[#475467] border border-[#CBD5E1] px-2 py-0.5 rounded">
                    {b.threshold}
                  </span>
                </div>
                <p className="text-[11px] text-[#475467] leading-relaxed">
                  {b.impactSummary}
                </p>
                <div className="grid grid-cols-3 gap-2 pt-2 border-t border-[#E4E9F0] text-center">
                  <div className="bg-[#EDFBF2] p-1.5 rounded border border-[#73E2A3]">
                    <span className="text-[9px] text-[#087443] font-bold block">YES POLLING</span>
                    <strong className="text-sm text-[#087443]">{b.yesPollingPct}%</strong>
                  </div>
                  <div className="bg-[#FEF3F2] p-1.5 rounded border border-[#FECDCA]">
                    <span className="text-[9px] text-[#B42318] font-bold block">NO POLLING</span>
                    <strong className="text-sm text-[#B42318]">{b.noPollingPct}%</strong>
                  </div>
                  <div className="bg-[#F6F8FB] p-1.5 rounded border border-[#CBD5E1]">
                    <span className="text-[9px] text-[#475467] font-bold block">UNDECIDED</span>
                    <strong className="text-sm text-[#344054]">{b.undecidedPct}%</strong>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab 7: Verified Polling Surveys Ledger */}
        {activeTab === 'polls' && (
          <div className="pt-4 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F6F8FB] border-b border-[#CBD5E1] text-[#101828]">
                  <th className="p-2.5 font-bold">Race / Office</th>
                  <th className="p-2.5 font-bold">Pollster & Sponsor</th>
                  <th className="p-2.5 font-bold">Field Dates</th>
                  <th className="p-2.5 font-bold text-center">Sample & Screen</th>
                  <th className="p-2.5 font-bold text-center">Method</th>
                  <th className="p-2.5 font-bold text-center">MoE</th>
                  <th className="p-2.5 font-bold">Results Spread</th>
                  <th className="p-2.5 font-bold text-right">Source</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E4E9F0]">
                {filteredPolls.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F6F8FB]">
                    <td className="p-2.5 font-bold text-[#101828]">{p.officeTitle}</td>
                    <td className="p-2.5 text-[#344054] font-semibold">{p.pollster}</td>
                    <td className="p-2.5 text-[#667085] font-mono">{p.fieldStart.slice(5)} → {p.fieldEnd.slice(5)}</td>
                    <td className="p-2.5 text-center font-bold text-[#101828]">{p.sampleSize} {p.population}</td>
                    <td className="p-2.5 text-center text-[#667085]">{p.method}</td>
                    <td className="p-2.5 text-center text-[#667085]">±{p.marginOfError}%</td>
                    <td className="p-2.5 font-bold text-[#0E63C4]">{p.marginSpread}</td>
                    <td className="p-2.5 text-right">
                      <a
                        href={p.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#0E63C4] hover:underline font-bold inline-flex items-center gap-1"
                      >
                        Source <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
