import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/Dialog";
import { Button } from "~/components/ui/Button";
import { Label } from "~/components/ui/Label";
import { Textarea } from "~/components/ui/Textarea";
import { Checkbox } from "~/components/ui/Checkbox";
import { useState } from "react";

interface SubmitTechnicalDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  concertId: number;
  onSubmit: (notes: string, termsAccepted: boolean) => void;
  isLoading?: boolean;
}

export function SubmitTechnicalDialog({
  isOpen,
  onOpenChange,
  onSubmit,
  isLoading,
}: SubmitTechnicalDialogProps) {
  const [notes, setNotes] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = () => {
    if (!termsAccepted) return;
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
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Submit Technical Requirements</DialogTitle>
          <DialogDescription>
            Submit the technical requirements for this concert to the technical manager for review.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="notes">Additional Notes (Optional)</Label>
            <Textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes or comments..."
              rows={4}
              className="mt-1"
            />
          </div>
          <div className="flex items-start space-x-2">
            <Checkbox
              id="terms"
              checked={termsAccepted}
              onCheckedChange={setTermsAccepted}
            />
            <Label
              htmlFor="terms"
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
            >
              I confirm that all technical requirements have been reviewed and are accurate
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
            className="bg-pink-main hover:bg-pink-main/90"
          >
            {isLoading ? "Submitting..." : "Submit for Approval"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

