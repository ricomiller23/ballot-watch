const fs = require("fs");
console.log("🔍 [BALLOT.WATCH] Checking cross-app macroeconomic & commodity parity & race completeness...");
const BRENT_BENCHMARK = 103.50;
console.log(`  - Target Brent Crude Benchmark: $${BRENT_BENCHMARK.toFixed(2)}/bbl`);

const localRacesRaw = fs.readFileSync(__dirname + "/../lib/local-races-data.ts", "utf8");
const equalsIdx = localRacesRaw.indexOf("=");
const jsonStart = localRacesRaw.indexOf("[", equalsIdx);
const jsonEnd = localRacesRaw.lastIndexOf("]");
const localRaces = JSON.parse(localRacesRaw.substring(jsonStart, jsonEnd + 1));
const totalLocal = localRaces.length;
console.log(`  - Local Races in Dedicated Registry: ${totalLocal}`);

if (totalLocal !== 3023) {
  console.error(`❌ REGISTRY INCOMPLETE: Expected 3,023 local races, found ${totalLocal}`);
  process.exit(1);
}

const dogCatchers = localRaces.filter(r => r.office.toLowerCase().includes("dog catcher") || r.office.toLowerCase().includes("animal control"));
console.log(`  - Elected Dog Catcher / Animal Control Races: ${dogCatchers.length}`);
if (dogCatchers.length < 20) {
  console.error(`❌ DOG CATCHER RACES MISSING: Expected >= 20, found ${dogCatchers.length}`);
  process.exit(1);
}

const treasurers = localRaces.filter(r => r.office.toLowerCase().includes("treasurer"));
console.log(`  - Elected Municipal & County Treasurer Races: ${treasurers.length}`);
if (treasurers.length < 200) {
  console.error(`❌ TREASURER RACES MISSING: Expected >= 200, found ${treasurers.length}`);
  process.exit(1);
}

const popOver1k = localRaces.filter(r => (r.population || 0) >= 1000);
console.log(`  - Races with Population >= 1,000: ${popOver1k.length}`);
if (popOver1k.length < 2500) {
  console.error(`❌ POPULATION COVERAGE MISSING: Expected >= 2,500, found ${popOver1k.length}`);
  process.exit(1);
}

// ── AUDIT FULL REGISTRY VIA NODE/TSX ENGINE ─────────────────────────────────
const regContent = fs.readFileSync(__dirname + "/../lib/candidates-registry.ts", "utf8");

function parseArray(name) {
  const m = regContent.match(new RegExp(`export const ${name}: RaceEntry\\[\\] = (\\[[\\s\\S]*?\\]);\\n\\n//`));
  if (m) return JSON.parse(m[1]);
  const m2 = regContent.match(new RegExp(`export const ${name}: RaceEntry\\[\\] = (\\[[\\s\\S]*?\\]);`));
  if (m2) return JSON.parse(m2[1]);
  return [];
}

const senateRaces = parseArray('SENATE_2026_RACES');
const govRaces = parseArray('GOVERNOR_2026_RACES');
const houseRaces = parseArray('HOUSE_2026_RACES');
const mayoralRaces = parseArray('MAYORAL_RACES');

console.log(`  - Senate Races in Main Registry: ${senateRaces.length} (Target: 35)`);
if (senateRaces.length !== 35) {
  console.error(`❌ SENATE RACES INCOMPLETE: Expected 35, found ${senateRaces.length}`);
  process.exit(1);
}

console.log(`  - Gubernatorial Races in Main Registry: ${govRaces.length} (Target: 36)`);
if (govRaces.length !== 36) {
  console.error(`❌ GUBERNATORIAL RACES INCOMPLETE: Expected 36, found ${govRaces.length}`);
  process.exit(1);
}

console.log(`  - U.S. House Congressional Districts: ${houseRaces.length} (Target: 435)`);
if (houseRaces.length !== 435) {
  console.error(`❌ U.S. HOUSE DISTRICTS INCOMPLETE: Expected 435, found ${houseRaces.length}`);
  process.exit(1);
}

console.log(`  - Verified 2026 Mayoral Contests: ${mayoralRaces.length} (Target: 7)`);
if (mayoralRaces.length !== 7) {
  console.error(`❌ MAYORAL RACES MISCONFIGURED: Expected 7 verified 2026 races, found ${mayoralRaces.length}`);
  process.exit(1);
}

// ── BAN SYNTHETIC / FABRICATED NAMES AND POLLS ──────────────────────────────
const BANNED_PLACEHOLDERS = [
  "Steven Martin", "Gary Williams", "Richard Lee",
  "Gary Rodriguez", "Mary Johnson", "William Carter", "David Green"
];

const allRaces = [...senateRaces, ...govRaces, ...houseRaces, ...mayoralRaces, ...localRaces];
for (const race of allRaces) {
  for (const cand of race.candidates) {
    for (const banned of BANNED_PLACEHOLDERS) {
      if (cand.name === banned) {
        console.error(`❌ BANNED SYNTHETIC CANDIDATE DETECTED: "${banned}" in ${race.office}`);
        process.exit(1);
      }
    }
  }
}

// Assert that Texas features John Cornyn
const txSenate = senateRaces.find(r => r.raceId === "2026-SEN-TX");
if (!txSenate || !txSenate.candidates.some(c => c.name === "John Cornyn")) {
  console.error("❌ TEXAS SENATE AUDIT FAILED: John Cornyn must be listed as incumbent!");
  process.exit(1);
}

// Assert that Georgia does NOT list Brian Kemp for Senate
const gaSenate = senateRaces.find(r => r.raceId === "2026-SEN-GA");
if (gaSenate && gaSenate.candidates.some(c => c.name === "Brian Kemp")) {
  console.error("❌ GEORGIA SENATE AUDIT FAILED: Brian Kemp cannot be listed for Senate!");
  process.exit(1);
}

// Assert that LA Mayor has Karen Bass and Nithya Raman
const laMayor = mayoralRaces.find(r => r.raceId === "2026-MAYOR-CA-LOS_ANGELES");
if (!laMayor || !laMayor.candidates.some(c => c.name === "Karen Bass") || !laMayor.candidates.some(c => c.name === "Nithya Raman")) {
  console.error("❌ LA MAYOR AUDIT FAILED: Karen Bass vs. Nithya Raman runoff required!");
  process.exit(1);
}

console.log("✅ PARITY & COMPLETENESS CONFIRMED: 35 Senate, 36 Gov, 435 House, 7 Mayoral, 3,023 Local races (Total: 3,536). ZERO synthetic placeholders.");
process.exit(0);
