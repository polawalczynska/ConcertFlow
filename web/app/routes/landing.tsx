import { LandingNavigation } from "~/features/landing/components/LandingNavigation";
import { HeroSection } from "~/features/landing/components/HeroSection";
import { ValuePropositionSection } from "~/features/landing/components/ValuePropositionSection";
import { FeaturesSection } from "~/features/landing/components/FeaturesSection";
import { CTASection } from "~/features/landing/components/CTASection";
import { Footer } from "~/features/landing/components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 antialiased">
      <LandingNavigation />
      <main>
        <HeroSection />
        <ValuePropositionSection />
        <FeaturesSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}

