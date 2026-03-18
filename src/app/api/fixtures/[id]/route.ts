import { NextResponse } from 'next/server';
import { findById, updateDoc, deleteDoc, type Fixture } from '@/lib/db';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  try {
    const fixture = await findById<Fixture>('fixtures', id);
    if (!fixture) return NextResponse.json({ error: 'Fixture not found' }, { status: 404 });
    return NextResponse.json(fixture);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}

export async function PUT(request: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  try {
    const existing = await findById<Fixture>('fixtures', id);
    if (!existing) return NextResponse.json({ error: 'Fixture not found' }, { status: 404 });

    const formData    = await request.formData();
    const homeTeam    = (formData.get('homeTeam')    as string) || existing.homeTeam;
    const awayTeam    = (formData.get('awayTeam')    as string) || existing.awayTeam;
    const date        = (formData.get('date')         as string) || existing.date;
    const time        = (formData.get('time')         as string) || existing.time;
    const venue       = (formData.get('venue')        as string) || existing.venue;
    const competition = (formData.get('competition')  as string) || existing.competition;

    const updated = await updateDoc<Fixture>('fixtures', id, { homeTeam, awayTeam, date, time, venue, competition });
    return NextResponse.json(updated);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  try {
    const deleted = await deleteDoc('fixtures', id);
    if (!deleted) return NextResponse.json({ error: 'Fixture not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}
