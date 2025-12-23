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
                <SelectValue placeholder="Select a reason" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="exceeds_limits">Budget exceeds limits</SelectItem>
                <SelectItem value="insufficient_justification">Insufficient justification</SelectItem>
                <SelectItem value="incorrect_calculations">Incorrect calculations</SelectItem>
                <SelectItem value="missing_documentation">Missing documentation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Detailed Comments (Required, min 10 characters)</Label>
            <Textarea
              value={comments}
              onChange={(e) => onCommentsChange(e.target.value)}
              placeholder="Provide detailed feedback about why this budget is being rejected..."
              className="mt-1"
              rows={5}
            />
            <p className="mt-1 text-xs text-text-secondary">{comments.length} / 10 characters</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={onReject} variant="destructive" disabled={comments.length < 10 || isLoading}>
            {isLoading ? "Rejecting..." : "Reject Budget"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

