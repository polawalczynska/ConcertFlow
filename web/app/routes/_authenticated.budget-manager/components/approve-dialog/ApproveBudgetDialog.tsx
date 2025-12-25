import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/Dialog";
import { Button } from "~/components/ui/Button";
import { ApprovalCommentsField } from "./ApprovalCommentsField";

interface ApproveBudgetDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  concertId: number;
  concertName: string;
  budgetVersion: number;
  comments: string;
  onCommentsChange: (comments: string) => void;
  onApprove: () => void;
  isLoading?: boolean;
}

export function ApproveBudgetDialog({
  isOpen,
  onOpenChange,
  concertName,
  comments,
  onCommentsChange,
  onApprove,
  isLoading,
}: ApproveBudgetDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Approve Budget</DialogTitle>
          <DialogDescription>Review and approve the budget for {concertName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <ApprovalCommentsField value={comments} onChange={onCommentsChange} />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={onApprove} className="bg-purple-main hover:bg-purple-main/90" disabled={isLoading}>
            {isLoading ? "Approving..." : "Approve Budget"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

