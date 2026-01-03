import { useTechnicalManagerAccess } from "./_authenticated.technical-manager/hooks/useTechnicalManagerAccess";
import { TechnicalDashboardHeader } from "./_authenticated.technical-dashboard/components/TechnicalDashboardHeader";
import { TechnicalStatisticsGrid } from "./_authenticated.technical-dashboard/components/statistics/TechnicalStatisticsGrid";
import { TechnicalChartsSection } from "./_authenticated.technical-dashboard/components/charts/TechnicalChartsSection";
import { RecentActivity } from "./_authenticated.technical-dashboard/components/RecentActivity";
import { mapTechnicalDashboardData } from "./_authenticated.technical-dashboard/utils/mapTechnicalDashboardData";

const mockStats = {
  totalReviews: 12,
  pendingReview: 3,
  approved: 7,
  revisionRequested: 2,
  upcomingDeadlines: 4,
  approvedByMonth: [
    { month: "Jan", approvedCount: 2 },
    { month: "Feb", approvedCount: 3 },
    { month: "Mar", approvedCount: 1 },
    { month: "Apr", approvedCount: 2 },
    { month: "May", approvedCount: 3 },
    { month: "Jun", approvedCount: 1 },
  ],
  statusDistribution: [
    { name: "Pending", value: 1, color: "#FCD34D" },
    { name: "Submitted", value: 3, color: "#FCD34D" },
    { name: "Approved", value: 7, color: "#10B981" },
    { name: "Revision Requested", value: 2, color: "#EF4444" },
  ],
  technicalAreas: [
    { area: "Sound System", count: 5, color: "#8B5CF6" },
    { area: "Lighting", count: 4, color: "#10B981" },
    { area: "Stage Setup", count: 3, color: "#F59E0B" },
  ],
  recentActivity: [
    {
      concertName: "Summer Music Festival",
      artistName: "The Rock Band",
      technicalStatus: "APPROVED",
      lastUpdated: "Jan 2, 2026",
    },
    {
      concertName: "Jazz Night",
      artistName: "Smooth Jazz Quartet",
      technicalStatus: "SUBMITTED",
      lastUpdated: "Jan 1, 2026",
    },
    {
      concertName: "Rock Concert",
      artistName: "Electric Storm",
      technicalStatus: "REVISION_REQUESTED",
      lastUpdated: "Dec 31, 2025",
    },
  ],
};

export default function TechnicalManagerDashboard() {
  const { user, userLoading, isTechnicalManager } = useTechnicalManagerAccess();

  if (userLoading || !user || !isTechnicalManager) {
    return null;
  }

  const stats = mockStats;
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

