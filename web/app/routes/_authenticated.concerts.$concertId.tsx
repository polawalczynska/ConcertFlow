import { useState } from "react";
import { useParams, useNavigate } from "@remix-run/react";
import { useConcert } from "~/features/concerts/hooks";
import { useUser, useBudgetManagers, useTechnicalManagers } from "~/shared/hooks/domain";
import { useArtists } from "~/features/artists/hooks";
import { UserResponseRoleEnum } from "~/api";
import { AuthGuard } from "~/features/auth/components";
import { ConcertPageHeader } from "~/features/concerts/components/ConcertPageHeader";
import { ConcertPageContent } from "~/features/concerts/components/ConcertPageContent";
import { ConcertPageManagement } from "~/features/concerts/components/ConcertPageManagement";
import { ConcertPageActions } from "~/features/concerts/components/ConcertPageActions";
import { ConcertPageDialogs } from "~/features/concerts/components/ConcertPageDialogs";
import { ConcertPageLoading } from "~/features/concerts/components/ConcertPageLoading";
import { ConcertPageError } from "~/features/concerts/components/ConcertPageError";
import { useConcertForm } from "~/features/concerts/hooks/useConcertForm";
import { useConcertActions } from "~/features/concerts/hooks/useConcertActions";

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
  const isBudgetManager = currentUser?.role === UserResponseRoleEnum.BudgetManager;
  const isTechnicalManager = currentUser?.role === UserResponseRoleEnum.TechnicalManager;

  const concertForm = useConcertForm();
  const concertActions = useConcertActions();
  const [isApproveTechnicalDialogOpen, setIsApproveTechnicalDialogOpen] = useState(false);
  const [isRequestTechnicalRevisionDialogOpen, setIsRequestTechnicalRevisionDialogOpen] = useState(false);
  const [isApproveBudgetDialogOpen, setIsApproveBudgetDialogOpen] = useState(false);
  const [isRequestBudgetRevisionDialogOpen, setIsRequestBudgetRevisionDialogOpen] = useState(false);

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
            <>
              <ConcertPageManagement
                concertId={concert.id}
                concertName={concert.name || ""}
                concert={concert}
                userRole={currentUser?.role}
              />
              <ConcertPageActions
                concertId={concert.id}
                concert={concert}
                userRole={currentUser?.role}
                onApproveTechnical={() => setIsApproveTechnicalDialogOpen(true)}
                onRequestTechnicalRevision={() => setIsRequestTechnicalRevisionDialogOpen(true)}
                onApproveBudget={() => setIsApproveBudgetDialogOpen(true)}
                onRequestBudgetRevision={() => setIsRequestBudgetRevisionDialogOpen(true)}
              />
            </>
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
        {isBudgetManager && concert.id && currentUser?.id && (
          <ConcertPageDialogs
            concertForm={{
              isFormOpen: false,
              selectedConcert: null,
              formData: {
                name: "",
                date: "",
                venue: "",
                city: "",
                budget: 0,
                description: "",
                artistId: 0,
              },
              fieldErrors: {},
              generalError: null,
              isSubmitting: false,
              setFormData: () => {},
              handleSubmit: () => {},
              closeForm: () => {},
            }}
            concertActions={{
              isDeleteDialogOpen: false,
              isCancelDialogOpen: false,
              selectedConcert: null,
              isDeleting: false,
              isCancelling: false,
              closeDeleteDialog: () => {},
              closeCancelDialog: () => {},
              confirmDelete: () => {},
              confirmCancel: () => {},
            }}
            artists={[]}
            budgetManagers={[]}
            technicalManagers={[]}
            budgetDialogs={{
              isApproveDialogOpen: isApproveBudgetDialogOpen,
              isRequestRevisionDialogOpen: isRequestBudgetRevisionDialogOpen,
              concertId: concert.id,
              concertName: concert.name || "",
              budgetManagerId: currentUser.id,
              onApproveDialogChange: setIsApproveBudgetDialogOpen,
              onRequestRevisionDialogChange: setIsRequestBudgetRevisionDialogOpen,
            }}
          />
        )}
        {isTechnicalManager && concert.id && currentUser?.id && (
          <ConcertPageDialogs
            concertForm={{
              isFormOpen: false,
              selectedConcert: null,
              formData: {
                name: "",
                date: "",
                venue: "",
                city: "",
                budget: 0,
                description: "",
                artistId: 0,
              },
              fieldErrors: {},
              generalError: null,
              isSubmitting: false,
              setFormData: () => {},
              handleSubmit: () => {},
              closeForm: () => {},
            }}
            concertActions={{
              isDeleteDialogOpen: false,
              isCancelDialogOpen: false,
              selectedConcert: null,
              isDeleting: false,
              isCancelling: false,
              closeDeleteDialog: () => {},
              closeCancelDialog: () => {},
              confirmDelete: () => {},
              confirmCancel: () => {},
            }}
            artists={[]}
            budgetManagers={[]}
            technicalManagers={[]}
            technicalDialogs={{
              isApproveDialogOpen: isApproveTechnicalDialogOpen,
              isRequestRevisionDialogOpen: isRequestTechnicalRevisionDialogOpen,
              concertId: concert.id,
              concertName: concert.name || "",
              technicalManagerId: currentUser.id,
              onApproveDialogChange: setIsApproveTechnicalDialogOpen,
              onRequestRevisionDialogChange: setIsRequestTechnicalRevisionDialogOpen,
            }}
          />
        )}
      </div>
    </AuthGuard>
  );
}

