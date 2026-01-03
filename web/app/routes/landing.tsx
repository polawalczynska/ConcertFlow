import { LandingNavigation } from "./landing/components/LandingNavigation";
import { HeroSection } from "./landing/components/HeroSection";
import { ValuePropositionSection } from "./landing/components/ValuePropositionSection";
import { FeaturesSection } from "./landing/components/FeaturesSection";
import { CTASection } from "./landing/components/CTASection";
import { Footer } from "./landing/components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <LandingNavigation />
      <HeroSection />
      <ValuePropositionSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}

