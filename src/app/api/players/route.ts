import { NextResponse } from 'next/server';
import { findAll, insertDoc, generateId, type Player } from '@/lib/db';
import { saveUpload } from '@/lib/upload';

export async function GET() {
  try {
    const players = await findAll<Player>('players');
    return NextResponse.json(players);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData     = await request.formData();
    const name         = formData.get('name')          as string;
    const position     = formData.get('position')      as string;
    const jerseyNumber = Number(formData.get('jerseyNumber'));
    const club         = (formData.get('club')   as string) ?? '';
    const age          = Number(formData.get('age')    ?? 0);
    const caps         = Number(formData.get('caps')   ?? 0);
    const points       = Number(formData.get('points') ?? 0);
    const imageFile    = formData.get('profilePicture') as File | null;

    if (!name || !position || !jerseyNumber) {
      return NextResponse.json(
        { error: 'name, position and jerseyNumber are required' },
        { status: 400 }
      );
    }

    let profilePicture: string | null = null;
    if (imageFile && imageFile.size > 0) {
      const upload   = await saveUpload(imageFile, 'image');
      profilePicture = upload.url;
    }

    const player: Player = {
      id: generateId(),
      name, position, jerseyNumber, club, age, caps, points,
      profilePicture,
      createdAt: new Date().toISOString(),
    };

    await insertDoc('players', player as unknown as Record<string, unknown>);

    if (process.env.NODE_ENV !== 'production') {
      console.log('[API] POST /api/players →', player.id, player.name, '| photo:', player.profilePicture ?? '(none)');
    }

    return NextResponse.json(player, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error';
    console.error('[API] POST /api/players error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
