import racesDataset from '@/data/races.json';
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

export const STATE_BOUNDING_BOXES: Record<string, StateBoundingBox> = {
  "Alabama": {
    "abbr": "AL",
    "minX": 599,
    "minY": 346,
    "maxX": 658,
    "maxY": 456,
    "width": 59,
    "height": 110,
    "centroidX": 628.6,
    "centroidY": 416.2
  },
  "Arizona": {
    "abbr": "AZ",
    "minX": 167,
    "minY": 300,
    "maxX": 262,
    "maxY": 431,
    "width": 95,
    "height": 131,
    "centroidX": 186,
    "centroidY": 359.2
  },
  "Arkansas": {
    "abbr": "AR",
    "minX": 499,
    "minY": 312,
    "maxX": 579,
    "maxY": 392,
    "width": 80,
    "height": 81,
    "centroidX": 549.5,
    "centroidY": 352.6
  },
  "California": {
    "abbr": "CA",
    "minX": 10,
    "minY": 184,
    "maxX": 178,
    "maxY": 403,
    "width": 169,
    "height": 219,
    "centroidX": 90,
    "centroidY": 290
  },
  "Colorado": {
    "abbr": "CO",
    "minX": 262,
    "minY": 208,
    "maxX": 377,
    "maxY": 300,
    "width": 115,
    "height": 93,
    "centroidX": 309.1,
    "centroidY": 254.5
  },
  "Connecticut": {
    "abbr": "CT",
    "minX": 841,
    "minY": 184,
    "maxX": 873,
    "maxY": 208,
    "width": 32,
    "height": 25,
    "centroidX": 855.3,
    "centroidY": 197.5
  },
  "Delaware": {
    "abbr": "DE",
    "minX": 808,
    "minY": 235,
    "maxX": 820,
    "maxY": 267,
    "width": 12,
    "height": 32,
    "centroidX": 813.2,
    "centroidY": 247.1
  },
  "District of Columbia": {
    "abbr": "DC",
    "minX": 786,
    "minY": 254,
    "maxX": 789,
    "maxY": 259,
    "width": 3,
    "height": 5,
    "centroidX": 787.2,
    "centroidY": 255.7
  },
  "Florida": {
    "abbr": "FL",
    "minX": 613,
    "minY": 438,
    "maxX": 738,
    "maxY": 574,
    "width": 125,
    "height": 136,
    "centroidX": 760,
    "centroidY": 480
  },
  "Georgia": {
    "abbr": "GA",
    "minX": 647,
    "minY": 346,
    "maxX": 724,
    "maxY": 453,
    "width": 77,
    "height": 107,
    "centroidX": 690.1,
    "centroidY": 402.6
  },
  "Idaho": {
    "abbr": "ID",
    "minX": 127,
    "minY": 23,
    "maxX": 229,
    "maxY": 185,
    "width": 102,
    "height": 162,
    "centroidX": 168.1,
    "centroidY": 104.3
  },
  "Illinois": {
    "abbr": "IL",
    "minX": 550,
    "minY": 173,
    "maxX": 615,
    "maxY": 300,
    "width": 66,
    "height": 128,
    "centroidX": 582,
    "centroidY": 244.3
  },
  "Indiana": {
    "abbr": "IN",
    "minX": 606,
    "minY": 190,
    "maxX": 660,
    "maxY": 282,
    "width": 54,
    "height": 92,
    "centroidX": 629.8,
    "centroidY": 254.8
  },
  "Iowa": {
    "abbr": "IA",
    "minX": 466,
    "minY": 150,
    "maxX": 572,
    "maxY": 222,
    "width": 107,
    "height": 72,
    "centroidX": 523.7,
    "centroidY": 185.5
  },
  "Kansas": {
    "abbr": "KS",
    "minX": 377,
    "minY": 231,
    "maxX": 499,
    "maxY": 300,
    "width": 122,
    "height": 69,
    "centroidX": 451.2,
    "centroidY": 251.9
  },
  "Kentucky": {
    "abbr": "KY",
    "minX": 584,
    "minY": 252,
    "maxX": 706,
    "maxY": 312,
    "width": 122,
    "height": 60,
    "centroidX": 646.2,
    "centroidY": 282.4
  },
  "Louisiana": {
    "abbr": "LA",
    "minX": 508,
    "minY": 392,
    "maxX": 591,
    "maxY": 484,
    "width": 83,
    "height": 93,
    "centroidX": 520,
    "centroidY": 460
  },
  "Maine": {
    "abbr": "ME",
    "minX": 885,
    "minY": 59,
    "maxX": 952,
    "maxY": 160,
    "width": 67,
    "height": 102,
    "centroidX": 917.5,
    "centroidY": 116.2
  },
  "Maryland": {
    "abbr": "MD",
    "minX": 747,
    "minY": 237,
    "maxX": 820,
    "maxY": 279,
    "width": 73,
    "height": 42,
    "centroidX": 789.6,
    "centroidY": 257.7
  },
  "Massachusetts": {
    "abbr": "MA",
    "minX": 845,
    "minY": 164,
    "maxX": 904,
    "maxY": 196,
    "width": 59,
    "height": 32,
    "centroidX": 882.7,
    "centroidY": 182.2
  },
  "Michigan": {
    "abbr": "MI",
    "minX": 568,
    "minY": 42,
    "maxX": 699,
    "maxY": 192,
    "width": 131,
    "height": 150,
    "centroidX": 610,
    "centroidY": 190
  },
  "Minnesota": {
    "abbr": "MN",
    "minX": 456,
    "minY": 14,
    "maxX": 581,
    "maxY": 150,
    "width": 125,
    "height": 136,
    "centroidX": 522.6,
    "centroidY": 69.4
  },
  "Mississippi": {
    "abbr": "MS",
    "minX": 548,
    "minY": 346,
    "maxX": 606,
    "maxY": 457,
    "width": 58,
    "height": 111,
    "centroidX": 570.4,
    "centroidY": 401
  },
  "Missouri": {
    "abbr": "MO",
    "minX": 480,
    "minY": 217,
    "maxX": 589,
    "maxY": 323,
    "width": 109,
    "height": 107,
    "centroidX": 549.9,
    "centroidY": 267.1
  },
  "Montana": {
    "abbr": "MT",
    "minX": 147,
    "minY": 23,
    "maxX": 344,
    "maxY": 129,
    "width": 197,
    "height": 106,
    "centroidX": 206.7,
    "centroidY": 92.9
  },
  "Nebraska": {
    "abbr": "NE",
    "minX": 344,
    "minY": 162,
    "maxX": 487,
    "maxY": 231,
    "width": 144,
    "height": 69,
    "centroidX": 438.2,
    "centroidY": 188.4
  },
  "Nevada": {
    "abbr": "NV",
    "minX": 82,
    "minY": 185,
    "maxX": 180,
    "maxY": 346,
    "width": 98,
    "height": 162,
    "centroidX": 144.9,
    "centroidY": 279.7
  },
  "New Hampshire": {
    "abbr": "NH",
    "minX": 861,
    "minY": 108,
    "maxX": 891,
    "maxY": 169,
    "width": 30,
    "height": 60,
    "centroidX": 876.6,
    "centroidY": 141.9
  },
  "New Jersey": {
    "abbr": "NJ",
    "minX": 811,
    "minY": 199,
    "maxX": 839,
    "maxY": 254,
    "width": 27,
    "height": 55,
    "centroidX": 824.3,
    "centroidY": 224.6
  },
  "New Mexico": {
    "abbr": "NM",
    "minX": 262,
    "minY": 300,
    "maxX": 361,
    "maxY": 431,
    "width": 99,
    "height": 131,
    "centroidX": 312.3,
    "centroidY": 364
  },
  "New York": {
    "abbr": "NY",
    "minX": 742,
    "minY": 115,
    "maxX": 868,
    "maxY": 218,
    "width": 126,
    "height": 103,
    "centroidX": 800,
    "centroidY": 170
  },
  "North Carolina": {
    "abbr": "NC",
    "minX": 668,
    "minY": 310,
    "maxX": 809,
    "maxY": 373,
    "width": 141,
    "height": 63,
    "centroidX": 747.8,
    "centroidY": 334.9
  },
  "North Dakota": {
    "abbr": "ND",
    "minX": 344,
    "minY": 23,
    "maxX": 467,
    "maxY": 94,
    "width": 123,
    "height": 71,
    "centroidX": 438.8,
    "centroidY": 56.3
  },
  "Ohio": {
    "abbr": "OH",
    "minX": 659,
    "minY": 185,
    "maxX": 730,
    "maxY": 267,
    "width": 71,
    "height": 82,
    "centroidX": 699.9,
    "centroidY": 233.5
  },
  "Oklahoma": {
    "abbr": "OK",
    "minX": 361,
    "minY": 300,
    "maxX": 502,
    "maxY": 378,
    "width": 141,
    "height": 78,
    "centroidX": 446.5,
    "centroidY": 355.6
  },
  "Oregon": {
    "abbr": "OR",
    "minX": 7,
    "minY": 86,
    "maxX": 140,
    "maxY": 185,
    "width": 133,
    "height": 99,
    "centroidX": 67.2,
    "centroidY": 122.9
  },
  "Pennsylvania": {
    "abbr": "PA",
    "minX": 730,
    "minY": 178,
    "maxX": 826,
    "maxY": 237,
    "width": 96,
    "height": 59,
    "centroidX": 797.7,
    "centroidY": 208.4
  },
  "Rhode Island": {
    "abbr": "RI",
    "minX": 872,
    "minY": 184,
    "maxX": 884,
    "maxY": 200,
    "width": 12,
    "height": 16,
    "centroidX": 879,
    "centroidY": 191.9
  },
  "South Carolina": {
    "abbr": "SC",
    "minX": 684,
    "minY": 342,
    "maxX": 762,
    "maxY": 415,
    "width": 79,
    "height": 73,
    "centroidX": 719.1,
    "centroidY": 376.2
  },
  "South Dakota": {
    "abbr": "SD",
    "minX": 344,
    "minY": 94,
    "maxX": 469,
    "maxY": 173,
    "width": 125,
    "height": 80,
    "centroidX": 437.2,
    "centroidY": 144.9
  },
  "Tennessee": {
    "abbr": "TN",
    "minX": 569,
    "minY": 308,
    "maxX": 711,
    "maxY": 347,
    "width": 142,
    "height": 39,
    "centroidX": 635.9,
    "centroidY": 325
  },
  "Texas": {
    "abbr": "TX",
    "minX": 301,
    "minY": 312,
    "maxX": 517,
    "maxY": 556,
    "width": 215,
    "height": 245,
    "centroidX": 430,
    "centroidY": 420
  },
  "Utah": {
    "abbr": "UT",
    "minX": 180,
    "minY": 185,
    "maxX": 262,
    "maxY": 300,
    "width": 82,
    "height": 115,
    "centroidX": 232.1,
    "centroidY": 237.4
  },
  "Vermont": {
    "abbr": "VT",
    "minX": 846,
    "minY": 115,
    "maxX": 878,
    "maxY": 168,
    "width": 32,
    "height": 53,
    "centroidX": 860.6,
    "centroidY": 138.6
  },
  "Virginia": {
    "abbr": "VA",
    "minX": 678,
    "minY": 243,
    "maxX": 817,
    "maxY": 311,
    "width": 138,
    "height": 68,
    "centroidX": 761.4,
    "centroidY": 281.7
  },
  "Washington": {
    "abbr": "WA",
    "minX": 5,
    "minY": 23,
    "maxX": 133,
    "maxY": 103,
    "width": 128,
    "height": 80,
    "centroidX": 47,
    "centroidY": 61.6
  },
  "West Virginia": {
    "abbr": "WV",
    "minX": 695,
    "minY": 216,
    "maxX": 776,
    "maxY": 295,
    "width": 81,
    "height": 79,
    "centroidX": 731,
    "centroidY": 258.9
  },
  "Wisconsin": {
    "abbr": "WI",
    "minX": 527,
    "minY": 70,
    "maxX": 623,
    "maxY": 173,
    "width": 96,
    "height": 103,
    "centroidX": 577,
    "centroidY": 117.9
  },
  "Wyoming": {
    "abbr": "WY",
    "minX": 229,
    "minY": 115,
    "maxX": 344,
    "maxY": 208,
    "width": 115,
    "height": 92,
    "centroidX": 280.1,
    "centroidY": 160.7
  },
  "Alaska": {
    "abbr": "AK",
    "minX": 50,
    "minY": 460,
    "maxX": 190,
    "maxY": 560,
    "width": 140,
    "height": 100,
    "centroidX": 120,
    "centroidY": 510
  },
  "Hawaii": {
    "abbr": "HI",
    "minX": 230,
    "minY": 520,
    "maxX": 330,
    "maxY": 570,
    "width": 100,
    "height": 50,
    "centroidX": 280,
    "centroidY": 545
  }
};

export const CITIES_REGISTRY: CityJurisdiction[] = [
  {
    "id": "city-tx-austin",
    "name": "Austin",
    "state": "TX",
    "stateName": "Texas",
    "x": 428,
    "y": 442,
    "population": 978908,
    "county": "Travis",
    "districts": [
      "TX-10",
      "TX-35",
      "TX-37"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-tx-austin",
    "isMajor": true
  },
  {
    "id": "city-tx-san-antonio",
    "name": "San Antonio",
    "state": "TX",
    "stateName": "Texas",
    "x": 418,
    "y": 466,
    "population": 1472909,
    "county": "Bexar",
    "districts": [
      "TX-20",
      "TX-21",
      "TX-28",
      "TX-35"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-tx-san-antonio",
    "isMajor": true
  },
  {
    "id": "city-tx-houston",
    "name": "Houston",
    "state": "TX",
    "stateName": "Texas",
    "x": 472,
    "y": 456,
    "population": 2304580,
    "county": "Harris",
    "districts": [
      "TX-02",
      "TX-07",
      "TX-09",
      "TX-18",
      "TX-29",
      "TX-38"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-tx-dallas",
    "name": "Dallas",
    "state": "TX",
    "stateName": "Texas",
    "x": 436,
    "y": 374,
    "population": 1304379,
    "county": "Dallas",
    "districts": [
      "TX-24",
      "TX-30",
      "TX-32",
      "TX-33"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-tx-fort-worth",
    "name": "Fort Worth",
    "state": "TX",
    "stateName": "Texas",
    "x": 424,
    "y": 376,
    "population": 956709,
    "county": "Tarrant",
    "districts": [
      "TX-12",
      "TX-26",
      "TX-33"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-tx-el-paso",
    "name": "El Paso",
    "state": "TX",
    "stateName": "Texas",
    "x": 306,
    "y": 424,
    "population": 678815,
    "county": "El Paso",
    "districts": [
      "TX-16",
      "TX-23"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-tx-el-paso",
    "isMajor": true
  },
  {
    "id": "city-tx-arlington",
    "name": "Arlington",
    "state": "TX",
    "stateName": "Texas",
    "x": 430,
    "y": 380,
    "population": 394266,
    "county": "Tarrant",
    "districts": [
      "TX-06",
      "TX-25",
      "TX-33"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-tx-arlington",
    "isMajor": false
  },
  {
    "id": "city-tx-corpus-christi",
    "name": "Corpus Christi",
    "state": "TX",
    "stateName": "Texas",
    "x": 438,
    "y": 504,
    "population": 317863,
    "county": "Nueces",
    "districts": [
      "TX-27"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-tx-corpus-christi",
    "isMajor": false
  },
  {
    "id": "city-tx-lubbock",
    "name": "Lubbock",
    "state": "TX",
    "stateName": "Texas",
    "x": 368,
    "y": 362,
    "population": 263930,
    "county": "Lubbock",
    "districts": [
      "TX-19"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-tx-lubbock",
    "isMajor": false
  },
  {
    "id": "city-tx-laredo",
    "name": "Laredo",
    "state": "TX",
    "stateName": "Texas",
    "x": 396,
    "y": 512,
    "population": 255205,
    "county": "Webb",
    "districts": [
      "TX-28"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-tx-laredo",
    "isMajor": false
  },
  {
    "id": "city-tx-garland",
    "name": "Garland",
    "state": "TX",
    "stateName": "Texas",
    "x": 442,
    "y": 372,
    "population": 246018,
    "county": "Dallas",
    "districts": [
      "TX-05",
      "TX-32"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-tx-garland",
    "isMajor": false
  },
  {
    "id": "city-tx-irving",
    "name": "Irving",
    "state": "TX",
    "stateName": "Texas",
    "x": 432,
    "y": 376,
    "population": 256684,
    "county": "Dallas",
    "districts": [
      "TX-24",
      "TX-33"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-tx-irving",
    "isMajor": false
  },
  {
    "id": "city-ca-los-angeles",
    "name": "Los Angeles",
    "state": "CA",
    "stateName": "California",
    "x": 102,
    "y": 356,
    "population": 3898747,
    "county": "Los Angeles",
    "districts": [
      "CA-28",
      "CA-30",
      "CA-34",
      "CA-37"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-ca-san-diego",
    "name": "San Diego",
    "state": "CA",
    "stateName": "California",
    "x": 122,
    "y": 390,
    "population": 1386932,
    "county": "San Diego",
    "districts": [
      "CA-50",
      "CA-51",
      "CA-52"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-ca-san-jose",
    "name": "San Jose",
    "state": "CA",
    "stateName": "California",
    "x": 54,
    "y": 272,
    "population": 1013240,
    "county": "Santa Clara",
    "districts": [
      "CA-16",
      "CA-17",
      "CA-18"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-ca-san-jose",
    "isMajor": true
  },
  {
    "id": "city-ca-san-francisco",
    "name": "San Francisco",
    "state": "CA",
    "stateName": "California",
    "x": 46,
    "y": 260,
    "population": 873965,
    "county": "San Francisco",
    "districts": [
      "CA-11",
      "CA-12"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-ca-fresno",
    "name": "Fresno",
    "state": "CA",
    "stateName": "California",
    "x": 82,
    "y": 298,
    "population": 542107,
    "county": "Fresno",
    "districts": [
      "CA-21",
      "CA-22"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-ca-fresno",
    "isMajor": true
  },
  {
    "id": "city-ca-sacramento",
    "name": "Sacramento",
    "state": "CA",
    "stateName": "California",
    "x": 68,
    "y": 246,
    "population": 524943,
    "county": "Sacramento",
    "districts": [
      "CA-06",
      "CA-07"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-ca-sacramento",
    "isMajor": true
  },
  {
    "id": "city-ca-long-beach",
    "name": "Long Beach",
    "state": "CA",
    "stateName": "California",
    "x": 106,
    "y": 362,
    "population": 466742,
    "county": "Los Angeles",
    "districts": [
      "CA-42"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-ca-long-beach",
    "isMajor": true
  },
  {
    "id": "city-ca-oakland",
    "name": "Oakland",
    "state": "CA",
    "stateName": "California",
    "x": 50,
    "y": 262,
    "population": 440646,
    "county": "Alameda",
    "districts": [
      "CA-12"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-ca-bakersfield",
    "name": "Bakersfield",
    "state": "CA",
    "stateName": "California",
    "x": 96,
    "y": 330,
    "population": 403455,
    "county": "Kern",
    "districts": [
      "CA-20",
      "CA-22"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-ca-bakersfield",
    "isMajor": false
  },
  {
    "id": "city-ca-anaheim",
    "name": "Anaheim",
    "state": "CA",
    "stateName": "California",
    "x": 110,
    "y": 364,
    "population": 346824,
    "county": "Orange",
    "districts": [
      "CA-46"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-ca-anaheim",
    "isMajor": false
  },
  {
    "id": "city-ca-santa-ana",
    "name": "Santa Ana",
    "state": "CA",
    "stateName": "California",
    "x": 112,
    "y": 366,
    "population": 310227,
    "county": "Orange",
    "districts": [
      "CA-46"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-ca-santa-ana",
    "isMajor": false
  },
  {
    "id": "city-ca-riverside",
    "name": "Riverside",
    "state": "CA",
    "stateName": "California",
    "x": 122,
    "y": 360,
    "population": 314998,
    "county": "Riverside",
    "districts": [
      "CA-39"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-ca-riverside",
    "isMajor": false
  },
  {
    "id": "city-ca-stockton",
    "name": "Stockton",
    "state": "CA",
    "stateName": "California",
    "x": 66,
    "y": 256,
    "population": 320804,
    "county": "San Joaquin",
    "districts": [
      "CA-09"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-ca-stockton",
    "isMajor": false
  },
  {
    "id": "city-ca-chula-vista",
    "name": "Chula Vista",
    "state": "CA",
    "stateName": "California",
    "x": 124,
    "y": 392,
    "population": 275487,
    "county": "San Diego",
    "districts": [
      "CA-51"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-ca-chula-vista",
    "isMajor": false
  },
  {
    "id": "city-ca-irvine",
    "name": "Irvine",
    "state": "CA",
    "stateName": "California",
    "x": 114,
    "y": 368,
    "population": 307670,
    "county": "Orange",
    "districts": [
      "CA-47"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-ca-irvine",
    "isMajor": false
  },
  {
    "id": "city-ca-fremont",
    "name": "Fremont",
    "state": "CA",
    "stateName": "California",
    "x": 52,
    "y": 268,
    "population": 230504,
    "county": "Alameda",
    "districts": [
      "CA-14"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-ca-fremont",
    "isMajor": false
  },
  {
    "id": "city-ca-modesto",
    "name": "Modesto (CA-13)",
    "state": "CA",
    "stateName": "California",
    "x": 72,
    "y": 268,
    "population": 218464,
    "county": "Stanislaus",
    "districts": [
      "CA-13"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-az-phoenix",
    "name": "Phoenix",
    "state": "AZ",
    "stateName": "Arizona",
    "x": 215,
    "y": 368,
    "population": 1608139,
    "county": "Maricopa",
    "districts": [
      "AZ-01",
      "AZ-03",
      "AZ-04"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-az-phoenix",
    "isMajor": true
  },
  {
    "id": "city-az-tucson",
    "name": "Tucson",
    "state": "AZ",
    "stateName": "Arizona",
    "x": 232,
    "y": 404,
    "population": 542629,
    "county": "Pima",
    "districts": [
      "AZ-07"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-az-mesa",
    "name": "Mesa",
    "state": "AZ",
    "stateName": "Arizona",
    "x": 220,
    "y": 370,
    "population": 504258,
    "county": "Maricopa",
    "districts": [
      "AZ-04",
      "AZ-05"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-az-mesa",
    "isMajor": false
  },
  {
    "id": "city-az-chandler",
    "name": "Chandler",
    "state": "AZ",
    "stateName": "Arizona",
    "x": 221,
    "y": 374,
    "population": 275987,
    "county": "Maricopa",
    "districts": [
      "AZ-05"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-az-chandler",
    "isMajor": false
  },
  {
    "id": "city-az-scottsdale",
    "name": "Scottsdale",
    "state": "AZ",
    "stateName": "Arizona",
    "x": 218,
    "y": 364,
    "population": 241361,
    "county": "Maricopa",
    "districts": [
      "AZ-01"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-az-scottsdale",
    "isMajor": false
  },
  {
    "id": "city-az-glendale",
    "name": "Glendale",
    "state": "AZ",
    "stateName": "Arizona",
    "x": 211,
    "y": 366,
    "population": 248325,
    "county": "Maricopa",
    "districts": [
      "AZ-08"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-az-glendale",
    "isMajor": false
  },
  {
    "id": "city-az-gilbert",
    "name": "Gilbert",
    "state": "AZ",
    "stateName": "Arizona",
    "x": 222,
    "y": 372,
    "population": 267918,
    "county": "Maricopa",
    "districts": [
      "AZ-05"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-az-gilbert",
    "isMajor": false
  },
  {
    "id": "city-nv-las-vegas",
    "name": "Las Vegas",
    "state": "NV",
    "stateName": "Nevada",
    "x": 162,
    "y": 326,
    "population": 641903,
    "county": "Clark",
    "districts": [
      "NV-01"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-nv-las-vegas",
    "isMajor": true
  },
  {
    "id": "city-nv-henderson",
    "name": "Henderson",
    "state": "NV",
    "stateName": "Nevada",
    "x": 165,
    "y": 330,
    "population": 317610,
    "county": "Clark",
    "districts": [
      "NV-03"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-nv-henderson",
    "isMajor": false
  },
  {
    "id": "city-nv-reno",
    "name": "Reno",
    "state": "NV",
    "stateName": "Nevada",
    "x": 92,
    "y": 234,
    "population": 264165,
    "county": "Washoe",
    "districts": [
      "NV-02"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-nv-reno",
    "isMajor": true
  },
  {
    "id": "city-nv-north-las-vegas",
    "name": "North Las Vegas",
    "state": "NV",
    "stateName": "Nevada",
    "x": 162,
    "y": 323,
    "population": 262527,
    "county": "Clark",
    "districts": [
      "NV-04"
    ],
    "hasMayoral": true,
    "mayoralId": "mayor-nv-north-las-vegas",
    "isMajor": false
  },
  {
    "id": "city-ga-atlanta",
    "name": "Atlanta",
    "state": "GA",
    "stateName": "Georgia",
    "x": 672,
    "y": 386,
    "population": 498715,
    "county": "Fulton",
    "districts": [
      "GA-05"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-ga-augusta",
    "name": "Augusta",
    "state": "GA",
    "stateName": "Georgia",
    "x": 704,
    "y": 392,
    "population": 202081,
    "county": "Richmond",
    "districts": [
      "GA-12"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-ga-savannah",
    "name": "Savannah",
    "state": "GA",
    "stateName": "Georgia",
    "x": 712,
    "y": 426,
    "population": 147780,
    "county": "Chatham",
    "districts": [
      "GA-01"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-ga-columbus",
    "name": "Columbus",
    "state": "GA",
    "stateName": "Georgia",
    "x": 664,
    "y": 414,
    "population": 206922,
    "county": "Muscogee",
    "districts": [
      "GA-02"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": false
  },
  {
    "id": "city-ga-macon",
    "name": "Macon",
    "state": "GA",
    "stateName": "Georgia",
    "x": 682,
    "y": 402,
    "population": 157346,
    "county": "Bibb",
    "districts": [
      "GA-08"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": false
  },
  {
    "id": "city-fl-jacksonville",
    "name": "Jacksonville",
    "state": "FL",
    "stateName": "Florida",
    "x": 694,
    "y": 450,
    "population": 949611,
    "county": "Duval",
    "districts": [
      "FL-04"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-fl-miami",
    "name": "Miami",
    "state": "FL",
    "stateName": "Florida",
    "x": 716,
    "y": 550,
    "population": 442241,
    "county": "Miami-Dade",
    "districts": [
      "FL-24",
      "FL-27"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-fl-tampa",
    "name": "Tampa",
    "state": "FL",
    "stateName": "Florida",
    "x": 676,
    "y": 502,
    "population": 384959,
    "county": "Hillsborough",
    "districts": [
      "FL-14"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-fl-orlando",
    "name": "Orlando",
    "state": "FL",
    "stateName": "Florida",
    "x": 698,
    "y": 494,
    "population": 307573,
    "county": "Orange",
    "districts": [
      "FL-10"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-fl-tallahassee",
    "name": "Tallahassee",
    "state": "FL",
    "stateName": "Florida",
    "x": 645,
    "y": 448,
    "population": 196169,
    "county": "Leon",
    "districts": [
      "FL-02"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-nc-charlotte",
    "name": "Charlotte",
    "state": "NC",
    "stateName": "North Carolina",
    "x": 730,
    "y": 342,
    "population": 874579,
    "county": "Mecklenburg",
    "districts": [
      "NC-12",
      "NC-14"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-nc-raleigh",
    "name": "Raleigh",
    "state": "NC",
    "stateName": "North Carolina",
    "x": 766,
    "y": 328,
    "population": 467665,
    "county": "Wake",
    "districts": [
      "NC-02"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-nc-greensboro",
    "name": "Greensboro",
    "state": "NC",
    "stateName": "North Carolina",
    "x": 746,
    "y": 324,
    "population": 299035,
    "county": "Guilford",
    "districts": [
      "NC-06"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-nc-durham",
    "name": "Durham",
    "state": "NC",
    "stateName": "North Carolina",
    "x": 760,
    "y": 326,
    "population": 283506,
    "county": "Durham",
    "districts": [
      "NC-04"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": false
  },
  {
    "id": "city-nc-winston-salem",
    "name": "Winston-Salem",
    "state": "NC",
    "stateName": "North Carolina",
    "x": 738,
    "y": 324,
    "population": 249545,
    "county": "Forsyth",
    "districts": [
      "NC-06"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": false
  },
  {
    "id": "city-mi-detroit",
    "name": "Detroit",
    "state": "MI",
    "stateName": "Michigan",
    "x": 686,
    "y": 186,
    "population": 639111,
    "county": "Wayne",
    "districts": [
      "MI-12",
      "MI-13"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-mi-grand-rapids",
    "name": "Grand Rapids",
    "state": "MI",
    "stateName": "Michigan",
    "x": 652,
    "y": 172,
    "population": 198917,
    "county": "Kent",
    "districts": [
      "MI-03"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-mi-lansing",
    "name": "Lansing",
    "state": "MI",
    "stateName": "Michigan",
    "x": 666,
    "y": 178,
    "population": 112644,
    "county": "Ingham",
    "districts": [
      "MI-07"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-mi-ann-arbor",
    "name": "Ann Arbor",
    "state": "MI",
    "stateName": "Michigan",
    "x": 678,
    "y": 188,
    "population": 123851,
    "county": "Washtenaw",
    "districts": [
      "MI-06"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": false
  },
  {
    "id": "city-oh-columbus",
    "name": "Columbus",
    "state": "OH",
    "stateName": "Ohio",
    "x": 696,
    "y": 228,
    "population": 905748,
    "county": "Franklin",
    "districts": [
      "OH-03"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-oh-cleveland",
    "name": "Cleveland",
    "state": "OH",
    "stateName": "Ohio",
    "x": 716,
    "y": 196,
    "population": 372624,
    "county": "Cuyahoga",
    "districts": [
      "OH-11"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-oh-cincinnati",
    "name": "Cincinnati",
    "state": "OH",
    "stateName": "Ohio",
    "x": 672,
    "y": 254,
    "population": 309317,
    "county": "Hamilton",
    "districts": [
      "OH-01"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-oh-toledo",
    "name": "Toledo",
    "state": "OH",
    "stateName": "Ohio",
    "x": 684,
    "y": 196,
    "population": 270871,
    "county": "Lucas",
    "districts": [
      "OH-09"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": false
  },
  {
    "id": "city-oh-akron",
    "name": "Akron",
    "state": "OH",
    "stateName": "Ohio",
    "x": 715,
    "y": 206,
    "population": 190469,
    "county": "Summit",
    "districts": [
      "OH-13"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": false
  },
  {
    "id": "city-pa-philadelphia",
    "name": "Philadelphia",
    "state": "PA",
    "stateName": "Pennsylvania",
    "x": 820,
    "y": 226,
    "population": 1603797,
    "county": "Philadelphia",
    "districts": [
      "PA-02",
      "PA-03"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-pa-pittsburgh",
    "name": "Pittsburgh",
    "state": "PA",
    "stateName": "Pennsylvania",
    "x": 748,
    "y": 220,
    "population": 302971,
    "county": "Allegheny",
    "districts": [
      "PA-12"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-pa-allentown",
    "name": "Allentown",
    "state": "PA",
    "stateName": "Pennsylvania",
    "x": 812,
    "y": 212,
    "population": 125845,
    "county": "Lehigh",
    "districts": [
      "PA-07"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": false
  },
  {
    "id": "city-pa-harrisburg",
    "name": "Harrisburg",
    "state": "PA",
    "stateName": "Pennsylvania",
    "x": 792,
    "y": 224,
    "population": 50099,
    "county": "Dauphin",
    "districts": [
      "PA-10"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-ny-new-york",
    "name": "New York City",
    "state": "NY",
    "stateName": "New York",
    "x": 844,
    "y": 214,
    "population": 8804190,
    "county": "5 Boroughs",
    "districts": [
      "NY-07",
      "NY-10",
      "NY-12"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-ny-buffalo",
    "name": "Buffalo",
    "state": "NY",
    "stateName": "New York",
    "x": 756,
    "y": 162,
    "population": 278349,
    "county": "Erie",
    "districts": [
      "NY-26"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-ny-rochester",
    "name": "Rochester",
    "state": "NY",
    "stateName": "New York",
    "x": 780,
    "y": 154,
    "population": 211328,
    "county": "Monroe",
    "districts": [
      "NY-25"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": false
  },
  {
    "id": "city-ny-albany",
    "name": "Albany",
    "state": "NY",
    "stateName": "New York",
    "x": 846,
    "y": 168,
    "population": 99224,
    "county": "Albany",
    "districts": [
      "NY-20"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-il-chicago",
    "name": "Chicago",
    "state": "IL",
    "stateName": "Illinois",
    "x": 598,
    "y": 196,
    "population": 2746388,
    "county": "Cook",
    "districts": [
      "IL-01",
      "IL-02",
      "IL-07"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-il-springfield",
    "name": "Springfield",
    "state": "IL",
    "stateName": "Illinois",
    "x": 580,
    "y": 234,
    "population": 114394,
    "county": "Sangamon",
    "districts": [
      "IL-13"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-il-peoria",
    "name": "Peoria",
    "state": "IL",
    "stateName": "Illinois",
    "x": 580,
    "y": 212,
    "population": 113150,
    "county": "Peoria",
    "districts": [
      "IL-17"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": false
  },
  {
    "id": "city-al-birmingham",
    "name": "Birmingham",
    "state": "AL",
    "stateName": "Alabama",
    "x": 605,
    "y": 396,
    "population": 200733,
    "county": "Jefferson",
    "districts": [
      "AL-07"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-al-huntsville",
    "name": "Huntsville",
    "state": "AL",
    "stateName": "Alabama",
    "x": 610,
    "y": 360,
    "population": 215006,
    "county": "Madison",
    "districts": [
      "AL-05"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-al-mobile",
    "name": "Mobile",
    "state": "AL",
    "stateName": "Alabama",
    "x": 598,
    "y": 450,
    "population": 187041,
    "county": "Mobile",
    "districts": [
      "AL-01"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-al-montgomery",
    "name": "Montgomery",
    "state": "AL",
    "stateName": "Alabama",
    "x": 620,
    "y": 412,
    "population": 200603,
    "county": "Montgomery",
    "districts": [
      "AL-02"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-al-fort-payne",
    "name": "Fort Payne",
    "state": "AL",
    "stateName": "Alabama",
    "x": 628,
    "y": 366,
    "population": 14877,
    "county": "DeKalb",
    "districts": [
      "AL-04"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": false
  },
  {
    "id": "city-me-portland",
    "name": "Portland",
    "state": "ME",
    "stateName": "Maine",
    "x": 902,
    "y": 135,
    "population": 68408,
    "county": "Cumberland",
    "districts": [
      "ME-01"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-me-bangor",
    "name": "Bangor",
    "state": "ME",
    "stateName": "Maine",
    "x": 920,
    "y": 105,
    "population": 31753,
    "county": "Penobscot",
    "districts": [
      "ME-02"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-me-augusta",
    "name": "Augusta",
    "state": "ME",
    "stateName": "Maine",
    "x": 910,
    "y": 120,
    "population": 18899,
    "county": "Kennebec",
    "districts": [
      "ME-01"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": false
  },
  {
    "id": "city-nh-manchester",
    "name": "Manchester",
    "state": "NH",
    "stateName": "New Hampshire",
    "x": 878,
    "y": 154,
    "population": 115644,
    "county": "Hillsborough",
    "districts": [
      "NH-01"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-nh-concord",
    "name": "Concord",
    "state": "NH",
    "stateName": "New Hampshire",
    "x": 874,
    "y": 144,
    "population": 43976,
    "county": "Merrimack",
    "districts": [
      "NH-02"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-ia-des-moines",
    "name": "Des Moines",
    "state": "IA",
    "stateName": "Iowa",
    "x": 508,
    "y": 198,
    "population": 214133,
    "county": "Polk",
    "districts": [
      "IA-03"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-ia-cedar-rapids",
    "name": "Cedar Rapids",
    "state": "IA",
    "stateName": "Iowa",
    "x": 535,
    "y": 186,
    "population": 137710,
    "county": "Linn",
    "districts": [
      "IA-02"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": false
  },
  {
    "id": "city-ks-wichita",
    "name": "Wichita",
    "state": "KS",
    "stateName": "Kansas",
    "x": 442,
    "y": 268,
    "population": 397532,
    "county": "Sedgwick",
    "districts": [
      "KS-04"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-ks-topeka",
    "name": "Topeka",
    "state": "KS",
    "stateName": "Kansas",
    "x": 472,
    "y": 248,
    "population": 126587,
    "county": "Shawnee",
    "districts": [
      "KS-02"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-mn-minneapolis",
    "name": "Minneapolis",
    "state": "MN",
    "stateName": "Minnesota",
    "x": 508,
    "y": 118,
    "population": 429954,
    "county": "Hennepin",
    "districts": [
      "MN-05"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-mn-st-paul",
    "name": "St. Paul",
    "state": "MN",
    "stateName": "Minnesota",
    "x": 516,
    "y": 120,
    "population": 311527,
    "county": "Ramsey",
    "districts": [
      "MN-04"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-ms-jackson",
    "name": "Jackson",
    "state": "MS",
    "stateName": "Mississippi",
    "x": 574,
    "y": 408,
    "population": 153701,
    "county": "Hinds",
    "districts": [
      "MS-02"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-ms-gulfport",
    "name": "Gulfport",
    "state": "MS",
    "stateName": "Mississippi",
    "x": 592,
    "y": 450,
    "population": 72926,
    "county": "Harrison",
    "districts": [
      "MS-04"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": false
  },
  {
    "id": "city-ne-omaha",
    "name": "Omaha",
    "state": "NE",
    "stateName": "Nebraska",
    "x": 474,
    "y": 200,
    "population": 486051,
    "county": "Douglas",
    "districts": [
      "NE-02"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-ne-lincoln",
    "name": "Lincoln",
    "state": "NE",
    "stateName": "Nebraska",
    "x": 464,
    "y": 212,
    "population": 291082,
    "county": "Lancaster",
    "districts": [
      "NE-01"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-sc-charleston",
    "name": "Charleston",
    "state": "SC",
    "stateName": "South Carolina",
    "x": 742,
    "y": 395,
    "population": 150227,
    "county": "Charleston",
    "districts": [
      "SC-01"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-sc-columbia",
    "name": "Columbia",
    "state": "SC",
    "stateName": "South Carolina",
    "x": 720,
    "y": 374,
    "population": 136684,
    "county": "Richland",
    "districts": [
      "SC-02"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-mt-billings",
    "name": "Billings",
    "state": "MT",
    "stateName": "Montana",
    "x": 260,
    "y": 95,
    "population": 117116,
    "county": "Yellowstone",
    "districts": [
      "MT-02"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-mt-helena",
    "name": "Helena",
    "state": "MT",
    "stateName": "Montana",
    "x": 205,
    "y": 78,
    "population": 32091,
    "county": "Lewis and Clark",
    "districts": [
      "MT-01"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-ok-oklahoma-city",
    "name": "Oklahoma City",
    "state": "OK",
    "stateName": "Oklahoma",
    "x": 442,
    "y": 328,
    "population": 681054,
    "county": "Oklahoma",
    "districts": [
      "OK-05"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-ok-tulsa",
    "name": "Tulsa",
    "state": "OK",
    "stateName": "Oklahoma",
    "x": 468,
    "y": 316,
    "population": 413066,
    "county": "Tulsa",
    "districts": [
      "OK-01"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-wy-cheyenne",
    "name": "Cheyenne",
    "state": "WY",
    "stateName": "Wyoming",
    "x": 335,
    "y": 198,
    "population": 65132,
    "county": "Laramie",
    "districts": [
      "WY-AL"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-wy-casper",
    "name": "Casper",
    "state": "WY",
    "stateName": "Wyoming",
    "x": 285,
    "y": 165,
    "population": 59038,
    "county": "Natrona",
    "districts": [
      "WY-AL"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": false
  },
  {
    "id": "city-la-new-orleans",
    "name": "New Orleans",
    "state": "LA",
    "stateName": "Louisiana",
    "x": 575,
    "y": 472,
    "population": 383997,
    "county": "Orleans",
    "districts": [
      "LA-01",
      "LA-02"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-la-baton-rouge",
    "name": "Baton Rouge",
    "state": "LA",
    "stateName": "Louisiana",
    "x": 552,
    "y": 454,
    "population": 227470,
    "county": "East Baton Rouge",
    "districts": [
      "LA-06"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-co-denver",
    "name": "Denver",
    "state": "CO",
    "stateName": "Colorado",
    "x": 324,
    "y": 242,
    "population": 715522,
    "county": "Denver",
    "districts": [
      "CO-01"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-co-colorado-springs",
    "name": "Colorado Springs",
    "state": "CO",
    "stateName": "Colorado",
    "x": 328,
    "y": 260,
    "population": 478961,
    "county": "El Paso",
    "districts": [
      "CO-05"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-wa-seattle",
    "name": "Seattle",
    "state": "WA",
    "stateName": "Washington",
    "x": 45,
    "y": 48,
    "population": 737015,
    "county": "King",
    "districts": [
      "WA-07",
      "WA-09"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-wa-spokane",
    "name": "Spokane",
    "state": "WA",
    "stateName": "Washington",
    "x": 125,
    "y": 48,
    "population": 228989,
    "county": "Spokane",
    "districts": [
      "WA-05"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-or-portland",
    "name": "Portland",
    "state": "OR",
    "stateName": "Oregon",
    "x": 42,
    "y": 104,
    "population": 652503,
    "county": "Multnomah",
    "districts": [
      "OR-03"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-or-salem",
    "name": "Salem",
    "state": "OR",
    "stateName": "Oregon",
    "x": 38,
    "y": 120,
    "population": 175535,
    "county": "Marion",
    "districts": [
      "OR-05"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-wi-milwaukee",
    "name": "Milwaukee",
    "state": "WI",
    "stateName": "Wisconsin",
    "x": 596,
    "y": 168,
    "population": 577222,
    "county": "Milwaukee",
    "districts": [
      "WI-04"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-wi-madison",
    "name": "Madison",
    "state": "WI",
    "stateName": "Wisconsin",
    "x": 566,
    "y": 172,
    "population": 269840,
    "county": "Dane",
    "districts": [
      "WI-02"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-va-virginia-beach",
    "name": "Virginia Beach",
    "state": "VA",
    "stateName": "Virginia",
    "x": 808,
    "y": 300,
    "population": 459470,
    "county": "Virginia Beach",
    "districts": [
      "VA-02"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  },
  {
    "id": "city-va-richmond",
    "name": "Richmond",
    "state": "VA",
    "stateName": "Virginia",
    "x": 785,
    "y": 284,
    "population": 226610,
    "county": "Richmond City",
    "districts": [
      "VA-04"
    ],
    "hasMayoral": false,
    "mayoralId": null,
    "isMajor": true
  }
];

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
      pollSpread = `${senateRace.polling_average.leader} +${senateRace.polling_average.spread}%`;
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
    const houseRace = races.find(r => r.tier === 3 && r.state === stateAbbr && (r.id.endsWith(`-${dPad}`) || r.office.includes(d)));
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
        jurisdictionLevel: `City of ${city.name}`,
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
      jurisdictionLevel: `${lr.county || city?.name || stateAbbr} Jurisdiction`,
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
