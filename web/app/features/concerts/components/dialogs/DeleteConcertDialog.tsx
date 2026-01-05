import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/AlertDialog";
import type { ConcertResponse } from "~/api";

interface DeleteConcertDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  concert: ConcertResponse | null;
  isDeleting: boolean;
  onConfirm: () => void;
}

export function DeleteConcertDialog({
  isOpen,
  onOpenChange,
  concert,
  isDeleting,
  onConfirm,
}: DeleteConcertDialogProps) {
  const handleCancel = () => {
    onOpenChange(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Concert</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete <strong>{concert?.name}</strong>? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleCancel} disabled={isDeleting}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700"
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

