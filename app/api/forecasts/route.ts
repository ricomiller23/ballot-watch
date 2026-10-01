import { NextResponse } from 'next/server';
import { getAllRatings, getSenateRaces, getGovernorRaces } from '@/lib/races';

export const revalidate = 60;

export async function GET() {
  const ratings = getAllRatings();
  const senate = getSenateRaces();
  const gov = getGovernorRaces();

  return NextResponse.json({
    totalRatings: ratings.length,
    senateContestsTracked: senate.length,
    govContestsTracked: gov.length,
    ratings: ratings.slice(0, 50),
    asOf: new Date().toISOString(),
  });
}
