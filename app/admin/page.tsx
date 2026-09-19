'use client';

import React, { useState } from 'react';
import SOURCES from '@/config/sources.json';
import { Shield, Play, Lock, AlertTriangle } from 'lucide-react';

export default function AdminPage() {
  const [electionNightMode, setElectionNightMode] = useState<boolean>(false);
  const [sources, setSources] = useState(SOURCES);

  return (
    <div className="space-y-6 font-mono">
      <div className="bg-[#F6F8FB] border border-[#E4E9F0] p-4 rounded-xl shadow-xs flex justify-between items-center">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Shield className="w-5 h-5 text-[#0E63C4]" />
            <h1 className="font-extrabold text-lg text-[#0B1220]">BALLOT.WATCH Administration & Election Night Mode</h1>
          </div>
          <p className="text-xs text-[#5B6779]">Audit poll qualification queues, toggle election-night official-source enforcement, and review house effects.</p>
        </div>
      </div>

      {/* Election Night Mode Switch */}
      <div className="bg-[#FFFFFF] border-2 border-[#B54708] rounded-xl p-5 shadow-xs text-xs space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <strong className="text-sm text-[#0B1220] block">ELECTION NIGHT MODE (03 NOV 2026)</strong>
            <span className="text-[#5B6779]">Restricts all results ingestion exclusively to constitutional State Election Authorities.</span>
          </div>
          <button
            type="button"
            onClick={() => setElectionNightMode(!electionNightMode)}
            className={`px-3 py-1.5 rounded font-bold transition ${electionNightMode ? 'bg-[#B42318] text-white' : 'bg-[#F6F8FB] text-[#24303F] border border-[#CBD5E1]'}`}
          >
            {electionNightMode ? 'ACTIVE: OFFICIAL ONLY' : 'STANDBY MODE'}
          </button>
        </div>
        <p className="text-[#5B6779] text-[11px] leading-relaxed">
          When active, third-party projection calls and exit polls are quarantined. Only certified or official precinct-reported vote tallies enter the results stream.
        </p>
      </div>

      {/* Connectors Table */}
      <div className="bg-[#FFFFFF] border border-[#E4E9F0] rounded-xl overflow-hidden shadow-xs text-xs">
        <div className="p-3 bg-[#F6F8FB] border-b border-[#E4E9F0] font-bold">
          Connectors Telemetry ({sources.length})
        </div>
        <table className="w-full text-left">
          <tbody className="divide-y divide-[#E4E9F0]">
            {sources.map((s) => (
              <tr key={s.id} className="hover:bg-[#F6F8FB]">
                <td className="p-2.5 font-bold text-[#0B1220]">{s.id}</td>
                <td className="p-2.5 text-[#24303F]">{s.name}</td>
                <td className="p-2.5 text-right font-bold text-[#067647]">ARMED</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
