import type { Metadata } from "next";
import LocalRacesExplorer from "@/components/LocalRacesExplorer";

export const metadata: Metadata = {
  title: "Local Races Directory — From Treasurer Down to Dog Catcher (Pop. ≥ 1,000) | BALLOT.WATCH",
  description: "Every single local office in the United States from city/county Treasurer down to town Dog Catcher for populations over 1,000 people. Named candidates, parties, statuses, and ballot issues.",
};

export default function LocalRacesPage() {
  return <LocalRacesExplorer />;
}
