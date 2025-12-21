import { useConcerts } from "~/hooks/useConcerts";
import { useArtists } from "~/hooks/useArtists";
import { useDashboardStats } from "~/hooks/useDashboardStats";
import { useConcertForm } from "~/routes/_authenticated.concerts/hooks/useConcertForm";
import { ConcertFormDialog } from "~/routes/_authenticated.concerts/components/form/ConcertFormDialog";
import { DashboardHeader } from "./_authenticated.dashboard/components/DashboardHeader";
import { StatisticsGrid } from "./_authenticated.dashboard/components/statistics/StatisticsGrid";
import { ChartsSection } from "./_authenticated.dashboard/components/charts/ChartsSection";
import { RecentConcerts } from "./_authenticated.dashboard/components/RecentConcerts";
import { QuickActions } from "./_authenticated.dashboard/components/sidebar/QuickActions";
import { AlertsPanel } from "./_authenticated.dashboard/components/sidebar/AlertsPanel";
import { UpcomingEvents } from "./_authenticated.dashboard/components/sidebar/UpcomingEvents";
import { useCoordinatorAccess } from "./_authenticated.dashboard/hooks/useCoordinatorAccess";
import { useDashboardAlerts } from "./_authenticated.dashboard/hooks/useDashboardAlerts";
import { useDashboardEvents } from "./_authenticated.dashboard/hooks/useDashboardEvents";
import { useRecentConcerts, useStatusDistribution } from "./_authenticated.dashboard/hooks/useDashboardData";

export default function CoordinatorDashboard() {
  const {user, userLoading, isCoordinator} = useCoordinatorAccess();
  const {data: concerts = [], isLoading: concertsLoading} = useConcerts();
  const {data: artists = []} = useArtists();
  const {data: dashboardStats} = useDashboardStats();
  const concertForm = useConcertForm();

  const alerts = useDashboardAlerts(concerts);
  const upcomingEvents = useDashboardEvents(concerts);
  const recentConcerts = useRecentConcerts(concerts, artists);
  const statusDistributionData = useStatusDistribution(concerts);
  
  const pendingApprovals = dashboardStats?.concertsNeedingAttention ?? 0;

  const stats = dashboardStats ? {
    totalConcerts: dashboardStats.totalConcerts ?? 0,
    plannedConcerts: dashboardStats.plannedConcerts ?? 0,
    approvedConcerts: dashboardStats.approvedConcerts ?? 0,
    completedConcerts: dashboardStats.completedConcerts ?? 0,
    cancelledConcerts: dashboardStats.cancelledConcerts ?? 0,
    upcomingConcerts: dashboardStats.upcomingConcertsCount ?? 0,
  } : {
    totalConcerts: 0,
    plannedConcerts: 0,
    approvedConcerts: 0,
    completedConcerts: 0,
    cancelledConcerts: 0,
    upcomingConcerts: 0,
  };

  const genreData = dashboardStats?.genreStats?.map((genre, index) => {
    const colors = ["#8B5CF6", "#A78BFA", "#7C3AED", "#C4B5FD", "#6D28D9"];
    const total = dashboardStats.genreStats?.reduce((sum, g) => sum + (g.concertCount ?? 0), 0) ?? 1;
    const percentage = Math.round(((genre.concertCount ?? 0) / total) * 100);
    return {
      name: genre.genre ?? "Unknown",
      value: percentage,
      color: colors[index % colors.length],
    };
  }) ?? [];

  const concertsByMonthData = dashboardStats?.concertsByMonth?.map((item) => {
    const year = item.month?.year ?? 0;
    const monthValue = item.month?.monthValue ?? 1;
    const monthDate = new Date(year, monthValue - 1, 1);
    const monthName = monthDate.toLocaleDateString("en-US", { month: "short" });
    return {
      month: monthName,
      concertCount: item.concertCount ?? 0,
    };
  }) ?? [];

  if (userLoading || !user || !isCoordinator) {
    return null;
  }

  return (
    <div className="p-6 lg:p-8 min-h-screen bg-bg-secondary">
      <DashboardHeader/>
      <StatisticsGrid stats={stats}/>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <ChartsSection concertsByMonthData={concertsByMonthData} genreData={genreData} statusData={statusDistributionData}/>
          {!concertsLoading && recentConcerts.length > 0 && <RecentConcerts concerts={recentConcerts}/>}
        </div>
        <div className="space-y-6">
          <QuickActions onCreateConcert={concertForm.openCreateModal} pendingApprovals={pendingApprovals}/>
          {alerts.length > 0 && <AlertsPanel alerts={alerts}/>}
          {upcomingEvents.length > 0 && <UpcomingEvents events={upcomingEvents}/>}
        </div>
      </div>
      <ConcertFormDialog
        isOpen={concertForm.isFormOpen}
        onOpenChange={concertForm.closeForm}
        selectedConcert={concertForm.selectedConcert}
        formData={concertForm.formData}
        formErrors={concertForm.fieldErrors}
        generalError={concertForm.generalError}
        isSubmitting={concertForm.isSubmitting}
        onFormDataChange={concertForm.setFormData}
        onSubmit={concertForm.handleSubmit}
        artists={artists}
      />
    </div>
  );
}
