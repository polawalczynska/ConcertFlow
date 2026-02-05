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
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white/80 backdrop-blur-sm">
      {/* Section divider */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">Role-Based Solutions</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-3 mb-4">
            Built for Every Role in
            <br />
            <span className="bg-gradient-to-r from-purple-main to-purple-dark bg-clip-text text-transparent">Concert Production</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Whether you're coordinating events, managing budgets, or handling technical requirements,
            ConcertFlow adapts to your workflow.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <RoleCard
              icon={Calendar}
              title="For Coordinators"
              subtitle="Centralized Concert Management"
              features={coordinatorFeatures}
              iconColor="text-purple-600"
              bgGradient="bg-gradient-to-br from-purple-50 via-white to-blue-50"
              borderColor="border-purple-100/50"
              iconGradient="bg-gradient-to-br from-purple-500 to-blue-500"
            />
          </div>
          <div className="animate-fade-in md:-translate-y-4" style={{ animationDelay: '0.2s' }}>
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
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <RoleCard
              icon={DollarSign}
              title="For Budget Managers"
              subtitle="Smart Financial Control"
              features={budgetManagerFeatures}
              iconColor="text-green-600"
              bgGradient="bg-gradient-to-br from-green-50 via-white to-emerald-50"
              borderColor="border-green-100/50"
              iconGradient="bg-gradient-to-br from-green-500 to-emerald-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
