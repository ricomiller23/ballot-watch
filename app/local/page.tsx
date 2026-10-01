import { Suspense } from "react";
import type { Metadata } from "next";
import LocalRacesExplorer from "@/components/LocalRacesExplorer";

export const metadata: Metadata = {
  title: "Local Races Directory — From Treasurer Down to Dog Catcher (Pop. ≥ 1,000) | BALLOT.WATCH",
  description: "Exhaustive directory tracking local offices in the United States from city/county Treasurer down to town Dog Catcher for populations over 1,000 people. Zero synthetic data.",
};

export default function LocalRacesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-mono text-[#5B6779]">Loading Local Races Directory...</div>}>
      <LocalRacesExplorer />
    </Suspense>
  );
}
