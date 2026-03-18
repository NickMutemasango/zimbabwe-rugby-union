import { NextResponse } from 'next/server';
import { findById, updateDoc, deleteDoc, type Result } from '@/lib/db';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  try {
    const result = await findById<Result>('results', id);
    if (!result) return NextResponse.json({ error: 'Result not found' }, { status: 404 });
    return NextResponse.json(result);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}

export async function PUT(request: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  try {
    const existing = await findById<Result>('results', id);
    if (!existing) return NextResponse.json({ error: 'Result not found' }, { status: 404 });

    const formData    = await request.formData();
    const homeTeam    = (formData.get('homeTeam')    as string) || existing.homeTeam;
    const awayTeam    = (formData.get('awayTeam')    as string) || existing.awayTeam;
    const homeScore   = formData.get('homeScore') ? Number(formData.get('homeScore')) : existing.homeScore;
    const awayScore   = formData.get('awayScore') ? Number(formData.get('awayScore')) : existing.awayScore;
    const date        = (formData.get('date')         as string) || existing.date;
    const venue       = (formData.get('venue')        as string) || existing.venue;
    const competition = (formData.get('competition')  as string) || existing.competition;
    const report      = (formData.get('report')       as string) || existing.report;

    const updated = await updateDoc<Result>('results', id, { homeTeam, awayTeam, homeScore, awayScore, date, venue, competition, report });
    return NextResponse.json(updated);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  try {
    const deleted = await deleteDoc('results', id);
    if (!deleted) return NextResponse.json({ error: 'Result not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}
