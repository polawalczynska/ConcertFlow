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
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white via-slate-50/50 to-white overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-100/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Users className="w-4 h-4" />
            <span>Role-Based Access</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Built for Every Role in{" "}
            <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text text-transparent">
              Concert Production
            </span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Tailored experiences for every team member, from coordinators to technical staff.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
          <RoleCard
            icon={Calendar}
            title="For Coordinators"
            subtitle="Centralized Concert Management"
            features={coordinatorFeatures}
            iconColor="text-purple-600"
            bgGradient="bg-gradient-to-br from-purple-50 via-white to-blue-50"
            borderColor="border-purple-200/50"
            iconGradient="bg-gradient-to-br from-purple-500 to-blue-500"
          />
          <RoleCard
            icon={Wrench}
            title="For Technical Managers"
            subtitle="Precision Technical Planning"
            features={technicalManagerFeatures}
            iconColor="text-orange-600"
            bgGradient="bg-gradient-to-br from-orange-50 via-white to-amber-50"
            borderColor="border-orange-200/50"
            iconGradient="bg-gradient-to-br from-orange-500 to-amber-500"
          />
          <RoleCard
            icon={DollarSign}
            title="For Budget Managers"
            subtitle="Smart Financial Control"
            features={budgetManagerFeatures}
            iconColor="text-green-600"
            bgGradient="bg-gradient-to-br from-green-50 via-white to-emerald-50"
            borderColor="border-green-200/50"
            iconGradient="bg-gradient-to-br from-green-500 to-emerald-500"
          />
        </div>
      </div>
    </section>
  );
}

