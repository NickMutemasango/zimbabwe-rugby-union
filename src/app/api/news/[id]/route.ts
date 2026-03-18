import { NextResponse } from 'next/server';
import { findById, updateDoc, deleteDoc, type NewsArticle } from '@/lib/db';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  try {
    const article = await findById<NewsArticle>('news', id);
    if (!article) return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    return NextResponse.json(article);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}

export async function PUT(request: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  try {
    const existing = await findById<NewsArticle>('news', id);
    if (!existing) return NextResponse.json({ error: 'Article not found' }, { status: 404 });

    const formData = await request.formData();
    const title    = (formData.get('title')    as string) || existing.title;
    const excerpt  = (formData.get('excerpt')  as string) || existing.excerpt;
    const content  = (formData.get('content')  as string) || existing.content;
    const category = (formData.get('category') as string) || existing.category;
    const date     = (formData.get('date')     as string) || existing.date;

    const updated = await updateDoc<NewsArticle>('news', id, { title, excerpt, content, category, date });
    return NextResponse.json(updated);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  try {
    const deleted = await deleteDoc('news', id);
    if (!deleted) return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}
