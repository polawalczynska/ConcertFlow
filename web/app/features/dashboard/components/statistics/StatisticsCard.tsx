import type { LucideIcon } from "lucide-react";
import { Card, CardContent } from "~/components/ui/Card";
import { cn } from "~/shared/utils";

interface StatisticsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  subtitle?: string;
  color?: "pink" | "green" | "blue" | "yellow" | "red";
  format?: "default" | "number";
}

const colorClasses = {
  pink: "bg-pink-100 text-pink-600",
  green: "bg-green-100 text-green-600",
  blue: "bg-blue-100 text-blue-600",
  yellow: "bg-yellow-100 text-yellow-600",
  red: "bg-red-100 text-red-600",
};

export function StatisticsCard({
  title,
  value,
  icon: Icon,
  subtitle,
  color = "pink",
  format = "default",
}: StatisticsCardProps) {
  return (
    <Card className="border-0 shadow-sm transition-shadow hover:shadow-md">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className={cn("rounded-lg p-2", colorClasses[color])}>
            <Icon className="h-5 w-5" />
          </div>
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

