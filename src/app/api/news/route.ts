import { NextResponse } from 'next/server';
import { readDb, writeDb, generateId, type NewsArticle } from '@/lib/db';
import { saveUpload } from '@/lib/upload';

export async function GET() {
  const news = readDb<NewsArticle>('news');
  return NextResponse.json(news);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const title = formData.get('title') as string;
    const excerpt = (formData.get('excerpt') as string) ?? '';
    const content = (formData.get('content') as string) ?? '';
    const category = (formData.get('category') as string) ?? 'General';
    const date = (formData.get('date') as string) ?? new Date().toISOString().split('T')[0];
    const imageFile = formData.get('featuredImage') as File | null;

    if (!title) {
      return NextResponse.json({ error: 'title is required' }, { status: 400 });
    }

    let featuredImage: string | null = null;
    if (imageFile && imageFile.size > 0) {
      const upload = await saveUpload(imageFile, 'image');
      featuredImage = upload.url;
    }

    const article: NewsArticle = {
      id: generateId(),
      title,
      excerpt,
      content,
      category,
      featuredImage,
      date,
      createdAt: new Date().toISOString(),
    };

    const news = readDb<NewsArticle>('news');
    news.unshift(article);
    writeDb('news', news);

    return NextResponse.json(article, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
