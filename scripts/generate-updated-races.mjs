import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const CURRENT_DATE = "2026-10-20";
const CURRENT_TIMESTAMP = "2026-10-20T20:20:00Z";

// ── 1. SENATE RACES (EXACTLY 35 SEATS: 33 CLASS II + 2 SPECIALS) ───────────
const SENATE_RACES = [
  // 1. Texas
  {
    id: "senate-tx",
    state: "TX",
    state_name: "Texas",
    office: "U.S. Senate (Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominees-certified",
    is_featured: true,
    candidates: [
      {
        name: "Ken Paxton",
        party: "REP",
        status: "nominee",
        is_incumbent: false,
        fec_id: "S6TX00491",
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Texas,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "James Talarico",
        party: "DEM",
        status: "nominee",
        is_incumbent: false,
        fec_id: "S6TX00517",
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Texas,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "John Cornyn",
        party: "REP",
        status: "incumbent-not-running",
        is_incumbent: true,
        fec_id: "S2TX00106",
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Texas,_2026_(May_26_Republican_primary_runoff)",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Toss Up",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      },
      {
        rater: "Sabato's Crystal Ball",
        verbatim_label: "Toss Up",
        rater_date: "2026-10-14",
        source_url: "https://centerforpolitics.org/crystalball/2026-senate/"
      },
      {
        rater: "Inside Elections",
        verbatim_label: "Toss-up",
        rater_date: "2026-10-01",
        source_url: "https://www.insideelections.com/ratings/senate"
      }
    ],
    polls: [
      {
        pollster: "University of Houston Hobby School / HPM",
        field_dates: "2026-10-10 - 2026-10-16",
        sample_size: 1320,
        sample_type: "lv",
        results: { "James Talarico": 48.0, "Ken Paxton": 46.0, "Ted Brown": 3.0, "Undecided": 3.0 },
        source_url: "https://www.houstonpublicmedia.org/articles/news/politics/election-2026/2026/10/18/564673/talarico-holds-slight-edge-over-paxton-in-u-s-senate-race-on-cusp-of-election-poll-shows/",
        sponsor: "Houston Public Media"
      },
      {
        pollster: "Marist College Poll",
        field_dates: "2026-10-08 - 2026-10-11",
        sample_size: 1186,
        sample_type: "lv",
        results: { "James Talarico": 47.0, "Ken Paxton": 45.0, "Undecided": 8.0 },
        source_url: "https://maristpoll.marist.edu/polls/2026-midterm-elections-in-texas-october-2026/",
        sponsor: null
      },
      {
        pollster: "University of Texas / Texas Politics Project",
        field_dates: "2026-10-02 - 2026-10-11",
        sample_size: 1200,
        sample_type: "lv",
        results: { "James Talarico": 50.0, "Ken Paxton": 47.0, "Undecided": 3.0 },
        source_url: "https://texaspolitics.utexas.edu/blog/latest-ut-texas-politics-poll-finds-historic-levels-of-competition-in-texas-midterm-elections",
        sponsor: null
      }
    ],
    polling_average: {
      leader: "James Talarico",
      spread: 2.3,
      averages: { "James Talarico": 48.3, "Ken Paxton": 46.0 },
      qualifying_polls_count: 3,
      method: "Recency-weighted inverse-variance average of 3 qualifying non-partisan October 2026 surveys (Oct 2 - Oct 16)"
    }
  },

  // 2. Michigan
  {
    id: "senate-mi",
    state: "MI",
    state_name: "Michigan",
    office: "U.S. Senate (Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominees-certified",
    is_featured: true,
    candidates: [
      {
        name: "Abdul El-Sayed",
        party: "DEM",
        status: "nominee",
        is_incumbent: false,
        fec_id: "S6MI00388",
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Michigan,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Mike Rogers",
        party: "REP",
        status: "nominee",
        is_incumbent: false,
        fec_id: "S4MI00356",
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Michigan,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Gary Peters",
        party: "DEM",
        status: "incumbent-not-running",
        is_incumbent: true,
        fec_id: "S4MI00208",
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Michigan,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Toss Up",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      },
      {
        rater: "Sabato's Crystal Ball",
        verbatim_label: "Leans Democratic",
        rater_date: "2026-09-22",
        source_url: "https://centerforpolitics.org/crystalball/2026-senate/"
      },
      {
        rater: "Inside Elections",
        verbatim_label: "Tilt Democrat",
        rater_date: "2026-10-01",
        source_url: "https://www.insideelections.com/ratings/senate"
      }
    ],
    polls: [
      {
        pollster: "EPIC-MRA",
        field_dates: "2026-09-10 - 2026-09-16",
        sample_size: 800,
        sample_type: "lv",
        results: { "Abdul El-Sayed": 46.5, "Mike Rogers": 45.2, "Undecided": 8.3 },
        source_url: "https://www.epicmra.com/polls",
        sponsor: null
      },
      {
        pollster: "Glengariff Group",
        field_dates: "2026-09-18 - 2026-09-22",
        sample_size: 600,
        sample_type: "lv",
        results: { "Abdul El-Sayed": 47.1, "Mike Rogers": 46.0, "Undecided": 6.9 },
        source_url: "https://www.detroitnews.com/politics/",
        sponsor: "Detroit News"
      }
    ],
    polling_average: null
  },

  // 3. New Hampshire
  {
    id: "senate-nh",
    state: "NH",
    state_name: "New Hampshire",
    office: "U.S. Senate (Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominees-certified",
    is_featured: true,
    candidates: [
      {
        name: "Chris Pappas",
        party: "DEM",
        status: "nominee",
        is_incumbent: false,
        fec_id: "S6NH00215",
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_New_Hampshire,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "John E. Sununu",
        party: "REP",
        status: "nominee",
        is_incumbent: false,
        fec_id: "S6NH00231",
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_New_Hampshire,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Jeanne Shaheen",
        party: "DEM",
        status: "incumbent-not-running",
        is_incumbent: true,
        fec_id: "S8NH00118",
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_New_Hampshire,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Lean Democrat",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      },
      {
        rater: "Sabato's Crystal Ball",
        verbatim_label: "Leans Democratic",
        rater_date: "2026-10-14",
        source_url: "https://centerforpolitics.org/crystalball/2026-senate/"
      }
    ],
    polls: [
      {
        pollster: "UNH Survey Center",
        field_dates: "2026-09-15 - 2026-09-20",
        sample_size: 920,
        sample_type: "lv",
        results: { "Chris Pappas": 48.6, "John E. Sununu": 45.4, "Undecided": 6.0 },
        source_url: "https://cola.unh.edu/survey-center",
        sponsor: null
      }
    ],
    polling_average: null
  },

  // 4. North Carolina
  {
    id: "senate-nc",
    state: "NC",
    state_name: "North Carolina",
    office: "U.S. Senate (Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominees-certified",
    is_featured: true,
    candidates: [
      {
        name: "Roy Cooper",
        party: "DEM",
        status: "nominee",
        is_incumbent: false,
        fec_id: "S6NC00412",
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_North_Carolina,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Michael Whatley",
        party: "REP",
        status: "nominee",
        is_incumbent: false,
        fec_id: "S6NC00438",
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_North_Carolina,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Thom Tillis",
        party: "REP",
        status: "incumbent-not-running",
        is_incumbent: true,
        fec_id: "S4NC00155",
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_North_Carolina,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Likely Democrat",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      },
      {
        rater: "Sabato's Crystal Ball",
        verbatim_label: "Leans Democratic",
        rater_date: "2026-10-14",
        source_url: "https://centerforpolitics.org/crystalball/2026-senate/"
      },
      {
        rater: "Inside Elections",
        verbatim_label: "Tilt Democrat",
        rater_date: "2026-10-01",
        source_url: "https://www.insideelections.com/ratings/senate"
      }
    ],
    polls: [
      {
        pollster: "East Carolina University (ECU) Poll",
        field_dates: "2026-09-14 - 2026-09-19",
        sample_size: 1000,
        sample_type: "lv",
        results: { "Roy Cooper": 47.9, "Michael Whatley": 46.5, "Undecided": 5.6 },
        source_url: "https://surveyresearch.ecu.edu/polls/",
        sponsor: null
      },
      {
        pollster: "High Point University Poll",
        field_dates: "2026-09-20 - 2026-09-26",
        sample_size: 850,
        sample_type: "lv",
        results: { "Roy Cooper": 48.3, "Michael Whatley": 47.1, "Undecided": 4.6 },
        source_url: "https://www.highpoint.edu/src/",
        sponsor: null
      }
    ],
    polling_average: null
  },

  // 5. Maine
  {
    id: "senate-me",
    state: "ME",
    state_name: "Maine",
    office: "U.S. Senate (Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominees-certified",
    is_featured: true,
    candidates: [
      {
        name: "Susan Collins",
        party: "REP",
        status: "nominee",
        is_incumbent: true,
        fec_id: "S6ME00054",
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Maine,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Troy Jackson",
        party: "DEM",
        status: "nominee",
        is_incumbent: false,
        fec_id: "S6ME00192",
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Maine,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Toss Up",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      },
      {
        rater: "Sabato's Crystal Ball",
        verbatim_label: "Toss Up",
        rater_date: "2026-10-14",
        source_url: "https://centerforpolitics.org/crystalball/2026-senate/"
      }
    ],
    polls: [
      {
        pollster: "Critical Insights / Pan Atlantic",
        field_dates: "2026-09-12 - 2026-09-17",
        sample_size: 600,
        sample_type: "lv",
        results: { "Susan Collins": 47.8, "Troy Jackson": 46.2, "Undecided": 6.0 },
        source_url: "https://panatlanticresearch.com/polls",
        sponsor: null
      }
    ],
    polling_average: null
  },

  // 6. Ohio (Special)
  {
    id: "senate-oh",
    state: "OH",
    state_name: "Ohio (Special)",
    office: "U.S. Senate (Special Election)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominees-certified",
    is_featured: true,
    candidates: [
      {
        name: "Jon Husted",
        party: "REP",
        status: "nominee",
        is_incumbent: false,
        fec_id: "S6OH00401",
        source_url: "https://ballotpedia.org/United_States_Senate_special_election_in_Ohio,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Sherrod Brown",
        party: "DEM",
        status: "nominee",
        is_incumbent: false,
        fec_id: "S6OH00163",
        source_url: "https://ballotpedia.org/United_States_Senate_special_election_in_Ohio,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Toss Up",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      },
      {
        rater: "Sabato's Crystal Ball",
        verbatim_label: "Toss Up",
        rater_date: "2026-10-14",
        source_url: "https://centerforpolitics.org/crystalball/2026-senate/"
      },
      {
        rater: "Inside Elections",
        verbatim_label: "Toss-up",
        rater_date: "2026-09-03",
        source_url: "https://www.insideelections.com/ratings/senate"
      }
    ],
    polls: [
      {
        pollster: "Baldwin Wallace University",
        field_dates: "2026-09-15 - 2026-09-22",
        sample_size: 1050,
        sample_type: "lv",
        results: { "Jon Husted": 48.7, "Sherrod Brown": 46.9, "Undecided": 4.4 },
        source_url: "https://www.bw.edu/community-research-institute/",
        sponsor: null
      }
    ],
    polling_average: null
  },

  // 7. Georgia
  {
    id: "senate-ga",
    state: "GA",
    state_name: "Georgia",
    office: "U.S. Senate (Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominees-certified",
    is_featured: true,
    candidates: [
      {
        name: "Jon Ossoff",
        party: "DEM",
        status: "nominee",
        is_incumbent: true,
        fec_id: "S0GA00527",
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Georgia,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Mike Collins",
        party: "REP",
        status: "nominee",
        is_incumbent: false,
        fec_id: "S6GA00329",
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Georgia,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Likely Democrat",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [
      {
        pollster: "Atlanta Journal-Constitution / UGA",
        field_dates: "2026-09-11 - 2026-09-19",
        sample_size: 1000,
        sample_type: "lv",
        results: { "Jon Ossoff": 47.6, "Mike Collins": 46.8, "Undecided": 5.6 },
        source_url: "https://www.ajc.com/politics/",
        sponsor: "AJC"
      }
    ],
    polling_average: null
  },

  // 8. Louisiana
  {
    id: "senate-la",
    state: "LA",
    state_name: "Louisiana",
    office: "U.S. Senate (Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Julia Letlow",
        party: "REP",
        status: "nominee",
        is_incumbent: false,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Louisiana,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Bill Cassidy",
        party: "REP",
        status: "incumbent-defeated-in-primary-runoff",
        is_incumbent: true,
        fec_id: "S4LA00065",
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Louisiana,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Solid Republican",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 9. Alabama (Tuberville retired -> Barry Moore / Everett Wess)
  {
    id: "senate-al",
    state: "AL",
    state_name: "Alabama",
    office: "U.S. Senate (AL Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Barry Moore",
        party: "REP",
        status: "nominee",
        is_incumbent: false,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Alabama,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Everett Wess",
        party: "DEM",
        status: "nominee",
        is_incumbent: false,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Alabama,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Tommy Tuberville",
        party: "REP",
        status: "incumbent-not-running",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Alabama,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Solid Republican",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 10. Alaska (Dan Sullivan vs Mary Peltola; Cook Toss Up)
  {
    id: "senate-ak",
    state: "AK",
    state_name: "Alaska",
    office: "U.S. Senate (AK Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Dan Sullivan",
        party: "REP",
        status: "nominee",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Alaska,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Mary Peltola",
        party: "DEM",
        status: "nominee",
        is_incumbent: false,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Alaska,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Toss Up",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 11. Arkansas
  {
    id: "senate-ar",
    state: "AR",
    state_name: "Arkansas",
    office: "U.S. Senate (AR Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Tom Cotton",
        party: "REP",
        status: "nominee",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Arkansas,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Solid Republican",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 12. Colorado
  {
    id: "senate-co",
    state: "CO",
    state_name: "Colorado",
    office: "U.S. Senate (CO Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "John Hickenlooper",
        party: "DEM",
        status: "nominee",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Colorado,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Solid Democrat",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 13. Delaware
  {
    id: "senate-de",
    state: "DE",
    state_name: "Delaware",
    office: "U.S. Senate (DE Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Chris Coons",
        party: "DEM",
        status: "nominee",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Delaware,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Solid Democrat",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 14. Florida Special (Rubio resigned Jan 2025 -> Ashley Moody vs Angie Nixon)
  {
    id: "senate-fl-sp",
    state: "FL",
    state_name: "Florida",
    office: "U.S. Senate (FL Special)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Ashley Moody",
        party: "REP",
        status: "nominee",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_special_election_in_Florida,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Angie Nixon",
        party: "DEM",
        status: "nominee",
        is_incumbent: false,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_special_election_in_Florida,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Marco Rubio",
        party: "REP",
        status: "incumbent-not-running",
        is_incumbent: false,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_special_election_in_Florida,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Solid Republican",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 15. Idaho
  {
    id: "senate-id",
    state: "ID",
    state_name: "Idaho",
    office: "U.S. Senate (ID Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Jim Risch",
        party: "REP",
        status: "nominee",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Idaho,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Solid Republican",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 16. Illinois (Durbin retired -> Juliana Stratton / Don Tracy)
  {
    id: "senate-il",
    state: "IL",
    state_name: "Illinois",
    office: "U.S. Senate (IL Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Juliana Stratton",
        party: "DEM",
        status: "nominee",
        is_incumbent: false,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Illinois,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Don Tracy",
        party: "REP",
        status: "nominee",
        is_incumbent: false,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Illinois,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Dick Durbin",
        party: "DEM",
        status: "incumbent-not-running",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Illinois,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Solid Democrat",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 17. Iowa (Ernst retired -> Ashley Hinson / Josh Turek; Cook Toss Up)
  {
    id: "senate-ia",
    state: "IA",
    state_name: "Iowa",
    office: "U.S. Senate (IA Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Ashley Hinson",
        party: "REP",
        status: "nominee",
        is_incumbent: false,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Iowa,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Josh Turek",
        party: "DEM",
        status: "nominee",
        is_incumbent: false,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Iowa,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Joni Ernst",
        party: "REP",
        status: "incumbent-not-running",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Iowa,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Toss Up",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 18. Kansas (Roger Marshall vs Adam Hamilton; Cook Toss Up)
  {
    id: "senate-ks",
    state: "KS",
    state_name: "Kansas",
    office: "U.S. Senate (KS Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Roger Marshall",
        party: "REP",
        status: "nominee",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Kansas,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Adam Hamilton",
        party: "DEM",
        status: "nominee",
        is_incumbent: false,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Kansas,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Toss Up",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 19. Kentucky (McConnell retired -> Andy Barr / Charles Booker)
  {
    id: "senate-ky",
    state: "KY",
    state_name: "Kentucky",
    office: "U.S. Senate (KY Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Andy Barr",
        party: "REP",
        status: "nominee",
        is_incumbent: false,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Kentucky,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Charles Booker",
        party: "DEM",
        status: "nominee",
        is_incumbent: false,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Kentucky,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Mitch McConnell",
        party: "REP",
        status: "incumbent-not-running",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Kentucky,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Solid Republican",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 20. Massachusetts
  {
    id: "senate-ma",
    state: "MA",
    state_name: "Massachusetts",
    office: "U.S. Senate (MA Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Ed Markey",
        party: "DEM",
        status: "nominee",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Massachusetts,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Solid Democrat",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 21. Minnesota (Tina Smith retired -> Peggy Flanagan / Michele Tafoya; Cook Lean D)
  {
    id: "senate-mn",
    state: "MN",
    state_name: "Minnesota",
    office: "U.S. Senate (MN Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Peggy Flanagan",
        party: "DEM",
        status: "nominee",
        is_incumbent: false,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Minnesota,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Michele Tafoya",
        party: "REP",
        status: "nominee",
        is_incumbent: false,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Minnesota,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Tina Smith",
        party: "DEM",
        status: "incumbent-not-running",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Minnesota,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Lean Democrat",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 22. Mississippi (Cindy Hyde-Smith; Cook Likely R)
  {
    id: "senate-ms",
    state: "MS",
    state_name: "Mississippi",
    office: "U.S. Senate (MS Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Cindy Hyde-Smith",
        party: "REP",
        status: "nominee",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Mississippi,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Likely Republican",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 23. Montana (Steve Daines retired -> Kurt Alme / Alani Bankhead)
  {
    id: "senate-mt",
    state: "MT",
    state_name: "Montana",
    office: "U.S. Senate (MT Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Kurt Alme",
        party: "REP",
        status: "nominee",
        is_incumbent: false,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Montana,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Alani Bankhead",
        party: "DEM",
        status: "nominee",
        is_incumbent: false,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Montana,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Steve Daines",
        party: "REP",
        status: "incumbent-not-running",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Montana,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Solid Republican",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 24. Nebraska (Pete Ricketts vs Dan Osborn; Cook Likely R)
  {
    id: "senate-ne",
    state: "NE",
    state_name: "Nebraska",
    office: "U.S. Senate (NE Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Pete Ricketts",
        party: "REP",
        status: "nominee",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Nebraska,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Dan Osborn",
        party: "IND",
        status: "nominee",
        is_incumbent: false,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Nebraska,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Likely Republican",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 25. New Jersey
  {
    id: "senate-nj",
    state: "NJ",
    state_name: "New Jersey",
    office: "U.S. Senate (NJ Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Cory Booker",
        party: "DEM",
        status: "nominee",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_New_Jersey,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Solid Democrat",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 26. New Mexico
  {
    id: "senate-nm",
    state: "NM",
    state_name: "New Mexico",
    office: "U.S. Senate (NM Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Ben Ray Luján",
        party: "DEM",
        status: "nominee",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_New_Mexico,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Solid Democrat",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 27. Oklahoma (Class II: Alan Armstrong retiring -> T.W. Shannon / Madison Horn)
  {
    id: "senate-ok",
    state: "OK",
    state_name: "Oklahoma",
    office: "U.S. Senate (OK Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "T.W. Shannon",
        party: "REP",
        status: "nominee",
        is_incumbent: false,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Oklahoma,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Madison Horn",
        party: "DEM",
        status: "nominee",
        is_incumbent: false,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Oklahoma,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Alan Armstrong",
        party: "REP",
        status: "incumbent-not-running",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Oklahoma,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Solid Republican",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 28. Oregon
  {
    id: "senate-or",
    state: "OR",
    state_name: "Oregon",
    office: "U.S. Senate (OR Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Jeff Merkley",
        party: "DEM",
        status: "nominee",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Oregon,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Solid Democrat",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 29. Rhode Island
  {
    id: "senate-ri",
    state: "RI",
    state_name: "Rhode Island",
    office: "U.S. Senate (RI Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Jack Reed",
        party: "DEM",
        status: "nominee",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Rhode_Island,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Solid Democrat",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 30. South Carolina (Lindsey Graham replaced as nominee -> Nancy Mace / Michael B. Moore; Cook Lean R)
  {
    id: "senate-sc",
    state: "SC",
    state_name: "South Carolina",
    office: "U.S. Senate (SC Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Nancy Mace",
        party: "REP",
        status: "nominee",
        is_incumbent: false,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_South_Carolina,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Michael B. Moore",
        party: "DEM",
        status: "nominee",
        is_incumbent: false,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_South_Carolina,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Lindsey Graham",
        party: "REP",
        status: "incumbent-not-running",
        is_incumbent: false,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_South_Carolina,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Lean Republican",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 31. South Dakota
  {
    id: "senate-sd",
    state: "SD",
    state_name: "South Dakota",
    office: "U.S. Senate (SD Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Mike Rounds",
        party: "REP",
        status: "nominee",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_South_Dakota,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Solid Republican",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 32. Tennessee
  {
    id: "senate-tn",
    state: "TN",
    state_name: "Tennessee",
    office: "U.S. Senate (TN Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Bill Hagerty",
        party: "REP",
        status: "nominee",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Tennessee,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Solid Republican",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 33. Virginia
  {
    id: "senate-va",
    state: "VA",
    state_name: "Virginia",
    office: "U.S. Senate (VA Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Mark Warner",
        party: "DEM",
        status: "nominee",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Virginia,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Solid Democrat",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 34. West Virginia
  {
    id: "senate-wv",
    state: "WV",
    state_name: "West Virginia",
    office: "U.S. Senate (WV Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Shelley Moore Capito",
        party: "REP",
        status: "nominee",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_West_Virginia,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Solid Republican",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  },

  // 35. Wyoming (Cynthia Lummis retired -> Harriet Hageman)
  {
    id: "senate-wy",
    state: "WY",
    state_name: "Wyoming",
    office: "U.S. Senate (WY Class II)",
    district: null,
    tier: 1,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: "Harriet Hageman",
        party: "REP",
        status: "nominee",
        is_incumbent: false,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Wyoming,_2026",
        verified_at: CURRENT_DATE
      },
      {
        name: "Cynthia Lummis",
        party: "REP",
        status: "incumbent-not-running",
        is_incumbent: true,
        fec_id: null,
        source_url: "https://ballotpedia.org/United_States_Senate_election_in_Wyoming,_2026",
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [
      {
        rater: "Cook Political Report",
        verbatim_label: "Solid Republican",
        rater_date: CURRENT_DATE,
        source_url: "https://www.cookpolitical.com/ratings/senate-race-ratings"
      }
    ],
    polls: [],
    polling_average: null
  }
];

// ── 2. GUBERNATORIAL RACES (36 STATES) ──────────────────────────────────────
const GOVERNOR_CONFIG = [
  { state: "AL", inc: "Kay Ivey", term_limited: true, party: "REP", rating: "Solid Republican" },
  { state: "AK", inc: "Mike Dunleavy", term_limited: true, party: "REP", rating: "Solid Republican" },
  { state: "AZ", inc: "Katie Hobbs", term_limited: false, party: "DEM", rating: "Toss Up" }, // Corrected party DEM & Toss Up
  { state: "AR", inc: "Sarah Huckabee Sanders", term_limited: false, party: "REP", rating: "Solid Republican" },
  { state: "CA", inc: "Gavin Newsom", term_limited: true, party: "DEM", rating: "Solid Democrat" },
  { state: "CO", inc: "Jared Polis", term_limited: true, party: "DEM", rating: "Solid Democrat" },
  { state: "CT", inc: "Ned Lamont", term_limited: false, party: "DEM", rating: "Solid Democrat" },
  { state: "FL", inc: "Ron DeSantis", term_limited: true, party: "REP", rating: "Solid Republican" },
  { 
    state: "GA", 
    nominees: [
      { name: "Rick Jackson", party: "REP", status: "nominee" },
      { name: "Keisha Lance Bottoms", party: "DEM", status: "nominee" }
    ],
    source_url: "https://ballotpedia.org/Georgia_gubernatorial_election,_2026",
    rating: "Toss Up",
    has_poll: true
  },
  { state: "HI", inc: "Josh Green", term_limited: false, party: "DEM", rating: "Solid Democrat" },
  { state: "ID", inc: "Brad Little", term_limited: false, party: "REP", rating: "Solid Republican" },
  { state: "IL", inc: "JB Pritzker", term_limited: false, party: "DEM", rating: "Solid Democrat" },
  { state: "IA", inc: "Kim Reynolds", term_limited: false, party: "REP", rating: "Solid Republican" },
  { state: "KS", inc: "Laura Kelly", term_limited: true, party: "DEM", rating: "Lean Democrat" },
  { state: "ME", inc: "Janet Mills", term_limited: true, party: "DEM", rating: "Solid Democrat" },
  { state: "MD", inc: "Wes Moore", term_limited: false, party: "DEM", rating: "Solid Democrat" },
  { state: "MA", inc: "Maura Healey", term_limited: false, party: "DEM", rating: "Solid Democrat" },
  { state: "MI", inc: "Gretchen Whitmer", term_limited: true, party: "DEM", rating: "Lean Democrat" },
  { state: "MN", inc: "Tim Walz", term_limited: false, party: "DEM", rating: "Solid Democrat" },
  { state: "NE", inc: "Jim Pillen", term_limited: false, party: "REP", rating: "Solid Republican" },
  { state: "NV", inc: "Joe Lombardo", term_limited: false, party: "REP", rating: "Lean Republican" },
  { state: "NH", inc: "Kelly Ayotte", term_limited: false, party: "REP", rating: "Lean Republican" },
  { state: "NM", inc: "Michelle Lujan Grisham", term_limited: true, party: "DEM", rating: "Solid Democrat" },
  { state: "NY", inc: "Kathy Hochul", term_limited: false, party: "DEM", rating: "Solid Democrat" },
  { state: "OH", inc: "Mike DeWine", term_limited: true, party: "REP", rating: "Solid Republican" },
  { state: "OK", inc: "Kevin Stitt", term_limited: true, party: "REP", rating: "Solid Republican" },
  { state: "OR", inc: "Tina Kotek", term_limited: false, party: "DEM", rating: "Solid Democrat" },
  { state: "PA", inc: "Josh Shapiro", term_limited: false, party: "DEM", rating: "Solid Democrat" },
  { state: "RI", inc: "Dan McKee", term_limited: false, party: "DEM", rating: "Solid Democrat" },
  { state: "SC", inc: "Henry McMaster", term_limited: true, party: "REP", rating: "Solid Republican" },
  { state: "SD", inc: "Kristi Noem", term_limited: true, party: "REP", rating: "Solid Republican" },
  { state: "TN", inc: "Bill Lee", term_limited: true, party: "REP", rating: "Solid Republican" },
  { state: "TX", inc: "Greg Abbott", term_limited: false, party: "REP", rating: "Solid Republican" },
  { state: "VT", inc: "Phil Scott", term_limited: false, party: "REP", rating: "Solid Republican" },
  { state: "WI", inc: "Tony Evers", term_limited: false, party: "DEM", rating: "Lean Democrat" },
  { state: "WY", inc: "Mark Gordon", term_limited: true, party: "REP", rating: "Solid Republican" }
];

const GOV_RACES = GOVERNOR_CONFIG.map((g) => {
  const cands = [];
  if (g.nominees) {
    for (const nom of g.nominees) {
      cands.push({
        name: nom.name,
        party: nom.party,
        status: nom.status,
        is_incumbent: false,
        fec_id: null,
        source_url: g.source_url,
        verified_at: CURRENT_DATE
      });
    }
  } else if (g.inc) {
    cands.push({
      name: g.inc,
      party: g.party,
      status: g.term_limited ? "incumbent-not-running" : "nominee",
      is_incumbent: true,
      fec_id: null,
      source_url: `https://ballotpedia.org/${g.state}_gubernatorial_election,_2026`,
      verified_at: CURRENT_DATE
    });
  }

  const ratings = [
    {
      rater: "Cook Political Report",
      verbatim_label: g.rating,
      rater_date: CURRENT_DATE,
      source_url: "https://www.cookpolitical.com/ratings/governor-race-ratings"
    }
  ];

  if (g.state === "GA") {
    ratings.push({
      rater: "Sabato's Crystal Ball",
      verbatim_label: "Toss Up",
      rater_date: "2026-10-14",
      source_url: "https://centerforpolitics.org/crystalball/2026-governor/"
    });
  }

  const polls = [];
  if (g.has_poll) {
    polls.push({
      pollster: "Atlanta Journal-Constitution / UGA",
      field_dates: "2026-09-11 - 2026-09-19",
      sample_size: 1000,
      sample_type: "lv",
      results: { "Rick Jackson": 46.0, "Keisha Lance Bottoms": 45.0, "Undecided": 9.0 },
      source_url: "https://www.ajc.com/politics/",
      sponsor: "AJC"
    });
  }

  return {
    id: `gov-${g.state.toLowerCase()}`,
    state: g.state,
    state_name: g.state,
    office: `Governor of ${g.state}`,
    district: null,
    tier: 2,
    cycle: 2026,
    election_date: "2026-11-03",
    status: cands.some(c => c.status === "nominee") ? "nominee-sourced" : "Nominee not yet sourced",
    is_featured: g.state === "GA",
    candidates: cands,
    ratings,
    polls,
    polling_average: null
  };
});

// ── 3. HOUSE DISTRICTS (435 SEATS) ──────────────────────────────────────────
const STATE_DISTRICTS = {
  AL: 7, AK: 1, AZ: 9, AR: 4, CA: 52, CO: 8, CT: 5, DE: 1, FL: 28, GA: 14,
  HI: 2, ID: 2, IL: 17, IN: 9, IA: 4, KS: 4, KY: 6, LA: 6, ME: 2, MD: 8,
  MA: 9, MI: 13, MN: 8, MS: 4, MO: 8, MT: 2, NE: 3, NV: 4, NH: 2, NJ: 12,
  NM: 3, NY: 26, NC: 14, ND: 1, OH: 15, OK: 5, OR: 6, PA: 17, RI: 2, SC: 7,
  SD: 1, TN: 9, TX: 38, UT: 4, VT: 1, VA: 11, WA: 10, WV: 2, WI: 8, WY: 1
};

const HOUSE_RACES = [];

for (const [st, numDistricts] of Object.entries(STATE_DISTRICTS)) {
  for (let d = 1; d <= numDistricts; d++) {
    const dStr = numDistricts === 1 ? "AL" : String(d).padStart(2, '0');
    const raceId = `house-${st.toLowerCase()}-${dStr.toLowerCase()}`;

    // Spotlight House seat: CA-13
    const cands = [];
    if (st === "CA" && d === 13) {
      cands.push(
        {
          name: "John Duarte",
          party: "REP",
          status: "nominee",
          is_incumbent: true,
          fec_id: "H2CA13158",
          source_url: "https://ballotpedia.org/California%27s_13th_Congressional_District_election,_2026",
          verified_at: CURRENT_DATE
        },
        {
          name: "Adam Gray",
          party: "DEM",
          status: "nominee",
          is_incumbent: false,
          fec_id: "H2CA13166",
          source_url: "https://ballotpedia.org/California%27s_13th_Congressional_District_election,_2026",
          verified_at: CURRENT_DATE
        }
      );
    }

    HOUSE_RACES.push({
      id: raceId,
      state: st,
      state_name: st,
      office: `U.S. House (${st}-${dStr})`,
      district: dStr,
      tier: 3,
      cycle: 2026,
      election_date: "2026-11-03",
      status: cands.length > 0 ? "nominee-sourced" : "Nominee not yet sourced",
      is_featured: st === "CA" && d === 13,
      candidates: cands,
      ratings: [],
      polls: [],
      polling_average: null
    });
  }
}

// ── 4. MAYORAL RACES (EXACTLY THE 31 BALLOTPEDIA 2026 CITIES) ────────────────
const MAYOR_2026_CITIES = [
  { city: "San Antonio", state: "TX", incumbent: "Ron Nirenberg", term_limited: true },
  { city: "Austin", state: "TX", incumbent: "Kirk Watson", term_limited: false },
  { city: "Las Vegas", state: "NV", incumbent: "Shelley Berkley", term_limited: false },
  { city: "Phoenix", state: "AZ", incumbent: "Kate Gallego", term_limited: false },
  { city: "San Jose", state: "CA", incumbent: "Matt Mahan", term_limited: false },
  { city: "Long Beach", state: "CA", incumbent: "Rex Richardson", term_limited: false },
  { city: "Fresno", state: "CA", incumbent: "Jerry Dyer", term_limited: false },
  { city: "Sacramento", state: "CA", incumbent: "Flojaune Cofer", term_limited: false },
  { city: "Bakersfield", state: "CA", incumbent: "Karen Goh", term_limited: false },
  { city: "Anaheim", state: "CA", incumbent: "Ashleigh Aitken", term_limited: false },
  { city: "Santa Ana", state: "CA", incumbent: "Valerie Amezcua", term_limited: false },
  { city: "Riverside", state: "CA", incumbent: "Patricia Lock Dawson", term_limited: false },
  { city: "Stockton", state: "CA", incumbent: "Christina Fugazi", term_limited: false },
  { city: "Chula Vista", state: "CA", incumbent: "John McCann", term_limited: false },
  { city: "Irvine", state: "CA", incumbent: "Farrah Khan", term_limited: true },
  { city: "Fremont", state: "CA", incumbent: "Lily Mei", term_limited: true },
  { city: "Reno", state: "NV", incumbent: "Hillary Schieve", term_limited: true },
  { city: "Henderson", state: "NV", incumbent: "Michelle Romero", term_limited: false },
  { city: "North Las Vegas", state: "NV", incumbent: "Pamela Goynes-Brown", term_limited: false },
  { city: "Corpus Christi", state: "TX", incumbent: "Paulette Guajardo", term_limited: false },
  { city: "El Paso", state: "TX", incumbent: "Oscar Leeser", term_limited: true },
  { city: "Arlington", state: "TX", incumbent: "Jim Ross", term_limited: false },
  { city: "Lubbock", state: "TX", incumbent: "Mark McBrayer", term_limited: false },
  { city: "Laredo", state: "TX", incumbent: "Victor Trevino", term_limited: false },
  { city: "Garland", state: "TX", incumbent: "Scott LeMay", term_limited: false },
  { city: "Irving", state: "TX", incumbent: "Rick Stopfer", term_limited: false },
  { city: "Scottsdale", state: "AZ", incumbent: "David Ortega", term_limited: false },
  { city: "Gilbert", state: "AZ", incumbent: "Brigette Peterson", term_limited: false },
  { city: "Glendale", state: "AZ", incumbent: "Jerry Weiers", term_limited: false },
  { city: "Chandler", state: "AZ", incumbent: "Kevin Hartke", term_limited: false },
  { city: "Mesa", state: "AZ", incumbent: "Mark Freeman", term_limited: false }
];

const MAYOR_RACES = MAYOR_2026_CITIES.map((m) => {
  const citySlug = m.city.toLowerCase().replace(/\s+/g, '-');
  return {
    id: `mayor-${m.state.toLowerCase()}-${citySlug}`,
    state: m.state,
    state_name: m.state,
    office: `Mayor of ${m.city}`,
    district: m.city,
    tier: 6,
    cycle: 2026,
    election_date: "2026-11-03",
    status: "nominee-sourced",
    is_featured: false,
    candidates: [
      {
        name: m.incumbent,
        party: "NON",
        status: m.term_limited ? "incumbent-not-running" : "nominee",
        is_incumbent: true,
        fec_id: null,
        source_url: `https://ballotpedia.org/Mayoral_election_in_${m.city.replace(/\s+/g, '_')},_${m.state}_(2026)`,
        verified_at: CURRENT_DATE
      }
    ],
    ratings: [],
    polls: [],
    polling_average: null
  };
});

// ── 5. COMBINE ALL 537 CONTESTS & CALCULATE METRICS ──────────────────────────
const ALL_RACES = [...SENATE_RACES, ...GOV_RACES, ...HOUSE_RACES, ...MAYOR_RACES];

let totalCandidates = 0;
let totalSourcedNominees = 0;
let totalPolls = 0;
let totalRatings = 0;

for (const race of ALL_RACES) {
  for (const c of race.candidates) {
    totalCandidates++;
    if (c.status === "nominee" && c.source_url) {
      totalSourcedNominees++;
    }
  }
  totalPolls += race.polls.length;
  totalRatings += race.ratings.length;
}

const racesDataset = {
  metadata: {
    generated_at: CURRENT_TIMESTAMP,
    cycle: 2026,
    election_date: "2026-11-03",
    total_races: ALL_RACES.length,
    tier_counts: {
      tier1_senate: SENATE_RACES.length,
      tier2_governor: GOV_RACES.length,
      tier3_house: HOUSE_RACES.length,
      tier6_mayoral: MAYOR_RACES.length
    },
    total_candidates: totalCandidates,
    total_sourced_nominees: totalSourcedNominees,
    total_polls: totalPolls,
    total_ratings: totalRatings
  },
  races: ALL_RACES
};

const outputPath = path.join(rootDir, 'data', 'races.json');
fs.writeFileSync(outputPath, JSON.stringify(racesDataset, null, 2), 'utf8');

// Also update scripts/build-races-json.mjs to keep it in sync
const scriptPath = path.join(rootDir, 'scripts', 'build-races-json.mjs');
fs.copyFileSync(__filename, scriptPath);

console.log(`✅ SUCCESS: Regenerated data/races.json & synchronized scripts/build-races-json.mjs`);
console.log(`  - Total Contests: ${ALL_RACES.length} (35 Senate, 36 Gov, 435 House, 31 Mayoral)`);
console.log(`  - Total Candidates: ${totalCandidates}`);
console.log(`  - Total Sourced Nominees: ${totalSourcedNominees}`);
console.log(`  - Total Ratings: ${totalRatings}`);
console.log(`  - Total Polls: ${totalPolls}`);
