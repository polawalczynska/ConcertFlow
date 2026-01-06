import { FileText, Clock, CheckCircle2, AlertCircle, DollarSign, CalendarIcon } from "lucide-react";
import { StatisticsCard } from "~/features/dashboard/components/statistics/StatisticsCard";
import type { BudgetManagerStatsResponse } from "~/api";

interface BudgetStatisticsGridProps {
  stats: BudgetManagerStatsResponse;
}

export function BudgetStatisticsGrid({ stats }: BudgetStatisticsGridProps) {
  return (
    <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      <StatisticsCard
        title="Total Budgets"
        value={stats.totalBudgets || 0}
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
      <TotalAmountCard totalAmount={stats.totalAmount || 0} />
      <StatisticsCard
        title="Upcoming Deadlines"
        value={stats.upcomingDeadlines || 0}
        icon={CalendarIcon}
        subtitle="Next 7 days"
      />
    </div>
  );
}

interface TotalAmountCardProps {
  totalAmount: number;
}

function TotalAmountCard({ totalAmount }: TotalAmountCardProps) {
  return (
    <div className="border-0 shadow-sm transition-shadow hover:shadow-md bg-white rounded-lg">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="rounded-lg p-2 bg-blue-100 text-blue-600">
            <DollarSign className="h-5 w-5" />
          </div>
        </div>
        <div className="mt-3">
          <p className="text-2xl font-bold text-text-primary">
            ${totalAmount.toLocaleString()}
          </p>
          <p className="text-xs text-text-secondary">Total Amount</p>
        </div>
      </div>
    </div>
  );
}

