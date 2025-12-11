import { useState } from "react";
import { useConcerts } from "~/hooks/useConcerts";
import { useArtists } from "~/hooks/useArtists";
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
import { useConcertForm } from "~/routes/_authenticated.concerts/hooks/useConcertForm";
import { useConcertActions } from "~/routes/_authenticated.concerts/hooks/useConcertActions";

export default function ConcertsPage() {
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

  const concertForm = useConcertForm();
  const concertActions = useConcertActions();

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
            onEdit={concertForm.openEditModal}
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
        />
      </div>
    </AuthGuard>
  );
}

