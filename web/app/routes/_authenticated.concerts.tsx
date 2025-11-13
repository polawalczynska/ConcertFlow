import { useState, useEffect } from "react";
import { useConcerts, useCreateConcert, useUpdateConcert, useDeleteConcert, useCancelConcert } from "~/hooks/useConcerts";
import { useArtists } from "~/hooks/useArtists";
import type { ConcertResponse, ConcertRequest, GetAllConcertsStatusEnum } from "~/api";
import { AuthGuard } from "~/components/AuthGuard";
import { ConcertsHeader } from "~/routes/_authenticated.concerts/components/ConcertsHeader";
import { ConcertsFilters } from "~/routes/_authenticated.concerts/components/ConcertsFilters";
import { ConcertsTable } from "~/routes/_authenticated.concerts/components/ConcertsTable";
import { ConcertsEmptyState } from "~/routes/_authenticated.concerts/components/ConcertsEmptyState";
import { ConcertFormDialog } from "~/routes/_authenticated.concerts/components/form/ConcertFormDialog";
import { DeleteConcertDialog } from "~/routes/_authenticated.concerts/components/DeleteConcertDialog";
import { CancelConcertDialog } from "~/routes/_authenticated.concerts/components/CancelConcertDialog";
import { ViewConcertDialog } from "~/routes/_authenticated.concerts/components/ViewConcertDialog";
import { concertSchema } from "~/lib/validations/concert";
import { extractApiError } from "~/lib/error-utils";

export default function ConcertsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [artistIdFilter, setArtistIdFilter] = useState<string>("all");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedConcert, setSelectedConcert] = useState<ConcertResponse | null>(null);
  const [formData, setFormData] = useState<ConcertRequest>({
    name: "",
    date: "",
    venue: "",
    budget: 0,
    description: "",
    artistId: 0,
  });
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [generalError, setGeneralError] = useState<string | null>(null);

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
  const createConcert = useCreateConcert();
  const updateConcert = useUpdateConcert();
  const deleteConcert = useDeleteConcert();
  const cancelConcert = useCancelConcert();

  useEffect(() => {
    if (createConcert.error) {
      const apiError = extractApiError(createConcert.error);
      if (apiError) {
        if (apiError.field) {
          setFieldErrors((prev) => ({
            ...prev,
            [apiError.field!]: apiError.message,
          }));
          setGeneralError(null);
        } else {
          setGeneralError(apiError.message);
          setFieldErrors({});
        }
      } else {
        setGeneralError("An unexpected error occurred. Please try again.");
        setFieldErrors({});
      }
    } else if (createConcert.isSuccess) {
      setIsFormOpen(false);
      resetForm();
      setGeneralError(null);
      setFieldErrors({});
    }
  }, [createConcert.error, createConcert.isSuccess]);

  useEffect(() => {
    if (updateConcert.error) {
      const apiError = extractApiError(updateConcert.error);
      if (apiError) {
        if (apiError.field) {
          setFieldErrors((prev) => ({
            ...prev,
            [apiError.field!]: apiError.message,
          }));
          setGeneralError(null);
        } else {
          setGeneralError(apiError.message);
          setFieldErrors({});
        }
      } else {
        setGeneralError("An unexpected error occurred. Please try again.");
        setFieldErrors({});
      }
    } else if (updateConcert.isSuccess) {
      setIsFormOpen(false);
      setSelectedConcert(null);
      resetForm();
      setGeneralError(null);
      setFieldErrors({});
    }
  }, [updateConcert.error, updateConcert.isSuccess]);

  const resetForm = () => {
    setFormData({
      name: "",
      date: "",
      venue: "",
      budget: 0,
      description: "",
      artistId: 0,
    });
    setFieldErrors({});
    setGeneralError(null);
  };

  const openEditModal = (concert: ConcertResponse) => {
    setSelectedConcert(concert);
    const formatDateForInput = (dateString?: string) => {
      if (!dateString) return "";
      try {
        const date = new Date(dateString);
        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, "0");
        const day = String(date.getUTCDate()).padStart(2, "0");
        const hours = String(date.getUTCHours()).padStart(2, "0");
        const minutes = String(date.getUTCMinutes()).padStart(2, "0");
        return `${year}-${month}-${day}T${hours}:${minutes}`;
      } catch {
        return "";
      }
    };

    setFormData({
      name: concert.name || "",
      date: formatDateForInput(concert.date),
      venue: concert.venue || "",
      budget: concert.budget || 0,
      description: concert.description || "",
      artistId: concert.artistId || 0,
    });
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFieldErrors({});
    setGeneralError(null);

    const result = concertSchema.safeParse(formData);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          errors[issue.path[0].toString()] = issue.message;
        }
      });
      setFieldErrors(errors);
      return;
    }

    let dateValue: string = formData.date;
    if (dateValue.includes("Z")) {
      dateValue = dateValue.replace("Z", "").split(".")[0];
    }
    if (!dateValue.includes(":")) {
      const date = new Date(formData.date);
      const year = date.getUTCFullYear();
      const month = String(date.getUTCMonth() + 1).padStart(2, "0");
      const day = String(date.getUTCDate()).padStart(2, "0");
      const hours = String(date.getUTCHours()).padStart(2, "0");
      const minutes = String(date.getUTCMinutes()).padStart(2, "0");
      dateValue = `${year}-${month}-${day}T${hours}:${minutes}:00`;
    } else if (!dateValue.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
      if (dateValue.match(/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/)) {
        dateValue = `${dateValue}:00`;
      }
    }
    
    const requestData: ConcertRequest = {
      ...formData,
      date: dateValue,
    };

    if (selectedConcert) {
      updateConcert.mutate({
        id: selectedConcert.id!,
        concertRequest: requestData,
      });
    } else {
      createConcert.mutate(requestData);
    }
  };

  const handleDelete = () => {
    if (selectedConcert?.id) {
      deleteConcert.mutate(selectedConcert.id);
      setIsDeleteDialogOpen(false);
      setSelectedConcert(null);
    }
  };

  const handleCancel = (concert: ConcertResponse) => {
    setSelectedConcert(concert);
    setIsCancelDialogOpen(true);
  };

  const confirmCancel = (cancellationReason: string) => {
    if (selectedConcert?.id) {
      cancelConcert.mutate({
        id: selectedConcert.id,
        cancellationReason,
      });
      setIsCancelDialogOpen(false);
      setSelectedConcert(null);
    }
  };

  return (
    <AuthGuard>
      <div className="p-8 min-h-screen">
        <ConcertsHeader onAddConcert={() => setIsFormOpen(true)} />
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
            onAddConcert={() => setIsFormOpen(true)}
          />
        ) : (
          <ConcertsTable
            concerts={concerts}
            onEdit={openEditModal}
            onDelete={(concert) => {
              setSelectedConcert(concert);
              setIsDeleteDialogOpen(true);
            }}
            onView={(concert) => {
              setSelectedConcert(concert);
              setIsViewDialogOpen(true);
            }}
            onCancel={handleCancel}
          />
        )}
        <ConcertFormDialog
          isOpen={isFormOpen}
          onOpenChange={(open) => {
            setIsFormOpen(open);
            if (!open) {
              resetForm();
              setSelectedConcert(null);
            }
          }}
          selectedConcert={selectedConcert}
          formData={formData}
          formErrors={fieldErrors}
          generalError={generalError}
          isSubmitting={createConcert.isPending || updateConcert.isPending}
          onFormDataChange={setFormData}
          onSubmit={handleSubmit}
          artists={artists}
        />
        <DeleteConcertDialog
          isOpen={isDeleteDialogOpen}
          onOpenChange={setIsDeleteDialogOpen}
          concert={selectedConcert}
          isDeleting={deleteConcert.isPending}
          onConfirm={handleDelete}
        />
        <CancelConcertDialog
          isOpen={isCancelDialogOpen}
          onOpenChange={(open) => {
            setIsCancelDialogOpen(open);
            if (!open) {
              setSelectedConcert(null);
            }
          }}
          concert={selectedConcert}
          isCancelling={cancelConcert.isPending}
          onConfirm={confirmCancel}
        />
        <ViewConcertDialog
          isOpen={isViewDialogOpen}
          onOpenChange={(open) => {
            setIsViewDialogOpen(open);
            if (!open) {
              setSelectedConcert(null);
            }
          }}
          concert={selectedConcert}
        />
      </div>
    </AuthGuard>
  );
}

