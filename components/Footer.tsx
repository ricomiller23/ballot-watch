import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#F6F8FB] border-t border-[#E4E9F0] py-8 text-xs text-[#5B6779] mt-16 font-mono">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h4 className="font-semibold text-[#0B1220] uppercase text-[11px] mb-2">Polling Average Mandate</h4>
          <p className="leading-relaxed text-[#24303F]">
            Every polling average displays its method block directly on the figure. Under 3 qualifying polls, no average is published — only raw polls.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-[#0B1220] uppercase text-[11px] mb-2">Unblended Forecaster Ratings</h4>
          <p className="leading-relaxed text-[#24303F]">
            Ratings from Cook, Sabato, and Inside Elections are presented side by side with the raters' own dates. We do not blend forecasters into a single score.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-[#0B1220] uppercase text-[11px] mb-2">Official Election Night Rule</h4>
          <p className="leading-relaxed">
            We do not call races. Election-night results are drawn strictly from state election authorities. Projections shown are others' and attributed.
          </p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-4 border-t border-[#E4E9F0] text-[11px] text-[#8494A8] flex justify-between">
        <span>BALLOT.WATCH 2026 · The Monitor Series · Part 4</span>
        <span>Light-Theme Strict (#FFFFFF / #F6F8FB)</span>
      </div>
    </footer>
  );
}
