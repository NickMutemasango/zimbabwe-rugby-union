import { NextResponse } from 'next/server';
import { readDb, writeDb, type Player } from '@/lib/db';
import { saveUpload } from '@/lib/upload';

type RouteContext = { params: Promise<{ id: string }> };

// ── GET /api/players/:id ─────────────────────────────────────────────────────
export async function GET(_req: Request, ctx: RouteContext) {
  const { id } = await ctx.params;
  const players = readDb<Player>('players');
  const player = players.find((p) => p.id === id);

  if (!player) {
    return NextResponse.json({ error: 'Player not found' }, { status: 404 });
  }

  // Dev helper: log when fetched by ID
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[API] GET /api/players/${id} →`, {
      id: player.id,
      name: player.name,
      profilePicture: player.profilePicture ?? '(none)',
    });
  }

  return NextResponse.json(player);
}

// ── PUT /api/players/:id ─────────────────────────────────────────────────────
// Accepts multipart/form-data — all fields optional (partial update)
export async function PUT(request: Request, ctx: RouteContext) {
  const { id } = await ctx.params;
  const players = readDb<Player>('players');
  const index = players.findIndex((p) => p.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Player not found' }, { status: 404 });
  }

  try {
    const formData = await request.formData();

    const name        = (formData.get('name')         as string) || players[index].name;
    const position    = (formData.get('position')     as string) || players[index].position;
    const jerseyNumber = formData.get('jerseyNumber')
      ? Number(formData.get('jerseyNumber'))
      : players[index].jerseyNumber;
    const club   = (formData.get('club')   as string) ?? players[index].club;
    const age    = formData.get('age')    ? Number(formData.get('age'))    : players[index].age;
    const caps   = formData.get('caps')   ? Number(formData.get('caps'))   : players[index].caps;
    const points = formData.get('points') ? Number(formData.get('points')) : players[index].points;

    // Handle optional new photo upload
    let profilePicture = players[index].profilePicture;
    const imageFile = formData.get('profilePicture') as File | null;
    if (imageFile && imageFile.size > 0) {
      const upload = await saveUpload(imageFile, 'image');
      profilePicture = upload.url;
    }

    const updated: Player = {
      ...players[index],
      name,
      position,
      jerseyNumber,
      club,
      age,
      caps,
      points,
      profilePicture,
    };

    players[index] = updated;
    writeDb('players', players);

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[API] PUT /api/players/${id} → updated`, {
        id: updated.id,
        name: updated.name,
        profilePicture: updated.profilePicture ?? '(none)',
      });
    }

    return NextResponse.json(updated);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ── DELETE /api/players/:id ──────────────────────────────────────────────────
export async function DELETE(_req: Request, ctx: RouteContext) {
  const { id } = await ctx.params;
  const players = readDb<Player>('players');
  const filtered = players.filter((p) => p.id !== id);

  if (filtered.length === players.length) {
    return NextResponse.json({ error: 'Player not found' }, { status: 404 });
  }

  writeDb('players', filtered);
  console.log(`[API] DELETE /api/players/${id}`);
  return NextResponse.json({ success: true });
}
