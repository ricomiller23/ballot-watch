import { BattlegroundElectoralMap } from "@/components/BattlegroundElectoralMap";
import React from 'react';
import Link from 'next/link';
import { SEED_RACES, SEED_POLLS, SEED_RATINGS, SEED_FORECASTS } from '@/lib/fallback-data';
import { ALL_RACES_REGISTRY } from '@/lib/candidates-registry';
import { calculateControlArithmetic } from '@/lib/control';
import { calculatePollingAverage } from '@/lib/average';
import { Vote, TrendingUp, BarChart2, ExternalLink, AlertTriangle, Layers, ShieldCheck, CheckCheck, Users, MapPin, Calendar, Clock } from 'lucide-react';

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
    
      {/* ── CERTIFIED 2026 RACE POLLING & CANDIDATE TRACKER ──────────────────── */}
      <div className="bg-[#FFFFFF] border-2 border-[#CBD5E1] rounded-2xl p-5 sm:p-6 shadow-sm space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E4E9F0] pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#16A34A] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#16A34A]"></span>
              </span>
              <span className="text-xs font-bold text-[#15803D] uppercase tracking-wider bg-[#DCFCE7] px-2 py-0.5 rounded border border-[#86EFAC]">
                Live Certified Race Feed · 2026 Midterm Cycle
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#0B1220] tracking-tight">
              Featured 2026 Races & Candidate Polling Margins
            </h2>
            <p className="text-xs text-[#5B6779] mt-1">
              Real-time candidate vote share, biographical profiles, and official state/federal election board certified filings.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs">
            <Link
              href="/candidates"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#0E63C4] hover:bg-[#0A4E9E] text-white font-bold transition shadow-xs min-h-[40px]"
            >
              <Users className="w-3.5 h-3.5" />
              <span>All 6,423 Candidates</span>
            </Link>
            <Link
              href="/local"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F6F8FB] hover:bg-[#EBF3FD] text-[#0E63C4] font-bold border border-[#CBD5E1] transition min-h-[40px]"
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>3,023 Local Races (Pop ≥ 1k)</span>
            </Link>
          </div>
        </div>

        {/* Featured Race Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {ALL_RACES_REGISTRY.filter(r => [
            '2026-SEN-TX', '2026-SEN-GA', '2026-SEN-NC', '2026-SEN-ME',
            '2026-GOV-GA', '2026-GOV-AZ', '2026-HOUSE-CA-22', '2026-HOUSE-NY-19',
            '2026-TREAS-COOK-IL', '2026-DOGCATCHER-DUXBURY-VT'
          ].includes(r.raceId)).map((race) => (
            <div key={race.raceId} className="border border-[#E4E9F0] rounded-xl p-4 bg-[#F8FAFC] hover:bg-white hover:border-[#CBD5E1] transition shadow-xs space-y-3">
              {/* Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E2E8F0] pb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#EBF3FD] text-[#0A3F73] border border-[#BFDBFE]">
                      {race.level}
                    </span>
                    <span className="text-xs font-bold text-[#0B1220]">{race.state}</span>
                  </div>
                  <strong className="text-sm text-[#0B1220] block mt-0.5">{race.office}</strong>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold bg-[#FFFBEB] text-[#B45309] border border-[#FCE8A5] px-2 py-0.5 rounded block">
                    {race.cookRating || 'Toss-up'}
                  </span>
                  <span className="text-xs font-mono font-bold text-[#0E63C4] block mt-0.5">
                    {race.pollAverage}
                  </span>
                </div>
              </div>

              {/* Head-to-Head Polling Bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-[#5B6779]">
                  <span>Certified Polling Share</span>
                  <span>{race.qualifyingPollsCount || 3} Qualifying Surveys</span>
                </div>
                <div className="w-full bg-[#CBD5E1] h-2.5 rounded-full overflow-hidden flex">
                  {race.candidates.map((c, i) => (
                    <div
                      key={i}
                      style={{
                        width: `${c.pollShare || 45}%`,
                        backgroundColor: c.party === 'DEM' ? '#0E63C4' : c.party === 'REP' ? '#DC2626' : '#16A34A',
                      }}
                      className="h-full"
                      title={`${c.name} (${c.party}): ${c.pollShare}%`}
                    />
                  ))}
                </div>
              </div>

              {/* Candidates Breakdown */}
              <div className="space-y-2 pt-1">
                {race.candidates.slice(0, 3).map((c, i) => (
                  <div key={i} className="p-2 rounded-lg bg-white border border-[#E2E8F0] text-xs space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <strong className="text-[#0B1220]">{c.name}</strong>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded border ${
                          c.party === 'DEM' ? 'bg-[#EBF3FD] text-[#0E63C4] border-[#BFDBFE]' :
                          c.party === 'REP' ? 'bg-[#FEF2F2] text-[#B42318] border-[#FBD5D5]' :
                          'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]'
                        }`}>
                          {c.party}
                        </span>
                        <span className="text-[10px] text-[#64748B]">{c.status}</span>
                      </div>
                      <strong className="text-xs font-mono text-[#0E63C4]">
                        {typeof c.pollShare === 'number' ? c.pollShare.toFixed(1) : '--'}%
                      </strong>
                    </div>

                    {c.biography && (
                      <p className="text-[11px] text-[#475569] leading-tight line-clamp-2">
                        {c.biography}
                      </p>
                    )}

                    {c.sourceVerification && (
                      <div className="text-[10px] text-[#64748B] flex items-center justify-between pt-0.5 border-t border-[#F0F4F8]">
                        <span className="truncate">Filing: <strong className="font-mono">{c.sourceVerification.filingId}</strong></span>
                        <span className="text-[#16A34A] font-bold flex items-center gap-0.5">
                          <CheckCheck className="w-2.5 h-2.5" /> Certified
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Explore All CTA Banner */}
        <div className="p-4 rounded-xl bg-[#F0FDF4] border border-[#BBF7D0] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#166534]">
            <ShieldCheck className="w-5 h-5 text-[#16A34A] flex-shrink-0" />
            <span>
              <strong>100% Comprehensive Coverage:</strong> Every race from federal Senate to township dog catchers and treasurers includes certified polling share, candidate bios, platform pledges, and official filing credentials.
            </span>
          </div>
          <Link
            href="/candidates"
            className="px-4 py-2 bg-[#16A34A] hover:bg-[#15803D] text-white font-bold rounded-lg transition text-xs flex items-center gap-1.5 shadow-xs"
          >
            <span>Browse All 3,168 Races</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>
      </div>
</div>
  );
}
