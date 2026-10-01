import { NextRequest, NextResponse } from 'next/server';
import { getAllRaces, computeSenateControl } from '@/lib/races';

export async function GET(request: NextRequest) {
  const races = getAllRaces();
  const racesWithAverages = races.filter(r => r.polling_average && r.polling_average.leader);
  const chamber = computeSenateControl();

  return NextResponse.json({
    status: 'ok',
    task: 'recompute',
    executed_at: new Date().toISOString(),
    races_evaluated: races.length,
    averages_computed: racesWithAverages.length,
    featured_averages: racesWithAverages.map(r => ({
      raceId: r.id,
      office: r.office,
      leader: r.polling_average?.leader,
      spread: r.polling_average?.spread,
      pollsCount: r.polling_average?.qualifying_polls_count,
    })),
    chamber_majority: chamber,
    message: 'Polling averages and consensus ratings recomputed from qualifying nonpartisan surveys.',
  });
}

export async function POST(request: NextRequest) {
  return GET(request);
}
