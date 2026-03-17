// ── Client-side API helper ────────────────────────────────────────────────────
// All functions call our Next.js Route Handlers (app/api/*).
// Used in client components and admin forms.

import type { Player, NewsArticle, Article, Fixture, Result } from './db';

const BASE = '/api';

async function req<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(url, options);
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? 'Request failed');
  return json as T;
}

// ── News ──────────────────────────────────────────────────────────────────────
export const getNews = () => req<NewsArticle[]>(`${BASE}/news`);

export const createNews = (formData: FormData) =>
  req<NewsArticle>(`${BASE}/news`, { method: 'POST', body: formData });

// ── Fixtures ──────────────────────────────────────────────────────────────────
export const getFixtures = () => req<Fixture[]>(`${BASE}/fixtures`);

export const createFixture = (formData: FormData) =>
  req<Fixture>(`${BASE}/fixtures`, { method: 'POST', body: formData });

// ── Results ───────────────────────────────────────────────────────────────────
export const getResults = () => req<Result[]>(`${BASE}/results`);

export const createResult = (formData: FormData) =>
  req<Result>(`${BASE}/results`, { method: 'POST', body: formData });

// ── Articles (PDF) ────────────────────────────────────────────────────────────
export const getArticles = () => req<Article[]>(`${BASE}/articles`);

export const createArticle = (formData: FormData) =>
  req<Article>(`${BASE}/articles`, { method: 'POST', body: formData });

// ── Players ───────────────────────────────────────────────────────────────────
export const getPlayers = () => req<Player[]>(`${BASE}/players`);

export const createPlayer = (formData: FormData) =>
  req<Player>(`${BASE}/players`, { method: 'POST', body: formData });

export type { Player, NewsArticle, Article, Fixture, Result };
