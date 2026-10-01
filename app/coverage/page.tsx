'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { getCoverageMetrics } from '@/lib/races';
import { STATE_MATRIX } from '@/lib/state-coverage-matrix';
import { 
  ShieldCheck, CheckCircle2, AlertTriangle, Layers, ExternalLink, 
  Search, Users, Landmark, Scale, Vote, Check, Clock 
} from 'lucide-react';

export default function CoveragePage() {
  const metrics = getCoverageMetrics();
  const [search, setSearch] = useState('');
  const [filterSystem, setFilterSystem] = useState('all');

  const filteredStates = STATE_MATRIX.filter(st => {
    const matchesSearch = st.state.toLowerCase().includes(search.toLowerCase()) ||
                          st.stateAbbr.toLowerCase().includes(search.toLowerCase());
    const matchesSystem = filterSystem === 'all' || st.votingSystem === filterSystem;
    return matchesSearch && matchesSystem;
  });

  return (
    <div className="space-y-6 font-mono">
      {/* Header Banner */}
      <div className="bg-[#F6F8FB] border border-[#E4E9F0] p-5 rounded-xl shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold bg-[#0E63C4] text-white px-2 py-0.5 rounded">
                COVERING ALL 50 STATES + DC · {metrics.totalRaces} CONTESTS
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0B1220] tracking-tight font-display">
              Nationwide Coverage & Sourced Registry Metrics
            </h1>
            <p className="text-xs text-[#5B6779] mt-1 max-w-3xl leading-relaxed">
              Every displayed candidate requires a direct source URL. Counts are computed dynamically from data/races.json. Races without a verified nominee display as pending.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/candidates"
              className="bg-[#0E63C4] hover:bg-[#0A4E9E] text-white text-xs font-bold px-3.5 py-2 rounded-lg transition shadow-xs flex items-center gap-1.5"
            >
              <Users className="w-3.5 h-3.5" />
              <span>Sourced Candidates ({metrics.totalCandidates})</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Computed Summary Metric Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl p-4 shadow-xs">
          <div className="text-[10px] font-bold text-[#5B6779] uppercase tracking-wider">
            Total Races Tracked
          </div>
          <div className="text-2xl font-black text-[#0B1220] mt-1">{metrics.totalRaces}</div>
          <div className="text-[10px] text-[#0E63C4] font-semibold mt-0.5">
            {metrics.racesWithSourcedNominee} with Sourced Nominee
          </div>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl p-4 shadow-xs">
          <div className="text-[10px] font-bold text-[#5B6779] uppercase tracking-wider">
            Tier 1: U.S. Senate
          </div>
          <div className="text-2xl font-black text-[#0B1220] mt-1">
            {metrics.senateSourced} / {metrics.senateTotal}
          </div>
          <div className="text-[10px] text-[#166534] font-semibold mt-0.5">33 Class II + 2 Specials</div>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl p-4 shadow-xs">
          <div className="text-[10px] font-bold text-[#5B6779] uppercase tracking-wider">
            Tier 2: Governors
          </div>
          <div className="text-2xl font-black text-[#0B1220] mt-1">
            {metrics.govSourced} / {metrics.govTotal}
          </div>
          <div className="text-[10px] text-[#166534] font-semibold mt-0.5">36 State Contests</div>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl p-4 shadow-xs">
          <div className="text-[10px] font-bold text-[#5B6779] uppercase tracking-wider">
            Tier 3: U.S. House
          </div>
          <div className="text-2xl font-black text-[#0B1220] mt-1">
            {metrics.houseSourced} / {metrics.houseTotal}
          </div>
          <div className="text-[10px] text-[#0E63C4] font-semibold mt-0.5">435 Congressional Districts</div>
        </div>
      </div>

      {/* Sourced Policy Explainer */}
      <div className="bg-[#F6F8FB] border border-[#E4E9F0] rounded-2xl p-5 space-y-2">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
          <h2 className="text-xs font-bold text-[#0B1220] uppercase tracking-wider">Data Sourcing & Verification Rules</h2>
        </div>
        <p className="text-xs text-[#5B6779] leading-relaxed">
          1. <strong>Single Source of Truth:</strong> All page counts and race displays derive solely from <code>data/races.json</code>.<br/>
          2. <strong>Source URL Requirement:</strong> A candidate without a direct source URL from Ballotpedia or an official state election agency is never displayed.<br/>
          3. <strong>2026 Election Year Strictness:</strong> Mayoral races include only cities with elections on the 2026 calendar ({metrics.mayorTotal} cities). Municipal elections decided in 2025 are excluded.<br/>
          4. <strong>Unblended Ratings:</strong> Forecaster ratings from Cook Political Report, Sabato's Crystal Ball, and Inside Elections are quoted verbatim.
        </p>
      </div>

      {/* Search and System Filter Bar */}
      <div className="bg-[#FFFFFF] border border-[#E4E9F0] p-4 rounded-xl shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-[#8494A8]" />
          <input
            type="text"
            placeholder="Search state name or abbr (e.g. TX, California)..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F6F8FB] border border-[#CBD5E1] rounded-lg text-xs text-[#0B1220] placeholder-[#8494A8] focus:outline-none focus:border-[#0E63C4] transition"
          />
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-xs text-[#5B6779] font-semibold mr-1">Voting System:</span>
          {['all', 'Standard', 'Ranked-Choice', 'Top-Two Primary', 'Majority/Runoff'].map(sys => (
            <button
              key={sys}
              onClick={() => setFilterSystem(sys)}
              className={`text-xs px-2.5 py-1 rounded-md border transition ${
                filterSystem === sys
                  ? 'bg-[#0E63C4] text-white border-[#0E63C4] font-bold shadow-xs'
                  : 'bg-[#FFFFFF] text-[#24303F] border-[#CBD5E1] hover:bg-[#F6F8FB]'
              }`}
            >
              {sys === 'all' ? 'All Systems' : sys}
            </button>
          ))}
        </div>
      </div>

      {/* State Coverage Table */}
      <div className="bg-[#FFFFFF] border border-[#E4E9F0] rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F6F8FB] text-[#5B6779] uppercase tracking-wider text-[10px] border-b border-[#E4E9F0]">
              <tr>
                <th className="py-3 px-4 font-bold">State / Jurisdiction</th>
                <th className="py-3 px-3 font-bold">Voting System</th>
                <th className="py-3 px-3 font-bold text-center">T1: Senate</th>
                <th className="py-3 px-3 font-bold text-center">T2: Gov</th>
                <th className="py-3 px-3 font-bold text-center">T3: House</th>
                <th className="py-3 px-4 font-bold text-right">Official Portal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E9F0] font-mono">
              {filteredStates.map(st => (
                <tr key={st.stateAbbr} className="hover:bg-[#F6F8FB] transition-colors">
                  <td className="py-3 px-4 font-sans font-semibold text-[#0B1220]">
                    <div className="flex items-center gap-2">
                      <Link href={`/races?state=${st.stateAbbr}`} className="hover:text-[#0E63C4] transition flex items-center gap-1.5">
                        <span>{st.state}</span>
                        <span className="text-[#5B6779] text-[11px] font-mono font-normal">({st.stateAbbr})</span>
                      </Link>
                    </div>
                  </td>

                  <td className="py-3 px-3 font-sans">
                    <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                      st.votingSystem === 'Ranked-Choice' ? 'bg-[#FAF5FF] text-[#6B21A8] border border-[#E9D5FF]' :
                      st.votingSystem === 'Top-Two Primary' ? 'bg-[#ECFEFF] text-[#0E7490] border border-[#A5F3FC]' :
                      st.votingSystem === 'Majority/Runoff' ? 'bg-[#FFFBEB] text-[#92400E] border border-[#FDE68A]' :
                      'text-[#5B6779]'
                    }`}>
                      {st.votingSystem}
                    </span>
                  </td>

                  <td className="py-3 px-3 text-center">
                    {st.tier1Expected > 0 ? (
                      <span className="text-[#166534] font-bold bg-[#F0FDF4] border border-[#BBF7D0] px-2 py-0.5 rounded">
                        {st.tier1Verified} / {st.tier1Expected}
                      </span>
                    ) : (
                      <span className="text-[#94A3B8]">—</span>
                    )}
                  </td>

                  <td className="py-3 px-3 text-center font-bold">
                    {st.tier2Expected > 0 ? (
                      <span className="text-[#166534] bg-[#F0FDF4] border border-[#BBF7D0] px-2 py-0.5 rounded">
                        {st.tier2Verified} / {st.tier2Expected}
                      </span>
                    ) : (
                      <span className="text-[#94A3B8]">—</span>
                    )}
                  </td>

                  <td className="py-3 px-3 text-center font-bold">
                    {st.tier3Expected > 0 ? (
                      <span className="text-[#0A3F73] bg-[#EBF3FD] border border-[#CBD5E1] px-2 py-0.5 rounded">
                        {st.tier3Verified} / {st.tier3Expected}
                      </span>
                    ) : (
                      <span className="text-[#94A3B8]">—</span>
                    )}
                  </td>

                  <td className="py-3 px-4 text-right font-sans">
                    <a
                      href={st.officialPortal}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0E63C4] hover:text-[#0A4E9E] text-[11px] font-semibold inline-flex items-center gap-1"
                    >
                      <span>Portal</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
