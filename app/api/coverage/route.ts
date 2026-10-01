import { NextResponse } from 'next/server';
import { STATE_MATRIX, getMatrixTotals } from '@/lib/state-coverage-matrix';
import { buildCoverageReport } from '@/lib/coverage';

export const dynamic = 'force-dynamic';

export async function GET() {
  const totals = getMatrixTotals();
  const report = buildCoverageReport();

  return NextResponse.json({
    summary: {
      statesTracked: totals.statesTracked,
      grandTotalRaces: totals.grandTotalRaces,
      totalCandidatesSourced: totals.totalCandidatesSourced,
      censusCountiesTotal: totals.censusCountiesTotal,
      countiesCovered: totals.countiesCovered,
      tiers: report.tiers,
    },
    matrix: STATE_MATRIX,
    asOf: new Date().toISOString(),
    disclaimer: report.disclaimer,
  });
}
