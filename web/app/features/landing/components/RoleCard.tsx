import { CheckCircle2, LucideIcon } from "lucide-react";

interface RoleCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  features: string[];
  iconColor: string;
  bgGradient: string;
  borderColor: string;
  iconGradient: string;
}

export function RoleCard({
  icon: Icon,
  title,
  subtitle,
  features,
  iconColor,
  bgGradient,
  borderColor,
  iconGradient,
}: RoleCardProps) {
  return (
    <div className={`group relative ${bgGradient} p-8 rounded-2xl border ${borderColor} hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-500 hover:-translate-y-2`}>
      {/* Shine effect on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 overflow-hidden pointer-events-none" />

      <div className={`w-16 h-16 ${iconGradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-2 tracking-tight">
        {title}
      </h3>
      <p className="text-lg font-medium text-slate-600 mb-6">
        {subtitle}
      </p>
      <ul className="space-y-4 text-slate-600">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 group/item">
            <div className="mt-0.5 flex-shrink-0">
              <CheckCircle2 className={`w-5 h-5 ${iconColor} group-hover/item:scale-110 transition-transform`} />
            </div>
            <span className="leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

