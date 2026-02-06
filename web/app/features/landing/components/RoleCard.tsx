import { CheckCircle2, LucideIcon, ArrowRight } from "lucide-react";

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
    <div className={`group relative ${bgGradient} p-8 rounded-2xl border ${borderColor} hover:shadow-2xl hover:shadow-slate-200/50 transition-all duration-300 hover:-translate-y-2 backdrop-blur-sm`}>
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-24 h-24 overflow-hidden rounded-tr-2xl">
        <div className={`absolute top-0 right-0 w-32 h-32 ${iconGradient} opacity-10 transform rotate-45 translate-x-16 -translate-y-16 group-hover:translate-x-14 group-hover:-translate-y-14 transition-transform duration-300`} />
      </div>

      <div className={`w-16 h-16 ${iconGradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <Icon className="w-8 h-8 text-white" />
      </div>

      <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-slate-800 transition-colors">
        {title}
      </h3>
      <p className="text-lg font-semibold text-slate-600 mb-6">
        {subtitle}
      </p>

      <ul className="space-y-4 text-slate-600 mb-6">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3 group/item">
            <div className={`flex-shrink-0 w-6 h-6 rounded-full ${iconGradient} flex items-center justify-center mt-0.5`}>
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
            <span className="group-hover/item:text-slate-700 transition-colors">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Learn more link */}
      <div className={`flex items-center gap-1 ${iconColor} font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300`}>
        <span className="text-sm">Learn more</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}

