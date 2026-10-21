'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { US_STATE_PATHS, US_STATE_CENTROIDS } from './UsStatePaths';
import {
  STATE_BOUNDING_BOXES,
  CITIES_REGISTRY,
  CityJurisdiction,
  getJurisdictionSubRaces,
  SubRaceSummary
} from '@/lib/map-jurisdictions';
import racesDataset from '@/data/races.json';
import {
  Search,
  Maximize2,
  Minimize2,
  ChevronRight,
  ExternalLink,
  MapPin,
  Crosshair,
  Building,
  Landmark,
  Layers,
  Vote,
  Trophy,
  Compass,
  ArrowLeft,
  X,
  Sparkles
} from 'lucide-react';

export type MapFilterMode = 'all' | 'senate' | 'governor' | 'battleground' | 'mayoral';

export interface TacticalElectoralMapProps {
  initialState?: string | null;
  initialCityId?: string | null;
  showFullControls?: boolean;
}

export function TacticalElectoralMap({
  initialState = null,
  initialCityId = null,
  showFullControls = true
}: TacticalElectoralMapProps) {
  const [selectedState, setSelectedState] = useState<string | null>(initialState);
  const [selectedCity, setSelectedCity] = useState<CityJurisdiction | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [filterMode, setFilterMode] = useState<MapFilterMode>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredState, setHoveredState] = useState<string | null>(null);
  const [hoveredCity, setHoveredCity] = useState<CityJurisdiction | null>(null);

  // SVG ViewBox dimensions: National default 0 0 960 600
  const nationalViewBox = '0 0 960 600';

  // Compute active viewBox based on selected state zoom
  const activeViewBox = useMemo(() => {
    if (!selectedState) return nationalViewBox;
    const box = STATE_BOUNDING_BOXES[selectedState];
    if (!box) return nationalViewBox;

    // Add 25% padding around state for context and breathing room
    const paddingX = Math.max(30, box.width * 0.25);
    const paddingY = Math.max(25, box.height * 0.25);
    const minX = Math.max(0, box.minX - paddingX);
    const minY = Math.max(0, box.minY - paddingY);
    const width = box.width + paddingX * 2;
    const height = box.height + paddingY * 2;

    return `${minX} ${minY} ${width} ${height}`;
  }, [selectedState]);

  // Set initial city if provided
  useEffect(() => {
    if (initialCityId) {
      const c = CITIES_REGISTRY.find(item => item.id === initialCityId);
      if (c) {
        setSelectedCity(c);
        setSelectedState(c.stateName);
      }
    }
  }, [initialCityId]);

  // All races index from dataset
  const allRaces = useMemo(() => racesDataset.races, []);

  // Compute state color coding based on 2026 battleground / control status
  const stateColorMap = useMemo(() => {
    const map: Record<string, { fill: string; stroke: string; strokeWidth: number; label: string; rating?: string }> = {};

    Object.keys(US_STATE_PATHS).forEach((stateName) => {
      const box = STATE_BOUNDING_BOXES[stateName];
      const abbr = box?.abbr || '';

      const senate = allRaces.find(r => r.state === abbr && r.tier === 1);
      const gov = allRaces.find(r => r.state === abbr && r.tier === 2);
      const cookSenate = senate?.ratings.find(rt => rt.rater.includes('Cook'))?.verbatim_label;
      const cookGov = gov?.ratings.find(rt => rt.rater.includes('Cook'))?.verbatim_label;

      const isBattleground = (cookSenate && cookSenate.toLowerCase().includes('toss')) ||
                             (cookGov && cookGov.toLowerCase().includes('toss')) ||
                             ['TX', 'MI', 'NH', 'NC', 'ME', 'OH', 'GA', 'AK', 'IA', 'KS'].includes(abbr);

      const isDem = (cookSenate && cookSenate.toLowerCase().includes('democrat')) ||
                    (cookGov && cookGov.toLowerCase().includes('democrat')) ||
                    ['CA', 'NY', 'IL', 'MA', 'WA', 'OR', 'CO', 'CT', 'DE', 'HI', 'MD', 'NJ', 'NM', 'RI', 'VT', 'VA'].includes(abbr);

      const isRep = (cookSenate && cookSenate.toLowerCase().includes('republican')) ||
                    (cookGov && cookGov.toLowerCase().includes('republican')) ||
                    ['AL', 'AR', 'ID', 'IN', 'KY', 'LA', 'MS', 'MO', 'MT', 'ND', 'NE', 'OK', 'SC', 'SD', 'TN', 'UT', 'WV', 'WY', 'FL'].includes(abbr);

      let fill = '#1A1438';
      let stroke = '#3A2E70';
      let strokeWidth = 0.8;
      let label = 'Tracked Contest';

      if (filterMode === 'battleground') {
        if (isBattleground) {
          fill = '#422006';
          stroke = '#FFE600';
          strokeWidth = 1.8;
          label = 'Toss-Up Battleground';
        } else {
          fill = '#0F0B26';
          stroke = '#231B4C';
        }
      } else if (filterMode === 'senate') {
        if (senate) {
          if (cookSenate?.includes('Toss')) {
            fill = '#422006';
            stroke = '#FFE600';
            strokeWidth = 1.8;
            label = `Senate: ${cookSenate}`;
          } else if (cookSenate?.includes('Democrat')) {
            fill = '#083344';
            stroke = '#00F0FF';
            strokeWidth = 1.4;
            label = `Senate: ${cookSenate}`;
          } else if (cookSenate?.includes('Republican')) {
            fill = '#3B0764';
            stroke = '#FF007F';
            strokeWidth = 1.4;
            label = `Senate: ${cookSenate}`;
          }
        } else {
          fill = '#0C0820';
          stroke = '#1F1742';
          label = 'No Senate Race in 2026';
        }
      } else if (filterMode === 'governor') {
        if (gov) {
          if (cookGov?.includes('Toss')) {
            fill = '#422006';
            stroke = '#FFE600';
            strokeWidth = 1.8;
            label = `Governor: ${cookGov}`;
          } else if (cookGov?.includes('Democrat')) {
            fill = '#083344';
            stroke = '#00F0FF';
            strokeWidth = 1.4;
            label = `Governor: ${cookGov}`;
          } else {
            fill = '#3B0764';
            stroke = '#FF007F';
            strokeWidth = 1.4;
            label = `Governor: ${cookGov || 'Solid Republican'}`;
          }
        } else {
          fill = '#0C0820';
          stroke = '#1F1742';
          label = 'No Governor Race in 2026';
        }
      } else {
        // Default mode: highlights competitive balance
        if (isBattleground) {
          fill = '#3B1F0A';
          stroke = '#FFE600';
          strokeWidth = 1.5;
          label = 'Battleground State';
        } else if (isDem) {
          fill = '#072738';
          stroke = '#00F0FF';
          strokeWidth = 1.0;
          label = 'Democratic Leaning/Held';
        } else if (isRep) {
          fill = '#2C0B40';
          stroke = '#FF007F';
          strokeWidth = 1.0;
          label = 'Republican Leaning/Held';
        }
      }

      // Selected state highlighting
      if (selectedState === stateName) {
        stroke = '#39FF14';
        strokeWidth = 2.8;
        fill = '#1E174D';
      }

      map[stateName] = { fill, stroke, strokeWidth, label, rating: cookSenate || cookGov };
    });

    return map;
  }, [allRaces, filterMode, selectedState]);

  // Cities belonging to the currently selected state (or top hubs if national)
  const visibleCities = useMemo(() => {
    if (selectedState) {
      const box = STATE_BOUNDING_BOXES[selectedState];
      if (!box) return [];
      return CITIES_REGISTRY.filter(c => c.state === box.abbr);
    }
    // National view: show major hub cities
    return CITIES_REGISTRY.filter(c => c.isMajor);
  }, [selectedState]);

  // Search filtered results for instant jumping
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return { cities: [], states: [] };
    const q = searchQuery.toLowerCase().trim();

    const matchedCities = CITIES_REGISTRY.filter(
      c => c.name.toLowerCase().includes(q) ||
           c.county.toLowerCase().includes(q) ||
           c.state.toLowerCase() === q ||
           c.districts.some(d => d.toLowerCase().includes(q))
    ).slice(0, 6);

    const matchedStates = Object.keys(STATE_BOUNDING_BOXES).filter(
      s => s.toLowerCase().includes(q) || STATE_BOUNDING_BOXES[s].abbr.toLowerCase() === q
    ).slice(0, 4);

    return { cities: matchedCities, states: matchedStates };
  }, [searchQuery]);

  // Handler for clicking a state
  const handleSelectState = (stateName: string) => {
    if (selectedState === stateName) {
      // Zoom out to national
      setSelectedState(null);
      setSelectedCity(null);
      setSelectedDistrict(null);
    } else {
      setSelectedState(stateName);
      setSelectedDistrict(null);
      // Auto-select first major city if available
      const box = STATE_BOUNDING_BOXES[stateName];
      if (box) {
        const stateCities = CITIES_REGISTRY.filter(c => c.state === box.abbr);
        if (stateCities.length > 0) {
          setSelectedCity(stateCities[0]);
        } else {
          setSelectedCity(null);
        }
      }
    }
  };

  // Handler for clicking a city beacon
  const handleSelectCity = (city: CityJurisdiction, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSelectedCity(city);
    setSelectedState(city.stateName);
    setSelectedDistrict(null);
  };

  // Sub-races for the selected city / jurisdiction
  const activeSubRaces = useMemo(() => {
    if (selectedDistrict && selectedState) {
      const box = STATE_BOUNDING_BOXES[selectedState];
      return getJurisdictionSubRaces(selectedDistrict, box?.abbr || 'TX');
    }
    if (selectedCity) {
      return getJurisdictionSubRaces(selectedCity.id, selectedCity.state);
    }
    if (selectedState) {
      const box = STATE_BOUNDING_BOXES[selectedState];
      return getJurisdictionSubRaces(box?.abbr || '', box?.abbr || '');
    }
    return [];
  }, [selectedCity, selectedDistrict, selectedState]);

  // Statewide congressional districts
  const stateDistricts = useMemo(() => {
    if (!selectedState) return [];
    const box = STATE_BOUNDING_BOXES[selectedState];
    if (!box) return [];
    return allRaces.filter(r => r.tier === 3 && r.state === box.abbr);
  }, [selectedState, allRaces]);

  const activeStateAbbr = selectedState ? STATE_BOUNDING_BOXES[selectedState]?.abbr : null;

  return (
    <div className="space-y-4 font-mono select-none">
      {/* ── 1. RETRO ARCADE RADAR CONTROL HEADER ───────────────────────── */}
      <div className="p-4 rounded-xl bg-[#0D0926] border-2 border-[#00F0FF] shadow-[0_0_20px_rgba(0,240,255,0.3)]">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#161238] border border-[#FFE600] flex items-center justify-center text-[#FFE600] shadow-[0_0_10px_rgba(255,230,0,0.5)]">
              <Compass className="w-5 h-5 text-[#39FF14] animate-spin-slow" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-arcade text-xs sm:text-sm text-[#FFE600] arcade-text-glow-yellow">
                  TACTICAL RADAR · {selectedState ? `${selectedState.toUpperCase()} [${activeStateAbbr}]` : 'UNITED STATES'}
                </span>
                <span className="font-arcade text-[8px] px-2 py-0.5 rounded bg-[#FF007F] text-white border border-white">
                  {selectedState ? 'STATE ZOOM' : 'NATIONAL RADAR'}
                </span>
              </div>
              <p className="text-[11px] font-crt text-[#A5B4FC] mt-0.5">
                {selectedState
                  ? `Zoomed into ${selectedState} jurisdictions. Click any city beacon or district chip to inspect sub-races.`
                  : 'Click any state to trigger tactical zoom into its congressional districts, cities, and local ballots.'}
              </p>
            </div>
          </div>

          {/* Quick Filter Modes */}
          <div className="flex flex-wrap items-center gap-1.5 text-[8px] font-arcade">
            {(['all', 'battleground', 'senate', 'governor'] as MapFilterMode[]).map((mode) => (
              <button
                key={mode}
                onClick={() => setFilterMode(mode)}
                className={`px-2.5 py-1.5 rounded uppercase border transition ${
                  filterMode === mode
                    ? 'bg-[#FFE600] text-[#080616] border-white shadow-[0_0_10px_rgba(255,230,0,0.6)] font-bold'
                    : 'bg-[#181338] text-[#C7D2FE] hover:text-white border-[#3A2E70]'
                }`}
              >
                {mode === 'all' ? 'All Contests' : mode}
              </button>
            ))}

            {selectedState && (
              <button
                onClick={() => {
                  setSelectedState(null);
                  setSelectedCity(null);
                  setSelectedDistrict(null);
                }}
                className="arcade-btn px-2.5 py-1.5 rounded bg-[#FF007F] hover:bg-[#D9006C] text-white border border-white flex items-center gap-1 shadow-[0_0_8px_rgba(255,0,127,0.5)]"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>ZOOM OUT</span>
              </button>
            )}
          </div>
        </div>

        {/* Search & State Jump Bar */}
        {showFullControls && (
          <div className="mt-3 pt-3 border-t border-[#2D2264] flex flex-wrap items-center justify-between gap-3 relative">
            <div className="relative flex-1 min-w-[260px] max-w-md">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#00F0FF]" />
              <input
                type="text"
                placeholder="Jump to city or district (Austin, CA-13, Phoenix, Travis)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#130E2E] border border-[#2D2264] focus:border-[#00F0FF] rounded-lg pl-9 pr-8 py-1.5 text-xs text-white placeholder-[#64748B] focus:outline-none focus:shadow-[0_0_10px_rgba(0,240,255,0.4)]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#A5B4FC] hover:text-white"
                >
                  <X className="w-3 h-3" />
                </button>
              )}

              {/* Instant Search Dropdown Popover */}
              {searchResults && (searchResults.cities.length > 0 || searchResults.states.length > 0) && (
                <div className="absolute left-0 right-0 top-full mt-1.5 bg-[#100C2A] border-2 border-[#00F0FF] rounded-xl shadow-[0_4px_25px_rgba(0,0,0,0.8)] z-50 overflow-hidden divide-y divide-[#2D2264]">
                  {searchResults.states.map((st) => (
                    <button
                      key={st}
                      onClick={() => {
                        handleSelectState(st);
                        setSearchQuery('');
                      }}
                      className="w-full px-3.5 py-2 text-left hover:bg-[#1C1444] flex items-center justify-between group transition"
                    >
                      <div className="flex items-center gap-2">
                        <Landmark className="w-3.5 h-3.5 text-[#FFE600]" />
                        <span className="font-arcade text-xs text-white group-hover:text-[#FFE600]">{st}</span>
                        <span className="text-[10px] text-[#A5B4FC]">({STATE_BOUNDING_BOXES[st]?.abbr})</span>
                      </div>
                      <span className="font-arcade text-[8px] text-[#00F0FF]">ZOOM STATE</span>
                    </button>
                  ))}
                  {searchResults.cities.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => {
                        handleSelectCity(c);
                        setSearchQuery('');
                      }}
                      className="w-full px-3.5 py-2 text-left hover:bg-[#1C1444] flex items-center justify-between group transition"
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[#39FF14]" />
                        <span className="font-bold text-xs text-white group-hover:text-[#39FF14]">{c.name}</span>
                        <span className="text-[10px] text-[#A5B4FC]">· {c.county} Co, {c.state}</span>
                      </div>
                      <span className="font-arcade text-[8px] text-[#39FF14]">INSPECT JURISDICTION</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Quick State Selector Dropdown */}
            <div className="flex items-center gap-2 text-xs">
              <span className="font-arcade text-[8px] text-[#A5B4FC] uppercase hidden sm:inline">SELECT STATE:</span>
              <select
                value={selectedState || ''}
                onChange={(e) => {
                  if (e.target.value) handleSelectState(e.target.value);
                  else setSelectedState(null);
                }}
                className="bg-[#130E2E] text-white border border-[#2D2264] rounded-lg px-2.5 py-1 text-xs focus:border-[#00F0FF] focus:outline-none font-mono"
              >
                <option value="">-- National Radar (50 States) --</option>
                {Object.keys(STATE_BOUNDING_BOXES).sort().map((st) => (
                  <option key={st} value={st}>
                    {st} ({STATE_BOUNDING_BOXES[st]?.abbr})
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </div>

      {/* ── 2. DUAL-PANE COCKPIT: TACTICAL MAP CANVAS & JURISDICTION DOSSIER ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Left Column: Interactive Vector Radar Canvas */}
        <div className="lg:col-span-7 xl:col-span-8 bg-[#080616] border-2 border-[#2D2264] hover:border-[#00F0FF]/60 rounded-2xl p-4 shadow-[0_0_25px_rgba(0,0,0,0.7)] relative overflow-hidden transition-colors">
          {/* Subtle Radar Grid Lines & HUD Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(#1E174D_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none opacity-40"></div>
          
          <div className="flex items-center justify-between border-b border-[#2D2264] pb-2 mb-3 relative z-10 text-[9px] font-arcade text-[#A5B4FC]">
            <div className="flex items-center gap-2">
              <Crosshair className="w-3.5 h-3.5 text-[#39FF14]" />
              <span>RADAR HUD: {selectedState ? `${selectedState.toUpperCase()} ACTIVE FOCUS` : 'US 50-STATE GRID'}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[#00F0FF]">VIEWBOX: {selectedState ? 'ZOOMED' : 'FULL'}</span>
              <span className="text-[#FFE600]">{visibleCities.length} CITY BEACONS</span>
            </div>
          </div>

          {/* SVG Canvas with Dynamic ViewBox Transition */}
          <div className="relative w-full aspect-[960/600] overflow-hidden rounded-xl bg-[#09061A]">
            <svg
              viewBox={activeViewBox}
              className="w-full h-full transition-all duration-700 ease-out select-none cursor-crosshair"
              style={{ filter: 'drop-shadow(0 0 10px rgba(0, 240, 255, 0.15))' }}
            >
              {/* State Polygons */}
              <g className="states-group">
                {Object.entries(US_STATE_PATHS).map(([stateName, pathData]) => {
                  const style = stateColorMap[stateName] || { fill: '#1A1438', stroke: '#3A2E70', strokeWidth: 0.8 };
                  const isCurrent = selectedState === stateName;
                  const isHovered = hoveredState === stateName;

                  return (
                    <path
                      key={stateName}
                      d={pathData}
                      fill={isCurrent ? '#211854' : isHovered ? '#2D1F6E' : style.fill}
                      stroke={isCurrent ? '#39FF14' : isHovered ? '#FFE600' : style.stroke}
                      strokeWidth={isCurrent ? 2.5 : isHovered ? 1.8 : style.strokeWidth}
                      className="transition-colors duration-200 cursor-pointer"
                      onClick={() => handleSelectState(stateName)}
                      onMouseEnter={() => setHoveredState(stateName)}
                      onMouseLeave={() => setHoveredState(null)}
                    >
                      <title>{stateName} ({STATE_BOUNDING_BOXES[stateName]?.abbr}) — Click to Zoom</title>
                    </path>
                  );
                })}
              </g>

              {/* State Abbreviation Centroid Labels (National View Only) */}
              {!selectedState && (
                <g className="pointer-events-none" fill="#A5B4FC" fontSize="10" fontFamily="JetBrains Mono, monospace" fontWeight="700" textAnchor="middle">
                  {Object.entries(US_STATE_CENTROIDS).map(([name, data]) => {
                    if (['DC', 'DE', 'RI', 'CT', 'NJ', 'MD', 'MA'].includes(data.abbr)) return null;
                    return (
                      <text key={name} x={data.x} y={data.y + 3} opacity={0.85}>
                        {data.abbr}
                      </text>
                    );
                  })}
                </g>
              )}

              {/* Interactive City Beacons (Pulsating Radar Nodes) */}
              <g className="city-beacons-group">
                {visibleCities.map((city) => {
                  const isCitySelected = selectedCity?.id === city.id;
                  const isCityHovered = hoveredCity?.id === city.id;

                  return (
                    <g
                      key={city.id}
                      className="cursor-pointer group"
                      onClick={(e) => handleSelectCity(city, e)}
                      onMouseEnter={() => setHoveredCity(city)}
                      onMouseLeave={() => setHoveredCity(null)}
                      transform={`translate(${city.x}, ${city.y})`}
                    >
                      {/* Pulsating Radar Ping */}
                      <circle
                        r={isCitySelected ? 12 : 7}
                        fill="none"
                        stroke={isCitySelected ? '#39FF14' : '#00F0FF'}
                        strokeWidth="1.5"
                        opacity={isCitySelected ? 0.9 : 0.6}
                        className={isCitySelected ? 'animate-ping' : ''}
                      />
                      
                      {/* Node Center Dot */}
                      <circle
                        r={isCitySelected ? 4.5 : 3}
                        fill={isCitySelected ? '#39FF14' : city.hasMayoral ? '#FFE600' : '#00F0FF'}
                        stroke="#FFFFFF"
                        strokeWidth="1"
                        className="shadow-[0_0_8px_rgba(57,255,20,0.8)]"
                      />

                      {/* City Name Label */}
                      <text
                        x={selectedState ? 8 : 6}
                        y={selectedState ? 3 : 3}
                        fill={isCitySelected ? '#39FF14' : '#FFFFFF'}
                        fontSize={selectedState ? 10 : 8}
                        fontFamily="monospace"
                        fontWeight="700"
                        className="pointer-events-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]"
                      >
                        {city.name}
                        {city.hasMayoral && ' ★'}
                      </text>
                    </g>
                  );
                })}
              </g>
            </svg>

            {/* Hover Tooltip Overlay */}
            {hoveredState && !selectedState && (
              <div className="absolute bottom-3 left-3 bg-[#100C2A]/90 backdrop-blur border border-[#00F0FF] px-3 py-1.5 rounded-lg text-xs shadow-[0_0_12px_rgba(0,240,255,0.4)] pointer-events-none z-20">
                <span className="font-arcade text-[9px] text-[#FFE600] uppercase block">
                  {hoveredState} ({STATE_BOUNDING_BOXES[hoveredState]?.abbr})
                </span>
                <span className="font-mono text-[10px] text-white">
                  {stateColorMap[hoveredState]?.label} · Click to Zoom Jurisdictions
                </span>
              </div>
            )}
          </div>

          {/* Interactive State Congressional Districts Chips Bar */}
          {selectedState && stateDistricts.length > 0 && (
            <div className="mt-3 pt-3 border-t border-[#2D2264] space-y-2">
              <div className="flex items-center justify-between text-[9px] font-arcade text-[#00F0FF]">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-3 h-3 text-[#FFE600]" />
                  <span>CONGRESSIONAL DISTRICT JURISDICTIONS ({stateDistricts.length} DISTRICTS):</span>
                </span>
                <span className="text-[#A5B4FC]">CLICK DISTRICT TO FILTER DOSSIER</span>
              </div>
              <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto pr-1">
                {stateDistricts.map((d) => {
                  const isDistrictSelected = selectedDistrict === d.id;
                  const hasNominees = d.candidates.some(c => c.status === 'nominee');

                  return (
                    <button
                      key={d.id}
                      onClick={() => {
                        setSelectedDistrict(isDistrictSelected ? null : d.id);
                        setSelectedCity(null);
                      }}
                      className={`px-2 py-1 rounded text-[8px] font-arcade transition border ${
                        isDistrictSelected
                          ? 'bg-[#FFE600] text-[#080616] border-white shadow-[0_0_8px_rgba(255,230,0,0.6)] font-bold'
                          : hasNominees
                          ? 'bg-[#1C1444] text-[#00F0FF] hover:bg-[#261C5C] border-[#00F0FF]/40'
                          : 'bg-[#120D2E] text-[#A5B4FC] hover:text-white border-[#2D2264]'
                      }`}
                    >
                      {d.office.replace('U.S. House (', '').replace(')', '')}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Jurisdiction Dossier Drawer / Cockpit */}
        <div className="lg:col-span-5 xl:col-span-4 bg-[#100C2A] border-2 border-[#2D2264] rounded-2xl p-4 shadow-[0_0_20px_rgba(0,0,0,0.7)] flex flex-col space-y-4">
          {/* Dossier Header */}
          <div className="border-b-2 border-[#2D2264] pb-3">
            <div className="flex items-center justify-between">
              <span className="font-arcade text-[8px] text-[#00F0FF] uppercase tracking-wider block">
                {selectedCity ? '★ MUNICIPAL JURISDICTION ★' : selectedDistrict ? '★ CONGRESSIONAL JURISDICTION ★' : '★ STATEWIDE JURISDICTION ★'}
              </span>
              <span className="font-arcade text-[8px] px-2 py-0.5 rounded bg-[#2D1B4E] text-[#FFE600] border border-[#FFE600]/60">
                {activeSubRaces.length} SUB-RACES
              </span>
            </div>

            <h2 className="font-arcade text-base sm:text-lg text-[#FFE600] arcade-text-glow-yellow mt-1">
              {selectedCity ? selectedCity.name : selectedDistrict ? selectedDistrict.toUpperCase() : selectedState || 'UNITED STATES'}
            </h2>
            <p className="text-xs font-crt text-[15px] text-[#A5B4FC] mt-0.5">
              {selectedCity
                ? `${selectedCity.county} County, ${selectedCity.state} · Pop: ${selectedCity.population.toLocaleString()}`
                : selectedState
                ? `Federal, Executive, Congressional, and Local Contests in ${selectedState}`
                : 'Click any state or city on the radar to inspect its jurisdiction races.'}
            </p>
          </div>

          {/* Sub-Races List */}
          <div className="space-y-3 overflow-y-auto max-h-[520px] pr-1">
            {activeSubRaces.length > 0 ? (
              activeSubRaces.map((sub) => {
                const nominees = sub.candidates.filter(c => c.status === 'nominee');

                return (
                  <div
                    key={sub.id}
                    className="p-3.5 rounded-xl bg-[#17113A] border border-[#3A2E70] hover:border-[#00F0FF] transition shadow-[0_2px_8px_rgba(0,0,0,0.4)] space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-2 border-b border-[#2D2264] pb-2">
                      <div>
                        <span className="font-arcade text-[7px] text-[#39FF14] uppercase block">
                          {sub.category} · {sub.jurisdictionLevel}
                        </span>
                        <h3 className="font-arcade text-xs text-white mt-0.5">
                          {sub.office}
                        </h3>
                      </div>
                      {sub.rating && (
                        <span className="font-arcade text-[7px] px-1.5 py-0.5 rounded bg-[#2A183C] text-[#FFE600] border border-[#FFE600]/50 whitespace-nowrap">
                          {sub.rating}
                        </span>
                      )}
                    </div>

                    {/* Candidates / Nominees */}
                    <div className="space-y-1.5 text-xs">
                      {sub.candidates.length > 0 ? (
                        sub.candidates.map((cand, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between bg-[#100C2A] px-2 py-1 rounded border border-[#2D2264]"
                          >
                            <span className="font-medium text-white flex items-center gap-1.5">
                              <span>{cand.name}</span>
                              {cand.isIncumbent && (
                                <span className="text-[9px] text-[#A5B4FC] font-normal">(Incumbent)</span>
                              )}
                            </span>
                            <span className={`font-arcade text-[7px] px-1.5 py-0.5 rounded border ${
                              cand.party === 'REP' ? 'bg-[#FF007F] text-white border-white' :
                              cand.party === 'DEM' ? 'bg-[#00F0FF] text-[#080616] border-white font-bold' :
                              cand.party === 'IND' ? 'bg-[#39FF14] text-[#080616] border-white font-bold' :
                              'bg-[#374151] text-white border-gray-400'
                            }`}>
                              {cand.party}
                            </span>
                          </div>
                        ))
                      ) : (
                        <div className="text-[11px] text-[#A5B4FC] italic">Nominee not yet sourced</div>
                      )}
                    </div>

                    {/* Polling Spread if available */}
                    {sub.pollSpread && (
                      <div className="text-[10px] bg-[#1E174D] text-[#39FF14] px-2 py-1 rounded border border-[#39FF14]/30 font-crt text-[14px]">
                        ★ POLLING AVERAGE: {sub.pollSpread}
                      </div>
                    )}

                    {/* Action & Source Link */}
                    <div className="flex items-center justify-between pt-1 text-[9px] font-arcade">
                      <span className="text-[#A5B4FC] font-mono text-[10px]">STATUS: {sub.status}</span>
                      {sub.sourceUrl && (
                        <a
                          href={sub.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#00F0FF] hover:text-[#FFE600] flex items-center gap-1 hover:underline"
                        >
                          <span>RECEIPT LINK</span>
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="p-6 rounded-xl bg-[#140E32] border border-[#2D2264] text-center space-y-3">
                <Crosshair className="w-8 h-8 text-[#00F0FF] mx-auto opacity-60" />
                <h4 className="font-arcade text-xs text-[#FFE600]">AWAITING JURISDICTION SELECTION</h4>
                <p className="text-xs font-crt text-[15px] text-[#A5B4FC]">
                  Select a state like <button onClick={() => handleSelectState('Texas')} className="text-[#00F0FF] underline">Texas</button>, <button onClick={() => handleSelectState('California')} className="text-[#00F0FF] underline">California</button>, or <button onClick={() => handleSelectState('Georgia')} className="text-[#00F0FF] underline">Georgia</button> on the radar map to inspect its municipal and congressional sub-races.
                </p>
              </div>
            )}
          </div>

          {/* Quick Hub Navigation inside State */}
          {selectedState && visibleCities.length > 0 && (
            <div className="pt-3 border-t border-[#2D2264] space-y-2">
              <span className="font-arcade text-[8px] text-[#00F0FF] block">
                {selectedState.toUpperCase()} MUNICIPAL HUBS ({visibleCities.length}):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {visibleCities.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleSelectCity(c)}
                    className={`px-2 py-1 rounded text-[8px] font-arcade transition border ${
                      selectedCity?.id === c.id
                        ? 'bg-[#39FF14] text-[#080616] border-white font-bold shadow-[0_0_8px_rgba(57,255,20,0.6)]'
                        : 'bg-[#181338] text-[#C7D2FE] hover:text-white border-[#3A2E70]'
                    }`}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
