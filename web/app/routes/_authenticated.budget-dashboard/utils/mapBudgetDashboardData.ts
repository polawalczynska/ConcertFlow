import type { BudgetManagerStatsResponse } from "~/api";

interface RecentBudgetActivityItem {
  concertName?: string;
  artistName?: string;
  budgetStatus?: string;
  approvedAmount?: number;
  lastUpdated?: string;
}

export function mapBudgetDashboardData(stats: BudgetManagerStatsResponse | undefined) {
  if (!stats) {
    return {
      budgetsByMonth: [],
      statusDistribution: [],
      budgetCategories: [],
      recentActivity: [],
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

  const recentActivityData = (stats as BudgetManagerStatsResponse & { recentActivity?: RecentBudgetActivityItem[] }).recentActivity || [];
  const recentActivity = recentActivityData.map((item: RecentBudgetActivityItem) => ({
    concertName: item.concertName || "",
    artistName: item.artistName || "",
    budgetStatus: item.budgetStatus || "",
    approvedAmount: item.approvedAmount,
    lastUpdated: item.lastUpdated || "",
  }));

  return {
    budgetsByMonth,
    statusDistribution,
    budgetCategories,
    recentActivity,
  };
}

