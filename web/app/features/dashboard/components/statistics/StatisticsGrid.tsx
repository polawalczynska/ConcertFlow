import { Music2, Clock, CheckCircle2, CalendarIcon } from "lucide-react";
import { StatisticsCard } from "./StatisticsCard";

interface StatisticsGridProps {
  stats: {
    totalConcerts: number;
    plannedConcerts: number;
    approvedConcerts: number;
    completedConcerts: number;
    cancelledConcerts: number;
    upcomingConcerts: number;
  };
}

export function StatisticsGrid({ stats }: StatisticsGridProps) {
  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <StatisticsCard
        title="Total Concerts"
        value={stats.totalConcerts}
        icon={Music2}
      />
      <StatisticsCard
        title="Planned"
        value={stats.plannedConcerts}
        icon={Clock}
        color="yellow"
      />
      <StatisticsCard
        title="Approved"
        value={stats.approvedConcerts}
        icon={CheckCircle2}
        color="green"
      />
      <StatisticsCard
        title="Completed"
        value={stats.completedConcerts}
        icon={CheckCircle2}
        color="blue"
      />
      <StatisticsCard
        title="Cancelled"
        value={stats.cancelledConcerts}
        icon={CheckCircle2}
        color="red"
      />
      <StatisticsCard
        title="Upcoming"
        value={stats.upcomingConcerts}
        icon={CalendarIcon}
        subtitle="Next 7 days"
      />
    </div>
  );
}

