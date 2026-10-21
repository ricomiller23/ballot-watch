import React from 'react';
import { TacticalElectoralMap } from '@/components/TacticalElectoralMap';
import { Compass, Crosshair, MapPin, Layers, Trophy } from 'lucide-react';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export const metadata = {
  title: 'Tactical Electoral Map · National & State Radar with Jurisdiction Zoom',
  description: 'Interactive 1980s Arcade tactical electoral map. Seamless zoom from national US radar into state jurisdictions, congressional districts, and municipal cities with clickable sub-races.'
};

export default function MapPage() {
  return (
    <div className="space-y-6 font-mono">
      {/* ── ARCADE CABINET BANNER ──────────────────────────────────────── */}
      <div className="relative p-6 rounded-2xl bg-[#100C2A] border-4 border-[#00F0FF] shadow-[0_0_25px_rgba(0,240,255,0.35)] overflow-hidden">
        <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-[#FFE600]"></div>
        <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-[#FFE600]"></div>
        <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-[#FFE600]"></div>
        <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-[#FFE600]"></div>

        <div className="flex flex-wrap items-center justify-between gap-4 relative z-10">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#FFE600] animate-spin-slow" />
              <span className="font-arcade text-[10px] bg-[#FF007F] text-white px-2.5 py-1 rounded shadow-[0_0_10px_rgba(255,0,127,0.6)] tracking-wider">
                TACTICAL RADAR · 50 STATES &amp; MUNICIPALITIES
              </span>
            </div>
            <h1 className="font-arcade text-xl sm:text-2xl text-[#FFE600] arcade-text-glow-yellow mt-2">
              ELECTORAL MAP RADAR: NATIONAL &amp; STATE JURISDICTIONS
            </h1>
            <p className="text-xs sm:text-sm font-crt text-[#C7D2FE] text-[16px] max-w-3xl mt-1">
              Click any state to initiate vector zoom into its congressional districts and municipal cities. Click city beacons or district chips to inspect all filed sub-races with primary source receipts.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-[9px] font-arcade text-white">
            <div className="bg-[#181338] px-3 py-1.5 rounded-lg border border-[#FFE600]/40 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FFE600] shadow-[0_0_6px_#FFE600]"></span>
              <span>TOSS-UP BATTLEGROUNDS</span>
            </div>
            <div className="bg-[#181338] px-3 py-1.5 rounded-lg border border-[#00F0FF]/40 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#00F0FF] shadow-[0_0_6px_#00F0FF]"></span>
              <span>DEMOCRAT LEANING/HELD</span>
            </div>
            <div className="bg-[#181338] px-3 py-1.5 rounded-lg border border-[#FF007F]/40 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF007F] shadow-[0_0_6px_#FF007F]"></span>
              <span>REPUBLICAN LEANING/HELD</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── THE INTERACTIVE TACTICAL MAP ENGINE ──────────────────────────── */}
      <TacticalElectoralMap />
    </div>
  );
}
