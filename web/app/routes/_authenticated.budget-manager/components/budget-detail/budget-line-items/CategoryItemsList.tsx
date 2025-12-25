import type { BudgetItemResponse } from "~/api";
import { BudgetItemRow } from "./BudgetItemRow";

interface CategoryItemsListProps {
  items: BudgetItemResponse[];
}

export function CategoryItemsList({ items }: CategoryItemsListProps) {
  return (
    <div className="border-t border-border">
      {items.map((item) => (
        <BudgetItemRow key={item.id} item={item} />
      ))}
    </div>
  );
}

