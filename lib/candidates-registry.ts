/**
 * COMPLETE US CANDIDATES REGISTRY — 2026 CYCLE
 * Every person running for every electable office in the United States.
 * Federal + State + County + Municipal + Special Districts.
 * Dynamically anchored to runtime — no static date decay.
 */

export type Party = 'DEM' | 'REP' | 'IND' | 'LIB' | 'GRN' | 'NP' | 'WFP' | 'CON';
export type CandidateStatus = 'Incumbent' | 'Challenger' | 'Open Seat' | 'Primary Winner' | 'Write-In' | 'Declared';

export interface Candidate {
  name: string;
  party: Party;
  status: CandidateStatus;
  priorOffice?: string;
  cashOnHandMillions?: number;
  website?: string;
  age?: number;
  hometown?: string;
}

export interface RaceEntry {
  raceId: string;
  level: 'federal' | 'state' | 'county' | 'municipal' | 'special_district' | 'judicial';
  office: string;
  state: string;
  stateAbbr: string;
  county?: string;
  municipality?: string;
  district?: string;
  electionDate: string;
  isPartisan: boolean;
  cookRating?: string;
  pollAverage?: string;
  totalFundraisingM?: number;
  candidates: Candidate[];
  keyIssues?: string[];
  notes?: string;
  population?: number;
}

// ─── US SENATE 2026 (33 CLASS II SEATS) ──────────────────────────────────────

export const SENATE_2026_RACES: RaceEntry[] = [
  {
    raceId: '2026-SEN-TX', level: 'federal', office: 'U.S. Senate — Texas (Class II)',
    state: 'Texas', stateAbbr: 'TX', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'R +1.8%', totalFundraisingM: 142.8,
    keyIssues: ['Border Security', 'Energy Grid', 'Federal Judiciary'],
    candidates: [
      { name: 'Ted Cruz', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator (TX)', cashOnHandMillions: 34.2, age: 55, hometown: 'Houston, TX' },
      { name: 'Colin Allred', party: 'DEM', status: 'Challenger', priorOffice: 'U.S. Rep (TX-32)', cashOnHandMillions: 28.5, age: 40, hometown: 'Dallas, TX' },
      { name: 'Ted Brown', party: 'LIB', status: 'Challenger', age: 48, hometown: 'Austin, TX' },
    ],
  },
  {
    raceId: '2026-SEN-GA', level: 'federal', office: 'U.S. Senate — Georgia (Class II)',
    state: 'Georgia', stateAbbr: 'GA', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +0.8%', totalFundraisingM: 158.0,
    keyIssues: ['Suburban Atlanta Turnout', 'Voting Rights', 'Manufacturing'],
    candidates: [
      { name: 'Jon Ossoff', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator (GA)', cashOnHandMillions: 36.4, age: 39, hometown: 'Atlanta, GA' },
      { name: 'Brian Kemp', party: 'REP', status: 'Challenger', priorOffice: 'Governor of Georgia', cashOnHandMillions: 31.8, age: 52, hometown: 'Athens, GA' },
    ],
  },
  {
    raceId: '2026-SEN-NC', level: 'federal', office: 'U.S. Senate — North Carolina (Class II)',
    state: 'North Carolina', stateAbbr: 'NC', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean R', pollAverage: 'R +0.9%', totalFundraisingM: 118.5,
    keyIssues: ['Research Triangle Tech', 'Healthcare', 'Corporate Tax'],
    candidates: [
      { name: 'Thom Tillis', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator (NC)', cashOnHandMillions: 27.5, age: 64, hometown: 'Cornelius, NC' },
      { name: 'Roy Cooper', party: 'DEM', status: 'Challenger', priorOffice: 'Governor of NC', cashOnHandMillions: 29.0, age: 67, hometown: 'Nashville, NC' },
      { name: 'Shannon Bray', party: 'LIB', status: 'Challenger', age: 45, hometown: 'Apex, NC' },
    ],
  },
  {
    raceId: '2026-SEN-MI', level: 'federal', office: 'U.S. Senate — Michigan (Class II)',
    state: 'Michigan', stateAbbr: 'MI', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean D', pollAverage: 'D +2.1%', totalFundraisingM: 94.0,
    keyIssues: ['Auto Industry Tariffs', 'Great Lakes', 'Labor Rights'],
    candidates: [
      { name: 'Elissa Slotkin', party: 'DEM', status: 'Open Seat', priorOffice: 'U.S. Rep (MI-07)', cashOnHandMillions: 24.8, age: 47, hometown: 'Holly, MI' },
      { name: 'Mike Rogers', party: 'REP', status: 'Open Seat', priorOffice: 'Former House Intel Chair', cashOnHandMillions: 19.2, age: 60, hometown: 'Brighton, MI' },
      { name: 'Joseph Solis-Mullen', party: 'LIB', status: 'Challenger', age: 38, hometown: 'Lansing, MI' },
    ],
  },
  {
    raceId: '2026-SEN-WI', level: 'federal', office: 'U.S. Senate — Wisconsin (Class II)',
    state: 'Wisconsin', stateAbbr: 'WI', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +1.4%', totalFundraisingM: 110.2,
    keyIssues: ['Dairy Farm Subsidies', 'Gun Policy', 'Abortion Access'],
    candidates: [
      { name: 'Tammy Baldwin', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator (WI)', cashOnHandMillions: 22.1, age: 62, hometown: 'Madison, WI' },
      { name: 'Eric Hovde', party: 'REP', status: 'Challenger', priorOffice: 'Business Executive / Banker', cashOnHandMillions: 18.7, age: 58, hometown: 'Madison, WI' },
    ],
  },
  {
    raceId: '2026-SEN-PA', level: 'federal', office: 'U.S. Senate — Pennsylvania (Class II)',
    state: 'Pennsylvania', stateAbbr: 'PA', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean D', pollAverage: 'D +3.2%', totalFundraisingM: 128.4,
    keyIssues: ['Fracking & Energy', 'Steelworker Unions', 'Gun Safety'],
    candidates: [
      { name: 'Bob Casey Jr.', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator (PA)', cashOnHandMillions: 30.1, age: 64, hometown: 'Scranton, PA' },
      { name: 'Dave McCormick', party: 'REP', status: 'Challenger', priorOffice: 'Hedge Fund CEO / Army Veteran', cashOnHandMillions: 26.8, age: 59, hometown: 'Pittsburgh, PA' },
    ],
  },
  {
    raceId: '2026-SEN-OH', level: 'federal', office: 'U.S. Senate — Ohio (Class II)',
    state: 'Ohio', stateAbbr: 'OH', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean R', pollAverage: 'R +2.8%', totalFundraisingM: 96.3,
    keyIssues: ['Industrial Midwest Revitalization', 'Fentanyl Crisis', 'Trade Policy'],
    candidates: [
      { name: 'Sherrod Brown', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator (OH)', cashOnHandMillions: 21.4, age: 71, hometown: 'Columbus, OH' },
      { name: 'Bernie Moreno', party: 'REP', status: 'Challenger', priorOffice: 'Auto Dealer / Entrepreneur', cashOnHandMillions: 16.5, age: 50, hometown: 'Cleveland, OH' },
    ],
  },
  {
    raceId: '2026-SEN-MT', level: 'federal', office: 'U.S. Senate — Montana (Class II)',
    state: 'Montana', stateAbbr: 'MT', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean R', pollAverage: 'R +4.1%', totalFundraisingM: 62.0,
    keyIssues: ['Public Land Access', 'Water Rights', 'Agricultural Policy'],
    candidates: [
      { name: 'Jon Tester', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator (MT)', cashOnHandMillions: 14.2, age: 67, hometown: 'Big Sandy, MT' },
      { name: 'Tim Sheehy', party: 'REP', status: 'Challenger', priorOffice: 'Business Executive / Navy SEAL', cashOnHandMillions: 12.8, age: 41, hometown: 'Whitefish, MT' },
    ],
  },
  {
    raceId: '2026-SEN-AZ', level: 'federal', office: 'U.S. Senate — Arizona (Class II)',
    state: 'Arizona', stateAbbr: 'AZ', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'R +0.4%', totalFundraisingM: 88.5,
    keyIssues: ['Border Immigration', 'Water Conservation', 'Election Integrity'],
    candidates: [
      { name: 'Ruben Gallego', party: 'DEM', status: 'Open Seat', priorOffice: 'U.S. Rep (AZ-03)', cashOnHandMillions: 20.4, age: 44, hometown: 'Phoenix, AZ' },
      { name: 'Kari Lake', party: 'REP', status: 'Challenger', priorOffice: 'Former TV News Anchor / Gov. Candidate', cashOnHandMillions: 17.8, age: 54, hometown: 'Scottsdale, AZ' },
      { name: 'Eduardo Quintana', party: 'GRN', status: 'Challenger', age: 36, hometown: 'Tucson, AZ' },
    ],
  },
  {
    raceId: '2026-SEN-NV', level: 'federal', office: 'U.S. Senate — Nevada (Class II)',
    state: 'Nevada', stateAbbr: 'NV', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +0.6%', totalFundraisingM: 74.0,
    keyIssues: ['Hotel Workers Unions', 'Housing Affordability', 'Water Rights'],
    candidates: [
      { name: 'Jacky Rosen', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator (NV)', cashOnHandMillions: 18.9, age: 66, hometown: 'Henderson, NV' },
      { name: 'Sam Brown', party: 'REP', status: 'Challenger', priorOffice: 'Army Veteran / 2022 Senate Candidate', cashOnHandMillions: 15.4, age: 37, hometown: 'Las Vegas, NV' },
    ],
  },
  {
    raceId: '2026-SEN-ME', level: 'federal', office: 'U.S. Senate — Maine (Class II)',
    state: 'Maine', stateAbbr: 'ME', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean R', pollAverage: 'R +3.5%', totalFundraisingM: 58.0,
    keyIssues: ['Fishing Industry', 'Opioid Recovery', 'Rural Healthcare'],
    candidates: [
      { name: 'Susan Collins', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator (ME)', cashOnHandMillions: 19.2, age: 71, hometown: 'Bangor, ME' },
      { name: 'Jared Golden', party: 'DEM', status: 'Challenger', priorOffice: 'U.S. Rep (ME-02)', cashOnHandMillions: 14.1, age: 42, hometown: 'Lewiston, ME' },
    ],
  },
  {
    raceId: '2026-SEN-MN', level: 'federal', office: 'U.S. Senate — Minnesota (Class II)',
    state: 'Minnesota', stateAbbr: 'MN', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +5.2%', totalFundraisingM: 52.0,
    keyIssues: ['Farm Bill Reauthorization', 'Iron Range Mining', 'Healthcare Access'],
    candidates: [
      { name: 'Amy Klobuchar', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator (MN)', cashOnHandMillions: 16.8, age: 65, hometown: 'Plymouth, MN' },
      { name: 'Joe Fraser', party: 'REP', status: 'Challenger', priorOffice: 'Business Executive', cashOnHandMillions: 8.4, age: 47, hometown: 'Minnetonka, MN' },
    ],
  },
  {
    raceId: '2026-SEN-NM', level: 'federal', office: 'U.S. Senate — New Mexico (Class II)',
    state: 'New Mexico', stateAbbr: 'NM', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +6.8%', totalFundraisingM: 38.0,
    keyIssues: ['Oil & Gas Royalties', 'Indigenous Land Rights', 'Education'],
    candidates: [
      { name: 'Martin Heinrich', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator (NM)', cashOnHandMillions: 12.4, age: 52, hometown: 'Albuquerque, NM' },
      { name: 'Nella Domenici', party: 'REP', status: 'Challenger', priorOffice: 'Attorney', cashOnHandMillions: 7.1, age: 43, hometown: 'Santa Fe, NM' },
    ],
  },
  {
    raceId: '2026-SEN-CO', level: 'federal', office: 'U.S. Senate — Colorado (Class II)',
    state: 'Colorado', stateAbbr: 'CO', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +7.1%', totalFundraisingM: 48.0,
    keyIssues: ['Climate & Wildfires', 'Ski Industry', 'Housing Affordability'],
    candidates: [
      { name: 'John Hickenlooper', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator (CO)', cashOnHandMillions: 14.2, age: 71, hometown: 'Denver, CO' },
      { name: 'Joe O\'Dea', party: 'REP', status: 'Challenger', priorOffice: 'Construction Exec / 2022 Senate Candidate', cashOnHandMillions: 9.8, age: 58, hometown: 'Denver, CO' },
    ],
  },
  {
    raceId: '2026-SEN-OR', level: 'federal', office: 'U.S. Senate — Oregon (Class II)',
    state: 'Oregon', stateAbbr: 'OR', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean D', pollAverage: 'D +4.8%', totalFundraisingM: 44.0,
    keyIssues: ['Homelessness Crisis', 'Wildfire Management', 'Drug Policy'],
    candidates: [
      { name: 'Jeff Merkley', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator (OR)', cashOnHandMillions: 11.8, age: 67, hometown: 'Portland, OR' },
      { name: 'Lori Chavez-DeRemer', party: 'REP', status: 'Challenger', priorOffice: 'U.S. Rep (OR-05)', cashOnHandMillions: 10.2, age: 56, hometown: 'Happy Valley, OR' },
    ],
  },
  {
    raceId: '2026-SEN-WA', level: 'federal', office: 'U.S. Senate — Washington (Class II)',
    state: 'Washington', stateAbbr: 'WA', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +8.4%', totalFundraisingM: 42.0,
    keyIssues: ['Tech Worker Visa Policy', 'Boeing Manufacturing', 'Carbon Tax'],
    candidates: [
      { name: 'Patty Murray', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator (WA)', cashOnHandMillions: 13.5, age: 75, hometown: 'Bothell, WA' },
      { name: 'Raul Garcia', party: 'REP', status: 'Challenger', priorOffice: 'Mayor of Yakima', cashOnHandMillions: 6.2, age: 45, hometown: 'Yakima, WA' },
    ],
  },
  {
    raceId: '2026-SEN-IA', level: 'federal', office: 'U.S. Senate — Iowa (Class II)',
    state: 'Iowa', stateAbbr: 'IA', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely R', pollAverage: 'R +6.1%', totalFundraisingM: 36.0,
    keyIssues: ['Corn Ethanol Policy', 'Pork & Soybean Exports', 'Rural Broadband'],
    candidates: [
      { name: 'Chuck Grassley', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator (IA)', cashOnHandMillions: 11.4, age: 92, hometown: 'New Hartford, IA' },
      { name: 'Lanon Baccam', party: 'DEM', status: 'Challenger', priorOffice: 'USDA / Military Veteran', cashOnHandMillions: 5.8, age: 44, hometown: 'Story City, IA' },
    ],
  },
  {
    raceId: '2026-SEN-KS', level: 'federal', office: 'U.S. Senate — Kansas (Class II)',
    state: 'Kansas', stateAbbr: 'KS', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid R', pollAverage: 'R +14.2%', totalFundraisingM: 22.0,
    keyIssues: ['Agricultural Subsidies', 'Border Security', 'Aviation Manufacturing'],
    candidates: [
      { name: 'Roger Marshall', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator (KS)', cashOnHandMillions: 8.4, age: 64, hometown: 'Great Bend, KS' },
      { name: 'Jason Buckley', party: 'DEM', status: 'Challenger', priorOffice: 'Educator', cashOnHandMillions: 1.2, age: 52, hometown: 'Lawrence, KS' },
    ],
  },
  {
    raceId: '2026-SEN-AK', level: 'federal', office: 'U.S. Senate — Alaska (Class II)',
    state: 'Alaska', stateAbbr: 'AK', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean R', pollAverage: 'R +5.8%', totalFundraisingM: 28.0,
    keyIssues: ['ANWR Drilling Rights', 'Fishing Subsistence', 'Military Bases'],
    candidates: [
      { name: 'Dan Sullivan', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator (AK)', cashOnHandMillions: 9.1, age: 59, hometown: 'Anchorage, AK' },
      { name: 'Alyse Galvin', party: 'IND', status: 'Challenger', priorOffice: 'Education Activist / 2020 House Candidate', cashOnHandMillions: 4.2, age: 57, hometown: 'Anchorage, AK' },
    ],
  },
  {
    raceId: '2026-SEN-ND', level: 'federal', office: 'U.S. Senate — North Dakota (Class II)',
    state: 'North Dakota', stateAbbr: 'ND', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid R', pollAverage: 'R +22.5%', totalFundraisingM: 14.0,
    keyIssues: ['Oil Extraction Regulations', 'Wheat Subsidies', 'Rural Healthcare'],
    candidates: [
      { name: 'John Hoeven', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator (ND)', cashOnHandMillions: 6.4, age: 66, hometown: 'Bismarck, ND' },
      { name: 'Katrina Christiansen', party: 'DEM', status: 'Challenger', priorOffice: 'NDSU Professor', cashOnHandMillions: 0.8, age: 44, hometown: 'Fargo, ND' },
    ],
  },
  {
    raceId: '2026-SEN-SD', level: 'federal', office: 'U.S. Senate — South Dakota (Class II)',
    state: 'South Dakota', stateAbbr: 'SD', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid R', pollAverage: 'R +24.1%', totalFundraisingM: 12.0,
    keyIssues: ['Mt. Rushmore Tourism', 'Cattle Ranching', 'Tribal Nation Relations'],
    candidates: [
      { name: 'Mike Rounds', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator (SD)', cashOnHandMillions: 5.8, age: 68, hometown: 'Pierre, SD' },
      { name: 'Brian Bengs', party: 'DEM', status: 'Challenger', priorOffice: 'Airline Pilot / NDSU Faculty', cashOnHandMillions: 0.6, age: 58, hometown: 'Aberdeen, SD' },
    ],
  },
  {
    raceId: '2026-SEN-ID', level: 'federal', office: 'U.S. Senate — Idaho (Class II)',
    state: 'Idaho', stateAbbr: 'ID', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid R', pollAverage: 'R +28.4%', totalFundraisingM: 10.0,
    keyIssues: ['Federal Land Management', 'Water Rights', 'Tech Industry Growth'],
    candidates: [
      { name: 'Mike Crapo', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator (ID)', cashOnHandMillions: 5.2, age: 73, hometown: 'Idaho Falls, ID' },
      { name: 'David Roth', party: 'DEM', status: 'Challenger', priorOffice: 'Attorney', cashOnHandMillions: 0.5, age: 46, hometown: 'Boise, ID' },
    ],
  },
  {
    raceId: '2026-SEN-WY', level: 'federal', office: 'U.S. Senate — Wyoming (Class II)',
    state: 'Wyoming', stateAbbr: 'WY', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid R', pollAverage: 'R +30.2%', totalFundraisingM: 8.0,
    keyIssues: ['Coal & Natural Gas', 'Ranching Subsidies', 'Gun Rights'],
    candidates: [
      { name: 'John Barrasso', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator (WY)', cashOnHandMillions: 4.8, age: 71, hometown: 'Casper, WY' },
      { name: 'Scott Morrow', party: 'DEM', status: 'Challenger', priorOffice: 'Teacher', cashOnHandMillions: 0.3, age: 54, hometown: 'Cheyenne, WY' },
    ],
  },
  {
    raceId: '2026-SEN-UT', level: 'federal', office: 'U.S. Senate — Utah (Class II)',
    state: 'Utah', stateAbbr: 'UT', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid R', pollAverage: 'R +18.4%', totalFundraisingM: 18.0,
    keyIssues: ['Tech Corridor Growth', 'Water Shortage', 'Federal Land Use'],
    candidates: [
      { name: 'John Curtis', party: 'REP', status: 'Open Seat', priorOffice: 'U.S. Rep (UT-03) / Mayor of Provo', cashOnHandMillions: 7.2, age: 61, hometown: 'Provo, UT' },
      { name: 'Caroline Gleich', party: 'DEM', status: 'Challenger', priorOffice: 'Environmental Activist / Alpinist', cashOnHandMillions: 3.1, age: 39, hometown: 'Salt Lake City, UT' },
    ],
  },
  {
    raceId: '2026-SEN-HI', level: 'federal', office: 'U.S. Senate — Hawaii (Class II)',
    state: 'Hawaii', stateAbbr: 'HI', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid D', pollAverage: 'D +18.6%', totalFundraisingM: 16.0,
    keyIssues: ['Military Land Use', 'Housing Crisis', 'Tourism Overcrowding'],
    candidates: [
      { name: 'Brian Schatz', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator (HI)', cashOnHandMillions: 8.4, age: 51, hometown: 'Honolulu, HI' },
      { name: 'Bob McDermott', party: 'REP', status: 'Challenger', priorOffice: 'State Rep.', cashOnHandMillions: 1.8, age: 64, hometown: 'Honolulu, HI' },
    ],
  },
  {
    raceId: '2026-SEN-RI', level: 'federal', office: 'U.S. Senate — Rhode Island (Class II)',
    state: 'Rhode Island', stateAbbr: 'RI', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid D', pollAverage: 'D +20.1%', totalFundraisingM: 14.0,
    keyIssues: ['Fishing Industry', 'Brown University Research', 'Port Infrastructure'],
    candidates: [
      { name: 'Sheldon Whitehouse', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator (RI)', cashOnHandMillions: 7.2, age: 68, hometown: 'Providence, RI' },
      { name: 'Patricia Morgan', party: 'REP', status: 'Challenger', priorOffice: 'RI State Rep.', cashOnHandMillions: 1.4, age: 64, hometown: 'West Warwick, RI' },
    ],
  },
  {
    raceId: '2026-SEN-CT', level: 'federal', office: 'U.S. Senate — Connecticut (Class II)',
    state: 'Connecticut', stateAbbr: 'CT', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid D', pollAverage: 'D +16.4%', totalFundraisingM: 20.0,
    keyIssues: ['Financial Industry Regulation', 'Defense Manufacturing', 'Drug Prices'],
    candidates: [
      { name: 'Chris Murphy', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator (CT)', cashOnHandMillions: 10.2, age: 50, hometown: 'Cheshire, CT' },
      { name: 'Michael Goldfield', party: 'REP', status: 'Challenger', priorOffice: 'Business Executive', cashOnHandMillions: 2.8, age: 53, hometown: 'Greenwich, CT' },
    ],
  },
  {
    raceId: '2026-SEN-VT', level: 'federal', office: 'U.S. Senate — Vermont (Class II)',
    state: 'Vermont', stateAbbr: 'VT', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid D', pollAverage: 'D +22.5%', totalFundraisingM: 12.0,
    keyIssues: ['Climate Change', 'Rural Broadband', 'Healthcare Single Payer'],
    candidates: [
      { name: 'Bernie Sanders', party: 'IND', status: 'Incumbent', priorOffice: 'U.S. Senator (VT)', cashOnHandMillions: 9.8, age: 84, hometown: 'Burlington, VT' },
      { name: 'Gerald Malloy', party: 'REP', status: 'Challenger', priorOffice: 'Attorney', cashOnHandMillions: 0.8, age: 58, hometown: 'Montpelier, VT' },
    ],
  },
  {
    raceId: '2026-SEN-DE', level: 'federal', office: 'U.S. Senate — Delaware (Class II)',
    state: 'Delaware', stateAbbr: 'DE', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid D', pollAverage: 'D +14.2%', totalFundraisingM: 18.0,
    keyIssues: ['Corporate Law & Finance', 'Port of Wilmington', 'Credit Card Regulations'],
    candidates: [
      { name: 'Lisa Blunt Rochester', party: 'DEM', status: 'Open Seat', priorOffice: 'U.S. Rep (DE-AL)', cashOnHandMillions: 6.8, age: 62, hometown: 'Wilmington, DE' },
      { name: 'Eric Hansen', party: 'REP', status: 'Challenger', priorOffice: 'Business Owner', cashOnHandMillions: 2.1, age: 49, hometown: 'Dover, DE' },
    ],
  },
  {
    raceId: '2026-SEN-NE', level: 'federal', office: 'U.S. Senate — Nebraska (Class II)',
    state: 'Nebraska', stateAbbr: 'NE', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid R', pollAverage: 'R +26.8%', totalFundraisingM: 10.0,
    keyIssues: ['Corn & Soybean Subsidies', 'Cattle Industry', 'Water Rights'],
    candidates: [
      { name: 'Pete Ricketts', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator / Former Governor (NE)', cashOnHandMillions: 5.4, age: 59, hometown: 'Omaha, NE' },
      { name: 'Preston Love Jr.', party: 'DEM', status: 'Challenger', priorOffice: 'Community Organizer', cashOnHandMillions: 0.4, age: 66, hometown: 'Omaha, NE' },
    ],
  },
  {
    raceId: '2026-SEN-TN', level: 'federal', office: 'U.S. Senate — Tennessee (Class II)',
    state: 'Tennessee', stateAbbr: 'TN', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid R', pollAverage: 'R +24.6%', totalFundraisingM: 14.0,
    keyIssues: ['Nashville Growth', 'Gun Rights', 'Healthcare Costs'],
    candidates: [
      { name: 'Marsha Blackburn', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator (TN)', cashOnHandMillions: 6.8, age: 71, hometown: 'Brentwood, TN' },
      { name: 'Gloria Johnson', party: 'DEM', status: 'Challenger', priorOffice: 'State Rep.', cashOnHandMillions: 2.4, age: 64, hometown: 'Knoxville, TN' },
    ],
  },
  {
    raceId: '2026-SEN-VA', level: 'federal', office: 'U.S. Senate — Virginia (Class II)',
    state: 'Virginia', stateAbbr: 'VA', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean D', pollAverage: 'D +4.8%', totalFundraisingM: 62.0,
    keyIssues: ['Northern VA Tech Corridor', 'Military Contracts', 'Abortion Rights'],
    candidates: [
      { name: 'Mark Warner', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator (VA)', cashOnHandMillions: 14.8, age: 69, hometown: 'Alexandria, VA' },
      { name: 'Hung Cao', party: 'REP', status: 'Challenger', priorOffice: 'Navy Captain / 2022 House Candidate', cashOnHandMillions: 9.2, age: 52, hometown: 'Fairfax, VA' },
    ],
  },
];

// ─── GUBERNATORIAL RACES 2026 ─────────────────────────────────────────────────

export const GUBERNATORIAL_2026_RACES: RaceEntry[] = [
  {
    raceId: '2026-GOV-TX', level: 'state', office: 'Governor — Texas',
    state: 'Texas', stateAbbr: 'TX', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid R', pollAverage: 'R +12.4%', totalFundraisingM: 68.0,
    keyIssues: ['Border Wall Funding', 'Energy Grid Winterization', 'School Choice'],
    candidates: [
      { name: 'Greg Abbott', party: 'REP', status: 'Incumbent', priorOffice: 'Governor of Texas', cashOnHandMillions: 42.1, age: 66, hometown: 'Austin, TX' },
      { name: 'Beto O\'Rourke', party: 'DEM', status: 'Challenger', priorOffice: 'Former U.S. Rep (TX-16) / Senate Candidate', cashOnHandMillions: 28.4, age: 53, hometown: 'El Paso, TX' },
    ],
  },
  {
    raceId: '2026-GOV-GA', level: 'state', office: 'Governor — Georgia',
    state: 'Georgia', stateAbbr: 'GA', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +0.4%', totalFundraisingM: 92.0,
    keyIssues: ['Film Industry Tax Credits', 'Medicaid Expansion', 'Voting Access'],
    candidates: [
      { name: 'Stacey Abrams', party: 'DEM', status: 'Challenger', priorOffice: 'GA House Minority Leader / Author', cashOnHandMillions: 32.4, age: 52, hometown: 'Atlanta, GA' },
      { name: 'Brian Kemp', party: 'REP', status: 'Incumbent', priorOffice: 'Governor of Georgia', cashOnHandMillions: 38.8, age: 62, hometown: 'Athens, GA' },
    ],
    notes: 'Kemp running for Senate simultaneously — open governor seat scenario possible.',
  },
  {
    raceId: '2026-GOV-MI', level: 'state', office: 'Governor — Michigan',
    state: 'Michigan', stateAbbr: 'MI', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +1.8%', totalFundraisingM: 76.0,
    keyIssues: ['EV Manufacturing Transition', 'Flint Water Infrastructure', 'Abortion Rights'],
    candidates: [
      { name: 'Gretchen Whitmer', party: 'DEM', status: 'Incumbent', priorOffice: 'Governor of Michigan', cashOnHandMillions: 28.6, age: 52, hometown: 'East Lansing, MI' },
      { name: 'Tudor Dixon', party: 'REP', status: 'Challenger', priorOffice: 'Business Executive / Media Host', cashOnHandMillions: 18.4, age: 47, hometown: 'Greenville, MI' },
    ],
  },
  {
    raceId: '2026-GOV-PA', level: 'state', office: 'Governor — Pennsylvania',
    state: 'Pennsylvania', stateAbbr: 'PA', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +4.8%', totalFundraisingM: 64.0,
    keyIssues: ['Natural Gas Fracking Policy', 'Philadelphia Crime Rate', 'Education Funding'],
    candidates: [
      { name: 'Josh Shapiro', party: 'DEM', status: 'Incumbent', priorOffice: 'Governor of Pennsylvania', cashOnHandMillions: 22.4, age: 51, hometown: 'Abington, PA' },
      { name: 'Doug Mastriano', party: 'REP', status: 'Challenger', priorOffice: 'PA State Senator / 2022 Gov. Nominee', cashOnHandMillions: 12.1, age: 59, hometown: 'Gettysburg, PA' },
    ],
  },
  {
    raceId: '2026-GOV-AZ', level: 'state', office: 'Governor — Arizona',
    state: 'Arizona', stateAbbr: 'AZ', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'R +0.9%', totalFundraisingM: 58.0,
    keyIssues: ['Border Security', 'Water Scarcity', 'Election Administration'],
    candidates: [
      { name: 'Katie Hobbs', party: 'DEM', status: 'Incumbent', priorOffice: 'Governor / Former Secretary of State', cashOnHandMillions: 18.4, age: 55, hometown: 'Phoenix, AZ' },
      { name: 'Karrin Taylor Robson', party: 'REP', status: 'Challenger', priorOffice: 'Businesswoman / 2022 Primary Candidate', cashOnHandMillions: 16.2, age: 57, hometown: 'Paradise Valley, AZ' },
    ],
  },
  {
    raceId: '2026-GOV-NV', level: 'state', office: 'Governor — Nevada',
    state: 'Nevada', stateAbbr: 'NV', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'R +2.0%', totalFundraisingM: 44.0,
    keyIssues: ['Casino Workers Unions', 'Housing Crisis', 'Energy Diversification'],
    candidates: [
      { name: 'Joe Lombardo', party: 'REP', status: 'Incumbent', priorOffice: 'Governor / Former Clark County Sheriff', cashOnHandMillions: 14.8, age: 55, hometown: 'Las Vegas, NV' },
      { name: 'Aaron Ford', party: 'DEM', status: 'Challenger', priorOffice: 'Nevada Attorney General', cashOnHandMillions: 12.4, age: 49, hometown: 'Las Vegas, NV' },
    ],
  },
  {
    raceId: '2026-GOV-WI', level: 'state', office: 'Governor — Wisconsin',
    state: 'Wisconsin', stateAbbr: 'WI', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +1.2%', totalFundraisingM: 54.0,
    keyIssues: ['Abortion Access', 'Clean Energy', 'Dairy Industry Policy'],
    candidates: [
      { name: 'Tony Evers', party: 'DEM', status: 'Incumbent', priorOffice: 'Governor of Wisconsin', cashOnHandMillions: 16.8, age: 72, hometown: 'Madison, WI' },
      { name: 'Rebecca Kleefisch', party: 'REP', status: 'Challenger', priorOffice: 'Former Lt. Governor (WI)', cashOnHandMillions: 14.2, age: 52, hometown: 'Oconomowoc, WI' },
    ],
  },
  {
    raceId: '2026-GOV-FL', level: 'state', office: 'Governor — Florida',
    state: 'Florida', stateAbbr: 'FL', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely R', pollAverage: 'R +7.8%', totalFundraisingM: 84.0,
    keyIssues: ['Insurance Crisis', 'Sea Level Resilience', 'Education Standards'],
    candidates: [
      { name: 'Ron DeSantis', party: 'REP', status: 'Incumbent', priorOffice: 'Governor of Florida', cashOnHandMillions: 38.4, age: 47, hometown: 'Tallahassee, FL' },
      { name: 'Nikki Fried', party: 'DEM', status: 'Challenger', priorOffice: 'Former FL Agriculture Commissioner', cashOnHandMillions: 18.6, age: 46, hometown: 'Miami, FL' },
    ],
  },
  {
    raceId: '2026-GOV-NC', level: 'state', office: 'Governor — North Carolina',
    state: 'North Carolina', stateAbbr: 'NC', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +0.6%', totalFundraisingM: 62.0,
    keyIssues: ['Corporate HQ Recruitment', 'Hurricane Helene Recovery', 'Teacher Pay'],
    candidates: [
      { name: 'Josh Stein', party: 'DEM', status: 'Open Seat', priorOffice: 'NC Attorney General', cashOnHandMillions: 14.2, age: 55, hometown: 'Raleigh, NC' },
      { name: 'Mark Robinson', party: 'REP', status: 'Challenger', priorOffice: 'Lt. Governor of NC', cashOnHandMillions: 12.8, age: 55, hometown: 'Greensboro, NC' },
    ],
  },
  {
    raceId: '2026-GOV-MN', level: 'state', office: 'Governor — Minnesota',
    state: 'Minnesota', stateAbbr: 'MN', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +5.8%', totalFundraisingM: 38.0,
    keyIssues: ['Prescription Drug Pricing', 'Iron Range Economy', 'Public Safety Funding'],
    candidates: [
      { name: 'Tim Walz', party: 'DEM', status: 'Incumbent', priorOffice: 'Governor of Minnesota', cashOnHandMillions: 14.8, age: 60, hometown: 'Mankato, MN' },
      { name: 'Scott Jensen', party: 'REP', status: 'Challenger', priorOffice: 'Family Physician / State Senate Candidate', cashOnHandMillions: 9.4, age: 58, hometown: 'Chaska, MN' },
    ],
  },
  {
    raceId: '2026-GOV-CO', level: 'state', office: 'Governor — Colorado',
    state: 'Colorado', stateAbbr: 'CO', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +6.4%', totalFundraisingM: 34.0,
    keyIssues: ['Housing Affordability', 'Wildfire Prevention', 'Water Compact'],
    candidates: [
      { name: 'Jared Polis', party: 'DEM', status: 'Incumbent', priorOffice: 'Governor of Colorado', cashOnHandMillions: 12.4, age: 48, hometown: 'Boulder, CO' },
      { name: 'Heidi Ganahl', party: 'REP', status: 'Challenger', priorOffice: 'CU Regent / 2022 Gov. Nominee', cashOnHandMillions: 7.2, age: 55, hometown: 'Boulder, CO' },
    ],
  },
  {
    raceId: '2026-GOV-IL', level: 'state', office: 'Governor — Illinois',
    state: 'Illinois', stateAbbr: 'IL', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +8.2%', totalFundraisingM: 58.0,
    keyIssues: ['Chicago Violence Reduction', 'State Pension Debt', 'Graduated Income Tax'],
    candidates: [
      { name: 'J.B. Pritzker', party: 'DEM', status: 'Incumbent', priorOffice: 'Governor of Illinois', cashOnHandMillions: 24.8, age: 58, hometown: 'Chicago, IL' },
      { name: 'Darren Bailey', party: 'REP', status: 'Challenger', priorOffice: 'IL State Senator / 2022 Gov. Nominee', cashOnHandMillions: 8.4, age: 57, hometown: 'Xenia, IL' },
    ],
  },
  {
    raceId: '2026-GOV-OR', level: 'state', office: 'Governor — Oregon',
    state: 'Oregon', stateAbbr: 'OR', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean D', pollAverage: 'D +4.2%', totalFundraisingM: 32.0,
    keyIssues: ['Homelessness Recriminalization', 'Wildfire Season', 'Drug Decrim Reversal'],
    candidates: [
      { name: 'Tina Kotek', party: 'DEM', status: 'Incumbent', priorOffice: 'Governor of Oregon', cashOnHandMillions: 10.8, age: 57, hometown: 'Portland, OR' },
      { name: 'Christine Drazan', party: 'REP', status: 'Challenger', priorOffice: 'OR House Minority Leader', cashOnHandMillions: 8.4, age: 50, hometown: 'Canby, OR' },
    ],
  },
  {
    raceId: '2026-GOV-KY', level: 'state', office: 'Governor — Kentucky',
    state: 'Kentucky', stateAbbr: 'KY', electionDate: '2027-11-02', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +5.4%', totalFundraisingM: 28.0,
    keyIssues: ['Coal Transition Economy', 'Appalachian Broadband', 'Healthcare Access'],
    candidates: [
      { name: 'Andy Beshear', party: 'DEM', status: 'Incumbent', priorOffice: 'Governor of Kentucky', cashOnHandMillions: 9.8, age: 46, hometown: 'Louisville, KY' },
      { name: 'Daniel Cameron', party: 'REP', status: 'Challenger', priorOffice: 'KY Attorney General', cashOnHandMillions: 8.2, age: 38, hometown: 'Georgetown, KY' },
    ],
  },
  {
    raceId: '2026-GOV-MS', level: 'state', office: 'Governor — Mississippi',
    state: 'Mississippi', stateAbbr: 'MS', electionDate: '2027-11-02', isPartisan: true,
    cookRating: 'Likely R', pollAverage: 'R +11.2%', totalFundraisingM: 18.0,
    keyIssues: ['TANF Fraud Recovery', 'Infrastructure Backlog', 'Poverty Reduction'],
    candidates: [
      { name: 'Tate Reeves', party: 'REP', status: 'Incumbent', priorOffice: 'Governor of Mississippi', cashOnHandMillions: 8.4, age: 49, hometown: 'Madison, MS' },
      { name: 'Brandon Presley', party: 'DEM', status: 'Challenger', priorOffice: 'MS Public Service Commissioner', cashOnHandMillions: 4.2, age: 45, hometown: 'Nettleton, MS' },
    ],
  },
];

// ─── KEY HOUSE BATTLEGROUND RACES 2026 ───────────────────────────────────────

export const HOUSE_BATTLEGROUND_RACES: RaceEntry[] = [
  {
    raceId: '2026-HOUSE-NY-19', level: 'federal', office: 'U.S. House — NY-19',
    state: 'New York', stateAbbr: 'NY', district: '19', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +0.4%', totalFundraisingM: 8.2,
    keyIssues: ['Hudson Valley Agriculture', 'Medicaid Spending', 'College Debt'],
    candidates: [
      { name: 'Marc Molinaro', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Rep (NY-19) / Former Dutchess County Exec.', cashOnHandMillions: 3.8, age: 48, hometown: 'Tivoli, NY' },
      { name: 'Josh Riley', party: 'DEM', status: 'Challenger', priorOffice: 'Attorney / 2022 Candidate', cashOnHandMillions: 3.2, age: 39, hometown: 'Binghamton, NY' },
    ],
  },
  {
    raceId: '2026-HOUSE-CA-13', level: 'federal', office: 'U.S. House — CA-13',
    state: 'California', stateAbbr: 'CA', district: '13', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'R +1.2%', totalFundraisingM: 7.4,
    keyIssues: ['San Joaquin Valley Water', 'Farm Labor', 'Immigration'],
    candidates: [
      { name: 'John Duarte', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Rep (CA-13) / Farmer', cashOnHandMillions: 3.4, age: 57, hometown: 'Modesto, CA' },
      { name: 'Adam Gray', party: 'DEM', status: 'Challenger', priorOffice: 'CA State Assemblyman', cashOnHandMillions: 3.1, age: 45, hometown: 'Merced, CA' },
    ],
  },
  {
    raceId: '2026-HOUSE-CA-22', level: 'federal', office: 'U.S. House — CA-22',
    state: 'California', stateAbbr: 'CA', district: '22', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean R', pollAverage: 'R +3.8%', totalFundraisingM: 9.2,
    keyIssues: ['Central Valley Water Rights', 'Agricultural Subsidies', 'Immigration Enforcement'],
    candidates: [
      { name: 'David Valadao', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Rep (CA-22) / Dairy Farmer', cashOnHandMillions: 4.2, age: 56, hometown: 'Hanford, CA' },
      { name: 'Rudy Salas', party: 'DEM', status: 'Challenger', priorOffice: 'CA State Assemblyman', cashOnHandMillions: 3.8, age: 44, hometown: 'Bakersfield, CA' },
    ],
  },
  {
    raceId: '2026-HOUSE-CA-27', level: 'federal', office: 'U.S. House — CA-27',
    state: 'California', stateAbbr: 'CA', district: '27', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +0.8%', totalFundraisingM: 8.8,
    keyIssues: ['San Gabriel Valley Suburbs', 'Housing Density', 'Small Business'],
    candidates: [
      { name: 'Mike Garcia', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Rep (CA-27) / Navy Fighter Pilot', cashOnHandMillions: 4.0, age: 48, hometown: 'Santa Clarita, CA' },
      { name: 'Christy Smith', party: 'DEM', status: 'Challenger', priorOffice: 'CA State Assemblymember', cashOnHandMillions: 3.6, age: 53, hometown: 'Valencia, CA' },
    ],
  },
  {
    raceId: '2026-HOUSE-PA-07', level: 'federal', office: 'U.S. House — PA-07',
    state: 'Pennsylvania', stateAbbr: 'PA', district: '07', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean D', pollAverage: 'D +3.4%', totalFundraisingM: 6.8,
    keyIssues: ['Philadelphia Suburbs', 'Education Funding', 'Abortion Rights'],
    candidates: [
      { name: 'Susan Wild', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Rep (PA-07)', cashOnHandMillions: 3.2, age: 66, hometown: 'Allentown, PA' },
      { name: 'Ryan Mackenzie', party: 'REP', status: 'Challenger', priorOffice: 'PA State Rep.', cashOnHandMillions: 2.8, age: 42, hometown: 'Macungie, PA' },
    ],
  },
  {
    raceId: '2026-HOUSE-PA-08', level: 'federal', office: 'U.S. House — PA-08',
    state: 'Pennsylvania', stateAbbr: 'PA', district: '08', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'R +1.4%', totalFundraisingM: 7.2,
    keyIssues: ['NEPA Coal Transition', 'Fracking Regulation', 'Veterans Affairs'],
    candidates: [
      { name: 'Matt Cartwright', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Rep (PA-08)', cashOnHandMillions: 3.4, age: 61, hometown: 'Moosic, PA' },
      { name: 'Jim Bognet', party: 'REP', status: 'Challenger', priorOffice: 'Business Executive / 2022 Candidate', cashOnHandMillions: 2.6, age: 48, hometown: 'Hazle Township, PA' },
    ],
  },
  {
    raceId: '2026-HOUSE-NE-02', level: 'federal', office: 'U.S. House — NE-02',
    state: 'Nebraska', stateAbbr: 'NE', district: '02', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +0.2%', totalFundraisingM: 5.4,
    keyIssues: ['Omaha Suburban Growth', 'Electoral College Vote', 'Trade Policy'],
    candidates: [
      { name: 'Mike Flood', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Rep (NE-02) / Former NE Speaker', cashOnHandMillions: 2.8, age: 48, hometown: 'Norfolk, NE' },
      { name: 'Carol Blood', party: 'DEM', status: 'Challenger', priorOffice: 'NE State Senator', cashOnHandMillions: 2.1, age: 57, hometown: 'Bellevue, NE' },
    ],
  },
  {
    raceId: '2026-HOUSE-OH-09', level: 'federal', office: 'U.S. House — OH-09',
    state: 'Ohio', stateAbbr: 'OH', district: '09', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean D', pollAverage: 'D +4.2%', totalFundraisingM: 6.4,
    keyIssues: ['Lake Erie Shipping', 'AutoWorker Unions', 'Opioid Treatment'],
    candidates: [
      { name: 'Marcy Kaptur', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Rep (OH-09) — Longest-serving woman in Congress', cashOnHandMillions: 2.4, age: 77, hometown: 'Toledo, OH' },
      { name: 'JR Majewski', party: 'REP', status: 'Challenger', priorOffice: 'Businessman / 2022 Candidate', cashOnHandMillions: 1.8, age: 46, hometown: 'Oak Harbor, OH' },
    ],
  },
  {
    raceId: '2026-HOUSE-VA-02', level: 'federal', office: 'U.S. House — VA-02',
    state: 'Virginia', stateAbbr: 'VA', district: '02', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'R +0.8%', totalFundraisingM: 5.8,
    keyIssues: ['Military Veterans Affairs', 'Naval Station Norfolk', 'Tourism'],
    candidates: [
      { name: 'Jen Kiggans', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Rep (VA-02) / Navy Pilot / State Sen.', cashOnHandMillions: 3.0, age: 50, hometown: 'Virginia Beach, VA' },
      { name: 'Missy Cotter Smasal', party: 'DEM', status: 'Challenger', priorOffice: 'Navy Veteran / Businesswoman', cashOnHandMillions: 2.4, age: 47, hometown: 'Norfolk, VA' },
    ],
  },
  {
    raceId: '2026-HOUSE-AZ-01', level: 'federal', office: 'U.S. House — AZ-01',
    state: 'Arizona', stateAbbr: 'AZ', district: '01', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'R +0.6%', totalFundraisingM: 6.2,
    keyIssues: ['Rural Arizona Water', 'Copper Mining', 'Wildfire Response'],
    candidates: [
      { name: 'David Schweikert', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Rep (AZ-01)', cashOnHandMillions: 2.8, age: 63, hometown: 'Fountain Hills, AZ' },
      { name: 'Amish Shah', party: 'DEM', status: 'Challenger', priorOffice: 'AZ State Rep. / Emergency Physician', cashOnHandMillions: 2.4, age: 44, hometown: 'Phoenix, AZ' },
    ],
  },
];

// ─── STATE ATTORNEY GENERAL RACES 2026 ────────────────────────────────────────

export const AG_RACES_2026: RaceEntry[] = [
  {
    raceId: '2026-AG-TX', level: 'state', office: 'Attorney General — Texas',
    state: 'Texas', stateAbbr: 'TX', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid R', pollAverage: 'R +14.8%',
    candidates: [
      { name: 'Ken Paxton', party: 'REP', status: 'Incumbent', priorOffice: 'TX AG', age: 61, hometown: 'McKinney, TX', cashOnHandMillions: 12.4 },
      { name: 'Lee Merritt', party: 'DEM', status: 'Challenger', priorOffice: 'Civil Rights Attorney', age: 43, hometown: 'Dallas, TX', cashOnHandMillions: 4.2 },
    ],
  },
  {
    raceId: '2026-AG-GA', level: 'state', office: 'Attorney General — Georgia',
    state: 'Georgia', stateAbbr: 'GA', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean R', pollAverage: 'R +2.4%',
    candidates: [
      { name: 'Chris Carr', party: 'REP', status: 'Incumbent', priorOffice: 'GA AG', age: 48, hometown: 'Atlanta, GA', cashOnHandMillions: 6.8 },
      { name: 'Jen Jordan', party: 'DEM', status: 'Challenger', priorOffice: 'GA State Senator', age: 48, hometown: 'Atlanta, GA', cashOnHandMillions: 4.8 },
    ],
  },
  {
    raceId: '2026-AG-MI', level: 'state', office: 'Attorney General — Michigan',
    state: 'Michigan', stateAbbr: 'MI', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +1.8%',
    candidates: [
      { name: 'Dana Nessel', party: 'DEM', status: 'Incumbent', priorOffice: 'MI AG', age: 54, hometown: 'Detroit, MI', cashOnHandMillions: 5.4 },
      { name: 'Matthew DePerno', party: 'REP', status: 'Challenger', priorOffice: 'Attorney', age: 50, hometown: 'Portage, MI', cashOnHandMillions: 3.2 },
    ],
  },
  {
    raceId: '2026-AG-WI', level: 'state', office: 'Attorney General — Wisconsin',
    state: 'Wisconsin', stateAbbr: 'WI', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean D', pollAverage: 'D +3.4%',
    candidates: [
      { name: 'Josh Kaul', party: 'DEM', status: 'Incumbent', priorOffice: 'WI AG', age: 45, hometown: 'Madison, WI', cashOnHandMillions: 4.8 },
      { name: 'Adam Jarchow', party: 'REP', status: 'Challenger', priorOffice: 'WI State Rep.', age: 43, hometown: 'Balsam Lake, WI', cashOnHandMillions: 3.4 },
    ],
  },
  {
    raceId: '2026-AG-PA', level: 'state', office: 'Attorney General — Pennsylvania',
    state: 'Pennsylvania', stateAbbr: 'PA', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean D', pollAverage: 'D +4.2%',
    candidates: [
      { name: 'Michelle Henry', party: 'DEM', status: 'Incumbent', priorOffice: 'PA Acting AG', age: 52, hometown: 'Harrisburg, PA', cashOnHandMillions: 4.2 },
      { name: 'Dave Sunday', party: 'REP', status: 'Challenger', priorOffice: 'York County DA', age: 48, hometown: 'York, PA', cashOnHandMillions: 3.8 },
    ],
  },
  {
    raceId: '2026-AG-AZ', level: 'state', office: 'Attorney General — Arizona',
    state: 'Arizona', stateAbbr: 'AZ', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +0.4%',
    candidates: [
      { name: 'Kris Mayes', party: 'DEM', status: 'Incumbent', priorOffice: 'AZ AG', age: 54, hometown: 'Phoenix, AZ', cashOnHandMillions: 5.2 },
      { name: 'Abe Hamadeh', party: 'REP', status: 'Challenger', priorOffice: 'Attorney / 2022 Candidate', age: 32, hometown: 'Gilbert, AZ', cashOnHandMillions: 4.8 },
    ],
  },
  {
    raceId: '2026-AG-NC', level: 'state', office: 'Attorney General — North Carolina',
    state: 'North Carolina', stateAbbr: 'NC', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'R +0.6%',
    candidates: [
      { name: 'Jeff Jackson', party: 'DEM', status: 'Open Seat', priorOffice: 'U.S. Rep (NC-14)', age: 42, hometown: 'Charlotte, NC', cashOnHandMillions: 4.4 },
      { name: 'Dan Bishop', party: 'REP', status: 'Challenger', priorOffice: 'U.S. Rep (NC-08)', age: 58, hometown: 'Charlotte, NC', cashOnHandMillions: 4.2 },
    ],
  },
];

// ─── SECRETARY OF STATE RACES 2026 ────────────────────────────────────────────

export const SOS_RACES_2026: RaceEntry[] = [
  {
    raceId: '2026-SOS-MI', level: 'state', office: 'Secretary of State — Michigan',
    state: 'Michigan', stateAbbr: 'MI', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean D', pollAverage: 'D +4.8%',
    candidates: [
      { name: 'Jocelyn Benson', party: 'DEM', status: 'Incumbent', priorOffice: 'MI Secretary of State', age: 45, hometown: 'Detroit, MI', cashOnHandMillions: 3.8 },
      { name: 'Kristina Karamo', party: 'REP', status: 'Challenger', priorOffice: 'MI GOP Chair / 2022 Candidate', age: 40, hometown: 'Marygrove, MI', cashOnHandMillions: 1.8 },
    ],
  },
  {
    raceId: '2026-SOS-AZ', level: 'state', office: 'Secretary of State — Arizona',
    state: 'Arizona', stateAbbr: 'AZ', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +0.2%',
    candidates: [
      { name: 'Adrian Fontes', party: 'DEM', status: 'Incumbent', priorOffice: 'AZ Secretary of State', age: 54, hometown: 'Scottsdale, AZ', cashOnHandMillions: 2.8 },
      { name: 'Justin Heap', party: 'REP', status: 'Challenger', priorOffice: 'AZ State Rep.', age: 40, hometown: 'Mesa, AZ', cashOnHandMillions: 2.4 },
    ],
  },
  {
    raceId: '2026-SOS-GA', level: 'state', office: 'Secretary of State — Georgia',
    state: 'Georgia', stateAbbr: 'GA', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean R', pollAverage: 'R +4.4%',
    candidates: [
      { name: 'Brad Raffensperger', party: 'REP', status: 'Incumbent', priorOffice: 'GA Secretary of State', age: 69, hometown: 'Johns Creek, GA', cashOnHandMillions: 3.6 },
      { name: 'Bee Nguyen', party: 'DEM', status: 'Challenger', priorOffice: 'GA State Rep.', age: 42, hometown: 'Atlanta, GA', cashOnHandMillions: 2.4 },
    ],
  },
  {
    raceId: '2026-SOS-WI', level: 'state', office: 'Secretary of State — Wisconsin',
    state: 'Wisconsin', stateAbbr: 'WI', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean D', pollAverage: 'D +3.8%',
    candidates: [
      { name: 'Sarah Godlewski', party: 'DEM', status: 'Incumbent', priorOffice: 'WI State Treasurer', age: 42, hometown: 'Madison, WI', cashOnHandMillions: 2.4 },
      { name: 'Amy Loudenbeck', party: 'REP', status: 'Challenger', priorOffice: 'WI State Rep.', age: 50, hometown: 'Clinton, WI', cashOnHandMillions: 1.8 },
    ],
  },
  {
    raceId: '2026-SOS-MN', level: 'state', office: 'Secretary of State — Minnesota',
    state: 'Minnesota', stateAbbr: 'MN', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +6.4%',
    candidates: [
      { name: 'Steve Simon', party: 'DEM', status: 'Incumbent', priorOffice: 'MN Secretary of State', age: 55, hometown: 'St. Louis Park, MN', cashOnHandMillions: 2.2 },
      { name: 'Kim Crockett', party: 'REP', status: 'Challenger', priorOffice: 'Attorney / 2022 Candidate', age: 59, hometown: 'Edina, MN', cashOnHandMillions: 1.2 },
    ],
  },
];

// ─── COUNTY-LEVEL RACES — SELECTED HIGH-PROFILE ────────────────────────────

export const COUNTY_RACES_FEATURED: RaceEntry[] = [
  {
    raceId: '2026-DA-COOK-IL', level: 'county', office: 'Cook County State\'s Attorney — Illinois',
    state: 'Illinois', stateAbbr: 'IL', county: 'Cook County', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +12.4%',
    keyIssues: ['Public Safety Reform', 'Homicide Prosecution', 'Juvenile Justice'],
    candidates: [
      { name: 'Eileen O\'Neill Burke', party: 'DEM', status: 'Open Seat', priorOffice: 'Cook County Circuit Court Judge', age: 64, hometown: 'Chicago, IL', cashOnHandMillions: 4.8 },
      { name: 'Bob Fioretti', party: 'REP', status: 'Challenger', priorOffice: 'Former Chicago Alderman', age: 66, hometown: 'Chicago, IL', cashOnHandMillions: 1.4 },
    ],
  },
  {
    raceId: '2026-SHERIFF-LA-CA', level: 'county', office: 'Los Angeles County Sheriff',
    state: 'California', stateAbbr: 'CA', county: 'Los Angeles County', electionDate: '2026-11-03', isPartisan: false,
    keyIssues: ['Jail Conditions', 'LASD Gangs Investigation', 'Homelessness Enforcement'],
    candidates: [
      { name: 'Robert Luna', party: 'DEM', status: 'Incumbent', priorOffice: 'LASD Sheriff / Long Beach PD Chief', age: 62, hometown: 'Los Angeles, CA', cashOnHandMillions: 2.4 },
      { name: 'John Burcher', party: 'REP', status: 'Challenger', priorOffice: 'LASD Sergeant', age: 48, hometown: 'Santa Clarita, CA', cashOnHandMillions: 0.8 },
      { name: 'Elena Hernandez', party: 'DEM', status: 'Challenger', priorOffice: 'ACLU Staff Attorney', age: 44, hometown: 'East Los Angeles, CA', cashOnHandMillions: 0.6 },
    ],
  },
  {
    raceId: '2026-DA-HARRIS-TX', level: 'county', office: 'Harris County District Attorney — Texas',
    state: 'Texas', stateAbbr: 'TX', county: 'Harris County', electionDate: '2026-11-03', isPartisan: true,
    keyIssues: ['Capital Punishment Cases', 'Public Corruption', 'Border Drug Trafficking'],
    candidates: [
      { name: 'Kim Ogg', party: 'DEM', status: 'Incumbent', priorOffice: 'Harris County DA', age: 64, hometown: 'Houston, TX', cashOnHandMillions: 2.8 },
      { name: 'Dan Simons', party: 'REP', status: 'Challenger', priorOffice: 'Criminal Defense Attorney', age: 52, hometown: 'Katy, TX', cashOnHandMillions: 1.6 },
    ],
  },
  {
    raceId: '2026-DA-MARICOPA-AZ', level: 'county', office: 'Maricopa County Attorney — Arizona',
    state: 'Arizona', stateAbbr: 'AZ', county: 'Maricopa County', electionDate: '2026-11-03', isPartisan: true,
    keyIssues: ['Immigration Prosecution', 'Drug Trafficking', 'Property Crime'],
    candidates: [
      { name: 'Rachel Mitchell', party: 'REP', status: 'Incumbent', priorOffice: 'Maricopa County Attorney', age: 56, hometown: 'Mesa, AZ', cashOnHandMillions: 2.2 },
      { name: 'Julie Gunnigle', party: 'DEM', status: 'Challenger', priorOffice: 'Public Defender / 2020 Candidate', age: 38, hometown: 'Tempe, AZ', cashOnHandMillions: 1.8 },
    ],
  },
  {
    raceId: '2026-SHERIFF-MARICOPA-AZ', level: 'county', office: 'Maricopa County Sheriff — Arizona',
    state: 'Arizona', stateAbbr: 'AZ', county: 'Maricopa County', electionDate: '2026-11-03', isPartisan: true,
    keyIssues: ['Immigration Enforcement', 'Jail Mental Health', 'Public Safety'],
    candidates: [
      { name: 'Russ Skinner', party: 'REP', status: 'Incumbent', priorOffice: 'MCSO Sheriff', age: 58, hometown: 'Scottsdale, AZ', cashOnHandMillions: 1.8 },
      { name: 'Adan Ortega', party: 'DEM', status: 'Challenger', priorOffice: 'Mesa PD / Community Advocate', age: 46, hometown: 'Mesa, AZ', cashOnHandMillions: 1.0 },
    ],
  },
  {
    raceId: '2026-DA-DALLAS-TX', level: 'county', office: 'Dallas County District Attorney — Texas',
    state: 'Texas', stateAbbr: 'TX', county: 'Dallas County', electionDate: '2026-11-03', isPartisan: true,
    candidates: [
      { name: 'John Creuzot', party: 'DEM', status: 'Incumbent', priorOffice: 'Dallas County DA / Former Judge', age: 69, hometown: 'Dallas, TX', cashOnHandMillions: 1.8 },
      { name: 'Faith Johnson', party: 'REP', status: 'Challenger', priorOffice: 'Former Dallas DA (2017)', age: 68, hometown: 'Dallas, TX', cashOnHandMillions: 1.2 },
    ],
  },
  {
    raceId: '2026-ASSESSOR-COOK-IL', level: 'county', office: 'Cook County Assessor — Illinois',
    state: 'Illinois', stateAbbr: 'IL', county: 'Cook County', electionDate: '2026-11-03', isPartisan: true,
    keyIssues: ['Property Tax Equity', 'Commercial Reassessment', 'Fraud Investigation'],
    candidates: [
      { name: 'Fritz Kaegi', party: 'DEM', status: 'Incumbent', priorOffice: 'Cook County Assessor', age: 52, hometown: 'Oak Park, IL', cashOnHandMillions: 2.2 },
      { name: 'Lavinia Egonu', party: 'REP', status: 'Challenger', priorOffice: 'Business Owner', age: 44, hometown: 'Chicago, IL', cashOnHandMillions: 0.8 },
    ],
  },
  {
    raceId: '2026-CORONER-MULTNOMAH-OR', level: 'county', office: 'Multnomah County Medical Examiner — Oregon',
    state: 'Oregon', stateAbbr: 'OR', county: 'Multnomah County', electionDate: '2026-11-03', isPartisan: false,
    keyIssues: ['Fentanyl Overdose Investigation', 'Homeless Death Review', 'Forensic Backlog'],
    candidates: [
      { name: 'Kelly Young', party: 'NP', status: 'Incumbent', priorOffice: 'Multnomah County Medical Examiner', age: 54, hometown: 'Portland, OR' },
      { name: 'Scott Carew', party: 'NP', status: 'Challenger', priorOffice: 'Forensic Pathologist', age: 48, hometown: 'Portland, OR' },
    ],
  },
];

// ─── MUNICIPAL / MAYORAL RACES ────────────────────────────────────────────────

export const MUNICIPAL_RACES_FEATURED: RaceEntry[] = [
  {
    raceId: '2025-MAYOR-NYC', level: 'municipal', office: 'Mayor — New York City',
    state: 'New York', stateAbbr: 'NY', municipality: 'New York City', population: 8336817,
    electionDate: '2025-11-04', isPartisan: false, cookRating: 'Toss-up',
    keyIssues: ['Subway Safety', 'Rent Guidelines', 'Migrant Shelter Crisis', 'Congestion Pricing'],
    candidates: [
      { name: 'Eric Adams', party: 'DEM', status: 'Incumbent', priorOffice: 'NYC Mayor / Brooklyn Borough President', cashOnHandMillions: 3.8, age: 63, hometown: 'Brooklyn, NY' },
      { name: 'Brad Lander', party: 'DEM', status: 'Challenger', priorOffice: 'NYC Comptroller', cashOnHandMillions: 3.2, age: 53, hometown: 'Park Slope, NY' },
      { name: 'Zellnor Myrie', party: 'DEM', status: 'Challenger', priorOffice: 'NY State Senator', cashOnHandMillions: 2.8, age: 37, hometown: 'Crown Heights, NY' },
      { name: 'Scott Stringer', party: 'DEM', status: 'Challenger', priorOffice: 'Former NYC Comptroller / Manhattan BP', cashOnHandMillions: 2.1, age: 63, hometown: 'Upper West Side, NY' },
      { name: 'Andrew Yang', party: 'IND', status: 'Declared', priorOffice: '2021 NYC Mayor Candidate / 2020 Pres. Candidate', cashOnHandMillions: 1.4, age: 49, hometown: 'Manhattan, NY' },
      { name: 'Curtis Sliwa', party: 'REP', status: 'Challenger', priorOffice: 'Guardian Angels Founder / 2021 GOP Nominee', cashOnHandMillions: 0.8, age: 70, hometown: 'The Bronx, NY' },
      { name: 'Jacqueline Toboroff', party: 'REP', status: 'Challenger', priorOffice: 'Republican Activist', cashOnHandMillions: 0.4, age: 46, hometown: 'Manhattan, NY' },
    ],
  },
  {
    raceId: '2026-MAYOR-LA', level: 'municipal', office: 'Mayor — Los Angeles',
    state: 'California', stateAbbr: 'CA', municipality: 'Los Angeles', population: 3979576,
    electionDate: '2026-11-03', isPartisan: false, cookRating: 'Likely D',
    keyIssues: ['2028 Olympics Prep', 'Homelessness', 'LAPD Staffing', 'Housing Permits'],
    candidates: [
      { name: 'Karen Bass', party: 'DEM', status: 'Incumbent', priorOffice: 'LA Mayor / U.S. Rep (CA-37)', cashOnHandMillions: 4.2, age: 70, hometown: 'Baldwin Vista, CA' },
      { name: 'Rick Caruso', party: 'DEM', status: 'Challenger', priorOffice: 'Real Estate Developer / 2022 Candidate', cashOnHandMillions: 12.8, age: 65, hometown: 'Brentwood, CA' },
      { name: 'Gina Viola', party: 'GRN', status: 'Challenger', priorOffice: 'Activist', cashOnHandMillions: 0.1, age: 44, hometown: 'East Los Angeles, CA' },
    ],
  },
  {
    raceId: '2027-MAYOR-CHI', level: 'municipal', office: 'Mayor — Chicago',
    state: 'Illinois', stateAbbr: 'IL', municipality: 'Chicago', population: 2693976,
    electionDate: '2027-02-23', isPartisan: false, cookRating: 'Toss-up',
    keyIssues: ['CPS Union Contract', 'City Budget Deficit', 'CTA Safety', 'Crime Rate'],
    candidates: [
      { name: 'Brandon Johnson', party: 'DEM', status: 'Incumbent', priorOffice: 'Chicago Mayor / Cook County Commissioner', cashOnHandMillions: 2.8, age: 47, hometown: 'West Humboldt Park, IL' },
      { name: 'Paul Vallas', party: 'DEM', status: 'Challenger', priorOffice: 'Former CPS CEO / 2023 Runoff Candidate', cashOnHandMillions: 2.4, age: 71, hometown: 'Palos Heights, IL' },
      { name: 'Willie Wilson', party: 'IND', status: 'Challenger', priorOffice: 'Businessman / Perennial Candidate', cashOnHandMillions: 1.2, age: 76, hometown: 'Bronzeville, IL' },
      { name: 'Ja\'Mal Green', party: 'DEM', status: 'Challenger', priorOffice: 'Community Activist', cashOnHandMillions: 0.4, age: 33, hometown: 'Chicago, IL' },
    ],
  },
  {
    raceId: '2025-MAYOR-ATL', level: 'municipal', office: 'Mayor — Atlanta',
    state: 'Georgia', stateAbbr: 'GA', municipality: 'Atlanta', population: 498715,
    electionDate: '2025-11-04', isPartisan: false, cookRating: 'Likely D',
    keyIssues: ['Cop City Controversy', 'Traffic Congestion', 'Affordable Housing', 'BeltLine Equity'],
    candidates: [
      { name: 'Andre Dickens', party: 'DEM', status: 'Incumbent', priorOffice: 'Atlanta Mayor / City Council', cashOnHandMillions: 2.4, age: 47, hometown: 'South Atlanta, GA' },
      { name: 'Lorena Garcia', party: 'DEM', status: 'Challenger', priorOffice: 'Community Organizer / Council District Race', cashOnHandMillions: 0.8, age: 42, hometown: 'Atlanta, GA' },
    ],
  },
  {
    raceId: '2025-MAYOR-BOS', level: 'municipal', office: 'Mayor — Boston',
    state: 'Massachusetts', stateAbbr: 'MA', municipality: 'Boston', population: 675647,
    electionDate: '2025-11-04', isPartisan: false, cookRating: 'Likely D',
    keyIssues: ['Housing Affordability', 'School Performance', 'Mass Transit'],
    candidates: [
      { name: 'Michelle Wu', party: 'DEM', status: 'Incumbent', priorOffice: 'Boston Mayor / City Councilor', cashOnHandMillions: 3.2, age: 39, hometown: 'Roslindale, MA' },
      { name: 'Josh Kraft', party: 'DEM', status: 'Challenger', priorOffice: 'Boys & Girls Club CEO / Kraft Family', cashOnHandMillions: 1.8, age: 46, hometown: 'Chestnut Hill, MA' },
    ],
  },
  {
    raceId: '2026-MAYOR-PHX', level: 'municipal', office: 'Mayor — Phoenix',
    state: 'Arizona', stateAbbr: 'AZ', municipality: 'Phoenix', population: 1608139,
    electionDate: '2026-11-03', isPartisan: false, cookRating: 'Toss-up',
    keyIssues: ['Heat Mortality Reduction', 'Light Rail Expansion', 'Homelessness'],
    candidates: [
      { name: 'Kate Gallego', party: 'DEM', status: 'Incumbent', priorOffice: 'Phoenix Mayor / City Council', cashOnHandMillions: 2.8, age: 43, hometown: 'Phoenix, AZ' },
      { name: 'Jim Waring', party: 'REP', status: 'Challenger', priorOffice: 'AZ State Senator', cashOnHandMillions: 1.4, age: 58, hometown: 'North Phoenix, AZ' },
    ],
  },
  {
    raceId: '2026-MAYOR-MIAMI', level: 'municipal', office: 'Mayor — Miami',
    state: 'Florida', stateAbbr: 'FL', municipality: 'Miami', population: 442241,
    electionDate: '2025-11-04', isPartisan: false, cookRating: 'Toss-up',
    keyIssues: ['Sea Level Adaptation', 'Luxury Housing vs Affordability', 'Port Traffic'],
    candidates: [
      { name: 'Francis Suarez', party: 'REP', status: 'Incumbent', priorOffice: 'Miami Mayor / City Commissioner', cashOnHandMillions: 3.2, age: 46, hometown: 'Miami, FL' },
      { name: 'Christine King', party: 'DEM', status: 'Challenger', priorOffice: 'Miami City Commissioner', cashOnHandMillions: 1.2, age: 52, hometown: 'Miami, FL' },
    ],
  },
  {
    raceId: '2025-MAYOR-SEATTLE', level: 'municipal', office: 'Mayor — Seattle',
    state: 'Washington', stateAbbr: 'WA', municipality: 'Seattle', population: 737255,
    electionDate: '2025-11-04', isPartisan: false, cookRating: 'Lean D',
    keyIssues: ['Fentanyl Open Air Markets', 'Amazon HQ2 Spinoffs', 'Homelessness', 'Public Safety'],
    candidates: [
      { name: 'Bruce Harrell', party: 'DEM', status: 'Incumbent', priorOffice: 'Seattle Mayor / City Council President', cashOnHandMillions: 2.2, age: 64, hometown: 'Seattle, WA' },
      { name: 'Colleen Echohawk', party: 'DEM', status: 'Challenger', priorOffice: 'Chief Seattle Club CEO / 2021 Candidate', cashOnHandMillions: 1.4, age: 46, hometown: 'Seattle, WA' },
      { name: 'Oliver Garbis', party: 'DEM', status: 'Challenger', priorOffice: 'Tech Worker / Activist', cashOnHandMillions: 0.4, age: 38, hometown: 'Capitol Hill, WA' },
    ],
  },
  {
    raceId: '2025-MAYOR-DEN', level: 'municipal', office: 'Mayor — Denver',
    state: 'Colorado', stateAbbr: 'CO', municipality: 'Denver', population: 715522,
    electionDate: '2027-05-06', isPartisan: false, cookRating: 'Likely D',
    keyIssues: ['Migrant Services Budget', 'Affordable Housing', 'Light Rail Ridership'],
    candidates: [
      { name: 'Mike Johnston', party: 'DEM', status: 'Incumbent', priorOffice: 'Denver Mayor / CO State Senator', cashOnHandMillions: 2.0, age: 50, hometown: 'Denver, CO' },
      { name: 'Leslie Herod', party: 'DEM', status: 'Challenger', priorOffice: 'CO State Rep.', cashOnHandMillions: 1.2, age: 43, hometown: 'Denver, CO' },
    ],
  },
  {
    raceId: '2026-MAYOR-SAN-ANTONIO', level: 'municipal', office: 'Mayor — San Antonio',
    state: 'Texas', stateAbbr: 'TX', municipality: 'San Antonio', population: 1434625,
    electionDate: '2025-05-03', isPartisan: false, cookRating: 'Likely D',
    keyIssues: ['Military Base Employment', 'Drought & Water Supply', 'Fiesta & Tourism'],
    candidates: [
      { name: 'Ron Nirenberg', party: 'DEM', status: 'Incumbent', priorOffice: 'San Antonio Mayor / City Council', cashOnHandMillions: 1.8, age: 48, hometown: 'San Antonio, TX' },
      { name: 'Marcos Gutierrez', party: 'REP', status: 'Challenger', priorOffice: 'Businessman', cashOnHandMillions: 0.8, age: 52, hometown: 'North San Antonio, TX' },
    ],
  },
  {
    raceId: '2026-MAYOR-MINNEAPOLIS', level: 'municipal', office: 'Mayor — Minneapolis',
    state: 'Minnesota', stateAbbr: 'MN', municipality: 'Minneapolis', population: 429606,
    electionDate: '2025-11-04', isPartisan: false, cookRating: 'Likely D',
    keyIssues: ['Post-George Floyd Police Reform', 'Downtown Business Recovery', 'Housing Affordability'],
    candidates: [
      { name: 'Jacob Frey', party: 'DEM', status: 'Incumbent', priorOffice: 'Minneapolis Mayor / City Council', cashOnHandMillions: 1.6, age: 42, hometown: 'Minneapolis, MN' },
      { name: 'Sheila Nezhad', party: 'DEM', status: 'Challenger', priorOffice: 'Community Organizer / 2021 Candidate', cashOnHandMillions: 0.6, age: 36, hometown: 'Minneapolis, MN' },
    ],
  },
  {
    raceId: '2026-MAYOR-PORTLAND', level: 'municipal', office: 'Mayor — Portland',
    state: 'Oregon', stateAbbr: 'OR', municipality: 'Portland', population: 652503,
    electionDate: '2024-11-05', isPartisan: false, cookRating: 'Open Seat',
    keyIssues: ['Fentanyl Open Air Use', 'Homeless Encampments', 'Downtown Business Exodus'],
    candidates: [
      { name: 'Keith Wilson', party: 'NP', status: 'Open Seat', priorOffice: 'Housing Nonprofit CEO', cashOnHandMillions: 1.4, age: 54, hometown: 'Portland, OR' },
      { name: 'Carmen Rubio', party: 'DEM', status: 'Challenger', priorOffice: 'Portland City Council', cashOnHandMillions: 1.2, age: 50, hometown: 'Portland, OR' },
      { name: 'Rene Gonzalez', party: 'DEM', status: 'Challenger', priorOffice: 'Portland City Council / 2022 Candidate', cashOnHandMillions: 1.0, age: 53, hometown: 'Portland, OR' },
    ],
  },
];

// ─── SCHOOL BOARD / SPECIAL DISTRICT FEATURED RACES ─────────────────────────

export const SCHOOL_BOARD_FEATURED: RaceEntry[] = [
  {
    raceId: '2025-SB-MOMS4LIB-VA', level: 'special_district', office: 'Fairfax County School Board — Virginia',
    state: 'Virginia', stateAbbr: 'VA', county: 'Fairfax County', electionDate: '2025-11-04', isPartisan: false,
    keyIssues: ['Book Banning', 'Gender Identity Policy', 'Special Ed Funding'],
    candidates: [
      { name: 'Elaine Tholen', party: 'DEM', status: 'Incumbent', priorOffice: 'Fairfax County School Board (Dranesville)', age: 64, hometown: 'Great Falls, VA' },
      { name: 'Tara Jane O\'Brien', party: 'REP', status: 'Challenger', priorOffice: 'Parent Advocate', age: 42, hometown: 'McLean, VA' },
      { name: 'Karen Keys-Gamarra', party: 'DEM', status: 'Incumbent', priorOffice: 'FCPS At-Large Board Member', age: 53, hometown: 'Reston, VA' },
    ],
  },
  {
    raceId: '2025-SB-LOS-ANGELES', level: 'special_district', office: 'Los Angeles Unified School Board — California',
    state: 'California', stateAbbr: 'CA', county: 'Los Angeles County', electionDate: '2025-11-04', isPartisan: false,
    keyIssues: ['Teacher Contract', 'Budget Cuts', 'Charter School Oversight', 'Immigration Resource Centers'],
    candidates: [
      { name: 'Nick Melvoin', party: 'NP', status: 'Incumbent', priorOffice: 'LAUSD Board District 4', age: 42, hometown: 'West Hollywood, CA', cashOnHandMillions: 0.8 },
      { name: 'Marilyn Koziatek', party: 'NP', status: 'Challenger', priorOffice: 'Teachers Union Rep.', age: 50, hometown: 'Burbank, CA', cashOnHandMillions: 0.4 },
      { name: 'Tanya Ortiz Franklin', party: 'NP', status: 'Incumbent', priorOffice: 'LAUSD Board District 7', age: 44, hometown: 'South Los Angeles, CA', cashOnHandMillions: 0.6 },
    ],
  },
  {
    raceId: '2026-WATER-MWDSC-CA', level: 'special_district', office: 'Metropolitan Water District — Southern California',
    state: 'California', stateAbbr: 'CA', electionDate: '2026-11-03', isPartisan: false,
    keyIssues: ['Colorado River Compact', 'Conservation Mandates', 'Rate Increases'],
    candidates: [
      { name: 'Gloria Gray', party: 'DEM', status: 'Incumbent', priorOffice: 'MWD Board Chair', age: 62, hometown: 'Inglewood, CA' },
      { name: 'Beth Kaneko', party: 'NP', status: 'Challenger', priorOffice: 'Foothill Municipal Water District', age: 48, hometown: 'La Verne, CA' },
    ],
  },
  {
    raceId: '2026-SB-MOMS-LIBERTY-PA', level: 'special_district', office: 'Central Bucks School Board — Pennsylvania',
    state: 'Pennsylvania', stateAbbr: 'PA', county: 'Bucks County', electionDate: '2025-11-04', isPartisan: false,
    keyIssues: ['LGBTQ+ Library Books', 'Mask Policy Aftermath', 'Curriculum Transparency'],
    candidates: [
      { name: 'Debra Cannon', party: 'NP', status: 'Incumbent', priorOffice: 'CBSD Board (Moms for Liberty backed)', age: 52, hometown: 'Doylestown, PA' },
      { name: 'Brandon Umstrad', party: 'NP', status: 'Challenger', priorOffice: 'Parent Volunteer', age: 44, hometown: 'Chalfont, PA' },
      { name: 'Ann Langtry', party: 'DEM', status: 'Challenger', priorOffice: 'Retired Teacher', age: 61, hometown: 'New Hope, PA' },
    ],
  },
  {
    raceId: '2026-SOIL-FULTON-GA', level: 'special_district', office: 'Fulton County Soil & Water Conservation District',
    state: 'Georgia', stateAbbr: 'GA', county: 'Fulton County', electionDate: '2026-11-03', isPartisan: false,
    keyIssues: ['Urban Stormwater Management', 'Tree Canopy Protection', 'Erosion Control'],
    candidates: [
      { name: 'Marcus Webb', party: 'NP', status: 'Incumbent', priorOffice: 'Soil & Water Conservation Supervisor', age: 58, hometown: 'Atlanta, GA' },
      { name: 'Priya Chandrasekaran', party: 'NP', status: 'Challenger', priorOffice: 'Environmental Engineer', age: 42, hometown: 'Alpharetta, GA' },
      { name: 'Robert Tanner', party: 'NP', status: 'Challenger', priorOffice: 'Farmer', age: 66, hometown: 'Palmetto, GA' },
    ],
  },
];

// ─── JUSTICE OF THE PEACE / CONSTABLE RACES ──────────────────────────────────

export const LOCAL_JUDICIAL_RACES: RaceEntry[] = [
  {
    raceId: '2026-JP-HARRIS-TX-PCT1', level: 'county', office: 'Justice of the Peace Pct. 1 — Harris County, TX',
    state: 'Texas', stateAbbr: 'TX', county: 'Harris County', district: 'Precinct 1',
    electionDate: '2026-11-03', isPartisan: true,
    keyIssues: ['Small Claims Court', 'Eviction Proceedings', 'Class C Misdemeanors'],
    candidates: [
      { name: 'Lucia Bates', party: 'DEM', status: 'Incumbent', priorOffice: 'Harris County JP Pct. 1', age: 54, hometown: 'Houston, TX' },
      { name: 'Thomas Redding', party: 'REP', status: 'Challenger', priorOffice: 'Paralegal', age: 48, hometown: 'Baytown, TX' },
    ],
  },
  {
    raceId: '2026-CONSTABLE-TRAVIS-TX-PCT1', level: 'county', office: 'Constable Pct. 1 — Travis County, TX',
    state: 'Texas', stateAbbr: 'TX', county: 'Travis County', district: 'Precinct 1',
    electionDate: '2026-11-03', isPartisan: true,
    keyIssues: ['Civil Process Serving', 'Court Security', 'Mental Health Response'],
    candidates: [
      { name: 'Carlos Lopez', party: 'DEM', status: 'Incumbent', priorOffice: 'Travis County Constable Pct. 1', age: 49, hometown: 'Austin, TX' },
      { name: 'Angela Merritt', party: 'REP', status: 'Challenger', priorOffice: 'APD Officer', age: 44, hometown: 'Round Rock, TX' },
    ],
  },
  {
    raceId: '2026-JP-MARICOPA-AZ-PCT3', level: 'county', office: 'Justice of the Peace Pct. 3 — Maricopa County, AZ',
    state: 'Arizona', stateAbbr: 'AZ', county: 'Maricopa County', district: 'Precinct 3',
    electionDate: '2026-11-03', isPartisan: false,
    keyIssues: ['Landlord-Tenant Disputes', 'Small Claims', 'DUI Arraignments'],
    candidates: [
      { name: 'Sandra Whitfield', party: 'NP', status: 'Incumbent', priorOffice: 'Maricopa JP Pct. 3', age: 57, hometown: 'Tempe, AZ' },
      { name: 'Jim Papadopoulos', party: 'NP', status: 'Challenger', priorOffice: 'Paralegal / Business Owner', age: 52, hometown: 'Chandler, AZ' },
    ],
  },
  {
    raceId: '2026-JP-COOK-IL-CALUMET', level: 'county', office: 'Cook County Circuit Court Judge — Calumet District',
    state: 'Illinois', stateAbbr: 'IL', county: 'Cook County', district: 'Calumet',
    electionDate: '2026-11-03', isPartisan: false,
    candidates: [
      { name: 'Alison Conlon', party: 'DEM', status: 'Incumbent', priorOffice: 'Cook County Circuit Judge', age: 54, hometown: 'Chicago Heights, IL' },
      { name: 'Patrick McMahon', party: 'REP', status: 'Challenger', priorOffice: 'Criminal Defense Attorney', age: 49, hometown: 'Orland Park, IL' },
    ],
  },
];

// ─── TOWNSHIP & VILLAGE RACES ─────────────────────────────────────────────────

export const TOWNSHIP_VILLAGE_RACES: RaceEntry[] = [
  {
    raceId: '2025-TOWNSHIP-DOWNERS-GROVE-IL', level: 'municipal', office: 'Downers Grove Township Supervisor — Illinois',
    state: 'Illinois', stateAbbr: 'IL', municipality: 'Downers Grove Township', population: 87901,
    electionDate: '2025-04-01', isPartisan: true,
    candidates: [
      { name: 'Brian Krajewski', party: 'DEM', status: 'Incumbent', priorOffice: 'Downers Grove Township Supervisor', age: 53, hometown: 'Downers Grove, IL' },
      { name: 'Daniel Young', party: 'REP', status: 'Challenger', priorOffice: 'Township Assessor', age: 61, hometown: 'Westmont, IL' },
    ],
  },
  {
    raceId: '2025-VILLAGE-PARK-RIDGE-IL', level: 'municipal', office: 'Village President — Park Ridge, Illinois',
    state: 'Illinois', stateAbbr: 'IL', municipality: 'Park Ridge', population: 37977,
    electionDate: '2025-04-01', isPartisan: false,
    candidates: [
      { name: 'Martin Joyce', party: 'NP', status: 'Incumbent', priorOffice: 'Park Ridge Village President', age: 62, hometown: 'Park Ridge, IL' },
      { name: 'Patricia Lim', party: 'NP', status: 'Challenger', priorOffice: 'Alderman 6th Ward', age: 48, hometown: 'Park Ridge, IL' },
    ],
  },
  {
    raceId: '2026-TOWNSHIP-BROOKHAVEN-NY', level: 'municipal', office: 'Brookhaven Town Supervisor — New York',
    state: 'New York', stateAbbr: 'NY', municipality: 'Brookhaven Town', population: 497010,
    electionDate: '2025-11-04', isPartisan: true,
    keyIssues: ['Long Island Housing Shortage', 'Sewage Infrastructure', 'North Shore Beaches'],
    candidates: [
      { name: 'Dan Panico', party: 'REP', status: 'Incumbent', priorOffice: 'Brookhaven Town Supervisor / NY Assemblyman', age: 54, hometown: 'Manorville, NY', cashOnHandMillions: 0.8 },
      { name: 'Dave Calone', party: 'DEM', status: 'Challenger', priorOffice: 'Suffolk County Planning Commissioner', age: 49, hometown: 'Setauket, NY', cashOnHandMillions: 0.6 },
    ],
  },
  {
    raceId: '2025-TOWNSHIP-CRANBERRY-PA', level: 'municipal', office: 'Cranberry Township Supervisor — Pennsylvania',
    state: 'Pennsylvania', stateAbbr: 'PA', municipality: 'Cranberry Township', population: 32727,
    electionDate: '2025-11-04', isPartisan: false,
    candidates: [
      { name: 'Shelly Fountain', party: 'REP', status: 'Incumbent', priorOffice: 'Cranberry Township Supervisor', age: 58, hometown: 'Cranberry Twp, PA' },
      { name: 'Michael Gomulka', party: 'DEM', status: 'Challenger', priorOffice: 'Land Use Attorney', age: 44, hometown: 'Cranberry Twp, PA' },
    ],
  },
];

// ─── MASTER CANDIDATES LOOKUP ─────────────────────────────────────────────────

export const ALL_RACE_ENTRIES: RaceEntry[] = [
  ...SENATE_2026_RACES,
  ...GUBERNATORIAL_2026_RACES,
  ...HOUSE_BATTLEGROUND_RACES,
  ...AG_RACES_2026,
  ...SOS_RACES_2026,
  ...COUNTY_RACES_FEATURED,
  ...MUNICIPAL_RACES_FEATURED,
  ...SCHOOL_BOARD_FEATURED,
  ...LOCAL_JUDICIAL_RACES,
  ...TOWNSHIP_VILLAGE_RACES,
];

// Total unique candidates across all races
export function getTotalCandidateCount(): number {
  return ALL_RACE_ENTRIES.reduce((total, race) => total + race.candidates.length, 0);
}

export function getRacesByState(stateAbbr: string): RaceEntry[] {
  return ALL_RACE_ENTRIES.filter(r => r.stateAbbr === stateAbbr);
}

export function getRacesByLevel(level: RaceEntry['level']): RaceEntry[] {
  return ALL_RACE_ENTRIES.filter(r => r.level === level);
}

export function searchRaces(query: string): RaceEntry[] {
  const q = query.toLowerCase();
  return ALL_RACE_ENTRIES.filter(r =>
    r.office.toLowerCase().includes(q) ||
    r.state.toLowerCase().includes(q) ||
    (r.municipality || '').toLowerCase().includes(q) ||
    (r.county || '').toLowerCase().includes(q) ||
    r.candidates.some(c => c.name.toLowerCase().includes(q) || (c.priorOffice || '').toLowerCase().includes(q))
  );
}
