import { Calendar, Wrench, DollarSign } from "lucide-react";
import { RoleCard } from "~/features/landing/components/RoleCard";

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
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-sm relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-200 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-purple-600 font-semibold text-sm tracking-wider uppercase mb-3">Role-Based Solutions</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Built for Every Role in
            <span className="block bg-gradient-to-r from-purple-main to-purple-dark bg-clip-text text-transparent">
              Concert Production
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Whether you're coordinating events, managing budgets, or handling technical requirements, ConcertFlow has you covered.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <RoleCard
            icon={Calendar}
            title="For Coordinators"
            subtitle="Centralized Concert Management"
            features={coordinatorFeatures}
            iconColor="text-purple-600"
            bgGradient="bg-gradient-to-br from-purple-50 to-blue-50"
            borderColor="border-purple-200/50"
            iconGradient="bg-gradient-to-br from-purple-500 to-blue-500"
          />
          <RoleCard
            icon={Wrench}
            title="For Technical Managers"
            subtitle="Precision Technical Planning"
            features={technicalManagerFeatures}
            iconColor="text-orange-600"
            bgGradient="bg-gradient-to-br from-orange-50 to-amber-50"
            borderColor="border-orange-200/50"
            iconGradient="bg-gradient-to-br from-orange-500 to-amber-500"
          />
          <RoleCard
            icon={DollarSign}
            title="For Budget Managers"
            subtitle="Smart Financial Control"
            features={budgetManagerFeatures}
            iconColor="text-green-600"
            bgGradient="bg-gradient-to-br from-green-50 to-emerald-50"
            borderColor="border-green-200/50"
            iconGradient="bg-gradient-to-br from-green-500 to-emerald-500"
          />
        </div>
      </div>
    </section>
  );
}

