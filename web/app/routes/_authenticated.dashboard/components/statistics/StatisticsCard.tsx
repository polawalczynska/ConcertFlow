import { TrendingUp, TrendingDown } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "~/components/ui/Card";
import { cn } from "~/lib/utils";

interface StatisticsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  trend?: number;
  trendUp?: boolean;
  subtitle?: string;
  color?: "purple" | "green" | "blue" | "yellow" | "red";
  format?: "default" | "number";
}

const colorClasses = {
  purple: "bg-purple-100 text-purple-600",
  green: "bg-green-100 text-green-600",
  blue: "bg-blue-100 text-blue-600",
  yellow: "bg-yellow-100 text-yellow-600",
  red: "bg-red-100 text-red-600",
};

export function StatisticsCard({
  title,
  value,
  icon: Icon,
  trend,
  trendUp,
  subtitle,
  color = "purple",
  format = "default",
}: StatisticsCardProps) {
  return (
    <Card className="border-0 shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className={cn("rounded-lg p-2", colorClasses[color])}>
            <Icon className="h-5 w-5" />
          </div>
          {trend !== undefined && (
            <div
              className={cn(
                "flex items-center gap-1 text-xs font-medium",
                trendUp ? "text-green-600" : "text-red-600"
              )}
            >
              {trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {Math.abs(trend)}%
            </div>
          )}
        </div>
        <div className="mt-3">
          <p className="text-2xl font-bold text-text-primary">
            {format === "number" ? value.toLocaleString() : value}
          </p>
          <p className="text-xs text-text-secondary">{title}</p>
          {subtitle && <p className="mt-1 text-xs text-text-secondary">{subtitle}</p>}
        </div>
      </CardContent>
    </Card>
  );
}

