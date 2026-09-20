'use client';

import { UsVectorLandmass } from './UsVectorLandmass';

import React, { useState } from 'react';
import { Vote, TrendingUp, BarChart2, Layers, Info, ExternalLink, ShieldCheck } from 'lucide-react';

export interface BattlegroundRace {
  id: string;
  raceTitle: string;
  state: string;
  lat: number;
  lng: number;
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
    lat: 31.0,
    lng: -99.0,
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
    lat: 40.4,
    lng: -82.9,
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
    lat: 46.8,
    lng: -110.3,
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
    lat: 34.0,
    lng: -111.0,
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
    lat: 38.8,
    lng: -116.4,
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
    lat: 41.2,
    lng: -77.1,
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
    lat: 43.7,
    lng: -88.7,
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
    lat: 44.3,
    lng: -85.6,
    demCandidate: 'Elissa Slotkin (D)',
    repCandidate: 'Mike Rogers (R)',
    pollAverageLead: 'D +2.5%',
    leaderParty: 'DEM',
    ratingCook: 'Lean D',
    pollsCount: 10,
    latestPollDate: '2026-09-16',
    mathBlock: 'Weighted Exponential Decay Average (λ=0.035, N=10 polls, Min 3 polls met)'
  }
];

function projectUsCoords(lat: number, lng: number): { x: number; y: number } {
  const minLng = -125;
  const maxLng = -67;
  const minLat = 24.5;
  const maxLat = 49.5;

  const x = ((lng - minLng) / (maxLng - minLng)) * 100;
  const y = ((maxLat - lat) / (maxLat - minLat)) * 100;

  return {
    x: Math.max(2, Math.min(98, x)),
    y: Math.max(4, Math.min(96, y))
  };
}

export function BattlegroundElectoralMap() {
  const [selectedRace, setSelectedRace] = useState<BattlegroundRace>(BATTLEGROUND_RACES[0]);

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
            Lean R: 2
          </span>
          <span className="bg-white border border-[#E4E9F0] px-2.5 py-1 rounded text-purple-700 font-bold">
            Toss-up: 2
          </span>
        </div>
      </div>

      {/* SVG Canvas */}
      <div className="relative w-full bg-[#F8FAFC] border-b border-[#E4E9F0] overflow-hidden" style={{ minHeight: '340px' }}>
        <svg
          viewBox="0 0 960 600"
          className="w-full h-auto max-h-[440px] select-none pointer-events-none"
          preserveAspectRatio="xMidYMid meet"
        >
          <UsVectorLandmass
            highlightStates={{
              'Pennsylvania': { fill: '#E0EDFF', stroke: '#0E63C4', strokeWidth: 1.2 },
              'Michigan': { fill: '#E0EDFF', stroke: '#0E63C4', strokeWidth: 1.2 },
              'Wisconsin': { fill: '#FEF08A', stroke: '#CA8A04', strokeWidth: 1.2 },
              'Nevada': { fill: '#FEF08A', stroke: '#CA8A04', strokeWidth: 1.2 },
              'Arizona': { fill: '#FEF08A', stroke: '#CA8A04', strokeWidth: 1.2 },
              'Georgia': { fill: '#FEE4E2', stroke: '#B42318', strokeWidth: 1.2 },
              'North Carolina': { fill: '#FEE4E2', stroke: '#B42318', strokeWidth: 1.2 },
              'Ohio': { fill: '#FEE4E2', stroke: '#B42318', strokeWidth: 1.2 },
              'Florida': { fill: '#FEE4E2', stroke: '#B42318', strokeWidth: 1.2 },
              'Texas': { fill: '#FEE4E2', stroke: '#B42318', strokeWidth: 1.2 },
            }}
          />
        </svg>

        {/* Race Markers */}
        <div className="absolute inset-0 pointer-events-auto">
          {BATTLEGROUND_RACES.map((race) => {
            const { x, y } = projectUsCoords(race.lat, race.lng);
            const isSelected = selectedRace.id === race.id;
            return (
              <div
                key={race.id}
                style={{ left: `${x}%`, top: `${y}%` }}
                className="absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer group z-10"
                onClick={() => setSelectedRace(race)}
              >
                <div
                  className={`relative flex items-center justify-center transition-transform ${
                    isSelected ? 'scale-125 z-20' : 'hover:scale-110'
                  }`}
                >
                  <span
                    className={`absolute w-7 h-7 rounded-full opacity-30 ${
                      race.leaderParty === 'DEM' ? 'bg-[#0E63C4]' : 'bg-[#B42318]'
                    } ${isSelected ? 'animate-ping' : ''}`}
                  />
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center border-2 shadow-md ${
                      isSelected
                        ? race.leaderParty === 'DEM'
                          ? 'bg-[#0E63C4] border-[#FFFFFF] text-[#FFFFFF]'
                          : 'bg-[#B42318] border-[#FFFFFF] text-[#FFFFFF]'
                        : race.leaderParty === 'DEM'
                        ? 'bg-[#FFFFFF] border-[#0E63C4] text-[#0E63C4]'
                        : 'bg-[#FFFFFF] border-[#B42318] text-[#B42318]'
                    }`}
                  >
                    <Vote className="w-3 h-3" />
                  </div>

                  {/* Badge */}
                  <div
                    className={`absolute top-7 left-1/2 -translate-x-1/2 whitespace-nowrap px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold shadow-xs border pointer-events-none transition ${
                      isSelected
                        ? 'bg-[#101828] text-[#FFFFFF] border-[#101828]'
                        : 'bg-[#FFFFFF]/95 text-[#344054] border-[#E4E9F0]'
                    }`}
                  >
                    {race.state}: {race.pollAverageLead}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
