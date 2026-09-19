import React from 'react';
import SOURCES from '@/config/sources.json';
import { BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';

export const revalidate = 300;

export default function SourcesPage() {
  return (
    <div className="space-y-6 font-mono">
      <div className="bg-[#F6F8FB] border border-[#E4E9F0] p-4 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <BookOpen className="w-5 h-5 text-[#0E63C4]" />
          <h1 className="font-extrabold text-lg text-[#0B1220] tracking-tight">
            Sources, Methodological Exclusions & House Effects
          </h1>
        </div>
        <p className="text-xs text-[#5B6779]">
          Transparency register detailing poll qualification rules, forecaster attribution, and election night official-authority protocols.
        </p>
      </div>

      <div className="bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl p-5 shadow-xs space-y-4 text-xs">
        <h2 className="text-sm font-bold text-[#0B1220] uppercase tracking-wider">
          Polling Average Mathematical Specification (§8)
        </h2>
        <ul className="space-y-2 text-[#24303F] leading-relaxed">
          <li>• <strong>Threshold Constraint:</strong> A minimum of 3 qualifying independent public surveys within the active 30-day window is strictly required. Under 3 qualifying polls, no average is published.</li>
          <li>• <strong>Recency Weight:</strong> Calculated as linear decay <code>(30 - age_in_days) / 30</code>.</li>
          <li>• <strong>Sample Size Adjustment:</strong> Scaled by <code>sqrt(sample_size) / 30</code>, capped at 2.0x.</li>
          <li>• <strong>Exclusions:</strong> Internal partisan campaign polls, surveys missing methodology, and unvetted online click-ins are permanently excluded.</li>
        </ul>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        {SOURCES.map((s) => (
          <div key={s.id} className="bg-[#FFFFFF] border border-[#E4E9F0] p-4 rounded-xl shadow-xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="bg-[#0E63C4] text-white text-[10px] font-bold px-1.5 py-0.2 rounded">Tier {s.tier}</span>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-[#0E63C4] hover:underline flex items-center gap-1 font-semibold">
                Portal <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <strong className="text-sm text-[#0B1220] block">{s.name}</strong>
            <p className="text-[#5B6779] text-[11px] leading-relaxed bg-[#F6F8FB] p-2 rounded border border-[#E4E9F0]">{s.bias_note}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
