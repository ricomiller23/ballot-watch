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
        <div className="bg-[#100C2A] border-3 border-[#00F0FF] p-6 rounded-2xl space-y-4 shadow-[0_0_20px_rgba(0,240,255,0.3)]">
          <h2 className="font-arcade text-base text-[#FFE600] arcade-text-glow-yellow">
            ALL 537 TRACKED 2026 CONTESTS (NON-JS ARCADE ROSTER)
          </h2>
          <div className="space-y-4 text-xs font-mono">
            {races.map((r) => (
              <div key={r.id} id={r.id} className="p-3.5 rounded-lg bg-[#181338] border border-[#2D2264]">
                <div className="font-arcade text-xs text-white">
                  {r.office} ({r.state_name}) — ID: #{r.id}
                </div>
                <div className="font-arcade text-[8px] text-[#A5B4FC] mt-0.5">
                  Tier {r.tier} · Status: {r.status}
                </div>
                <div className="mt-2 space-y-1">
                  {r.candidates.map((c, i) => (
                    <div key={i} className="text-[#C7D2FE]">
                      <strong className="text-white">{c.name}</strong> ({c.party}, {c.status}) —{' '}
                      {c.source_url ? (
                        <a href={c.source_url} className="text-[#00F0FF] hover:underline font-arcade text-[8px]">
                          Source Link
                        </a>
                      ) : (
                        <span className="text-[#64748B]">Pending</span>
                      )}
                    </div>
                  ))}
                </div>
                {r.ratings.length > 0 && (
                  <div className="mt-2 text-[#FFE600] font-arcade text-[8px]">
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
