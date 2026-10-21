import React from 'react';
import RacesExplorerView from '@/components/RacesExplorerView';
import { getAllRaces } from '@/lib/races';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function RacesPage() {
  const races = getAllRaces();

  return (
    <div className="space-y-6 font-mono">
      <RacesExplorerView initialRaces={races} />

      {/* Accessible Server-Side HTML Fallback Table for Direct Fetches & Non-JS Readers */}
      <noscript>
        <div className="bg-white border border-[#E4E9F0] p-6 rounded-xl space-y-4">
          <h2 className="text-lg font-bold text-[#0B1220]">All 537 Tracked 2026 Contests (Non-JS Fallback Roster)</h2>
          <div className="space-y-4 text-xs">
            {races.map((r) => (
              <div key={r.id} id={r.id} className="p-3 border-b border-[#E4E9F0]">
                <div className="font-bold text-sm text-[#0B1220]">{r.office} ({r.state_name}) — ID: #{r.id}</div>
                <div className="text-[#64748B]">Tier {r.tier} · Status: {r.status}</div>
                <div className="mt-1 space-y-0.5">
                  {r.candidates.map((c, i) => (
                    <div key={i}>
                      <strong>{c.name}</strong> ({c.party}, {c.status}) —{' '}
                      {c.source_url ? <a href={c.source_url}>Source Link</a> : 'Pending'}
                    </div>
                  ))}
                </div>
                {r.ratings.length > 0 && (
                  <div className="mt-1 text-[#8A6100]">
                    Forecaster: {r.ratings.map(rt => `${rt.rater}: ${rt.verbatim_label} (${rt.rater_date})`).join(' | ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </noscript>
    </div>
  );
}
