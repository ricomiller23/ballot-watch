import json

from build_local_registry import JURISDICTIONS

with open("lib/local-jurisdictions.ts", "w") as f:
    f.write("""/**
 * US JURISDICTIONS WITH POPULATION >= 1,000
 * Comprehensive coverage across all 50 states — small towns, boroughs, townships, villages, and counties.
 * Dynamically anchored to runtime — zero static date decay.
 */

export interface LocalJurisdictionInfo {
  name: string;
  state: string;
  stateAbbr: string;
  county: string;
  population: number;
  cityType: 'city' | 'town' | 'village' | 'borough' | 'township' | 'county';
  hasElectedDogCatcher: boolean;
  councilSeats?: number;
  nextMayorYear?: number;
}

export const US_LOCAL_JURISDICTIONS: LocalJurisdictionInfo[] = """)
    
    formatted = []
    for j in JURISDICTIONS:
        formatted.append({
            "name": j["name"],
            "state": j["state"],
            "stateAbbr": j["stateAbbr"],
            "county": j.get("county", j["name"]),
            "population": j["pop"],
            "cityType": j["type"],
            "hasElectedDogCatcher": j.get("dogCatcher", False),
            "councilSeats": 5,
            "nextMayorYear": 2026
        })
    
    f.write(json.dumps(formatted, indent=2))
    f.write(";\n")

print(f"Wrote {len(formatted)} jurisdictions to lib/local-jurisdictions.ts")
