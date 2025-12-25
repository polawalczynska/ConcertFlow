import { useState } from "react";
import { useConcerts } from "~/hooks/useConcerts";
import { useArtists } from "~/hooks/useArtists";
import { useBudgetManagers } from "~/hooks/useBudgetManagers";
import type { GetAllConcertsStatusEnum } from "~/api";
import { AuthGuard } from "~/components/AuthGuard";
import { ConcertsHeader } from "~/routes/_authenticated.concerts/components/ConcertsHeader";
import { ConcertsFilters } from "~/routes/_authenticated.concerts/components/ConcertsFilters";
import { ConcertsTable } from "~/routes/_authenticated.concerts/components/ConcertsTable";
import { ConcertsEmptyState } from "~/routes/_authenticated.concerts/components/ConcertsEmptyState";
import { ConcertFormDialog } from "~/routes/_authenticated.concerts/components/form/ConcertFormDialog";
import { DeleteConcertDialog } from "~/routes/_authenticated.concerts/components/dialogs/DeleteConcertDialog";
import { CancelConcertDialog } from "~/routes/_authenticated.concerts/components/dialogs/CancelConcertDialog";
import { ViewConcertDialog } from "~/routes/_authenticated.concerts/components/dialogs/ViewConcertDialog";
import { SubmitBudgetDialog } from "~/routes/_authenticated.concerts/components/dialogs/SubmitBudgetDialog";
import { useConcertForm } from "~/routes/_authenticated.concerts/hooks/useConcertForm";
import { useConcertActions } from "~/routes/_authenticated.concerts/hooks/useConcertActions";
import { useCoordinatorAccess } from "~/routes/_authenticated.dashboard/hooks/useCoordinatorAccess";

export default function ConcertsManagePage() {
  const { user, userLoading, isCoordinator, error: userError } = useCoordinatorAccess();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [artistIdFilter, setArtistIdFilter] = useState<string>("all");

  const statusEnum: GetAllConcertsStatusEnum | undefined =
    statusFilter === "all" ? undefined : (statusFilter as GetAllConcertsStatusEnum);
  const artistIdNum = artistIdFilter === "all" ? undefined : Number.parseInt(artistIdFilter);

  const { data: concerts = [], isLoading, error: concertsError } = useConcerts(
    statusEnum,
    artistIdNum,
    undefined,
    searchQuery || undefined,
    0,
    100
  );
  const { data: artists = [], error: artistsError } = useArtists();
  const { data: budgetManagers = [], error: budgetManagersError } = useBudgetManagers();

  if (budgetManagersError) {
    console.error("Error loading budget managers:", budgetManagersError);
  }

  const concertForm = useConcertForm();
  const concertActions = useConcertActions();

  // Debug logging
  if (typeof window !== "undefined") {
    console.log("ConcertsManagePage state:", { userLoading, userError, user, isCoordinator });
  }

  if (userLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-text-secondary">Loading...</p>
      </div>
    );
  }

  if (userError || !user) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-text-secondary mb-2">Unable to load user information</p>
          <p className="text-sm text-text-secondary mb-4">
            {userError ? "Authentication error. Please try logging out and back in." : "Please try refreshing the page."}
          </p>
          <button
            onClick={() => window.location.href = "/login"}
            className="px-4 py-2 bg-purple-main text-white rounded-lg hover:bg-purple-main/90"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!isCoordinator) {
    // This should not be reached due to useCoordinatorAccess redirect,
    // but keeping as a safety check
    return null;
  }

  return (
    <AuthGuard>
      <div className="p-8 min-h-screen">
        <ConcertsHeader onAddConcert={concertForm.openCreateModal} />
        <ConcertsFilters
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          statusFilter={statusFilter}
          onStatusFilterChange={setStatusFilter}
          artistIdFilter={artistIdFilter}
          onArtistIdFilterChange={setArtistIdFilter}
          artists={artists}
        />
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-purple-main border-t-transparent" />
          </div>
        ) : concerts.length === 0 ? (
          <ConcertsEmptyState
            hasSearchQuery={!!searchQuery || statusFilter !== "all" || artistIdFilter !== "all"}
            onAddConcert={concertForm.openCreateModal}
          />
        ) : (
          <ConcertsTable
            concerts={concerts}
            onEdit={(concert) => {
              const updatedConcert = concerts.find((c) => c.id === concert.id) || concert;
              concertForm.openEditModal(updatedConcert);
            }}
            onDelete={concertActions.handleDelete}
            onView={concertActions.handleView}
            onCancel={concertActions.handleCancel}
          />
        )}
        <ConcertFormDialog
          isOpen={concertForm.isFormOpen}
          onOpenChange={(open) => {
            if (!open) {
              concertForm.closeForm();
            }
          }}
          selectedConcert={concertForm.selectedConcert}
          formData={concertForm.formData}
          formErrors={concertForm.fieldErrors}
          generalError={concertForm.generalError}
          isSubmitting={concertForm.isSubmitting}
          onFormDataChange={concertForm.setFormData}
          onSubmit={concertForm.handleSubmit}
          artists={artists}
          budgetManagers={budgetManagers}
        />
        <DeleteConcertDialog
          isOpen={concertActions.isDeleteDialogOpen}
          onOpenChange={concertActions.closeDeleteDialog}
          concert={concertActions.selectedConcert}
          isDeleting={concertActions.isDeleting}
          onConfirm={concertActions.confirmDelete}
        />
        <CancelConcertDialog
          isOpen={concertActions.isCancelDialogOpen}
          onOpenChange={concertActions.closeCancelDialog}
          concert={concertActions.selectedConcert}
          isCancelling={concertActions.isCancelling}
          onConfirm={concertActions.confirmCancel}
        />
        <ViewConcertDialog
          isOpen={concertActions.isViewDialogOpen}
          onOpenChange={concertActions.closeViewDialog}
          concert={concertActions.selectedConcert}
          onSubmitBudget={() => {
            if (concertActions.selectedConcert) {
              concertActions.handleSubmitBudget(concertActions.selectedConcert);
            }
          }}
        />
        <SubmitBudgetDialog
          isOpen={concertActions.isSubmitBudgetDialogOpen}
          onOpenChange={concertActions.closeSubmitBudgetDialog}
          concertName={concertActions.selectedConcert?.name || ""}
          onSubmit={concertActions.confirmSubmitBudget}
          isLoading={concertActions.isSubmittingBudget}
        />
      </div>
    </AuthGuard>
  );
}

