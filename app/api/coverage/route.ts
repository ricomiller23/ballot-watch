import { NextResponse } from 'next/server';
import { getCoverageMetrics } from '@/lib/races';

export const dynamic = 'force-dynamic';

export async function GET() {
  const metrics = getCoverageMetrics();

  return NextResponse.json({
    summary: {
      totalRaces: metrics.totalRaces,
      racesWithSourcedNominee: metrics.racesWithSourcedNominee,
      totalCandidates: metrics.totalCandidates,
      totalSourcedNominees: metrics.totalSourcedNominees,
      tier1Senate: { total: metrics.senateTotal, sourced: metrics.senateSourced },
      tier2Governor: { total: metrics.govTotal, sourced: metrics.govSourced },
      tier3House: { total: metrics.houseTotal, sourced: metrics.houseSourced },
      tier6Mayoral: { total: metrics.mayorTotal, sourced: metrics.mayorSourced },
    },
    asOf: new Date().toISOString(),
    disclaimer: "All numbers are computed directly from data/races.json. Candidates with no source_url are omitted.",
  });
}
