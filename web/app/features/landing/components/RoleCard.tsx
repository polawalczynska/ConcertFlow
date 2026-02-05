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
    <div className={`${bgGradient} p-8 rounded-2xl border ${borderColor} hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group`}>
      <div className={`w-16 h-16 ${iconGradient} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-2">
        {title}
      </h3>
      <p className="text-lg font-semibold text-slate-600 mb-6">
        {subtitle}
      </p>
      <ul className="space-y-4 text-slate-600">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <CheckCircle2 className={`w-5 h-5 ${iconColor} mt-0.5 flex-shrink-0`} />
            <span className="text-slate-700">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
