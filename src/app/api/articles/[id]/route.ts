import { NextResponse } from 'next/server';
import { findById, updateDoc, deleteDoc, type Article } from '@/lib/db';
import { saveUpload, mimeToFileType } from '@/lib/upload';

type Ctx = { params: Promise<{ id: string }> };

export async function GET(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  try {
    const article = await findById<Article>('articles', id);
    if (!article) return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[API] GET /api/articles/${id} → pdfUrl:`, article.pdfUrl, '| fileSize:', article.fileSize);
    }
    return NextResponse.json(article);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}

export async function PUT(request: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  try {
    const existing = await findById<Article>('articles', id);
    if (!existing) return NextResponse.json({ error: 'Article not found' }, { status: 404 });

    const formData    = await request.formData();
    const title       = (formData.get('title')       as string) || existing.title;
    const description = (formData.get('description') as string) || existing.description;
    const date        = (formData.get('date')         as string) || existing.date;

    let pdfUrl   = existing.pdfUrl;
    let fileSize = existing.fileSize;
    let fileType = existing.fileType ?? 'pdf';
    const pdfFile = formData.get('pdf') as File | null;
    if (pdfFile && pdfFile.size > 0) {
      const upload = await saveUpload(pdfFile, 'pdf');
      pdfUrl   = upload.url;
      fileSize = upload.size;
      fileType = mimeToFileType(pdfFile.type);
    }

    const updated = await updateDoc<Article>('articles', id, { title, description, date, pdfUrl, fileSize, fileType });
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[API] PUT /api/articles/${id} → pdfUrl:`, updated?.pdfUrl);
    }
    return NextResponse.json(updated);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, ctx: Ctx) {
  const { id } = await ctx.params;
  try {
    const deleted = await deleteDoc('articles', id);
    if (!deleted) return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    if (process.env.NODE_ENV !== 'production') console.log(`[API] DELETE /api/articles/${id}`);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}
