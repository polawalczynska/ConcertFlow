import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/Dialog";
import { Button } from "~/components/ui/Button";
import { Label } from "~/components/ui/Label";
import { Input } from "~/components/ui/Input";

interface ApproveBudgetDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  concertId: number;
  concertName: string;
  budgetVersion: number;
  requestedBudget?: number;
  onApprove: (approvedBudget: number) => void;
  isLoading?: boolean;
}

export function ApproveBudgetDialog({
  isOpen,
  onOpenChange,
  concertName,
  requestedBudget,
  onApprove,
  isLoading,
}: ApproveBudgetDialogProps) {
  const [approvedBudget, setApprovedBudget] = useState<string>("");

  useEffect(() => {
    if (isOpen && requestedBudget) {
      setApprovedBudget(requestedBudget.toString());
    } else if (!isOpen) {
      setApprovedBudget("");
    }
  }, [isOpen, requestedBudget]);

  const handleApprove = () => {
    const budgetValue = parseFloat(approvedBudget);
    if (!isNaN(budgetValue) && budgetValue > 0) {
      onApprove(budgetValue);
    }
  };

  const canApprove = approvedBudget.trim() !== "" && parseFloat(approvedBudget) > 0;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Approve Budget</DialogTitle>
          <DialogDescription>Review and approve the budget for {concertName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label htmlFor="approved-budget">
              Approved Budget <span className="text-red-500">*</span>
            </Label>
            <Input
              id="approved-budget"
              type="number"
              step="0.01"
              min="0"
              value={approvedBudget}
              onChange={(e) => setApprovedBudget(e.target.value)}
              placeholder="Enter approved budget amount"
              className="mt-1"
            />
            {requestedBudget && (
              <p className="mt-1 text-xs text-text-secondary">
                Requested: ${requestedBudget.toLocaleString()}
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleApprove}
            className="bg-purple-main hover:bg-purple-main/90"
            disabled={!canApprove || isLoading}
          >
            {isLoading ? "Approving..." : "Approve Budget"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

