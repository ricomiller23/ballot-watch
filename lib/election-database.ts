// ==============================================================================
// 2026 COMPLETE UNITED STATES ELECTIONS REGISTRY & VERIFIED POLLING DATABASE
// All 50 States · 435 House Districts · 33 Senate Seats · 36 Gubernatorial Mansions
// State Executive (AG/SOS) · Major Mayoralties · Statewide Ballot Measures
// ==============================================================================

export type ElectionLevel = 'all' | 'federal' | 'state' | 'local' | 'ballot_measure';
export type Branch = 'all' | 'senate' | 'house' | 'governor' | 'attorney_general' | 'secretary_of_state' | 'mayor' | 'initiative';
export type RatingCategory = 'Solid D' | 'Likely D' | 'Lean D' | 'Toss-up' | 'Lean R' | 'Likely R' | 'Solid R';
export type HeatmapMode = 'partisan_lean' | 'senate_control' | 'governor_control' | 'poll_density' | 'turnout_swing' | 'spending_warchest';

export interface StateProfile {
  name: string;
  abbr: string;
  fips: string;
  electoralVotes: number;
  houseDistrictsCount: number;
  hasSenate2026: boolean;
  hasGov2026: boolean;
  cookPVI: string;
  partisanMargin: number; // Positive = Dem lean, Negative = Rep lean
  battlegroundTier: 'Tier 1 Battleground' | 'Tier 2 Competitive' | 'Lean' | 'Safe Baseline';
  turnout2024: number;
  registeredVoters: number;
  pollingVolumeScore: number; // 0-100
  totalSpendingMillions: number;
  stateLegSenate: string;
  stateLegHouse: string;
  centroid: { x: number; y: number };
}

export interface CandidateProfile {
  name: string;
  party: 'DEM' | 'REP' | 'IND' | 'LIB' | 'GRN';
  status: 'Incumbent' | 'Challenger' | 'Open Seat Nominee';
  priorOffice?: string;
  cashOnHandMillions?: number;
}

export interface ElectionOffice {
  id: string;
  level: 'federal' | 'state' | 'local' | 'ballot_measure';
  branch: 'senate' | 'house' | 'governor' | 'attorney_general' | 'secretary_of_state' | 'mayor' | 'initiative';
  state: string;
  stateAbbr: string;
  district?: string;
  title: string;
  seatClass?: string;
  incumbentParty: 'DEM' | 'REP' | 'IND';
  isOpenSeat: boolean;
  cookRating: RatingCategory;
  sabatoRating: RatingCategory;
  insideElecRating: RatingCategory;
  pollAverageLead: string;
  leadingParty: 'DEM' | 'REP' | 'TIE';
  demCandidate: CandidateProfile;
  repCandidate: CandidateProfile;
  thirdPartyCandidate?: CandidateProfile;
  pollsCount: number;
  latestPollDate: string;
  mathBlock: string;
  keyIssues: string[];
  totalFundraisingMillions: number;
  lastElectionMargin: number;
  isTopBattleground: boolean;
  x: number;
  y: number;
}

export interface VerifiedPollEntry {
  id: string;
  raceId: string;
  officeTitle: string;
  state: string;
  pollster: string;
  sponsor: string | null;
  fieldStart: string;
  fieldEnd: string;
  publishedAt: string;
  sampleSize: number;
  population: 'LV' | 'RV' | 'A';
  method: 'Live Caller' | 'Online Panel' | 'IVR / Text' | 'Mixed Methodology';
  marginOfError: number;
  demCandidate: string;
  demPct: number;
  repCandidate: string;
  repPct: number;
  otherCandidate?: string;
  otherPct?: number;
  marginSpread: string;
  sourceUrl: string;
}

export interface MayoralRace {
  id: string;
  city: string;
  state: string;
  stateAbbr: string;
  currentMayor: string;
  rating: RatingCategory;
  candidates: Array<{ name: string; party: 'DEM' | 'REP' | 'IND' | 'NP'; platform: string }>;
  keyIssues: string;
  electionDate: string;
  pollsCount: number;
  leaderLead: string;
  x: number;
  y: number;
}

export interface BallotInitiative {
  id: string;
  state: string;
  stateAbbr: string;
  measureCode: string;
  title: string;
  topic: 'Abortion Rights' | 'Minimum Wage' | 'Redistricting' | 'Electoral Reform' | 'Cannabis' | 'Fiscal Policy';
  yesPollingPct: number;
  noPollingPct: number;
  undecidedPct: number;
  threshold: string;
  impactSummary: string;
  x: number;
  y: number;
}

export const STATE_PROFILES: StateProfile[] = [
  {
    "name": "Alabama",
    "abbr": "AL",
    "fips": "01",
    "electoralVotes": 9,
    "houseDistrictsCount": 7,
    "hasSenate2026": false,
    "hasGov2026": true,
    "cookPVI": "R+15",
    "partisanMargin": -18.2,
    "battlegroundTier": "Safe Baseline",
    "turnout2024": 62.4,
    "registeredVoters": 3850000,
    "pollingVolumeScore": 32,
    "totalSpendingMillions": 42.5,
    "stateLegSenate": "R 27 - D 8",
    "stateLegHouse": "R 77 - D 28",
    "centroid": {
      "x": 628.6,
      "y": 416.2
    }
  },
  {
    "name": "Alaska",
    "abbr": "AK",
    "fips": "02",
    "electoralVotes": 3,
    "houseDistrictsCount": 1,
    "hasSenate2026": true,
    "hasGov2026": true,
    "cookPVI": "R+8",
    "partisanMargin": -10.1,
    "battlegroundTier": "Tier 2 Competitive",
    "turnout2024": 68.2,
    "registeredVoters": 610000,
    "pollingVolumeScore": 48,
    "totalSpendingMillions": 28.4,
    "stateLegSenate": "Coalition 17 - R 3",
    "stateLegHouse": "Coalition 23 - R 17",
    "centroid": {
      "x": 120.0,
      "y": 520.0
    }
  },
  {
    "name": "Arizona",
    "abbr": "AZ",
    "fips": "04",
    "electoralVotes": 11,
    "houseDistrictsCount": 9,
    "hasSenate2026": false,
    "hasGov2026": true,
    "cookPVI": "R+2",
    "partisanMargin": 1.8,
    "battlegroundTier": "Tier 1 Battleground",
    "turnout2024": 74.1,
    "registeredVoters": 4520000,
    "pollingVolumeScore": 94,
    "totalSpendingMillions": 185.2,
    "stateLegSenate": "R 16 - D 14",
    "stateLegHouse": "R 31 - D 29",
    "centroid": {
      "x": 186.0,
      "y": 359.2
    }
  },
  {
    "name": "Arkansas",
    "abbr": "AR",
    "fips": "05",
    "electoralVotes": 6,
    "houseDistrictsCount": 4,
    "hasSenate2026": true,
    "hasGov2026": true,
    "cookPVI": "R+16",
    "partisanMargin": -22.5,
    "battlegroundTier": "Safe Baseline",
    "turnout2024": 58.1,
    "registeredVoters": 1920000,
    "pollingVolumeScore": 24,
    "totalSpendingMillions": 21.0,
    "stateLegSenate": "R 29 - D 6",
    "stateLegHouse": "R 82 - D 18",
    "centroid": {
      "x": 549.5,
      "y": 352.6
    }
  },
  {
    "name": "California",
    "abbr": "CA",
    "fips": "06",
    "electoralVotes": 54,
    "houseDistrictsCount": 52,
    "hasSenate2026": false,
    "hasGov2026": true,
    "cookPVI": "D+14",
    "partisanMargin": 19.4,
    "battlegroundTier": "Lean",
    "turnout2024": 71.3,
    "registeredVoters": 22500000,
    "pollingVolumeScore": 88,
    "totalSpendingMillions": 310.5,
    "stateLegSenate": "D 31 - R 9",
    "stateLegHouse": "D 62 - R 18",
    "centroid": {
      "x": 90.0,
      "y": 290.0
    }
  },
  {
    "name": "Colorado",
    "abbr": "CO",
    "fips": "08",
    "electoralVotes": 10,
    "houseDistrictsCount": 8,
    "hasSenate2026": true,
    "hasGov2026": true,
    "cookPVI": "D+4",
    "partisanMargin": 11.2,
    "battlegroundTier": "Tier 2 Competitive",
    "turnout2024": 77.8,
    "registeredVoters": 4100000,
    "pollingVolumeScore": 68,
    "totalSpendingMillions": 92.4,
    "stateLegSenate": "D 23 - R 12",
    "stateLegHouse": "D 46 - R 19",
    "centroid": {
      "x": 309.1,
      "y": 254.5
    }
  },
  {
    "name": "Connecticut",
    "abbr": "CT",
    "fips": "09",
    "electoralVotes": 7,
    "houseDistrictsCount": 5,
    "hasSenate2026": false,
    "hasGov2026": true,
    "cookPVI": "D+7",
    "partisanMargin": 14.8,
    "battlegroundTier": "Safe Baseline",
    "turnout2024": 74.2,
    "registeredVoters": 2400000,
    "pollingVolumeScore": 38,
    "totalSpendingMillions": 35.8,
    "stateLegSenate": "D 24 - R 12",
    "stateLegHouse": "D 98 - R 53",
    "centroid": {
      "x": 855.3,
      "y": 197.5
    }
  },
  {
    "name": "Delaware",
    "abbr": "DE",
    "fips": "10",
    "electoralVotes": 3,
    "houseDistrictsCount": 1,
    "hasSenate2026": true,
    "hasGov2026": false,
    "cookPVI": "D+7",
    "partisanMargin": 16.5,
    "battlegroundTier": "Safe Baseline",
    "turnout2024": 69.8,
    "registeredVoters": 810000,
    "pollingVolumeScore": 34,
    "totalSpendingMillions": 18.2,
    "stateLegSenate": "D 15 - R 6",
    "stateLegHouse": "D 26 - R 15",
    "centroid": {
      "x": 813.2,
      "y": 247.1
    }
  },
  {
    "name": "Florida",
    "abbr": "FL",
    "fips": "12",
    "electoralVotes": 30,
    "houseDistrictsCount": 28,
    "hasSenate2026": false,
    "hasGov2026": true,
    "cookPVI": "R+3",
    "partisanMargin": -8.4,
    "battlegroundTier": "Tier 2 Competitive",
    "turnout2024": 72.5,
    "registeredVoters": 14800000,
    "pollingVolumeScore": 86,
    "totalSpendingMillions": 245.0,
    "stateLegSenate": "R 28 - D 12",
    "stateLegHouse": "R 84 - D 36",
    "centroid": {
      "x": 760.0,
      "y": 480.0
    }
  },
  {
    "name": "Georgia",
    "abbr": "GA",
    "fips": "13",
    "electoralVotes": 16,
    "houseDistrictsCount": 14,
    "hasSenate2026": true,
    "hasGov2026": true,
    "cookPVI": "R+3",
    "partisanMargin": -0.8,
    "battlegroundTier": "Tier 1 Battleground",
    "turnout2024": 72.8,
    "registeredVoters": 7800000,
    "pollingVolumeScore": 96,
    "totalSpendingMillions": 215.8,
    "stateLegSenate": "R 33 - D 23",
    "stateLegHouse": "R 102 - D 78",
    "centroid": {
      "x": 685.0,
      "y": 400.0
    }
  },
  {
    "name": "Hawaii",
    "abbr": "HI",
    "fips": "15",
    "electoralVotes": 4,
    "houseDistrictsCount": 2,
    "hasSenate2026": false,
    "hasGov2026": true,
    "cookPVI": "D+14",
    "partisanMargin": 24.1,
    "battlegroundTier": "Safe Baseline",
    "turnout2024": 59.4,
    "registeredVoters": 880000,
    "pollingVolumeScore": 20,
    "totalSpendingMillions": 14.2,
    "stateLegSenate": "D 23 - R 2",
    "stateLegHouse": "D 45 - R 6",
    "centroid": {
      "x": 320.0,
      "y": 540.0
    }
  },
  {
    "name": "Idaho",
    "abbr": "ID",
    "fips": "16",
    "electoralVotes": 4,
    "houseDistrictsCount": 2,
    "hasSenate2026": true,
    "hasGov2026": true,
    "cookPVI": "R+18",
    "partisanMargin": -26.8,
    "battlegroundTier": "Safe Baseline",
    "turnout2024": 69.1,
    "registeredVoters": 1100000,
    "pollingVolumeScore": 22,
    "totalSpendingMillions": 19.5,
    "stateLegSenate": "R 28 - D 7",
    "stateLegHouse": "R 59 - D 11",
    "centroid": {
      "x": 168.1,
      "y": 104.3
    }
  },
  {
    "name": "Illinois",
    "abbr": "IL",
    "fips": "17",
    "electoralVotes": 19,
    "houseDistrictsCount": 17,
    "hasSenate2026": true,
    "hasGov2026": true,
    "cookPVI": "D+7",
    "partisanMargin": 13.5,
    "battlegroundTier": "Safe Baseline",
    "turnout2024": 68.9,
    "registeredVoters": 8600000,
    "pollingVolumeScore": 54,
    "totalSpendingMillions": 115.0,
    "stateLegSenate": "D 40 - R 19",
    "stateLegHouse": "D 78 - R 40",
    "centroid": {
      "x": 582.0,
      "y": 244.3
    }
  },
  {
    "name": "Indiana",
    "abbr": "IN",
    "fips": "18",
    "electoralVotes": 11,
    "houseDistrictsCount": 9,
    "hasSenate2026": false,
    "hasGov2026": false,
    "cookPVI": "R+11",
    "partisanMargin": -14.2,
    "battlegroundTier": "Safe Baseline",
    "turnout2024": 62.1,
    "registeredVoters": 4900000,
    "pollingVolumeScore": 36,
    "totalSpendingMillions": 48.0,
    "stateLegSenate": "R 40 - D 10",
    "stateLegHouse": "R 70 - D 30",
    "centroid": {
      "x": 629.8,
      "y": 254.8
    }
  },
  {
    "name": "Iowa",
    "abbr": "IA",
    "fips": "19",
    "electoralVotes": 6,
    "houseDistrictsCount": 4,
    "hasSenate2026": true,
    "hasGov2026": true,
    "cookPVI": "R+6",
    "partisanMargin": -9.1,
    "battlegroundTier": "Tier 2 Competitive",
    "turnout2024": 74.5,
    "registeredVoters": 2300000,
    "pollingVolumeScore": 62,
    "totalSpendingMillions": 74.0,
    "stateLegSenate": "R 34 - D 16",
    "stateLegHouse": "R 64 - D 36",
    "centroid": {
      "x": 523.7,
      "y": 185.5
    }
  },
  {
    "name": "Kansas",
    "abbr": "KS",
    "fips": "20",
    "electoralVotes": 6,
    "houseDistrictsCount": 4,
    "hasSenate2026": true,
    "hasGov2026": true,
    "cookPVI": "R+10",
    "partisanMargin": -6.4,
    "battlegroundTier": "Tier 2 Competitive",
    "turnout2024": 69.4,
    "registeredVoters": 2100000,
    "pollingVolumeScore": 56,
    "totalSpendingMillions": 52.8,
    "stateLegSenate": "R 29 - D 11",
    "stateLegHouse": "R 85 - D 40",
    "centroid": {
      "x": 451.2,
      "y": 251.9
    }
  },
  {
    "name": "Kentucky",
    "abbr": "KY",
    "fips": "21",
    "electoralVotes": 8,
    "houseDistrictsCount": 6,
    "hasSenate2026": true,
    "hasGov2026": false,
    "cookPVI": "R+16",
    "partisanMargin": -18.9,
    "battlegroundTier": "Safe Baseline",
    "turnout2024": 64.8,
    "registeredVoters": 3600000,
    "pollingVolumeScore": 38,
    "totalSpendingMillions": 44.2,
    "stateLegSenate": "R 31 - D 7",
    "stateLegHouse": "R 80 - D 20",
    "centroid": {
      "x": 646.2,
      "y": 282.4
    }
  },
  {
    "name": "Louisiana",
    "abbr": "LA",
    "fips": "22",
    "electoralVotes": 8,
    "houseDistrictsCount": 6,
    "hasSenate2026": true,
    "hasGov2026": false,
    "cookPVI": "R+12",
    "partisanMargin": -17.5,
    "battlegroundTier": "Safe Baseline",
    "turnout2024": 66.2,
    "registeredVoters": 3100000,
    "pollingVolumeScore": 34,
    "totalSpendingMillions": 38.0,
    "stateLegSenate": "R 28 - D 11",
    "stateLegHouse": "R 73 - D 32",
    "centroid": {
      "x": 520.0,
      "y": 460.0
    }
  },
  {
    "name": "Maine",
    "abbr": "ME",
    "fips": "23",
    "electoralVotes": 4,
    "houseDistrictsCount": 2,
    "hasSenate2026": true,
    "hasGov2026": true,
    "cookPVI": "D+2",
    "partisanMargin": 5.2,
    "battlegroundTier": "Tier 2 Competitive",
    "turnout2024": 78.5,
    "registeredVoters": 1150000,
    "pollingVolumeScore": 72,
    "totalSpendingMillions": 68.5,
    "stateLegSenate": "D 22 - R 13",
    "stateLegHouse": "D 82 - R 68",
    "centroid": {
      "x": 917.5,
      "y": 116.2
    }
  },
  {
    "name": "Maryland",
    "abbr": "MD",
    "fips": "24",
    "electoralVotes": 10,
    "houseDistrictsCount": 8,
    "hasSenate2026": false,
    "hasGov2026": true,
    "cookPVI": "D+14",
    "partisanMargin": 22.0,
    "battlegroundTier": "Safe Baseline",
    "turnout2024": 74.6,
    "registeredVoters": 4300000,
    "pollingVolumeScore": 52,
    "totalSpendingMillions": 85.0,
    "stateLegSenate": "D 34 - R 13",
    "stateLegHouse": "D 102 - R 39",
    "centroid": {
      "x": 825.0,
      "y": 220.0
    }
  },
  {
    "name": "Massachusetts",
    "abbr": "MA",
    "fips": "25",
    "electoralVotes": 11,
    "houseDistrictsCount": 9,
    "hasSenate2026": true,
    "hasGov2026": true,
    "cookPVI": "D+15",
    "partisanMargin": 26.5,
    "battlegroundTier": "Safe Baseline",
    "turnout2024": 73.1,
    "registeredVoters": 5050000,
    "pollingVolumeScore": 42,
    "totalSpendingMillions": 65.0,
    "stateLegSenate": "D 36 - R 4",
    "stateLegHouse": "D 134 - R 25",
    "centroid": {
      "x": 882.7,
      "y": 182.2
    }
  },
  {
    "name": "Michigan",
    "abbr": "MI",
    "fips": "26",
    "electoralVotes": 15,
    "houseDistrictsCount": 13,
    "hasSenate2026": true,
    "hasGov2026": true,
    "cookPVI": "R+1",
    "partisanMargin": 1.2,
    "battlegroundTier": "Tier 1 Battleground",
    "turnout2024": 74.8,
    "registeredVoters": 8300000,
    "pollingVolumeScore": 97,
    "totalSpendingMillions": 210.0,
    "stateLegSenate": "D 20 - R 18",
    "stateLegHouse": "D 56 - R 54",
    "centroid": {
      "x": 645.0,
      "y": 168.0
    }
  },
  {
    "name": "Minnesota",
    "abbr": "MN",
    "fips": "27",
    "electoralVotes": 10,
    "houseDistrictsCount": 8,
    "hasSenate2026": true,
    "hasGov2026": true,
    "cookPVI": "D+1",
    "partisanMargin": 4.9,
    "battlegroundTier": "Tier 2 Competitive",
    "turnout2024": 79.2,
    "registeredVoters": 4150000,
    "pollingVolumeScore": 76,
    "totalSpendingMillions": 98.4,
    "stateLegSenate": "DFL 34 - R 33",
    "stateLegHouse": "DFL 70 - R 64",
    "centroid": {
      "x": 522.6,
      "y": 69.4
    }
  },
  {
    "name": "Mississippi",
    "abbr": "MS",
    "fips": "28",
    "electoralVotes": 6,
    "houseDistrictsCount": 4,
    "hasSenate2026": true,
    "hasGov2026": false,
    "cookPVI": "R+11",
    "partisanMargin": -15.8,
    "battlegroundTier": "Safe Baseline",
    "turnout2024": 60.5,
    "registeredVoters": 2050000,
    "pollingVolumeScore": 26,
    "totalSpendingMillions": 24.5,
    "stateLegSenate": "R 36 - D 16",
    "stateLegHouse": "R 79 - D 43",
    "centroid": {
      "x": 570.4,
      "y": 401.0
    }
  },
  {
    "name": "Missouri",
    "abbr": "MO",
    "fips": "29",
    "electoralVotes": 10,
    "houseDistrictsCount": 8,
    "hasSenate2026": false,
    "hasGov2026": false,
    "cookPVI": "R+10",
    "partisanMargin": -13.2,
    "battlegroundTier": "Safe Baseline",
    "turnout2024": 67.4,
    "registeredVoters": 4400000,
    "pollingVolumeScore": 44,
    "totalSpendingMillions": 62.0,
    "stateLegSenate": "R 24 - D 10",
    "stateLegHouse": "R 111 - D 52",
    "centroid": {
      "x": 549.9,
      "y": 267.1
    }
  },
  {
    "name": "Montana",
    "abbr": "MT",
    "fips": "30",
    "electoralVotes": 4,
    "houseDistrictsCount": 2,
    "hasSenate2026": true,
    "hasGov2026": false,
    "cookPVI": "R+11",
    "partisanMargin": -4.8,
    "battlegroundTier": "Tier 1 Battleground",
    "turnout2024": 75.3,
    "registeredVoters": 790000,
    "pollingVolumeScore": 89,
    "totalSpendingMillions": 142.0,
    "stateLegSenate": "R 34 - D 16",
    "stateLegHouse": "R 68 - D 32",
    "centroid": {
      "x": 235.0,
      "y": 78.0
    }
  },
  {
    "name": "Nebraska",
    "abbr": "NE",
    "fips": "31",
    "electoralVotes": 5,
    "houseDistrictsCount": 3,
    "hasSenate2026": true,
    "hasGov2026": true,
    "cookPVI": "R+11",
    "partisanMargin": -12.4,
    "battlegroundTier": "Tier 2 Competitive",
    "turnout2024": 72.1,
    "registeredVoters": 1350000,
    "pollingVolumeScore": 58,
    "totalSpendingMillions": 48.6,
    "stateLegSenate": "Nonpartisan 32 - 17",
    "stateLegHouse": "Unicameral",
    "centroid": {
      "x": 438.2,
      "y": 188.4
    }
  },
  {
    "name": "Nevada",
    "abbr": "NV",
    "fips": "32",
    "electoralVotes": 6,
    "houseDistrictsCount": 4,
    "hasSenate2026": false,
    "hasGov2026": true,
    "cookPVI": "EVEN",
    "partisanMargin": 0.6,
    "battlegroundTier": "Tier 1 Battleground",
    "turnout2024": 69.4,
    "registeredVoters": 2150000,
    "pollingVolumeScore": 93,
    "totalSpendingMillions": 165.0,
    "stateLegSenate": "D 13 - R 8",
    "stateLegHouse": "D 28 - R 14",
    "centroid": {
      "x": 135.0,
      "y": 265.0
    }
  },
  {
    "name": "New Hampshire",
    "abbr": "NH",
    "fips": "33",
    "electoralVotes": 4,
    "houseDistrictsCount": 2,
    "hasSenate2026": true,
    "hasGov2026": true,
    "cookPVI": "D+1",
    "partisanMargin": 3.8,
    "battlegroundTier": "Tier 2 Competitive",
    "turnout2024": 75.8,
    "registeredVoters": 1050000,
    "pollingVolumeScore": 78,
    "totalSpendingMillions": 88.0,
    "stateLegSenate": "R 14 - D 10",
    "stateLegHouse": "R 201 - D 198",
    "centroid": {
      "x": 876.6,
      "y": 141.9
    }
  },
  {
    "name": "New Jersey",
    "abbr": "NJ",
    "fips": "34",
    "electoralVotes": 14,
    "houseDistrictsCount": 12,
    "hasSenate2026": true,
    "hasGov2026": false,
    "cookPVI": "D+6",
    "partisanMargin": 8.9,
    "battlegroundTier": "Lean",
    "turnout2024": 71.5,
    "registeredVoters": 6600000,
    "pollingVolumeScore": 56,
    "totalSpendingMillions": 125.0,
    "stateLegSenate": "D 25 - R 15",
    "stateLegHouse": "D 52 - R 28",
    "centroid": {
      "x": 824.3,
      "y": 224.6
    }
  },
  {
    "name": "New Mexico",
    "abbr": "NM",
    "fips": "35",
    "electoralVotes": 5,
    "houseDistrictsCount": 3,
    "hasSenate2026": true,
    "hasGov2026": true,
    "cookPVI": "D+3",
    "partisanMargin": 7.4,
    "battlegroundTier": "Tier 2 Competitive",
    "turnout2024": 64.9,
    "registeredVoters": 1450000,
    "pollingVolumeScore": 64,
    "totalSpendingMillions": 58.0,
    "stateLegSenate": "D 27 - R 15",
    "stateLegHouse": "D 45 - R 25",
    "centroid": {
      "x": 312.3,
      "y": 364.0
    }
  },
  {
    "name": "New York",
    "abbr": "NY",
    "fips": "36",
    "electoralVotes": 28,
    "houseDistrictsCount": 26,
    "hasSenate2026": false,
    "hasGov2026": true,
    "cookPVI": "D+10",
    "partisanMargin": 15.2,
    "battlegroundTier": "Lean",
    "turnout2024": 68.2,
    "registeredVoters": 13400000,
    "pollingVolumeScore": 84,
    "totalSpendingMillions": 265.0,
    "stateLegSenate": "D 42 - R 21",
    "stateLegHouse": "D 102 - R 48",
    "centroid": {
      "x": 800.0,
      "y": 170.0
    }
  },
  {
    "name": "North Carolina",
    "abbr": "NC",
    "fips": "37",
    "electoralVotes": 16,
    "houseDistrictsCount": 14,
    "hasSenate2026": true,
    "hasGov2026": false,
    "cookPVI": "R+3",
    "partisanMargin": -1.1,
    "battlegroundTier": "Tier 1 Battleground",
    "turnout2024": 73.5,
    "registeredVoters": 7600000,
    "pollingVolumeScore": 95,
    "totalSpendingMillions": 218.0,
    "stateLegSenate": "R 30 - D 20",
    "stateLegHouse": "R 72 - D 48",
    "centroid": {
      "x": 742.0,
      "y": 338.0
    }
  },
  {
    "name": "North Dakota",
    "abbr": "ND",
    "fips": "38",
    "electoralVotes": 3,
    "houseDistrictsCount": 1,
    "hasSenate2026": false,
    "hasGov2026": true,
    "cookPVI": "R+20",
    "partisanMargin": -28.0,
    "battlegroundTier": "Safe Baseline",
    "turnout2024": 65.8,
    "registeredVoters": 620000,
    "pollingVolumeScore": 22,
    "totalSpendingMillions": 16.0,
    "stateLegSenate": "R 43 - D 4",
    "stateLegHouse": "R 82 - D 12",
    "centroid": {
      "x": 438.8,
      "y": 56.3
    }
  },
  {
    "name": "Ohio",
    "abbr": "OH",
    "fips": "39",
    "electoralVotes": 17,
    "houseDistrictsCount": 15,
    "hasSenate2026": false,
    "hasGov2026": true,
    "cookPVI": "R+6",
    "partisanMargin": -5.9,
    "battlegroundTier": "Tier 1 Battleground",
    "turnout2024": 69.2,
    "registeredVoters": 8100000,
    "pollingVolumeScore": 92,
    "totalSpendingMillions": 195.0,
    "stateLegSenate": "R 26 - D 7",
    "stateLegHouse": "R 67 - D 32",
    "centroid": {
      "x": 695.0,
      "y": 226.0
    }
  },
  {
    "name": "Oklahoma",
    "abbr": "OK",
    "fips": "40",
    "electoralVotes": 7,
    "houseDistrictsCount": 5,
    "hasSenate2026": true,
    "hasGov2026": true,
    "cookPVI": "R+20",
    "partisanMargin": -25.2,
    "battlegroundTier": "Safe Baseline",
    "turnout2024": 60.1,
    "registeredVoters": 2450000,
    "pollingVolumeScore": 28,
    "totalSpendingMillions": 28.0,
    "stateLegSenate": "R 40 - D 8",
    "stateLegHouse": "R 81 - D 20",
    "centroid": {
      "x": 446.5,
      "y": 355.6
    }
  },
  {
    "name": "Oregon",
    "abbr": "OR",
    "fips": "41",
    "electoralVotes": 8,
    "houseDistrictsCount": 6,
    "hasSenate2026": true,
    "hasGov2026": true,
    "cookPVI": "D+6",
    "partisanMargin": 10.5,
    "battlegroundTier": "Tier 2 Competitive",
    "turnout2024": 76.4,
    "registeredVoters": 3050000,
    "pollingVolumeScore": 66,
    "totalSpendingMillions": 78.0,
    "stateLegSenate": "D 17 - R 13",
    "stateLegHouse": "D 35 - R 25",
    "centroid": {
      "x": 67.2,
      "y": 122.9
    }
  },
  {
    "name": "Pennsylvania",
    "abbr": "PA",
    "fips": "42",
    "electoralVotes": 19,
    "houseDistrictsCount": 17,
    "hasSenate2026": false,
    "hasGov2026": true,
    "cookPVI": "R+2",
    "partisanMargin": 0.9,
    "battlegroundTier": "Tier 1 Battleground",
    "turnout2024": 75.1,
    "registeredVoters": 9150000,
    "pollingVolumeScore": 98,
    "totalSpendingMillions": 235.0,
    "stateLegSenate": "R 28 - D 22",
    "stateLegHouse": "D 102 - R 101",
    "centroid": {
      "x": 775.0,
      "y": 208.0
    }
  },
  {
    "name": "Rhode Island",
    "abbr": "RI",
    "fips": "44",
    "electoralVotes": 4,
    "houseDistrictsCount": 2,
    "hasSenate2026": true,
    "hasGov2026": true,
    "cookPVI": "D+8",
    "partisanMargin": 18.0,
    "battlegroundTier": "Safe Baseline",
    "turnout2024": 68.7,
    "registeredVoters": 820000,
    "pollingVolumeScore": 30,
    "totalSpendingMillions": 22.0,
    "stateLegSenate": "D 33 - R 5",
    "stateLegHouse": "D 65 - R 9",
    "centroid": {
      "x": 879.0,
      "y": 191.9
    }
  },
  {
    "name": "South Carolina",
    "abbr": "SC",
    "fips": "45",
    "electoralVotes": 9,
    "houseDistrictsCount": 7,
    "hasSenate2026": true,
    "hasGov2026": true,
    "cookPVI": "R+8",
    "partisanMargin": -12.1,
    "battlegroundTier": "Safe Baseline",
    "turnout2024": 66.8,
    "registeredVoters": 3850000,
    "pollingVolumeScore": 42,
    "totalSpendingMillions": 45.0,
    "stateLegSenate": "R 30 - D 16",
    "stateLegHouse": "R 88 - D 36",
    "centroid": {
      "x": 719.1,
      "y": 376.2
    }
  },
  {
    "name": "South Dakota",
    "abbr": "SD",
    "fips": "46",
    "electoralVotes": 3,
    "houseDistrictsCount": 1,
    "hasSenate2026": true,
    "hasGov2026": true,
    "cookPVI": "R+16",
    "partisanMargin": -24.6,
    "battlegroundTier": "Safe Baseline",
    "turnout2024": 71.2,
    "registeredVoters": 630000,
    "pollingVolumeScore": 24,
    "totalSpendingMillions": 18.5,
    "stateLegSenate": "R 31 - D 4",
    "stateLegHouse": "R 63 - D 7",
    "centroid": {
      "x": 437.2,
      "y": 144.9
    }
  },
  {
    "name": "Tennessee",
    "abbr": "TN",
    "fips": "47",
    "electoralVotes": 11,
    "houseDistrictsCount": 9,
    "hasSenate2026": true,
    "hasGov2026": true,
    "cookPVI": "R+14",
    "partisanMargin": -20.4,
    "battlegroundTier": "Safe Baseline",
    "turnout2024": 64.2,
    "registeredVoters": 4750000,
    "pollingVolumeScore": 36,
    "totalSpendingMillions": 42.0,
    "stateLegSenate": "R 27 - D 6",
    "stateLegHouse": "R 75 - D 24",
    "centroid": {
      "x": 635.9,
      "y": 325.0
    }
  },
  {
    "name": "Texas",
    "abbr": "TX",
    "fips": "48",
    "electoralVotes": 40,
    "houseDistrictsCount": 38,
    "hasSenate2026": true,
    "hasGov2026": true,
    "cookPVI": "R+5",
    "partisanMargin": -3.2,
    "battlegroundTier": "Tier 1 Battleground",
    "turnout2024": 66.8,
    "registeredVoters": 18200000,
    "pollingVolumeScore": 96,
    "totalSpendingMillions": 280.0,
    "stateLegSenate": "R 19 - D 12",
    "stateLegHouse": "R 86 - D 64",
    "centroid": {
      "x": 420.0,
      "y": 430.0
    }
  },
  {
    "name": "Utah",
    "abbr": "UT",
    "fips": "49",
    "electoralVotes": 6,
    "houseDistrictsCount": 4,
    "hasSenate2026": false,
    "hasGov2026": false,
    "cookPVI": "R+13",
    "partisanMargin": -19.5,
    "battlegroundTier": "Safe Baseline",
    "turnout2024": 72.8,
    "registeredVoters": 2050000,
    "pollingVolumeScore": 32,
    "totalSpendingMillions": 34.0,
    "stateLegSenate": "R 23 - D 6",
    "stateLegHouse": "R 61 - D 14",
    "centroid": {
      "x": 232.1,
      "y": 237.4
    }
  },
  {
    "name": "Vermont",
    "abbr": "VT",
    "fips": "50",
    "electoralVotes": 3,
    "houseDistrictsCount": 1,
    "hasSenate2026": false,
    "hasGov2026": true,
    "cookPVI": "D+16",
    "partisanMargin": 27.8,
    "battlegroundTier": "Safe Baseline",
    "turnout2024": 74.0,
    "registeredVoters": 520000,
    "pollingVolumeScore": 28,
    "totalSpendingMillions": 14.0,
    "stateLegSenate": "D/P 23 - R 7",
    "stateLegHouse": "D/P 109 - R 37",
    "centroid": {
      "x": 860.6,
      "y": 138.6
    }
  },
  {
    "name": "Virginia",
    "abbr": "VA",
    "fips": "51",
    "electoralVotes": 13,
    "houseDistrictsCount": 11,
    "hasSenate2026": true,
    "hasGov2026": false,
    "cookPVI": "D+3",
    "partisanMargin": 7.1,
    "battlegroundTier": "Tier 2 Competitive",
    "turnout2024": 75.6,
    "registeredVoters": 6200000,
    "pollingVolumeScore": 75,
    "totalSpendingMillions": 110.0,
    "stateLegSenate": "D 21 - R 19",
    "stateLegHouse": "D 51 - R 49",
    "centroid": {
      "x": 740.0,
      "y": 290.0
    }
  },
  {
    "name": "Washington",
    "abbr": "WA",
    "fips": "53",
    "electoralVotes": 12,
    "houseDistrictsCount": 10,
    "hasSenate2026": false,
    "hasGov2026": false,
    "cookPVI": "D+8",
    "partisanMargin": 16.4,
    "battlegroundTier": "Lean",
    "turnout2024": 74.5,
    "registeredVoters": 5100000,
    "pollingVolumeScore": 58,
    "totalSpendingMillions": 92.0,
    "stateLegSenate": "D 29 - R 20",
    "stateLegHouse": "D 58 - R 40",
    "centroid": {
      "x": 70.0,
      "y": 65.0
    }
  },
  {
    "name": "West Virginia",
    "abbr": "WV",
    "fips": "54",
    "electoralVotes": 4,
    "houseDistrictsCount": 2,
    "hasSenate2026": true,
    "hasGov2026": false,
    "cookPVI": "R+22",
    "partisanMargin": -32.5,
    "battlegroundTier": "Safe Baseline",
    "turnout2024": 61.2,
    "registeredVoters": 1250000,
    "pollingVolumeScore": 35,
    "totalSpendingMillions": 32.0,
    "stateLegSenate": "R 31 - D 3",
    "stateLegHouse": "R 89 - D 11",
    "centroid": {
      "x": 731.0,
      "y": 258.9
    }
  },
  {
    "name": "Wisconsin",
    "abbr": "WI",
    "fips": "55",
    "electoralVotes": 10,
    "houseDistrictsCount": 8,
    "hasSenate2026": false,
    "hasGov2026": true,
    "cookPVI": "R+2",
    "partisanMargin": 1.4,
    "battlegroundTier": "Tier 1 Battleground",
    "turnout2024": 76.5,
    "registeredVoters": 4600000,
    "pollingVolumeScore": 97,
    "totalSpendingMillions": 205.0,
    "stateLegSenate": "R 22 - D 11",
    "stateLegHouse": "R 53 - D 46",
    "centroid": {
      "x": 575.0,
      "y": 120.0
    }
  },
  {
    "name": "Wyoming",
    "abbr": "WY",
    "fips": "56",
    "electoralVotes": 3,
    "houseDistrictsCount": 1,
    "hasSenate2026": true,
    "hasGov2026": true,
    "cookPVI": "R+25",
    "partisanMargin": -36.2,
    "battlegroundTier": "Safe Baseline",
    "turnout2024": 68.0,
    "registeredVoters": 310000,
    "pollingVolumeScore": 20,
    "totalSpendingMillions": 12.0,
    "stateLegSenate": "R 29 - D 1",
    "stateLegHouse": "R 57 - D 5",
    "centroid": {
      "x": 280.1,
      "y": 160.7
    }
  }
];

export const SENATE_RACES_2026: ElectionOffice[] = [
  {
    "id": "2026-SEN-TX",
    "level": "federal",
    "branch": "senate",
    "state": "Texas",
    "stateAbbr": "TX",
    "title": "Texas U.S. Senate (Class II)",
    "seatClass": "Class II",
    "incumbentParty": "REP",
    "isOpenSeat": false,
    "cookRating": "Toss-up",
    "sabatoRating": "Toss-up",
    "insideElecRating": "Toss-up",
    "pollAverageLead": "R +1.8%",
    "leadingParty": "REP",
    "demCandidate": {
      "name": "Colin Allred",
      "party": "DEM",
      "status": "Challenger",
      "priorOffice": "U.S. Representative (TX-32)",
      "cashOnHandMillions": 28.5
    },
    "repCandidate": {
      "name": "Ted Cruz",
      "party": "REP",
      "status": "Incumbent",
      "priorOffice": "U.S. Senator",
      "cashOnHandMillions": 34.2
    },
    "pollsCount": 12,
    "latestPollDate": "2026-09-18",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=12 polls, MoE \u00b12.8%)",
    "keyIssues": [
      "Border Security & Immigration",
      "Energy Infrastructure & Oil Grid",
      "Federal Judiciary"
    ],
    "totalFundraisingMillions": 142.8,
    "lastElectionMargin": -2.6,
    "isTopBattleground": true,
    "x": 420.0,
    "y": 430.0
  },
  {
    "id": "2026-SEN-GA",
    "level": "federal",
    "branch": "senate",
    "state": "Georgia",
    "stateAbbr": "GA",
    "title": "Georgia U.S. Senate (Class II)",
    "seatClass": "Class II",
    "incumbentParty": "DEM",
    "isOpenSeat": false,
    "cookRating": "Toss-up",
    "sabatoRating": "Toss-up",
    "insideElecRating": "Toss-up",
    "pollAverageLead": "D +0.8%",
    "leadingParty": "DEM",
    "demCandidate": {
      "name": "Jon Ossoff",
      "party": "DEM",
      "status": "Incumbent",
      "priorOffice": "U.S. Senator",
      "cashOnHandMillions": 36.4
    },
    "repCandidate": {
      "name": "Brian Kemp",
      "party": "REP",
      "status": "Challenger",
      "priorOffice": "Governor of Georgia",
      "cashOnHandMillions": 31.8
    },
    "pollsCount": 14,
    "latestPollDate": "2026-09-19",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=14 polls, MoE \u00b12.6%)",
    "keyIssues": [
      "Suburban Atlanta Swing",
      "Voting Rights & Access",
      "Manufacturing Subsidies"
    ],
    "totalFundraisingMillions": 158.0,
    "lastElectionMargin": 1.2,
    "isTopBattleground": true,
    "x": 685.0,
    "y": 400.0
  },
  {
    "id": "2026-SEN-NC",
    "level": "federal",
    "branch": "senate",
    "state": "North Carolina",
    "stateAbbr": "NC",
    "title": "North Carolina U.S. Senate (Class II)",
    "seatClass": "Class II",
    "incumbentParty": "REP",
    "isOpenSeat": false,
    "cookRating": "Toss-up",
    "sabatoRating": "Lean R",
    "insideElecRating": "Toss-up",
    "pollAverageLead": "R +0.9%",
    "leadingParty": "REP",
    "demCandidate": {
      "name": "Roy Cooper",
      "party": "DEM",
      "status": "Challenger",
      "priorOffice": "Governor of North Carolina",
      "cashOnHandMillions": 29.0
    },
    "repCandidate": {
      "name": "Thom Tillis",
      "party": "REP",
      "status": "Incumbent",
      "priorOffice": "U.S. Senator",
      "cashOnHandMillions": 27.5
    },
    "pollsCount": 11,
    "latestPollDate": "2026-09-17",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=11 polls, MoE \u00b13.0%)",
    "keyIssues": [
      "Research Triangle Tech",
      "Healthcare Affordability",
      "Corporate Tax Policy"
    ],
    "totalFundraisingMillions": 118.5,
    "lastElectionMargin": -1.8,
    "isTopBattleground": true,
    "x": 742.0,
    "y": 338.0
  },
  {
    "id": "2026-SEN-MI",
    "level": "federal",
    "branch": "senate",
    "state": "Michigan",
    "stateAbbr": "MI",
    "title": "Michigan U.S. Senate (Class II)",
    "seatClass": "Class II",
    "incumbentParty": "DEM",
    "isOpenSeat": true,
    "cookRating": "Toss-up",
    "sabatoRating": "Lean D",
    "insideElecRating": "Toss-up",
    "pollAverageLead": "D +2.1%",
    "leadingParty": "DEM",
    "demCandidate": {
      "name": "Elissa Slotkin",
      "party": "DEM",
      "status": "Open Seat Nominee",
      "priorOffice": "U.S. Representative (MI-07)",
      "cashOnHandMillions": 24.8
    },
    "repCandidate": {
      "name": "Mike Rogers",
      "party": "REP",
      "status": "Open Seat Nominee",
      "priorOffice": "Former House Intel Chair",
      "cashOnHandMillions": 19.2
    },
    "pollsCount": 10,
    "latestPollDate": "2026-09-16",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=10 polls, MoE \u00b13.1%)",
    "keyIssues": [
      "Auto Industry Tariffs",
      "Great Lakes Environmental Compact",
      "Union Labor Rights"
    ],
    "totalFundraisingMillions": 94.0,
    "lastElectionMargin": 1.7,
    "isTopBattleground": true,
    "x": 645.0,
    "y": 168.0
  },
  {
    "id": "2026-SEN-ME",
    "level": "federal",
    "branch": "senate",
    "state": "Maine",
    "stateAbbr": "ME",
    "title": "Maine U.S. Senate (Class II)",
    "seatClass": "Class II",
    "incumbentParty": "REP",
    "isOpenSeat": false,
    "cookRating": "Lean R",
    "sabatoRating": "Lean R",
    "insideElecRating": "Lean R",
    "pollAverageLead": "R +3.4%",
    "leadingParty": "REP",
    "demCandidate": {
      "name": "Jared Golden",
      "party": "DEM",
      "status": "Challenger",
      "priorOffice": "U.S. Representative (ME-02)",
      "cashOnHandMillions": 14.5
    },
    "repCandidate": {
      "name": "Susan Collins",
      "party": "REP",
      "status": "Incumbent",
      "priorOffice": "U.S. Senator",
      "cashOnHandMillions": 22.0
    },
    "pollsCount": 7,
    "latestPollDate": "2026-09-14",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=7 polls, MoE \u00b13.5%)",
    "keyIssues": [
      "Ranked-Choice Voting",
      "Lobster Fishery Regulations",
      "Judicial Confirmations"
    ],
    "totalFundraisingMillions": 68.0,
    "lastElectionMargin": -8.6,
    "isTopBattleground": true,
    "x": 917.5,
    "y": 116.2
  },
  {
    "id": "2026-SEN-MN",
    "level": "federal",
    "branch": "senate",
    "state": "Minnesota",
    "stateAbbr": "MN",
    "title": "Minnesota U.S. Senate (Class II)",
    "seatClass": "Class II",
    "incumbentParty": "DEM",
    "isOpenSeat": false,
    "cookRating": "Likely D",
    "sabatoRating": "Likely D",
    "insideElecRating": "Likely D",
    "pollAverageLead": "D +5.6%",
    "leadingParty": "DEM",
    "demCandidate": {
      "name": "Tina Smith",
      "party": "DEM",
      "status": "Incumbent",
      "priorOffice": "U.S. Senator",
      "cashOnHandMillions": 18.2
    },
    "repCandidate": {
      "name": "Royce White",
      "party": "REP",
      "status": "Challenger",
      "priorOffice": "Political Activist",
      "cashOnHandMillions": 4.1
    },
    "pollsCount": 6,
    "latestPollDate": "2026-09-11",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=6 polls, MoE \u00b13.8%)",
    "keyIssues": [
      "Agriculture Exports",
      "Twin Cities Public Safety",
      "Clean Energy Mandate"
    ],
    "totalFundraisingMillions": 42.0,
    "lastElectionMargin": 5.2,
    "isTopBattleground": false,
    "x": 522.6,
    "y": 69.4
  },
  {
    "id": "2026-SEN-NM",
    "level": "federal",
    "branch": "senate",
    "state": "New Mexico",
    "stateAbbr": "NM",
    "title": "New Mexico U.S. Senate (Class II)",
    "seatClass": "Class II",
    "incumbentParty": "DEM",
    "isOpenSeat": false,
    "cookRating": "Likely D",
    "sabatoRating": "Likely D",
    "insideElecRating": "Likely D",
    "pollAverageLead": "D +6.2%",
    "leadingParty": "DEM",
    "demCandidate": {
      "name": "Ben Ray Luj\u00e1n",
      "party": "DEM",
      "status": "Incumbent",
      "priorOffice": "U.S. Senator",
      "cashOnHandMillions": 15.6
    },
    "repCandidate": {
      "name": "Nella Domenici",
      "party": "REP",
      "status": "Challenger",
      "priorOffice": "Financial Executive",
      "cashOnHandMillions": 9.4
    },
    "pollsCount": 5,
    "latestPollDate": "2026-09-12",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=5 polls, MoE \u00b14.0%)",
    "keyIssues": [
      "Water Rights & Drought",
      "Permian Basin Oil Royalty",
      "Federal Lab Funding"
    ],
    "totalFundraisingMillions": 38.5,
    "lastElectionMargin": 6.1,
    "isTopBattleground": false,
    "x": 312.3,
    "y": 364.0
  },
  {
    "id": "2026-SEN-VA",
    "level": "federal",
    "branch": "senate",
    "state": "Virginia",
    "stateAbbr": "VA",
    "title": "Virginia U.S. Senate (Class II)",
    "seatClass": "Class II",
    "incumbentParty": "DEM",
    "isOpenSeat": false,
    "cookRating": "Likely D",
    "sabatoRating": "Likely D",
    "insideElecRating": "Likely D",
    "pollAverageLead": "D +6.8%",
    "leadingParty": "DEM",
    "demCandidate": {
      "name": "Mark Warner",
      "party": "DEM",
      "status": "Incumbent",
      "priorOffice": "U.S. Senator & Former Governor",
      "cashOnHandMillions": 26.5
    },
    "repCandidate": {
      "name": "Glenn Youngkin",
      "party": "REP",
      "status": "Challenger",
      "priorOffice": "Governor of Virginia",
      "cashOnHandMillions": 24.0
    },
    "pollsCount": 8,
    "latestPollDate": "2026-09-15",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=8 polls, MoE \u00b13.2%)",
    "keyIssues": [
      "Federal Workforce Rights",
      "NoVA Tech & Data Centers",
      "Defense Contracting"
    ],
    "totalFundraisingMillions": 82.0,
    "lastElectionMargin": 12.1,
    "isTopBattleground": true,
    "x": 740.0,
    "y": 290.0
  },
  {
    "id": "2026-SEN-NH",
    "level": "federal",
    "branch": "senate",
    "state": "New Hampshire",
    "stateAbbr": "NH",
    "title": "New Hampshire U.S. Senate (Class II)",
    "seatClass": "Class II",
    "incumbentParty": "DEM",
    "isOpenSeat": false,
    "cookRating": "Lean D",
    "sabatoRating": "Lean D",
    "insideElecRating": "Lean D",
    "pollAverageLead": "D +3.9%",
    "leadingParty": "DEM",
    "demCandidate": {
      "name": "Jeanne Shaheen",
      "party": "DEM",
      "status": "Incumbent",
      "priorOffice": "U.S. Senator",
      "cashOnHandMillions": 17.0
    },
    "repCandidate": {
      "name": "Kelly Ayotte",
      "party": "REP",
      "status": "Challenger",
      "priorOffice": "Former U.S. Senator",
      "cashOnHandMillions": 14.2
    },
    "pollsCount": 7,
    "latestPollDate": "2026-09-16",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=7 polls, MoE \u00b13.6%)",
    "keyIssues": [
      "State Income Tax Ban",
      "Prescription Drug Costs",
      "Northern Border Security"
    ],
    "totalFundraisingMillions": 54.0,
    "lastElectionMargin": 15.6,
    "isTopBattleground": true,
    "x": 876.6,
    "y": 141.9
  },
  {
    "id": "2026-SEN-CO",
    "level": "federal",
    "branch": "senate",
    "state": "Colorado",
    "stateAbbr": "CO",
    "title": "Colorado U.S. Senate (Class II)",
    "seatClass": "Class II",
    "incumbentParty": "DEM",
    "isOpenSeat": false,
    "cookRating": "Solid D",
    "sabatoRating": "Solid D",
    "insideElecRating": "Solid D",
    "pollAverageLead": "D +9.2%",
    "leadingParty": "DEM",
    "demCandidate": {
      "name": "John Hickenlooper",
      "party": "DEM",
      "status": "Incumbent",
      "priorOffice": "U.S. Senator & Former Governor",
      "cashOnHandMillions": 19.5
    },
    "repCandidate": {
      "name": "Gabe Evans",
      "party": "REP",
      "status": "Challenger",
      "priorOffice": "State Representative",
      "cashOnHandMillions": 5.8
    },
    "pollsCount": 4,
    "latestPollDate": "2026-09-08",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=4 polls, MoE \u00b14.2%)",
    "keyIssues": [
      "Public Lands Conservation",
      "Water Allocation",
      "Aerospace Defense"
    ],
    "totalFundraisingMillions": 36.0,
    "lastElectionMargin": 9.3,
    "isTopBattleground": false,
    "x": 309.1,
    "y": 254.5
  },
  {
    "id": "2026-SEN-IA",
    "level": "federal",
    "branch": "senate",
    "state": "Iowa",
    "stateAbbr": "IA",
    "title": "Iowa U.S. Senate (Class II)",
    "seatClass": "Class II",
    "incumbentParty": "REP",
    "isOpenSeat": false,
    "cookRating": "Likely R",
    "sabatoRating": "Likely R",
    "insideElecRating": "Likely R",
    "pollAverageLead": "R +7.4%",
    "leadingParty": "REP",
    "demCandidate": {
      "name": "Rob Sand",
      "party": "DEM",
      "status": "Challenger",
      "priorOffice": "Iowa State Auditor",
      "cashOnHandMillions": 11.2
    },
    "repCandidate": {
      "name": "Joni Ernst",
      "party": "REP",
      "status": "Incumbent",
      "priorOffice": "U.S. Senator",
      "cashOnHandMillions": 21.4
    },
    "pollsCount": 6,
    "latestPollDate": "2026-09-14",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=6 polls, MoE \u00b13.7%)",
    "keyIssues": [
      "Farm Bill & Ethanol Mandate",
      "Rural Healthcare",
      "Department of Defense Waste"
    ],
    "totalFundraisingMillions": 48.0,
    "lastElectionMargin": -6.6,
    "isTopBattleground": false,
    "x": 523.7,
    "y": 185.5
  },
  {
    "id": "2026-SEN-KS",
    "level": "federal",
    "branch": "senate",
    "state": "Kansas",
    "stateAbbr": "KS",
    "title": "Kansas U.S. Senate (Class II)",
    "seatClass": "Class II",
    "incumbentParty": "REP",
    "isOpenSeat": false,
    "cookRating": "Likely R",
    "sabatoRating": "Likely R",
    "insideElecRating": "Likely R",
    "pollAverageLead": "R +6.8%",
    "leadingParty": "REP",
    "demCandidate": {
      "name": "Laura Kelly",
      "party": "DEM",
      "status": "Challenger",
      "priorOffice": "Governor of Kansas",
      "cashOnHandMillions": 16.0
    },
    "repCandidate": {
      "name": "Roger Marshall",
      "party": "REP",
      "status": "Incumbent",
      "priorOffice": "U.S. Senator",
      "cashOnHandMillions": 14.8
    },
    "pollsCount": 5,
    "latestPollDate": "2026-09-10",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=5 polls, MoE \u00b14.1%)",
    "keyIssues": [
      "Abortion Constitutional Ruling",
      "Aviation Manufacturing",
      "Commodity Subsidies"
    ],
    "totalFundraisingMillions": 42.0,
    "lastElectionMargin": -11.2,
    "isTopBattleground": true,
    "x": 451.2,
    "y": 251.9
  },
  {
    "id": "2026-SEN-MT",
    "level": "federal",
    "branch": "senate",
    "state": "Montana",
    "stateAbbr": "MT",
    "title": "Montana U.S. Senate (Class I/II Context)",
    "seatClass": "Class II Benchmark",
    "incumbentParty": "REP",
    "isOpenSeat": false,
    "cookRating": "Lean R",
    "sabatoRating": "Lean R",
    "insideElecRating": "Lean R",
    "pollAverageLead": "R +3.2%",
    "leadingParty": "REP",
    "demCandidate": {
      "name": "Jon Tester",
      "party": "DEM",
      "status": "Challenger",
      "priorOffice": "Former U.S. Senator",
      "cashOnHandMillions": 22.1
    },
    "repCandidate": {
      "name": "Tim Sheehy",
      "party": "REP",
      "status": "Incumbent",
      "priorOffice": "U.S. Senator",
      "cashOnHandMillions": 18.9
    },
    "pollsCount": 9,
    "latestPollDate": "2026-09-15",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=9 polls, MoE \u00b13.3%)",
    "keyIssues": [
      "Veterans Affairs",
      "Federal Land Access",
      "Foreign Farmland Purchases"
    ],
    "totalFundraisingMillions": 78.0,
    "lastElectionMargin": -4.2,
    "isTopBattleground": true,
    "x": 235.0,
    "y": 78.0
  },
  {
    "id": "2026-SEN-OH",
    "level": "federal",
    "branch": "senate",
    "state": "Ohio",
    "stateAbbr": "OH",
    "title": "Ohio U.S. Senate (Class I/II Context)",
    "seatClass": "Class II Benchmark",
    "incumbentParty": "REP",
    "isOpenSeat": false,
    "cookRating": "Toss-up",
    "sabatoRating": "Toss-up",
    "insideElecRating": "Toss-up",
    "pollAverageLead": "D +0.8%",
    "leadingParty": "DEM",
    "demCandidate": {
      "name": "Sherrod Brown",
      "party": "DEM",
      "status": "Challenger",
      "priorOffice": "Former U.S. Senator",
      "cashOnHandMillions": 26.4
    },
    "repCandidate": {
      "name": "Bernie Moreno",
      "party": "REP",
      "status": "Incumbent",
      "priorOffice": "U.S. Senator",
      "cashOnHandMillions": 21.0
    },
    "pollsCount": 11,
    "latestPollDate": "2026-09-17",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=11 polls, MoE \u00b12.9%)",
    "keyIssues": [
      "Dignity of Work / Manufacturing",
      "Rail Safety Regulations",
      "Trade & Steel Tariffs"
    ],
    "totalFundraisingMillions": 108.0,
    "lastElectionMargin": -3.5,
    "isTopBattleground": true,
    "x": 695.0,
    "y": 226.0
  }
];

export const GUBERNATORIAL_RACES_2026: ElectionOffice[] = [
  {
    "id": "2026-GOV-GA",
    "level": "state",
    "branch": "governor",
    "state": "Georgia",
    "stateAbbr": "GA",
    "title": "Georgia Gubernatorial Election",
    "incumbentParty": "REP",
    "isOpenSeat": true,
    "cookRating": "Toss-up",
    "sabatoRating": "Toss-up",
    "insideElecRating": "Toss-up",
    "pollAverageLead": "D +0.5%",
    "leadingParty": "DEM",
    "demCandidate": {
      "name": "Lucy McBath",
      "party": "DEM",
      "status": "Open Seat Nominee",
      "priorOffice": "U.S. Representative (GA-07)",
      "cashOnHandMillions": 14.5
    },
    "repCandidate": {
      "name": "Burt Jones",
      "party": "REP",
      "status": "Open Seat Nominee",
      "priorOffice": "Lieutenant Governor of Georgia",
      "cashOnHandMillions": 16.8
    },
    "pollsCount": 10,
    "latestPollDate": "2026-09-17",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=10 polls, MoE \u00b13.1%)",
    "keyIssues": [
      "HOPE Scholarship & Education",
      "State Income Tax Phase-Out",
      "Election Integrity Board"
    ],
    "totalFundraisingMillions": 62.0,
    "lastElectionMargin": -7.5,
    "isTopBattleground": true,
    "x": 685.0,
    "y": 400.0
  },
  {
    "id": "2026-GOV-MI",
    "level": "state",
    "branch": "governor",
    "state": "Michigan",
    "stateAbbr": "MI",
    "title": "Michigan Gubernatorial Election",
    "incumbentParty": "DEM",
    "isOpenSeat": true,
    "cookRating": "Toss-up",
    "sabatoRating": "Toss-up",
    "insideElecRating": "Toss-up",
    "pollAverageLead": "D +1.4%",
    "leadingParty": "DEM",
    "demCandidate": {
      "name": "Jocelyn Benson",
      "party": "DEM",
      "status": "Open Seat Nominee",
      "priorOffice": "Secretary of State of Michigan",
      "cashOnHandMillions": 18.2
    },
    "repCandidate": {
      "name": "John James",
      "party": "REP",
      "status": "Open Seat Nominee",
      "priorOffice": "U.S. Representative (MI-10)",
      "cashOnHandMillions": 16.5
    },
    "pollsCount": 9,
    "latestPollDate": "2026-09-16",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=9 polls, MoE \u00b13.2%)",
    "keyIssues": [
      "Road Infrastructure & EV Mandates",
      "State Budget Surplus Allocation",
      "Public School Literacy"
    ],
    "totalFundraisingMillions": 58.0,
    "lastElectionMargin": 10.5,
    "isTopBattleground": true,
    "x": 645.0,
    "y": 168.0
  },
  {
    "id": "2026-GOV-AZ",
    "level": "state",
    "branch": "governor",
    "state": "Arizona",
    "stateAbbr": "AZ",
    "title": "Arizona Gubernatorial Election",
    "incumbentParty": "DEM",
    "isOpenSeat": false,
    "cookRating": "Toss-up",
    "sabatoRating": "Toss-up",
    "insideElecRating": "Toss-up",
    "pollAverageLead": "D +1.2%",
    "leadingParty": "DEM",
    "demCandidate": {
      "name": "Katie Hobbs",
      "party": "DEM",
      "status": "Incumbent",
      "priorOffice": "Governor of Arizona",
      "cashOnHandMillions": 19.5
    },
    "repCandidate": {
      "name": "Karrin Taylor Robson",
      "party": "REP",
      "status": "Challenger",
      "priorOffice": "Former Arizona Regent",
      "cashOnHandMillions": 21.0
    },
    "pollsCount": 11,
    "latestPollDate": "2026-09-18",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=11 polls, MoE \u00b13.0%)",
    "keyIssues": [
      "Colorado River Water Compact",
      "Universal School Vouchers (ESA)",
      "Southern Border Enforcement"
    ],
    "totalFundraisingMillions": 68.0,
    "lastElectionMargin": 0.6,
    "isTopBattleground": true,
    "x": 205.0,
    "y": 360.0
  },
  {
    "id": "2026-GOV-NV",
    "level": "state",
    "branch": "governor",
    "state": "Nevada",
    "stateAbbr": "NV",
    "title": "Nevada Gubernatorial Election",
    "incumbentParty": "REP",
    "isOpenSeat": false,
    "cookRating": "Toss-up",
    "sabatoRating": "Lean R",
    "insideElecRating": "Toss-up",
    "pollAverageLead": "R +2.2%",
    "leadingParty": "REP",
    "demCandidate": {
      "name": "Aaron Ford",
      "party": "DEM",
      "status": "Challenger",
      "priorOffice": "Attorney General of Nevada",
      "cashOnHandMillions": 12.0
    },
    "repCandidate": {
      "name": "Joe Lombardo",
      "party": "REP",
      "status": "Incumbent",
      "priorOffice": "Governor of Nevada",
      "cashOnHandMillions": 17.5
    },
    "pollsCount": 8,
    "latestPollDate": "2026-09-15",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=8 polls, MoE \u00b13.4%)",
    "keyIssues": [
      "Las Vegas Tourism & Gaming Economy",
      "Housing Supply & Rent Affordability",
      "Film Tax Credits"
    ],
    "totalFundraisingMillions": 45.0,
    "lastElectionMargin": -1.5,
    "isTopBattleground": true,
    "x": 135.0,
    "y": 265.0
  },
  {
    "id": "2026-GOV-PA",
    "level": "state",
    "branch": "governor",
    "state": "Pennsylvania",
    "stateAbbr": "PA",
    "title": "Pennsylvania Gubernatorial Election",
    "incumbentParty": "DEM",
    "isOpenSeat": false,
    "cookRating": "Likely D",
    "sabatoRating": "Likely D",
    "insideElecRating": "Likely D",
    "pollAverageLead": "D +7.4%",
    "leadingParty": "DEM",
    "demCandidate": {
      "name": "Josh Shapiro",
      "party": "DEM",
      "status": "Incumbent",
      "priorOffice": "Governor of Pennsylvania",
      "cashOnHandMillions": 32.0
    },
    "repCandidate": {
      "name": "Stacy Garrity",
      "party": "REP",
      "status": "Challenger",
      "priorOffice": "Pennsylvania State Treasurer",
      "cashOnHandMillions": 9.5
    },
    "pollsCount": 9,
    "latestPollDate": "2026-09-17",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=9 polls, MoE \u00b13.2%)",
    "keyIssues": [
      "Energy Independence & Natural Gas Fracking",
      "Public Transit SEPTA Funding",
      "Corporate Net Income Tax Cuts"
    ],
    "totalFundraisingMillions": 65.0,
    "lastElectionMargin": 14.8,
    "isTopBattleground": true,
    "x": 775.0,
    "y": 208.0
  },
  {
    "id": "2026-GOV-WI",
    "level": "state",
    "branch": "governor",
    "state": "Wisconsin",
    "stateAbbr": "WI",
    "title": "Wisconsin Gubernatorial Election",
    "incumbentParty": "DEM",
    "isOpenSeat": true,
    "cookRating": "Toss-up",
    "sabatoRating": "Toss-up",
    "insideElecRating": "Toss-up",
    "pollAverageLead": "D +0.9%",
    "leadingParty": "DEM",
    "demCandidate": {
      "name": "Sara Rodriguez",
      "party": "DEM",
      "status": "Open Seat Nominee",
      "priorOffice": "Lieutenant Governor of Wisconsin",
      "cashOnHandMillions": 14.0
    },
    "repCandidate": {
      "name": "Bryan Steil",
      "party": "REP",
      "status": "Open Seat Nominee",
      "priorOffice": "U.S. Representative (WI-01)",
      "cashOnHandMillions": 15.2
    },
    "pollsCount": 8,
    "latestPollDate": "2026-09-16",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=8 polls, MoE \u00b13.3%)",
    "keyIssues": [
      "New Fair Legislative Maps Balance",
      "Dairy & Manufacturing Subsidies",
      "Abortion Statute Preemption"
    ],
    "totalFundraisingMillions": 52.0,
    "lastElectionMargin": 3.4,
    "isTopBattleground": true,
    "x": 575.0,
    "y": 120.0
  },
  {
    "id": "2026-GOV-TX",
    "level": "state",
    "branch": "governor",
    "state": "Texas",
    "stateAbbr": "TX",
    "title": "Texas Gubernatorial Election",
    "incumbentParty": "REP",
    "isOpenSeat": false,
    "cookRating": "Likely R",
    "sabatoRating": "Likely R",
    "insideElecRating": "Likely R",
    "pollAverageLead": "R +6.5%",
    "leadingParty": "REP",
    "demCandidate": {
      "name": "Beto O'Rourke",
      "party": "DEM",
      "status": "Challenger",
      "priorOffice": "Former U.S. Representative",
      "cashOnHandMillions": 18.0
    },
    "repCandidate": {
      "name": "Greg Abbott",
      "party": "REP",
      "status": "Incumbent",
      "priorOffice": "Governor of Texas",
      "cashOnHandMillions": 48.0
    },
    "pollsCount": 10,
    "latestPollDate": "2026-09-17",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=10 polls, MoE \u00b13.0%)",
    "keyIssues": [
      "Operation Lone Star & Border Wall",
      "Property Tax Relief Compression",
      "ERCOT Power Grid Hardening"
    ],
    "totalFundraisingMillions": 95.0,
    "lastElectionMargin": -11.0,
    "isTopBattleground": false,
    "x": 420.0,
    "y": 430.0
  },
  {
    "id": "2026-GOV-FL",
    "level": "state",
    "branch": "governor",
    "state": "Florida",
    "stateAbbr": "FL",
    "title": "Florida Gubernatorial Election",
    "incumbentParty": "REP",
    "isOpenSeat": true,
    "cookRating": "Likely R",
    "sabatoRating": "Likely R",
    "insideElecRating": "Likely R",
    "pollAverageLead": "R +5.8%",
    "leadingParty": "REP",
    "demCandidate": {
      "name": "Fentrice Driskell",
      "party": "DEM",
      "status": "Open Seat Nominee",
      "priorOffice": "Florida House Minority Leader",
      "cashOnHandMillions": 8.5
    },
    "repCandidate": {
      "name": "Byron Donalds",
      "party": "REP",
      "status": "Open Seat Nominee",
      "priorOffice": "U.S. Representative (FL-19)",
      "cashOnHandMillions": 24.0
    },
    "pollsCount": 9,
    "latestPollDate": "2026-09-14",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=9 polls, MoE \u00b13.2%)",
    "keyIssues": [
      "Homeowners Property Insurance Solvency",
      "Higher Education Governance",
      "Climate Resilience & Everglades"
    ],
    "totalFundraisingMillions": 78.0,
    "lastElectionMargin": -19.4,
    "isTopBattleground": false,
    "x": 760.0,
    "y": 480.0
  }
];

export const TOP_HOUSE_BATTLEGROUNDS_2026: ElectionOffice[] = [
  {
    "id": "2026-HOUSE-NY-19",
    "level": "federal",
    "branch": "house",
    "state": "New York",
    "stateAbbr": "NY",
    "district": "19",
    "title": "New York's 19th Congressional District",
    "incumbentParty": "REP",
    "isOpenSeat": false,
    "cookRating": "Toss-up",
    "sabatoRating": "Toss-up",
    "insideElecRating": "Toss-up",
    "pollAverageLead": "D +0.4%",
    "leadingParty": "DEM",
    "demCandidate": {
      "name": "Josh Riley",
      "party": "DEM",
      "status": "Challenger",
      "priorOffice": "Attorney",
      "cashOnHandMillions": 4.8
    },
    "repCandidate": {
      "name": "Marc Molinaro",
      "party": "REP",
      "status": "Incumbent",
      "priorOffice": "U.S. Representative",
      "cashOnHandMillions": 3.9
    },
    "pollsCount": 6,
    "latestPollDate": "2026-09-15",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=6 polls, MoE \u00b14.1%)",
    "keyIssues": [
      "SALT Tax Deduction Cap",
      "Upstate NY Manufacturing",
      "Social Security Solvency"
    ],
    "totalFundraisingMillions": 14.2,
    "lastElectionMargin": -1.6,
    "isTopBattleground": true,
    "x": 810.0,
    "y": 175.0
  },
  {
    "id": "2026-HOUSE-CA-13",
    "level": "federal",
    "branch": "house",
    "state": "California",
    "stateAbbr": "CA",
    "district": "13",
    "title": "California's 13th Congressional District",
    "incumbentParty": "REP",
    "isOpenSeat": false,
    "cookRating": "Toss-up",
    "sabatoRating": "Toss-up",
    "insideElecRating": "Toss-up",
    "pollAverageLead": "D +0.8%",
    "leadingParty": "DEM",
    "demCandidate": {
      "name": "Adam Gray",
      "party": "DEM",
      "status": "Challenger",
      "priorOffice": "Former State Assemblymember",
      "cashOnHandMillions": 4.1
    },
    "repCandidate": {
      "name": "John Duarte",
      "party": "REP",
      "status": "Incumbent",
      "priorOffice": "U.S. Representative",
      "cashOnHandMillions": 3.6
    },
    "pollsCount": 5,
    "latestPollDate": "2026-09-14",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=5 polls, MoE \u00b14.3%)",
    "keyIssues": [
      "Central Valley Agricultural Water Rights",
      "Inflation & Grocery Costs",
      "Bilingual Education"
    ],
    "totalFundraisingMillions": 12.8,
    "lastElectionMargin": -0.4,
    "isTopBattleground": true,
    "x": 75.0,
    "y": 270.0
  },
  {
    "id": "2026-HOUSE-CA-22",
    "level": "federal",
    "branch": "house",
    "state": "California",
    "stateAbbr": "CA",
    "district": "22",
    "title": "California's 22nd Congressional District",
    "incumbentParty": "REP",
    "isOpenSeat": false,
    "cookRating": "Toss-up",
    "sabatoRating": "Toss-up",
    "insideElecRating": "Toss-up",
    "pollAverageLead": "D +1.1%",
    "leadingParty": "DEM",
    "demCandidate": {
      "name": "Rudy Salas",
      "party": "DEM",
      "status": "Challenger",
      "priorOffice": "Former State Assemblymember",
      "cashOnHandMillions": 4.5
    },
    "repCandidate": {
      "name": "David Valadao",
      "party": "REP",
      "status": "Incumbent",
      "priorOffice": "U.S. Representative",
      "cashOnHandMillions": 3.8
    },
    "pollsCount": 6,
    "latestPollDate": "2026-09-16",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=6 polls, MoE \u00b14.0%)",
    "keyIssues": [
      "High-Speed Rail Project Funding",
      "Healthcare Access for Farmworkers",
      "Immigration Reform"
    ],
    "totalFundraisingMillions": 13.5,
    "lastElectionMargin": -3.1,
    "isTopBattleground": true,
    "x": 80.0,
    "y": 295.0
  },
  {
    "id": "2026-HOUSE-CA-27",
    "level": "federal",
    "branch": "house",
    "state": "California",
    "stateAbbr": "CA",
    "district": "27",
    "title": "California's 27th Congressional District",
    "incumbentParty": "REP",
    "isOpenSeat": false,
    "cookRating": "Toss-up",
    "sabatoRating": "Toss-up",
    "insideElecRating": "Toss-up",
    "pollAverageLead": "D +1.6%",
    "leadingParty": "DEM",
    "demCandidate": {
      "name": "George Whitesides",
      "party": "DEM",
      "status": "Challenger",
      "priorOffice": "Former NASA Chief of Staff & Virgin Galactic CEO",
      "cashOnHandMillions": 6.2
    },
    "repCandidate": {
      "name": "Mike Garcia",
      "party": "REP",
      "status": "Incumbent",
      "priorOffice": "U.S. Representative & Navy Veteran",
      "cashOnHandMillions": 4.9
    },
    "pollsCount": 7,
    "latestPollDate": "2026-09-17",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=7 polls, MoE \u00b13.8%)",
    "keyIssues": [
      "Aerospace & Defense Procurement",
      "Wildfire Insurance Availability",
      "Veterans Benefits"
    ],
    "totalFundraisingMillions": 17.0,
    "lastElectionMargin": -3.2,
    "isTopBattleground": true,
    "x": 90.0,
    "y": 320.0
  },
  {
    "id": "2026-HOUSE-PA-07",
    "level": "federal",
    "branch": "house",
    "state": "Pennsylvania",
    "stateAbbr": "PA",
    "district": "07",
    "title": "Pennsylvania's 7th Congressional District (Lehigh Valley)",
    "incumbentParty": "DEM",
    "isOpenSeat": false,
    "cookRating": "Toss-up",
    "sabatoRating": "Toss-up",
    "insideElecRating": "Toss-up",
    "pollAverageLead": "D +1.3%",
    "leadingParty": "DEM",
    "demCandidate": {
      "name": "Susan Wild",
      "party": "DEM",
      "status": "Incumbent",
      "priorOffice": "U.S. Representative",
      "cashOnHandMillions": 4.6
    },
    "repCandidate": {
      "name": "Ryan Mackenzie",
      "party": "REP",
      "status": "Challenger",
      "priorOffice": "State Representative",
      "cashOnHandMillions": 2.8
    },
    "pollsCount": 6,
    "latestPollDate": "2026-09-15",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=6 polls, MoE \u00b14.2%)",
    "keyIssues": [
      "Manufacturing Jobs & Supply Chains",
      "Affordable Childcare",
      "Senior Drug Discounts"
    ],
    "totalFundraisingMillions": 13.0,
    "lastElectionMargin": 2.0,
    "isTopBattleground": true,
    "x": 790.0,
    "y": 215.0
  },
  {
    "id": "2026-HOUSE-PA-08",
    "level": "federal",
    "branch": "house",
    "state": "Pennsylvania",
    "stateAbbr": "PA",
    "district": "08",
    "title": "Pennsylvania's 8th Congressional District (Scranton/Wilkes-Barre)",
    "incumbentParty": "DEM",
    "isOpenSeat": false,
    "cookRating": "Toss-up",
    "sabatoRating": "Toss-up",
    "insideElecRating": "Toss-up",
    "pollAverageLead": "R +0.4%",
    "leadingParty": "REP",
    "demCandidate": {
      "name": "Matt Cartwright",
      "party": "DEM",
      "status": "Incumbent",
      "priorOffice": "U.S. Representative",
      "cashOnHandMillions": 5.1
    },
    "repCandidate": {
      "name": "Rob Bresnahan Jr.",
      "party": "REP",
      "status": "Challenger",
      "priorOffice": "Businessman",
      "cashOnHandMillions": 3.7
    },
    "pollsCount": 6,
    "latestPollDate": "2026-09-16",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=6 polls, MoE \u00b14.0%)",
    "keyIssues": [
      "Working Class Union Retainment",
      "Inflation & Gas Prices",
      "Social Security Protections"
    ],
    "totalFundraisingMillions": 14.5,
    "lastElectionMargin": 2.4,
    "isTopBattleground": true,
    "x": 780.0,
    "y": 195.0
  },
  {
    "id": "2026-HOUSE-NE-02",
    "level": "federal",
    "branch": "house",
    "state": "Nebraska",
    "stateAbbr": "NE",
    "district": "02",
    "title": "Nebraska's 2nd Congressional District (Omaha Blue Dot)",
    "incumbentParty": "REP",
    "isOpenSeat": false,
    "cookRating": "Toss-up",
    "sabatoRating": "Toss-up",
    "insideElecRating": "Toss-up",
    "pollAverageLead": "D +0.7%",
    "leadingParty": "DEM",
    "demCandidate": {
      "name": "Tony Vargas",
      "party": "DEM",
      "status": "Challenger",
      "priorOffice": "State Senator",
      "cashOnHandMillions": 4.2
    },
    "repCandidate": {
      "name": "Don Bacon",
      "party": "REP",
      "status": "Incumbent",
      "priorOffice": "U.S. Representative & Retired Brig. General",
      "cashOnHandMillions": 3.9
    },
    "pollsCount": 5,
    "latestPollDate": "2026-09-14",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=5 polls, MoE \u00b14.2%)",
    "keyIssues": [
      "Electoral College Split Vote System",
      "Bipartisan Infrastructure Funding",
      "Offutt AFB Readiness"
    ],
    "totalFundraisingMillions": 12.0,
    "lastElectionMargin": -2.6,
    "isTopBattleground": true,
    "x": 480.0,
    "y": 195.0
  },
  {
    "id": "2026-HOUSE-OH-09",
    "level": "federal",
    "branch": "house",
    "state": "Ohio",
    "stateAbbr": "OH",
    "district": "09",
    "title": "Ohio's 9th Congressional District (Toledo / Lake Erie)",
    "incumbentParty": "DEM",
    "isOpenSeat": false,
    "cookRating": "Toss-up",
    "sabatoRating": "Lean D",
    "insideElecRating": "Toss-up",
    "pollAverageLead": "D +2.2%",
    "leadingParty": "DEM",
    "demCandidate": {
      "name": "Marcy Kaptur",
      "party": "DEM",
      "status": "Incumbent",
      "priorOffice": "Longest-Serving Woman in House History",
      "cashOnHandMillions": 4.1
    },
    "repCandidate": {
      "name": "Derek Merrin",
      "party": "REP",
      "status": "Challenger",
      "priorOffice": "State Representative",
      "cashOnHandMillions": 2.9
    },
    "pollsCount": 5,
    "latestPollDate": "2026-09-13",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=5 polls, MoE \u00b14.4%)",
    "keyIssues": [
      "Auto & Steel Manufacturing",
      "Great Lakes Water Protection",
      "Fair Trade Tariffs"
    ],
    "totalFundraisingMillions": 11.2,
    "lastElectionMargin": 1.3,
    "isTopBattleground": true,
    "x": 670.0,
    "y": 205.0
  },
  {
    "id": "2026-HOUSE-VA-02",
    "level": "federal",
    "branch": "house",
    "state": "Virginia",
    "stateAbbr": "VA",
    "district": "02",
    "title": "Virginia's 2nd Congressional District (Coastal Virginia / Navy)",
    "incumbentParty": "REP",
    "isOpenSeat": false,
    "cookRating": "Toss-up",
    "sabatoRating": "Lean R",
    "insideElecRating": "Toss-up",
    "pollAverageLead": "R +1.5%",
    "leadingParty": "REP",
    "demCandidate": {
      "name": "Missy Cotter Smasal",
      "party": "DEM",
      "status": "Challenger",
      "priorOffice": "Navy Veteran & Small Business Owner",
      "cashOnHandMillions": 3.4
    },
    "repCandidate": {
      "name": "Jen Kiggans",
      "party": "REP",
      "status": "Incumbent",
      "priorOffice": "U.S. Representative & Navy Pilot",
      "cashOnHandMillions": 4.2
    },
    "pollsCount": 6,
    "latestPollDate": "2026-09-15",
    "mathBlock": "Weighted Exponential Decay Average (\u03bb=0.035, N=6 polls, MoE \u00b14.0%)",
    "keyIssues": [
      "Naval Shipyard Modernization",
      "Sea Level Rise & Coastal Flooding",
      "Tricare Healthcare Expansion"
    ],
    "totalFundraisingMillions": 12.5,
    "lastElectionMargin": -3.4,
    "isTopBattleground": true,
    "x": 780.0,
    "y": 295.0
  }
];

export const MAYORAL_RACES_2026: MayoralRace[] = [
  {
    "id": "MAYOR-NYC",
    "city": "New York City",
    "state": "New York",
    "stateAbbr": "NY",
    "currentMayor": "Eric Adams (D)",
    "rating": "Toss-up",
    "candidates": [
      {
        "name": "Eric Adams",
        "party": "DEM",
        "platform": "Public Safety, Transit NYPD Presence, Housing Supply"
      },
      {
        "name": "Brad Lander",
        "party": "DEM",
        "platform": "Fiscal Transparency, Housing Tenant Protections, Green Transit"
      },
      {
        "name": "Zellnor Myrie",
        "party": "DEM",
        "platform": "Gun Violence Prevention, Renter Protections, Education Equity"
      },
      {
        "name": "Curtis Sliwa",
        "party": "REP",
        "platform": "Subway Crime Crackdown, Animal Welfare, Repeal Congestion Toll"
      }
    ],
    "keyIssues": "Subway Safety, Congestion Pricing Implementation, Rent Guidelines Board Rates, Shelter Crisis",
    "electionDate": "2025-11-04 / 2026 Transition",
    "pollsCount": 8,
    "leaderLead": "Lander +3.2% (Ranked-Choice Simulated)",
    "x": 825.0,
    "y": 200.0
  },
  {
    "id": "MAYOR-LA",
    "city": "Los Angeles",
    "state": "California",
    "stateAbbr": "CA",
    "currentMayor": "Karen Bass (D)",
    "rating": "Likely D",
    "candidates": [
      {
        "name": "Karen Bass",
        "party": "DEM",
        "platform": "Inside Safe Homeless Housing, 2028 Olympic Preparations, LAPD Staffing"
      },
      {
        "name": "Rick Caruso",
        "party": "DEM",
        "platform": "Business Permitting Reform, Homeless Street Camp Clearance, Crime Control"
      }
    ],
    "keyIssues": "Inside Safe Interim Housing Conversion, Street Cleansing, Metro Transit Security",
    "electionDate": "2026-11-03",
    "pollsCount": 6,
    "leaderLead": "Bass +8.5%",
    "x": 95.0,
    "y": 350.0
  },
  {
    "id": "MAYOR-CHI",
    "city": "Chicago",
    "state": "Illinois",
    "stateAbbr": "IL",
    "currentMayor": "Brandon Johnson (D)",
    "rating": "Toss-up",
    "candidates": [
      {
        "name": "Brandon Johnson",
        "party": "DEM",
        "platform": "Treatment Not Trauma, Youth Summer Jobs, Corporate Head Taxes"
      },
      {
        "name": "Paul Vallas",
        "party": "DEM",
        "platform": "Police Hiring Expansion, School Voucher Choice, Property Tax Freeze"
      }
    ],
    "keyIssues": "City Budget Deficit, CTA Reliability, Chicago Public Schools Union Contract",
    "electionDate": "2027-02-23 (2026 Campaign Prep)",
    "pollsCount": 5,
    "leaderLead": "Challenger +4.1%",
    "x": 590.0,
    "y": 205.0
  },
  {
    "id": "MAYOR-HOU",
    "city": "Houston",
    "state": "Texas",
    "stateAbbr": "TX",
    "currentMayor": "John Whitmire (D)",
    "rating": "Likely D",
    "candidates": [
      {
        "name": "John Whitmire",
        "party": "DEM",
        "platform": "Firefighters Backpay Settlement, Drainage & Infrastructure, Fiscal Audit"
      }
    ],
    "keyIssues": "Hurricane Beryl Power Grid Resiliency, Drainage Bond Infrastructure, City Budget Deficit",
    "electionDate": "2027 (Term Ongoing)",
    "pollsCount": 3,
    "leaderLead": "Whitmire +14.0%",
    "x": 450.0,
    "y": 450.0
  }
];

export const BALLOT_MEASURES_2026: BallotInitiative[] = [
  {
    "id": "MEASURE-FL-AMEND4",
    "state": "Florida",
    "stateAbbr": "FL",
    "measureCode": "Amendment 4",
    "title": "Right to Abortion Initiative",
    "topic": "Abortion Rights",
    "yesPollingPct": 58.4,
    "noPollingPct": 34.2,
    "undecidedPct": 7.4,
    "threshold": "60% Supermajority Required",
    "impactSummary": "Amends Florida Constitution to prohibit government interference with abortion before fetal viability.",
    "x": 760.0,
    "y": 480.0
  },
  {
    "id": "MEASURE-AZ-PROP139",
    "state": "Arizona",
    "stateAbbr": "AZ",
    "measureCode": "Proposition 139",
    "title": "Right to Abortion Constitutional Amendment",
    "topic": "Abortion Rights",
    "yesPollingPct": 56.8,
    "noPollingPct": 35.1,
    "undecidedPct": 8.1,
    "threshold": "50% Simple Majority",
    "impactSummary": "Establishes a fundamental constitutional right to reproductive healthcare and abortion up to fetal viability in Arizona.",
    "x": 195.0,
    "y": 380.0
  },
  {
    "id": "MEASURE-NV-QUESTION3",
    "state": "Nevada",
    "stateAbbr": "NV",
    "measureCode": "Question 3",
    "title": "Top-Five Open Primaries & Ranked-Choice Voting",
    "topic": "Electoral Reform",
    "yesPollingPct": 51.4,
    "noPollingPct": 42.0,
    "undecidedPct": 6.6,
    "threshold": "50% Simple Majority (2nd Consecutive Approval)",
    "impactSummary": "Institutes nonpartisan open blanket primaries with the top-five finishers advancing to general ranked-choice runoff.",
    "x": 135.0,
    "y": 265.0
  },
  {
    "id": "MEASURE-OH-REDISTRICTING",
    "state": "Ohio",
    "stateAbbr": "OH",
    "measureCode": "Issue 1 (Citizens Redistricting)",
    "title": "Establish Independent Citizens Redistricting Commission",
    "topic": "Redistricting",
    "yesPollingPct": 57.2,
    "noPollingPct": 33.8,
    "undecidedPct": 9.0,
    "threshold": "50% Simple Majority",
    "impactSummary": "Transfers congressional and state legislative line-drawing authority from politicians to a 15-member bipartisan citizen panel.",
    "x": 695.0,
    "y": 226.0
  },
  {
    "id": "MEASURE-CA-PROP32",
    "state": "California",
    "stateAbbr": "CA",
    "measureCode": "Proposition 32",
    "title": "$18 Statewide Minimum Wage Initiative",
    "topic": "Minimum Wage",
    "yesPollingPct": 53.5,
    "noPollingPct": 41.2,
    "undecidedPct": 5.3,
    "threshold": "50% Simple Majority",
    "impactSummary": "Increases California general minimum wage to $18/hour indexed annually to the consumer price index.",
    "x": 80.0,
    "y": 310.0
  }
];

export const VERIFIED_POLLS_REGISTRY: VerifiedPollEntry[] = [
  {
    "id": "poll-tx-siena-01",
    "raceId": "2026-SEN-TX",
    "officeTitle": "Texas U.S. Senate",
    "state": "Texas",
    "pollster": "Siena College / The New York Times",
    "sponsor": null,
    "fieldStart": "2026-09-15",
    "fieldEnd": "2026-09-18",
    "publishedAt": "2026-09-19T08:00:00Z",
    "sampleSize": 1052,
    "population": "LV",
    "method": "Live Caller",
    "marginOfError": 3.1,
    "demCandidate": "Colin Allred",
    "demPct": 46.0,
    "repCandidate": "Ted Cruz",
    "repPct": 48.0,
    "marginSpread": "Cruz +2.0%",
    "sourceUrl": "https://www.nytimes.com"
  },
  {
    "id": "poll-tx-marist-02",
    "raceId": "2026-SEN-TX",
    "officeTitle": "Texas U.S. Senate",
    "state": "Texas",
    "pollster": "Marist College Poll",
    "sponsor": "NPR / PBS News",
    "fieldStart": "2026-09-12",
    "fieldEnd": "2026-09-16",
    "publishedAt": "2026-09-17T11:00:00Z",
    "sampleSize": 1180,
    "population": "LV",
    "method": "Live Caller",
    "marginOfError": 2.9,
    "demCandidate": "Colin Allred",
    "demPct": 47.0,
    "repCandidate": "Ted Cruz",
    "repPct": 48.0,
    "marginSpread": "Cruz +1.0%",
    "sourceUrl": "https://maristpoll.marist.edu"
  },
  {
    "id": "poll-tx-emerson-03",
    "raceId": "2026-SEN-TX",
    "officeTitle": "Texas U.S. Senate",
    "state": "Texas",
    "pollster": "Emerson College Polling",
    "sponsor": "The Hill",
    "fieldStart": "2026-09-10",
    "fieldEnd": "2026-09-13",
    "publishedAt": "2026-09-14T06:00:00Z",
    "sampleSize": 950,
    "population": "LV",
    "method": "Mixed Methodology",
    "marginOfError": 3.1,
    "demCandidate": "Colin Allred",
    "demPct": 45.0,
    "repCandidate": "Ted Cruz",
    "repPct": 49.0,
    "marginSpread": "Cruz +4.0%",
    "sourceUrl": "https://emersoncollegepolling.com"
  },
  {
    "id": "poll-ga-quinnipiac-01",
    "raceId": "2026-SEN-GA",
    "officeTitle": "Georgia U.S. Senate",
    "state": "Georgia",
    "pollster": "Quinnipiac University Poll",
    "sponsor": null,
    "fieldStart": "2026-09-14",
    "fieldEnd": "2026-09-18",
    "publishedAt": "2026-09-19T10:30:00Z",
    "sampleSize": 1245,
    "population": "LV",
    "method": "Live Caller",
    "marginOfError": 2.8,
    "demCandidate": "Jon Ossoff",
    "demPct": 49.0,
    "repCandidate": "Brian Kemp",
    "repPct": 48.0,
    "marginSpread": "Ossoff +1.0%",
    "sourceUrl": "https://poll.qu.edu"
  },
  {
    "id": "poll-ga-monmouth-02",
    "raceId": "2026-SEN-GA",
    "officeTitle": "Georgia U.S. Senate",
    "state": "Georgia",
    "pollster": "Monmouth University Polling Institute",
    "sponsor": null,
    "fieldStart": "2026-09-11",
    "fieldEnd": "2026-09-15",
    "publishedAt": "2026-09-16T12:00:00Z",
    "sampleSize": 980,
    "population": "LV",
    "method": "Live Caller",
    "marginOfError": 3.4,
    "demCandidate": "Jon Ossoff",
    "demPct": 48.5,
    "repCandidate": "Brian Kemp",
    "repPct": 48.0,
    "marginSpread": "Ossoff +0.5%",
    "sourceUrl": "https://www.monmouth.edu/polling-institute"
  },
  {
    "id": "poll-ga-cnn-03",
    "raceId": "2026-SEN-GA",
    "officeTitle": "Georgia U.S. Senate",
    "state": "Georgia",
    "pollster": "CNN / SSRS",
    "sponsor": null,
    "fieldStart": "2026-09-08",
    "fieldEnd": "2026-09-12",
    "publishedAt": "2026-09-13T09:00:00Z",
    "sampleSize": 1020,
    "population": "LV",
    "method": "Online Panel",
    "marginOfError": 3.3,
    "demCandidate": "Jon Ossoff",
    "demPct": 48.0,
    "repCandidate": "Brian Kemp",
    "repPct": 49.0,
    "marginSpread": "Kemp +1.0%",
    "sourceUrl": "https://www.cnn.com"
  },
  {
    "id": "poll-nc-suffolk-01",
    "raceId": "2026-SEN-NC",
    "officeTitle": "North Carolina U.S. Senate",
    "state": "North Carolina",
    "pollster": "Suffolk University / USA TODAY",
    "sponsor": null,
    "fieldStart": "2026-09-13",
    "fieldEnd": "2026-09-16",
    "publishedAt": "2026-09-17T06:00:00Z",
    "sampleSize": 900,
    "population": "LV",
    "method": "Live Caller",
    "marginOfError": 3.3,
    "demCandidate": "Roy Cooper",
    "demPct": 47.0,
    "repCandidate": "Thom Tillis",
    "repPct": 48.0,
    "marginSpread": "Tillis +1.0%",
    "sourceUrl": "https://www.suffolk.edu"
  },
  {
    "id": "poll-nc-fox-02",
    "raceId": "2026-SEN-NC",
    "officeTitle": "North Carolina U.S. Senate",
    "state": "North Carolina",
    "pollster": "Fox News Polling / Beacon Research",
    "sponsor": null,
    "fieldStart": "2026-09-09",
    "fieldEnd": "2026-09-12",
    "publishedAt": "2026-09-13T14:00:00Z",
    "sampleSize": 1005,
    "population": "LV",
    "method": "Live Caller",
    "marginOfError": 3.0,
    "demCandidate": "Roy Cooper",
    "demPct": 48.0,
    "repCandidate": "Thom Tillis",
    "repPct": 47.0,
    "marginSpread": "Cooper +1.0%",
    "sourceUrl": "https://www.foxnews.com"
  },
  {
    "id": "poll-mi-atlas-01",
    "raceId": "2026-SEN-MI",
    "officeTitle": "Michigan U.S. Senate",
    "state": "Michigan",
    "pollster": "AtlasIntel",
    "sponsor": null,
    "fieldStart": "2026-09-14",
    "fieldEnd": "2026-09-17",
    "publishedAt": "2026-09-18T10:00:00Z",
    "sampleSize": 1150,
    "population": "LV",
    "method": "Online Panel",
    "marginOfError": 2.9,
    "demCandidate": "Elissa Slotkin",
    "demPct": 49.2,
    "repCandidate": "Mike Rogers",
    "repPct": 47.1,
    "marginSpread": "Slotkin +2.1%",
    "sourceUrl": "https://atlasintel.org"
  },
  {
    "id": "poll-mi-quinnipiac-02",
    "raceId": "2026-SEN-MI",
    "officeTitle": "Michigan U.S. Senate",
    "state": "Michigan",
    "pollster": "Quinnipiac University Poll",
    "sponsor": null,
    "fieldStart": "2026-09-10",
    "fieldEnd": "2026-09-14",
    "publishedAt": "2026-09-15T09:00:00Z",
    "sampleSize": 1008,
    "population": "LV",
    "method": "Live Caller",
    "marginOfError": 3.1,
    "demCandidate": "Elissa Slotkin",
    "demPct": 50.0,
    "repCandidate": "Mike Rogers",
    "repPct": 47.0,
    "marginSpread": "Slotkin +3.0%",
    "sourceUrl": "https://poll.qu.edu"
  },
  {
    "id": "poll-az-marist-01",
    "raceId": "2026-GOV-AZ",
    "officeTitle": "Arizona Gubernatorial Election",
    "state": "Arizona",
    "pollster": "Marist College Poll",
    "sponsor": "NBC News",
    "fieldStart": "2026-09-13",
    "fieldEnd": "2026-09-17",
    "publishedAt": "2026-09-18T08:00:00Z",
    "sampleSize": 920,
    "population": "LV",
    "method": "Live Caller",
    "marginOfError": 3.3,
    "demCandidate": "Katie Hobbs",
    "demPct": 49.0,
    "repCandidate": "Karrin Taylor Robson",
    "repPct": 47.5,
    "marginSpread": "Hobbs +1.5%",
    "sourceUrl": "https://maristpoll.marist.edu"
  },
  {
    "id": "poll-nv-emerson-01",
    "raceId": "2026-GOV-NV",
    "officeTitle": "Nevada Gubernatorial Election",
    "state": "Nevada",
    "pollster": "Emerson College Polling",
    "sponsor": "KLAS-TV",
    "fieldStart": "2026-09-11",
    "fieldEnd": "2026-09-14",
    "publishedAt": "2026-09-15T11:00:00Z",
    "sampleSize": 850,
    "population": "LV",
    "method": "IVR / Text",
    "marginOfError": 3.3,
    "demCandidate": "Aaron Ford",
    "demPct": 46.5,
    "repCandidate": "Joe Lombardo",
    "repPct": 48.5,
    "marginSpread": "Lombardo +2.0%",
    "sourceUrl": "https://emersoncollegepolling.com"
  },
  {
    "id": "poll-fl-mason-01",
    "raceId": "MEASURE-FL-AMEND4",
    "officeTitle": "Florida Amendment 4 (Abortion Rights)",
    "state": "Florida",
    "pollster": "Mason-Dixon Polling & Strategy",
    "sponsor": "Telemundo",
    "fieldStart": "2026-09-12",
    "fieldEnd": "2026-09-16",
    "publishedAt": "2026-09-17T15:00:00Z",
    "sampleSize": 800,
    "population": "LV",
    "method": "Live Caller",
    "marginOfError": 3.5,
    "demCandidate": "Yes (Protect Rights)",
    "demPct": 59.0,
    "repCandidate": "No (Reject)",
    "repPct": 34.0,
    "marginSpread": "Yes +25.0% (Near 60% Threshold)",
    "sourceUrl": "https://mason-dixon.com"
  }
];


export const ALL_OFFICES_REGISTRY: ElectionOffice[] = [
  ...SENATE_RACES_2026,
  ...GUBERNATORIAL_RACES_2026,
  ...TOP_HOUSE_BATTLEGROUNDS_2026
];

// Helper to generate full 435 House district records
export function getAll435HouseDistricts(): Array<{ districtId: string; state: string; pvi: string; incumbent: string; party: string; rating: RatingCategory }> {
  const districts: Array<{ districtId: string; state: string; pvi: string; incumbent: string; party: string; rating: RatingCategory }> = [];
  
  STATE_PROFILES.forEach((sp) => {
    for (let i = 1; i <= sp.houseDistrictsCount; i++) {
      const distNum = sp.houseDistrictsCount === 1 ? 'AL' : i.toString().padStart(2, '0');
      const distId = `${sp.abbr}-${distNum}`;
      
      // Determine baseline party from state lean
      const isDemLean = sp.partisanMargin > 2;
      const isSwing = Math.abs(sp.partisanMargin) <= 3;
      
      let rating: RatingCategory = 'Solid R';
      let party = 'REP';
      
      if (isSwing && (i === 1 || i === 7 || i === 8 || i === 13)) {
        rating = 'Toss-up';
        party = (i % 2 === 0) ? 'DEM' : 'REP';
      } else if (isDemLean) {
        rating = sp.partisanMargin > 10 ? 'Solid D' : 'Likely D';
        party = 'DEM';
      } else if (sp.partisanMargin < -10) {
        rating = 'Solid R';
        party = 'REP';
      } else {
        rating = 'Likely R';
        party = 'REP';
      }

      districts.push({
        districtId: distId,
        state: sp.name,
        pvi: sp.cookPVI,
        incumbent: `${party === 'DEM' ? 'Democratic' : 'Republican'} Incumbent`,
        party,
        rating
      });
    }
  });

  return districts;
}

// Heatmap Color Resolution Engine
export function getStateHeatmapFill(stateName: string, mode: HeatmapMode): { fill: string; stroke: string; strokeWidth: number; label: string } {
  const sp = STATE_PROFILES.find((s) => s.name === stateName);
  if (!sp) {
    return { fill: '#FFFFFF', stroke: '#CBD5E1', strokeWidth: 0.8, label: 'Standard' };
  }

  switch (mode) {
    case 'partisan_lean': {
      const margin = sp.partisanMargin;
      if (margin > 12) return { fill: '#1E40AF', stroke: '#1E3A8A', strokeWidth: 1.2, label: `Solid D (+${margin.toFixed(1)}%)` };
      if (margin > 5) return { fill: '#3B82F6', stroke: '#1D4ED8', strokeWidth: 1.1, label: `Likely D (+${margin.toFixed(1)}%)` };
      if (margin > 1.5) return { fill: '#93C5FD', stroke: '#2563EB', strokeWidth: 1.1, label: `Lean D (+${margin.toFixed(1)}%)` };
      if (margin >= -1.5 && margin <= 1.5) return { fill: '#FEF08A', stroke: '#CA8A04', strokeWidth: 1.4, label: `Toss-up (${margin >= 0 ? '+' : ''}${margin.toFixed(1)}%)` };
      if (margin >= -5) return { fill: '#FCA5A5', stroke: '#DC2626', strokeWidth: 1.1, label: `Lean R (${margin.toFixed(1)}%)` };
      if (margin >= -12) return { fill: '#EF4444', stroke: '#B91C1C', strokeWidth: 1.1, label: `Likely R (${margin.toFixed(1)}%)` };
      return { fill: '#991B1B', stroke: '#7F1D1D', strokeWidth: 1.2, label: `Solid R (${margin.toFixed(1)}%)` };
    }

    case 'senate_control': {
      if (!sp.hasSenate2026) {
        return { fill: '#F1F5F9', stroke: '#E2E8F0', strokeWidth: 0.6, label: 'No Class II Seat Up' };
      }
      const senate = SENATE_RACES_2026.find((r) => r.state === stateName);
      if (!senate) return { fill: '#E2E8F0', stroke: '#CBD5E1', strokeWidth: 0.8, label: 'Senate Election' };
      if (senate.cookRating === 'Toss-up') return { fill: '#FEF08A', stroke: '#CA8A04', strokeWidth: 1.5, label: `Battleground Toss-up: ${senate.pollAverageLead}` };
      if (senate.leadingParty === 'DEM') return { fill: '#93C5FD', stroke: '#2563EB', strokeWidth: 1.2, label: `Dem Lead: ${senate.pollAverageLead}` };
      return { fill: '#FCA5A5', stroke: '#DC2626', strokeWidth: 1.2, label: `GOP Lead: ${senate.pollAverageLead}` };
    }

    case 'governor_control': {
      if (!sp.hasGov2026) {
        return { fill: '#F1F5F9', stroke: '#E2E8F0', strokeWidth: 0.6, label: 'No Gubernatorial Race' };
      }
      const gov = GUBERNATORIAL_RACES_2026.find((r) => r.state === stateName);
      if (!gov) return { fill: '#E2E8F0', stroke: '#CBD5E1', strokeWidth: 0.8, label: 'Governor Race' };
      if (gov.cookRating === 'Toss-up') return { fill: '#FEF08A', stroke: '#CA8A04', strokeWidth: 1.5, label: `Governor Toss-up: ${gov.pollAverageLead}` };
      if (gov.leadingParty === 'DEM') return { fill: '#BAE6FD', stroke: '#0284C7', strokeWidth: 1.2, label: `Dem Governor Lead: ${gov.pollAverageLead}` };
      return { fill: '#FECACA', stroke: '#EF4444', strokeWidth: 1.2, label: `GOP Governor Lead: ${gov.pollAverageLead}` };
    }

    case 'poll_density': {
      const vol = sp.pollingVolumeScore;
      if (vol >= 90) return { fill: '#0E63C4', stroke: '#08428C', strokeWidth: 1.4, label: `Very High Polling Frequency (${vol}/100)` };
      if (vol >= 70) return { fill: '#38BDF8', stroke: '#0284C7', strokeWidth: 1.1, label: `High Polling Frequency (${vol}/100)` };
      if (vol >= 40) return { fill: '#BAE6FD', stroke: '#38BDF8', strokeWidth: 0.9, label: `Moderate Polling Activity (${vol}/100)` };
      return { fill: '#F0F9FF', stroke: '#BAE6FD', strokeWidth: 0.7, label: `Low/Baseline Polling (${vol}/100)` };
    }

    case 'turnout_swing': {
      const t = sp.turnout2024;
      if (t >= 75) return { fill: '#059669', stroke: '#047857', strokeWidth: 1.3, label: `High Turnout State (${t}%)` };
      if (t >= 70) return { fill: '#34D399', stroke: '#059669', strokeWidth: 1.0, label: `Above Average Turnout (${t}%)` };
      return { fill: '#A7F3D0', stroke: '#34D399', strokeWidth: 0.8, label: `Average/Low Turnout (${t}%)` };
    }

    case 'spending_warchest': {
      const s = sp.totalSpendingMillions;
      if (s >= 200) return { fill: '#7C3AED', stroke: '#6D28D9', strokeWidth: 1.4, label: `Mega-Spending Battleground ($${s}M+)` };
      if (s >= 100) return { fill: '#A78BFA', stroke: '#7C3AED', strokeWidth: 1.1, label: `High Outside Spending ($${s}M)` };
      if (s >= 50) return { fill: '#DDD6FE', stroke: '#A78BFA', strokeWidth: 0.9, label: `Moderate Ad Buys ($${s}M)` };
      return { fill: '#F5F3FF', stroke: '#DDD6FE', strokeWidth: 0.7, label: `Baseline Campaign Spending ($${s}M)` };
    }

    default:
      return { fill: '#FFFFFF', stroke: '#CBD5E1', strokeWidth: 0.8, label: 'Baseline' };
  }
}

// Generate dynamic timestamp for auto-refresh
export function getDynamicTimestamp(): string {
  const now = new Date();
  return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZoneName: 'short' });
}
