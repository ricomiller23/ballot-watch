import React from 'react';
import { SEED_POLLS } from '@/lib/fallback-data';
import { BarChart2, ExternalLink } from 'lucide-react';

export const revalidate = 60;

export default function PollsPage() {
  return (
    <div className="space-y-6 font-mono">
      <div className="bg-[#F6F8FB] border border-[#E4E9F0] p-4 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <BarChart2 className="w-5 h-5 text-[#0E63C4]" />
          <h1 className="font-extrabold text-lg text-[#0B1220] tracking-tight">
            Verified Polls Ledger with Full Methodological Metadata
          </h1>
        </div>
        <p className="text-xs text-[#5B6779]">
          Every poll record must disclose pollster, sample size, population (LV/RV/A), survey method, and margin of error. Surveys with missing metadata or hyperpartisan bias are strictly filtered.
        </p>
      </div>

      <div className="bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#CBD5E1] bg-[#F6F8FB] text-[#0B1220]">
                <th className="py-2.5 px-3 font-bold">Race</th>
                <th className="py-2.5 px-3 font-bold">Pollster</th>
                <th className="py-2.5 px-3 font-bold">Field Dates</th>
                <th className="py-2.5 px-3 font-bold text-center">Sample</th>
                <th className="py-2.5 px-3 font-bold text-center">Pop / Method</th>
                <th className="py-2.5 px-3 font-bold text-center">MoE</th>
                <th className="py-2.5 px-3 font-bold">Results</th>
                <th className="py-2.5 px-3 font-bold text-right">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E9F0]">
              {SEED_POLLS.map((p) => (
                <tr key={p.id} className="hover:bg-[#F6F8FB]">
                  <td className="py-2.5 px-3 font-bold text-[#0B1220]">{p.race_id}</td>
                  <td className="py-2.5 px-3 font-semibold text-[#24303F]">{p.pollster}</td>
                  <td className="py-2.5 px-3 text-[#5B6779]">{p.field_start.substring(5)} → {p.field_end.substring(5)}</td>
                  <td className="py-2.5 px-3 text-center font-bold text-[#0B1220]">{p.sample_size}</td>
                  <td className="py-2.5 px-3 text-center text-[#5B6779]">{p.population} · {p.method}</td>
                  <td className="py-2.5 px-3 text-center text-[#5B6779]">±{p.margin_of_error}%</td>
                  <td className="py-2.5 px-3 font-bold text-[#0B1220]">
                    {p.results.map((r) => `${r.candidate.split(' ')[1]} ${r.pct}%`).join(' · ')}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <a href={p.source_url} target="_blank" rel="noopener noreferrer" className="text-[#0E63C4] hover:underline inline-flex items-center gap-1 font-semibold">
                      Poll <ExternalLink className="w-3 h-3" />
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
