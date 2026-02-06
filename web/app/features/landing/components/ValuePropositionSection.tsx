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
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-purple-100/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-0 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-purple-600 font-semibold text-sm uppercase tracking-wider mb-4">For Everyone</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Built for Every Role in
            <span className="block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Concert Production
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Tailored experiences for coordinators, technical managers, and budget teams
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          <RoleCard
            icon={Calendar}
            title="For Coordinators"
            subtitle="Centralized Concert Management"
            features={coordinatorFeatures}
            iconColor="text-purple-600"
            bgGradient="bg-gradient-to-br from-purple-50 via-white to-blue-50"
            borderColor="border-purple-100/50"
            iconGradient="bg-gradient-to-br from-purple-500 to-indigo-600"
          />
          <RoleCard
            icon={Wrench}
            title="For Technical Managers"
            subtitle="Precision Technical Planning"
            features={technicalManagerFeatures}
            iconColor="text-orange-600"
            bgGradient="bg-gradient-to-br from-orange-50 via-white to-amber-50"
            borderColor="border-orange-100/50"
            iconGradient="bg-gradient-to-br from-orange-500 to-amber-500"
          />
          <RoleCard
            icon={DollarSign}
            title="For Budget Managers"
            subtitle="Smart Financial Control"
            features={budgetManagerFeatures}
            iconColor="text-emerald-600"
            bgGradient="bg-gradient-to-br from-emerald-50 via-white to-teal-50"
            borderColor="border-emerald-100/50"
            iconGradient="bg-gradient-to-br from-emerald-500 to-teal-500"
          />
        </div>
      </div>
    </section>
  );
}

