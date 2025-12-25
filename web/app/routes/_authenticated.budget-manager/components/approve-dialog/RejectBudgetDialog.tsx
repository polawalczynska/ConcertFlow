import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/Dialog";
import { Button } from "~/components/ui/Button";
import { Label } from "~/components/ui/Label";
import { Textarea } from "~/components/ui/Textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/components/ui/Select";

interface RejectBudgetDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  concertId: number;
  concertName: string;
  budgetVersion: number;
  rejectionReason: string;
  onRejectionReasonChange: (reason: string) => void;
  comments: string;
  onCommentsChange: (comments: string) => void;
  onReject: () => void;
  isLoading?: boolean;
}

const REJECTION_REASONS = [
  { value: "exceeds_limits", label: "Budget exceeds limits" },
  { value: "insufficient_justification", label: "Insufficient justification" },
  { value: "incorrect_calculations", label: "Incorrect calculations" },
  { value: "missing_documentation", label: "Missing documentation" },
  { value: "other", label: "Other" },
] as const;

export function RejectBudgetDialog({
  isOpen,
  onOpenChange,
  concertName,
  rejectionReason,
  onRejectionReasonChange,
  comments,
  onCommentsChange,
  onReject,
  isLoading,
}: RejectBudgetDialogProps) {
  const selectedReasonLabel = REJECTION_REASONS.find((r) => r.value === rejectionReason)?.label || "";

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Reject Budget</DialogTitle>
          <DialogDescription>Provide a reason for rejecting the budget for {concertName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label>Rejection Reason</Label>
            <Select value={rejectionReason} onValueChange={onRejectionReasonChange}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select a reason">
                  {selectedReasonLabel}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {REJECTION_REASONS.map((reason) => (
                  <SelectItem key={reason.value} value={reason.value}>
                    {reason.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Comments (Optional)</Label>
            <Textarea
              value={comments}
              onChange={(e) => onCommentsChange(e.target.value)}
              placeholder="Add any additional comments or feedback..."
              className="mt-1"
              rows={5}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={onReject} variant="destructive" disabled={isLoading}>
            {isLoading ? "Rejecting..." : "Reject Budget"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


