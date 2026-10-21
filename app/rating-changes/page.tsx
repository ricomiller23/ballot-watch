import React from 'react';
import { getAllRatings } from '@/lib/races';
import { CheckCircle2, ArrowRight, ExternalLink, Trophy } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function RatingChangesPage() {
  const ratings = getAllRatings();

  return (
    <div className="space-y-6 font-mono">
      <div className="bg-[#100C2A] border-3 border-[#00F0FF] p-5 rounded-2xl shadow-[0_0_20px_rgba(0,240,255,0.3)]">
        <div className="flex items-center gap-2 mb-1">
          <Trophy className="w-5 h-5 text-[#FFE600]" />
          <h1 className="font-arcade text-base sm:text-lg text-[#FFE600] arcade-text-glow-yellow tracking-tight">
            FORECASTER RATINGS LEDGER ({ratings.length} HANDICAPPER RATINGS)
          </h1>
        </div>
        <p className="text-xs font-crt text-[16px] text-[#C7D2FE]">
          Verbatim nonpartisan race ratings from Cook Political Report, Sabato&#39;s Crystal Ball, and Inside Elections with direct source citations.
        </p>
      </div>

      <div className="space-y-3 text-xs">
        {ratings.map((item, idx) => (
          <div key={idx} className="bg-[#120D2F] border-2 border-[#2D2264] hover:border-[#00F0FF] p-4 rounded-xl shadow-md flex flex-wrap items-center justify-between gap-3 transition-colors">
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-arcade text-[8px] uppercase bg-[#1D1642] text-[#FFE600] px-2 py-0.5 rounded border border-[#FFE600]/40">
                  {item.rating.rater}
                </span>
                <strong className="font-arcade text-xs text-white">{item.office}</strong>
                <span className="font-crt text-[14px] text-[#A5B4FC]">As of: {item.rating.rater_date}</span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="font-arcade text-[8px] text-[#A5B4FC]">CLASSIFICATION:</span>
                <span className="font-arcade text-[9px] text-[#39FF14] arcade-text-glow-green font-bold">{item.rating.verbatim_label}</span>
              </div>
            </div>
            <a 
              href={item.rating.source_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="arcade-btn font-arcade text-[8px] bg-[#00F0FF] text-[#080616] px-2.5 py-1.5 rounded border border-white hover:bg-white inline-flex items-center gap-1"
            >
              <span>SOURCE LINK</span>
              <ExternalLink className="w-2.5 h-2.5" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
