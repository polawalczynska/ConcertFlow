import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/Dialog";
import { Button } from "~/components/ui/Button";
import { Textarea } from "~/components/ui/Textarea";
import { Label } from "~/components/ui/Label";
import { Checkbox } from "~/components/ui/Checkbox";

interface SubmitBudgetDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  concertName: string;
  onSubmit: (notes: string, termsAccepted: boolean) => void;
  isLoading?: boolean;
}

export function SubmitBudgetDialog({
  isOpen,
  onOpenChange,
  concertName,
  onSubmit,
  isLoading,
}: SubmitBudgetDialogProps) {
  const [notes, setNotes] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = () => {
    if (!termsAccepted) {
      return;
    }
    onSubmit(notes, termsAccepted);
    setNotes("");
    setTermsAccepted(false);
  };

  const handleClose = () => {
    setNotes("");
    setTermsAccepted(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Submit Budget for Approval</DialogTitle>
          <DialogDescription>
            Submit the budget for {concertName} to the assigned budget manager for review and approval.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes or context for the budget manager..."
              className="mt-1"
              rows={4}
              maxLength={2000}
            />
            <p className="mt-1 text-xs text-text-secondary">
              {notes.length}/2000 characters
            </p>
          </div>

          <div className="flex items-start gap-2 rounded-lg border border-border p-3">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={(checked) => setTermsAccepted(checked === true)}
            />
            <Label
              htmlFor="terms"
              className="cursor-pointer text-sm leading-relaxed"
            >
              I confirm that all budget items are accurate and complete. I understand that
              once submitted, the budget will be reviewed by the assigned budget manager.
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!termsAccepted || isLoading}
            className="bg-blue-main hover:bg-blue-main/90"
          >
            {isLoading ? "Submitting..." : "Submit Budget"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

