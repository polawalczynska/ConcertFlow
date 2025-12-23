import { useState } from "react";
import type { ConcertResponse } from "~/api";
import { useDeleteConcert, useCancelConcert } from "~/hooks/useConcerts";
import { useSubmitBudget } from "~/hooks/useSubmitBudget";

export function useConcertActions() {
  const [selectedConcert, setSelectedConcert] = useState<ConcertResponse | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isSubmitBudgetDialogOpen, setIsSubmitBudgetDialogOpen] = useState(false);

  const deleteConcert = useDeleteConcert();
  const cancelConcert = useCancelConcert();
  const submitBudget = useSubmitBudget();

  const handleDelete = (concert: ConcertResponse) => {
    setSelectedConcert(concert);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
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

  const handleView = (concert: ConcertResponse) => {
    setSelectedConcert(concert);
    setIsViewDialogOpen(true);
  };

  const closeViewDialog = (open: boolean) => {
    if (!open) {
      setIsViewDialogOpen(false);
      setSelectedConcert(null);
    }
  };

  const closeDeleteDialog = (open: boolean) => {
    if (!open) {
      setIsDeleteDialogOpen(false);
      setSelectedConcert(null);
    }
  };

  const closeCancelDialog = (open: boolean) => {
    if (!open) {
      setIsCancelDialogOpen(false);
      setSelectedConcert(null);
    }
  };

  const handleSubmitBudget = (concert: ConcertResponse) => {
    setSelectedConcert(concert);
    setIsSubmitBudgetDialogOpen(true);
  };

  const confirmSubmitBudget = (notes: string, termsAccepted: boolean) => {
    if (selectedConcert?.id) {
      submitBudget.mutate({
        concertId: selectedConcert.id,
        request: {
          concertId: selectedConcert.id,
          notes,
          termsAccepted,
        },
      });
      setIsSubmitBudgetDialogOpen(false);
      setSelectedConcert(null);
    }
  };

  const closeSubmitBudgetDialog = (open: boolean) => {
    if (!open) {
      setIsSubmitBudgetDialogOpen(false);
      setSelectedConcert(null);
    }
  };

  return {
    selectedConcert,
    isDeleteDialogOpen,
    isCancelDialogOpen,
    isViewDialogOpen,
    isSubmitBudgetDialogOpen,
    handleDelete,
    confirmDelete,
    handleCancel,
    confirmCancel,
    handleView,
    handleSubmitBudget,
    confirmSubmitBudget,
    closeViewDialog,
    closeDeleteDialog,
    closeCancelDialog,
    closeSubmitBudgetDialog,
    isDeleting: deleteConcert.isPending,
    isCancelling: cancelConcert.isPending,
    isSubmittingBudget: submitBudget.isPending,
  };
}

