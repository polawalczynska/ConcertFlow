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
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-white relative">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-50" />

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <span className="text-purple-600 font-semibold text-sm uppercase tracking-wider">For Every Role</span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mt-3 mb-4">
            Built for Every Role in Concert Production
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Whether you're coordinating events, managing budgets, or handling technical requirements,
            ConcertFlow has the tools you need.
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
              borderColor="border-purple-100"
              iconGradient="bg-gradient-to-br from-purple-500 to-blue-500"
            />
          </div>
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <RoleCard
              icon={Wrench}
              title="For Technical Managers"
              subtitle="Precision Technical Planning"
              features={technicalManagerFeatures}
              iconColor="text-orange-600"
              bgGradient="bg-gradient-to-br from-orange-50 via-white to-amber-50"
              borderColor="border-orange-100"
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
              borderColor="border-green-100"
              iconGradient="bg-gradient-to-br from-green-500 to-emerald-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
