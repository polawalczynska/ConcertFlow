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
    <div className={`${bgGradient} p-8 rounded-2xl border ${borderColor} hover:shadow-xl transition-all`}>
      <div className={`w-16 h-16 ${iconGradient} rounded-xl flex items-center justify-center mb-6`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-4">
        {title}
      </h3>
      <p className="text-lg font-semibold text-slate-700 mb-4">
        {subtitle}
      </p>
      <ul className="space-y-3 text-slate-600">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <CheckCircle2 className={`w-5 h-5 ${iconColor} mt-0.5 flex-shrink-0`} />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

