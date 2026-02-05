import { LandingNavigation } from "~/features/landing/components/LandingNavigation";
import { HeroSection } from "~/features/landing/components/HeroSection";
import { ValuePropositionSection } from "~/features/landing/components/ValuePropositionSection";
import { FeaturesSection } from "~/features/landing/components/FeaturesSection";
import { CTASection } from "~/features/landing/components/CTASection";
import { Footer } from "~/features/landing/components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50/30 to-white overflow-hidden">
      {/* Decorative background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-purple-200/20 via-purple-100/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-200/20 via-purple-100/10 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
        <div className="absolute top-1/2 left-1/2 w-[400px] h-[400px] bg-gradient-to-r from-purple-100/10 to-pink-100/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="relative">
        <LandingNavigation />
        <HeroSection />
        <ValuePropositionSection />
        <FeaturesSection />
        <CTASection />
        <Footer />
      </div>
    </div>
  );
}

