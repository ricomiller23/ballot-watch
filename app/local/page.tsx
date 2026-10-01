import { Suspense } from "react";
import type { Metadata } from "next";
import LocalRacesExplorer from "@/components/LocalRacesExplorer";

export const metadata: Metadata = {
  title: "Local Races Directory — From Treasurer Down to Dog Catcher (Pop. ≥ 1,000) | BALLOT.WATCH",
  description: "Directory tracking local offices on the November 3, 2026 general election ballot.",
};

export default function LocalRacesPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs font-mono text-[#5B6779]">Loading Local Races Directory...</div>}>
      <LocalRacesExplorer />
    </Suspense>
  );
}
