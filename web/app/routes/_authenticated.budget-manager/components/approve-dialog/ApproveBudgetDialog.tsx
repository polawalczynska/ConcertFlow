import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/Dialog";
import { Button } from "~/components/ui/Button";

interface ApproveBudgetDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  concertId: number;
  concertName: string;
  budgetVersion: number;
  onApprove: () => void;
  isLoading?: boolean;
}

export function ApproveBudgetDialog({
  isOpen,
  onOpenChange,
  concertName,
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

