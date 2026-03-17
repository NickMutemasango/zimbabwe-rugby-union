import { readDb, type Player } from "@/lib/db";
import PlayerGrid from "@/components/players/PlayerGrid";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const dynamic = "force-dynamic";

export default function PlayersPage() {
  const players = readDb<Player>("players");
  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Breadcrumbs crumbs={[{ label: "The Sables" }, { label: "Player Profiles" }]} />
          <h1 className="text-5xl font-black text-[#0A1628] mt-4 mb-2">Player Profiles</h1>
          <p className="text-gray-500">Meet the warriors who wear the green and gold of Zimbabwe.</p>
        </div>
        {players.length === 0 ? (
          <div className="text-center py-20 text-gray-400">No players yet. Add some via the Admin Portal.</div>
        ) : (
          <PlayerGrid players={players} />
        )}
      </div>
    </div>
  );
}
