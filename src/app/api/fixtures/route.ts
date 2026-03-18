import { NextResponse } from 'next/server';
import { findAll, insertDoc, generateId, type Fixture } from '@/lib/db';

export async function GET() {
  try {
    const fixtures = await findAll<Fixture>('fixtures');
    return NextResponse.json(fixtures);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData   = await request.formData();
    const homeTeam   = formData.get('homeTeam')   as string;
    const awayTeam   = formData.get('awayTeam')   as string;
    const date       = formData.get('date')        as string;
    const time       = (formData.get('time')        as string) ?? '15:00';
    const venue      = (formData.get('venue')       as string) ?? '';
    const competition = (formData.get('competition') as string) ?? '';

    if (!homeTeam || !awayTeam || !date) {
      return NextResponse.json({ error: 'homeTeam, awayTeam and date are required' }, { status: 400 });
    }

    const fixture: Fixture = {
      id: generateId(),
      homeTeam, awayTeam, date, time, venue, competition,
      createdAt: new Date().toISOString(),
    };

    await insertDoc('fixtures', fixture as unknown as Record<string, unknown>);
    return NextResponse.json(fixture, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
