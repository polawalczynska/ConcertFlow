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
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <p className="text-purple-600 font-semibold text-sm uppercase tracking-wider mb-3">For Every Team Member</p>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Built for Every Role in Concert Production
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Tailored experiences for coordinators, technical managers, and budget teams
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
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

