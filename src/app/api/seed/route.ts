/**
 * GET /api/seed
 *
 * Seeds the MongoDB database with initial ZRU data.
 * Safe to call multiple times — skips any collection that already has data.
 * In production this is protected by the SEED_SECRET env variable.
 */
import { NextResponse } from 'next/server';
import { countDocs, insertDoc } from '@/lib/db';

const PLAYERS = [
  { id:'p001', name:'Brendan Munyai',    position:'Fly-half',   jerseyNumber:10, club:'Old Hararians',       age:27, caps:42, points:312, profilePicture:null, createdAt:'2024-01-10T08:00:00.000Z' },
  { id:'p002', name:'Takudzwa Ngwenya',  position:'Wing',       jerseyNumber:11, club:'Harare Sports Club',  age:25, caps:28, points:140, profilePicture:null, createdAt:'2024-01-10T08:05:00.000Z' },
  { id:'p003', name:'Simba Nhiwatiwa',   position:'Prop',       jerseyNumber:1,  club:'Matabeleland Tuskers',age:29, caps:55, points:20,  profilePicture:null, createdAt:'2024-01-10T08:10:00.000Z' },
  { id:'p004', name:'Farai Mukondiwa',   position:'Number 8',   jerseyNumber:8,  club:'Old Hararians',       age:26, caps:34, points:65,  profilePicture:null, createdAt:'2024-01-10T08:15:00.000Z' },
  { id:'p005', name:'Kudzai Mashawi',    position:'Scrum-half', jerseyNumber:9,  club:'Harare Sports Club',  age:24, caps:19, points:45,  profilePicture:null, createdAt:'2024-01-10T08:20:00.000Z' },
];

const NEWS = [
  { id:'n001', title:'Sables Named for Rugby Africa Cup Qualifier', excerpt:'Zimbabwe head coach Brendan Dawson has announced a 30-man squad for the upcoming Rugby Africa Cup qualifier.', content:'Full article content here.', category:'Squad News',    featuredImage:null, date:'2025-11-15', createdAt:'2025-11-15T08:00:00.000Z' },
  { id:'n002', title:'ZRU Signs Partnership with National Bank',    excerpt:'The Zimbabwe Rugby Union has announced a landmark three-year sponsorship deal with First Capital Bank.',       content:'Full article content here.', category:'Partnership', featuredImage:null, date:'2025-10-02', createdAt:'2025-10-02T08:00:00.000Z' },
  { id:'n003', title:'Sables Claim Victory Over Kenya',             excerpt:'Zimbabwe delivered a dominant performance against Kenya in a pre-tournament friendly in Harare.',              content:'Full article content here.', category:'Match Report', featuredImage:null, date:'2025-09-20', createdAt:'2025-09-20T08:00:00.000Z' },
];

const ARTICLES = [
  { id:'a001', title:'ZRU Annual Report 2024',               description:'Official Zimbabwe Rugby Union annual report.',             pdfUrl:'',   thumbnailUrl:null, fileSize:'2.4 MB', date:'2025-03-01', createdAt:'2025-03-01T08:00:00.000Z' },
  { id:'a002', title:'Sables RWC 2027 Qualification Roadmap', description:'Strategic roadmap for Zimbabwe\'s World Cup campaign.',  pdfUrl:'',   thumbnailUrl:null, fileSize:'1.8 MB', date:'2025-01-15', createdAt:'2025-01-15T08:00:00.000Z' },
  { id:'a003', title:'Player Welfare & Anti-Doping Policy',  description:'ZRU player welfare and anti-doping guidelines 2025.',     pdfUrl:'',   thumbnailUrl:null, fileSize:'980 KB', date:'2025-01-01', createdAt:'2025-01-01T08:00:00.000Z' },
];

const FIXTURES = [
  { id:'f001', homeTeam:'Zimbabwe', awayTeam:'Namibia',      date:'2026-04-12', time:'15:00', venue:'Harare Sports Club',      competition:'Rugby Africa Cup 2026', createdAt:'2026-01-01T08:00:00.000Z' },
  { id:'f002', homeTeam:'Zimbabwe', awayTeam:'Uganda',       date:'2026-04-26', time:'15:00', venue:'Harare Sports Club',      competition:'Rugby Africa Cup 2026', createdAt:'2026-01-01T08:05:00.000Z' },
  { id:'f003', homeTeam:'Kenya',    awayTeam:'Zimbabwe',     date:'2026-05-10', time:'14:00', venue:'RFUEA Ground, Nairobi',   competition:'Rugby Africa Cup 2026', createdAt:'2026-01-01T08:10:00.000Z' },
];

const RESULTS = [
  { id:'r001', homeTeam:'Zimbabwe', awayTeam:'Uganda',  homeScore:31, awayScore:18, date:'2025-06-14', venue:'Harare Sports Club',    competition:'Rugby Africa Cup 2025', report:'Zimbabwe dominated the second half.',    createdAt:'2025-06-14T08:00:00.000Z' },
  { id:'r002', homeTeam:'Kenya',    awayTeam:'Zimbabwe',homeScore:22, awayScore:27, date:'2025-06-07', venue:'RFUEA Ground, Nairobi', competition:'Rugby Africa Cup 2025', report:'An away win for the Sables.',             createdAt:'2025-06-07T08:00:00.000Z' },
  { id:'r003', homeTeam:'Zimbabwe', awayTeam:'Namibia', homeScore:18, awayScore:24, date:'2025-05-31', venue:'Harare Sports Club',    competition:'Rugby Africa Cup 2025', report:'A narrow defeat in a tough encounter.',  createdAt:'2025-05-31T08:00:00.000Z' },
];

export async function GET(request: Request) {
  // In production require a secret token: GET /api/seed?secret=YOUR_SEED_SECRET
  if (process.env.NODE_ENV === 'production') {
    const secret = new URL(request.url).searchParams.get('secret');
    if (!secret || secret !== process.env.SEED_SECRET) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
  }

  const report: Record<string, string> = {};

  const seed = async (collection: string, docs: Record<string, unknown>[]) => {
    const count = await countDocs(collection);
    if (count > 0) {
      report[collection] = `skipped (${count} records already exist)`;
      return;
    }
    for (const doc of docs) {
      await insertDoc(collection, doc);
    }
    report[collection] = `seeded ${docs.length} records`;
  };

  await seed('players',  PLAYERS  as unknown as Record<string, unknown>[]);
  await seed('news',     NEWS     as unknown as Record<string, unknown>[]);
  await seed('articles', ARTICLES as unknown as Record<string, unknown>[]);
  await seed('fixtures', FIXTURES as unknown as Record<string, unknown>[]);
  await seed('results',  RESULTS  as unknown as Record<string, unknown>[]);

  return NextResponse.json({ success: true, report });
}
