import { Calendar, Wrench, DollarSign, Users } from "lucide-react";
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
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-100/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-4">
            <Users className="w-4 h-4" />
            Role-Based Experience
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4">
            Built for{" "}
            <span className="bg-gradient-to-r from-red-600 via-orange-500 to-green-500 bg-clip-text text-transparent">
              Every Role
            </span>{" "}
            in Production
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Whether you're coordinating events, managing budgets, or handling technical requirements,
            ConcertFlow adapts to your needs
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          <RoleCard
            icon={Calendar}
            title="For Coordinators"
            subtitle="Centralized Concert Management"
            features={coordinatorFeatures}
            iconColor="text-red-600"
            bgGradient="bg-gradient-to-br from-red-50/80 to-rose-50/80"
            borderColor="border-red-200/60"
            iconGradient="bg-gradient-to-br from-red-500 to-rose-600"
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

