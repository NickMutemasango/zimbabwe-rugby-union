import { NextResponse } from 'next/server';
import { findAll, insertDoc, generateId, type Achievement } from '@/lib/db';

export async function GET() {
  try {
    const entries = await findAll<Achievement>('achievements');
    return NextResponse.json(entries);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const teamSlug = formData.get('teamSlug') as string;
    const title    = formData.get('title')    as string;
    const year     = formData.get('year')     as string;
    const medal    = formData.get('medal')    as string;

    if (!teamSlug || !title || !year || !medal) {
      return NextResponse.json({ error: 'teamSlug, title, year and medal are required' }, { status: 400 });
    }
    if (!['gold', 'silver', 'bronze', 'milestone'].includes(medal)) {
      return NextResponse.json({ error: 'medal must be gold, silver, bronze, or milestone' }, { status: 400 });
    }

    const entry: Achievement = {
      id: generateId(),
      teamSlug,
      title,
      year,
      medal: medal as Achievement['medal'],
      createdAt: new Date().toISOString(),
    };

    await insertDoc('achievements', entry as unknown as Record<string, unknown>);
    return NextResponse.json(entry, { status: 201 });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}
