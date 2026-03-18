import { NextResponse } from 'next/server';
import { readDb, writeDb, type Article } from '@/lib/db';
import { saveUpload } from '@/lib/upload';

type RouteContext = { params: Promise<{ id: string }> };

// ── GET /api/articles/:id ────────────────────────────────────────────────────
export async function GET(_req: Request, ctx: RouteContext) {
  const { id } = await ctx.params;
  const articles = readDb<Article>('articles');
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[API] GET /api/articles/${id} →`, {
      id: article.id,
      title: article.title,
      pdfUrl: article.pdfUrl,
      fileSize: article.fileSize,
    });
  }

  return NextResponse.json(article);
}

// ── PUT /api/articles/:id ────────────────────────────────────────────────────
// Accepts multipart/form-data — all fields optional (partial update)
export async function PUT(request: Request, ctx: RouteContext) {
  const { id } = await ctx.params;
  const articles = readDb<Article>('articles');
  const index = articles.findIndex((a) => a.id === id);

  if (index === -1) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }

  try {
    const formData = await request.formData();

    const title       = (formData.get('title')       as string) || articles[index].title;
    const description = (formData.get('description') as string) || articles[index].description;
    const date        = (formData.get('date')         as string) || articles[index].date;

    // Handle optional new PDF upload
    let pdfUrl   = articles[index].pdfUrl;
    let fileSize = articles[index].fileSize;

    const pdfFile = formData.get('pdf') as File | null;
    if (pdfFile && pdfFile.size > 0) {
      const upload = await saveUpload(pdfFile, 'pdf');
      pdfUrl   = upload.url;
      fileSize = upload.size;
    }

    const updated: Article = {
      ...articles[index],
      title,
      description,
      date,
      pdfUrl,
      fileSize,
    };

    articles[index] = updated;
    writeDb('articles', articles);

    if (process.env.NODE_ENV !== 'production') {
      console.log(`[API] PUT /api/articles/${id} → updated`, {
        id: updated.id,
        title: updated.title,
        pdfUrl: updated.pdfUrl,
        fileSize: updated.fileSize,
      });
    }

    return NextResponse.json(updated);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// ── DELETE /api/articles/:id ─────────────────────────────────────────────────
export async function DELETE(_req: Request, ctx: RouteContext) {
  const { id } = await ctx.params;
  const articles = readDb<Article>('articles');
  const filtered = articles.filter((a) => a.id !== id);

  if (filtered.length === articles.length) {
    return NextResponse.json({ error: 'Article not found' }, { status: 404 });
  }

  writeDb('articles', filtered);
  console.log(`[API] DELETE /api/articles/${id}`);
  return NextResponse.json({ success: true });
}
