import React from 'react';
import { calculateControlArithmetic } from '@/lib/control';
import { TrendingUp, Users } from 'lucide-react';

export const revalidate = 60;

export default function SenateControlPage() {
  const control = calculateControlArithmetic();

  return (
    <div className="space-y-6 font-mono">
      <div className="bg-[#F6F8FB] border border-[#E4E9F0] p-4 rounded-xl shadow-xs">
        <div className="flex items-center gap-2 mb-1">
          <TrendingUp className="w-5 h-5 text-[#0E63C4]" />
          <h1 className="font-extrabold text-lg text-[#0B1220] tracking-tight">
            Chamber Majority Arithmetic & Class Dynamics
          </h1>
        </div>
        <p className="text-xs text-[#5B6779]">
          Exact path-to-majority seat arithmetic for the United States House and Senate in the 119th / 120th transition.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        <div className="bg-[#FFFFFF] border border-[#E4E9F0] p-5 rounded-xl shadow-xs space-y-3">
          <strong className="text-sm text-[#0B1220] block uppercase">US Senate (100 Seats)</strong>
          <div className="space-y-1.5 text-[#5B6779]">
            <div className="flex justify-between"><span>Total Seats Up in 2026:</span><strong className="text-[#0B1220]">33 Seats (Class II)</strong></div>
            <div className="flex justify-between"><span>Democratic-Held Baseline:</span><strong className="text-[#0E63C4]">{control.senate.demHeld}</strong></div>
            <div className="flex justify-between"><span>Republican-Held Baseline:</span><strong className="text-[#B42318]">{control.senate.repHeld}</strong></div>
            <div className="flex justify-between"><span>Toss-Ups / In Play:</span><strong className="text-[#8A6100]">{control.senate.tossUps}</strong></div>
          </div>
          <div className="p-2.5 rounded bg-[#F6F8FB] border border-[#E4E9F0] text-[11px] leading-relaxed">
            {control.senate.note}
          </div>
        </div>

        <div className="bg-[#FFFFFF] border border-[#E4E9F0] p-5 rounded-xl shadow-xs space-y-3">
          <strong className="text-sm text-[#0B1220] block uppercase">US House of Representatives (435 Seats)</strong>
          <div className="space-y-1.5 text-[#5B6779]">
            <div className="flex justify-between"><span>Total Seats Up in 2026:</span><strong className="text-[#0B1220]">435 Seats (All)</strong></div>
            <div className="flex justify-between"><span>Democratic-Held Baseline:</span><strong className="text-[#0E63C4]">{control.house.demHeld}</strong></div>
            <div className="flex justify-between"><span>Republican-Held Baseline:</span><strong className="text-[#B42318]">{control.house.repHeld}</strong></div>
            <div className="flex justify-between"><span>Toss-Ups / Competitive:</span><strong className="text-[#8A6100]">{control.house.tossUps}</strong></div>
          </div>
          <div className="p-2.5 rounded bg-[#F6F8FB] border border-[#E4E9F0] text-[11px] leading-relaxed">
            {control.house.note}
          </div>
        </div>
      </div>
    </div>
  );
}
