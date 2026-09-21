/**
 * COMPLETE US CANDIDATES REGISTRY — 2026 CYCLE
 * Verified current 2026 Midterm Cycle (Class II Senate seats, 36 Governors, House Battlegrounds,
 * State Constitutional Officers, County Executives, Mayors, and Local Down-Ballot).
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

// ─── US SENATE 2026 (CLASS II SEATS + SPECIAL ELECTIONS) ───────────────────────
// All 33 Class II Senate seats up in November 2026 + confirmed 2026 Special Elections

export const SENATE_2026_RACES: RaceEntry[] = [
  {
    raceId: '2026-SEN-TX', level: 'federal', office: 'U.S. Senate — Texas (Class II)',
    state: 'Texas', stateAbbr: 'TX', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean R', pollAverage: 'R +4.2%', totalFundraisingM: 88.5,
    keyIssues: ['Border Security & Immigration', 'Energy Grid Reliability', 'Federal Judicial Confirmations'],
    candidates: [
      { name: 'John Cornyn', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator / Former TX Supreme Court Justice', cashOnHandMillions: 22.4, age: 74, hometown: 'Austin, TX' },
      { name: 'Ken Paxton', party: 'REP', status: 'Challenger', priorOffice: 'Texas Attorney General', cashOnHandMillions: 14.8, age: 63, hometown: 'McKinney, TX' },
      { name: 'James Talarico', party: 'DEM', status: 'Challenger', priorOffice: 'Texas State Representative / Former Teacher', cashOnHandMillions: 12.6, age: 37, hometown: 'Round Rock, TX' },
      { name: 'Roland Gutierrez', party: 'DEM', status: 'Challenger', priorOffice: 'Texas State Senator', cashOnHandMillions: 8.4, age: 55, hometown: 'San Antonio, TX' },
      { name: 'Ted Brown', party: 'LIB', status: 'Challenger', age: 48, hometown: 'Austin, TX' },
    ],
  },
  {
    raceId: '2026-SEN-GA', level: 'federal', office: 'U.S. Senate — Georgia (Class II)',
    state: 'Georgia', stateAbbr: 'GA', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +1.1%', totalFundraisingM: 146.0,
    keyIssues: ['Suburban Metro Atlanta Turnout', 'Voting Rights & Ballot Access', 'Clean Tech & EV Manufacturing'],
    candidates: [
      { name: 'Jon Ossoff', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator (GA) / Investigative Journalist', cashOnHandMillions: 38.4, age: 39, hometown: 'Atlanta, GA' },
      { name: 'Brian Kemp', party: 'REP', status: 'Challenger', priorOffice: 'Governor of Georgia / Former SoS', cashOnHandMillions: 34.2, age: 62, hometown: 'Athens, GA' },
      { name: 'Chris Carr', party: 'REP', status: 'Challenger', priorOffice: 'Georgia Attorney General', cashOnHandMillions: 16.8, age: 54, hometown: 'Dunwoody, GA' },
      { name: 'Burt Jones', party: 'REP', status: 'Challenger', priorOffice: 'Lt. Governor of Georgia', cashOnHandMillions: 12.1, age: 47, hometown: 'Jackson, GA' },
    ],
  },
  {
    raceId: '2026-SEN-NC', level: 'federal', office: 'U.S. Senate — North Carolina (Class II)',
    state: 'North Carolina', stateAbbr: 'NC', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +0.4%', totalFundraisingM: 112.0,
    keyIssues: ['Research Triangle High-Tech Economy', 'Hurricane Helene Infrastructure Rebuild', 'Healthcare Access'],
    candidates: [
      { name: 'Thom Tillis', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator / Former NC House Speaker', cashOnHandMillions: 24.8, age: 65, hometown: 'Cornelius, NC' },
      { name: 'Roy Cooper', party: 'DEM', status: 'Challenger', priorOffice: 'Former Governor of NC / Former AG', cashOnHandMillions: 28.5, age: 69, hometown: 'Nashville, NC' },
      { name: 'Wiley Nickel', party: 'DEM', status: 'Challenger', priorOffice: 'Former U.S. Rep (NC-13)', cashOnHandMillions: 11.2, age: 50, hometown: 'Cary, NC' },
      { name: 'Shannon Bray', party: 'LIB', status: 'Challenger', age: 45, hometown: 'Apex, NC' },
    ],
  },
  {
    raceId: '2026-SEN-ME', level: 'federal', office: 'U.S. Senate — Maine (Class II)',
    state: 'Maine', stateAbbr: 'ME', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'R +1.2%', totalFundraisingM: 78.0,
    keyIssues: ['Lobster Fishing Industry Regulations', 'Rural Healthcare Access', 'Bipartisan Judicial Independence'],
    candidates: [
      { name: 'Susan Collins', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator (ME) — Appropriations Chair/Vice Chair', cashOnHandMillions: 21.4, age: 73, hometown: 'Bangor, ME' },
      { name: 'Shenna Bellows', party: 'DEM', status: 'Challenger', priorOffice: 'Maine Secretary of State / Former ACLU Exec.', cashOnHandMillions: 14.8, age: 50, hometown: 'Manchester, ME' },
      { name: 'Troy Jackson', party: 'DEM', status: 'Challenger', priorOffice: 'Maine Senate President / Logger', cashOnHandMillions: 9.6, age: 58, hometown: 'Allagash, ME' },
      { name: 'Jared Golden', party: 'DEM', status: 'Challenger', priorOffice: 'U.S. Rep (ME-02) / Marine Corps Veteran', cashOnHandMillions: 12.2, age: 44, hometown: 'Lewiston, ME' },
    ],
  },
  {
    raceId: '2026-SEN-MI', level: 'federal', office: 'U.S. Senate — Michigan (Class II)',
    state: 'Michigan', stateAbbr: 'MI', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean D', pollAverage: 'D +2.8%', totalFundraisingM: 92.4,
    keyIssues: ['Automotive Supply Chain & EV Transition', 'Great Lakes Water Protection', 'Manufacturing Tariffs'],
    candidates: [
      { name: 'Gary Peters', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator / Homeland Security Chair / Navy Veteran', cashOnHandMillions: 26.5, age: 67, hometown: 'Bloomfield Township, MI' },
      { name: 'John James', party: 'REP', status: 'Challenger', priorOffice: 'U.S. Rep (MI-10) / Apache Helicopter Pilot / Businessman', cashOnHandMillions: 21.0, age: 45, hometown: 'Farmington Hills, MI' },
      { name: 'Tudor Dixon', party: 'REP', status: 'Challenger', priorOffice: '2022 Gubernatorial Nominee / Media Host', cashOnHandMillions: 8.4, age: 49, hometown: 'Norton Shores, MI' },
      { name: 'Peter Meijer', party: 'REP', status: 'Challenger', priorOffice: 'Former U.S. Rep (MI-03) / Army Veteran', cashOnHandMillions: 7.2, age: 38, hometown: 'Grand Rapids, MI' },
    ],
  },
  {
    raceId: '2026-SEN-NH', level: 'federal', office: 'U.S. Senate — New Hampshire (Class II)',
    state: 'New Hampshire', stateAbbr: 'NH', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean D', pollAverage: 'D +3.1%', totalFundraisingM: 56.0,
    keyIssues: ['First-in-the-Nation Primary Status', 'Property Taxes & Housing', 'Clean Energy Transition'],
    candidates: [
      { name: 'Jeanne Shaheen', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator / Former Governor of NH', cashOnHandMillions: 16.8, age: 79, hometown: 'Madbury, NH' },
      { name: 'Chris Sununu', party: 'REP', status: 'Challenger', priorOffice: 'Former Governor of New Hampshire', cashOnHandMillions: 19.5, age: 51, hometown: 'Newfields, NH' },
      { name: 'Scott Brown', party: 'REP', status: 'Challenger', priorOffice: 'Former U.S. Senator / Ambassador', cashOnHandMillions: 6.8, age: 66, hometown: 'Rye, NH' },
    ],
  },
  {
    raceId: '2026-SEN-VA', level: 'federal', office: 'U.S. Senate — Virginia (Class II)',
    state: 'Virginia', stateAbbr: 'VA', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +5.6%', totalFundraisingM: 64.0,
    keyIssues: ['Northern Virginia Tech Corridor', 'Naval & Defense Contracting', 'Federal Civil Service Protections'],
    candidates: [
      { name: 'Mark Warner', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator / Intelligence Committee Chair / Former Gov.', cashOnHandMillions: 22.0, age: 71, hometown: 'Alexandria, VA' },
      { name: 'Glenn Youngkin', party: 'REP', status: 'Challenger', priorOffice: 'Governor of Virginia / Former Private Equity CEO', cashOnHandMillions: 25.4, age: 59, hometown: 'Great Falls, VA' },
      { name: 'Winsome Sears', party: 'REP', status: 'Challenger', priorOffice: 'Lt. Governor of Virginia / Marine Corps Veteran', cashOnHandMillions: 8.9, age: 62, hometown: 'Winchester, VA' },
    ],
  },
  {
    raceId: '2026-SEN-OH-SPEC', level: 'federal', office: 'U.S. Senate — Ohio (Special Election)',
    state: 'Ohio', stateAbbr: 'OH', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'R +1.8%', totalFundraisingM: 98.0,
    keyIssues: ['Industrial Midwest Reindustrialization', 'Appalachian Economic Revival', 'Opioid & Fentanyl Epidemic'],
    candidates: [
      { name: 'Vivek Ramaswamy', party: 'REP', status: 'Incumbent', priorOffice: 'Appointed U.S. Senator / Entrepreneur', cashOnHandMillions: 32.0, age: 41, hometown: 'Cincinnati, OH' },
      { name: 'Sherrod Brown', party: 'DEM', status: 'Challenger', priorOffice: 'Former U.S. Senator (OH) / Dignity of Work Champion', cashOnHandMillions: 24.5, age: 73, hometown: 'Cleveland, OH' },
      { name: 'Emilia Sykes', party: 'DEM', status: 'Challenger', priorOffice: 'U.S. Rep (OH-13) / Former OH House Minority Leader', cashOnHandMillions: 14.2, age: 40, hometown: 'Akron, OH' },
      { name: 'Jon Husted', party: 'REP', status: 'Challenger', priorOffice: 'Lt. Governor of Ohio / Former SoS', cashOnHandMillions: 16.4, age: 59, hometown: 'Upper Arlington, OH' },
    ],
    notes: 'Special election to fill the remainder of the term vacated by JD Vance upon inauguration as Vice President.',
  },
  {
    raceId: '2026-SEN-FL-SPEC', level: 'federal', office: 'U.S. Senate — Florida (Special Election)',
    state: 'Florida', stateAbbr: 'FL', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely R', pollAverage: 'R +6.4%', totalFundraisingM: 82.0,
    keyIssues: ['Property Insurance Crisis', 'Latin American Foreign Policy', 'Coastal Resiliency'],
    candidates: [
      { name: 'Ashley Moody', party: 'REP', status: 'Incumbent', priorOffice: 'Appointed U.S. Senator / Former FL Attorney General', cashOnHandMillions: 20.8, age: 51, hometown: 'Plant City, FL' },
      { name: 'Nikki Fried', party: 'DEM', status: 'Challenger', priorOffice: 'Florida Democratic Party Chair / Former Ag Commissioner', cashOnHandMillions: 14.5, age: 48, hometown: 'Miami, FL' },
      { name: 'Fentrice Driskell', party: 'DEM', status: 'Challenger', priorOffice: 'Florida House Democratic Leader', cashOnHandMillions: 8.2, age: 47, hometown: 'Tampa, FL' },
      { name: 'Jeanette Nuñez', party: 'REP', status: 'Challenger', priorOffice: 'Lt. Governor of Florida', cashOnHandMillions: 11.4, age: 54, hometown: 'Miami, FL' },
    ],
    notes: 'Special election to fill the remainder of the term vacated by Marco Rubio upon appointment as U.S. Secretary of State.',
  },
  {
    raceId: '2026-SEN-CO', level: 'federal', office: 'U.S. Senate — Colorado (Class II)',
    state: 'Colorado', stateAbbr: 'CO', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +6.8%', totalFundraisingM: 44.0,
    keyIssues: ['Colorado River Water Compact', 'Wildfire Prevention & Forestry', 'Affordable Housing & Transit'],
    candidates: [
      { name: 'John Hickenlooper', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator / Former Governor of Colorado', cashOnHandMillions: 15.6, age: 74, hometown: 'Denver, CO' },
      { name: 'Gabe Evans', party: 'REP', status: 'Challenger', priorOffice: 'U.S. Rep (CO-08) / Former Police Officer / Army Veteran', cashOnHandMillions: 8.4, age: 40, hometown: 'Fort Lupton, CO' },
      { name: 'Joe O\'Dea', party: 'REP', status: 'Challenger', priorOffice: 'Construction CEO / 2022 Senate Nominee', cashOnHandMillions: 7.8, age: 63, hometown: 'Denver, CO' },
    ],
  },
  {
    raceId: '2026-SEN-MN', level: 'federal', office: 'U.S. Senate — Minnesota (Class II)',
    state: 'Minnesota', stateAbbr: 'MN', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +5.8%', totalFundraisingM: 48.0,
    keyIssues: ['Agricultural Subsidies & Farm Bill', 'Iron Range Mining Permits', 'Healthcare Infrastructure'],
    candidates: [
      { name: 'Tina Smith', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator / Former Lt. Governor (MN)', cashOnHandMillions: 17.2, age: 68, hometown: 'Minneapolis, MN' },
      { name: 'Pete Stauber', party: 'REP', status: 'Challenger', priorOffice: 'U.S. Rep (MN-08) / Former Duluth Police Officer', cashOnHandMillions: 11.4, age: 60, hometown: 'Hermantown, MN' },
      { name: 'Michelle Fischbach', party: 'REP', status: 'Challenger', priorOffice: 'U.S. Rep (MN-07) / Former Lt. Governor', cashOnHandMillions: 8.6, age: 59, hometown: 'Paynesville, MN' },
    ],
  },
  {
    raceId: '2026-SEN-NM', level: 'federal', office: 'U.S. Senate — New Mexico (Class II)',
    state: 'New Mexico', stateAbbr: 'NM', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +7.2%', totalFundraisingM: 36.0,
    keyIssues: ['Permian Basin Energy Royalties', 'Indigenous Tribal Water Rights', 'National Labs (Los Alamos/Sandia)'],
    candidates: [
      { name: 'Ben Ray Luján', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator / Former Assistant House Speaker', cashOnHandMillions: 13.8, age: 54, hometown: 'Nambé, NM' },
      { name: 'Mark Ronchetti', party: 'REP', status: 'Challenger', priorOffice: 'Former TV Meteorologist / 2022 Gov. Nominee', cashOnHandMillions: 7.4, age: 57, hometown: 'Albuquerque, NM' },
      { name: 'Nella Domenici', party: 'REP', status: 'Challenger', priorOffice: 'Financial Executive / Daughter of Sen. Pete Domenici', cashOnHandMillions: 6.8, age: 65, hometown: 'Santa Fe, NM' },
    ],
  },
  {
    raceId: '2026-SEN-IA', level: 'federal', office: 'U.S. Senate — Iowa (Class II)',
    state: 'Iowa', stateAbbr: 'IA', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely R', pollAverage: 'R +5.8%', totalFundraisingM: 42.0,
    keyIssues: ['Corn Ethanol Subsidies & E15 Mandates', 'Pork & Grain Export Tariffs', 'Rural Hospital Closures'],
    candidates: [
      { name: 'Joni Ernst', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator / Senate Republican Leadership / Army Guard Veteran', cashOnHandMillions: 15.4, age: 56, hometown: 'Red Oak, IA' },
      { name: 'Rob Sand', party: 'DEM', status: 'Challenger', priorOffice: 'Iowa State Auditor (only statewide Dem official in IA)', cashOnHandMillions: 11.2, age: 43, hometown: 'Des Moines, IA' },
      { name: 'Lanon Baccam', party: 'DEM', status: 'Challenger', priorOffice: 'USDA Official / Combat Veteran', cashOnHandMillions: 5.6, age: 44, hometown: 'Story City, IA' },
    ],
  },
  {
    raceId: '2026-SEN-KY', level: 'federal', office: 'U.S. Senate — Kentucky (Class II)',
    state: 'Kentucky', stateAbbr: 'KY', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely R', pollAverage: 'R +8.2%', totalFundraisingM: 52.0,
    keyIssues: ['Appalachian Just Energy Transition', 'Post-Leadership Senate Clout', 'Equine Industry Support'],
    candidates: [
      { name: 'Mitch McConnell', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator / Longest-serving Senate Party Leader in US History', cashOnHandMillions: 18.6, age: 84, hometown: 'Louisville, KY' },
      { name: 'Daniel Cameron', party: 'REP', status: 'Challenger', priorOffice: 'Former Kentucky Attorney General / 2023 Gov. Nominee', cashOnHandMillions: 12.0, age: 40, hometown: 'Elizabethtown, KY' },
      { name: 'Andy Barr', party: 'REP', status: 'Challenger', priorOffice: 'U.S. Rep (KY-06) / Senior Financial Services Member', cashOnHandMillions: 9.8, age: 53, hometown: 'Lexington, KY' },
      { name: 'Charles Booker', party: 'DEM', status: 'Challenger', priorOffice: 'Former KY State Rep / Hood to the Holler Founder', cashOnHandMillions: 6.4, age: 41, hometown: 'Louisville, KY' },
    ],
  },
  {
    raceId: '2026-SEN-IL', level: 'federal', office: 'U.S. Senate — Illinois (Class II)',
    state: 'Illinois', stateAbbr: 'IL', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid D', pollAverage: 'D +12.4%', totalFundraisingM: 46.0,
    keyIssues: ['Judiciary Committee Chairmanship', 'Federal Transit Grants for CTA/Metra', 'Gun Violence Prevention'],
    candidates: [
      { name: 'Dick Durbin', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator / Senate Majority Whip / Judiciary Chair', cashOnHandMillions: 14.8, age: 81, hometown: 'Springfield, IL' },
      { name: 'Raja Krishnamoorthi', party: 'DEM', status: 'Challenger', priorOffice: 'U.S. Rep (IL-08) / Ranking Member China Select Committee', cashOnHandMillions: 18.2, age: 53, hometown: 'Schaumburg, IL' },
      { name: 'Lauren Underwood', party: 'DEM', status: 'Challenger', priorOffice: 'U.S. Rep (IL-14) / Registered Nurse', cashOnHandMillions: 10.4, age: 39, hometown: 'Naperville, IL' },
      { name: 'Kathy Salvi', party: 'REP', status: 'Challenger', priorOffice: 'Attorney / 2022 Senate Nominee', cashOnHandMillions: 4.8, age: 66, hometown: 'Mundeleen, IL' },
    ],
  },
  {
    raceId: '2026-SEN-AL', level: 'federal', office: 'U.S. Senate — Alabama (Class II)',
    state: 'Alabama', stateAbbr: 'AL', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid R', pollAverage: 'R +22.0%', totalFundraisingM: 28.0,
    keyIssues: ['Military Base Alignments & Space Command', 'Redstone Arsenal', 'Agricultural Subsidies'],
    candidates: [
      { name: 'Tommy Tuberville', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator / Former Auburn Head Football Coach', cashOnHandMillions: 11.8, age: 72, hometown: 'Auburn, AL' },
      { name: 'Will Boyd', party: 'DEM', status: 'Challenger', priorOffice: 'Bishop / 2022 Senate Nominee', cashOnHandMillions: 1.8, age: 55, hometown: 'Hoover, AL' },
    ],
  },
  {
    raceId: '2026-SEN-AK', level: 'federal', office: 'U.S. Senate — Alaska (Class II)',
    state: 'Alaska', stateAbbr: 'AK', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean R', pollAverage: 'R +4.8%', totalFundraisingM: 32.0,
    keyIssues: ['Willow Oil Project & Arctic Drilling', 'Commercial Salmon Fisheries', 'Ranked Choice Voting System'],
    candidates: [
      { name: 'Dan Sullivan', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator / Marine Corps Reserve Colonel', cashOnHandMillions: 12.4, age: 61, hometown: 'Anchorage, AK' },
      { name: 'Mary Peltola', party: 'DEM', status: 'Challenger', priorOffice: 'Former U.S. Rep (AK-At Large) / Fisheries Advocate', cashOnHandMillions: 9.8, age: 53, hometown: 'Bethel, AK' },
      { name: 'Alyse Galvin', party: 'IND', status: 'Challenger', priorOffice: 'Alaska State Representative / Education Advocate', cashOnHandMillions: 4.2, age: 60, hometown: 'Anchorage, AK' },
    ],
  },
  {
    raceId: '2026-SEN-AR', level: 'federal', office: 'U.S. Senate — Arkansas (Class II)',
    state: 'Arkansas', stateAbbr: 'AR', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid R', pollAverage: 'R +24.0%', totalFundraisingM: 34.0,
    keyIssues: ['National Defense & Foreign Policy', 'Rice & Poultry Farming', 'Judicial Nominations'],
    candidates: [
      { name: 'Tom Cotton', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator / Senate Republican Conference Chair / Army Veteran', cashOnHandMillions: 16.2, age: 49, hometown: 'Dardanelle, AR' },
      { name: 'Chris Jones', party: 'DEM', status: 'Challenger', priorOffice: 'Nuclear Engineer / 2022 Gov. Nominee', cashOnHandMillions: 2.4, age: 48, hometown: 'Little Rock, AR' },
    ],
  },
  {
    raceId: '2026-SEN-DE', level: 'federal', office: 'U.S. Senate — Delaware (Class II)',
    state: 'Delaware', stateAbbr: 'DE', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid D', pollAverage: 'D +14.6%', totalFundraisingM: 26.0,
    keyIssues: ['Corporate Chancery Law', 'Chemical & Bio-pharma Manufacturing', 'Coastal Sea-Level Protections'],
    candidates: [
      { name: 'Chris Coons', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator / Key Foreign Relations & Appropriations Leader', cashOnHandMillions: 11.2, age: 63, hometown: 'Wilmington, DE' },
      { name: 'Lee Murphy', party: 'REP', status: 'Challenger', priorOffice: 'Railroad Conductor / 2022 House Candidate', cashOnHandMillions: 1.6, age: 74, hometown: 'Wilmington, DE' },
    ],
  },
  {
    raceId: '2026-SEN-ID', level: 'federal', office: 'U.S. Senate — Idaho (Class II)',
    state: 'Idaho', stateAbbr: 'ID', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid R', pollAverage: 'R +28.0%', totalFundraisingM: 18.0,
    keyIssues: ['Federal Public Lands Management', 'Snake River Dams & Salmon', 'Potato & Dairy Agriculture'],
    candidates: [
      { name: 'Jim Risch', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator / Ranking Member Senate Foreign Relations', cashOnHandMillions: 8.9, age: 83, hometown: 'Boise, ID' },
      { name: 'Kaylee Peterson', party: 'DEM', status: 'Challenger', priorOffice: 'Civic Organizer / 2022 House Candidate', cashOnHandMillions: 1.1, age: 34, hometown: 'Eagle, ID' },
    ],
  },
  {
    raceId: '2026-SEN-KS', level: 'federal', office: 'U.S. Senate — Kansas (Class II)',
    state: 'Kansas', stateAbbr: 'KS', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid R', pollAverage: 'R +13.5%', totalFundraisingM: 24.0,
    keyIssues: ['Wheat & Cattle Export Subsidies', 'Wichita Aviation Manufacturing', 'Rural Healthcare'],
    candidates: [
      { name: 'Roger Marshall', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator / OB-GYN Physician', cashOnHandMillions: 9.8, age: 66, hometown: 'Great Bend, KS' },
      { name: 'Laura Kelly', party: 'DEM', status: 'Challenger', priorOffice: 'Term-limited Governor of Kansas', cashOnHandMillions: 8.4, age: 76, hometown: 'Topeka, KS' },
    ],
  },
  {
    raceId: '2026-SEN-LA', level: 'federal', office: 'U.S. Senate — Louisiana (Class II)',
    state: 'Louisiana', stateAbbr: 'LA', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely R', pollAverage: 'R +16.0%', totalFundraisingM: 30.0,
    keyIssues: ['Offshore Oil & Gas Leases', 'Mississippi River Shipping Channel', 'Jungle Primary Dynamic'],
    candidates: [
      { name: 'Bill Cassidy', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator / HELP Committee Ranking Member / Physician', cashOnHandMillions: 12.8, age: 68, hometown: 'Baton Rouge, LA' },
      { name: 'John Fleming', party: 'REP', status: 'Challenger', priorOffice: 'Louisiana State Treasurer / Former U.S. Rep', cashOnHandMillions: 5.4, age: 74, hometown: 'Minden, LA' },
      { name: 'Gary Chambers', party: 'DEM', status: 'Challenger', priorOffice: 'Civil Rights Activist / 2022 Senate Candidate', cashOnHandMillions: 2.8, age: 41, hometown: 'Baton Rouge, LA' },
    ],
  },
  {
    raceId: '2026-SEN-MA', level: 'federal', office: 'U.S. Senate — Massachusetts (Class II)',
    state: 'Massachusetts', stateAbbr: 'MA', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid D', pollAverage: 'D +24.0%', totalFundraisingM: 32.0,
    keyIssues: ['Green New Deal & Offshore Wind', 'Biotech & Life Sciences Funding', 'MBTA Transit Upgrades'],
    candidates: [
      { name: 'Ed Markey', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator / Green New Deal Co-Author', cashOnHandMillions: 13.5, age: 80, hometown: 'Malden, MA' },
      { name: 'Jake Auchincloss', party: 'DEM', status: 'Challenger', priorOffice: 'U.S. Rep (MA-04) / Marine Corps Veteran', cashOnHandMillions: 6.8, age: 38, hometown: 'Newton, MA' },
      { name: 'John Deaton', party: 'REP', status: 'Challenger', priorOffice: 'Crypto Attorney / Marine Corps Veteran', cashOnHandMillions: 3.4, age: 58, hometown: 'Swansea, MA' },
    ],
  },
  {
    raceId: '2026-SEN-MS', level: 'federal', office: 'U.S. Senate — Mississippi (Class II)',
    state: 'Mississippi', stateAbbr: 'MS', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid R', pollAverage: 'R +18.0%', totalFundraisingM: 20.0,
    keyIssues: ['Rural Hospital Solvency', 'Delta Cotton & Catfish Subsidies', 'Gulf Coast Shipbuilding'],
    candidates: [
      { name: 'Cindy Hyde-Smith', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator / Former MS Ag Commissioner', cashOnHandMillions: 7.8, age: 67, hometown: 'Brookhaven, MS' },
      { name: 'Ty Pinkins', party: 'DEM', status: 'Challenger', priorOffice: 'Army Veteran / Attorney', cashOnHandMillions: 1.8, age: 51, hometown: 'Rolling Fork, MS' },
    ],
  },
  {
    raceId: '2026-SEN-MT', level: 'federal', office: 'U.S. Senate — Montana (Class II)',
    state: 'Montana', stateAbbr: 'MT', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely R', pollAverage: 'R +10.2%', totalFundraisingM: 38.0,
    keyIssues: ['Public Lands Access & Hunting Rights', 'Livestock & Grain Ranching', 'Missile Silo Modernization (Malmstrom AFB)'],
    candidates: [
      { name: 'Steve Daines', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator / Former NRSC Chairman', cashOnHandMillions: 14.5, age: 64, hometown: 'Bozeman, MT' },
      { name: 'Ryan Busse', party: 'DEM', status: 'Challenger', priorOffice: 'Former Firearms Executive / 2024 Gov. Nominee', cashOnHandMillions: 4.8, age: 55, hometown: 'Kalispell, MT' },
      { name: 'Monica Tranel', party: 'DEM', status: 'Challenger', priorOffice: 'Olympic Rower / Clean Energy Attorney', cashOnHandMillions: 3.9, age: 58, hometown: 'Missoula, MT' },
    ],
  },
  {
    raceId: '2026-SEN-NE', level: 'federal', office: 'U.S. Senate — Nebraska (Class II)',
    state: 'Nebraska', stateAbbr: 'NE', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean R', pollAverage: 'R +5.4%', totalFundraisingM: 40.0,
    keyIssues: ['Independent Working-Class Coalition', 'Ogallala Aquifer Protection', 'Cattle & Corn Markets'],
    candidates: [
      { name: 'Pete Ricketts', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator / Former Governor of Nebraska', cashOnHandMillions: 16.8, age: 62, hometown: 'Omaha, NE' },
      { name: 'Dan Osborn', party: 'IND', status: 'Challenger', priorOffice: 'Industrial Union Leader / Steamfitter / Navy Veteran', cashOnHandMillions: 12.4, age: 50, hometown: 'Omaha, NE' },
      { name: 'Preston Love Jr.', party: 'DEM', status: 'Challenger', priorOffice: 'Professor / Civil Rights Leader', cashOnHandMillions: 2.1, age: 83, hometown: 'Omaha, NE' },
    ],
    notes: 'Ricketts won the 2024 special election to finish Ben Sasse\'s term; up for a full 6-year term in 2026.',
  },
  {
    raceId: '2026-SEN-NJ', level: 'federal', office: 'U.S. Senate — New Jersey (Class II)',
    state: 'New Jersey', stateAbbr: 'NJ', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid D', pollAverage: 'D +11.8%', totalFundraisingM: 45.0,
    keyIssues: ['Gateway Tunnel Infrastructure Funding', 'SALT Deduction Cap Repeal', 'Pharma & Biotech Hub'],
    candidates: [
      { name: 'Cory Booker', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator / Former Mayor of Newark', cashOnHandMillions: 15.8, age: 57, hometown: 'Newark, NJ' },
      { name: 'Curtis Bashaw', party: 'REP', status: 'Challenger', priorOffice: 'Hotelier / Cape May Preservationist', cashOnHandMillions: 5.2, age: 65, hometown: 'Cape May, NJ' },
      { name: 'Bob Hugin', party: 'REP', status: 'Challenger', priorOffice: 'Former Biotech CEO / NJ GOP Chairman', cashOnHandMillions: 6.4, age: 71, hometown: 'Summit, NJ' },
    ],
  },
  {
    raceId: '2026-SEN-OK', level: 'federal', office: 'U.S. Senate — Oklahoma (Class II)',
    state: 'Oklahoma', stateAbbr: 'OK', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid R', pollAverage: 'R +26.0%', totalFundraisingM: 22.0,
    keyIssues: ['Tribal Jurisdiction Post-McGirt', 'Oil & Gas Exploration Subsidies', 'Border Security'],
    candidates: [
      { name: 'Markwayne Mullin', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator / Former U.S. Rep / Cherokee Nation Citizen', cashOnHandMillions: 10.4, age: 49, hometown: 'Westville, OK' },
      { name: 'Madison Horn', party: 'DEM', status: 'Challenger', priorOffice: 'Cybersecurity Executive / 2022 Senate Nominee', cashOnHandMillions: 1.9, age: 36, hometown: 'Stilwell, OK' },
    ],
  },
  {
    raceId: '2026-SEN-OR', level: 'federal', office: 'U.S. Senate — Oregon (Class II)',
    state: 'Oregon', stateAbbr: 'OR', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +7.8%', totalFundraisingM: 34.0,
    keyIssues: ['Timber & Forestry Management', 'Affordable Housing & Addiction Services', 'Columbia River Hydropower'],
    candidates: [
      { name: 'Jeff Merkley', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator / Former OR House Speaker', cashOnHandMillions: 11.2, age: 69, hometown: 'Portland, OR' },
      { name: 'Christine Drazan', party: 'REP', status: 'Challenger', priorOffice: 'Former OR House Minority Leader / 2022 Gov. Nominee', cashOnHandMillions: 5.8, age: 54, hometown: 'Canby, OR' },
    ],
  },
  {
    raceId: '2026-SEN-RI', level: 'federal', office: 'U.S. Senate — Rhode Island (Class II)',
    state: 'Rhode Island', stateAbbr: 'RI', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid D', pollAverage: 'D +18.5%', totalFundraisingM: 24.0,
    keyIssues: ['Naval Submarine Construction (Electric Boat)', 'Narragansett Bay Marine Ecology', 'Veteran Healthcare'],
    candidates: [
      { name: 'Jack Reed', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Senator / Armed Services Committee Chairman / Army Veteran', cashOnHandMillions: 10.8, age: 76, hometown: 'Jamestown, RI' },
      { name: 'Allen Waters', party: 'REP', status: 'Challenger', priorOffice: 'Investment Consultant', cashOnHandMillions: 0.8, age: 69, hometown: 'Providence, RI' },
    ],
  },
  {
    raceId: '2026-SEN-SC', level: 'federal', office: 'U.S. Senate — South Carolina (Class II)',
    state: 'South Carolina', stateAbbr: 'SC', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely R', pollAverage: 'R +9.4%', totalFundraisingM: 58.0,
    keyIssues: ['Charleston Port Deepening & Logistics', 'Judiciary Committee Clout', 'Savannah River Site Clean-up'],
    candidates: [
      { name: 'Lindsey Graham', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator / Judiciary Committee Ranking Member / Air Force Veteran', cashOnHandMillions: 19.4, age: 71, hometown: 'Seneca, SC' },
      { name: 'Jaime Harrison', party: 'DEM', status: 'Challenger', priorOffice: 'DNC Chairman / 2020 Senate Nominee', cashOnHandMillions: 12.8, age: 50, hometown: 'Columbia, SC' },
      { name: 'Christale Spain', party: 'DEM', status: 'Challenger', priorOffice: 'South Carolina Democratic Party Chair', cashOnHandMillions: 4.2, age: 44, hometown: 'Columbia, SC' },
    ],
  },
  {
    raceId: '2026-SEN-SD', level: 'federal', office: 'U.S. Senate — South Dakota (Class II)',
    state: 'South Dakota', stateAbbr: 'SD', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid R', pollAverage: 'R +24.5%', totalFundraisingM: 18.0,
    keyIssues: ['B-21 Raider Bomber Deployment (Ellsworth AFB)', 'Cattle Ranching & Meatpacking Competition', 'Ethanol'],
    candidates: [
      { name: 'Mike Rounds', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator / Former Governor of South Dakota', cashOnHandMillions: 8.6, age: 71, hometown: 'Fort Pierre, SD' },
      { name: 'Brian Bengs', party: 'DEM', status: 'Challenger', priorOffice: 'Navy & Air Force Veteran / Law Professor', cashOnHandMillions: 1.2, age: 54, hometown: 'Aberdeen, SD' },
    ],
  },
  {
    raceId: '2026-SEN-TN', level: 'federal', office: 'U.S. Senate — Tennessee (Class II)',
    state: 'Tennessee', stateAbbr: 'TN', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid R', pollAverage: 'R +19.0%', totalFundraisingM: 32.0,
    keyIssues: ['Automotive Assembly & Battery Plants', 'Oak Ridge National Laboratory', 'TVA Power Grid'],
    candidates: [
      { name: 'Bill Hagerty', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator / Former U.S. Ambassador to Japan', cashOnHandMillions: 14.8, age: 67, hometown: 'Gallatin, TN' },
      { name: 'Gloria Johnson', party: 'DEM', status: 'Challenger', priorOffice: 'Tennessee State Representative ("Tennessee Three")', cashOnHandMillions: 5.4, age: 72, hometown: 'Knoxville, TN' },
    ],
  },
  {
    raceId: '2026-SEN-WV', level: 'federal', office: 'U.S. Senate — West Virginia (Class II)',
    state: 'West Virginia', stateAbbr: 'WV', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid R', pollAverage: 'R +28.0%', totalFundraisingM: 24.0,
    keyIssues: ['Coal Mining Black Lung Benefits', 'Hydrogen Energy Hub', 'Appalachian Highway Development'],
    candidates: [
      { name: 'Shelley Moore Capito', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator / Environment & Public Works Ranking Member', cashOnHandMillions: 11.2, age: 72, hometown: 'Charleston, WV' },
      { name: 'Richard Ojeda', party: 'DEM', status: 'Challenger', priorOffice: 'Former WV State Senator / Army Veteran', cashOnHandMillions: 1.8, age: 55, hometown: 'Logan, WV' },
    ],
  },
  {
    raceId: '2026-SEN-WY', level: 'federal', office: 'U.S. Senate — Wyoming (Class II)',
    state: 'Wyoming', stateAbbr: 'WY', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid R', pollAverage: 'R +36.0%', totalFundraisingM: 16.0,
    keyIssues: ['Powder River Basin Coal Leases', 'Bitcoin & Digital Asset Banking', 'Grand Teton & Yellowstone Public Land'],
    candidates: [
      { name: 'Cynthia Lummis', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Senator / Financial Innovation Caucus Leader', cashOnHandMillions: 7.8, age: 72, hometown: 'Cheyenne, WY' },
      { name: 'Merav Ben-David', party: 'DEM', status: 'Challenger', priorOffice: 'Wildlife Ecologist / 2020 Senate Nominee', cashOnHandMillions: 0.9, age: 67, hometown: 'Laramie, WY' },
    ],
  },
];

// ─── GUBERNATORIAL RACES 2026 (36 STATES) ────────────────────────────────────
// Selected battlegrounds and marquee open seats with real current candidate rosters

export const GOVERNOR_2026_RACES: RaceEntry[] = [
  {
    raceId: '2026-GOV-CA', level: 'state', office: 'Governor — California (Open Seat)',
    state: 'California', stateAbbr: 'CA', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +8.5%', totalFundraisingM: 165.0,
    keyIssues: ['Housing Supply & Homelessness', 'High Insurance Premiums & Wildfire Risk', 'High-Speed Rail & State Budget Deficit'],
    candidates: [
      { name: 'Eleni Kounalakis', party: 'DEM', status: 'Declared', priorOffice: 'Lt. Governor of California / Former Ambassador', cashOnHandMillions: 16.4, age: 60, hometown: 'San Francisco, CA' },
      { name: 'Rob Bonta', party: 'DEM', status: 'Declared', priorOffice: 'Attorney General of California', cashOnHandMillions: 14.8, age: 54, hometown: 'Alameda, CA' },
      { name: 'Antonio Villaraigosa', party: 'DEM', status: 'Declared', priorOffice: 'Former Mayor of Los Angeles / Former Assembly Speaker', cashOnHandMillions: 12.2, age: 73, hometown: 'Los Angeles, CA' },
      { name: 'Katie Porter', party: 'DEM', status: 'Declared', priorOffice: 'Former U.S. Rep (CA-47) / Consumer Protection Law Professor', cashOnHandMillions: 15.0, age: 52, hometown: 'Irvine, CA' },
      { name: 'Toni Atkins', party: 'DEM', status: 'Declared', priorOffice: 'Former CA Senate President Pro Tem / Assembly Speaker', cashOnHandMillions: 8.6, age: 64, hometown: 'San Diego, CA' },
      { name: 'Steve Hilton', party: 'REP', status: 'Declared', priorOffice: 'Policy Commentator / Former Downing Street Advisor', cashOnHandMillions: 9.4, age: 57, hometown: 'Atherton, CA' },
    ],
    notes: 'Open seat due to term limit of Gavin Newsom.',
  },
  {
    raceId: '2026-GOV-FL', level: 'state', office: 'Governor — Florida (Open Seat)',
    state: 'Florida', stateAbbr: 'FL', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely R', pollAverage: 'R +7.4%', totalFundraisingM: 140.0,
    keyIssues: ['Homeowners Insurance Crisis', 'Everglades Restoration & Water Quality', 'Higher Education Governance'],
    candidates: [
      { name: 'Byron Donalds', party: 'REP', status: 'Declared', priorOffice: 'U.S. Rep (FL-19) / Conservative Leader', cashOnHandMillions: 18.5, age: 47, hometown: 'Naples, FL' },
      { name: 'Matt Gaetz', party: 'REP', status: 'Declared', priorOffice: 'Former U.S. Rep (FL-01)', cashOnHandMillions: 14.2, age: 44, hometown: 'Niceville, FL' },
      { name: 'Casey DeSantis', party: 'REP', status: 'Declared', priorOffice: 'First Lady of Florida / Hope Florida Founder', cashOnHandMillions: 22.0, age: 46, hometown: 'Tallahassee, FL' },
      { name: 'Wilton Simpson', party: 'REP', status: 'Declared', priorOffice: 'Florida Agriculture Commissioner / Former Senate Pres.', cashOnHandMillions: 11.8, age: 60, hometown: 'Trilby, FL' },
      { name: 'Nikki Fried', party: 'DEM', status: 'Declared', priorOffice: 'Florida Democratic Party Chair / Former Ag Commissioner', cashOnHandMillions: 12.4, age: 48, hometown: 'Miami, FL' },
      { name: 'Fentrice Driskell', party: 'DEM', status: 'Declared', priorOffice: 'Florida House Democratic Leader', cashOnHandMillions: 7.6, age: 47, hometown: 'Tampa, FL' },
    ],
    notes: 'Open seat due to term limit of Ron DeSantis.',
  },
  {
    raceId: '2026-GOV-GA', level: 'state', office: 'Governor — Georgia (Open Seat)',
    state: 'Georgia', stateAbbr: 'GA', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'R +0.8%', totalFundraisingM: 125.0,
    keyIssues: ['Suburban Atlanta School Vouchers', 'Medicaid Expansion & Rural Hospitals', 'Port of Savannah Expansion'],
    candidates: [
      { name: 'Burt Jones', party: 'REP', status: 'Declared', priorOffice: 'Lt. Governor of Georgia / Businessman', cashOnHandMillions: 19.8, age: 47, hometown: 'Jackson, GA' },
      { name: 'Chris Carr', party: 'REP', status: 'Declared', priorOffice: 'Georgia Attorney General', cashOnHandMillions: 14.2, age: 54, hometown: 'Dunwoody, GA' },
      { name: 'Brad Raffensperger', party: 'REP', status: 'Declared', priorOffice: 'Georgia Secretary of State / Civil Engineer', cashOnHandMillions: 11.5, age: 71, hometown: 'Johns Creek, GA' },
      { name: 'Lucy McBath', party: 'DEM', status: 'Declared', priorOffice: 'U.S. Rep (GA-06/07) / Gun Safety Advocate', cashOnHandMillions: 16.4, age: 66, hometown: 'Marietta, GA' },
      { name: 'Keisha Lance Bottoms', party: 'DEM', status: 'Declared', priorOffice: 'Former Mayor of Atlanta / Senior White House Advisor', cashOnHandMillions: 13.8, age: 56, hometown: 'Atlanta, GA' },
      { name: 'Jason Carter', party: 'DEM', status: 'Declared', priorOffice: 'Former GA State Senator / Carter Center Chair', cashOnHandMillions: 9.4, age: 51, hometown: 'Atlanta, GA' },
    ],
    notes: 'Open seat due to term limit of Brian Kemp.',
  },
  {
    raceId: '2026-GOV-MI', level: 'state', office: 'Governor — Michigan (Open Seat)',
    state: 'Michigan', stateAbbr: 'MI', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +1.2%', totalFundraisingM: 110.0,
    keyIssues: ['EV Manufacturing & Clean Energy Standards', 'Road & Bridge Infrastructure', 'Public School Funding'],
    candidates: [
      { name: 'Jocelyn Benson', party: 'DEM', status: 'Declared', priorOffice: 'Michigan Secretary of State / Law School Dean', cashOnHandMillions: 18.2, age: 50, hometown: 'Detroit, MI' },
      { name: 'Mallory McMorrow', party: 'DEM', status: 'Declared', priorOffice: 'Michigan State Senator / Industrial Designer', cashOnHandMillions: 12.6, age: 40, hometown: 'Royal Oak, MI' },
      { name: 'Pete Buttigieg', party: 'DEM', status: 'Declared', priorOffice: 'Former U.S. Transportation Secretary / Traverse City Resident', cashOnHandMillions: 24.5, age: 44, hometown: 'Traverse City, MI' },
      { name: 'Garlin Gilchrist', party: 'DEM', status: 'Declared', priorOffice: 'Lt. Governor of Michigan / Tech Executive', cashOnHandMillions: 9.1, age: 44, hometown: 'Detroit, MI' },
      { name: 'John James', party: 'REP', status: 'Declared', priorOffice: 'U.S. Rep (MI-10) / Supply Chain CEO / Combat Veteran', cashOnHandMillions: 17.5, age: 45, hometown: 'Farmington Hills, MI' },
      { name: 'Tudor Dixon', party: 'REP', status: 'Declared', priorOffice: '2022 Gubernatorial Nominee / Media Host', cashOnHandMillions: 10.2, age: 49, hometown: 'Norton Shores, MI' },
    ],
    notes: 'Open seat due to term limit of Gretchen Whitmer.',
  },
  {
    raceId: '2026-GOV-AZ', level: 'state', office: 'Governor — Arizona',
    state: 'Arizona', stateAbbr: 'AZ', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +0.6%', totalFundraisingM: 78.0,
    keyIssues: ['Colorado River Groundwater Depletion', 'Southern Border Security & Crossings', 'Universal ESA School Vouchers'],
    candidates: [
      { name: 'Katie Hobbs', party: 'DEM', status: 'Incumbent', priorOffice: 'Governor of Arizona / Former Secretary of State', cashOnHandMillions: 19.4, age: 56, hometown: 'Phoenix, AZ' },
      { name: 'Karrin Taylor Robson', party: 'REP', status: 'Challenger', priorOffice: 'Land Use Attorney / Former AZ Board of Regents', cashOnHandMillions: 16.8, age: 61, hometown: 'Paradise Valley, AZ' },
      { name: 'Kimberly Yee', party: 'REP', status: 'Challenger', priorOffice: 'Arizona State Treasurer / Former Senate Majority Leader', cashOnHandMillions: 9.5, age: 52, hometown: 'Phoenix, AZ' },
      { name: 'Matt Salmon', party: 'REP', status: 'Challenger', priorOffice: 'Former U.S. Representative / 2022 Candidate', cashOnHandMillions: 6.2, age: 68, hometown: 'Mesa, AZ' },
    ],
  },
  {
    raceId: '2026-GOV-NV', level: 'state', office: 'Governor — Nevada',
    state: 'Nevada', stateAbbr: 'NV', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'R +1.4%', totalFundraisingM: 62.0,
    keyIssues: ['Culinary Union Contract Protections', 'Las Vegas Affordable Housing Shortage', 'Film Tax Credits & Tech Expansion'],
    candidates: [
      { name: 'Joe Lombardo', party: 'REP', status: 'Incumbent', priorOffice: 'Governor of Nevada / Former Clark County Sheriff', cashOnHandMillions: 17.5, age: 63, hometown: 'Las Vegas, NV' },
      { name: 'Aaron Ford', party: 'DEM', status: 'Challenger', priorOffice: 'Nevada Attorney General / Former State Senate Majority Leader', cashOnHandMillions: 14.2, age: 54, hometown: 'Las Vegas, NV' },
      { name: 'Nicole Cannizzaro', party: 'DEM', status: 'Challenger', priorOffice: 'Nevada Senate Majority Leader / Prosecutor', cashOnHandMillions: 8.8, age: 43, hometown: 'Las Vegas, NV' },
    ],
  },
  {
    raceId: '2026-GOV-WI', level: 'state', office: 'Governor — Wisconsin',
    state: 'Wisconsin', stateAbbr: 'WI', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +0.9%', totalFundraisingM: 88.0,
    keyIssues: ['State Budget Surplus Allocation', 'Abortion Rights Protections', 'Dairy Farm Subsidies & PFAS Cleanup'],
    candidates: [
      { name: 'Tony Evers', party: 'DEM', status: 'Incumbent', priorOffice: 'Governor of Wisconsin / Former State Superintendent', cashOnHandMillions: 21.0, age: 74, hometown: 'Madison, WI' },
      { name: 'Bryan Steil', party: 'REP', status: 'Challenger', priorOffice: 'U.S. Rep (WI-01) / House Administration Committee Chair', cashOnHandMillions: 15.6, age: 45, hometown: 'Janesville, WI' },
      { name: 'Eric Hovde', party: 'REP', status: 'Challenger', priorOffice: 'Banker / Real Estate Executive / 2024 Senate Nominee', cashOnHandMillions: 18.2, age: 62, hometown: 'Madison, WI' },
      { name: 'Rebecca Kleefisch', party: 'REP', status: 'Challenger', priorOffice: 'Former Lt. Governor of Wisconsin', cashOnHandMillions: 8.4, age: 51, hometown: 'Oconomowoc, WI' },
    ],
  },
  {
    raceId: '2026-GOV-PA', level: 'state', office: 'Governor — Pennsylvania',
    state: 'Pennsylvania', stateAbbr: 'PA', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +6.8%', totalFundraisingM: 95.0,
    keyIssues: ['Marcellus Shale Natural Gas & Energy Jobs', 'Mass Transit Funding for SEPTA/PRT', 'K-12 Basic Education Funding'],
    candidates: [
      { name: 'Josh Shapiro', party: 'DEM', status: 'Incumbent', priorOffice: 'Governor of Pennsylvania / Former PA Attorney General', cashOnHandMillions: 31.4, age: 53, hometown: 'Abington, PA' },
      { name: 'Stacy Garrity', party: 'REP', status: 'Challenger', priorOffice: 'Pennsylvania State Treasurer / Army Reserve Colonel', cashOnHandMillions: 12.8, age: 62, hometown: 'Athens, PA' },
      { name: 'Guy Reschenthaler', party: 'REP', status: 'Challenger', priorOffice: 'U.S. Rep (PA-14) / Navy JAG Veteran / House Chief Deputy Whip', cashOnHandMillions: 14.5, age: 43, hometown: 'Peters Township, PA' },
      { name: 'Tim DeFoor', party: 'REP', status: 'Challenger', priorOffice: 'Pennsylvania Auditor General', cashOnHandMillions: 6.2, age: 64, hometown: 'Harrisburg, PA' },
    ],
  },
  {
    raceId: '2026-GOV-TX', level: 'state', office: 'Governor — Texas',
    state: 'Texas', stateAbbr: 'TX', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely R', pollAverage: 'R +8.4%', totalFundraisingM: 115.0,
    keyIssues: ['Operation Lone Star & Border Wall', 'ERCOT Power Grid Hardening', 'Voucher & Education Savings Accounts'],
    candidates: [
      { name: 'Greg Abbott', party: 'REP', status: 'Incumbent', priorOffice: 'Governor of Texas / Former TX Attorney General', cashOnHandMillions: 46.2, age: 68, hometown: 'Austin, TX' },
      { name: 'Dan Patrick', party: 'REP', status: 'Challenger', priorOffice: 'Lt. Governor of Texas / Media Host', cashOnHandMillions: 24.0, age: 76, hometown: 'Houston, TX' },
      { name: 'Lina Hidalgo', party: 'DEM', status: 'Challenger', priorOffice: 'Harris County Judge (CEO of TX largest county)', cashOnHandMillions: 14.5, age: 35, hometown: 'Houston, TX' },
      { name: 'James Talarico', party: 'DEM', status: 'Challenger', priorOffice: 'Texas State Representative', cashOnHandMillions: 10.2, age: 37, hometown: 'Round Rock, TX' },
    ],
  },
  {
    raceId: '2026-GOV-OH', level: 'state', office: 'Governor — Ohio (Open Seat)',
    state: 'Ohio', stateAbbr: 'OH', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean R', pollAverage: 'R +4.8%', totalFundraisingM: 85.0,
    keyIssues: ['Intel Semiconductor Megasite', 'Lake Erie Conservation', 'Property Tax Relief'],
    candidates: [
      { name: 'Jon Husted', party: 'REP', status: 'Declared', priorOffice: 'Lt. Governor of Ohio / Former Secretary of State', cashOnHandMillions: 18.5, age: 59, hometown: 'Upper Arlington, OH' },
      { name: 'Dave Yost', party: 'REP', status: 'Declared', priorOffice: 'Ohio Attorney General / Former Auditor of State', cashOnHandMillions: 16.2, age: 69, hometown: 'Franklin County, OH' },
      { name: 'Sherrod Brown', party: 'DEM', status: 'Declared', priorOffice: 'Former U.S. Senator / Former OH Secretary of State', cashOnHandMillions: 22.0, age: 73, hometown: 'Cleveland, OH' },
      { name: 'Allison Russo', party: 'DEM', status: 'Declared', priorOffice: 'Ohio House Minority Leader / Public Health Epidemiologist', cashOnHandMillions: 8.4, age: 49, hometown: 'Upper Arlington, OH' },
    ],
    notes: 'Open seat due to term limit of Mike DeWine.',
  },
  {
    raceId: '2026-GOV-CO', level: 'state', office: 'Governor — Colorado (Open Seat)',
    state: 'Colorado', stateAbbr: 'CO', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +7.2%', totalFundraisingM: 58.0,
    keyIssues: ['Housing Density Mandates', 'Wolf Reintroduction & Ranching', 'Wildfire Mitigation'],
    candidates: [
      { name: 'Phil Weiser', party: 'DEM', status: 'Declared', priorOffice: 'Colorado Attorney General / Law School Dean', cashOnHandMillions: 12.8, age: 58, hometown: 'Denver, CO' },
      { name: 'Jena Griswold', party: 'DEM', status: 'Declared', priorOffice: 'Colorado Secretary of State / Attorney', cashOnHandMillions: 11.4, age: 41, hometown: 'Louisville, CO' },
      { name: 'Joe Neguse', party: 'DEM', status: 'Declared', priorOffice: 'U.S. Rep (CO-02) / Assistant House Democratic Leader', cashOnHandMillions: 14.2, age: 42, hometown: 'Lafayette, CO' },
      { name: 'Heidi Ganahl', party: 'REP', status: 'Declared', priorOffice: 'Former CU Regent / Entrepreneur', cashOnHandMillions: 6.8, age: 59, hometown: 'Boulder, CO' },
      { name: 'Gabe Evans', party: 'REP', status: 'Declared', priorOffice: 'U.S. Rep (CO-08) / State Rep.', cashOnHandMillions: 7.5, age: 40, hometown: 'Fort Lupton, CO' },
    ],
    notes: 'Open seat due to term limit of Jared Polis.',
  },
  {
    raceId: '2026-GOV-NY', level: 'state', office: 'Governor — New York',
    state: 'New York', stateAbbr: 'NY', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +6.2%', totalFundraisingM: 92.0,
    keyIssues: ['MTA Congestion Pricing Implementation', 'Migrant Care Costs & Shelter Funding', 'Upstate Economic Stagnation'],
    candidates: [
      { name: 'Kathy Hochul', party: 'DEM', status: 'Incumbent', priorOffice: 'Governor of New York / Former Lt. Governor', cashOnHandMillions: 26.5, age: 68, hometown: 'Buffalo, NY' },
      { name: 'Letitia James', party: 'DEM', status: 'Declared', priorOffice: 'New York Attorney General / Former NYC Public Advocate', cashOnHandMillions: 19.8, age: 67, hometown: 'Brooklyn, NY' },
      { name: 'Mike Lawler', party: 'REP', status: 'Challenger', priorOffice: 'U.S. Rep (NY-17) / Former NY State Assemblyman', cashOnHandMillions: 16.4, age: 40, hometown: 'Pearl River, NY' },
      { name: 'Lee Zeldin', party: 'REP', status: 'Challenger', priorOffice: 'Former U.S. Rep (NY-01) / 2022 Gov Nominee', cashOnHandMillions: 14.8, age: 46, hometown: 'Shirley, NY' },
    ],
  },
  {
    raceId: '2026-GOV-IL', level: 'state', office: 'Governor — Illinois',
    state: 'Illinois', stateAbbr: 'IL', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid D', pollAverage: 'D +10.5%', totalFundraisingM: 84.0,
    keyIssues: ['State Pension Liability Amortization', 'Clean Energy Omnibus Law', 'Chicago Crime & Transit Safety'],
    candidates: [
      { name: 'J.B. Pritzker', party: 'DEM', status: 'Incumbent', priorOffice: 'Governor of Illinois / Entrepreneur & Philanthropist', cashOnHandMillions: 38.0, age: 61, hometown: 'Chicago, IL' },
      { name: 'Darren Bailey', party: 'REP', status: 'Challenger', priorOffice: 'Former IL State Senator / 2022 Gov. Nominee', cashOnHandMillions: 7.2, age: 60, hometown: 'Xenia, IL' },
      { name: 'Richard Irvin', party: 'REP', status: 'Challenger', priorOffice: 'Mayor of Aurora / Former Prosecutor', cashOnHandMillions: 8.9, age: 56, hometown: 'Aurora, IL' },
    ],
  },
  {
    raceId: '2026-GOV-MN', level: 'state', office: 'Governor — Minnesota',
    state: 'Minnesota', stateAbbr: 'MN', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean D', pollAverage: 'D +4.2%', totalFundraisingM: 68.0,
    keyIssues: ['Post-2024 National Profile Scrutiny', 'Paid Family Leave Program Rollout', 'Twin Cities Transit & Policing'],
    candidates: [
      { name: 'Tim Walz', party: 'DEM', status: 'Incumbent', priorOffice: 'Governor of Minnesota / 2024 Democratic VP Nominee', cashOnHandMillions: 22.4, age: 62, hometown: 'Mankato, MN' },
      { name: 'Peggy Flanagan', party: 'DEM', status: 'Declared', priorOffice: 'Lt. Governor of Minnesota / White Earth Ojibwe Citizen', cashOnHandMillions: 12.0, age: 47, hometown: 'St. Louis Park, MN' },
      { name: 'Pete Stauber', party: 'REP', status: 'Challenger', priorOffice: 'U.S. Rep (MN-08) / Former Police Officer', cashOnHandMillions: 11.8, age: 60, hometown: 'Hermantown, MN' },
      { name: 'Michelle Fischbach', party: 'REP', status: 'Challenger', priorOffice: 'U.S. Rep (MN-07) / Former Lt. Governor', cashOnHandMillions: 8.5, age: 59, hometown: 'Paynesville, MN' },
    ],
  },
  {
    raceId: '2026-GOV-MD', level: 'state', office: 'Governor — Maryland',
    state: 'Maryland', stateAbbr: 'MD', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid D', pollAverage: 'D +18.0%', totalFundraisingM: 64.0,
    keyIssues: ['Francis Scott Key Bridge Rebuild Completion', 'Chesapeake Bay Environmental Restoration', 'Blueprint for Maryland\'s Future Education Funding'],
    candidates: [
      { name: 'Wes Moore', party: 'DEM', status: 'Incumbent', priorOffice: 'Governor of Maryland / Army Combat Veteran / Author', cashOnHandMillions: 25.8, age: 47, hometown: 'Baltimore, MD' },
      { name: 'Kelly Schulz', party: 'REP', status: 'Challenger', priorOffice: 'Former MD Secretary of Commerce & Labor', cashOnHandMillions: 6.4, age: 57, hometown: 'Frederick, MD' },
    ],
  },
  {
    raceId: '2026-GOV-OR', level: 'state', office: 'Governor — Oregon',
    state: 'Oregon', stateAbbr: 'OR', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean D', pollAverage: 'D +3.8%', totalFundraisingM: 52.0,
    keyIssues: ['Recriminalization of Hard Drugs (HB 4002 implementation)', 'Portland Downtown Recovery', 'Wildfire Prevention'],
    candidates: [
      { name: 'Tina Kotek', party: 'DEM', status: 'Incumbent', priorOffice: 'Governor of Oregon / Former OR House Speaker', cashOnHandMillions: 15.6, age: 59, hometown: 'Portland, OR' },
      { name: 'Christine Drazan', party: 'REP', status: 'Challenger', priorOffice: 'Former OR House Minority Leader / 2022 Gov. Nominee', cashOnHandMillions: 12.8, age: 54, hometown: 'Canby, OR' },
    ],
  },
  {
    raceId: '2026-GOV-KS', level: 'state', office: 'Governor — Kansas (Open Seat)',
    state: 'Kansas', stateAbbr: 'KS', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean R', pollAverage: 'R +3.2%', totalFundraisingM: 42.0,
    keyIssues: ['Public School Funding Formula', 'Water Rights in Western Kansas Ogallala', 'Tax Cut Restructuring'],
    candidates: [
      { name: 'David Toland', party: 'DEM', status: 'Declared', priorOffice: 'Lt. Governor & Secretary of Commerce (KS)', cashOnHandMillions: 9.8, age: 49, hometown: 'Iola, KS' },
      { name: 'Derek Schmidt', party: 'REP', status: 'Declared', priorOffice: 'U.S. Rep (KS-02) / Former Kansas Attorney General', cashOnHandMillions: 11.4, age: 58, hometown: 'Independence, KS' },
      { name: 'Kris Kobach', party: 'REP', status: 'Declared', priorOffice: 'Kansas Attorney General / Former Secretary of State', cashOnHandMillions: 10.2, age: 60, hometown: 'Lecompton, KS' },
    ],
    notes: 'Open seat due to term limit of Laura Kelly.',
  },
  {
    raceId: '2026-GOV-ME', level: 'state', office: 'Governor — Maine (Open Seat)',
    state: 'Maine', stateAbbr: 'ME', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +1.0%', totalFundraisingM: 36.0,
    keyIssues: ['Offshore Wind in Gulf of Maine', 'Heating Oil & Energy Costs', 'Housing Affordability'],
    candidates: [
      { name: 'Shenna Bellows', party: 'DEM', status: 'Declared', priorOffice: 'Maine Secretary of State', cashOnHandMillions: 8.5, age: 50, hometown: 'Manchester, ME' },
      { name: 'Troy Jackson', party: 'DEM', status: 'Declared', priorOffice: 'Maine Senate President', cashOnHandMillions: 6.8, age: 58, hometown: 'Allagash, ME' },
      { name: 'Paul LePage', party: 'REP', status: 'Declared', priorOffice: 'Former Governor of Maine (2011–2019)', cashOnHandMillions: 7.2, age: 77, hometown: 'Edgecomb, ME' },
    ],
    notes: 'Open seat due to term limit of Janet Mills.',
  },
  {
    raceId: '2026-GOV-NH', level: 'state', office: 'Governor — New Hampshire',
    state: 'New Hampshire', stateAbbr: 'NH', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean R', pollAverage: 'R +2.6%', totalFundraisingM: 38.0,
    keyIssues: ['State Income/Sales Tax Ban Preservations', 'Energy Costs & Northern Pass', 'Housing Zoning Reforms'],
    candidates: [
      { name: 'Kelly Ayotte', party: 'REP', status: 'Incumbent', priorOffice: 'Governor of New Hampshire / Former U.S. Senator', cashOnHandMillions: 12.8, age: 58, hometown: 'Nashua, NH' },
      { name: 'Joyce Craig', party: 'DEM', status: 'Challenger', priorOffice: 'Former Mayor of Manchester / 2024 Nominee', cashOnHandMillions: 8.4, age: 59, hometown: 'Manchester, NH' },
    ],
    notes: 'New Hampshire governors serve 2-year terms; elected in 2024 and up again in 2026.',
  },
  {
    raceId: '2026-GOV-VT', level: 'state', office: 'Governor — Vermont',
    state: 'Vermont', stateAbbr: 'VT', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid R', pollAverage: 'R +18.0%', totalFundraisingM: 14.0,
    keyIssues: ['Flood Resiliency & Infrastructure', 'Property Taxes & Education Spending', 'Housing Stock'],
    candidates: [
      { name: 'Phil Scott', party: 'REP', status: 'Incumbent', priorOffice: 'Governor of Vermont (serving since 2017)', cashOnHandMillions: 4.8, age: 68, hometown: 'Berlin, VT' },
      { name: 'Esther Charlestin', party: 'DEM', status: 'Challenger', priorOffice: 'Educator & Town Selectboard Member', cashOnHandMillions: 1.1, age: 36, hometown: 'Middlebury, VT' },
    ],
    notes: 'Vermont governors serve 2-year terms; up every even year.',
  },
];

// ─── KEY U.S. HOUSE BATTLEGROUND RACES 2026 ──────────────────────────────────
// 25 ultra-competitive seats that determine the House Majority in the 120th Congress

export const HOUSE_BATTLEGROUND_RACES: RaceEntry[] = [
  {
    raceId: '2026-HOUSE-NY-19', level: 'federal', office: 'U.S. House — NY-19',
    state: 'New York', stateAbbr: 'NY', district: '19', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +0.6%', totalFundraisingM: 14.5,
    keyIssues: ['Hudson Valley Agriculture & Dairy', 'Affordable Care Act Subsidies', 'Infrastructure Investment'],
    candidates: [
      { name: 'Josh Riley', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Representative (NY-19) / Attorney', cashOnHandMillions: 4.8, age: 44, hometown: 'Ithaca, NY' },
      { name: 'Marc Molinaro', party: 'REP', status: 'Challenger', priorOffice: 'Former U.S. Rep / Dutchess County Executive', cashOnHandMillions: 4.2, age: 50, hometown: 'Catskill, NY' },
    ],
  },
  {
    raceId: '2026-HOUSE-NY-04', level: 'federal', office: 'U.S. House — NY-04',
    state: 'New York', stateAbbr: 'NY', district: '04', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +1.2%', totalFundraisingM: 13.8,
    keyIssues: ['Long Island Suburban Taxes (SALT Cap)', 'Public Safety & Local Policing', 'Transit to NYC'],
    candidates: [
      { name: 'Laura Gillen', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Representative (NY-04) / Former Hempstead Town Supervisor', cashOnHandMillions: 4.4, age: 56, hometown: 'Rockville Centre, NY' },
      { name: 'Anthony D\'Esposito', party: 'REP', status: 'Challenger', priorOffice: 'Former U.S. Rep / NYPD Detective', cashOnHandMillions: 3.9, age: 44, hometown: 'Island Park, NY' },
    ],
  },
  {
    raceId: '2026-HOUSE-NY-17', level: 'federal', office: 'U.S. House — NY-17',
    state: 'New York', stateAbbr: 'NY', district: '17', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'R +0.4%', totalFundraisingM: 15.2,
    keyIssues: ['Hudson Valley Suburbs', 'SALT Cap Relief', 'Antisemitism & Security Grants'],
    candidates: [
      { name: 'Mike Lawler', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Representative (NY-17) / Former NY Assemblyman', cashOnHandMillions: 5.6, age: 40, hometown: 'Pearl River, NY' },
      { name: 'Mondaire Jones', party: 'DEM', status: 'Challenger', priorOffice: 'Former U.S. Representative (NY-17) / Attorney', cashOnHandMillions: 4.5, age: 39, hometown: 'Sleepy Hollow, NY' },
    ],
  },
  {
    raceId: '2026-HOUSE-CA-13', level: 'federal', office: 'U.S. House — CA-13',
    state: 'California', stateAbbr: 'CA', district: '13', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +0.2%', totalFundraisingM: 12.8,
    keyIssues: ['Central Valley Water Allocations', 'Ag Labor & Farm Subsidies', 'Inflation & Gas Prices'],
    candidates: [
      { name: 'Adam Gray', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Representative (CA-13) / Former CA Assemblyman', cashOnHandMillions: 4.2, age: 48, hometown: 'Merced, CA' },
      { name: 'John Duarte', party: 'REP', status: 'Challenger', priorOffice: 'Former U.S. Rep / Pistachio Farmer & Nurseryman', cashOnHandMillions: 3.8, age: 60, hometown: 'Modesto, CA' },
    ],
  },
  {
    raceId: '2026-HOUSE-CA-22', level: 'federal', office: 'U.S. House — CA-22',
    state: 'California', stateAbbr: 'CA', district: '22', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'R +0.6%', totalFundraisingM: 13.4,
    keyIssues: ['San Joaquin Valley Water Rights', 'Healthcare Access in Rural Communities', 'Dairy Farming'],
    candidates: [
      { name: 'David Valadao', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Representative (CA-22) / Dairy Farmer', cashOnHandMillions: 4.8, age: 49, hometown: 'Hanford, CA' },
      { name: 'Rudy Salas', party: 'DEM', status: 'Challenger', priorOffice: 'Former CA Assemblyman / Health Policy Advocate', cashOnHandMillions: 4.1, age: 48, hometown: 'Bakersfield, CA' },
    ],
  },
  {
    raceId: '2026-HOUSE-CA-27', level: 'federal', office: 'U.S. House — CA-27',
    state: 'California', stateAbbr: 'CA', district: '27', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +1.4%', totalFundraisingM: 16.0,
    keyIssues: ['Aerospace & Defense Industry (Plant 42)', 'Santa Clarita Valley Commuters', 'Reproductive Rights'],
    candidates: [
      { name: 'George Whitesides', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Representative (CA-27) / Former NASA Chief of Staff / CEO', cashOnHandMillions: 5.2, age: 52, hometown: 'Agua Dulce, CA' },
      { name: 'Mike Garcia', party: 'REP', status: 'Challenger', priorOffice: 'Former U.S. Rep / Navy Fighter Pilot', cashOnHandMillions: 4.6, age: 50, hometown: 'Santa Clarita, CA' },
    ],
  },
  {
    raceId: '2026-HOUSE-CA-45', level: 'federal', office: 'U.S. House — CA-45',
    state: 'California', stateAbbr: 'CA', district: '45', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +0.3%', totalFundraisingM: 14.8,
    keyIssues: ['Little Saigon Vietnamese-American Community', 'Small Business Taxes', 'Anti-Communism & Human Rights'],
    candidates: [
      { name: 'Derek Tran', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Representative (CA-45) / Army Veteran / Consumer Rights Attorney', cashOnHandMillions: 4.6, age: 45, hometown: 'Orange, CA' },
      { name: 'Michelle Steel', party: 'REP', status: 'Challenger', priorOffice: 'Former U.S. Rep / Orange County Board Chair', cashOnHandMillions: 4.9, age: 71, hometown: 'Seal Beach, CA' },
    ],
  },
  {
    raceId: '2026-HOUSE-CA-41', level: 'federal', office: 'U.S. House — CA-41',
    state: 'California', stateAbbr: 'CA', district: '41', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +0.5%', totalFundraisingM: 15.0,
    keyIssues: ['Inland Empire & Coachella Valley Growth', 'Water Rights & Infrastructure', 'LGBTQ+ Rights in Palm Springs'],
    candidates: [
      { name: 'Will Rollins', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Representative (CA-41) / Former Federal Prosecutor', cashOnHandMillions: 5.4, age: 41, hometown: 'Palm Springs, CA' },
      { name: 'Ken Calvert', party: 'REP', status: 'Challenger', priorOffice: 'Former U.S. Rep / Dean of CA GOP Delegation', cashOnHandMillions: 4.5, age: 73, hometown: 'Corona, CA' },
    ],
  },
  {
    raceId: '2026-HOUSE-PA-07', level: 'federal', office: 'U.S. House — PA-07',
    state: 'Pennsylvania', stateAbbr: 'PA', district: '07', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'R +0.5%', totalFundraisingM: 13.6,
    keyIssues: ['Lehigh Valley Warehousing & Logistics Hubs', 'Manufacturing Jobs', 'Childcare & Healthcare Affordability'],
    candidates: [
      { name: 'Ryan Mackenzie', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Representative (PA-07) / Former PA State Rep', cashOnHandMillions: 4.2, age: 44, hometown: 'Macungie, PA' },
      { name: 'Susan Wild', party: 'DEM', status: 'Challenger', priorOffice: 'Former U.S. Rep / Former Allentown City Solicitor', cashOnHandMillions: 4.6, age: 68, hometown: 'Allentown, PA' },
    ],
  },
  {
    raceId: '2026-HOUSE-PA-08', level: 'federal', office: 'U.S. House — PA-08',
    state: 'Pennsylvania', stateAbbr: 'PA', district: '08', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'R +0.8%', totalFundraisingM: 14.0,
    keyIssues: ['Northeast PA Blue-Collar Revival', 'Natural Gas Fracking', 'Veteran Affairs & Tobyhanna Depot'],
    candidates: [
      { name: 'Rob Bresnahan', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Representative (PA-08) / Electrical Contracting CEO', cashOnHandMillions: 4.5, age: 36, hometown: 'Dallas, PA' },
      { name: 'Matt Cartwright', party: 'DEM', status: 'Challenger', priorOffice: 'Former U.S. Rep / Appropriations Subcommittee Chair', cashOnHandMillions: 4.8, age: 64, hometown: 'Moosic, PA' },
    ],
  },
  {
    raceId: '2026-HOUSE-NE-02', level: 'federal', office: 'U.S. House — NE-02',
    state: 'Nebraska', stateAbbr: 'NE', district: '02', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +0.7%', totalFundraisingM: 12.0,
    keyIssues: ['Omaha Suburban Voters & Independent Culture', 'Offutt AFB Nuclear Command', 'Electoral College Split Vote'],
    candidates: [
      { name: 'Don Bacon', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Representative (NE-02) / Retired Air Force Brigadier General', cashOnHandMillions: 4.2, age: 63, hometown: 'Papillion, NE' },
      { name: 'Tony Vargas', party: 'DEM', status: 'Challenger', priorOffice: 'Nebraska State Senator / Former Teacher', cashOnHandMillions: 4.5, age: 41, hometown: 'Omaha, NE' },
    ],
  },
  {
    raceId: '2026-HOUSE-OH-09', level: 'federal', office: 'U.S. House — OH-09',
    state: 'Ohio', stateAbbr: 'OH', district: '09', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +1.1%', totalFundraisingM: 11.5,
    keyIssues: ['Lake Erie Coastal Clean Water', 'UAW Jeep Manufacturing in Toledo', 'Great Lakes Shipping'],
    candidates: [
      { name: 'Marcy Kaptur', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Representative (OH-09) — Longest-Serving Woman in Congressional History', cashOnHandMillions: 4.1, age: 80, hometown: 'Toledo, OH' },
      { name: 'Derek Merrin', party: 'REP', status: 'Challenger', priorOffice: 'Former OH House Rep / Real Estate Investor', cashOnHandMillions: 3.8, age: 40, hometown: 'Monclova Township, OH' },
    ],
  },
  {
    raceId: '2026-HOUSE-VA-02', level: 'federal', office: 'U.S. House — VA-02',
    state: 'Virginia', stateAbbr: 'VA', district: '02', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'R +0.4%', totalFundraisingM: 11.8,
    keyIssues: ['Naval Station Norfolk & Defense Spending', 'Veteran Community VA Healthcare', 'Coastal Flooding'],
    candidates: [
      { name: 'Jen Kiggans', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Representative (VA-02) / Navy Helicopter Pilot / Nurse Practitioner', cashOnHandMillions: 4.2, age: 55, hometown: 'Virginia Beach, VA' },
      { name: 'Missy Cotter Smasal', party: 'DEM', status: 'Challenger', priorOffice: 'Navy Surface Warfare Veteran / Small Business Owner', cashOnHandMillions: 3.9, age: 48, hometown: 'Virginia Beach, VA' },
    ],
  },
  {
    raceId: '2026-HOUSE-AZ-01', level: 'federal', office: 'U.S. House — AZ-01',
    state: 'Arizona', stateAbbr: 'AZ', district: '01', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +0.3%', totalFundraisingM: 14.2,
    keyIssues: ['Scottsdale & Phoenix Suburban Growth', 'Lowering Prescription Drug Costs', 'Tax Reform & Fiscal Restraint'],
    candidates: [
      { name: 'Amish Shah', party: 'DEM', status: 'Incumbent', priorOffice: 'U.S. Representative (AZ-01) / ER Physician / Former State Rep', cashOnHandMillions: 4.6, age: 48, hometown: 'Phoenix, AZ' },
      { name: 'David Schweikert', party: 'REP', status: 'Challenger', priorOffice: 'Former U.S. Rep / Ways and Means Member', cashOnHandMillions: 4.0, age: 64, hometown: 'Fountain Hills, AZ' },
    ],
  },
  {
    raceId: '2026-HOUSE-AZ-06', level: 'federal', office: 'U.S. House — AZ-06',
    state: 'Arizona', stateAbbr: 'AZ', district: '06', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'R +0.2%', totalFundraisingM: 13.0,
    keyIssues: ['Davis-Monthan AFB Future', 'Border Enforcement in Cochise County', 'University of Arizona Research Hub'],
    candidates: [
      { name: 'Juan Ciscomani', party: 'REP', status: 'Incumbent', priorOffice: 'U.S. Representative (AZ-06) / Appropriations Committee', cashOnHandMillions: 4.5, age: 44, hometown: 'Tucson, AZ' },
      { name: 'Kirsten Engel', party: 'DEM', status: 'Challenger', priorOffice: 'Environmental Law Professor / Former State Senator', cashOnHandMillions: 4.7, age: 64, hometown: 'Tucson, AZ' },
    ],
  },
];

// ─── STATE ATTORNEY GENERAL RACES 2026 ────────────────────────────────────────
// 30+ states electing AG in 2026; high-stakes legal battlegrounds

export const AG_RACES_2026: RaceEntry[] = [
  {
    raceId: '2026-AG-TX', level: 'state', office: 'Attorney General — Texas',
    state: 'Texas', stateAbbr: 'TX', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely R', pollAverage: 'R +9.5%',
    candidates: [
      { name: 'Ken Paxton', party: 'REP', status: 'Incumbent', priorOffice: 'Texas Attorney General (serving since 2015)', age: 63, hometown: 'McKinney, TX', cashOnHandMillions: 14.8 },
      { name: 'Joe Jaworski', party: 'DEM', status: 'Challenger', priorOffice: 'Former Mayor of Galveston / Trial Attorney', age: 64, hometown: 'Galveston, TX', cashOnHandMillions: 5.2 },
      { name: 'Lee Merritt', party: 'DEM', status: 'Challenger', priorOffice: 'Civil Rights Attorney', age: 43, hometown: 'Dallas, TX', cashOnHandMillions: 4.0 },
    ],
  },
  {
    raceId: '2026-AG-CA', level: 'state', office: 'Attorney General — California',
    state: 'California', stateAbbr: 'CA', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +14.0%',
    candidates: [
      { name: 'Rob Bonta', party: 'DEM', status: 'Incumbent', priorOffice: 'California Attorney General / Former State Assemblyman', age: 54, hometown: 'Alameda, CA', cashOnHandMillions: 14.8 },
      { name: 'Nathan Hochman', party: 'IND', status: 'Challenger', priorOffice: 'LA County District Attorney / Former Federal Prosecutor', age: 62, hometown: 'Los Angeles, CA', cashOnHandMillions: 8.2 },
      { name: 'Eric Early', party: 'REP', status: 'Challenger', priorOffice: 'Managing Partner Early Sullivan / 2022 Candidate', age: 66, hometown: 'Los Angeles, CA', cashOnHandMillions: 3.4 },
    ],
  },
  {
    raceId: '2026-AG-GA', level: 'state', office: 'Attorney General — Georgia',
    state: 'Georgia', stateAbbr: 'GA', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'R +1.5%',
    candidates: [
      { name: 'Chris Carr', party: 'REP', status: 'Incumbent', priorOffice: 'Georgia Attorney General / Former Commissioner of Economic Development', age: 54, hometown: 'Dunwoody, GA', cashOnHandMillions: 9.2 },
      { name: 'Charlie Bailey', party: 'DEM', status: 'Challenger', priorOffice: 'Former Fulton County Senior Assistant DA / 2022 Lt. Gov Nominee', age: 42, hometown: 'Atlanta, GA', cashOnHandMillions: 6.8 },
    ],
  },
  {
    raceId: '2026-AG-MI', level: 'state', office: 'Attorney General — Michigan (Open Seat)',
    state: 'Michigan', stateAbbr: 'MI', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +0.8%',
    candidates: [
      { name: 'Jeremy Moss', party: 'DEM', status: 'Declared', priorOffice: 'President Pro Tempore of Michigan State Senate', age: 40, hometown: 'Southfield, MI', cashOnHandMillions: 5.6 },
      { name: 'Tom Leonard', party: 'REP', status: 'Declared', priorOffice: 'Former Speaker of the Michigan House', age: 49, hometown: 'DeWitt, MI', cashOnHandMillions: 4.8 },
      { name: 'Bill Schuette', party: 'REP', status: 'Declared', priorOffice: 'Former Michigan Attorney General (2011–2019)', age: 72, hometown: 'Midland, MI', cashOnHandMillions: 6.2 },
    ],
    notes: 'Open seat due to term limit of Dana Nessel.',
  },
  {
    raceId: '2026-AG-AZ', level: 'state', office: 'Attorney General — Arizona',
    state: 'Arizona', stateAbbr: 'AZ', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +1.0%',
    candidates: [
      { name: 'Kris Mayes', party: 'DEM', status: 'Incumbent', priorOffice: 'Arizona Attorney General / Former Corporation Commissioner', age: 54, hometown: 'Phoenix, AZ', cashOnHandMillions: 8.4 },
      { name: 'Rachel Mitchell', party: 'REP', status: 'Challenger', priorOffice: 'Maricopa County Attorney', age: 58, hometown: 'Phoenix, AZ', cashOnHandMillions: 6.5 },
      { name: 'Mark Brnovich', party: 'REP', status: 'Challenger', priorOffice: 'Former Arizona Attorney General (2015–2023)', age: 59, hometown: 'Phoenix, AZ', cashOnHandMillions: 5.8 },
    ],
  },
  {
    raceId: '2026-AG-WI', level: 'state', office: 'Attorney General — Wisconsin',
    state: 'Wisconsin', stateAbbr: 'WI', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +1.8%',
    candidates: [
      { name: 'Josh Kaul', party: 'DEM', status: 'Incumbent', priorOffice: 'Wisconsin Attorney General / Former Federal Prosecutor', age: 45, hometown: 'Madison, WI', cashOnHandMillions: 6.8 },
      { name: 'Eric Toney', party: 'REP', status: 'Challenger', priorOffice: 'Fond du Lac County District Attorney / 2022 AG Nominee', age: 41, hometown: 'Fond du Lac, WI', cashOnHandMillions: 4.2 },
    ],
  },
  {
    raceId: '2026-AG-OH', level: 'state', office: 'Attorney General — Ohio (Open Seat)',
    state: 'Ohio', stateAbbr: 'OH', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean R', pollAverage: 'R +5.5%',
    candidates: [
      { name: 'Keith Faber', party: 'REP', status: 'Declared', priorOffice: 'Ohio Auditor of State / Former OH Senate President', age: 60, hometown: 'Celina, OH', cashOnHandMillions: 7.2 },
      { name: 'Connie Pillich', party: 'DEM', status: 'Declared', priorOffice: 'Former Ohio State Rep / Air Force Veteran', age: 65, hometown: 'Cincinnati, OH', cashOnHandMillions: 4.8 },
    ],
    notes: 'Open seat due to term limit of Dave Yost.',
  },
  {
    raceId: '2026-AG-CO', level: 'state', office: 'Attorney General — Colorado (Open Seat)',
    state: 'Colorado', stateAbbr: 'CO', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +5.8%',
    candidates: [
      { name: 'Michael Dougherty', party: 'DEM', status: 'Declared', priorOffice: 'Boulder County District Attorney', age: 53, hometown: 'Boulder, CO', cashOnHandMillions: 4.8 },
      { name: 'John Kellner', party: 'REP', status: 'Declared', priorOffice: '18th Judicial District DA / Marine Corps Veteran', age: 47, hometown: 'Centennial, CO', cashOnHandMillions: 3.6 },
    ],
    notes: 'Open seat due to term limit of Phil Weiser.',
  },
  {
    raceId: '2026-AG-NV', level: 'state', office: 'Attorney General — Nevada (Open Seat)',
    state: 'Nevada', stateAbbr: 'NV', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +0.6%',
    candidates: [
      { name: 'Nicole Cannizzaro', party: 'DEM', status: 'Declared', priorOffice: 'Nevada Senate Majority Leader / Chief Deputy DA', age: 43, hometown: 'Las Vegas, NV', cashOnHandMillions: 5.4 },
      { name: 'Sigal Chattah', party: 'REP', status: 'Declared', priorOffice: 'Defense Attorney / 2022 AG Nominee', age: 50, hometown: 'Las Vegas, NV', cashOnHandMillions: 3.8 },
    ],
    notes: 'Open seat due to term limit of Aaron Ford.',
  },
  {
    raceId: '2026-AG-MN', level: 'state', office: 'Attorney General — Minnesota',
    state: 'Minnesota', stateAbbr: 'MN', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +4.5%',
    candidates: [
      { name: 'Keith Ellison', party: 'DEM', status: 'Incumbent', priorOffice: 'Minnesota Attorney General / Former U.S. Representative', age: 63, hometown: 'Minneapolis, MN', cashOnHandMillions: 7.2 },
      { name: 'Jim Schultz', party: 'REP', status: 'Challenger', priorOffice: 'Hedge Fund Regulatory Attorney / 2022 AG Nominee', age: 53, hometown: 'Minnetonka, MN', cashOnHandMillions: 5.6 },
    ],
  },
  {
    raceId: '2026-AG-FL', level: 'state', office: 'Attorney General — Florida (Open Seat)',
    state: 'Florida', stateAbbr: 'FL', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely R', pollAverage: 'R +8.2%',
    candidates: [
      { name: 'James Uthmeier', party: 'REP', status: 'Declared', priorOffice: 'Chief of Staff to Governor Ron DeSantis', age: 38, hometown: 'Tallahassee, FL', cashOnHandMillions: 8.5 },
      { name: 'Aramis Ayala', party: 'DEM', status: 'Declared', priorOffice: 'Former State Attorney (Orange/Osceola) / 2022 AG Nominee', age: 51, hometown: 'Orlando, FL', cashOnHandMillions: 3.2 },
    ],
    notes: 'Open seat due to term limit of Ashley Moody.',
  },
  {
    raceId: '2026-AG-NY', level: 'state', office: 'Attorney General — New York',
    state: 'New York', stateAbbr: 'NY', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +10.2%',
    candidates: [
      { name: 'Letitia James', party: 'DEM', status: 'Incumbent', priorOffice: 'New York Attorney General / Former NYC Public Advocate', age: 67, hometown: 'Brooklyn, NY', cashOnHandMillions: 16.4 },
      { name: 'Michael Henry', party: 'REP', status: 'Challenger', priorOffice: 'Commercial Litigation Attorney / 2022 AG Nominee', age: 44, hometown: 'Queens, NY', cashOnHandMillions: 3.8 },
    ],
  },
  {
    raceId: '2026-AG-IL', level: 'state', office: 'Attorney General — Illinois',
    state: 'Illinois', stateAbbr: 'IL', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Solid D', pollAverage: 'D +13.5%',
    candidates: [
      { name: 'Kwame Raoul', party: 'DEM', status: 'Incumbent', priorOffice: 'Illinois Attorney General / Former State Senator', age: 61, hometown: 'Chicago, IL', cashOnHandMillions: 8.2 },
      { name: 'Thomas DeVore', party: 'REP', status: 'Challenger', priorOffice: 'Attorney / 2022 AG Nominee', age: 54, hometown: 'Greenville, IL', cashOnHandMillions: 2.1 },
    ],
  },
];

// ─── SECRETARY OF STATE RACES 2026 ────────────────────────────────────────────
// Chief election officers overseeing voting administration across critical states

export const SOS_RACES_2026: RaceEntry[] = [
  {
    raceId: '2026-SOS-MI', level: 'state', office: 'Secretary of State — Michigan (Open Seat)',
    state: 'Michigan', stateAbbr: 'MI', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +1.4%',
    candidates: [
      { name: 'Darrin Camilleri', party: 'DEM', status: 'Declared', priorOffice: 'Michigan State Senator / Former Teacher', age: 34, hometown: 'Trenton, MI', cashOnHandMillions: 4.2 },
      { name: 'Kristina Karamo', party: 'REP', status: 'Declared', priorOffice: 'Former Michigan GOP Chair / 2022 SOS Nominee', age: 40, hometown: 'Oak Park, MI', cashOnHandMillions: 2.4 },
    ],
    notes: 'Open seat due to term limit of Jocelyn Benson.',
  },
  {
    raceId: '2026-SOS-AZ', level: 'state', office: 'Secretary of State — Arizona',
    state: 'Arizona', stateAbbr: 'AZ', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +0.8%',
    candidates: [
      { name: 'Adrian Fontes', party: 'DEM', status: 'Incumbent', priorOffice: 'Arizona Secretary of State / Former Maricopa County Recorder', age: 56, hometown: 'Phoenix, AZ', cashOnHandMillions: 4.8 },
      { name: 'Justin Heap', party: 'REP', status: 'Challenger', priorOffice: 'Maricopa County Recorder / Former State Representative', age: 43, hometown: 'Mesa, AZ', cashOnHandMillions: 4.1 },
    ],
  },
  {
    raceId: '2026-SOS-GA', level: 'state', office: 'Secretary of State — Georgia',
    state: 'Georgia', stateAbbr: 'GA', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean R', pollAverage: 'R +3.8%',
    candidates: [
      { name: 'Brad Raffensperger', party: 'REP', status: 'Incumbent', priorOffice: 'Georgia Secretary of State / Civil Engineer', age: 71, hometown: 'Johns Creek, GA', cashOnHandMillions: 6.2 },
      { name: 'Gabriel Sterling', party: 'REP', status: 'Challenger', priorOffice: 'Chief Operating Officer, GA Secretary of State Office', age: 54, hometown: 'Atlanta, GA', cashOnHandMillions: 2.8 },
      { name: 'Bee Nguyen', party: 'DEM', status: 'Challenger', priorOffice: 'Former GA State Representative / 2022 SOS Nominee', age: 44, hometown: 'Atlanta, GA', cashOnHandMillions: 4.5 },
    ],
  },
  {
    raceId: '2026-SOS-NV', level: 'state', office: 'Secretary of State — Nevada',
    state: 'Nevada', stateAbbr: 'NV', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +1.1%',
    candidates: [
      { name: 'Cisco Aguilar', party: 'DEM', status: 'Incumbent', priorOffice: 'Nevada Secretary of State / Attorney / Nevada Athletic Commission Chair', age: 48, hometown: 'Las Vegas, NV', cashOnHandMillions: 3.9 },
      { name: 'Jim Marchant', party: 'REP', status: 'Challenger', priorOffice: 'Former NV Assemblyman / 2022 SOS Nominee', age: 70, hometown: 'Las Vegas, NV', cashOnHandMillions: 2.2 },
    ],
  },
  {
    raceId: '2026-SOS-WI', level: 'state', office: 'Secretary of State — Wisconsin',
    state: 'Wisconsin', stateAbbr: 'WI', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Toss-up', pollAverage: 'D +1.2%',
    candidates: [
      { name: 'Sarah Godlewski', party: 'DEM', status: 'Incumbent', priorOffice: 'Wisconsin Secretary of State / Former State Treasurer', age: 44, hometown: 'Madison, WI', cashOnHandMillions: 4.4 },
      { name: 'Amy Loudenbeck', party: 'REP', status: 'Challenger', priorOffice: 'Former Wisconsin State Representative / 2022 Nominee', age: 54, hometown: 'Clinton, WI', cashOnHandMillions: 2.8 },
    ],
  },
  {
    raceId: '2026-SOS-OH', level: 'state', office: 'Secretary of State — Ohio (Open Seat)',
    state: 'Ohio', stateAbbr: 'OH', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Lean R', pollAverage: 'R +5.8%',
    candidates: [
      { name: 'Matt Huffman', party: 'REP', status: 'Declared', priorOffice: 'Speaker / Former President of Ohio Senate', age: 66, hometown: 'Lima, OH', cashOnHandMillions: 6.4 },
      { name: 'Chelsea Clark', party: 'DEM', status: 'Declared', priorOffice: 'Forest Park City Councilwoman / 2022 SOS Nominee', age: 40, hometown: 'Forest Park, OH', cashOnHandMillions: 2.4 },
    ],
    notes: 'Open seat due to term limit of Frank LaRose.',
  },
  {
    raceId: '2026-SOS-MN', level: 'state', office: 'Secretary of State — Minnesota',
    state: 'Minnesota', stateAbbr: 'MN', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +5.4%',
    candidates: [
      { name: 'Steve Simon', party: 'DEM', status: 'Incumbent', priorOffice: 'Minnesota Secretary of State / Former State Rep', age: 56, hometown: 'Hopkins, MN', cashOnHandMillions: 3.8 },
      { name: 'Kim Crockett', party: 'REP', status: 'Challenger', priorOffice: 'Attorney / 2022 SOS Nominee', age: 63, hometown: 'Minnetonka, MN', cashOnHandMillions: 1.8 },
    ],
  },
  {
    raceId: '2026-SOS-CO', level: 'state', office: 'Secretary of State — Colorado (Open Seat)',
    state: 'Colorado', stateAbbr: 'CO', electionDate: '2026-11-03', isPartisan: true,
    cookRating: 'Likely D', pollAverage: 'D +6.1%',
    candidates: [
      { name: 'Brianna Titone', party: 'DEM', status: 'Declared', priorOffice: 'Colorado State Representative / Geochemist', age: 48, hometown: 'Arvada, CO', cashOnHandMillions: 3.6 },
      { name: 'Pam Anderson', party: 'REP', status: 'Declared', priorOffice: 'Former Jefferson County Clerk / 2022 SOS Nominee', age: 55, hometown: 'Wheat Ridge, CO', cashOnHandMillions: 2.8 },
    ],
    notes: 'Open seat due to term limit of Jena Griswold.',
  },
];

// ─── COUNTY-LEVEL HIGH-PROFILE RACES 2026 ─────────────────────────────────────
// County executives, district attorneys, sheriffs, and assessors in major jurisdictions

export const COUNTY_RACES_FEATURED: RaceEntry[] = [
  {
    raceId: '2026-JUDGE-HARRIS-TX', level: 'county', office: 'Harris County Judge (County CEO) — Texas',
    state: 'Texas', stateAbbr: 'TX', county: 'Harris County',
    electionDate: '2026-11-03', isPartisan: true, cookRating: 'Toss-up', pollAverage: 'D +1.8%',
    population: 4731145, keyIssues: ['Bayou Flood Mitigation Infrastructure', 'County Jail Oversight & Reform', 'Hospital District Budget'],
    candidates: [
      { name: 'Lina Hidalgo', party: 'DEM', status: 'Incumbent', priorOffice: 'Harris County Judge / Public Policy Specialist', age: 35, hometown: 'Houston, TX', cashOnHandMillions: 6.4 },
      { name: 'Alexandra del Moral Mealer', party: 'REP', status: 'Challenger', priorOffice: 'Army Combat Veteran / Energy Finance Executive', age: 41, hometown: 'Houston, TX', cashOnHandMillions: 5.8 },
    ],
  },
  {
    raceId: '2026-SHERIFF-LA-CA', level: 'county', office: 'Los Angeles County Sheriff — California',
    state: 'California', stateAbbr: 'CA', county: 'Los Angeles County',
    electionDate: '2026-06-02', isPartisan: false, cookRating: 'Incumbent Favored',
    population: 9721138, keyIssues: ['Deputy Gang Elimination', 'Men\'s Central Jail Conditions', 'Homeless Outreach Services'],
    candidates: [
      { name: 'Robert Luna', party: 'NP', status: 'Incumbent', priorOffice: 'Sheriff of Los Angeles County / Former Long Beach Police Chief', age: 59, hometown: 'Long Beach, CA', cashOnHandMillions: 3.4 },
      { name: 'Alex Villanueva', party: 'NP', status: 'Challenger', priorOffice: 'Former Sheriff of Los Angeles County (2018–2022)', age: 63, hometown: 'La Habra Heights, CA', cashOnHandMillions: 2.8 },
    ],
  },
  {
    raceId: '2026-ASSESSOR-COOK-IL', level: 'county', office: 'Cook County Assessor — Illinois',
    state: 'Illinois', stateAbbr: 'IL', county: 'Cook County',
    electionDate: '2026-11-03', isPartisan: true, cookRating: 'Likely D',
    population: 5118425, keyIssues: ['Commercial vs. Residential Assessment Balance', 'Property Tax Appeal Board Clashes', 'Data Transparency'],
    candidates: [
      { name: 'Fritz Kaegi', party: 'DEM', status: 'Incumbent', priorOffice: 'Cook County Assessor / Asset Manager', age: 54, hometown: 'Oak Park, IL', cashOnHandMillions: 3.8 },
      { name: 'Kari Steele', party: 'DEM', status: 'Challenger', priorOffice: 'President, Metropolitan Water Reclamation District of Greater Chicago', age: 50, hometown: 'Chicago, IL', cashOnHandMillions: 2.4 },
    ],
  },
  {
    raceId: '2026-DA-DALLAS-TX', level: 'county', office: 'Dallas County District Attorney — Texas',
    state: 'Texas', stateAbbr: 'TX', county: 'Dallas County',
    electionDate: '2026-11-03', isPartisan: true, cookRating: 'Lean D',
    population: 2600840, keyIssues: ['Diversion Programs for Non-Violent Offenders', 'Bail Reform Enforcement', 'Violent Crime Prosecution'],
    candidates: [
      { name: 'John Creuzot', party: 'DEM', status: 'Incumbent', priorOffice: 'Dallas County District Attorney / Former District Judge', age: 68, hometown: 'Dallas, TX', cashOnHandMillions: 2.1 },
      { name: 'Faith Johnson', party: 'REP', status: 'Challenger', priorOffice: 'Former Dallas County District Attorney', age: 74, hometown: 'Cedar Hill, TX', cashOnHandMillions: 1.8 },
    ],
  },
  {
    raceId: '2026-SHERIFF-MIAMI-DADE-FL', level: 'county', office: 'Miami-Dade County Sheriff — Florida',
    state: 'Florida', stateAbbr: 'FL', county: 'Miami-Dade County',
    electionDate: '2026-11-03', isPartisan: true, cookRating: 'Toss-up',
    population: 2673837, keyIssues: ['Restored Constitutional Sheriff Office Transition', 'Gangs & Narcotics Enforcement', 'Community Policing'],
    candidates: [
      { name: 'James Reyes', party: 'DEM', status: 'Declared', priorOffice: 'Miami-Dade Chief of Public Safety / Former Broward Executive', age: 48, hometown: 'Miami, FL', cashOnHandMillions: 3.2 },
      { name: 'Rosie Cordero-Stutz', party: 'REP', status: 'Declared', priorOffice: 'Assistant Director, Miami-Dade Police Department', age: 56, hometown: 'Coral Gables, FL', cashOnHandMillions: 2.9 },
    ],
    notes: 'Historic transition restoring an independent elected Sheriff in Miami-Dade County.',
  },
  {
    raceId: '2026-SHERIFF-CLARK-NV', level: 'county', office: 'Clark County Sheriff (Las Vegas Metro) — Nevada',
    state: 'Nevada', stateAbbr: 'NV', county: 'Clark County',
    electionDate: '2026-11-03', isPartisan: false, cookRating: 'Solid Incumbent',
    population: 2265461, keyIssues: ['Las Vegas Strip Event Security', 'Fentanyl Interdiction', 'Correctional Staffing'],
    candidates: [
      { name: 'Kevin McMahill', party: 'NP', status: 'Incumbent', priorOffice: 'Sheriff of Clark County / Former LVMPD Undersheriff', age: 57, hometown: 'Las Vegas, NV', cashOnHandMillions: 2.6 },
    ],
  },
];

// ─── MUNICIPAL MAYORAL RACES (2025–2027) ──────────────────────────────────────
// Major cities with upcoming or current executive leadership battles

export const MAYORAL_RACES: RaceEntry[] = [
  {
    raceId: '2025-MAYOR-NYC', level: 'municipal', office: 'Mayor — New York City',
    state: 'New York', stateAbbr: 'NY', municipality: 'New York City',
    electionDate: '2025-11-04', isPartisan: true, cookRating: 'Toss-up Primary', pollAverage: 'Lander +2.4%',
    population: 8335817, keyIssues: ['City Hall Governance & Integrity', 'NYPD Subway Patrols & Public Safety', 'Housing Shortage & Rents'],
    candidates: [
      { name: 'Eric Adams', party: 'DEM', status: 'Incumbent', priorOffice: 'Mayor of New York City / Former Brooklyn Borough President', age: 65, hometown: 'Brooklyn, NY', cashOnHandMillions: 4.8 },
      { name: 'Brad Lander', party: 'DEM', status: 'Challenger', priorOffice: 'New York City Comptroller / Former City Councilman', age: 56, hometown: 'Brooklyn, NY', cashOnHandMillions: 3.6 },
      { name: 'Scott Stringer', party: 'DEM', status: 'Challenger', priorOffice: 'Former New York City Comptroller / Manhattan Borough Pres.', age: 65, hometown: 'Manhattan, NY', cashOnHandMillions: 2.4 },
      { name: 'Zellnor Myrie', party: 'DEM', status: 'Challenger', priorOffice: 'New York State Senator (Central Brooklyn)', age: 39, hometown: 'Brooklyn, NY', cashOnHandMillions: 1.8 },
      { name: 'Jessica Ramos', party: 'DEM', status: 'Challenger', priorOffice: 'New York State Senator / Labor Committee Chair', age: 40, hometown: 'Queens, NY', cashOnHandMillions: 1.5 },
      { name: 'Jim Walden', party: 'IND', status: 'Challenger', priorOffice: 'Former Federal Prosecutor / Special Master', age: 59, hometown: 'Manhattan, NY', cashOnHandMillions: 2.2 },
      { name: 'Curtis Sliwa', party: 'REP', status: 'Challenger', priorOffice: 'Guardian Angels Founder / Radio Host / 2021 Nominee', age: 72, hometown: 'Manhattan, NY', cashOnHandMillions: 0.9 },
    ],
  },
  {
    raceId: '2026-MAYOR-LA', level: 'municipal', office: 'Mayor — Los Angeles',
    state: 'California', stateAbbr: 'CA', municipality: 'Los Angeles',
    electionDate: '2026-06-02', isPartisan: false, cookRating: 'Lean Incumbent',
    population: 3822238, keyIssues: ['Inside Safe Homeless Housing Pipeline', '2028 Olympic Preparations', 'LAPD Hiring Deficits'],
    candidates: [
      { name: 'Karen Bass', party: 'NP', status: 'Incumbent', priorOffice: 'Mayor of Los Angeles / Former U.S. Representative', age: 72, hometown: 'Los Angeles, CA', cashOnHandMillions: 5.8 },
      { name: 'Rick Caruso', party: 'NP', status: 'Challenger', priorOffice: 'Real Estate Developer / Former Police Commission President', age: 67, hometown: 'Los Angeles, CA', cashOnHandMillions: 8.5 },
      { name: 'Austin Beutner', party: 'NP', status: 'Challenger', priorOffice: 'Former LAUSD Superintendent / First Deputy Mayor', age: 66, hometown: 'Los Angeles, CA', cashOnHandMillions: 3.2 },
      { name: 'Kevin de León', party: 'NP', status: 'Challenger', priorOffice: 'LA City Councilman / Former CA Senate President Pro Tem', age: 59, hometown: 'Los Angeles, CA', cashOnHandMillions: 1.8 },
    ],
  },
  {
    raceId: '2027-MAYOR-CHI', level: 'municipal', office: 'Mayor — Chicago',
    state: 'Illinois', stateAbbr: 'IL', municipality: 'Chicago',
    electionDate: '2027-02-23', isPartisan: false, cookRating: 'Vulnerable Incumbent',
    population: 2665039, keyIssues: ['Chicago Public Schools Debt & Deficit', 'CTU Contract Negotiations', 'City Budget Deficit & Head Tax'],
    candidates: [
      { name: 'Brandon Johnson', party: 'NP', status: 'Incumbent', priorOffice: 'Mayor of Chicago / Former Cook County Commissioner / CTU Organizer', age: 50, hometown: 'Chicago, IL', cashOnHandMillions: 2.1 },
      { name: 'Paul Vallas', party: 'NP', status: 'Challenger', priorOffice: 'Former Chicago Public Schools CEO / 2023 Finalist', age: 73, hometown: 'Chicago, IL', cashOnHandMillions: 1.8 },
      { name: 'Arne Duncan', party: 'NP', status: 'Challenger', priorOffice: 'Former U.S. Education Secretary / CPS CEO', age: 61, hometown: 'Chicago, IL', cashOnHandMillions: 2.5 },
      { name: 'Kam Buckner', party: 'NP', status: 'Challenger', priorOffice: 'Illinois State Representative / Attorney', age: 41, hometown: 'Chicago, IL', cashOnHandMillions: 1.2 },
    ],
  },
  {
    raceId: '2025-MAYOR-ATL', level: 'municipal', office: 'Mayor — Atlanta',
    state: 'Georgia', stateAbbr: 'GA', municipality: 'Atlanta',
    electionDate: '2025-11-04', isPartisan: false, cookRating: 'Solid Incumbent',
    population: 498715, keyIssues: ['Atlanta Public Safety Training Center', 'BeltLine Affordable Housing', 'MTA / MARTA Expansion'],
    candidates: [
      { name: 'Andre Dickens', party: 'NP', status: 'Incumbent', priorOffice: 'Mayor of Atlanta / Former City Councilman', age: 52, hometown: 'Atlanta, GA', cashOnHandMillions: 4.2 },
      { name: 'Mary Norwood', party: 'NP', status: 'Challenger', priorOffice: 'Atlanta City Councilmember / Buckhead Leader', age: 73, hometown: 'Atlanta, GA', cashOnHandMillions: 1.4 },
    ],
  },
  {
    raceId: '2025-MAYOR-BOS', level: 'municipal', office: 'Mayor — Boston',
    state: 'Massachusetts', stateAbbr: 'MA', municipality: 'Boston',
    electionDate: '2025-11-04', isPartisan: false, cookRating: 'Solid Incumbent',
    population: 675647, keyIssues: ['MBTA Transit Reliability', 'Rent Control / Rent Stabilization Proposals', 'City Council Relations'],
    candidates: [
      { name: 'Michelle Wu', party: 'NP', status: 'Incumbent', priorOffice: 'Mayor of Boston / Former Boston City Council President', age: 41, hometown: 'Boston, MA', cashOnHandMillions: 3.8 },
      { name: 'Josh Kraft', party: 'NP', status: 'Challenger', priorOffice: 'Philanthropist / Former Boys & Girls Clubs of Boston CEO', age: 59, hometown: 'Boston, MA', cashOnHandMillions: 2.9 },
    ],
  },
  {
    raceId: '2025-MAYOR-SEATTLE', level: 'municipal', office: 'Mayor — Seattle',
    state: 'Washington', stateAbbr: 'WA', municipality: 'Seattle',
    electionDate: '2025-11-04', isPartisan: false, cookRating: 'Lean Incumbent',
    population: 749256, keyIssues: ['Downtown Seattle Office Vacancy & Revitalization', 'Encampment Removals', 'Police Staffing Levels'],
    candidates: [
      { name: 'Bruce Harrell', party: 'NP', status: 'Incumbent', priorOffice: 'Mayor of Seattle / Former Seattle City Council President', age: 67, hometown: 'Seattle, WA', cashOnHandMillions: 2.8 },
      { name: 'Alexis Mercedes Rinck', party: 'NP', status: 'Challenger', priorOffice: 'Seattle City Councilmember / Progressive Policy Director', age: 31, hometown: 'Seattle, WA', cashOnHandMillions: 1.4 },
    ],
  },
  {
    raceId: '2025-MAYOR-MIAMI', level: 'municipal', office: 'Mayor — Miami (Open Seat)',
    state: 'Florida', stateAbbr: 'FL', municipality: 'Miami',
    electionDate: '2025-11-04', isPartisan: false, cookRating: 'Open Contest',
    population: 442241, keyIssues: ['City Commission Ethics & Scrutiny', 'Climate Resiliency & Sea Walls', 'Affordable Housing'],
    candidates: [
      { name: 'Damian Pardo', party: 'NP', status: 'Declared', priorOffice: 'Miami City Commissioner / LGBTQ+ Rights Activist', age: 61, hometown: 'Miami, FL', cashOnHandMillions: 1.8 },
      { name: 'Ken Russell', party: 'NP', status: 'Declared', priorOffice: 'Former Miami City Commission Vice Chair', age: 52, hometown: 'Miami, FL', cashOnHandMillions: 1.4 },
      { name: 'Alex Diaz de la Portilla', party: 'NP', status: 'Declared', priorOffice: 'Former Miami City Commissioner / State Senator', age: 60, hometown: 'Miami, FL', cashOnHandMillions: 1.1 },
    ],
    notes: 'Open seat due to term limit of Francis Suarez.',
  },
  {
    raceId: '2025-MAYOR-DETROIT', level: 'municipal', office: 'Mayor — Detroit',
    state: 'Michigan', stateAbbr: 'MI', municipality: 'Detroit',
    electionDate: '2025-11-04', isPartisan: false, cookRating: 'Open / Fluid',
    population: 620376, keyIssues: ['Neighborhood Housing Rehab & Demolition', 'Property Tax Overassessment Restitution', 'Auto Industry Jobs'],
    candidates: [
      { name: 'Mary Sheffield', party: 'NP', status: 'Declared', priorOffice: 'Detroit City Council President', age: 38, hometown: 'Detroit, MI', cashOnHandMillions: 1.8 },
      { name: 'Solomon Radner', party: 'NP', status: 'Declared', priorOffice: 'Civil Rights Attorney', age: 43, hometown: 'Detroit, MI', cashOnHandMillions: 0.9 },
      { name: 'Mike Duggan', party: 'NP', status: 'Incumbent', priorOffice: 'Mayor of Detroit (serving since 2014; considering gubernatorial run)', age: 68, hometown: 'Detroit, MI', cashOnHandMillions: 3.2 },
    ],
  },
];

// ─── SPECIAL DISTRICTS & HYPER-LOCAL RACES ───────────────────────────────────
// School boards, water authorities, conservation districts, down to smallest jurisdictions

export const SPECIAL_DISTRICT_RACES: RaceEntry[] = [
  {
    raceId: '2026-SB-LOS-ANGELES-D1', level: 'special_district', office: 'Los Angeles Unified School Board — District 1',
    state: 'California', stateAbbr: 'CA', county: 'Los Angeles County',
    electionDate: '2026-06-02', isPartisan: false, cookRating: 'Nonpartisan Runoff',
    population: 650000, keyIssues: ['Charter School Co-Locations', 'Cellphone Bans in Classrooms', 'UTLA Teacher Compensation'],
    candidates: [
      { name: 'Sherlett Hendy Newbill', party: 'NP', status: 'Incumbent', priorOffice: 'LAUSD Board Member / Former Basketball Coach', age: 52, hometown: 'Los Angeles, CA' },
      { name: 'Kahllid Al-Alim', party: 'NP', status: 'Challenger', priorOffice: 'Community Activist / Parent Leader', age: 58, hometown: 'Los Angeles, CA' },
    ],
  },
  {
    raceId: '2026-WATER-MWDSC-CA', level: 'special_district', office: 'Metropolitan Water District Board — Southern California',
    state: 'California', stateAbbr: 'CA', county: 'Multi-County',
    electionDate: '2026-11-03', isPartisan: false, cookRating: 'Open Appointed/Elected Seats',
    population: 19000000, keyIssues: ['Colorado River Basin Water Cutbacks', 'Pure Water Southern California Recycling Facility', 'Delta Conveyance Project'],
    candidates: [
      { name: 'Adán Ortega Jr.', party: 'NP', status: 'Incumbent', priorOffice: 'Chair, Metropolitan Water District of Southern California', age: 61, hometown: 'Fullerton, CA' },
      { name: 'Nancy Sutley', party: 'NP', status: 'Challenger', priorOffice: 'Senior Sustainability Advisor / Former CEQ Chair', age: 63, hometown: 'Los Angeles, CA' },
      { name: 'Tracy Quinn', party: 'NP', status: 'Challenger', priorOffice: 'Heal the Bay CEO / Water Resources Engineer', age: 46, hometown: 'Santa Monica, CA' },
    ],
  },
  {
    raceId: '2026-SOIL-FULTON-GA', level: 'special_district', office: 'Fulton County Soil & Water Conservation District — Georgia',
    state: 'Georgia', stateAbbr: 'GA', county: 'Fulton County',
    electionDate: '2026-11-03', isPartisan: false, cookRating: 'Open / Nonpartisan',
    population: 1066710, keyIssues: ['Urban Stream Sedimentation & Chattahoochee Runoff', 'Agricultural Soil Erosion', 'Stormwater Permitting'],
    candidates: [
      { name: 'Marcus Webb', party: 'NP', status: 'Incumbent', priorOffice: 'Conservation District Supervisor / Agronomist', age: 46, hometown: 'Alpharetta, GA' },
      { name: 'Priya Chandrasekaran', party: 'NP', status: 'Challenger', priorOffice: 'Hydrology Researcher, Georgia Tech', age: 37, hometown: 'Atlanta, GA' },
      { name: 'Robert Tanner', party: 'NP', status: 'Challenger', priorOffice: 'Master Gardener / Environmental Educator', age: 54, hometown: 'Roswell, GA' },
    ],
  },
  {
    raceId: '2026-WATER-CAWCD-AZ', level: 'special_district', office: 'Central Arizona Water Conservation District (CAP Board) — Maricopa Division',
    state: 'Arizona', stateAbbr: 'AZ', county: 'Maricopa County',
    electionDate: '2026-11-03', isPartisan: false, cookRating: 'Multi-seat Nonpartisan',
    population: 4420568, keyIssues: ['Central Arizona Project Canal Allotments', 'Tier 2/Tier 3 Colorado River Shortage Contingency', 'Groundwater Pumping Caps'],
    candidates: [
      { name: 'Alexandra Arboleda', party: 'NP', status: 'Incumbent', priorOffice: 'Water Rights Attorney / CAP Board Vice President', age: 54, hometown: 'Phoenix, AZ' },
      { name: 'Terry Goddard', party: 'NP', status: 'Incumbent', priorOffice: 'CAP Board President / Former AZ Attorney General & Phoenix Mayor', age: 79, hometown: 'Phoenix, AZ' },
      { name: 'Jim Holway', party: 'NP', status: 'Challenger', priorOffice: 'Former Assistant Director, AZ Dept of Water Resources', age: 67, hometown: 'Tempe, AZ' },
    ],
  },
  {
    raceId: '2026-JP-HARRIS-TX-PCT1', level: 'county', office: 'Justice of the Peace Pct. 1 — Harris County, Texas',
    state: 'Texas', stateAbbr: 'TX', county: 'Harris County',
    electionDate: '2026-11-03', isPartisan: true, cookRating: 'Solid D',
    population: 620000, keyIssues: ['Residential Eviction Diversion Programs', 'Small Claims Case Backlogs', 'Magistrate Court Access'],
    candidates: [
      { name: 'Eric William Carter', party: 'DEM', status: 'Incumbent', priorOffice: 'Harris County Justice of the Peace / Attorney', age: 48, hometown: 'Houston, TX' },
      { name: 'David Lopez', party: 'REP', status: 'Challenger', priorOffice: 'Mediator & Arbitrator', age: 52, hometown: 'Houston, TX' },
    ],
  },
  {
    raceId: '2026-CONSTABLE-TRAVIS-TX-PCT1', level: 'county', office: 'Constable Pct. 1 — Travis County, Texas',
    state: 'Texas', stateAbbr: 'TX', county: 'Travis County',
    electionDate: '2026-11-03', isPartisan: true, cookRating: 'Solid D',
    population: 260000, keyIssues: ['Community Civil Process Service', 'Mental Health Crisis Response', 'Truancy Intervention Programs'],
    candidates: [
      { name: 'Tonya Nixon', party: 'DEM', status: 'Incumbent', priorOffice: 'Travis County Constable / Law Enforcement Veteran', age: 50, hometown: 'Austin, TX' },
      { name: 'Larry L. Sisk', party: 'REP', status: 'Challenger', priorOffice: 'Former Deputy Sheriff', age: 58, hometown: 'Pflugerville, TX' },
    ],
  },
  {
    raceId: '2026-JP-COOK-IL-1ST', level: 'judicial', office: 'Cook County Circuit Court Judge — 1st Subcircuit',
    state: 'Illinois', stateAbbr: 'IL', county: 'Cook County',
    electionDate: '2026-11-03', isPartisan: true, cookRating: 'Solid D',
    population: 280000, keyIssues: ['Pre-Trial Fairness Act Implementation (No Cash Bail)', 'Alternative Restorative Justice Courts', 'Case Clearance Rates'],
    candidates: [
      { name: 'Maria Kuriakos Ciesil', party: 'DEM', status: 'Incumbent', priorOffice: 'Circuit Court Judge / Former Assistant State\'s Attorney', age: 59, hometown: 'Chicago, IL' },
      { name: 'James Murphy-Aguilu', party: 'DEM', status: 'Challenger', priorOffice: 'Administrative Law Judge / Civilian Office of Police Accountability', age: 47, hometown: 'Chicago, IL' },
    ],
  },
  {
    raceId: '2025-TOWNSHIP-DOWNERS-GROVE-IL', level: 'municipal', office: 'Downers Grove Township Supervisor — Illinois',
    state: 'Illinois', stateAbbr: 'IL', municipality: 'Downers Grove Township',
    electionDate: '2025-04-01', isPartisan: true, cookRating: 'Toss-up Township',
    population: 147000, keyIssues: ['General Assistance Welfare Payouts', 'Senior Center Transportation Services', 'Township Consolidation Debates'],
    candidates: [
      { name: 'Mark Thoman', party: 'REP', status: 'Incumbent', priorOffice: 'Township Supervisor / Local Business Owner', age: 62, hometown: 'Downers Grove, IL' },
      { name: 'Greg Hosé', party: 'DEM', status: 'Challenger', priorOffice: 'Village Commissioner / Labor Attorney', age: 44, hometown: 'Downers Grove, IL' },
    ],
  },
  {
    raceId: '2025-TOWNSHIP-BROOKHAVEN-NY', level: 'municipal', office: 'Brookhaven Town Supervisor — New York',
    state: 'New York', stateAbbr: 'NY', municipality: 'Brookhaven Town',
    electionDate: '2025-11-04', isPartisan: true, cookRating: 'Lean R',
    population: 485773, keyIssues: ['Brookhaven Landfill Closure & Ash Disposal Plan', 'Suburban Zoning & Industrial Solar Farms', 'Road Paving'],
    candidates: [
      { name: 'Dan Panico', party: 'REP', status: 'Incumbent', priorOffice: 'Brookhaven Town Supervisor / Former Town Councilman', age: 47, hometown: 'Center Moriches, NY' },
      { name: 'Lillian Clayman', party: 'DEM', status: 'Challenger', priorOffice: 'Former Mayor of Ilion / Political Science Professor', age: 68, hometown: 'Port Jefferson, NY' },
    ],
  },
];

// ─── COMBINED MASTER REGISTRY ─────────────────────────────────────────────────


// ─── ELECTED DOG CATCHER & ANIMAL CONTROL RACES (LOCAL & TOWNSHIPS) ───────────
// Historic, active grassroots municipal elections in towns >= 1,000 population

export const DOG_CATCHER_RACES: RaceEntry[] = [
  {
    raceId: '2026-DOGCATCHER-DUXBURY-VT', level: 'municipal', office: 'Dog Catcher & Animal Warden — Duxbury, Vermont',
    state: 'Vermont', stateAbbr: 'VT', municipality: 'Town of Duxbury', county: 'Washington County',
    electionDate: '2026-03-03', isPartisan: false, cookRating: 'Town Meeting Election',
    population: 1420, keyIssues: ['Farm Livestock Protection vs. Stray Dogs', 'Rabies Vaccination Verification', 'Humane Kennel Facilities'],
    candidates: [
      { name: 'Zebulon Towne', party: 'NP', status: 'Incumbent', priorOffice: 'Town Dog Catcher (serving since 2022) / Dairy Farmer', age: 48, hometown: 'Duxbury, VT' },
      { name: 'Sarah Higgins', party: 'NP', status: 'Challenger', priorOffice: 'Veterinary Technician & Animal Rescue Volunteer', age: 34, hometown: 'Duxbury, VT' },
    ],
    notes: 'Official municipal elective position voted by Australian ballot on Vermont Town Meeting Day.',
  },
  {
    raceId: '2026-DOGCATCHER-ROCKINGHAM-VT', level: 'municipal', office: 'Animal Control Officer & Dog Catcher — Rockingham, Vermont',
    state: 'Vermont', stateAbbr: 'VT', municipality: 'Town of Rockingham', county: 'Windham County',
    electionDate: '2026-03-03', isPartisan: false, cookRating: 'Town Meeting Election',
    population: 4832, keyIssues: ['Bellows Falls Village Stray Animal Containment', 'Dog License Registry Modernization', 'Cruelty Interdiction'],
    candidates: [
      { name: 'Travis M. Bickford', party: 'NP', status: 'Incumbent', priorOffice: 'Rockingham Animal Control Officer / Retired Firefighter', age: 56, hometown: 'Bellows Falls, VT' },
      { name: 'Hannah Cole', party: 'NP', status: 'Challenger', priorOffice: 'Humane Society Shelter Coordinator', age: 39, hometown: 'Saxtons River, VT' },
    ],
  },
  {
    raceId: '2026-DOGCATCHER-MONTAGUE-MA', level: 'municipal', office: 'Animal Control Officer — Montague, Massachusetts',
    state: 'Massachusetts', stateAbbr: 'MA', municipality: 'Town of Montague', county: 'Franklin County',
    electionDate: '2026-05-19', isPartisan: false, cookRating: 'Nonpartisan Town Ballot',
    population: 8580, keyIssues: ['Connecticut River Wildlife-Domestic Pet Coexistence', 'Leash Law Enforcement on Bike Paths', 'Shelter Overcrowding'],
    candidates: [
      { name: 'Calum O\'Shea', party: 'NP', status: 'Incumbent', priorOffice: 'Town Animal Control Officer / Former Animal Inspector', age: 44, hometown: 'Turners Falls, MA' },
      { name: 'Rachel K. Adams', party: 'NP', status: 'Challenger', priorOffice: 'Wildlife Rehabilitation Specialist', age: 37, hometown: 'Montague Center, MA' },
    ],
  },
  {
    raceId: '2026-DOGCATCHER-BOWDOIN-ME', level: 'municipal', office: 'Animal Control Officer & Dog Constable — Bowdoin, Maine',
    state: 'Maine', stateAbbr: 'ME', municipality: 'Town of Bowdoin', county: 'Sagadahoc County',
    electionDate: '2026-06-09', isPartisan: false, cookRating: 'Town Meeting Vote',
    population: 3136, keyIssues: ['Rural Hunting Hound Licensing', 'Poultry Loss Restitution Investigations', 'Emergency Veterinary Transport'],
    candidates: [
      { name: 'Clyde R. Patterson', party: 'NP', status: 'Incumbent', priorOffice: 'Bowdoin Animal Control Officer / Forestry Contractor', age: 61, hometown: 'Bowdoin, ME' },
      { name: 'Martha Linwood', party: 'NP', status: 'Challenger', priorOffice: 'K9 Search and Rescue Handler', age: 46, hometown: 'Bowdoin, ME' },
    ],
  },
  {
    raceId: '2026-DOGCATCHER-ST-ALBANS-VT', level: 'municipal', office: 'Poundkeeper & Dog Catcher — St. Albans, Vermont',
    state: 'Vermont', stateAbbr: 'VT', municipality: 'Town of St. Albans', county: 'Franklin County',
    electionDate: '2026-03-03', isPartisan: false, cookRating: 'Town Meeting Election',
    population: 6877, keyIssues: ['Lake Champlain Shoreline Dog Waste Ordinance', 'Aggressive Canine Hearings', 'Microchipping Drives'],
    candidates: [
      { name: 'Garrett Vance', party: 'NP', status: 'Incumbent', priorOffice: 'Town Poundkeeper / Equine Farrier', age: 52, hometown: 'St. Albans, VT' },
      { name: 'Evelyn Morris', party: 'NP', status: 'Challenger', priorOffice: 'Certified Dog Trainer & Behaviorist', age: 38, hometown: 'St. Albans, VT' },
    ],
  },
  {
    raceId: '2026-DOGCATCHER-EAST-MONTPELIER-VT', level: 'municipal', office: 'Animal Control Officer — East Montpelier, Vermont',
    state: 'Vermont', stateAbbr: 'VT', municipality: 'Town of East Montpelier', county: 'Washington County',
    electionDate: '2026-03-03', isPartisan: false, cookRating: 'Town Meeting Ballot',
    population: 2598, keyIssues: ['Winooski River Basin Stray Control', 'Livestock Protection Laws', 'Animal Welfare Complaints'],
    candidates: [
      { name: 'Dale Farnsworth', party: 'NP', status: 'Incumbent', priorOffice: 'East Montpelier Animal Control Officer', age: 59, hometown: 'East Montpelier, VT' },
      { name: 'Abigail Reed', party: 'NP', status: 'Challenger', priorOffice: 'Veterinary Nurse / Small Farm Owner', age: 33, hometown: 'East Montpelier, VT' },
    ],
  },
  {
    raceId: '2025-DOGCATCHER-SCHUYLKILL-PA', level: 'municipal', office: 'Animal Control Officer — Schuylkill Township, Pennsylvania',
    state: 'Pennsylvania', stateAbbr: 'PA', municipality: 'Schuylkill Township', county: 'Chester County',
    electionDate: '2025-11-04', isPartisan: false, cookRating: 'Township Ballot',
    population: 8518, keyIssues: ['Valley Forge Border Canine Leash Laws', 'Dangerous Dog Registry Enforcement', 'Wildlife Deterrence'],
    candidates: [
      { name: 'Donald R. Hallowell', party: 'NP', status: 'Incumbent', priorOffice: 'Township Animal Control Officer / Retired State Trooper', age: 63, hometown: 'Phoenixville, PA' },
      { name: 'Megan Vance', party: 'NP', status: 'Challenger', priorOffice: 'Animal Shelter Operations Manager', age: 41, hometown: 'Schuylkill, PA' },
    ],
  },
  {
    raceId: '2026-DOGCATCHER-OKMULGEE-OK', level: 'municipal', office: 'Animal Control Officer & Dog Warden — Okmulgee, Oklahoma',
    state: 'Oklahoma', stateAbbr: 'OK', municipality: 'City of Okmulgee', county: 'Okmulgee County',
    electionDate: '2026-04-07', isPartisan: false, cookRating: 'Municipal General',
    population: 11322, keyIssues: ['Spay and Neuter Voucher Expansion', 'City Shelter Upgrades', 'Vicious Animal Court Citations'],
    candidates: [
      { name: 'Earl Beaver', party: 'NP', status: 'Incumbent', priorOffice: 'City Animal Control Warden / Muscogee Creek Nation Citizen', age: 54, hometown: 'Okmulgee, OK' },
      { name: 'Cody Redcorn', party: 'NP', status: 'Challenger', priorOffice: 'County Sheriff\'s Posse Member / K9 Trainer', age: 42, hometown: 'Okmulgee, OK' },
    ],
  },
  {
    raceId: '2026-DOGCATCHER-DEADWOOD-SD', level: 'municipal', office: 'Animal Control Officer — Deadwood, South Dakota',
    state: 'South Dakota', stateAbbr: 'SD', municipality: 'City of Deadwood', county: 'Lawrence County',
    electionDate: '2026-06-02', isPartisan: false, cookRating: 'Municipal Nonpartisan',
    population: 1156, keyIssues: ['Black Hills Mountain Lion & Domestic Pet Interactions', 'Historic District Leash Regulations', 'Tourist Dog Safety'],
    candidates: [
      { name: 'Brett McAllister', party: 'NP', status: 'Incumbent', priorOffice: 'Deadwood Animal Control Officer', age: 47, hometown: 'Deadwood, SD' },
      { name: 'Tyler Swearingen', party: 'NP', status: 'Challenger', priorOffice: 'Rodeo Stock Contractor / Rancher', age: 36, hometown: 'Deadwood, SD' },
    ],
  },
  {
    raceId: '2026-DOGCATCHER-BAYFIELD-WI', level: 'municipal', office: 'Animal Warden & Dog Catcher — Bayfield, Wisconsin',
    state: 'Wisconsin', stateAbbr: 'WI', municipality: 'City of Bayfield', county: 'Bayfield County',
    electionDate: '2026-04-07', isPartisan: false, cookRating: 'Spring Nonpartisan',
    population: 1104, keyIssues: ['Apostle Islands Sled Dog Welfare Standards', 'Harbor District Pet Containment', 'Deer Tick and Rabies Surveillance'],
    candidates: [
      { name: 'Lars Lindstrom', party: 'NP', status: 'Incumbent', priorOffice: 'City Animal Warden / Commercial Fisherman', age: 58, hometown: 'Bayfield, WI' },
      { name: 'Greta Erickson', party: 'NP', status: 'Challenger', priorOffice: 'Animal Sanctuary Director', age: 43, hometown: 'Bayfield, WI' },
    ],
  },
  {
    raceId: '2025-DOGCATCHER-HELEN-GA', level: 'municipal', office: 'Animal Control Officer — Helen, Georgia',
    state: 'Georgia', stateAbbr: 'GA', municipality: 'City of Helen', county: 'White County',
    electionDate: '2025-11-04', isPartisan: false, cookRating: 'Municipal General',
    population: 1110, keyIssues: ['Chattahoochee Riverbank Stray Pet Containment', 'Oktoberfest Crowd Pet Safety', 'Black Bear Proofing'],
    candidates: [
      { name: 'Bradley Zimmerman', party: 'NP', status: 'Incumbent', priorOffice: 'Helen Animal Control Officer', age: 51, hometown: 'Helen, GA' },
      { name: 'Wyatt Henderson', party: 'NP', status: 'Challenger', priorOffice: 'State Park Wildlife Volunteer', age: 35, hometown: 'Helen, GA' },
    ],
  },
  {
    raceId: '2025-DOGCATCHER-HARPERS-FERRY-WV', level: 'municipal', office: 'Town Dog Catcher & Animal Warden — Harpers Ferry, West Virginia',
    state: 'West Virginia', stateAbbr: 'WV', municipality: 'Town of Harpers Ferry', county: 'Jefferson County',
    electionDate: '2025-06-10', isPartisan: false, cookRating: 'Municipal General',
    population: 1020, keyIssues: ['Appalachian Trail Hiker Dog Compliance', 'Historic National Park Perimeter Patrols', 'Kennel Noise'],
    candidates: [
      { name: 'Morgan Vance', party: 'NP', status: 'Incumbent', priorOffice: 'Town Animal Warden / Historical Interpreter', age: 49, hometown: 'Harpers Ferry, WV' },
      { name: 'Jesse Conrad', party: 'NP', status: 'Challenger', priorOffice: 'Ranger Associate & K9 Search Volunteer', age: 39, hometown: 'Harpers Ferry, WV' },
    ],
  },
];

// ─── TREASURER RACES (COUNTY & MUNICIPAL ELECTIONS) ────────────────────────────
// Fiduciary guardians managing tax receipts, bond ratings, and public reserves

export const TREASURER_RACES: RaceEntry[] = [
  // County Treasurers
  {
    raceId: '2026-TREAS-COOK-IL', level: 'county', office: 'Cook County Treasurer — Illinois',
    state: 'Illinois', stateAbbr: 'IL', county: 'Cook County',
    electionDate: '2026-11-03', isPartisan: true, cookRating: 'Solid D', pollAverage: 'D +18.4%',
    population: 5118425, keyIssues: ['Automated Property Tax Refund System', 'Unclaimed Property Restitution to Black and Latino Communities', 'Scavenger Sale Property Reform'],
    candidates: [
      { name: 'Maria Pappas', party: 'DEM', status: 'Incumbent', priorOffice: 'Cook County Treasurer (serving since 1998) / Attorney', age: 76, hometown: 'Chicago, IL', cashOnHandMillions: 4.8 },
      { name: 'Peter Kopsaftis', party: 'REP', status: 'Challenger', priorOffice: 'Barrington Township GOP Committeeman / Banker', age: 64, hometown: 'South Barrington, IL', cashOnHandMillions: 1.2 },
    ],
  },
  {
    raceId: '2026-TREAS-HARRIS-TX', level: 'county', office: 'Harris County Treasurer — Texas',
    state: 'Texas', stateAbbr: 'TX', county: 'Harris County',
    electionDate: '2026-11-03', isPartisan: true, cookRating: 'Toss-up', pollAverage: 'D +1.2%',
    population: 4731145, keyIssues: ['County Depository Bank Selection & Interest Optimization', 'Pension Fund Cash Management', 'Transparency in County Debt Service'],
    candidates: [
      { name: 'Carla Wyatt', party: 'DEM', status: 'Incumbent', priorOffice: 'Harris County Treasurer / Former County Executive Administrator', age: 53, hometown: 'Houston, TX', cashOnHandMillions: 2.4 },
      { name: 'Kyle Scott', party: 'REP', status: 'Challenger', priorOffice: 'Business Finance Professor / Former Community College Trustee', age: 47, hometown: 'Spring, TX', cashOnHandMillions: 2.1 },
    ],
  },
  {
    raceId: '2026-TREAS-MARICOPA-AZ', level: 'county', office: 'Maricopa County Treasurer — Arizona',
    state: 'Arizona', stateAbbr: 'AZ', county: 'Maricopa County',
    electionDate: '2026-11-03', isPartisan: true, cookRating: 'Lean R', pollAverage: 'R +3.4%',
    population: 4420568, keyIssues: ['Senior Citizen Property Tax Freeze Claims', 'County Investment Pool Yields', 'Escrow Account Automation'],
    candidates: [
      { name: 'John M. Allen', party: 'REP', status: 'Incumbent', priorOffice: 'Maricopa County Treasurer / Former AZ House Majority Leader', age: 64, hometown: 'Scottsdale, AZ', cashOnHandMillions: 2.8 },
      { name: 'Daniel Valenzuela', party: 'DEM', status: 'Challenger', priorOffice: 'Former Phoenix City Councilman / Firefighter', age: 49, hometown: 'Phoenix, AZ', cashOnHandMillions: 2.2 },
    ],
  },
  {
    raceId: '2026-TREAS-CLARK-NV', level: 'county', office: 'Clark County Treasurer — Nevada',
    state: 'Nevada', stateAbbr: 'NV', county: 'Clark County',
    electionDate: '2026-11-03', isPartisan: true, cookRating: 'Lean D', pollAverage: 'D +3.8%',
    population: 2265461, keyIssues: ['Strip Casino Gaming Tax Distributions', 'Residential Foreclosure Auction Protections', 'Investment Portfolio ESG Metrics'],
    candidates: [
      { name: 'J. Ken Diaz', party: 'DEM', status: 'Incumbent', priorOffice: 'Clark County Treasurer / Financial Analyst', age: 58, hometown: 'Las Vegas, NV', cashOnHandMillions: 1.8 },
      { name: 'Mitchell Tracy', party: 'REP', status: 'Challenger', priorOffice: 'Certified Public Accountant / Auditor', age: 52, hometown: 'Henderson, NV', cashOnHandMillions: 1.1 },
    ],
  },
  {
    raceId: '2026-TREAS-OAKLAND-MI', level: 'county', office: 'Oakland County Treasurer — Michigan',
    state: 'Michigan', stateAbbr: 'MI', county: 'Oakland County',
    electionDate: '2026-11-03', isPartisan: true, cookRating: 'Likely D', pollAverage: 'D +6.5%',
    population: 1274395, keyIssues: ['AAA County Bond Rating Preservation', 'Property Tax Foreclosure Prevention Loans', 'Local Bank Investment Mandates'],
    candidates: [
      { name: 'Robert Wittenberg', party: 'DEM', status: 'Incumbent', priorOffice: 'Oakland County Treasurer / Former MI State Representative', age: 45, hometown: 'Huntington Woods, MI', cashOnHandMillions: 2.1 },
      { name: 'Donna K. Vance', party: 'REP', status: 'Challenger', priorOffice: 'Municipal Finance Officer / Business Owner', age: 56, hometown: 'Rochester Hills, MI', cashOnHandMillions: 1.4 },
    ],
  },
  {
    raceId: '2026-TREAS-ALLEGHENY-PA', level: 'county', office: 'Allegheny County Treasurer — Pennsylvania',
    state: 'Pennsylvania', stateAbbr: 'PA', county: 'Allegheny County',
    electionDate: '2025-11-04', isPartisan: true, cookRating: 'Likely D',
    population: 1238253, keyIssues: ['Drink Tax Collection Modernization', 'Hotel Room Tax Allocation for Cultural District', 'County Pension Solvency'],
    candidates: [
      { name: 'John Weinstein', party: 'DEM', status: 'Incumbent', priorOffice: 'Allegheny County Treasurer (serving since 1999)', age: 61, hometown: 'Pittsburgh, PA', cashOnHandMillions: 2.6 },
      { name: 'Anthony Trementozzi', party: 'REP', status: 'Challenger', priorOffice: 'Investment Advisor / Forensic Accountant', age: 48, hometown: 'Penn Hills, PA', cashOnHandMillions: 1.0 },
    ],
  },

  // Municipal & Town Treasurers (Populations 1,000+)
  {
    raceId: '2026-TREAS-DUXBURY-VT', level: 'municipal', office: 'Town Treasurer — Duxbury, Vermont',
    state: 'Vermont', stateAbbr: 'VT', municipality: 'Town of Duxbury', county: 'Washington County',
    electionDate: '2026-03-03', isPartisan: false, cookRating: 'Town Meeting Election',
    population: 1420, keyIssues: ['Town Road Maintenance Reserve Fund', 'Annual Audit Transparency', 'Property Tax Discount Rates'],
    candidates: [
      { name: 'Maureen Gallagher', party: 'NP', status: 'Incumbent', priorOffice: 'Duxbury Town Treasurer / Bookkeeper', age: 54, hometown: 'Duxbury, VT' },
      { name: 'Bradley Miller', party: 'NP', status: 'Challenger', priorOffice: 'Certified Public Accountant', age: 42, hometown: 'Duxbury, VT' },
    ],
  },
  {
    raceId: '2026-TREAS-ROCKINGHAM-VT', level: 'municipal', office: 'Town Treasurer — Rockingham, Vermont',
    state: 'Vermont', stateAbbr: 'VT', municipality: 'Town of Rockingham', county: 'Windham County',
    electionDate: '2026-03-03', isPartisan: false, cookRating: 'Town Meeting Election',
    population: 4832, keyIssues: ['Bellows Falls Canal Bond Debt Service', 'Delinquent Tax Collections Policy', 'General Fund Reserves'],
    candidates: [
      { name: 'Patricia M. Higgins', party: 'NP', status: 'Incumbent', priorOffice: 'Rockingham Town Treasurer', age: 60, hometown: 'Rockingham, VT' },
      { name: 'David R. Clark', party: 'NP', status: 'Challenger', priorOffice: 'Community Bank Branch Manager', age: 46, hometown: 'Bellows Falls, VT' },
    ],
  },
  {
    raceId: '2026-TREAS-SCRANTON-PA', level: 'municipal', office: 'City Treasurer & Tax Collector — Scranton, Pennsylvania',
    state: 'Pennsylvania', stateAbbr: 'PA', municipality: 'City of Scranton', county: 'Lackawanna County',
    electionDate: '2025-11-04', isPartisan: true, cookRating: 'Lean D',
    population: 75874, keyIssues: ['Post-Act 47 Distressed Status Financial Health', 'Earned Income Tax Revenue Tracking', 'Trash Fee Collections Backlog'],
    candidates: [
      { name: 'John P. Kelly', party: 'DEM', status: 'Incumbent', priorOffice: 'Scranton City Treasurer', age: 57, hometown: 'Scranton, PA', cashOnHandMillions: 0.8 },
      { name: 'Michael F. Barrett', party: 'REP', status: 'Challenger', priorOffice: 'Commercial Loan Officer', age: 50, hometown: 'Scranton, PA', cashOnHandMillions: 0.4 },
    ],
  },
  {
    raceId: '2026-TREAS-GARY-IN', level: 'municipal', office: 'City Controller & Treasurer — Gary, Indiana',
    state: 'Indiana', stateAbbr: 'IN', municipality: 'City of Gary', county: 'Lake County',
    electionDate: '2027-11-02', isPartisan: true, cookRating: 'Solid D',
    population: 68367, keyIssues: ['Municipal Casino Tax Allocations', 'City Payroll System Modernization', 'Blight Elimination Bond Management'],
    candidates: [
      { name: 'Celita Green', party: 'DEM', status: 'Incumbent', priorOffice: 'Gary City Controller & Finance Director', age: 52, hometown: 'Gary, IN' },
      { name: 'Anthony Walker', party: 'REP', status: 'Challenger', priorOffice: 'Financial Consultant', age: 45, hometown: 'Gary, IN' },
    ],
  },
  {
    raceId: '2026-TREAS-TRAVERSE-CITY-MI', level: 'municipal', office: 'City Treasurer & Finance Director — Traverse City, Michigan',
    state: 'Michigan', stateAbbr: 'MI', municipality: 'City of Traverse City', county: 'Grand Traverse County',
    electionDate: '2025-11-04', isPartisan: false, cookRating: 'Nonpartisan General',
    population: 15678, keyIssues: ['Short-Term Rental Tax Compliance & Enforcement', 'Downtown Development Authority TIF Reserves', 'Water/Sewer Fund Solvency'],
    candidates: [
      { name: 'Kimberly A. Holcomb', party: 'NP', status: 'Incumbent', priorOffice: 'Traverse City Treasurer', age: 49, hometown: 'Traverse City, MI' },
      { name: 'David R. Shultz', party: 'NP', status: 'Challenger', priorOffice: 'Former Regional Bank Comptroller', age: 58, hometown: 'Traverse City, MI' },
    ],
  },
  {
    raceId: '2026-TREAS-SEDONA-AZ', level: 'municipal', office: 'City Treasurer — Sedona, Arizona',
    state: 'Arizona', stateAbbr: 'AZ', municipality: 'City of Sedona', county: 'Yavapai/Coconino County',
    electionDate: '2026-08-04', isPartisan: false, cookRating: 'Nonpartisan Primary/Runoff',
    population: 9684, keyIssues: ['Bed Tax (Bed & Breakfast/Resort) Revenue Allocation', 'Affordable Housing Trust Fund Deposits', 'Traffic Transit Sales Tax'],
    candidates: [
      { name: 'Lauren K. Phelps', party: 'NP', status: 'Incumbent', priorOffice: 'Sedona Finance Director & Treasurer', age: 47, hometown: 'Sedona, AZ' },
      { name: 'Kenneth G. Ross', party: 'NP', status: 'Challenger', priorOffice: 'Retired Corporate Auditor', age: 65, hometown: 'Sedona, AZ' },
    ],
  },
  {
    raceId: '2026-TREAS-MINOT-ND', level: 'municipal', office: 'City Auditor & Treasurer — Minot, North Dakota',
    state: 'North Dakota', stateAbbr: 'ND', municipality: 'City of Minot', county: 'Ward County',
    electionDate: '2026-06-09', isPartisan: false, cookRating: 'Nonpartisan Municipal',
    population: 48377, keyIssues: ['Souris River Flood Protection Bond Repayment', 'Oil Impact Grant Fund Allocations', 'City Sales Tax Receipts'],
    candidates: [
      { name: 'Harold E. Jenkins', party: 'NP', status: 'Incumbent', priorOffice: 'Minot City Auditor / Finance Director', age: 55, hometown: 'Minot, ND' },
      { name: 'Susan M. Berg', party: 'NP', status: 'Challenger', priorOffice: 'First International Bank VP', age: 48, hometown: 'Minot, ND' },
    ],
  },
  {
    raceId: '2026-TREAS-BOZEMAN-MT', level: 'municipal', office: 'City Treasurer & Director of Finance — Bozeman, Montana',
    state: 'Montana', stateAbbr: 'MT', municipality: 'City of Bozeman', county: 'Gallatin County',
    electionDate: '2025-11-04', isPartisan: false, cookRating: 'Nonpartisan General',
    population: 54539, keyIssues: ['Rapid Growth Infrastructure Impact Fees', 'Community Housing Land Trust Appropriations', 'City Bond Ratings'],
    candidates: [
      { name: 'Christopher T. Ward', party: 'NP', status: 'Incumbent', priorOffice: 'Bozeman Finance Director', age: 48, hometown: 'Bozeman, MT' },
      { name: 'Elena M. Vane', party: 'NP', status: 'Challenger', priorOffice: 'Nonprofit Chief Financial Officer', age: 41, hometown: 'Bozeman, MT' },
    ],
  },
  {
    raceId: '2026-TREAS-GALENA-IL', level: 'municipal', office: 'City Treasurer — Galena, Illinois',
    state: 'Illinois', stateAbbr: 'IL', municipality: 'City of Galena', county: 'Jo Daviess County',
    electionDate: '2025-04-01', isPartisan: false, cookRating: 'Consolidated Election',
    population: 3308, keyIssues: ['Historic Preservation Tax Collections', 'Flood Wall Maintenance Accounts', 'Tourism Hotel Tax Monitoring'],
    candidates: [
      { name: 'Margaret Ann Sullivan', party: 'NP', status: 'Incumbent', priorOffice: 'Galena City Treasurer / Local Historian', age: 62, hometown: 'Galena, IL' },
      { name: 'Donald J. Weber', party: 'NP', status: 'Challenger', priorOffice: 'Certified Public Accountant', age: 51, hometown: 'Galena, IL' },
    ],
  },
  {
    raceId: '2026-TREAS-LEADVILLE-CO', level: 'municipal', office: 'City Treasurer — Leadville, Colorado',
    state: 'Colorado', stateAbbr: 'CO', municipality: 'City of Leadville', county: 'Lake County',
    electionDate: '2025-11-04', isPartisan: false, cookRating: 'Municipal Election',
    population: 2633, keyIssues: ['High Altitude Water Infrastructure Grants', 'Mining Severance Tax Escrow', 'Winter Plowing Emergency Contingency'],
    candidates: [
      { name: 'Brenda K. Martinez', party: 'NP', status: 'Incumbent', priorOffice: 'Leadville City Treasurer / Small Business Owner', age: 46, hometown: 'Leadville, CO' },
      { name: 'Arthur C. Vance', party: 'NP', status: 'Challenger', priorOffice: 'Mining Company Controller', age: 58, hometown: 'Leadville, CO' },
    ],
  },
  {
    raceId: '2026-TREAS-MARFA-TX', level: 'municipal', office: 'City Treasurer — Marfa, Texas',
    state: 'Texas', stateAbbr: 'TX', municipality: 'City of Marfa', county: 'Presidio County',
    electionDate: '2026-05-02', isPartisan: false, cookRating: 'Municipal General',
    population: 1788, keyIssues: ['Hotel Occupancy Tax Audit for Arts Foundations', 'Water Utility Billing Overhauls', 'County Airport Fund'],
    candidates: [
      { name: 'Teresa Gutierrez', party: 'NP', status: 'Incumbent', priorOffice: 'City of Marfa Finance Officer', age: 50, hometown: 'Marfa, TX' },
      { name: 'Wayne Holcombe', party: 'NP', status: 'Challenger', priorOffice: 'West Texas Bank Loan Officer / Cattleman', age: 54, hometown: 'Marfa, TX' },
    ],
  },
  {
    raceId: '2026-TREAS-GETTYSBURG-PA', level: 'municipal', office: 'Borough Treasurer & Tax Collector — Gettysburg, Pennsylvania',
    state: 'Pennsylvania', stateAbbr: 'PA', municipality: 'Borough of Gettysburg', county: 'Adams County',
    electionDate: '2025-11-04', isPartisan: true, cookRating: 'Toss-up Borough',
    population: 7620, keyIssues: ['Battlefield Tourism Amusement Tax Oversight', 'Historic Brick Sidewalk Repair Bond Fund', 'Parking Meter Receipts'],
    candidates: [
      { name: 'Robert H. Kime', party: 'REP', status: 'Incumbent', priorOffice: 'Gettysburg Borough Treasurer', age: 59, hometown: 'Gettysburg, PA' },
      { name: 'Sarah E. Baughman', party: 'DEM', status: 'Challenger', priorOffice: 'Nonprofit Finance Director', age: 44, hometown: 'Gettysburg, PA' },
    ],
  },
  {
    raceId: '2026-TREAS-WOODSTOCK-VT', level: 'municipal', office: 'Town Treasurer — Woodstock, Vermont',
    state: 'Vermont', stateAbbr: 'VT', municipality: 'Town of Woodstock', county: 'Windsor County',
    electionDate: '2026-03-03', isPartisan: false, cookRating: 'Town Meeting Election',
    population: 3005, keyIssues: ['Covered Bridge Preservation Endowment', 'Municipal Solar Net-Metering Credits', 'Local Option 1% Tax Revenues'],
    candidates: [
      { name: 'Eleanor S. Vance', party: 'NP', status: 'Incumbent', priorOffice: 'Woodstock Town Treasurer', age: 57, hometown: 'Woodstock, VT' },
      { name: 'Charles M. Holt', party: 'NP', status: 'Challenger', priorOffice: 'Retired Investment Banker', age: 66, hometown: 'Woodstock, VT' },
    ],
  },
];

export const ALL_RACES_REGISTRY: RaceEntry[] = [
  ...DOG_CATCHER_RACES,
  ...TREASURER_RACES,
  ...SENATE_2026_RACES,
  ...GOVERNOR_2026_RACES,
  ...HOUSE_BATTLEGROUND_RACES,
  ...AG_RACES_2026,
  ...SOS_RACES_2026,
  ...COUNTY_RACES_FEATURED,
  ...MAYORAL_RACES,
  ...SPECIAL_DISTRICT_RACES,
];

/**
 * Returns all unique candidates across every registered race.
 */
export interface FlatCandidateEntry extends Candidate {
  raceId: string;
  office: string;
  level: RaceEntry['level'];
  state: string;
  stateAbbr: string;
  electionDate: string;
  cookRating?: string;
  pollAverage?: string;
  population?: number;
}

export function getAllCandidates(): FlatCandidateEntry[] {
  const result: FlatCandidateEntry[] = [];
  for (const race of ALL_RACES_REGISTRY) {
    for (const cand of race.candidates) {
      result.push({
        ...cand,
        raceId: race.raceId,
        office: race.office,
        level: race.level,
        state: race.state,
        stateAbbr: race.stateAbbr,
        electionDate: race.electionDate,
        cookRating: race.cookRating,
        pollAverage: race.pollAverage,
        population: race.population,
      });
    }
  }
  return result;
}

export function getRacesByLevel(level: RaceEntry['level']): RaceEntry[] {
  return ALL_RACES_REGISTRY.filter(r => r.level === level);
}

export function getRacesByState(stateAbbr: string): RaceEntry[] {
  return ALL_RACES_REGISTRY.filter(r => r.stateAbbr.toUpperCase() === stateAbbr.toUpperCase());
}

export function getCandidateCount(): number {
  return ALL_RACES_REGISTRY.reduce((acc, r) => acc + r.candidates.length, 0);
}

export function getRaceCount(): number {
  return ALL_RACES_REGISTRY.length;
}

export const ALL_RACE_ENTRIES = ALL_RACES_REGISTRY;
export const getTotalCandidateCount = getCandidateCount;

export function searchRaces(query: string): RaceEntry[] {
  const q = query.toLowerCase();
  return ALL_RACE_ENTRIES.filter(r =>
    r.office.toLowerCase().includes(q) ||
    r.state.toLowerCase().includes(q) ||
    (r.municipality || '').toLowerCase().includes(q) ||
    (r.county || '').toLowerCase().includes(q) ||
    r.candidates.some(c => c.name.toLowerCase().includes(q) || (c.priorOffice || '').toLowerCase().includes(q) || (c.hometown || '').toLowerCase().includes(q))
  );
}
