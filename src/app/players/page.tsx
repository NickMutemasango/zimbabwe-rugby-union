import { findAll, type Player } from "@/lib/db";
import PlayerGrid from "@/components/players/PlayerGrid";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export const dynamic = "force-dynamic";

export default async function PlayersPage() {
  const players = await findAll<Player>("players");
  return (
    <div className="min-h-screen bg-white pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Breadcrumbs crumbs={[{ label: "The Sables" }, { label: "Player Profiles" }]} />
          <h1 className="text-5xl font-black text-[#0A1628] mt-4 mb-2">Player Profiles</h1>
          <p className="text-gray-500">Meet the warriors who wear the green and gold of Zimbabwe.</p>
        </div>
        {players.length === 0 ? (
          <div className="text-center py-20">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">🏉</span>
            </div>
            <p className="text-gray-400 font-medium">No players yet.</p>
            <p className="text-gray-300 text-sm mt-1">
              Add squad members via the{" "}
              <a href="/admin/update" className="text-[#006B3F] underline underline-offset-2">Admin Portal</a>.
            </p>
          </div>
        ) : (
          <PlayerGrid players={players} editable={false} />
        )}
      </div>
    </div>
  );
}
