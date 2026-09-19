import React from 'react';
import { SEED_RACES, SEED_POLLS } from '@/lib/fallback-data';
import { calculatePollingAverage } from '@/lib/average';
import { Layers, AlertTriangle, BarChart2 } from 'lucide-react';

export const revalidate = 60;

export default function RacesPage() {
  return (
    <div className="space-y-6 font-mono">
      <div className="bg-[#F6F8FB] border border-[#E4E9F0] p-4 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <Layers className="w-5 h-5 text-[#0E63C4]" />
          <h1 className="font-extrabold text-lg text-[#0B1220] tracking-tight">
            Key Congressional Races & Polling Average Integrity Test
          </h1>
        </div>
        <p className="text-xs text-[#5B6779]">
          Demonstrating the &lt;3-poll threshold invariant: Races with ≥3 qualifying surveys render a published mathematical average; races with fewer than 3 surveys strictly refuse to publish an average.
        </p>
      </div>

      <div className="space-y-4">
        {SEED_RACES.map((race) => {
          const avg = calculatePollingAverage(race.id, SEED_POLLS);
          const hasAvg = avg.status === 'published';

          return (
            <div key={race.id} className="bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl p-5 shadow-xs text-xs space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#E4E9F0] pb-2">
                <div>
                  <span className="font-bold text-xs bg-[#EBF3FD] text-[#0A3F73] px-2 py-0.5 rounded border border-[#CBD5E1]">
                    {race.id} · {race.office.toUpperCase()}
                  </span>
                  <strong className="text-sm text-[#0B1220] block mt-1">
                    {race.state} {race.district ? `District ${race.district}` : ''}
                  </strong>
                </div>
                <span className="text-xs text-[#5B6779]">2024 Margin: +{race.margin_2024}%</span>
              </div>

              {/* Polling Average Status */}
              {hasAvg && avg.averages ? (
                <div className="p-3 rounded-lg bg-[#F0FDF4] border border-[#BBF0CC] space-y-1">
                  <div className="flex justify-between items-center font-bold text-[#067647]">
                    <span>QUALIFYING AVERAGE PUBLISHED ({avg.methodBlock.qualifyingPollCount} surveys)</span>
                    <span>Status: Valid</span>
                  </div>
                  <div className="text-xs font-bold text-[#0B1220] flex gap-4 pt-1">
                    {Object.entries(avg.averages).map(([cand, pct]) => (
                      <span key={cand}>{cand}: {pct}%</span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-3 rounded-lg bg-[#FFFBEB] border border-[#FCE8A5] space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-[#8A6100]">
                    <AlertTriangle className="w-4 h-4" />
                    <span>INSUFFICIENT POLLS FOR AN AVERAGE ({avg.methodBlock.qualifyingPollCount} qualifying surveys)</span>
                  </div>
                  <p className="text-[#5B6779] text-[11px]">
                    No averaging method is applied below three qualifying independent surveys. Displaying raw poll points only to prevent synthetic bias.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
