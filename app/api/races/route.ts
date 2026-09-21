import { NextResponse, NextRequest } from "next/server";
import { ALL_RACES_REGISTRY } from "@/lib/candidates-registry";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const level = searchParams.get("level");
  const state = searchParams.get("state");
  const office = searchParams.get("office");
  const minPop = searchParams.get("minPop");
  const limit = parseInt(searchParams.get("limit") || "200");

  let results = ALL_RACES_REGISTRY;
  if (level) results = results.filter(r => r.level === level);
  if (state) results = results.filter(r => r.stateAbbr.toUpperCase() === state.toUpperCase());
  if (office) {
    const o = office.toLowerCase();
    results = results.filter(r => r.office.toLowerCase().includes(o));
  }
  if (minPop) {
    const p = parseInt(minPop);
    results = results.filter(r => (r.population || 0) >= p);
  }

  return NextResponse.json({
    total: results.length,
    returned: Math.min(results.length, limit),
    races: results.slice(0, limit),
    asOf: new Date().toISOString(),
  });
}
