import { useTechnicalManagerAccess } from "~/features/technical/hooks/useTechnicalManagerAccess";
import { useTechnicalManagerStats } from "~/features/technical/hooks";
import { TechnicalDashboardHeader } from "~/features/technical/components/TechnicalDashboardHeader";
import { TechnicalStatisticsGrid } from "~/features/technical/components/statistics/TechnicalStatisticsGrid";
import { TechnicalChartsSection } from "~/features/technical/components/charts/TechnicalChartsSection";
import { RecentActivity } from "~/features/technical/components/RecentActivity";
import { TechnicalDashboardLoading } from "~/features/technical/components/TechnicalDashboardLoading";
import { TechnicalDashboardError } from "~/features/technical/components/TechnicalDashboardError";
import { ErrorPage } from "~/components/ErrorPage";
import { mapTechnicalDashboardData } from "~/features/technical/utils/mapTechnicalDashboardData";

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

