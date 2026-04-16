import { NextResponse } from 'next/server';
import { deleteDoc } from '@/lib/db';

type Ctx = { params: Promise<{ id: string }> };

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  try {
    const deleted = await deleteDoc('team-form', id);
    if (!deleted) return NextResponse.json({ error: 'Entry not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}
