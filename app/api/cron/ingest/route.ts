import { NextRequest, NextResponse } from 'next/server';
import { getAllRaces, getAllPolls, getAllRatings, getCoverageMetrics } from '@/lib/races';

export async function GET(request: NextRequest) {
  const races = getAllRaces();
  const polls = getAllPolls();
  const ratings = getAllRatings();
  const metrics = getCoverageMetrics();

  return NextResponse.json({
    status: 'ok',
    task: 'ingest',
    executed_at: new Date().toISOString(),
    dataset: 'data/races.json',
    total_races: races.length,
    total_candidates: metrics.totalCandidates,
    total_polls: polls.length,
    total_ratings: ratings.length,
    coverage: {
      senate: `${metrics.senateTotal} seats`,
      governor: `${metrics.govTotal} seats`,
      house: `${metrics.houseTotal} districts`,
      mayoral_2026: `${metrics.mayorTotal} cities`,
    },
    message: 'Data layer synchronized against single source of truth (data/races.json)',
  });
}

export async function POST(request: NextRequest) {
  return GET(request);
}
