'use client';

import React from 'react';
import Link from 'next/link';
import { 
  getAllRaces, 
  getRaceById, 
  computeSenateControl, 
  getCoverageMetrics,
  Race,
  Candidate
} from '@/lib/races';
import { 
  Vote, TrendingUp, BarChart2, ExternalLink, 
  Layers, Users, MapPin, Calendar, Clock, ChevronRight,
  Swords, ShieldAlert, Sparkles, Trophy, Zap, Compass
} from 'lucide-react';
import { TacticalElectoralMap } from '@/components/TacticalElectoralMap';

export default function ControlBoardPage() {
  const races = getAllRaces();
  const control = computeSenateControl();
  const metrics = getCoverageMetrics();
  
  // Sourced Featured Race: Texas Senate (Paxton vs Talarico)
  const txRace = getRaceById('senate-tx') || races[0];
  const txNominees = txRace.candidates.filter(c => c.status === 'nominee');
  const txDefeatedIncumbent = txRace.candidates.find(
    c => c.status === 'incumbent-defeated-in-primary-runoff' || c.status === 'incumbent-not-running'
  );

  // Competitive Battleground Spotlight Races
  const battlegroundIds = ['senate-tx', 'senate-mi', 'senate-nh', 'senate-nc', 'senate-me', 'senate-oh', 'senate-ga', 'gov-ga'];
  const battlegroundRaces = races.filter(r => battlegroundIds.includes(r.id));

  const electionDate = new Date('2026-11-03T07:00:00-05:00').getTime();
  const now = Date.now();
  const daysToElection = Math.max(0, Math.ceil((electionDate - now) / (1000 * 60 * 60 * 24)));

  const formatStatus = (s: string) => {
    if (s === 'incumbent-defeated-in-primary-runoff') return 'Defeated in Primary Runoff';
    if (s === 'nominee') return 'Nominee';
    if (s === 'incumbent-not-running') return 'Incumbent (Retiring)';
    return s;
  };

  return (
    <div className="space-y-8 font-mono">
      {/* ── 1. ARCADE CABINET MARQUEE BANNER ───────────────────────────── */}
      <div className="relative p-6 rounded-2xl bg-[#100C2A] border-4 border-[#00F0FF] shadow-[0_0_25px_rgba(0,240,255,0.35)] overflow-hidden">
        {/* Subtle decorative neon corner brackets */}
        <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#FFE600]"></div>
        <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#FFE600]"></div>
        <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#FFE600]"></div>
        <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#FFE600]"></div>

        <div className="flex flex-wrap items-center justify-between gap-6 relative z-10">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="font-arcade text-[10px] bg-[#FF007F] text-white px-3 py-1 rounded shadow-[0_0_10px_rgba(255,0,127,0.6)] tracking-wider">
                ★ {daysToElection} DAYS TO NOV 3, 2026 GENERAL ELECTION ★
              </span>
              <span className="font-arcade text-[9px] text-[#FFE600] tracking-widest uppercase">
                {metrics.senateTotal} SENATE · {metrics.govTotal} GOV · {metrics.houseTotal} HOUSE · {metrics.mayorTotal} MAYORAL
              </span>
            </div>

            <h1 className="font-arcade text-xl sm:text-2xl md:text-3xl text-[#FFE600] tracking-tight arcade-text-glow-yellow leading-tight mt-1">
              2026 MIDTERM CONTROL BOARD
            </h1>
            <p className="text-xs sm:text-sm font-crt text-[#C7D2FE] text-[17px] max-w-3xl leading-relaxed">
              Every displayed candidate requires an official source URL. Polling averages publish their mathematical method and qualifying poll criteria. Forecaster ratings are unblended.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/polls"
              className="arcade-btn bg-[#39FF14] hover:bg-[#2ECC10] text-[#080616] text-[10px] font-arcade px-4 py-3 rounded-lg border-2 border-white shadow-[0_0_15px_rgba(57,255,20,0.6)] text-center transition flex items-center justify-center gap-2"
            >
              <Zap className="w-4 h-4 text-[#080616]" />
              <span>BROWSE SOURCED POLLS ➔</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── 2. HIGH SCORE TELEMETRY (RECONCILED 34 + 21 + 1 + 26 = 82) ────── */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-[10px] font-arcade text-[#00F0FF] tracking-wider uppercase">
          <Trophy className="w-3.5 h-3.5 text-[#FFE600]" />
          <span>STAGE METRICS &amp; NOMINEE TELEMETRY</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {/* Total Races */}
          <div className="p-4 rounded-xl bg-[#140F32] border-2 border-[#00F0FF] shadow-[0_0_12px_rgba(0,240,255,0.25)] flex flex-col justify-between">
            <div className="font-arcade text-[9px] uppercase text-[#00F0FF]">TOTAL RACES TRACKED</div>
            <div className="font-arcade text-2xl text-white mt-1 arcade-text-glow-cyan">{metrics.totalRaces}</div>
            <div className="font-arcade text-[9px] text-[#39FF14] mt-1">{metrics.racesWithSourcedNominee} with sourced nominee</div>
          </div>

          {/* Senate */}
          <div className="p-4 rounded-xl bg-[#140F32] border-2 border-[#FFE600] shadow-[0_0_12px_rgba(255,230,0,0.25)] flex flex-col justify-between">
            <div className="font-arcade text-[9px] uppercase text-[#FFE600]">SENATE RACES</div>
            <div className="font-arcade text-2xl text-white mt-1 arcade-text-glow-yellow">{metrics.senateSourced} of {metrics.senateTotal}</div>
            <div className="font-arcade text-[9px] text-[#A5B4FC] mt-1">33 Class II + 2 Specials</div>
          </div>

          {/* Governor */}
          <div className="p-4 rounded-xl bg-[#140F32] border-2 border-[#39FF14] shadow-[0_0_12px_rgba(57,255,20,0.25)] flex flex-col justify-between">
            <div className="font-arcade text-[9px] uppercase text-[#39FF14]">GOVERNOR RACES</div>
            <div className="font-arcade text-2xl text-white mt-1 arcade-text-glow-green">{metrics.govSourced} of {metrics.govTotal}</div>
            <div className="font-arcade text-[9px] text-[#A5B4FC] mt-1">36 State Contests</div>
          </div>

          {/* House */}
          <div className="p-4 rounded-xl bg-[#140F32] border-2 border-[#FF007F] shadow-[0_0_12px_rgba(255,0,127,0.25)] flex flex-col justify-between">
            <div className="font-arcade text-[9px] uppercase text-[#FF007F]">HOUSE DISTRICTS</div>
            <div className="font-arcade text-2xl text-white mt-1 arcade-text-glow-pink">{metrics.houseSourced} of {metrics.houseTotal}</div>
            <div className="font-arcade text-[9px] text-[#A5B4FC] mt-1">CA-13 Spotlight</div>
          </div>

          {/* Mayoral */}
          <div className="p-4 rounded-xl bg-[#140F32] border-2 border-[#FF5500] shadow-[0_0_12px_rgba(255,85,0,0.25)] flex flex-col justify-between">
            <div className="font-arcade text-[9px] uppercase text-[#FF5500]">MONITORED MAYORAL</div>
            <div className="font-arcade text-2xl text-white mt-1 text-[#FF5500]">{metrics.mayorSourced} of {metrics.mayorTotal}</div>
            <div className="font-arcade text-[9px] text-[#A5B4FC] mt-1">31 Contests (AZ, CA, NV, TX)</div>
          </div>
        </div>
      </div>

      {/* ── 3. SENATE 2-PLAYER VERSUS BATTLE ARENA ─────────────────────── */}
      <div className="bg-[#120D2F] border-3 border-[#2D2264] rounded-2xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.7)] space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#2D2264] pb-4">
          <div>
            <h2 className="font-arcade text-base sm:text-lg text-white flex items-center gap-2.5">
              <Swords className="w-5 h-5 text-[#FFE600]" />
              <span>SENATE MAJORITY ARITHMETIC (119th CONGRESS BASELINE)</span>
            </h2>
            <p className="text-xs font-crt text-[16px] text-[#A5B4FC] mt-1">
              Current chamber: 53 Republicans, 47 Democrats/Independents. 51 seats required for majority.
            </p>
          </div>
          <div className="bg-[#1C1642] px-3 py-1.5 rounded-lg border border-[#3A2E70] text-right">
            <span className="font-arcade text-[8px] text-[#00F0FF] uppercase block">SEATS UP IN 2026</span>
            <div className="font-arcade text-xs text-[#FFE600] mt-0.5">{control.totalSenateRaces} CONTESTS</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Player 1: Democrats */}
          <div className="p-4 rounded-xl bg-[#0F1E40] border-2 border-[#00F0FF] shadow-[0_0_15px_rgba(0,240,255,0.3)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-arcade text-[9px] text-[#00F0FF] uppercase">1P: DEMOCRATIC FORCES</span>
              <span className="font-arcade text-[8px] bg-[#00F0FF] text-[#080616] px-1.5 py-0.5 rounded font-bold">P1</span>
            </div>
            <div>
              <div className="text-xs text-[#93C5FD] font-semibold">Democratic Holdovers</div>
              <div className="font-arcade text-3xl font-extrabold text-[#00F0FF] arcade-text-glow-cyan mt-1">
                {control.demHoldovers} <span className="text-sm font-normal text-[#93C5FD]">/ 51</span>
              </div>
            </div>
            {/* 80s Pixel Power Meter */}
            <div className="space-y-1">
              <div className="h-3 w-full bg-[#091228] border border-[#00F0FF] p-0.5 rounded-xs flex gap-0.5">
                {Array.from({ length: 51 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-full flex-1 ${i < control.demHoldovers ? 'bg-[#00F0FF]' : 'bg-[#1E293B]'}`}
                  />
                ))}
              </div>
              <div className="font-arcade text-[8px] text-[#00F0FF] pt-1">
                Needs {control.majorityThreshold - control.demHoldovers} of 35 contests to win (13 holds + 4 net flips)
              </div>
            </div>
          </div>

          {/* Versus / Toss-Up Center */}
          <div className="p-4 rounded-xl bg-[#261536] border-2 border-[#FFE600] shadow-[0_0_15px_rgba(255,230,0,0.3)] flex flex-col justify-between text-center space-y-3">
            <div className="font-arcade text-[11px] text-[#FFE600] arcade-text-glow-yellow uppercase tracking-widest">
              ⚔️ VERSUS CLASH ⚔️
            </div>
            <div>
              <div className="text-xs text-[#FED7AA] font-semibold">Toss-Up Battlegrounds</div>
              <div className="font-arcade text-3xl font-extrabold text-[#FFE600] arcade-text-glow-yellow mt-1">
                {control.tossUps}
              </div>
            </div>
            <div className="font-arcade text-[8px] text-[#FDE68A] bg-[#1E112B] p-2 rounded border border-[#FFE600]/40">
              Cook Political Report Toss-Ups
            </div>
          </div>

          {/* Player 2: Republicans */}
          <div className="p-4 rounded-xl bg-[#360F1F] border-2 border-[#FF007F] shadow-[0_0_15px_rgba(255,0,127,0.3)] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-arcade text-[9px] text-[#FF007F] uppercase">2P: REPUBLICAN FORCES</span>
              <span className="font-arcade text-[8px] bg-[#FF007F] text-white px-1.5 py-0.5 rounded font-bold">P2</span>
            </div>
            <div>
              <div className="text-xs text-[#FCA5A5] font-semibold">Republican Holdovers</div>
              <div className="font-arcade text-3xl font-extrabold text-[#FF007F] arcade-text-glow-pink mt-1">
                {control.repHoldovers} <span className="text-sm font-normal text-[#FCA5A5]">/ 51</span>
              </div>
            </div>
            {/* 80s Pixel Power Meter */}
            <div className="space-y-1">
              <div className="h-3 w-full bg-[#1F0913] border border-[#FF007F] p-0.5 rounded-xs flex gap-0.5">
                {Array.from({ length: 51 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-full flex-1 ${i < control.repHoldovers ? 'bg-[#FF007F]' : 'bg-[#1E293B]'}`}
                  />
                ))}
              </div>
              <div className="font-arcade text-[8px] text-[#FF007F] pt-1">
                Needs {control.majorityThreshold - control.repHoldovers} of 35 contests to hold (maintain 51 seats)
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. FEATURED BOSS BATTLE: TEXAS SENATE ──────────────────────── */}
      <div className="p-6 rounded-2xl bg-[#120E2E] border-4 border-[#00F0FF] shadow-[0_0_30px_rgba(0,240,255,0.4)] space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-[#2D2264] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-arcade text-[9px] bg-[#00F0FF] text-[#080616] px-2.5 py-1 rounded font-bold">
                ★ FEATURED BOSS BATTLE: TEXAS (CLASS II) ★
              </span>
              <span className="font-arcade text-[9px] bg-[#FFE600] text-[#080616] px-2 py-0.5 rounded font-bold">
                RATING: TOSS UP
              </span>
            </div>
            <h2 className="font-arcade text-lg sm:text-xl text-white mt-2 arcade-text-glow-yellow">
              Ken Paxton (REP, Nominee) vs. James Talarico (DEM, Nominee)
            </h2>
            {txDefeatedIncumbent && (
              <span className="font-crt text-[15px] text-[#FCA5A5] block mt-1">
                💀 Note: Incumbent Senator John Cornyn was defeated in the May 26 primary runoff.
              </span>
            )}
          </div>
          <span className="font-arcade text-[9px] bg-[#2A1435] text-[#FFE600] border-2 border-[#FFE600] px-3 py-1.5 rounded shadow-[0_0_10px_rgba(255,230,0,0.4)]">
            Rating: Toss Up (Cook / Sabato / Inside Elections)
          </span>
        </div>

        {/* Polling Average Dual Arcade Power Gauge */}
        {txRace.polling_average && (
          <div className="p-5 rounded-xl bg-[#0B081F] border-2 border-[#FFE600] shadow-[0_0_15px_rgba(255,230,0,0.2)] space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#2D2264] pb-3">
              <span className="font-arcade text-xs text-[#FFE600] arcade-text-glow-yellow flex items-center gap-2 uppercase">
                <BarChart2 className="w-4 h-4 text-[#00F0FF]" />
                <span>POLLING AVERAGE: {txRace.polling_average.leader} +{txRace.polling_average.spread}%</span>
              </span>
              <span className="font-crt text-[15px] text-[#A5B4FC]">
                Computed across {txRace.polling_average.qualifying_polls_count} qualifying surveys (UH/HPM, Marist, UT/Texas Politics Project)
              </span>
            </div>

            {/* Head-to-Head Headshot / Gauge Bars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Talarico */}
              <div className="p-3.5 rounded-lg bg-[#0E1C38] border-2 border-[#00F0FF] shadow-[0_0_10px_rgba(0,240,255,0.3)] space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-arcade text-[10px] text-[#00F0FF]">JAMES TALARICO (DEM)</span>
                  <span className="font-arcade text-base text-[#00F0FF] arcade-text-glow-cyan">
                    {txRace.polling_average.averages?.['James Talarico']}%
                  </span>
                </div>
                <div className="h-4 w-full bg-[#080F1E] border border-[#00F0FF] p-0.5 flex">
                  <div
                    className="h-full bg-[#00F0FF] arcade-meter-bar"
                    style={{ width: `${(txRace.polling_average.averages?.['James Talarico'] || 48) * 1.5}%` }}
                  />
                </div>
                <div className="font-arcade text-[8px] text-[#39FF14] flex items-center gap-1">
                  <span>👑</span>
                  <span>1P LEADER (+2.3% ADVANTAGE)</span>
                </div>
              </div>

              {/* Paxton */}
              <div className="p-3.5 rounded-lg bg-[#2E0E1E] border-2 border-[#FF007F] shadow-[0_0_10px_rgba(255,0,127,0.3)] space-y-1.5">
                <div className="flex justify-between items-center">
                  <span className="font-arcade text-[10px] text-[#FF007F]">KEN PAXTON (REP)</span>
                  <span className="font-arcade text-base text-[#FF007F] arcade-text-glow-pink">
                    {txRace.polling_average.averages?.['Ken Paxton']}%
                  </span>
                </div>
                <div className="h-4 w-full bg-[#1A0710] border border-[#FF007F] p-0.5 flex">
                  <div
                    className="h-full bg-[#FF007F] arcade-meter-bar"
                    style={{ width: `${(txRace.polling_average.averages?.['Ken Paxton'] || 46) * 1.5}%` }}
                  />
                </div>
                <div className="font-arcade text-[8px] text-[#FF5500]">
                  <span>⚔️</span>
                  <span>2P CHALLENGER (-2.3% TRAILING)</span>
                </div>
              </div>
            </div>

            <div className="pt-2 border-t border-[#2D2264] text-xs font-crt text-[15px] text-[#A5B4FC] leading-relaxed">
              <strong className="text-[#FFE600]">Method:</strong> {txRace.polling_average.method}
            </div>
          </div>
        )}

        {/* Forecaster Spread: Side by Side without Blending */}
        <div className="space-y-2">
          <span className="font-arcade text-[9px] text-[#00F0FF] uppercase tracking-wider block">
            FORECASTER RATINGS SPREAD (DISPLAYED VERBATIM · UNBLENDED):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            {txRace.ratings.map((r, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-[#140F32] border-2 border-[#FFE600] shadow-[0_0_10px_rgba(255,230,0,0.25)] space-y-1">
                <strong className="font-arcade text-[9px] text-[#FFE600] block uppercase">{r.rater}</strong>
                <span className="font-arcade text-sm text-[#39FF14] arcade-text-glow-green block">{r.verbatim_label}</span>
                <span className="font-crt text-[14px] text-[#A5B4FC] block">As of: {r.rater_date}</span>
                <a 
                  href={r.source_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-arcade text-[8px] text-[#00F0FF] hover:underline flex items-center gap-1 mt-2 inline-flex"
                >
                  <span>SOURCE LINK</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Candidate Source Receipts */}
        <div className="pt-3 border-t-2 border-[#2D2264] flex flex-wrap gap-4 text-xs">
          {txRace.candidates.map((c, i) => (
            <div key={i} className="flex items-center gap-2 bg-[#17113A] px-3 py-1.5 rounded-lg border border-[#3A2E70]">
              <span className="font-bold text-white">{c.name}</span>
              <span className="text-[10px] text-[#A5B4FC]">({c.party}, {formatStatus(c.status)})</span>
              <a
                href={c.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-arcade text-[8px] text-[#00F0FF] hover:text-[#FFE600] flex items-center gap-1 ml-1"
              >
                <span>SOURCED</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ── 5. STAGE SELECT: 8 COMPETITIVE BATTLEGROUNDS ───────────────── */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#2D2264] pb-3">
          <div>
            <h2 className="font-arcade text-base sm:text-lg text-[#FFE600] flex items-center gap-2 arcade-text-glow-yellow">
              <Trophy className="w-5 h-5 text-[#39FF14]" />
              <span>STAGE SELECT: COMPETITIVE BATTLEGROUND SPOTLIGHT</span>
            </h2>
            <p className="text-xs font-crt text-[16px] text-[#A5B4FC] mt-0.5">
              Sourced nominees across Michigan, New Hampshire, North Carolina, Maine, Ohio, and Georgia with unblended forecaster ratings.
            </p>
          </div>
          <Link
            href="/races"
            className="arcade-btn bg-[#FF007F] hover:bg-[#D9006C] text-white text-[9px] font-arcade px-3 py-2 rounded-lg border border-white flex items-center gap-1.5 shadow-[0_0_10px_rgba(255,0,127,0.5)]"
          >
            <span>VIEW ALL {metrics.totalRaces} STAGES</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {battlegroundRaces.map((r, stageIdx) => {
            const nominees = r.candidates.filter(c => c.status === 'nominee');
            const primaryRating = r.ratings[0]?.verbatim_label || 'In Review';

            return (
              <div 
                key={r.id} 
                className="p-5 rounded-2xl bg-[#130E2E] border-2 border-[#2D2264] hover:border-[#00F0FF] shadow-[0_4px_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(0,240,255,0.4)] transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-[#2D2264] pb-2.5">
                    <div>
                      <span className="font-arcade text-[8px] text-[#00F0FF] tracking-wider uppercase block">
                        STAGE 0{stageIdx + 1} · {r.state} · TIER {r.tier}
                      </span>
                      <h3 className="font-arcade text-xs text-white mt-1 group-hover:text-[#FFE600] transition-colors">
                        {r.office}
                      </h3>
                    </div>
                    <span className="font-arcade text-[8px] px-2 py-1 rounded bg-[#2E1430] text-[#FFE600] border border-[#FFE600] shadow-[0_0_8px_rgba(255,230,0,0.3)]">
                      {primaryRating}
                    </span>
                  </div>

                  {/* Nominees */}
                  <div className="space-y-2 text-xs">
                    {nominees.length > 0 ? (
                      nominees.map((c, i) => (
                        <div key={i} className="flex items-center justify-between bg-[#1B143E] px-2.5 py-1.5 rounded-lg border border-[#3A2E70]">
                          <span className="font-semibold text-white">{c.name}</span>
                          <span className={`font-arcade text-[8px] px-2 py-0.5 rounded border ${
                            c.party === 'REP' ? 'bg-[#FF007F] text-white border-white' :
                            c.party === 'DEM' ? 'bg-[#00F0FF] text-[#080616] border-white' :
                            'bg-[#39FF14] text-[#080616] border-white'
                          }`}>
                            {c.party}
                          </span>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-[#A5B4FC] italic">Nominee not yet sourced</div>
                    )}
                  </div>

                  {/* Unblended Forecaster Ratings Spread */}
                  {r.ratings.length > 0 && (
                    <div className="pt-2 border-t border-[#2D2264] space-y-1.5 text-[10px]">
                      <span className="font-arcade text-[8px] text-[#00F0FF] uppercase block">FORECASTER SPREAD:</span>
                      <div className="space-y-1">
                        {r.ratings.map((rt, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-[#0C0820] px-2 py-1 rounded border border-[#2D2264]">
                            <span className="text-[#C7D2FE] font-medium">{rt.rater.replace(' Political Report', '').replace("'s Crystal Ball", '')}:</span>
                            <span className="font-arcade text-[8px] text-[#39FF14]">{rt.verbatim_label} <span className="text-[#A5B4FC] font-normal">({rt.rater_date})</span></span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Latest Survey (e.g. GA Gov AJC/UGA Poll) */}
                  {r.polls && r.polls.length > 0 && (
                    <div className="text-[10px] text-[#FFE600] bg-[#22173F] p-2 rounded border border-[#FFE600]/40">
                      <span className="font-arcade text-[8px] text-[#FFE600] block mb-0.5">LATEST SURVEY:</span>
                      <span className="font-crt text-[15px] text-white">{r.polls[0].pollster} ({r.polls[0].field_dates}):{' '}
                      {Object.entries(r.polls[0].results).map(([k, v]) => `${k} ${v}%`).join(', ')}</span>
                    </div>
                  )}
                </div>

                <div className="pt-3 border-t border-[#2D2264] flex items-center justify-between text-[10px]">
                  <span className="text-[#A5B4FC] font-crt text-[14px]">STATUS: {r.status}</span>
                  <Link 
                    href={`/races#${r.id}`} 
                    className="arcade-btn bg-[#00F0FF] hover:bg-[#00D4E0] text-[#080616] text-[8px] font-arcade px-2.5 py-1 rounded border border-white flex items-center gap-1 shadow-[0_0_8px_rgba(0,240,255,0.4)]"
                  >
                    <span>DETAILS</span>
                    <ChevronRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* ── 6. TACTICAL RADAR: NATIONAL & STATE JURISDICTION DRILLDOWN ── */}
      <div className="space-y-4 pt-6 border-t-2 border-[#2D2264]">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-[#2D2264] pb-3">
          <div>
            <h2 className="font-arcade text-base sm:text-lg text-[#FFE600] flex items-center gap-2 arcade-text-glow-yellow">
              <Compass className="w-5 h-5 text-[#39FF14] animate-spin-slow" />
              <span>TACTICAL RADAR: NATIONAL &amp; STATE JURISDICTIONS</span>
            </h2>
            <p className="text-xs font-crt text-[16px] text-[#A5B4FC] mt-0.5">
              Vector zoom from national US map into state jurisdictions, congressional districts, and municipal cities with clickable sub-races.
            </p>
          </div>
          <Link
            href="/map"
            className="arcade-btn bg-[#39FF14] hover:bg-[#2ECC10] text-[#080616] text-[9px] font-arcade px-3 py-2 rounded-lg border border-white flex items-center gap-1.5 shadow-[0_0_10px_rgba(57,255,20,0.5)] font-bold"
          >
            <span>FULL COCKPIT RADAR</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        <TacticalElectoralMap />
      </div>
    </div>
  );
}
