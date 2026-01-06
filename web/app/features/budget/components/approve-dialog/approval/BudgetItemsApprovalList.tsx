import { Label } from "~/components/ui/Label";
import type { BudgetItemResponse } from "~/api";
import { BudgetItemApprovalRow } from "./BudgetItemApprovalRow";

interface BudgetItemsApprovalListProps {
  items: BudgetItemResponse[];
  itemApprovedAmounts: Record<number, string>;
  onItemAmountChange: (itemId: number, amount: string) => void;
}

export function BudgetItemsApprovalList({
  items,
  itemApprovedAmounts,
  onItemAmountChange,
}: BudgetItemsApprovalListProps) {
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div>
      <Label>
        Budget Line Items <span className="text-xs text-text-secondary font-normal">(Optional - set approved amounts)</span>
      </Label>
      <div className="mt-2 space-y-2 max-h-64 overflow-y-auto border border-border rounded-lg p-4">
        {items.map((item) => (
          <BudgetItemApprovalRow
            key={item.id}
            item={item}
            approvedAmount={itemApprovedAmounts[item.id ?? 0] || ""}
            onAmountChange={onItemAmountChange}
          />
        ))}
      </div>
    </div>
  );
}

