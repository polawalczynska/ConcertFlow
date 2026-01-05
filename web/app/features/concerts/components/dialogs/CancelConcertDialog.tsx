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
import { Label } from "~/components/ui/Label";
import { Textarea } from "~/components/ui/Textarea";
import type { ConcertResponse } from "~/api";
import { useState } from "react";

interface CancelConcertDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  concert: ConcertResponse | null;
  isCancelling: boolean;
  onConfirm: (cancellationReason: string) => void;
}

export function CancelConcertDialog({
  isOpen,
  onOpenChange,
  concert,
  isCancelling,
  onConfirm,
}: CancelConcertDialogProps) {
  const [cancellationReason, setCancellationReason] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (!cancellationReason.trim()) {
      setError("Cancellation reason is required");
      return;
    }
    setError("");
    onConfirm(cancellationReason.trim());
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setCancellationReason("");
      setError("");
    }
    onOpenChange(open);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cancel Concert</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to cancel <strong>{concert?.name}</strong>? This will mark the concert as cancelled.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-4">
          <Label htmlFor="cancellationReason" className="text-sm font-medium">
            Cancellation Reason <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="cancellationReason"
            value={cancellationReason}
            onChange={(e) => {
              setCancellationReason(e.target.value);
              if (error) setError("");
            }}
            placeholder="Please provide a reason for cancelling this concert..."
            rows={4}
            className={`mt-2 ${error ? "border-red-500" : ""}`}
            disabled={isCancelling}
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel 
            onClick={() => handleOpenChange(false)}
            disabled={isCancelling}
          >
            No, keep it
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-orange-600 hover:bg-orange-700"
            disabled={isCancelling}
          >
            {isCancelling ? "Cancelling..." : "Yes, cancel concert"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
