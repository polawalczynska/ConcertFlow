import { useState } from "react";
import type { ConcertResponse } from "~/api";
import { useDeleteConcert, useCancelConcert } from "~/hooks/useConcerts";

export function useConcertActions() {
  const [selectedConcert, setSelectedConcert] = useState<ConcertResponse | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const deleteConcert = useDeleteConcert();
  const cancelConcert = useCancelConcert();

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

  return {
    selectedConcert,
    isDeleteDialogOpen,
    isCancelDialogOpen,
    isViewDialogOpen,
    handleDelete,
    confirmDelete,
    handleCancel,
    confirmCancel,
    handleView,
    closeViewDialog,
    closeDeleteDialog,
    closeCancelDialog,
    isDeleting: deleteConcert.isPending,
    isCancelling: cancelConcert.isPending,
  };
}

