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
  accentColor?: 'purple' | 'orange' | 'emerald';
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
  accentColor = 'purple',
}: RoleCardProps) {
  const hoverShadow = {
    purple: 'hover:shadow-purple-200/50',
    orange: 'hover:shadow-orange-200/50',
    emerald: 'hover:shadow-emerald-200/50',
  }[accentColor];

  const checkColor = {
    purple: 'text-purple-500',
    orange: 'text-orange-500',
    emerald: 'text-emerald-500',
  }[accentColor];

  return (
    <div className={`group relative ${bgGradient} p-8 rounded-2xl border ${borderColor} shadow-sm hover:shadow-xl ${hoverShadow} transition-all duration-300 hover:-translate-y-1 overflow-hidden`}>
      {/* Decorative corner gradient */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-white/0 to-white/40 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative">
        <div className={`w-16 h-16 ${iconGradient} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>

        <h3 className="text-2xl font-bold text-slate-900 mb-2 group-hover:text-slate-800 transition-colors">
          {title}
        </h3>
        <p className="text-lg font-medium text-slate-600 mb-6">
          {subtitle}
        </p>

        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle2 className={`w-5 h-5 ${checkColor} mt-0.5 flex-shrink-0`} />
              <span className="text-slate-600">{feature}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Bottom accent line */}
      <div className={`absolute bottom-0 left-0 right-0 h-1 ${iconGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
    </div>
  );
}
