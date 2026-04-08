import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { TEAMS_DATA } from "@/lib/teamsData";
import TeamDetailClient from "./TeamDetailClient";

type Params = { slug: string };

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const team = TEAMS_DATA[slug];
  if (!team) return { title: "Team Not Found | ZRU" };
  return {
    title: `${team.name} — ${team.nickname} | Zimbabwe Rugby Union`,
    description: team.description,
  };
}

export function generateStaticParams() {
  return Object.keys(TEAMS_DATA).map((slug) => ({ slug }));
}

export default async function TeamDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const team = TEAMS_DATA[slug];
  if (!team) notFound();
  return <TeamDetailClient team={team} />;
}
