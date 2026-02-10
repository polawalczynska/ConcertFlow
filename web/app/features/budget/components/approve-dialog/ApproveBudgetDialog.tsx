import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "~/components/ui/Dialog";
import { Button } from "~/components/ui/Button";
import type { BudgetDetailResponse, BudgetItemApproval } from "~/api";
import { ApprovedBudgetField } from "./approval/ApprovedBudgetField";
import { BudgetItemsApprovalList } from "./approval/BudgetItemsApprovalList";
import { useApproveBudgetForm } from "./approval/useApproveBudgetForm";

interface ApproveBudgetDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  concertId: number;
  concertName: string;
  budgetVersion: number;
  requestedBudget?: number;
  budgetDetails: BudgetDetailResponse | null;
  onApprove: (approvedBudget: number, itemApprovals: BudgetItemApproval[]) => void;
  isLoading?: boolean;
}

export function ApproveBudgetDialog({
  isOpen,
  onOpenChange,
  concertName,
  requestedBudget,
  budgetDetails,
  onApprove,
  isLoading,
}: ApproveBudgetDialogProps) {
  const {
    approvedBudget,
    setApprovedBudget,
    itemApprovedAmounts,
    handleItemAmountChange,
    buildItemApprovals,
    canApprove,
  } = useApproveBudgetForm({
    isOpen,
    requestedBudget,
    budgetDetails,
  });

  const handleApprove = () => {
    const budgetValue = parseFloat(approvedBudget);
    if (!isNaN(budgetValue) && budgetValue > 0) {
      const itemApprovals = buildItemApprovals();
      onApprove(budgetValue, itemApprovals);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Approve Budget</DialogTitle>
          <DialogDescription>Review and approve the budget for {concertName}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4 max-h-[70vh] overflow-y-auto">
          <ApprovedBudgetField
            value={approvedBudget}
            onChange={setApprovedBudget}
            requestedBudget={requestedBudget}
          />

          <BudgetItemsApprovalList
            items={budgetDetails?.budgetItems || []}
            itemApprovedAmounts={itemApprovedAmounts}
            onItemAmountChange={handleItemAmountChange}
          />
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleApprove}
            className="bg-pink-main hover:bg-pink-main/90"
            disabled={!canApprove || isLoading}
          >
            {isLoading ? "Approving..." : "Approve Budget"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

