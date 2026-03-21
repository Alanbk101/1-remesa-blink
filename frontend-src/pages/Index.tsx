import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import SolutionSection from "@/components/landing/SolutionSection";
import DemoSection from "@/components/landing/DemoSection";
import ArchitectureSection from "@/components/landing/ArchitectureSection";
import MarketSection from "@/components/landing/MarketSection";
import CompetitiveSection from "@/components/landing/CompetitiveSection";
import RoadmapSection from "@/components/landing/RoadmapSection";
import FooterSection from "@/components/landing/FooterSection";

const Index = () => {
  return (
    <main className="bg-background min-h-screen overflow-x-hidden">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <DemoSection />
      <ArchitectureSection />
      <MarketSection />
      <CompetitiveSection />
      <RoadmapSection />
      <FooterSection />
    </main>
  );
};

export default Index;
