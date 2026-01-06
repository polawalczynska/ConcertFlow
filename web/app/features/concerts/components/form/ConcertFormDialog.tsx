import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/components/ui/Dialog";
import type { ConcertResponse, ConcertRequest } from "~/api";
import { ConcertFormFields } from "~/features/concerts/components/form/ConcertFormFields";
import { Button } from "~/components/ui/Button";

interface ConcertFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedConcert: ConcertResponse | null;
  formData: ConcertRequest;
  formErrors: Record<string, string>;
  generalError?: string | null;
  isSubmitting: boolean;
  onFormDataChange: (data: ConcertRequest) => void;
  onSubmit: (e: React.FormEvent) => void;
  artists: Array<{ id?: number; name?: string }>;
  budgetManagers: Array<{ id?: number; firstName?: string; lastName?: string }>;
  technicalManagers: Array<{ id?: number; firstName?: string; lastName?: string }>;
}

export function ConcertFormDialog({
  isOpen,
  onOpenChange,
  selectedConcert,
  formData,
  formErrors,
  generalError,
  isSubmitting,
  onFormDataChange,
  onSubmit,
  artists,
  budgetManagers,
  technicalManagers,
}: ConcertFormDialogProps) {
  const handleFieldChange = (field: keyof ConcertRequest, value: string | number | null) => {
    onFormDataChange({ ...formData, [field]: value });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="!max-w-[800px] w-[90vw]">
        <DialogHeader>
          <DialogTitle>{selectedConcert ? "Edit Concert" : "Create New Concert"}</DialogTitle>
          <DialogDescription>
            {selectedConcert
              ? "Update the concert details below."
              : "Fill in the details to create a new concert."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={onSubmit}>
          {generalError && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-3 text-sm text-red-600">
              {generalError}
            </div>
          )}
          <ConcertFormFields
            formData={formData}
            formErrors={formErrors}
            onFieldChange={handleFieldChange}
            artists={artists}
            budgetManagers={budgetManagers}
            technicalManagers={technicalManagers}
          />
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-main hover:bg-purple-dark"
            >
              {isSubmitting
                ? "Saving..."
                : selectedConcert
                  ? "Update Concert"
                  : "Create Concert"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

