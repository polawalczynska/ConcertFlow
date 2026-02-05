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
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-purple-100/30 via-transparent to-transparent rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-sm font-medium mb-4">
            For Every Team Member
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Built for Every Role in
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Concert Production
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Specialized tools and workflows tailored to each team member's unique needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <RoleCard
            icon={Calendar}
            title="For Coordinators"
            subtitle="Centralized Concert Management"
            features={coordinatorFeatures}
            iconColor="text-purple-600"
            bgGradient="bg-gradient-to-br from-purple-50 via-white to-indigo-50"
            borderColor="border-purple-200/60"
            iconGradient="bg-gradient-to-br from-purple-500 to-indigo-600"
            accentColor="purple"
          />
          <RoleCard
            icon={Wrench}
            title="For Technical Managers"
            subtitle="Precision Technical Planning"
            features={technicalManagerFeatures}
            iconColor="text-orange-600"
            bgGradient="bg-gradient-to-br from-orange-50 via-white to-amber-50"
            borderColor="border-orange-200/60"
            iconGradient="bg-gradient-to-br from-orange-500 to-amber-500"
            accentColor="orange"
          />
          <RoleCard
            icon={DollarSign}
            title="For Budget Managers"
            subtitle="Smart Financial Control"
            features={budgetManagerFeatures}
            iconColor="text-emerald-600"
            bgGradient="bg-gradient-to-br from-emerald-50 via-white to-teal-50"
            borderColor="border-emerald-200/60"
            iconGradient="bg-gradient-to-br from-emerald-500 to-teal-500"
            accentColor="emerald"
          />
        </div>
      </div>
    </section>
  );
}
