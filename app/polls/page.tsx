import React from 'react';
import { getAllPolls } from '@/lib/races';
import { BarChart2, ExternalLink, Zap } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function PollsPage() {
  const polls = getAllPolls();

  return (
    <div className="space-y-6 font-mono">
      <div className="bg-[#100C2A] border-3 border-[#00F0FF] p-5 rounded-2xl shadow-[0_0_20px_rgba(0,240,255,0.3)]">
        <div className="flex items-center gap-2 mb-1">
          <Zap className="w-5 h-5 text-[#FFE600]" />
          <h1 className="font-arcade text-base sm:text-lg text-[#FFE600] arcade-text-glow-yellow tracking-tight">
            SOURCED POLLS LEDGER ({polls.length} QUALIFYING SURVEYS)
          </h1>
        </div>
        <p className="text-xs font-crt text-[16px] text-[#C7D2FE]">
          Every poll record requires a retrieved pollster, field dates, sample size, population type (LV/RV), and direct source URL.
        </p>
      </div>

      <div className="bg-[#120D2F] border-2 border-[#2D2264] rounded-2xl overflow-hidden shadow-lg">
        <div className="overflow-x-auto text-xs">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-[#2D2264] bg-[#0A071E] font-arcade text-[8px] text-[#00F0FF]">
                <th className="py-3 px-4 uppercase">RACE</th>
                <th className="py-3 px-4 uppercase">POLLSTER</th>
                <th className="py-3 px-4 uppercase">FIELD DATES</th>
                <th className="py-3 px-4 uppercase text-center">SAMPLE</th>
                <th className="py-3 px-4 uppercase text-center">TYPE</th>
                <th className="py-3 px-4 uppercase">RESULTS</th>
                <th className="py-3 px-4 uppercase text-right">RECEIPT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#2D2264]">
              {polls.map((item, idx) => (
                <tr key={idx} className="hover:bg-[#1A1340] transition-colors">
                  <td className="py-3 px-4 font-arcade text-[9px] text-white">{item.office}</td>
                  <td className="py-3 px-4 font-semibold text-[#FFE600]">{item.poll.pollster}</td>
                  <td className="py-3 px-4 font-crt text-[15px] text-[#A5B4FC]">{item.poll.field_dates}</td>
                  <td className="py-3 px-4 text-center font-arcade text-[9px] text-[#00F0FF]">{item.poll.sample_size}</td>
                  <td className="py-3 px-4 text-center font-arcade text-[8px] uppercase text-[#39FF14]">{item.poll.sample_type}</td>
                  <td className="py-3 px-4 font-bold text-white">
                    {Object.entries(item.poll.results).map(([cand, pct]) => `${cand.split(' ').pop()} ${pct}%`).join(' · ')}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <a 
                      href={item.poll.source_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="arcade-btn font-arcade text-[7px] bg-[#00F0FF] text-[#080616] px-2 py-1 rounded border border-white hover:bg-white inline-flex items-center gap-1"
                    >
                      <span>RECEIPT</span>
                      <ExternalLink className="w-2.5 h-2.5" />
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
