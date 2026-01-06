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
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";
import { useState } from "react";

interface DeleteAccountDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isDeleting: boolean;
  onConfirm: () => void;
}

export function DeleteAccountDialog({
  isOpen,
  onOpenChange,
  isDeleting,
  onConfirm,
}: DeleteAccountDialogProps) {
  const [confirmationText, setConfirmationText] = useState("");
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (confirmationText !== "DELETE") {
      setError("Please type DELETE to confirm");
      return;
    }
    setError("");
    onConfirm();
  };

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      setConfirmationText("");
      setError("");
    }
    onOpenChange(open);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Account</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="py-4">
          <Label htmlFor="confirmation" className="text-sm font-medium">
            Type <strong>DELETE</strong> to confirm
          </Label>
          <Input
            id="confirmation"
            value={confirmationText}
            onChange={(e) => {
              setConfirmationText(e.target.value);
              if (error) setError("");
            }}
            placeholder="DELETE"
            className={`mt-2 ${error ? "border-red-500" : ""}`}
            disabled={isDeleting}
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => handleOpenChange(false)} disabled={isDeleting}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirm}
            className="bg-red-600 hover:bg-red-700"
            disabled={isDeleting || confirmationText !== "DELETE"}
          >
            {isDeleting ? "Deleting..." : "Delete Account"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

