import type { BudgetItemResponse } from "~/api";
import { CategoryHeader } from "./CategoryHeader";
import { CategoryItemsList } from "./CategoryItemsList";

interface CategoryGroupProps {
  category: string;
  items: BudgetItemResponse[];
  isExpanded: boolean;
  onToggle: () => void;
}

export function CategoryGroup({ category, items, isExpanded, onToggle }: CategoryGroupProps) {
  return (
    <div className="rounded-lg border border-border">
      <CategoryHeader
        category={category}
        itemCount={items?.length ?? 0}
        isExpanded={isExpanded}
        onToggle={onToggle}
      />
      {isExpanded && items && <CategoryItemsList items={items} />}
    </div>
  );
}

