import React from 'react';
import { getAllPolls } from '@/lib/races';
import { BarChart2, ExternalLink } from 'lucide-react';

export const revalidate = 60;

export default function PollsPage() {
  const polls = getAllPolls();

  return (
    <div className="space-y-6 font-mono">
      <div className="bg-[#F6F8FB] border border-[#E4E9F0] p-4 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <BarChart2 className="w-5 h-5 text-[#0E63C4]" />
          <h1 className="font-extrabold text-lg text-[#0B1220] tracking-tight">
            Sourced Polls Ledger ({polls.length} Qualifying Surveys)
          </h1>
        </div>
        <p className="text-xs text-[#5B6779]">
          Every poll record requires a verified pollster, field dates, sample size, population type (LV/RV), and direct source URL.
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
                <th className="py-2.5 px-3 font-bold text-center">Type</th>
                <th className="py-2.5 px-3 font-bold">Results</th>
                <th className="py-2.5 px-3 font-bold text-right">Source</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E9F0]">
              {polls.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#F6F8FB]">
                  <td className="py-2.5 px-3 font-bold text-[#0B1220]">{item.office}</td>
                  <td className="py-2.5 px-3 font-semibold text-[#24303F]">{item.poll.pollster}</td>
                  <td className="py-2.5 px-3 text-[#5B6779]">{item.poll.field_dates}</td>
                  <td className="py-2.5 px-3 text-center font-bold text-[#0B1220]">{item.poll.sample_size}</td>
                  <td className="py-2.5 px-3 text-center uppercase text-[#5B6779]">{item.poll.sample_type}</td>
                  <td className="py-2.5 px-3 font-bold text-[#0B1220]">
                    {Object.entries(item.poll.results).map(([cand, pct]) => `${cand.split(' ').pop()} ${pct}%`).join(' · ')}
                  </td>
                  <td className="py-2.5 px-3 text-right">
                    <a 
                      href={item.poll.source_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-[#0E63C4] hover:underline inline-flex items-center gap-1 font-semibold"
                    >
                      <span>Source</span>
                      <ExternalLink className="w-3 h-3" />
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
