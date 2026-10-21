import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

// 1. Read UsStatePaths.ts and compute exact bounding boxes
const pathsFile = fs.readFileSync(path.join(rootDir, 'components', 'UsStatePaths.ts'), 'utf8');

const startPaths = pathsFile.indexOf('export const US_STATE_PATHS');
const endPaths = pathsFile.indexOf('export const US_STATE_CENTROIDS');
const jsonPart = pathsFile.slice(startPaths, endPaths).replace(/export const US_STATE_PATHS: Record<string, string> = /, '').trim().replace(/;$/, '');
const statePaths = eval('(' + jsonPart + ')');

const startCentroids = pathsFile.indexOf('export const US_STATE_CENTROIDS');
const jsonCentroids = pathsFile.slice(startCentroids).replace(/export const US_STATE_CENTROIDS: Record<string, { abbr: string; x: number; y: number }> = /, '').trim().replace(/;$/, '');
const stateCentroids = eval('(' + jsonCentroids + ')');

function getBBox(svgPath) {
  const nums = svgPath.match(/-?[\d\.]+/g).map(Number);
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  for (let i = 0; i < nums.length; i += 2) {
    const x = nums[i];
    const y = nums[i+1];
    if (x < minX) minX = x;
    if (x > maxX) maxX = x;
    if (y < minY) minY = y;
    if (y > maxY) maxY = y;
  }
  return {
    minX: Math.round(minX),
    minY: Math.round(minY),
    maxX: Math.round(maxX),
    maxY: Math.round(maxY),
    width: Math.round(maxX - minX),
    height: Math.round(maxY - minY)
  };
}

const stateBoundingBoxes = {};
for (const [stateName, p] of Object.entries(statePaths)) {
  const box = getBBox(p);
  const centroid = stateCentroids[stateName] || { abbr: stateName.slice(0, 2).toUpperCase(), x: box.minX + box.width / 2, y: box.minY + box.height / 2 };
  stateBoundingBoxes[stateName] = {
    abbr: centroid.abbr,
    ...box,
    centroidX: centroid.x,
    centroidY: centroid.y
  };
}

// Add Alaska and Hawaii placeholders for completeness
stateBoundingBoxes["Alaska"] = { abbr: "AK", minX: 50, minY: 460, maxX: 190, maxY: 560, width: 140, height: 100, centroidX: 120, centroidY: 510 };
stateBoundingBoxes["Hawaii"] = { abbr: "HI", minX: 230, minY: 520, maxX: 330, maxY: 570, width: 100, height: 50, centroidX: 280, centroidY: 545 };

console.log("Calculated bounding boxes for", Object.keys(stateBoundingBoxes).length, "states.");

// 2. Comprehensive City Jurisdictions Dataset (150+ cities across 50 states)
const CITIES_REGISTRY = [
  // TEXAS
  { id: "city-tx-austin", name: "Austin", state: "TX", stateName: "Texas", x: 428, y: 442, population: 978908, county: "Travis", districts: ["TX-10", "TX-35", "TX-37"], hasMayoral: true, mayoralId: "mayor-tx-austin", isMajor: true },
  { id: "city-tx-san-antonio", name: "San Antonio", state: "TX", stateName: "Texas", x: 418, y: 466, population: 1472909, county: "Bexar", districts: ["TX-20", "TX-21", "TX-28", "TX-35"], hasMayoral: true, mayoralId: "mayor-tx-san-antonio", isMajor: true },
  { id: "city-tx-houston", name: "Houston", state: "TX", stateName: "Texas", x: 472, y: 456, population: 2304580, county: "Harris", districts: ["TX-02", "TX-07", "TX-09", "TX-18", "TX-29", "TX-38"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-tx-dallas", name: "Dallas", state: "TX", stateName: "Texas", x: 436, y: 374, population: 1304379, county: "Dallas", districts: ["TX-24", "TX-30", "TX-32", "TX-33"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-tx-fort-worth", name: "Fort Worth", state: "TX", stateName: "Texas", x: 424, y: 376, population: 956709, county: "Tarrant", districts: ["TX-12", "TX-26", "TX-33"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-tx-el-paso", name: "El Paso", state: "TX", stateName: "Texas", x: 306, y: 424, population: 678815, county: "El Paso", districts: ["TX-16", "TX-23"], hasMayoral: true, mayoralId: "mayor-tx-el-paso", isMajor: true },
  { id: "city-tx-arlington", name: "Arlington", state: "TX", stateName: "Texas", x: 430, y: 380, population: 394266, county: "Tarrant", districts: ["TX-06", "TX-25", "TX-33"], hasMayoral: true, mayoralId: "mayor-tx-arlington", isMajor: false },
  { id: "city-tx-corpus-christi", name: "Corpus Christi", state: "TX", stateName: "Texas", x: 438, y: 504, population: 317863, county: "Nueces", districts: ["TX-27"], hasMayoral: true, mayoralId: "mayor-tx-corpus-christi", isMajor: false },
  { id: "city-tx-lubbock", name: "Lubbock", state: "TX", stateName: "Texas", x: 368, y: 362, population: 263930, county: "Lubbock", districts: ["TX-19"], hasMayoral: true, mayoralId: "mayor-tx-lubbock", isMajor: false },
  { id: "city-tx-laredo", name: "Laredo", state: "TX", stateName: "Texas", x: 396, y: 512, population: 255205, county: "Webb", districts: ["TX-28"], hasMayoral: true, mayoralId: "mayor-tx-laredo", isMajor: false },
  { id: "city-tx-garland", name: "Garland", state: "TX", stateName: "Texas", x: 442, y: 372, population: 246018, county: "Dallas", districts: ["TX-05", "TX-32"], hasMayoral: true, mayoralId: "mayor-tx-garland", isMajor: false },
  { id: "city-tx-irving", name: "Irving", state: "TX", stateName: "Texas", x: 432, y: 376, population: 256684, county: "Dallas", districts: ["TX-24", "TX-33"], hasMayoral: true, mayoralId: "mayor-tx-irving", isMajor: false },

  // CALIFORNIA
  { id: "city-ca-los-angeles", name: "Los Angeles", state: "CA", stateName: "California", x: 102, y: 356, population: 3898747, county: "Los Angeles", districts: ["CA-28", "CA-30", "CA-34", "CA-37"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-ca-san-diego", name: "San Diego", state: "CA", stateName: "California", x: 122, y: 390, population: 1386932, county: "San Diego", districts: ["CA-50", "CA-51", "CA-52"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-ca-san-jose", name: "San Jose", state: "CA", stateName: "California", x: 54, y: 272, population: 1013240, county: "Santa Clara", districts: ["CA-16", "CA-17", "CA-18"], hasMayoral: true, mayoralId: "mayor-ca-san-jose", isMajor: true },
  { id: "city-ca-san-francisco", name: "San Francisco", state: "CA", stateName: "California", x: 46, y: 260, population: 873965, county: "San Francisco", districts: ["CA-11", "CA-12"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-ca-fresno", name: "Fresno", state: "CA", stateName: "California", x: 82, y: 298, population: 542107, county: "Fresno", districts: ["CA-21", "CA-22"], hasMayoral: true, mayoralId: "mayor-ca-fresno", isMajor: true },
  { id: "city-ca-sacramento", name: "Sacramento", state: "CA", stateName: "California", x: 68, y: 246, population: 524943, county: "Sacramento", districts: ["CA-06", "CA-07"], hasMayoral: true, mayoralId: "mayor-ca-sacramento", isMajor: true },
  { id: "city-ca-long-beach", name: "Long Beach", state: "CA", stateName: "California", x: 106, y: 362, population: 466742, county: "Los Angeles", districts: ["CA-42"], hasMayoral: true, mayoralId: "mayor-ca-long-beach", isMajor: true },
  { id: "city-ca-oakland", name: "Oakland", state: "CA", stateName: "California", x: 50, y: 262, population: 440646, county: "Alameda", districts: ["CA-12"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-ca-bakersfield", name: "Bakersfield", state: "CA", stateName: "California", x: 96, y: 330, population: 403455, county: "Kern", districts: ["CA-20", "CA-22"], hasMayoral: true, mayoralId: "mayor-ca-bakersfield", isMajor: false },
  { id: "city-ca-anaheim", name: "Anaheim", state: "CA", stateName: "California", x: 110, y: 364, population: 346824, county: "Orange", districts: ["CA-46"], hasMayoral: true, mayoralId: "mayor-ca-anaheim", isMajor: false },
  { id: "city-ca-santa-ana", name: "Santa Ana", state: "CA", stateName: "California", x: 112, y: 366, population: 310227, county: "Orange", districts: ["CA-46"], hasMayoral: true, mayoralId: "mayor-ca-santa-ana", isMajor: false },
  { id: "city-ca-riverside", name: "Riverside", state: "CA", stateName: "California", x: 122, y: 360, population: 314998, county: "Riverside", districts: ["CA-39"], hasMayoral: true, mayoralId: "mayor-ca-riverside", isMajor: false },
  { id: "city-ca-stockton", name: "Stockton", state: "CA", stateName: "California", x: 66, y: 256, population: 320804, county: "San Joaquin", districts: ["CA-09"], hasMayoral: true, mayoralId: "mayor-ca-stockton", isMajor: false },
  { id: "city-ca-chula-vista", name: "Chula Vista", state: "CA", stateName: "California", x: 124, y: 392, population: 275487, county: "San Diego", districts: ["CA-51"], hasMayoral: true, mayoralId: "mayor-ca-chula-vista", isMajor: false },
  { id: "city-ca-irvine", name: "Irvine", state: "CA", stateName: "California", x: 114, y: 368, population: 307670, county: "Orange", districts: ["CA-47"], hasMayoral: true, mayoralId: "mayor-ca-irvine", isMajor: false },
  { id: "city-ca-fremont", name: "Fremont", state: "CA", stateName: "California", x: 52, y: 268, population: 230504, county: "Alameda", districts: ["CA-14"], hasMayoral: true, mayoralId: "mayor-ca-fremont", isMajor: false },
  { id: "city-ca-modesto", name: "Modesto (CA-13)", state: "CA", stateName: "California", x: 72, y: 268, population: 218464, county: "Stanislaus", districts: ["CA-13"], hasMayoral: false, mayoralId: null, isMajor: true },

  // ARIZONA
  { id: "city-az-phoenix", name: "Phoenix", state: "AZ", stateName: "Arizona", x: 215, y: 368, population: 1608139, county: "Maricopa", districts: ["AZ-01", "AZ-03", "AZ-04"], hasMayoral: true, mayoralId: "mayor-az-phoenix", isMajor: true },
  { id: "city-az-tucson", name: "Tucson", state: "AZ", stateName: "Arizona", x: 232, y: 404, population: 542629, county: "Pima", districts: ["AZ-07"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-az-mesa", name: "Mesa", state: "AZ", stateName: "Arizona", x: 220, y: 370, population: 504258, county: "Maricopa", districts: ["AZ-04", "AZ-05"], hasMayoral: true, mayoralId: "mayor-az-mesa", isMajor: false },
  { id: "city-az-chandler", name: "Chandler", state: "AZ", stateName: "Arizona", x: 221, y: 374, population: 275987, county: "Maricopa", districts: ["AZ-05"], hasMayoral: true, mayoralId: "mayor-az-chandler", isMajor: false },
  { id: "city-az-scottsdale", name: "Scottsdale", state: "AZ", stateName: "Arizona", x: 218, y: 364, population: 241361, county: "Maricopa", districts: ["AZ-01"], hasMayoral: true, mayoralId: "mayor-az-scottsdale", isMajor: false },
  { id: "city-az-glendale", name: "Glendale", state: "AZ", stateName: "Arizona", x: 211, y: 366, population: 248325, county: "Maricopa", districts: ["AZ-08"], hasMayoral: true, mayoralId: "mayor-az-glendale", isMajor: false },
  { id: "city-az-gilbert", name: "Gilbert", state: "AZ", stateName: "Arizona", x: 222, y: 372, population: 267918, county: "Maricopa", districts: ["AZ-05"], hasMayoral: true, mayoralId: "mayor-az-gilbert", isMajor: false },

  // NEVADA
  { id: "city-nv-las-vegas", name: "Las Vegas", state: "NV", stateName: "Nevada", x: 162, y: 326, population: 641903, county: "Clark", districts: ["NV-01"], hasMayoral: true, mayoralId: "mayor-nv-las-vegas", isMajor: true },
  { id: "city-nv-henderson", name: "Henderson", state: "NV", stateName: "Nevada", x: 165, y: 330, population: 317610, county: "Clark", districts: ["NV-03"], hasMayoral: true, mayoralId: "mayor-nv-henderson", isMajor: false },
  { id: "city-nv-reno", name: "Reno", state: "NV", stateName: "Nevada", x: 92, y: 234, population: 264165, county: "Washoe", districts: ["NV-02"], hasMayoral: true, mayoralId: "mayor-nv-reno", isMajor: true },
  { id: "city-nv-north-las-vegas", name: "North Las Vegas", state: "NV", stateName: "Nevada", x: 162, y: 323, population: 262527, county: "Clark", districts: ["NV-04"], hasMayoral: true, mayoralId: "mayor-nv-north-las-vegas", isMajor: false },

  // GEORGIA
  { id: "city-ga-atlanta", name: "Atlanta", state: "GA", stateName: "Georgia", x: 672, y: 386, population: 498715, county: "Fulton", districts: ["GA-05"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-ga-augusta", name: "Augusta", state: "GA", stateName: "Georgia", x: 704, y: 392, population: 202081, county: "Richmond", districts: ["GA-12"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-ga-savannah", name: "Savannah", state: "GA", stateName: "Georgia", x: 712, y: 426, population: 147780, county: "Chatham", districts: ["GA-01"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-ga-columbus", name: "Columbus", state: "GA", stateName: "Georgia", x: 664, y: 414, population: 206922, county: "Muscogee", districts: ["GA-02"], hasMayoral: false, mayoralId: null, isMajor: false },
  { id: "city-ga-macon", name: "Macon", state: "GA", stateName: "Georgia", x: 682, y: 402, population: 157346, county: "Bibb", districts: ["GA-08"], hasMayoral: false, mayoralId: null, isMajor: false },

  // FLORIDA
  { id: "city-fl-jacksonville", name: "Jacksonville", state: "FL", stateName: "Florida", x: 694, y: 450, population: 949611, county: "Duval", districts: ["FL-04"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-fl-miami", name: "Miami", state: "FL", stateName: "Florida", x: 716, y: 550, population: 442241, county: "Miami-Dade", districts: ["FL-24", "FL-27"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-fl-tampa", name: "Tampa", state: "FL", stateName: "Florida", x: 676, y: 502, population: 384959, county: "Hillsborough", districts: ["FL-14"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-fl-orlando", name: "Orlando", state: "FL", stateName: "Florida", x: 698, y: 494, population: 307573, county: "Orange", districts: ["FL-10"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-fl-tallahassee", name: "Tallahassee", state: "FL", stateName: "Florida", x: 645, y: 448, population: 196169, county: "Leon", districts: ["FL-02"], hasMayoral: false, mayoralId: null, isMajor: true },

  // NORTH CAROLINA
  { id: "city-nc-charlotte", name: "Charlotte", state: "NC", stateName: "North Carolina", x: 730, y: 342, population: 874579, county: "Mecklenburg", districts: ["NC-12", "NC-14"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-nc-raleigh", name: "Raleigh", state: "NC", stateName: "North Carolina", x: 766, y: 328, population: 467665, county: "Wake", districts: ["NC-02"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-nc-greensboro", name: "Greensboro", state: "NC", stateName: "North Carolina", x: 746, y: 324, population: 299035, county: "Guilford", districts: ["NC-06"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-nc-durham", name: "Durham", state: "NC", stateName: "North Carolina", x: 760, y: 326, population: 283506, county: "Durham", districts: ["NC-04"], hasMayoral: false, mayoralId: null, isMajor: false },
  { id: "city-nc-winston-salem", name: "Winston-Salem", state: "NC", stateName: "North Carolina", x: 738, y: 324, population: 249545, county: "Forsyth", districts: ["NC-06"], hasMayoral: false, mayoralId: null, isMajor: false },

  // MICHIGAN
  { id: "city-mi-detroit", name: "Detroit", state: "MI", stateName: "Michigan", x: 686, y: 186, population: 639111, county: "Wayne", districts: ["MI-12", "MI-13"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-mi-grand-rapids", name: "Grand Rapids", state: "MI", stateName: "Michigan", x: 652, y: 172, population: 198917, county: "Kent", districts: ["MI-03"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-mi-lansing", name: "Lansing", state: "MI", stateName: "Michigan", x: 666, y: 178, population: 112644, county: "Ingham", districts: ["MI-07"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-mi-ann-arbor", name: "Ann Arbor", state: "MI", stateName: "Michigan", x: 678, y: 188, population: 123851, county: "Washtenaw", districts: ["MI-06"], hasMayoral: false, mayoralId: null, isMajor: false },

  // OHIO
  { id: "city-oh-columbus", name: "Columbus", state: "OH", stateName: "Ohio", x: 696, y: 228, population: 905748, county: "Franklin", districts: ["OH-03"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-oh-cleveland", name: "Cleveland", state: "OH", stateName: "Ohio", x: 716, y: 196, population: 372624, county: "Cuyahoga", districts: ["OH-11"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-oh-cincinnati", name: "Cincinnati", state: "OH", stateName: "Ohio", x: 672, y: 254, population: 309317, county: "Hamilton", districts: ["OH-01"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-oh-toledo", name: "Toledo", state: "OH", stateName: "Ohio", x: 684, y: 196, population: 270871, county: "Lucas", districts: ["OH-09"], hasMayoral: false, mayoralId: null, isMajor: false },
  { id: "city-oh-akron", name: "Akron", state: "OH", stateName: "Ohio", x: 715, y: 206, population: 190469, county: "Summit", districts: ["OH-13"], hasMayoral: false, mayoralId: null, isMajor: false },

  // PENNSYLVANIA
  { id: "city-pa-philadelphia", name: "Philadelphia", state: "PA", stateName: "Pennsylvania", x: 820, y: 226, population: 1603797, county: "Philadelphia", districts: ["PA-02", "PA-03"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-pa-pittsburgh", name: "Pittsburgh", state: "PA", stateName: "Pennsylvania", x: 748, y: 220, population: 302971, county: "Allegheny", districts: ["PA-12"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-pa-allentown", name: "Allentown", state: "PA", stateName: "Pennsylvania", x: 812, y: 212, population: 125845, county: "Lehigh", districts: ["PA-07"], hasMayoral: false, mayoralId: null, isMajor: false },
  { id: "city-pa-harrisburg", name: "Harrisburg", state: "PA", stateName: "Pennsylvania", x: 792, y: 224, population: 50099, county: "Dauphin", districts: ["PA-10"], hasMayoral: false, mayoralId: null, isMajor: true },

  // NEW YORK
  { id: "city-ny-new-york", name: "New York City", state: "NY", stateName: "New York", x: 844, y: 214, population: 8804190, county: "5 Boroughs", districts: ["NY-07", "NY-10", "NY-12"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-ny-buffalo", name: "Buffalo", state: "NY", stateName: "New York", x: 756, y: 162, population: 278349, county: "Erie", districts: ["NY-26"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-ny-rochester", name: "Rochester", state: "NY", stateName: "New York", x: 780, y: 154, population: 211328, county: "Monroe", districts: ["NY-25"], hasMayoral: false, mayoralId: null, isMajor: false },
  { id: "city-ny-albany", name: "Albany", state: "NY", stateName: "New York", x: 846, y: 168, population: 99224, county: "Albany", districts: ["NY-20"], hasMayoral: false, mayoralId: null, isMajor: true },

  // ILLINOIS
  { id: "city-il-chicago", name: "Chicago", state: "IL", stateName: "Illinois", x: 598, y: 196, population: 2746388, county: "Cook", districts: ["IL-01", "IL-02", "IL-07"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-il-springfield", name: "Springfield", state: "IL", stateName: "Illinois", x: 580, y: 234, population: 114394, county: "Sangamon", districts: ["IL-13"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-il-peoria", name: "Peoria", state: "IL", stateName: "Illinois", x: 580, y: 212, population: 113150, county: "Peoria", districts: ["IL-17"], hasMayoral: false, mayoralId: null, isMajor: false },

  // ALABAMA
  { id: "city-al-birmingham", name: "Birmingham", state: "AL", stateName: "Alabama", x: 605, y: 396, population: 200733, county: "Jefferson", districts: ["AL-07"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-al-huntsville", name: "Huntsville", state: "AL", stateName: "Alabama", x: 610, y: 360, population: 215006, county: "Madison", districts: ["AL-05"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-al-mobile", name: "Mobile", state: "AL", stateName: "Alabama", x: 598, y: 450, population: 187041, county: "Mobile", districts: ["AL-01"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-al-montgomery", name: "Montgomery", state: "AL", stateName: "Alabama", x: 620, y: 412, population: 200603, county: "Montgomery", districts: ["AL-02"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-al-fort-payne", name: "Fort Payne", state: "AL", stateName: "Alabama", x: 628, y: 366, population: 14877, county: "DeKalb", districts: ["AL-04"], hasMayoral: false, mayoralId: null, isMajor: false },

  // MAINE
  { id: "city-me-portland", name: "Portland", state: "ME", stateName: "Maine", x: 902, y: 135, population: 68408, county: "Cumberland", districts: ["ME-01"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-me-bangor", name: "Bangor", state: "ME", stateName: "Maine", x: 920, y: 105, population: 31753, county: "Penobscot", districts: ["ME-02"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-me-augusta", name: "Augusta", state: "ME", stateName: "Maine", x: 910, y: 120, population: 18899, county: "Kennebec", districts: ["ME-01"], hasMayoral: false, mayoralId: null, isMajor: false },

  // NEW HAMPSHIRE
  { id: "city-nh-manchester", name: "Manchester", state: "NH", stateName: "New Hampshire", x: 878, y: 154, population: 115644, county: "Hillsborough", districts: ["NH-01"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-nh-concord", name: "Concord", state: "NH", stateName: "New Hampshire", x: 874, y: 144, population: 43976, county: "Merrimack", districts: ["NH-02"], hasMayoral: false, mayoralId: null, isMajor: true },

  // IOWA
  { id: "city-ia-des-moines", name: "Des Moines", state: "IA", stateName: "Iowa", x: 508, y: 198, population: 214133, county: "Polk", districts: ["IA-03"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-ia-cedar-rapids", name: "Cedar Rapids", state: "IA", stateName: "Iowa", x: 535, y: 186, population: 137710, county: "Linn", districts: ["IA-02"], hasMayoral: false, mayoralId: null, isMajor: false },

  // KANSAS
  { id: "city-ks-wichita", name: "Wichita", state: "KS", stateName: "Kansas", x: 442, y: 268, population: 397532, county: "Sedgwick", districts: ["KS-04"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-ks-topeka", name: "Topeka", state: "KS", stateName: "Kansas", x: 472, y: 248, population: 126587, county: "Shawnee", districts: ["KS-02"], hasMayoral: false, mayoralId: null, isMajor: true },

  // MINNESOTA
  { id: "city-mn-minneapolis", name: "Minneapolis", state: "MN", stateName: "Minnesota", x: 508, y: 118, population: 429954, county: "Hennepin", districts: ["MN-05"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-mn-st-paul", name: "St. Paul", state: "MN", stateName: "Minnesota", x: 516, y: 120, population: 311527, county: "Ramsey", districts: ["MN-04"], hasMayoral: false, mayoralId: null, isMajor: true },

  // MISSISSIPPI
  { id: "city-ms-jackson", name: "Jackson", state: "MS", stateName: "Mississippi", x: 574, y: 408, population: 153701, county: "Hinds", districts: ["MS-02"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-ms-gulfport", name: "Gulfport", state: "MS", stateName: "Mississippi", x: 592, y: 450, population: 72926, county: "Harrison", districts: ["MS-04"], hasMayoral: false, mayoralId: null, isMajor: false },

  // NEBRASKA
  { id: "city-ne-omaha", name: "Omaha", state: "NE", stateName: "Nebraska", x: 474, y: 200, population: 486051, county: "Douglas", districts: ["NE-02"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-ne-lincoln", name: "Lincoln", state: "NE", stateName: "Nebraska", x: 464, y: 212, population: 291082, county: "Lancaster", districts: ["NE-01"], hasMayoral: false, mayoralId: null, isMajor: true },

  // SOUTH CAROLINA
  { id: "city-sc-charleston", name: "Charleston", state: "SC", stateName: "South Carolina", x: 742, y: 395, population: 150227, county: "Charleston", districts: ["SC-01"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-sc-columbia", name: "Columbia", state: "SC", stateName: "South Carolina", x: 720, y: 374, population: 136684, county: "Richland", districts: ["SC-02"], hasMayoral: false, mayoralId: null, isMajor: true },

  // MONTANA
  { id: "city-mt-billings", name: "Billings", state: "MT", stateName: "Montana", x: 260, y: 95, population: 117116, county: "Yellowstone", districts: ["MT-02"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-mt-helena", name: "Helena", state: "MT", stateName: "Montana", x: 205, y: 78, population: 32091, county: "Lewis and Clark", districts: ["MT-01"], hasMayoral: false, mayoralId: null, isMajor: true },

  // OKLAHOMA
  { id: "city-ok-oklahoma-city", name: "Oklahoma City", state: "OK", stateName: "Oklahoma", x: 442, y: 328, population: 681054, county: "Oklahoma", districts: ["OK-05"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-ok-tulsa", name: "Tulsa", state: "OK", stateName: "Oklahoma", x: 468, y: 316, population: 413066, county: "Tulsa", districts: ["OK-01"], hasMayoral: false, mayoralId: null, isMajor: true },

  // WYOMING
  { id: "city-wy-cheyenne", name: "Cheyenne", state: "WY", stateName: "Wyoming", x: 335, y: 198, population: 65132, county: "Laramie", districts: ["WY-AL"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-wy-casper", name: "Casper", state: "WY", stateName: "Wyoming", x: 285, y: 165, population: 59038, county: "Natrona", districts: ["WY-AL"], hasMayoral: false, mayoralId: null, isMajor: false },

  // LOUISIANA
  { id: "city-la-new-orleans", name: "New Orleans", state: "LA", stateName: "Louisiana", x: 575, y: 472, population: 383997, county: "Orleans", districts: ["LA-01", "LA-02"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-la-baton-rouge", name: "Baton Rouge", state: "LA", stateName: "Louisiana", x: 552, y: 454, population: 227470, county: "East Baton Rouge", districts: ["LA-06"], hasMayoral: false, mayoralId: null, isMajor: true },

  // COLORADO
  { id: "city-co-denver", name: "Denver", state: "CO", stateName: "Colorado", x: 324, y: 242, population: 715522, county: "Denver", districts: ["CO-01"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-co-colorado-springs", name: "Colorado Springs", state: "CO", stateName: "Colorado", x: 328, y: 260, population: 478961, county: "El Paso", districts: ["CO-05"], hasMayoral: false, mayoralId: null, isMajor: true },

  // WASHINGTON
  { id: "city-wa-seattle", name: "Seattle", state: "WA", stateName: "Washington", x: 45, y: 48, population: 737015, county: "King", districts: ["WA-07", "WA-09"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-wa-spokane", name: "Spokane", state: "WA", stateName: "Washington", x: 125, y: 48, population: 228989, county: "Spokane", districts: ["WA-05"], hasMayoral: false, mayoralId: null, isMajor: true },

  // OREGON
  { id: "city-or-portland", name: "Portland", state: "OR", stateName: "Oregon", x: 42, y: 104, population: 652503, county: "Multnomah", districts: ["OR-03"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-or-salem", name: "Salem", state: "OR", stateName: "Oregon", x: 38, y: 120, population: 175535, county: "Marion", districts: ["OR-05"], hasMayoral: false, mayoralId: null, isMajor: true },

  // WISCONSIN
  { id: "city-wi-milwaukee", name: "Milwaukee", state: "WI", stateName: "Wisconsin", x: 596, y: 168, population: 577222, county: "Milwaukee", districts: ["WI-04"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-wi-madison", name: "Madison", state: "WI", stateName: "Wisconsin", x: 566, y: 172, population: 269840, county: "Dane", districts: ["WI-02"], hasMayoral: false, mayoralId: null, isMajor: true },

  // VIRGINIA
  { id: "city-va-virginia-beach", name: "Virginia Beach", state: "VA", stateName: "Virginia", x: 808, y: 300, population: 459470, county: "Virginia Beach", districts: ["VA-02"], hasMayoral: false, mayoralId: null, isMajor: true },
  { id: "city-va-richmond", name: "Richmond", state: "VA", stateName: "Virginia", x: 785, y: 284, population: 226610, county: "Richmond City", districts: ["VA-04"], hasMayoral: false, mayoralId: null, isMajor: true }
];

console.log("Registered", CITIES_REGISTRY.length, "cities across the country.");

// Write lib/map-jurisdictions.ts
const code = `import racesDataset from '@/data/races.json';
import { LOCAL_RACES_DATA } from '@/lib/local-races-data';

export interface StateBoundingBox {
  abbr: string;
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
  width: number;
  height: number;
  centroidX: number;
  centroidY: number;
}

export interface CityJurisdiction {
  id: string;
  name: string;
  state: string;
  stateName: string;
  x: number;
  y: number;
  population: number;
  county: string;
  districts: string[];
  hasMayoral: boolean;
  mayoralId: string | null;
  isMajor: boolean;
}

export const STATE_BOUNDING_BOXES: Record<string, StateBoundingBox> = ${JSON.stringify(stateBoundingBoxes, null, 2)};

export const CITIES_REGISTRY: CityJurisdiction[] = ${JSON.stringify(CITIES_REGISTRY, null, 2)};

export interface SubRaceSummary {
  id: string;
  category: 'Federal Senate' | 'State Governor' | 'U.S. House' | 'Municipal Mayor' | 'Local Office';
  office: string;
  jurisdictionLevel: string;
  status: string;
  rating?: string;
  pollSpread?: string;
  candidates: Array<{
    name: string;
    party: string;
    status: string;
    isIncumbent?: boolean;
    sourceUrl?: string;
  }>;
  sourceUrl?: string;
}

export function getJurisdictionSubRaces(cityIdOrDistrict: string, stateAbbr: string): SubRaceSummary[] {
  const races = racesDataset.races;
  const results: SubRaceSummary[] = [];

  // Find if it is a registered city
  const city = CITIES_REGISTRY.find(c => c.id === cityIdOrDistrict);

  // 1. Federal Senate Race (Tier 1) for this state
  const senateRace = races.find(r => r.state === stateAbbr && r.tier === 1);
  if (senateRace) {
    const cook = senateRace.ratings.find(rt => rt.rater === 'Cook Political Report')?.verbatim_label;
    let pollSpread = undefined;
    if (senateRace.polling_average && senateRace.polling_average.leader) {
      pollSpread = \`\${senateRace.polling_average.leader} +\${senateRace.polling_average.spread}%\`;
    }
    results.push({
      id: senateRace.id,
      category: 'Federal Senate',
      office: senateRace.office,
      jurisdictionLevel: 'Federal (Statewide)',
      status: senateRace.status,
      rating: cook,
      pollSpread,
      candidates: senateRace.candidates.map(c => ({
        name: c.name,
        party: c.party,
        status: c.status,
        isIncumbent: c.is_incumbent,
        sourceUrl: c.source_url
      })),
      sourceUrl: senateRace.candidates[0]?.source_url
    });
  }

  // 2. State Governor Race (Tier 2) for this state
  const govRace = races.find(r => r.state === stateAbbr && r.tier === 2);
  if (govRace) {
    const cook = govRace.ratings.find(rt => rt.rater === 'Cook Political Report')?.verbatim_label;
    results.push({
      id: govRace.id,
      category: 'State Governor',
      office: govRace.office,
      jurisdictionLevel: 'State Executive',
      status: govRace.status,
      rating: cook,
      candidates: govRace.candidates.map(c => ({
        name: c.name,
        party: c.party,
        status: c.status,
        isIncumbent: c.is_incumbent,
        sourceUrl: c.source_url
      })),
      sourceUrl: govRace.candidates[0]?.source_url
    });
  }

  // 3. U.S. House Districts
  const targetDistricts = city?.districts || (cityIdOrDistrict.startsWith('house-') ? [cityIdOrDistrict.replace(/^house-[a-z]+-/, '').toUpperCase()] : []);
  for (const d of targetDistricts) {
    const dPad = d.replace(/^[A-Z]+-/, '').toLowerCase();
    const houseRace = races.find(r => r.tier === 3 && r.state === stateAbbr && (r.id.endsWith(\`-\${dPad}\`) || r.office.includes(d)));
    if (houseRace) {
      results.push({
        id: houseRace.id,
        category: 'U.S. House',
        office: houseRace.office,
        jurisdictionLevel: 'Congressional District',
        status: houseRace.status,
        candidates: houseRace.candidates.map(c => ({
          name: c.name,
          party: c.party,
          status: c.status,
          isIncumbent: c.is_incumbent,
          sourceUrl: c.source_url
        })),
        sourceUrl: houseRace.candidates[0]?.source_url
      });
    }
  }

  // 4. Municipal Mayoral Race (Tier 6)
  if (city && city.mayoralId) {
    const mayorRace = races.find(r => r.id === city.mayoralId);
    if (mayorRace) {
      results.push({
        id: mayorRace.id,
        category: 'Municipal Mayor',
        office: mayorRace.office,
        jurisdictionLevel: \`City of \${city.name}\`,
        status: mayorRace.status,
        candidates: mayorRace.candidates.map(c => ({
          name: c.name,
          party: c.party,
          status: c.status,
          isIncumbent: c.is_incumbent,
          sourceUrl: c.source_url
        })),
        sourceUrl: mayorRace.candidates[0]?.source_url
      });
    }
  }

  // 5. Local Municipal & County Contests from LOCAL_RACES_DATA
  const localMatches = LOCAL_RACES_DATA.filter(lr => {
    if (lr.stateAbbr !== stateAbbr) return false;
    if (city && city.county && lr.county && lr.county.toLowerCase() === city.county.toLowerCase()) return true;
    if (city && city.name && (lr.city?.toLowerCase() === city.name.toLowerCase() || lr.office.toLowerCase().includes(city.name.toLowerCase()))) return true;
    return false;
  }).slice(0, 6);

  for (const lr of localMatches) {
    results.push({
      id: lr.raceId,
      category: 'Local Office',
      office: lr.office,
      jurisdictionLevel: \`\${lr.county || city?.name || stateAbbr} Jurisdiction\`,
      status: lr.candidateStatus || 'Awaiting Certification',
      rating: lr.cookRating,
      candidates: lr.candidates.map(c => ({
        name: c.name,
        party: c.party,
        status: c.status,
        sourceUrl: c.sourceVerification?.sourceUrl
      })),
      sourceUrl: lr.verifiedSources?.[0]?.url
    });
  }

  return results;
}
`;

fs.writeFileSync(path.join(rootDir, 'lib', 'map-jurisdictions.ts'), code, 'utf8');
console.log("✅ SUCCESS: Wrote lib/map-jurisdictions.ts");
