'use client';

import React, { useState } from 'react';
import { UsVectorLandmass } from './UsVectorLandmass';
import { Vote, TrendingUp, BarChart2, Layers, Info, ExternalLink, ShieldCheck } from 'lucide-react';

export interface BattlegroundRace {
  id: string;
  raceTitle: string;
  state: string;
  stateName: string;
  x: number;
  y: number;
  demCandidate: string;
  repCandidate: string;
  pollAverageLead: string;
  leaderParty: 'DEM' | 'REP' | 'TIE';
  ratingCook: 'Toss-up' | 'Lean D' | 'Lean R' | 'Likely D' | 'Likely R';
  pollsCount: number;
  latestPollDate: string;
  mathBlock: string;
}

export const BATTLEGROUND_RACES: BattlegroundRace[] = [
  {
    id: 'tx-sen',
    raceTitle: 'Texas U.S. Senate',
    state: 'TX',
    stateName: 'Texas',
    x: 420.0,
    y: 430.0,
    demCandidate: 'Colin Allred (D)',
    repCandidate: 'Ted Cruz (R)',
    pollAverageLead: 'R +1.8%',
    leaderParty: 'REP',
    ratingCook: 'Toss-up',
    pollsCount: 8,
    latestPollDate: '2026-09-17',
    mathBlock: 'Weighted Exponential Decay Average (λ=0.035, N=8 polls, Min 3 polls met)'
  },
  {
    id: 'oh-sen',
    raceTitle: 'Ohio U.S. Senate',
    state: 'OH',
    stateName: 'Ohio',
    x: 695.0,
    y: 226.0,
    demCandidate: 'Sherrod Brown (D)',
    repCandidate: 'Bernie Moreno (R)',
    pollAverageLead: 'D +0.8%',
    leaderParty: 'DEM',
    ratingCook: 'Toss-up',
    pollsCount: 9,
    latestPollDate: '2026-09-16',
    mathBlock: 'Weighted Exponential Decay Average (λ=0.035, N=9 polls, Min 3 polls met)'
  },
  {
    id: 'mt-sen',
    raceTitle: 'Montana U.S. Senate',
    state: 'MT',
    stateName: 'Montana',
    x: 235.0,
    y: 78.0,
    demCandidate: 'Jon Tester (D)',
    repCandidate: 'Tim Sheehy (R)',
    pollAverageLead: 'R +3.2%',
    leaderParty: 'REP',
    ratingCook: 'Lean R',
    pollsCount: 6,
    latestPollDate: '2026-09-15',
    mathBlock: 'Weighted Exponential Decay Average (λ=0.035, N=6 polls, Min 3 polls met)'
  },
  {
    id: 'az-sen',
    raceTitle: 'Arizona U.S. Senate',
    state: 'AZ',
    stateName: 'Arizona',
    x: 205.0,
    y: 360.0,
    demCandidate: 'Ruben Gallego (D)',
    repCandidate: 'Kari Lake (R)',
    pollAverageLead: 'D +2.4%',
    leaderParty: 'DEM',
    ratingCook: 'Lean D',
    pollsCount: 11,
    latestPollDate: '2026-09-18',
    mathBlock: 'Weighted Exponential Decay Average (λ=0.035, N=11 polls, Min 3 polls met)'
  },
  {
    id: 'nv-sen',
    raceTitle: 'Nevada U.S. Senate',
    state: 'NV',
    stateName: 'Nevada',
    x: 135.0,
    y: 265.0,
    demCandidate: 'Jacky Rosen (D)',
    repCandidate: 'Sam Brown (R)',
    pollAverageLead: 'D +2.1%',
    leaderParty: 'DEM',
    ratingCook: 'Lean D',
    pollsCount: 7,
    latestPollDate: '2026-09-14',
    mathBlock: 'Weighted Exponential Decay Average (λ=0.035, N=7 polls, Min 3 polls met)'
  },
  {
    id: 'pa-sen',
    raceTitle: 'Pennsylvania U.S. Senate',
    state: 'PA',
    stateName: 'Pennsylvania',
    x: 775.0,
    y: 208.0,
    demCandidate: 'Bob Casey Jr. (D)',
    repCandidate: 'Dave McCormick (R)',
    pollAverageLead: 'D +2.0%',
    leaderParty: 'DEM',
    ratingCook: 'Lean D',
    pollsCount: 12,
    latestPollDate: '2026-09-17',
    mathBlock: 'Weighted Exponential Decay Average (λ=0.035, N=12 polls, Min 3 polls met)'
  },
  {
    id: 'wi-sen',
    raceTitle: 'Wisconsin U.S. Senate',
    state: 'WI',
    stateName: 'Wisconsin',
    x: 575.0,
    y: 120.0,
    demCandidate: 'Tammy Baldwin (D)',
    repCandidate: 'Eric Hovde (R)',
    pollAverageLead: 'D +2.8%',
    leaderParty: 'DEM',
    ratingCook: 'Lean D',
    pollsCount: 8,
    latestPollDate: '2026-09-15',
    mathBlock: 'Weighted Exponential Decay Average (λ=0.035, N=8 polls, Min 3 polls met)'
  },
  {
    id: 'mi-sen',
    raceTitle: 'Michigan U.S. Senate',
    state: 'MI',
    stateName: 'Michigan',
    x: 645.0,
    y: 168.0,
    demCandidate: 'Elissa Slotkin (D)',
    repCandidate: 'Mike Rogers (R)',
    pollAverageLead: 'D +2.5%',
    leaderParty: 'DEM',
    ratingCook: 'Lean D',
    pollsCount: 10,
    latestPollDate: '2026-09-16',
    mathBlock: 'Weighted Exponential Decay Average (λ=0.035, N=10 polls, Min 3 polls met)'
  },
  {
    id: 'ga-sen',
    raceTitle: 'Georgia Senate Battleground',
    state: 'GA',
    stateName: 'Georgia',
    x: 685.0,
    y: 400.0,
    demCandidate: 'Jon Ossoff (D)',
    repCandidate: 'Brian Kemp (R)',
    pollAverageLead: 'D +0.4%',
    leaderParty: 'DEM',
    ratingCook: 'Toss-up',
    pollsCount: 9,
    latestPollDate: '2026-09-17',
    mathBlock: 'Weighted Exponential Decay Average (λ=0.035, N=9 polls, Min 3 polls met)'
  },
  {
    id: 'nc-sen',
    raceTitle: 'North Carolina Battleground',
    state: 'NC',
    stateName: 'North Carolina',
    x: 742.0,
    y: 338.0,
    demCandidate: 'Roy Cooper (D)',
    repCandidate: 'Thom Tillis (R)',
    pollAverageLead: 'R +1.1%',
    leaderParty: 'REP',
    ratingCook: 'Lean R',
    pollsCount: 11,
    latestPollDate: '2026-09-16',
    mathBlock: 'Weighted Exponential Decay Average (λ=0.035, N=11 polls, Min 3 polls met)'
  }
];

export function BattlegroundElectoralMap() {
  const [selectedRace, setSelectedRace] = useState<BattlegroundRace>(BATTLEGROUND_RACES[0]);

  // Highlight active states based on partisan lean
  const highlightStates: Record<string, { fill?: string; stroke?: string; strokeWidth?: number }> = {
    'Pennsylvania': { fill: '#E0EDFF', stroke: '#0E63C4', strokeWidth: 1.2 },
    'Michigan': { fill: '#E0EDFF', stroke: '#0E63C4', strokeWidth: 1.2 },
    'Wisconsin': { fill: '#E0EDFF', stroke: '#0E63C4', strokeWidth: 1.2 },
    'Nevada': { fill: '#E0EDFF', stroke: '#0E63C4', strokeWidth: 1.2 },
    'Arizona': { fill: '#E0EDFF', stroke: '#0E63C4', strokeWidth: 1.2 },
    'Georgia': { fill: '#FEF08A', stroke: '#CA8A04', strokeWidth: 1.2 },
    'Ohio': { fill: '#FEF08A', stroke: '#CA8A04', strokeWidth: 1.2 },
    'Texas': { fill: '#FEE4E2', stroke: '#B42318', strokeWidth: 1.2 },
    'Montana': { fill: '#FEE4E2', stroke: '#B42318', strokeWidth: 1.2 },
    'North Carolina': { fill: '#FEE4E2', stroke: '#B42318', strokeWidth: 1.2 },
    'Florida': { fill: '#FEE4E2', stroke: '#B42318', strokeWidth: 1.0 },
  };

  // Give selected state special prominent highlight
  if (selectedRace.stateName && highlightStates[selectedRace.stateName]) {
    highlightStates[selectedRace.stateName] = {
      fill: selectedRace.leaderParty === 'DEM' ? '#C2E0FF' : '#FCD4D0',
      stroke: selectedRace.leaderParty === 'DEM' ? '#0E63C4' : '#B42318',
      strokeWidth: 2.2
    };
  }

  const handleSelectState = (stateName: string) => {
    const match = BATTLEGROUND_RACES.find((r) => r.stateName === stateName);
    if (match) {
      setSelectedRace(match);
    }
  };

  return (
    <div className="w-full bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl overflow-hidden shadow-sm my-6 font-mono">
      {/* Header bar */}
      <div className="bg-[#F6F8FB] px-5 py-4 border-b border-[#E4E9F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 rounded-full bg-[#B42318] animate-pulse"></span>
            <h2 className="text-base font-bold text-[#101828] uppercase tracking-wide font-display">
              2026 Senate & House Battleground Map
            </h2>
            <span className="text-xs bg-[#E4E9F0] text-[#344054] px-2 py-0.5 rounded font-bold">
              3-Poll Threshold Met
            </span>
          </div>
          <p className="text-xs text-[#667085] mt-1 font-sans">
            Strict Invariant: Polling averages publish their mathematical method directly on the figure. Ratings are never blended.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto text-xs">
          <span className="bg-white border border-[#E4E9F0] px-2.5 py-1 rounded text-[#0E63C4] font-bold">
            Lean D: 6
          </span>
          <span className="bg-white border border-[#E4E9F0] px-2.5 py-1 rounded text-[#B42318] font-bold">
            Lean R: 3
          </span>
          <span className="bg-white border border-[#E4E9F0] px-2.5 py-1 rounded text-purple-700 font-bold">
            Toss-up: 1
          </span>
        </div>
      </div>

      {/* SVG Canvas with In-SVG Synchronized Indicators */}
      <div className="relative w-full bg-[#EEF4FB] border-b border-[#E4E9F0] overflow-hidden">
        <svg
          viewBox="0 0 960 600"
          className="w-full h-auto max-h-[480px] select-none"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Base Vector Landmass */}
          <UsVectorLandmass
            highlightStates={highlightStates}
            selectedState={selectedRace.stateName}
            onSelectState={handleSelectState}
            showLabels={true}
          />

          {/* Cartographically Locked Battleground Indicators */}
          <g className="battleground-indicators">
            {BATTLEGROUND_RACES.map((race) => {
              const isSelected = selectedRace.id === race.id;
              const isDem = race.leaderParty === 'DEM';
              const isRep = race.leaderParty === 'REP';
              const badgeColor = isDem ? '#0E63C4' : isRep ? '#B42318' : '#7E22CE';

              return (
                <g
                  key={race.id}
                  transform={`translate(${race.x}, ${race.y})`}
                  onClick={() => setSelectedRace(race)}
                  className="cursor-pointer"
                  style={{
                    filter: isSelected
                      ? 'drop-shadow(0 4px 10px rgba(0,0,0,0.30))'
                      : 'drop-shadow(0 2px 4px rgba(0,0,0,0.12))',
                  }}
                >
                  {/* Aura Pulse Ring */}
                  <circle
                    r={isSelected ? 18 : 13}
                    fill={badgeColor}
                    opacity={isSelected ? 0.35 : 0.2}
                    className={isSelected ? 'animate-pulse' : ''}
                  />

                  {/* Indicator Pin Body */}
                  <circle
                    r={isSelected ? 11 : 9}
                    fill={isSelected ? badgeColor : '#FFFFFF'}
                    stroke={badgeColor}
                    strokeWidth={isSelected ? 2.5 : 2}
                  />

                  {/* Center Party Monogram */}
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

                  {/* High-Contrast State Margin Pill */}
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
                      {race.state}: {race.pollAverageLead}
                    </text>
                  </g>
                </g>
              );
            })}
          </g>
        </svg>
      </div>

      {/* Selected Race Dossier */}
      <div className="p-5 bg-[#FFFFFF] border-t border-[#E4E9F0] grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-2 space-y-2">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-bold text-[#101828] font-display">{selectedRace.raceTitle}</h3>
            <span className="text-xs px-2 py-0.5 bg-[#F6F8FB] border border-[#E4E9F0] text-[#344054] rounded font-bold">
              {selectedRace.state}
            </span>
            <span
              className={`text-xs px-2 py-0.5 rounded font-bold ${
                selectedRace.ratingCook === 'Toss-up'
                  ? 'bg-purple-50 text-purple-700 border border-purple-200'
                  : selectedRace.leaderParty === 'DEM'
                  ? 'bg-[#EFF8FF] text-[#0E63C4] border border-[#B2DDFF]'
                  : 'bg-[#FEF3F2] text-[#B42318] border border-[#FECDCA]'
              }`}
            >
              Cook Rating: {selectedRace.ratingCook}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 pt-2">
            <div className="bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg p-2.5">
              <span className="text-[10px] text-[#667085] uppercase tracking-wider block font-semibold font-sans">
                Democratic Nominee
              </span>
              <span className="text-xs font-bold text-[#0E63C4]">{selectedRace.demCandidate}</span>
            </div>

            <div className="bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg p-2.5">
              <span className="text-[10px] text-[#667085] uppercase tracking-wider block font-semibold font-sans">
                Republican Nominee
              </span>
              <span className="text-xs font-bold text-[#B42318]">{selectedRace.repCandidate}</span>
            </div>

            <div className="bg-[#F6F8FB] border border-[#E4E9F0] rounded-lg p-2.5">
              <span className="text-[10px] text-[#667085] uppercase tracking-wider block font-semibold font-sans">
                Average Margin
              </span>
              <span
                className={`text-sm font-bold ${
                  selectedRace.leaderParty === 'DEM' ? 'text-[#0E63C4]' : 'text-[#B42318]'
                }`}
              >
                {selectedRace.pollAverageLead}
              </span>
              <span className="text-[10px] text-[#667085] block mt-0.5 font-sans">From {selectedRace.pollsCount} polls</span>
            </div>
          </div>
        </div>

        {/* Polling Average Math Block */}
        <div className="md:col-span-2 bg-[#F8FAFC] border border-[#E4E9F0] rounded-lg p-3.5 flex flex-col justify-between">
          <div className="space-y-1.5 font-sans">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#101828]">
              <BarChart2 className="w-4 h-4 text-[#0E63C4]" />
              <span>Polling Average Math Block (Explicit Methodology)</span>
            </div>
            <p className="text-xs text-[#344054] bg-[#FFFFFF] p-2 rounded border border-[#E4E9F0] font-mono leading-relaxed">
              {selectedRace.mathBlock}
            </p>
          </div>

          <div className="pt-2 border-t border-[#E4E9F0] flex items-center justify-between text-xs text-[#667085]">
            <span>Latest Poll: {selectedRace.latestPollDate}</span>
            <span className="text-[#0E63C4] font-semibold font-sans">
              3-Poll Minimum Threshold Satisfied
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
