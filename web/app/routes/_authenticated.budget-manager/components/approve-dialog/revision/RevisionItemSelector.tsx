import { Label } from "~/components/ui/Label";
import type { BudgetItemResponse } from "~/api";
import { RevisionItemRow } from "./RevisionItemRow";

interface RevisionItemSelectorProps {
  items: BudgetItemResponse[];
  selectedItems: Set<number>;
  onItemToggle: (itemId: number) => void;
  changeReasons: Record<number, string>;
  onChangeReasonChange: (itemId: number, reason: string) => void;
  suggestedAmounts: Record<number, string>;
  onSuggestedAmountChange: (itemId: number, amount: string) => void;
  itemNotes: Record<number, string>;
  onItemNotesChange: (itemId: number, notes: string) => void;
}

export function RevisionItemSelector({
  items,
  selectedItems,
  onItemToggle,
  changeReasons,
  onChangeReasonChange,
  suggestedAmounts,
  onSuggestedAmountChange,
  itemNotes,
  onItemNotesChange,
}: RevisionItemSelectorProps) {
  return (
    <div>
      <Label>
        Select Items Requiring Changes <span className="text-red-500">*</span>
      </Label>
      <div className="mt-2 space-y-3 max-h-64 overflow-y-auto border border-border rounded-lg p-4">
        {items.length === 0 ? (
          <p className="text-sm text-text-secondary">No budget items available</p>
        ) : (
          items.map((item) => (
            <RevisionItemRow
              key={item.id}
              item={item}
              isSelected={selectedItems.has(item.id ?? 0)}
              onToggle={onItemToggle}
              changeReason={changeReasons[item.id ?? 0] || ""}
              onChangeReasonChange={onChangeReasonChange}
              suggestedAmount={suggestedAmounts[item.id ?? 0] || ""}
              onSuggestedAmountChange={onSuggestedAmountChange}
              notes={itemNotes[item.id ?? 0] || ""}
              onNotesChange={onItemNotesChange}
            />
          ))
        )}
      </div>
      {selectedItems.size === 0 && (
        <p className="mt-1 text-xs text-text-secondary">
          Select at least one item that requires changes
        </p>
      )}
    </div>
  );
}

