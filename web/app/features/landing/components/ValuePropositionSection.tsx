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
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-50 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="inline-block text-purple-600 font-semibold text-sm tracking-wider uppercase mb-4">Role-Based Solutions</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Built for Every Role in
            <span className="block bg-gradient-to-r from-purple-main to-purple-dark bg-clip-text text-transparent">
              Concert Production
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Tailored tools and dashboards designed for each team member's unique needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          <RoleCard
            icon={Calendar}
            title="For Coordinators"
            subtitle="Centralized Concert Management"
            features={coordinatorFeatures}
            iconColor="text-purple-600"
            bgGradient="bg-gradient-to-br from-purple-50/80 to-blue-50/80"
            borderColor="border-purple-200/60"
            iconGradient="bg-gradient-to-br from-purple-500 to-blue-600"
          />
          <RoleCard
            icon={Wrench}
            title="For Technical Managers"
            subtitle="Precision Technical Planning"
            features={technicalManagerFeatures}
            iconColor="text-orange-600"
            bgGradient="bg-gradient-to-br from-orange-50/80 to-amber-50/80"
            borderColor="border-orange-200/60"
            iconGradient="bg-gradient-to-br from-orange-500 to-amber-600"
          />
          <RoleCard
            icon={DollarSign}
            title="For Budget Managers"
            subtitle="Smart Financial Control"
            features={budgetManagerFeatures}
            iconColor="text-green-600"
            bgGradient="bg-gradient-to-br from-green-50/80 to-emerald-50/80"
            borderColor="border-green-200/60"
            iconGradient="bg-gradient-to-br from-green-500 to-emerald-600"
          />
        </div>
      </div>
    </section>
  );
}

