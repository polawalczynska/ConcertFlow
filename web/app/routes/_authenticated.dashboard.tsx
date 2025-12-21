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

export default function CoordinatorDashboard() {
  const {user, userLoading, isCoordinator} = useCoordinatorAccess();
  const {data: artists = []} = useArtists();
  const {data: dashboardStats} = useDashboardStats();
  const concertForm = useConcertForm();
  
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

  // Use data from backend API
  const genreData = dashboardStats?.genreChartData ?? [];
  const concertsByMonthData = dashboardStats?.concertsByMonthChartData ?? [];
  const statusDistributionData = dashboardStats?.statusDistribution ?? [];
  const recentConcerts = dashboardStats?.recentConcerts ?? [];
  const alerts = dashboardStats?.alerts ?? [];
  const upcomingEvents = dashboardStats?.upcomingEvents ?? [];

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
          {recentConcerts.length > 0 && <RecentConcerts concerts={recentConcerts}/>}
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
