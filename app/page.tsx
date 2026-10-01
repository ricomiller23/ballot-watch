import React from 'react';
import Link from 'next/link';
import { 
  getAllRaces, 
  getRaceById, 
  computeSenateControl, 
  getCoverageMetrics 
} from '@/lib/races';
import { 
  Vote, TrendingUp, BarChart2, ExternalLink, 
  Layers, Users, MapPin, Calendar, Clock 
} from 'lucide-react';

export const revalidate = 60;

export default function ControlBoardPage() {
  const races = getAllRaces();
  const control = computeSenateControl();
  const metrics = getCoverageMetrics();
  
  // Sourced Featured Race: Texas Senate (Paxton vs Talarico)
  const txRace = getRaceById('senate-tx') || races[0];
  const txNominees = txRace.candidates.filter(c => c.status === 'nominee');
  const txDefeatedIncumbent = txRace.candidates.find(c => c.status === 'incumbent-not-running');

  // Competitive Battleground Spotlight Races
  const battlegroundIds = ['senate-tx', 'senate-mi', 'senate-nh', 'senate-nc', 'senate-me', 'senate-oh', 'gov-ga'];
  const battlegroundRaces = races.filter(r => battlegroundIds.includes(r.id));

  const electionDate = new Date('2026-11-03T07:00:00-05:00').getTime();
  const now = Date.now();
  const daysToElection = Math.max(0, Math.ceil((electionDate - now) / (1000 * 60 * 60 * 24)));

  return (
    <div className="space-y-6 font-mono">
      {/* Top Banner */}
      <div className="bg-[#F6F8FB] border border-[#E4E9F0] p-5 rounded-xl shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-bold bg-[#B42318] text-white px-2 py-0.5 rounded">
                {daysToElection} DAYS TO NOV 3, 2026 GENERAL ELECTION
              </span>
              <span className="text-xs text-[#5B6779]">
                {metrics.senateTotal} Senate Contests · {metrics.govTotal} Governor Races · {metrics.houseTotal} House Districts · {metrics.mayorTotal} 2026 Mayoral Contests
              </span>
            </div>
            <h1 className="text-2xl font-extrabold text-[#0B1220] tracking-tight font-display">
              2026 Midterm Control Board & Sourced Race Registry
            </h1>
            <p className="text-xs text-[#24303F] mt-1 max-w-3xl leading-relaxed">
              Every displayed candidate requires an official source URL. Polling averages publish their mathematical method and qualifying poll criteria. Forecaster ratings are unblended.
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              href="/polls"
              className="bg-[#0E63C4] hover:bg-[#0A4E9E] text-white text-xs font-bold px-3 py-2 rounded-lg transition"
            >
              Browse Sourced Polls →
            </Link>
          </div>
        </div>
      </div>

      {/* Sourced Coverage Metrics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="p-3.5 bg-white border border-[#E4E9F0] rounded-xl">
          <div className="text-[10px] uppercase text-[#64748B]">Total Races Tracked</div>
          <div className="text-xl font-bold text-[#0B1220] mt-0.5">{metrics.totalRaces}</div>
          <div className="text-[11px] text-[#0E63C4] mt-0.5">{metrics.racesWithSourcedNominee} with sourced nominee</div>
        </div>

        <div className="p-3.5 bg-white border border-[#E4E9F0] rounded-xl">
          <div className="text-[10px] uppercase text-[#64748B]">Senate Races</div>
          <div className="text-xl font-bold text-[#0B1220] mt-0.5">{metrics.senateSourced} of {metrics.senateTotal}</div>
          <div className="text-[11px] text-[#16A34A] mt-0.5">33 Class II + 2 Specials</div>
        </div>

        <div className="p-3.5 bg-white border border-[#E4E9F0] rounded-xl">
          <div className="text-[10px] uppercase text-[#64748B]">Governor Races</div>
          <div className="text-xl font-bold text-[#0B1220] mt-0.5">{metrics.govSourced} of {metrics.govTotal}</div>
          <div className="text-[11px] text-[#64748B] mt-0.5">36 State Contests</div>
        </div>

        <div className="p-3.5 bg-white border border-[#E4E9F0] rounded-xl">
          <div className="text-[10px] uppercase text-[#64748B]">2026 Mayoral Contests</div>
          <div className="text-xl font-bold text-[#0B1220] mt-0.5">{metrics.mayorSourced} of {metrics.mayorTotal}</div>
          <div className="text-[11px] text-[#64748B] mt-0.5">Ballotpedia 2026 Calendar</div>
        </div>
      </div>

      {/* Senate Majority Arithmetic Section */}
      <div className="bg-white border border-[#E4E9F0] rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E4E9F0] pb-3">
          <div>
            <h2 className="text-lg font-bold text-[#0B1220] flex items-center gap-2">
              <Vote className="w-5 h-5 text-[#0E63C4]" />
              <span>Senate Majority Arithmetic (119th Congress Baseline)</span>
            </h2>
            <p className="text-xs text-[#5B6779] mt-0.5">
              Current chamber: 53 Republicans, 47 Democrats/Independents. 51 seats required for majority.
            </p>
          </div>
          <div className="text-right">
            <span className="text-[10px] text-[#64748B] uppercase">Seats Up in 2026</span>
            <div className="text-sm font-bold text-[#0B1220]">{control.totalSenateRaces} Contests</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="p-3 rounded-lg bg-[#EFF6FF] border border-[#BFDBFE]">
            <div className="text-xs text-[#1E40AF] font-bold">Democratic Holdovers</div>
            <div className="text-2xl font-extrabold text-[#1D4ED8] mt-1">{control.demHoldovers}</div>
            <div className="text-[10px] text-[#3B82F6] mt-0.5">Needs {control.majorityThreshold - control.demHoldovers} of 35 seats to flip</div>
          </div>

          <div className="p-3 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0]">
            <div className="text-xs text-[#475569] font-bold">Toss-Up Battlegrounds</div>
            <div className="text-2xl font-extrabold text-[#D97706] mt-1">{control.tossUps}</div>
            <div className="text-[10px] text-[#64748B] mt-0.5">Cook Political Report Toss-Ups</div>
          </div>

          <div className="p-3 rounded-lg bg-[#FEF2F2] border border-[#FECACA]">
            <div className="text-xs text-[#991B1B] font-bold">Republican Holdovers</div>
            <div className="text-2xl font-extrabold text-[#DC2626] mt-1">{control.repHoldovers}</div>
            <div className="text-[10px] text-[#EF4444] mt-0.5">Needs {control.majorityThreshold - control.repHoldovers} of 35 seats to hold</div>
          </div>
        </div>
      </div>

      {/* Featured Competitive Race: Texas Senate (Paxton vs Talarico) */}
      <div className="bg-white border-2 border-[#0E63C4] rounded-xl p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E4E9F0] pb-3 text-xs">
          <div>
            <span className="font-bold bg-[#EBF3FD] text-[#0A3F73] px-2 py-0.5 rounded border border-[#CBD5E1]">
              FEATURED SENATE RACE: TEXAS (CLASS II)
            </span>
            <h2 className="text-base font-bold text-[#0B1220] mt-1">
              Ken Paxton (REP, Nominee) vs. James Talarico (DEM, Nominee)
            </h2>
            {txDefeatedIncumbent && (
              <span className="text-[11px] text-[#64748B] block mt-0.5">
                Note: Incumbent Senator John Cornyn was defeated in primary/runoff.
              </span>
            )}
          </div>
          <span className="text-xs font-bold bg-[#FFFBEB] text-[#8A6100] border border-[#FCE8A5] px-2.5 py-0.5 rounded">
            Rating: Toss Up (Cook / Sabato)
          </span>
        </div>

        {/* Polling Average Display */}
        {txRace.polling_average && (
          <div className="p-4 rounded-lg bg-[#F6F8FB] border border-[#CBD5E1] text-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="font-bold text-[#0B1220] uppercase text-[11px] flex items-center gap-1.5">
                <BarChart2 className="w-4 h-4 text-[#0E63C4]" />
                <span>Polling Average: {txRace.polling_average.leader} +{txRace.polling_average.spread}%</span>
              </span>
              <span className="text-[10px] text-[#5B6779]">
                Computed across {txRace.polling_average.qualifying_polls_count} qualifying surveys
              </span>
            </div>

            <div className="flex items-center gap-4 text-sm font-bold">
              <div className="text-[#DC2626]">
                Ken Paxton (REP): {txRace.polling_average.averages?.['Ken Paxton']}%
              </div>
              <div className="text-[#0E63C4]">
                James Talarico (DEM): {txRace.polling_average.averages?.['James Talarico']}%
              </div>
            </div>

            <div className="pt-2 border-t border-[#E4E9F0] text-[10px] text-[#5B6779] leading-relaxed">
              <strong>Method:</strong> {txRace.polling_average.method}
            </div>
          </div>
        )}

        {/* Forecaster Spread: Side by Side without Blending */}
        <div>
          <span className="text-[10px] font-bold text-[#5B6779] uppercase block mb-1">
            Forecaster Ratings Spread (Displayed Verbatim · Unblended):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            {txRace.ratings.map((r, i) => (
              <div key={i} className="p-2.5 rounded bg-white border border-[#E4E9F0]">
                <strong className="text-[#0B1220] block uppercase text-[10px]">{r.rater}</strong>
                <span className="font-bold text-sm text-[#8A6100]">{r.verbatim_label}</span>
                <span className="text-[10px] text-[#8494A8] block mt-0.5">As of: {r.rater_date}</span>
                <a 
                  href={r.source_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[10px] text-[#0E63C4] hover:underline flex items-center gap-1 mt-1"
                >
                  <span>Source</span>
                  <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Candidates Source Links */}
        <div className="pt-2 border-t border-[#E4E9F0] flex flex-wrap gap-4 text-xs">
          {txRace.candidates.map((c, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="font-bold text-[#0B1220]">{c.name}</span>
              <span className="text-[10px] text-[#64748B]">({c.party}, {c.status})</span>
              <a
                href={c.source_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] text-[#0E63C4] hover:underline flex items-center gap-0.5"
              >
                <span>Sourced</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Battleground Spotlight Section */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E4E9F0] pb-3">
          <div>
            <h2 className="text-xl font-bold text-[#0B1220]">
              Competitive Battleground Spotlight Contests
            </h2>
            <p className="text-xs text-[#5B6779] mt-0.5">
              Verified nominees across Michigan, New Hampshire, North Carolina, Maine, Ohio, and Georgia.
            </p>
          </div>
          <Link
            href="/races"
            className="text-xs font-bold text-[#0E63C4] hover:underline flex items-center gap-1"
          >
            <span>View All {metrics.totalRaces} Contests</span>
            <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {battlegroundRaces.map((r) => {
            const nominees = r.candidates.filter(c => c.status === 'nominee');
            const rating = r.ratings[0]?.verbatim_label || 'In Review';

            return (
              <div key={r.id} className="p-4 rounded-xl bg-white border border-[#E4E9F0] shadow-xs space-y-3">
                <div className="flex items-center justify-between border-b border-[#E4E9F0] pb-2">
                  <div>
                    <span className="text-[10px] font-bold text-[#0E63C4] uppercase">{r.state} · Tier {r.tier}</span>
                    <h3 className="text-sm font-bold text-[#0B1220]">{r.office}</h3>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#FFFBEB] text-[#B45309] border border-[#FCE8A5]">
                    {rating}
                  </span>
                </div>

                <div className="space-y-1.5 text-xs">
                  {nominees.length > 0 ? (
                    nominees.map((c, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="font-semibold text-[#0B1220]">{c.name}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${
                          c.party === 'REP' ? 'bg-[#FEF2F2] text-[#DC2626] border-[#FECACA]' :
                          c.party === 'DEM' ? 'bg-[#EFF6FF] text-[#2563EB] border-[#BFDBFE]' :
                          'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]'
                        }`}>
                          {c.party}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-xs text-[#64748B] italic">Nominee not yet sourced</div>
                  )}
                </div>

                <div className="pt-2 border-t border-[#E4E9F0] flex items-center justify-between text-[10px] text-[#64748B]">
                  <span>Status: {r.status}</span>
                  <Link href={`/races#${r.id}`} className="text-[#0E63C4] hover:underline">
                    Details →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
