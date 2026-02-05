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
  bgGradient,
  borderColor,
  iconGradient,
}: RoleCardProps) {
  return (
    <div className={`group ${bgGradient} p-8 rounded-3xl border ${borderColor} shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2`}>
      <div className={`w-16 h-16 ${iconGradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-2">
        {title}
      </h3>
      <p className="text-base font-medium text-slate-600 mb-6">
        {subtitle}
      </p>
      <ul className="space-y-4 text-slate-600">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 group/item">
            <div className={`w-5 h-5 rounded-full ${iconGradient} flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform`}>
              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-sm leading-relaxed">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

