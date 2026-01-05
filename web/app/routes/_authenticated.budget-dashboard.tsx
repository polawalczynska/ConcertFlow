import { useBudgetManagerAccess } from "~/features/budget/hooks/useBudgetManagerAccess";
import { useBudgetManagerStats } from "~/features/budget/hooks";
import { BudgetDashboardHeader } from "~/features/budget/components/BudgetDashboardHeader";
import { BudgetStatisticsGrid } from "~/features/budget/components/statistics/BudgetStatisticsGrid";
import { BudgetChartsSection } from "~/features/budget/components/charts/BudgetChartsSection";
import { RecentActivity } from "~/features/budget/components/RecentActivity";
import { BudgetDashboardLoading } from "~/features/budget/components/BudgetDashboardLoading";
import { BudgetDashboardError } from "~/features/budget/components/BudgetDashboardError";
import { ErrorPage } from "~/components/ErrorPage";
import { mapBudgetDashboardData } from "~/features/budget/utils/mapBudgetDashboardData";

export default function BudgetManagerDashboard() {
  const { user, userLoading, isBudgetManager } = useBudgetManagerAccess();
  const { data: stats, isLoading: statsLoading } = useBudgetManagerStats();

  if (userLoading) {
    return null;
  }

  if (!user || !isBudgetManager) {
    return (
      <ErrorPage
        statusCode={403}
        title="Access Denied"
        message="You don't have permission to access this page. Budget Manager role is required."
        showHomeButton={true}
        showBackButton={true}
      />
    );
  }

  if (statsLoading) {
    return <BudgetDashboardLoading />;
  }

  if (!stats) {
    return <BudgetDashboardError />;
  }

  const { budgetsByMonth, statusDistribution, budgetCategories, recentActivity } = mapBudgetDashboardData(stats);

  return (
    <div className="p-6 lg:p-8 min-h-screen bg-bg-secondary">
      <BudgetDashboardHeader />
      <BudgetStatisticsGrid stats={stats} />
      <BudgetChartsSection
        budgetsByMonth={budgetsByMonth}
        statusDistribution={statusDistribution}
        budgetCategories={budgetCategories}
      />
      <RecentActivity activities={recentActivity} />
    </div>
  );
}

