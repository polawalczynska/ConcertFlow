import { LandingNavigation } from "~/features/landing/components/LandingNavigation";
import { HeroSection } from "~/features/landing/components/HeroSection";
import { ValuePropositionSection } from "~/features/landing/components/ValuePropositionSection";
import { FeaturesSection } from "~/features/landing/components/FeaturesSection";
import { CTASection } from "~/features/landing/components/CTASection";
import { Footer } from "~/features/landing/components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute top-1/4 -left-20 w-60 h-60 bg-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-purple-100/20 rounded-full blur-3xl" />
      </div>

      <LandingNavigation />
      <HeroSection />
      <ValuePropositionSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </div>
  );
}

