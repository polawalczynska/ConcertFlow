import { useParams, useNavigate } from "@remix-run/react";
import { useConcert } from "~/hooks/useConcerts";
import { useUser } from "~/hooks/useUser";
import { useArtists } from "~/hooks/useArtists";
import { useBudgetManagers } from "~/hooks/useBudgetManagers";
import { useTechnicalManagers } from "~/hooks/useTechnicalManagers";
import { UserResponseRoleEnum } from "~/api";
import { AuthGuard } from "~/components/AuthGuard";
import { ConcertPageHeader } from "./_authenticated.concerts.$concertId/components/ConcertPageHeader";
import { ConcertPageContent } from "./_authenticated.concerts.$concertId/components/ConcertPageContent";
import { ConcertPageManagement } from "./_authenticated.concerts.$concertId/components/ConcertPageManagement";
import { ConcertPageDialogs } from "./_authenticated.concerts.$concertId/components/ConcertPageDialogs";
import { ConcertPageLoading } from "./_authenticated.concerts.$concertId/components/ConcertPageLoading";
import { ConcertPageError } from "./_authenticated.concerts.$concertId/components/ConcertPageError";
import { useConcertForm } from "~/routes/_authenticated.concerts/hooks/useConcertForm";
import { useConcertActions } from "~/routes/_authenticated.concerts/hooks/useConcertActions";

export default function ConcertPage() {
  const params = useParams();
  const navigate = useNavigate();
  const concertId = params.concertId ? Number.parseInt(params.concertId) : null;
  const { data: concert, isLoading, error } = useConcert(concertId ?? 0);
  const { data: currentUser } = useUser();
  const { data: artists = [] } = useArtists();
  const { data: budgetManagers = [] } = useBudgetManagers();
  const { data: technicalManagers = [] } = useTechnicalManagers();

  const isCoordinator = currentUser?.role === UserResponseRoleEnum.Coordinator;

  const concertForm = useConcertForm();
  const concertActions = useConcertActions();

  if (isLoading) {
    return <ConcertPageLoading />;
  }

  if (error || !concert) {
    return <ConcertPageError />;
  }

  return (
    <AuthGuard>
      <div className="p-8 min-h-screen">
        <ConcertPageHeader
          concert={concert}
          isCoordinator={isCoordinator}
          onBack={() => navigate(-1)}
          onEdit={() => concertForm.openEditModal(concert)}
          onDelete={() => concertActions.handleDelete(concert)}
          onCancel={() => concertActions.handleCancel(concert)}
        />

        <div className="space-y-6">
          <ConcertPageContent concert={concert} />

          {concert.id && (
            <ConcertPageManagement
              concertId={concert.id}
              userRole={currentUser?.role}
            />
          )}
        </div>

        {isCoordinator && (
          <ConcertPageDialogs
            concertForm={{
              isFormOpen: concertForm.isFormOpen,
              selectedConcert: concertForm.selectedConcert,
              formData: concertForm.formData,
              fieldErrors: concertForm.fieldErrors,
              generalError: concertForm.generalError,
              isSubmitting: concertForm.isSubmitting,
              setFormData: concertForm.setFormData,
              handleSubmit: concertForm.handleSubmit,
              closeForm: concertForm.closeForm,
            }}
            concertActions={{
              isDeleteDialogOpen: concertActions.isDeleteDialogOpen,
              isCancelDialogOpen: concertActions.isCancelDialogOpen,
              selectedConcert: concertActions.selectedConcert,
              isDeleting: concertActions.isDeleting,
              isCancelling: concertActions.isCancelling,
              closeDeleteDialog: concertActions.closeDeleteDialog,
              closeCancelDialog: concertActions.closeCancelDialog,
              confirmDelete: () => {
                concertActions.confirmDelete();
                navigate("/manage");
              },
              confirmCancel: concertActions.confirmCancel,
            }}
            artists={artists}
            budgetManagers={budgetManagers}
            technicalManagers={technicalManagers}
            onDeleteSuccess={() => navigate("/manage")}
          />
        )}
      </div>
    </AuthGuard>
  );
}

