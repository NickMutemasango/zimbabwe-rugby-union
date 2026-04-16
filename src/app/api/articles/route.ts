import { NextResponse } from 'next/server';
import { findAll, insertDoc, generateId, type Article } from '@/lib/db';
import { saveUpload, mimeToFileType } from '@/lib/upload';

export async function GET() {
  try {
    const articles = await findAll<Article>('articles');
    return NextResponse.json(articles);
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : 'Server error' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData    = await request.formData();
    const title       = formData.get('title')       as string;
    const description = (formData.get('description') as string) ?? '';
    const date        = (formData.get('date')         as string) ?? new Date().toISOString().split('T')[0];
    const pdfFile     = formData.get('pdf')           as File | null;

    if (!title) return NextResponse.json({ error: 'title is required' }, { status: 400 });
    if (!pdfFile || pdfFile.size === 0) return NextResponse.json({ error: 'A document file is required' }, { status: 400 });

    const upload = await saveUpload(pdfFile, 'pdf');

    const article: Article = {
      id: generateId(),
      title, description, date,
      pdfUrl: upload.url,
      thumbnailUrl: null,
      fileSize: upload.size,
      fileType: mimeToFileType(pdfFile.type),
      createdAt: new Date().toISOString(),
    };

    await insertDoc('articles', article as unknown as Record<string, unknown>);
    if (process.env.NODE_ENV !== 'production') {
      console.log('[API] POST /api/articles →', article.id, article.title, '| pdf:', article.pdfUrl);
    }
    return NextResponse.json(article, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error';
    console.error('[API] POST /api/articles error:', message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
