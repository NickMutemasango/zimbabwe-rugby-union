// ─────────────────────────────────────────────────────────────────────────────
//  Central data source for all ZRU national squads.
//  cardImage  → optimised Unsplash URL used on the /teams card grid.
//  heroImage  → full-width URL used on the detail page header.
//  Replace both with actual match-day photography when available.
// ─────────────────────────────────────────────────────────────────────────────

export type Medal = "gold" | "silver" | "bronze" | "milestone" | "upcoming";

export interface TeamAchievement {
  year: string;
  title: string;
  description: string;
  medal: Medal;
}

export interface TeamData {
  slug: string;
  name: string;
  nickname: string;
  tagline: string;           // Short sentence used on the card overlay
  badgeText: string;
  description: string;
  accentColor: string;
  heroBgColor: string;       // CSS hex – gradient base on detail hero
  cardImage: string;         // Optimised image for the /teams card (w=800)
  heroImage: string | null;  // Full-width image for detail page (w=1920)
  coach: string;
  captain: string;
  recentForm: ("W" | "L" | "D")[];
  keyFacts: { label: string; value: string }[];
  history: string[];
  achievements: TeamAchievement[];
  matchTeamNames: string[];
  playerCount: string;
  founded: string;
}

export const TEAMS_DATA: Record<string, TeamData> = {

  // ── 1. The Sables — Men's XV ────────────────────────────────────────────────
  "mens-xv": {
    slug: "mens-xv",
    name: "The Sables",
    nickname: "Men's XV",
    tagline: "The pride of the nation. Zimbabwe's senior men's XV team.",
    badgeText: "SENIOR MEN",
    accentColor: "#006B3F",
    heroBgColor: "#006B3F",
    cardImage:
      "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=800&q=75",
    heroImage:
      "https://images.unsplash.com/photo-1566577739112-5180d4bf9390?auto=format&fit=crop&w=1920&q=80",
    description:
      "Zimbabwe's senior men's national rugby union team. Since their international debut in 1987, the Sables have carried the green and gold with pride on the world stage.",
    coach: "TBA",
    captain: "TBA",
    recentForm: ["W", "L", "W", "W", "L"],
    keyFacts: [
      { label: "World Cup Appearances", value: "3" },
      { label: "Africa Cup Titles", value: "1" },
      { label: "World Rugby Ranking", value: "Top 50" },
      { label: "Home Ground", value: "Harare Sports Club" },
    ],
    history: [
      "Zimbabwe Rugby Union's Men's XV, widely known as the Sables, first competed internationally in 1987 when they qualified for the inaugural Rugby World Cup in New Zealand and Australia. That historic campaign announced Zimbabwe as a genuine rugby nation on the global stage, with memorable performances that captured the imagination of a generation.",
      "The team went on to appear at two further Rugby World Cups — 1991 in the British Isles and 1995 on home African soil in South Africa — making them one of a handful of nations to feature in the first three editions of the tournament. These appearances forged a passionate rugby culture that endures to this day.",
      "Domestically and continentally, the Sables have long been a force in the Africa Cup, claiming the continental title in 2001 and consistently competing in Division 1A — the continent's top tier. The squad is built through the ZRU High Performance Programme, drawing on club rugby from across Zimbabwe.",
      "In 2026, the Sables earned a landmark invitation to the World Rugby Nations Cup, competing against Tonga, USA, and Canada across North American stadiums in July — a defining moment in the team's modern era and a springboard toward the Rugby World Cup 2027 in Australia.",
    ],
    achievements: [
      {
        year: "1987",
        title: "Inaugural Rugby World Cup",
        description: "Zimbabwe participated in the very first Rugby World Cup in New Zealand & Australia, becoming one of Africa's pioneering rugby nations.",
        medal: "gold",
      },
      {
        year: "1991",
        title: "Rugby World Cup — UK & Ireland",
        description: "The Sables qualified for a second consecutive Rugby World Cup, competing in England, Scotland, Ireland, Wales & France.",
        medal: "gold",
      },
      {
        year: "1995",
        title: "Rugby World Cup — South Africa",
        description: "A historic third consecutive Rugby World Cup appearance on African soil, cementing the Sables' legacy.",
        medal: "gold",
      },
      {
        year: "2001",
        title: "Africa Cup Champions",
        description: "Zimbabwe won the Africa Cup title, their greatest continental honour, standing as the best rugby nation on the continent.",
        medal: "gold",
      },
      {
        year: "2023",
        title: "Africa Cup Division 1A",
        description: "The Sables competed at the top tier of African rugby, showing renewed strength and determination.",
        medal: "silver",
      },
      {
        year: "2026",
        title: "World Rugby Nations Cup",
        description: "Zimbabwe earns a place in the World Rugby Nations Cup — facing Tonga, USA, and Canada in the Americas.",
        medal: "upcoming",
      },
    ],
    matchTeamNames: ["Zimbabwe"],
    playerCount: "15",
    founded: "1980",
  },

  // ── 2. Lady Sables — Women's XV ─────────────────────────────────────────────
  "womens-xv": {
    slug: "womens-xv",
    name: "Lady Sables",
    nickname: "Women's XV",
    tagline: "Breaking barriers and making history. Our senior women's XV team.",
    badgeText: "SENIOR WOMEN",
    accentColor: "#9333ea",
    heroBgColor: "#6b21a8",
    cardImage:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=800&q=75",
    heroImage:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?auto=format&fit=crop&w=1920&q=80",
    description:
      "The Lady Sables represent Zimbabwe in women's international rugby, competing in the Africa Women's Championship and inspiring a new generation of female athletes across the nation.",
    coach: "TBA",
    captain: "TBA",
    recentForm: ["W", "W", "L", "W", "W"],
    keyFacts: [
      { label: "Competition", value: "Africa Women's Champs" },
      { label: "Tier", value: "Senior International" },
      { label: "Governing Body", value: "ZRU / World Rugby" },
      { label: "Founded", value: "2001" },
    ],
    history: [
      "The Zimbabwe women's national rugby team — the Lady Sables — was formally established in 2001 and has since grown into one of the most determined programmes in African women's rugby. The team competes in the Rugby Africa Women's Championship, challenging the continent's elite sides year after year.",
      "The Lady Sables have been trailblazers in building participation at the grassroots level. Through ZRU school and club programmes, women's rugby has expanded significantly in Harare, Bulawayo, and beyond, creating a pipeline of talent that continues to strengthen the national team.",
      "The team's development mirrors a broader continental rise, with more countries investing in women's rugby ahead of the expanded Women's Rugby World Cup. The Lady Sables aim to qualify for future editions and establish Zimbabwe as a dominant force in African women's rugby.",
      "Off the pitch, the Lady Sables serve as role models for young women across Zimbabwe, demonstrating that dedication, teamwork, and discipline can open doors to international sport — a message ZRU continues to amplify through its outreach and development initiatives.",
    ],
    achievements: [
      {
        year: "2001",
        title: "Programme Founded",
        description: "The Zimbabwe women's national rugby programme was officially established by ZRU.",
        medal: "milestone",
      },
      {
        year: "2018",
        title: "Africa Women's Championship",
        description: "The Lady Sables competed at the Rugby Africa Women's Championship, reaching the knockout stages.",
        medal: "silver",
      },
      {
        year: "2022",
        title: "Africa Women's Championship — Division 1",
        description: "Zimbabwe secured a strong showing in Division 1 of the Africa Women's Championship.",
        medal: "silver",
      },
      {
        year: "2024",
        title: "ZRU Women's Elite League Champions",
        description: "Domestic competition reached record levels as the Lady Sables programme continued to grow.",
        medal: "gold",
      },
    ],
    matchTeamNames: ["Zimbabwe Women", "Zimbabwe"],
    playerCount: "15",
    founded: "2001",
  },

  // ── 3. Cheetahs — Men's Sevens ──────────────────────────────────────────────
  "cheetahs": {
    slug: "cheetahs",
    name: "Cheetahs",
    nickname: "Men's Sevens",
    tagline: "The national men's sevens team competing on the World Series circuit.",
    badgeText: "MEN'S SEVENS",
    accentColor: "#D4AF37",
    heroBgColor: "#92400e",
    cardImage:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=800&q=75",
    heroImage:
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&w=1920&q=80",
    description:
      "Fast, explosive, and electrifying. The Cheetahs bring African flair to the seven-a-side format, competing in continental and invitational tournaments worldwide.",
    coach: "TBA",
    captain: "TBA",
    recentForm: ["W", "W", "W", "L", "W"],
    keyFacts: [
      { label: "Format", value: "7-a-side" },
      { label: "Competition", value: "Africa Sevens Series" },
      { label: "Tournament Duration", value: "2 Days" },
      { label: "Founded", value: "1999" },
    ],
    history: [
      "Zimbabwe's Cheetahs have been one of Africa's most entertaining rugby sevens teams since the format's rise in popularity in the late 1990s. Known for explosive pace, offloading skills, and an instinctive attacking game, the Cheetahs embody the spirit of African rugby at its most exhilarating.",
      "The team competes in the Rugby Africa Sevens, the continental qualifier for the World Rugby Sevens Series, and regularly features in invitational tournaments across Africa. The sevens format has proven to be a powerful development tool — several of Zimbabwe's most dynamic XV players cut their international teeth in the sevens arena.",
      "ZRU's investment in the sevens programme has grown considerably in recent years, with dedicated conditioning camps and sevens-specific coaching. The aim is to qualify Zimbabwe for the HSBC World Rugby Sevens Series circuit, where they would compete against the world's best sevens nations.",
      "The connection between the Cheetahs and Sables programmes runs deep — shared fitness standards, complementary skill sets, and coordinated selection ensure the two squads reinforce each other.",
    ],
    achievements: [
      {
        year: "1999",
        title: "Programme Founded",
        description: "Zimbabwe officially established its national rugby sevens programme, competing in the continent's first structured sevens competitions.",
        medal: "milestone",
      },
      {
        year: "2009",
        title: "Africa Sevens Series — Winners",
        description: "The Cheetahs claimed a series title, confirming their status as one of the continent's premier sevens outfits.",
        medal: "gold",
      },
      {
        year: "2016",
        title: "Plate Winners — Africa Sevens",
        description: "The team claimed the Plate title at the Africa Sevens, showing competitive strength against top continental opposition.",
        medal: "bronze",
      },
      {
        year: "2023",
        title: "Africa Sevens — Quarter-Final",
        description: "Zimbabwe advanced to the knock-out stages of the Africa Sevens Series, competing at the highest continental level.",
        medal: "silver",
      },
    ],
    matchTeamNames: ["Zimbabwe Sevens", "Zimbabwe 7s", "Zimbabwe Cheetahs"],
    playerCount: "7",
    founded: "1999",
  },

  // ── 4. Junior Sables — U20 ──────────────────────────────────────────────────
  "junior-sables": {
    slug: "junior-sables",
    name: "Junior Sables",
    nickname: "U20 Men's XV",
    tagline: "The future is bright. Our U20 team, consistently one of the top sides in Africa.",
    badgeText: "UNDER 20",
    accentColor: "#3b82f6",
    heroBgColor: "#1d4ed8",
    cardImage:
      "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=800&q=75",
    heroImage:
      "https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&w=1920&q=80",
    description:
      "The Junior Sables are the future of Zimbabwean rugby. The U20 national team competes in the World Rugby U20 Trophy and Africa Under-20 Championship.",
    coach: "TBA",
    captain: "TBA",
    recentForm: ["W", "L", "W", "L", "W"],
    keyFacts: [
      { label: "Competition", value: "U20 Trophy / Africa U20" },
      { label: "Age Limit", value: "Under 20" },
      { label: "Programme", value: "High Performance" },
      { label: "Founded", value: "1995" },
    ],
    history: [
      "The Zimbabwe Under-20 programme, known as the Junior Sables, has served as the primary development pathway for the senior Sables squad since the mid-1990s. Many of the Sables' most capped players took their first international steps in the Junior programme, underscoring its vital role in the national set-up.",
      "The Junior Sables compete in the World Rugby U20 Trophy — the second tier of global Under-20 rugby — as well as the Rugby Africa U20 Championship. Their performances in these tournaments attract scouts from professional clubs in Europe and South Africa, accelerating the careers of Zimbabwe's brightest young talents.",
      "ZRU's High Performance Programme works directly with the Junior Sables coaching staff to apply sports science, video analysis, and conditioning methodologies that bring the squad in line with the best junior programmes in the world.",
      "In recent years, the Junior Sables have produced notable graduates who have gone on to represent the senior team at the Africa Cup and Nations Cup levels. The programme remains the cornerstone of ZRU's long-term strategy to qualify for and compete at the Rugby World Cup 2027.",
    ],
    achievements: [
      {
        year: "1995",
        title: "Programme Established",
        description: "Zimbabwe formalised its Under-20 national programme, creating a structured development pathway for the country's best young players.",
        medal: "milestone",
      },
      {
        year: "2012",
        title: "Africa U20 Championship — Runners Up",
        description: "The Junior Sables reached the final of the Africa Under-20 Championship, the highest continental finish in the programme's history.",
        medal: "silver",
      },
      {
        year: "2019",
        title: "World Rugby U20 Trophy — 4th Place",
        description: "A landmark result at the World Rugby U20 Trophy, finishing fourth in the global competition.",
        medal: "bronze",
      },
      {
        year: "2023",
        title: "Africa U20 Championship — Semi-Final",
        description: "The Junior Sables reached the semi-finals of the continental championship, showcasing the next generation of Sables talent.",
        medal: "silver",
      },
    ],
    matchTeamNames: ["Zimbabwe U20", "Zimbabwe Juniors", "Zimbabwe"],
    playerCount: "20",
    founded: "1995",
  },
};

export const TEAMS_LIST = Object.values(TEAMS_DATA);
