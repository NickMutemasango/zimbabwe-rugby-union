import { NextResponse } from 'next/server';
import { findAll, insertDoc, generateId, type Result } from '@/lib/db';

export async function GET() {
  try {
    const results = await findAll<Result>('results');
    return NextResponse.json(results);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData    = await request.formData();
    const homeTeam    = formData.get('homeTeam')  as string;
    const awayTeam    = formData.get('awayTeam')  as string;
    const homeScore   = Number(formData.get('homeScore') ?? 0);
    const awayScore   = Number(formData.get('awayScore') ?? 0);
    const date        = formData.get('date')       as string;
    const venue       = (formData.get('venue')      as string) ?? '';
    const competition = (formData.get('competition') as string) ?? '';
    const report      = (formData.get('report')      as string) ?? '';

    if (!homeTeam || !awayTeam || !date) {
      return NextResponse.json({ error: 'homeTeam, awayTeam and date are required' }, { status: 400 });
    }

    const result: Result = {
      id: generateId(),
      homeTeam, awayTeam, homeScore, awayScore, date, venue, competition, report,
      createdAt: new Date().toISOString(),
    };

    await insertDoc('results', result as unknown as Record<string, unknown>);
    return NextResponse.json(result, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
