import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ConcertFormDialog } from "~/features/concerts/components/form/ConcertFormDialog";
import { DeleteConcertDialog } from "~/features/concerts/components/dialogs/DeleteConcertDialog";
import { CancelConcertDialog } from "~/features/concerts/components/dialogs/CancelConcertDialog";
import { ApproveTechnicalDialog } from "~/routes/_authenticated.technical-manager/components/ApproveTechnicalDialog";
import { RequestTechnicalRevisionDialog } from "~/routes/_authenticated.technical-manager/components/RequestTechnicalRevisionDialog";
import { ApproveBudgetDialog } from "~/routes/_authenticated.budget-manager/components/approve-dialog/ApproveBudgetDialog";
import { RequestRevisionDialog } from "~/routes/_authenticated.budget-manager/components/approve-dialog/RequestRevisionDialog";
import { budgetApprovalApi } from "~/lib/api-client";
import type { ConcertResponse, BudgetItemApproval, RevisionItem } from "~/api";

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
  technicalDialogs?: {
    isApproveDialogOpen: boolean;
    isRequestRevisionDialogOpen: boolean;
    concertId: number;
    concertName: string;
    technicalManagerId: number;
    onApproveDialogChange: (open: boolean) => void;
    onRequestRevisionDialogChange: (open: boolean) => void;
  };
  budgetDialogs?: {
    isApproveDialogOpen: boolean;
    isRequestRevisionDialogOpen: boolean;
    concertId: number;
    concertName: string;
    budgetManagerId: number;
    onApproveDialogChange: (open: boolean) => void;
    onRequestRevisionDialogChange: (open: boolean) => void;
  };
}

export function ConcertPageDialogs({
  concertForm,
  concertActions,
  artists,
  budgetManagers,
  technicalManagers,
  onDeleteSuccess,
  technicalDialogs,
  budgetDialogs,
}: ConcertPageDialogsProps) {
  const queryClient = useQueryClient();

  const { data: budgetDetails } = useQuery({
    queryKey: ["budget-details-manager", budgetDialogs?.concertId, budgetDialogs?.budgetManagerId],
    queryFn: async () => {
      if (!budgetDialogs?.concertId || !budgetDialogs?.budgetManagerId) return null;
      const response = await budgetApprovalApi.getBudgetDetails(
        budgetDialogs.concertId,
        budgetDialogs.budgetManagerId
      );
      return response.data;
    },
    enabled: !!budgetDialogs?.concertId && !!budgetDialogs?.budgetManagerId && (budgetDialogs.isApproveDialogOpen || budgetDialogs.isRequestRevisionDialogOpen),
  });

  const approveBudgetMutation = useMutation({
    mutationFn: async (request: { approvedBudget: number; itemApprovals: BudgetItemApproval[] }) => {
      if (!budgetDialogs?.concertId) throw new Error("No concert ID");
      await budgetApprovalApi.approveBudget(budgetDialogs.concertId, {
        concertId: budgetDialogs.concertId,
        budgetVersion: budgetDetails?.budgetVersion ?? 1,
        approvedBudget: request.approvedBudget,
        itemApprovals: request.itemApprovals.length > 0 ? request.itemApprovals : undefined,
      });
    },
    onSuccess: () => {
      if (budgetDialogs?.concertId) {
        queryClient.invalidateQueries({ queryKey: ["budget-details-manager", budgetDialogs.concertId] });
        queryClient.invalidateQueries({ queryKey: ["budget-approvals"] });
        queryClient.invalidateQueries({ queryKey: ["concerts"] });
      }
      budgetDialogs?.onApproveDialogChange(false);
    },
  });

  const requestRevisionMutation = useMutation({
    mutationFn: async (request: { revisionReason: string; requiredChanges: RevisionItem[]; deadline: string }) => {
      if (!budgetDialogs?.concertId) throw new Error("No concert ID");
      await budgetApprovalApi.requestBudgetRevision(budgetDialogs.concertId, {
        concertId: budgetDialogs.concertId,
        revisionReason: request.revisionReason,
        requiredChanges: request.requiredChanges,
        deadline: request.deadline,
      });
    },
    onSuccess: () => {
      if (budgetDialogs?.concertId) {
        queryClient.invalidateQueries({ queryKey: ["budget-details-manager", budgetDialogs.concertId] });
        queryClient.invalidateQueries({ queryKey: ["budget-approvals"] });
        queryClient.invalidateQueries({ queryKey: ["concerts"] });
      }
      budgetDialogs?.onRequestRevisionDialogChange(false);
    },
  });

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
      {technicalDialogs && (
        <>
          <ApproveTechnicalDialog
            isOpen={technicalDialogs.isApproveDialogOpen}
            onOpenChange={technicalDialogs.onApproveDialogChange}
            concertId={technicalDialogs.concertId}
            concertName={technicalDialogs.concertName}
            technicalManagerId={technicalDialogs.technicalManagerId}
          />
          <RequestTechnicalRevisionDialog
            isOpen={technicalDialogs.isRequestRevisionDialogOpen}
            onOpenChange={technicalDialogs.onRequestRevisionDialogChange}
            concertId={technicalDialogs.concertId}
            concertName={technicalDialogs.concertName}
          />
        </>
      )}
      {budgetDialogs && budgetDetails && (
        <>
          <ApproveBudgetDialog
            isOpen={budgetDialogs.isApproveDialogOpen}
            onOpenChange={budgetDialogs.onApproveDialogChange}
            concertId={budgetDialogs.concertId}
            concertName={budgetDialogs.concertName}
            budgetVersion={budgetDetails.budgetVersion ?? 1}
            requestedBudget={budgetDetails.requestedBudget}
            budgetDetails={budgetDetails}
            onApprove={(approvedBudget, itemApprovals) => {
              approveBudgetMutation.mutate({ approvedBudget, itemApprovals });
            }}
            isLoading={approveBudgetMutation.isPending}
          />
          <RequestRevisionDialog
            isOpen={budgetDialogs.isRequestRevisionDialogOpen}
            onOpenChange={budgetDialogs.onRequestRevisionDialogChange}
            concertId={budgetDialogs.concertId}
            concertName={budgetDialogs.concertName}
            budgetVersion={budgetDetails.budgetVersion ?? 1}
            budgetDetails={budgetDetails}
            onRequestRevision={(request) => {
              requestRevisionMutation.mutate(request);
            }}
            isLoading={requestRevisionMutation.isPending}
          />
        </>
      )}
    </>
  );
}

