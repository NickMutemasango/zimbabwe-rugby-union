import { NextResponse } from 'next/server';
import { findAll, insertDoc, generateId, type TeamFormEntry } from '@/lib/db';

export async function GET() {
  try {
    const entries = await findAll<TeamFormEntry>('team-form');
    return NextResponse.json(entries);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const teamSlug = formData.get('teamSlug') as string;
    const result   = formData.get('result')   as string;
    const opponent = formData.get('opponent') as string;
    const date     = formData.get('date')     as string;

    if (!teamSlug || !result || !opponent || !date) {
      return NextResponse.json({ error: 'teamSlug, result, opponent and date are required' }, { status: 400 });
    }
    if (!['W', 'L', 'D'].includes(result)) {
      return NextResponse.json({ error: 'result must be W, L, or D' }, { status: 400 });
    }

    const entry: TeamFormEntry = {
      id: generateId(),
      teamSlug,
      result: result as 'W' | 'L' | 'D',
      opponent,
      date,
      createdAt: new Date().toISOString(),
    };

    await insertDoc('team-form', entry as unknown as Record<string, unknown>);
    return NextResponse.json(entry, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}
