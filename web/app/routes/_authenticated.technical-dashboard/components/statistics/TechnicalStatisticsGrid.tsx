import { FileText, Clock, CheckCircle2, AlertCircle, CalendarIcon } from "lucide-react";
import { StatisticsCard } from "../../../_authenticated.dashboard/components/statistics/StatisticsCard";

interface TechnicalStatisticsGridProps {
  stats: {
    totalReviews: number;
    pendingReview: number;
    approved: number;
    revisionRequested: number;
    upcomingDeadlines: number;
  };
}

export function TechnicalStatisticsGrid({ stats }: TechnicalStatisticsGridProps) {
  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      <StatisticsCard
        title="Total Reviews"
        value={stats.totalReviews || 0}
        icon={FileText}
      />
      <StatisticsCard
        title="Pending Review"
        value={stats.pendingReview || 0}
        icon={Clock}
        color="yellow"
      />
      <StatisticsCard
        title="Approved"
        value={stats.approved || 0}
        icon={CheckCircle2}
        color="green"
      />
      <StatisticsCard
        title="Revision Requested"
        value={stats.revisionRequested || 0}
        icon={AlertCircle}
        color="red"
      />
      <StatisticsCard
        title="Upcoming Deadlines"
        value={stats.upcomingDeadlines || 0}
        icon={CalendarIcon}
        subtitle="Next 7 days"
      />
    </div>
  );
}

