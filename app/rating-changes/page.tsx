import React from 'react';
import { SEED_RATINGS } from '@/lib/fallback-data';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export const revalidate = 60;

export default function RatingChangesPage() {
  return (
    <div className="space-y-6 font-mono">
      <div className="bg-[#F6F8FB] border border-[#E4E9F0] p-4 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle2 className="w-5 h-5 text-[#0E63C4]" />
          <h1 className="font-extrabold text-lg text-[#0B1220] tracking-tight">
            Forecaster Rating Changes Ledger
          </h1>
        </div>
        <p className="text-xs text-[#5B6779]">
          Chronological feed tracking handicapper revisions from Cook, Sabato, and Inside Elections with previous vs new ratings and dates.
        </p>
      </div>

      <div className="space-y-3 text-xs">
        {SEED_RATINGS.map((r) => (
          <div key={r.id} className="bg-[#FFFFFF] border border-[#E4E9F0] p-4 rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold uppercase bg-[#EBF3FD] text-[#0A3F73] px-2 py-0.5 rounded border border-[#CBD5E1]">
                  {r.rater}
                </span>
                <strong className="text-sm text-[#0B1220]">{r.race_id}</strong>
                <span className="text-[#8494A8] text-[10px]">Updated: {r.rater_date}</span>
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[#5B6779]">Prior: <strong className="uppercase">{r.previous_value}</strong></span>
                <ArrowRight className="w-3.5 h-3.5 text-[#0E63C4]" />
                <span className="text-[#8A6100] font-bold">New: {r.verbatim_label}</span>
              </div>
            </div>
            <a href={r.source_url} target="_blank" rel="noopener noreferrer" className="text-[#0E63C4] hover:underline font-semibold">
              Rater Publication →
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
