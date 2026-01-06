import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "~/components/ui/Dialog";
import { Button } from "~/components/ui/Button";
import { Input } from "~/components/ui/Input";
import { Label } from "~/components/ui/Label";
import { Textarea } from "~/components/ui/Textarea";
import { Checkbox } from "~/components/ui/Checkbox";
import { useCreateBudgetItem, useUpdateBudgetItem } from "~/features/concerts/hooks";
import { useBudgetItemForm } from "./form/useBudgetItemForm";
import { BudgetItemCategoryField } from "./form/BudgetItemCategoryField";
import { BudgetItemAmountField } from "./form/BudgetItemAmountField";
import type { BudgetItemResponse } from "~/api";

interface BudgetItemFormDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  concertId: number;
  item?: BudgetItemResponse | null;
}

export function BudgetItemFormDialog({
  isOpen,
  onOpenChange,
  concertId,
  item,
}: BudgetItemFormDialogProps) {
  const form = useBudgetItemForm(item);
  const createItem = useCreateBudgetItem(concertId);
  const updateItem = useUpdateBudgetItem(concertId);

  const handleSubmit = () => {
    if (!form.validate()) {
      alert("Please fill in all required fields");
      return;
    }

    const request = form.getRequest();

    if (item?.id) {
      updateItem.mutate(
        { itemId: item.id, request },
        {
          onSuccess: () => {
            onOpenChange(false);
          },
        }
      );
    } else {
      createItem.mutate(request, {
        onSuccess: () => {
          onOpenChange(false);
        },
      });
    }
  };

  const isLoading = createItem.isPending || updateItem.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl">
        <DialogHeader>
          <DialogTitle>{item ? "Edit Budget Item" : "Add Budget Item"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <BudgetItemCategoryField
            value={form.category}
            onChange={form.setCategory}
            categories={form.categories}
          />

          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => form.setName(e.target.value)}
              placeholder="e.g., Sound System Rental"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={form.description}
              onChange={(e) => form.setDescription(e.target.value)}
              placeholder="Additional details about this item"
              rows={3}
            />
          </div>

          <BudgetItemAmountField
            value={form.estimatedAmount}
            onChange={form.setEstimatedAmount}
          />

          <div>
            <div className="flex items-center gap-2">
              <Checkbox
                id="isMandatory"
                checked={form.isMandatory}
                onCheckedChange={(checked) => form.setIsMandatory(checked === true)}
              />
              <Label htmlFor="isMandatory" className="cursor-pointer">
                Mandatory item
              </Label>
            </div>
          </div>

          <div>
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              value={form.notes}
              onChange={(e) => form.setNotes(e.target.value)}
              placeholder="Additional notes or comments"
              rows={2}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-purple-main hover:bg-purple-main/90"
          >
            {isLoading ? "Saving..." : item ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

