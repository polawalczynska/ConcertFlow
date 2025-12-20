import { useConcerts } from "~/hooks/useConcerts";
import { useArtists } from "~/hooks/useArtists";
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
import { useDashboardStats } from "./_authenticated.dashboard/hooks/useDashboardStats";
import { useDashboardAlerts } from "./_authenticated.dashboard/hooks/useDashboardAlerts";
import { useDashboardEvents } from "./_authenticated.dashboard/hooks/useDashboardEvents";
import { useRecentConcerts, useStatusDistribution } from "./_authenticated.dashboard/hooks/useDashboardData";
import { genreData, revenueData } from "./_authenticated.dashboard/data/mockData";

export default function CoordinatorDashboard() {
  const {user, userLoading, isCoordinator} = useCoordinatorAccess();
  const {data: concerts = [], isLoading: concertsLoading} = useConcerts();
  const {data: artists = []} = useArtists();
  const concertForm = useConcertForm();

  const stats = useDashboardStats(concerts);
  const alerts = useDashboardAlerts(concerts);
  const upcomingEvents = useDashboardEvents(concerts);
  const recentConcerts = useRecentConcerts(concerts, artists);
  const statusDistributionData = useStatusDistribution(concerts);
  const pendingApprovals = concerts.filter((c) => c.status === "PLANNING").length;

  if (userLoading || !user || !isCoordinator) {
    return null;
  }

  return (
    <div className="p-6 lg:p-8 min-h-screen bg-bg-secondary">
      <DashboardHeader/>
      <StatisticsGrid stats={stats}/>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <ChartsSection revenueData={revenueData} genreData={genreData} statusData={statusDistributionData}/>
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
