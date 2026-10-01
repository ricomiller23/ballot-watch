import { NextResponse, NextRequest } from "next/server";
import { getAllRaces } from "@/lib/races";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tier = searchParams.get("tier");
  const state = searchParams.get("state");
  const office = searchParams.get("office");
  const limit = parseInt(searchParams.get("limit") || "500");

  let results = getAllRaces();
  if (tier) results = results.filter(r => r.tier === parseInt(tier));
  if (state) results = results.filter(r => r.state.toUpperCase() === state.toUpperCase());
  if (office) {
    const o = office.toLowerCase();
    results = results.filter(r => r.office.toLowerCase().includes(o));
  }

  return NextResponse.json({
    total: results.length,
    returned: Math.min(results.length, limit),
    races: results.slice(0, limit),
    asOf: new Date().toISOString(),
  });
}
