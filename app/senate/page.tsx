import React from 'react';
import { calculateControlArithmetic } from '@/lib/control';
import { TrendingUp, Users, Swords, Trophy } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export default function SenateControlPage() {
  const control = calculateControlArithmetic();

  return (
    <div className="space-y-6 font-mono">
      <div className="bg-[#100C2A] border-3 border-[#00F0FF] p-5 rounded-2xl shadow-[0_0_20px_rgba(0,240,255,0.3)]">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-5 h-5 text-[#FFE600]" />
          <h1 className="font-arcade text-base sm:text-lg text-[#FFE600] arcade-text-glow-yellow tracking-tight">
            Chamber Majority Arithmetic &amp; Class Dynamics
          </h1>
        </div>
        <p className="text-xs font-crt text-[16px] text-[#C7D2FE]">
          Exact path-to-majority seat arithmetic for the United States House and Senate in the 119th / 120th transition.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
        {/* US Senate */}
        <div className="bg-[#120D2F] border-2 border-[#00F0FF] p-5 rounded-2xl shadow-[0_0_15px_rgba(0,240,255,0.25)] space-y-4">
          <div className="flex justify-between items-center border-b border-[#2D2264] pb-2">
            <strong className="font-arcade text-xs text-[#00F0FF] block uppercase">US Senate (100 Seats)</strong>
            <span className="font-arcade text-[8px] bg-[#00F0FF] text-[#080616] px-2 py-0.5 rounded font-bold">51 FOR MAJORITY</span>
          </div>
          <div className="space-y-2 text-[#C7D2FE] font-crt text-[17px]">
            <div className="flex justify-between"><span>Total Seats Up in 2026:</span><strong className="text-white font-arcade text-xs">35 Seats (33 Class II + 2 Specials)</strong></div>
            <div className="flex justify-between"><span>Democratic-Held Baseline:</span><strong className="text-[#00F0FF] font-arcade text-xs">{control.senate.demHeld}</strong></div>
            <div className="flex justify-between"><span>Republican-Held Baseline:</span><strong className="text-[#FF007F] font-arcade text-xs">{control.senate.repHeld}</strong></div>
            <div className="flex justify-between"><span>Toss-Ups / In Play:</span><strong className="text-[#FFE600] font-arcade text-xs">{control.senate.tossUps}</strong></div>
          </div>
          <div className="p-3 rounded-lg bg-[#0A071E] border border-[#2D2264] text-xs font-crt text-[15px] text-[#A5B4FC] leading-relaxed">
            {control.senate.note}
          </div>
        </div>

        {/* US House */}
        <div className="bg-[#120D2F] border-2 border-[#FF007F] p-5 rounded-2xl shadow-[0_0_15px_rgba(255,0,127,0.25)] space-y-4">
          <div className="flex justify-between items-center border-b border-[#2D2264] pb-2">
            <strong className="font-arcade text-xs text-[#FF007F] block uppercase">US House of Representatives (435 Seats)</strong>
            <span className="font-arcade text-[8px] bg-[#FF007F] text-white px-2 py-0.5 rounded font-bold">218 FOR MAJORITY</span>
          </div>
          <div className="space-y-2 text-[#C7D2FE] font-crt text-[17px]">
            <div className="flex justify-between"><span>Total Seats Up in 2026:</span><strong className="text-white font-arcade text-xs">435 Seats (All)</strong></div>
            <div className="flex justify-between"><span>Democratic-Held Baseline:</span><strong className="text-[#00F0FF] font-arcade text-xs">{control.house.demHeld}</strong></div>
            <div className="flex justify-between"><span>Republican-Held Baseline:</span><strong className="text-[#FF007F] font-arcade text-xs">{control.house.repHeld}</strong></div>
            <div className="flex justify-between"><span>Toss-Ups / Competitive:</span><strong className="text-[#FFE600] font-arcade text-xs">{control.house.tossUps}</strong></div>
          </div>
          <div className="p-3 rounded-lg bg-[#0A071E] border border-[#2D2264] text-xs font-crt text-[15px] text-[#A5B4FC] leading-relaxed">
            {control.house.note}
          </div>
        </div>
      </div>
    </div>
  );
}
