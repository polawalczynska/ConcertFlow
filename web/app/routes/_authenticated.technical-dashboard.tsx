import { useTechnicalManagerAccess } from "./_authenticated.technical-manager/hooks/useTechnicalManagerAccess";
import { useTechnicalManagerStats } from "~/hooks/useTechnicalManagerStats";
import { TechnicalDashboardHeader } from "./_authenticated.technical-dashboard/components/TechnicalDashboardHeader";
import { TechnicalStatisticsGrid } from "./_authenticated.technical-dashboard/components/statistics/TechnicalStatisticsGrid";
import { TechnicalChartsSection } from "./_authenticated.technical-dashboard/components/charts/TechnicalChartsSection";
import { RecentActivity } from "./_authenticated.technical-dashboard/components/RecentActivity";
import { TechnicalDashboardLoading } from "./_authenticated.technical-dashboard/components/TechnicalDashboardLoading";
import { TechnicalDashboardError } from "./_authenticated.technical-dashboard/components/TechnicalDashboardError";
import { ErrorPage } from "~/components/ErrorPage";
import { mapTechnicalDashboardData } from "./_authenticated.technical-dashboard/utils/mapTechnicalDashboardData";

export default function TechnicalManagerDashboard() {
  const { user, userLoading, isTechnicalManager } = useTechnicalManagerAccess();
  const { data: stats, isLoading: statsLoading } = useTechnicalManagerStats();

  if (userLoading) {
    return null;
  }

  if (!user || !isTechnicalManager) {
    return (
      <ErrorPage
        statusCode={403}
        title="Access Denied"
        message="You don't have permission to access this page. Technical Manager role is required."
        showHomeButton={true}
        showBackButton={true}
      />
    );
  }

  if (statsLoading) {
    return <TechnicalDashboardLoading />;
  }

  if (!stats) {
    return <TechnicalDashboardError />;
  }

  const { approvedByMonth, statusDistribution, technicalAreas, recentActivity } = mapTechnicalDashboardData(stats);

  return (
    <div className="p-6 lg:p-8 min-h-screen bg-bg-secondary">
      <TechnicalDashboardHeader />
      <TechnicalStatisticsGrid stats={stats} />
      <TechnicalChartsSection
        approvedByMonth={approvedByMonth}
        statusDistribution={statusDistribution}
        technicalAreas={technicalAreas}
      />
      <RecentActivity activities={recentActivity} />
    </div>
  );
}

