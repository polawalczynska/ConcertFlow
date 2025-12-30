import type { BudgetItemResponse, BudgetDetailResponseBudgetStatusEnum } from "~/api";
import { BudgetItemsTableRow } from "./BudgetItemsTableRow";

interface BudgetItemsTableBodyProps {
  items: BudgetItemResponse[];
  onEdit: (item: BudgetItemResponse) => void;
  onDelete: (item: BudgetItemResponse) => void;
  canEdit: boolean;
  budgetStatus?: BudgetDetailResponseBudgetStatusEnum;
}

export function BudgetItemsTableBody({
  items,
  onEdit,
  onDelete,
  canEdit,
  budgetStatus,
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
          budgetStatus={budgetStatus}
        />
      ))}
    </tbody>
  );
}

