import Hero from "@/components/home/Hero";
import MatchCenter from "@/components/home/MatchCenter";
import NationsCupBanner from "@/components/home/NationsCupBanner";
import NewsSection from "@/components/home/NewsSection";
import PartnersSection from "@/components/home/PartnersSection";
import AchievementsSection from "@/components/home/AchievementsSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <div id="nations-cup">
        <NationsCupBanner />
      </div>
      <MatchCenter />
      <NewsSection />
      <AchievementsSection />
      <PartnersSection />
    </>
  );
}
