import type { BudgetManagerStatsResponse } from "~/api";

export function mapBudgetDashboardData(stats: BudgetManagerStatsResponse | undefined) {
  if (!stats) {
    return {
      budgetsByMonth: [],
      statusDistribution: [],
      budgetCategories: [],
    };
  }

  const budgetsByMonth = (stats.budgetsByMonth || []).map(item => ({
    month: item.month || "",
    approvedAmount: item.approvedAmount || 0,
  }));

  const statusDistribution = (stats.statusDistribution || []).map(item => ({
    name: item.status || "",
    value: item.count || 0,
    color: item.color || "#8B5CF6",
  }));

  const budgetCategories = (stats.budgetCategories || []).map(item => ({
    category: item.category || "",
    amount: item.amount || 0,
    color: item.color || "#8B5CF6",
  }));

  return {
    budgetsByMonth,
    statusDistribution,
    budgetCategories,
  };
}

