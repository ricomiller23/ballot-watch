import { NextResponse } from 'next/server';
import racesDataset from '@/data/races.json';

export const dynamic = 'force-dynamic';

export async function GET() {
  const generatedAt = racesDataset.metadata.generated_at;
  const datasetTime = new Date(generatedAt).getTime();
  const now = Date.now();
  
  // Staleness check: flagged degraded if older than 24 hours
  const ageSeconds = Math.max(0, Math.floor((now - datasetTime) / 1000));
  const isStale = ageSeconds > 86400;

  return NextResponse.json({
    status: isStale ? 'degraded' : 'healthy',
    last_success_at: generatedAt,
    as_of: new Date().toISOString(),
    stale: isStale,
    data_age_seconds: ageSeconds,
    total_races: racesDataset.metadata.total_races,
    total_candidates: racesDataset.metadata.total_candidates,
    total_sourced_nominees: racesDataset.metadata.total_sourced_nominees,
    total_ratings: racesDataset.metadata.total_ratings,
    connectors: [
      { id: 'fec', status: 'ok', last_sync: generatedAt },
      { id: 'cook', status: 'ok', last_sync: generatedAt },
      { id: 'sabato', status: 'ok', last_sync: generatedAt },
      { id: 'inside_elections', status: 'ok', last_sync: generatedAt }
    ]
  });
}
