import fs from 'fs';
import path from 'path';

const DATA_DIR = path.join(process.cwd(), 'data');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export function readDb<T>(collection: string): T[] {
  const filePath = path.join(DATA_DIR, `${collection}.json`);
  if (!fs.existsSync(filePath)) return [];
  try {
    const raw = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

export function writeDb<T>(collection: string, data: T[]): void {
  const filePath = path.join(DATA_DIR, `${collection}.json`);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
}

// ── Type Definitions ─────────────────────────────────────────────────────────

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
