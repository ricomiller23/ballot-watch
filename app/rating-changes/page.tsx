import React from 'react';
import { getAllRatings } from '@/lib/races';
import { CheckCircle2, ArrowRight, ExternalLink } from 'lucide-react';

export const revalidate = 60;

export default function RatingChangesPage() {
  const ratings = getAllRatings();

  return (
    <div className="space-y-6 font-mono">
      <div className="bg-[#F6F8FB] border border-[#E4E9F0] p-4 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <CheckCircle2 className="w-5 h-5 text-[#0E63C4]" />
          <h1 className="font-extrabold text-lg text-[#0B1220] tracking-tight">
            Forecaster Ratings Ledger ({ratings.length} Handicapper Ratings)
          </h1>
        </div>
        <p className="text-xs text-[#5B6779]">
          Verbatim nonpartisan race ratings from Cook Political Report, Sabato's Crystal Ball, and Inside Elections with direct source citations.
        </p>
      </div>

      <div className="space-y-3 text-xs">
        {ratings.map((item, idx) => (
          <div key={idx} className="bg-[#FFFFFF] border border-[#E4E9F0] p-4 rounded-xl shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold uppercase bg-[#EBF3FD] text-[#0A3F73] px-2 py-0.5 rounded border border-[#CBD5E1]">
                  {item.rating.rater}
                </span>
                <strong className="text-sm text-[#0B1220]">{item.office}</strong>
                <span className="text-[#8494A8] text-[10px]">As of: {item.rating.rater_date}</span>
              </div>
              <div className="flex items-center gap-2 mt-1.5">
                <span className="text-[#5B6779]">Classification:</span>
                <span className="text-[#8A6100] font-bold">{item.rating.verbatim_label}</span>
              </div>
            </div>
            <a 
              href={item.rating.source_url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-[#0E63C4] hover:underline font-semibold flex items-center gap-1"
            >
              <span>Source URL</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
