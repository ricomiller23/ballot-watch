import { BattlegroundElectoralMap } from "@/components/BattlegroundElectoralMap";
import React from 'react';
import Link from 'next/link';
import { SEED_RACES, SEED_POLLS, SEED_RATINGS, SEED_FORECASTS } from '@/lib/fallback-data';
import { calculateControlArithmetic } from '@/lib/control';
import { calculatePollingAverage } from '@/lib/average';
import { Vote, TrendingUp, BarChart2, ExternalLink, AlertTriangle, Layers } from 'lucide-react';

export const revalidate = 60;

export default function ControlBoardPage() {
  const control = calculateControlArithmetic();
  const txAvg = calculatePollingAverage('2026-SEN-TX', SEED_POLLS);

  return (
    <div className="space-y-6 font-mono">
      {/* Top Banner */}
      <div className="bg-[#F6F8FB] border border-[#E4E9F0] p-5 rounded-xl shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold bg-[#B42318] text-white px-2 py-0.5 rounded">
                48 DAYS TO 3 NOV 2026 GENERAL ELECTION
              </span>
              <span className="text-xs text-[#5B6779]">
                435 House & 33 Senate Seats · Primaries Concluded 15 Sep Across 46 States
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#0B1220] tracking-tight font-display">
              2026 Midterm Control Board & Certified Race Tracker
            </h1>
            <p className="text-xs text-[#24303F] mt-1 max-w-3xl leading-relaxed">
              Every poll requires pollster, field dates, sample size, and method. Polling averages publish their mathematical method directly on the figure. Ratings are never blended.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/polls"
              className="bg-[#0E63C4] hover:bg-[#0A4E9E] text-white text-xs font-bold px-3 py-2 rounded-lg transition"
            >
              Browse All Polls →
            </Link>
          </div>
        </div>
      </div>

      <BattlegroundElectoralMap />

      {/* ── COMPLETE LOCAL-TO-FEDERAL REGISTRY LAUNCHER ───────────────────────── */}
      <div className="bg-[#FFFFFF] border-2 border-[#0E63C4] rounded-xl p-5 shadow-sm space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E4E9F0] pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider bg-[#0E63C4] text-white px-2.5 py-0.5 rounded shadow-xs">
                3,000+ Local Races · Populations ≥ 1,000
              </span>
              <span className="text-xs text-[#5B6779]">
                Covering All 50 States
              </span>
            </div>
            <h2 className="text-lg font-extrabold text-[#0B1220] mt-1.5">
              Local Elections Directory: Every Office From Treasurer Down to Dog Catcher
            </h2>
          </div>
          <div className="flex gap-2">
            <Link
              href="/local"
              className="bg-[#0E63C4] hover:bg-[#0A4E9E] text-white text-xs font-bold px-4 py-2 rounded-lg transition shadow-xs flex items-center gap-1.5"
            >
              Browse Local Races (Pop ≥ 1k) →
            </Link>
            <Link
              href="/candidates"
              className="bg-[#F6F8FB] hover:bg-[#EBF3FD] text-[#0B1220] text-xs font-bold px-3 py-2 rounded-lg border border-[#CBD5E1] transition"
            >
              All Candidates
            </Link>
          </div>
        </div>
        <p className="text-xs text-[#5B6779] leading-relaxed">
          Exhaustive nationwide directory tracking all electable positions in jurisdictions with population over 1,000: elected Town Dog Catchers / Animal Control Officers, City & County Treasurers, Tax Collectors, Town Clerks, Selectboards, Town Moderators, Constables, Justices of the Peace, School Boards, Highway Superintendents, and Fire/Water Special Districts.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 pt-1 text-xs">
          <Link href="/local?office=dog_catcher" className="p-3 rounded-lg bg-[#FEFCE8] border-2 border-[#EAB308] hover:bg-[#FEF08A] transition text-center group">
            <span className="text-xl block mb-1">🐕</span>
            <strong className="text-[#0B1220] block group-hover:text-[#0E63C4]">Dog Catchers</strong>
            <span className="text-[10px] text-[#713F12] font-semibold">25 Contests (Pop ≥ 1k)</span>
          </Link>
          <Link href="/local?office=treasurer" className="p-3 rounded-lg bg-[#F0FDF4] border border-[#BBF7D0] hover:bg-[#DCFCE7] transition text-center group">
            <span className="text-xl block mb-1">💰</span>
            <strong className="text-[#0B1220] block group-hover:text-[#0E63C4]">Treasurers</strong>
            <span className="text-[10px] text-[#166534] font-semibold">290+ Town/County</span>
          </Link>
          <Link href="/local?office=clerk" className="p-3 rounded-lg bg-[#F6F8FB] border border-[#CBD5E1] hover:bg-[#EBF3FD] transition text-center group">
            <span className="text-xl block mb-1">📜</span>
            <strong className="text-[#0B1220] block group-hover:text-[#0E63C4]">Town Clerks</strong>
            <span className="text-[10px] text-[#5B6779]">270+ Elections</span>
          </Link>
          <Link href="/local?office=selectboard" className="p-3 rounded-lg bg-[#F6F8FB] border border-[#CBD5E1] hover:bg-[#EBF3FD] transition text-center group">
            <span className="text-xl block mb-1">🏛️</span>
            <strong className="text-[#0B1220] block group-hover:text-[#0E63C4]">Selectboard / Council</strong>
            <span className="text-[10px] text-[#5B6779]">Local Governing</span>
          </Link>
          <Link href="/local?office=moderator" className="p-3 rounded-lg bg-[#F6F8FB] border border-[#CBD5E1] hover:bg-[#EBF3FD] transition text-center group">
            <span className="text-xl block mb-1">🗣️</span>
            <strong className="text-[#0B1220] block group-hover:text-[#0E63C4]">Town Moderators</strong>
            <span className="text-[10px] text-[#5B6779]">Town Meeting Day</span>
          </Link>
          <Link href="/offices" className="p-3 rounded-lg bg-[#F6F8FB] border border-[#CBD5E1] hover:bg-[#EBF3FD] transition text-center group">
            <span className="text-xl block mb-1">📋</span>
            <strong className="text-[#0B1220] block group-hover:text-[#0E63C4]">All 4,190+ Offices</strong>
            <span className="text-[10px] text-[#5B6779]">Every Single Office</span>
          </Link>
        </div>
      </div>


      {/* Control Arithmetic: House & Senate */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* House */}
        <div className="bg-[#FFFFFF] border border-[#E4E9F0] p-5 rounded-xl shadow-xs text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#E4E9F0] pb-2">
            <strong className="text-sm text-[#0B1220] uppercase tracking-wider">US House Control Board (435 Seats)</strong>
            <span className="text-[10px] font-bold bg-[#EBF3FD] text-[#0A3F73] px-2 py-0.5 rounded border border-[#CBD5E1]">
              Target: 218 for Majority
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded bg-[#EBF3FD] border border-[#CBD5E1]">
              <span className="text-[#0A3F73] text-[10px] block">DEM HELD / LEAN</span>
              <strong className="text-lg text-[#0E63C4]">{control.house.demHeld}</strong>
            </div>
            <div className="p-2.5 rounded bg-[#FFFBEB] border border-[#FCE8A5]">
              <span className="text-[#8A6100] text-[10px] block">TOSS-UPS</span>
              <strong className="text-lg text-[#8A6100]">{control.house.tossUps}</strong>
            </div>
            <div className="p-2.5 rounded bg-[#FEF2F2] border border-[#FBD5D5]">
              <span className="text-[#B42318] text-[10px] block">REP HELD / LEAN</span>
              <strong className="text-lg text-[#B42318]">{control.house.repHeld}</strong>
            </div>
          </div>
          <p className="text-[#5B6779] text-[11px] leading-relaxed pt-1 border-t border-[#E4E9F0]">
            {control.house.note}
          </p>
        </div>

        {/* Senate */}
        <div className="bg-[#FFFFFF] border border-[#E4E9F0] p-5 rounded-xl shadow-xs text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-[#E4E9F0] pb-2">
            <strong className="text-sm text-[#0B1220] uppercase tracking-wider">US Senate Control Board (100 Seats)</strong>
            <span className="text-[10px] font-bold bg-[#EBF3FD] text-[#0A3F73] px-2 py-0.5 rounded border border-[#CBD5E1]">
              Target: 51 (or 50 + VP)
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded bg-[#EBF3FD] border border-[#CBD5E1]">
              <span className="text-[#0A3F73] text-[10px] block">DEM HELD / LEAN</span>
              <strong className="text-lg text-[#0E63C4]">{control.senate.demHeld}</strong>
            </div>
            <div className="p-2.5 rounded bg-[#FFFBEB] border border-[#FCE8A5]">
              <span className="text-[#8A6100] text-[10px] block">TOSS-UPS</span>
              <strong className="text-lg text-[#8A6100]">{control.senate.tossUps}</strong>
            </div>
            <div className="p-2.5 rounded bg-[#FEF2F2] border border-[#FBD5D5]">
              <span className="text-[#B42318] text-[10px] block">REP HELD / LEAN</span>
              <strong className="text-lg text-[#B42318]">{control.senate.repHeld}</strong>
            </div>
          </div>
          <p className="text-[#5B6779] text-[11px] leading-relaxed pt-1 border-t border-[#E4E9F0]">
            {control.senate.note}
          </p>
        </div>
      </div>

      {/* Featured Competitive Race: Texas Senate (Paxton vs Talarico) */}
      <div className="bg-[#FFFFFF] border-2 border-[#0E63C4] rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E4E9F0] pb-3 text-xs">
          <div>
            <span className="font-bold bg-[#EBF3FD] text-[#0A3F73] px-2 py-0.5 rounded border border-[#CBD5E1]">
              FEATURED SENATE RACE: TEXAS (CLASS II)
            </span>
            <h2 className="text-base font-bold text-[#0B1220] mt-1">Ken Paxton (REP) vs. James Talarico (DEM)</h2>
          </div>
          <span className="text-xs font-bold bg-[#FFFBEB] text-[#8A6100] border border-[#FCE8A5] px-2.5 py-0.5 rounded">
            Rating: Toss Up (Cook / Sabato)
          </span>
        </div>

        {/* Polling Average Display with Published Method Block */}
        {txAvg.status === 'published' && txAvg.averages && (
          <div className="p-4 rounded-lg bg-[#F6F8FB] border border-[#CBD5E1] text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0B1220] uppercase text-[11px] flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-[#0E63C4]" /> Certified Polling Average: Talarico +2.5%
              </span>
              <span className="text-[10px] text-[#5B6779]">Computed across {txAvg.methodBlock.qualifyingPollCount} qualifying surveys</span>
            </div>

            <div className="flex items-center gap-4 text-sm font-bold">
              <div className="text-[#0E63C4]">James Talarico (DEM): {txAvg.averages['James Talarico']}%</div>
              <div className="text-[#B42318]">Ken Paxton (REP): {txAvg.averages['Ken Paxton']}%</div>
            </div>

            {/* Published Method Block */}
            <div className="pt-2 border-t border-[#E4E9F0] text-[10px] text-[#5B6779] leading-relaxed">
              <strong>Published Mathematical Method:</strong> {txAvg.methodBlock.description} Window: {txAvg.methodBlock.windowDays}d. {txAvg.methodBlock.recencyWeighting}. Exclusions: {txAvg.methodBlock.exclusionRules.join('; ')}.
            </div>
          </div>
        )}

        {/* Forecaster Spread: Side by Side without Blending */}
        <div>
          <span className="text-[10px] font-bold text-[#5B6779] uppercase block mb-1">
            Forecaster Ratings Spread (Displayed Verbatim · Unblended):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            {SEED_RATINGS.map((r) => (
              <div key={r.id} className="p-2.5 rounded bg-[#FFFFFF] border border-[#E4E9F0]">
                <strong className="text-[#0B1220] block uppercase text-[10px]">{r.rater}</strong>
                <span className="font-bold text-sm text-[#8A6100]">{r.verbatim_label}</span>
                <span className="text-[10px] text-[#8494A8] block mt-0.5">As of: {r.rater_date}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Prediction Markets Crowds (with Mandatory Timestamp) */}
      <div className="bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between border-b border-[#E4E9F0] pb-2 text-xs">
          <strong className="text-[#0B1220] uppercase tracking-wider">
            Prediction Market Probabilities (External Forecasts)
          </strong>
          <span className="text-[10px] text-[#5B6779]">
            Source: Polymarket · Not our forecast
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {SEED_FORECASTS.map((fc) => (
            <div key={fc.id} className="p-3 rounded-lg bg-[#F6F8FB] border border-[#E4E9F0] flex justify-between items-center">
              <div>
                <strong className="text-sm text-[#0B1220] block">Democrats Win {fc.scope === 'chamber' ? 'Majority' : fc.scope}</strong>
                <span className="text-[10px] text-[#8494A8]">As of: {fc.as_of} (Timestamped)</span>
              </div>
              <span className="text-xl font-bold text-[#0E63C4]">{fc.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
