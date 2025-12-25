import type { BudgetItemResponse } from "~/api";
import { BudgetItemsTableRow } from "./BudgetItemsTableRow";

interface BudgetItemsTableBodyProps {
  items: BudgetItemResponse[];
  onEdit: (item: BudgetItemResponse) => void;
  onDelete: (item: BudgetItemResponse) => void;
  canEdit: boolean;
}

export function BudgetItemsTableBody({
  items,
  onEdit,
  onDelete,
  canEdit,
}: BudgetItemsTableBodyProps) {
  return (
    <tbody>
      {items.map((item) => (
        <BudgetItemsTableRow
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
          canEdit={canEdit}
        />
      ))}
    </tbody>
  );
}

