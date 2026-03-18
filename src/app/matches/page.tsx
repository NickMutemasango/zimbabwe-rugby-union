import { findAll, type Fixture, type Result } from "@/lib/db";
import MatchesClient from "@/components/matches/MatchesClient";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const dynamic = "force-dynamic";

export default async function MatchesPage() {
  const fixtures = await findAll<Fixture>("fixtures");
  const results  = await findAll<Result>("results");
  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Breadcrumbs crumbs={[{ label: "Matches" }]} />
          <h1 className="text-5xl font-black text-[#0A1628] mt-4 mb-2">Match Centre</h1>
          <p className="text-gray-500">Fixtures, results and match reports for the Zimbabwe Sables.</p>
        </div>
        <MatchesClient fixtures={fixtures} results={results} />
      </div>
    </div>
  );
}
