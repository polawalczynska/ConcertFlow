import type { TechnicalApproval } from "../data/mockTechnicalApprovals";

export function filterAndSortApprovals(
  approvals: TechnicalApproval[],
  searchQuery: string,
  statusFilter: string,
  sortBy: string
): TechnicalApproval[] {
  let filtered = [...approvals];

  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(
      (approval) =>
        approval.concertName.toLowerCase().includes(query) ||
        approval.artist.toLowerCase().includes(query) ||
        approval.venue.toLowerCase().includes(query)
    );
  }

  if (statusFilter !== "all") {
    // Filter by status (status is already mapped in mapToTechnicalApproval)
    filtered = filtered.filter((approval) => approval.status === statusFilter);
  }

  filtered.sort((a, b) => {
    switch (sortBy) {
      case "concertDate":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "artistName":
        return a.artist.localeCompare(b.artist);
      case "concertName":
        return a.concertName.localeCompare(b.concertName);
      default:
        return 0;
    }
  });

  return filtered;
}

