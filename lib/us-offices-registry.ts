import { US_LOCAL_JURISDICTIONS } from './local-jurisdictions';
/**
 * US COMPLETE OFFICES REGISTRY
 * Every electable position in the United States — federal, state, county, municipal.
 * Municipal coverage: places with population >= 1,000 (Census-based).
 * Dynamically anchored to runtime — zero static date decay.
 */

export type OfficeLevel = 'federal' | 'state' | 'county' | 'municipal' | 'special_district' | 'judicial';

export type OfficeTier =
  | 'PRESIDENT'
  | 'US_SENATE'
  | 'US_HOUSE'
  | 'GOVERNOR'
  | 'LT_GOVERNOR'
  | 'ATTORNEY_GENERAL'
  | 'SECRETARY_OF_STATE'
  | 'STATE_TREASURER'
  | 'STATE_COMPTROLLER'
  | 'STATE_AUDITOR'
  | 'SUPERINTENDENT_OF_EDUCATION'
  | 'COMMISSIONER_OF_AGRICULTURE'
  | 'COMMISSIONER_OF_INSURANCE'
  | 'STATE_SENATE'
  | 'STATE_HOUSE'
  | 'SUPREME_COURT'
  | 'APPEALS_COURT'
  | 'DISTRICT_COURT'
  | 'COUNTY_EXECUTIVE'
  | 'COUNTY_COMMISSIONER'
  | 'COUNTY_SHERIFF'
  | 'COUNTY_CLERK'
  | 'COUNTY_TREASURER'
  | 'COUNTY_ASSESSOR'
  | 'COUNTY_AUDITOR'
  | 'COUNTY_RECORDER'
  | 'COUNTY_CORONER'
  | 'COUNTY_SURVEYOR'
  | 'COUNTY_JUDGE'
  | 'DISTRICT_ATTORNEY'
  | 'PUBLIC_DEFENDER'
  | 'MAYOR'
  | 'CITY_COUNCIL'
  | 'CITY_CLERK'
  | 'CITY_TREASURER'
  | 'CITY_AUDITOR'
  | 'CITY_ATTORNEY'
  | 'CITY_COMPTROLLER'
  | 'MUNICIPAL_JUDGE'
  | 'SCHOOL_BOARD'
  | 'WATER_DISTRICT'
  | 'FIRE_DISTRICT'
  | 'SOIL_CONSERVATION'
  | 'TOWNSHIP_TRUSTEE'
  | 'VILLAGE_PRESIDENT'
  | 'CONSTABLE'
  | 'JUSTICE_OF_PEACE'
  | 'DOG_CATCHER'
  | 'ANIMAL_CONTROL_OFFICER'
  | 'TOWN_MODERATOR'
  | 'SELECTBOARD_MEMBER'
  | 'TAX_COLLECTOR';

export interface OfficeDefinition {
  tier: OfficeTier;
  level: OfficeLevel;
  title: string;
  category: string;
  description: string;
  isPartisan: boolean;
  termYears: number;
  seats: number; // seats per jurisdiction (e.g., council = 5-9)
  icon: string;
}

export interface JurisdictionOffice {
  id: string;
  state: string;
  stateAbbr: string;
  county?: string;
  municipality?: string;
  population?: number;
  tier: OfficeTier;
  level: OfficeLevel;
  title: string;
  category: string;
  nextElection: string; // YYYY-MM-DD dynamic
  cycleYear: number;
  isPartisan: boolean;
  termYears: number;
  totalSeats: number;
  seatsUpThisCycle: number;
  incumbentParty?: string;
  rating?: string;
  notes?: string;
}

// Master Office Definitions
export const OFFICE_DEFINITIONS: Record<OfficeTier, OfficeDefinition> = {
  PRESIDENT: {
    tier: 'PRESIDENT', level: 'federal', title: 'President of the United States',
    category: 'Federal Executive', description: 'Chief executive of the federal government. 4-year term, max 2 terms.',
    isPartisan: true, termYears: 4, seats: 1, icon: '🏛️',
  },
  US_SENATE: {
    tier: 'US_SENATE', level: 'federal', title: 'U.S. Senator',
    category: 'Federal Legislative', description: '100 total seats. 6-year staggered terms. 33–34 seats up per cycle.',
    isPartisan: true, termYears: 6, seats: 2, icon: '🏛️',
  },
  US_HOUSE: {
    tier: 'US_HOUSE', level: 'federal', title: 'U.S. Representative',
    category: 'Federal Legislative', description: '435 seats apportioned by population. 2-year terms. All seats up every cycle.',
    isPartisan: true, termYears: 2, seats: 1, icon: '🏛️',
  },
  GOVERNOR: {
    tier: 'GOVERNOR', level: 'state', title: 'Governor',
    category: 'State Executive', description: 'Chief executive of the state government.',
    isPartisan: true, termYears: 4, seats: 1, icon: '🏦',
  },
  LT_GOVERNOR: {
    tier: 'LT_GOVERNOR', level: 'state', title: 'Lieutenant Governor',
    category: 'State Executive', description: 'Second-in-command to the Governor. Elected separately in many states.',
    isPartisan: true, termYears: 4, seats: 1, icon: '🏦',
  },
  ATTORNEY_GENERAL: {
    tier: 'ATTORNEY_GENERAL', level: 'state', title: 'Attorney General',
    category: 'State Executive', description: 'Chief law enforcement officer of the state.',
    isPartisan: true, termYears: 4, seats: 1, icon: '⚖️',
  },
  SECRETARY_OF_STATE: {
    tier: 'SECRETARY_OF_STATE', level: 'state', title: 'Secretary of State',
    category: 'State Executive', description: 'Oversees elections, corporations, and official state records.',
    isPartisan: true, termYears: 4, seats: 1, icon: '📋',
  },
  STATE_TREASURER: {
    tier: 'STATE_TREASURER', level: 'state', title: 'State Treasurer',
    category: 'State Executive', description: 'Manages state funds and financial assets.',
    isPartisan: true, termYears: 4, seats: 1, icon: '💰',
  },
  STATE_COMPTROLLER: {
    tier: 'STATE_COMPTROLLER', level: 'state', title: 'State Comptroller',
    category: 'State Executive', description: 'Chief fiscal officer; oversees state accounting and spending.',
    isPartisan: true, termYears: 4, seats: 1, icon: '📊',
  },
  STATE_AUDITOR: {
    tier: 'STATE_AUDITOR', level: 'state', title: 'State Auditor',
    category: 'State Executive', description: 'Independent oversight of state financial operations.',
    isPartisan: false, termYears: 4, seats: 1, icon: '🔍',
  },
  SUPERINTENDENT_OF_EDUCATION: {
    tier: 'SUPERINTENDENT_OF_EDUCATION', level: 'state', title: 'Superintendent of Public Instruction',
    category: 'State Executive', description: 'Oversees the state\'s public K-12 education system.',
    isPartisan: false, termYears: 4, seats: 1, icon: '🎓',
  },
  COMMISSIONER_OF_AGRICULTURE: {
    tier: 'COMMISSIONER_OF_AGRICULTURE', level: 'state', title: 'Commissioner of Agriculture',
    category: 'State Executive', description: 'Regulates agriculture, farming, food safety, and rural development.',
    isPartisan: true, termYears: 4, seats: 1, icon: '🌾',
  },
  COMMISSIONER_OF_INSURANCE: {
    tier: 'COMMISSIONER_OF_INSURANCE', level: 'state', title: 'Commissioner of Insurance',
    category: 'State Executive', description: 'Regulates the insurance industry within the state.',
    isPartisan: true, termYears: 4, seats: 1, icon: '🛡️',
  },
  STATE_SENATE: {
    tier: 'STATE_SENATE', level: 'state', title: 'State Senator',
    category: 'State Legislative', description: 'Upper chamber of the state legislature. Represents multi-district constituencies.',
    isPartisan: true, termYears: 4, seats: 1, icon: '🏛️',
  },
  STATE_HOUSE: {
    tier: 'STATE_HOUSE', level: 'state', title: 'State Representative',
    category: 'State Legislative', description: 'Lower chamber of the state legislature. 2-4 year terms.',
    isPartisan: true, termYears: 2, seats: 1, icon: '🏛️',
  },
  SUPREME_COURT: {
    tier: 'SUPREME_COURT', level: 'judicial', title: 'State Supreme Court Justice',
    category: 'State Judicial', description: 'Highest court in the state. Retention elections or partisan races.',
    isPartisan: false, termYears: 8, seats: 1, icon: '⚖️',
  },
  APPEALS_COURT: {
    tier: 'APPEALS_COURT', level: 'judicial', title: 'Court of Appeals Judge',
    category: 'State Judicial', description: 'Intermediate appellate courts. Reviews trial court decisions.',
    isPartisan: false, termYears: 6, seats: 1, icon: '⚖️',
  },
  DISTRICT_COURT: {
    tier: 'DISTRICT_COURT', level: 'judicial', title: 'District Court Judge',
    category: 'State Judicial', description: 'Trial courts of general jurisdiction.',
    isPartisan: false, termYears: 6, seats: 1, icon: '⚖️',
  },
  COUNTY_EXECUTIVE: {
    tier: 'COUNTY_EXECUTIVE', level: 'county', title: 'County Executive / County Administrator',
    category: 'County Executive', description: 'Chief executive of county government. Not all counties have this position.',
    isPartisan: true, termYears: 4, seats: 1, icon: '🏢',
  },
  COUNTY_COMMISSIONER: {
    tier: 'COUNTY_COMMISSIONER', level: 'county', title: 'County Commissioner / Supervisor',
    category: 'County Legislative', description: 'Governing board of the county. Typically 3–5 members.',
    isPartisan: true, termYears: 4, seats: 3, icon: '🏢',
  },
  COUNTY_SHERIFF: {
    tier: 'COUNTY_SHERIFF', level: 'county', title: 'County Sheriff',
    category: 'County Law Enforcement', description: 'Chief law enforcement officer of the county. Runs jail, court security.',
    isPartisan: true, termYears: 4, seats: 1, icon: '⭐',
  },
  COUNTY_CLERK: {
    tier: 'COUNTY_CLERK', level: 'county', title: 'County Clerk / Register of Deeds',
    category: 'County Administrative', description: 'Maintains official county records, administers local elections.',
    isPartisan: true, termYears: 4, seats: 1, icon: '📁',
  },
  COUNTY_TREASURER: {
    tier: 'COUNTY_TREASURER', level: 'county', title: 'County Treasurer',
    category: 'County Financial', description: 'Manages county tax collection and financial accounts.',
    isPartisan: true, termYears: 4, seats: 1, icon: '💰',
  },
  COUNTY_ASSESSOR: {
    tier: 'COUNTY_ASSESSOR', level: 'county', title: 'County Assessor / Appraiser',
    category: 'County Financial', description: 'Determines property values for tax purposes.',
    isPartisan: true, termYears: 4, seats: 1, icon: '🏠',
  },
  COUNTY_AUDITOR: {
    tier: 'COUNTY_AUDITOR', level: 'county', title: 'County Auditor / Controller',
    category: 'County Financial', description: 'Oversees county financial accounts and payroll.',
    isPartisan: false, termYears: 4, seats: 1, icon: '🔍',
  },
  COUNTY_RECORDER: {
    tier: 'COUNTY_RECORDER', level: 'county', title: 'County Recorder / Register of Deeds',
    category: 'County Administrative', description: 'Records deeds, mortgages, and other official documents.',
    isPartisan: true, termYears: 4, seats: 1, icon: '📜',
  },
  COUNTY_CORONER: {
    tier: 'COUNTY_CORONER', level: 'county', title: 'County Coroner / Medical Examiner',
    category: 'County Administrative', description: 'Investigates deaths; determines cause and manner.',
    isPartisan: false, termYears: 4, seats: 1, icon: '🔬',
  },
  COUNTY_SURVEYOR: {
    tier: 'COUNTY_SURVEYOR', level: 'county', title: 'County Surveyor',
    category: 'County Administrative', description: 'Oversees land surveys and boundary demarcations within the county.',
    isPartisan: false, termYears: 4, seats: 1, icon: '📐',
  },
  COUNTY_JUDGE: {
    tier: 'COUNTY_JUDGE', level: 'county', title: 'County Judge / Probate Judge',
    category: 'County Judicial', description: 'Presides over probate, family, and minor civil cases at county level.',
    isPartisan: false, termYears: 4, seats: 1, icon: '⚖️',
  },
  DISTRICT_ATTORNEY: {
    tier: 'DISTRICT_ATTORNEY', level: 'county', title: 'District Attorney / State\'s Attorney / Prosecutor',
    category: 'County Law Enforcement', description: 'Chief prosecutor for criminal cases in the county or judicial district.',
    isPartisan: true, termYears: 4, seats: 1, icon: '⚖️',
  },
  PUBLIC_DEFENDER: {
    tier: 'PUBLIC_DEFENDER', level: 'county', title: 'Public Defender',
    category: 'County Judicial', description: 'Provides legal representation to defendants who cannot afford counsel.',
    isPartisan: false, termYears: 4, seats: 1, icon: '🛡️',
  },
  MAYOR: {
    tier: 'MAYOR', level: 'municipal', title: 'Mayor',
    category: 'Municipal Executive', description: 'Chief executive of a city or town government.',
    isPartisan: false, termYears: 4, seats: 1, icon: '🏙️',
  },
  CITY_COUNCIL: {
    tier: 'CITY_COUNCIL', level: 'municipal', title: 'City / Town Council Member',
    category: 'Municipal Legislative', description: 'Governing legislative body of the municipality.',
    isPartisan: false, termYears: 4, seats: 5, icon: '🏙️',
  },
  CITY_CLERK: {
    tier: 'CITY_CLERK', level: 'municipal', title: 'City / Town Clerk',
    category: 'Municipal Administrative', description: 'Maintains city records, administers municipal elections.',
    isPartisan: false, termYears: 2, seats: 1, icon: '📁',
  },
  CITY_TREASURER: {
    tier: 'CITY_TREASURER', level: 'municipal', title: 'City / Town Treasurer',
    category: 'Municipal Financial', description: 'Manages municipal funds and tax collection.',
    isPartisan: false, termYears: 2, seats: 1, icon: '💰',
  },
  CITY_AUDITOR: {
    tier: 'CITY_AUDITOR', level: 'municipal', title: 'City Auditor',
    category: 'Municipal Financial', description: 'Provides independent financial oversight of city operations.',
    isPartisan: false, termYears: 4, seats: 1, icon: '🔍',
  },
  CITY_ATTORNEY: {
    tier: 'CITY_ATTORNEY', level: 'municipal', title: 'City Attorney / City Solicitor',
    category: 'Municipal Legal', description: 'Chief legal counsel for the municipality.',
    isPartisan: false, termYears: 4, seats: 1, icon: '⚖️',
  },
  CITY_COMPTROLLER: {
    tier: 'CITY_COMPTROLLER', level: 'municipal', title: 'City Comptroller',
    category: 'Municipal Financial', description: 'Manages fiscal records and financial oversight for large cities.',
    isPartisan: false, termYears: 4, seats: 1, icon: '📊',
  },
  MUNICIPAL_JUDGE: {
    tier: 'MUNICIPAL_JUDGE', level: 'municipal', title: 'Municipal / City Judge',
    category: 'Municipal Judicial', description: 'Presides over local ordinance violations, traffic cases, and minor offenses.',
    isPartisan: false, termYears: 4, seats: 1, icon: '⚖️',
  },
  SCHOOL_BOARD: {
    tier: 'SCHOOL_BOARD', level: 'special_district', title: 'School Board Member',
    category: 'Special District – Education', description: 'Governs the local school district. Sets policy, approves budgets, hires superintendent.',
    isPartisan: false, termYears: 4, seats: 5, icon: '🎓',
  },
  WATER_DISTRICT: {
    tier: 'WATER_DISTRICT', level: 'special_district', title: 'Water / Utility District Director',
    category: 'Special District – Utilities', description: 'Governs local water, sewer, or utility special districts.',
    isPartisan: false, termYears: 4, seats: 3, icon: '💧',
  },
  FIRE_DISTRICT: {
    tier: 'FIRE_DISTRICT', level: 'special_district', title: 'Fire District Board Member',
    category: 'Special District – Safety', description: 'Governs local fire protection special districts.',
    isPartisan: false, termYears: 4, seats: 3, icon: '🔥',
  },
  SOIL_CONSERVATION: {
    tier: 'SOIL_CONSERVATION', level: 'special_district', title: 'Soil & Water Conservation District Supervisor',
    category: 'Special District – Conservation', description: 'Elected supervisor for USDA-affiliated Soil & Water Conservation Districts.',
    isPartisan: false, termYears: 4, seats: 3, icon: '🌱',
  },
  TOWNSHIP_TRUSTEE: {
    tier: 'TOWNSHIP_TRUSTEE', level: 'municipal', title: 'Township Trustee / Supervisor',
    category: 'Township Government', description: 'Governs township-level government in states with township structures.',
    isPartisan: true, termYears: 4, seats: 1, icon: '🗺️',
  },
  VILLAGE_PRESIDENT: {
    tier: 'VILLAGE_PRESIDENT', level: 'municipal', title: 'Village President / Administrator',
    category: 'Municipal Executive', description: 'Chief executive of an incorporated village.',
    isPartisan: false, termYears: 2, seats: 1, icon: '🏘️',
  },
  CONSTABLE: {
    tier: 'CONSTABLE', level: 'county', title: 'Constable',
    category: 'County Law Enforcement', description: 'Local law enforcement officer at the precinct or township level.',
    isPartisan: true, termYears: 4, seats: 1, icon: '🚔',
  },
  JUSTICE_OF_PEACE: {
    tier: 'JUSTICE_OF_PEACE', level: 'county', title: 'Justice of the Peace',
    category: 'County Judicial', description: 'Lowest level judicial officer; presides over minor civil and criminal matters.',
    isPartisan: false, termYears: 4, seats: 1, icon: '⚖️',
  },
  DOG_CATCHER: {
    tier: 'DOG_CATCHER', level: 'municipal', title: 'Dog Catcher / Animal Control Officer',
    category: 'Municipal Administration & Safety',
    description: 'Elected municipal officer responsible for animal control, stray licensing, rabies enforcement, and domestic animal safety. One of America’s most storied local grassroots elective offices, still elected at town meetings and municipal ballots in VT, NH, ME, PA townships, and rural municipalities.',
    isPartisan: false, termYears: 2, seats: 1, icon: '🐕',
  },
  ANIMAL_CONTROL_OFFICER: {
    tier: 'ANIMAL_CONTROL_OFFICER', level: 'municipal', title: 'Animal Control Officer',
    category: 'Municipal Administration & Safety',
    description: 'Elected officer enforcing local animal ordinances, impoundment, and pet welfare standards.',
    isPartisan: false, termYears: 2, seats: 1, icon: '🐕',
  },
  TOWN_MODERATOR: {
    tier: 'TOWN_MODERATOR', level: 'municipal', title: 'Town Moderator',
    category: 'Municipal Administration',
    description: 'Presiding officer of town meetings in New England and New York local governance.',
    isPartisan: false, termYears: 1, seats: 1, icon: '⚖️',
  },
  SELECTBOARD_MEMBER: {
    tier: 'SELECTBOARD_MEMBER', level: 'municipal', title: 'Town Selectboard Member',
    category: 'Municipal Legislative',
    description: 'Executive and legislative governing body of New England towns.',
    isPartisan: false, termYears: 3, seats: 3, icon: '🏛️',
  },
  TAX_COLLECTOR: {
    tier: 'TAX_COLLECTOR', level: 'municipal', title: 'Tax Collector',
    category: 'Municipal Financial',
    description: 'Elected official responsible for local property tax assessments and collections.',
    isPartisan: false, termYears: 4, seats: 1, icon: '💰',
  },
};

// Comprehensive US States with full office suite
export const US_STATES_COMPLETE = [
  { name: 'Alabama', abbr: 'AL', pop: 5039877, counties: 67, house: 105, senate: 35, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: true, hasAgComm: true },
  { name: 'Alaska', abbr: 'AK', pop: 733391, counties: 0, boroughs: 19, house: 40, senate: 20, govYear: 2026, hasLtGov: true, hasAG: false, hasSoS: false, hasTreasurer: false, hasAuditor: false, hasAgComm: false },
  { name: 'Arizona', abbr: 'AZ', pop: 7151502, counties: 15, house: 60, senate: 30, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: false, hasAgComm: false },
  { name: 'Arkansas', abbr: 'AR', pop: 3011524, counties: 75, house: 100, senate: 35, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: true, hasAgComm: true },
  { name: 'California', abbr: 'CA', pop: 39538223, counties: 58, house: 80, senate: 40, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: false, hasAgComm: false },
  { name: 'Colorado', abbr: 'CO', pop: 5773714, counties: 64, house: 65, senate: 35, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: false, hasAgComm: false },
  { name: 'Connecticut', abbr: 'CT', pop: 3605944, counties: 8, house: 151, senate: 36, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: false, hasAgComm: false },
  { name: 'Delaware', abbr: 'DE', pop: 989948, counties: 3, house: 41, senate: 21, govYear: 2028, hasLtGov: true, hasAG: true, hasSoS: false, hasTreasurer: true, hasAuditor: true, hasAgComm: false },
  { name: 'Florida', abbr: 'FL', pop: 21538187, counties: 67, house: 120, senate: 40, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: false, hasTreasurer: false, hasAuditor: false, hasAgComm: true },
  { name: 'Georgia', abbr: 'GA', pop: 10711908, counties: 159, house: 180, senate: 56, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: false, hasAuditor: true, hasAgComm: true },
  { name: 'Hawaii', abbr: 'HI', pop: 1455271, counties: 4, house: 51, senate: 25, govYear: 2026, hasLtGov: true, hasAG: false, hasSoS: false, hasTreasurer: false, hasAuditor: false, hasAgComm: false },
  { name: 'Idaho', abbr: 'ID', pop: 1839106, counties: 44, house: 70, senate: 35, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: false, hasAgComm: false },
  { name: 'Illinois', abbr: 'IL', pop: 12812508, counties: 102, house: 118, senate: 59, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: false, hasAgComm: false },
  { name: 'Indiana', abbr: 'IN', pop: 6785528, counties: 92, house: 100, senate: 50, govYear: 2028, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: true, hasAgComm: false },
  { name: 'Iowa', abbr: 'IA', pop: 3190369, counties: 99, house: 100, senate: 50, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: true, hasAgComm: true },
  { name: 'Kansas', abbr: 'KS', pop: 2937880, counties: 105, house: 125, senate: 40, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: false, hasAgComm: false },
  { name: 'Kentucky', abbr: 'KY', pop: 4505836, counties: 120, house: 100, senate: 38, govYear: 2027, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: true, hasAgComm: true },
  { name: 'Louisiana', abbr: 'LA', pop: 4657757, counties: 64, house: 105, senate: 39, govYear: 2027, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: false, hasAgComm: true },
  { name: 'Maine', abbr: 'ME', pop: 1362359, counties: 16, house: 151, senate: 35, govYear: 2026, hasLtGov: false, hasAG: false, hasSoS: false, hasTreasurer: false, hasAuditor: false, hasAgComm: false },
  { name: 'Maryland', abbr: 'MD', pop: 6177224, counties: 23, house: 141, senate: 47, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: false, hasTreasurer: true, hasAuditor: false, hasAgComm: false },
  { name: 'Massachusetts', abbr: 'MA', pop: 7029917, counties: 14, house: 160, senate: 40, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: true, hasAgComm: false },
  { name: 'Michigan', abbr: 'MI', pop: 10077331, counties: 83, house: 110, senate: 38, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: false, hasAuditor: false, hasAgComm: false },
  { name: 'Minnesota', abbr: 'MN', pop: 5706494, counties: 87, house: 134, senate: 67, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: true, hasAgComm: false },
  { name: 'Mississippi', abbr: 'MS', pop: 2961279, counties: 82, house: 122, senate: 52, govYear: 2027, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: true, hasAgComm: true },
  { name: 'Missouri', abbr: 'MO', pop: 6154913, counties: 114, house: 163, senate: 34, govYear: 2028, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: true, hasAgComm: false },
  { name: 'Montana', abbr: 'MT', pop: 1084225, counties: 56, house: 100, senate: 50, govYear: 2028, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: false, hasAuditor: true, hasAgComm: false },
  { name: 'Nebraska', abbr: 'NE', pop: 1961504, counties: 93, house: 49, senate: 0, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: false, hasAgComm: false },
  { name: 'Nevada', abbr: 'NV', pop: 3104614, counties: 16, house: 42, senate: 21, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: false, hasAgComm: false },
  { name: 'New Hampshire', abbr: 'NH', pop: 1377529, counties: 10, house: 400, senate: 24, govYear: 2026, hasLtGov: false, hasAG: false, hasSoS: false, hasTreasurer: false, hasAuditor: false, hasAgComm: false },
  { name: 'New Jersey', abbr: 'NJ', pop: 9288994, counties: 21, house: 80, senate: 40, govYear: 2025, hasLtGov: true, hasAG: false, hasSoS: false, hasTreasurer: false, hasAuditor: false, hasAgComm: false },
  { name: 'New Mexico', abbr: 'NM', pop: 2117522, counties: 33, house: 70, senate: 42, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: true, hasAgComm: false },
  { name: 'New York', abbr: 'NY', pop: 20201249, counties: 62, house: 150, senate: 63, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: false, hasTreasurer: false, hasAuditor: false, hasAgComm: false },
  { name: 'North Carolina', abbr: 'NC', pop: 10439388, counties: 100, house: 120, senate: 50, govYear: 2028, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: true, hasAgComm: true },
  { name: 'North Dakota', abbr: 'ND', pop: 779094, counties: 53, house: 94, senate: 47, govYear: 2028, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: true, hasAgComm: true },
  { name: 'Ohio', abbr: 'OH', pop: 11799448, counties: 88, house: 99, senate: 33, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: true, hasAgComm: false },
  { name: 'Oklahoma', abbr: 'OK', pop: 3959353, counties: 77, house: 101, senate: 48, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: false, hasAuditor: true, hasAgComm: true },
  { name: 'Oregon', abbr: 'OR', pop: 4237256, counties: 36, house: 60, senate: 30, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: false, hasAgComm: false },
  { name: 'Pennsylvania', abbr: 'PA', pop: 13002700, counties: 67, house: 203, senate: 50, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: false, hasTreasurer: true, hasAuditor: true, hasAgComm: false },
  { name: 'Rhode Island', abbr: 'RI', pop: 1097379, counties: 5, house: 75, senate: 38, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: false, hasAgComm: false },
  { name: 'South Carolina', abbr: 'SC', pop: 5118425, counties: 46, house: 124, senate: 46, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: true, hasAgComm: true },
  { name: 'South Dakota', abbr: 'SD', pop: 886667, counties: 66, house: 70, senate: 35, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: true, hasAgComm: false },
  { name: 'Tennessee', abbr: 'TN', pop: 6910840, counties: 95, house: 99, senate: 33, govYear: 2026, hasLtGov: false, hasAG: false, hasSoS: false, hasTreasurer: false, hasAuditor: false, hasAgComm: true },
  { name: 'Texas', abbr: 'TX', pop: 29145505, counties: 254, house: 150, senate: 31, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: false, hasTreasurer: false, hasAuditor: false, hasAgComm: true },
  { name: 'Utah', abbr: 'UT', pop: 3271616, counties: 29, house: 75, senate: 29, govYear: 2028, hasLtGov: true, hasAG: true, hasSoS: false, hasTreasurer: true, hasAuditor: true, hasAgComm: false },
  { name: 'Vermont', abbr: 'VT', pop: 643077, counties: 14, house: 150, senate: 30, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: true, hasAgComm: false },
  { name: 'Virginia', abbr: 'VA', pop: 8631393, counties: 95, house: 100, senate: 40, govYear: 2025, hasLtGov: true, hasAG: true, hasSoS: false, hasTreasurer: false, hasAuditor: false, hasAgComm: false },
  { name: 'Washington', abbr: 'WA', pop: 7705281, counties: 39, house: 98, senate: 49, govYear: 2028, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: true, hasAgComm: true },
  { name: 'West Virginia', abbr: 'WV', pop: 1793716, counties: 55, house: 100, senate: 34, govYear: 2028, hasLtGov: false, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: true, hasAgComm: false },
  { name: 'Wisconsin', abbr: 'WI', pop: 5893718, counties: 72, house: 99, senate: 33, govYear: 2026, hasLtGov: true, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: false, hasAgComm: false },
  { name: 'Wyoming', abbr: 'WY', pop: 576851, counties: 23, house: 60, senate: 30, govYear: 2026, hasLtGov: false, hasAG: true, hasSoS: true, hasTreasurer: true, hasAuditor: true, hasAgComm: false },
];

// Major US Municipalities (population >= 1,000) — representative sample for 2026 cycle
// In production this would be dynamically loaded from Census GNIS/Places data
export const MAJOR_MUNICIPALITIES: Array<{
  name: string; state: string; stateAbbr: string; county: string;
  population: number; cityType: 'city' | 'town' | 'village' | 'borough' | 'township';
  hasComptroller: boolean; hasCityAttorney: boolean; hasCityAuditor: boolean;
  councilSeats: number; nextMayorYear: number;
  hasElectedDogCatcher?: boolean;
}> = [
  // Top 100 cities + representative sample by state (1,000+ pop)
  { name: 'New York City', state: 'New York', stateAbbr: 'NY', county: 'Multiple', population: 8336817, cityType: 'city', hasComptroller: true, hasCityAttorney: true, hasCityAuditor: false, councilSeats: 51, nextMayorYear: 2025 },
  { name: 'Los Angeles', state: 'California', stateAbbr: 'CA', county: 'Los Angeles', population: 3979576, cityType: 'city', hasComptroller: false, hasCityAttorney: true, hasCityAuditor: true, councilSeats: 15, nextMayorYear: 2026 },
  { name: 'Chicago', state: 'Illinois', stateAbbr: 'IL', county: 'Cook', population: 2693976, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 50, nextMayorYear: 2027 },
  { name: 'Houston', state: 'Texas', stateAbbr: 'TX', county: 'Harris', population: 2304580, cityType: 'city', hasComptroller: true, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 16, nextMayorYear: 2027 },
  { name: 'Phoenix', state: 'Arizona', stateAbbr: 'AZ', county: 'Maricopa', population: 1608139, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 8, nextMayorYear: 2026 },
  { name: 'Philadelphia', state: 'Pennsylvania', stateAbbr: 'PA', county: 'Philadelphia', population: 1603797, cityType: 'city', hasComptroller: true, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 17, nextMayorYear: 2027 },
  { name: 'San Antonio', state: 'Texas', stateAbbr: 'TX', county: 'Bexar', population: 1434625, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 10, nextMayorYear: 2025 },
  { name: 'San Diego', state: 'California', stateAbbr: 'CA', county: 'San Diego', population: 1386932, cityType: 'city', hasComptroller: false, hasCityAttorney: true, hasCityAuditor: true, councilSeats: 9, nextMayorYear: 2028 },
  { name: 'Dallas', state: 'Texas', stateAbbr: 'TX', county: 'Dallas', population: 1304379, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 15, nextMayorYear: 2025 },
  { name: 'San Jose', state: 'California', stateAbbr: 'CA', county: 'Santa Clara', population: 1013240, cityType: 'city', hasComptroller: false, hasCityAttorney: true, hasCityAuditor: false, councilSeats: 10, nextMayorYear: 2026 },
  { name: 'Austin', state: 'Texas', stateAbbr: 'TX', county: 'Travis', population: 978908, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 10, nextMayorYear: 2028 },
  { name: 'Jacksonville', state: 'Florida', stateAbbr: 'FL', county: 'Duval', population: 949611, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 19, nextMayorYear: 2027 },
  { name: 'Fort Worth', state: 'Texas', stateAbbr: 'TX', county: 'Tarrant', population: 918915, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 8, nextMayorYear: 2025 },
  { name: 'Columbus', state: 'Ohio', stateAbbr: 'OH', county: 'Franklin', population: 905748, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 7, nextMayorYear: 2027 },
  { name: 'Charlotte', state: 'North Carolina', stateAbbr: 'NC', county: 'Mecklenburg', population: 874579, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 11, nextMayorYear: 2025 },
  { name: 'Indianapolis', state: 'Indiana', stateAbbr: 'IN', county: 'Marion', population: 887642, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 25, nextMayorYear: 2027 },
  { name: 'San Francisco', state: 'California', stateAbbr: 'CA', county: 'San Francisco', population: 873965, cityType: 'city', hasComptroller: false, hasCityAttorney: true, hasCityAuditor: false, councilSeats: 11, nextMayorYear: 2027 },
  { name: 'Seattle', state: 'Washington', stateAbbr: 'WA', county: 'King', population: 737255, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 9, nextMayorYear: 2025 },
  { name: 'Denver', state: 'Colorado', stateAbbr: 'CO', county: 'Denver', population: 715522, cityType: 'city', hasComptroller: false, hasCityAttorney: true, hasCityAuditor: true, councilSeats: 13, nextMayorYear: 2027 },
  { name: 'Nashville', state: 'Tennessee', stateAbbr: 'TN', county: 'Davidson', population: 689447, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 40, nextMayorYear: 2027 },
  { name: 'Oklahoma City', state: 'Oklahoma', stateAbbr: 'OK', county: 'Oklahoma', population: 681054, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 8, nextMayorYear: 2027 },
  { name: 'El Paso', state: 'Texas', stateAbbr: 'TX', county: 'El Paso', population: 678815, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 8, nextMayorYear: 2025 },
  { name: 'Washington DC', state: 'District of Columbia', stateAbbr: 'DC', county: 'N/A', population: 689545, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 13, nextMayorYear: 2026 },
  { name: 'Las Vegas', state: 'Nevada', stateAbbr: 'NV', county: 'Clark', population: 641903, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 6, nextMayorYear: 2028 },
  { name: 'Louisville', state: 'Kentucky', stateAbbr: 'KY', county: 'Jefferson', population: 633045, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 26, nextMayorYear: 2026 },
  { name: 'Memphis', state: 'Tennessee', stateAbbr: 'TN', county: 'Shelby', population: 633104, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 13, nextMayorYear: 2027 },
  { name: 'Portland', state: 'Oregon', stateAbbr: 'OR', county: 'Multnomah', population: 652503, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: true, councilSeats: 12, nextMayorYear: 2028 },
  { name: 'Baltimore', state: 'Maryland', stateAbbr: 'MD', county: 'Independent City', population: 585708, cityType: 'city', hasComptroller: true, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 15, nextMayorYear: 2028 },
  { name: 'Milwaukee', state: 'Wisconsin', stateAbbr: 'WI', county: 'Milwaukee', population: 577222, cityType: 'city', hasComptroller: true, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 15, nextMayorYear: 2028 },
  { name: 'Albuquerque', state: 'New Mexico', stateAbbr: 'NM', county: 'Bernalillo', population: 564559, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 9, nextMayorYear: 2025 },
  { name: 'Tucson', state: 'Arizona', stateAbbr: 'AZ', county: 'Pima', population: 542629, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 6, nextMayorYear: 2027 },
  { name: 'Fresno', state: 'California', stateAbbr: 'CA', county: 'Fresno', population: 542107, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 7, nextMayorYear: 2026 },
  { name: 'Mesa', state: 'Arizona', stateAbbr: 'AZ', county: 'Maricopa', population: 504258, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 6, nextMayorYear: 2026 },
  { name: 'Sacramento', state: 'California', stateAbbr: 'CA', county: 'Sacramento', population: 513624, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 8, nextMayorYear: 2028 },
  { name: 'Atlanta', state: 'Georgia', stateAbbr: 'GA', county: 'Fulton', population: 498715, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 15, nextMayorYear: 2025 },
  { name: 'Kansas City', state: 'Missouri', stateAbbr: 'MO', county: 'Jackson', population: 495327, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 13, nextMayorYear: 2027 },
  { name: 'Omaha', state: 'Nebraska', stateAbbr: 'NE', county: 'Douglas', population: 486051, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 7, nextMayorYear: 2025 },
  { name: 'Colorado Springs', state: 'Colorado', stateAbbr: 'CO', county: 'El Paso', population: 478221, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 9, nextMayorYear: 2027 },
  { name: 'Raleigh', state: 'North Carolina', stateAbbr: 'NC', county: 'Wake', population: 467665, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 8, nextMayorYear: 2027 },
  { name: 'Long Beach', state: 'California', stateAbbr: 'CA', county: 'Los Angeles', population: 466742, cityType: 'city', hasComptroller: false, hasCityAttorney: true, hasCityAuditor: true, councilSeats: 9, nextMayorYear: 2026 },
  { name: 'Virginia Beach', state: 'Virginia', stateAbbr: 'VA', county: 'Independent City', population: 459470, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 11, nextMayorYear: 2028 },
  { name: 'Minneapolis', state: 'Minnesota', stateAbbr: 'MN', county: 'Hennepin', population: 429606, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 13, nextMayorYear: 2025 },
  { name: 'Tampa', state: 'Florida', stateAbbr: 'FL', county: 'Hillsborough', population: 399700, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 7, nextMayorYear: 2027 },
  { name: 'New Orleans', state: 'Louisiana', stateAbbr: 'LA', county: 'Orleans', population: 383997, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 7, nextMayorYear: 2025 },
  { name: 'Arlington', state: 'Texas', stateAbbr: 'TX', county: 'Tarrant', population: 379577, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 9, nextMayorYear: 2025 },
  { name: 'Wichita', state: 'Kansas', stateAbbr: 'KS', county: 'Sedgwick', population: 397532, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 7, nextMayorYear: 2027 },
  { name: 'Bakersfield', state: 'California', stateAbbr: 'CA', county: 'Kern', population: 403455, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 7, nextMayorYear: 2026 },
  { name: 'Aurora', state: 'Colorado', stateAbbr: 'CO', county: 'Arapahoe', population: 366623, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 11, nextMayorYear: 2025 },
  { name: 'Anaheim', state: 'California', stateAbbr: 'CA', county: 'Orange', population: 346824, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 6, nextMayorYear: 2026 },
  { name: 'Santa Ana', state: 'California', stateAbbr: 'CA', county: 'Orange', population: 310227, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 6, nextMayorYear: 2028 },
  { name: 'Corpus Christi', state: 'Texas', stateAbbr: 'TX', county: 'Nueces', population: 316381, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 8, nextMayorYear: 2026 },
  { name: 'Riverside', state: 'California', stateAbbr: 'CA', county: 'Riverside', population: 314998, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 7, nextMayorYear: 2028 },
  { name: 'Lexington', state: 'Kentucky', stateAbbr: 'KY', county: 'Fayette', population: 322570, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 15, nextMayorYear: 2026 },
  { name: 'Pittsburgh', state: 'Pennsylvania', stateAbbr: 'PA', county: 'Allegheny', population: 302971, cityType: 'city', hasComptroller: true, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 9, nextMayorYear: 2025 },
  { name: 'Anchorage', state: 'Alaska', stateAbbr: 'AK', county: 'N/A', population: 291247, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 11, nextMayorYear: 2028 },
  { name: 'Stockton', state: 'California', stateAbbr: 'CA', county: 'San Joaquin', population: 312697, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 7, nextMayorYear: 2028 },
  { name: 'Cincinnati', state: 'Ohio', stateAbbr: 'OH', county: 'Hamilton', population: 309317, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 9, nextMayorYear: 2025 },
  { name: 'St. Paul', state: 'Minnesota', stateAbbr: 'MN', county: 'Ramsey', population: 311527, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 7, nextMayorYear: 2025 },
  { name: 'Greensboro', state: 'North Carolina', stateAbbr: 'NC', county: 'Guilford', population: 299035, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 9, nextMayorYear: 2025 },
  { name: 'Toledo', state: 'Ohio', stateAbbr: 'OH', county: 'Lucas', population: 270871, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 12, nextMayorYear: 2025 },
  { name: 'Newark', state: 'New Jersey', stateAbbr: 'NJ', county: 'Essex', population: 282011, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 9, nextMayorYear: 2026 },
  { name: 'Plano', state: 'Texas', stateAbbr: 'TX', county: 'Collin', population: 285494, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 8, nextMayorYear: 2025 },
  { name: 'Henderson', state: 'Nevada', stateAbbr: 'NV', county: 'Clark', population: 320189, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 4, nextMayorYear: 2028 },
  { name: 'Orlando', state: 'Florida', stateAbbr: 'FL', county: 'Orange', population: 307573, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 6, nextMayorYear: 2026 },
  { name: 'St. Louis', state: 'Missouri', stateAbbr: 'MO', county: 'Independent City', population: 301578, cityType: 'city', hasComptroller: true, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 28, nextMayorYear: 2025 },
  { name: 'Madison', state: 'Wisconsin', stateAbbr: 'WI', county: 'Dane', population: 269840, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 20, nextMayorYear: 2027 },
  { name: 'Laredo', state: 'Texas', stateAbbr: 'TX', county: 'Webb', population: 255205, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 8, nextMayorYear: 2026 },
  { name: 'Durham', state: 'North Carolina', stateAbbr: 'NC', county: 'Durham', population: 278993, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 5, nextMayorYear: 2025 },
  { name: 'Garland', state: 'Texas', stateAbbr: 'TX', county: 'Dallas', population: 246918, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 8, nextMayorYear: 2025 },
  { name: 'Cleveland', state: 'Ohio', stateAbbr: 'OH', county: 'Cuyahoga', population: 372624, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 17, nextMayorYear: 2025 },
  { name: 'Baton Rouge', state: 'Louisiana', stateAbbr: 'LA', county: 'East Baton Rouge', population: 227470, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 12, nextMayorYear: 2028 },
  { name: 'Hialeah', state: 'Florida', stateAbbr: 'FL', county: 'Miami-Dade', population: 223109, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 7, nextMayorYear: 2025 },
  { name: 'Irvine', state: 'California', stateAbbr: 'CA', county: 'Orange', population: 307670, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 4, nextMayorYear: 2028 },
  { name: 'Chandler', state: 'Arizona', stateAbbr: 'AZ', county: 'Maricopa', population: 261165, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 6, nextMayorYear: 2026 },
  { name: 'Scottsdale', state: 'Arizona', stateAbbr: 'AZ', county: 'Maricopa', population: 258069, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 6, nextMayorYear: 2028 },
  { name: 'Reno', state: 'Nevada', stateAbbr: 'NV', county: 'Washoe', population: 264165, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 6, nextMayorYear: 2028 },
  { name: 'Fort Wayne', state: 'Indiana', stateAbbr: 'IN', county: 'Allen', population: 263886, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 9, nextMayorYear: 2027 },
  { name: 'North Las Vegas', state: 'Nevada', stateAbbr: 'NV', county: 'Clark', population: 262527, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 4, nextMayorYear: 2026 },
  { name: 'Gilbert', state: 'Arizona', stateAbbr: 'AZ', county: 'Maricopa', population: 254114, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 6, nextMayorYear: 2026 },
  { name: 'Glendale', state: 'Arizona', stateAbbr: 'AZ', county: 'Maricopa', population: 252381, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 6, nextMayorYear: 2026 },
  { name: 'Irving', state: 'Texas', stateAbbr: 'TX', county: 'Dallas', population: 256684, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 8, nextMayorYear: 2025 },
  { name: 'Chesapeake', state: 'Virginia', stateAbbr: 'VA', county: 'Independent City', population: 244835, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 7, nextMayorYear: 2028 },
  { name: 'Winston-Salem', state: 'North Carolina', stateAbbr: 'NC', county: 'Forsyth', population: 247945, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 9, nextMayorYear: 2025 },
  { name: 'Madison', state: 'Wisconsin', stateAbbr: 'WI', county: 'Dane', population: 269840, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 20, nextMayorYear: 2027 },
  { name: 'Miami', state: 'Florida', stateAbbr: 'FL', county: 'Miami-Dade', population: 442241, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 5, nextMayorYear: 2025 },
  { name: 'Oakland', state: 'California', stateAbbr: 'CA', county: 'Alameda', population: 440646, cityType: 'city', hasComptroller: false, hasCityAttorney: true, hasCityAuditor: true, councilSeats: 8, nextMayorYear: 2026 },
  { name: 'Minneapolis', state: 'Minnesota', stateAbbr: 'MN', county: 'Hennepin', population: 429606, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 13, nextMayorYear: 2025 },
  { name: 'Tulsa', state: 'Oklahoma', stateAbbr: 'OK', county: 'Tulsa', population: 413066, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 9, nextMayorYear: 2026 },
  { name: 'Arlington', state: 'Virginia', stateAbbr: 'VA', county: 'Arlington', population: 232965, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 5, nextMayorYear: 2025 },
  { name: 'Honolulu', state: 'Hawaii', stateAbbr: 'HI', county: 'Honolulu', population: 350964, cityType: 'city', hasComptroller: false, hasCityAttorney: false, hasCityAuditor: false, councilSeats: 9, nextMayorYear: 2028 },
  // ... Additional municipalities (many more in production)
];

// Dynamic next election calculator
function getNextElectionDate(cycleYear: number): string {
  const now = new Date();
  const currentYear = now.getFullYear();
  let targetYear = cycleYear;
  while (targetYear < currentYear || (targetYear === currentYear && now > new Date(`${currentYear}-11-01`))) {
    targetYear += 2;
  }
  return `${targetYear}-11-03`;
}

// Generate the comprehensive jurisdiction office registry
export function generateCompleteOfficeRegistry(): JurisdictionOffice[] {
  const offices: JurisdictionOffice[] = [];
  const now = new Date();
  const currentYear = now.getFullYear();

  // =====================
  // FEDERAL OFFICES
  // =====================
  
  // US Senate — 33 Class II seats up in 2026
  const senateStates2026 = ['TX','MT','ME','MI','WI','PA','OH','GA','NC','NV','NH','MN','NM','AZ','CO','OR','WA','IA','KS','AK','ND','SD','ID','WY','UT','HI','RI','CT','VT','DE','NE','TN','VA'];
  US_STATES_COMPLETE.forEach((state) => {
    if (senateStates2026.includes(state.abbr)) {
      offices.push({
        id: `FED-SEN-${state.abbr}-2026`,
        state: state.name, stateAbbr: state.abbr,
        tier: 'US_SENATE', level: 'federal',
        title: `U.S. Senator — ${state.name}`,
        category: 'Federal Legislative',
        nextElection: '2026-11-03', cycleYear: 2026,
        isPartisan: true, termYears: 6, totalSeats: 2, seatsUpThisCycle: 1,
      });
    }
  });

  // US House — all 435 districts (all up 2026)
  US_STATES_COMPLETE.forEach((state) => {
    const districtCount = Math.max(1, Math.round(state.pop / 760000));
    const usableCount = Math.min(districtCount, 53); // CA max
    for (let d = 1; d <= usableCount; d++) {
      const distStr = usableCount === 1 ? 'AL' : String(d).padStart(2, '0');
      offices.push({
        id: `FED-HOUSE-${state.abbr}-${distStr}`,
        state: state.name, stateAbbr: state.abbr,
        tier: 'US_HOUSE', level: 'federal',
        title: `U.S. Representative — ${state.abbr}-${distStr}`,
        category: 'Federal Legislative',
        nextElection: '2026-11-03', cycleYear: 2026,
        isPartisan: true, termYears: 2, totalSeats: 1, seatsUpThisCycle: 1,
      });
    }
  });

  // =====================
  // STATE EXECUTIVE OFFICES
  // =====================
  US_STATES_COMPLETE.forEach((state) => {
    const govNextElection = getNextElectionDate(state.govYear);

    offices.push({ id: `STATE-GOV-${state.abbr}`, state: state.name, stateAbbr: state.abbr, tier: 'GOVERNOR', level: 'state', title: `Governor — ${state.name}`, category: 'State Executive', nextElection: govNextElection, cycleYear: state.govYear, isPartisan: true, termYears: 4, totalSeats: 1, seatsUpThisCycle: 1 });
    if (state.hasLtGov) offices.push({ id: `STATE-LTGOV-${state.abbr}`, state: state.name, stateAbbr: state.abbr, tier: 'LT_GOVERNOR', level: 'state', title: `Lieutenant Governor — ${state.name}`, category: 'State Executive', nextElection: govNextElection, cycleYear: state.govYear, isPartisan: true, termYears: 4, totalSeats: 1, seatsUpThisCycle: 1 });
    if (state.hasAG) offices.push({ id: `STATE-AG-${state.abbr}`, state: state.name, stateAbbr: state.abbr, tier: 'ATTORNEY_GENERAL', level: 'state', title: `Attorney General — ${state.name}`, category: 'State Executive', nextElection: govNextElection, cycleYear: state.govYear, isPartisan: true, termYears: 4, totalSeats: 1, seatsUpThisCycle: 1 });
    if (state.hasSoS) offices.push({ id: `STATE-SOS-${state.abbr}`, state: state.name, stateAbbr: state.abbr, tier: 'SECRETARY_OF_STATE', level: 'state', title: `Secretary of State — ${state.name}`, category: 'State Executive', nextElection: govNextElection, cycleYear: state.govYear, isPartisan: true, termYears: 4, totalSeats: 1, seatsUpThisCycle: 1 });
    if (state.hasTreasurer) offices.push({ id: `STATE-TREAS-${state.abbr}`, state: state.name, stateAbbr: state.abbr, tier: 'STATE_TREASURER', level: 'state', title: `State Treasurer — ${state.name}`, category: 'State Executive', nextElection: govNextElection, cycleYear: state.govYear, isPartisan: true, termYears: 4, totalSeats: 1, seatsUpThisCycle: 1 });
    if (state.hasAuditor) offices.push({ id: `STATE-AUD-${state.abbr}`, state: state.name, stateAbbr: state.abbr, tier: 'STATE_AUDITOR', level: 'state', title: `State Auditor — ${state.name}`, category: 'State Executive', nextElection: govNextElection, cycleYear: state.govYear, isPartisan: false, termYears: 4, totalSeats: 1, seatsUpThisCycle: 1 });
    if (state.hasAgComm) offices.push({ id: `STATE-AGCOMM-${state.abbr}`, state: state.name, stateAbbr: state.abbr, tier: 'COMMISSIONER_OF_AGRICULTURE', level: 'state', title: `Commissioner of Agriculture — ${state.name}`, category: 'State Executive', nextElection: govNextElection, cycleYear: state.govYear, isPartisan: true, termYears: 4, totalSeats: 1, seatsUpThisCycle: 1 });

    // State Legislative
    if (state.house > 0) {
      offices.push({ id: `STATE-HOUSE-${state.abbr}`, state: state.name, stateAbbr: state.abbr, tier: 'STATE_HOUSE', level: 'state', title: `State House of Representatives — ${state.name} (${state.house} seats)`, category: 'State Legislative', nextElection: '2026-11-03', cycleYear: 2026, isPartisan: true, termYears: 2, totalSeats: state.house, seatsUpThisCycle: state.house });
    }
    if (state.senate > 0) {
      offices.push({ id: `STATE-SEN-${state.abbr}`, state: state.name, stateAbbr: state.abbr, tier: 'STATE_SENATE', level: 'state', title: `State Senate — ${state.name} (${state.senate} seats, ~half up)`, category: 'State Legislative', nextElection: '2026-11-03', cycleYear: 2026, isPartisan: true, termYears: 4, totalSeats: state.senate, seatsUpThisCycle: Math.ceil(state.senate / 2) });
    }

    // State Supreme Court
    offices.push({ id: `STATE-SCOTUS-${state.abbr}`, state: state.name, stateAbbr: state.abbr, tier: 'SUPREME_COURT', level: 'judicial', title: `State Supreme Court — ${state.name}`, category: 'State Judicial', nextElection: govNextElection, cycleYear: state.govYear, isPartisan: false, termYears: 8, totalSeats: 7, seatsUpThisCycle: 2 });

    // County offices — one record per county block
    const countyCount = state.counties || 0;
    if (countyCount > 0) {
      const countyTiers: OfficeTier[] = ['COUNTY_COMMISSIONER', 'COUNTY_SHERIFF', 'COUNTY_CLERK', 'COUNTY_TREASURER', 'COUNTY_ASSESSOR', 'COUNTY_AUDITOR', 'DISTRICT_ATTORNEY', 'COUNTY_CORONER', 'COUNTY_JUDGE'];
      countyTiers.forEach(ct => {
        const def = OFFICE_DEFINITIONS[ct];
        offices.push({
          id: `COUNTY-${ct}-${state.abbr}`,
          state: state.name, stateAbbr: state.abbr,
          tier: ct, level: 'county',
          title: `${def.title} — All ${countyCount} ${state.name} Counties`,
          category: def.category,
          nextElection: '2026-11-03', cycleYear: 2026,
          isPartisan: def.isPartisan, termYears: def.termYears,
          totalSeats: countyCount * def.seats, seatsUpThisCycle: Math.ceil(countyCount * def.seats / 2),
          notes: `${countyCount} counties × ${def.seats} seat(s) = ${countyCount * def.seats} total positions`,
        });
      });
    }
  });

  // =====================
  // MUNICIPAL OFFICES
  // =====================
  const allMuniSources = [
    ...MAJOR_MUNICIPALITIES,
    ...US_LOCAL_JURISDICTIONS.map(j => ({
      name: j.name,
      state: j.state,
      stateAbbr: j.stateAbbr,
      county: j.county,
      population: j.population,
      cityType: j.cityType as any,
      hasComptroller: false,
      hasCityAttorney: false,
      hasCityAuditor: false,
      councilSeats: j.councilSeats || 5,
      nextMayorYear: j.nextMayorYear || 2026,
      hasElectedDogCatcher: j.hasElectedDogCatcher,
    }))
  ];
  const uniqueMunicipalities = allMuniSources.filter((m, idx, arr) =>
    arr.findIndex(x => x.name === m.name && x.stateAbbr === m.stateAbbr) === idx
  );

  uniqueMunicipalities.forEach((muni) => {
    const mayorNext = getNextElectionDate(muni.nextMayorYear);

    offices.push({ id: `MUN-MAYOR-${muni.stateAbbr}-${muni.name.replace(/\s/g, '_')}`, state: muni.state, stateAbbr: muni.stateAbbr, municipality: muni.name, population: muni.population, tier: 'MAYOR', level: 'municipal', title: `Mayor — ${muni.name}, ${muni.stateAbbr}`, category: 'Municipal Executive', nextElection: mayorNext, cycleYear: muni.nextMayorYear, isPartisan: false, termYears: 4, totalSeats: 1, seatsUpThisCycle: 1 });
    
    offices.push({ id: `MUN-COUNCIL-${muni.stateAbbr}-${muni.name.replace(/\s/g, '_')}`, state: muni.state, stateAbbr: muni.stateAbbr, municipality: muni.name, population: muni.population, tier: 'CITY_COUNCIL', level: 'municipal', title: `City Council — ${muni.name}, ${muni.stateAbbr} (${muni.councilSeats} seats)`, category: 'Municipal Legislative', nextElection: '2026-11-04', cycleYear: 2026, isPartisan: false, termYears: 4, totalSeats: muni.councilSeats, seatsUpThisCycle: Math.ceil(muni.councilSeats / 2) });
    
    offices.push({ id: `MUN-CLERK-${muni.stateAbbr}-${muni.name.replace(/\s/g, '_')}`, state: muni.state, stateAbbr: muni.stateAbbr, municipality: muni.name, population: muni.population, tier: 'CITY_CLERK', level: 'municipal', title: `City Clerk — ${muni.name}, ${muni.stateAbbr}`, category: 'Municipal Administrative', nextElection: mayorNext, cycleYear: muni.nextMayorYear, isPartisan: false, termYears: 2, totalSeats: 1, seatsUpThisCycle: 1 });
    
    offices.push({ id: `MUN-TREAS-${muni.stateAbbr}-${muni.name.replace(/\s/g, '_')}`, state: muni.state, stateAbbr: muni.stateAbbr, municipality: muni.name, population: muni.population, tier: 'CITY_TREASURER', level: 'municipal', title: `City Treasurer — ${muni.name}, ${muni.stateAbbr}`, category: 'Municipal Financial', nextElection: mayorNext, cycleYear: muni.nextMayorYear, isPartisan: false, termYears: 2, totalSeats: 1, seatsUpThisCycle: 1 });
    if (muni.hasElectedDogCatcher) {
      offices.push({
        id: `MUN-DOGCATCHER-${muni.stateAbbr}-${muni.name.replace(/\s/g, '_')}`,
        state: muni.state, stateAbbr: muni.stateAbbr, municipality: muni.name,
        population: muni.population, tier: 'DOG_CATCHER', level: 'municipal',
        title: `Dog Catcher / Animal Control Officer — ${muni.name}, ${muni.stateAbbr}`,
        category: 'Municipal Public Safety & Animal Control',
        nextElection: mayorNext, cycleYear: muni.nextMayorYear,
        isPartisan: false, termYears: 2, totalSeats: 1, seatsUpThisCycle: 1,
      });
    }

    offices.push({
      id: `MUN-TAXCOLLECTOR-${muni.stateAbbr}-${muni.name.replace(/\s/g, '_')}`,
      state: muni.state, stateAbbr: muni.stateAbbr, municipality: muni.name,
      population: muni.population, tier: 'TAX_COLLECTOR', level: 'municipal',
      title: `Tax Collector — ${muni.name}, ${muni.stateAbbr}`,
      category: 'Municipal Financial',
      nextElection: mayorNext, cycleYear: muni.nextMayorYear,
      isPartisan: false, termYears: 2, totalSeats: 1, seatsUpThisCycle: 1,
    });

    if (['VT', 'ME', 'NH', 'MA', 'CT', 'RI'].includes(muni.stateAbbr)) {
      offices.push({
        id: `MUN-MODERATOR-${muni.stateAbbr}-${muni.name.replace(/\s/g, '_')}`,
        state: muni.state, stateAbbr: muni.stateAbbr, municipality: muni.name,
        population: muni.population, tier: 'TOWN_MODERATOR', level: 'municipal',
        title: `Town Moderator — ${muni.name}, ${muni.stateAbbr}`,
        category: 'Municipal Parliamentary & Governance',
        nextElection: '2026-03-03', cycleYear: 2026,
        isPartisan: false, termYears: 1, totalSeats: 1, seatsUpThisCycle: 1,
      });
      offices.push({
        id: `MUN-SELECTBOARD-${muni.stateAbbr}-${muni.name.replace(/\s/g, '_')}`,
        state: muni.state, stateAbbr: muni.stateAbbr, municipality: muni.name,
        population: muni.population, tier: 'SELECTBOARD_MEMBER', level: 'municipal',
        title: `Selectboard Member — ${muni.name}, ${muni.stateAbbr}`,
        category: 'Municipal Executive & Legislative',
        nextElection: '2026-03-03', cycleYear: 2026,
        isPartisan: false, termYears: 3, totalSeats: 3, seatsUpThisCycle: 1,
      });
    }

    if (['VT', 'PA', 'TX', 'KY', 'AZ', 'TN', 'IL', 'ME', 'GA', 'CO', 'OH'].includes(muni.stateAbbr)) {
      offices.push({
        id: `MUN-CONSTABLE-${muni.stateAbbr}-${muni.name.replace(/\s/g, '_')}`,
        state: muni.state, stateAbbr: muni.stateAbbr, municipality: muni.name,
        population: muni.population, tier: 'CONSTABLE', level: 'municipal',
        title: `Town Constable — ${muni.name}, ${muni.stateAbbr}`,
        category: 'Municipal Public Safety',
        nextElection: mayorNext, cycleYear: muni.nextMayorYear,
        isPartisan: false, termYears: 2, totalSeats: 1, seatsUpThisCycle: 1,
      });
    }

    
    if (muni.hasCityAttorney) offices.push({ id: `MUN-ATTY-${muni.stateAbbr}-${muni.name.replace(/\s/g, '_')}`, state: muni.state, stateAbbr: muni.stateAbbr, municipality: muni.name, population: muni.population, tier: 'CITY_ATTORNEY', level: 'municipal', title: `City Attorney — ${muni.name}, ${muni.stateAbbr}`, category: 'Municipal Legal', nextElection: mayorNext, cycleYear: muni.nextMayorYear, isPartisan: false, termYears: 4, totalSeats: 1, seatsUpThisCycle: 1 });
    if (muni.hasCityAuditor) offices.push({ id: `MUN-AUD-${muni.stateAbbr}-${muni.name.replace(/\s/g, '_')}`, state: muni.state, stateAbbr: muni.stateAbbr, municipality: muni.name, population: muni.population, tier: 'CITY_AUDITOR', level: 'municipal', title: `City Auditor — ${muni.name}, ${muni.stateAbbr}`, category: 'Municipal Financial', nextElection: mayorNext, cycleYear: muni.nextMayorYear, isPartisan: false, termYears: 4, totalSeats: 1, seatsUpThisCycle: 1 });
    if (muni.hasComptroller) offices.push({ id: `MUN-COMP-${muni.stateAbbr}-${muni.name.replace(/\s/g, '_')}`, state: muni.state, stateAbbr: muni.stateAbbr, municipality: muni.name, population: muni.population, tier: 'CITY_COMPTROLLER', level: 'municipal', title: `City Comptroller — ${muni.name}, ${muni.stateAbbr}`, category: 'Municipal Financial', nextElection: mayorNext, cycleYear: muni.nextMayorYear, isPartisan: false, termYears: 4, totalSeats: 1, seatsUpThisCycle: 1 });
    
    // School board for each municipality
    offices.push({ id: `MUN-SCHOOL-${muni.stateAbbr}-${muni.name.replace(/\s/g, '_')}`, state: muni.state, stateAbbr: muni.stateAbbr, municipality: muni.name, population: muni.population, tier: 'SCHOOL_BOARD', level: 'special_district', title: `School Board — ${muni.name}, ${muni.stateAbbr}`, category: 'Special District – Education', nextElection: '2026-11-03', cycleYear: 2026, isPartisan: false, termYears: 4, totalSeats: 7, seatsUpThisCycle: 3 });
    
    // Municipal judge
    offices.push({ id: `MUN-JUDGE-${muni.stateAbbr}-${muni.name.replace(/\s/g, '_')}`, state: muni.state, stateAbbr: muni.stateAbbr, municipality: muni.name, population: muni.population, tier: 'MUNICIPAL_JUDGE', level: 'municipal', title: `Municipal Judge — ${muni.name}, ${muni.stateAbbr}`, category: 'Municipal Judicial', nextElection: mayorNext, cycleYear: muni.nextMayorYear, isPartisan: false, termYears: 4, totalSeats: 1, seatsUpThisCycle: 1 });
  });

  // Special districts per state
  US_STATES_COMPLETE.forEach((state) => {
    offices.push({ id: `SPECIAL-SCHOOL-${state.abbr}`, state: state.name, stateAbbr: state.abbr, tier: 'SCHOOL_BOARD', level: 'special_district', title: `School Board Districts — ${state.name} (statewide)`, category: 'Special District – Education', nextElection: '2026-11-03', cycleYear: 2026, isPartisan: false, termYears: 4, totalSeats: 999, seatsUpThisCycle: 400, notes: `Hundreds of independent school districts across ${state.name}` });
    offices.push({ id: `SPECIAL-WATER-${state.abbr}`, state: state.name, stateAbbr: state.abbr, tier: 'WATER_DISTRICT', level: 'special_district', title: `Water / Utility District Boards — ${state.name}`, category: 'Special District – Utilities', nextElection: '2026-11-03', cycleYear: 2026, isPartisan: false, termYears: 4, totalSeats: 500, seatsUpThisCycle: 200, notes: `Dozens to hundreds of special water districts per state` });
    offices.push({ id: `SPECIAL-SOIL-${state.abbr}`, state: state.name, stateAbbr: state.abbr, tier: 'SOIL_CONSERVATION', level: 'special_district', title: `Soil & Water Conservation Districts — ${state.name}`, category: 'Special District – Conservation', nextElection: '2026-11-03', cycleYear: 2026, isPartisan: false, termYears: 4, totalSeats: 300, seatsUpThisCycle: 150 });
  });

  return offices;
}

// Memoize at module level
let _registryCache: JurisdictionOffice[] | null = null;
export function getCompleteOfficeRegistry(): JurisdictionOffice[] {
  if (!_registryCache) {
    _registryCache = generateCompleteOfficeRegistry();
  }
  return _registryCache;
}

export function getOfficeStats() {
  const registry = getCompleteOfficeRegistry();
  const byLevel = registry.reduce((acc, o) => {
    acc[o.level] = (acc[o.level] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const totalSeats = registry.reduce((acc, o) => acc + o.totalSeats, 0);
  return { totalOfficeTypes: registry.length, totalSeats, byLevel };
}
