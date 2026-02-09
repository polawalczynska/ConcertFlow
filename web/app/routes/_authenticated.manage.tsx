import { useState } from "react";
import { useConcerts } from "~/features/concerts/hooks";
import { useArtists } from "~/features/artists/hooks";
import { useBudgetManagers, useTechnicalManagers } from "~/shared/hooks/domain";
import type { GetAllConcertsStatusEnum } from "~/api";
import { AuthGuard } from "~/features/auth/components";
import { ConcertsHeader } from "~/features/concerts/components/ConcertsHeader";
import { ConcertsFilters } from "~/features/concerts/components/ConcertsFilters";
import { ConcertsTable } from "~/features/concerts/components/ConcertsTable";
import { ConcertsEmptyState } from "~/features/concerts/components/ConcertsEmptyState";
import { ConcertFormDialog } from "~/features/concerts/components/form/ConcertFormDialog";
import { DeleteConcertDialog } from "~/features/concerts/components/dialogs/DeleteConcertDialog";
import { CancelConcertDialog } from "~/features/concerts/components/dialogs/CancelConcertDialog";
import { SubmitBudgetDialog } from "~/features/concerts/components/dialogs/SubmitBudgetDialog";
import { useConcertForm } from "~/features/concerts/hooks/useConcertForm";
import { useConcertActions } from "~/features/concerts/hooks/useConcertActions";
import { useCoordinatorAccess } from "~/features/dashboard/hooks/useCoordinatorAccess";
import { ErrorPage } from "~/components/ErrorPage";

export default function ConcertsManagePage() {
  const { user, userLoading, isCoordinator, error: userError } = useCoordinatorAccess();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [artistIdFilter, setArtistIdFilter] = useState<string>("all");

  const statusEnum: GetAllConcertsStatusEnum | undefined =
    statusFilter === "all" ? undefined : (statusFilter as GetAllConcertsStatusEnum);
  const artistIdNum = artistIdFilter === "all" ? undefined : Number.parseInt(artistIdFilter);

  const { data: concerts = [], isLoading } = useConcerts(
    statusEnum,
    artistIdNum,
    undefined,
    searchQuery || undefined,
    0,
    100
  );
  const { data: artists = [] } = useArtists();
  const { data: budgetManagers = [] } = useBudgetManagers();
  const { data: technicalManagers = [] } = useTechnicalManagers();

  const concertForm = useConcertForm();
  const concertActions = useConcertActions();


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
            className="px-4 py-2 bg-pink-main text-white rounded-lg hover:bg-pink-main/90"
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (!isCoordinator) {
    return (
      <ErrorPage
        statusCode={403}
        title="Access Denied"
        message="You don't have permission to access this page. Coordinator role is required."
        showHomeButton={true}
        showBackButton={true}
      />
    );
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
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-pink-main border-t-transparent" />
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
          technicalManagers={technicalManagers}
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

