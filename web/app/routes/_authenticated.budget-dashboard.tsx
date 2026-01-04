import { useBudgetManagerAccess } from "./_authenticated.budget-manager/hooks/useBudgetManagerAccess";
import { useBudgetManagerStats } from "~/hooks/useBudgetManagerStats";
import { BudgetDashboardHeader } from "./_authenticated.budget-dashboard/components/BudgetDashboardHeader";
import { BudgetStatisticsGrid } from "./_authenticated.budget-dashboard/components/statistics/BudgetStatisticsGrid";
import { BudgetChartsSection } from "./_authenticated.budget-dashboard/components/charts/BudgetChartsSection";
import { RecentActivity } from "./_authenticated.budget-dashboard/components/RecentActivity";
import { BudgetDashboardLoading } from "./_authenticated.budget-dashboard/components/BudgetDashboardLoading";
import { BudgetDashboardError } from "./_authenticated.budget-dashboard/components/BudgetDashboardError";
import { ErrorPage } from "~/components/ErrorPage";
import { mapBudgetDashboardData } from "./_authenticated.budget-dashboard/utils/mapBudgetDashboardData";

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

