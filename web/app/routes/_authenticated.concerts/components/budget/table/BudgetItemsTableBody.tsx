import type { BudgetItemResponse } from "~/api";
import { BudgetItemsTableRow } from "./BudgetItemsTableRow";

interface BudgetItemsTableBodyProps {
  items: BudgetItemResponse[];
  onEdit: (item: BudgetItemResponse) => void;
  onDelete: (item: BudgetItemResponse) => void;
}

export function BudgetItemsTableBody({
  items,
  onEdit,
  onDelete,
}: BudgetItemsTableBodyProps) {
  return (
    <tbody>
      {items.map((item) => (
        <BudgetItemsTableRow
          key={item.id}
          item={item}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </tbody>
  );
}

