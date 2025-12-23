import { useState, useMemo } from "react";
import type { BudgetDetailResponse } from "~/api";

export function useBudgetLineItems(budget: BudgetDetailResponse) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const groupedItems = useMemo(() => {
    const groups: Record<string, typeof budget.budgetItems> = {};
    budget.budgetItems?.forEach((item) => {
      const category = item.category ?? "Other";
      if (!groups[category]) groups[category] = [];
      groups[category].push(item);
    });
    return groups;
  }, [budget.budgetItems]);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  return {
    groupedItems,
    expandedCategories,
    toggleCategory,
  };
}

