import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/Dialog";
import { Button } from "~/components/ui/Button";
import type { BudgetItemResponse } from "~/api";
import { AlertTriangle } from "lucide-react";

interface DeleteBudgetItemDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  item: BudgetItemResponse | null;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function DeleteBudgetItemDialog({
  isOpen,
  onOpenChange,
  item,
  onConfirm,
  isLoading = false,
}: DeleteBudgetItemDialogProps) {
  if (!item) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Delete Budget Item
          </DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <p className="text-text-primary mb-2">
            Are you sure you want to delete this budget item?
          </p>
          <div className="bg-bg-secondary p-3 rounded-md">
            <p className="font-medium text-text-primary">{item.name}</p>
            {item.category && (
              <p className="text-sm text-text-secondary mt-1">Category: {item.category}</p>
            )}
            {item.estimatedAmount && (
              <p className="text-sm text-text-secondary mt-1">
                Amount: ${item.estimatedAmount.toLocaleString()}
              </p>
            )}
          </div>
          <p className="text-sm text-text-secondary mt-4">
            This action cannot be undone. The item will be permanently removed from the budget.
          </p>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            disabled={isLoading}
            className="bg-red-500 hover:bg-red-600 text-white"
          >
            {isLoading ? "Deleting..." : "Delete Item"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

