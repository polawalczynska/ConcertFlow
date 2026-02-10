import { Calendar, Wrench, DollarSign, ArrowRight } from "lucide-react";
import { RoleCard } from "~/features/landing/components/RoleCard";
import { Link } from "@remix-run/react";

export function ValuePropositionSection() {
  const coordinatorFeatures = [
    "Plan, budget, and schedule in one place",
    "Real-time collaboration with teams",
    "Automated approval workflows",
    "Comprehensive dashboard with analytics",
  ];

  const technicalManagerFeatures = [
    "Audio requirements management",
    "Lighting specifications tracking",
    "Safety compliance checklist",
    "Power requirements calculator",
  ];

  const budgetManagerFeatures = [
    "Real-time budget tracking",
    "Automated approval workflows",
    "Budget item categorization",
    "Analytics and insights dashboard",
  ];

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-slate-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-pink-600 font-semibold text-sm uppercase tracking-wider mb-4">
            Role-Based Solutions
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Built for Every Role in{" "}
            <span className="bg-gradient-to-r from-pink-main to-pink-dark bg-clip-text text-transparent">
              Concert Production
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Specialized tools and workflows designed for each team member's unique needs.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <RoleCard
            icon={Calendar}
            title="For Coordinators"
            subtitle="Centralized Concert Management"
            features={coordinatorFeatures}
            iconColor="text-pink-600"
            bgGradient="bg-gradient-to-br from-pink-50 to-blue-50"
            borderColor="border-pink-100"
            iconGradient="bg-gradient-to-r from-pink-500 to-blue-500"
          />
          <RoleCard
            icon={Wrench}
            title="For Technical Managers"
            subtitle="Precision Technical Planning"
            features={technicalManagerFeatures}
            iconColor="text-orange-600"
            bgGradient="bg-gradient-to-br from-orange-50 to-amber-50"
            borderColor="border-orange-100"
            iconGradient="bg-gradient-to-r from-orange-500 to-amber-500"
          />
          <RoleCard
            icon={DollarSign}
            title="For Budget Managers"
            subtitle="Smart Financial Control"
            features={budgetManagerFeatures}
            iconColor="text-green-600"
            bgGradient="bg-gradient-to-br from-green-50 to-emerald-50"
            borderColor="border-green-100"
            iconGradient="bg-gradient-to-r from-green-500 to-emerald-500"
          />
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-slate-600 mb-6">
            Find the perfect workflow for your role and start collaborating with your team today.
          </p>
          <Link
            to="/signup"
            className="group inline-flex items-center gap-2 text-pink-600 font-semibold hover:text-pink-700 transition-colors"
          >
            Explore all features
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}

