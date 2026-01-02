import { useBudgetManagerAccess } from "./_authenticated.budget-manager/hooks/useBudgetManagerAccess";
import { useBudgetManagerStats } from "~/hooks/useBudgetManagerStats";
import { BudgetDashboardHeader } from "./_authenticated.budget-dashboard/components/BudgetDashboardHeader";
import { BudgetStatisticsGrid } from "./_authenticated.budget-dashboard/components/statistics/BudgetStatisticsGrid";
import { BudgetChartsSection } from "./_authenticated.budget-dashboard/components/charts/BudgetChartsSection";
import { RecentActivity } from "./_authenticated.budget-dashboard/components/RecentActivity";
import { BudgetDashboardLoading } from "./_authenticated.budget-dashboard/components/BudgetDashboardLoading";
import { BudgetDashboardError } from "./_authenticated.budget-dashboard/components/BudgetDashboardError";
import { mapBudgetDashboardData } from "./_authenticated.budget-dashboard/utils/mapBudgetDashboardData";

export default function BudgetManagerDashboard() {
  const { user, userLoading, isBudgetManager } = useBudgetManagerAccess();
  const { data: stats, isLoading: statsLoading } = useBudgetManagerStats();

  if (userLoading || !user || !isBudgetManager) {
    return null;
  }

  if (statsLoading) {
    return <BudgetDashboardLoading />;
  }

  if (!stats) {
    return <BudgetDashboardError />;
  }

  const { budgetsByMonth, statusDistribution, budgetCategories } = mapBudgetDashboardData(stats);

  return (
    <div className="p-6 lg:p-8 min-h-screen bg-bg-secondary">
      <BudgetDashboardHeader />
      <BudgetStatisticsGrid stats={stats} />
      <BudgetChartsSection
        budgetsByMonth={budgetsByMonth}
        statusDistribution={statusDistribution}
        budgetCategories={budgetCategories}
      />
      <RecentActivity />
    </div>
  );
}

