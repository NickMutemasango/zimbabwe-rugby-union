import { NextResponse } from 'next/server';
import { findById, updateDoc, deleteDoc, type Player } from '@/lib/db';
import { saveUpload } from '@/lib/upload';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  try {
    const player = await findById<Player>('players', id);
    if (!player) return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[API] GET /api/players/${id} → name:`, player.name, '| photo:', player.profilePicture ?? '(none)');
    }
    return NextResponse.json(player);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}

export async function PUT(request: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  try {
    const existing = await findById<Player>('players', id);
    if (!existing) return NextResponse.json({ error: 'Player not found' }, { status: 404 });

    const formData     = await request.formData();
    const name         = (formData.get('name')         as string) || existing.name;
    const position     = (formData.get('position')     as string) || existing.position;
    const jerseyNumber = formData.get('jerseyNumber') ? Number(formData.get('jerseyNumber')) : existing.jerseyNumber;
    const club         = (formData.get('club')   as string) ?? existing.club;
    const age          = formData.get('age')    ? Number(formData.get('age'))    : existing.age;
    const caps         = formData.get('caps')   ? Number(formData.get('caps'))   : existing.caps;
    const points       = formData.get('points') ? Number(formData.get('points')) : existing.points;

    let profilePicture = existing.profilePicture;
    const imageFile    = formData.get('profilePicture') as File | null;
    if (imageFile && imageFile.size > 0) {
      const upload   = await saveUpload(imageFile, 'image');
      profilePicture = upload.url;
    }

    const updated = await updateDoc<Player>('players', id, {
      name, position, jerseyNumber, club, age, caps, points, profilePicture,
    });

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[API] PUT /api/players/${id} → photo:`, updated?.profilePicture ?? '(none)');
    }

    return NextResponse.json(updated);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error';
    console.error(`[API] PUT /api/players/${id} error:`, message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  try {
    const deleted = await deleteDoc('players', id);
    if (!deleted) return NextResponse.json({ error: 'Player not found' }, { status: 404 });
    if (process.env.NODE_ENV !== 'production') console.log(`[API] DELETE /api/players/${id}`);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}
