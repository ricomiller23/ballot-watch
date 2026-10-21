import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-[#0C0922] border-t-2 border-[#2D2264] py-8 text-xs text-[#A5B4FC] mt-16 font-mono shadow-[0_-4px_20px_rgba(0,0,0,0.6)]">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-4 rounded-lg bg-[#140F30] border border-[#2D2264]">
          <h4 className="font-arcade text-[#FFE600] text-[10px] mb-2 uppercase tracking-wider flex items-center gap-2">
            <span>●</span> POLLING AVERAGE MANDATE
          </h4>
          <p className="leading-relaxed text-[#C7D2FE] text-xs font-crt text-[15px]">
            Every polling average displays its method block directly on the figure. Under 3 qualifying polls, no average is published — only raw polls.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-[#140F30] border border-[#2D2264]">
          <h4 className="font-arcade text-[#00F0FF] text-[10px] mb-2 uppercase tracking-wider flex items-center gap-2">
            <span>●</span> UNBLENDED FORECASTER RATINGS
          </h4>
          <p className="leading-relaxed text-[#C7D2FE] text-xs font-crt text-[15px]">
            Ratings from Cook, Sabato, and Inside Elections are presented side by side with the raters&#39; own dates. We do not blend forecasters into a single score.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-[#140F30] border border-[#2D2264]">
          <h4 className="font-arcade text-[#39FF14] text-[10px] mb-2 uppercase tracking-wider flex items-center gap-2">
            <span>●</span> OFFICIAL ELECTION NIGHT RULE
          </h4>
          <p className="leading-relaxed text-[#C7D2FE] text-xs font-crt text-[15px]">
            We do not call races. Election-night results are drawn strictly from state election authorities. Projections shown are others&#39; and attributed.
          </p>
        </div>
      </div>

      {/* Arcade Coin-Door Bottom Bar */}
      <div className="max-w-7xl mx-auto px-4 mt-8 pt-4 border-t border-[#2D2264] text-[10px] font-arcade text-[#FFE600] flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span>🕹️</span>
          <span>BALLOT.WATCH 2026 · 1980s ARCADE VIDEO GAME EDITION</span>
        </div>
        <div className="flex items-center gap-4 text-[#FF007F]">
          <span>[ 🪙 INSERT COIN: 25¢ ]</span>
          <span className="text-[#39FF14]">[ HIGH SCORE: 51 SEATS ]</span>
        </div>
      </div>
    </footer>
  );
}
