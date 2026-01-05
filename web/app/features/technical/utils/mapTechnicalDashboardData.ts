import type { TechnicalManagerStatsResponse } from "~/api";

export function mapTechnicalDashboardData(stats: TechnicalManagerStatsResponse | undefined) {
  if (!stats) {
    return {
      approvedByMonth: [],
      statusDistribution: [],
      technicalAreas: [],
      recentActivity: [],
    };
  }

  const approvedByMonth = (stats.approvedByMonth || []).map(item => ({
    month: item.month || "",
    approvedCount: item.approvedCount || 0,
  }));

  const statusDistribution = (stats.statusDistribution || []).map(item => ({
    name: item.status || "",
    value: item.count || 0,
    color: item.color || "#8B5CF6",
  }));

  const technicalAreas = (stats.technicalAreas || []).map(item => ({
    area: item.area || "",
    count: item.count || 0,
    color: item.color || "#8B5CF6",
  }));

  const recentActivity = (stats.recentActivity || []).map(item => ({
    concertName: item.concertName || "",
    artistName: item.artistName || "",
    technicalStatus: item.technicalStatus || "",
    lastUpdated: item.lastUpdated || "",
  }));

  return {
    approvedByMonth,
    statusDistribution,
    technicalAreas,
    recentActivity,
  };
}

