import { NextRequest, NextResponse } from 'next/server';
import { getCoverageMetrics, computeSenateControl, getAllRatings } from '@/lib/races';

export async function GET(request: NextRequest) {
  const metrics = getCoverageMetrics();
  const chamber = computeSenateControl();
  const ratings = getAllRatings();

  return NextResponse.json({
    status: 'ok',
    task: 'digest',
    executed_at: new Date().toISOString(),
    electoral_digest: {
      metrics,
      chamber_majority_arithmetic: chamber,
      total_handicapper_ratings: ratings.length,
      cycle: 2026,
      election_date: '2026-11-03',
    },
    message: 'Daily electoral intelligence digest compiled from retrieved candidate rosters and handicappers.',
  });
}

export async function POST(request: NextRequest) {
  return GET(request);
}
