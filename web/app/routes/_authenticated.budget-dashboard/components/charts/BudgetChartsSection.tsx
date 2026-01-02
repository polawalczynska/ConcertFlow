import { BudgetsByMonthChart } from "./BudgetsByMonthChart";
import { BudgetStatusDistributionChart } from "./BudgetStatusDistributionChart";
import { BudgetCategoriesChart } from "./BudgetCategoriesChart";

interface BudgetChartsSectionProps {
  budgetsByMonth: Array<{ month: string; approvedAmount: number }>;
  statusDistribution: Array<{ name: string; value: number; color: string }>;
  budgetCategories: Array<{ category: string; amount: number; color: string }>;
}

export function BudgetChartsSection({
  budgetsByMonth,
  statusDistribution,
  budgetCategories,
}: BudgetChartsSectionProps) {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <BudgetsByMonthChart data={budgetsByMonth} />
        <BudgetStatusDistributionChart data={statusDistribution} />
      </div>
      <BudgetCategoriesChart data={budgetCategories} />
    </div>
  );
}

