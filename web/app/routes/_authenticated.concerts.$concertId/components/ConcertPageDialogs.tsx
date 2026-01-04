import { ConcertFormDialog } from "~/routes/_authenticated.concerts/components/form/ConcertFormDialog";
import { DeleteConcertDialog } from "~/routes/_authenticated.concerts/components/dialogs/DeleteConcertDialog";
import { CancelConcertDialog } from "~/routes/_authenticated.concerts/components/dialogs/CancelConcertDialog";
import type { ConcertResponse } from "~/api";

interface ConcertPageDialogsProps {
  concertForm: {
    isFormOpen: boolean;
    selectedConcert: ConcertResponse | null;
    formData: any;
    fieldErrors: Record<string, string>;
    generalError?: string | null;
    isSubmitting: boolean;
    setFormData: (data: any) => void;
    handleSubmit: (e: React.FormEvent) => void;
    closeForm: () => void;
  };
  concertActions: {
    isDeleteDialogOpen: boolean;
    isCancelDialogOpen: boolean;
    selectedConcert: ConcertResponse | null;
    isDeleting: boolean;
    isCancelling: boolean;
    closeDeleteDialog: (open: boolean) => void;
    closeCancelDialog: (open: boolean) => void;
    confirmDelete: () => void;
    confirmCancel: (reason: string) => void;
  };
  artists: Array<{ id?: number; name?: string }>;
  budgetManagers: Array<{ id?: number; firstName?: string; lastName?: string }>;
  technicalManagers: Array<{ id?: number; firstName?: string; lastName?: string }>;
  onDeleteSuccess?: () => void;
}

export function ConcertPageDialogs({
  concertForm,
  concertActions,
  artists,
  budgetManagers,
  technicalManagers,
  onDeleteSuccess,
}: ConcertPageDialogsProps) {
  return (
    <>
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
        onConfirm={() => {
          concertActions.confirmDelete();
          onDeleteSuccess?.();
        }}
      />
      <CancelConcertDialog
        isOpen={concertActions.isCancelDialogOpen}
        onOpenChange={concertActions.closeCancelDialog}
        concert={concertActions.selectedConcert}
        isCancelling={concertActions.isCancelling}
        onConfirm={concertActions.confirmCancel}
      />
    </>
  );
}

