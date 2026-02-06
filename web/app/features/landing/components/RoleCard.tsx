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
    <div className={`group ${bgGradient} p-8 rounded-3xl border ${borderColor} hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-500 hover:-translate-y-2 relative overflow-hidden`}>
      {/* Decorative corner accent */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/40 to-transparent rounded-bl-full"></div>

      <div className={`w-16 h-16 ${iconGradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
        <Icon className="w-8 h-8 text-white" />
      </div>
      <h3 className="text-2xl font-bold text-slate-900 mb-2">
        {title}
      </h3>
      <p className="text-lg font-medium text-slate-600 mb-6">
        {subtitle}
      </p>
      <ul className="space-y-4 text-slate-600">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-3">
            <div className={`p-1 rounded-full ${iconColor.replace('text-', 'bg-')}/10`}>
              <CheckCircle2 className={`w-4 h-4 ${iconColor} flex-shrink-0`} />
            </div>
            <span className="leading-tight">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

