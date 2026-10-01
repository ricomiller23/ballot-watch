import { notFound } from 'next/navigation';
import Link from 'next/link';
import { SENATE_2026 } from '@/lib/senate-data';
import { getRaceById } from '@/lib/coverage';
import { ratingBgClass, ratingLabel, confidenceBadge, partyColor } from '@/lib/utils';

export function generateStaticParams() {
  const ids: { id: string }[] = [];
  for (const r of SENATE_2026) {
    ids.push({ id: r.raceId });
    ids.push({ id: r.stateAbbr.toLowerCase() });
    ids.push({ id: `senate-${r.stateAbbr.toLowerCase()}` });
  }
  return ids;
}

export default async function SenateRaceDetailPage({
  params,
}: {
  params: { id: string } | Promise<{ id: string }>;
}) {
  const resolved = await Promise.resolve(params);
  const id = resolved.id;
  const race = getRaceById(id);

  if (!race) {
    notFound();
  }

  const incumbent = race.candidates.find(c => c.incumbent);
  const challengers = race.candidates.filter(c => !c.incumbent);
  const conf = confidenceBadge(race.confidence);

  return (
    <div className="space-y-8 py-6 max-w-5xl mx-auto">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <Link href="/" className="hover:text-white">Dashboard</Link>
        <span>/</span>
        <Link href="/senate" className="hover:text-white">Senate</Link>
        <span>/</span>
        <span className="text-white font-semibold">{race.state} ({race.stateAbbr})</span>
      </div>

      {/* Race Header Banner */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-2xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${conf.className}`}>
                {conf.label}
              </span>
              <span className="text-xs font-mono text-slate-400">
                {race.raceId}
              </span>
              {race.isSpecialElection && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  Special Election
                </span>
              )}
            </div>
            <h1 className="text-3xl md:text-4xl font-black text-white tracking-tight">
              {race.office}
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Election Date: {race.electionDate} · Seat Classification: {race.seatClass}
            </p>
          </div>

          <div className="text-right">
            <div className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">
              Consensus Rating
            </div>
            {race.ratings.length > 0 ? (
              <span className={`inline-block px-3 py-1.5 rounded-xl font-black text-sm ${ratingBgClass(race.ratings[0].value)} text-white shadow-lg`}>
                {race.ratings[0].verbatimLabel}
              </span>
            ) : (
              <span className="text-xs text-slate-500">Unrated</span>
            )}
          </div>
        </div>

        {/* Ratings Breakdown Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6">
          {race.ratings.map((rt, idx) => (
            <div key={idx} className="bg-slate-950/60 rounded-xl p-3.5 border border-slate-800">
              <div className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                {rt.rater === 'cook' ? 'Cook Political Report' :
                 rt.rater === 'sabato' ? "Sabato's Crystal Ball" :
                 'Inside Elections'}
              </div>
              <div className="text-base font-extrabold text-white mt-1">
                {rt.verbatimLabel}
              </div>
              <div className="flex items-center justify-between text-[10px] text-slate-500 mt-2 pt-2 border-t border-slate-800/60">
                <span>As of {rt.asOfDate}</span>
                <a
                  href={rt.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  Source ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Candidates Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight">Official Candidate Roster</h2>
        <p className="text-xs text-slate-400">
          Candidates sourced exclusively from official Federal Election Commission filings and state Secretary of State certified lists.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {race.candidates.map((cand, idx) => (
            <div
              key={idx}
              className="bg-slate-900/70 border border-slate-800 rounded-2xl p-5 hover:border-slate-700 transition-all space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold text-white">{cand.name}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded text-white ${partyColor(cand.party)}`}>
                      {cand.party}
                    </span>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {cand.incumbent ? 'Current Incumbent Senator' : cand.status}
                  </div>
                </div>
                {cand.incumbent && (
                  <span className="text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30 px-2 py-0.5 rounded-full">
                    Incumbent
                  </span>
                )}
              </div>

              {cand.priorOffice && (
                <div className="text-xs text-slate-400 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800">
                  <span className="text-slate-500">Prior/Current Office: </span>
                  <span className="text-slate-300 font-medium">{cand.priorOffice}</span>
                </div>
              )}
            </div>
          ))}

          {race.candidates.length === 0 && (
            <div className="col-span-2 bg-slate-900/40 border border-slate-800 rounded-2xl p-6 text-center text-slate-400">
              <p className="text-sm">Candidate field pending official state primary filing deadlines.</p>
              <p className="text-xs text-slate-500 mt-1">Check the official state portal below for upcoming filing dates.</p>
            </div>
          )}
        </div>
      </div>

      {/* Analysis & Context */}
      {race.notes && (
        <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 space-y-2">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Race Context & Electoral Notes</h3>
          <p className="text-sm text-slate-300 leading-relaxed">{race.notes}</p>
        </div>
      )}

      {/* Authoritative Sources Table */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h3 className="text-base font-bold text-white">Authoritative Citations & Filing Audit</h3>
        <div className="divide-y divide-slate-800 text-xs">
          {race.sources.map((s, idx) => (
            <div key={idx} className="py-2.5 flex items-center justify-between">
              <div>
                <div className="font-semibold text-slate-200">{s.label}</div>
                <div className="text-[11px] font-mono text-slate-500 mt-0.5 truncate max-w-md">{s.url}</div>
              </div>
              <div className="text-right flex items-center gap-3">
                <span className="text-slate-500 text-[11px]">Verified {s.accessDate}</span>
                <a
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-2.5 py-1 rounded text-[11px] font-medium transition-colors"
                >
                  Visit Portal ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
