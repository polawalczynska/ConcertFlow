interface TechnicalDashboardStats {
  totalReviews: number;
  pendingReview: number;
  approved: number;
  revisionRequested: number;
  upcomingDeadlines: number;
  approvedByMonth: Array<{ month: string; approvedCount: number }>;
  statusDistribution: Array<{ name: string; value: number; color: string }>;
  technicalAreas: Array<{ area: string; count: number; color: string }>;
  recentActivity: Array<{
    concertName: string;
    artistName: string;
    technicalStatus: string;
    lastUpdated: string;
  }>;
}

export function mapTechnicalDashboardData(stats: TechnicalDashboardStats | undefined) {
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
    name: item.name || "",
    value: item.value || 0,
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

