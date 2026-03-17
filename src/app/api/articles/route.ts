import { NextResponse } from 'next/server';
import { readDb, writeDb, generateId, type Article } from '@/lib/db';
import { saveUpload } from '@/lib/upload';

export async function GET() {
  const articles = readDb<Article>('articles');
  return NextResponse.json(articles);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const description = (formData.get('description') as string) ?? '';
    const date = (formData.get('date') as string) ?? new Date().toISOString().split('T')[0];
    const pdfFile = formData.get('pdf') as File | null;

    if (!title) {
      return NextResponse.json({ error: 'title is required' }, { status: 400 });
    }
    if (!pdfFile || pdfFile.size === 0) {
      return NextResponse.json({ error: 'A PDF file is required' }, { status: 400 });
    }

    const upload = await saveUpload(pdfFile, 'pdf');

    const article: Article = {
      id: generateId(),
      title,
      description,
      pdfUrl: upload.url,
      thumbnailUrl: null,
      fileSize: upload.size,
      date,
      createdAt: new Date().toISOString(),
    };

    const articles = readDb<Article>('articles');
    articles.unshift(article);
    writeDb('articles', articles);

    return NextResponse.json(article, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
