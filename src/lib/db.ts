import clientPromise from './mongodb';

const DB_NAME = 'zru';

async function col(name: string) {
  const client = await clientPromise;
  return client.db(DB_NAME).collection(name);
}

/** Return all documents sorted newest-first, MongoDB _id stripped */
export async function findAll<T>(collection: string): Promise<T[]> {
  const c = await col(collection);
  return c
    .find({}, { projection: { _id: 0 } })
    .sort({ createdAt: -1 })
    .toArray() as unknown as T[];
}

/** Find a single document by our custom `id` field */
export async function findById<T>(
  collection: string,
  id: string
): Promise<T | null> {
  const c = await col(collection);
  return c.findOne({ id }, { projection: { _id: 0 } }) as unknown as T | null;
}

/** Insert a document */
export async function insertDoc<T extends Record<string, unknown>>(
  collection: string,
  doc: T
): Promise<T> {
  const c = await col(collection);
  await c.insertOne({ ...doc });
  return doc;
}

/** Partial update by custom `id` field — returns updated document */
export async function updateDoc<T>(
  collection: string,
  id: string,
  update: Partial<T>
): Promise<T | null> {
  const c = await col(collection);
  const result = await c.findOneAndUpdate(
    { id },
    { $set: update },
    { returnDocument: 'after', projection: { _id: 0 } }
  );
  return result as unknown as T | null;
}

/** Delete by custom `id` field — returns true if deleted */
export async function deleteDoc(
  collection: string,
  id: string
): Promise<boolean> {
  const c = await col(collection);
  const result = await c.deleteOne({ id });
  return result.deletedCount > 0;
}

/** Count documents in a collection */
export async function countDocs(collection: string): Promise<number> {
  const c = await col(collection);
  return c.countDocuments();
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

// ── Type Definitions ──────────────────────────────────────────────────────────

export interface Player {
  id: string;
  name: string;
  position: string;
  jerseyNumber: number;
  club: string;
  age: number;
  caps: number;
  points: number;
  profilePicture: string | null;
  createdAt: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  featuredImage: string | null;
  date: string;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  description: string;
  pdfUrl: string;
  thumbnailUrl: string | null;
  fileSize: string;
  date: string;
  createdAt: string;
}

export interface Fixture {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  competition: string;
  createdAt: string;
}

export interface Result {
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeScore: number;
  awayScore: number;
  date: string;
  venue: string;
  competition: string;
  report: string;
  createdAt: string;
}
