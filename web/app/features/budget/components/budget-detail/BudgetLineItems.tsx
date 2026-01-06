import type { BudgetDetailResponse } from "~/api";
import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/Card";
import { useBudgetLineItems } from "./budget-line-items/useBudgetLineItems";
import { CategoryGroup } from "./budget-line-items/CategoryGroup";

interface BudgetLineItemsProps {
  budget: BudgetDetailResponse;
}

export function BudgetLineItems({ budget }: BudgetLineItemsProps) {
  const { groupedItems, expandedCategories, toggleCategory } = useBudgetLineItems(budget);

  return (
    <Card className="mb-6 border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg">Budget Line Items</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {Object.entries(groupedItems).map(([category, items]) => (
            <CategoryGroup
              key={category}
              category={category}
              items={items ?? []}
              isExpanded={expandedCategories.includes(category)}
              onToggle={() => toggleCategory(category)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

